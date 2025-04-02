import { setContext, tick, SvelteComponent, init, safe_not_equal, element, svg_element, claim_element, children, claim_svg_element, detach, attr, null_to_empty, insert_hydration, append_hydration, listen, stop_propagation, noop, space, empty, claim_space, toggle_class, prevent_default, group_outros, transition_out, check_outros, transition_in, run_all, createEventDispatcher, set_input_value, action_destroyer, create_component, claim_component, mount_component, destroy_component, bubble, binding_callbacks, text, claim_text, set_data, HtmlTagHydration, claim_html_tag, construct_svelte_component, get_svelte_dataset, is_function, bind, set_style, add_flush_callback, create_slot, add_render_callback, add_iframe_resize_listener, resize_observer_content_box, update_slot_base, get_all_dirty_from_scope, get_slot_changes, onMount, ensure_array_like, update_keyed_each, outro_and_destroy_block, ResizeObserverSingleton, onDestroy, component_subscribe, afterUpdate, globals, flush, assign, get_spread_update, get_spread_object } from "../../../svelte/svelte.js";
import { writable, get } from "../../../svelte/svelte-submodules.js";
import { M as MarkdownCode, K as Check, N as Copy, B as Block, S as Static } from "./2.DR-_Vqz1.js";
import { d as dsvFormat } from "./dsv.CKxpOsHB.js";
import { d as dequal } from "./index.DTU9giFV.js";
import { a as Upload } from "./Upload.L7h5PIFk.js";
import { M as Maximize, a as Minimize } from "./FullscreenButton.PCxc2MTP.js";
import Index$1 from "./Index.DVoLIzTg.js";
import { default as default2 } from "./Example.BJI2b4jy.js";
function is_cell_in_selection(coords, selected_cells) {
  const [row, col] = coords;
  return selected_cells.some(([r, c]) => r === row && c === col);
}
function is_cell_selected(cell, selected_cells) {
  const [row, col] = cell;
  if (!selected_cells.some(([r, c]) => r === row && c === col))
    return "";
  const up = selected_cells.some(([r, c]) => r === row - 1 && c === col);
  const down = selected_cells.some(([r, c]) => r === row + 1 && c === col);
  const left = selected_cells.some(([r, c]) => r === row && c === col - 1);
  const right = selected_cells.some(([r, c]) => r === row && c === col + 1);
  return `cell-selected${up ? " no-top" : ""}${down ? " no-bottom" : ""}${left ? " no-left" : ""}${right ? " no-right" : ""}`;
}
function get_range_selection(start, end) {
  const [start_row, start_col] = start;
  const [end_row, end_col] = end;
  const min_row = Math.min(start_row, end_row);
  const max_row = Math.max(start_row, end_row);
  const min_col = Math.min(start_col, end_col);
  const max_col = Math.max(start_col, end_col);
  const cells = [];
  cells.push(start);
  for (let i = min_row; i <= max_row; i++) {
    for (let j = min_col; j <= max_col; j++) {
      if (i === start_row && j === start_col)
        continue;
      cells.push([i, j]);
    }
  }
  return cells;
}
function handle_selection(current, selected_cells, event) {
  if (event.shiftKey && selected_cells.length > 0) {
    return get_range_selection(
      selected_cells[selected_cells.length - 1],
      current
    );
  }
  if (event.metaKey || event.ctrlKey) {
    const is_cell_match = ([r, c]) => r === current[0] && c === current[1];
    const index = selected_cells.findIndex(is_cell_match);
    return index === -1 ? [...selected_cells, current] : selected_cells.filter((_, i) => i !== index);
  }
  return [current];
}
function handle_delete_key(data, selected_cells) {
  const new_data = data.map((row) => [...row]);
  selected_cells.forEach(([row, col]) => {
    if (new_data[row] && new_data[row][col]) {
      new_data[row][col] = { ...new_data[row][col], value: "" };
    }
  });
  return new_data;
}
function should_show_cell_menu(cell, selected_cells, editable) {
  const [row, col] = cell;
  return editable && selected_cells.length === 1 && selected_cells[0][0] === row && selected_cells[0][1] === col;
}
function get_next_cell_coordinates(current, data, shift_key) {
  var _a, _b, _c;
  const [row, col] = current;
  const direction = shift_key ? -1 : 1;
  if ((_a = data[row]) == null ? void 0 : _a[col + direction]) {
    return [row, col + direction];
  }
  const next_row = row + (direction > 0 ? 1 : 0);
  const prev_row = row + (direction < 0 ? -1 : 0);
  if (direction > 0 && ((_b = data[next_row]) == null ? void 0 : _b[0])) {
    return [next_row, 0];
  }
  if (direction < 0 && ((_c = data[prev_row]) == null ? void 0 : _c[data[0].length - 1])) {
    return [prev_row, data[0].length - 1];
  }
  return false;
}
function move_cursor(event, current_coords, data) {
  var _a;
  const key = event.key;
  const dir = {
    ArrowRight: [0, 1],
    ArrowLeft: [0, -1],
    ArrowDown: [1, 0],
    ArrowUp: [-1, 0]
  }[key];
  let i, j;
  if (event.metaKey || event.ctrlKey) {
    if (key === "ArrowRight") {
      i = current_coords[0];
      j = data[0].length - 1;
    } else if (key === "ArrowLeft") {
      i = current_coords[0];
      j = 0;
    } else if (key === "ArrowDown") {
      i = data.length - 1;
      j = current_coords[1];
    } else if (key === "ArrowUp") {
      i = 0;
      j = current_coords[1];
    } else {
      return false;
    }
  } else {
    i = current_coords[0] + dir[0];
    j = current_coords[1] + dir[1];
  }
  if (i < 0 && j <= 0) {
    return false;
  }
  const is_data = (_a = data[i]) == null ? void 0 : _a[j];
  if (is_data) {
    return [i, j];
  }
  return false;
}
function get_current_indices(id, data) {
  return data.reduce(
    (acc, arr, i) => {
      const j = arr.reduce(
        (_acc, _data, k) => id === _data.id ? k : _acc,
        -1
      );
      return j === -1 ? acc : [i, j];
    },
    [-1, -1]
  );
}
function handle_click_outside(event, parent) {
  const [trigger] = event.composedPath();
  return !parent.contains(trigger);
}
function calculate_selection_positions(selected, data, els, parent, table) {
  var _a, _b;
  const [row, col] = selected;
  if (!((_a = data[row]) == null ? void 0 : _a[col])) {
    return { col_pos: "0px", row_pos: void 0 };
  }
  const cell_id = data[row][col].id;
  const cell_el = (_b = els[cell_id]) == null ? void 0 : _b.cell;
  if (!cell_el) {
    return { col_pos: "0px", row_pos: void 0 };
  }
  const cell_rect = cell_el.getBoundingClientRect();
  const table_rect = table.getBoundingClientRect();
  const col_pos = `${cell_rect.left - table_rect.left + cell_rect.width / 2}px`;
  const row_pos = `${cell_rect.top - table_rect.top + cell_rect.height / 2}px`;
  return { col_pos, row_pos };
}
const SELECTION_KEY = Symbol("selection");
function create_selection_context(context) {
  const instance_id = Symbol(
    `selection_${Math.random().toString(36).substring(2)}`
  );
  const actions = {
    handle_cell_click: (event, row, col) => {
      if (event.target instanceof HTMLAnchorElement)
        return;
      event.preventDefault();
      event.stopPropagation();
      if (context.show_row_numbers && col === -1)
        return;
      context.clear_on_focus = false;
      context.df_actions.set_active_cell_menu(null);
      context.df_actions.set_active_header_menu(null);
      context.df_actions.set_selected_header(false);
      context.df_actions.set_header_edit(false);
      const new_selected_cells = handle_selection(
        [row, col],
        context.selected_cells || [],
        event
      );
      context.df_actions.set_selected_cells(new_selected_cells);
      context.df_actions.set_selected(new_selected_cells[0]);
      if (context.editable) {
        if (new_selected_cells.length === 1) {
          context.df_actions.set_editing([row, col]);
          tick().then(() => {
            const input_el = context.els[context.data[row][col].id].input;
            if (input_el) {
              input_el.focus();
              input_el.selectionStart = input_el.selectionEnd = input_el.value.length;
            }
          });
        } else {
          context.df_actions.set_editing(false);
          context.parent_element.focus();
        }
      } else {
        context.parent_element.focus();
      }
      actions.toggle_cell_button(row, col);
      context.dispatch("select", {
        index: [row, col],
        value: context.get_data_at(row, col),
        row_value: context.data[row].map((d) => d.value)
      });
    },
    toggle_cell_menu: (event, row, col) => {
      event.stopPropagation();
      const current_menu = context.df_actions.get_active_cell_menu();
      if (current_menu && current_menu.row === row && current_menu.col === col) {
        context.df_actions.set_active_cell_menu(null);
      } else {
        const cell = event.target.closest("td");
        if (cell) {
          const rect = cell.getBoundingClientRect();
          context.df_actions.set_active_cell_menu({
            row,
            col,
            x: rect.right,
            y: rect.bottom
          });
        }
      }
    },
    toggle_cell_button: (row, col) => {
      const current_button = context.df_actions.get_active_button();
      const new_button = (current_button == null ? void 0 : current_button.type) === "cell" && current_button.row === row && current_button.col === col ? null : { type: "cell", row, col };
      context.df_actions.set_active_button(new_button);
    },
    handle_select_column: (col) => {
      const selected_cells = context.data.map(
        (_, row) => [row, col]
      );
      context.df_actions.set_selected_cells(selected_cells);
      context.df_actions.set_selected(selected_cells[0]);
      context.df_actions.set_editing(false);
      setTimeout(() => {
        context.parent_element.focus();
      }, 0);
    },
    handle_select_row: (row) => {
      const selected_cells = context.data[0].map(
        (_, col) => [row, col]
      );
      context.df_actions.set_selected_cells(selected_cells);
      context.df_actions.set_selected(selected_cells[0]);
      context.df_actions.set_editing(false);
      setTimeout(() => {
        context.parent_element.focus();
      }, 0);
    }
  };
  const selection_context = { ...context, actions };
  setContext(instance_id, selection_context);
  setContext(SELECTION_KEY, { instance_id, context: selection_context });
  return selection_context;
}
const KEYBOARD_KEY = Symbol("keyboard");
function create_keyboard_context(context) {
  const instance_id = Symbol(
    `keyboard_${Math.random().toString(36).substring(2)}`
  );
  setContext(instance_id, context);
  setContext(KEYBOARD_KEY, { instance_id, context });
  return context;
}
function sort_data(data, sort_columns) {
  if (!data || !data.length || !data[0]) {
    return [];
  }
  if (sort_columns.length > 0) {
    const row_indices = [...Array(data.length)].map((_, i) => i);
    row_indices.sort((row_a_idx, row_b_idx) => {
      const row_a = data[row_a_idx];
      const row_b = data[row_b_idx];
      for (const { col: sort_by, direction } of sort_columns) {
        if (!row_a || !row_b || sort_by < 0 || sort_by >= row_a.length || sort_by >= row_b.length || !row_a[sort_by] || !row_b[sort_by]) {
          continue;
        }
        const val_a = row_a[sort_by].value;
        const val_b = row_b[sort_by].value;
        const comparison = val_a < val_b ? -1 : val_a > val_b ? 1 : 0;
        if (comparison !== 0) {
          return direction === "asc" ? comparison : -comparison;
        }
      }
      return 0;
    });
    return row_indices;
  }
  return [...Array(data.length)].map((_, i) => i);
}
function sort_data_and_preserve_selection(data, display_value, styling, sort_columns, selected, get_current_indices2) {
  let id = null;
  if (selected && selected[0] in data && selected[1] in data[selected[0]]) {
    id = data[selected[0]][selected[1]].id;
  }
  sort_table_data(data, display_value, styling, sort_columns);
  let new_selected = selected;
  if (id) {
    const [i, j] = get_current_indices2(id, data);
    new_selected = [i, j];
  }
  return { data, selected: new_selected };
}
function get_max(data) {
  if (!data || !data.length)
    return [];
  let max = data[0].slice();
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (`${max[j].value}`.length < `${data[i][j].value}`.length) {
        max[j] = data[i][j];
      }
    }
  }
  return max;
}
function sort_table_data(data, display_value, styling, sort_columns) {
  if (!sort_columns.length)
    return;
  if (!data || !data.length)
    return;
  const indices = sort_data(data, sort_columns);
  const new_data = indices.map((i) => data[i]);
  data.splice(0, data.length, ...new_data);
  if (display_value) {
    const new_display = indices.map((i) => display_value[i]);
    display_value.splice(0, display_value.length, ...new_display);
  }
  if (styling) {
    const new_styling = indices.map((i) => styling[i]);
    styling.splice(0, styling.length, ...new_styling);
  }
}
async function copy_table_data(data, selected_cells) {
  if (!data || !data.length)
    return;
  const cells_to_copy = selected_cells || data.flatMap((row, r) => row.map((_, c) => [r, c]));
  const csv = cells_to_copy.reduce(
    (acc, [row, col]) => {
      acc[row] = acc[row] || {};
      const value = String(data[row][col].value);
      acc[row][col] = value.includes(",") || value.includes('"') || value.includes("\n") ? `"${value.replace(/"/g, '""')}"` : value;
      return acc;
    },
    {}
  );
  const rows = Object.keys(csv).sort((a, b) => +a - +b);
  if (!rows.length)
    return;
  const cols = Object.keys(csv[rows[0]]).sort((a, b) => +a - +b);
  const text2 = rows.map((r) => cols.map((c) => csv[r][c] || "").join(",")).join("\n");
  try {
    await navigator.clipboard.writeText(text2);
  } catch (err) {
    throw new Error("Failed to copy to clipboard: " + err.message);
  }
}
function guess_delimiter(text2, possibleDelimiters) {
  return possibleDelimiters.filter(weedOut);
  function weedOut(delimiter) {
    var cache = -1;
    return text2.split("\n").every(checkLength);
    function checkLength(line) {
      if (!line)
        return true;
      var length = line.split(delimiter).length;
      if (cache < 0)
        cache = length;
      return cache === length && length > 1;
    }
  }
}
function data_uri_to_blob(data_uri) {
  const byte_str = atob(data_uri.split(",")[1]);
  const mime_str = data_uri.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byte_str.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byte_str.length; i++) {
    ia[i] = byte_str.charCodeAt(i);
  }
  return new Blob([ab], { type: mime_str });
}
function handle_file_upload(data_uri, update_headers, update_values) {
  const blob = data_uri_to_blob(data_uri);
  const reader = new FileReader();
  reader.addEventListener("loadend", (e) => {
    var _a;
    if (!((_a = e == null ? void 0 : e.target) == null ? void 0 : _a.result) || typeof e.target.result !== "string")
      return;
    const [delimiter] = guess_delimiter(e.target.result, [",", "	"]);
    const [head, ...rest] = dsvFormat(delimiter).parseRows(e.target.result);
    update_headers(head);
    update_values(rest);
  });
  reader.readAsText(blob);
}
const DATAFRAME_KEY = Symbol("dataframe");
function create_actions(state) {
  const add_row = (data, make_id2, index) => {
    if (!data || data.length === 0) {
      return [[{ value: "", id: make_id2() }]];
    }
    const new_row = Array(data[0].length).fill(null).map(() => ({
      value: "",
      id: make_id2()
    }));
    const new_data = [...data];
    if (typeof index === "number" && index >= 0 && index <= data.length) {
      new_data.splice(index, 0, new_row);
    } else {
      new_data.push(new_row);
    }
    return new_data;
  };
  const add_col = (data, headers, make_id2, index) => {
    var _a;
    if (!data || data.length === 0) {
      return {
        data: [[{ value: "", id: make_id2() }]],
        headers: ["Header 1"]
      };
    }
    const new_headers = [...headers];
    const new_data = data.map((row) => [...row]);
    if (typeof index === "number" && index >= 0 && index <= (((_a = data[0]) == null ? void 0 : _a.length) || 0)) {
      new_headers.splice(index, 0, `Header ${headers.length + 1}`);
      new_data.forEach((row) => {
        const id = make_id2();
        row.splice(index, 0, { value: "", id });
      });
    } else {
      new_headers.push(`Header ${headers.length + 1}`);
      new_data.forEach((row) => {
        const id = make_id2();
        row.push({ value: "", id });
      });
    }
    return { data: new_data, headers: new_headers };
  };
  const reset_sort_state = () => {
    state.update((s) => ({
      ...s,
      sort_state: {
        sort_columns: [],
        row_order: []
      }
    }));
  };
  return {
    handle_search: (search_query) => {
      state.update((s) => ({ ...s, current_search_query: search_query }));
    },
    handle_sort: (col, direction) => {
      state.update((s) => {
        const sort_columns = [...s.sort_state.sort_columns];
        const existing_index = sort_columns.findIndex(
          (item) => item.col === col
        );
        if (existing_index !== -1) {
          const existing_item = sort_columns[existing_index];
          if (existing_item.direction === direction) {
            sort_columns.splice(existing_index, 1);
          } else {
            sort_columns[existing_index] = { col, direction };
          }
        } else {
          if (sort_columns.length >= 3) {
            sort_columns.shift();
          }
          sort_columns.push({ col, direction });
        }
        return {
          ...s,
          sort_state: {
            ...s.sort_state,
            sort_columns
          }
        };
      });
    },
    get_sort_status: (name, headers) => {
      const current_state = get(state);
      const sort_item = current_state.sort_state.sort_columns.find(
        (item) => headers[item.col] === name
      );
      if (!sort_item)
        return "none";
      return sort_item.direction;
    },
    sort_data: (data, display_value, styling) => {
      const current_state = get(state);
      if (current_state.sort_state.sort_columns.length > 0) {
        sort_table_data(
          data,
          display_value,
          styling,
          current_state.sort_state.sort_columns
        );
      }
    },
    update_row_order: (data) => {
      state.update((s) => {
        const current_sort_state = { ...s.sort_state };
        if (current_sort_state.sort_columns.length > 0 && data[0]) {
          const indices = [...Array(data.length)].map((_, i) => i);
          indices.sort((a, b) => {
            const row_a = data[a];
            const row_b = data[b];
            for (const {
              col: sort_index,
              direction
            } of current_sort_state.sort_columns) {
              if (!row_a || !row_b || sort_index < 0 || sort_index >= row_a.length || sort_index >= row_b.length) {
                continue;
              }
              const val_a = row_a[sort_index].value;
              const val_b = row_b[sort_index].value;
              const comp = val_a < val_b ? -1 : val_a > val_b ? 1 : 0;
              if (comp !== 0) {
                return direction === "asc" ? comp : -comp;
              }
            }
            return 0;
          });
          current_sort_state.row_order = indices;
        } else {
          current_sort_state.row_order = [...Array(data.length)].map(
            (_, i) => i
          );
        }
        return { ...s, sort_state: current_sort_state };
      });
    },
    filter_data: (data) => {
      const current_state = get(state);
      if (!current_state.current_search_query) {
        return data;
      }
      const search_query = current_state.current_search_query.toLowerCase();
      const filtered = data.filter((row) => {
        return row.some((cell) => {
          if (!cell) {
            return false;
          }
          const cell_value = cell.value;
          if (cell_value === null || cell_value === void 0) {
            return false;
          }
          const string_value = String(cell_value).toLowerCase();
          return string_value.includes(search_query);
        });
      });
      return filtered;
    },
    add_row,
    add_col,
    add_row_at: (data, index, position, make_id2) => {
      const row_index = position === "above" ? index : index + 1;
      return add_row(data, make_id2, row_index);
    },
    add_col_at: (data, headers, index, position, make_id2) => {
      const col_index = position === "left" ? index : index + 1;
      return add_col(data, headers, make_id2, col_index);
    },
    delete_row: (data, index) => {
      if (data.length <= 1) {
        return data;
      }
      const new_data = [...data];
      new_data.splice(index, 1);
      return new_data;
    },
    delete_col: (data, headers, index) => {
      if (headers.length <= 1) {
        return { data, headers };
      }
      const new_headers = [...headers];
      new_headers.splice(index, 1);
      const new_data = data.map((row) => {
        const new_row = [...row];
        new_row.splice(index, 1);
        return new_row;
      });
      return { data: new_data, headers: new_headers };
    },
    delete_row_at: (data, index) => {
      if (data.length <= 1)
        return data;
      data.splice(index, 1);
      return data;
    },
    delete_col_at: (data, headers, index) => {
      if (headers.length <= 1) {
        return { data, headers };
      }
      const new_headers = [...headers];
      new_headers.splice(index, 1);
      const new_data = data.map((row) => {
        const new_row = [...row];
        new_row.splice(index, 1);
        return new_row;
      });
      return { data: new_data, headers: new_headers };
    },
    set_active_cell_menu: (menu) => {
      state.update((s) => ({
        ...s,
        ui_state: { ...s.ui_state, active_cell_menu: menu }
      }));
    },
    set_active_header_menu: (menu) => {
      state.update((s) => ({
        ...s,
        ui_state: { ...s.ui_state, active_header_menu: menu }
      }));
    },
    set_selected_cells: (cells) => {
      state.update((s) => ({
        ...s,
        ui_state: { ...s.ui_state, selected_cells: cells }
      }));
    },
    set_selected: (selected) => {
      state.update((s) => ({
        ...s,
        ui_state: { ...s.ui_state, selected }
      }));
    },
    set_editing: (editing) => {
      state.update((s) => ({
        ...s,
        ui_state: { ...s.ui_state, editing }
      }));
    },
    clear_ui_state: () => {
      state.update((s) => ({
        ...s,
        ui_state: {
          active_cell_menu: null,
          active_header_menu: null,
          selected_cells: [],
          selected: false,
          editing: false,
          header_edit: false,
          selected_header: false,
          active_button: null
        }
      }));
    },
    set_header_edit: (header_index) => {
      state.update((s) => ({
        ...s,
        ui_state: {
          ...s.ui_state,
          selected_cells: [],
          selected_header: header_index,
          header_edit: header_index
        }
      }));
    },
    set_selected_header: (header_index) => {
      state.update((s) => ({
        ...s,
        ui_state: {
          ...s.ui_state,
          selected_header: header_index,
          selected: false,
          selected_cells: []
        }
      }));
    },
    handle_header_click: (col, editable) => {
      state.update((s) => ({
        ...s,
        ui_state: {
          ...s.ui_state,
          active_cell_menu: null,
          active_header_menu: null,
          selected: false,
          selected_cells: [],
          selected_header: col,
          header_edit: editable ? col : false
        }
      }));
    },
    end_header_edit: (key) => {
      if (key === "Escape" || key === "Enter" || key === "Tab") {
        state.update((s) => ({
          ...s,
          ui_state: {
            ...s.ui_state,
            selected: false,
            header_edit: false
          }
        }));
      }
    },
    trigger_change: async (data, headers, previous_data, previous_headers, value_is_output, dispatch) => {
      const current_state = get(state);
      if (current_state.current_search_query)
        return;
      const current_headers = headers.map((h) => h.value);
      const current_data = data.map(
        (row) => row.map((cell) => String(cell.value))
      );
      if (!dequal(current_data, previous_data) || !dequal(current_headers, previous_headers)) {
        if (!dequal(current_headers, previous_headers)) {
          reset_sort_state();
        }
        dispatch("change", {
          data: data.map((row) => row.map((cell) => cell.value)),
          headers: headers.map((h) => h.value),
          metadata: null
        });
        if (!value_is_output) {
          dispatch("input");
        }
      }
    },
    get_selected_cells: () => {
      const current_state = get(state);
      return current_state.ui_state.selected_cells;
    },
    get_active_cell_menu: () => {
      const current_state = get(state);
      return current_state.ui_state.active_cell_menu;
    },
    get_active_button: () => {
      const current_state = get(state);
      return current_state.ui_state.active_button;
    },
    set_active_button: (button) => {
      state.update((s) => ({
        ...s,
        ui_state: { ...s.ui_state, active_button: button }
      }));
    },
    reset_sort_state
  };
}
function create_dataframe_context(config) {
  const instance_id = Symbol(
    `dataframe_${Math.random().toString(36).substring(2)}`
  );
  const state = writable({
    config,
    current_search_query: null,
    sort_state: {
      sort_columns: [],
      row_order: []
    },
    ui_state: {
      active_cell_menu: null,
      active_header_menu: null,
      selected_cells: [],
      selected: false,
      editing: false,
      header_edit: false,
      selected_header: false,
      active_button: null
    }
  });
  const actions = create_actions(state);
  const context = { state, actions };
  setContext(instance_id, context);
  setContext(DATAFRAME_KEY, { instance_id, context });
  return context;
}
function create_fragment$f(ctx) {
  let button;
  let span;
  let svg;
  let path;
  let span_class_value;
  let button_class_value;
  let button_aria_label_value;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      span = element("span");
      svg = svg_element("svg");
      path = svg_element("path");
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", { class: true, "aria-label": true });
      var button_nodes = children(button);
      span = claim_element(button_nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      svg = claim_svg_element(span_nodes, "svg", { xmlns: true, viewBox: true, class: true });
      var svg_nodes = children(svg);
      path = claim_svg_element(svg_nodes, "path", { d: true, "data-name": true });
      children(path).forEach(detach);
      svg_nodes.forEach(detach);
      span_nodes.forEach(detach);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path, "d", "m16.707 13.293-4-4a1 1 0 0 0-1.414 0l-4 4A1 1 0 0 0 8 15h8a1 1 0 0 0 .707-1.707z");
      attr(
        path,
        "data-name",
        /*direction*/
        ctx[3]
      );
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "class", "svelte-1mp8yw1");
      attr(span, "class", span_class_value = null_to_empty(
        /*direction*/
        ctx[3]
      ) + " svelte-1mp8yw1");
      attr(button, "class", button_class_value = "selection-button selection-button-" + /*position*/
      ctx[0] + " " + /*is_first_position*/
      (ctx[2] ? `move-${/*direction*/
      ctx[3]}` : "") + " svelte-1mp8yw1");
      attr(button, "aria-label", button_aria_label_value = `Select ${/*position*/
      ctx[0]}`);
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      append_hydration(button, span);
      append_hydration(span, svg);
      append_hydration(svg, path);
      if (!mounted) {
        dispose = listen(button, "click", stop_propagation(
          /*click_handler*/
          ctx[5]
        ));
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*direction*/
      8) {
        attr(
          path,
          "data-name",
          /*direction*/
          ctx2[3]
        );
      }
      if (dirty & /*direction*/
      8 && span_class_value !== (span_class_value = null_to_empty(
        /*direction*/
        ctx2[3]
      ) + " svelte-1mp8yw1")) {
        attr(span, "class", span_class_value);
      }
      if (dirty & /*position, is_first_position, direction*/
      13 && button_class_value !== (button_class_value = "selection-button selection-button-" + /*position*/
      ctx2[0] + " " + /*is_first_position*/
      (ctx2[2] ? `move-${/*direction*/
      ctx2[3]}` : "") + " svelte-1mp8yw1")) {
        attr(button, "class", button_class_value);
      }
      if (dirty & /*position*/
      1 && button_aria_label_value !== (button_aria_label_value = `Select ${/*position*/
      ctx2[0]}`)) {
        attr(button, "aria-label", button_aria_label_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function instance$e($$self, $$props, $$invalidate) {
  let is_first_position;
  let direction;
  let { position } = $$props;
  let { coords } = $$props;
  let { on_click = null } = $$props;
  const click_handler = () => on_click && on_click();
  $$self.$$set = ($$props2) => {
    if ("position" in $$props2)
      $$invalidate(0, position = $$props2.position);
    if ("coords" in $$props2)
      $$invalidate(4, coords = $$props2.coords);
    if ("on_click" in $$props2)
      $$invalidate(1, on_click = $$props2.on_click);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*position, coords*/
    17) {
      $$invalidate(2, is_first_position = position === "column" ? coords[0] === 0 : coords[1] === 0);
    }
    if ($$self.$$.dirty & /*position, is_first_position*/
    5) {
      $$invalidate(3, direction = position === "column" ? is_first_position ? "down" : "up" : is_first_position ? "right" : "left");
    }
  };
  return [position, on_click, is_first_position, direction, coords, click_handler];
}
class SelectionButtons extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$e, create_fragment$f, safe_not_equal, { position: 0, coords: 4, on_click: 1 });
  }
}
function create_if_block_4$5(ctx) {
  let input;
  let input_aria_label_value;
  let mounted;
  let dispose;
  return {
    c() {
      input = element("input");
      this.h();
    },
    l(nodes) {
      input = claim_element(nodes, "INPUT", {
        "aria-readonly": true,
        role: true,
        "aria-label": true,
        tabindex: true,
        class: true
      });
      this.h();
    },
    h() {
      input.readOnly = /*is_static*/
      ctx[8];
      attr(
        input,
        "aria-readonly",
        /*is_static*/
        ctx[8]
      );
      attr(input, "role", "textbox");
      attr(input, "aria-label", input_aria_label_value = /*is_static*/
      ctx[8] ? "Cell is read-only" : "Edit cell");
      attr(input, "tabindex", "-1");
      attr(input, "class", "svelte-17c88wb");
      toggle_class(
        input,
        "header",
        /*header*/
        ctx[3]
      );
    },
    m(target, anchor) {
      insert_hydration(target, input, anchor);
      ctx[34](input);
      set_input_value(
        input,
        /*_value*/
        ctx[19]
      );
      if (!mounted) {
        dispose = [
          listen(
            input,
            "input",
            /*input_input_handler*/
            ctx[35]
          ),
          listen(
            input,
            "blur",
            /*handle_blur*/
            ctx[22]
          ),
          listen(input, "mousedown", stop_propagation(
            /*mousedown_handler*/
            ctx[31]
          )),
          listen(input, "mouseup", stop_propagation(
            /*mouseup_handler*/
            ctx[32]
          )),
          listen(input, "click", stop_propagation(
            /*click_handler*/
            ctx[33]
          )),
          action_destroyer(
            /*use_focus*/
            ctx[21].call(null, input)
          ),
          listen(
            input,
            "keydown",
            /*handle_keydown*/
            ctx[23]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*is_static*/
      256) {
        input.readOnly = /*is_static*/
        ctx2[8];
      }
      if (dirty[0] & /*is_static*/
      256) {
        attr(
          input,
          "aria-readonly",
          /*is_static*/
          ctx2[8]
        );
      }
      if (dirty[0] & /*is_static*/
      256 && input_aria_label_value !== (input_aria_label_value = /*is_static*/
      ctx2[8] ? "Cell is read-only" : "Edit cell")) {
        attr(input, "aria-label", input_aria_label_value);
      }
      if (dirty[0] & /*_value*/
      524288 && input.value !== /*_value*/
      ctx2[19]) {
        set_input_value(
          input,
          /*_value*/
          ctx2[19]
        );
      }
      if (dirty[0] & /*header*/
      8) {
        toggle_class(
          input,
          "header",
          /*header*/
          ctx2[3]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(input);
      }
      ctx[34](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_else_block$3(ctx) {
  let t;
  return {
    c() {
      t = text(
        /*display_text*/
        ctx[20]
      );
    },
    l(nodes) {
      t = claim_text(
        nodes,
        /*display_text*/
        ctx[20]
      );
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*display_text*/
      1048576)
        set_data(
          t,
          /*display_text*/
          ctx2[20]
        );
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_if_block_3$5(ctx) {
  let markdowncode;
  let current;
  markdowncode = new MarkdownCode({
    props: {
      message: (
        /*display_text*/
        ctx[20].toLocaleString()
      ),
      latex_delimiters: (
        /*latex_delimiters*/
        ctx[5]
      ),
      line_breaks: (
        /*line_breaks*/
        ctx[6]
      ),
      chatbot: false,
      root: (
        /*root*/
        ctx[9]
      )
    }
  });
  return {
    c() {
      create_component(markdowncode.$$.fragment);
    },
    l(nodes) {
      claim_component(markdowncode.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(markdowncode, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const markdowncode_changes = {};
      if (dirty[0] & /*display_text*/
      1048576)
        markdowncode_changes.message = /*display_text*/
        ctx2[20].toLocaleString();
      if (dirty[0] & /*latex_delimiters*/
      32)
        markdowncode_changes.latex_delimiters = /*latex_delimiters*/
        ctx2[5];
      if (dirty[0] & /*line_breaks*/
      64)
        markdowncode_changes.line_breaks = /*line_breaks*/
        ctx2[6];
      if (dirty[0] & /*root*/
      512)
        markdowncode_changes.root = /*root*/
        ctx2[9];
      markdowncode.$set(markdowncode_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(markdowncode.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(markdowncode.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(markdowncode, detaching);
    }
  };
}
function create_if_block_2$5(ctx) {
  let html_tag;
  let html_anchor;
  return {
    c() {
      html_tag = new HtmlTagHydration(false);
      html_anchor = empty();
      this.h();
    },
    l(nodes) {
      html_tag = claim_html_tag(nodes, false);
      html_anchor = empty();
      this.h();
    },
    h() {
      html_tag.a = html_anchor;
    },
    m(target, anchor) {
      html_tag.m(
        /*display_text*/
        ctx[20],
        target,
        anchor
      );
      insert_hydration(target, html_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*display_text*/
      1048576)
        html_tag.p(
          /*display_text*/
          ctx2[20]
        );
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(html_anchor);
        html_tag.d();
      }
    }
  };
}
function create_if_block_1$5(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value = (
    /*components*/
    ctx[11].image
  );
  function switch_props(ctx2, dirty) {
    return {
      props: {
        value: { url: (
          /*display_text*/
          ctx2[20]
        ) },
        show_label: false,
        label: "cell-image",
        show_download_button: false,
        i18n: (
          /*i18n*/
          ctx2[12]
        ),
        gradio: { dispatch: func }
      }
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l(nodes) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert_hydration(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*components*/
      2048 && switch_value !== (switch_value = /*components*/
      ctx2[11].image)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        const switch_instance_changes = {};
        if (dirty[0] & /*display_text*/
        1048576)
          switch_instance_changes.value = { url: (
            /*display_text*/
            ctx2[20]
          ) };
        if (dirty[0] & /*i18n*/
        4096)
          switch_instance_changes.i18n = /*i18n*/
          ctx2[12];
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(switch_instance_anchor);
      }
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_if_block$8(ctx) {
  let selectionbuttons0;
  let t;
  let selectionbuttons1;
  let current;
  selectionbuttons0 = new SelectionButtons({
    props: {
      position: "column",
      coords: (
        /*coords*/
        ctx[15]
      ),
      on_click: (
        /*func_1*/
        ctx[36]
      )
    }
  });
  selectionbuttons1 = new SelectionButtons({
    props: {
      position: "row",
      coords: (
        /*coords*/
        ctx[15]
      ),
      on_click: (
        /*func_2*/
        ctx[37]
      )
    }
  });
  return {
    c() {
      create_component(selectionbuttons0.$$.fragment);
      t = space();
      create_component(selectionbuttons1.$$.fragment);
    },
    l(nodes) {
      claim_component(selectionbuttons0.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(selectionbuttons1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(selectionbuttons0, target, anchor);
      insert_hydration(target, t, anchor);
      mount_component(selectionbuttons1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const selectionbuttons0_changes = {};
      if (dirty[0] & /*coords*/
      32768)
        selectionbuttons0_changes.coords = /*coords*/
        ctx2[15];
      if (dirty[0] & /*on_select_column, coords*/
      98304)
        selectionbuttons0_changes.on_click = /*func_1*/
        ctx2[36];
      selectionbuttons0.$set(selectionbuttons0_changes);
      const selectionbuttons1_changes = {};
      if (dirty[0] & /*coords*/
      32768)
        selectionbuttons1_changes.coords = /*coords*/
        ctx2[15];
      if (dirty[0] & /*on_select_row, coords*/
      163840)
        selectionbuttons1_changes.on_click = /*func_2*/
        ctx2[37];
      selectionbuttons1.$set(selectionbuttons1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(selectionbuttons0.$$.fragment, local);
      transition_in(selectionbuttons1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(selectionbuttons0.$$.fragment, local);
      transition_out(selectionbuttons1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      destroy_component(selectionbuttons0, detaching);
      destroy_component(selectionbuttons1, detaching);
    }
  };
}
function create_fragment$e(ctx) {
  let t0;
  let span;
  let current_block_type_index;
  let if_block1;
  let t1;
  let if_block2_anchor;
  let current;
  let mounted;
  let dispose;
  let if_block0 = (
    /*edit*/
    ctx[1] && create_if_block_4$5(ctx)
  );
  const if_block_creators = [create_if_block_1$5, create_if_block_2$5, create_if_block_3$5, create_else_block$3];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*datatype*/
      ctx2[4] === "image" && /*components*/
      ctx2[11].image
    )
      return 0;
    if (
      /*datatype*/
      ctx2[4] === "html"
    )
      return 1;
    if (
      /*datatype*/
      ctx2[4] === "markdown"
    )
      return 2;
    return 3;
  }
  current_block_type_index = select_block_type(ctx);
  if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  let if_block2 = (
    /*show_selection_buttons*/
    ctx[14] && /*coords*/
    ctx[15] && /*on_select_column*/
    ctx[16] && /*on_select_row*/
    ctx[17] && create_if_block$8(ctx)
  );
  return {
    c() {
      if (if_block0)
        if_block0.c();
      t0 = space();
      span = element("span");
      if_block1.c();
      t1 = space();
      if (if_block2)
        if_block2.c();
      if_block2_anchor = empty();
      this.h();
    },
    l(nodes) {
      if (if_block0)
        if_block0.l(nodes);
      t0 = claim_space(nodes);
      span = claim_element(nodes, "SPAN", {
        tabindex: true,
        role: true,
        style: true,
        "data-editable": true,
        "data-max-chars": true,
        "data-expanded": true,
        placeholder: true,
        class: true
      });
      var span_nodes = children(span);
      if_block1.l(span_nodes);
      span_nodes.forEach(detach);
      t1 = claim_space(nodes);
      if (if_block2)
        if_block2.l(nodes);
      if_block2_anchor = empty();
      this.h();
    },
    h() {
      attr(span, "tabindex", "0");
      attr(span, "role", "button");
      attr(
        span,
        "style",
        /*styling*/
        ctx[2]
      );
      attr(
        span,
        "data-editable",
        /*editable*/
        ctx[7]
      );
      attr(
        span,
        "data-max-chars",
        /*max_chars*/
        ctx[10]
      );
      attr(
        span,
        "data-expanded",
        /*is_expanded*/
        ctx[18]
      );
      attr(span, "placeholder", " ");
      attr(span, "class", "svelte-17c88wb");
      toggle_class(
        span,
        "dragging",
        /*is_dragging*/
        ctx[13]
      );
      toggle_class(
        span,
        "edit",
        /*edit*/
        ctx[1]
      );
      toggle_class(
        span,
        "expanded",
        /*is_expanded*/
        ctx[18]
      );
      toggle_class(
        span,
        "multiline",
        /*header*/
        ctx[3]
      );
      toggle_class(
        span,
        "text",
        /*datatype*/
        ctx[4] === "str"
      );
    },
    m(target, anchor) {
      if (if_block0)
        if_block0.m(target, anchor);
      insert_hydration(target, t0, anchor);
      insert_hydration(target, span, anchor);
      if_blocks[current_block_type_index].m(span, null);
      insert_hydration(target, t1, anchor);
      if (if_block2)
        if_block2.m(target, anchor);
      insert_hydration(target, if_block2_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            span,
            "click",
            /*handle_click*/
            ctx[24]
          ),
          listen(
            span,
            "keydown",
            /*handle_keydown*/
            ctx[23]
          ),
          listen(span, "focus", prevent_default(
            /*focus_handler*/
            ctx[30]
          ))
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (
        /*edit*/
        ctx2[1]
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_4$5(ctx2);
          if_block0.c();
          if_block0.m(t0.parentNode, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block1 = if_blocks[current_block_type_index];
        if (!if_block1) {
          if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block1.c();
        } else {
          if_block1.p(ctx2, dirty);
        }
        transition_in(if_block1, 1);
        if_block1.m(span, null);
      }
      if (!current || dirty[0] & /*styling*/
      4) {
        attr(
          span,
          "style",
          /*styling*/
          ctx2[2]
        );
      }
      if (!current || dirty[0] & /*editable*/
      128) {
        attr(
          span,
          "data-editable",
          /*editable*/
          ctx2[7]
        );
      }
      if (!current || dirty[0] & /*max_chars*/
      1024) {
        attr(
          span,
          "data-max-chars",
          /*max_chars*/
          ctx2[10]
        );
      }
      if (!current || dirty[0] & /*is_expanded*/
      262144) {
        attr(
          span,
          "data-expanded",
          /*is_expanded*/
          ctx2[18]
        );
      }
      if (!current || dirty[0] & /*is_dragging*/
      8192) {
        toggle_class(
          span,
          "dragging",
          /*is_dragging*/
          ctx2[13]
        );
      }
      if (!current || dirty[0] & /*edit*/
      2) {
        toggle_class(
          span,
          "edit",
          /*edit*/
          ctx2[1]
        );
      }
      if (!current || dirty[0] & /*is_expanded*/
      262144) {
        toggle_class(
          span,
          "expanded",
          /*is_expanded*/
          ctx2[18]
        );
      }
      if (!current || dirty[0] & /*header*/
      8) {
        toggle_class(
          span,
          "multiline",
          /*header*/
          ctx2[3]
        );
      }
      if (!current || dirty[0] & /*datatype*/
      16) {
        toggle_class(
          span,
          "text",
          /*datatype*/
          ctx2[4] === "str"
        );
      }
      if (
        /*show_selection_buttons*/
        ctx2[14] && /*coords*/
        ctx2[15] && /*on_select_column*/
        ctx2[16] && /*on_select_row*/
        ctx2[17]
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
          if (dirty[0] & /*show_selection_buttons, coords, on_select_column, on_select_row*/
          245760) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block$8(ctx2);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block1);
      transition_in(if_block2);
      current = true;
    },
    o(local) {
      transition_out(if_block1);
      transition_out(if_block2);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(span);
        detach(t1);
        detach(if_block2_anchor);
      }
      if (if_block0)
        if_block0.d(detaching);
      if_blocks[current_block_type_index].d();
      if (if_block2)
        if_block2.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function truncate_text(text2, max_length = null, is_image = false) {
  if (is_image)
    return String(text2);
  const str = String(text2);
  if (!max_length || max_length <= 0)
    return str;
  if (str.length <= max_length)
    return str;
  return str.slice(0, max_length) + "...";
}
const func = () => {
};
function instance$d($$self, $$props, $$invalidate) {
  let _value;
  let should_truncate;
  let display_content;
  let display_text;
  let { edit } = $$props;
  let { value = "" } = $$props;
  let { display_value = null } = $$props;
  let { styling = "" } = $$props;
  let { header = false } = $$props;
  let { datatype = "str" } = $$props;
  let { latex_delimiters } = $$props;
  let { clear_on_focus = false } = $$props;
  let { line_breaks = true } = $$props;
  let { editable = true } = $$props;
  let { is_static = false } = $$props;
  let { root } = $$props;
  let { max_chars = null } = $$props;
  let { components = {} } = $$props;
  let { i18n } = $$props;
  let { is_dragging = false } = $$props;
  let { show_selection_buttons = false } = $$props;
  let { coords = null } = $$props;
  let { on_select_column = null } = $$props;
  let { on_select_row = null } = $$props;
  const dispatch = createEventDispatcher();
  let is_expanded = false;
  let { el } = $$props;
  function use_focus(node) {
    if (clear_on_focus) {
      $$invalidate(19, _value = "");
    }
    requestAnimationFrame(() => {
      node.focus();
    });
    return {};
  }
  function handle_blur({ currentTarget }) {
    $$invalidate(25, value = currentTarget.value);
    dispatch("blur");
  }
  function handle_keydown2(event) {
    if (event.key === "Enter") {
      if (edit) {
        $$invalidate(25, value = _value);
        dispatch("blur");
      } else if (!header) {
        $$invalidate(18, is_expanded = !is_expanded);
      }
    }
    dispatch("keydown", event);
  }
  function handle_click() {
    if (!edit && !header) {
      $$invalidate(18, is_expanded = !is_expanded);
    }
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler2(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function input_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      el = $$value;
      $$invalidate(0, el);
    });
  }
  function input_input_handler() {
    _value = this.value;
    $$invalidate(19, _value), $$invalidate(25, value);
  }
  const func_1 = () => on_select_column(coords[1]);
  const func_2 = () => on_select_row(coords[0]);
  $$self.$$set = ($$props2) => {
    if ("edit" in $$props2)
      $$invalidate(1, edit = $$props2.edit);
    if ("value" in $$props2)
      $$invalidate(25, value = $$props2.value);
    if ("display_value" in $$props2)
      $$invalidate(26, display_value = $$props2.display_value);
    if ("styling" in $$props2)
      $$invalidate(2, styling = $$props2.styling);
    if ("header" in $$props2)
      $$invalidate(3, header = $$props2.header);
    if ("datatype" in $$props2)
      $$invalidate(4, datatype = $$props2.datatype);
    if ("latex_delimiters" in $$props2)
      $$invalidate(5, latex_delimiters = $$props2.latex_delimiters);
    if ("clear_on_focus" in $$props2)
      $$invalidate(27, clear_on_focus = $$props2.clear_on_focus);
    if ("line_breaks" in $$props2)
      $$invalidate(6, line_breaks = $$props2.line_breaks);
    if ("editable" in $$props2)
      $$invalidate(7, editable = $$props2.editable);
    if ("is_static" in $$props2)
      $$invalidate(8, is_static = $$props2.is_static);
    if ("root" in $$props2)
      $$invalidate(9, root = $$props2.root);
    if ("max_chars" in $$props2)
      $$invalidate(10, max_chars = $$props2.max_chars);
    if ("components" in $$props2)
      $$invalidate(11, components = $$props2.components);
    if ("i18n" in $$props2)
      $$invalidate(12, i18n = $$props2.i18n);
    if ("is_dragging" in $$props2)
      $$invalidate(13, is_dragging = $$props2.is_dragging);
    if ("show_selection_buttons" in $$props2)
      $$invalidate(14, show_selection_buttons = $$props2.show_selection_buttons);
    if ("coords" in $$props2)
      $$invalidate(15, coords = $$props2.coords);
    if ("on_select_column" in $$props2)
      $$invalidate(16, on_select_column = $$props2.on_select_column);
    if ("on_select_row" in $$props2)
      $$invalidate(17, on_select_row = $$props2.on_select_row);
    if ("el" in $$props2)
      $$invalidate(0, el = $$props2.el);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*value*/
    33554432) {
      $$invalidate(19, _value = value);
    }
    if ($$self.$$.dirty[0] & /*edit, is_expanded, max_chars*/
    263170) {
      $$invalidate(29, should_truncate = !edit && !is_expanded && max_chars !== null && max_chars > 0);
    }
    if ($$self.$$.dirty[0] & /*editable, value, display_value*/
    100663424) {
      $$invalidate(28, display_content = editable ? value : display_value !== null ? display_value : value);
    }
    if ($$self.$$.dirty[0] & /*should_truncate, display_content, max_chars, datatype*/
    805307408) {
      $$invalidate(20, display_text = should_truncate ? truncate_text(display_content, max_chars, datatype === "image") : display_content);
    }
  };
  return [
    el,
    edit,
    styling,
    header,
    datatype,
    latex_delimiters,
    line_breaks,
    editable,
    is_static,
    root,
    max_chars,
    components,
    i18n,
    is_dragging,
    show_selection_buttons,
    coords,
    on_select_column,
    on_select_row,
    is_expanded,
    _value,
    display_text,
    use_focus,
    handle_blur,
    handle_keydown2,
    handle_click,
    value,
    display_value,
    clear_on_focus,
    display_content,
    should_truncate,
    focus_handler,
    mousedown_handler2,
    mouseup_handler,
    click_handler,
    input_binding,
    input_input_handler,
    func_1,
    func_2
  ];
}
class EditableCell extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance$d,
      create_fragment$e,
      safe_not_equal,
      {
        edit: 1,
        value: 25,
        display_value: 26,
        styling: 2,
        header: 3,
        datatype: 4,
        latex_delimiters: 5,
        clear_on_focus: 27,
        line_breaks: 6,
        editable: 7,
        is_static: 8,
        root: 9,
        max_chars: 10,
        components: 11,
        i18n: 12,
        is_dragging: 13,
        show_selection_buttons: 14,
        coords: 15,
        on_select_column: 16,
        on_select_row: 17,
        el: 0
      },
      null,
      [-1, -1]
    );
  }
}
function create_else_block$2(ctx) {
  let td;
  let t_value = (
    /*index*/
    (ctx[0] !== null ? (
      /*index*/
      ctx[0] + 1
    ) : "") + ""
  );
  let t;
  return {
    c() {
      td = element("td");
      t = text(t_value);
      this.h();
    },
    l(nodes) {
      td = claim_element(nodes, "TD", {
        class: true,
        tabindex: true,
        "data-row": true,
        "data-col": true
      });
      var td_nodes = children(td);
      t = claim_text(td_nodes, t_value);
      td_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(td, "class", "row-number svelte-l87gn2");
      attr(td, "tabindex", "-1");
      attr(
        td,
        "data-row",
        /*index*/
        ctx[0]
      );
      attr(td, "data-col", "row-number");
    },
    m(target, anchor) {
      insert_hydration(target, td, anchor);
      append_hydration(td, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*index*/
      1 && t_value !== (t_value = /*index*/
      (ctx2[0] !== null ? (
        /*index*/
        ctx2[0] + 1
      ) : "") + ""))
        set_data(t, t_value);
      if (dirty & /*index*/
      1) {
        attr(
          td,
          "data-row",
          /*index*/
          ctx2[0]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(td);
      }
    }
  };
}
function create_if_block$7(ctx) {
  let th;
  let textContent = `<div class="cell-wrap"><div class="header-content"><div class="header-text"></div></div></div>`;
  return {
    c() {
      th = element("th");
      th.innerHTML = textContent;
      this.h();
    },
    l(nodes) {
      th = claim_element(nodes, "TH", {
        tabindex: true,
        class: true,
        ["data-svelte-h"]: true
      });
      if (get_svelte_dataset(th) !== "svelte-1aj56zf")
        th.innerHTML = textContent;
      this.h();
    },
    h() {
      attr(th, "tabindex", "-1");
      attr(th, "class", "row-number svelte-l87gn2");
    },
    m(target, anchor) {
      insert_hydration(target, th, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(th);
      }
    }
  };
}
function create_fragment$d(ctx) {
  let if_block_anchor;
  function select_block_type(ctx2, dirty) {
    if (
      /*is_header*/
      ctx2[1]
    )
      return create_if_block$7;
    return create_else_block$2;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
    },
    p(ctx2, [dirty]) {
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if_block.d(detaching);
    }
  };
}
function instance$c($$self, $$props, $$invalidate) {
  let { index = null } = $$props;
  let { is_header = false } = $$props;
  $$self.$$set = ($$props2) => {
    if ("index" in $$props2)
      $$invalidate(0, index = $$props2.index);
    if ("is_header" in $$props2)
      $$invalidate(1, is_header = $$props2.is_header);
  };
  return [index, is_header];
}
class RowNumber extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$c, create_fragment$d, safe_not_equal, { index: 0, is_header: 1 });
  }
}
function create_fragment$c(ctx) {
  let button;
  let textContent = "⋮";
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = textContent;
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", {
        "aria-label": true,
        class: true,
        "aria-haspopup": true,
        ["data-svelte-h"]: true
      });
      if (get_svelte_dataset(button) !== "svelte-qulk5p")
        button.textContent = textContent;
      this.h();
    },
    h() {
      attr(button, "aria-label", "Open cell menu");
      attr(button, "class", "cell-menu-button svelte-vt38nd");
      attr(button, "aria-haspopup", "menu");
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      if (!mounted) {
        dispose = [
          listen(button, "click", function() {
            if (is_function(
              /*on_click*/
              ctx[0]
            ))
              ctx[0].apply(this, arguments);
          }),
          listen(
            button,
            "touchstart",
            /*touchstart_handler*/
            ctx[1]
          )
        ];
        mounted = true;
      }
    },
    p(new_ctx, [dirty]) {
      ctx = new_ctx;
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$b($$self, $$props, $$invalidate) {
  let { on_click } = $$props;
  const touchstart_handler = (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    const mouseEvent = new MouseEvent(
      "click",
      {
        clientX: touch.clientX,
        clientY: touch.clientY,
        bubbles: true,
        cancelable: true,
        view: window
      }
    );
    on_click(mouseEvent);
  };
  $$self.$$set = ($$props2) => {
    if ("on_click" in $$props2)
      $$invalidate(0, on_click = $$props2.on_click);
  };
  return [on_click, touchstart_handler];
}
class CellMenuButton extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$b, create_fragment$c, safe_not_equal, { on_click: 0 });
  }
}
function create_fragment$b(ctx) {
  let div;
  let textContent = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
  return {
    c() {
      div = element("div");
      div.innerHTML = textContent;
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true,
        "aria-label": true,
        ["data-svelte-h"]: true
      });
      if (get_svelte_dataset(div) !== "svelte-1ernod4")
        div.innerHTML = textContent;
      this.h();
    },
    h() {
      attr(div, "class", "wrapper svelte-1skchaw");
      attr(div, "aria-label", "Static column");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
class Padlock extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$b, safe_not_equal, {});
  }
}
function create_fragment$a(ctx) {
  let svg;
  let path0;
  let path1;
  return {
    c() {
      svg = svg_element("svg");
      path0 = svg_element("path");
      path1 = svg_element("path");
      this.h();
    },
    l(nodes) {
      svg = claim_svg_element(nodes, "svg", {
        width: true,
        height: true,
        viewBox: true,
        fill: true,
        xmlns: true
      });
      var svg_nodes = children(svg);
      path0 = claim_svg_element(svg_nodes, "path", {
        d: true,
        stroke: true,
        "stroke-width": true,
        "stroke-linecap": true,
        "stroke-linejoin": true
      });
      children(path0).forEach(detach);
      path1 = claim_svg_element(svg_nodes, "path", {
        d: true,
        stroke: true,
        "stroke-width": true,
        "stroke-linecap": true
      });
      children(path1).forEach(detach);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path0, "d", "M4 8L8 4L12 8");
      attr(path0, "stroke", "currentColor");
      attr(path0, "stroke-width", "1.5");
      attr(path0, "stroke-linecap", "round");
      attr(path0, "stroke-linejoin", "round");
      attr(path1, "d", "M8 4V12");
      attr(path1, "stroke", "currentColor");
      attr(path1, "stroke-width", "1.5");
      attr(path1, "stroke-linecap", "round");
      attr(
        svg,
        "width",
        /*size*/
        ctx[0]
      );
      attr(
        svg,
        "height",
        /*size*/
        ctx[0]
      );
      attr(svg, "viewBox", "0 0 16 16");
      attr(svg, "fill", "none");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      append_hydration(svg, path0);
      append_hydration(svg, path1);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*size*/
      1) {
        attr(
          svg,
          "width",
          /*size*/
          ctx2[0]
        );
      }
      if (dirty & /*size*/
      1) {
        attr(
          svg,
          "height",
          /*size*/
          ctx2[0]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
function instance$a($$self, $$props, $$invalidate) {
  let { size = 16 } = $$props;
  $$self.$$set = ($$props2) => {
    if ("size" in $$props2)
      $$invalidate(0, size = $$props2.size);
  };
  return [size];
}
class SortArrowUp extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$a, create_fragment$a, safe_not_equal, { size: 0 });
  }
}
function create_fragment$9(ctx) {
  let svg;
  let path0;
  let path1;
  return {
    c() {
      svg = svg_element("svg");
      path0 = svg_element("path");
      path1 = svg_element("path");
      this.h();
    },
    l(nodes) {
      svg = claim_svg_element(nodes, "svg", {
        width: true,
        height: true,
        viewBox: true,
        fill: true,
        xmlns: true
      });
      var svg_nodes = children(svg);
      path0 = claim_svg_element(svg_nodes, "path", {
        d: true,
        stroke: true,
        "stroke-width": true,
        "stroke-linecap": true,
        "stroke-linejoin": true
      });
      children(path0).forEach(detach);
      path1 = claim_svg_element(svg_nodes, "path", {
        d: true,
        stroke: true,
        "stroke-width": true,
        "stroke-linecap": true
      });
      children(path1).forEach(detach);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path0, "d", "M4 8L8 12L12 8");
      attr(path0, "stroke", "currentColor");
      attr(path0, "stroke-width", "1.5");
      attr(path0, "stroke-linecap", "round");
      attr(path0, "stroke-linejoin", "round");
      attr(path1, "d", "M8 12V4");
      attr(path1, "stroke", "currentColor");
      attr(path1, "stroke-width", "1.5");
      attr(path1, "stroke-linecap", "round");
      attr(
        svg,
        "width",
        /*size*/
        ctx[0]
      );
      attr(
        svg,
        "height",
        /*size*/
        ctx[0]
      );
      attr(svg, "viewBox", "0 0 16 16");
      attr(svg, "fill", "none");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      append_hydration(svg, path0);
      append_hydration(svg, path1);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*size*/
      1) {
        attr(
          svg,
          "width",
          /*size*/
          ctx2[0]
        );
      }
      if (dirty & /*size*/
      1) {
        attr(
          svg,
          "height",
          /*size*/
          ctx2[0]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
function instance$9($$self, $$props, $$invalidate) {
  let { size = 16 } = $$props;
  $$self.$$set = ($$props2) => {
    if ("size" in $$props2)
      $$invalidate(0, size = $$props2.size);
  };
  return [size];
}
class SortArrowDown extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$9, create_fragment$9, safe_not_equal, { size: 0 });
  }
}
function create_if_block_2$4(ctx) {
  let div;
  let span;
  let current_block_type_index;
  let if_block0;
  let t;
  let current;
  const if_block_creators = [create_if_block_4$4, create_else_block$1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*current_direction*/
      ctx2[21] === "asc"
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  let if_block1 = (
    /*sort_columns*/
    ctx[12].length > 1 && create_if_block_3$4(ctx)
  );
  return {
    c() {
      div = element("div");
      span = element("span");
      if_block0.c();
      t = space();
      if (if_block1)
        if_block1.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      span = claim_element(div_nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      if_block0.l(span_nodes);
      span_nodes.forEach(detach);
      t = claim_space(div_nodes);
      if (if_block1)
        if_block1.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "sort-arrow svelte-sy2j2s");
      attr(div, "class", "sort-indicators svelte-sy2j2s");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, span);
      if_blocks[current_block_type_index].m(span, null);
      append_hydration(div, t);
      if (if_block1)
        if_block1.m(div, null);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index !== previous_block_index) {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block0 = if_blocks[current_block_type_index];
        if (!if_block0) {
          if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block0.c();
        }
        transition_in(if_block0, 1);
        if_block0.m(span, null);
      }
      if (
        /*sort_columns*/
        ctx2[12].length > 1
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block_3$4(ctx2);
          if_block1.c();
          if_block1.m(div, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if_blocks[current_block_type_index].d();
      if (if_block1)
        if_block1.d();
    }
  };
}
function create_else_block$1(ctx) {
  let sortarrowdown;
  let current;
  sortarrowdown = new SortArrowDown({ props: { size: 12 } });
  return {
    c() {
      create_component(sortarrowdown.$$.fragment);
    },
    l(nodes) {
      claim_component(sortarrowdown.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(sortarrowdown, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(sortarrowdown.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(sortarrowdown.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(sortarrowdown, detaching);
    }
  };
}
function create_if_block_4$4(ctx) {
  let sortarrowup;
  let current;
  sortarrowup = new SortArrowUp({ props: { size: 12 } });
  return {
    c() {
      create_component(sortarrowup.$$.fragment);
    },
    l(nodes) {
      claim_component(sortarrowup.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(sortarrowup, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(sortarrowup.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(sortarrowup.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(sortarrowup, detaching);
    }
  };
}
function create_if_block_3$4(ctx) {
  let span;
  let t;
  return {
    c() {
      span = element("span");
      t = text(
        /*sort_priority*/
        ctx[22]
      );
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      t = claim_text(
        span_nodes,
        /*sort_priority*/
        ctx[22]
      );
      span_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "sort-priority svelte-sy2j2s");
    },
    m(target, anchor) {
      insert_hydration(target, span, anchor);
      append_hydration(span, t);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*sort_priority*/
      4194304)
        set_data(
          t,
          /*sort_priority*/
          ctx2[22]
        );
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_if_block_1$4(ctx) {
  let padlock;
  let current;
  padlock = new Padlock({});
  return {
    c() {
      create_component(padlock.$$.fragment);
    },
    l(nodes) {
      claim_component(padlock.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(padlock, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(padlock.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(padlock.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(padlock, detaching);
    }
  };
}
function create_if_block$6(ctx) {
  let cellmenubutton;
  let current;
  cellmenubutton = new CellMenuButton({ props: { on_click: (
    /*func*/
    ctx[30]
  ) } });
  return {
    c() {
      create_component(cellmenubutton.$$.fragment);
    },
    l(nodes) {
      claim_component(cellmenubutton.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(cellmenubutton, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const cellmenubutton_changes = {};
      if (dirty[0] & /*toggle_header_menu, i*/
      1028)
        cellmenubutton_changes.on_click = /*func*/
        ctx2[30];
      cellmenubutton.$set(cellmenubutton_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(cellmenubutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(cellmenubutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(cellmenubutton, detaching);
    }
  };
}
function create_fragment$8(ctx) {
  let th;
  let div1;
  let div0;
  let button;
  let editablecell;
  let updating_value;
  let updating_el;
  let t0;
  let t1;
  let t2;
  let th_aria_sort_value;
  let current;
  let mounted;
  let dispose;
  function editablecell_value_binding(value) {
    ctx[26](value);
  }
  function editablecell_el_binding(value) {
    ctx[27](value);
  }
  let editablecell_props = {
    max_chars: (
      /*max_chars*/
      ctx[15]
    ),
    latex_delimiters: (
      /*latex_delimiters*/
      ctx[13]
    ),
    line_breaks: (
      /*line_breaks*/
      ctx[14]
    ),
    edit: (
      /*header_edit*/
      ctx[4] === /*i*/
      ctx[2]
    ),
    header: true,
    root: (
      /*root*/
      ctx[16]
    ),
    editable: (
      /*editable*/
      ctx[17]
    ),
    is_static: (
      /*is_static*/
      ctx[19]
    ),
    i18n: (
      /*i18n*/
      ctx[18]
    )
  };
  if (
    /*value*/
    ctx[0] !== void 0
  ) {
    editablecell_props.value = /*value*/
    ctx[0];
  }
  if (
    /*el*/
    ctx[1] !== void 0
  ) {
    editablecell_props.el = /*el*/
    ctx[1];
  }
  editablecell = new EditableCell({ props: editablecell_props });
  binding_callbacks.push(() => bind(editablecell, "value", editablecell_value_binding));
  binding_callbacks.push(() => bind(editablecell, "el", editablecell_el_binding));
  editablecell.$on(
    "keydown",
    /*keydown_handler*/
    ctx[28]
  );
  let if_block0 = (
    /*sort_index*/
    ctx[20] !== -1 && create_if_block_2$4(ctx)
  );
  let if_block1 = (
    /*is_static*/
    ctx[19] && create_if_block_1$4()
  );
  let if_block2 = (
    /*can_add_columns*/
    ctx[23] && create_if_block$6(ctx)
  );
  return {
    c() {
      th = element("th");
      div1 = element("div");
      div0 = element("div");
      button = element("button");
      create_component(editablecell.$$.fragment);
      t0 = space();
      if (if_block0)
        if_block0.c();
      t1 = space();
      if (if_block1)
        if_block1.c();
      t2 = space();
      if (if_block2)
        if_block2.c();
      this.h();
    },
    l(nodes) {
      th = claim_element(nodes, "TH", {
        "aria-sort": true,
        style: true,
        title: true,
        class: true
      });
      var th_nodes = children(th);
      div1 = claim_element(th_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      button = claim_element(div0_nodes, "BUTTON", { class: true, title: true });
      var button_nodes = children(button);
      claim_component(editablecell.$$.fragment, button_nodes);
      t0 = claim_space(button_nodes);
      if (if_block0)
        if_block0.l(button_nodes);
      button_nodes.forEach(detach);
      t1 = claim_space(div0_nodes);
      if (if_block1)
        if_block1.l(div0_nodes);
      div0_nodes.forEach(detach);
      t2 = claim_space(div1_nodes);
      if (if_block2)
        if_block2.l(div1_nodes);
      div1_nodes.forEach(detach);
      th_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(button, "class", "header-button svelte-sy2j2s");
      attr(
        button,
        "title",
        /*value*/
        ctx[0]
      );
      attr(div0, "class", "header-content svelte-sy2j2s");
      attr(div1, "class", "cell-wrap svelte-sy2j2s");
      attr(th, "aria-sort", th_aria_sort_value = /*get_sort_status*/
      ctx[6](
        /*value*/
        ctx[0],
        /*headers*/
        ctx[7]
      ) === "none" ? "none" : (
        /*get_sort_status*/
        ctx[6](
          /*value*/
          ctx[0],
          /*headers*/
          ctx[7]
        ) === "asc" ? "ascending" : "descending"
      ));
      set_style(
        th,
        "width",
        /*get_cell_width*/
        ctx[8](
          /*i*/
          ctx[2]
        )
      );
      set_style(
        th,
        "left",
        /*get_header_position*/
        ctx[24](
          /*i*/
          ctx[2]
        )
      );
      attr(
        th,
        "title",
        /*value*/
        ctx[0]
      );
      attr(th, "class", "svelte-sy2j2s");
      toggle_class(
        th,
        "pinned-column",
        /*i*/
        ctx[2] < /*actual_pinned_columns*/
        ctx[3]
      );
      toggle_class(
        th,
        "last-pinned",
        /*i*/
        ctx[2] === /*actual_pinned_columns*/
        ctx[3] - 1
      );
      toggle_class(
        th,
        "focus",
        /*header_edit*/
        ctx[4] === /*i*/
        ctx[2] || /*selected_header*/
        ctx[5] === /*i*/
        ctx[2]
      );
      toggle_class(
        th,
        "sorted",
        /*sort_index*/
        ctx[20] !== -1
      );
    },
    m(target, anchor) {
      insert_hydration(target, th, anchor);
      append_hydration(th, div1);
      append_hydration(div1, div0);
      append_hydration(div0, button);
      mount_component(editablecell, button, null);
      append_hydration(button, t0);
      if (if_block0)
        if_block0.m(button, null);
      append_hydration(div0, t1);
      if (if_block1)
        if_block1.m(div0, null);
      append_hydration(div1, t2);
      if (if_block2)
        if_block2.m(div1, null);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            button,
            "click",
            /*click_handler*/
            ctx[29]
          ),
          listen(button, "mousedown", mousedown_handler),
          listen(
            th,
            "click",
            /*click_handler_1*/
            ctx[31]
          ),
          listen(th, "mousedown", mousedown_handler_1)
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      const editablecell_changes = {};
      if (dirty[0] & /*max_chars*/
      32768)
        editablecell_changes.max_chars = /*max_chars*/
        ctx2[15];
      if (dirty[0] & /*latex_delimiters*/
      8192)
        editablecell_changes.latex_delimiters = /*latex_delimiters*/
        ctx2[13];
      if (dirty[0] & /*line_breaks*/
      16384)
        editablecell_changes.line_breaks = /*line_breaks*/
        ctx2[14];
      if (dirty[0] & /*header_edit, i*/
      20)
        editablecell_changes.edit = /*header_edit*/
        ctx2[4] === /*i*/
        ctx2[2];
      if (dirty[0] & /*root*/
      65536)
        editablecell_changes.root = /*root*/
        ctx2[16];
      if (dirty[0] & /*editable*/
      131072)
        editablecell_changes.editable = /*editable*/
        ctx2[17];
      if (dirty[0] & /*is_static*/
      524288)
        editablecell_changes.is_static = /*is_static*/
        ctx2[19];
      if (dirty[0] & /*i18n*/
      262144)
        editablecell_changes.i18n = /*i18n*/
        ctx2[18];
      if (!updating_value && dirty[0] & /*value*/
      1) {
        updating_value = true;
        editablecell_changes.value = /*value*/
        ctx2[0];
        add_flush_callback(() => updating_value = false);
      }
      if (!updating_el && dirty[0] & /*el*/
      2) {
        updating_el = true;
        editablecell_changes.el = /*el*/
        ctx2[1];
        add_flush_callback(() => updating_el = false);
      }
      editablecell.$set(editablecell_changes);
      if (
        /*sort_index*/
        ctx2[20] !== -1
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty[0] & /*sort_index*/
          1048576) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_2$4(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(button, null);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (!current || dirty[0] & /*value*/
      1) {
        attr(
          button,
          "title",
          /*value*/
          ctx2[0]
        );
      }
      if (
        /*is_static*/
        ctx2[19]
      ) {
        if (if_block1) {
          if (dirty[0] & /*is_static*/
          524288) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_1$4();
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div0, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (
        /*can_add_columns*/
        ctx2[23]
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
          if (dirty[0] & /*can_add_columns*/
          8388608) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block$6(ctx2);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(div1, null);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
      if (!current || dirty[0] & /*get_sort_status, value, headers*/
      193 && th_aria_sort_value !== (th_aria_sort_value = /*get_sort_status*/
      ctx2[6](
        /*value*/
        ctx2[0],
        /*headers*/
        ctx2[7]
      ) === "none" ? "none" : (
        /*get_sort_status*/
        ctx2[6](
          /*value*/
          ctx2[0],
          /*headers*/
          ctx2[7]
        ) === "asc" ? "ascending" : "descending"
      ))) {
        attr(th, "aria-sort", th_aria_sort_value);
      }
      if (!current || dirty[0] & /*get_cell_width, i*/
      260) {
        set_style(
          th,
          "width",
          /*get_cell_width*/
          ctx2[8](
            /*i*/
            ctx2[2]
          )
        );
      }
      if (!current || dirty[0] & /*i*/
      4) {
        set_style(
          th,
          "left",
          /*get_header_position*/
          ctx2[24](
            /*i*/
            ctx2[2]
          )
        );
      }
      if (!current || dirty[0] & /*value*/
      1) {
        attr(
          th,
          "title",
          /*value*/
          ctx2[0]
        );
      }
      if (!current || dirty[0] & /*i, actual_pinned_columns*/
      12) {
        toggle_class(
          th,
          "pinned-column",
          /*i*/
          ctx2[2] < /*actual_pinned_columns*/
          ctx2[3]
        );
      }
      if (!current || dirty[0] & /*i, actual_pinned_columns*/
      12) {
        toggle_class(
          th,
          "last-pinned",
          /*i*/
          ctx2[2] === /*actual_pinned_columns*/
          ctx2[3] - 1
        );
      }
      if (!current || dirty[0] & /*header_edit, i, selected_header*/
      52) {
        toggle_class(
          th,
          "focus",
          /*header_edit*/
          ctx2[4] === /*i*/
          ctx2[2] || /*selected_header*/
          ctx2[5] === /*i*/
          ctx2[2]
        );
      }
      if (!current || dirty[0] & /*sort_index*/
      1048576) {
        toggle_class(
          th,
          "sorted",
          /*sort_index*/
          ctx2[20] !== -1
        );
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(editablecell.$$.fragment, local);
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(if_block2);
      current = true;
    },
    o(local) {
      transition_out(editablecell.$$.fragment, local);
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(if_block2);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(th);
      }
      destroy_component(editablecell);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      if (if_block2)
        if_block2.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
const mousedown_handler = (event) => {
  event.preventDefault();
  event.stopPropagation();
};
const mousedown_handler_1 = (event) => {
  event.preventDefault();
  event.stopPropagation();
};
function instance$8($$self, $$props, $$invalidate) {
  let can_add_columns;
  let sort_index;
  let sort_priority;
  let current_direction;
  let { value } = $$props;
  let { i } = $$props;
  let { actual_pinned_columns } = $$props;
  let { header_edit } = $$props;
  let { selected_header } = $$props;
  let { get_sort_status } = $$props;
  let { headers } = $$props;
  let { get_cell_width: get_cell_width2 } = $$props;
  let { handle_header_click } = $$props;
  let { toggle_header_menu } = $$props;
  let { end_header_edit } = $$props;
  let { sort_columns = [] } = $$props;
  let { latex_delimiters } = $$props;
  let { line_breaks } = $$props;
  let { max_chars } = $$props;
  let { root } = $$props;
  let { editable } = $$props;
  let { i18n } = $$props;
  let { el } = $$props;
  let { is_static } = $$props;
  let { col_count } = $$props;
  function get_header_position(col_index) {
    if (col_index >= actual_pinned_columns) {
      return "auto";
    }
    if (col_index === 0) {
      return "0";
    }
    const previous_widths = Array(col_index).fill(0).map((_, idx) => {
      return get_cell_width2(idx);
    }).join(" + ");
    return `calc(${previous_widths})`;
  }
  function editablecell_value_binding(value$1) {
    value = value$1;
    $$invalidate(0, value);
  }
  function editablecell_el_binding(value2) {
    el = value2;
    $$invalidate(1, el);
  }
  const keydown_handler = (event) => {
    if (event.detail.key === "Enter" || event.detail.key === "Escape" || event.detail.key === "Tab") {
      end_header_edit(event);
    }
  };
  const click_handler = (event) => handle_header_click(event, i);
  const func2 = (event) => toggle_header_menu(event, i);
  const click_handler_1 = (event) => handle_header_click(event, i);
  $$self.$$set = ($$props2) => {
    if ("value" in $$props2)
      $$invalidate(0, value = $$props2.value);
    if ("i" in $$props2)
      $$invalidate(2, i = $$props2.i);
    if ("actual_pinned_columns" in $$props2)
      $$invalidate(3, actual_pinned_columns = $$props2.actual_pinned_columns);
    if ("header_edit" in $$props2)
      $$invalidate(4, header_edit = $$props2.header_edit);
    if ("selected_header" in $$props2)
      $$invalidate(5, selected_header = $$props2.selected_header);
    if ("get_sort_status" in $$props2)
      $$invalidate(6, get_sort_status = $$props2.get_sort_status);
    if ("headers" in $$props2)
      $$invalidate(7, headers = $$props2.headers);
    if ("get_cell_width" in $$props2)
      $$invalidate(8, get_cell_width2 = $$props2.get_cell_width);
    if ("handle_header_click" in $$props2)
      $$invalidate(9, handle_header_click = $$props2.handle_header_click);
    if ("toggle_header_menu" in $$props2)
      $$invalidate(10, toggle_header_menu = $$props2.toggle_header_menu);
    if ("end_header_edit" in $$props2)
      $$invalidate(11, end_header_edit = $$props2.end_header_edit);
    if ("sort_columns" in $$props2)
      $$invalidate(12, sort_columns = $$props2.sort_columns);
    if ("latex_delimiters" in $$props2)
      $$invalidate(13, latex_delimiters = $$props2.latex_delimiters);
    if ("line_breaks" in $$props2)
      $$invalidate(14, line_breaks = $$props2.line_breaks);
    if ("max_chars" in $$props2)
      $$invalidate(15, max_chars = $$props2.max_chars);
    if ("root" in $$props2)
      $$invalidate(16, root = $$props2.root);
    if ("editable" in $$props2)
      $$invalidate(17, editable = $$props2.editable);
    if ("i18n" in $$props2)
      $$invalidate(18, i18n = $$props2.i18n);
    if ("el" in $$props2)
      $$invalidate(1, el = $$props2.el);
    if ("is_static" in $$props2)
      $$invalidate(19, is_static = $$props2.is_static);
    if ("col_count" in $$props2)
      $$invalidate(25, col_count = $$props2.col_count);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*col_count*/
    33554432) {
      $$invalidate(23, can_add_columns = col_count && col_count[1] === "dynamic");
    }
    if ($$self.$$.dirty[0] & /*sort_columns, i*/
    4100) {
      $$invalidate(20, sort_index = sort_columns.findIndex((item) => item.col === i));
    }
    if ($$self.$$.dirty[0] & /*sort_index*/
    1048576) {
      $$invalidate(22, sort_priority = sort_index !== -1 ? sort_index + 1 : null);
    }
    if ($$self.$$.dirty[0] & /*sort_index, sort_columns*/
    1052672) {
      $$invalidate(21, current_direction = sort_index !== -1 ? sort_columns[sort_index].direction : null);
    }
  };
  return [
    value,
    el,
    i,
    actual_pinned_columns,
    header_edit,
    selected_header,
    get_sort_status,
    headers,
    get_cell_width2,
    handle_header_click,
    toggle_header_menu,
    end_header_edit,
    sort_columns,
    latex_delimiters,
    line_breaks,
    max_chars,
    root,
    editable,
    i18n,
    is_static,
    sort_index,
    current_direction,
    sort_priority,
    can_add_columns,
    get_header_position,
    col_count,
    editablecell_value_binding,
    editablecell_el_binding,
    keydown_handler,
    click_handler,
    func2,
    click_handler_1
  ];
}
class TableHeader extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance$8,
      create_fragment$8,
      safe_not_equal,
      {
        value: 0,
        i: 2,
        actual_pinned_columns: 3,
        header_edit: 4,
        selected_header: 5,
        get_sort_status: 6,
        headers: 7,
        get_cell_width: 8,
        handle_header_click: 9,
        toggle_header_menu: 10,
        end_header_edit: 11,
        sort_columns: 12,
        latex_delimiters: 13,
        line_breaks: 14,
        max_chars: 15,
        root: 16,
        editable: 17,
        i18n: 18,
        el: 1,
        is_static: 19,
        col_count: 25
      },
      null,
      [-1, -1]
    );
  }
}
function create_if_block$5(ctx) {
  let cellmenubutton;
  let current;
  cellmenubutton = new CellMenuButton({ props: { on_click: (
    /*func*/
    ctx[39]
  ) } });
  return {
    c() {
      create_component(cellmenubutton.$$.fragment);
    },
    l(nodes) {
      claim_component(cellmenubutton.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(cellmenubutton, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const cellmenubutton_changes = {};
      if (dirty[0] & /*toggle_cell_menu, index, j*/
      560)
        cellmenubutton_changes.on_click = /*func*/
        ctx2[39];
      cellmenubutton.$set(cellmenubutton_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(cellmenubutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(cellmenubutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(cellmenubutton, detaching);
    }
  };
}
function create_fragment$7(ctx) {
  let td;
  let div;
  let editablecell;
  let updating_value;
  let updating_el;
  let t;
  let show_if = (
    /*editable*/
    ctx[20] && /*should_show_cell_menu*/
    ctx[10](
      [
        /*index*/
        ctx[4],
        /*j*/
        ctx[5]
      ],
      /*selected_cells*/
      ctx[0],
      /*editable*/
      ctx[20]
    )
  );
  let td_tabindex_value;
  let td_data_testid_value;
  let td_style_value;
  let current;
  let mounted;
  let dispose;
  function editablecell_value_binding(value) {
    ctx[35](value);
  }
  function editablecell_el_binding(value) {
    ctx[36](value);
  }
  let editablecell_props = {
    display_value: String(
      /*value*/
      ctx[1]
    ),
    latex_delimiters: (
      /*latex_delimiters*/
      ctx[14]
    ),
    line_breaks: (
      /*line_breaks*/
      ctx[15]
    ),
    editable: (
      /*editable*/
      ctx[20]
    ),
    is_static: (
      /*is_static*/
      ctx[21]
    ),
    edit: (
      /*editing*/
      ctx[17] && /*editing*/
      ctx[17][0] === /*index*/
      ctx[4] && /*editing*/
      ctx[17][1] === /*j*/
      ctx[5]
    ),
    datatype: (
      /*datatype*/
      ctx[16]
    ),
    clear_on_focus: (
      /*clear_on_focus*/
      ctx[2]
    ),
    root: (
      /*root*/
      ctx[19]
    ),
    max_chars: (
      /*max_chars*/
      ctx[18]
    ),
    i18n: (
      /*i18n*/
      ctx[22]
    ),
    components: (
      /*components*/
      ctx[23]
    ),
    show_selection_buttons: (
      /*selected_cells*/
      ctx[0].length === 1 && /*selected_cells*/
      ctx[0][0][0] === /*index*/
      ctx[4] && /*selected_cells*/
      ctx[0][0][1] === /*j*/
      ctx[5]
    ),
    coords: [
      /*index*/
      ctx[4],
      /*j*/
      ctx[5]
    ],
    on_select_column: (
      /*handle_select_column*/
      ctx[24]
    ),
    on_select_row: (
      /*handle_select_row*/
      ctx[25]
    ),
    is_dragging: (
      /*is_dragging*/
      ctx[26]
    )
  };
  if (
    /*value*/
    ctx[1] !== void 0
  ) {
    editablecell_props.value = /*value*/
    ctx[1];
  }
  if (
    /*el*/
    ctx[3].input !== void 0
  ) {
    editablecell_props.el = /*el*/
    ctx[3].input;
  }
  editablecell = new EditableCell({ props: editablecell_props });
  binding_callbacks.push(() => bind(editablecell, "value", editablecell_value_binding));
  binding_callbacks.push(() => bind(editablecell, "el", editablecell_el_binding));
  editablecell.$on(
    "blur",
    /*blur_handler*/
    ctx[37]
  );
  editablecell.$on(
    "focus",
    /*focus_handler*/
    ctx[38]
  );
  let if_block = show_if && create_if_block$5(ctx);
  return {
    c() {
      td = element("td");
      div = element("div");
      create_component(editablecell.$$.fragment);
      t = space();
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      td = claim_element(nodes, "TD", {
        tabindex: true,
        "data-row": true,
        "data-col": true,
        "data-testid": true,
        style: true,
        class: true
      });
      var td_nodes = children(td);
      div = claim_element(td_nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(editablecell.$$.fragment, div_nodes);
      t = claim_space(div_nodes);
      if (if_block)
        if_block.l(div_nodes);
      div_nodes.forEach(detach);
      td_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "cell-wrap svelte-v1pjjd");
      attr(td, "tabindex", td_tabindex_value = /*j*/
      ctx[5] < /*actual_pinned_columns*/
      ctx[6] ? -1 : 0);
      attr(
        td,
        "data-row",
        /*index*/
        ctx[4]
      );
      attr(
        td,
        "data-col",
        /*j*/
        ctx[5]
      );
      attr(td, "data-testid", td_data_testid_value = `cell-${/*index*/
      ctx[4]}-${/*j*/
      ctx[5]}`);
      attr(td, "style", td_style_value = "width: " + /*get_cell_width*/
      ctx[7](
        /*j*/
        ctx[5]
      ) + "; left: " + /*get_cell_position*/
      ctx[32](
        /*j*/
        ctx[5]
      ) + "; " + /*styling*/
      (ctx[13] || ""));
      attr(td, "class", "svelte-v1pjjd");
      toggle_class(
        td,
        "pinned-column",
        /*j*/
        ctx[5] < /*actual_pinned_columns*/
        ctx[6]
      );
      toggle_class(
        td,
        "last-pinned",
        /*j*/
        ctx[5] === /*actual_pinned_columns*/
        ctx[6] - 1
      );
      toggle_class(
        td,
        "flash",
        /*copy_flash*/
        ctx[11] && /*is_in_selection*/
        ctx[31]
      );
      toggle_class(
        td,
        "cell-selected",
        /*is_in_selection*/
        ctx[31]
      );
      toggle_class(
        td,
        "no-top",
        /*has_no_top*/
        ctx[30]
      );
      toggle_class(
        td,
        "no-bottom",
        /*has_no_bottom*/
        ctx[29]
      );
      toggle_class(
        td,
        "no-left",
        /*has_no_left*/
        ctx[28]
      );
      toggle_class(
        td,
        "no-right",
        /*has_no_right*/
        ctx[27]
      );
      toggle_class(
        td,
        "menu-active",
        /*active_cell_menu*/
        ctx[12] && /*active_cell_menu*/
        ctx[12].row === /*index*/
        ctx[4] && /*active_cell_menu*/
        ctx[12].col === /*j*/
        ctx[5]
      );
      toggle_class(
        td,
        "dragging",
        /*is_dragging*/
        ctx[26]
      );
    },
    m(target, anchor) {
      insert_hydration(target, td, anchor);
      append_hydration(td, div);
      mount_component(editablecell, div, null);
      append_hydration(div, t);
      if (if_block)
        if_block.m(div, null);
      ctx[40](td);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            td,
            "mousedown",
            /*mousedown_handler*/
            ctx[41]
          ),
          listen(td, "contextmenu", prevent_default(
            /*contextmenu_handler*/
            ctx[42]
          ))
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      const editablecell_changes = {};
      if (dirty[0] & /*value*/
      2)
        editablecell_changes.display_value = String(
          /*value*/
          ctx2[1]
        );
      if (dirty[0] & /*latex_delimiters*/
      16384)
        editablecell_changes.latex_delimiters = /*latex_delimiters*/
        ctx2[14];
      if (dirty[0] & /*line_breaks*/
      32768)
        editablecell_changes.line_breaks = /*line_breaks*/
        ctx2[15];
      if (dirty[0] & /*editable*/
      1048576)
        editablecell_changes.editable = /*editable*/
        ctx2[20];
      if (dirty[0] & /*is_static*/
      2097152)
        editablecell_changes.is_static = /*is_static*/
        ctx2[21];
      if (dirty[0] & /*editing, index, j*/
      131120)
        editablecell_changes.edit = /*editing*/
        ctx2[17] && /*editing*/
        ctx2[17][0] === /*index*/
        ctx2[4] && /*editing*/
        ctx2[17][1] === /*j*/
        ctx2[5];
      if (dirty[0] & /*datatype*/
      65536)
        editablecell_changes.datatype = /*datatype*/
        ctx2[16];
      if (dirty[0] & /*clear_on_focus*/
      4)
        editablecell_changes.clear_on_focus = /*clear_on_focus*/
        ctx2[2];
      if (dirty[0] & /*root*/
      524288)
        editablecell_changes.root = /*root*/
        ctx2[19];
      if (dirty[0] & /*max_chars*/
      262144)
        editablecell_changes.max_chars = /*max_chars*/
        ctx2[18];
      if (dirty[0] & /*i18n*/
      4194304)
        editablecell_changes.i18n = /*i18n*/
        ctx2[22];
      if (dirty[0] & /*components*/
      8388608)
        editablecell_changes.components = /*components*/
        ctx2[23];
      if (dirty[0] & /*selected_cells, index, j*/
      49)
        editablecell_changes.show_selection_buttons = /*selected_cells*/
        ctx2[0].length === 1 && /*selected_cells*/
        ctx2[0][0][0] === /*index*/
        ctx2[4] && /*selected_cells*/
        ctx2[0][0][1] === /*j*/
        ctx2[5];
      if (dirty[0] & /*index, j*/
      48)
        editablecell_changes.coords = [
          /*index*/
          ctx2[4],
          /*j*/
          ctx2[5]
        ];
      if (dirty[0] & /*handle_select_column*/
      16777216)
        editablecell_changes.on_select_column = /*handle_select_column*/
        ctx2[24];
      if (dirty[0] & /*handle_select_row*/
      33554432)
        editablecell_changes.on_select_row = /*handle_select_row*/
        ctx2[25];
      if (dirty[0] & /*is_dragging*/
      67108864)
        editablecell_changes.is_dragging = /*is_dragging*/
        ctx2[26];
      if (!updating_value && dirty[0] & /*value*/
      2) {
        updating_value = true;
        editablecell_changes.value = /*value*/
        ctx2[1];
        add_flush_callback(() => updating_value = false);
      }
      if (!updating_el && dirty[0] & /*el*/
      8) {
        updating_el = true;
        editablecell_changes.el = /*el*/
        ctx2[3].input;
        add_flush_callback(() => updating_el = false);
      }
      editablecell.$set(editablecell_changes);
      if (dirty[0] & /*editable, should_show_cell_menu, index, j, selected_cells*/
      1049649)
        show_if = /*editable*/
        ctx2[20] && /*should_show_cell_menu*/
        ctx2[10](
          [
            /*index*/
            ctx2[4],
            /*j*/
            ctx2[5]
          ],
          /*selected_cells*/
          ctx2[0],
          /*editable*/
          ctx2[20]
        );
      if (show_if) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & /*editable, should_show_cell_menu, index, j, selected_cells*/
          1049649) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$5(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (!current || dirty[0] & /*j, actual_pinned_columns*/
      96 && td_tabindex_value !== (td_tabindex_value = /*j*/
      ctx2[5] < /*actual_pinned_columns*/
      ctx2[6] ? -1 : 0)) {
        attr(td, "tabindex", td_tabindex_value);
      }
      if (!current || dirty[0] & /*index*/
      16) {
        attr(
          td,
          "data-row",
          /*index*/
          ctx2[4]
        );
      }
      if (!current || dirty[0] & /*j*/
      32) {
        attr(
          td,
          "data-col",
          /*j*/
          ctx2[5]
        );
      }
      if (!current || dirty[0] & /*index, j*/
      48 && td_data_testid_value !== (td_data_testid_value = `cell-${/*index*/
      ctx2[4]}-${/*j*/
      ctx2[5]}`)) {
        attr(td, "data-testid", td_data_testid_value);
      }
      if (!current || dirty[0] & /*get_cell_width, j, styling*/
      8352 && td_style_value !== (td_style_value = "width: " + /*get_cell_width*/
      ctx2[7](
        /*j*/
        ctx2[5]
      ) + "; left: " + /*get_cell_position*/
      ctx2[32](
        /*j*/
        ctx2[5]
      ) + "; " + /*styling*/
      (ctx2[13] || ""))) {
        attr(td, "style", td_style_value);
      }
      if (!current || dirty[0] & /*j, actual_pinned_columns*/
      96) {
        toggle_class(
          td,
          "pinned-column",
          /*j*/
          ctx2[5] < /*actual_pinned_columns*/
          ctx2[6]
        );
      }
      if (!current || dirty[0] & /*j, actual_pinned_columns*/
      96) {
        toggle_class(
          td,
          "last-pinned",
          /*j*/
          ctx2[5] === /*actual_pinned_columns*/
          ctx2[6] - 1
        );
      }
      if (!current || dirty[0] & /*copy_flash*/
      2048 | dirty[1] & /*is_in_selection*/
      1) {
        toggle_class(
          td,
          "flash",
          /*copy_flash*/
          ctx2[11] && /*is_in_selection*/
          ctx2[31]
        );
      }
      if (!current || dirty[1] & /*is_in_selection*/
      1) {
        toggle_class(
          td,
          "cell-selected",
          /*is_in_selection*/
          ctx2[31]
        );
      }
      if (!current || dirty[0] & /*has_no_top*/
      1073741824) {
        toggle_class(
          td,
          "no-top",
          /*has_no_top*/
          ctx2[30]
        );
      }
      if (!current || dirty[0] & /*has_no_bottom*/
      536870912) {
        toggle_class(
          td,
          "no-bottom",
          /*has_no_bottom*/
          ctx2[29]
        );
      }
      if (!current || dirty[0] & /*has_no_left*/
      268435456) {
        toggle_class(
          td,
          "no-left",
          /*has_no_left*/
          ctx2[28]
        );
      }
      if (!current || dirty[0] & /*has_no_right*/
      134217728) {
        toggle_class(
          td,
          "no-right",
          /*has_no_right*/
          ctx2[27]
        );
      }
      if (!current || dirty[0] & /*active_cell_menu, index, j*/
      4144) {
        toggle_class(
          td,
          "menu-active",
          /*active_cell_menu*/
          ctx2[12] && /*active_cell_menu*/
          ctx2[12].row === /*index*/
          ctx2[4] && /*active_cell_menu*/
          ctx2[12].col === /*j*/
          ctx2[5]
        );
      }
      if (!current || dirty[0] & /*is_dragging*/
      67108864) {
        toggle_class(
          td,
          "dragging",
          /*is_dragging*/
          ctx2[26]
        );
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(editablecell.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(editablecell.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(td);
      }
      destroy_component(editablecell);
      if (if_block)
        if_block.d();
      ctx[40](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$7($$self, $$props, $$invalidate) {
  let cell_classes;
  let is_in_selection;
  let has_no_top;
  let has_no_bottom;
  let has_no_left;
  let has_no_right;
  let { value } = $$props;
  let { index } = $$props;
  let { j } = $$props;
  let { actual_pinned_columns } = $$props;
  let { get_cell_width: get_cell_width2 } = $$props;
  let { handle_cell_click } = $$props;
  let { toggle_cell_menu } = $$props;
  let { is_cell_selected: is_cell_selected2 } = $$props;
  let { should_show_cell_menu: should_show_cell_menu2 } = $$props;
  let { selected_cells } = $$props;
  let { copy_flash } = $$props;
  let { active_cell_menu } = $$props;
  let { styling } = $$props;
  let { latex_delimiters } = $$props;
  let { line_breaks } = $$props;
  let { datatype } = $$props;
  let { editing } = $$props;
  let { clear_on_focus } = $$props;
  let { max_chars } = $$props;
  let { root } = $$props;
  let { editable } = $$props;
  let { is_static = false } = $$props;
  let { i18n } = $$props;
  let { components = {} } = $$props;
  let { el } = $$props;
  let { handle_select_column } = $$props;
  let { handle_select_row } = $$props;
  let { is_dragging } = $$props;
  function get_cell_position(col_index) {
    if (col_index >= actual_pinned_columns) {
      return "auto";
    }
    if (col_index === 0) {
      return "0";
    }
    const previous_widths = Array(col_index).fill(0).map((_, idx) => {
      return get_cell_width2(idx);
    }).join(" + ");
    return `calc(${previous_widths})`;
  }
  function editablecell_value_binding(value$1) {
    value = value$1;
    $$invalidate(1, value);
  }
  function editablecell_el_binding(value2) {
    if ($$self.$$.not_equal(el.input, value2)) {
      el.input = value2;
      $$invalidate(3, el);
    }
  }
  const blur_handler = () => {
    $$invalidate(2, clear_on_focus = false);
  };
  const focus_handler = () => {
    const row = index;
    const col = j;
    if (!selected_cells.some(([r, c]) => r === row && c === col)) {
      $$invalidate(0, selected_cells = [[row, col]]);
    }
  };
  const func2 = (event) => toggle_cell_menu(event, index, j);
  function td_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      el.cell = $$value;
      $$invalidate(3, el);
    });
  }
  const mousedown_handler2 = (e) => handle_cell_click(e, index, j);
  const contextmenu_handler = (e) => toggle_cell_menu(e, index, j);
  $$self.$$set = ($$props2) => {
    if ("value" in $$props2)
      $$invalidate(1, value = $$props2.value);
    if ("index" in $$props2)
      $$invalidate(4, index = $$props2.index);
    if ("j" in $$props2)
      $$invalidate(5, j = $$props2.j);
    if ("actual_pinned_columns" in $$props2)
      $$invalidate(6, actual_pinned_columns = $$props2.actual_pinned_columns);
    if ("get_cell_width" in $$props2)
      $$invalidate(7, get_cell_width2 = $$props2.get_cell_width);
    if ("handle_cell_click" in $$props2)
      $$invalidate(8, handle_cell_click = $$props2.handle_cell_click);
    if ("toggle_cell_menu" in $$props2)
      $$invalidate(9, toggle_cell_menu = $$props2.toggle_cell_menu);
    if ("is_cell_selected" in $$props2)
      $$invalidate(33, is_cell_selected2 = $$props2.is_cell_selected);
    if ("should_show_cell_menu" in $$props2)
      $$invalidate(10, should_show_cell_menu2 = $$props2.should_show_cell_menu);
    if ("selected_cells" in $$props2)
      $$invalidate(0, selected_cells = $$props2.selected_cells);
    if ("copy_flash" in $$props2)
      $$invalidate(11, copy_flash = $$props2.copy_flash);
    if ("active_cell_menu" in $$props2)
      $$invalidate(12, active_cell_menu = $$props2.active_cell_menu);
    if ("styling" in $$props2)
      $$invalidate(13, styling = $$props2.styling);
    if ("latex_delimiters" in $$props2)
      $$invalidate(14, latex_delimiters = $$props2.latex_delimiters);
    if ("line_breaks" in $$props2)
      $$invalidate(15, line_breaks = $$props2.line_breaks);
    if ("datatype" in $$props2)
      $$invalidate(16, datatype = $$props2.datatype);
    if ("editing" in $$props2)
      $$invalidate(17, editing = $$props2.editing);
    if ("clear_on_focus" in $$props2)
      $$invalidate(2, clear_on_focus = $$props2.clear_on_focus);
    if ("max_chars" in $$props2)
      $$invalidate(18, max_chars = $$props2.max_chars);
    if ("root" in $$props2)
      $$invalidate(19, root = $$props2.root);
    if ("editable" in $$props2)
      $$invalidate(20, editable = $$props2.editable);
    if ("is_static" in $$props2)
      $$invalidate(21, is_static = $$props2.is_static);
    if ("i18n" in $$props2)
      $$invalidate(22, i18n = $$props2.i18n);
    if ("components" in $$props2)
      $$invalidate(23, components = $$props2.components);
    if ("el" in $$props2)
      $$invalidate(3, el = $$props2.el);
    if ("handle_select_column" in $$props2)
      $$invalidate(24, handle_select_column = $$props2.handle_select_column);
    if ("handle_select_row" in $$props2)
      $$invalidate(25, handle_select_row = $$props2.handle_select_row);
    if ("is_dragging" in $$props2)
      $$invalidate(26, is_dragging = $$props2.is_dragging);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*index, j, selected_cells*/
    49 | $$self.$$.dirty[1] & /*is_cell_selected*/
    4) {
      $$invalidate(34, cell_classes = is_cell_selected2([index, j], selected_cells || []));
    }
    if ($$self.$$.dirty[0] & /*index, j, selected_cells*/
    49) {
      $$invalidate(31, is_in_selection = is_cell_in_selection([index, j], selected_cells));
    }
    if ($$self.$$.dirty[1] & /*cell_classes*/
    8) {
      $$invalidate(30, has_no_top = cell_classes.includes("no-top"));
    }
    if ($$self.$$.dirty[1] & /*cell_classes*/
    8) {
      $$invalidate(29, has_no_bottom = cell_classes.includes("no-bottom"));
    }
    if ($$self.$$.dirty[1] & /*cell_classes*/
    8) {
      $$invalidate(28, has_no_left = cell_classes.includes("no-left"));
    }
    if ($$self.$$.dirty[1] & /*cell_classes*/
    8) {
      $$invalidate(27, has_no_right = cell_classes.includes("no-right"));
    }
  };
  return [
    selected_cells,
    value,
    clear_on_focus,
    el,
    index,
    j,
    actual_pinned_columns,
    get_cell_width2,
    handle_cell_click,
    toggle_cell_menu,
    should_show_cell_menu2,
    copy_flash,
    active_cell_menu,
    styling,
    latex_delimiters,
    line_breaks,
    datatype,
    editing,
    max_chars,
    root,
    editable,
    is_static,
    i18n,
    components,
    handle_select_column,
    handle_select_row,
    is_dragging,
    has_no_right,
    has_no_left,
    has_no_bottom,
    has_no_top,
    is_in_selection,
    get_cell_position,
    is_cell_selected2,
    cell_classes,
    editablecell_value_binding,
    editablecell_el_binding,
    blur_handler,
    focus_handler,
    func2,
    td_binding,
    mousedown_handler2,
    contextmenu_handler
  ];
}
class TableCell extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance$7,
      create_fragment$7,
      safe_not_equal,
      {
        value: 1,
        index: 4,
        j: 5,
        actual_pinned_columns: 6,
        get_cell_width: 7,
        handle_cell_click: 8,
        toggle_cell_menu: 9,
        is_cell_selected: 33,
        should_show_cell_menu: 10,
        selected_cells: 0,
        copy_flash: 11,
        active_cell_menu: 12,
        styling: 13,
        latex_delimiters: 14,
        line_breaks: 15,
        datatype: 16,
        editing: 17,
        clear_on_focus: 2,
        max_chars: 18,
        root: 19,
        editable: 20,
        is_static: 21,
        i18n: 22,
        components: 23,
        el: 3,
        handle_select_column: 24,
        handle_select_row: 25,
        is_dragging: 26
      },
      null,
      [-1, -1]
    );
  }
}
function create_fragment$6(ctx) {
  let button;
  let textContent = "+";
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = textContent;
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", {
        class: true,
        "aria-label": true,
        ["data-svelte-h"]: true
      });
      if (get_svelte_dataset(button) !== "svelte-qq2si4")
        button.textContent = textContent;
      this.h();
    },
    h() {
      attr(button, "class", "add-row-button svelte-jkwuz7");
      attr(button, "aria-label", "Add row");
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      if (!mounted) {
        dispose = listen(button, "click", function() {
          if (is_function(
            /*on_click*/
            ctx[0]
          ))
            ctx[0].apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, [dirty]) {
      ctx = new_ctx;
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  let { on_click } = $$props;
  $$self.$$set = ($$props2) => {
    if ("on_click" in $$props2)
      $$invalidate(0, on_click = $$props2.on_click);
  };
  return [on_click];
}
class EmptyRowButton extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$6, safe_not_equal, { on_click: 0 });
  }
}
const get_tfoot_slot_changes = (dirty) => ({});
const get_tfoot_slot_context = (ctx) => ({});
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[39] = list[i];
  return child_ctx;
}
const get_tbody_slot_changes = (dirty) => ({
  item: dirty[0] & /*visible*/
  1024,
  index: dirty[0] & /*visible*/
  1024
});
const get_tbody_slot_context = (ctx) => ({
  item: (
    /*item*/
    ctx[39].data
  ),
  index: (
    /*item*/
    ctx[39].index
  )
});
const get_thead_slot_changes = (dirty) => ({});
const get_thead_slot_context = (ctx) => ({});
function create_if_block$4(ctx) {
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let each_1_anchor;
  let current;
  let each_value = ensure_array_like(
    /*visible*/
    ctx[10]
  );
  const get_key = (ctx2) => (
    /*item*/
    ctx2[39].data[0].id
  );
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context$1(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
  }
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    l(nodes) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(nodes);
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert_hydration(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*$$scope, visible*/
      4195328) {
        each_value = ensure_array_like(
          /*visible*/
          ctx2[10]
        );
        group_outros();
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block$1, each_1_anchor, get_each_context$1);
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(each_1_anchor);
      }
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d(detaching);
      }
    }
  };
}
function fallback_block(ctx) {
  let t;
  return {
    c() {
      t = text("Missing Table Row\n						");
    },
    l(nodes) {
      t = claim_text(nodes, "Missing Table Row\n						");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_each_block$1(key_1, ctx) {
  let first;
  let current;
  const tbody_slot_template = (
    /*#slots*/
    ctx[23].tbody
  );
  const tbody_slot = create_slot(
    tbody_slot_template,
    ctx,
    /*$$scope*/
    ctx[22],
    get_tbody_slot_context
  );
  const tbody_slot_or_fallback = tbody_slot || fallback_block();
  return {
    key: key_1,
    first: null,
    c() {
      first = empty();
      if (tbody_slot_or_fallback)
        tbody_slot_or_fallback.c();
      this.h();
    },
    l(nodes) {
      first = empty();
      if (tbody_slot_or_fallback)
        tbody_slot_or_fallback.l(nodes);
      this.h();
    },
    h() {
      this.first = first;
    },
    m(target, anchor) {
      insert_hydration(target, first, anchor);
      if (tbody_slot_or_fallback) {
        tbody_slot_or_fallback.m(target, anchor);
      }
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (tbody_slot) {
        if (tbody_slot.p && (!current || dirty[0] & /*$$scope, visible*/
        4195328)) {
          update_slot_base(
            tbody_slot,
            tbody_slot_template,
            ctx,
            /*$$scope*/
            ctx[22],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx[22]
            ) : get_slot_changes(
              tbody_slot_template,
              /*$$scope*/
              ctx[22],
              dirty,
              get_tbody_slot_changes
            ),
            get_tbody_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(tbody_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out(tbody_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(first);
      }
      if (tbody_slot_or_fallback)
        tbody_slot_or_fallback.d(detaching);
    }
  };
}
function create_fragment$5(ctx) {
  let svelte_virtual_table_viewport;
  let div;
  let table;
  let thead;
  let thead_resize_listener;
  let t0;
  let tbody;
  let t1;
  let tfoot;
  let tfoot_resize_listener;
  let table_resize_listener;
  let current;
  let mounted;
  let dispose;
  const thead_slot_template = (
    /*#slots*/
    ctx[23].thead
  );
  const thead_slot = create_slot(
    thead_slot_template,
    ctx,
    /*$$scope*/
    ctx[22],
    get_thead_slot_context
  );
  let if_block = (
    /*visible*/
    ctx[10].length && /*visible*/
    ctx[10][0].data.length && create_if_block$4(ctx)
  );
  const tfoot_slot_template = (
    /*#slots*/
    ctx[23].tfoot
  );
  const tfoot_slot = create_slot(
    tfoot_slot_template,
    ctx,
    /*$$scope*/
    ctx[22],
    get_tfoot_slot_context
  );
  return {
    c() {
      svelte_virtual_table_viewport = element("svelte-virtual-table-viewport");
      div = element("div");
      table = element("table");
      thead = element("thead");
      if (thead_slot)
        thead_slot.c();
      t0 = space();
      tbody = element("tbody");
      if (if_block)
        if_block.c();
      t1 = space();
      tfoot = element("tfoot");
      if (tfoot_slot)
        tfoot_slot.c();
      this.h();
    },
    l(nodes) {
      svelte_virtual_table_viewport = claim_element(nodes, "SVELTE-VIRTUAL-TABLE-VIEWPORT", {});
      var svelte_virtual_table_viewport_nodes = children(svelte_virtual_table_viewport);
      div = claim_element(svelte_virtual_table_viewport_nodes, "DIV", {});
      var div_nodes = children(div);
      table = claim_element(div_nodes, "TABLE", { class: true, style: true });
      var table_nodes = children(table);
      thead = claim_element(table_nodes, "THEAD", { class: true });
      var thead_nodes = children(thead);
      if (thead_slot)
        thead_slot.l(thead_nodes);
      thead_nodes.forEach(detach);
      t0 = claim_space(table_nodes);
      tbody = claim_element(table_nodes, "TBODY", { class: true });
      var tbody_nodes = children(tbody);
      if (if_block)
        if_block.l(tbody_nodes);
      tbody_nodes.forEach(detach);
      t1 = claim_space(table_nodes);
      tfoot = claim_element(table_nodes, "TFOOT", { class: true });
      var tfoot_nodes = children(tfoot);
      if (tfoot_slot)
        tfoot_slot.l(tfoot_nodes);
      tfoot_nodes.forEach(detach);
      table_nodes.forEach(detach);
      div_nodes.forEach(detach);
      svelte_virtual_table_viewport_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(thead, "class", "thead svelte-1e98i6s");
      add_render_callback(() => (
        /*thead_elementresize_handler*/
        ctx[24].call(thead)
      ));
      attr(tbody, "class", "tbody svelte-1e98i6s");
      attr(tfoot, "class", "tfoot svelte-1e98i6s");
      add_render_callback(() => (
        /*tfoot_elementresize_handler*/
        ctx[26].call(tfoot)
      ));
      attr(table, "class", "table svelte-1e98i6s");
      set_style(table, "height", height);
      set_style(
        table,
        "--bw-svt-p-top",
        /*top*/
        ctx[9] + "px"
      );
      set_style(
        table,
        "--bw-svt-p-bottom",
        /*bottom*/
        ctx[5] + "px"
      );
      set_style(
        table,
        "--bw-svt-head-height",
        /*head_height*/
        ctx[7] + "px"
      );
      set_style(
        table,
        "--bw-svt-foot-height",
        /*foot_height*/
        ctx[8] + "px"
      );
      set_style(
        table,
        "--bw-svt-avg-row-height",
        /*average_height*/
        ctx[3] + "px"
      );
      set_style(
        table,
        "--max-height",
        /*max_height*/
        ctx[1] + "px"
      );
      toggle_class(
        table,
        "disable-scroll",
        /*disable_scroll*/
        ctx[2]
      );
    },
    m(target, anchor) {
      insert_hydration(target, svelte_virtual_table_viewport, anchor);
      append_hydration(svelte_virtual_table_viewport, div);
      append_hydration(div, table);
      append_hydration(table, thead);
      if (thead_slot) {
        thead_slot.m(thead, null);
      }
      thead_resize_listener = add_iframe_resize_listener(
        thead,
        /*thead_elementresize_handler*/
        ctx[24].bind(thead)
      );
      append_hydration(table, t0);
      append_hydration(table, tbody);
      if (if_block)
        if_block.m(tbody, null);
      ctx[25](tbody);
      append_hydration(table, t1);
      append_hydration(table, tfoot);
      if (tfoot_slot) {
        tfoot_slot.m(tfoot, null);
      }
      tfoot_resize_listener = add_iframe_resize_listener(
        tfoot,
        /*tfoot_elementresize_handler*/
        ctx[26].bind(tfoot)
      );
      ctx[27](table);
      table_resize_listener = resize_observer_content_box.observe(
        table,
        /*table_elementresizecontentbox_handler*/
        ctx[28].bind(table)
      );
      current = true;
      if (!mounted) {
        dispose = listen(
          table,
          "scroll",
          /*handle_scroll*/
          ctx[11]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (thead_slot) {
        if (thead_slot.p && (!current || dirty[0] & /*$$scope*/
        4194304)) {
          update_slot_base(
            thead_slot,
            thead_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[22],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[22]
            ) : get_slot_changes(
              thead_slot_template,
              /*$$scope*/
              ctx2[22],
              dirty,
              get_thead_slot_changes
            ),
            get_thead_slot_context
          );
        }
      }
      if (
        /*visible*/
        ctx2[10].length && /*visible*/
        ctx2[10][0].data.length
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & /*visible*/
          1024) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$4(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(tbody, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (tfoot_slot) {
        if (tfoot_slot.p && (!current || dirty[0] & /*$$scope*/
        4194304)) {
          update_slot_base(
            tfoot_slot,
            tfoot_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[22],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[22]
            ) : get_slot_changes(
              tfoot_slot_template,
              /*$$scope*/
              ctx2[22],
              dirty,
              get_tfoot_slot_changes
            ),
            get_tfoot_slot_context
          );
        }
      }
      if (!current || dirty[0] & /*top*/
      512) {
        set_style(
          table,
          "--bw-svt-p-top",
          /*top*/
          ctx2[9] + "px"
        );
      }
      if (!current || dirty[0] & /*bottom*/
      32) {
        set_style(
          table,
          "--bw-svt-p-bottom",
          /*bottom*/
          ctx2[5] + "px"
        );
      }
      if (!current || dirty[0] & /*head_height*/
      128) {
        set_style(
          table,
          "--bw-svt-head-height",
          /*head_height*/
          ctx2[7] + "px"
        );
      }
      if (!current || dirty[0] & /*foot_height*/
      256) {
        set_style(
          table,
          "--bw-svt-foot-height",
          /*foot_height*/
          ctx2[8] + "px"
        );
      }
      if (!current || dirty[0] & /*average_height*/
      8) {
        set_style(
          table,
          "--bw-svt-avg-row-height",
          /*average_height*/
          ctx2[3] + "px"
        );
      }
      if (!current || dirty[0] & /*max_height*/
      2) {
        set_style(
          table,
          "--max-height",
          /*max_height*/
          ctx2[1] + "px"
        );
      }
      if (!current || dirty[0] & /*disable_scroll*/
      4) {
        toggle_class(
          table,
          "disable-scroll",
          /*disable_scroll*/
          ctx2[2]
        );
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(thead_slot, local);
      transition_in(if_block);
      transition_in(tfoot_slot, local);
      current = true;
    },
    o(local) {
      transition_out(thead_slot, local);
      transition_out(if_block);
      transition_out(tfoot_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(svelte_virtual_table_viewport);
      }
      if (thead_slot)
        thead_slot.d(detaching);
      thead_resize_listener();
      if (if_block)
        if_block.d();
      ctx[25](null);
      if (tfoot_slot)
        tfoot_slot.d(detaching);
      tfoot_resize_listener();
      ctx[27](null);
      table_resize_listener();
      mounted = false;
      dispose();
    }
  };
}
let height = "100%";
function get_computed_px_amount(elem, property) {
  if (!elem) {
    return 0;
  }
  const compStyle = getComputedStyle(elem);
  let x = parseInt(compStyle.getPropertyValue(property));
  return x;
}
function instance$5($$self, $$props, $$invalidate) {
  let sortedItems;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { items = [] } = $$props;
  let { max_height } = $$props;
  let { actual_height } = $$props;
  let { table_scrollbar_width } = $$props;
  let { start = 0 } = $$props;
  let { end = 20 } = $$props;
  let { selected } = $$props;
  let { disable_scroll = false } = $$props;
  let { show_scroll_button = false } = $$props;
  let { viewport } = $$props;
  const dispatch = createEventDispatcher();
  let average_height = 30;
  let bottom = 0;
  let contents;
  let head_height = 0;
  let foot_height = 0;
  let height_map = [];
  let mounted;
  let rows;
  let top = 0;
  let viewport_height = 200;
  let visible = [];
  let viewport_box;
  const is_browser = typeof window !== "undefined";
  const raf = is_browser ? window.requestAnimationFrame : (cb) => cb();
  let content_height = 0;
  async function refresh_height_map(_items) {
    var _a;
    if (viewport_height === 0) {
      return;
    }
    $$invalidate(7, head_height = ((_a = viewport.querySelector(".thead")) == null ? void 0 : _a.getBoundingClientRect().height) || 0);
    await tick();
    const { scrollTop } = viewport;
    $$invalidate(15, table_scrollbar_width = viewport.offsetWidth - viewport.clientWidth);
    content_height = top - (scrollTop - head_height);
    let i = start;
    while (content_height < max_height && i < _items.length) {
      let row = rows[i - start];
      if (!row) {
        $$invalidate(13, end = i + 1);
        await tick();
        row = rows[i - start];
      }
      let _h = row == null ? void 0 : row.getBoundingClientRect().height;
      if (!_h) {
        _h = average_height;
      }
      const row_height = height_map[i] = _h;
      content_height += row_height;
      i += 1;
    }
    $$invalidate(13, end = i);
    const remaining = _items.length - end;
    const scrollbar_height = viewport.offsetHeight - viewport.clientHeight;
    if (scrollbar_height > 0) {
      content_height += scrollbar_height;
    }
    let filtered_height_map = height_map.filter((v) => typeof v === "number");
    $$invalidate(3, average_height = filtered_height_map.reduce((a, b) => a + b, 0) / filtered_height_map.length);
    $$invalidate(5, bottom = remaining * average_height);
    height_map.length = _items.length;
    await tick();
    if (!max_height) {
      $$invalidate(14, actual_height = content_height + 1);
    } else if (content_height < max_height) {
      $$invalidate(14, actual_height = content_height + 2);
    } else {
      $$invalidate(14, actual_height = max_height);
    }
    await tick();
  }
  async function scroll_and_render(n) {
    raf(async () => {
      if (typeof n !== "number")
        return;
      const direction = typeof n !== "number" ? false : is_in_view(n);
      if (direction === true) {
        return;
      }
      if (direction === "back") {
        await scroll_to_index(n, { behavior: "instant" });
      }
      if (direction === "forwards") {
        await scroll_to_index(n, { behavior: "instant" }, true);
      }
    });
  }
  function is_in_view(n) {
    const current = rows && rows[n - start];
    if (!current && n < start) {
      return "back";
    }
    if (!current && n >= end - 1) {
      return "forwards";
    }
    const { top: viewport_top } = viewport.getBoundingClientRect();
    const { top: top2, bottom: bottom2 } = current.getBoundingClientRect();
    if (top2 - viewport_top < 37) {
      return "back";
    }
    if (bottom2 - viewport_top > viewport_height) {
      return "forwards";
    }
    return true;
  }
  async function handle_scroll(e) {
    const scroll_top = viewport.scrollTop;
    $$invalidate(16, show_scroll_button = scroll_top > 100);
    if (show_scroll_button) {
      dispatch("scroll_top", scroll_top);
    }
    rows = contents.children;
    const is_start_overflow = sortedItems.length < start;
    const row_top_border = get_computed_px_amount(rows[1], "border-top-width");
    const actual_border_collapsed_width = 0;
    if (is_start_overflow) {
      await scroll_to_index(sortedItems.length - 1, { behavior: "auto" });
    }
    let new_start = 0;
    for (let v = 0; v < rows.length; v += 1) {
      height_map[start + v] = rows[v].getBoundingClientRect().height;
    }
    let i = 0;
    let y = head_height + row_top_border / 2;
    let row_heights = [];
    while (i < sortedItems.length) {
      const row_height = height_map[i] || average_height;
      row_heights[i] = row_height;
      if (y + row_height + actual_border_collapsed_width > scroll_top) {
        new_start = i;
        $$invalidate(9, top = y - (head_height + row_top_border / 2));
        break;
      }
      y += row_height;
      i += 1;
    }
    new_start = Math.max(0, new_start);
    while (i < sortedItems.length) {
      const row_height = height_map[i] || average_height;
      y += row_height;
      i += 1;
      if (y > scroll_top + viewport_height) {
        break;
      }
    }
    $$invalidate(12, start = new_start);
    $$invalidate(13, end = i);
    const remaining = sortedItems.length - end;
    if (end === 0) {
      $$invalidate(13, end = 10);
    }
    $$invalidate(3, average_height = (y - head_height) / end);
    let remaining_height = remaining * average_height;
    while (i < sortedItems.length) {
      i += 1;
      height_map[i] = average_height;
    }
    $$invalidate(5, bottom = remaining_height);
    if (!isFinite(bottom)) {
      $$invalidate(5, bottom = 2e5);
    }
  }
  async function scroll_to_index(index, opts, align_end = false) {
    await tick();
    const _itemHeight = average_height;
    let distance = index * _itemHeight;
    if (align_end) {
      distance = distance - viewport_height + _itemHeight + head_height;
    }
    const scrollbar_height = viewport.offsetHeight - viewport.clientHeight;
    if (scrollbar_height > 0) {
      distance += scrollbar_height;
    }
    const _opts = {
      top: distance,
      behavior: "smooth",
      ...opts
    };
    viewport.scrollTo(_opts);
  }
  onMount(() => {
    rows = contents.children;
    $$invalidate(20, mounted = true);
    refresh_height_map(items);
  });
  function thead_elementresize_handler() {
    head_height = this.offsetHeight;
    $$invalidate(7, head_height);
  }
  function tbody_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      contents = $$value;
      $$invalidate(6, contents);
    });
  }
  function tfoot_elementresize_handler() {
    foot_height = this.offsetHeight;
    $$invalidate(8, foot_height);
  }
  function table_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      viewport = $$value;
      $$invalidate(0, viewport);
    });
  }
  function table_elementresizecontentbox_handler() {
    var _a;
    viewport_box = (_a = ResizeObserverSingleton.entries.get(this)) == null ? void 0 : _a.contentRect;
    $$invalidate(4, viewport_box);
  }
  $$self.$$set = ($$props2) => {
    if ("items" in $$props2)
      $$invalidate(17, items = $$props2.items);
    if ("max_height" in $$props2)
      $$invalidate(1, max_height = $$props2.max_height);
    if ("actual_height" in $$props2)
      $$invalidate(14, actual_height = $$props2.actual_height);
    if ("table_scrollbar_width" in $$props2)
      $$invalidate(15, table_scrollbar_width = $$props2.table_scrollbar_width);
    if ("start" in $$props2)
      $$invalidate(12, start = $$props2.start);
    if ("end" in $$props2)
      $$invalidate(13, end = $$props2.end);
    if ("selected" in $$props2)
      $$invalidate(18, selected = $$props2.selected);
    if ("disable_scroll" in $$props2)
      $$invalidate(2, disable_scroll = $$props2.disable_scroll);
    if ("show_scroll_button" in $$props2)
      $$invalidate(16, show_scroll_button = $$props2.show_scroll_button);
    if ("viewport" in $$props2)
      $$invalidate(0, viewport = $$props2.viewport);
    if ("$$scope" in $$props2)
      $$invalidate(22, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*viewport_box*/
    16) {
      viewport_height = (viewport_box == null ? void 0 : viewport_box.height) || 200;
    }
    if ($$self.$$.dirty[0] & /*items*/
    131072) {
      $$invalidate(21, sortedItems = items);
    }
    if ($$self.$$.dirty[0] & /*mounted, sortedItems*/
    3145728) {
      mounted && raf(() => refresh_height_map(sortedItems));
    }
    if ($$self.$$.dirty[0] & /*selected*/
    262144) {
      scroll_and_render(selected);
    }
    if ($$self.$$.dirty[0] & /*sortedItems, start, end, max_height, average_height*/
    2109450) {
      $$invalidate(10, visible = is_browser ? sortedItems.slice(start, end).map((data, i) => {
        return { index: i + start, data };
      }) : sortedItems.slice(0, max_height / sortedItems.length * average_height + 1).map((data, i) => {
        return { index: i + start, data };
      }));
    }
  };
  return [
    viewport,
    max_height,
    disable_scroll,
    average_height,
    viewport_box,
    bottom,
    contents,
    head_height,
    foot_height,
    top,
    visible,
    handle_scroll,
    start,
    end,
    actual_height,
    table_scrollbar_width,
    show_scroll_button,
    items,
    selected,
    scroll_to_index,
    mounted,
    sortedItems,
    $$scope,
    slots,
    thead_elementresize_handler,
    tbody_binding,
    tfoot_elementresize_handler,
    table_binding,
    table_elementresizecontentbox_handler
  ];
}
class VirtualTable extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance$5,
      create_fragment$5,
      safe_not_equal,
      {
        items: 17,
        max_height: 1,
        actual_height: 14,
        table_scrollbar_width: 15,
        start: 12,
        end: 13,
        selected: 18,
        disable_scroll: 2,
        show_scroll_button: 16,
        viewport: 0,
        scroll_to_index: 19
      },
      null,
      [-1, -1]
    );
  }
  get scroll_to_index() {
    return this.$$.ctx[19];
  }
}
function create_if_block_8$1(ctx) {
  let svg;
  let path0;
  let path1;
  let path2;
  let path3;
  let path4;
  return {
    c() {
      svg = svg_element("svg");
      path0 = svg_element("path");
      path1 = svg_element("path");
      path2 = svg_element("path");
      path3 = svg_element("path");
      path4 = svg_element("path");
      this.h();
    },
    l(nodes) {
      svg = claim_svg_element(nodes, "svg", { viewBox: true, width: true, height: true });
      var svg_nodes = children(svg);
      path0 = claim_svg_element(svg_nodes, "path", {
        d: true,
        stroke: true,
        "stroke-width": true,
        "stroke-linecap": true
      });
      children(path0).forEach(detach);
      path1 = claim_svg_element(svg_nodes, "path", {
        d: true,
        stroke: true,
        "stroke-width": true,
        "stroke-linecap": true
      });
      children(path1).forEach(detach);
      path2 = claim_svg_element(svg_nodes, "path", {
        d: true,
        stroke: true,
        "stroke-width": true,
        "stroke-linecap": true
      });
      children(path2).forEach(detach);
      path3 = claim_svg_element(svg_nodes, "path", {
        d: true,
        stroke: true,
        "stroke-width": true,
        "stroke-linecap": true
      });
      children(path3).forEach(detach);
      path4 = claim_svg_element(svg_nodes, "path", {
        d: true,
        stroke: true,
        "stroke-width": true,
        "stroke-linecap": true
      });
      children(path4).forEach(detach);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path0, "d", "M5 5H19");
      attr(path0, "stroke", "currentColor");
      attr(path0, "stroke-width", "2");
      attr(path0, "stroke-linecap", "round");
      attr(path1, "d", "M5 9H15");
      attr(path1, "stroke", "currentColor");
      attr(path1, "stroke-width", "2");
      attr(path1, "stroke-linecap", "round");
      attr(path2, "d", "M5 13H11");
      attr(path2, "stroke", "currentColor");
      attr(path2, "stroke-width", "2");
      attr(path2, "stroke-linecap", "round");
      attr(path3, "d", "M5 17H7");
      attr(path3, "stroke", "currentColor");
      attr(path3, "stroke-width", "2");
      attr(path3, "stroke-linecap", "round");
      attr(path4, "d", "M17 17L21 21M21 17L17 21");
      attr(path4, "stroke", "currentColor");
      attr(path4, "stroke-width", "2");
      attr(path4, "stroke-linecap", "round");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "width", "16");
      attr(svg, "height", "16");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      append_hydration(svg, path0);
      append_hydration(svg, path1);
      append_hydration(svg, path2);
      append_hydration(svg, path3);
      append_hydration(svg, path4);
    },
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
function create_if_block_7$1(ctx) {
  let svg;
  let path0;
  let path1;
  let path2;
  return {
    c() {
      svg = svg_element("svg");
      path0 = svg_element("path");
      path1 = svg_element("path");
      path2 = svg_element("path");
      this.h();
    },
    l(nodes) {
      svg = claim_svg_element(nodes, "svg", { viewBox: true, width: true, height: true });
      var svg_nodes = children(svg);
      path0 = claim_svg_element(svg_nodes, "path", {
        d: true,
        stroke: true,
        "stroke-width": true,
        fill: true,
        "stroke-linecap": true,
        "stroke-linejoin": true
      });
      children(path0).forEach(detach);
      path1 = claim_svg_element(svg_nodes, "path", {
        d: true,
        stroke: true,
        "stroke-width": true,
        "stroke-linecap": true
      });
      children(path1).forEach(detach);
      path2 = claim_svg_element(svg_nodes, "path", {
        d: true,
        stroke: true,
        "stroke-width": true,
        "stroke-linecap": true
      });
      children(path2).forEach(detach);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path0, "d", "M8 12L12 16L16 12");
      attr(path0, "stroke", "currentColor");
      attr(path0, "stroke-width", "2");
      attr(path0, "fill", "none");
      attr(path0, "stroke-linecap", "round");
      attr(path0, "stroke-linejoin", "round");
      attr(path1, "d", "M12 16V9");
      attr(path1, "stroke", "currentColor");
      attr(path1, "stroke-width", "2");
      attr(path1, "stroke-linecap", "round");
      attr(path2, "d", "M5 5H19");
      attr(path2, "stroke", "currentColor");
      attr(path2, "stroke-width", "2");
      attr(path2, "stroke-linecap", "round");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "width", "16");
      attr(svg, "height", "16");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      append_hydration(svg, path0);
      append_hydration(svg, path1);
      append_hydration(svg, path2);
    },
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
function create_if_block_6$2(ctx) {
  let svg;
  let path0;
  let path1;
  let path2;
  return {
    c() {
      svg = svg_element("svg");
      path0 = svg_element("path");
      path1 = svg_element("path");
      path2 = svg_element("path");
      this.h();
    },
    l(nodes) {
      svg = claim_svg_element(nodes, "svg", { viewBox: true, width: true, height: true });
      var svg_nodes = children(svg);
      path0 = claim_svg_element(svg_nodes, "path", {
        d: true,
        stroke: true,
        "stroke-width": true,
        fill: true,
        "stroke-linecap": true,
        "stroke-linejoin": true
      });
      children(path0).forEach(detach);
      path1 = claim_svg_element(svg_nodes, "path", {
        d: true,
        stroke: true,
        "stroke-width": true,
        "stroke-linecap": true
      });
      children(path1).forEach(detach);
      path2 = claim_svg_element(svg_nodes, "path", {
        d: true,
        stroke: true,
        "stroke-width": true,
        "stroke-linecap": true
      });
      children(path2).forEach(detach);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path0, "d", "M8 16L12 12L16 16");
      attr(path0, "stroke", "currentColor");
      attr(path0, "stroke-width", "2");
      attr(path0, "fill", "none");
      attr(path0, "stroke-linecap", "round");
      attr(path0, "stroke-linejoin", "round");
      attr(path1, "d", "M12 12V19");
      attr(path1, "stroke", "currentColor");
      attr(path1, "stroke-width", "2");
      attr(path1, "stroke-linecap", "round");
      attr(path2, "d", "M5 7H19");
      attr(path2, "stroke", "currentColor");
      attr(path2, "stroke-width", "2");
      attr(path2, "stroke-linecap", "round");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "width", "16");
      attr(svg, "height", "16");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      append_hydration(svg, path0);
      append_hydration(svg, path1);
      append_hydration(svg, path2);
    },
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
function create_if_block_5$3(ctx) {
  let svg;
  let rect;
  let path;
  return {
    c() {
      svg = svg_element("svg");
      rect = svg_element("rect");
      path = svg_element("path");
      this.h();
    },
    l(nodes) {
      svg = claim_svg_element(nodes, "svg", { viewBox: true, width: true, height: true });
      var svg_nodes = children(svg);
      rect = claim_svg_element(svg_nodes, "rect", {
        x: true,
        y: true,
        width: true,
        height: true,
        stroke: true,
        "stroke-width": true
      });
      children(rect).forEach(detach);
      path = claim_svg_element(svg_nodes, "path", {
        d: true,
        stroke: true,
        "stroke-width": true,
        "stroke-linecap": true
      });
      children(path).forEach(detach);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(rect, "x", "10");
      attr(rect, "y", "5");
      attr(rect, "width", "4");
      attr(rect, "height", "14");
      attr(rect, "stroke", "currentColor");
      attr(rect, "stroke-width", "2");
      attr(path, "d", "M7 8L17 16M17 8L7 16");
      attr(path, "stroke", "currentColor");
      attr(path, "stroke-width", "2");
      attr(path, "stroke-linecap", "round");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "width", "16");
      attr(svg, "height", "16");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      append_hydration(svg, rect);
      append_hydration(svg, path);
    },
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
function create_if_block_4$3(ctx) {
  let svg;
  let rect;
  let path;
  return {
    c() {
      svg = svg_element("svg");
      rect = svg_element("rect");
      path = svg_element("path");
      this.h();
    },
    l(nodes) {
      svg = claim_svg_element(nodes, "svg", { viewBox: true, width: true, height: true });
      var svg_nodes = children(svg);
      rect = claim_svg_element(svg_nodes, "rect", {
        x: true,
        y: true,
        width: true,
        height: true,
        stroke: true,
        "stroke-width": true
      });
      children(rect).forEach(detach);
      path = claim_svg_element(svg_nodes, "path", {
        d: true,
        stroke: true,
        "stroke-width": true,
        "stroke-linecap": true
      });
      children(path).forEach(detach);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(rect, "x", "5");
      attr(rect, "y", "10");
      attr(rect, "width", "14");
      attr(rect, "height", "4");
      attr(rect, "stroke", "currentColor");
      attr(rect, "stroke-width", "2");
      attr(path, "d", "M8 7L16 17M16 7L8 17");
      attr(path, "stroke", "currentColor");
      attr(path, "stroke-width", "2");
      attr(path, "stroke-linecap", "round");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "width", "16");
      attr(svg, "height", "16");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      append_hydration(svg, rect);
      append_hydration(svg, path);
    },
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
function create_if_block_3$3(ctx) {
  let svg;
  let rect;
  let path;
  return {
    c() {
      svg = svg_element("svg");
      rect = svg_element("rect");
      path = svg_element("path");
      this.h();
    },
    l(nodes) {
      svg = claim_svg_element(nodes, "svg", { viewBox: true, width: true, height: true });
      var svg_nodes = children(svg);
      rect = claim_svg_element(svg_nodes, "rect", {
        x: true,
        y: true,
        width: true,
        height: true,
        stroke: true,
        "stroke-width": true
      });
      children(rect).forEach(detach);
      path = claim_svg_element(svg_nodes, "path", {
        d: true,
        stroke: true,
        "stroke-width": true,
        fill: true,
        "stroke-linecap": true
      });
      children(path).forEach(detach);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(rect, "x", "6");
      attr(rect, "y", "4");
      attr(rect, "width", "12");
      attr(rect, "height", "4");
      attr(rect, "stroke", "currentColor");
      attr(rect, "stroke-width", "2");
      attr(path, "d", "M12 12V19M8 16L12 19L16 16");
      attr(path, "stroke", "currentColor");
      attr(path, "stroke-width", "2");
      attr(path, "fill", "none");
      attr(path, "stroke-linecap", "round");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "width", "16");
      attr(svg, "height", "16");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      append_hydration(svg, rect);
      append_hydration(svg, path);
    },
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
function create_if_block_2$3(ctx) {
  let svg;
  let rect;
  let path;
  return {
    c() {
      svg = svg_element("svg");
      rect = svg_element("rect");
      path = svg_element("path");
      this.h();
    },
    l(nodes) {
      svg = claim_svg_element(nodes, "svg", { viewBox: true, width: true, height: true });
      var svg_nodes = children(svg);
      rect = claim_svg_element(svg_nodes, "rect", {
        x: true,
        y: true,
        width: true,
        height: true,
        stroke: true,
        "stroke-width": true
      });
      children(rect).forEach(detach);
      path = claim_svg_element(svg_nodes, "path", {
        d: true,
        stroke: true,
        "stroke-width": true,
        fill: true,
        "stroke-linecap": true
      });
      children(path).forEach(detach);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(rect, "x", "6");
      attr(rect, "y", "16");
      attr(rect, "width", "12");
      attr(rect, "height", "4");
      attr(rect, "stroke", "currentColor");
      attr(rect, "stroke-width", "2");
      attr(path, "d", "M12 12V5M8 8L12 5L16 8");
      attr(path, "stroke", "currentColor");
      attr(path, "stroke-width", "2");
      attr(path, "fill", "none");
      attr(path, "stroke-linecap", "round");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "width", "16");
      attr(svg, "height", "16");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      append_hydration(svg, rect);
      append_hydration(svg, path);
    },
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
function create_if_block_1$3(ctx) {
  let svg;
  let rect;
  let path;
  return {
    c() {
      svg = svg_element("svg");
      rect = svg_element("rect");
      path = svg_element("path");
      this.h();
    },
    l(nodes) {
      svg = claim_svg_element(nodes, "svg", { viewBox: true, width: true, height: true });
      var svg_nodes = children(svg);
      rect = claim_svg_element(svg_nodes, "rect", {
        x: true,
        y: true,
        width: true,
        height: true,
        stroke: true,
        "stroke-width": true,
        fill: true
      });
      children(rect).forEach(detach);
      path = claim_svg_element(svg_nodes, "path", {
        d: true,
        stroke: true,
        "stroke-width": true,
        fill: true,
        "stroke-linecap": true
      });
      children(path).forEach(detach);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(rect, "x", "16");
      attr(rect, "y", "6");
      attr(rect, "width", "4");
      attr(rect, "height", "12");
      attr(rect, "stroke", "currentColor");
      attr(rect, "stroke-width", "2");
      attr(rect, "fill", "none");
      attr(path, "d", "M12 12H5M8 8L5 12L8 16");
      attr(path, "stroke", "currentColor");
      attr(path, "stroke-width", "2");
      attr(path, "fill", "none");
      attr(path, "stroke-linecap", "round");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "width", "16");
      attr(svg, "height", "16");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      append_hydration(svg, rect);
      append_hydration(svg, path);
    },
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
function create_if_block$3(ctx) {
  let svg;
  let rect;
  let path;
  return {
    c() {
      svg = svg_element("svg");
      rect = svg_element("rect");
      path = svg_element("path");
      this.h();
    },
    l(nodes) {
      svg = claim_svg_element(nodes, "svg", { viewBox: true, width: true, height: true });
      var svg_nodes = children(svg);
      rect = claim_svg_element(svg_nodes, "rect", {
        x: true,
        y: true,
        width: true,
        height: true,
        stroke: true,
        "stroke-width": true,
        fill: true
      });
      children(rect).forEach(detach);
      path = claim_svg_element(svg_nodes, "path", {
        d: true,
        stroke: true,
        "stroke-width": true,
        fill: true,
        "stroke-linecap": true
      });
      children(path).forEach(detach);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(rect, "x", "4");
      attr(rect, "y", "6");
      attr(rect, "width", "4");
      attr(rect, "height", "12");
      attr(rect, "stroke", "currentColor");
      attr(rect, "stroke-width", "2");
      attr(rect, "fill", "none");
      attr(path, "d", "M12 12H19M16 8L19 12L16 16");
      attr(path, "stroke", "currentColor");
      attr(path, "stroke-width", "2");
      attr(path, "fill", "none");
      attr(path, "stroke-linecap", "round");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "width", "16");
      attr(svg, "height", "16");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      append_hydration(svg, rect);
      append_hydration(svg, path);
    },
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
function create_fragment$4(ctx) {
  let if_block_anchor;
  function select_block_type(ctx2, dirty) {
    if (
      /*icon*/
      ctx2[0] == "add-column-right"
    )
      return create_if_block$3;
    if (
      /*icon*/
      ctx2[0] == "add-column-left"
    )
      return create_if_block_1$3;
    if (
      /*icon*/
      ctx2[0] == "add-row-above"
    )
      return create_if_block_2$3;
    if (
      /*icon*/
      ctx2[0] == "add-row-below"
    )
      return create_if_block_3$3;
    if (
      /*icon*/
      ctx2[0] == "delete-row"
    )
      return create_if_block_4$3;
    if (
      /*icon*/
      ctx2[0] == "delete-column"
    )
      return create_if_block_5$3;
    if (
      /*icon*/
      ctx2[0] == "sort-asc"
    )
      return create_if_block_6$2;
    if (
      /*icon*/
      ctx2[0] == "sort-desc"
    )
      return create_if_block_7$1;
    if (
      /*icon*/
      ctx2[0] == "clear-sort"
    )
      return create_if_block_8$1;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type && current_block_type(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
    },
    p(ctx2, [dirty]) {
      if (current_block_type !== (current_block_type = select_block_type(ctx2))) {
        if (if_block)
          if_block.d(1);
        if_block = current_block_type && current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if (if_block) {
        if_block.d(detaching);
      }
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let { icon } = $$props;
  $$self.$$set = ($$props2) => {
    if ("icon" in $$props2)
      $$invalidate(0, icon = $$props2.icon);
  };
  return [icon];
}
class CellMenuIcons extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, { icon: 0 });
  }
}
function create_if_block_4$2(ctx) {
  let button0;
  let cellmenuicons0;
  let t0;
  let t1_value = (
    /*i18n*/
    ctx[12]("dataframe.sort_ascending") + ""
  );
  let t1;
  let t2;
  let t3;
  let button1;
  let cellmenuicons1;
  let t4;
  let t5_value = (
    /*i18n*/
    ctx[12]("dataframe.sort_descending") + ""
  );
  let t5;
  let t6;
  let t7;
  let button2;
  let cellmenuicons2;
  let t8;
  let t9_value = (
    /*i18n*/
    ctx[12]("dataframe.clear_sort") + ""
  );
  let t9;
  let current;
  let mounted;
  let dispose;
  cellmenuicons0 = new CellMenuIcons({ props: { icon: "sort-asc" } });
  let if_block0 = (
    /*sort_direction*/
    ctx[10] === "asc" && /*sort_priority*/
    ctx[11] !== null && create_if_block_6$1(ctx)
  );
  cellmenuicons1 = new CellMenuIcons({ props: { icon: "sort-desc" } });
  let if_block1 = (
    /*sort_direction*/
    ctx[10] === "desc" && /*sort_priority*/
    ctx[11] !== null && create_if_block_5$2(ctx)
  );
  cellmenuicons2 = new CellMenuIcons({ props: { icon: "clear-sort" } });
  return {
    c() {
      button0 = element("button");
      create_component(cellmenuicons0.$$.fragment);
      t0 = space();
      t1 = text(t1_value);
      t2 = space();
      if (if_block0)
        if_block0.c();
      t3 = space();
      button1 = element("button");
      create_component(cellmenuicons1.$$.fragment);
      t4 = space();
      t5 = text(t5_value);
      t6 = space();
      if (if_block1)
        if_block1.c();
      t7 = space();
      button2 = element("button");
      create_component(cellmenuicons2.$$.fragment);
      t8 = space();
      t9 = text(t9_value);
      this.h();
    },
    l(nodes) {
      button0 = claim_element(nodes, "BUTTON", { role: true, class: true });
      var button0_nodes = children(button0);
      claim_component(cellmenuicons0.$$.fragment, button0_nodes);
      t0 = claim_space(button0_nodes);
      t1 = claim_text(button0_nodes, t1_value);
      t2 = claim_space(button0_nodes);
      if (if_block0)
        if_block0.l(button0_nodes);
      button0_nodes.forEach(detach);
      t3 = claim_space(nodes);
      button1 = claim_element(nodes, "BUTTON", { role: true, class: true });
      var button1_nodes = children(button1);
      claim_component(cellmenuicons1.$$.fragment, button1_nodes);
      t4 = claim_space(button1_nodes);
      t5 = claim_text(button1_nodes, t5_value);
      t6 = claim_space(button1_nodes);
      if (if_block1)
        if_block1.l(button1_nodes);
      button1_nodes.forEach(detach);
      t7 = claim_space(nodes);
      button2 = claim_element(nodes, "BUTTON", { role: true, class: true });
      var button2_nodes = children(button2);
      claim_component(cellmenuicons2.$$.fragment, button2_nodes);
      t8 = claim_space(button2_nodes);
      t9 = claim_text(button2_nodes, t9_value);
      button2_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(button0, "role", "menuitem");
      attr(button0, "class", "svelte-42thj4");
      toggle_class(
        button0,
        "active",
        /*sort_direction*/
        ctx[10] === "asc"
      );
      attr(button1, "role", "menuitem");
      attr(button1, "class", "svelte-42thj4");
      toggle_class(
        button1,
        "active",
        /*sort_direction*/
        ctx[10] === "desc"
      );
      attr(button2, "role", "menuitem");
      attr(button2, "class", "svelte-42thj4");
    },
    m(target, anchor) {
      insert_hydration(target, button0, anchor);
      mount_component(cellmenuicons0, button0, null);
      append_hydration(button0, t0);
      append_hydration(button0, t1);
      append_hydration(button0, t2);
      if (if_block0)
        if_block0.m(button0, null);
      insert_hydration(target, t3, anchor);
      insert_hydration(target, button1, anchor);
      mount_component(cellmenuicons1, button1, null);
      append_hydration(button1, t4);
      append_hydration(button1, t5);
      append_hydration(button1, t6);
      if (if_block1)
        if_block1.m(button1, null);
      insert_hydration(target, t7, anchor);
      insert_hydration(target, button2, anchor);
      mount_component(cellmenuicons2, button2, null);
      append_hydration(button2, t8);
      append_hydration(button2, t9);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*click_handler*/
            ctx[23]
          ),
          listen(
            button1,
            "click",
            /*click_handler_1*/
            ctx[24]
          ),
          listen(button2, "click", function() {
            if (is_function(
              /*on_clear_sort*/
              ctx[9]
            ))
              ctx[9].apply(this, arguments);
          })
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if ((!current || dirty & /*i18n*/
      4096) && t1_value !== (t1_value = /*i18n*/
      ctx[12]("dataframe.sort_ascending") + ""))
        set_data(t1, t1_value);
      if (
        /*sort_direction*/
        ctx[10] === "asc" && /*sort_priority*/
        ctx[11] !== null
      ) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_6$1(ctx);
          if_block0.c();
          if_block0.m(button0, null);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (!current || dirty & /*sort_direction*/
      1024) {
        toggle_class(
          button0,
          "active",
          /*sort_direction*/
          ctx[10] === "asc"
        );
      }
      if ((!current || dirty & /*i18n*/
      4096) && t5_value !== (t5_value = /*i18n*/
      ctx[12]("dataframe.sort_descending") + ""))
        set_data(t5, t5_value);
      if (
        /*sort_direction*/
        ctx[10] === "desc" && /*sort_priority*/
        ctx[11] !== null
      ) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_5$2(ctx);
          if_block1.c();
          if_block1.m(button1, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (!current || dirty & /*sort_direction*/
      1024) {
        toggle_class(
          button1,
          "active",
          /*sort_direction*/
          ctx[10] === "desc"
        );
      }
      if ((!current || dirty & /*i18n*/
      4096) && t9_value !== (t9_value = /*i18n*/
      ctx[12]("dataframe.clear_sort") + ""))
        set_data(t9, t9_value);
    },
    i(local) {
      if (current)
        return;
      transition_in(cellmenuicons0.$$.fragment, local);
      transition_in(cellmenuicons1.$$.fragment, local);
      transition_in(cellmenuicons2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(cellmenuicons0.$$.fragment, local);
      transition_out(cellmenuicons1.$$.fragment, local);
      transition_out(cellmenuicons2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(button0);
        detach(t3);
        detach(button1);
        detach(t7);
        detach(button2);
      }
      destroy_component(cellmenuicons0);
      if (if_block0)
        if_block0.d();
      destroy_component(cellmenuicons1);
      if (if_block1)
        if_block1.d();
      destroy_component(cellmenuicons2);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_6$1(ctx) {
  let span;
  let t;
  return {
    c() {
      span = element("span");
      t = text(
        /*sort_priority*/
        ctx[11]
      );
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      t = claim_text(
        span_nodes,
        /*sort_priority*/
        ctx[11]
      );
      span_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "priority svelte-42thj4");
    },
    m(target, anchor) {
      insert_hydration(target, span, anchor);
      append_hydration(span, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*sort_priority*/
      2048)
        set_data(
          t,
          /*sort_priority*/
          ctx2[11]
        );
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_if_block_5$2(ctx) {
  let span;
  let t;
  return {
    c() {
      span = element("span");
      t = text(
        /*sort_priority*/
        ctx[11]
      );
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      t = claim_text(
        span_nodes,
        /*sort_priority*/
        ctx[11]
      );
      span_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "priority svelte-42thj4");
    },
    m(target, anchor) {
      insert_hydration(target, span, anchor);
      append_hydration(span, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*sort_priority*/
      2048)
        set_data(
          t,
          /*sort_priority*/
          ctx2[11]
        );
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_if_block_2$2(ctx) {
  let button0;
  let cellmenuicons0;
  let t0;
  let t1_value = (
    /*i18n*/
    ctx[12]("dataframe.add_row_above") + ""
  );
  let t1;
  let t2;
  let button1;
  let cellmenuicons1;
  let t3;
  let t4_value = (
    /*i18n*/
    ctx[12]("dataframe.add_row_below") + ""
  );
  let t4;
  let t5;
  let if_block_anchor;
  let current;
  let mounted;
  let dispose;
  cellmenuicons0 = new CellMenuIcons({ props: { icon: "add-row-above" } });
  cellmenuicons1 = new CellMenuIcons({ props: { icon: "add-row-below" } });
  let if_block = (
    /*can_delete_rows*/
    ctx[6] && create_if_block_3$2(ctx)
  );
  return {
    c() {
      button0 = element("button");
      create_component(cellmenuicons0.$$.fragment);
      t0 = space();
      t1 = text(t1_value);
      t2 = space();
      button1 = element("button");
      create_component(cellmenuicons1.$$.fragment);
      t3 = space();
      t4 = text(t4_value);
      t5 = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l(nodes) {
      button0 = claim_element(nodes, "BUTTON", {
        role: true,
        "aria-label": true,
        class: true
      });
      var button0_nodes = children(button0);
      claim_component(cellmenuicons0.$$.fragment, button0_nodes);
      t0 = claim_space(button0_nodes);
      t1 = claim_text(button0_nodes, t1_value);
      button0_nodes.forEach(detach);
      t2 = claim_space(nodes);
      button1 = claim_element(nodes, "BUTTON", {
        role: true,
        "aria-label": true,
        class: true
      });
      var button1_nodes = children(button1);
      claim_component(cellmenuicons1.$$.fragment, button1_nodes);
      t3 = claim_space(button1_nodes);
      t4 = claim_text(button1_nodes, t4_value);
      button1_nodes.forEach(detach);
      t5 = claim_space(nodes);
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h() {
      attr(button0, "role", "menuitem");
      attr(button0, "aria-label", "Add row above");
      attr(button0, "class", "svelte-42thj4");
      attr(button1, "role", "menuitem");
      attr(button1, "aria-label", "Add row below");
      attr(button1, "class", "svelte-42thj4");
    },
    m(target, anchor) {
      insert_hydration(target, button0, anchor);
      mount_component(cellmenuicons0, button0, null);
      append_hydration(button0, t0);
      append_hydration(button0, t1);
      insert_hydration(target, t2, anchor);
      insert_hydration(target, button1, anchor);
      mount_component(cellmenuicons1, button1, null);
      append_hydration(button1, t3);
      append_hydration(button1, t4);
      insert_hydration(target, t5, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*click_handler_2*/
            ctx[25]
          ),
          listen(
            button1,
            "click",
            /*click_handler_3*/
            ctx[26]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if ((!current || dirty & /*i18n*/
      4096) && t1_value !== (t1_value = /*i18n*/
      ctx2[12]("dataframe.add_row_above") + ""))
        set_data(t1, t1_value);
      if ((!current || dirty & /*i18n*/
      4096) && t4_value !== (t4_value = /*i18n*/
      ctx2[12]("dataframe.add_row_below") + ""))
        set_data(t4, t4_value);
      if (
        /*can_delete_rows*/
        ctx2[6]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*can_delete_rows*/
          64) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_3$2(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(cellmenuicons0.$$.fragment, local);
      transition_in(cellmenuicons1.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(cellmenuicons0.$$.fragment, local);
      transition_out(cellmenuicons1.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(button0);
        detach(t2);
        detach(button1);
        detach(t5);
        detach(if_block_anchor);
      }
      destroy_component(cellmenuicons0);
      destroy_component(cellmenuicons1);
      if (if_block)
        if_block.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_3$2(ctx) {
  let button;
  let cellmenuicons;
  let t0;
  let t1_value = (
    /*i18n*/
    ctx[12]("dataframe.delete_row") + ""
  );
  let t1;
  let current;
  let mounted;
  let dispose;
  cellmenuicons = new CellMenuIcons({ props: { icon: "delete-row" } });
  return {
    c() {
      button = element("button");
      create_component(cellmenuicons.$$.fragment);
      t0 = space();
      t1 = text(t1_value);
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", {
        role: true,
        class: true,
        "aria-label": true
      });
      var button_nodes = children(button);
      claim_component(cellmenuicons.$$.fragment, button_nodes);
      t0 = claim_space(button_nodes);
      t1 = claim_text(button_nodes, t1_value);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(button, "role", "menuitem");
      attr(button, "class", "delete svelte-42thj4");
      attr(button, "aria-label", "Delete row");
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      mount_component(cellmenuicons, button, null);
      append_hydration(button, t0);
      append_hydration(button, t1);
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", function() {
          if (is_function(
            /*on_delete_row*/
            ctx[4]
          ))
            ctx[4].apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if ((!current || dirty & /*i18n*/
      4096) && t1_value !== (t1_value = /*i18n*/
      ctx[12]("dataframe.delete_row") + ""))
        set_data(t1, t1_value);
    },
    i(local) {
      if (current)
        return;
      transition_in(cellmenuicons.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(cellmenuicons.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      destroy_component(cellmenuicons);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block$2(ctx) {
  let button0;
  let cellmenuicons0;
  let t0;
  let t1_value = (
    /*i18n*/
    ctx[12]("dataframe.add_column_left") + ""
  );
  let t1;
  let t2;
  let button1;
  let cellmenuicons1;
  let t3;
  let t4_value = (
    /*i18n*/
    ctx[12]("dataframe.add_column_right") + ""
  );
  let t4;
  let t5;
  let if_block_anchor;
  let current;
  let mounted;
  let dispose;
  cellmenuicons0 = new CellMenuIcons({ props: { icon: "add-column-left" } });
  cellmenuicons1 = new CellMenuIcons({ props: { icon: "add-column-right" } });
  let if_block = (
    /*can_delete_cols*/
    ctx[7] && create_if_block_1$2(ctx)
  );
  return {
    c() {
      button0 = element("button");
      create_component(cellmenuicons0.$$.fragment);
      t0 = space();
      t1 = text(t1_value);
      t2 = space();
      button1 = element("button");
      create_component(cellmenuicons1.$$.fragment);
      t3 = space();
      t4 = text(t4_value);
      t5 = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l(nodes) {
      button0 = claim_element(nodes, "BUTTON", {
        role: true,
        "aria-label": true,
        class: true
      });
      var button0_nodes = children(button0);
      claim_component(cellmenuicons0.$$.fragment, button0_nodes);
      t0 = claim_space(button0_nodes);
      t1 = claim_text(button0_nodes, t1_value);
      button0_nodes.forEach(detach);
      t2 = claim_space(nodes);
      button1 = claim_element(nodes, "BUTTON", {
        role: true,
        "aria-label": true,
        class: true
      });
      var button1_nodes = children(button1);
      claim_component(cellmenuicons1.$$.fragment, button1_nodes);
      t3 = claim_space(button1_nodes);
      t4 = claim_text(button1_nodes, t4_value);
      button1_nodes.forEach(detach);
      t5 = claim_space(nodes);
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h() {
      attr(button0, "role", "menuitem");
      attr(button0, "aria-label", "Add column to the left");
      attr(button0, "class", "svelte-42thj4");
      attr(button1, "role", "menuitem");
      attr(button1, "aria-label", "Add column to the right");
      attr(button1, "class", "svelte-42thj4");
    },
    m(target, anchor) {
      insert_hydration(target, button0, anchor);
      mount_component(cellmenuicons0, button0, null);
      append_hydration(button0, t0);
      append_hydration(button0, t1);
      insert_hydration(target, t2, anchor);
      insert_hydration(target, button1, anchor);
      mount_component(cellmenuicons1, button1, null);
      append_hydration(button1, t3);
      append_hydration(button1, t4);
      insert_hydration(target, t5, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*click_handler_4*/
            ctx[27]
          ),
          listen(
            button1,
            "click",
            /*click_handler_5*/
            ctx[28]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if ((!current || dirty & /*i18n*/
      4096) && t1_value !== (t1_value = /*i18n*/
      ctx2[12]("dataframe.add_column_left") + ""))
        set_data(t1, t1_value);
      if ((!current || dirty & /*i18n*/
      4096) && t4_value !== (t4_value = /*i18n*/
      ctx2[12]("dataframe.add_column_right") + ""))
        set_data(t4, t4_value);
      if (
        /*can_delete_cols*/
        ctx2[7]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*can_delete_cols*/
          128) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_1$2(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(cellmenuicons0.$$.fragment, local);
      transition_in(cellmenuicons1.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(cellmenuicons0.$$.fragment, local);
      transition_out(cellmenuicons1.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(button0);
        detach(t2);
        detach(button1);
        detach(t5);
        detach(if_block_anchor);
      }
      destroy_component(cellmenuicons0);
      destroy_component(cellmenuicons1);
      if (if_block)
        if_block.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_1$2(ctx) {
  let button;
  let cellmenuicons;
  let t0;
  let t1_value = (
    /*i18n*/
    ctx[12]("dataframe.delete_column") + ""
  );
  let t1;
  let current;
  let mounted;
  let dispose;
  cellmenuicons = new CellMenuIcons({ props: { icon: "delete-column" } });
  return {
    c() {
      button = element("button");
      create_component(cellmenuicons.$$.fragment);
      t0 = space();
      t1 = text(t1_value);
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", {
        role: true,
        class: true,
        "aria-label": true
      });
      var button_nodes = children(button);
      claim_component(cellmenuicons.$$.fragment, button_nodes);
      t0 = claim_space(button_nodes);
      t1 = claim_text(button_nodes, t1_value);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(button, "role", "menuitem");
      attr(button, "class", "delete svelte-42thj4");
      attr(button, "aria-label", "Delete column");
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      mount_component(cellmenuicons, button, null);
      append_hydration(button, t0);
      append_hydration(button, t1);
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", function() {
          if (is_function(
            /*on_delete_col*/
            ctx[5]
          ))
            ctx[5].apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if ((!current || dirty & /*i18n*/
      4096) && t1_value !== (t1_value = /*i18n*/
      ctx[12]("dataframe.delete_column") + ""))
        set_data(t1, t1_value);
    },
    i(local) {
      if (current)
        return;
      transition_in(cellmenuicons.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(cellmenuicons.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      destroy_component(cellmenuicons);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$3(ctx) {
  let div;
  let t0;
  let t1;
  let current;
  let if_block0 = (
    /*is_header*/
    ctx[16] && create_if_block_4$2(ctx)
  );
  let if_block1 = !/*is_header*/
  ctx[16] && /*can_add_rows*/
  ctx[15] && create_if_block_2$2(ctx);
  let if_block2 = (
    /*can_add_columns*/
    ctx[14] && create_if_block$2(ctx)
  );
  return {
    c() {
      div = element("div");
      if (if_block0)
        if_block0.c();
      t0 = space();
      if (if_block1)
        if_block1.c();
      t1 = space();
      if (if_block2)
        if_block2.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, role: true });
      var div_nodes = children(div);
      if (if_block0)
        if_block0.l(div_nodes);
      t0 = claim_space(div_nodes);
      if (if_block1)
        if_block1.l(div_nodes);
      t1 = claim_space(div_nodes);
      if (if_block2)
        if_block2.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "cell-menu svelte-42thj4");
      attr(div, "role", "menu");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (if_block0)
        if_block0.m(div, null);
      append_hydration(div, t0);
      if (if_block1)
        if_block1.m(div, null);
      append_hydration(div, t1);
      if (if_block2)
        if_block2.m(div, null);
      ctx[29](div);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*is_header*/
        ctx2[16]
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty & /*is_header*/
          65536) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_4$2(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (!/*is_header*/
      ctx2[16] && /*can_add_rows*/
      ctx2[15]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & /*is_header, can_add_rows*/
          98304) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_2$2(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div, t1);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (
        /*can_add_columns*/
        ctx2[14]
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
          if (dirty & /*can_add_columns*/
          16384) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block$2(ctx2);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(div, null);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(if_block2);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(if_block2);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      if (if_block2)
        if_block2.d();
      ctx[29](null);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let is_header;
  let can_add_rows;
  let can_add_columns;
  let { x } = $$props;
  let { y } = $$props;
  let { on_add_row_above } = $$props;
  let { on_add_row_below } = $$props;
  let { on_add_column_left } = $$props;
  let { on_add_column_right } = $$props;
  let { row } = $$props;
  let { col_count } = $$props;
  let { row_count } = $$props;
  let { on_delete_row } = $$props;
  let { on_delete_col } = $$props;
  let { can_delete_rows } = $$props;
  let { can_delete_cols } = $$props;
  let { on_sort = () => {
  } } = $$props;
  let { on_clear_sort = () => {
  } } = $$props;
  let { sort_direction = null } = $$props;
  let { sort_priority = null } = $$props;
  let { editable = true } = $$props;
  let { i18n } = $$props;
  let menu_element;
  onMount(() => {
    position_menu();
  });
  function position_menu() {
    if (!menu_element)
      return;
    const viewport_width = window.innerWidth;
    const viewport_height = window.innerHeight;
    const menu_rect = menu_element.getBoundingClientRect();
    let new_x = x - 30;
    let new_y = y - 20;
    if (new_x + menu_rect.width > viewport_width) {
      new_x = x - menu_rect.width + 10;
    }
    if (new_y + menu_rect.height > viewport_height) {
      new_y = y - menu_rect.height + 10;
    }
    $$invalidate(13, menu_element.style.left = `${new_x}px`, menu_element);
    $$invalidate(13, menu_element.style.top = `${new_y}px`, menu_element);
  }
  const click_handler = () => on_sort("asc");
  const click_handler_1 = () => on_sort("desc");
  const click_handler_2 = () => on_add_row_above();
  const click_handler_3 = () => on_add_row_below();
  const click_handler_4 = () => on_add_column_left();
  const click_handler_5 = () => on_add_column_right();
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      menu_element = $$value;
      $$invalidate(13, menu_element);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("x" in $$props2)
      $$invalidate(17, x = $$props2.x);
    if ("y" in $$props2)
      $$invalidate(18, y = $$props2.y);
    if ("on_add_row_above" in $$props2)
      $$invalidate(0, on_add_row_above = $$props2.on_add_row_above);
    if ("on_add_row_below" in $$props2)
      $$invalidate(1, on_add_row_below = $$props2.on_add_row_below);
    if ("on_add_column_left" in $$props2)
      $$invalidate(2, on_add_column_left = $$props2.on_add_column_left);
    if ("on_add_column_right" in $$props2)
      $$invalidate(3, on_add_column_right = $$props2.on_add_column_right);
    if ("row" in $$props2)
      $$invalidate(19, row = $$props2.row);
    if ("col_count" in $$props2)
      $$invalidate(20, col_count = $$props2.col_count);
    if ("row_count" in $$props2)
      $$invalidate(21, row_count = $$props2.row_count);
    if ("on_delete_row" in $$props2)
      $$invalidate(4, on_delete_row = $$props2.on_delete_row);
    if ("on_delete_col" in $$props2)
      $$invalidate(5, on_delete_col = $$props2.on_delete_col);
    if ("can_delete_rows" in $$props2)
      $$invalidate(6, can_delete_rows = $$props2.can_delete_rows);
    if ("can_delete_cols" in $$props2)
      $$invalidate(7, can_delete_cols = $$props2.can_delete_cols);
    if ("on_sort" in $$props2)
      $$invalidate(8, on_sort = $$props2.on_sort);
    if ("on_clear_sort" in $$props2)
      $$invalidate(9, on_clear_sort = $$props2.on_clear_sort);
    if ("sort_direction" in $$props2)
      $$invalidate(10, sort_direction = $$props2.sort_direction);
    if ("sort_priority" in $$props2)
      $$invalidate(11, sort_priority = $$props2.sort_priority);
    if ("editable" in $$props2)
      $$invalidate(22, editable = $$props2.editable);
    if ("i18n" in $$props2)
      $$invalidate(12, i18n = $$props2.i18n);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*row*/
    524288) {
      $$invalidate(16, is_header = row === -1);
    }
    if ($$self.$$.dirty & /*editable, row_count*/
    6291456) {
      $$invalidate(15, can_add_rows = editable && row_count[1] === "dynamic");
    }
    if ($$self.$$.dirty & /*editable, col_count*/
    5242880) {
      $$invalidate(14, can_add_columns = editable && col_count[1] === "dynamic");
    }
  };
  return [
    on_add_row_above,
    on_add_row_below,
    on_add_column_left,
    on_add_column_right,
    on_delete_row,
    on_delete_col,
    can_delete_rows,
    can_delete_cols,
    on_sort,
    on_clear_sort,
    sort_direction,
    sort_priority,
    i18n,
    menu_element,
    can_add_columns,
    can_add_rows,
    is_header,
    x,
    y,
    row,
    col_count,
    row_count,
    editable,
    click_handler,
    click_handler_1,
    click_handler_2,
    click_handler_3,
    click_handler_4,
    click_handler_5,
    div_binding
  ];
}
class CellMenu extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, {
      x: 17,
      y: 18,
      on_add_row_above: 0,
      on_add_row_below: 1,
      on_add_column_left: 2,
      on_add_column_right: 3,
      row: 19,
      col_count: 20,
      row_count: 21,
      on_delete_row: 4,
      on_delete_col: 5,
      can_delete_rows: 6,
      can_delete_cols: 7,
      on_sort: 8,
      on_clear_sort: 9,
      sort_direction: 10,
      sort_priority: 11,
      editable: 22,
      i18n: 12
    });
  }
}
function create_if_block_4$1(ctx) {
  let div;
  let input;
  let input_value_value;
  let input_placeholder_value;
  let input_title_value;
  let t;
  let current;
  let mounted;
  let dispose;
  let if_block = (
    /*current_search_query*/
    ctx[0] && /*show_search*/
    ctx[3] === "filter" && create_if_block_5$1(ctx)
  );
  return {
    c() {
      div = element("div");
      input = element("input");
      t = space();
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      input = claim_element(div_nodes, "INPUT", {
        type: true,
        placeholder: true,
        class: true,
        title: true
      });
      t = claim_space(div_nodes);
      if (if_block)
        if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(input, "type", "text");
      input.value = input_value_value = /*current_search_query*/
      ctx[0] || "";
      attr(input, "placeholder", input_placeholder_value = /*show_search*/
      ctx[3] === "filter" ? "Filter..." : "Search...");
      attr(input, "class", "search-input svelte-b1nr0g");
      attr(input, "title", input_title_value = `Enter text to ${/*show_search*/
      ctx[3]} the table`);
      toggle_class(
        input,
        "filter-mode",
        /*show_search*/
        ctx[3] === "filter"
      );
      attr(div, "class", "search-container svelte-b1nr0g");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, input);
      append_hydration(div, t);
      if (if_block)
        if_block.m(div, null);
      current = true;
      if (!mounted) {
        dispose = listen(
          input,
          "input",
          /*handle_search_input*/
          ctx[7]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (!current || dirty & /*current_search_query*/
      1 && input_value_value !== (input_value_value = /*current_search_query*/
      ctx2[0] || "") && input.value !== input_value_value) {
        input.value = input_value_value;
      }
      if (!current || dirty & /*show_search*/
      8 && input_placeholder_value !== (input_placeholder_value = /*show_search*/
      ctx2[3] === "filter" ? "Filter..." : "Search...")) {
        attr(input, "placeholder", input_placeholder_value);
      }
      if (!current || dirty & /*show_search*/
      8 && input_title_value !== (input_title_value = `Enter text to ${/*show_search*/
      ctx2[3]} the table`)) {
        attr(input, "title", input_title_value);
      }
      if (!current || dirty & /*show_search*/
      8) {
        toggle_class(
          input,
          "filter-mode",
          /*show_search*/
          ctx2[3] === "filter"
        );
      }
      if (
        /*current_search_query*/
        ctx2[0] && /*show_search*/
        ctx2[3] === "filter"
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*current_search_query, show_search*/
          9) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_5$1(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block)
        if_block.d();
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_5$1(ctx) {
  let button;
  let check;
  let current;
  let mounted;
  let dispose;
  check = new Check({});
  return {
    c() {
      button = element("button");
      create_component(check.$$.fragment);
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", {
        class: true,
        "aria-label": true,
        title: true
      });
      var button_nodes = children(button);
      claim_component(check.$$.fragment, button_nodes);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(button, "class", "toolbar-button check-button svelte-b1nr0g");
      attr(button, "aria-label", "Apply filter and update dataframe values");
      attr(button, "title", "Apply filter and update dataframe values");
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      mount_component(check, button, null);
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", function() {
          if (is_function(
            /*on_commit_filter*/
            ctx[5]
          ))
            ctx[5].apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    i(local) {
      if (current)
        return;
      transition_in(check.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(check.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      destroy_component(check);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_2$1(ctx) {
  let button;
  let current_block_type_index;
  let if_block;
  let button_aria_label_value;
  let button_title_value;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block_3$1, create_else_block_1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*copied*/
      ctx2[6]
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      button = element("button");
      if_block.c();
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", {
        class: true,
        "aria-label": true,
        title: true
      });
      var button_nodes = children(button);
      if_block.l(button_nodes);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(button, "class", "toolbar-button svelte-b1nr0g");
      attr(button, "aria-label", button_aria_label_value = /*copied*/
      ctx[6] ? "Copied to clipboard" : "Copy table data");
      attr(button, "title", button_title_value = /*copied*/
      ctx[6] ? "Copied to clipboard" : "Copy table data");
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      if_blocks[current_block_type_index].m(button, null);
      current = true;
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*handle_copy*/
          ctx[8]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index !== previous_block_index) {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        }
        transition_in(if_block, 1);
        if_block.m(button, null);
      }
      if (!current || dirty & /*copied*/
      64 && button_aria_label_value !== (button_aria_label_value = /*copied*/
      ctx2[6] ? "Copied to clipboard" : "Copy table data")) {
        attr(button, "aria-label", button_aria_label_value);
      }
      if (!current || dirty & /*copied*/
      64 && button_title_value !== (button_title_value = /*copied*/
      ctx2[6] ? "Copied to clipboard" : "Copy table data")) {
        attr(button, "title", button_title_value);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      if_blocks[current_block_type_index].d();
      mounted = false;
      dispose();
    }
  };
}
function create_else_block_1(ctx) {
  let copy;
  let current;
  copy = new Copy({});
  return {
    c() {
      create_component(copy.$$.fragment);
    },
    l(nodes) {
      claim_component(copy.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(copy, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(copy.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(copy.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(copy, detaching);
    }
  };
}
function create_if_block_3$1(ctx) {
  let check;
  let current;
  check = new Check({});
  return {
    c() {
      create_component(check.$$.fragment);
    },
    l(nodes) {
      claim_component(check.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(check, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(check.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(check.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(check, detaching);
    }
  };
}
function create_if_block$1(ctx) {
  let button;
  let current_block_type_index;
  let if_block;
  let button_aria_label_value;
  let button_title_value;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block_1$1, create_else_block];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    if (
      /*is_fullscreen*/
      ctx2[4]
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type_1(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      button = element("button");
      if_block.c();
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", {
        class: true,
        "aria-label": true,
        title: true
      });
      var button_nodes = children(button);
      if_block.l(button_nodes);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(button, "class", "toolbar-button svelte-b1nr0g");
      attr(button, "aria-label", button_aria_label_value = /*is_fullscreen*/
      ctx[4] ? "Exit fullscreen" : "Enter fullscreen");
      attr(button, "title", button_title_value = /*is_fullscreen*/
      ctx[4] ? "Exit fullscreen" : "Enter fullscreen");
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      if_blocks[current_block_type_index].m(button, null);
      current = true;
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler*/
          ctx[10]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx2);
      if (current_block_type_index !== previous_block_index) {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        }
        transition_in(if_block, 1);
        if_block.m(button, null);
      }
      if (!current || dirty & /*is_fullscreen*/
      16 && button_aria_label_value !== (button_aria_label_value = /*is_fullscreen*/
      ctx2[4] ? "Exit fullscreen" : "Enter fullscreen")) {
        attr(button, "aria-label", button_aria_label_value);
      }
      if (!current || dirty & /*is_fullscreen*/
      16 && button_title_value !== (button_title_value = /*is_fullscreen*/
      ctx2[4] ? "Exit fullscreen" : "Enter fullscreen")) {
        attr(button, "title", button_title_value);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      if_blocks[current_block_type_index].d();
      mounted = false;
      dispose();
    }
  };
}
function create_else_block(ctx) {
  let maximize;
  let current;
  maximize = new Maximize({});
  return {
    c() {
      create_component(maximize.$$.fragment);
    },
    l(nodes) {
      claim_component(maximize.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(maximize, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(maximize.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(maximize.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(maximize, detaching);
    }
  };
}
function create_if_block_1$1(ctx) {
  let minimize;
  let current;
  minimize = new Minimize({});
  return {
    c() {
      create_component(minimize.$$.fragment);
    },
    l(nodes) {
      claim_component(minimize.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(minimize, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(minimize.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(minimize.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(minimize, detaching);
    }
  };
}
function create_fragment$2(ctx) {
  let div1;
  let div0;
  let t0;
  let t1;
  let current;
  let if_block0 = (
    /*show_search*/
    ctx[3] !== "none" && create_if_block_4$1(ctx)
  );
  let if_block1 = (
    /*show_copy_button*/
    ctx[2] && create_if_block_2$1(ctx)
  );
  let if_block2 = (
    /*show_fullscreen_button*/
    ctx[1] && create_if_block$1(ctx)
  );
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      if (if_block0)
        if_block0.c();
      t0 = space();
      if (if_block1)
        if_block1.c();
      t1 = space();
      if (if_block2)
        if_block2.c();
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", {
        class: true,
        role: true,
        "aria-label": true
      });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      if (if_block0)
        if_block0.l(div0_nodes);
      t0 = claim_space(div0_nodes);
      if (if_block1)
        if_block1.l(div0_nodes);
      t1 = claim_space(div0_nodes);
      if (if_block2)
        if_block2.l(div0_nodes);
      div0_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "toolbar-buttons svelte-b1nr0g");
      attr(div1, "class", "toolbar svelte-b1nr0g");
      attr(div1, "role", "toolbar");
      attr(div1, "aria-label", "Table actions");
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      append_hydration(div1, div0);
      if (if_block0)
        if_block0.m(div0, null);
      append_hydration(div0, t0);
      if (if_block1)
        if_block1.m(div0, null);
      append_hydration(div0, t1);
      if (if_block2)
        if_block2.m(div0, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*show_search*/
        ctx2[3] !== "none"
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty & /*show_search*/
          8) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_4$1(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div0, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (
        /*show_copy_button*/
        ctx2[2]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & /*show_copy_button*/
          4) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_2$1(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div0, t1);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (
        /*show_fullscreen_button*/
        ctx2[1]
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
          if (dirty & /*show_fullscreen_button*/
          2) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block$1(ctx2);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(div0, null);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(if_block2);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(if_block2);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      if (if_block2)
        if_block2.d();
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { show_fullscreen_button = false } = $$props;
  let { show_copy_button = false } = $$props;
  let { show_search = "none" } = $$props;
  let { is_fullscreen = false } = $$props;
  let { on_copy } = $$props;
  let { on_commit_filter } = $$props;
  const dispatch = createEventDispatcher();
  let copied = false;
  let timer;
  let { current_search_query = null } = $$props;
  let input_value = "";
  function handle_search_input(e) {
    const target = e.target;
    input_value = target.value;
    const new_query = input_value || null;
    if (current_search_query !== new_query) {
      $$invalidate(0, current_search_query = new_query);
      dispatch("search", current_search_query);
    }
  }
  function copy_feedback() {
    $$invalidate(6, copied = true);
    if (timer)
      clearTimeout(timer);
    timer = setTimeout(
      () => {
        $$invalidate(6, copied = false);
      },
      2e3
    );
  }
  async function handle_copy() {
    await on_copy();
    copy_feedback();
  }
  onDestroy(() => {
    if (timer)
      clearTimeout(timer);
  });
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$props2) => {
    if ("show_fullscreen_button" in $$props2)
      $$invalidate(1, show_fullscreen_button = $$props2.show_fullscreen_button);
    if ("show_copy_button" in $$props2)
      $$invalidate(2, show_copy_button = $$props2.show_copy_button);
    if ("show_search" in $$props2)
      $$invalidate(3, show_search = $$props2.show_search);
    if ("is_fullscreen" in $$props2)
      $$invalidate(4, is_fullscreen = $$props2.is_fullscreen);
    if ("on_copy" in $$props2)
      $$invalidate(9, on_copy = $$props2.on_copy);
    if ("on_commit_filter" in $$props2)
      $$invalidate(5, on_commit_filter = $$props2.on_commit_filter);
    if ("current_search_query" in $$props2)
      $$invalidate(0, current_search_query = $$props2.current_search_query);
  };
  return [
    current_search_query,
    show_fullscreen_button,
    show_copy_button,
    show_search,
    is_fullscreen,
    on_commit_filter,
    copied,
    handle_search_input,
    handle_copy,
    on_copy,
    click_handler
  ];
}
class Toolbar extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {
      show_fullscreen_button: 1,
      show_copy_button: 2,
      show_search: 3,
      is_fullscreen: 4,
      on_copy: 9,
      on_commit_filter: 5,
      current_search_query: 0
    });
  }
}
function make_headers(_head, col_count, els, make_id2) {
  let _h = _head || [];
  if (col_count[1] === "fixed" && _h.length < col_count[0]) {
    const fill = Array(col_count[0] - _h.length).fill("").map((_, i) => `${i + _h.length}`);
    _h = _h.concat(fill);
  }
  if (!_h || _h.length === 0) {
    return Array(col_count[0]).fill(0).map((_, i) => {
      const _id = make_id2();
      els[_id] = { cell: null, input: null };
      return { id: _id, value: JSON.stringify(i + 1) };
    });
  }
  return _h.map((h, i) => {
    const _id = make_id2();
    els[_id] = { cell: null, input: null };
    return { id: _id, value: h ?? "" };
  });
}
function process_data(values, els, data_binding, make_id2, display_value = null) {
  if (!values || values.length === 0) {
    return [];
  }
  const result = values.map((row, i) => {
    return row.map((value, j) => {
      var _a;
      const _id = make_id2();
      els[_id] = { cell: null, input: null };
      data_binding[_id] = value;
      let display = (_a = display_value == null ? void 0 : display_value[i]) == null ? void 0 : _a[j];
      if (display === void 0) {
        display = String(value);
      }
      return {
        id: _id,
        value,
        display_value: display
      };
    });
  });
  return result;
}
function handle_header_navigation(event, ctx) {
  if (ctx.selected_header === false || ctx.header_edit !== false)
    return false;
  switch (event.key) {
    case "ArrowDown":
      ctx.df_actions.set_selected_header(false);
      ctx.df_actions.set_selected([0, ctx.selected_header]);
      ctx.df_actions.set_selected_cells([[0, ctx.selected_header]]);
      return true;
    case "ArrowLeft":
      ctx.df_actions.set_selected_header(
        ctx.selected_header > 0 ? ctx.selected_header - 1 : ctx.selected_header
      );
      return true;
    case "ArrowRight":
      ctx.df_actions.set_selected_header(
        ctx.selected_header < ctx.headers.length - 1 ? ctx.selected_header + 1 : ctx.selected_header
      );
      return true;
    case "Escape":
      event.preventDefault();
      ctx.df_actions.set_selected_header(false);
      return true;
    case "Enter":
      event.preventDefault();
      if (ctx.editable) {
        ctx.df_actions.set_header_edit(ctx.selected_header);
      }
      return true;
  }
  return false;
}
function handle_delete_operation(event, ctx) {
  if (!ctx.editable)
    return false;
  if (event.key !== "Delete" && event.key !== "Backspace")
    return false;
  if (ctx.editing) {
    const [row, col] = ctx.editing;
    const input_el = ctx.els[ctx.data[row][col].id].input;
    if (input_el && input_el.selectionStart !== input_el.selectionEnd) {
      return false;
    }
    if (event.key === "Delete" && (input_el == null ? void 0 : input_el.selectionStart) !== (input_el == null ? void 0 : input_el.value.length)) {
      return false;
    }
    if (event.key === "Backspace" && (input_el == null ? void 0 : input_el.selectionStart) !== 0) {
      return false;
    }
  }
  event.preventDefault();
  if (ctx.selected_cells.length > 0) {
    const new_data = handle_delete_key(ctx.data, ctx.selected_cells);
    ctx.dispatch("change", {
      data: new_data.map((row) => row.map((cell) => cell.value)),
      headers: ctx.headers.map((h) => h.value),
      metadata: null
    });
    ctx.dispatch("input");
  }
  return true;
}
function handle_arrow_keys(event, ctx, i, j) {
  if (ctx.editing)
    return false;
  event.preventDefault();
  const next_coords = ctx.move_cursor(event, [i, j], ctx.data);
  if (next_coords) {
    if (event.shiftKey) {
      ctx.df_actions.set_selected_cells(
        ctx.get_range_selection(
          ctx.selected_cells.length > 0 ? ctx.selected_cells[0] : [i, j],
          next_coords
        )
      );
      ctx.df_actions.set_editing(false);
    } else {
      ctx.df_actions.set_selected_cells([next_coords]);
      ctx.df_actions.set_editing(false);
    }
    ctx.df_actions.set_selected(next_coords);
  } else if (next_coords === false && event.key === "ArrowUp" && i === 0) {
    ctx.df_actions.set_selected_header(j);
    ctx.df_actions.set_selected(false);
    ctx.df_actions.set_selected_cells([]);
    ctx.df_actions.set_editing(false);
  }
  return true;
}
async function handle_enter_key(event, ctx, i, j) {
  event.preventDefault();
  if (!ctx.editable)
    return false;
  if (event.shiftKey) {
    await ctx.add_row(i);
    await tick();
    ctx.df_actions.set_selected([i + 1, j]);
  } else {
    if (dequal(ctx.editing, [i, j])) {
      const cell_id = ctx.data[i][j].id;
      const input_el = ctx.els[cell_id].input;
      if (input_el) {
        const old_value = ctx.data[i][j].value;
        ctx.data[i][j].value = input_el.value;
        if (old_value !== input_el.value) {
          ctx.dispatch("input");
        }
      }
      ctx.df_actions.set_editing(false);
      await tick();
      ctx.df_actions.set_selected([i, j]);
    } else {
      ctx.df_actions.set_editing([i, j]);
    }
  }
  return true;
}
function handle_tab_key(event, ctx, i, j) {
  event.preventDefault();
  ctx.df_actions.set_editing(false);
  const next_cell = ctx.get_next_cell_coordinates(
    [i, j],
    ctx.data,
    event.shiftKey
  );
  if (next_cell) {
    ctx.df_actions.set_selected_cells([next_cell]);
    ctx.df_actions.set_selected(next_cell);
    if (ctx.editable) {
      ctx.df_actions.set_editing(next_cell);
    }
  }
  return true;
}
function handle_default_key(event, ctx, i, j) {
  if (!ctx.editable)
    return false;
  if ((!ctx.editing || ctx.editing && dequal(ctx.editing, [i, j])) && event.key.length === 1) {
    ctx.df_actions.set_editing([i, j]);
    return true;
  }
  return false;
}
async function handle_cell_navigation(event, ctx) {
  if (!ctx.selected)
    return false;
  if (event.key === "c" && (event.metaKey || event.ctrlKey)) {
    event.preventDefault();
    if (ctx.selected_cells.length > 0) {
      await copy_table_data(ctx.data, ctx.selected_cells);
    }
    ctx.set_copy_flash(true);
    return true;
  }
  const [i, j] = ctx.selected;
  switch (event.key) {
    case "ArrowRight":
    case "ArrowLeft":
    case "ArrowDown":
    case "ArrowUp":
      return handle_arrow_keys(event, ctx, i, j);
    case "Escape":
      if (!ctx.editable)
        return false;
      event.preventDefault();
      ctx.df_actions.set_editing(false);
      tick().then(() => {
        if (ctx.parent_element) {
          ctx.parent_element.focus();
        }
      });
      return true;
    case "Enter":
      return await handle_enter_key(event, ctx, i, j);
    case "Tab":
      return handle_tab_key(event, ctx, i, j);
    default:
      return handle_default_key(event, ctx, i, j);
  }
}
async function handle_keydown(event, context) {
  if (handle_header_navigation(event, context))
    return;
  if (handle_delete_operation(event, context))
    return;
  await handle_cell_navigation(event, context);
}
function create_drag_handlers(state, set_is_dragging, set_selected_cells, set_selected, handle_cell_click, show_row_numbers, parent_element) {
  const start_drag = (event, row, col) => {
    if (event.target instanceof HTMLAnchorElement || show_row_numbers && col === -1)
      return;
    event.preventDefault();
    event.stopPropagation();
    state.mouse_down_pos = { x: event.clientX, y: event.clientY };
    state.drag_start = [row, col];
    if (!event.shiftKey && !event.metaKey && !event.ctrlKey) {
      set_selected_cells([[row, col]]);
      set_selected([row, col]);
    }
  };
  const update_selection = (event) => {
    const cell = event.target.closest("td");
    if (!cell)
      return;
    const row = parseInt(cell.getAttribute("data-row") || "0");
    const col = parseInt(cell.getAttribute("data-col") || "0");
    if (isNaN(row) || isNaN(col))
      return;
    const selection_range = get_range_selection(state.drag_start, [row, col]);
    set_selected_cells(selection_range);
    set_selected([row, col]);
  };
  const end_drag = (event) => {
    if (!state.is_dragging && state.drag_start) {
      handle_cell_click(event, state.drag_start[0], state.drag_start[1]);
    } else if (state.is_dragging && parent_element) {
      parent_element.focus();
    }
    state.is_dragging = false;
    set_is_dragging(false);
    state.drag_start = null;
    state.mouse_down_pos = null;
  };
  return {
    handle_mouse_down: start_drag,
    handle_mouse_move(event) {
      if (!state.drag_start || !state.mouse_down_pos)
        return;
      const dx = Math.abs(event.clientX - state.mouse_down_pos.x);
      const dy = Math.abs(event.clientY - state.mouse_down_pos.y);
      if (!state.is_dragging && (dx > 3 || dy > 3)) {
        state.is_dragging = true;
        set_is_dragging(true);
      }
      if (state.is_dragging) {
        update_selection(event);
      }
    },
    handle_mouse_up: end_drag
  };
}
const { Map: Map_1, window: window_1 } = globals;
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[139] = list[i].value;
  child_ctx[140] = list[i].id;
  child_ctx[143] = list;
  child_ctx[144] = i;
  return child_ctx;
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[139] = list[i].value;
  child_ctx[140] = list[i].id;
  child_ctx[141] = list;
  child_ctx[142] = i;
  return child_ctx;
}
function get_each_context_2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[139] = list[i].value;
  child_ctx[140] = list[i].id;
  child_ctx[145] = list;
  child_ctx[142] = i;
  return child_ctx;
}
function get_each_context_3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[139] = list[i].value;
  child_ctx[140] = list[i].id;
  child_ctx[146] = list;
  child_ctx[144] = i;
  return child_ctx;
}
function create_if_block_9(ctx) {
  let div;
  let t;
  let toolbar;
  let current;
  let if_block = (
    /*label*/
    ctx[3] && /*label*/
    ctx[3].length !== 0 && /*show_label*/
    ctx[4] && create_if_block_10(ctx)
  );
  toolbar = new Toolbar({
    props: {
      show_fullscreen_button: (
        /*show_fullscreen_button*/
        ctx[18]
      ),
      is_fullscreen: (
        /*is_fullscreen*/
        ctx[37]
      ),
      on_copy: (
        /*func*/
        ctx[86]
      ),
      show_copy_button: (
        /*show_copy_button*/
        ctx[19]
      ),
      show_search: (
        /*show_search*/
        ctx[21]
      ),
      on_commit_filter: (
        /*commit_filter*/
        ctx[68]
      ),
      current_search_query: (
        /*$df_state*/
        ctx[36].current_search_query
      )
    }
  });
  toolbar.$on(
    "click",
    /*toggle_fullscreen*/
    ctx[64]
  );
  toolbar.$on(
    "search",
    /*search_handler*/
    ctx[87]
  );
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
      t = space();
      create_component(toolbar.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if (if_block)
        if_block.l(div_nodes);
      t = claim_space(div_nodes);
      claim_component(toolbar.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "header-row svelte-18s8a4c");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
      append_hydration(div, t);
      mount_component(toolbar, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      if (
        /*label*/
        ctx2[3] && /*label*/
        ctx2[3].length !== 0 && /*show_label*/
        ctx2[4]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_10(ctx2);
          if_block.c();
          if_block.m(div, t);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      const toolbar_changes = {};
      if (dirty[0] & /*show_fullscreen_button*/
      262144)
        toolbar_changes.show_fullscreen_button = /*show_fullscreen_button*/
        ctx2[18];
      if (dirty[1] & /*is_fullscreen*/
      64)
        toolbar_changes.is_fullscreen = /*is_fullscreen*/
        ctx2[37];
      if (dirty[0] & /*data*/
      134217728)
        toolbar_changes.on_copy = /*func*/
        ctx2[86];
      if (dirty[0] & /*show_copy_button*/
      524288)
        toolbar_changes.show_copy_button = /*show_copy_button*/
        ctx2[19];
      if (dirty[0] & /*show_search*/
      2097152)
        toolbar_changes.show_search = /*show_search*/
        ctx2[21];
      if (dirty[1] & /*$df_state*/
      32)
        toolbar_changes.current_search_query = /*$df_state*/
        ctx2[36].current_search_query;
      toolbar.$set(toolbar_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(toolbar.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(toolbar.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block)
        if_block.d();
      destroy_component(toolbar);
    }
  };
}
function create_if_block_10(ctx) {
  let div;
  let p;
  let t;
  return {
    c() {
      div = element("div");
      p = element("p");
      t = text(
        /*label*/
        ctx[3]
      );
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      p = claim_element(div_nodes, "P", { class: true });
      var p_nodes = children(p);
      t = claim_text(
        p_nodes,
        /*label*/
        ctx[3]
      );
      p_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(p, "class", "svelte-18s8a4c");
      attr(div, "class", "label svelte-18s8a4c");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, p);
      append_hydration(p, t);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*label*/
      8)
        set_data(
          t,
          /*label*/
          ctx2[3]
        );
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_if_block_8(ctx) {
  let caption;
  let t;
  return {
    c() {
      caption = element("caption");
      t = text(
        /*label*/
        ctx[3]
      );
      this.h();
    },
    l(nodes) {
      caption = claim_element(nodes, "CAPTION", { class: true });
      var caption_nodes = children(caption);
      t = claim_text(
        caption_nodes,
        /*label*/
        ctx[3]
      );
      caption_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(caption, "class", "sr-only svelte-18s8a4c");
    },
    m(target, anchor) {
      insert_hydration(target, caption, anchor);
      append_hydration(caption, t);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*label*/
      8)
        set_data(
          t,
          /*label*/
          ctx2[3]
        );
    },
    d(detaching) {
      if (detaching) {
        detach(caption);
      }
    }
  };
}
function create_if_block_7(ctx) {
  let rownumber;
  let current;
  rownumber = new RowNumber({ props: { is_header: true } });
  return {
    c() {
      create_component(rownumber.$$.fragment);
    },
    l(nodes) {
      claim_component(rownumber.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(rownumber, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(rownumber.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(rownumber.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(rownumber, detaching);
    }
  };
}
function create_each_block_3(key_1, ctx) {
  let first;
  let tableheader;
  let updating_value;
  let updating_el;
  let current;
  function tableheader_value_binding(value) {
    ctx[88](
      value,
      /*i*/
      ctx[144]
    );
  }
  function tableheader_el_binding(value) {
    ctx[89](
      value,
      /*id*/
      ctx[140]
    );
  }
  let tableheader_props = {
    i: (
      /*i*/
      ctx[144]
    ),
    actual_pinned_columns: (
      /*actual_pinned_columns*/
      ctx[52]
    ),
    header_edit: (
      /*header_edit*/
      ctx[33]
    ),
    selected_header: (
      /*selected_header*/
      ctx[34]
    ),
    get_sort_status: (
      /*df_actions*/
      ctx[54].get_sort_status
    ),
    headers: (
      /*headers*/
      ctx[0]
    ),
    get_cell_width,
    handle_header_click: (
      /*handle_header_click*/
      ctx[57]
    ),
    toggle_header_menu: (
      /*toggle_header_menu*/
      ctx[65]
    ),
    end_header_edit: (
      /*end_header_edit*/
      ctx[58]
    ),
    sort_columns: (
      /*$df_state*/
      ctx[36].sort_state.sort_columns
    ),
    latex_delimiters: (
      /*latex_delimiters*/
      ctx[7]
    ),
    line_breaks: (
      /*line_breaks*/
      ctx[14]
    ),
    max_chars: (
      /*max_chars*/
      ctx[20]
    ),
    root: (
      /*root*/
      ctx[11]
    ),
    editable: (
      /*editable*/
      ctx[9]
    ),
    is_static: (
      /*static_columns*/
      ctx[22].includes(
        /*i*/
        ctx[144]
      )
    ),
    i18n: (
      /*i18n*/
      ctx[12]
    ),
    col_count: (
      /*col_count*/
      ctx[5]
    )
  };
  if (
    /*_headers*/
    ctx[26][
      /*i*/
      ctx[144]
    ].value !== void 0
  ) {
    tableheader_props.value = /*_headers*/
    ctx[26][
      /*i*/
      ctx[144]
    ].value;
  }
  if (
    /*els*/
    ctx[23][
      /*id*/
      ctx[140]
    ].input !== void 0
  ) {
    tableheader_props.el = /*els*/
    ctx[23][
      /*id*/
      ctx[140]
    ].input;
  }
  tableheader = new TableHeader({ props: tableheader_props });
  binding_callbacks.push(() => bind(tableheader, "value", tableheader_value_binding));
  binding_callbacks.push(() => bind(tableheader, "el", tableheader_el_binding));
  return {
    key: key_1,
    first: null,
    c() {
      first = empty();
      create_component(tableheader.$$.fragment);
      this.h();
    },
    l(nodes) {
      first = empty();
      claim_component(tableheader.$$.fragment, nodes);
      this.h();
    },
    h() {
      this.first = first;
    },
    m(target, anchor) {
      insert_hydration(target, first, anchor);
      mount_component(tableheader, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const tableheader_changes = {};
      if (dirty[0] & /*_headers*/
      67108864)
        tableheader_changes.i = /*i*/
        ctx[144];
      if (dirty[1] & /*actual_pinned_columns*/
      2097152)
        tableheader_changes.actual_pinned_columns = /*actual_pinned_columns*/
        ctx[52];
      if (dirty[1] & /*header_edit*/
      4)
        tableheader_changes.header_edit = /*header_edit*/
        ctx[33];
      if (dirty[1] & /*selected_header*/
      8)
        tableheader_changes.selected_header = /*selected_header*/
        ctx[34];
      if (dirty[0] & /*headers*/
      1)
        tableheader_changes.headers = /*headers*/
        ctx[0];
      if (dirty[1] & /*$df_state*/
      32)
        tableheader_changes.sort_columns = /*$df_state*/
        ctx[36].sort_state.sort_columns;
      if (dirty[0] & /*latex_delimiters*/
      128)
        tableheader_changes.latex_delimiters = /*latex_delimiters*/
        ctx[7];
      if (dirty[0] & /*line_breaks*/
      16384)
        tableheader_changes.line_breaks = /*line_breaks*/
        ctx[14];
      if (dirty[0] & /*max_chars*/
      1048576)
        tableheader_changes.max_chars = /*max_chars*/
        ctx[20];
      if (dirty[0] & /*root*/
      2048)
        tableheader_changes.root = /*root*/
        ctx[11];
      if (dirty[0] & /*editable*/
      512)
        tableheader_changes.editable = /*editable*/
        ctx[9];
      if (dirty[0] & /*static_columns, _headers*/
      71303168)
        tableheader_changes.is_static = /*static_columns*/
        ctx[22].includes(
          /*i*/
          ctx[144]
        );
      if (dirty[0] & /*i18n*/
      4096)
        tableheader_changes.i18n = /*i18n*/
        ctx[12];
      if (dirty[0] & /*col_count*/
      32)
        tableheader_changes.col_count = /*col_count*/
        ctx[5];
      if (!updating_value && dirty[0] & /*_headers*/
      67108864) {
        updating_value = true;
        tableheader_changes.value = /*_headers*/
        ctx[26][
          /*i*/
          ctx[144]
        ].value;
        add_flush_callback(() => updating_value = false);
      }
      if (!updating_el && dirty[0] & /*els, _headers*/
      75497472) {
        updating_el = true;
        tableheader_changes.el = /*els*/
        ctx[23][
          /*id*/
          ctx[140]
        ].input;
        add_flush_callback(() => updating_el = false);
      }
      tableheader.$set(tableheader_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(tableheader.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(tableheader.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(first);
      }
      destroy_component(tableheader, detaching);
    }
  };
}
function create_if_block_6(ctx) {
  let rownumber;
  let current;
  rownumber = new RowNumber({ props: { index: 0 } });
  return {
    c() {
      create_component(rownumber.$$.fragment);
    },
    l(nodes) {
      claim_component(rownumber.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(rownumber, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(rownumber.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(rownumber.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(rownumber, detaching);
    }
  };
}
function create_each_block_2(key_1, ctx) {
  let td;
  let div;
  let editablecell;
  let t;
  let j = (
    /*j*/
    ctx[142]
  );
  let current;
  editablecell = new EditableCell({
    props: {
      value: (
        /*value*/
        ctx[139]
      ),
      latex_delimiters: (
        /*latex_delimiters*/
        ctx[7]
      ),
      line_breaks: (
        /*line_breaks*/
        ctx[14]
      ),
      datatype: Array.isArray(
        /*datatype*/
        ctx[2]
      ) ? (
        /*datatype*/
        ctx[2][
          /*j*/
          ctx[142]
        ]
      ) : (
        /*datatype*/
        ctx[2]
      ),
      edit: false,
      el: null,
      root: (
        /*root*/
        ctx[11]
      ),
      editable: (
        /*editable*/
        ctx[9]
      ),
      i18n: (
        /*i18n*/
        ctx[12]
      ),
      show_selection_buttons: (
        /*selected_cells*/
        ctx[32].length === 1 && /*selected_cells*/
        ctx[32][0][0] === 0 && /*selected_cells*/
        ctx[32][0][1] === /*j*/
        ctx[142]
      ),
      coords: [
        0,
        /*j*/
        ctx[142]
      ],
      on_select_column: (
        /*handle_select_column*/
        ctx[62]
      ),
      on_select_row: (
        /*handle_select_row*/
        ctx[63]
      ),
      is_dragging: (
        /*is_dragging*/
        ctx[44]
      )
    }
  });
  const assign_td = () => (
    /*td_binding*/
    ctx[90](td, j)
  );
  const unassign_td = () => (
    /*td_binding*/
    ctx[90](null, j)
  );
  return {
    key: key_1,
    first: null,
    c() {
      td = element("td");
      div = element("div");
      create_component(editablecell.$$.fragment);
      t = space();
      this.h();
    },
    l(nodes) {
      td = claim_element(nodes, "TD", { tabindex: true, class: true });
      var td_nodes = children(td);
      div = claim_element(td_nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(editablecell.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      t = claim_space(td_nodes);
      td_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "cell-wrap svelte-18s8a4c");
      attr(td, "tabindex", "-1");
      attr(td, "class", "svelte-18s8a4c");
      this.first = td;
    },
    m(target, anchor) {
      insert_hydration(target, td, anchor);
      append_hydration(td, div);
      mount_component(editablecell, div, null);
      append_hydration(td, t);
      assign_td();
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const editablecell_changes = {};
      if (dirty[1] & /*max*/
      1048576)
        editablecell_changes.value = /*value*/
        ctx[139];
      if (dirty[0] & /*latex_delimiters*/
      128)
        editablecell_changes.latex_delimiters = /*latex_delimiters*/
        ctx[7];
      if (dirty[0] & /*line_breaks*/
      16384)
        editablecell_changes.line_breaks = /*line_breaks*/
        ctx[14];
      if (dirty[0] & /*datatype*/
      4 | dirty[1] & /*max*/
      1048576)
        editablecell_changes.datatype = Array.isArray(
          /*datatype*/
          ctx[2]
        ) ? (
          /*datatype*/
          ctx[2][
            /*j*/
            ctx[142]
          ]
        ) : (
          /*datatype*/
          ctx[2]
        );
      if (dirty[0] & /*root*/
      2048)
        editablecell_changes.root = /*root*/
        ctx[11];
      if (dirty[0] & /*editable*/
      512)
        editablecell_changes.editable = /*editable*/
        ctx[9];
      if (dirty[0] & /*i18n*/
      4096)
        editablecell_changes.i18n = /*i18n*/
        ctx[12];
      if (dirty[1] & /*selected_cells, max*/
      1048578)
        editablecell_changes.show_selection_buttons = /*selected_cells*/
        ctx[32].length === 1 && /*selected_cells*/
        ctx[32][0][0] === 0 && /*selected_cells*/
        ctx[32][0][1] === /*j*/
        ctx[142];
      if (dirty[1] & /*max*/
      1048576)
        editablecell_changes.coords = [
          0,
          /*j*/
          ctx[142]
        ];
      if (dirty[1] & /*is_dragging*/
      8192)
        editablecell_changes.is_dragging = /*is_dragging*/
        ctx[44];
      editablecell.$set(editablecell_changes);
      if (j !== /*j*/
      ctx[142]) {
        unassign_td();
        j = /*j*/
        ctx[142];
        assign_td();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(editablecell.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(editablecell.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(td);
      }
      destroy_component(editablecell);
      unassign_td();
    }
  };
}
function create_if_block_5(ctx) {
  let caption;
  let t;
  return {
    c() {
      caption = element("caption");
      t = text(
        /*label*/
        ctx[3]
      );
      this.h();
    },
    l(nodes) {
      caption = claim_element(nodes, "CAPTION", { class: true });
      var caption_nodes = children(caption);
      t = claim_text(
        caption_nodes,
        /*label*/
        ctx[3]
      );
      caption_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(caption, "class", "sr-only svelte-18s8a4c");
    },
    m(target, anchor) {
      insert_hydration(target, caption, anchor);
      append_hydration(caption, t);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*label*/
      8)
        set_data(
          t,
          /*label*/
          ctx2[3]
        );
    },
    d(detaching) {
      if (detaching) {
        detach(caption);
      }
    }
  };
}
function create_default_slot_1(ctx) {
  let if_block_anchor;
  let if_block = (
    /*label*/
    ctx[3] && /*label*/
    ctx[3].length !== 0 && create_if_block_5(ctx)
  );
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (
        /*label*/
        ctx2[3] && /*label*/
        ctx2[3].length !== 0
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_5(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if (if_block)
        if_block.d(detaching);
    }
  };
}
function create_if_block_4(ctx) {
  let rownumber;
  let current;
  rownumber = new RowNumber({ props: { is_header: true } });
  return {
    c() {
      create_component(rownumber.$$.fragment);
    },
    l(nodes) {
      claim_component(rownumber.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(rownumber, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(rownumber.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(rownumber.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(rownumber, detaching);
    }
  };
}
function create_each_block_1(key_1, ctx) {
  let first;
  let tableheader;
  let updating_value;
  let updating_el;
  let current;
  function tableheader_value_binding_1(value) {
    ctx[95](
      value,
      /*i*/
      ctx[144]
    );
  }
  function tableheader_el_binding_1(value) {
    ctx[96](
      value,
      /*id*/
      ctx[140]
    );
  }
  let tableheader_props = {
    i: (
      /*i*/
      ctx[144]
    ),
    actual_pinned_columns: (
      /*actual_pinned_columns*/
      ctx[52]
    ),
    header_edit: (
      /*header_edit*/
      ctx[33]
    ),
    selected_header: (
      /*selected_header*/
      ctx[34]
    ),
    get_sort_status: (
      /*df_actions*/
      ctx[54].get_sort_status
    ),
    headers: (
      /*headers*/
      ctx[0]
    ),
    get_cell_width,
    handle_header_click: (
      /*handle_header_click*/
      ctx[57]
    ),
    toggle_header_menu: (
      /*toggle_header_menu*/
      ctx[65]
    ),
    end_header_edit: (
      /*end_header_edit*/
      ctx[58]
    ),
    sort_columns: (
      /*$df_state*/
      ctx[36].sort_state.sort_columns
    ),
    latex_delimiters: (
      /*latex_delimiters*/
      ctx[7]
    ),
    line_breaks: (
      /*line_breaks*/
      ctx[14]
    ),
    max_chars: (
      /*max_chars*/
      ctx[20]
    ),
    root: (
      /*root*/
      ctx[11]
    ),
    editable: (
      /*editable*/
      ctx[9]
    ),
    is_static: (
      /*static_columns*/
      ctx[22].includes(
        /*i*/
        ctx[144]
      )
    ),
    i18n: (
      /*i18n*/
      ctx[12]
    ),
    col_count: (
      /*col_count*/
      ctx[5]
    )
  };
  if (
    /*_headers*/
    ctx[26][
      /*i*/
      ctx[144]
    ].value !== void 0
  ) {
    tableheader_props.value = /*_headers*/
    ctx[26][
      /*i*/
      ctx[144]
    ].value;
  }
  if (
    /*els*/
    ctx[23][
      /*id*/
      ctx[140]
    ].input !== void 0
  ) {
    tableheader_props.el = /*els*/
    ctx[23][
      /*id*/
      ctx[140]
    ].input;
  }
  tableheader = new TableHeader({ props: tableheader_props });
  binding_callbacks.push(() => bind(tableheader, "value", tableheader_value_binding_1));
  binding_callbacks.push(() => bind(tableheader, "el", tableheader_el_binding_1));
  return {
    key: key_1,
    first: null,
    c() {
      first = empty();
      create_component(tableheader.$$.fragment);
      this.h();
    },
    l(nodes) {
      first = empty();
      claim_component(tableheader.$$.fragment, nodes);
      this.h();
    },
    h() {
      this.first = first;
    },
    m(target, anchor) {
      insert_hydration(target, first, anchor);
      mount_component(tableheader, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const tableheader_changes = {};
      if (dirty[0] & /*_headers*/
      67108864)
        tableheader_changes.i = /*i*/
        ctx[144];
      if (dirty[1] & /*actual_pinned_columns*/
      2097152)
        tableheader_changes.actual_pinned_columns = /*actual_pinned_columns*/
        ctx[52];
      if (dirty[1] & /*header_edit*/
      4)
        tableheader_changes.header_edit = /*header_edit*/
        ctx[33];
      if (dirty[1] & /*selected_header*/
      8)
        tableheader_changes.selected_header = /*selected_header*/
        ctx[34];
      if (dirty[0] & /*headers*/
      1)
        tableheader_changes.headers = /*headers*/
        ctx[0];
      if (dirty[1] & /*$df_state*/
      32)
        tableheader_changes.sort_columns = /*$df_state*/
        ctx[36].sort_state.sort_columns;
      if (dirty[0] & /*latex_delimiters*/
      128)
        tableheader_changes.latex_delimiters = /*latex_delimiters*/
        ctx[7];
      if (dirty[0] & /*line_breaks*/
      16384)
        tableheader_changes.line_breaks = /*line_breaks*/
        ctx[14];
      if (dirty[0] & /*max_chars*/
      1048576)
        tableheader_changes.max_chars = /*max_chars*/
        ctx[20];
      if (dirty[0] & /*root*/
      2048)
        tableheader_changes.root = /*root*/
        ctx[11];
      if (dirty[0] & /*editable*/
      512)
        tableheader_changes.editable = /*editable*/
        ctx[9];
      if (dirty[0] & /*static_columns, _headers*/
      71303168)
        tableheader_changes.is_static = /*static_columns*/
        ctx[22].includes(
          /*i*/
          ctx[144]
        );
      if (dirty[0] & /*i18n*/
      4096)
        tableheader_changes.i18n = /*i18n*/
        ctx[12];
      if (dirty[0] & /*col_count*/
      32)
        tableheader_changes.col_count = /*col_count*/
        ctx[5];
      if (!updating_value && dirty[0] & /*_headers*/
      67108864) {
        updating_value = true;
        tableheader_changes.value = /*_headers*/
        ctx[26][
          /*i*/
          ctx[144]
        ].value;
        add_flush_callback(() => updating_value = false);
      }
      if (!updating_el && dirty[0] & /*els, _headers*/
      75497472) {
        updating_el = true;
        tableheader_changes.el = /*els*/
        ctx[23][
          /*id*/
          ctx[140]
        ].input;
        add_flush_callback(() => updating_el = false);
      }
      tableheader.$set(tableheader_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(tableheader.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(tableheader.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(first);
      }
      destroy_component(tableheader, detaching);
    }
  };
}
function create_thead_slot(ctx) {
  let tr;
  let t;
  let each_blocks = [];
  let each_1_lookup = new Map_1();
  let current;
  let if_block = (
    /*show_row_numbers*/
    ctx[15] && create_if_block_4()
  );
  let each_value_1 = ensure_array_like(
    /*_headers*/
    ctx[26]
  );
  const get_key = (ctx2) => (
    /*id*/
    ctx2[140]
  );
  for (let i = 0; i < each_value_1.length; i += 1) {
    let child_ctx = get_each_context_1(ctx, each_value_1, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block_1(key, child_ctx));
  }
  return {
    c() {
      tr = element("tr");
      if (if_block)
        if_block.c();
      t = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      tr = claim_element(nodes, "TR", { slot: true, class: true });
      var tr_nodes = children(tr);
      if (if_block)
        if_block.l(tr_nodes);
      t = claim_space(tr_nodes);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(tr_nodes);
      }
      tr_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(tr, "slot", "thead");
      attr(tr, "class", "svelte-18s8a4c");
    },
    m(target, anchor) {
      insert_hydration(target, tr, anchor);
      if (if_block)
        if_block.m(tr, null);
      append_hydration(tr, t);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(tr, null);
        }
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (
        /*show_row_numbers*/
        ctx2[15]
      ) {
        if (if_block) {
          if (dirty[0] & /*show_row_numbers*/
          32768) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_4();
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(tr, t);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (dirty[0] & /*_headers, headers, latex_delimiters, line_breaks, max_chars, root, editable, static_columns, i18n, col_count, els*/
      80763553 | dirty[1] & /*actual_pinned_columns, header_edit, selected_header, df_actions, handle_header_click, end_header_edit, $df_state*/
      211812396 | dirty[2] & /*toggle_header_menu*/
      8) {
        each_value_1 = ensure_array_like(
          /*_headers*/
          ctx2[26]
        );
        group_outros();
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value_1, each_1_lookup, tr, outro_and_destroy_block, create_each_block_1, null, get_each_context_1);
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      for (let i = 0; i < each_value_1.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      transition_out(if_block);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(tr);
      }
      if (if_block)
        if_block.d();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
    }
  };
}
function create_if_block_3(ctx) {
  let rownumber;
  let current;
  rownumber = new RowNumber({ props: { index: (
    /*index*/
    ctx[137]
  ) } });
  return {
    c() {
      create_component(rownumber.$$.fragment);
    },
    l(nodes) {
      claim_component(rownumber.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(rownumber, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const rownumber_changes = {};
      if (dirty[4] & /*index*/
      8192)
        rownumber_changes.index = /*index*/
        ctx2[137];
      rownumber.$set(rownumber_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(rownumber.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(rownumber.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(rownumber, detaching);
    }
  };
}
function create_each_block(key_1, ctx) {
  let first;
  let tablecell;
  let updating_value;
  let updating_el;
  let current;
  function tablecell_value_binding(value) {
    ctx[93](
      value,
      /*index*/
      ctx[137],
      /*j*/
      ctx[142]
    );
  }
  function tablecell_el_binding(value) {
    ctx[94](
      value,
      /*id*/
      ctx[140]
    );
  }
  let tablecell_props = {
    index: (
      /*index*/
      ctx[137]
    ),
    j: (
      /*j*/
      ctx[142]
    ),
    actual_pinned_columns: (
      /*actual_pinned_columns*/
      ctx[52]
    ),
    get_cell_width,
    handle_cell_click: (
      /*func_1*/
      ctx[92]
    ),
    toggle_cell_menu: (
      /*toggle_cell_menu*/
      ctx[61]
    ),
    is_cell_selected,
    should_show_cell_menu,
    selected_cells: (
      /*selected_cells*/
      ctx[32]
    ),
    copy_flash: (
      /*copy_flash*/
      ctx[25]
    ),
    active_cell_menu: (
      /*active_cell_menu*/
      ctx[49]
    ),
    styling: (
      /*search_results*/
      ctx[39][
        /*index*/
        ctx[137]
      ][
        /*j*/
        ctx[142]
      ].styling
    ),
    latex_delimiters: (
      /*latex_delimiters*/
      ctx[7]
    ),
    line_breaks: (
      /*line_breaks*/
      ctx[14]
    ),
    datatype: Array.isArray(
      /*datatype*/
      ctx[2]
    ) ? (
      /*datatype*/
      ctx[2][
        /*j*/
        ctx[142]
      ]
    ) : (
      /*datatype*/
      ctx[2]
    ),
    editing: (
      /*editing*/
      ctx[31]
    ),
    clear_on_focus: (
      /*clear_on_focus*/
      ctx[24]
    ),
    max_chars: (
      /*max_chars*/
      ctx[20]
    ),
    root: (
      /*root*/
      ctx[11]
    ),
    editable: (
      /*editable*/
      ctx[9]
    ),
    is_static: (
      /*static_columns*/
      ctx[22].includes(
        /*j*/
        ctx[142]
      )
    ),
    i18n: (
      /*i18n*/
      ctx[12]
    ),
    components: (
      /*components*/
      ctx[8]
    ),
    handle_select_column: (
      /*handle_select_column*/
      ctx[62]
    ),
    handle_select_row: (
      /*handle_select_row*/
      ctx[63]
    ),
    is_dragging: (
      /*is_dragging*/
      ctx[44]
    )
  };
  if (
    /*search_results*/
    ctx[39][
      /*index*/
      ctx[137]
    ][
      /*j*/
      ctx[142]
    ].value !== void 0
  ) {
    tablecell_props.value = /*search_results*/
    ctx[39][
      /*index*/
      ctx[137]
    ][
      /*j*/
      ctx[142]
    ].value;
  }
  if (
    /*els*/
    ctx[23][
      /*id*/
      ctx[140]
    ] !== void 0
  ) {
    tablecell_props.el = /*els*/
    ctx[23][
      /*id*/
      ctx[140]
    ];
  }
  tablecell = new TableCell({ props: tablecell_props });
  binding_callbacks.push(() => bind(tablecell, "value", tablecell_value_binding));
  binding_callbacks.push(() => bind(tablecell, "el", tablecell_el_binding));
  return {
    key: key_1,
    first: null,
    c() {
      first = empty();
      create_component(tablecell.$$.fragment);
      this.h();
    },
    l(nodes) {
      first = empty();
      claim_component(tablecell.$$.fragment, nodes);
      this.h();
    },
    h() {
      this.first = first;
    },
    m(target, anchor) {
      insert_hydration(target, first, anchor);
      mount_component(tablecell, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const tablecell_changes = {};
      if (dirty[4] & /*index*/
      8192)
        tablecell_changes.index = /*index*/
        ctx[137];
      if (dirty[4] & /*item*/
      16384)
        tablecell_changes.j = /*j*/
        ctx[142];
      if (dirty[1] & /*actual_pinned_columns*/
      2097152)
        tablecell_changes.actual_pinned_columns = /*actual_pinned_columns*/
        ctx[52];
      if (dirty[1] & /*handle_mouse_down*/
      65536)
        tablecell_changes.handle_cell_click = /*func_1*/
        ctx[92];
      if (dirty[1] & /*selected_cells*/
      2)
        tablecell_changes.selected_cells = /*selected_cells*/
        ctx[32];
      if (dirty[0] & /*copy_flash*/
      33554432)
        tablecell_changes.copy_flash = /*copy_flash*/
        ctx[25];
      if (dirty[1] & /*active_cell_menu*/
      262144)
        tablecell_changes.active_cell_menu = /*active_cell_menu*/
        ctx[49];
      if (dirty[1] & /*search_results*/
      256 | dirty[4] & /*index, item*/
      24576)
        tablecell_changes.styling = /*search_results*/
        ctx[39][
          /*index*/
          ctx[137]
        ][
          /*j*/
          ctx[142]
        ].styling;
      if (dirty[0] & /*latex_delimiters*/
      128)
        tablecell_changes.latex_delimiters = /*latex_delimiters*/
        ctx[7];
      if (dirty[0] & /*line_breaks*/
      16384)
        tablecell_changes.line_breaks = /*line_breaks*/
        ctx[14];
      if (dirty[0] & /*datatype*/
      4 | dirty[4] & /*item*/
      16384)
        tablecell_changes.datatype = Array.isArray(
          /*datatype*/
          ctx[2]
        ) ? (
          /*datatype*/
          ctx[2][
            /*j*/
            ctx[142]
          ]
        ) : (
          /*datatype*/
          ctx[2]
        );
      if (dirty[1] & /*editing*/
      1)
        tablecell_changes.editing = /*editing*/
        ctx[31];
      if (dirty[0] & /*clear_on_focus*/
      16777216)
        tablecell_changes.clear_on_focus = /*clear_on_focus*/
        ctx[24];
      if (dirty[0] & /*max_chars*/
      1048576)
        tablecell_changes.max_chars = /*max_chars*/
        ctx[20];
      if (dirty[0] & /*root*/
      2048)
        tablecell_changes.root = /*root*/
        ctx[11];
      if (dirty[0] & /*editable*/
      512)
        tablecell_changes.editable = /*editable*/
        ctx[9];
      if (dirty[0] & /*static_columns*/
      4194304 | dirty[4] & /*item*/
      16384)
        tablecell_changes.is_static = /*static_columns*/
        ctx[22].includes(
          /*j*/
          ctx[142]
        );
      if (dirty[0] & /*i18n*/
      4096)
        tablecell_changes.i18n = /*i18n*/
        ctx[12];
      if (dirty[0] & /*components*/
      256)
        tablecell_changes.components = /*components*/
        ctx[8];
      if (dirty[1] & /*is_dragging*/
      8192)
        tablecell_changes.is_dragging = /*is_dragging*/
        ctx[44];
      if (!updating_value && dirty[1] & /*search_results*/
      256 | dirty[4] & /*index, item*/
      24576) {
        updating_value = true;
        tablecell_changes.value = /*search_results*/
        ctx[39][
          /*index*/
          ctx[137]
        ][
          /*j*/
          ctx[142]
        ].value;
        add_flush_callback(() => updating_value = false);
      }
      if (!updating_el && dirty[0] & /*els*/
      8388608 | dirty[4] & /*item*/
      16384) {
        updating_el = true;
        tablecell_changes.el = /*els*/
        ctx[23][
          /*id*/
          ctx[140]
        ];
        add_flush_callback(() => updating_el = false);
      }
      tablecell.$set(tablecell_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(tablecell.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(tablecell.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(first);
      }
      destroy_component(tablecell, detaching);
    }
  };
}
function create_tbody_slot(ctx) {
  let tr;
  let t;
  let each_blocks = [];
  let each_1_lookup = new Map_1();
  let current;
  let if_block = (
    /*show_row_numbers*/
    ctx[15] && create_if_block_3(ctx)
  );
  let each_value = ensure_array_like(
    /*item*/
    ctx[138]
  );
  const get_key = (ctx2) => (
    /*id*/
    ctx2[140]
  );
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
  }
  return {
    c() {
      tr = element("tr");
      if (if_block)
        if_block.c();
      t = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      tr = claim_element(nodes, "TR", { slot: true, class: true });
      var tr_nodes = children(tr);
      if (if_block)
        if_block.l(tr_nodes);
      t = claim_space(tr_nodes);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(tr_nodes);
      }
      tr_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(tr, "slot", "tbody");
      attr(tr, "class", "svelte-18s8a4c");
      toggle_class(
        tr,
        "row-odd",
        /*index*/
        ctx[137] % 2 === 0
      );
    },
    m(target, anchor) {
      insert_hydration(target, tr, anchor);
      if (if_block)
        if_block.m(tr, null);
      append_hydration(tr, t);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(tr, null);
        }
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (
        /*show_row_numbers*/
        ctx2[15]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & /*show_row_numbers*/
          32768) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_3(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(tr, t);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (dirty[0] & /*copy_flash, latex_delimiters, line_breaks, datatype, clear_on_focus, max_chars, root, editable, static_columns, i18n, components, els*/
      63986564 | dirty[1] & /*actual_pinned_columns, handle_mouse_down, toggle_cell_menu, selected_cells, active_cell_menu, search_results, editing, is_dragging*/
      1076175107 | dirty[2] & /*handle_select_column, handle_select_row*/
      3 | dirty[4] & /*index, item*/
      24576) {
        each_value = ensure_array_like(
          /*item*/
          ctx2[138]
        );
        group_outros();
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, tr, outro_and_destroy_block, create_each_block, null, get_each_context);
        check_outros();
      }
      if (!current || dirty[4] & /*index*/
      8192) {
        toggle_class(
          tr,
          "row-odd",
          /*index*/
          ctx2[137] % 2 === 0
        );
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      transition_out(if_block);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(tr);
      }
      if (if_block)
        if_block.d();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
    }
  };
}
function create_default_slot$1(ctx) {
  let div;
  let virtualtable;
  let updating_items;
  let updating_actual_height;
  let updating_table_scrollbar_width;
  let updating_viewport;
  let updating_show_scroll_button;
  let current;
  function virtualtable_items_binding(value) {
    ctx[97](value);
  }
  function virtualtable_actual_height_binding(value) {
    ctx[98](value);
  }
  function virtualtable_table_scrollbar_width_binding(value) {
    ctx[99](value);
  }
  function virtualtable_viewport_binding(value) {
    ctx[100](value);
  }
  function virtualtable_show_scroll_button_binding(value) {
    ctx[101](value);
  }
  let virtualtable_props = {
    max_height: (
      /*max_height*/
      ctx[13]
    ),
    selected: (
      /*selected_index*/
      ctx[50]
    ),
    disable_scroll: (
      /*active_cell_menu*/
      ctx[49] !== null || /*active_header_menu*/
      ctx[48] !== null
    ),
    $$slots: {
      tbody: [
        create_tbody_slot,
        ({ index, item }) => ({ 137: index, 138: item }),
        ({ index, item }) => [0, 0, 0, 0, (index ? 8192 : 0) | (item ? 16384 : 0)]
      ],
      thead: [create_thead_slot],
      default: [create_default_slot_1]
    },
    $$scope: { ctx }
  };
  if (
    /*search_results*/
    ctx[39] !== void 0
  ) {
    virtualtable_props.items = /*search_results*/
    ctx[39];
  }
  if (
    /*table_height*/
    ctx[40] !== void 0
  ) {
    virtualtable_props.actual_height = /*table_height*/
    ctx[40];
  }
  if (
    /*scrollbar_width*/
    ctx[41] !== void 0
  ) {
    virtualtable_props.table_scrollbar_width = /*scrollbar_width*/
    ctx[41];
  }
  if (
    /*viewport*/
    ctx[42] !== void 0
  ) {
    virtualtable_props.viewport = /*viewport*/
    ctx[42];
  }
  if (
    /*show_scroll_button*/
    ctx[43] !== void 0
  ) {
    virtualtable_props.show_scroll_button = /*show_scroll_button*/
    ctx[43];
  }
  virtualtable = new VirtualTable({ props: virtualtable_props });
  binding_callbacks.push(() => bind(virtualtable, "items", virtualtable_items_binding));
  binding_callbacks.push(() => bind(virtualtable, "actual_height", virtualtable_actual_height_binding));
  binding_callbacks.push(() => bind(virtualtable, "table_scrollbar_width", virtualtable_table_scrollbar_width_binding));
  binding_callbacks.push(() => bind(virtualtable, "viewport", virtualtable_viewport_binding));
  binding_callbacks.push(() => bind(virtualtable, "show_scroll_button", virtualtable_show_scroll_button_binding));
  virtualtable.$on("scroll_top", scroll_top_handler);
  return {
    c() {
      div = element("div");
      create_component(virtualtable.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(virtualtable.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "table-wrap svelte-18s8a4c");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(virtualtable, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const virtualtable_changes = {};
      if (dirty[0] & /*max_height*/
      8192)
        virtualtable_changes.max_height = /*max_height*/
        ctx2[13];
      if (dirty[1] & /*selected_index*/
      524288)
        virtualtable_changes.selected = /*selected_index*/
        ctx2[50];
      if (dirty[1] & /*active_cell_menu, active_header_menu*/
      393216)
        virtualtable_changes.disable_scroll = /*active_cell_menu*/
        ctx2[49] !== null || /*active_header_menu*/
        ctx2[48] !== null;
      if (dirty[0] & /*copy_flash, latex_delimiters, line_breaks, datatype, clear_on_focus, max_chars, root, editable, static_columns, i18n, components, els, show_row_numbers, _headers, headers, col_count, label*/
      131128237 | dirty[1] & /*actual_pinned_columns, handle_mouse_down, selected_cells, active_cell_menu, search_results, editing, is_dragging, header_edit, selected_header, $df_state*/
      2433327 | dirty[4] & /*$$scope, index, item*/
      8413184) {
        virtualtable_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_items && dirty[1] & /*search_results*/
      256) {
        updating_items = true;
        virtualtable_changes.items = /*search_results*/
        ctx2[39];
        add_flush_callback(() => updating_items = false);
      }
      if (!updating_actual_height && dirty[1] & /*table_height*/
      512) {
        updating_actual_height = true;
        virtualtable_changes.actual_height = /*table_height*/
        ctx2[40];
        add_flush_callback(() => updating_actual_height = false);
      }
      if (!updating_table_scrollbar_width && dirty[1] & /*scrollbar_width*/
      1024) {
        updating_table_scrollbar_width = true;
        virtualtable_changes.table_scrollbar_width = /*scrollbar_width*/
        ctx2[41];
        add_flush_callback(() => updating_table_scrollbar_width = false);
      }
      if (!updating_viewport && dirty[1] & /*viewport*/
      2048) {
        updating_viewport = true;
        virtualtable_changes.viewport = /*viewport*/
        ctx2[42];
        add_flush_callback(() => updating_viewport = false);
      }
      if (!updating_show_scroll_button && dirty[1] & /*show_scroll_button*/
      4096) {
        updating_show_scroll_button = true;
        virtualtable_changes.show_scroll_button = /*show_scroll_button*/
        ctx2[43];
        add_flush_callback(() => updating_show_scroll_button = false);
      }
      virtualtable.$set(virtualtable_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(virtualtable.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(virtualtable.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(virtualtable);
    }
  };
}
function create_if_block_2(ctx) {
  let button;
  let textContent = "↑";
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = textContent;
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(button) !== "svelte-oaisf6")
        button.textContent = textContent;
      this.h();
    },
    h() {
      attr(button, "class", "scroll-top-button svelte-18s8a4c");
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*scroll_to_top*/
          ctx[69]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_1(ctx) {
  let emptyrowbutton;
  let current;
  emptyrowbutton = new EmptyRowButton({ props: { on_click: (
    /*func_2*/
    ctx[106]
  ) } });
  return {
    c() {
      create_component(emptyrowbutton.$$.fragment);
    },
    l(nodes) {
      claim_component(emptyrowbutton.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(emptyrowbutton, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(emptyrowbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(emptyrowbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(emptyrowbutton, detaching);
    }
  };
}
function create_if_block(ctx) {
  var _a, _b, _c, _d, _e, _f, _g;
  let cellmenu;
  let current;
  cellmenu = new CellMenu({
    props: {
      x: (
        /*active_cell_menu*/
        ((_a = ctx[49]) == null ? void 0 : _a.x) ?? /*active_header_menu*/
        ((_b = ctx[48]) == null ? void 0 : _b.x) ?? 0
      ),
      y: (
        /*active_cell_menu*/
        ((_c = ctx[49]) == null ? void 0 : _c.y) ?? /*active_header_menu*/
        ((_d = ctx[48]) == null ? void 0 : _d.y) ?? 0
      ),
      row: (
        /*active_header_menu*/
        ctx[48] ? -1 : (
          /*active_cell_menu*/
          ((_e = ctx[49]) == null ? void 0 : _e.row) ?? 0
        )
      ),
      col_count: (
        /*col_count*/
        ctx[5]
      ),
      row_count: (
        /*row_count*/
        ctx[6]
      ),
      on_add_row_above: (
        /*func_3*/
        ctx[107]
      ),
      on_add_row_below: (
        /*func_4*/
        ctx[108]
      ),
      on_add_column_left: (
        /*func_5*/
        ctx[109]
      ),
      on_add_column_right: (
        /*func_6*/
        ctx[110]
      ),
      on_delete_row: (
        /*func_7*/
        ctx[111]
      ),
      on_delete_col: (
        /*func_8*/
        ctx[112]
      ),
      editable: (
        /*editable*/
        ctx[9]
      ),
      can_delete_rows: !/*active_header_menu*/
      ctx[48] && /*data*/
      ctx[27].length > 1 && /*editable*/
      ctx[9],
      can_delete_cols: (
        /*data*/
        ctx[27].length > 0 && /*data*/
        ((_f = ctx[27][0]) == null ? void 0 : _f.length) > 1 && /*editable*/
        ctx[9]
      ),
      i18n: (
        /*i18n*/
        ctx[12]
      ),
      on_sort: (
        /*active_header_menu*/
        ctx[48] ? (
          /*func_9*/
          ctx[113]
        ) : void 0
      ),
      on_clear_sort: (
        /*active_header_menu*/
        ctx[48] ? (
          /*func_10*/
          ctx[114]
        ) : void 0
      ),
      sort_direction: (
        /*active_header_menu*/
        ctx[48] ? (
          /*$df_state*/
          ((_g = ctx[36].sort_state.sort_columns.find(
            /*func_11*/
            ctx[115]
          )) == null ? void 0 : _g.direction) ?? null
        ) : null
      ),
      sort_priority: (
        /*active_header_menu*/
        ctx[48] ? (
          /*$df_state*/
          ctx[36].sort_state.sort_columns.findIndex(
            /*func_12*/
            ctx[116]
          ) + 1 || null
        ) : null
      )
    }
  });
  return {
    c() {
      create_component(cellmenu.$$.fragment);
    },
    l(nodes) {
      claim_component(cellmenu.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(cellmenu, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2;
      const cellmenu_changes = {};
      if (dirty[1] & /*active_cell_menu, active_header_menu*/
      393216)
        cellmenu_changes.x = /*active_cell_menu*/
        ((_a2 = ctx2[49]) == null ? void 0 : _a2.x) ?? /*active_header_menu*/
        ((_b2 = ctx2[48]) == null ? void 0 : _b2.x) ?? 0;
      if (dirty[1] & /*active_cell_menu, active_header_menu*/
      393216)
        cellmenu_changes.y = /*active_cell_menu*/
        ((_c2 = ctx2[49]) == null ? void 0 : _c2.y) ?? /*active_header_menu*/
        ((_d2 = ctx2[48]) == null ? void 0 : _d2.y) ?? 0;
      if (dirty[1] & /*active_header_menu, active_cell_menu*/
      393216)
        cellmenu_changes.row = /*active_header_menu*/
        ctx2[48] ? -1 : (
          /*active_cell_menu*/
          ((_e2 = ctx2[49]) == null ? void 0 : _e2.row) ?? 0
        );
      if (dirty[0] & /*col_count*/
      32)
        cellmenu_changes.col_count = /*col_count*/
        ctx2[5];
      if (dirty[0] & /*row_count*/
      64)
        cellmenu_changes.row_count = /*row_count*/
        ctx2[6];
      if (dirty[1] & /*active_cell_menu*/
      262144)
        cellmenu_changes.on_add_row_above = /*func_3*/
        ctx2[107];
      if (dirty[1] & /*active_cell_menu*/
      262144)
        cellmenu_changes.on_add_row_below = /*func_4*/
        ctx2[108];
      if (dirty[1] & /*active_cell_menu, active_header_menu*/
      393216)
        cellmenu_changes.on_add_column_left = /*func_5*/
        ctx2[109];
      if (dirty[1] & /*active_cell_menu, active_header_menu*/
      393216)
        cellmenu_changes.on_add_column_right = /*func_6*/
        ctx2[110];
      if (dirty[1] & /*active_cell_menu*/
      262144)
        cellmenu_changes.on_delete_row = /*func_7*/
        ctx2[111];
      if (dirty[1] & /*active_cell_menu, active_header_menu*/
      393216)
        cellmenu_changes.on_delete_col = /*func_8*/
        ctx2[112];
      if (dirty[0] & /*editable*/
      512)
        cellmenu_changes.editable = /*editable*/
        ctx2[9];
      if (dirty[0] & /*data, editable*/
      134218240 | dirty[1] & /*active_header_menu*/
      131072)
        cellmenu_changes.can_delete_rows = !/*active_header_menu*/
        ctx2[48] && /*data*/
        ctx2[27].length > 1 && /*editable*/
        ctx2[9];
      if (dirty[0] & /*data, editable*/
      134218240)
        cellmenu_changes.can_delete_cols = /*data*/
        ctx2[27].length > 0 && /*data*/
        ((_f2 = ctx2[27][0]) == null ? void 0 : _f2.length) > 1 && /*editable*/
        ctx2[9];
      if (dirty[0] & /*i18n*/
      4096)
        cellmenu_changes.i18n = /*i18n*/
        ctx2[12];
      if (dirty[1] & /*active_header_menu*/
      131072)
        cellmenu_changes.on_sort = /*active_header_menu*/
        ctx2[48] ? (
          /*func_9*/
          ctx2[113]
        ) : void 0;
      if (dirty[1] & /*active_header_menu*/
      131072)
        cellmenu_changes.on_clear_sort = /*active_header_menu*/
        ctx2[48] ? (
          /*func_10*/
          ctx2[114]
        ) : void 0;
      if (dirty[1] & /*active_header_menu, $df_state*/
      131104)
        cellmenu_changes.sort_direction = /*active_header_menu*/
        ctx2[48] ? (
          /*$df_state*/
          ((_g2 = ctx2[36].sort_state.sort_columns.find(
            /*func_11*/
            ctx2[115]
          )) == null ? void 0 : _g2.direction) ?? null
        ) : null;
      if (dirty[1] & /*active_header_menu, $df_state*/
      131104)
        cellmenu_changes.sort_priority = /*active_header_menu*/
        ctx2[48] ? (
          /*$df_state*/
          ctx2[36].sort_state.sort_columns.findIndex(
            /*func_12*/
            ctx2[116]
          ) + 1 || null
        ) : null;
      cellmenu.$set(cellmenu_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(cellmenu.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(cellmenu.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(cellmenu, detaching);
    }
  };
}
function create_fragment$1(ctx) {
  let div1;
  let t0;
  let div0;
  let table_1;
  let t1;
  let thead;
  let tr0;
  let t2;
  let each_blocks_1 = [];
  let each0_lookup = new Map_1();
  let t3;
  let tbody;
  let tr1;
  let t4;
  let each_blocks = [];
  let each1_lookup = new Map_1();
  let t5;
  let upload_1;
  let updating_dragging;
  let t6;
  let t7;
  let t8;
  let if_block6_anchor;
  let current;
  let mounted;
  let dispose;
  let if_block0 = (
    /*label*/
    (ctx[3] && /*label*/
    ctx[3].length !== 0 && /*show_label*/
    ctx[4] || /*show_fullscreen_button*/
    ctx[18] || /*show_copy_button*/
    ctx[19] || /*show_search*/
    ctx[21] !== "none") && create_if_block_9(ctx)
  );
  let if_block1 = (
    /*label*/
    ctx[3] && /*label*/
    ctx[3].length !== 0 && create_if_block_8(ctx)
  );
  let if_block2 = (
    /*show_row_numbers*/
    ctx[15] && create_if_block_7()
  );
  let each_value_3 = ensure_array_like(
    /*_headers*/
    ctx[26]
  );
  const get_key = (ctx2) => (
    /*id*/
    ctx2[140]
  );
  for (let i = 0; i < each_value_3.length; i += 1) {
    let child_ctx = get_each_context_3(ctx, each_value_3, i);
    let key = get_key(child_ctx);
    each0_lookup.set(key, each_blocks_1[i] = create_each_block_3(key, child_ctx));
  }
  let if_block3 = (
    /*show_row_numbers*/
    ctx[15] && create_if_block_6()
  );
  let each_value_2 = ensure_array_like(
    /*max*/
    ctx[51]
  );
  const get_key_1 = (ctx2) => (
    /*id*/
    ctx2[140]
  );
  for (let i = 0; i < each_value_2.length; i += 1) {
    let child_ctx = get_each_context_2(ctx, each_value_2, i);
    let key = get_key_1(child_ctx);
    each1_lookup.set(key, each_blocks[i] = create_each_block_2(key, child_ctx));
  }
  function upload_1_dragging_binding(value) {
    ctx[102](value);
  }
  let upload_1_props = {
    upload: (
      /*upload*/
      ctx[16]
    ),
    stream_handler: (
      /*stream_handler*/
      ctx[17]
    ),
    flex: false,
    center: false,
    boundedheight: false,
    disable_click: true,
    root: (
      /*root*/
      ctx[11]
    ),
    aria_label: (
      /*i18n*/
      ctx[12]("dataframe.drop_to_upload")
    ),
    $$slots: { default: [create_default_slot$1] },
    $$scope: { ctx }
  };
  if (
    /*dragging*/
    ctx[38] !== void 0
  ) {
    upload_1_props.dragging = /*dragging*/
    ctx[38];
  }
  upload_1 = new Upload({ props: upload_1_props });
  binding_callbacks.push(() => bind(upload_1, "dragging", upload_1_dragging_binding));
  upload_1.$on(
    "load",
    /*load_handler*/
    ctx[103]
  );
  let if_block4 = (
    /*show_scroll_button*/
    ctx[43] && create_if_block_2(ctx)
  );
  let if_block5 = (
    /*data*/
    ctx[27].length === 0 && /*editable*/
    ctx[9] && /*row_count*/
    ctx[6][1] === "dynamic" && create_if_block_1(ctx)
  );
  let if_block6 = (
    /*active_cell_menu*/
    (ctx[49] || /*active_header_menu*/
    ctx[48]) && create_if_block(ctx)
  );
  return {
    c() {
      div1 = element("div");
      if (if_block0)
        if_block0.c();
      t0 = space();
      div0 = element("div");
      table_1 = element("table");
      if (if_block1)
        if_block1.c();
      t1 = space();
      thead = element("thead");
      tr0 = element("tr");
      if (if_block2)
        if_block2.c();
      t2 = space();
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].c();
      }
      t3 = space();
      tbody = element("tbody");
      tr1 = element("tr");
      if (if_block3)
        if_block3.c();
      t4 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t5 = space();
      create_component(upload_1.$$.fragment);
      t6 = space();
      if (if_block4)
        if_block4.c();
      t7 = space();
      if (if_block5)
        if_block5.c();
      t8 = space();
      if (if_block6)
        if_block6.c();
      if_block6_anchor = empty();
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      if (if_block0)
        if_block0.l(div1_nodes);
      t0 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true,
        style: true,
        role: true,
        tabindex: true
      });
      var div0_nodes = children(div0);
      table_1 = claim_element(div0_nodes, "TABLE", { class: true });
      var table_1_nodes = children(table_1);
      if (if_block1)
        if_block1.l(table_1_nodes);
      t1 = claim_space(table_1_nodes);
      thead = claim_element(table_1_nodes, "THEAD", { class: true });
      var thead_nodes = children(thead);
      tr0 = claim_element(thead_nodes, "TR", { class: true });
      var tr0_nodes = children(tr0);
      if (if_block2)
        if_block2.l(tr0_nodes);
      t2 = claim_space(tr0_nodes);
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].l(tr0_nodes);
      }
      tr0_nodes.forEach(detach);
      thead_nodes.forEach(detach);
      t3 = claim_space(table_1_nodes);
      tbody = claim_element(table_1_nodes, "TBODY", { class: true });
      var tbody_nodes = children(tbody);
      tr1 = claim_element(tbody_nodes, "TR", { class: true });
      var tr1_nodes = children(tr1);
      if (if_block3)
        if_block3.l(tr1_nodes);
      t4 = claim_space(tr1_nodes);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(tr1_nodes);
      }
      tr1_nodes.forEach(detach);
      tbody_nodes.forEach(detach);
      table_1_nodes.forEach(detach);
      t5 = claim_space(div0_nodes);
      claim_component(upload_1.$$.fragment, div0_nodes);
      t6 = claim_space(div0_nodes);
      if (if_block4)
        if_block4.l(div0_nodes);
      div0_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      t7 = claim_space(nodes);
      if (if_block5)
        if_block5.l(nodes);
      t8 = claim_space(nodes);
      if (if_block6)
        if_block6.l(nodes);
      if_block6_anchor = empty();
      this.h();
    },
    h() {
      attr(tr0, "class", "svelte-18s8a4c");
      attr(thead, "class", "svelte-18s8a4c");
      attr(tr1, "class", "svelte-18s8a4c");
      attr(tbody, "class", "svelte-18s8a4c");
      attr(table_1, "class", "svelte-18s8a4c");
      attr(div0, "class", "table-wrap svelte-18s8a4c");
      set_style(
        div0,
        "height",
        /*table_height*/
        ctx[40] + "px"
      );
      attr(div0, "role", "grid");
      attr(div0, "tabindex", "0");
      toggle_class(
        div0,
        "dragging",
        /*is_dragging*/
        ctx[44]
      );
      toggle_class(div0, "no-wrap", !/*wrap*/
      ctx[10]);
      toggle_class(
        div0,
        "menu-open",
        /*active_cell_menu*/
        ctx[49] || /*active_header_menu*/
        ctx[48]
      );
      attr(div1, "class", "table-container svelte-18s8a4c");
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      if (if_block0)
        if_block0.m(div1, null);
      append_hydration(div1, t0);
      append_hydration(div1, div0);
      append_hydration(div0, table_1);
      if (if_block1)
        if_block1.m(table_1, null);
      append_hydration(table_1, t1);
      append_hydration(table_1, thead);
      append_hydration(thead, tr0);
      if (if_block2)
        if_block2.m(tr0, null);
      append_hydration(tr0, t2);
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        if (each_blocks_1[i]) {
          each_blocks_1[i].m(tr0, null);
        }
      }
      append_hydration(table_1, t3);
      append_hydration(table_1, tbody);
      append_hydration(tbody, tr1);
      if (if_block3)
        if_block3.m(tr1, null);
      append_hydration(tr1, t4);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(tr1, null);
        }
      }
      ctx[91](table_1);
      append_hydration(div0, t5);
      mount_component(upload_1, div0, null);
      append_hydration(div0, t6);
      if (if_block4)
        if_block4.m(div0, null);
      ctx[104](div0);
      insert_hydration(target, t7, anchor);
      if (if_block5)
        if_block5.m(target, anchor);
      insert_hydration(target, t8, anchor);
      if (if_block6)
        if_block6.m(target, anchor);
      insert_hydration(target, if_block6_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            window_1,
            "resize",
            /*resize_handler*/
            ctx[85]
          ),
          listen(
            div0,
            "keydown",
            /*keydown_handler*/
            ctx[105]
          ),
          listen(div0, "mousemove", function() {
            if (is_function(
              /*handle_mouse_move*/
              ctx[46]
            ))
              ctx[46].apply(this, arguments);
          }),
          listen(div0, "mouseup", function() {
            if (is_function(
              /*handle_mouse_up*/
              ctx[45]
            ))
              ctx[45].apply(this, arguments);
          }),
          listen(div0, "mouseleave", function() {
            if (is_function(
              /*handle_mouse_up*/
              ctx[45]
            ))
              ctx[45].apply(this, arguments);
          })
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (
        /*label*/
        ctx[3] && /*label*/
        ctx[3].length !== 0 && /*show_label*/
        ctx[4] || /*show_fullscreen_button*/
        ctx[18] || /*show_copy_button*/
        ctx[19] || /*show_search*/
        ctx[21] !== "none"
      ) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
          if (dirty[0] & /*label, show_label, show_fullscreen_button, show_copy_button, show_search*/
          2883608) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_9(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div1, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (
        /*label*/
        ctx[3] && /*label*/
        ctx[3].length !== 0
      ) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_8(ctx);
          if_block1.c();
          if_block1.m(table_1, t1);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (
        /*show_row_numbers*/
        ctx[15]
      ) {
        if (if_block2) {
          if (dirty[0] & /*show_row_numbers*/
          32768) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block_7();
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(tr0, t2);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
      if (dirty[0] & /*_headers, headers, latex_delimiters, line_breaks, max_chars, root, editable, static_columns, i18n, col_count, els*/
      80763553 | dirty[1] & /*actual_pinned_columns, header_edit, selected_header, df_actions, handle_header_click, end_header_edit, $df_state*/
      211812396 | dirty[2] & /*toggle_header_menu*/
      8) {
        each_value_3 = ensure_array_like(
          /*_headers*/
          ctx[26]
        );
        group_outros();
        each_blocks_1 = update_keyed_each(each_blocks_1, dirty, get_key, 1, ctx, each_value_3, each0_lookup, tr0, outro_and_destroy_block, create_each_block_3, null, get_each_context_3);
        check_outros();
      }
      if (
        /*show_row_numbers*/
        ctx[15]
      ) {
        if (if_block3) {
          if (dirty[0] & /*show_row_numbers*/
          32768) {
            transition_in(if_block3, 1);
          }
        } else {
          if_block3 = create_if_block_6();
          if_block3.c();
          transition_in(if_block3, 1);
          if_block3.m(tr1, t4);
        }
      } else if (if_block3) {
        group_outros();
        transition_out(if_block3, 1, 1, () => {
          if_block3 = null;
        });
        check_outros();
      }
      if (dirty[0] & /*cells, latex_delimiters, line_breaks, datatype, root, editable, i18n*/
      268458628 | dirty[1] & /*max, selected_cells, is_dragging*/
      1056770 | dirty[2] & /*handle_select_column, handle_select_row*/
      3) {
        each_value_2 = ensure_array_like(
          /*max*/
          ctx[51]
        );
        group_outros();
        each_blocks = update_keyed_each(each_blocks, dirty, get_key_1, 1, ctx, each_value_2, each1_lookup, tr1, outro_and_destroy_block, create_each_block_2, null, get_each_context_2);
        check_outros();
      }
      const upload_1_changes = {};
      if (dirty[0] & /*upload*/
      65536)
        upload_1_changes.upload = /*upload*/
        ctx[16];
      if (dirty[0] & /*stream_handler*/
      131072)
        upload_1_changes.stream_handler = /*stream_handler*/
        ctx[17];
      if (dirty[0] & /*root*/
      2048)
        upload_1_changes.root = /*root*/
        ctx[11];
      if (dirty[0] & /*i18n*/
      4096)
        upload_1_changes.aria_label = /*i18n*/
        ctx[12]("dataframe.drop_to_upload");
      if (dirty[0] & /*max_height, copy_flash, latex_delimiters, line_breaks, datatype, clear_on_focus, max_chars, root, editable, static_columns, i18n, components, els, show_row_numbers, _headers, headers, col_count, label*/
      131136429 | dirty[1] & /*selected_index, active_cell_menu, active_header_menu, search_results, table_height, scrollbar_width, viewport, show_scroll_button, actual_pinned_columns, handle_mouse_down, selected_cells, editing, is_dragging, header_edit, selected_header, $df_state*/
      3096367 | dirty[4] & /*$$scope*/
      8388608) {
        upload_1_changes.$$scope = { dirty, ctx };
      }
      if (!updating_dragging && dirty[1] & /*dragging*/
      128) {
        updating_dragging = true;
        upload_1_changes.dragging = /*dragging*/
        ctx[38];
        add_flush_callback(() => updating_dragging = false);
      }
      upload_1.$set(upload_1_changes);
      if (
        /*show_scroll_button*/
        ctx[43]
      ) {
        if (if_block4) {
          if_block4.p(ctx, dirty);
        } else {
          if_block4 = create_if_block_2(ctx);
          if_block4.c();
          if_block4.m(div0, null);
        }
      } else if (if_block4) {
        if_block4.d(1);
        if_block4 = null;
      }
      if (!current || dirty[1] & /*table_height*/
      512) {
        set_style(
          div0,
          "height",
          /*table_height*/
          ctx[40] + "px"
        );
      }
      if (!current || dirty[1] & /*is_dragging*/
      8192) {
        toggle_class(
          div0,
          "dragging",
          /*is_dragging*/
          ctx[44]
        );
      }
      if (!current || dirty[0] & /*wrap*/
      1024) {
        toggle_class(div0, "no-wrap", !/*wrap*/
        ctx[10]);
      }
      if (!current || dirty[1] & /*active_cell_menu, active_header_menu*/
      393216) {
        toggle_class(
          div0,
          "menu-open",
          /*active_cell_menu*/
          ctx[49] || /*active_header_menu*/
          ctx[48]
        );
      }
      if (
        /*data*/
        ctx[27].length === 0 && /*editable*/
        ctx[9] && /*row_count*/
        ctx[6][1] === "dynamic"
      ) {
        if (if_block5) {
          if_block5.p(ctx, dirty);
          if (dirty[0] & /*data, editable, row_count*/
          134218304) {
            transition_in(if_block5, 1);
          }
        } else {
          if_block5 = create_if_block_1(ctx);
          if_block5.c();
          transition_in(if_block5, 1);
          if_block5.m(t8.parentNode, t8);
        }
      } else if (if_block5) {
        group_outros();
        transition_out(if_block5, 1, 1, () => {
          if_block5 = null;
        });
        check_outros();
      }
      if (
        /*active_cell_menu*/
        ctx[49] || /*active_header_menu*/
        ctx[48]
      ) {
        if (if_block6) {
          if_block6.p(ctx, dirty);
          if (dirty[1] & /*active_cell_menu, active_header_menu*/
          393216) {
            transition_in(if_block6, 1);
          }
        } else {
          if_block6 = create_if_block(ctx);
          if_block6.c();
          transition_in(if_block6, 1);
          if_block6.m(if_block6_anchor.parentNode, if_block6_anchor);
        }
      } else if (if_block6) {
        group_outros();
        transition_out(if_block6, 1, 1, () => {
          if_block6 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block2);
      for (let i = 0; i < each_value_3.length; i += 1) {
        transition_in(each_blocks_1[i]);
      }
      transition_in(if_block3);
      for (let i = 0; i < each_value_2.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      transition_in(upload_1.$$.fragment, local);
      transition_in(if_block5);
      transition_in(if_block6);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block2);
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        transition_out(each_blocks_1[i]);
      }
      transition_out(if_block3);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      transition_out(upload_1.$$.fragment, local);
      transition_out(if_block5);
      transition_out(if_block6);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
        detach(t7);
        detach(t8);
        detach(if_block6_anchor);
      }
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      if (if_block2)
        if_block2.d();
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].d();
      }
      if (if_block3)
        if_block3.d();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
      ctx[91](null);
      destroy_component(upload_1);
      if (if_block4)
        if_block4.d();
      ctx[104](null);
      if (if_block5)
        if_block5.d(detaching);
      if (if_block6)
        if_block6.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function make_id() {
  return Math.random().toString(36).substring(2, 15);
}
function get_cell_width(index) {
  return `var(--cell-width-${index})`;
}
const scroll_top_handler = (_) => {
};
function instance$1($$self, $$props, $$invalidate) {
  let actual_pinned_columns;
  let selected_cells;
  let selected;
  let editing;
  let header_edit;
  let selected_header;
  let active_cell_menu;
  let active_header_menu;
  let max;
  let selected_index;
  let keyboard_ctx;
  let selection_ctx;
  let handle_mouse_down;
  let handle_mouse_move;
  let handle_mouse_up;
  let $df_state;
  let { datatype } = $$props;
  let { label = null } = $$props;
  let { show_label = true } = $$props;
  let { headers = [] } = $$props;
  let { values = [] } = $$props;
  let { col_count } = $$props;
  let { row_count } = $$props;
  let { latex_delimiters } = $$props;
  let { components = {} } = $$props;
  let { editable = true } = $$props;
  let { wrap = false } = $$props;
  let { root } = $$props;
  let { i18n } = $$props;
  let { max_height = 500 } = $$props;
  let { line_breaks = true } = $$props;
  let { column_widths = [] } = $$props;
  let { show_row_numbers = false } = $$props;
  let { upload } = $$props;
  let { stream_handler } = $$props;
  let { show_fullscreen_button = false } = $$props;
  let { show_copy_button = false } = $$props;
  let { value_is_output = false } = $$props;
  let { max_chars = void 0 } = $$props;
  let { show_search = "none" } = $$props;
  let { pinned_columns = 0 } = $$props;
  let { static_columns = [] } = $$props;
  const { state: df_state, actions: df_actions } = create_dataframe_context({
    show_fullscreen_button,
    show_copy_button,
    show_search,
    show_row_numbers,
    editable,
    pinned_columns,
    show_label,
    line_breaks,
    wrap,
    max_height,
    column_widths,
    max_chars
  });
  component_subscribe($$self, df_state, (value) => $$invalidate(36, $df_state = value));
  let previous_selected_cells = [];
  let { display_value = null } = $$props;
  let { styling = null } = $$props;
  let els = {};
  let data_binding = {};
  const dispatch = createEventDispatcher();
  let clear_on_focus = false;
  let is_fullscreen = false;
  let dragging = false;
  let copy_flash = false;
  let color_accent_copied;
  onMount(() => {
    const color = getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim();
    color_accent_copied = color + "40";
    document.documentElement.style.setProperty("--color-accent-copied", color_accent_copied);
  });
  const get_data_at = (row, col) => {
    var _a, _b;
    return (_b = (_a = data == null ? void 0 : data[row]) == null ? void 0 : _a[col]) == null ? void 0 : _b.value;
  };
  let _headers = make_headers(headers, col_count, els, make_id);
  let old_headers = headers;
  let data = [[]];
  let old_val = void 0;
  let search_results = [[]];
  let previous_headers = _headers.map((h) => h.value);
  let previous_data = data.map((row) => row.map((cell) => String(cell.value)));
  function handle_sort(col, direction) {
    df_actions.handle_sort(col, direction);
    sort_data2(data, display_value, styling);
  }
  function clear_sort() {
    df_actions.reset_sort_state();
    sort_data2(data, display_value, styling);
  }
  async function edit_header(i, _select = false) {
    if (!editable || header_edit === i)
      return;
    if (!editable || col_count[1] !== "dynamic" || header_edit === i)
      return;
    df_actions.set_header_edit(i);
  }
  function handle_header_click(event, col) {
    if (event.target instanceof HTMLAnchorElement) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (!editable)
      return;
    $$invalidate(24, clear_on_focus = false);
    df_actions.set_editing(false);
    df_actions.handle_header_click(col, editable);
    parent.focus();
  }
  function end_header_edit(event) {
    if (!editable)
      return;
    df_actions.end_header_edit(event.detail.key);
    parent.focus();
  }
  async function add_row(index) {
    var _a;
    parent.focus();
    if (row_count[1] !== "dynamic")
      return;
    const new_row = Array(((_a = data[0]) == null ? void 0 : _a.length) || headers.length).fill(0).map((_, i) => {
      const _id = make_id();
      $$invalidate(23, els[_id] = { cell: null, input: null }, els);
      return { id: _id, value: "" };
    });
    if (data.length === 0) {
      $$invalidate(27, data = [new_row]);
    } else if (index !== void 0 && index >= 0 && index <= data.length) {
      data.splice(index, 0, new_row);
    } else {
      data.push(new_row);
    }
    $$invalidate(27, data), $$invalidate(1, values), $$invalidate(80, old_val), $$invalidate(29, parent), $$invalidate(23, els), $$invalidate(125, data_binding), $$invalidate(75, display_value), $$invalidate(36, $df_state), $$invalidate(76, styling), $$invalidate(28, cells);
    $$invalidate(84, selected = [index !== void 0 ? index : data.length - 1, 0]);
  }
  async function add_col(index) {
    parent.focus();
    if (col_count[1] !== "dynamic")
      return;
    const result = df_actions.add_col(data, headers, make_id, index);
    result.data.forEach((row) => {
      row.forEach((cell) => {
        if (!els[cell.id]) {
          $$invalidate(23, els[cell.id] = { cell: null, input: null }, els);
        }
      });
    });
    $$invalidate(27, data = result.data);
    $$invalidate(0, headers = result.headers);
    await tick();
    requestAnimationFrame(() => {
      edit_header(index !== void 0 ? index : data[0].length - 1, true);
      const new_w = parent.querySelectorAll("tbody")[1].offsetWidth;
      parent.querySelectorAll("table")[1].scrollTo({ left: new_w });
    });
  }
  function handle_click_outside$1(event) {
    if (handle_click_outside(event, parent)) {
      df_actions.clear_ui_state();
      $$invalidate(33, header_edit = false);
      $$invalidate(34, selected_header = false);
    }
  }
  let cells = [];
  let parent;
  let table;
  let last_width_data_length = 0;
  let last_width_column_count = 0;
  function set_cell_widths() {
    var _a;
    const column_count = ((_a = data[0]) == null ? void 0 : _a.length) || 0;
    if (last_width_data_length === data.length && last_width_column_count === column_count && $df_state.sort_state.sort_columns.length > 0) {
      return;
    }
    last_width_data_length = data.length;
    last_width_column_count = column_count;
    const widths = cells.map((el) => (el == null ? void 0 : el.clientWidth) || 0);
    if (widths.length === 0)
      return;
    if (show_row_numbers) {
      parent.style.setProperty(`--cell-width-row-number`, `${widths[0]}px`);
    }
    for (let i = 0; i < 50; i++) {
      if (!column_widths[i]) {
        parent.style.removeProperty(`--cell-width-${i}`);
      } else if (column_widths[i].endsWith("%")) {
        const percentage = parseFloat(column_widths[i]);
        const pixel_width = Math.floor(percentage / 100 * parent.clientWidth);
        parent.style.setProperty(`--cell-width-${i}`, `${pixel_width}px`);
      } else {
        parent.style.setProperty(`--cell-width-${i}`, column_widths[i]);
      }
    }
    widths.forEach((width, i) => {
      if (!column_widths[i]) {
        const calculated_width = `${Math.max(width, 45)}px`;
        parent.style.setProperty(`--cell-width-${i}`, calculated_width);
      }
    });
  }
  let table_height = values.slice(0, max_height / values.length * 37).length * 37 + 37;
  let scrollbar_width = 0;
  function sort_data2(_data, _display_value, _styling) {
    const result = sort_data_and_preserve_selection(_data, _display_value, _styling, $df_state.sort_state.sort_columns, selected, get_current_indices);
    $$invalidate(27, data = result.data);
    $$invalidate(84, selected = result.selected);
  }
  let is_visible = false;
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !is_visible) {
          set_cell_widths();
          $$invalidate(27, data), $$invalidate(1, values), $$invalidate(80, old_val), $$invalidate(29, parent), $$invalidate(23, els), $$invalidate(125, data_binding), $$invalidate(75, display_value), $$invalidate(36, $df_state), $$invalidate(76, styling), $$invalidate(28, cells);
        }
        is_visible = entry.isIntersecting;
      });
    });
    observer.observe(parent);
    document.addEventListener("click", handle_click_outside$1);
    window.addEventListener("resize", handle_resize);
    document.addEventListener("fullscreenchange", handle_fullscreen_change);
    return () => {
      observer.disconnect();
      document.removeEventListener("click", handle_click_outside$1);
      window.removeEventListener("resize", handle_resize);
      document.removeEventListener("fullscreenchange", handle_fullscreen_change);
    };
  });
  function toggle_cell_menu(event, row, col) {
    selection_ctx.actions.toggle_cell_menu(event, row, col);
  }
  function handle_select_column(col) {
    selection_ctx.actions.handle_select_column(col);
  }
  function handle_select_row(row) {
    selection_ctx.actions.handle_select_row(row);
  }
  function toggle_fullscreen() {
    if (!document.fullscreenElement) {
      parent.requestFullscreen();
      $$invalidate(37, is_fullscreen = true);
    } else {
      document.exitFullscreen();
      $$invalidate(37, is_fullscreen = false);
    }
  }
  function handle_fullscreen_change() {
    $$invalidate(37, is_fullscreen = !!document.fullscreenElement);
  }
  function toggle_header_menu(event, col) {
    event.stopPropagation();
    if (active_header_menu && active_header_menu.col === col) {
      df_actions.set_active_header_menu(null);
    } else {
      const header = event.target.closest("th");
      if (header) {
        const rect = header.getBoundingClientRect();
        df_actions.set_active_header_menu({ col, x: rect.right, y: rect.bottom });
      }
    }
  }
  afterUpdate(() => {
    $$invalidate(72, value_is_output = false);
  });
  function delete_col_at(index) {
    if (col_count[1] !== "dynamic")
      return;
    if (data[0].length <= 1)
      return;
    const result = df_actions.delete_col_at(data, headers, index);
    $$invalidate(27, data = result.data);
    $$invalidate(0, headers = result.headers);
    $$invalidate(26, _headers = make_headers(headers, col_count, els, make_id));
    df_actions.set_active_cell_menu(null);
    df_actions.set_active_header_menu(null);
    df_actions.set_selected(false);
    df_actions.set_selected_cells([]);
    df_actions.set_editing(false);
  }
  function delete_row_at(index) {
    $$invalidate(27, data = df_actions.delete_row_at(data, index));
    df_actions.set_active_cell_menu(null);
    df_actions.set_active_header_menu(null);
  }
  function commit_filter() {
    if ($df_state.current_search_query && show_search === "filter") {
      const filtered_data = [];
      const filtered_display_values = [];
      const filtered_styling = [];
      search_results.forEach((row) => {
        const data_row = [];
        const display_row = [];
        const styling_row = [];
        row.forEach((cell) => {
          data_row.push(cell.value);
          display_row.push(cell.display_value || String(cell.value));
          styling_row.push(cell.styling || "");
        });
        filtered_data.push(data_row);
        filtered_display_values.push(display_row);
        filtered_styling.push(styling_row);
      });
      const change_payload = {
        data: filtered_data,
        headers: _headers.map((h) => h.value),
        metadata: {
          display_value: filtered_display_values,
          styling: filtered_styling
        }
      };
      dispatch("change", change_payload);
      if (!value_is_output) {
        dispatch("input");
      }
      df_actions.handle_search(null);
    }
  }
  let viewport;
  let show_scroll_button = false;
  function scroll_to_top() {
    viewport.scrollTo({ top: 0 });
  }
  function handle_resize() {
    df_actions.set_active_cell_menu(null);
    df_actions.set_active_header_menu(null);
    $$invalidate(32, selected_cells = []);
    $$invalidate(84, selected = false);
    $$invalidate(31, editing = false);
    set_cell_widths();
  }
  function add_row_at(index, position) {
    const row_index = position === "above" ? index : index + 1;
    add_row(row_index);
    $$invalidate(49, active_cell_menu = null);
    $$invalidate(48, active_header_menu = null);
  }
  function add_col_at(index, position) {
    const col_index = position === "left" ? index : index + 1;
    add_col(col_index);
    $$invalidate(49, active_cell_menu = null);
    $$invalidate(48, active_header_menu = null);
  }
  function reset_sort_state() {
    df_actions.reset_sort_state();
  }
  let is_dragging = false;
  let drag_start = null;
  let mouse_down_pos = null;
  const drag_state = { is_dragging, drag_start, mouse_down_pos };
  let drag_handlers;
  function init_drag_handlers() {
    $$invalidate(83, drag_handlers = create_drag_handlers(drag_state, (value) => $$invalidate(44, is_dragging = value), (cells2) => df_actions.set_selected_cells(cells2), (cell) => df_actions.set_selected(cell), (event, row, col) => selection_ctx.actions.handle_cell_click(event, row, col), show_row_numbers, parent));
  }
  const resize_handler = () => set_cell_widths();
  const func2 = async () => await copy_table_data(data, null);
  const search_handler = (e) => df_actions.handle_search(e.detail);
  function tableheader_value_binding(value, i) {
    if ($$self.$$.not_equal(_headers[i].value, value)) {
      _headers[i].value = value;
      $$invalidate(26, _headers), $$invalidate(0, headers), $$invalidate(79, old_headers), $$invalidate(5, col_count), $$invalidate(23, els);
    }
  }
  function tableheader_el_binding(value, id) {
    if ($$self.$$.not_equal(els[id].input, value)) {
      els[id].input = value;
      $$invalidate(23, els);
    }
  }
  function td_binding($$value, j) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      cells[j] = $$value;
      $$invalidate(28, cells);
    });
  }
  function table_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      table = $$value;
      $$invalidate(30, table);
    });
  }
  const func_1 = (e, r, c) => handle_mouse_down(e, r, c);
  function tablecell_value_binding(value, index, j) {
    if ($$self.$$.not_equal(search_results[index][j].value, value)) {
      search_results[index][j].value = value;
      $$invalidate(39, search_results), $$invalidate(36, $df_state), $$invalidate(27, data), $$invalidate(76, styling), $$invalidate(1, values), $$invalidate(80, old_val), $$invalidate(29, parent), $$invalidate(23, els), $$invalidate(125, data_binding), $$invalidate(75, display_value), $$invalidate(28, cells);
    }
  }
  function tablecell_el_binding(value, id) {
    if ($$self.$$.not_equal(els[id], value)) {
      els[id] = value;
      $$invalidate(23, els);
    }
  }
  function tableheader_value_binding_1(value, i) {
    if ($$self.$$.not_equal(_headers[i].value, value)) {
      _headers[i].value = value;
      $$invalidate(26, _headers), $$invalidate(0, headers), $$invalidate(79, old_headers), $$invalidate(5, col_count), $$invalidate(23, els);
    }
  }
  function tableheader_el_binding_1(value, id) {
    if ($$self.$$.not_equal(els[id].input, value)) {
      els[id].input = value;
      $$invalidate(23, els);
    }
  }
  function virtualtable_items_binding(value) {
    search_results = value;
    $$invalidate(39, search_results), $$invalidate(36, $df_state), $$invalidate(27, data), $$invalidate(76, styling), $$invalidate(1, values), $$invalidate(80, old_val), $$invalidate(29, parent), $$invalidate(23, els), $$invalidate(125, data_binding), $$invalidate(75, display_value), $$invalidate(28, cells);
  }
  function virtualtable_actual_height_binding(value) {
    table_height = value;
    $$invalidate(40, table_height);
  }
  function virtualtable_table_scrollbar_width_binding(value) {
    scrollbar_width = value;
    $$invalidate(41, scrollbar_width);
  }
  function virtualtable_viewport_binding(value) {
    viewport = value;
    $$invalidate(42, viewport);
  }
  function virtualtable_show_scroll_button_binding(value) {
    show_scroll_button = value;
    $$invalidate(43, show_scroll_button);
  }
  function upload_1_dragging_binding(value) {
    dragging = value;
    $$invalidate(38, dragging);
  }
  const load_handler = ({ detail }) => handle_file_upload(
    detail.data,
    (head) => {
      $$invalidate(26, _headers = make_headers(head.map((h) => h ?? ""), col_count, els, make_id));
      return _headers;
    },
    (vals) => {
      $$invalidate(1, values = vals);
    }
  );
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      parent = $$value;
      $$invalidate(29, parent);
    });
  }
  const keydown_handler = (e) => handle_keydown(e, keyboard_ctx);
  const func_2 = () => add_row();
  const func_3 = () => add_row_at((active_cell_menu == null ? void 0 : active_cell_menu.row) ?? -1, "above");
  const func_4 = () => add_row_at((active_cell_menu == null ? void 0 : active_cell_menu.row) ?? -1, "below");
  const func_5 = () => add_col_at((active_cell_menu == null ? void 0 : active_cell_menu.col) ?? (active_header_menu == null ? void 0 : active_header_menu.col) ?? -1, "left");
  const func_6 = () => add_col_at((active_cell_menu == null ? void 0 : active_cell_menu.col) ?? (active_header_menu == null ? void 0 : active_header_menu.col) ?? -1, "right");
  const func_7 = () => delete_row_at((active_cell_menu == null ? void 0 : active_cell_menu.row) ?? -1);
  const func_8 = () => delete_col_at((active_cell_menu == null ? void 0 : active_cell_menu.col) ?? (active_header_menu == null ? void 0 : active_header_menu.col) ?? -1);
  const func_9 = (direction) => {
    if (active_header_menu) {
      handle_sort(active_header_menu.col, direction);
      df_actions.set_active_header_menu(null);
    }
  };
  const func_10 = () => {
    clear_sort();
    df_actions.set_active_header_menu(null);
  };
  const func_11 = (item) => item.col === ((active_header_menu == null ? void 0 : active_header_menu.col) ?? -1);
  const func_12 = (item) => item.col === ((active_header_menu == null ? void 0 : active_header_menu.col) ?? -1);
  $$self.$$set = ($$props2) => {
    if ("datatype" in $$props2)
      $$invalidate(2, datatype = $$props2.datatype);
    if ("label" in $$props2)
      $$invalidate(3, label = $$props2.label);
    if ("show_label" in $$props2)
      $$invalidate(4, show_label = $$props2.show_label);
    if ("headers" in $$props2)
      $$invalidate(0, headers = $$props2.headers);
    if ("values" in $$props2)
      $$invalidate(1, values = $$props2.values);
    if ("col_count" in $$props2)
      $$invalidate(5, col_count = $$props2.col_count);
    if ("row_count" in $$props2)
      $$invalidate(6, row_count = $$props2.row_count);
    if ("latex_delimiters" in $$props2)
      $$invalidate(7, latex_delimiters = $$props2.latex_delimiters);
    if ("components" in $$props2)
      $$invalidate(8, components = $$props2.components);
    if ("editable" in $$props2)
      $$invalidate(9, editable = $$props2.editable);
    if ("wrap" in $$props2)
      $$invalidate(10, wrap = $$props2.wrap);
    if ("root" in $$props2)
      $$invalidate(11, root = $$props2.root);
    if ("i18n" in $$props2)
      $$invalidate(12, i18n = $$props2.i18n);
    if ("max_height" in $$props2)
      $$invalidate(13, max_height = $$props2.max_height);
    if ("line_breaks" in $$props2)
      $$invalidate(14, line_breaks = $$props2.line_breaks);
    if ("column_widths" in $$props2)
      $$invalidate(73, column_widths = $$props2.column_widths);
    if ("show_row_numbers" in $$props2)
      $$invalidate(15, show_row_numbers = $$props2.show_row_numbers);
    if ("upload" in $$props2)
      $$invalidate(16, upload = $$props2.upload);
    if ("stream_handler" in $$props2)
      $$invalidate(17, stream_handler = $$props2.stream_handler);
    if ("show_fullscreen_button" in $$props2)
      $$invalidate(18, show_fullscreen_button = $$props2.show_fullscreen_button);
    if ("show_copy_button" in $$props2)
      $$invalidate(19, show_copy_button = $$props2.show_copy_button);
    if ("value_is_output" in $$props2)
      $$invalidate(72, value_is_output = $$props2.value_is_output);
    if ("max_chars" in $$props2)
      $$invalidate(20, max_chars = $$props2.max_chars);
    if ("show_search" in $$props2)
      $$invalidate(21, show_search = $$props2.show_search);
    if ("pinned_columns" in $$props2)
      $$invalidate(74, pinned_columns = $$props2.pinned_columns);
    if ("static_columns" in $$props2)
      $$invalidate(22, static_columns = $$props2.static_columns);
    if ("display_value" in $$props2)
      $$invalidate(75, display_value = $$props2.display_value);
    if ("styling" in $$props2)
      $$invalidate(76, styling = $$props2.styling);
  };
  $$self.$$.update = () => {
    var _a, _b;
    if ($$self.$$.dirty[0] & /*values, parent, els, data, cells*/
    947912706 | $$self.$$.dirty[1] & /*$df_state*/
    32 | $$self.$$.dirty[2] & /*old_val, display_value, styling*/
    286720) {
      if (!dequal(values, old_val)) {
        if (parent) {
          const is_reset2 = values.length === 0 || values.length === 1 && values[0].length === 0;
          const is_different_structure2 = old_val !== void 0 && (values.length !== old_val.length || values[0] && old_val[0] && values[0].length !== old_val[0].length);
          if (is_reset2 || is_different_structure2) {
            for (let i = 0; i < 50; i++) {
              parent.style.removeProperty(`--cell-width-${i}`);
            }
            last_width_data_length = 0;
            last_width_column_count = 0;
          }
        }
        const is_reset = values.length === 0 || values.length === 1 && values[0].length === 0;
        const is_different_structure = old_val !== void 0 && (values.length !== old_val.length || values[0] && old_val[0] && values[0].length !== old_val[0].length);
        $$invalidate(27, data = process_data(values, els, data_binding, make_id, display_value));
        $$invalidate(80, old_val = JSON.parse(JSON.stringify(values)));
        if (is_reset || is_different_structure) {
          df_actions.reset_sort_state();
        } else if ($df_state.sort_state.sort_columns.length > 0) {
          sort_data2(data, display_value, styling);
        }
        if ($df_state.current_search_query) {
          df_actions.handle_search(null);
        }
        if (parent && cells.length > 0) {
          set_cell_widths();
        }
      }
    }
    if ($$self.$$.dirty[0] & /*data*/
    134217728 | $$self.$$.dirty[2] & /*pinned_columns*/
    4096) {
      $$invalidate(52, actual_pinned_columns = pinned_columns && ((_a = data == null ? void 0 : data[0]) == null ? void 0 : _a.length) ? Math.min(pinned_columns, data[0].length) : 0);
    }
    if ($$self.$$.dirty[1] & /*$df_state*/
    32) {
      $$invalidate(32, selected_cells = $df_state.ui_state.selected_cells);
    }
    if ($$self.$$.dirty[1] & /*$df_state*/
    32) {
      $$invalidate(34, selected_header = $df_state.ui_state.selected_header);
    }
    if ($$self.$$.dirty[1] & /*$df_state*/
    32) {
      $$invalidate(33, header_edit = $df_state.ui_state.header_edit);
    }
    if ($$self.$$.dirty[1] & /*$df_state*/
    32) {
      $$invalidate(31, editing = $df_state.ui_state.editing);
    }
    if ($$self.$$.dirty[1] & /*$df_state*/
    32) {
      $$invalidate(84, selected = $df_state.ui_state.selected);
    }
    if ($$self.$$.dirty[0] & /*headers, col_count, els*/
    8388641 | $$self.$$.dirty[2] & /*old_headers*/
    131072) {
      {
        if (!dequal(headers, old_headers)) {
          $$invalidate(26, _headers = make_headers(headers, col_count, els, make_id));
          $$invalidate(79, old_headers = JSON.parse(JSON.stringify(headers)));
        }
      }
    }
    if ($$self.$$.dirty[0] & /*editable, data, _headers, els, copy_flash, parent*/
    780141056 | $$self.$$.dirty[1] & /*selected_header, header_edit, editing, selected_cells*/
    15 | $$self.$$.dirty[2] & /*selected*/
    4194304) {
      $$invalidate(35, keyboard_ctx = create_keyboard_context({
        selected_header,
        header_edit,
        editing,
        selected,
        selected_cells,
        editable,
        data,
        headers: _headers,
        els,
        df_actions,
        dispatch,
        add_row,
        get_next_cell_coordinates,
        get_range_selection,
        move_cursor,
        copy_flash,
        parent_element: parent,
        set_copy_flash: (value) => {
          $$invalidate(25, copy_flash = value);
          if (value) {
            setTimeout(
              () => {
                $$invalidate(25, copy_flash = false);
              },
              800
            );
          }
        }
      }));
    }
    if ($$self.$$.dirty[0] & /*copy_flash*/
    33554432 | $$self.$$.dirty[1] & /*selected_cells, keyboard_ctx*/
    18 | $$self.$$.dirty[2] & /*previous_selected_cells*/
    65536) {
      {
        if (copy_flash && !dequal(selected_cells, previous_selected_cells)) {
          keyboard_ctx == null ? void 0 : keyboard_ctx.set_copy_flash(false);
        }
        $$invalidate(78, previous_selected_cells = selected_cells);
      }
    }
    if ($$self.$$.dirty[1] & /*$df_state*/
    32) {
      $$invalidate(49, active_cell_menu = $df_state.ui_state.active_cell_menu);
    }
    if ($$self.$$.dirty[1] & /*$df_state*/
    32) {
      $$invalidate(48, active_header_menu = $df_state.ui_state.active_header_menu);
    }
    if ($$self.$$.dirty[0] & /*data*/
    134217728 | $$self.$$.dirty[1] & /*$df_state*/
    32 | $$self.$$.dirty[2] & /*styling*/
    16384) {
      if ($df_state.current_search_query !== void 0) {
        const cell_map = /* @__PURE__ */ new Map();
        data.forEach((row, row_idx) => {
          row.forEach((cell, col_idx) => {
            var _a2;
            cell_map.set(cell.id, {
              value: cell.value,
              styling: ((_a2 = styling == null ? void 0 : styling[row_idx]) == null ? void 0 : _a2[col_idx]) || ""
            });
          });
        });
        const filtered = df_actions.filter_data(data);
        $$invalidate(39, search_results = filtered.map((row) => row.map((cell) => {
          const original = cell_map.get(cell.id);
          return {
            ...cell,
            display_value: (original == null ? void 0 : original.display_value) || String(cell.value),
            styling: (original == null ? void 0 : original.styling) || ""
          };
        })));
      }
    }
    if ($$self.$$.dirty[0] & /*data, _headers*/
    201326592 | $$self.$$.dirty[2] & /*previous_data, previous_headers, value_is_output*/
    1573888) {
      {
        if (data || _headers) {
          df_actions.trigger_change(data, _headers, previous_data, previous_headers, value_is_output, dispatch);
          $$invalidate(82, previous_data = data.map((row) => row.map((cell) => String(cell.value))));
          $$invalidate(81, previous_headers = _headers.map((h) => h.value));
        }
      }
    }
    if ($$self.$$.dirty[0] & /*data*/
    134217728 | $$self.$$.dirty[2] & /*display_value, styling*/
    24576) {
      {
        df_actions.sort_data(data, display_value, styling);
        df_actions.update_row_order(data);
      }
    }
    if ($$self.$$.dirty[0] & /*data*/
    134217728 | $$self.$$.dirty[1] & /*$df_state*/
    32 | $$self.$$.dirty[2] & /*display_value, styling*/
    24576) {
      {
        if ($df_state.sort_state.sort_columns) {
          if ($df_state.sort_state.sort_columns.length > 0) {
            sort_data2(data, display_value, styling);
          }
        }
      }
    }
    if ($$self.$$.dirty[0] & /*data*/
    134217728) {
      $$invalidate(51, max = get_max(data));
    }
    if ($$self.$$.dirty[0] & /*cells*/
    268435456) {
      cells[0] && ((_b = cells[0]) == null ? void 0 : _b.clientWidth) && set_cell_widths();
    }
    if ($$self.$$.dirty[0] & /*data*/
    134217728 | $$self.$$.dirty[2] & /*display_value, styling*/
    24576) {
      sort_data2(data, display_value, styling);
    }
    if ($$self.$$.dirty[2] & /*selected*/
    4194304) {
      $$invalidate(50, selected_index = !!selected && selected[0]);
    }
    if ($$self.$$.dirty[0] & /*data, els, editable, show_row_numbers, clear_on_focus, parent*/
    696287744 | $$self.$$.dirty[1] & /*selected_cells*/
    2) {
      selection_ctx = create_selection_context({
        df_actions,
        dispatch,
        data,
        els,
        editable,
        show_row_numbers,
        get_data_at,
        clear_on_focus,
        selected_cells,
        parent_element: parent
      });
    }
    if ($$self.$$.dirty[2] & /*selected*/
    4194304)
      ;
    if ($$self.$$.dirty[0] & /*data, els, parent, table*/
    1753219072 | $$self.$$.dirty[2] & /*selected*/
    4194304) {
      if (selected !== false) {
        const positions = calculate_selection_positions(selected, data, els, parent, table);
        document.documentElement.style.setProperty("--selected-col-pos", positions.col_pos);
        document.documentElement.style.setProperty("--selected-row-pos", positions.row_pos || "0px");
      }
    }
    if ($$self.$$.dirty[0] & /*parent*/
    536870912) {
      if (parent)
        init_drag_handlers();
    }
    if ($$self.$$.dirty[2] & /*drag_handlers*/
    2097152) {
      $$invalidate(47, handle_mouse_down = (drag_handlers == null ? void 0 : drag_handlers.handle_mouse_down) || (() => {
      }));
    }
    if ($$self.$$.dirty[2] & /*drag_handlers*/
    2097152) {
      $$invalidate(46, handle_mouse_move = (drag_handlers == null ? void 0 : drag_handlers.handle_mouse_move) || (() => {
      }));
    }
    if ($$self.$$.dirty[2] & /*drag_handlers*/
    2097152) {
      $$invalidate(45, handle_mouse_up = (drag_handlers == null ? void 0 : drag_handlers.handle_mouse_up) || (() => {
      }));
    }
  };
  {
    $$invalidate(44, is_dragging = drag_state.is_dragging);
    drag_start = drag_state.drag_start;
    mouse_down_pos = drag_state.mouse_down_pos;
  }
  return [
    headers,
    values,
    datatype,
    label,
    show_label,
    col_count,
    row_count,
    latex_delimiters,
    components,
    editable,
    wrap,
    root,
    i18n,
    max_height,
    line_breaks,
    show_row_numbers,
    upload,
    stream_handler,
    show_fullscreen_button,
    show_copy_button,
    max_chars,
    show_search,
    static_columns,
    els,
    clear_on_focus,
    copy_flash,
    _headers,
    data,
    cells,
    parent,
    table,
    editing,
    selected_cells,
    header_edit,
    selected_header,
    keyboard_ctx,
    $df_state,
    is_fullscreen,
    dragging,
    search_results,
    table_height,
    scrollbar_width,
    viewport,
    show_scroll_button,
    is_dragging,
    handle_mouse_up,
    handle_mouse_move,
    handle_mouse_down,
    active_header_menu,
    active_cell_menu,
    selected_index,
    max,
    actual_pinned_columns,
    df_state,
    df_actions,
    handle_sort,
    clear_sort,
    handle_header_click,
    end_header_edit,
    add_row,
    set_cell_widths,
    toggle_cell_menu,
    handle_select_column,
    handle_select_row,
    toggle_fullscreen,
    toggle_header_menu,
    delete_col_at,
    delete_row_at,
    commit_filter,
    scroll_to_top,
    add_row_at,
    add_col_at,
    value_is_output,
    column_widths,
    pinned_columns,
    display_value,
    styling,
    reset_sort_state,
    previous_selected_cells,
    old_headers,
    old_val,
    previous_headers,
    previous_data,
    drag_handlers,
    selected,
    resize_handler,
    func2,
    search_handler,
    tableheader_value_binding,
    tableheader_el_binding,
    td_binding,
    table_1_binding,
    func_1,
    tablecell_value_binding,
    tablecell_el_binding,
    tableheader_value_binding_1,
    tableheader_el_binding_1,
    virtualtable_items_binding,
    virtualtable_actual_height_binding,
    virtualtable_table_scrollbar_width_binding,
    virtualtable_viewport_binding,
    virtualtable_show_scroll_button_binding,
    upload_1_dragging_binding,
    load_handler,
    div0_binding,
    keydown_handler,
    func_2,
    func_3,
    func_4,
    func_5,
    func_6,
    func_7,
    func_8,
    func_9,
    func_10,
    func_11,
    func_12
  ];
}
class Table extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance$1,
      create_fragment$1,
      safe_not_equal,
      {
        datatype: 2,
        label: 3,
        show_label: 4,
        headers: 0,
        values: 1,
        col_count: 5,
        row_count: 6,
        latex_delimiters: 7,
        components: 8,
        editable: 9,
        wrap: 10,
        root: 11,
        i18n: 12,
        max_height: 13,
        line_breaks: 14,
        column_widths: 73,
        show_row_numbers: 15,
        upload: 16,
        stream_handler: 17,
        show_fullscreen_button: 18,
        show_copy_button: 19,
        value_is_output: 72,
        max_chars: 20,
        show_search: 21,
        pinned_columns: 74,
        static_columns: 22,
        display_value: 75,
        styling: 76,
        reset_sort_state: 77
      },
      null,
      [-1, -1, -1, -1, -1]
    );
  }
  get reset_sort_state() {
    return this.$$.ctx[77];
  }
}
const Table$1 = Table;
function create_default_slot(ctx) {
  let statustracker;
  let t;
  let table;
  let updating_value_is_output;
  let current;
  const statustracker_spread_levels = [
    {
      autoscroll: (
        /*gradio*/
        ctx[16].autoscroll
      )
    },
    { i18n: (
      /*gradio*/
      ctx[16].i18n
    ) },
    /*loading_status*/
    ctx[19]
  ];
  let statustracker_props = {};
  for (let i = 0; i < statustracker_spread_levels.length; i += 1) {
    statustracker_props = assign(statustracker_props, statustracker_spread_levels[i]);
  }
  statustracker = new Static({ props: statustracker_props });
  statustracker.$on(
    "clear_status",
    /*clear_status_handler*/
    ctx[32]
  );
  function table_value_is_output_binding(value) {
    ctx[35](value);
  }
  let table_props = {
    root: (
      /*root*/
      ctx[13]
    ),
    label: (
      /*label*/
      ctx[7]
    ),
    show_label: (
      /*show_label*/
      ctx[8]
    ),
    row_count: (
      /*row_count*/
      ctx[6]
    ),
    col_count: (
      /*col_count*/
      ctx[5]
    ),
    values: (
      /*value*/
      ctx[0].data
    ),
    display_value: (
      /*display_value*/
      ctx[29]
    ),
    styling: (
      /*styling*/
      ctx[28]
    ),
    headers: (
      /*_headers*/
      ctx[30]
    ),
    wrap: (
      /*wrap*/
      ctx[9]
    ),
    datatype: (
      /*datatype*/
      ctx[10]
    ),
    latex_delimiters: (
      /*latex_delimiters*/
      ctx[17]
    ),
    editable: (
      /*interactive*/
      ctx[20]
    ),
    max_height: (
      /*max_height*/
      ctx[18]
    ),
    i18n: (
      /*gradio*/
      ctx[16].i18n
    ),
    line_breaks: (
      /*line_breaks*/
      ctx[14]
    ),
    column_widths: (
      /*column_widths*/
      ctx[15]
    ),
    upload: (
      /*func*/
      ctx[33]
    ),
    stream_handler: (
      /*func_1*/
      ctx[34]
    ),
    show_fullscreen_button: (
      /*show_fullscreen_button*/
      ctx[21]
    ),
    max_chars: (
      /*max_chars*/
      ctx[22]
    ),
    show_copy_button: (
      /*show_copy_button*/
      ctx[23]
    ),
    show_row_numbers: (
      /*show_row_numbers*/
      ctx[24]
    ),
    show_search: (
      /*show_search*/
      ctx[25]
    ),
    pinned_columns: (
      /*pinned_columns*/
      ctx[26]
    ),
    components: { image: Index$1 },
    static_columns: (
      /*static_columns*/
      ctx[27]
    )
  };
  if (
    /*value_is_output*/
    ctx[1] !== void 0
  ) {
    table_props.value_is_output = /*value_is_output*/
    ctx[1];
  }
  table = new Table$1({ props: table_props });
  binding_callbacks.push(() => bind(table, "value_is_output", table_value_is_output_binding));
  table.$on(
    "change",
    /*change_handler*/
    ctx[36]
  );
  table.$on(
    "input",
    /*input_handler*/
    ctx[37]
  );
  table.$on(
    "select",
    /*select_handler*/
    ctx[38]
  );
  return {
    c() {
      create_component(statustracker.$$.fragment);
      t = space();
      create_component(table.$$.fragment);
    },
    l(nodes) {
      claim_component(statustracker.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(table.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(statustracker, target, anchor);
      insert_hydration(target, t, anchor);
      mount_component(table, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const statustracker_changes = dirty[0] & /*gradio, loading_status*/
      589824 ? get_spread_update(statustracker_spread_levels, [
        dirty[0] & /*gradio*/
        65536 && {
          autoscroll: (
            /*gradio*/
            ctx2[16].autoscroll
          )
        },
        dirty[0] & /*gradio*/
        65536 && { i18n: (
          /*gradio*/
          ctx2[16].i18n
        ) },
        dirty[0] & /*loading_status*/
        524288 && get_spread_object(
          /*loading_status*/
          ctx2[19]
        )
      ]) : {};
      statustracker.$set(statustracker_changes);
      const table_changes = {};
      if (dirty[0] & /*root*/
      8192)
        table_changes.root = /*root*/
        ctx2[13];
      if (dirty[0] & /*label*/
      128)
        table_changes.label = /*label*/
        ctx2[7];
      if (dirty[0] & /*show_label*/
      256)
        table_changes.show_label = /*show_label*/
        ctx2[8];
      if (dirty[0] & /*row_count*/
      64)
        table_changes.row_count = /*row_count*/
        ctx2[6];
      if (dirty[0] & /*col_count*/
      32)
        table_changes.col_count = /*col_count*/
        ctx2[5];
      if (dirty[0] & /*value*/
      1)
        table_changes.values = /*value*/
        ctx2[0].data;
      if (dirty[0] & /*display_value*/
      536870912)
        table_changes.display_value = /*display_value*/
        ctx2[29];
      if (dirty[0] & /*styling*/
      268435456)
        table_changes.styling = /*styling*/
        ctx2[28];
      if (dirty[0] & /*_headers*/
      1073741824)
        table_changes.headers = /*_headers*/
        ctx2[30];
      if (dirty[0] & /*wrap*/
      512)
        table_changes.wrap = /*wrap*/
        ctx2[9];
      if (dirty[0] & /*datatype*/
      1024)
        table_changes.datatype = /*datatype*/
        ctx2[10];
      if (dirty[0] & /*latex_delimiters*/
      131072)
        table_changes.latex_delimiters = /*latex_delimiters*/
        ctx2[17];
      if (dirty[0] & /*interactive*/
      1048576)
        table_changes.editable = /*interactive*/
        ctx2[20];
      if (dirty[0] & /*max_height*/
      262144)
        table_changes.max_height = /*max_height*/
        ctx2[18];
      if (dirty[0] & /*gradio*/
      65536)
        table_changes.i18n = /*gradio*/
        ctx2[16].i18n;
      if (dirty[0] & /*line_breaks*/
      16384)
        table_changes.line_breaks = /*line_breaks*/
        ctx2[14];
      if (dirty[0] & /*column_widths*/
      32768)
        table_changes.column_widths = /*column_widths*/
        ctx2[15];
      if (dirty[0] & /*gradio*/
      65536)
        table_changes.upload = /*func*/
        ctx2[33];
      if (dirty[0] & /*gradio*/
      65536)
        table_changes.stream_handler = /*func_1*/
        ctx2[34];
      if (dirty[0] & /*show_fullscreen_button*/
      2097152)
        table_changes.show_fullscreen_button = /*show_fullscreen_button*/
        ctx2[21];
      if (dirty[0] & /*max_chars*/
      4194304)
        table_changes.max_chars = /*max_chars*/
        ctx2[22];
      if (dirty[0] & /*show_copy_button*/
      8388608)
        table_changes.show_copy_button = /*show_copy_button*/
        ctx2[23];
      if (dirty[0] & /*show_row_numbers*/
      16777216)
        table_changes.show_row_numbers = /*show_row_numbers*/
        ctx2[24];
      if (dirty[0] & /*show_search*/
      33554432)
        table_changes.show_search = /*show_search*/
        ctx2[25];
      if (dirty[0] & /*pinned_columns*/
      67108864)
        table_changes.pinned_columns = /*pinned_columns*/
        ctx2[26];
      if (dirty[0] & /*static_columns*/
      134217728)
        table_changes.static_columns = /*static_columns*/
        ctx2[27];
      if (!updating_value_is_output && dirty[0] & /*value_is_output*/
      2) {
        updating_value_is_output = true;
        table_changes.value_is_output = /*value_is_output*/
        ctx2[1];
        add_flush_callback(() => updating_value_is_output = false);
      }
      table.$set(table_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(statustracker.$$.fragment, local);
      transition_in(table.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(statustracker.$$.fragment, local);
      transition_out(table.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      destroy_component(statustracker, detaching);
      destroy_component(table, detaching);
    }
  };
}
function create_fragment(ctx) {
  let block;
  let current;
  block = new Block({
    props: {
      visible: (
        /*visible*/
        ctx[4]
      ),
      padding: false,
      elem_id: (
        /*elem_id*/
        ctx[2]
      ),
      elem_classes: (
        /*elem_classes*/
        ctx[3]
      ),
      container: false,
      scale: (
        /*scale*/
        ctx[11]
      ),
      min_width: (
        /*min_width*/
        ctx[12]
      ),
      overflow_behavior: "visible",
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(block.$$.fragment);
    },
    l(nodes) {
      claim_component(block.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(block, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const block_changes = {};
      if (dirty[0] & /*visible*/
      16)
        block_changes.visible = /*visible*/
        ctx2[4];
      if (dirty[0] & /*elem_id*/
      4)
        block_changes.elem_id = /*elem_id*/
        ctx2[2];
      if (dirty[0] & /*elem_classes*/
      8)
        block_changes.elem_classes = /*elem_classes*/
        ctx2[3];
      if (dirty[0] & /*scale*/
      2048)
        block_changes.scale = /*scale*/
        ctx2[11];
      if (dirty[0] & /*min_width*/
      4096)
        block_changes.min_width = /*min_width*/
        ctx2[12];
      if (dirty[0] & /*root, label, show_label, row_count, col_count, value, display_value, styling, _headers, wrap, datatype, latex_delimiters, interactive, max_height, gradio, line_breaks, column_widths, show_fullscreen_button, max_chars, show_copy_button, show_row_numbers, show_search, pinned_columns, static_columns, value_is_output, loading_status*/
      2147477475 | dirty[1] & /*$$scope*/
      256) {
        block_changes.$$scope = { dirty, ctx: ctx2 };
      }
      block.$set(block_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(block.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(block.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(block, detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let _headers;
  let display_value;
  let styling;
  let { headers = [] } = $$props;
  let { elem_id = "" } = $$props;
  let { elem_classes = [] } = $$props;
  let { visible = true } = $$props;
  let { value = {
    data: [["", "", ""]],
    headers: ["1", "2", "3"],
    metadata: null
  } } = $$props;
  let { value_is_output = false } = $$props;
  let { col_count } = $$props;
  let { row_count } = $$props;
  let { label = null } = $$props;
  let { show_label = true } = $$props;
  let { wrap } = $$props;
  let { datatype } = $$props;
  let { scale = null } = $$props;
  let { min_width = void 0 } = $$props;
  let { root } = $$props;
  let { line_breaks = true } = $$props;
  let { column_widths = [] } = $$props;
  let { gradio } = $$props;
  let { latex_delimiters } = $$props;
  let { max_height = void 0 } = $$props;
  let { loading_status } = $$props;
  let { interactive } = $$props;
  let { show_fullscreen_button = false } = $$props;
  let { max_chars = void 0 } = $$props;
  let { show_copy_button = false } = $$props;
  let { show_row_numbers = false } = $$props;
  let { show_search = "none" } = $$props;
  let { pinned_columns = 0 } = $$props;
  let { static_columns = [] } = $$props;
  const clear_status_handler = () => gradio.dispatch("clear_status", loading_status);
  const func2 = (...args) => gradio.client.upload(...args);
  const func_1 = (...args) => gradio.client.stream(...args);
  function table_value_is_output_binding(value2) {
    value_is_output = value2;
    $$invalidate(1, value_is_output);
  }
  const change_handler = (e) => {
    $$invalidate(0, value.data = e.detail.data, value);
    $$invalidate(0, value.headers = e.detail.headers, value);
    gradio.dispatch("change");
  };
  const input_handler = (e) => gradio.dispatch("input");
  const select_handler = (e) => gradio.dispatch("select", e.detail);
  $$self.$$set = ($$props2) => {
    if ("headers" in $$props2)
      $$invalidate(31, headers = $$props2.headers);
    if ("elem_id" in $$props2)
      $$invalidate(2, elem_id = $$props2.elem_id);
    if ("elem_classes" in $$props2)
      $$invalidate(3, elem_classes = $$props2.elem_classes);
    if ("visible" in $$props2)
      $$invalidate(4, visible = $$props2.visible);
    if ("value" in $$props2)
      $$invalidate(0, value = $$props2.value);
    if ("value_is_output" in $$props2)
      $$invalidate(1, value_is_output = $$props2.value_is_output);
    if ("col_count" in $$props2)
      $$invalidate(5, col_count = $$props2.col_count);
    if ("row_count" in $$props2)
      $$invalidate(6, row_count = $$props2.row_count);
    if ("label" in $$props2)
      $$invalidate(7, label = $$props2.label);
    if ("show_label" in $$props2)
      $$invalidate(8, show_label = $$props2.show_label);
    if ("wrap" in $$props2)
      $$invalidate(9, wrap = $$props2.wrap);
    if ("datatype" in $$props2)
      $$invalidate(10, datatype = $$props2.datatype);
    if ("scale" in $$props2)
      $$invalidate(11, scale = $$props2.scale);
    if ("min_width" in $$props2)
      $$invalidate(12, min_width = $$props2.min_width);
    if ("root" in $$props2)
      $$invalidate(13, root = $$props2.root);
    if ("line_breaks" in $$props2)
      $$invalidate(14, line_breaks = $$props2.line_breaks);
    if ("column_widths" in $$props2)
      $$invalidate(15, column_widths = $$props2.column_widths);
    if ("gradio" in $$props2)
      $$invalidate(16, gradio = $$props2.gradio);
    if ("latex_delimiters" in $$props2)
      $$invalidate(17, latex_delimiters = $$props2.latex_delimiters);
    if ("max_height" in $$props2)
      $$invalidate(18, max_height = $$props2.max_height);
    if ("loading_status" in $$props2)
      $$invalidate(19, loading_status = $$props2.loading_status);
    if ("interactive" in $$props2)
      $$invalidate(20, interactive = $$props2.interactive);
    if ("show_fullscreen_button" in $$props2)
      $$invalidate(21, show_fullscreen_button = $$props2.show_fullscreen_button);
    if ("max_chars" in $$props2)
      $$invalidate(22, max_chars = $$props2.max_chars);
    if ("show_copy_button" in $$props2)
      $$invalidate(23, show_copy_button = $$props2.show_copy_button);
    if ("show_row_numbers" in $$props2)
      $$invalidate(24, show_row_numbers = $$props2.show_row_numbers);
    if ("show_search" in $$props2)
      $$invalidate(25, show_search = $$props2.show_search);
    if ("pinned_columns" in $$props2)
      $$invalidate(26, pinned_columns = $$props2.pinned_columns);
    if ("static_columns" in $$props2)
      $$invalidate(27, static_columns = $$props2.static_columns);
  };
  $$self.$$.update = () => {
    var _a, _b, _c, _d;
    if ($$self.$$.dirty[0] & /*value*/
    1 | $$self.$$.dirty[1] & /*headers*/
    1) {
      $$invalidate(30, _headers = [...value.headers || headers]);
    }
    if ($$self.$$.dirty[0] & /*value*/
    1) {
      $$invalidate(29, display_value = ((_a = value == null ? void 0 : value.metadata) == null ? void 0 : _a.display_value) ? [...(_b = value == null ? void 0 : value.metadata) == null ? void 0 : _b.display_value] : null);
    }
    if ($$self.$$.dirty[0] & /*interactive, value*/
    1048577) {
      $$invalidate(28, styling = !interactive && ((_c = value == null ? void 0 : value.metadata) == null ? void 0 : _c.styling) ? [...(_d = value == null ? void 0 : value.metadata) == null ? void 0 : _d.styling] : null);
    }
  };
  return [
    value,
    value_is_output,
    elem_id,
    elem_classes,
    visible,
    col_count,
    row_count,
    label,
    show_label,
    wrap,
    datatype,
    scale,
    min_width,
    root,
    line_breaks,
    column_widths,
    gradio,
    latex_delimiters,
    max_height,
    loading_status,
    interactive,
    show_fullscreen_button,
    max_chars,
    show_copy_button,
    show_row_numbers,
    show_search,
    pinned_columns,
    static_columns,
    styling,
    display_value,
    _headers,
    headers,
    clear_status_handler,
    func2,
    func_1,
    table_value_is_output_binding,
    change_handler,
    input_handler,
    select_handler
  ];
}
class Index extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance,
      create_fragment,
      safe_not_equal,
      {
        headers: 31,
        elem_id: 2,
        elem_classes: 3,
        visible: 4,
        value: 0,
        value_is_output: 1,
        col_count: 5,
        row_count: 6,
        label: 7,
        show_label: 8,
        wrap: 9,
        datatype: 10,
        scale: 11,
        min_width: 12,
        root: 13,
        line_breaks: 14,
        column_widths: 15,
        gradio: 16,
        latex_delimiters: 17,
        max_height: 18,
        loading_status: 19,
        interactive: 20,
        show_fullscreen_button: 21,
        max_chars: 22,
        show_copy_button: 23,
        show_row_numbers: 24,
        show_search: 25,
        pinned_columns: 26,
        static_columns: 27
      },
      null,
      [-1, -1]
    );
  }
  get headers() {
    return this.$$.ctx[31];
  }
  set headers(headers) {
    this.$$set({ headers });
    flush();
  }
  get elem_id() {
    return this.$$.ctx[2];
  }
  set elem_id(elem_id) {
    this.$$set({ elem_id });
    flush();
  }
  get elem_classes() {
    return this.$$.ctx[3];
  }
  set elem_classes(elem_classes) {
    this.$$set({ elem_classes });
    flush();
  }
  get visible() {
    return this.$$.ctx[4];
  }
  set visible(visible) {
    this.$$set({ visible });
    flush();
  }
  get value() {
    return this.$$.ctx[0];
  }
  set value(value) {
    this.$$set({ value });
    flush();
  }
  get value_is_output() {
    return this.$$.ctx[1];
  }
  set value_is_output(value_is_output) {
    this.$$set({ value_is_output });
    flush();
  }
  get col_count() {
    return this.$$.ctx[5];
  }
  set col_count(col_count) {
    this.$$set({ col_count });
    flush();
  }
  get row_count() {
    return this.$$.ctx[6];
  }
  set row_count(row_count) {
    this.$$set({ row_count });
    flush();
  }
  get label() {
    return this.$$.ctx[7];
  }
  set label(label) {
    this.$$set({ label });
    flush();
  }
  get show_label() {
    return this.$$.ctx[8];
  }
  set show_label(show_label) {
    this.$$set({ show_label });
    flush();
  }
  get wrap() {
    return this.$$.ctx[9];
  }
  set wrap(wrap) {
    this.$$set({ wrap });
    flush();
  }
  get datatype() {
    return this.$$.ctx[10];
  }
  set datatype(datatype) {
    this.$$set({ datatype });
    flush();
  }
  get scale() {
    return this.$$.ctx[11];
  }
  set scale(scale) {
    this.$$set({ scale });
    flush();
  }
  get min_width() {
    return this.$$.ctx[12];
  }
  set min_width(min_width) {
    this.$$set({ min_width });
    flush();
  }
  get root() {
    return this.$$.ctx[13];
  }
  set root(root) {
    this.$$set({ root });
    flush();
  }
  get line_breaks() {
    return this.$$.ctx[14];
  }
  set line_breaks(line_breaks) {
    this.$$set({ line_breaks });
    flush();
  }
  get column_widths() {
    return this.$$.ctx[15];
  }
  set column_widths(column_widths) {
    this.$$set({ column_widths });
    flush();
  }
  get gradio() {
    return this.$$.ctx[16];
  }
  set gradio(gradio) {
    this.$$set({ gradio });
    flush();
  }
  get latex_delimiters() {
    return this.$$.ctx[17];
  }
  set latex_delimiters(latex_delimiters) {
    this.$$set({ latex_delimiters });
    flush();
  }
  get max_height() {
    return this.$$.ctx[18];
  }
  set max_height(max_height) {
    this.$$set({ max_height });
    flush();
  }
  get loading_status() {
    return this.$$.ctx[19];
  }
  set loading_status(loading_status) {
    this.$$set({ loading_status });
    flush();
  }
  get interactive() {
    return this.$$.ctx[20];
  }
  set interactive(interactive) {
    this.$$set({ interactive });
    flush();
  }
  get show_fullscreen_button() {
    return this.$$.ctx[21];
  }
  set show_fullscreen_button(show_fullscreen_button) {
    this.$$set({ show_fullscreen_button });
    flush();
  }
  get max_chars() {
    return this.$$.ctx[22];
  }
  set max_chars(max_chars) {
    this.$$set({ max_chars });
    flush();
  }
  get show_copy_button() {
    return this.$$.ctx[23];
  }
  set show_copy_button(show_copy_button) {
    this.$$set({ show_copy_button });
    flush();
  }
  get show_row_numbers() {
    return this.$$.ctx[24];
  }
  set show_row_numbers(show_row_numbers) {
    this.$$set({ show_row_numbers });
    flush();
  }
  get show_search() {
    return this.$$.ctx[25];
  }
  set show_search(show_search) {
    this.$$set({ show_search });
    flush();
  }
  get pinned_columns() {
    return this.$$.ctx[26];
  }
  set pinned_columns(pinned_columns) {
    this.$$set({ pinned_columns });
    flush();
  }
  get static_columns() {
    return this.$$.ctx[27];
  }
  set static_columns(static_columns) {
    this.$$set({ static_columns });
    flush();
  }
}
export {
  Table$1 as BaseDataFrame,
  default2 as BaseExample,
  Index as default
};
