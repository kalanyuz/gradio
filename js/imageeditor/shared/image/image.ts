import {
	Container,
	Graphics,
	Color,
	type ColorSource,
	RenderTexture,
	Sprite,
	type Renderer,
	Texture
} from "pixi.js";
import { type ImageEditorContext, type Tool } from "../core/editor";
import { type Tool as ToolbarTool, type Subtool } from "../Toolbar.svelte";
import { type Command } from "../utils/commands";
import { make_graphics } from "../utils/pixi";
import { get } from "svelte/store";

/**
 * Handles adding images to the editor
 * Only a single image can be added at a time
 * Adding an image removes the current image is one exists
 */
export class ImageTool implements Tool {
	name = "image";
	context!: ImageEditorContext;
	current_tool!: ToolbarTool;
	current_subtool!: Subtool;
	async setup(
		context: ImageEditorContext,
		tool: ToolbarTool,
		subtool: Subtool
	): Promise<void> {
		this.context = context;
		this.current_tool = tool;
		this.current_subtool = subtool;
	}

	cleanup(): void {}

	async add_image({
		image,
		fixed_canvas,
		border_region = 0,
		is_cropped = false,
		original_dimensions,
		crop_offset
	}: {
		image: Blob | File | Texture;
		fixed_canvas: boolean;
		border_region?: number;
		is_cropped?: boolean;
		original_dimensions?: { width: number; height: number };
		crop_offset?: { x: number; y: number };
	}): Promise<void> {
		const image_command = new AddImageCommand(
			this.context,
			image,
			fixed_canvas,
			border_region,
			is_cropped,
			original_dimensions,
			crop_offset
		);

		await image_command.start();
		this.context.execute_command(image_command);
	}

	set_tool(tool: ToolbarTool, subtool: Subtool): void {
		this.current_tool = tool;
		this.current_subtool = subtool;
	}
}

interface BgImageCommand extends Command {
	/**
	 * Initial setup for the bg command
	 * @returns
	 */
	start: () => Promise<[number, number]>;
}

export class AddImageCommand implements BgImageCommand {
	sprite: Sprite;
	fixed_canvas: boolean;
	context: ImageEditorContext;
	background: Blob | File | Texture;
	current_canvas_size: { width: number; height: number };
	current_scale: number;
	current_position: { x: number; y: number };
	border_region: number;
	is_cropped: boolean;
	original_dimensions?: { width: number; height: number };
	crop_offset?: { x: number; y: number };

	constructor(
		context: ImageEditorContext,
		background: Blob | File | Texture,
		fixed_canvas: boolean,
		border_region = 0,
		is_cropped = false,
		original_dimensions?: { width: number; height: number },
		crop_offset?: { x: number; y: number }
	) {
		this.context = context;
		this.background = background;
		this.fixed_canvas = fixed_canvas;
		this.border_region = border_region;
		this.current_canvas_size = get(this.context.dimensions);
		this.current_scale = get(this.context.scale);
		this.current_position = get(this.context.position);
		this.sprite = new Sprite();
		this.is_cropped = is_cropped;
		this.original_dimensions = original_dimensions;
		this.crop_offset = crop_offset;
	}

