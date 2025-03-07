import {
	Container,
	Graphics,
	Point,
	Rectangle,
	FederatedPointerEvent,
	type FederatedOptions
} from "pixi.js";
import { type ImageEditorContext, type Tool } from "../core/editor";
import { type Tool as ToolbarTool, type Subtool } from "../Toolbar.svelte";

/**
 * @class ResizeTool
 * @implements {Tool}
 * @description Implements the resize tool functionality for the image editor
 */
export class ResizeTool implements Tool {
	name = "resize" as const;
	private image_editor_context!: ImageEditorContext;
	current_tool: ToolbarTool = "image";
	current_subtool: Subtool = "size";
	private current_cursor: FederatedOptions["cursor"] = "unset";
	// Constants
	private readonly CORNER_SIZE = 25;
	private readonly LINE_THICKNESS = 5;
	private readonly HANDLE_COLOR = 0x000000;
	private readonly HIT_AREA_SIZE = 40;

	// State
	private is_dragging = false;
	private selected_handle: Container | null = null;
	private active_corner_index = -1;
	private active_edge_index = -1;
	private last_pointer_position: Point | null = null;
	private resize_ui_container: Container | null = null;
	private dimensions: { width: number; height: number } = {
		width: 0,
		height: 0
	};
	private position: { x: number; y: number } = { x: 0, y: 0 };
	private scale = 1;
	private is_moving = false;
	private dom_mousedown_handler: ((e: MouseEvent) => void) | null = null;
	private dom_mousemove_handler: ((e: MouseEvent) => void) | null = null;
	private dom_mouseup_handler: ((e: MouseEvent) => void) | null = null;
	private event_callbacks: Map<string, (() => void)[]> = new Map();
	/**
	 * @method setup
	 * @async
	 * @description Sets up the resize tool with the given context and tool/subtool
	 * @param {ImageEditorContext} context - The image editor context
	 * @param {ToolbarTool} tool - The current tool
	 * @param {Subtool} subtool - The current subtool
	 * @returns {Promise<void>}
	 */
	async setup(
		context: ImageEditorContext,
		tool: ToolbarTool,
		subtool: Subtool
	): Promise<void> {
		this.image_editor_context = context;
		this.current_tool = tool;
		this.current_subtool = subtool;

		context.dimensions.subscribe((dimensions) => {
			this.dimensions = dimensions;
			// Force UI update if it exists
			if (this.resize_ui_container) {
				this.update_resize_ui();
			}
		});

		context.position.subscribe((position) => {
			this.position = position;
		});

		context.scale.subscribe((scale) => {
			this.scale = scale;
		});

		// Initialize resize UI
		await this.init_resize_ui();
		this.setup_event_listeners();

		// Apply boundary constraints only if the image is outside the container boundaries
		if (
			this.current_subtool === "size" &&
			this.image_editor_context.background_image
		) {
			const bg = this.image_editor_context.background_image;
			const container = this.image_editor_context.image_container;

			const bg_width = bg.width;
			const bg_height = bg.height;
			const container_bounds = container.getLocalBounds();
			const container_width = container_bounds.width;
			const container_height = container_bounds.height;

			// Check if the image exceeds the container boundaries
			const min_x = -(bg_width - container_width);
			const min_y = -(bg_height - container_height);
			const max_x = 0;
			const max_y = 0;

			const x_out_of_bounds =
				bg_width > container_width &&
				(bg.position.x < min_x || bg.position.x > max_x);
			const y_out_of_bounds =
				bg_height > container_height &&
				(bg.position.y < min_y || bg.position.y > max_y);

			// Only apply constraints if the image is out of bounds
			if (x_out_of_bounds || y_out_of_bounds) {
				this.apply_boundary_constraints();
			}
		}
	}

	/**
	 * @method cleanup
	 * @description Cleans up the resize tool resources and removes event listeners
	 * @returns {void}
	 */
	cleanup(): void {
		if (this.resize_ui_container) {
			this.image_editor_context.app.stage.removeChild(this.resize_ui_container);
		}
		// Remove event listeners
		this.cleanup_event_listeners();
	}

	/**
	 * @method set_tool
	 * @description Sets the current tool and subtool, updating UI visibility
	 * @param {ToolbarTool} tool - The tool to set
	 * @param {Subtool} subtool - The subtool to set
	 * @returns {void}
	 */
	set_tool(tool: ToolbarTool, subtool: Subtool): void {
		this.current_tool = tool;
		this.current_subtool = subtool;

		if (tool === "image" && subtool === "size") {
			this.show_resize_ui();

			// Apply boundary constraints when switching to the resize tool
			// but only if the image is outside the container boundaries
			if (this.image_editor_context.background_image) {
				const bg = this.image_editor_context.background_image;
				const container = this.image_editor_context.image_container;

				const bg_width = bg.width;
				const bg_height = bg.height;
				const container_bounds = container.getLocalBounds();
				const container_width = container_bounds.width;
				const container_height = container_bounds.height;

				// Check if the image exceeds the container boundaries
				const min_x = -(bg_width - container_width);
				const min_y = -(bg_height - container_height);
				const max_x = 0;
				const max_y = 0;

				const x_out_of_bounds =
					bg_width > container_width &&
					(bg.position.x < min_x || bg.position.x > max_x);
				const y_out_of_bounds =
					bg_height > container_height &&
					(bg.position.y < min_y || bg.position.y > max_y);

				// Only apply constraints if the image is out of bounds
				if (x_out_of_bounds || y_out_of_bounds) {
					this.apply_boundary_constraints();
				}
			}
		} else {
			this.hide_resize_ui();
		}
	}

