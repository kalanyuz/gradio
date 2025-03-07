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

	async add_image(image: Blob | File, fixed_canvas: boolean): Promise<void> {
		const image_command = new AddImageCommand(
			this.context,
			image,
			fixed_canvas
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
	background: Blob | File;
	current_canvas_size: { width: number; height: number };
	current_scale: number;
	current_position: { x: number; y: number };
	constructor(
		context: ImageEditorContext,
		background: Blob | File,
		fixed_canvas: boolean
	) {
		this.context = context;
		this.background = background;
		this.fixed_canvas = fixed_canvas;
		this.current_canvas_size = get(this.context.dimensions);
		this.current_scale = get(this.context.scale);
		this.current_position = get(this.context.position);
		this.sprite = new Sprite();
	}

	async start(): Promise<[number, number]> {
		// Create the sprite from the blob
		const img = await createImageBitmap(this.background);
		const bitmap_texture = Texture.from(img);
		this.sprite = new Sprite(bitmap_texture);

		const { width, height, x, y } = this.fixed_canvas
			? fit_image_to_canvas(
					this.sprite.width,
					this.sprite.height,
					this.current_canvas_size.width,
					this.current_canvas_size.height
				)
			: {
					width: this.sprite.width,
					height: this.sprite.height,
					x: 0,
					y: 0
				};

		console.log("width", width);
		console.log("height", height);
		console.log("x", x);
		console.log("y", y);

		this.sprite.width = width;
		this.sprite.height = height;
		this.sprite.x = x;
		this.sprite.y = y;

		return [width, height];
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
			width: this.fixed_canvas
				? this.current_canvas_size.width
				: this.sprite.width,
			height: this.fixed_canvas
				? this.current_canvas_size.height
				: this.sprite.height
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
		if (existing_layers && existing_layers.length > 0) {
			for (const layer of existing_layers) {
				this.context.layer_manager.delete_layer(layer.id);
			}
		}

		this.context.set_background_image(this.sprite);
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