	async start(): Promise<[number, number]> {
		// Create the sprite from the blob
		let image_texture: Texture;
		if (this.background instanceof Texture) {
			image_texture = this.background;
		} else {
			const img = await createImageBitmap(this.background);
			image_texture = Texture.from(img);
		}
		this.sprite = new Sprite(image_texture);

		// Store the border region on the sprite for later reference
		(this.sprite as any).border_region = this.border_region;

		// Handle cropped images
		if (this.is_cropped && this.original_dimensions && this.crop_offset) {
			// Store crop information on the sprite for later reference
			(this.sprite as any).is_cropped = true;
			(this.sprite as any).original_dimensions = this.original_dimensions;
			(this.sprite as any).crop_offset = this.crop_offset;

			if (this.fixed_canvas) {
				// For fixed canvas with cropped image:
				// 1. Calculate how the original image would have been scaled to fit
				// 2. Apply the same scale to the crop offset

				// Calculate the effective canvas dimensions (accounting for border)
				const effectiveCanvasWidth = Math.max(
					this.current_canvas_size.width - this.border_region * 2,
					10
				);
				const effectiveCanvasHeight = Math.max(
					this.current_canvas_size.height - this.border_region * 2,
					10
				);

				// First, calculate how the ORIGINAL (uncropped) image would have been fitted
				const originalFitResult = fit_image_to_canvas(
					this.original_dimensions.width,
					this.original_dimensions.height,
					effectiveCanvasWidth,
					effectiveCanvasHeight
				);

				// Calculate the scale factor from original to fitted dimensions
				const scaleX = originalFitResult.width / this.original_dimensions.width;
				const scaleY =
					originalFitResult.height / this.original_dimensions.height;

				// Now fit the cropped image using the same logic
				const { width, height, x, y } = fit_image_to_canvas(
					this.sprite.width,
					this.sprite.height,
					effectiveCanvasWidth,
					effectiveCanvasHeight
				);

				// Set the sprite size to the fitted dimensions
				this.sprite.width = width;
				this.sprite.height = height;

				// Scale the crop offset by the same scale factor that was applied to the original image
				const scaledOffsetX = this.crop_offset.x * scaleX;
				const scaledOffsetY = this.crop_offset.y * scaleY;

				// Position the sprite accounting for the border and the scaled crop offset
				// The key is to position it as if the original image was positioned at x + border_region,
				// and then subtract the scaled crop offset
				this.sprite.x = this.border_region + scaledOffsetX;
				// originalFitResult.x + this.border_region -
				this.sprite.y = this.border_region + scaledOffsetY;
				// originalFitResult.y + this.border_region - scaledOffsetY;

				// Store diagnostic values
				(this.sprite as any).diagnostics = {
					originalDimensions: this.original_dimensions,
					croppedDimensions: {
						width: this.sprite.width,
						height: this.sprite.height
					},
					effectiveCanvas: {
						width: effectiveCanvasWidth,
						height: effectiveCanvasHeight
					},
					originalFitResult,
					croppedFitResult: { width, height, x, y },
					scaleFactors: { x: scaleX, y: scaleY },
					scaledOffset: { x: scaledOffsetX, y: scaledOffsetY },
					finalPosition: { x: this.sprite.x, y: this.sprite.y }
				};
			} else {
				// For non-fixed canvas, we need to:
				// 1. Keep the same canvas size as if the original image was used
				// 2. Position the cropped image to match its original position

				// Scale factor is simpler for non-fixed canvas
				const scaleX = this.sprite.width / this.original_dimensions.width;
				const scaleY = this.sprite.height / this.original_dimensions.height;

				// Position at border minus the scaled crop offset
				this.sprite.x = this.border_region - this.crop_offset.x * scaleX;
				this.sprite.y = this.border_region - this.crop_offset.y * scaleY;

				// Store diagnostic values
				(this.sprite as any).diagnostics = {
					originalDimensions: this.original_dimensions,
					croppedDimensions: {
						width: this.sprite.width,
						height: this.sprite.height
					},
					scaleFactors: { x: scaleX, y: scaleY },
					finalPosition: { x: this.sprite.x, y: this.sprite.y }
				};

				// For non-fixed canvas with a cropped image, we need to return the original dimensions
				// plus border to ensure the canvas stays the same size
				return [
					this.original_dimensions.width + this.border_region * 2,
					this.original_dimensions.height + this.border_region * 2
				];
			}
		} else {
			// Handle fixed canvas differently when border region is present
			if (this.fixed_canvas) {
				// If fixed canvas, use the canvas dimensions but account for border
				const effectiveCanvasWidth = Math.max(
					this.current_canvas_size.width - this.border_region * 2,
					10
				);
				const effectiveCanvasHeight = Math.max(
					this.current_canvas_size.height - this.border_region * 2,
					10
				);

				const { width, height, x, y } = fit_image_to_canvas(
					this.sprite.width,
					this.sprite.height,
					effectiveCanvasWidth,
					effectiveCanvasHeight
				);

				this.sprite.width = width;
				this.sprite.height = height;
				// Position needs to account for the border
				this.sprite.x = x + this.border_region;
				this.sprite.y = y + this.border_region;
			} else {
				// For non-fixed canvas, add the border to the natural image dimensions
				const width = this.sprite.width;
				const height = this.sprite.height;

				// Position at the border's offset from origin
				this.sprite.x = this.border_region;
				this.sprite.y = this.border_region;

				// Original dimensions plus border on all sides
				return [
					width + this.border_region * 2,
					height + this.border_region * 2
				];
			}
		}

		return [this.current_canvas_size.width, this.current_canvas_size.height];
	}