	/**
	 * @method init_resize_ui
	 * @private
	 * @async
	 * @description Initializes the resize UI elements and sets up the update loop
	 * @returns {Promise<void>}
	 */
	private async init_resize_ui(): Promise<void> {
		// Create resize UI with scaled dimensions
		this.resize_ui_container = this.make_resize_ui(
			this.dimensions.width * this.scale,
			this.dimensions.height * this.scale
		);

		// Position the resize UI container at the image position
		this.resize_ui_container.position.set(this.position.x, this.position.y);

		// Initially hide the resize UI until explicitly enabled by set_tool
		this.resize_ui_container.visible = false;

		this.image_editor_context.app.stage.addChild(this.resize_ui_container);

		// Start the update loop
		this.image_editor_context.app.ticker.add(this.update_resize_ui.bind(this));
	}

	/**
	 * @method make_resize_ui
	 * @private
	 * @description Creates the resize UI with the specified dimensions
	 * @param {number} width - Width of the resize area
	 * @param {number} height - Height of the resize area
	 * @returns {Container} The created resize UI container
	 */
	private make_resize_ui(width: number, height: number): Container {
		const resize_container = new Container();
		resize_container.eventMode = "static";
		resize_container.interactiveChildren = true;

		// Create solid outline (will be mostly hidden by the dotted outline)
		const outline = new Graphics().rect(0, 0, width, height).stroke({
			width: 1,
			color: 0x000000,
			alignment: 0,
			alpha: 0.3
		});

		// Add a second graphics object for the dotted effect
		const dotted_outline = new Graphics();
		const dash_length = 5;
		const gap_length = 5;
		const total_length = dash_length + gap_length;

		// Draw top line
		for (let x = 0; x < width; x += total_length) {
			dotted_outline
				.rect(x, 0, Math.min(dash_length, width - x), 1)
				.fill(0x000000);
		}

		// Draw right line
		for (let y = 0; y < height; y += total_length) {
			dotted_outline
				.rect(width - 1, y, 1, Math.min(dash_length, height - y))
				.fill(0x000000);
		}

		// Draw bottom line
		for (let x = width; x > 0; x -= total_length) {
			dotted_outline
				.rect(
					Math.max(0, x - dash_length),
					height - 1,
					Math.min(dash_length, x),
					1
				)
				.fill(0x000000);
		}

		// Draw left line
		for (let y = height; y > 0; y -= total_length) {
			dotted_outline
				.rect(0, Math.max(0, y - dash_length), 1, Math.min(dash_length, y))
				.fill(0x000000);
		}

		dotted_outline.alpha = 0.7;
		resize_container.addChild(outline);
		resize_container.addChild(dotted_outline);

		// Create a transparent interactive area for the move cursor
		const move_area = new Graphics()
			.rect(0, 0, width, height)
			.fill(0xffffff, 0); // Transparent fill

		move_area.eventMode = "static";
		move_area.cursor = "move"; // Set cursor to move

		// Add the move area before the handles so it doesn't interfere with handle interactions
		resize_container.addChild(move_area);

		// Create handles
		this.create_corner_handles(resize_container, width, height);
		this.create_edge_handles(resize_container, width, height);

		return resize_container;
	}

	/**
	 * @method create_handle
	 * @private
	 * @description Creates a handle for the resize UI
	 * @param {boolean} [is_edge=false] - Whether the handle is an edge handle
	 * @returns {Container} The created handle container
	 */
	private create_handle(is_edge = false): Container {
		const handle = new Container();
		handle.eventMode = "static";
		handle.cursor = "pointer";

		const handle_graphics = new Graphics();
		const handle_size = is_edge ? 8 : 10; // Smaller for edge handles

		// Create square handles
		handle_graphics
			.rect(-handle_size / 2, -handle_size / 2, handle_size, handle_size)
			.fill(0xffffff) // White fill
			.stroke({ width: 1, color: this.HANDLE_COLOR }); // Black border

		handle.addChild(handle_graphics);

		// Adjust hit area based on handle type
		const hit_size = is_edge ? this.HIT_AREA_SIZE * 1.5 : this.HIT_AREA_SIZE;
		handle.hitArea = new Rectangle(
			-hit_size / 2,
			-hit_size / 2,
			hit_size,
			hit_size
		);

		return handle;
	}

	/**
	 * @method create_edge_handles
	 * @private
	 * @description Creates edge handles for the resize UI
	 * @param {Container} container - The container to add handles to
	 * @param {number} width - Width of the resize area
	 * @param {number} height - Height of the resize area
	 * @returns {void}
	 */
	private create_edge_handles(
		container: Container,
		width: number,
		height: number
	): void {
		// Horizontal handles at top and bottom
		[-1, 1].forEach((i, index) => {
			const handle = this.create_handle(true); // true for edge handle
			handle.rotation = 0;

			handle.on("pointerdown", (event: FederatedPointerEvent) => {
				this.handle_pointer_down(event, handle, -1, index); // 0 for top, 1 for bottom
			});

			// Center the handle
			handle.x = width / 2;
			handle.y = i < 0 ? 0 : height;
			handle.cursor = "ns-resize";

			container.addChild(handle);
		});

		// Vertical handles at left and right
		[-1, 1].forEach((i, index) => {
			const handle = this.create_handle(true); // true for edge handle
			handle.rotation = 0; // No rotation needed for square handles

			handle.on("pointerdown", (event: FederatedPointerEvent) => {
				this.handle_pointer_down(event, handle, -1, index + 2); // 2 for left, 3 for right
			});

			// Center the handle
			handle.x = i < 0 ? 0 : width;
			handle.y = height / 2;
			handle.cursor = "ew-resize";
			container.addChild(handle);
		});
	}