	async execute(): Promise<void> {
		// First ensure we have run start() to create the sprite and get dimensions
		const [width, height] = await this.start();

		// Update image properties with the original dimensions and center in viewport
		this.context.set_image_properties({
			scale: 1, // Start at 1:1 scale
			position: {
				x: this.context.app.screen.width / 2,
				y: this.context.app.screen.height / 2
			},
			width: this.fixed_canvas ? this.current_canvas_size.width : width,
			height: this.fixed_canvas ? this.current_canvas_size.height : height
		});

		// Get existing layers and their textures before modifying anything
		const existing_layers = this.context.layer_manager.get_layers();
		const layer_textures = new Map<string, RenderTexture>();

		// Store textures of existing layers
		for (const layer of existing_layers) {
			const textures = this.context.layer_manager.get_layer_textures(layer.id);
			if (textures?.draw) {
				layer_textures.set(layer.id, textures.draw);
			}
		}

		// Create new background layer and add the sprite
		const background_layer = this.context.layer_manager.create_background_layer(
			this.fixed_canvas ? this.current_canvas_size.width : width,
			this.fixed_canvas ? this.current_canvas_size.height : height
		);
		this.sprite.zIndex = 0;
		background_layer.addChild(this.sprite);

		// Resize and preserve content of existing layers
		if (!this.is_cropped) {
			if (existing_layers && existing_layers.length > 0) {
				for (const layer of existing_layers) {
					this.context.layer_manager.delete_layer(layer.id);
				}
			}
		}

		this.context.set_background_image(this.sprite);

		// Explicitly store the border region on the background image for later reference
		(this.sprite as any).border_region = this.border_region;

		// We cannot directly access the resize tool through the context
		// Instead, we'll store the border region on the sprite and let the resize tool
		// read it when it's set up

		this.context.layer_manager.create_layer(
			this.fixed_canvas ? this.current_canvas_size.width : width,
			this.fixed_canvas ? this.current_canvas_size.height : height
		);
		this.context.reset();
	}

	async undo(): Promise<void> {
		if (this.sprite) {
			this.sprite.destroy();
		}
		// The background layer will be automatically cleaned up when a new image is added
	}
}

/**
 * Command that sets a background
 */
interface BgColorCommand extends Command {
	/**
	 * Initial setup for the bg command
	 * @returns
	 */
	start: () => [number, number];
}

/**
 * Adds a background color to the canvas.
 * @param container The container to add the image to.
 * @param renderer The renderer to use for the image.
 * @param color The background color to add.
 * @param width The width of the background.
 * @param height The height of the background.
 * @param resize The function to resize the canvas.
 * @returns A command that can be used to undo the action.
 */
export function add_bg_color(
	container: Container,
	renderer: Renderer,
	color: ColorSource,
	width: number,
	height: number,
	resize: (width: number, height: number) => void
): BgColorCommand {
	let sprite: Sprite;
	return {
		start() {
			container.removeChildren();
			const graphics = make_graphics(1);
			const texture = RenderTexture.create({
				width,
				height
			});
			// graphics.beginFill(new Color(color));
			// graphics.drawRect(0, 0, width, height);
			// graphics.endFill();
			renderer.render(graphics, { renderTexture: texture });
			sprite = new Sprite(texture);
			return [sprite.width, sprite.height];
		},
		async execute() {
			resize(sprite.width, sprite.height);
			sprite.zIndex = 1;
			container.addChild(sprite);
		},
		undo() {
			container.removeChildren();
		}
	};
}

/**
 * Calculates new dimensions and position for an image to fit within a canvas while maintaining aspect ratio
 * @param image_width Original width of the image
 * @param image_height Original height of the image
 * @param canvas_width Width of the canvas
 * @param canvas_height Height of the canvas
 * @returns Object containing new dimensions and position
 */
export function fit_image_to_canvas(
	image_width: number,
	image_height: number,
	canvas_width: number,
	canvas_height: number
): {
	width: number;
	height: number;
	x: number;
	y: number;
} {
	const image_aspect_ratio = image_width / image_height;
	const canvas_aspect_ratio = canvas_width / canvas_height;

	let new_width: number;
	let new_height: number;

	if (image_width <= canvas_width && image_height <= canvas_height) {
		new_width = image_width;
		new_height = image_height;
	} else {
		if (image_aspect_ratio > canvas_aspect_ratio) {
			// Width is the limiting factor
			new_width = canvas_width;
			new_height = canvas_width / image_aspect_ratio;
		} else {
			// Height is the limiting factor
			new_height = canvas_height;
			new_width = canvas_height * image_aspect_ratio;
		}
	}

	// Calculate position to center the image
	const x = Math.round((canvas_width - new_width) / 2);
	const y = Math.round((canvas_height - new_height) / 2);

	return {
		width: Math.round(new_width),
		height: Math.round(new_height),
		x,
		y
	};
}