	/**
	 * @method create_corner_handles
	 * @private
	 * @description Creates corner handles for the resize UI
	 * @param {Container} container - The container to add handles to
	 * @param {number} width - Width of the resize area
	 * @param {number} height - Height of the resize area
	 * @returns {void}
	 */
	private create_corner_handles(
		container: Container,
		width: number,
		height: number
	): void {
		const corners = [
			{ x: 0, y: 0, cursor: "nwse-resize" }, // Top-left
			{ x: width, y: 0, cursor: "nesw-resize" }, // Top-right
			{ x: 0, y: height, cursor: "nesw-resize" }, // Bottom-left
			{ x: width, y: height, cursor: "nwse-resize" } // Bottom-right
		];

		corners.forEach(({ x, y, cursor }, i) => {
			const corner = this.create_handle(false); // false for corner handle
			corner.x = x;
			corner.y = y;

			corner.on("pointerdown", (event: FederatedPointerEvent) => {
				this.handle_pointer_down(event, corner, i, -1);
			});

			corner.cursor = cursor;

			container.addChild(corner);
		});
	}

	/**
	 * @method handle_pointer_down
	 * @private
	 * @description Handles pointer down events on handles
	 * @param {FederatedPointerEvent} event - The pointer event
	 * @param {Container} handle - The handle that was clicked
	 * @param {number} corner_index - Index of the corner (-1 if not a corner)
	 * @param {number} edge_index - Index of the edge (-1 if not an edge)
	 * @returns {void}
	 */
	private handle_pointer_down(
		event: FederatedPointerEvent,
		handle: Container,
		corner_index: number,
		edge_index: number
	): void {
		// Only handle resize events if resize tool is active
		if (this.current_subtool !== "size") return;

		event.stopPropagation();

		this.is_dragging = true;
		this.selected_handle = handle;
		this.active_corner_index = corner_index;
		this.active_edge_index = edge_index;

		// Convert global position to the container's local coordinates.
		const local_pos = this.image_editor_context.image_container.toLocal(
			event.global
		);
		this.last_pointer_position = new Point(local_pos.x, local_pos.y);
	}

	/**
	 * Maintains aspect ratio during resizing
	 * @param new_width - The new width
	 * @param new_height - The new height
	 * @param original_aspect_ratio - The original aspect ratio
	 * @param delta - The delta to apply
	 * @returns The adjusted dimensions
	 */
	private maintain_aspect_ratio(
		new_width: number,
		new_height: number,
		original_aspect_ratio: number,
		delta: Point
	): { width: number; height: number } {
		// For corner resizing, use the dimension that the user is actively changing
		// This makes the resize follow the mouse cursor more naturally

		// Determine which dimension changed more significantly
		const abs_delta_x = Math.abs(delta.x);
		const abs_delta_y = Math.abs(delta.y);

		// Use a more responsive approach to determine which dimension to prioritize
		// This makes the resize follow the mouse cursor more closely
		if (abs_delta_x > abs_delta_y * 1.2) {
			// User is moving more horizontally, so prioritize width
			new_height = new_width / original_aspect_ratio;
		} else if (abs_delta_y > abs_delta_x * 1.2) {
			// User is moving more vertically, so prioritize height
			new_width = new_height * original_aspect_ratio;
		} else {
			// User is moving diagonally, use the larger delta for better control
			if (new_width / original_aspect_ratio > new_height) {
				new_height = new_width / original_aspect_ratio;
			} else {
				new_width = new_height * original_aspect_ratio;
			}
		}

		return { width: new_width, height: new_height };
	}

	/**
	 * Limits dimensions based on constraints
	 * @param width - The width to limit
	 * @param height - The height to limit
	 * @param maintain_aspect_ratio - Whether to maintain aspect ratio
	 * @returns The limited dimensions
	 */
	private limit_dimensions(
		width: number,
		height: number,
		maintain_aspect_ratio: boolean
	): { width: number; height: number } {
		// Get container dimensions - restrict to container size
		const max_width = this.dimensions.width;
		const max_height = this.dimensions.height;

		let new_width = width;
		let new_height = height;

		if (new_width > max_width) {
			// If maintaining aspect ratio, adjust height proportionally
			if (maintain_aspect_ratio && this.active_corner_index !== -1) {
				new_height = (max_width / new_width) * new_height;
			}
			new_width = max_width;
		}

		if (new_height > max_height) {
			// If maintaining aspect ratio, adjust width proportionally
			if (maintain_aspect_ratio && this.active_corner_index !== -1) {
				new_width = (max_height / new_height) * new_width;
			}
			new_height = max_height;
		}

		// Ensure minimum size
		new_width = Math.max(20, new_width);
		new_height = Math.max(20, new_height);

		return { width: new_width, height: new_height };
	}

	/**
	 * Calculates position deltas based on dimension changes
	 * @param old_width - The original width
	 * @param old_height - The original height
	 * @param new_width - The new width
	 * @param new_height - The new height
	 * @returns Object containing x and y position deltas
	 */
	private calculate_position_deltas(
		old_width: number,
		old_height: number,
		new_width: number,
		new_height: number
	): { x: number; y: number } {
		let delta_x = 0;
		let delta_y = 0;

		// Calculate position deltas based on which handle is being dragged
		if (this.active_corner_index === 0 || this.active_edge_index === 2) {
			// Left side (top-left corner or left edge)
			delta_x = old_width - new_width;
		} else if (this.active_corner_index === 2) {
			// Bottom-left corner should anchor to top-right
			// So we need to adjust both x and y
			delta_x = old_width - new_width;
			delta_y = 0; // No y adjustment to keep it anchored to the top
		}

		if (
			this.active_corner_index === 0 ||
			this.active_corner_index === 1 ||
			this.active_edge_index === 0
		) {
			// Top side (top-left, top-right corners or top edge)
			delta_y = old_height - new_height;
		}

		return { x: delta_x, y: delta_y };
	}

	/**
	 * Applies boundary constraints to keep the image within the container
	 * @private
	 */
	private apply_boundary_constraints(): void {
		if (!this.image_editor_context.background_image) return;

		const bg = this.image_editor_context.background_image;
		const image_container = this.image_editor_context.image_container;

		// Get current position
		let new_x = bg.position.x;
		let new_y = bg.position.y;

		// Apply boundary constraints to keep the image within the container
		const container_width = image_container.width;
		const container_height = image_container.height;
		const bg_width = bg.width;
		const bg_height = bg.height;

		// For images larger than the container, constrain them to show as much as possible
		if (bg_width > container_width) {
			// Calculate the minimum and maximum allowed positions
			const min_x = -(bg_width - container_width);
			const max_x = 0;
			new_x = Math.max(min_x, Math.min(max_x, new_x));
		} else {
			// If image is smaller than container, center it horizontally
			// But only if we're not in the middle of a resize operation
			if (!this.is_dragging) {
				new_x = (container_width - bg_width) / 2;
			} else {
				// During dragging, ensure the image stays within the container
				const min_x = 0;
				const max_x = container_width - bg_width;
				// Only constrain if the image would be partially outside the container
				if (new_x < min_x || new_x > max_x) {
					new_x = Math.max(min_x, Math.min(max_x, new_x));
				}
			}
		}

		if (bg_height > container_height) {
			// Calculate the minimum and maximum allowed positions
			const min_y = -(bg_height - container_height);
			const max_y = 0;
			new_y = Math.max(min_y, Math.min(max_y, new_y));
		} else {
			// If image is smaller than container, center it vertically
			// But only if we're not in the middle of a resize operation
			if (!this.is_dragging) {
				new_y = (container_height - bg_height) / 2;
			} else {
				// During dragging, ensure the image stays within the container
				const min_y = 0;
				const max_y = container_height - bg_height;
				// Only constrain if the image would be partially outside the container
				if (new_y < min_y || new_y > max_y) {
					new_y = Math.max(min_y, Math.min(max_y, new_y));
				}
			}
		}

		// Apply the constrained position
		bg.position.set(new_x, new_y);

		// Update resize UI with container position and scaled sprite position
		if (this.resize_ui_container) {
			const total_x = image_container.position.x + new_x * this.scale;
			const total_y = image_container.position.y + new_y * this.scale;
			this.resize_ui_container.position.set(total_x, total_y);
		}
	}

	/**
	 * Updates the resize bounds based on the delta
	 * @param delta - The delta to apply
	 * @param maintain_aspect_ratio - Whether to maintain the aspect ratio
	 */
	private update_resize_bounds(
		delta: Point,
		maintain_aspect_ratio = false
	): void {
		// The delta is already in local coordinates, no need to scale it further
		const background_image = this.image_editor_context.background_image;

		if (!background_image) return;

		// Store original dimensions and position
		const original_width = background_image.width;
		const original_height = background_image.height;
		const original_x = background_image.position.x;
		const original_y = background_image.position.y;
		const original_aspect_ratio = original_width / original_height;

		// Calculate current position based on the delta and the active handle
		let current_position: Point;

		if (this.active_corner_index !== -1) {
			// For corners, calculate the current position based on the corner and delta
			switch (this.active_corner_index) {
				case 0: // Top-left
					current_position = new Point(
						original_x - delta.x,
						original_y - delta.y
					);
					break;
				case 1: // Top-right
					current_position = new Point(
						original_x + original_width + delta.x,
						original_y - delta.y
					);
					break;
				case 2: // Bottom-left
					current_position = new Point(
						original_x - delta.x,
						original_y + original_height + delta.y
					);
					break;
				case 3: // Bottom-right
					current_position = new Point(
						original_x + original_width + delta.x,
						original_y + original_height + delta.y
					);
					break;
				default:
					return;
			}

			// Use the existing corner resize logic
			const dimensions = this.handle_direct_corner_resize(
				current_position,
				original_width,
				original_height,
				original_x,
				original_y,
				original_aspect_ratio,
				maintain_aspect_ratio
			);

			// Apply the new dimensions and position
			background_image.width = dimensions.width;
			background_image.height = dimensions.height;
			background_image.position.set(dimensions.x, dimensions.y);
		} else if (this.active_edge_index !== -1) {
			// For edges, calculate the current position based on the edge and delta
			switch (this.active_edge_index) {
				case 0: // Top
					current_position = new Point(
						original_x + original_width / 2,
						original_y - delta.y
					);
					break;
				case 1: // Bottom
					current_position = new Point(
						original_x + original_width / 2,
						original_y + original_height + delta.y
					);
					break;
				case 2: // Left
					current_position = new Point(
						original_x - delta.x,
						original_y + original_height / 2
					);
					break;
				case 3: // Right
					current_position = new Point(
						original_x + original_width + delta.x,
						original_y + original_height / 2
					);
					break;
				default:
					return;
			}

			// Use the existing edge resize logic
			const dimensions = this.handle_direct_edge_resize(
				current_position,
				original_width,
				original_height,
				original_x,
				original_y
			);

			// Apply the new dimensions and position
			background_image.width = dimensions.width;
			background_image.height = dimensions.height;
			background_image.position.set(dimensions.x, dimensions.y);
		}

		// We don't apply boundary constraints during resizing
		// This will be done when the user releases the mouse in handle_pointer_up

		// Update the resize UI to match the new position and dimensions
		this.update_resize_ui();
	}

	/**
	 * updates the resize ui position and dimensions
	 */
	private update_resize_ui(): void {
		if (
			!this.resize_ui_container ||
			!this.image_editor_context.background_image
		)
			return;

		const background_image = this.image_editor_context.background_image;
		const image_container = this.image_editor_context.image_container;

		// Combine container position (screen coords) with scaled sprite position (local coords)
		const total_x =
			image_container.position.x + background_image.position.x * this.scale;
		const total_y =
			image_container.position.y + background_image.position.y * this.scale;

		// Move resize_ui_container to match the combined position
		this.resize_ui_container.position.set(total_x, total_y);

		// Get the scaled dimensions
		const scaled_width = background_image.width * this.scale;
		const scaled_height = background_image.height * this.scale;

		// Redraw the outline so it matches the resize_bounds size
		const outline = this.resize_ui_container.getChildAt(0) as Graphics;
		outline
			.clear()
			.rect(0, 0, scaled_width, scaled_height)
			.stroke({ width: 1, color: 0x000000, alignment: 0, alpha: 0.3 });

		// Redraw the dotted outline
		const dotted_outline = this.resize_ui_container.getChildAt(1) as Graphics;
		dotted_outline.clear();

		const dash_length = 5;
		const gap_length = 5;
		const total_length = dash_length + gap_length;

		// Draw top line
		for (let x = 0; x < scaled_width; x += total_length) {
			dotted_outline
				.rect(x, 0, Math.min(dash_length, scaled_width - x), 1)
				.fill(0x000000);
		}

		// Draw right line
		for (let y = 0; y < scaled_height; y += total_length) {
			dotted_outline
				.rect(scaled_width - 1, y, 1, Math.min(dash_length, scaled_height - y))
				.fill(0x000000);
		}

		// Draw bottom line
		for (let x = scaled_width; x > 0; x -= total_length) {
			dotted_outline
				.rect(
					Math.max(0, x - dash_length),
					scaled_height - 1,
					Math.min(dash_length, x),
					1
				)
				.fill(0x000000);
		}

		// Draw left line
		for (let y = scaled_height; y > 0; y -= total_length) {
			dotted_outline
				.rect(0, Math.max(0, y - dash_length), 1, Math.min(dash_length, y))
				.fill(0x000000);
		}

		dotted_outline.alpha = 0.7;

		// Update the move area
		const move_area = this.resize_ui_container.getChildAt(2) as Graphics;
		move_area.clear().rect(0, 0, scaled_width, scaled_height).fill(0xffffff, 0);

		// Update handle positions to reflect the resized area
		this.update_handle_positions(scaled_width, scaled_height);
	}

	/**
	 * updates the positions of all handles
	 * @param width - width of the resize area
	 * @param height - height of the resize area
	 */
	private update_handle_positions(width: number, height: number): void {
		if (!this.resize_ui_container) return;

		// Skip the outline, dotted outline, and move area (index 0, 1, and 2), get corner/edge handles
		const handles = this.resize_ui_container.children.slice(3);

		// Update the move area size
		const move_area = this.resize_ui_container.getChildAt(2) as Graphics;
		move_area.clear().rect(0, 0, width, height).fill(0xffffff, 0);

		// First 4 are corners
		const corners = handles.slice(0, 4);
		const cornerPositions = [
			{ x: 0, y: 0 }, // Top-left
			{ x: width, y: 0 }, // Top-right
			{ x: 0, y: height }, // Bottom-left
			{ x: width, y: height } // Bottom-right
		];

		corners.forEach((handle, i) => {
			handle.position.set(cornerPositions[i].x, cornerPositions[i].y);
		});

		// Remaining 4 are edges
		const edges = handles.slice(4);
		edges.forEach((handle, i) => {
			if (i < 2) {
				// Top/Bottom edges
				handle.position.set(width / 2, i === 0 ? 0 : height);
			} else {
				// Left/Right edges
				handle.position.set(i === 2 ? 0 : width, height / 2);
			}
		});
	}

	/**
	 * sets up event listeners for the resize tool
	 */
	private setup_event_listeners(): void {
		const stage = this.image_editor_context.app.stage;
		stage.eventMode = "static";
		stage.on("pointermove", this.handle_pointer_move.bind(this));
		stage.on("pointerup", this.handle_pointer_up.bind(this));
		stage.on("pointerupoutside", this.handle_pointer_up.bind(this));

		// Set up direct DOM event listeners for dragging the background image
		this.setup_dom_event_listeners();
	}

	/**
	 * Sets up direct DOM event listeners for dragging the background image
	 */
	private setup_dom_event_listeners(): void {
		// Clean up any existing DOM event listeners
		this.cleanup_dom_event_listeners();

		const canvas = this.image_editor_context.app.canvas;

		// Define the mousedown handler
		this.dom_mousedown_handler = (e: MouseEvent) => {
			// Only process if we're in the size subtool
			if (this.current_subtool !== "size") return;

			// Check if we're already dragging a handle (resize operation)
			if (this.is_dragging || this.selected_handle) return;

			// Check if we have a background image
			if (!this.image_editor_context.background_image) return;

			const bg = this.image_editor_context.background_image;

			// Get container and background image bounds
			const container = this.image_editor_context.image_container;
			const containerBounds = container.getBounds();

			// Get mouse position relative to the canvas
			const rect = canvas.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			// Convert to local coordinates within the container
			const localX = (x - containerBounds.x) / this.scale;
			const localY = (y - containerBounds.y) / this.scale;

			// Check if the click is within the background image bounds using local coordinates
			if (
				localX >= bg.position.x &&
				localX <= bg.position.x + bg.width &&
				localY >= bg.position.y &&
				localY <= bg.position.y + bg.height
			) {
				// Set the moving flag to true to indicate we're dragging the image
				this.is_moving = true;

				// Store the initial pointer position in local coordinates
				this.last_pointer_position = new Point(localX, localY);

				// Prevent default behavior and stop propagation
				e.preventDefault();
				e.stopPropagation();
			}
		};

		// Define the mousemove handler
		this.dom_mousemove_handler = (e: MouseEvent) => {
			// Only process if we're in the size subtool and we're moving the image
			if (this.current_subtool !== "size" || !this.is_moving) return;

			// Check if we have the necessary state
			if (
				!this.last_pointer_position ||
				!this.image_editor_context.background_image
			)
				return;

			// Get container bounds
			const container = this.image_editor_context.image_container;
			const containerBounds = container.getBounds();

			// Get mouse position relative to the canvas
			const rect = canvas.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			// Convert to local coordinates within the container
			const localX = (x - containerBounds.x) / this.scale;
			const localY = (y - containerBounds.y) / this.scale;

			// Create a current position point
			const current_position = new Point(localX, localY);

			// Handle image dragging
			this.handle_image_dragging(current_position);

			// Update the last pointer position for continuous dragging
			this.last_pointer_position = current_position;

			// Prevent default behavior and stop propagation
			e.preventDefault();
			e.stopPropagation();
		};

		// Define the mouseup handler
		this.dom_mouseup_handler = (e: MouseEvent) => {
			// Only process if we're in the size subtool and we're moving the image
			if (this.current_subtool !== "size" || !this.is_moving) return;

			// Reset all state variables
			this.is_moving = false;
			this.last_pointer_position = null;

			// Update the resize UI without applying constraints
			this.update_resize_ui();

			// Prevent default behavior and stop propagation
			e.preventDefault();
			e.stopPropagation();
		};

		// Add the event listeners
		canvas.addEventListener("mousedown", this.dom_mousedown_handler);
		window.addEventListener("mousemove", this.dom_mousemove_handler);
		window.addEventListener("mouseup", this.dom_mouseup_handler);
	}

	/**
	 * Cleans up DOM event listeners
	 */
	private cleanup_dom_event_listeners(): void {
		const canvas = this.image_editor_context.app.canvas;

		if (this.dom_mousedown_handler) {
			canvas.removeEventListener("mousedown", this.dom_mousedown_handler);
			this.dom_mousedown_handler = null;
		}

		if (this.dom_mousemove_handler) {
			window.removeEventListener("mousemove", this.dom_mousemove_handler);
			this.dom_mousemove_handler = null;
		}

		if (this.dom_mouseup_handler) {
			window.removeEventListener("mouseup", this.dom_mouseup_handler);
			this.dom_mouseup_handler = null;
		}
	}

	/**
	 * removes event listeners for the resize tool
	 */
	private cleanup_event_listeners(): void {
		const stage = this.image_editor_context.app.stage;

		stage.off("pointermove", this.handle_pointer_move.bind(this));
		stage.off("pointerup", this.handle_pointer_up.bind(this));
		stage.off("pointerupoutside", this.handle_pointer_up.bind(this));

		// Clean up DOM event listeners
		this.cleanup_dom_event_listeners();
	}

	/**
	 * Handles pointer move events
	 */
	private handle_pointer_move(event: FederatedPointerEvent): void {
		if (this.current_subtool !== "size") return;

		// Get the current pointer position in local coordinates
		const local_pos = this.image_editor_context.image_container.toLocal(
			event.global
		);
		const current_position = new Point(local_pos.x, local_pos.y);

		if (this.is_moving && this.last_pointer_position) {
			// Handle image dragging
			this.handle_image_dragging(current_position);

			// Update the last pointer position for continuous dragging
			this.last_pointer_position = current_position;
		} else if (this.is_dragging && this.selected_handle) {
			// Handle resizing
			if (!this.image_editor_context.background_image) return;

			const bg = this.image_editor_context.background_image;
			const maintain_aspect_ratio =
				this.active_corner_index !== -1 && !event.shiftKey;

			// Get the original dimensions and position
			const original_width = bg.width;
			const original_height = bg.height;
			const original_x = bg.position.x;
			const original_y = bg.position.y;
			const original_aspect_ratio = original_width / original_height;

			// Calculate new dimensions and position based on the active handle
			let dimensions: { width: number; height: number; x: number; y: number };

			if (this.active_corner_index !== -1) {
				// Handle corner resizing
				dimensions = this.handle_direct_corner_resize(
					current_position,
					original_width,
					original_height,
					original_x,
					original_y,
					original_aspect_ratio,
					maintain_aspect_ratio
				);
			} else if (this.active_edge_index !== -1) {
				// Handle edge resizing
				dimensions = this.handle_direct_edge_resize(
					current_position,
					original_width,
					original_height,
					original_x,
					original_y
				);
			} else {
				return; // No active handle
			}

			// Limit dimensions to container size
			dimensions = this.limit_dimensions_to_container(
				dimensions,
				original_x,
				original_y,
				original_width,
				original_height,
				maintain_aspect_ratio
			);

			// Apply the new dimensions and position
			bg.width = dimensions.width;
			bg.height = dimensions.height;
			bg.position.set(dimensions.x, dimensions.y);

			// Update the resize UI
			this.update_resize_ui();

			// Update the last pointer position
			this.last_pointer_position = current_position;
		}
	}

	/**
	 * handles pointer up events
	 */
	private handle_pointer_up(): void {
		if (this.current_subtool !== "size") return;

		// Reset all state variables
		this.is_dragging = false;
		this.is_moving = false;
		this.selected_handle = null;
		this.last_pointer_position = null;
		this.active_corner_index = -1;
		this.active_edge_index = -1;

		// Update the resize UI without applying constraints
		this.update_resize_ui();
		this.notify("change");
	}

	/**
	 * Handles dragging of the background image
	 * @param current_position - The current pointer position
	 * @private
	 */
	private handle_image_dragging(current_position: Point): void {
		if (
			!this.last_pointer_position ||
			!this.image_editor_context.background_image
		) {
			return;
		}

		// Get the background image and container
		const bg = this.image_editor_context.background_image;
		const image_container =
			this.image_editor_context.image_container.getLocalBounds();

		// Calculate the delta in local coordinates
		const dx = current_position.x - this.last_pointer_position.x;
		const dy = current_position.y - this.last_pointer_position.y;

		// Update the position directly based on the current position of the background image
		let new_x = bg.position.x + dx;
		let new_y = bg.position.y + dy;

		// Apply boundary constraints directly during dragging
		const container_width = image_container.width;
		const container_height = image_container.height;
		const bg_width = bg.width;
		const bg_height = bg.height;

		// For images larger than the container, constrain them to show as much as possible
		if (bg_width > container_width) {
			// Calculate the minimum and maximum allowed positions
			const min_x = -(bg_width - container_width);
			const max_x = 0;
			new_x = Math.max(min_x, Math.min(max_x, new_x));
		} else {
			// For smaller images, ensure they stay fully visible within the container
			// Don't let them move outside the container boundaries
			const min_x = 0;
			const max_x = container_width - bg_width;
			new_x = Math.max(min_x, Math.min(max_x, new_x));
		}

		if (bg_height > container_height) {
			// Calculate the minimum and maximum allowed positions
			const min_y = -(bg_height - container_height);
			const max_y = 0;
			new_y = Math.max(min_y, Math.min(max_y, new_y));
		} else {
			// For smaller images, ensure they stay fully visible within the container
			// Don't let them move outside the container boundaries
			const min_y = 0;
			const max_y = container_height - bg_height;
			new_y = Math.max(min_y, Math.min(max_y, new_y));
		}

		// Apply the new position
		bg.position.set(new_x, new_y);

		// Update the resize UI to match the new position
		this.update_resize_ui();
	}

	/**
	 * Handles corner resizing
	 * @param current_position - The current mouse position
	 * @param original_width - The original width
	 * @param original_height - The original height
	 * @param original_x - The original x position
	 * @param original_y - The original y position
	 * @param original_aspect_ratio - The original aspect ratio
	 * @param maintain_aspect_ratio - Whether to maintain aspect ratio
	 * @returns The new dimensions and position
	 * @private
	 */
	private handle_direct_corner_resize(
		current_position: Point,
		original_width: number,
		original_height: number,
		original_x: number,
		original_y: number,
		original_aspect_ratio: number,
		maintain_aspect_ratio: boolean
	): { width: number; height: number; x: number; y: number } {
		// Calculate the raw dimensions based on mouse position
		let raw_width = 0;
		let raw_height = 0;
		let new_x = original_x;
		let new_y = original_y;

		// Calculate raw dimensions based on the active corner
		switch (this.active_corner_index) {
			case 0: // Top-left
				raw_width = original_x + original_width - current_position.x;
				raw_height = original_y + original_height - current_position.y;
				break;
			case 1: // Top-right
				raw_width = current_position.x - original_x;
				raw_height = original_y + original_height - current_position.y;
				break;
			case 2: // Bottom-left
				raw_width = original_x + original_width - current_position.x;
				raw_height = current_position.y - original_y;
				break;
			case 3: // Bottom-right
				raw_width = current_position.x - original_x;
				raw_height = current_position.y - original_y;
				break;
		}

		// Ensure minimum size
		raw_width = Math.max(20, raw_width);
		raw_height = Math.max(20, raw_height);

		// Calculate final dimensions
		let new_width = raw_width;
		let new_height = raw_height;

		// Apply aspect ratio if needed
		if (maintain_aspect_ratio) {
			// Use a consistent approach to determine which dimension to prioritize
			// This prevents jumping between different calculations
			const diagonal_vector = {
				x: current_position.x - (original_x + original_width / 2),
				y: current_position.y - (original_y + original_height / 2)
			};

			// Calculate the angle of movement relative to horizontal
			const angle = Math.abs(Math.atan2(diagonal_vector.y, diagonal_vector.x));

			// If moving more horizontally, prioritize width; otherwise, prioritize height
			if (angle < Math.PI / 4 || angle > (3 * Math.PI) / 4) {
				// Prioritize width (horizontal movement)
				new_height = new_width / original_aspect_ratio;
			} else {
				// Prioritize height (vertical movement)
				new_width = new_height * original_aspect_ratio;
			}
		}

		// Calculate the new position based on the active corner
		switch (this.active_corner_index) {
			case 0: // Top-left
				new_x = original_x + original_width - new_width;
				new_y = original_y + original_height - new_height;
				break;
			case 1: // Top-right
				new_y = original_y + original_height - new_height;
				break;
			case 2: // Bottom-left
				new_x = original_x + original_width - new_width;
				break;
			case 3: // Bottom-right
				// Position stays the same
				break;
		}

		return { width: new_width, height: new_height, x: new_x, y: new_y };
	}

	/**
	 * Handles edge resizing
	 * @param current_position - The current mouse position
	 * @param original_width - The original width
	 * @param original_height - The original height
	 * @param original_x - The original x position
	 * @param original_y - The original y position
	 * @returns The new dimensions and position
	 * @private
	 */
	private handle_direct_edge_resize(
		current_position: Point,
		original_width: number,
		original_height: number,
		original_x: number,
		original_y: number
	): { width: number; height: number; x: number; y: number } {
		// Calculate raw dimensions based on mouse position
		let new_width = original_width;
		let new_height = original_height;
		let new_x = original_x;
		let new_y = original_y;

		// Handle edge dragging - directly use mouse position for more intuitive control
		switch (this.active_edge_index) {
			case 0: // Top
				// Calculate height based on distance from bottom edge
				new_height = Math.max(
					20,
					original_y + original_height - current_position.y
				);
				// Set y position to mouse position
				new_y = current_position.y;
				break;
			case 1: // Bottom
				// Calculate height based on distance from top edge
				new_height = Math.max(20, current_position.y - original_y);
				// y position stays the same
				break;
			case 2: // Left
				// Calculate width based on distance from right edge
				new_width = Math.max(
					20,
					original_x + original_width - current_position.x
				);
				// Set x position to mouse position
				new_x = current_position.x;
				break;
			case 3: // Right
				// Calculate width based on distance from left edge
				new_width = Math.max(20, current_position.x - original_x);
				// x position stays the same
				break;
		}

		return { width: new_width, height: new_height, x: new_x, y: new_y };
	}

	/**
	 * Limits dimensions to container size
	 * @param dimensions - The dimensions to limit
	 * @param original_x - The original x position
	 * @param original_y - The original y position
	 * @param original_width - The original width
	 * @param original_height - The original height
	 * @param maintain_aspect_ratio - Whether to maintain aspect ratio
	 * @returns The limited dimensions and position
	 * @private
	 */
	private limit_dimensions_to_container(
		dimensions: { width: number; height: number; x: number; y: number },
		original_x: number,
		original_y: number,
		original_width: number,
		original_height: number,
		maintain_aspect_ratio: boolean
	): { width: number; height: number; x: number; y: number } {
		let {
			width: new_width,
			height: new_height,
			x: new_x,
			y: new_y
		} = dimensions;
		const container_width = this.dimensions.width;
		const container_height = this.dimensions.height;

		// Store the original dimensions before limiting
		const pre_limit_width = new_width;
		const pre_limit_height = new_height;

		// Check if we need to limit dimensions
		const needs_width_limit = new_width > container_width;
		const needs_height_limit = new_height > container_height;

		// If both dimensions need limiting, choose the more restrictive one
		if (needs_width_limit && needs_height_limit) {
			const width_scale = container_width / new_width;
			const height_scale = container_height / new_height;

			if (width_scale < height_scale) {
				// Width is more restrictive
				new_width = container_width;
				if (maintain_aspect_ratio) {
					new_height = new_width / (pre_limit_width / pre_limit_height);
				}
			} else {
				// Height is more restrictive
				new_height = container_height;
				if (maintain_aspect_ratio) {
					new_width = new_height * (pre_limit_width / pre_limit_height);
				}
			}
		} else if (needs_width_limit) {
			// Only width needs limiting
			new_width = container_width;
			if (maintain_aspect_ratio) {
				new_height = new_width / (pre_limit_width / pre_limit_height);
			}
		} else if (needs_height_limit) {
			// Only height needs limiting
			new_height = container_height;
			if (maintain_aspect_ratio) {
				new_width = new_height * (pre_limit_width / pre_limit_height);
			}
		}

		// Recalculate position based on the active handle and the new dimensions
		switch (this.active_corner_index) {
			case 0: // Top-left
				new_x = original_x + original_width - new_width;
				new_y = original_y + original_height - new_height;
				break;
			case 1: // Top-right
				new_y = original_y + original_height - new_height;
				break;
			case 2: // Bottom-left
				new_x = original_x + original_width - new_width;
				break;
			case 3: // Bottom-right
				// Position stays the same
				break;
		}

		// Handle edge cases
		if (this.active_edge_index !== -1) {
			switch (this.active_edge_index) {
				case 0: // Top
					new_y = original_y + original_height - new_height;
					break;
				case 2: // Left
					new_x = original_x + original_width - new_width;
					break;
			}
		}

		return { width: new_width, height: new_height, x: new_x, y: new_y };
	}

	/**
	 * Shows the resize UI
	 * @private
	 */
	private show_resize_ui(): void {
		if (this.resize_ui_container) {
			this.resize_ui_container.visible = true;
			this.update_resize_ui();
		}

		// Make sure the background image has a cursor indicating it can be moved
		if (this.image_editor_context.background_image) {
			const bg = this.image_editor_context.background_image;
			this.current_cursor = bg.cursor;
			bg.cursor = "move";
		}

		// Set up DOM event listeners
		this.setup_dom_event_listeners();
	}

	/**
	 * Hides the resize UI
	 * @private
	 */
	private hide_resize_ui(): void {
		if (this.resize_ui_container) {
			this.resize_ui_container.visible = false;
		}

		// Reset cursor on background image
		if (this.image_editor_context.background_image) {
			const bg = this.image_editor_context.background_image;
			bg.cursor = this.current_cursor;
		}

		// Clean up DOM event listeners
		this.cleanup_dom_event_listeners();
	}

	on<T extends string>(event: T, callback: () => void): void {
		this.event_callbacks.set(event, [
			...(this.event_callbacks.get(event) || []),
			callback
		]);
	}

	off<T extends string>(event: T, callback: () => void): void {
		this.event_callbacks.set(
			event,
			this.event_callbacks.get(event)?.filter((cb) => cb !== callback) || []
		);
	}

	private notify<T extends string>(event: T): void {
		for (const callback of this.event_callbacks.get(event) || []) {
			callback();
		}
	}
}
