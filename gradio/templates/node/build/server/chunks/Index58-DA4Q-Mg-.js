import { c as create_ssr_component, v as validate_component, s as subscribe, a as createEventDispatcher, e as escape, b as add_attribute, f as each, h as setContext, m as missing_component, o as onDestroy, n as null_to_empty, i as get_store_value } from './ssr-FJHii0oS.js';
import { t as tick } from './Component--bfMfOuT.js';
import { B as Block, S as Static, x as MarkdownCode, G as Check, z as Copy, W as Minimize, X as Maximize } from './2-DWTiTXXU.js';
import { w as writable } from './index-BJuG1GWC.js';
import { d as dequal } from './index6-sfNUnwRZ.js';
import { U as Upload } from './ModifyUpload-CYAgCTxV.js';
import Index$1 from './Index23-BWjcolRc.js';
export { default as BaseExample } from './Example8-DGFYm5Tl.js';
import 'tty';
import 'path';
import 'url';
import 'fs';
import './ImagePreview-CBdMdcjE.js';
import './Example11-DhDefTD3.js';

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
function should_show_cell_menu(cell, selected_cells, editable) {
  const [row, col] = cell;
  return editable && selected_cells.length === 1 && selected_cells[0][0] === row && selected_cells[0][1] === col;
}
function get_next_cell_coordinates(current, data, shift_key) {
  const [row, col] = current;
  const direction = shift_key ? -1 : 1;
  if (data[row]?.[col + direction]) {
    return [row, col + direction];
  }
  const next_row = row + (direction > 0 ? 1 : 0);
  const prev_row = row + (direction < 0 ? -1 : 0);
  if (direction > 0 && data[next_row]?.[0]) {
    return [next_row, 0];
  }
  if (direction < 0 && data[prev_row]?.[data[0].length - 1]) {
    return [prev_row, data[0].length - 1];
  }
  return false;
}
function move_cursor(event, current_coords, data) {
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
  const is_data = data[i]?.[j];
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
function calculate_selection_positions(selected, data, els, parent, table) {
  const [row, col] = selected;
  if (!data[row]?.[col]) {
    return { col_pos: "0px", row_pos: void 0 };
  }
  const cell_id = data[row][col].id;
  const cell_el = els[cell_id]?.cell;
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
      const new_button = current_button?.type === "cell" && current_button.row === row && current_button.col === col ? null : { type: "cell", row, col };
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
  const cells_to_copy = data.flatMap((row, r) => row.map((_, c) => [r, c]));
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
  const text = rows.map((r) => cols.map((c) => csv[r][c] || "").join(",")).join("\n");
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    throw new Error("Failed to copy to clipboard: " + err.message);
  }
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
    if (!data || data.length === 0) {
      return {
        data: [[{ value: "", id: make_id2() }]],
        headers: ["Header 1"]
      };
    }
    const new_headers = [...headers];
    const new_data = data.map((row) => [...row]);
    if (typeof index === "number" && index >= 0 && index <= (data[0]?.length || 0)) {
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
      const current_state = get_store_value(state);
      const sort_item = current_state.sort_state.sort_columns.find(
        (item) => headers[item.col] === name
      );
      if (!sort_item)
        return "none";
      return sort_item.direction;
    },
    sort_data: (data, display_value, styling) => {
      const current_state = get_store_value(state);
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
      const current_state = get_store_value(state);
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
      const current_state = get_store_value(state);
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
      const current_state = get_store_value(state);
      return current_state.ui_state.selected_cells;
    },
    get_active_cell_menu: () => {
      const current_state = get_store_value(state);
      return current_state.ui_state.active_cell_menu;
    },
    get_active_button: () => {
      const current_state = get_store_value(state);
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
const css$b = {
  code: ".selection-button.svelte-1mp8yw1{position:absolute;background:var(--color-accent);width:var(--size-3);height:var(--size-5);color:var(--background-fill-primary)}.selection-button-column.svelte-1mp8yw1{top:-15px;left:50%;transform:translateX(-50%) rotate(90deg);border-radius:var(--radius-sm) 0 0 var(--radius-sm)}.selection-button-row.svelte-1mp8yw1{left:calc(var(--size-2-5) * -1);border-radius:var(--radius-sm) 0 0 var(--radius-sm)}.move-down.svelte-1mp8yw1{bottom:-14px;top:auto;border-radius:0 var(--radius-sm) var(--radius-sm) 0}.move-right.svelte-1mp8yw1{left:auto;right:calc(var(--size-2-5) * -1);border-radius:0 var(--radius-sm) var(--radius-sm) 0}svg.svelte-1mp8yw1{fill:currentColor}span.svelte-1mp8yw1{display:flex;width:100%;height:100%}.up.svelte-1mp8yw1{transform:rotate(-90deg)}.down.svelte-1mp8yw1{transform:rotate(90deg)}.left.svelte-1mp8yw1{transform:rotate(-90deg)}.right.svelte-1mp8yw1{transform:rotate(90deg)}",
  map: '{"version":3,"file":"SelectionButtons.svelte","sources":["SelectionButtons.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let position;\\nexport let coords;\\nexport let on_click = null;\\n$: is_first_position = position === \\"column\\" ? coords[0] === 0 : coords[1] === 0;\\n$: direction = position === \\"column\\" ? is_first_position ? \\"down\\" : \\"up\\" : is_first_position ? \\"right\\" : \\"left\\";\\n<\/script>\\n\\n<button\\n\\tclass=\\"selection-button selection-button-{position} {is_first_position\\n\\t\\t? `move-${direction}`\\n\\t\\t: \'\'}\\"\\n\\ton:click|stopPropagation={() => on_click && on_click()}\\n\\taria-label={`Select ${position}`}\\n>\\n\\t<span class={direction}>\\n\\t\\t<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\">\\n\\t\\t\\t<path\\n\\t\\t\\t\\td=\\"m16.707 13.293-4-4a1 1 0 0 0-1.414 0l-4 4A1 1 0 0 0 8 15h8a1 1 0 0 0 .707-1.707z\\"\\n\\t\\t\\t\\tdata-name={direction}\\n\\t\\t\\t/>\\n\\t\\t</svg>\\n\\t</span>\\n</button>\\n\\n<style>\\n\\t.selection-button {\\n\\t\\tposition: absolute;\\n\\t\\tbackground: var(--color-accent);\\n\\t\\twidth: var(--size-3);\\n\\t\\theight: var(--size-5);\\n\\t\\tcolor: var(--background-fill-primary);\\n\\t}\\n\\n\\t.selection-button-column {\\n\\t\\ttop: -15px;\\n\\t\\tleft: 50%;\\n\\t\\ttransform: translateX(-50%) rotate(90deg);\\n\\t\\tborder-radius: var(--radius-sm) 0 0 var(--radius-sm);\\n\\t}\\n\\n\\t.selection-button-row {\\n\\t\\tleft: calc(var(--size-2-5) * -1);\\n\\t\\tborder-radius: var(--radius-sm) 0 0 var(--radius-sm);\\n\\t}\\n\\n\\t.move-down {\\n\\t\\tbottom: -14px;\\n\\t\\ttop: auto;\\n\\t\\tborder-radius: 0 var(--radius-sm) var(--radius-sm) 0;\\n\\t}\\n\\n\\t.move-right {\\n\\t\\tleft: auto;\\n\\t\\tright: calc(var(--size-2-5) * -1);\\n\\t\\tborder-radius: 0 var(--radius-sm) var(--radius-sm) 0;\\n\\t}\\n\\n\\tsvg {\\n\\t\\tfill: currentColor;\\n\\t}\\n\\n\\tspan {\\n\\t\\tdisplay: flex;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t}\\n\\n\\t.up {\\n\\t\\ttransform: rotate(-90deg);\\n\\t}\\n\\n\\t.down {\\n\\t\\ttransform: rotate(90deg);\\n\\t}\\n\\n\\t.left {\\n\\t\\ttransform: rotate(-90deg);\\n\\t}\\n\\n\\t.right {\\n\\t\\ttransform: rotate(90deg);\\n\\t}</style>\\n"],"names":[],"mappings":"AAyBC,gCAAkB,CACjB,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,IAAI,cAAc,CAAC,CAC/B,KAAK,CAAE,IAAI,QAAQ,CAAC,CACpB,MAAM,CAAE,IAAI,QAAQ,CAAC,CACrB,KAAK,CAAE,IAAI,yBAAyB,CACrC,CAEA,uCAAyB,CACxB,GAAG,CAAE,KAAK,CACV,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,WAAW,IAAI,CAAC,CAAC,OAAO,KAAK,CAAC,CACzC,aAAa,CAAE,IAAI,WAAW,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,WAAW,CACpD,CAEA,oCAAsB,CACrB,IAAI,CAAE,KAAK,IAAI,UAAU,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAChC,aAAa,CAAE,IAAI,WAAW,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,WAAW,CACpD,CAEA,yBAAW,CACV,MAAM,CAAE,KAAK,CACb,GAAG,CAAE,IAAI,CACT,aAAa,CAAE,CAAC,CAAC,IAAI,WAAW,CAAC,CAAC,IAAI,WAAW,CAAC,CAAC,CACpD,CAEA,0BAAY,CACX,IAAI,CAAE,IAAI,CACV,KAAK,CAAE,KAAK,IAAI,UAAU,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CACjC,aAAa,CAAE,CAAC,CAAC,IAAI,WAAW,CAAC,CAAC,IAAI,WAAW,CAAC,CAAC,CACpD,CAEA,kBAAI,CACH,IAAI,CAAE,YACP,CAEA,mBAAK,CACJ,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACT,CAEA,kBAAI,CACH,SAAS,CAAE,OAAO,MAAM,CACzB,CAEA,oBAAM,CACL,SAAS,CAAE,OAAO,KAAK,CACxB,CAEA,oBAAM,CACL,SAAS,CAAE,OAAO,MAAM,CACzB,CAEA,qBAAO,CACN,SAAS,CAAE,OAAO,KAAK,CACxB"}'
};
const SelectionButtons = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let is_first_position;
  let direction;
  let { position } = $$props;
  let { coords } = $$props;
  let { on_click = null } = $$props;
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.coords === void 0 && $$bindings.coords && coords !== void 0)
    $$bindings.coords(coords);
  if ($$props.on_click === void 0 && $$bindings.on_click && on_click !== void 0)
    $$bindings.on_click(on_click);
  $$result.css.add(css$b);
  is_first_position = position === "column" ? coords[0] === 0 : coords[1] === 0;
  direction = position === "column" ? is_first_position ? "down" : "up" : is_first_position ? "right" : "left";
  return `<button class="${"selection-button selection-button-" + escape(position, true) + " " + escape(is_first_position ? `move-${direction}` : "", true) + " svelte-1mp8yw1"}"${add_attribute("aria-label", `Select ${position}`, 0)}><span class="${escape(null_to_empty(direction), true) + " svelte-1mp8yw1"}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svelte-1mp8yw1"><path d="m16.707 13.293-4-4a1 1 0 0 0-1.414 0l-4 4A1 1 0 0 0 8 15h8a1 1 0 0 0 .707-1.707z"${add_attribute("data-name", direction, 0)}></path></svg></span> </button>`;
});
const css$a = {
  code: ".dragging.svelte-17c88wb{cursor:crosshair !important}input.svelte-17c88wb{position:absolute;flex:1 1 0%;transform:translateX(-0.1px);outline:none;border:none;background:transparent;cursor:text;width:calc(100% - var(--size-2))}span.svelte-17c88wb{flex:1 1 0%;position:relative;display:inline-block;outline:none;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;cursor:text;width:100%;height:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}span.text.svelte-17c88wb:not(.expanded){overflow:hidden;text-overflow:ellipsis;white-space:nowrap}span.text.expanded.svelte-17c88wb{height:auto;min-height:100%;white-space:pre-wrap;word-break:break-word;overflow:visible}.multiline.svelte-17c88wb{white-space:pre;overflow:hidden;text-overflow:ellipsis}.header.svelte-17c88wb{transform:translateX(0);font-weight:var(--weight-bold);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-left:var(--size-1)}.edit.svelte-17c88wb{opacity:0;pointer-events:none}span.svelte-17c88wb img{max-height:100px;width:auto;object-fit:contain}input.svelte-17c88wb:read-only{cursor:not-allowed}",
  map: '{"version":3,"file":"EditableCell.svelte","sources":["EditableCell.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { createEventDispatcher } from \\"svelte\\";\\nimport { MarkdownCode } from \\"@gradio/markdown-code\\";\\nimport SelectionButtons from \\"./icons/SelectionButtons.svelte\\";\\nexport let edit;\\nexport let value = \\"\\";\\nexport let display_value = null;\\nexport let styling = \\"\\";\\nexport let header = false;\\nexport let datatype = \\"str\\";\\nexport let latex_delimiters;\\nexport let clear_on_focus = false;\\nexport let line_breaks = true;\\nexport let editable = true;\\nexport let is_static = false;\\nexport let root;\\nexport let max_chars = null;\\nexport let components = {};\\nexport let i18n;\\nexport let is_dragging = false;\\nexport let show_selection_buttons = false;\\nexport let coords = null;\\nexport let on_select_column = null;\\nexport let on_select_row = null;\\nconst dispatch = createEventDispatcher();\\nlet is_expanded = false;\\nexport let el;\\n$: _value = value;\\nfunction truncate_text(text, max_length = null, is_image = false) {\\n    if (is_image)\\n        return String(text);\\n    const str = String(text);\\n    if (!max_length || max_length <= 0)\\n        return str;\\n    if (str.length <= max_length)\\n        return str;\\n    return str.slice(0, max_length) + \\"...\\";\\n}\\n$: should_truncate = !edit && !is_expanded && max_chars !== null && max_chars > 0;\\n$: display_content = editable ? value : display_value !== null ? display_value : value;\\n$: display_text = should_truncate ? truncate_text(display_content, max_chars, datatype === \\"image\\") : display_content;\\nfunction use_focus(node) {\\n    if (clear_on_focus) {\\n        _value = \\"\\";\\n    }\\n    requestAnimationFrame(() => {\\n        node.focus();\\n    });\\n    return {};\\n}\\nfunction handle_blur({ currentTarget }) {\\n    value = currentTarget.value;\\n    dispatch(\\"blur\\");\\n}\\nfunction handle_keydown(event) {\\n    if (event.key === \\"Enter\\") {\\n        if (edit) {\\n            value = _value;\\n            dispatch(\\"blur\\");\\n        }\\n        else if (!header) {\\n            is_expanded = !is_expanded;\\n        }\\n    }\\n    dispatch(\\"keydown\\", event);\\n}\\nfunction handle_click() {\\n    if (!edit && !header) {\\n        is_expanded = !is_expanded;\\n    }\\n}\\n<\/script>\\n\\n{#if edit}\\n\\t<input\\n\\t\\treadonly={is_static}\\n\\t\\taria-readonly={is_static}\\n\\t\\trole=\\"textbox\\"\\n\\t\\taria-label={is_static ? \\"Cell is read-only\\" : \\"Edit cell\\"}\\n\\t\\tbind:this={el}\\n\\t\\tbind:value={_value}\\n\\t\\tclass:header\\n\\t\\ttabindex=\\"-1\\"\\n\\t\\ton:blur={handle_blur}\\n\\t\\ton:mousedown|stopPropagation\\n\\t\\ton:mouseup|stopPropagation\\n\\t\\ton:click|stopPropagation\\n\\t\\tuse:use_focus\\n\\t\\ton:keydown={handle_keydown}\\n\\t/>\\n{/if}\\n\\n<span\\n\\tclass:dragging={is_dragging}\\n\\ton:click={handle_click}\\n\\ton:keydown={handle_keydown}\\n\\ttabindex=\\"0\\"\\n\\trole=\\"button\\"\\n\\tclass:edit\\n\\tclass:expanded={is_expanded}\\n\\tclass:multiline={header}\\n\\ton:focus|preventDefault\\n\\tstyle={styling}\\n\\tdata-editable={editable}\\n\\tdata-max-chars={max_chars}\\n\\tdata-expanded={is_expanded}\\n\\tplaceholder=\\" \\"\\n\\tclass:text={datatype === \\"str\\"}\\n>\\n\\t{#if datatype === \\"image\\" && components.image}\\n\\t\\t<svelte:component\\n\\t\\t\\tthis={components.image}\\n\\t\\t\\tvalue={{ url: display_text }}\\n\\t\\t\\tshow_label={false}\\n\\t\\t\\tlabel=\\"cell-image\\"\\n\\t\\t\\tshow_download_button={false}\\n\\t\\t\\t{i18n}\\n\\t\\t\\tgradio={{ dispatch: () => {} }}\\n\\t\\t/>\\n\\t{:else if datatype === \\"html\\"}\\n\\t\\t{@html display_text}\\n\\t{:else if datatype === \\"markdown\\"}\\n\\t\\t<MarkdownCode\\n\\t\\t\\tmessage={display_text.toLocaleString()}\\n\\t\\t\\t{latex_delimiters}\\n\\t\\t\\t{line_breaks}\\n\\t\\t\\tchatbot={false}\\n\\t\\t\\t{root}\\n\\t\\t/>\\n\\t{:else}\\n\\t\\t{display_text}\\n\\t{/if}\\n</span>\\n{#if show_selection_buttons && coords && on_select_column && on_select_row}\\n\\t<SelectionButtons\\n\\t\\tposition=\\"column\\"\\n\\t\\t{coords}\\n\\t\\ton_click={() => on_select_column(coords[1])}\\n\\t/>\\n\\t<SelectionButtons\\n\\t\\tposition=\\"row\\"\\n\\t\\t{coords}\\n\\t\\ton_click={() => on_select_row(coords[0])}\\n\\t/>\\n{/if}\\n\\n<style>\\n\\t.dragging {\\n\\t\\tcursor: crosshair !important;\\n\\t}\\n\\n\\tinput {\\n\\t\\tposition: absolute;\\n\\t\\tflex: 1 1 0%;\\n\\t\\ttransform: translateX(-0.1px);\\n\\t\\toutline: none;\\n\\t\\tborder: none;\\n\\t\\tbackground: transparent;\\n\\t\\tcursor: text;\\n\\t\\twidth: calc(100% - var(--size-2));\\n\\t}\\n\\n\\tspan {\\n\\t\\tflex: 1 1 0%;\\n\\t\\tposition: relative;\\n\\t\\tdisplay: inline-block;\\n\\t\\toutline: none;\\n\\t\\t-webkit-user-select: text;\\n\\t\\t-moz-user-select: text;\\n\\t\\t-ms-user-select: text;\\n\\t\\tuser-select: text;\\n\\t\\tcursor: text;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t\\toverflow: hidden;\\n\\t\\ttext-overflow: ellipsis;\\n\\t\\twhite-space: nowrap;\\n\\t}\\n\\n\\tspan.text:not(.expanded) {\\n\\t\\toverflow: hidden;\\n\\t\\ttext-overflow: ellipsis;\\n\\t\\twhite-space: nowrap;\\n\\t}\\n\\n\\tspan.text.expanded {\\n\\t\\theight: auto;\\n\\t\\tmin-height: 100%;\\n\\t\\twhite-space: pre-wrap;\\n\\t\\tword-break: break-word;\\n\\t\\toverflow: visible;\\n\\t}\\n\\n\\t.multiline {\\n\\t\\twhite-space: pre;\\n\\t\\toverflow: hidden;\\n\\t\\ttext-overflow: ellipsis;\\n\\t}\\n\\n\\t.header {\\n\\t\\ttransform: translateX(0);\\n\\t\\tfont-weight: var(--weight-bold);\\n\\t\\twhite-space: nowrap;\\n\\t\\toverflow: hidden;\\n\\t\\ttext-overflow: ellipsis;\\n\\t\\tmargin-left: var(--size-1);\\n\\t}\\n\\n\\t.edit {\\n\\t\\topacity: 0;\\n\\t\\tpointer-events: none;\\n\\t}\\n\\n\\tspan :global(img) {\\n\\t\\tmax-height: 100px;\\n\\t\\twidth: auto;\\n\\t\\tobject-fit: contain;\\n\\t}\\n\\n\\tinput:read-only {\\n\\t\\tcursor: not-allowed;\\n\\t}</style>\\n"],"names":[],"mappings":"AAkJC,wBAAU,CACT,MAAM,CAAE,SAAS,CAAC,UACnB,CAEA,oBAAM,CACL,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,EAAE,CACZ,SAAS,CAAE,WAAW,MAAM,CAAC,CAC7B,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,WAAW,CACvB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,QAAQ,CAAC,CACjC,CAEA,mBAAK,CACJ,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,EAAE,CACZ,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,YAAY,CACrB,OAAO,CAAE,IAAI,CACb,mBAAmB,CAAE,IAAI,CACzB,gBAAgB,CAAE,IAAI,CACtB,eAAe,CAAE,IAAI,CACrB,WAAW,CAAE,IAAI,CACjB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,MAAM,CAChB,aAAa,CAAE,QAAQ,CACvB,WAAW,CAAE,MACd,CAEA,IAAI,oBAAK,KAAK,SAAS,CAAE,CACxB,QAAQ,CAAE,MAAM,CAChB,aAAa,CAAE,QAAQ,CACvB,WAAW,CAAE,MACd,CAEA,IAAI,KAAK,wBAAU,CAClB,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,CAChB,WAAW,CAAE,QAAQ,CACrB,UAAU,CAAE,UAAU,CACtB,QAAQ,CAAE,OACX,CAEA,yBAAW,CACV,WAAW,CAAE,GAAG,CAChB,QAAQ,CAAE,MAAM,CAChB,aAAa,CAAE,QAChB,CAEA,sBAAQ,CACP,SAAS,CAAE,WAAW,CAAC,CAAC,CACxB,WAAW,CAAE,IAAI,aAAa,CAAC,CAC/B,WAAW,CAAE,MAAM,CACnB,QAAQ,CAAE,MAAM,CAChB,aAAa,CAAE,QAAQ,CACvB,WAAW,CAAE,IAAI,QAAQ,CAC1B,CAEA,oBAAM,CACL,OAAO,CAAE,CAAC,CACV,cAAc,CAAE,IACjB,CAEA,mBAAI,CAAS,GAAK,CACjB,UAAU,CAAE,KAAK,CACjB,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,OACb,CAEA,oBAAK,UAAW,CACf,MAAM,CAAE,WACT"}'
};
function truncate_text(text, max_length = null, is_image = false) {
  if (is_image)
    return String(text);
  const str = String(text);
  if (!max_length || max_length <= 0)
    return str;
  if (str.length <= max_length)
    return str;
  return str.slice(0, max_length) + "...";
}
const EditableCell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  createEventDispatcher();
  let is_expanded = false;
  let { el } = $$props;
  if ($$props.edit === void 0 && $$bindings.edit && edit !== void 0)
    $$bindings.edit(edit);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.display_value === void 0 && $$bindings.display_value && display_value !== void 0)
    $$bindings.display_value(display_value);
  if ($$props.styling === void 0 && $$bindings.styling && styling !== void 0)
    $$bindings.styling(styling);
  if ($$props.header === void 0 && $$bindings.header && header !== void 0)
    $$bindings.header(header);
  if ($$props.datatype === void 0 && $$bindings.datatype && datatype !== void 0)
    $$bindings.datatype(datatype);
  if ($$props.latex_delimiters === void 0 && $$bindings.latex_delimiters && latex_delimiters !== void 0)
    $$bindings.latex_delimiters(latex_delimiters);
  if ($$props.clear_on_focus === void 0 && $$bindings.clear_on_focus && clear_on_focus !== void 0)
    $$bindings.clear_on_focus(clear_on_focus);
  if ($$props.line_breaks === void 0 && $$bindings.line_breaks && line_breaks !== void 0)
    $$bindings.line_breaks(line_breaks);
  if ($$props.editable === void 0 && $$bindings.editable && editable !== void 0)
    $$bindings.editable(editable);
  if ($$props.is_static === void 0 && $$bindings.is_static && is_static !== void 0)
    $$bindings.is_static(is_static);
  if ($$props.root === void 0 && $$bindings.root && root !== void 0)
    $$bindings.root(root);
  if ($$props.max_chars === void 0 && $$bindings.max_chars && max_chars !== void 0)
    $$bindings.max_chars(max_chars);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.i18n === void 0 && $$bindings.i18n && i18n !== void 0)
    $$bindings.i18n(i18n);
  if ($$props.is_dragging === void 0 && $$bindings.is_dragging && is_dragging !== void 0)
    $$bindings.is_dragging(is_dragging);
  if ($$props.show_selection_buttons === void 0 && $$bindings.show_selection_buttons && show_selection_buttons !== void 0)
    $$bindings.show_selection_buttons(show_selection_buttons);
  if ($$props.coords === void 0 && $$bindings.coords && coords !== void 0)
    $$bindings.coords(coords);
  if ($$props.on_select_column === void 0 && $$bindings.on_select_column && on_select_column !== void 0)
    $$bindings.on_select_column(on_select_column);
  if ($$props.on_select_row === void 0 && $$bindings.on_select_row && on_select_row !== void 0)
    $$bindings.on_select_row(on_select_row);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  $$result.css.add(css$a);
  _value = value;
  should_truncate = !edit && !is_expanded && max_chars !== null && max_chars > 0;
  display_content = editable ? value : display_value !== null ? display_value : value;
  display_text = should_truncate ? truncate_text(display_content, max_chars, datatype === "image") : display_content;
  return `${edit ? `<input ${is_static ? "readonly" : ""}${add_attribute("aria-readonly", is_static, 0)} role="textbox"${add_attribute("aria-label", is_static ? "Cell is read-only" : "Edit cell", 0)} tabindex="-1" class="${["svelte-17c88wb", header ? "header" : ""].join(" ").trim()}"${add_attribute("this", el, 0)}${add_attribute("value", _value, 0)}>` : ``} <span tabindex="0" role="button"${add_attribute("style", styling, 0)}${add_attribute("data-editable", editable, 0)}${add_attribute("data-max-chars", max_chars, 0)}${add_attribute("data-expanded", is_expanded, 0)} placeholder=" " class="${[
    "svelte-17c88wb",
    (is_dragging ? "dragging" : "") + " " + (edit ? "edit" : "") + "  " + (header ? "multiline" : "") + " " + (datatype === "str" ? "text" : "")
  ].join(" ").trim()}">${datatype === "image" && components.image ? `${validate_component(components.image || missing_component, "svelte:component").$$render(
    $$result,
    {
      value: { url: display_text },
      show_label: false,
      label: "cell-image",
      show_download_button: false,
      i18n,
      gradio: {
        dispatch: () => {
        }
      }
    },
    {},
    {}
  )}` : `${datatype === "html" ? `<!-- HTML_TAG_START -->${display_text}<!-- HTML_TAG_END -->` : `${datatype === "markdown" ? `${validate_component(MarkdownCode, "MarkdownCode").$$render(
    $$result,
    {
      message: display_text.toLocaleString(),
      latex_delimiters,
      line_breaks,
      chatbot: false,
      root
    },
    {},
    {}
  )}` : `${escape(display_text)}`}`}`}</span> ${show_selection_buttons && coords && on_select_column && on_select_row ? `${validate_component(SelectionButtons, "SelectionButtons").$$render(
    $$result,
    {
      position: "column",
      coords,
      on_click: () => on_select_column(coords[1])
    },
    {},
    {}
  )} ${validate_component(SelectionButtons, "SelectionButtons").$$render(
    $$result,
    {
      position: "row",
      coords,
      on_click: () => on_select_row(coords[0])
    },
    {},
    {}
  )}` : ``}`;
});
const css$9 = {
  code: ".row-number.svelte-l87gn2{text-align:center;padding:var(--size-1);min-width:var(--size-12);width:var(--size-12);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:var(--weight-semibold);background:var(--table-even-background-fill);border-right:1px solid var(--border-color-primary)}tr:nth-child(odd) .row-number.svelte-l87gn2{background:var(--table-odd-background-fill)}tr:nth-child(even) .row-number.svelte-l87gn2{background:var(--table-even-background-fill)}",
  map: '{"version":3,"file":"RowNumber.svelte","sources":["RowNumber.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let index = null;\\nexport let is_header = false;\\n<\/script>\\n\\n{#if is_header}\\n\\t<th tabindex=\\"-1\\" class=\\"row-number\\">\\n\\t\\t<div class=\\"cell-wrap\\">\\n\\t\\t\\t<div class=\\"header-content\\">\\n\\t\\t\\t\\t<div class=\\"header-text\\"></div>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t</th>\\n{:else}\\n\\t<td class=\\"row-number\\" tabindex=\\"-1\\" data-row={index} data-col=\\"row-number\\">\\n\\t\\t{index !== null ? index + 1 : \\"\\"}\\n\\t</td>\\n{/if}\\n\\n<style>\\n\\t.row-number {\\n\\t\\ttext-align: center;\\n\\t\\tpadding: var(--size-1);\\n\\t\\tmin-width: var(--size-12);\\n\\t\\twidth: var(--size-12);\\n\\t\\toverflow: hidden;\\n\\t\\ttext-overflow: ellipsis;\\n\\t\\twhite-space: nowrap;\\n\\t\\tfont-weight: var(--weight-semibold);\\n\\t\\tbackground: var(--table-even-background-fill);\\n\\t\\tborder-right: 1px solid var(--border-color-primary);\\n\\t}\\n\\n\\t:global(tr:nth-child(odd)) .row-number {\\n\\t\\tbackground: var(--table-odd-background-fill);\\n\\t}\\n\\n\\t:global(tr:nth-child(even)) .row-number {\\n\\t\\tbackground: var(--table-even-background-fill);\\n\\t}</style>\\n"],"names":[],"mappings":"AAmBC,yBAAY,CACX,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,IAAI,QAAQ,CAAC,CACtB,SAAS,CAAE,IAAI,SAAS,CAAC,CACzB,KAAK,CAAE,IAAI,SAAS,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,aAAa,CAAE,QAAQ,CACvB,WAAW,CAAE,MAAM,CACnB,WAAW,CAAE,IAAI,iBAAiB,CAAC,CACnC,UAAU,CAAE,IAAI,4BAA4B,CAAC,CAC7C,YAAY,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,sBAAsB,CACnD,CAEQ,iBAAkB,CAAC,yBAAY,CACtC,UAAU,CAAE,IAAI,2BAA2B,CAC5C,CAEQ,kBAAmB,CAAC,yBAAY,CACvC,UAAU,CAAE,IAAI,4BAA4B,CAC7C"}'
};
const RowNumber = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { index = null } = $$props;
  let { is_header = false } = $$props;
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  if ($$props.is_header === void 0 && $$bindings.is_header && is_header !== void 0)
    $$bindings.is_header(is_header);
  $$result.css.add(css$9);
  return `${is_header ? `<th tabindex="-1" class="row-number svelte-l87gn2" data-svelte-h="svelte-1aj56zf"><div class="cell-wrap"><div class="header-content"><div class="header-text"></div></div></div></th>` : `<td class="row-number svelte-l87gn2" tabindex="-1"${add_attribute("data-row", index, 0)} data-col="row-number">${escape(index !== null ? index + 1 : "")}</td>`}`;
});
const css$8 = {
  code: ".cell-menu-button.svelte-vt38nd{flex-shrink:0;display:none;align-items:center;justify-content:center;background-color:var(--block-background-fill);border:1px solid var(--border-color-primary);border-radius:var(--block-radius);width:var(--size-5);height:var(--size-5);min-width:var(--size-5);padding:0;margin-right:var(--spacing-sm);z-index:2;position:absolute;right:var(--size-1);top:50%;transform:translateY(-50%)}",
  map: '{"version":3,"file":"CellMenuButton.svelte","sources":["CellMenuButton.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let on_click;\\n<\/script>\\n\\n<button\\n\\taria-label=\\"Open cell menu\\"\\n\\tclass=\\"cell-menu-button\\"\\n\\taria-haspopup=\\"menu\\"\\n\\ton:click={on_click}\\n\\ton:touchstart={(event) => {\\n\\t\\tevent.preventDefault();\\n\\t\\tconst touch = event.touches[0];\\n\\t\\tconst mouseEvent = new MouseEvent(\\"click\\", {\\n\\t\\t\\tclientX: touch.clientX,\\n\\t\\t\\tclientY: touch.clientY,\\n\\t\\t\\tbubbles: true,\\n\\t\\t\\tcancelable: true,\\n\\t\\t\\tview: window\\n\\t\\t});\\n\\t\\ton_click(mouseEvent);\\n\\t}}\\n>\\n\\t&#8942;\\n</button>\\n\\n<style>\\n\\t.cell-menu-button {\\n\\t\\tflex-shrink: 0;\\n\\t\\tdisplay: none;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t\\tbackground-color: var(--block-background-fill);\\n\\t\\tborder: 1px solid var(--border-color-primary);\\n\\t\\tborder-radius: var(--block-radius);\\n\\t\\twidth: var(--size-5);\\n\\t\\theight: var(--size-5);\\n\\t\\tmin-width: var(--size-5);\\n\\t\\tpadding: 0;\\n\\t\\tmargin-right: var(--spacing-sm);\\n\\t\\tz-index: 2;\\n\\t\\tposition: absolute;\\n\\t\\tright: var(--size-1);\\n\\t\\ttop: 50%;\\n\\t\\ttransform: translateY(-50%);\\n\\t}</style>\\n"],"names":[],"mappings":"AAyBC,+BAAkB,CACjB,WAAW,CAAE,CAAC,CACd,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,gBAAgB,CAAE,IAAI,uBAAuB,CAAC,CAC9C,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,sBAAsB,CAAC,CAC7C,aAAa,CAAE,IAAI,cAAc,CAAC,CAClC,KAAK,CAAE,IAAI,QAAQ,CAAC,CACpB,MAAM,CAAE,IAAI,QAAQ,CAAC,CACrB,SAAS,CAAE,IAAI,QAAQ,CAAC,CACxB,OAAO,CAAE,CAAC,CACV,YAAY,CAAE,IAAI,YAAY,CAAC,CAC/B,OAAO,CAAE,CAAC,CACV,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,QAAQ,CAAC,CACpB,GAAG,CAAE,GAAG,CACR,SAAS,CAAE,WAAW,IAAI,CAC3B"}'
};
const CellMenuButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { on_click } = $$props;
  if ($$props.on_click === void 0 && $$bindings.on_click && on_click !== void 0)
    $$bindings.on_click(on_click);
  $$result.css.add(css$8);
  return `<button aria-label="Open cell menu" class="cell-menu-button svelte-vt38nd" aria-haspopup="menu" data-svelte-h="svelte-qulk5p">⋮
</button>`;
});
const css$7 = {
  code: ".wrapper.svelte-1skchaw{display:flex;align-items:center;justify-content:center}",
  map: '{"version":3,"file":"Padlock.svelte","sources":["Padlock.svelte"],"sourcesContent":["<div class=\\"wrapper\\" aria-label=\\"Static column\\">\\n\\t<svg\\n\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\twidth=\\"13\\"\\n\\t\\theight=\\"13\\"\\n\\t\\tviewBox=\\"0 0 24 24\\"\\n\\t\\tfill=\\"none\\"\\n\\t\\tstroke=\\"currentColor\\"\\n\\t\\tstroke-width=\\"2\\"\\n\\t\\tstroke-linecap=\\"round\\"\\n\\t\\tstroke-linejoin=\\"round\\"\\n\\t>\\n\\t\\t<rect x=\\"3\\" y=\\"11\\" width=\\"18\\" height=\\"11\\" rx=\\"2\\" ry=\\"2\\"></rect>\\n\\t\\t<path d=\\"M7 11V7a5 5 0 0 1 10 0v4\\"></path>\\n\\t</svg>\\n</div>\\n\\n<style>\\n\\t.wrapper {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t}</style>\\n"],"names":[],"mappings":"AAkBC,uBAAS,CACR,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAClB"}'
};
const Padlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$7);
  return `<div class="wrapper svelte-1skchaw" aria-label="Static column" data-svelte-h="svelte-1ernod4"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> </div>`;
});
const SortArrowUp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 16 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `<svg${add_attribute("width", size, 0)}${add_attribute("height", size, 0)} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 8L8 4L12 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 4V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>`;
});
const SortArrowDown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 16 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `<svg${add_attribute("width", size, 0)}${add_attribute("height", size, 0)} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 8L8 12L12 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 12V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>`;
});
const css$6 = {
  code: "th.svelte-sy2j2s{--ring-color:transparent;position:relative;outline:none;box-shadow:inset 0 0 0 1px var(--ring-color);padding:0;background:var(--table-even-background-fill);border-right-width:0px;border-left-width:1px;border-style:solid;border-color:var(--border-color-primary)}th.svelte-sy2j2s:first-child{border-top-left-radius:var(--table-radius);border-bottom-left-radius:var(--table-radius);border-left-width:0px}th.svelte-sy2j2s:last-child{border-top-right-radius:var(--table-radius);border-bottom-right-radius:var(--table-radius)}th.focus.svelte-sy2j2s{--ring-color:var(--color-accent);box-shadow:inset 0 0 0 2px var(--ring-color);z-index:4}th.focus.svelte-sy2j2s .cell-menu-button{display:flex}th.svelte-sy2j2s:hover .cell-menu-button{display:flex}.cell-wrap.svelte-sy2j2s{display:flex;align-items:center;justify-content:flex-start;outline:none;min-height:var(--size-9);position:relative;height:100%;padding:var(--size-2);box-sizing:border-box;margin:0;gap:var(--size-1);overflow:visible;min-width:0;border-radius:var(--table-radius)}.header-content.svelte-sy2j2s{display:flex;align-items:center;overflow:hidden;flex-grow:1;min-width:0;white-space:normal;overflow-wrap:break-word;word-break:normal;height:100%;gap:var(--size-1)}.header-button.svelte-sy2j2s{display:flex;text-align:left;width:100%;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;position:relative}.sort-indicators.svelte-sy2j2s{display:flex;align-items:center;margin-left:var(--size-1);gap:var(--size-1)}.sort-arrow.svelte-sy2j2s{display:flex;align-items:center;justify-content:center;color:var(--body-text-color)}.sort-priority.svelte-sy2j2s{display:flex;align-items:center;justify-content:center;font-size:var(--size-2);background-color:var(--button-secondary-background-fill);color:var(--body-text-color);border-radius:var(--radius-sm);width:var(--size-2-5);height:var(--size-2-5);padding:var(--size-1-5)}.pinned-column.svelte-sy2j2s{position:sticky;z-index:5;border-right:none}",
  map: '{"version":3,"file":"TableHeader.svelte","sources":["TableHeader.svelte"],"sourcesContent":["<script lang=\\"ts\\">import EditableCell from \\"./EditableCell.svelte\\";\\nimport CellMenuButton from \\"./CellMenuButton.svelte\\";\\nimport Padlock from \\"./icons/Padlock.svelte\\";\\nimport SortArrowUp from \\"./icons/SortArrowUp.svelte\\";\\nimport SortArrowDown from \\"./icons/SortArrowDown.svelte\\";\\nexport let value;\\nexport let i;\\nexport let actual_pinned_columns;\\nexport let header_edit;\\nexport let selected_header;\\nexport let get_sort_status;\\nexport let headers;\\nexport let get_cell_width;\\nexport let handle_header_click;\\nexport let toggle_header_menu;\\nexport let end_header_edit;\\nexport let sort_columns = [];\\nexport let latex_delimiters;\\nexport let line_breaks;\\nexport let max_chars;\\nexport let root;\\nexport let editable;\\nexport let i18n;\\nexport let el;\\nexport let is_static;\\nexport let col_count;\\n$: can_add_columns = col_count && col_count[1] === \\"dynamic\\";\\n$: sort_index = sort_columns.findIndex((item) => item.col === i);\\n$: sort_priority = sort_index !== -1 ? sort_index + 1 : null;\\n$: current_direction = sort_index !== -1 ? sort_columns[sort_index].direction : null;\\nfunction get_header_position(col_index) {\\n    if (col_index >= actual_pinned_columns) {\\n        return \\"auto\\";\\n    }\\n    if (col_index === 0) {\\n        return \\"0\\";\\n    }\\n    const previous_widths = Array(col_index).fill(0).map((_, idx) => {\\n        return get_cell_width(idx);\\n    }).join(\\" + \\");\\n    return `calc(${previous_widths})`;\\n}\\n<\/script>\\n\\n<th\\n\\tclass:pinned-column={i < actual_pinned_columns}\\n\\tclass:last-pinned={i === actual_pinned_columns - 1}\\n\\tclass:focus={header_edit === i || selected_header === i}\\n\\tclass:sorted={sort_index !== -1}\\n\\taria-sort={get_sort_status(value, headers) === \\"none\\"\\n\\t\\t? \\"none\\"\\n\\t\\t: get_sort_status(value, headers) === \\"asc\\"\\n\\t\\t\\t? \\"ascending\\"\\n\\t\\t\\t: \\"descending\\"}\\n\\tstyle=\\"width: {get_cell_width(i)}; left: {get_header_position(i)};\\"\\n\\ton:click={(event) => handle_header_click(event, i)}\\n\\ton:mousedown={(event) => {\\n\\t\\tevent.preventDefault();\\n\\t\\tevent.stopPropagation();\\n\\t}}\\n\\ttitle={value}\\n>\\n\\t<div class=\\"cell-wrap\\">\\n\\t\\t<div class=\\"header-content\\">\\n\\t\\t\\t<button\\n\\t\\t\\t\\tclass=\\"header-button\\"\\n\\t\\t\\t\\ton:click={(event) => handle_header_click(event, i)}\\n\\t\\t\\t\\ton:mousedown={(event) => {\\n\\t\\t\\t\\t\\tevent.preventDefault();\\n\\t\\t\\t\\t\\tevent.stopPropagation();\\n\\t\\t\\t\\t}}\\n\\t\\t\\t\\ttitle={value}\\n\\t\\t\\t>\\n\\t\\t\\t\\t<EditableCell\\n\\t\\t\\t\\t\\t{max_chars}\\n\\t\\t\\t\\t\\tbind:value\\n\\t\\t\\t\\t\\tbind:el\\n\\t\\t\\t\\t\\t{latex_delimiters}\\n\\t\\t\\t\\t\\t{line_breaks}\\n\\t\\t\\t\\t\\tedit={header_edit === i}\\n\\t\\t\\t\\t\\ton:keydown={(event) => {\\n\\t\\t\\t\\t\\t\\tif (\\n\\t\\t\\t\\t\\t\\t\\tevent.detail.key === \\"Enter\\" ||\\n\\t\\t\\t\\t\\t\\t\\tevent.detail.key === \\"Escape\\" ||\\n\\t\\t\\t\\t\\t\\t\\tevent.detail.key === \\"Tab\\"\\n\\t\\t\\t\\t\\t\\t) {\\n\\t\\t\\t\\t\\t\\t\\tend_header_edit(event);\\n\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\theader\\n\\t\\t\\t\\t\\t{root}\\n\\t\\t\\t\\t\\t{editable}\\n\\t\\t\\t\\t\\t{is_static}\\n\\t\\t\\t\\t\\t{i18n}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t\\t{#if sort_index !== -1}\\n\\t\\t\\t\\t\\t<div class=\\"sort-indicators\\">\\n\\t\\t\\t\\t\\t\\t<span class=\\"sort-arrow\\">\\n\\t\\t\\t\\t\\t\\t\\t{#if current_direction === \\"asc\\"}\\n\\t\\t\\t\\t\\t\\t\\t\\t<SortArrowUp size={12} />\\n\\t\\t\\t\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t\\t\\t\\t<SortArrowDown size={12} />\\n\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t</span>\\n\\t\\t\\t\\t\\t\\t{#if sort_columns.length > 1}\\n\\t\\t\\t\\t\\t\\t\\t<span class=\\"sort-priority\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t{sort_priority}\\n\\t\\t\\t\\t\\t\\t\\t</span>\\n\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</button>\\n\\t\\t\\t{#if is_static}\\n\\t\\t\\t\\t<Padlock />\\n\\t\\t\\t{/if}\\n\\t\\t</div>\\n\\t\\t{#if can_add_columns}\\n\\t\\t\\t<CellMenuButton on_click={(event) => toggle_header_menu(event, i)} />\\n\\t\\t{/if}\\n\\t</div>\\n</th>\\n\\n<style>\\n\\tth {\\n\\t\\t--ring-color: transparent;\\n\\t\\tposition: relative;\\n\\t\\toutline: none;\\n\\t\\tbox-shadow: inset 0 0 0 1px var(--ring-color);\\n\\t\\tpadding: 0;\\n\\t\\tbackground: var(--table-even-background-fill);\\n\\t\\tborder-right-width: 0px;\\n\\t\\tborder-left-width: 1px;\\n\\t\\tborder-style: solid;\\n\\t\\tborder-color: var(--border-color-primary);\\n\\t}\\n\\n\\tth:first-child {\\n\\t\\tborder-top-left-radius: var(--table-radius);\\n\\t\\tborder-bottom-left-radius: var(--table-radius);\\n\\t\\tborder-left-width: 0px;\\n\\t}\\n\\n\\tth:last-child {\\n\\t\\tborder-top-right-radius: var(--table-radius);\\n\\t\\tborder-bottom-right-radius: var(--table-radius);\\n\\t}\\n\\n\\tth.focus {\\n\\t\\t--ring-color: var(--color-accent);\\n\\t\\tbox-shadow: inset 0 0 0 2px var(--ring-color);\\n\\t\\tz-index: 4;\\n\\t}\\n\\n\\tth.focus :global(.cell-menu-button) {\\n\\t\\tdisplay: flex;\\n\\t}\\n\\n\\tth:hover :global(.cell-menu-button) {\\n\\t\\tdisplay: flex;\\n\\t}\\n\\n\\t.cell-wrap {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: flex-start;\\n\\t\\toutline: none;\\n\\t\\tmin-height: var(--size-9);\\n\\t\\tposition: relative;\\n\\t\\theight: 100%;\\n\\t\\tpadding: var(--size-2);\\n\\t\\tbox-sizing: border-box;\\n\\t\\tmargin: 0;\\n\\t\\tgap: var(--size-1);\\n\\t\\toverflow: visible;\\n\\t\\tmin-width: 0;\\n\\t\\tborder-radius: var(--table-radius);\\n\\t}\\n\\n\\t.header-content {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\toverflow: hidden;\\n\\t\\tflex-grow: 1;\\n\\t\\tmin-width: 0;\\n\\t\\twhite-space: normal;\\n\\t\\toverflow-wrap: break-word;\\n\\t\\tword-break: normal;\\n\\t\\theight: 100%;\\n\\t\\tgap: var(--size-1);\\n\\t}\\n\\n\\t.header-button {\\n\\t\\tdisplay: flex;\\n\\t\\ttext-align: left;\\n\\t\\twidth: 100%;\\n\\t\\toverflow: hidden;\\n\\t\\ttext-overflow: ellipsis;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tposition: relative;\\n\\t}\\n\\n\\t.sort-indicators {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tmargin-left: var(--size-1);\\n\\t\\tgap: var(--size-1);\\n\\t}\\n\\n\\t.sort-arrow {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t\\tcolor: var(--body-text-color);\\n\\t}\\n\\n\\t.sort-priority {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t\\tfont-size: var(--size-2);\\n\\t\\tbackground-color: var(--button-secondary-background-fill);\\n\\t\\tcolor: var(--body-text-color);\\n\\t\\tborder-radius: var(--radius-sm);\\n\\t\\twidth: var(--size-2-5);\\n\\t\\theight: var(--size-2-5);\\n\\t\\tpadding: var(--size-1-5);\\n\\t}\\n\\n\\t.pinned-column {\\n\\t\\tposition: sticky;\\n\\t\\tz-index: 5;\\n\\t\\tborder-right: none;\\n\\t}</style>\\n"],"names":[],"mappings":"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"}'
};
const TableHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.i === void 0 && $$bindings.i && i !== void 0)
    $$bindings.i(i);
  if ($$props.actual_pinned_columns === void 0 && $$bindings.actual_pinned_columns && actual_pinned_columns !== void 0)
    $$bindings.actual_pinned_columns(actual_pinned_columns);
  if ($$props.header_edit === void 0 && $$bindings.header_edit && header_edit !== void 0)
    $$bindings.header_edit(header_edit);
  if ($$props.selected_header === void 0 && $$bindings.selected_header && selected_header !== void 0)
    $$bindings.selected_header(selected_header);
  if ($$props.get_sort_status === void 0 && $$bindings.get_sort_status && get_sort_status !== void 0)
    $$bindings.get_sort_status(get_sort_status);
  if ($$props.headers === void 0 && $$bindings.headers && headers !== void 0)
    $$bindings.headers(headers);
  if ($$props.get_cell_width === void 0 && $$bindings.get_cell_width && get_cell_width2 !== void 0)
    $$bindings.get_cell_width(get_cell_width2);
  if ($$props.handle_header_click === void 0 && $$bindings.handle_header_click && handle_header_click !== void 0)
    $$bindings.handle_header_click(handle_header_click);
  if ($$props.toggle_header_menu === void 0 && $$bindings.toggle_header_menu && toggle_header_menu !== void 0)
    $$bindings.toggle_header_menu(toggle_header_menu);
  if ($$props.end_header_edit === void 0 && $$bindings.end_header_edit && end_header_edit !== void 0)
    $$bindings.end_header_edit(end_header_edit);
  if ($$props.sort_columns === void 0 && $$bindings.sort_columns && sort_columns !== void 0)
    $$bindings.sort_columns(sort_columns);
  if ($$props.latex_delimiters === void 0 && $$bindings.latex_delimiters && latex_delimiters !== void 0)
    $$bindings.latex_delimiters(latex_delimiters);
  if ($$props.line_breaks === void 0 && $$bindings.line_breaks && line_breaks !== void 0)
    $$bindings.line_breaks(line_breaks);
  if ($$props.max_chars === void 0 && $$bindings.max_chars && max_chars !== void 0)
    $$bindings.max_chars(max_chars);
  if ($$props.root === void 0 && $$bindings.root && root !== void 0)
    $$bindings.root(root);
  if ($$props.editable === void 0 && $$bindings.editable && editable !== void 0)
    $$bindings.editable(editable);
  if ($$props.i18n === void 0 && $$bindings.i18n && i18n !== void 0)
    $$bindings.i18n(i18n);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  if ($$props.is_static === void 0 && $$bindings.is_static && is_static !== void 0)
    $$bindings.is_static(is_static);
  if ($$props.col_count === void 0 && $$bindings.col_count && col_count !== void 0)
    $$bindings.col_count(col_count);
  $$result.css.add(css$6);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    can_add_columns = col_count && col_count[1] === "dynamic";
    sort_index = sort_columns.findIndex((item) => item.col === i);
    sort_priority = sort_index !== -1 ? sort_index + 1 : null;
    current_direction = sort_index !== -1 ? sort_columns[sort_index].direction : null;
    $$rendered = `<th${add_attribute(
      "aria-sort",
      get_sort_status(value, headers) === "none" ? "none" : get_sort_status(value, headers) === "asc" ? "ascending" : "descending",
      0
    )} style="${"width: " + escape(get_cell_width2(i), true) + "; left: " + escape(get_header_position(i), true) + ";"}"${add_attribute("title", value, 0)} class="${[
      "svelte-sy2j2s",
      (i < actual_pinned_columns ? "pinned-column" : "") + " " + (i === actual_pinned_columns - 1 ? "last-pinned" : "") + " " + (header_edit === i || selected_header === i ? "focus" : "") + " " + (sort_index !== -1 ? "sorted" : "")
    ].join(" ").trim()}"><div class="cell-wrap svelte-sy2j2s"><div class="header-content svelte-sy2j2s"><button class="header-button svelte-sy2j2s"${add_attribute("title", value, 0)}>${validate_component(EditableCell, "EditableCell").$$render(
      $$result,
      {
        max_chars,
        latex_delimiters,
        line_breaks,
        edit: header_edit === i,
        header: true,
        root,
        editable,
        is_static,
        i18n,
        value,
        el
      },
      {
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        },
        el: ($$value) => {
          el = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${sort_index !== -1 ? `<div class="sort-indicators svelte-sy2j2s"><span class="sort-arrow svelte-sy2j2s">${current_direction === "asc" ? `${validate_component(SortArrowUp, "SortArrowUp").$$render($$result, { size: 12 }, {}, {})}` : `${validate_component(SortArrowDown, "SortArrowDown").$$render($$result, { size: 12 }, {}, {})}`}</span> ${sort_columns.length > 1 ? `<span class="sort-priority svelte-sy2j2s">${escape(sort_priority)}</span>` : ``}</div>` : ``}</button> ${is_static ? `${validate_component(Padlock, "Padlock").$$render($$result, {}, {}, {})}` : ``}</div> ${can_add_columns ? `${validate_component(CellMenuButton, "CellMenuButton").$$render(
      $$result,
      {
        on_click: (event) => toggle_header_menu(event, i)
      },
      {},
      {}
    )}` : ``}</div> </th>`;
  } while (!$$settled);
  return $$rendered;
});
const css$5 = {
  code: "td.svelte-v1pjjd{--ring-color:transparent;position:relative;outline:none;box-shadow:inset 0 0 0 1px var(--ring-color);padding:0;border-right-width:0px;border-left-width:1px;border-style:solid;border-color:var(--border-color-primary)}.cell-wrap.svelte-v1pjjd{display:flex;align-items:center;justify-content:flex-start;outline:none;min-height:var(--size-9);position:relative;height:100%;padding:var(--size-2);box-sizing:border-box;margin:0;gap:var(--size-1);overflow:visible;min-width:0;border-radius:var(--table-radius)}.cell-selected.svelte-v1pjjd{--ring-color:var(--color-accent);box-shadow:inset 0 0 0 2px var(--ring-color);z-index:2;position:relative}.cell-selected.svelte-v1pjjd .cell-menu-button{display:flex}.flash.cell-selected.svelte-v1pjjd{animation:svelte-v1pjjd-flash-color 700ms ease-out}@keyframes svelte-v1pjjd-flash-color{0%,30%{background:var(--color-accent-copied)}100%{background:transparent}}.pinned-column.svelte-v1pjjd{position:sticky;z-index:3;border-right:none}.pinned-column.svelte-v1pjjd:nth-child(odd){background:var(--table-odd-background-fill)}.pinned-column.svelte-v1pjjd:nth-child(even){background:var(--table-even-background-fill)}td.svelte-v1pjjd:first-child{border-left-width:0px}tr:last-child td.svelte-v1pjjd:first-child{border-bottom-left-radius:var(--table-radius)}tr:last-child td.svelte-v1pjjd:last-child{border-bottom-right-radius:var(--table-radius)}.dragging.svelte-v1pjjd{cursor:crosshair}.cell-selected.no-top.svelte-v1pjjd{box-shadow:inset 2px 0 0 var(--ring-color),\n			inset -2px 0 0 var(--ring-color),\n			inset 0 -2px 0 var(--ring-color)}.cell-selected.no-bottom.svelte-v1pjjd{box-shadow:inset 2px 0 0 var(--ring-color),\n			inset -2px 0 0 var(--ring-color),\n			inset 0 2px 0 var(--ring-color)}.cell-selected.no-left.svelte-v1pjjd{box-shadow:inset 0 2px 0 var(--ring-color),\n			inset -2px 0 0 var(--ring-color),\n			inset 0 -2px 0 var(--ring-color)}.cell-selected.no-right.svelte-v1pjjd{box-shadow:inset 0 2px 0 var(--ring-color),\n			inset 2px 0 0 var(--ring-color),\n			inset 0 -2px 0 var(--ring-color)}.cell-selected.no-top.no-left.svelte-v1pjjd{box-shadow:inset -2px 0 0 var(--ring-color),\n			inset 0 -2px 0 var(--ring-color)}.cell-selected.no-top.no-right.svelte-v1pjjd{box-shadow:inset 2px 0 0 var(--ring-color),\n			inset 0 -2px 0 var(--ring-color)}.cell-selected.no-bottom.no-left.svelte-v1pjjd{box-shadow:inset -2px 0 0 var(--ring-color),\n			inset 0 2px 0 var(--ring-color)}.cell-selected.no-bottom.no-right.svelte-v1pjjd{box-shadow:inset 2px 0 0 var(--ring-color),\n			inset 0 2px 0 var(--ring-color)}.cell-selected.no-top.no-bottom.svelte-v1pjjd{box-shadow:inset 2px 0 0 var(--ring-color),\n			inset -2px 0 0 var(--ring-color)}.cell-selected.no-left.no-right.svelte-v1pjjd{box-shadow:inset 0 2px 0 var(--ring-color),\n			inset 0 -2px 0 var(--ring-color)}.cell-selected.no-top.no-left.no-right.svelte-v1pjjd{box-shadow:inset 0 -2px 0 var(--ring-color)}.cell-selected.no-bottom.no-left.no-right.svelte-v1pjjd{box-shadow:inset 0 2px 0 var(--ring-color)}.cell-selected.no-left.no-top.no-bottom.svelte-v1pjjd{box-shadow:inset -2px 0 0 var(--ring-color)}.cell-selected.no-right.no-top.no-bottom.svelte-v1pjjd{box-shadow:inset 2px 0 0 var(--ring-color)}.cell-selected.no-top.no-bottom.no-left.no-right.svelte-v1pjjd{box-shadow:none}",
  map: '{"version":3,"file":"TableCell.svelte","sources":["TableCell.svelte"],"sourcesContent":["<script lang=\\"ts\\">import EditableCell from \\"./EditableCell.svelte\\";\\nimport CellMenuButton from \\"./CellMenuButton.svelte\\";\\nimport { is_cell_in_selection } from \\"./selection_utils\\";\\nexport let value;\\nexport let index;\\nexport let j;\\nexport let actual_pinned_columns;\\nexport let get_cell_width;\\nexport let handle_cell_click;\\nexport let toggle_cell_menu;\\nexport let is_cell_selected;\\nexport let should_show_cell_menu;\\nexport let selected_cells;\\nexport let copy_flash;\\nexport let active_cell_menu;\\nexport let styling;\\nexport let latex_delimiters;\\nexport let line_breaks;\\nexport let datatype;\\nexport let editing;\\nexport let clear_on_focus;\\nexport let max_chars;\\nexport let root;\\nexport let editable;\\nexport let is_static = false;\\nexport let i18n;\\nexport let components = {};\\nexport let el;\\nexport let handle_select_column;\\nexport let handle_select_row;\\nexport let is_dragging;\\nfunction get_cell_position(col_index) {\\n    if (col_index >= actual_pinned_columns) {\\n        return \\"auto\\";\\n    }\\n    if (col_index === 0) {\\n        return \\"0\\";\\n    }\\n    const previous_widths = Array(col_index).fill(0).map((_, idx) => {\\n        return get_cell_width(idx);\\n    }).join(\\" + \\");\\n    return `calc(${previous_widths})`;\\n}\\n$: cell_classes = is_cell_selected([index, j], selected_cells || []);\\n$: is_in_selection = is_cell_in_selection([index, j], selected_cells);\\n$: has_no_top = cell_classes.includes(\\"no-top\\");\\n$: has_no_bottom = cell_classes.includes(\\"no-bottom\\");\\n$: has_no_left = cell_classes.includes(\\"no-left\\");\\n$: has_no_right = cell_classes.includes(\\"no-right\\");\\n<\/script>\\n\\n<td\\n\\tclass:pinned-column={j < actual_pinned_columns}\\n\\tclass:last-pinned={j === actual_pinned_columns - 1}\\n\\ttabindex={j < actual_pinned_columns ? -1 : 0}\\n\\tbind:this={el.cell}\\n\\tdata-row={index}\\n\\tdata-col={j}\\n\\tdata-testid={`cell-${index}-${j}`}\\n\\ton:mousedown={(e) => handle_cell_click(e, index, j)}\\n\\ton:contextmenu|preventDefault={(e) => toggle_cell_menu(e, index, j)}\\n\\tstyle=\\"width: {get_cell_width(j)}; left: {get_cell_position(j)}; {styling ||\\n\\t\\t\'\'}\\"\\n\\tclass:flash={copy_flash && is_in_selection}\\n\\tclass:cell-selected={is_in_selection}\\n\\tclass:no-top={has_no_top}\\n\\tclass:no-bottom={has_no_bottom}\\n\\tclass:no-left={has_no_left}\\n\\tclass:no-right={has_no_right}\\n\\tclass:menu-active={active_cell_menu &&\\n\\t\\tactive_cell_menu.row === index &&\\n\\t\\tactive_cell_menu.col === j}\\n\\tclass:dragging={is_dragging}\\n>\\n\\t<div class=\\"cell-wrap\\">\\n\\t\\t<EditableCell\\n\\t\\t\\tbind:value\\n\\t\\t\\tbind:el={el.input}\\n\\t\\t\\tdisplay_value={String(value)}\\n\\t\\t\\t{latex_delimiters}\\n\\t\\t\\t{line_breaks}\\n\\t\\t\\t{editable}\\n\\t\\t\\t{is_static}\\n\\t\\t\\tedit={editing && editing[0] === index && editing[1] === j}\\n\\t\\t\\t{datatype}\\n\\t\\t\\ton:blur={() => {\\n\\t\\t\\t\\tclear_on_focus = false;\\n\\t\\t\\t}}\\n\\t\\t\\ton:focus={() => {\\n\\t\\t\\t\\tconst row = index;\\n\\t\\t\\t\\tconst col = j;\\n\\t\\t\\t\\tif (!selected_cells.some(([r, c]) => r === row && c === col)) {\\n\\t\\t\\t\\t\\tselected_cells = [[row, col]];\\n\\t\\t\\t\\t}\\n\\t\\t\\t}}\\n\\t\\t\\t{clear_on_focus}\\n\\t\\t\\t{root}\\n\\t\\t\\t{max_chars}\\n\\t\\t\\t{i18n}\\n\\t\\t\\t{components}\\n\\t\\t\\tshow_selection_buttons={selected_cells.length === 1 &&\\n\\t\\t\\t\\tselected_cells[0][0] === index &&\\n\\t\\t\\t\\tselected_cells[0][1] === j}\\n\\t\\t\\tcoords={[index, j]}\\n\\t\\t\\ton_select_column={handle_select_column}\\n\\t\\t\\ton_select_row={handle_select_row}\\n\\t\\t\\t{is_dragging}\\n\\t\\t/>\\n\\t\\t{#if editable && should_show_cell_menu([index, j], selected_cells, editable)}\\n\\t\\t\\t<CellMenuButton on_click={(event) => toggle_cell_menu(event, index, j)} />\\n\\t\\t{/if}\\n\\t</div>\\n</td>\\n\\n<style>\\n\\ttd {\\n\\t\\t--ring-color: transparent;\\n\\t\\tposition: relative;\\n\\t\\toutline: none;\\n\\t\\tbox-shadow: inset 0 0 0 1px var(--ring-color);\\n\\t\\tpadding: 0;\\n\\t\\tborder-right-width: 0px;\\n\\t\\tborder-left-width: 1px;\\n\\t\\tborder-style: solid;\\n\\t\\tborder-color: var(--border-color-primary);\\n\\t}\\n\\n\\t.cell-wrap {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: flex-start;\\n\\t\\toutline: none;\\n\\t\\tmin-height: var(--size-9);\\n\\t\\tposition: relative;\\n\\t\\theight: 100%;\\n\\t\\tpadding: var(--size-2);\\n\\t\\tbox-sizing: border-box;\\n\\t\\tmargin: 0;\\n\\t\\tgap: var(--size-1);\\n\\t\\toverflow: visible;\\n\\t\\tmin-width: 0;\\n\\t\\tborder-radius: var(--table-radius);\\n\\t}\\n\\n\\t.cell-selected {\\n\\t\\t--ring-color: var(--color-accent);\\n\\t\\tbox-shadow: inset 0 0 0 2px var(--ring-color);\\n\\t\\tz-index: 2;\\n\\t\\tposition: relative;\\n\\t}\\n\\n\\t.cell-selected :global(.cell-menu-button) {\\n\\t\\tdisplay: flex;\\n\\t}\\n\\n\\t.flash.cell-selected {\\n\\t\\tanimation: flash-color 700ms ease-out;\\n\\t}\\n\\n\\t@keyframes flash-color {\\n\\t\\t0%,\\n\\t\\t30% {\\n\\t\\t\\tbackground: var(--color-accent-copied);\\n\\t\\t}\\n\\n\\t\\t100% {\\n\\t\\t\\tbackground: transparent;\\n\\t\\t}\\n\\t}\\n\\n\\t.pinned-column {\\n\\t\\tposition: sticky;\\n\\t\\tz-index: 3;\\n\\t\\tborder-right: none;\\n\\t}\\n\\n\\t.pinned-column:nth-child(odd) {\\n\\t\\tbackground: var(--table-odd-background-fill);\\n\\t}\\n\\n\\t.pinned-column:nth-child(even) {\\n\\t\\tbackground: var(--table-even-background-fill);\\n\\t}\\n\\n\\ttd:first-child {\\n\\t\\tborder-left-width: 0px;\\n\\t}\\n\\n\\t:global(tr:last-child) td:first-child {\\n\\t\\tborder-bottom-left-radius: var(--table-radius);\\n\\t}\\n\\n\\t:global(tr:last-child) td:last-child {\\n\\t\\tborder-bottom-right-radius: var(--table-radius);\\n\\t}\\n\\n\\t.dragging {\\n\\t\\tcursor: crosshair;\\n\\t}\\n\\n\\t/* Add back the cell selection border styles */\\n\\t.cell-selected.no-top {\\n\\t\\tbox-shadow:\\n\\t\\t\\tinset 2px 0 0 var(--ring-color),\\n\\t\\t\\tinset -2px 0 0 var(--ring-color),\\n\\t\\t\\tinset 0 -2px 0 var(--ring-color);\\n\\t}\\n\\n\\t.cell-selected.no-bottom {\\n\\t\\tbox-shadow:\\n\\t\\t\\tinset 2px 0 0 var(--ring-color),\\n\\t\\t\\tinset -2px 0 0 var(--ring-color),\\n\\t\\t\\tinset 0 2px 0 var(--ring-color);\\n\\t}\\n\\n\\t.cell-selected.no-left {\\n\\t\\tbox-shadow:\\n\\t\\t\\tinset 0 2px 0 var(--ring-color),\\n\\t\\t\\tinset -2px 0 0 var(--ring-color),\\n\\t\\t\\tinset 0 -2px 0 var(--ring-color);\\n\\t}\\n\\n\\t.cell-selected.no-right {\\n\\t\\tbox-shadow:\\n\\t\\t\\tinset 0 2px 0 var(--ring-color),\\n\\t\\t\\tinset 2px 0 0 var(--ring-color),\\n\\t\\t\\tinset 0 -2px 0 var(--ring-color);\\n\\t}\\n\\n\\t.cell-selected.no-top.no-left {\\n\\t\\tbox-shadow:\\n\\t\\t\\tinset -2px 0 0 var(--ring-color),\\n\\t\\t\\tinset 0 -2px 0 var(--ring-color);\\n\\t}\\n\\n\\t.cell-selected.no-top.no-right {\\n\\t\\tbox-shadow:\\n\\t\\t\\tinset 2px 0 0 var(--ring-color),\\n\\t\\t\\tinset 0 -2px 0 var(--ring-color);\\n\\t}\\n\\n\\t.cell-selected.no-bottom.no-left {\\n\\t\\tbox-shadow:\\n\\t\\t\\tinset -2px 0 0 var(--ring-color),\\n\\t\\t\\tinset 0 2px 0 var(--ring-color);\\n\\t}\\n\\n\\t.cell-selected.no-bottom.no-right {\\n\\t\\tbox-shadow:\\n\\t\\t\\tinset 2px 0 0 var(--ring-color),\\n\\t\\t\\tinset 0 2px 0 var(--ring-color);\\n\\t}\\n\\n\\t.cell-selected.no-top.no-bottom {\\n\\t\\tbox-shadow:\\n\\t\\t\\tinset 2px 0 0 var(--ring-color),\\n\\t\\t\\tinset -2px 0 0 var(--ring-color);\\n\\t}\\n\\n\\t.cell-selected.no-left.no-right {\\n\\t\\tbox-shadow:\\n\\t\\t\\tinset 0 2px 0 var(--ring-color),\\n\\t\\t\\tinset 0 -2px 0 var(--ring-color);\\n\\t}\\n\\n\\t.cell-selected.no-top.no-left.no-right {\\n\\t\\tbox-shadow: inset 0 -2px 0 var(--ring-color);\\n\\t}\\n\\n\\t.cell-selected.no-bottom.no-left.no-right {\\n\\t\\tbox-shadow: inset 0 2px 0 var(--ring-color);\\n\\t}\\n\\n\\t.cell-selected.no-left.no-top.no-bottom {\\n\\t\\tbox-shadow: inset -2px 0 0 var(--ring-color);\\n\\t}\\n\\n\\t.cell-selected.no-right.no-top.no-bottom {\\n\\t\\tbox-shadow: inset 2px 0 0 var(--ring-color);\\n\\t}\\n\\n\\t.cell-selected.no-top.no-bottom.no-left.no-right {\\n\\t\\tbox-shadow: none;\\n\\t}</style>\\n"],"names":[],"mappings":"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"}'
};
const TableCell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  if ($$props.j === void 0 && $$bindings.j && j !== void 0)
    $$bindings.j(j);
  if ($$props.actual_pinned_columns === void 0 && $$bindings.actual_pinned_columns && actual_pinned_columns !== void 0)
    $$bindings.actual_pinned_columns(actual_pinned_columns);
  if ($$props.get_cell_width === void 0 && $$bindings.get_cell_width && get_cell_width2 !== void 0)
    $$bindings.get_cell_width(get_cell_width2);
  if ($$props.handle_cell_click === void 0 && $$bindings.handle_cell_click && handle_cell_click !== void 0)
    $$bindings.handle_cell_click(handle_cell_click);
  if ($$props.toggle_cell_menu === void 0 && $$bindings.toggle_cell_menu && toggle_cell_menu !== void 0)
    $$bindings.toggle_cell_menu(toggle_cell_menu);
  if ($$props.is_cell_selected === void 0 && $$bindings.is_cell_selected && is_cell_selected2 !== void 0)
    $$bindings.is_cell_selected(is_cell_selected2);
  if ($$props.should_show_cell_menu === void 0 && $$bindings.should_show_cell_menu && should_show_cell_menu2 !== void 0)
    $$bindings.should_show_cell_menu(should_show_cell_menu2);
  if ($$props.selected_cells === void 0 && $$bindings.selected_cells && selected_cells !== void 0)
    $$bindings.selected_cells(selected_cells);
  if ($$props.copy_flash === void 0 && $$bindings.copy_flash && copy_flash !== void 0)
    $$bindings.copy_flash(copy_flash);
  if ($$props.active_cell_menu === void 0 && $$bindings.active_cell_menu && active_cell_menu !== void 0)
    $$bindings.active_cell_menu(active_cell_menu);
  if ($$props.styling === void 0 && $$bindings.styling && styling !== void 0)
    $$bindings.styling(styling);
  if ($$props.latex_delimiters === void 0 && $$bindings.latex_delimiters && latex_delimiters !== void 0)
    $$bindings.latex_delimiters(latex_delimiters);
  if ($$props.line_breaks === void 0 && $$bindings.line_breaks && line_breaks !== void 0)
    $$bindings.line_breaks(line_breaks);
  if ($$props.datatype === void 0 && $$bindings.datatype && datatype !== void 0)
    $$bindings.datatype(datatype);
  if ($$props.editing === void 0 && $$bindings.editing && editing !== void 0)
    $$bindings.editing(editing);
  if ($$props.clear_on_focus === void 0 && $$bindings.clear_on_focus && clear_on_focus !== void 0)
    $$bindings.clear_on_focus(clear_on_focus);
  if ($$props.max_chars === void 0 && $$bindings.max_chars && max_chars !== void 0)
    $$bindings.max_chars(max_chars);
  if ($$props.root === void 0 && $$bindings.root && root !== void 0)
    $$bindings.root(root);
  if ($$props.editable === void 0 && $$bindings.editable && editable !== void 0)
    $$bindings.editable(editable);
  if ($$props.is_static === void 0 && $$bindings.is_static && is_static !== void 0)
    $$bindings.is_static(is_static);
  if ($$props.i18n === void 0 && $$bindings.i18n && i18n !== void 0)
    $$bindings.i18n(i18n);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  if ($$props.handle_select_column === void 0 && $$bindings.handle_select_column && handle_select_column !== void 0)
    $$bindings.handle_select_column(handle_select_column);
  if ($$props.handle_select_row === void 0 && $$bindings.handle_select_row && handle_select_row !== void 0)
    $$bindings.handle_select_row(handle_select_row);
  if ($$props.is_dragging === void 0 && $$bindings.is_dragging && is_dragging !== void 0)
    $$bindings.is_dragging(is_dragging);
  $$result.css.add(css$5);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    cell_classes = is_cell_selected2([index, j], selected_cells || []);
    is_in_selection = is_cell_in_selection([index, j], selected_cells);
    has_no_top = cell_classes.includes("no-top");
    has_no_bottom = cell_classes.includes("no-bottom");
    has_no_left = cell_classes.includes("no-left");
    has_no_right = cell_classes.includes("no-right");
    $$rendered = `<td${add_attribute("tabindex", j < actual_pinned_columns ? -1 : 0, 0)}${add_attribute("data-row", index, 0)}${add_attribute("data-col", j, 0)}${add_attribute("data-testid", `cell-${index}-${j}`, 0)} style="${"width: " + escape(get_cell_width2(j), true) + "; left: " + escape(get_cell_position(j), true) + "; " + escape(styling || "", true)}" class="${[
      "svelte-v1pjjd",
      (j < actual_pinned_columns ? "pinned-column" : "") + " " + (j === actual_pinned_columns - 1 ? "last-pinned" : "") + " " + (copy_flash && is_in_selection ? "flash" : "") + " " + (is_in_selection ? "cell-selected" : "") + " " + (has_no_top ? "no-top" : "") + " " + (has_no_bottom ? "no-bottom" : "") + " " + (has_no_left ? "no-left" : "") + " " + (has_no_right ? "no-right" : "") + " " + (active_cell_menu && active_cell_menu.row === index && active_cell_menu.col === j ? "menu-active" : "") + " " + (is_dragging ? "dragging" : "")
    ].join(" ").trim()}"${add_attribute("this", el.cell, 0)}><div class="cell-wrap svelte-v1pjjd">${validate_component(EditableCell, "EditableCell").$$render(
      $$result,
      {
        display_value: String(value),
        latex_delimiters,
        line_breaks,
        editable,
        is_static,
        edit: editing && editing[0] === index && editing[1] === j,
        datatype,
        clear_on_focus,
        root,
        max_chars,
        i18n,
        components,
        show_selection_buttons: selected_cells.length === 1 && selected_cells[0][0] === index && selected_cells[0][1] === j,
        coords: [index, j],
        on_select_column: handle_select_column,
        on_select_row: handle_select_row,
        is_dragging,
        value,
        el: el.input
      },
      {
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        },
        el: ($$value) => {
          el.input = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${editable && should_show_cell_menu2([index, j], selected_cells, editable) ? `${validate_component(CellMenuButton, "CellMenuButton").$$render(
      $$result,
      {
        on_click: (event) => toggle_cell_menu(event, index, j)
      },
      {},
      {}
    )}` : ``}</div> </td>`;
  } while (!$$settled);
  return $$rendered;
});
const css$4 = {
  code: ".add-row-button.svelte-jkwuz7{width:100%;padding:var(--size-1);background:transparent;border:1px dashed var(--border-color-primary);border-radius:var(--radius-sm);color:var(--body-text-color);cursor:pointer;transition:all 150ms;margin-top:var(--size-2);z-index:10;position:relative;pointer-events:auto}.add-row-button.svelte-jkwuz7:hover{background:var(--background-fill-secondary);border-style:solid}",
  map: '{"version":3,"file":"EmptyRowButton.svelte","sources":["EmptyRowButton.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let on_click;\\n<\/script>\\n\\n<button class=\\"add-row-button\\" on:click={on_click} aria-label=\\"Add row\\">\\n\\t+\\n</button>\\n\\n<style>\\n\\t.add-row-button {\\n\\t\\twidth: 100%;\\n\\t\\tpadding: var(--size-1);\\n\\t\\tbackground: transparent;\\n\\t\\tborder: 1px dashed var(--border-color-primary);\\n\\t\\tborder-radius: var(--radius-sm);\\n\\t\\tcolor: var(--body-text-color);\\n\\t\\tcursor: pointer;\\n\\t\\ttransition: all 150ms;\\n\\t\\tmargin-top: var(--size-2);\\n\\t\\tz-index: 10;\\n\\t\\tposition: relative;\\n\\t\\tpointer-events: auto;\\n\\t}\\n\\n\\t.add-row-button:hover {\\n\\t\\tbackground: var(--background-fill-secondary);\\n\\t\\tborder-style: solid;\\n\\t}</style>\\n"],"names":[],"mappings":"AAQC,6BAAgB,CACf,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,QAAQ,CAAC,CACtB,UAAU,CAAE,WAAW,CACvB,MAAM,CAAE,GAAG,CAAC,MAAM,CAAC,IAAI,sBAAsB,CAAC,CAC9C,aAAa,CAAE,IAAI,WAAW,CAAC,CAC/B,KAAK,CAAE,IAAI,iBAAiB,CAAC,CAC7B,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,GAAG,CAAC,KAAK,CACrB,UAAU,CAAE,IAAI,QAAQ,CAAC,CACzB,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,cAAc,CAAE,IACjB,CAEA,6BAAe,MAAO,CACrB,UAAU,CAAE,IAAI,2BAA2B,CAAC,CAC5C,YAAY,CAAE,KACf"}'
};
const EmptyRowButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { on_click } = $$props;
  if ($$props.on_click === void 0 && $$bindings.on_click && on_click !== void 0)
    $$bindings.on_click(on_click);
  $$result.css.add(css$4);
  return `<button class="add-row-button svelte-jkwuz7" aria-label="Add row" data-svelte-h="svelte-qq2si4">+
</button>`;
});
const css$3 = {
  code: "table.svelte-1e98i6s.svelte-1e98i6s{position:relative;overflow:auto;-webkit-overflow-scrolling:touch;max-height:var(--max-height);box-sizing:border-box;display:block;padding:0;margin:0;color:var(--body-text-color);font-size:var(--input-text-size);line-height:var(--line-md);font-family:var(--font-mono);border-spacing:0;width:100%;scroll-snap-type:x proximity;border-collapse:separate;scrollbar-width:thin;scrollbar-color:rgba(128, 128, 128, 0.5) transparent}table.svelte-1e98i6s.svelte-1e98i6s::-webkit-scrollbar{width:4px;height:4px}table.svelte-1e98i6s.svelte-1e98i6s::-webkit-scrollbar-track{background:transparent}table.svelte-1e98i6s.svelte-1e98i6s::-webkit-scrollbar-thumb{background-color:rgba(128, 128, 128, 0.5);border-radius:4px}table.svelte-1e98i6s.svelte-1e98i6s:hover{scrollbar-color:rgba(160, 160, 160, 0.7) transparent}table.svelte-1e98i6s.svelte-1e98i6s:hover::-webkit-scrollbar-thumb{background-color:rgba(160, 160, 160, 0.7);border-radius:4px;width:4px}@media(hover: none){table.svelte-1e98i6s.svelte-1e98i6s{scrollbar-color:rgba(160, 160, 160, 0.7) transparent}table.svelte-1e98i6s.svelte-1e98i6s::-webkit-scrollbar-thumb{background-color:rgba(160, 160, 160, 0.7);border-radius:4px}}@media(pointer: coarse){table.svelte-1e98i6s.svelte-1e98i6s::-webkit-scrollbar{width:8px;height:8px}}table.svelte-1e98i6s .svelte-1e98i6s:is(thead, tfoot, tbody){display:table;table-layout:fixed;width:100%;box-sizing:border-box}tbody.svelte-1e98i6s.svelte-1e98i6s{overflow-x:scroll;overflow-y:hidden}table.svelte-1e98i6s tbody.svelte-1e98i6s{padding-top:var(--bw-svt-p-top);padding-bottom:var(--bw-svt-p-bottom)}tbody.svelte-1e98i6s.svelte-1e98i6s{position:relative;box-sizing:border-box;border:0px solid currentColor}tbody.svelte-1e98i6s>tr:last-child{border:none}table.svelte-1e98i6s td{scroll-snap-align:start}tbody.svelte-1e98i6s>tr:nth-child(even){background:var(--table-even-background-fill)}tbody.svelte-1e98i6s td.pinned-column{position:sticky;z-index:3}tbody.svelte-1e98i6s tr:nth-child(odd) td.pinned-column{background:var(--table-odd-background-fill)}tbody.svelte-1e98i6s tr:nth-child(even) td.pinned-column{background:var(--table-even-background-fill)}tbody.svelte-1e98i6s td.last-pinned{border-right:1px solid var(--border-color-primary)}thead.svelte-1e98i6s.svelte-1e98i6s{position:sticky;top:0;left:0;background:var(--background-fill-primary);z-index:7}thead.svelte-1e98i6s th{background:var(--table-even-background-fill) !important}thead.svelte-1e98i6s th.pinned-column{position:sticky;z-index:7;background:var(--table-even-background-fill) !important}thead.svelte-1e98i6s th.last-pinned{border-right:1px solid var(--border-color-primary)}.table.disable-scroll.svelte-1e98i6s.svelte-1e98i6s{overflow:hidden !important}",
  map: '{"version":3,"file":"VirtualTable.svelte","sources":["VirtualTable.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount, tick, createEventDispatcher } from \\"svelte\\";\\nimport { _ } from \\"svelte-i18n\\";\\nexport let items = [];\\nexport let max_height;\\nexport let actual_height;\\nexport let table_scrollbar_width;\\nexport let start = 0;\\nexport let end = 20;\\nexport let selected;\\nexport let disable_scroll = false;\\nexport let show_scroll_button = false;\\nexport let viewport;\\nconst dispatch = createEventDispatcher();\\nlet height = \\"100%\\";\\nlet average_height = 30;\\nlet bottom = 0;\\nlet contents;\\nlet head_height = 0;\\nlet foot_height = 0;\\nlet height_map = [];\\nlet mounted;\\nlet rows;\\nlet top = 0;\\nlet viewport_height = 200;\\nlet visible = [];\\nlet viewport_box;\\n$: viewport_height = viewport_box?.height || 200;\\nconst is_browser = typeof window !== \\"undefined\\";\\nconst raf = is_browser ? window.requestAnimationFrame : (cb) => cb();\\n$: mounted && raf(() => refresh_height_map(sortedItems));\\nlet content_height = 0;\\nasync function refresh_height_map(_items) {\\n    if (viewport_height === 0) {\\n        return;\\n    }\\n    head_height = viewport.querySelector(\\".thead\\")?.getBoundingClientRect().height || 0;\\n    await tick();\\n    const { scrollTop } = viewport;\\n    table_scrollbar_width = viewport.offsetWidth - viewport.clientWidth;\\n    content_height = top - (scrollTop - head_height);\\n    let i = start;\\n    while (content_height < max_height && i < _items.length) {\\n        let row = rows[i - start];\\n        if (!row) {\\n            end = i + 1;\\n            await tick();\\n            row = rows[i - start];\\n        }\\n        let _h = row?.getBoundingClientRect().height;\\n        if (!_h) {\\n            _h = average_height;\\n        }\\n        const row_height = height_map[i] = _h;\\n        content_height += row_height;\\n        i += 1;\\n    }\\n    end = i;\\n    const remaining = _items.length - end;\\n    const scrollbar_height = viewport.offsetHeight - viewport.clientHeight;\\n    if (scrollbar_height > 0) {\\n        content_height += scrollbar_height;\\n    }\\n    let filtered_height_map = height_map.filter((v) => typeof v === \\"number\\");\\n    average_height = filtered_height_map.reduce((a, b) => a + b, 0) / filtered_height_map.length;\\n    bottom = remaining * average_height;\\n    height_map.length = _items.length;\\n    await tick();\\n    if (!max_height) {\\n        actual_height = content_height + 1;\\n    }\\n    else if (content_height < max_height) {\\n        actual_height = content_height + 2;\\n    }\\n    else {\\n        actual_height = max_height;\\n    }\\n    await tick();\\n}\\n$: scroll_and_render(selected);\\nasync function scroll_and_render(n) {\\n    raf(async () => {\\n        if (typeof n !== \\"number\\")\\n            return;\\n        const direction = typeof n !== \\"number\\" ? false : is_in_view(n);\\n        if (direction === true) {\\n            return;\\n        }\\n        if (direction === \\"back\\") {\\n            await scroll_to_index(n, { behavior: \\"instant\\" });\\n        }\\n        if (direction === \\"forwards\\") {\\n            await scroll_to_index(n, { behavior: \\"instant\\" }, true);\\n        }\\n    });\\n}\\nfunction is_in_view(n) {\\n    const current = rows && rows[n - start];\\n    if (!current && n < start) {\\n        return \\"back\\";\\n    }\\n    if (!current && n >= end - 1) {\\n        return \\"forwards\\";\\n    }\\n    const { top: viewport_top } = viewport.getBoundingClientRect();\\n    const { top: top2, bottom: bottom2 } = current.getBoundingClientRect();\\n    if (top2 - viewport_top < 37) {\\n        return \\"back\\";\\n    }\\n    if (bottom2 - viewport_top > viewport_height) {\\n        return \\"forwards\\";\\n    }\\n    return true;\\n}\\nfunction get_computed_px_amount(elem, property) {\\n    if (!elem) {\\n        return 0;\\n    }\\n    const compStyle = getComputedStyle(elem);\\n    let x = parseInt(compStyle.getPropertyValue(property));\\n    return x;\\n}\\nasync function handle_scroll(e) {\\n    const scroll_top = viewport.scrollTop;\\n    show_scroll_button = scroll_top > 100;\\n    if (show_scroll_button) {\\n        dispatch(\\"scroll_top\\", scroll_top);\\n    }\\n    rows = contents.children;\\n    const is_start_overflow = sortedItems.length < start;\\n    const row_top_border = get_computed_px_amount(rows[1], \\"border-top-width\\");\\n    const actual_border_collapsed_width = 0;\\n    if (is_start_overflow) {\\n        await scroll_to_index(sortedItems.length - 1, { behavior: \\"auto\\" });\\n    }\\n    let new_start = 0;\\n    for (let v = 0; v < rows.length; v += 1) {\\n        height_map[start + v] = rows[v].getBoundingClientRect().height;\\n    }\\n    let i = 0;\\n    let y = head_height + row_top_border / 2;\\n    let row_heights = [];\\n    while (i < sortedItems.length) {\\n        const row_height = height_map[i] || average_height;\\n        row_heights[i] = row_height;\\n        if (y + row_height + actual_border_collapsed_width > scroll_top) {\\n            new_start = i;\\n            top = y - (head_height + row_top_border / 2);\\n            break;\\n        }\\n        y += row_height;\\n        i += 1;\\n    }\\n    new_start = Math.max(0, new_start);\\n    while (i < sortedItems.length) {\\n        const row_height = height_map[i] || average_height;\\n        y += row_height;\\n        i += 1;\\n        if (y > scroll_top + viewport_height) {\\n            break;\\n        }\\n    }\\n    start = new_start;\\n    end = i;\\n    const remaining = sortedItems.length - end;\\n    if (end === 0) {\\n        end = 10;\\n    }\\n    average_height = (y - head_height) / end;\\n    let remaining_height = remaining * average_height;\\n    while (i < sortedItems.length) {\\n        i += 1;\\n        height_map[i] = average_height;\\n    }\\n    bottom = remaining_height;\\n    if (!isFinite(bottom)) {\\n        bottom = 2e5;\\n    }\\n}\\nexport async function scroll_to_index(index, opts, align_end = false) {\\n    await tick();\\n    const _itemHeight = average_height;\\n    let distance = index * _itemHeight;\\n    if (align_end) {\\n        distance = distance - viewport_height + _itemHeight + head_height;\\n    }\\n    const scrollbar_height = viewport.offsetHeight - viewport.clientHeight;\\n    if (scrollbar_height > 0) {\\n        distance += scrollbar_height;\\n    }\\n    const _opts = {\\n        top: distance,\\n        behavior: \\"smooth\\",\\n        ...opts\\n    };\\n    viewport.scrollTo(_opts);\\n}\\n$: sortedItems = items;\\n$: visible = is_browser ? sortedItems.slice(start, end).map((data, i) => {\\n    return { index: i + start, data };\\n}) : sortedItems.slice(0, max_height / sortedItems.length * average_height + 1).map((data, i) => {\\n    return { index: i + start, data };\\n});\\nonMount(() => {\\n    rows = contents.children;\\n    mounted = true;\\n    refresh_height_map(items);\\n});\\n<\/script>\\n\\n<svelte-virtual-table-viewport>\\n\\t<div>\\n\\t\\t<table\\n\\t\\t\\tclass=\\"table\\"\\n\\t\\t\\tclass:disable-scroll={disable_scroll}\\n\\t\\t\\tbind:this={viewport}\\n\\t\\t\\tbind:contentRect={viewport_box}\\n\\t\\t\\ton:scroll={handle_scroll}\\n\\t\\t\\tstyle=\\"height: {height}; --bw-svt-p-top: {top}px; --bw-svt-p-bottom: {bottom}px; --bw-svt-head-height: {head_height}px; --bw-svt-foot-height: {foot_height}px; --bw-svt-avg-row-height: {average_height}px; --max-height: {max_height}px\\"\\n\\t\\t>\\n\\t\\t\\t<thead class=\\"thead\\" bind:offsetHeight={head_height}>\\n\\t\\t\\t\\t<slot name=\\"thead\\" />\\n\\t\\t\\t</thead>\\n\\t\\t\\t<tbody bind:this={contents} class=\\"tbody\\">\\n\\t\\t\\t\\t{#if visible.length && visible[0].data.length}\\n\\t\\t\\t\\t\\t{#each visible as item (item.data[0].id)}\\n\\t\\t\\t\\t\\t\\t<slot name=\\"tbody\\" item={item.data} index={item.index}>\\n\\t\\t\\t\\t\\t\\t\\tMissing Table Row\\n\\t\\t\\t\\t\\t\\t</slot>\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</tbody>\\n\\t\\t\\t<tfoot class=\\"tfoot\\" bind:offsetHeight={foot_height}>\\n\\t\\t\\t\\t<slot name=\\"tfoot\\" />\\n\\t\\t\\t</tfoot>\\n\\t\\t</table>\\n\\t</div>\\n</svelte-virtual-table-viewport>\\n\\n<style type=\\"text/css\\">\\n\\ttable {\\n\\t\\tposition: relative;\\n\\t\\toverflow: auto;\\n\\t\\t-webkit-overflow-scrolling: touch;\\n\\t\\tmax-height: var(--max-height);\\n\\t\\tbox-sizing: border-box;\\n\\t\\tdisplay: block;\\n\\t\\tpadding: 0;\\n\\t\\tmargin: 0;\\n\\t\\tcolor: var(--body-text-color);\\n\\t\\tfont-size: var(--input-text-size);\\n\\t\\tline-height: var(--line-md);\\n\\t\\tfont-family: var(--font-mono);\\n\\t\\tborder-spacing: 0;\\n\\t\\twidth: 100%;\\n\\t\\tscroll-snap-type: x proximity;\\n\\t\\tborder-collapse: separate;\\n\\t\\tscrollbar-width: thin;\\n\\t\\tscrollbar-color: rgba(128, 128, 128, 0.5) transparent;\\n\\t}\\n\\n\\ttable::-webkit-scrollbar {\\n\\t\\twidth: 4px;\\n\\t\\theight: 4px;\\n\\t}\\n\\n\\ttable::-webkit-scrollbar-track {\\n\\t\\tbackground: transparent;\\n\\t}\\n\\n\\ttable::-webkit-scrollbar-thumb {\\n\\t\\tbackground-color: rgba(128, 128, 128, 0.5);\\n\\t\\tborder-radius: 4px;\\n\\t}\\n\\n\\ttable:hover {\\n\\t\\tscrollbar-color: rgba(160, 160, 160, 0.7) transparent;\\n\\t}\\n\\n\\ttable:hover::-webkit-scrollbar-thumb {\\n\\t\\tbackground-color: rgba(160, 160, 160, 0.7);\\n\\t\\tborder-radius: 4px;\\n\\t\\twidth: 4px;\\n\\t}\\n\\n\\t@media (hover: none) {\\n\\t\\ttable {\\n\\t\\t\\tscrollbar-color: rgba(160, 160, 160, 0.7) transparent;\\n\\t\\t}\\n\\n\\t\\ttable::-webkit-scrollbar-thumb {\\n\\t\\t\\tbackground-color: rgba(160, 160, 160, 0.7);\\n\\t\\t\\tborder-radius: 4px;\\n\\t\\t}\\n\\t}\\n\\n\\t@media (pointer: coarse) {\\n\\t\\ttable::-webkit-scrollbar {\\n\\t\\t\\twidth: 8px;\\n\\t\\t\\theight: 8px;\\n\\t\\t}\\n\\t}\\n\\n\\ttable :is(thead, tfoot, tbody) {\\n\\t\\tdisplay: table;\\n\\t\\ttable-layout: fixed;\\n\\t\\twidth: 100%;\\n\\t\\tbox-sizing: border-box;\\n\\t}\\n\\n\\ttbody {\\n\\t\\toverflow-x: scroll;\\n\\t\\toverflow-y: hidden;\\n\\t}\\n\\n\\ttable tbody {\\n\\t\\tpadding-top: var(--bw-svt-p-top);\\n\\t\\tpadding-bottom: var(--bw-svt-p-bottom);\\n\\t}\\n\\ttbody {\\n\\t\\tposition: relative;\\n\\t\\tbox-sizing: border-box;\\n\\t\\tborder: 0px solid currentColor;\\n\\t}\\n\\n\\ttbody > :global(tr:last-child) {\\n\\t\\tborder: none;\\n\\t}\\n\\n\\ttable :global(td) {\\n\\t\\tscroll-snap-align: start;\\n\\t}\\n\\n\\ttbody > :global(tr:nth-child(even)) {\\n\\t\\tbackground: var(--table-even-background-fill);\\n\\t}\\n\\n\\ttbody :global(td.pinned-column) {\\n\\t\\tposition: sticky;\\n\\t\\tz-index: 3;\\n\\t}\\n\\n\\ttbody :global(tr:nth-child(odd)) :global(td.pinned-column) {\\n\\t\\tbackground: var(--table-odd-background-fill);\\n\\t}\\n\\n\\ttbody :global(tr:nth-child(even)) :global(td.pinned-column) {\\n\\t\\tbackground: var(--table-even-background-fill);\\n\\t}\\n\\n\\ttbody :global(td.last-pinned) {\\n\\t\\tborder-right: 1px solid var(--border-color-primary);\\n\\t}\\n\\n\\tthead {\\n\\t\\tposition: sticky;\\n\\t\\ttop: 0;\\n\\t\\tleft: 0;\\n\\t\\tbackground: var(--background-fill-primary);\\n\\t\\tz-index: 7;\\n\\t}\\n\\n\\tthead :global(th) {\\n\\t\\tbackground: var(--table-even-background-fill) !important;\\n\\t}\\n\\n\\tthead :global(th.pinned-column) {\\n\\t\\tposition: sticky;\\n\\t\\tz-index: 7;\\n\\t\\tbackground: var(--table-even-background-fill) !important;\\n\\t}\\n\\n\\tthead :global(th.last-pinned) {\\n\\t\\tborder-right: 1px solid var(--border-color-primary);\\n\\t}\\n\\n\\t.table.disable-scroll {\\n\\t\\toverflow: hidden !important;\\n\\t}</style>\\n"],"names":[],"mappings":"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"}'
};
let height = "100%";
const VirtualTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let sortedItems;
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
  createEventDispatcher();
  let average_height = 30;
  let bottom = 0;
  let contents;
  let head_height = 0;
  let foot_height = 0;
  let rows;
  let top = 0;
  let viewport_height = 200;
  let visible = [];
  const is_browser = typeof window !== "undefined";
  const raf = is_browser ? window.requestAnimationFrame : (cb) => cb();
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
    const current = rows ;
    if (n < start) {
      return "back";
    }
    if (n >= end - 1) {
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
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.max_height === void 0 && $$bindings.max_height && max_height !== void 0)
    $$bindings.max_height(max_height);
  if ($$props.actual_height === void 0 && $$bindings.actual_height && actual_height !== void 0)
    $$bindings.actual_height(actual_height);
  if ($$props.table_scrollbar_width === void 0 && $$bindings.table_scrollbar_width && table_scrollbar_width !== void 0)
    $$bindings.table_scrollbar_width(table_scrollbar_width);
  if ($$props.start === void 0 && $$bindings.start && start !== void 0)
    $$bindings.start(start);
  if ($$props.end === void 0 && $$bindings.end && end !== void 0)
    $$bindings.end(end);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.disable_scroll === void 0 && $$bindings.disable_scroll && disable_scroll !== void 0)
    $$bindings.disable_scroll(disable_scroll);
  if ($$props.show_scroll_button === void 0 && $$bindings.show_scroll_button && show_scroll_button !== void 0)
    $$bindings.show_scroll_button(show_scroll_button);
  if ($$props.viewport === void 0 && $$bindings.viewport && viewport !== void 0)
    $$bindings.viewport(viewport);
  if ($$props.scroll_to_index === void 0 && $$bindings.scroll_to_index && scroll_to_index !== void 0)
    $$bindings.scroll_to_index(scroll_to_index);
  $$result.css.add(css$3);
  viewport_height = 200;
  sortedItems = items;
  {
    scroll_and_render(selected);
  }
  visible = is_browser ? sortedItems.slice(start, end).map((data, i) => {
    return { index: i + start, data };
  }) : sortedItems.slice(0, max_height / sortedItems.length * average_height + 1).map((data, i) => {
    return { index: i + start, data };
  });
  return `<svelte-virtual-table-viewport><div><table class="${["table svelte-1e98i6s", disable_scroll ? "disable-scroll" : ""].join(" ").trim()}" style="${"height: " + escape(height, true) + "; --bw-svt-p-top: " + escape(top, true) + "px; --bw-svt-p-bottom: " + escape(bottom, true) + "px; --bw-svt-head-height: " + escape(head_height, true) + "px; --bw-svt-foot-height: " + escape(foot_height, true) + "px; --bw-svt-avg-row-height: " + escape(average_height, true) + "px; --max-height: " + escape(max_height, true) + "px"}"${add_attribute("this", viewport, 0)}><thead class="thead svelte-1e98i6s">${slots.thead ? slots.thead({}) : ``}</thead> <tbody class="tbody svelte-1e98i6s"${add_attribute("this", contents, 0)}>${visible.length && visible[0].data.length ? `${each(visible, (item) => {
    return `${slots.tbody ? slots.tbody({ item: item.data, index: item.index }) : `
							Missing Table Row
						`}`;
  })}` : ``}</tbody> <tfoot class="tfoot svelte-1e98i6s">${slots.tfoot ? slots.tfoot({}) : ``}</tfoot></table></div> </svelte-virtual-table-viewport>`;
});
const CellMenuIcons = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  return `${icon == "add-column-right" ? `<svg viewBox="0 0 24 24" width="16" height="16"><rect x="4" y="6" width="4" height="12" stroke="currentColor" stroke-width="2" fill="none"></rect><path d="M12 12H19M16 8L19 12L16 16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"></path></svg>` : `${icon == "add-column-left" ? `<svg viewBox="0 0 24 24" width="16" height="16"><rect x="16" y="6" width="4" height="12" stroke="currentColor" stroke-width="2" fill="none"></rect><path d="M12 12H5M8 8L5 12L8 16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"></path></svg>` : `${icon == "add-row-above" ? `<svg viewBox="0 0 24 24" width="16" height="16"><rect x="6" y="16" width="12" height="4" stroke="currentColor" stroke-width="2"></rect><path d="M12 12V5M8 8L12 5L16 8" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"></path></svg>` : `${icon == "add-row-below" ? `<svg viewBox="0 0 24 24" width="16" height="16"><rect x="6" y="4" width="12" height="4" stroke="currentColor" stroke-width="2"></rect><path d="M12 12V19M8 16L12 19L16 16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"></path></svg>` : `${icon == "delete-row" ? `<svg viewBox="0 0 24 24" width="16" height="16"><rect x="5" y="10" width="14" height="4" stroke="currentColor" stroke-width="2"></rect><path d="M8 7L16 17M16 7L8 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>` : `${icon == "delete-column" ? `<svg viewBox="0 0 24 24" width="16" height="16"><rect x="10" y="5" width="4" height="14" stroke="currentColor" stroke-width="2"></rect><path d="M7 8L17 16M17 8L7 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>` : `${icon == "sort-asc" ? `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M8 16L12 12L16 16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 12V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><path d="M5 7H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>` : `${icon == "sort-desc" ? `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M8 12L12 16L16 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 16V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><path d="M5 5H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>` : `${icon == "clear-sort" ? `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 5H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><path d="M5 9H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><path d="M5 13H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><path d="M5 17H7" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><path d="M17 17L21 21M21 17L17 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>` : ``}`}`}`}`}`}`}`}`}`;
});
const css$2 = {
  code: ".cell-menu.svelte-42thj4.svelte-42thj4{position:fixed;z-index:9;background:var(--background-fill-primary);border:1px solid var(--border-color-primary);border-radius:var(--radius-sm);padding:var(--size-1);display:flex;flex-direction:column;gap:var(--size-1);box-shadow:var(--shadow-drop-lg);min-width:150px;z-index:var(--layer-1)}.cell-menu.svelte-42thj4 button.svelte-42thj4{background:none;border:none;cursor:pointer;text-align:left;padding:var(--size-1) var(--size-2);border-radius:var(--radius-sm);color:var(--body-text-color);font-size:var(--text-sm);transition:background-color 0.2s,\n			color 0.2s;display:flex;align-items:center;gap:var(--size-2);position:relative}.cell-menu.svelte-42thj4 button.active.svelte-42thj4{background-color:var(--background-fill-secondary)}.cell-menu.svelte-42thj4 button.svelte-42thj4:hover{background-color:var(--background-fill-secondary)}.cell-menu.svelte-42thj4 button.svelte-42thj4 svg{fill:currentColor;transition:fill 0.2s}.priority.svelte-42thj4.svelte-42thj4{display:flex;align-items:center;justify-content:center;margin-left:auto;font-size:var(--size-2);background-color:var(--button-secondary-background-fill);color:var(--body-text-color);border-radius:var(--radius-sm);width:var(--size-2-5);height:var(--size-2-5)}",
  map: '{"version":3,"file":"CellMenu.svelte","sources":["CellMenu.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport CellMenuIcons from \\"./CellMenuIcons.svelte\\";\\nexport let x;\\nexport let y;\\nexport let on_add_row_above;\\nexport let on_add_row_below;\\nexport let on_add_column_left;\\nexport let on_add_column_right;\\nexport let row;\\nexport let col_count;\\nexport let row_count;\\nexport let on_delete_row;\\nexport let on_delete_col;\\nexport let can_delete_rows;\\nexport let can_delete_cols;\\nexport let on_sort = () => {\\n};\\nexport let on_clear_sort = () => {\\n};\\nexport let sort_direction = null;\\nexport let sort_priority = null;\\nexport let editable = true;\\nexport let i18n;\\nlet menu_element;\\n$: is_header = row === -1;\\n$: can_add_rows = editable && row_count[1] === \\"dynamic\\";\\n$: can_add_columns = editable && col_count[1] === \\"dynamic\\";\\nonMount(() => {\\n    position_menu();\\n});\\nfunction position_menu() {\\n    if (!menu_element)\\n        return;\\n    const viewport_width = window.innerWidth;\\n    const viewport_height = window.innerHeight;\\n    const menu_rect = menu_element.getBoundingClientRect();\\n    let new_x = x - 30;\\n    let new_y = y - 20;\\n    if (new_x + menu_rect.width > viewport_width) {\\n        new_x = x - menu_rect.width + 10;\\n    }\\n    if (new_y + menu_rect.height > viewport_height) {\\n        new_y = y - menu_rect.height + 10;\\n    }\\n    menu_element.style.left = `${new_x}px`;\\n    menu_element.style.top = `${new_y}px`;\\n}\\n<\/script>\\n\\n<div bind:this={menu_element} class=\\"cell-menu\\" role=\\"menu\\">\\n\\t{#if is_header}\\n\\t\\t<button\\n\\t\\t\\trole=\\"menuitem\\"\\n\\t\\t\\ton:click={() => on_sort(\\"asc\\")}\\n\\t\\t\\tclass:active={sort_direction === \\"asc\\"}\\n\\t\\t>\\n\\t\\t\\t<CellMenuIcons icon=\\"sort-asc\\" />\\n\\t\\t\\t{i18n(\\"dataframe.sort_ascending\\")}\\n\\t\\t\\t{#if sort_direction === \\"asc\\" && sort_priority !== null}\\n\\t\\t\\t\\t<span class=\\"priority\\">{sort_priority}</span>\\n\\t\\t\\t{/if}\\n\\t\\t</button>\\n\\t\\t<button\\n\\t\\t\\trole=\\"menuitem\\"\\n\\t\\t\\ton:click={() => on_sort(\\"desc\\")}\\n\\t\\t\\tclass:active={sort_direction === \\"desc\\"}\\n\\t\\t>\\n\\t\\t\\t<CellMenuIcons icon=\\"sort-desc\\" />\\n\\t\\t\\t{i18n(\\"dataframe.sort_descending\\")}\\n\\t\\t\\t{#if sort_direction === \\"desc\\" && sort_priority !== null}\\n\\t\\t\\t\\t<span class=\\"priority\\">{sort_priority}</span>\\n\\t\\t\\t{/if}\\n\\t\\t</button>\\n\\t\\t<button role=\\"menuitem\\" on:click={on_clear_sort}>\\n\\t\\t\\t<CellMenuIcons icon=\\"clear-sort\\" />\\n\\t\\t\\t{i18n(\\"dataframe.clear_sort\\")}\\n\\t\\t</button>\\n\\t{/if}\\n\\n\\t{#if !is_header && can_add_rows}\\n\\t\\t<button\\n\\t\\t\\trole=\\"menuitem\\"\\n\\t\\t\\ton:click={() => on_add_row_above()}\\n\\t\\t\\taria-label=\\"Add row above\\"\\n\\t\\t>\\n\\t\\t\\t<CellMenuIcons icon=\\"add-row-above\\" />\\n\\t\\t\\t{i18n(\\"dataframe.add_row_above\\")}\\n\\t\\t</button>\\n\\t\\t<button\\n\\t\\t\\trole=\\"menuitem\\"\\n\\t\\t\\ton:click={() => on_add_row_below()}\\n\\t\\t\\taria-label=\\"Add row below\\"\\n\\t\\t>\\n\\t\\t\\t<CellMenuIcons icon=\\"add-row-below\\" />\\n\\t\\t\\t{i18n(\\"dataframe.add_row_below\\")}\\n\\t\\t</button>\\n\\t\\t{#if can_delete_rows}\\n\\t\\t\\t<button\\n\\t\\t\\t\\trole=\\"menuitem\\"\\n\\t\\t\\t\\ton:click={on_delete_row}\\n\\t\\t\\t\\tclass=\\"delete\\"\\n\\t\\t\\t\\taria-label=\\"Delete row\\"\\n\\t\\t\\t>\\n\\t\\t\\t\\t<CellMenuIcons icon=\\"delete-row\\" />\\n\\t\\t\\t\\t{i18n(\\"dataframe.delete_row\\")}\\n\\t\\t\\t</button>\\n\\t\\t{/if}\\n\\t{/if}\\n\\t{#if can_add_columns}\\n\\t\\t<button\\n\\t\\t\\trole=\\"menuitem\\"\\n\\t\\t\\ton:click={() => on_add_column_left()}\\n\\t\\t\\taria-label=\\"Add column to the left\\"\\n\\t\\t>\\n\\t\\t\\t<CellMenuIcons icon=\\"add-column-left\\" />\\n\\t\\t\\t{i18n(\\"dataframe.add_column_left\\")}\\n\\t\\t</button>\\n\\t\\t<button\\n\\t\\t\\trole=\\"menuitem\\"\\n\\t\\t\\ton:click={() => on_add_column_right()}\\n\\t\\t\\taria-label=\\"Add column to the right\\"\\n\\t\\t>\\n\\t\\t\\t<CellMenuIcons icon=\\"add-column-right\\" />\\n\\t\\t\\t{i18n(\\"dataframe.add_column_right\\")}\\n\\t\\t</button>\\n\\t\\t{#if can_delete_cols}\\n\\t\\t\\t<button\\n\\t\\t\\t\\trole=\\"menuitem\\"\\n\\t\\t\\t\\ton:click={on_delete_col}\\n\\t\\t\\t\\tclass=\\"delete\\"\\n\\t\\t\\t\\taria-label=\\"Delete column\\"\\n\\t\\t\\t>\\n\\t\\t\\t\\t<CellMenuIcons icon=\\"delete-column\\" />\\n\\t\\t\\t\\t{i18n(\\"dataframe.delete_column\\")}\\n\\t\\t\\t</button>\\n\\t\\t{/if}\\n\\t{/if}\\n</div>\\n\\n<style>\\n\\t.cell-menu {\\n\\t\\tposition: fixed;\\n\\t\\tz-index: 9;\\n\\t\\tbackground: var(--background-fill-primary);\\n\\t\\tborder: 1px solid var(--border-color-primary);\\n\\t\\tborder-radius: var(--radius-sm);\\n\\t\\tpadding: var(--size-1);\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tgap: var(--size-1);\\n\\t\\tbox-shadow: var(--shadow-drop-lg);\\n\\t\\tmin-width: 150px;\\n\\t\\tz-index: var(--layer-1);\\n\\t}\\n\\n\\t.cell-menu button {\\n\\t\\tbackground: none;\\n\\t\\tborder: none;\\n\\t\\tcursor: pointer;\\n\\t\\ttext-align: left;\\n\\t\\tpadding: var(--size-1) var(--size-2);\\n\\t\\tborder-radius: var(--radius-sm);\\n\\t\\tcolor: var(--body-text-color);\\n\\t\\tfont-size: var(--text-sm);\\n\\t\\ttransition:\\n\\t\\t\\tbackground-color 0.2s,\\n\\t\\t\\tcolor 0.2s;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tgap: var(--size-2);\\n\\t\\tposition: relative;\\n\\t}\\n\\n\\t.cell-menu button.active {\\n\\t\\tbackground-color: var(--background-fill-secondary);\\n\\t}\\n\\n\\t.cell-menu button:hover {\\n\\t\\tbackground-color: var(--background-fill-secondary);\\n\\t}\\n\\n\\t.cell-menu button :global(svg) {\\n\\t\\tfill: currentColor;\\n\\t\\ttransition: fill 0.2s;\\n\\t}\\n\\n\\t.priority {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t\\tmargin-left: auto;\\n\\t\\tfont-size: var(--size-2);\\n\\t\\tbackground-color: var(--button-secondary-background-fill);\\n\\t\\tcolor: var(--body-text-color);\\n\\t\\tborder-radius: var(--radius-sm);\\n\\t\\twidth: var(--size-2-5);\\n\\t\\theight: var(--size-2-5);\\n\\t}</style>\\n"],"names":[],"mappings":"AA4IC,sCAAW,CACV,QAAQ,CAAE,KAAK,CACf,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,IAAI,yBAAyB,CAAC,CAC1C,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,sBAAsB,CAAC,CAC7C,aAAa,CAAE,IAAI,WAAW,CAAC,CAC/B,OAAO,CAAE,IAAI,QAAQ,CAAC,CACtB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,IAAI,QAAQ,CAAC,CAClB,UAAU,CAAE,IAAI,gBAAgB,CAAC,CACjC,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,IAAI,SAAS,CACvB,CAEA,wBAAU,CAAC,oBAAO,CACjB,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,IAAI,QAAQ,CAAC,CAAC,IAAI,QAAQ,CAAC,CACpC,aAAa,CAAE,IAAI,WAAW,CAAC,CAC/B,KAAK,CAAE,IAAI,iBAAiB,CAAC,CAC7B,SAAS,CAAE,IAAI,SAAS,CAAC,CACzB,UAAU,CACT,gBAAgB,CAAC,IAAI,CAAC;AACzB,GAAG,KAAK,CAAC,IAAI,CACX,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IAAI,QAAQ,CAAC,CAClB,QAAQ,CAAE,QACX,CAEA,wBAAU,CAAC,MAAM,qBAAQ,CACxB,gBAAgB,CAAE,IAAI,2BAA2B,CAClD,CAEA,wBAAU,CAAC,oBAAM,MAAO,CACvB,gBAAgB,CAAE,IAAI,2BAA2B,CAClD,CAEA,wBAAU,CAAC,oBAAM,CAAS,GAAK,CAC9B,IAAI,CAAE,YAAY,CAClB,UAAU,CAAE,IAAI,CAAC,IAClB,CAEA,qCAAU,CACT,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,IAAI,CACjB,SAAS,CAAE,IAAI,QAAQ,CAAC,CACxB,gBAAgB,CAAE,IAAI,kCAAkC,CAAC,CACzD,KAAK,CAAE,IAAI,iBAAiB,CAAC,CAC7B,aAAa,CAAE,IAAI,WAAW,CAAC,CAC/B,KAAK,CAAE,IAAI,UAAU,CAAC,CACtB,MAAM,CAAE,IAAI,UAAU,CACvB"}'
};
const CellMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  if ($$props.x === void 0 && $$bindings.x && x !== void 0)
    $$bindings.x(x);
  if ($$props.y === void 0 && $$bindings.y && y !== void 0)
    $$bindings.y(y);
  if ($$props.on_add_row_above === void 0 && $$bindings.on_add_row_above && on_add_row_above !== void 0)
    $$bindings.on_add_row_above(on_add_row_above);
  if ($$props.on_add_row_below === void 0 && $$bindings.on_add_row_below && on_add_row_below !== void 0)
    $$bindings.on_add_row_below(on_add_row_below);
  if ($$props.on_add_column_left === void 0 && $$bindings.on_add_column_left && on_add_column_left !== void 0)
    $$bindings.on_add_column_left(on_add_column_left);
  if ($$props.on_add_column_right === void 0 && $$bindings.on_add_column_right && on_add_column_right !== void 0)
    $$bindings.on_add_column_right(on_add_column_right);
  if ($$props.row === void 0 && $$bindings.row && row !== void 0)
    $$bindings.row(row);
  if ($$props.col_count === void 0 && $$bindings.col_count && col_count !== void 0)
    $$bindings.col_count(col_count);
  if ($$props.row_count === void 0 && $$bindings.row_count && row_count !== void 0)
    $$bindings.row_count(row_count);
  if ($$props.on_delete_row === void 0 && $$bindings.on_delete_row && on_delete_row !== void 0)
    $$bindings.on_delete_row(on_delete_row);
  if ($$props.on_delete_col === void 0 && $$bindings.on_delete_col && on_delete_col !== void 0)
    $$bindings.on_delete_col(on_delete_col);
  if ($$props.can_delete_rows === void 0 && $$bindings.can_delete_rows && can_delete_rows !== void 0)
    $$bindings.can_delete_rows(can_delete_rows);
  if ($$props.can_delete_cols === void 0 && $$bindings.can_delete_cols && can_delete_cols !== void 0)
    $$bindings.can_delete_cols(can_delete_cols);
  if ($$props.on_sort === void 0 && $$bindings.on_sort && on_sort !== void 0)
    $$bindings.on_sort(on_sort);
  if ($$props.on_clear_sort === void 0 && $$bindings.on_clear_sort && on_clear_sort !== void 0)
    $$bindings.on_clear_sort(on_clear_sort);
  if ($$props.sort_direction === void 0 && $$bindings.sort_direction && sort_direction !== void 0)
    $$bindings.sort_direction(sort_direction);
  if ($$props.sort_priority === void 0 && $$bindings.sort_priority && sort_priority !== void 0)
    $$bindings.sort_priority(sort_priority);
  if ($$props.editable === void 0 && $$bindings.editable && editable !== void 0)
    $$bindings.editable(editable);
  if ($$props.i18n === void 0 && $$bindings.i18n && i18n !== void 0)
    $$bindings.i18n(i18n);
  $$result.css.add(css$2);
  is_header = row === -1;
  can_add_rows = editable && row_count[1] === "dynamic";
  can_add_columns = editable && col_count[1] === "dynamic";
  return `<div class="cell-menu svelte-42thj4" role="menu"${add_attribute("this", menu_element, 0)}>${is_header ? `<button role="menuitem" class="${["svelte-42thj4", sort_direction === "asc" ? "active" : ""].join(" ").trim()}">${validate_component(CellMenuIcons, "CellMenuIcons").$$render($$result, { icon: "sort-asc" }, {}, {})} ${escape(i18n("dataframe.sort_ascending"))} ${sort_direction === "asc" && sort_priority !== null ? `<span class="priority svelte-42thj4">${escape(sort_priority)}</span>` : ``}</button> <button role="menuitem" class="${["svelte-42thj4", sort_direction === "desc" ? "active" : ""].join(" ").trim()}">${validate_component(CellMenuIcons, "CellMenuIcons").$$render($$result, { icon: "sort-desc" }, {}, {})} ${escape(i18n("dataframe.sort_descending"))} ${sort_direction === "desc" && sort_priority !== null ? `<span class="priority svelte-42thj4">${escape(sort_priority)}</span>` : ``}</button> <button role="menuitem" class="svelte-42thj4">${validate_component(CellMenuIcons, "CellMenuIcons").$$render($$result, { icon: "clear-sort" }, {}, {})} ${escape(i18n("dataframe.clear_sort"))}</button>` : ``} ${!is_header && can_add_rows ? `<button role="menuitem" aria-label="Add row above" class="svelte-42thj4">${validate_component(CellMenuIcons, "CellMenuIcons").$$render($$result, { icon: "add-row-above" }, {}, {})} ${escape(i18n("dataframe.add_row_above"))}</button> <button role="menuitem" aria-label="Add row below" class="svelte-42thj4">${validate_component(CellMenuIcons, "CellMenuIcons").$$render($$result, { icon: "add-row-below" }, {}, {})} ${escape(i18n("dataframe.add_row_below"))}</button> ${can_delete_rows ? `<button role="menuitem" class="delete svelte-42thj4" aria-label="Delete row">${validate_component(CellMenuIcons, "CellMenuIcons").$$render($$result, { icon: "delete-row" }, {}, {})} ${escape(i18n("dataframe.delete_row"))}</button>` : ``}` : ``} ${can_add_columns ? `<button role="menuitem" aria-label="Add column to the left" class="svelte-42thj4">${validate_component(CellMenuIcons, "CellMenuIcons").$$render($$result, { icon: "add-column-left" }, {}, {})} ${escape(i18n("dataframe.add_column_left"))}</button> <button role="menuitem" aria-label="Add column to the right" class="svelte-42thj4">${validate_component(CellMenuIcons, "CellMenuIcons").$$render($$result, { icon: "add-column-right" }, {}, {})} ${escape(i18n("dataframe.add_column_right"))}</button> ${can_delete_cols ? `<button role="menuitem" class="delete svelte-42thj4" aria-label="Delete column">${validate_component(CellMenuIcons, "CellMenuIcons").$$render($$result, { icon: "delete-column" }, {}, {})} ${escape(i18n("dataframe.delete_column"))}</button>` : ``}` : ``} </div>`;
});
const css$1 = {
  code: ".toolbar.svelte-b1nr0g{display:flex;align-items:center;gap:var(--size-2);flex:0 0 auto}.toolbar-buttons.svelte-b1nr0g{display:flex;gap:var(--size-1);flex-wrap:nowrap}.toolbar-button.svelte-b1nr0g{display:flex;align-items:center;justify-content:center;width:var(--size-6);height:var(--size-6);padding:var(--size-1);border:none;border-radius:var(--radius-sm);background:transparent;color:var(--body-text-color-subdued);cursor:pointer;transition:all 0.2s}.toolbar-button.svelte-b1nr0g:hover{background:var(--background-fill-secondary);color:var(--body-text-color)}.toolbar-button.svelte-b1nr0g svg{width:var(--size-4);height:var(--size-4)}.search-container.svelte-b1nr0g{position:relative}.search-input.svelte-b1nr0g{width:var(--size-full);height:var(--size-6);padding:var(--size-2);padding-right:var(--size-8);border:1px solid var(--border-color-primary);border-radius:var(--table-radius);font-size:var(--text-sm);color:var(--body-text-color);background:var(--background-fill-secondary);transition:all 0.2s ease}.search-input.svelte-b1nr0g:hover{border-color:var(--border-color-secondary);background:var(--background-fill-primary)}.search-input.svelte-b1nr0g:focus{outline:none;border-color:var(--color-accent);background:var(--background-fill-primary);box-shadow:0 0 0 1px var(--color-accent)}.check-button.svelte-b1nr0g{position:absolute;right:var(--size-1);top:50%;transform:translateY(-50%);background:var(--color-accent);color:white;border:none;width:var(--size-4);height:var(--size-4);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;padding:var(--size-1)}.check-button.svelte-b1nr0g svg{width:var(--size-3);height:var(--size-3)}.check-button.svelte-b1nr0g:hover{background:var(--color-accent-soft)}",
  map: '{"version":3,"file":"Toolbar.svelte","sources":["Toolbar.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { Maximize, Minimize, Copy, Check } from \\"@gradio/icons\\";\\nimport { onDestroy } from \\"svelte\\";\\nimport { createEventDispatcher } from \\"svelte\\";\\nexport let show_fullscreen_button = false;\\nexport let show_copy_button = false;\\nexport let show_search = \\"none\\";\\nexport let is_fullscreen = false;\\nexport let on_copy;\\nexport let on_commit_filter;\\nconst dispatch = createEventDispatcher();\\nlet copied = false;\\nlet timer;\\nexport let current_search_query = null;\\nlet input_value = \\"\\";\\nfunction handle_search_input(e) {\\n    const target = e.target;\\n    input_value = target.value;\\n    const new_query = input_value || null;\\n    if (current_search_query !== new_query) {\\n        current_search_query = new_query;\\n        dispatch(\\"search\\", current_search_query);\\n    }\\n}\\nfunction copy_feedback() {\\n    copied = true;\\n    if (timer)\\n        clearTimeout(timer);\\n    timer = setTimeout(() => {\\n        copied = false;\\n    }, 2e3);\\n}\\nasync function handle_copy() {\\n    await on_copy();\\n    copy_feedback();\\n}\\nonDestroy(() => {\\n    if (timer)\\n        clearTimeout(timer);\\n});\\n<\/script>\\n\\n<div class=\\"toolbar\\" role=\\"toolbar\\" aria-label=\\"Table actions\\">\\n\\t<div class=\\"toolbar-buttons\\">\\n\\t\\t{#if show_search !== \\"none\\"}\\n\\t\\t\\t<div class=\\"search-container\\">\\n\\t\\t\\t\\t<input\\n\\t\\t\\t\\t\\ttype=\\"text\\"\\n\\t\\t\\t\\t\\tvalue={current_search_query || \\"\\"}\\n\\t\\t\\t\\t\\ton:input={handle_search_input}\\n\\t\\t\\t\\t\\tplaceholder={show_search === \\"filter\\" ? \\"Filter...\\" : \\"Search...\\"}\\n\\t\\t\\t\\t\\tclass=\\"search-input\\"\\n\\t\\t\\t\\t\\tclass:filter-mode={show_search === \\"filter\\"}\\n\\t\\t\\t\\t\\ttitle={`Enter text to ${show_search} the table`}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t\\t{#if current_search_query && show_search === \\"filter\\"}\\n\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\tclass=\\"toolbar-button check-button\\"\\n\\t\\t\\t\\t\\t\\ton:click={on_commit_filter}\\n\\t\\t\\t\\t\\t\\taria-label=\\"Apply filter and update dataframe values\\"\\n\\t\\t\\t\\t\\t\\ttitle=\\"Apply filter and update dataframe values\\"\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t<Check />\\n\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</div>\\n\\t\\t{/if}\\n\\t\\t{#if show_copy_button}\\n\\t\\t\\t<button\\n\\t\\t\\t\\tclass=\\"toolbar-button\\"\\n\\t\\t\\t\\ton:click={handle_copy}\\n\\t\\t\\t\\taria-label={copied ? \\"Copied to clipboard\\" : \\"Copy table data\\"}\\n\\t\\t\\t\\ttitle={copied ? \\"Copied to clipboard\\" : \\"Copy table data\\"}\\n\\t\\t\\t>\\n\\t\\t\\t\\t{#if copied}\\n\\t\\t\\t\\t\\t<Check />\\n\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t<Copy />\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</button>\\n\\t\\t{/if}\\n\\t\\t{#if show_fullscreen_button}\\n\\t\\t\\t<button\\n\\t\\t\\t\\tclass=\\"toolbar-button\\"\\n\\t\\t\\t\\ton:click\\n\\t\\t\\t\\taria-label={is_fullscreen ? \\"Exit fullscreen\\" : \\"Enter fullscreen\\"}\\n\\t\\t\\t\\ttitle={is_fullscreen ? \\"Exit fullscreen\\" : \\"Enter fullscreen\\"}\\n\\t\\t\\t>\\n\\t\\t\\t\\t{#if is_fullscreen}\\n\\t\\t\\t\\t\\t<Minimize />\\n\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t<Maximize />\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</button>\\n\\t\\t{/if}\\n\\t</div>\\n</div>\\n\\n<style>\\n\\t.toolbar {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tgap: var(--size-2);\\n\\t\\tflex: 0 0 auto;\\n\\t}\\n\\n\\t.toolbar-buttons {\\n\\t\\tdisplay: flex;\\n\\t\\tgap: var(--size-1);\\n\\t\\tflex-wrap: nowrap;\\n\\t}\\n\\n\\t.toolbar-button {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t\\twidth: var(--size-6);\\n\\t\\theight: var(--size-6);\\n\\t\\tpadding: var(--size-1);\\n\\t\\tborder: none;\\n\\t\\tborder-radius: var(--radius-sm);\\n\\t\\tbackground: transparent;\\n\\t\\tcolor: var(--body-text-color-subdued);\\n\\t\\tcursor: pointer;\\n\\t\\ttransition: all 0.2s;\\n\\t}\\n\\n\\t.toolbar-button:hover {\\n\\t\\tbackground: var(--background-fill-secondary);\\n\\t\\tcolor: var(--body-text-color);\\n\\t}\\n\\n\\t.toolbar-button :global(svg) {\\n\\t\\twidth: var(--size-4);\\n\\t\\theight: var(--size-4);\\n\\t}\\n\\n\\t.search-container {\\n\\t\\tposition: relative;\\n\\t}\\n\\n\\t.search-input {\\n\\t\\twidth: var(--size-full);\\n\\t\\theight: var(--size-6);\\n\\t\\tpadding: var(--size-2);\\n\\t\\tpadding-right: var(--size-8);\\n\\t\\tborder: 1px solid var(--border-color-primary);\\n\\t\\tborder-radius: var(--table-radius);\\n\\t\\tfont-size: var(--text-sm);\\n\\t\\tcolor: var(--body-text-color);\\n\\t\\tbackground: var(--background-fill-secondary);\\n\\t\\ttransition: all 0.2s ease;\\n\\t}\\n\\n\\t.search-input:hover {\\n\\t\\tborder-color: var(--border-color-secondary);\\n\\t\\tbackground: var(--background-fill-primary);\\n\\t}\\n\\n\\t.search-input:focus {\\n\\t\\toutline: none;\\n\\t\\tborder-color: var(--color-accent);\\n\\t\\tbackground: var(--background-fill-primary);\\n\\t\\tbox-shadow: 0 0 0 1px var(--color-accent);\\n\\t}\\n\\n\\t.check-button {\\n\\t\\tposition: absolute;\\n\\t\\tright: var(--size-1);\\n\\t\\ttop: 50%;\\n\\t\\ttransform: translateY(-50%);\\n\\t\\tbackground: var(--color-accent);\\n\\t\\tcolor: white;\\n\\t\\tborder: none;\\n\\t\\twidth: var(--size-4);\\n\\t\\theight: var(--size-4);\\n\\t\\tborder-radius: var(--radius-sm);\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t\\tpadding: var(--size-1);\\n\\t}\\n\\n\\t.check-button :global(svg) {\\n\\t\\twidth: var(--size-3);\\n\\t\\theight: var(--size-3);\\n\\t}\\n\\n\\t.check-button:hover {\\n\\t\\tbackground: var(--color-accent-soft);\\n\\t}</style>\\n"],"names":[],"mappings":"AAkGC,sBAAS,CACR,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IAAI,QAAQ,CAAC,CAClB,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,IACX,CAEA,8BAAiB,CAChB,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,IAAI,QAAQ,CAAC,CAClB,SAAS,CAAE,MACZ,CAEA,6BAAgB,CACf,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,KAAK,CAAE,IAAI,QAAQ,CAAC,CACpB,MAAM,CAAE,IAAI,QAAQ,CAAC,CACrB,OAAO,CAAE,IAAI,QAAQ,CAAC,CACtB,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,IAAI,WAAW,CAAC,CAC/B,UAAU,CAAE,WAAW,CACvB,KAAK,CAAE,IAAI,yBAAyB,CAAC,CACrC,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,GAAG,CAAC,IACjB,CAEA,6BAAe,MAAO,CACrB,UAAU,CAAE,IAAI,2BAA2B,CAAC,CAC5C,KAAK,CAAE,IAAI,iBAAiB,CAC7B,CAEA,6BAAe,CAAS,GAAK,CAC5B,KAAK,CAAE,IAAI,QAAQ,CAAC,CACpB,MAAM,CAAE,IAAI,QAAQ,CACrB,CAEA,+BAAkB,CACjB,QAAQ,CAAE,QACX,CAEA,2BAAc,CACb,KAAK,CAAE,IAAI,WAAW,CAAC,CACvB,MAAM,CAAE,IAAI,QAAQ,CAAC,CACrB,OAAO,CAAE,IAAI,QAAQ,CAAC,CACtB,aAAa,CAAE,IAAI,QAAQ,CAAC,CAC5B,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,sBAAsB,CAAC,CAC7C,aAAa,CAAE,IAAI,cAAc,CAAC,CAClC,SAAS,CAAE,IAAI,SAAS,CAAC,CACzB,KAAK,CAAE,IAAI,iBAAiB,CAAC,CAC7B,UAAU,CAAE,IAAI,2BAA2B,CAAC,CAC5C,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IACtB,CAEA,2BAAa,MAAO,CACnB,YAAY,CAAE,IAAI,wBAAwB,CAAC,CAC3C,UAAU,CAAE,IAAI,yBAAyB,CAC1C,CAEA,2BAAa,MAAO,CACnB,OAAO,CAAE,IAAI,CACb,YAAY,CAAE,IAAI,cAAc,CAAC,CACjC,UAAU,CAAE,IAAI,yBAAyB,CAAC,CAC1C,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,IAAI,cAAc,CACzC,CAEA,2BAAc,CACb,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,QAAQ,CAAC,CACpB,GAAG,CAAE,GAAG,CACR,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,UAAU,CAAE,IAAI,cAAc,CAAC,CAC/B,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,QAAQ,CAAC,CACpB,MAAM,CAAE,IAAI,QAAQ,CAAC,CACrB,aAAa,CAAE,IAAI,WAAW,CAAC,CAC/B,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,OAAO,CAAE,IAAI,QAAQ,CACtB,CAEA,2BAAa,CAAS,GAAK,CAC1B,KAAK,CAAE,IAAI,QAAQ,CAAC,CACpB,MAAM,CAAE,IAAI,QAAQ,CACrB,CAEA,2BAAa,MAAO,CACnB,UAAU,CAAE,IAAI,mBAAmB,CACpC"}'
};
const Toolbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { show_fullscreen_button = false } = $$props;
  let { show_copy_button = false } = $$props;
  let { show_search = "none" } = $$props;
  let { is_fullscreen = false } = $$props;
  let { on_copy } = $$props;
  let { on_commit_filter } = $$props;
  createEventDispatcher();
  let { current_search_query = null } = $$props;
  onDestroy(() => {
  });
  if ($$props.show_fullscreen_button === void 0 && $$bindings.show_fullscreen_button && show_fullscreen_button !== void 0)
    $$bindings.show_fullscreen_button(show_fullscreen_button);
  if ($$props.show_copy_button === void 0 && $$bindings.show_copy_button && show_copy_button !== void 0)
    $$bindings.show_copy_button(show_copy_button);
  if ($$props.show_search === void 0 && $$bindings.show_search && show_search !== void 0)
    $$bindings.show_search(show_search);
  if ($$props.is_fullscreen === void 0 && $$bindings.is_fullscreen && is_fullscreen !== void 0)
    $$bindings.is_fullscreen(is_fullscreen);
  if ($$props.on_copy === void 0 && $$bindings.on_copy && on_copy !== void 0)
    $$bindings.on_copy(on_copy);
  if ($$props.on_commit_filter === void 0 && $$bindings.on_commit_filter && on_commit_filter !== void 0)
    $$bindings.on_commit_filter(on_commit_filter);
  if ($$props.current_search_query === void 0 && $$bindings.current_search_query && current_search_query !== void 0)
    $$bindings.current_search_query(current_search_query);
  $$result.css.add(css$1);
  return `<div class="toolbar svelte-b1nr0g" role="toolbar" aria-label="Table actions"><div class="toolbar-buttons svelte-b1nr0g">${show_search !== "none" ? `<div class="search-container svelte-b1nr0g"><input type="text"${add_attribute("value", current_search_query || "", 0)}${add_attribute("placeholder", show_search === "filter" ? "Filter..." : "Search...", 0)} class="${["search-input svelte-b1nr0g", show_search === "filter" ? "filter-mode" : ""].join(" ").trim()}"${add_attribute("title", `Enter text to ${show_search} the table`, 0)}> ${current_search_query && show_search === "filter" ? `<button class="toolbar-button check-button svelte-b1nr0g" aria-label="Apply filter and update dataframe values" title="Apply filter and update dataframe values">${validate_component(Check, "Check").$$render($$result, {}, {}, {})}</button>` : ``}</div>` : ``} ${show_copy_button ? `<button class="toolbar-button svelte-b1nr0g"${add_attribute("aria-label", "Copy table data", 0)}${add_attribute("title", "Copy table data", 0)}>${`${validate_component(Copy, "Copy").$$render($$result, {}, {}, {})}`}</button>` : ``} ${show_fullscreen_button ? `<button class="toolbar-button svelte-b1nr0g"${add_attribute("aria-label", is_fullscreen ? "Exit fullscreen" : "Enter fullscreen", 0)}${add_attribute("title", is_fullscreen ? "Exit fullscreen" : "Enter fullscreen", 0)}>${is_fullscreen ? `${validate_component(Minimize, "Minimize").$$render($$result, {}, {}, {})}` : `${validate_component(Maximize, "Maximize").$$render($$result, {}, {}, {})}`}</button>` : ``}</div> </div>`;
});
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
      const _id = make_id2();
      els[_id] = { cell: null, input: null };
      data_binding[_id] = value;
      let display = display_value?.[i]?.[j];
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
const css = {
  code: ".table-container.svelte-18s8a4c.svelte-18s8a4c{display:flex;flex-direction:column;gap:var(--size-2);position:relative}.table-wrap.svelte-18s8a4c.svelte-18s8a4c{position:relative;transition:150ms}.table-wrap.menu-open.svelte-18s8a4c.svelte-18s8a4c{overflow:hidden}.table-wrap.svelte-18s8a4c.svelte-18s8a4c:focus-within{outline:none}.table-wrap.dragging.svelte-18s8a4c.svelte-18s8a4c{cursor:crosshair !important;user-select:none}.table-wrap.dragging.svelte-18s8a4c .svelte-18s8a4c{cursor:crosshair !important;user-select:none}.table-wrap.svelte-18s8a4c>button{border:1px solid var(--border-color-primary);border-radius:var(--table-radius);overflow:hidden}table.svelte-18s8a4c.svelte-18s8a4c{position:absolute;opacity:0;z-index:-1;transition:150ms;width:var(--size-full);table-layout:auto;color:var(--body-text-color);font-size:var(--input-text-size);line-height:var(--line-md);font-family:var(--font-mono);border-spacing:0;border-collapse:separate}thead.svelte-18s8a4c.svelte-18s8a4c{position:sticky;top:0;z-index:5;box-shadow:var(--shadow-drop)}thead.svelte-18s8a4c th.pinned-column{position:sticky;z-index:6;background:var(--table-even-background-fill) !important}.dragging.svelte-18s8a4c.svelte-18s8a4c{border-color:var(--color-accent)}.no-wrap.svelte-18s8a4c.svelte-18s8a4c{white-space:nowrap}div.svelte-18s8a4c:not(.no-wrap) td.svelte-18s8a4c{overflow-wrap:anywhere}div.no-wrap.svelte-18s8a4c td.svelte-18s8a4c{overflow-x:hidden}.row-odd.svelte-18s8a4c.svelte-18s8a4c{background:var(--table-odd-background-fill)}.header-row.svelte-18s8a4c.svelte-18s8a4c{display:flex;justify-content:flex-end;align-items:center;gap:var(--size-2);min-height:var(--size-6);flex-wrap:nowrap;width:100%}.header-row.svelte-18s8a4c .label.svelte-18s8a4c{flex:1 1 auto;margin-right:auto}.header-row.svelte-18s8a4c .label p.svelte-18s8a4c{margin:0;color:var(--block-label-text-color);font-size:var(--block-label-text-size);line-height:var(--line-sm);position:relative;z-index:4}.scroll-top-button.svelte-18s8a4c.svelte-18s8a4c{position:absolute;right:var(--size-4);bottom:var(--size-4);width:var(--size-8);height:var(--size-8);border-radius:var(--table-radius);background:var(--color-accent);color:white;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:var(--text-lg);z-index:9;opacity:0.5}.scroll-top-button.svelte-18s8a4c.svelte-18s8a4c:hover{opacity:1}tr.svelte-18s8a4c.svelte-18s8a4c{border-bottom:1px solid var(--border-color-primary);text-align:left}",
  map: '{"version":3,"file":"Table.svelte","sources":["Table.svelte"],"sourcesContent":["<script lang=\\"ts\\" context=\\"module\\">import { create_dataframe_context } from \\"./context/table_context\\";\\nimport { create_keyboard_context } from \\"./context/keyboard_context\\";\\nimport { create_selection_context } from \\"./context/selection_context\\";\\n<\/script>\\n\\n<script lang=\\"ts\\">import { afterUpdate, createEventDispatcher, tick, onMount } from \\"svelte\\";\\nimport { dequal } from \\"dequal/lite\\";\\nimport { Upload } from \\"@gradio/upload\\";\\nimport EditableCell from \\"./EditableCell.svelte\\";\\nimport RowNumber from \\"./RowNumber.svelte\\";\\nimport TableHeader from \\"./TableHeader.svelte\\";\\nimport TableCell from \\"./TableCell.svelte\\";\\nimport EmptyRowButton from \\"./EmptyRowButton.svelte\\";\\nimport {} from \\"@gradio/client\\";\\nimport VirtualTable from \\"./VirtualTable.svelte\\";\\nimport CellMenu from \\"./CellMenu.svelte\\";\\nimport Toolbar from \\"./Toolbar.svelte\\";\\nimport { is_cell_selected, should_show_cell_menu, get_next_cell_coordinates, get_range_selection, move_cursor, get_current_indices, handle_click_outside as handle_click_outside_util, calculate_selection_positions } from \\"./selection_utils\\";\\nimport { copy_table_data, get_max, handle_file_upload } from \\"./utils/table_utils\\";\\nimport { make_headers, process_data } from \\"./utils/data_processing\\";\\nimport { handle_keydown } from \\"./utils/keyboard_utils\\";\\nimport { create_drag_handlers } from \\"./utils/drag_utils\\";\\nimport { sort_data_and_preserve_selection } from \\"./utils/sort_utils\\";\\nexport let datatype;\\nexport let label = null;\\nexport let show_label = true;\\nexport let headers = [];\\nexport let values = [];\\nexport let col_count;\\nexport let row_count;\\nexport let latex_delimiters;\\nexport let components = {};\\nexport let editable = true;\\nexport let wrap = false;\\nexport let root;\\nexport let i18n;\\nexport let max_height = 500;\\nexport let line_breaks = true;\\nexport let column_widths = [];\\nexport let show_row_numbers = false;\\nexport let upload;\\nexport let stream_handler;\\nexport let show_fullscreen_button = false;\\nexport let show_copy_button = false;\\nexport let value_is_output = false;\\nexport let max_chars = void 0;\\nexport let show_search = \\"none\\";\\nexport let pinned_columns = 0;\\nexport let static_columns = [];\\n$: actual_pinned_columns = pinned_columns && data?.[0]?.length ? Math.min(pinned_columns, data[0].length) : 0;\\nconst { state: df_state, actions: df_actions } = create_dataframe_context({\\n    show_fullscreen_button,\\n    show_copy_button,\\n    show_search,\\n    show_row_numbers,\\n    editable,\\n    pinned_columns,\\n    show_label,\\n    line_breaks,\\n    wrap,\\n    max_height,\\n    column_widths,\\n    max_chars\\n});\\n$: selected_cells = $df_state.ui_state.selected_cells;\\nlet previous_selected_cells = [];\\n$: {\\n    if (copy_flash && !dequal(selected_cells, previous_selected_cells)) {\\n        keyboard_ctx?.set_copy_flash(false);\\n    }\\n    previous_selected_cells = selected_cells;\\n}\\n$: selected = $df_state.ui_state.selected;\\nexport let display_value = null;\\nexport let styling = null;\\nlet els = {};\\nlet data_binding = {};\\nconst dispatch = createEventDispatcher();\\n$: editing = $df_state.ui_state.editing;\\nlet clear_on_focus = false;\\n$: header_edit = $df_state.ui_state.header_edit;\\n$: selected_header = $df_state.ui_state.selected_header;\\n$: active_cell_menu = $df_state.ui_state.active_cell_menu;\\n$: active_header_menu = $df_state.ui_state.active_header_menu;\\nlet is_fullscreen = false;\\nlet dragging = false;\\nlet copy_flash = false;\\nlet color_accent_copied;\\nonMount(() => {\\n    const color = getComputedStyle(document.documentElement).getPropertyValue(\\"--color-accent\\").trim();\\n    color_accent_copied = color + \\"40\\";\\n    document.documentElement.style.setProperty(\\"--color-accent-copied\\", color_accent_copied);\\n});\\nconst get_data_at = (row, col) => data?.[row]?.[col]?.value;\\nfunction make_id() {\\n    return Math.random().toString(36).substring(2, 15);\\n}\\nlet _headers = make_headers(headers, col_count, els, make_id);\\nlet old_headers = headers;\\n$: {\\n    if (!dequal(headers, old_headers)) {\\n        _headers = make_headers(headers, col_count, els, make_id);\\n        old_headers = JSON.parse(JSON.stringify(headers));\\n    }\\n}\\nlet data = [[]];\\nlet old_val = void 0;\\nlet search_results = [[]];\\n$: if (!dequal(values, old_val)) {\\n    if (parent) {\\n        const is_reset2 = values.length === 0 || values.length === 1 && values[0].length === 0;\\n        const is_different_structure2 = old_val !== void 0 && (values.length !== old_val.length || values[0] && old_val[0] && values[0].length !== old_val[0].length);\\n        if (is_reset2 || is_different_structure2) {\\n            for (let i = 0; i < 50; i++) {\\n                parent.style.removeProperty(`--cell-width-${i}`);\\n            }\\n            last_width_data_length = 0;\\n            last_width_column_count = 0;\\n        }\\n    }\\n    const is_reset = values.length === 0 || values.length === 1 && values[0].length === 0;\\n    const is_different_structure = old_val !== void 0 && (values.length !== old_val.length || values[0] && old_val[0] && values[0].length !== old_val[0].length);\\n    data = process_data(values, els, data_binding, make_id, display_value);\\n    old_val = JSON.parse(JSON.stringify(values));\\n    if (is_reset || is_different_structure) {\\n        df_actions.reset_sort_state();\\n    }\\n    else if ($df_state.sort_state.sort_columns.length > 0) {\\n        sort_data(data, display_value, styling);\\n    }\\n    if ($df_state.current_search_query) {\\n        df_actions.handle_search(null);\\n    }\\n    if (parent && cells.length > 0) {\\n        set_cell_widths();\\n    }\\n}\\n$: if ($df_state.current_search_query !== void 0) {\\n    const cell_map = /* @__PURE__ */ new Map();\\n    data.forEach((row, row_idx) => {\\n        row.forEach((cell, col_idx) => {\\n            cell_map.set(cell.id, {\\n                value: cell.value,\\n                styling: styling?.[row_idx]?.[col_idx] || \\"\\"\\n            });\\n        });\\n    });\\n    const filtered = df_actions.filter_data(data);\\n    search_results = filtered.map((row) => row.map((cell) => {\\n        const original = cell_map.get(cell.id);\\n        return {\\n            ...cell,\\n            display_value: original?.display_value || String(cell.value),\\n            styling: original?.styling || \\"\\"\\n        };\\n    }));\\n}\\nlet previous_headers = _headers.map((h) => h.value);\\nlet previous_data = data.map((row) => row.map((cell) => String(cell.value)));\\n$: {\\n    if (data || _headers) {\\n        df_actions.trigger_change(data, _headers, previous_data, previous_headers, value_is_output, dispatch);\\n        previous_data = data.map((row) => row.map((cell) => String(cell.value)));\\n        previous_headers = _headers.map((h) => h.value);\\n    }\\n}\\nfunction handle_sort(col, direction) {\\n    df_actions.handle_sort(col, direction);\\n    sort_data(data, display_value, styling);\\n}\\nfunction clear_sort() {\\n    df_actions.reset_sort_state();\\n    sort_data(data, display_value, styling);\\n}\\n$: {\\n    df_actions.sort_data(data, display_value, styling);\\n    df_actions.update_row_order(data);\\n}\\n$: {\\n    if ($df_state.sort_state.sort_columns) {\\n        if ($df_state.sort_state.sort_columns.length > 0) {\\n            sort_data(data, display_value, styling);\\n        }\\n    }\\n}\\nasync function edit_header(i, _select = false) {\\n    if (!editable || header_edit === i)\\n        return;\\n    if (!editable || col_count[1] !== \\"dynamic\\" || header_edit === i)\\n        return;\\n    df_actions.set_header_edit(i);\\n}\\nfunction handle_header_click(event, col) {\\n    if (event.target instanceof HTMLAnchorElement) {\\n        return;\\n    }\\n    event.preventDefault();\\n    event.stopPropagation();\\n    if (!editable)\\n        return;\\n    clear_on_focus = false;\\n    df_actions.set_editing(false);\\n    df_actions.handle_header_click(col, editable);\\n    parent.focus();\\n}\\nfunction end_header_edit(event) {\\n    if (!editable)\\n        return;\\n    df_actions.end_header_edit(event.detail.key);\\n    parent.focus();\\n}\\nasync function add_row(index) {\\n    parent.focus();\\n    if (row_count[1] !== \\"dynamic\\")\\n        return;\\n    const new_row = Array(data[0]?.length || headers.length).fill(0).map((_, i) => {\\n        const _id = make_id();\\n        els[_id] = { cell: null, input: null };\\n        return { id: _id, value: \\"\\" };\\n    });\\n    if (data.length === 0) {\\n        data = [new_row];\\n    }\\n    else if (index !== void 0 && index >= 0 && index <= data.length) {\\n        data.splice(index, 0, new_row);\\n    }\\n    else {\\n        data.push(new_row);\\n    }\\n    data = data;\\n    selected = [index !== void 0 ? index : data.length - 1, 0];\\n}\\nasync function add_col(index) {\\n    parent.focus();\\n    if (col_count[1] !== \\"dynamic\\")\\n        return;\\n    const result = df_actions.add_col(data, headers, make_id, index);\\n    result.data.forEach((row) => {\\n        row.forEach((cell) => {\\n            if (!els[cell.id]) {\\n                els[cell.id] = { cell: null, input: null };\\n            }\\n        });\\n    });\\n    data = result.data;\\n    headers = result.headers;\\n    await tick();\\n    requestAnimationFrame(() => {\\n        edit_header(index !== void 0 ? index : data[0].length - 1, true);\\n        const new_w = parent.querySelectorAll(\\"tbody\\")[1].offsetWidth;\\n        parent.querySelectorAll(\\"table\\")[1].scrollTo({ left: new_w });\\n    });\\n}\\nfunction handle_click_outside(event) {\\n    if (handle_click_outside_util(event, parent)) {\\n        df_actions.clear_ui_state();\\n        header_edit = false;\\n        selected_header = false;\\n    }\\n}\\n$: max = get_max(data);\\n$: cells[0] && cells[0]?.clientWidth && set_cell_widths();\\nlet cells = [];\\nlet parent;\\nlet table;\\nlet last_width_data_length = 0;\\nlet last_width_column_count = 0;\\nfunction set_cell_widths() {\\n    const column_count = data[0]?.length || 0;\\n    if (last_width_data_length === data.length && last_width_column_count === column_count && $df_state.sort_state.sort_columns.length > 0) {\\n        return;\\n    }\\n    last_width_data_length = data.length;\\n    last_width_column_count = column_count;\\n    const widths = cells.map((el) => el?.clientWidth || 0);\\n    if (widths.length === 0)\\n        return;\\n    if (show_row_numbers) {\\n        parent.style.setProperty(`--cell-width-row-number`, `${widths[0]}px`);\\n    }\\n    for (let i = 0; i < 50; i++) {\\n        if (!column_widths[i]) {\\n            parent.style.removeProperty(`--cell-width-${i}`);\\n        }\\n        else if (column_widths[i].endsWith(\\"%\\")) {\\n            const percentage = parseFloat(column_widths[i]);\\n            const pixel_width = Math.floor(percentage / 100 * parent.clientWidth);\\n            parent.style.setProperty(`--cell-width-${i}`, `${pixel_width}px`);\\n        }\\n        else {\\n            parent.style.setProperty(`--cell-width-${i}`, column_widths[i]);\\n        }\\n    }\\n    widths.forEach((width, i) => {\\n        if (!column_widths[i]) {\\n            const calculated_width = `${Math.max(width, 45)}px`;\\n            parent.style.setProperty(`--cell-width-${i}`, calculated_width);\\n        }\\n    });\\n}\\nfunction get_cell_width(index) {\\n    return `var(--cell-width-${index})`;\\n}\\nlet table_height = values.slice(0, max_height / values.length * 37).length * 37 + 37;\\nlet scrollbar_width = 0;\\nfunction sort_data(_data, _display_value, _styling) {\\n    const result = sort_data_and_preserve_selection(_data, _display_value, _styling, $df_state.sort_state.sort_columns, selected, get_current_indices);\\n    data = result.data;\\n    selected = result.selected;\\n}\\n$: sort_data(data, display_value, styling);\\n$: selected_index = !!selected && selected[0];\\nlet is_visible = false;\\nonMount(() => {\\n    const observer = new IntersectionObserver((entries) => {\\n        entries.forEach((entry) => {\\n            if (entry.isIntersecting && !is_visible) {\\n                set_cell_widths();\\n                data = data;\\n            }\\n            is_visible = entry.isIntersecting;\\n        });\\n    });\\n    observer.observe(parent);\\n    document.addEventListener(\\"click\\", handle_click_outside);\\n    window.addEventListener(\\"resize\\", handle_resize);\\n    document.addEventListener(\\"fullscreenchange\\", handle_fullscreen_change);\\n    return () => {\\n        observer.disconnect();\\n        document.removeEventListener(\\"click\\", handle_click_outside);\\n        window.removeEventListener(\\"resize\\", handle_resize);\\n        document.removeEventListener(\\"fullscreenchange\\", handle_fullscreen_change);\\n    };\\n});\\n$: keyboard_ctx = create_keyboard_context({\\n    selected_header,\\n    header_edit,\\n    editing,\\n    selected,\\n    selected_cells,\\n    editable,\\n    data,\\n    headers: _headers,\\n    els,\\n    df_actions,\\n    dispatch,\\n    add_row,\\n    get_next_cell_coordinates,\\n    get_range_selection,\\n    move_cursor,\\n    copy_flash,\\n    parent_element: parent,\\n    set_copy_flash: (value) => {\\n        copy_flash = value;\\n        if (value) {\\n            setTimeout(() => {\\n                copy_flash = false;\\n            }, 800);\\n        }\\n    }\\n});\\n$: selection_ctx = create_selection_context({\\n    df_actions,\\n    dispatch,\\n    data,\\n    els,\\n    editable,\\n    show_row_numbers,\\n    get_data_at,\\n    clear_on_focus,\\n    selected_cells,\\n    parent_element: parent\\n});\\nfunction handle_cell_click(event, row, col) {\\n    selection_ctx.actions.handle_cell_click(event, row, col);\\n}\\nfunction toggle_cell_menu(event, row, col) {\\n    selection_ctx.actions.toggle_cell_menu(event, row, col);\\n}\\nfunction handle_select_column(col) {\\n    selection_ctx.actions.handle_select_column(col);\\n}\\nfunction handle_select_row(row) {\\n    selection_ctx.actions.handle_select_row(row);\\n}\\nfunction toggle_fullscreen() {\\n    if (!document.fullscreenElement) {\\n        parent.requestFullscreen();\\n        is_fullscreen = true;\\n    }\\n    else {\\n        document.exitFullscreen();\\n        is_fullscreen = false;\\n    }\\n}\\nfunction handle_fullscreen_change() {\\n    is_fullscreen = !!document.fullscreenElement;\\n}\\nfunction toggle_header_menu(event, col) {\\n    event.stopPropagation();\\n    if (active_header_menu && active_header_menu.col === col) {\\n        df_actions.set_active_header_menu(null);\\n    }\\n    else {\\n        const header = event.target.closest(\\"th\\");\\n        if (header) {\\n            const rect = header.getBoundingClientRect();\\n            df_actions.set_active_header_menu({\\n                col,\\n                x: rect.right,\\n                y: rect.bottom\\n            });\\n        }\\n    }\\n}\\nafterUpdate(() => {\\n    value_is_output = false;\\n});\\nfunction delete_col_at(index) {\\n    if (col_count[1] !== \\"dynamic\\")\\n        return;\\n    if (data[0].length <= 1)\\n        return;\\n    const result = df_actions.delete_col_at(data, headers, index);\\n    data = result.data;\\n    headers = result.headers;\\n    _headers = make_headers(headers, col_count, els, make_id);\\n    df_actions.set_active_cell_menu(null);\\n    df_actions.set_active_header_menu(null);\\n    df_actions.set_selected(false);\\n    df_actions.set_selected_cells([]);\\n    df_actions.set_editing(false);\\n}\\nfunction delete_row_at(index) {\\n    data = df_actions.delete_row_at(data, index);\\n    df_actions.set_active_cell_menu(null);\\n    df_actions.set_active_header_menu(null);\\n}\\nlet coords;\\n$: if (selected !== false)\\n    coords = selected;\\n$: if (selected !== false) {\\n    const positions = calculate_selection_positions(selected, data, els, parent, table);\\n    document.documentElement.style.setProperty(\\"--selected-col-pos\\", positions.col_pos);\\n    document.documentElement.style.setProperty(\\"--selected-row-pos\\", positions.row_pos || \\"0px\\");\\n}\\nfunction commit_filter() {\\n    if ($df_state.current_search_query && show_search === \\"filter\\") {\\n        const filtered_data = [];\\n        const filtered_display_values = [];\\n        const filtered_styling = [];\\n        search_results.forEach((row) => {\\n            const data_row = [];\\n            const display_row = [];\\n            const styling_row = [];\\n            row.forEach((cell) => {\\n                data_row.push(cell.value);\\n                display_row.push(cell.display_value || String(cell.value));\\n                styling_row.push(cell.styling || \\"\\");\\n            });\\n            filtered_data.push(data_row);\\n            filtered_display_values.push(display_row);\\n            filtered_styling.push(styling_row);\\n        });\\n        const change_payload = {\\n            data: filtered_data,\\n            headers: _headers.map((h) => h.value),\\n            metadata: {\\n                display_value: filtered_display_values,\\n                styling: filtered_styling\\n            }\\n        };\\n        dispatch(\\"change\\", change_payload);\\n        if (!value_is_output) {\\n            dispatch(\\"input\\");\\n        }\\n        df_actions.handle_search(null);\\n    }\\n}\\nlet viewport;\\nlet show_scroll_button = false;\\nfunction scroll_to_top() {\\n    viewport.scrollTo({\\n        top: 0\\n    });\\n}\\nfunction handle_resize() {\\n    df_actions.set_active_cell_menu(null);\\n    df_actions.set_active_header_menu(null);\\n    selected_cells = [];\\n    selected = false;\\n    editing = false;\\n    set_cell_widths();\\n}\\nfunction add_row_at(index, position) {\\n    const row_index = position === \\"above\\" ? index : index + 1;\\n    add_row(row_index);\\n    active_cell_menu = null;\\n    active_header_menu = null;\\n}\\nfunction add_col_at(index, position) {\\n    const col_index = position === \\"left\\" ? index : index + 1;\\n    add_col(col_index);\\n    active_cell_menu = null;\\n    active_header_menu = null;\\n}\\nexport function reset_sort_state() {\\n    df_actions.reset_sort_state();\\n}\\nlet is_dragging = false;\\nlet drag_start = null;\\nlet mouse_down_pos = null;\\nconst drag_state = {\\n    is_dragging,\\n    drag_start,\\n    mouse_down_pos\\n};\\n$: {\\n    is_dragging = drag_state.is_dragging;\\n    drag_start = drag_state.drag_start;\\n    mouse_down_pos = drag_state.mouse_down_pos;\\n}\\nlet drag_handlers;\\nfunction init_drag_handlers() {\\n    drag_handlers = create_drag_handlers(drag_state, (value) => is_dragging = value, (cells2) => df_actions.set_selected_cells(cells2), (cell) => df_actions.set_selected(cell), (event, row, col) => selection_ctx.actions.handle_cell_click(event, row, col), show_row_numbers, parent);\\n}\\n$: if (parent)\\n    init_drag_handlers();\\n$: handle_mouse_down = drag_handlers?.handle_mouse_down || (() => {\\n});\\n$: handle_mouse_move = drag_handlers?.handle_mouse_move || (() => {\\n});\\n$: handle_mouse_up = drag_handlers?.handle_mouse_up || (() => {\\n});\\n<\/script>\\n\\n<svelte:window on:resize={() => set_cell_widths()} />\\n\\n<div class=\\"table-container\\">\\n\\t{#if (label && label.length !== 0 && show_label) || show_fullscreen_button || show_copy_button || show_search !== \\"none\\"}\\n\\t\\t<div class=\\"header-row\\">\\n\\t\\t\\t{#if label && label.length !== 0 && show_label}\\n\\t\\t\\t\\t<div class=\\"label\\">\\n\\t\\t\\t\\t\\t<p>{label}</p>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t{/if}\\n\\t\\t\\t<Toolbar\\n\\t\\t\\t\\t{show_fullscreen_button}\\n\\t\\t\\t\\t{is_fullscreen}\\n\\t\\t\\t\\ton:click={toggle_fullscreen}\\n\\t\\t\\t\\ton_copy={async () => await copy_table_data(data, null)}\\n\\t\\t\\t\\t{show_copy_button}\\n\\t\\t\\t\\t{show_search}\\n\\t\\t\\t\\ton:search={(e) => df_actions.handle_search(e.detail)}\\n\\t\\t\\t\\ton_commit_filter={commit_filter}\\n\\t\\t\\t\\tcurrent_search_query={$df_state.current_search_query}\\n\\t\\t\\t/>\\n\\t\\t</div>\\n\\t{/if}\\n\\t<div\\n\\t\\tbind:this={parent}\\n\\t\\tclass=\\"table-wrap\\"\\n\\t\\tclass:dragging={is_dragging}\\n\\t\\tclass:no-wrap={!wrap}\\n\\t\\tstyle=\\"height:{table_height}px;\\"\\n\\t\\tclass:menu-open={active_cell_menu || active_header_menu}\\n\\t\\ton:keydown={(e) => handle_keydown(e, keyboard_ctx)}\\n\\t\\ton:mousemove={handle_mouse_move}\\n\\t\\ton:mouseup={handle_mouse_up}\\n\\t\\ton:mouseleave={handle_mouse_up}\\n\\t\\trole=\\"grid\\"\\n\\t\\ttabindex=\\"0\\"\\n\\t>\\n\\t\\t<table bind:this={table}>\\n\\t\\t\\t{#if label && label.length !== 0}\\n\\t\\t\\t\\t<caption class=\\"sr-only\\">{label}</caption>\\n\\t\\t\\t{/if}\\n\\t\\t\\t<thead>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t{#if show_row_numbers}\\n\\t\\t\\t\\t\\t\\t<RowNumber is_header={true} />\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t{#each _headers as { value, id }, i (id)}\\n\\t\\t\\t\\t\\t\\t<TableHeader\\n\\t\\t\\t\\t\\t\\t\\tbind:value={_headers[i].value}\\n\\t\\t\\t\\t\\t\\t\\t{i}\\n\\t\\t\\t\\t\\t\\t\\t{actual_pinned_columns}\\n\\t\\t\\t\\t\\t\\t\\t{header_edit}\\n\\t\\t\\t\\t\\t\\t\\t{selected_header}\\n\\t\\t\\t\\t\\t\\t\\tget_sort_status={df_actions.get_sort_status}\\n\\t\\t\\t\\t\\t\\t\\t{headers}\\n\\t\\t\\t\\t\\t\\t\\t{get_cell_width}\\n\\t\\t\\t\\t\\t\\t\\t{handle_header_click}\\n\\t\\t\\t\\t\\t\\t\\t{toggle_header_menu}\\n\\t\\t\\t\\t\\t\\t\\t{end_header_edit}\\n\\t\\t\\t\\t\\t\\t\\tsort_columns={$df_state.sort_state.sort_columns}\\n\\t\\t\\t\\t\\t\\t\\t{latex_delimiters}\\n\\t\\t\\t\\t\\t\\t\\t{line_breaks}\\n\\t\\t\\t\\t\\t\\t\\t{max_chars}\\n\\t\\t\\t\\t\\t\\t\\t{root}\\n\\t\\t\\t\\t\\t\\t\\t{editable}\\n\\t\\t\\t\\t\\t\\t\\tis_static={static_columns.includes(i)}\\n\\t\\t\\t\\t\\t\\t\\t{i18n}\\n\\t\\t\\t\\t\\t\\t\\tbind:el={els[id].input}\\n\\t\\t\\t\\t\\t\\t\\t{col_count}\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t</thead>\\n\\t\\t\\t<tbody>\\n\\t\\t\\t\\t<tr>\\n\\t\\t\\t\\t\\t{#if show_row_numbers}\\n\\t\\t\\t\\t\\t\\t<RowNumber index={0} />\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t{#each max as { value, id }, j (id)}\\n\\t\\t\\t\\t\\t\\t<td tabindex=\\"-1\\" bind:this={cells[j]}>\\n\\t\\t\\t\\t\\t\\t\\t<div class=\\"cell-wrap\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t<EditableCell\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{value}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{latex_delimiters}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{line_breaks}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tdatatype={Array.isArray(datatype) ? datatype[j] : datatype}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tedit={false}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tel={null}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{root}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{editable}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{i18n}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tshow_selection_buttons={selected_cells.length === 1 &&\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tselected_cells[0][0] === 0 &&\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tselected_cells[0][1] === j}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tcoords={[0, j]}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\ton_select_column={handle_select_column}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\ton_select_row={handle_select_row}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{is_dragging}\\n\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t</td>\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t</tbody>\\n\\t\\t</table>\\n\\t\\t<Upload\\n\\t\\t\\t{upload}\\n\\t\\t\\t{stream_handler}\\n\\t\\t\\tflex={false}\\n\\t\\t\\tcenter={false}\\n\\t\\t\\tboundedheight={false}\\n\\t\\t\\tdisable_click={true}\\n\\t\\t\\t{root}\\n\\t\\t\\ton:load={({ detail }) =>\\n\\t\\t\\t\\thandle_file_upload(\\n\\t\\t\\t\\t\\tdetail.data,\\n\\t\\t\\t\\t\\t(head) => {\\n\\t\\t\\t\\t\\t\\t_headers = make_headers(\\n\\t\\t\\t\\t\\t\\t\\thead.map((h) => h ?? \\"\\"),\\n\\t\\t\\t\\t\\t\\t\\tcol_count,\\n\\t\\t\\t\\t\\t\\t\\tels,\\n\\t\\t\\t\\t\\t\\t\\tmake_id\\n\\t\\t\\t\\t\\t\\t);\\n\\t\\t\\t\\t\\t\\treturn _headers;\\n\\t\\t\\t\\t\\t},\\n\\t\\t\\t\\t\\t(vals) => {\\n\\t\\t\\t\\t\\t\\tvalues = vals;\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t)}\\n\\t\\t\\tbind:dragging\\n\\t\\t\\taria_label={i18n(\\"dataframe.drop_to_upload\\")}\\n\\t\\t>\\n\\t\\t\\t<div class=\\"table-wrap\\">\\n\\t\\t\\t\\t<VirtualTable\\n\\t\\t\\t\\t\\tbind:items={search_results}\\n\\t\\t\\t\\t\\t{max_height}\\n\\t\\t\\t\\t\\tbind:actual_height={table_height}\\n\\t\\t\\t\\t\\tbind:table_scrollbar_width={scrollbar_width}\\n\\t\\t\\t\\t\\tselected={selected_index}\\n\\t\\t\\t\\t\\tdisable_scroll={active_cell_menu !== null ||\\n\\t\\t\\t\\t\\t\\tactive_header_menu !== null}\\n\\t\\t\\t\\t\\tbind:viewport\\n\\t\\t\\t\\t\\tbind:show_scroll_button\\n\\t\\t\\t\\t\\ton:scroll_top={(_) => {}}\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t{#if label && label.length !== 0}\\n\\t\\t\\t\\t\\t\\t<caption class=\\"sr-only\\">{label}</caption>\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t<tr slot=\\"thead\\">\\n\\t\\t\\t\\t\\t\\t{#if show_row_numbers}\\n\\t\\t\\t\\t\\t\\t\\t<RowNumber is_header={true} />\\n\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t{#each _headers as { value, id }, i (id)}\\n\\t\\t\\t\\t\\t\\t\\t<TableHeader\\n\\t\\t\\t\\t\\t\\t\\t\\tbind:value={_headers[i].value}\\n\\t\\t\\t\\t\\t\\t\\t\\t{i}\\n\\t\\t\\t\\t\\t\\t\\t\\t{actual_pinned_columns}\\n\\t\\t\\t\\t\\t\\t\\t\\t{header_edit}\\n\\t\\t\\t\\t\\t\\t\\t\\t{selected_header}\\n\\t\\t\\t\\t\\t\\t\\t\\tget_sort_status={df_actions.get_sort_status}\\n\\t\\t\\t\\t\\t\\t\\t\\t{headers}\\n\\t\\t\\t\\t\\t\\t\\t\\t{get_cell_width}\\n\\t\\t\\t\\t\\t\\t\\t\\t{handle_header_click}\\n\\t\\t\\t\\t\\t\\t\\t\\t{toggle_header_menu}\\n\\t\\t\\t\\t\\t\\t\\t\\t{end_header_edit}\\n\\t\\t\\t\\t\\t\\t\\t\\tsort_columns={$df_state.sort_state.sort_columns}\\n\\t\\t\\t\\t\\t\\t\\t\\t{latex_delimiters}\\n\\t\\t\\t\\t\\t\\t\\t\\t{line_breaks}\\n\\t\\t\\t\\t\\t\\t\\t\\t{max_chars}\\n\\t\\t\\t\\t\\t\\t\\t\\t{root}\\n\\t\\t\\t\\t\\t\\t\\t\\t{editable}\\n\\t\\t\\t\\t\\t\\t\\t\\tis_static={static_columns.includes(i)}\\n\\t\\t\\t\\t\\t\\t\\t\\t{i18n}\\n\\t\\t\\t\\t\\t\\t\\t\\tbind:el={els[id].input}\\n\\t\\t\\t\\t\\t\\t\\t\\t{col_count}\\n\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t\\t<tr slot=\\"tbody\\" let:item let:index class:row-odd={index % 2 === 0}>\\n\\t\\t\\t\\t\\t\\t{#if show_row_numbers}\\n\\t\\t\\t\\t\\t\\t\\t<RowNumber {index} />\\n\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t{#each item as { value, id }, j (id)}\\n\\t\\t\\t\\t\\t\\t\\t<TableCell\\n\\t\\t\\t\\t\\t\\t\\t\\tbind:value={search_results[index][j].value}\\n\\t\\t\\t\\t\\t\\t\\t\\t{index}\\n\\t\\t\\t\\t\\t\\t\\t\\t{j}\\n\\t\\t\\t\\t\\t\\t\\t\\t{actual_pinned_columns}\\n\\t\\t\\t\\t\\t\\t\\t\\t{get_cell_width}\\n\\t\\t\\t\\t\\t\\t\\t\\thandle_cell_click={(e, r, c) => handle_mouse_down(e, r, c)}\\n\\t\\t\\t\\t\\t\\t\\t\\t{toggle_cell_menu}\\n\\t\\t\\t\\t\\t\\t\\t\\t{is_cell_selected}\\n\\t\\t\\t\\t\\t\\t\\t\\t{should_show_cell_menu}\\n\\t\\t\\t\\t\\t\\t\\t\\t{selected_cells}\\n\\t\\t\\t\\t\\t\\t\\t\\t{copy_flash}\\n\\t\\t\\t\\t\\t\\t\\t\\t{active_cell_menu}\\n\\t\\t\\t\\t\\t\\t\\t\\tstyling={search_results[index][j].styling}\\n\\t\\t\\t\\t\\t\\t\\t\\t{latex_delimiters}\\n\\t\\t\\t\\t\\t\\t\\t\\t{line_breaks}\\n\\t\\t\\t\\t\\t\\t\\t\\tdatatype={Array.isArray(datatype) ? datatype[j] : datatype}\\n\\t\\t\\t\\t\\t\\t\\t\\t{editing}\\n\\t\\t\\t\\t\\t\\t\\t\\t{clear_on_focus}\\n\\t\\t\\t\\t\\t\\t\\t\\t{max_chars}\\n\\t\\t\\t\\t\\t\\t\\t\\t{root}\\n\\t\\t\\t\\t\\t\\t\\t\\t{editable}\\n\\t\\t\\t\\t\\t\\t\\t\\tis_static={static_columns.includes(j)}\\n\\t\\t\\t\\t\\t\\t\\t\\t{i18n}\\n\\t\\t\\t\\t\\t\\t\\t\\t{components}\\n\\t\\t\\t\\t\\t\\t\\t\\t{handle_select_column}\\n\\t\\t\\t\\t\\t\\t\\t\\t{handle_select_row}\\n\\t\\t\\t\\t\\t\\t\\t\\tbind:el={els[id]}\\n\\t\\t\\t\\t\\t\\t\\t\\t{is_dragging}\\n\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t</VirtualTable>\\n\\t\\t\\t</div>\\n\\t\\t</Upload>\\n\\t\\t{#if show_scroll_button}\\n\\t\\t\\t<button class=\\"scroll-top-button\\" on:click={scroll_to_top}>\\n\\t\\t\\t\\t&uarr;\\n\\t\\t\\t</button>\\n\\t\\t{/if}\\n\\t</div>\\n</div>\\n{#if data.length === 0 && editable && row_count[1] === \\"dynamic\\"}\\n\\t<EmptyRowButton on_click={() => add_row()} />\\n{/if}\\n\\n{#if active_cell_menu || active_header_menu}\\n\\t<CellMenu\\n\\t\\tx={active_cell_menu?.x ?? active_header_menu?.x ?? 0}\\n\\t\\ty={active_cell_menu?.y ?? active_header_menu?.y ?? 0}\\n\\t\\trow={active_header_menu ? -1 : active_cell_menu?.row ?? 0}\\n\\t\\t{col_count}\\n\\t\\t{row_count}\\n\\t\\ton_add_row_above={() => add_row_at(active_cell_menu?.row ?? -1, \\"above\\")}\\n\\t\\ton_add_row_below={() => add_row_at(active_cell_menu?.row ?? -1, \\"below\\")}\\n\\t\\ton_add_column_left={() =>\\n\\t\\t\\tadd_col_at(\\n\\t\\t\\t\\tactive_cell_menu?.col ?? active_header_menu?.col ?? -1,\\n\\t\\t\\t\\t\\"left\\"\\n\\t\\t\\t)}\\n\\t\\ton_add_column_right={() =>\\n\\t\\t\\tadd_col_at(\\n\\t\\t\\t\\tactive_cell_menu?.col ?? active_header_menu?.col ?? -1,\\n\\t\\t\\t\\t\\"right\\"\\n\\t\\t\\t)}\\n\\t\\ton_delete_row={() => delete_row_at(active_cell_menu?.row ?? -1)}\\n\\t\\ton_delete_col={() =>\\n\\t\\t\\tdelete_col_at(active_cell_menu?.col ?? active_header_menu?.col ?? -1)}\\n\\t\\t{editable}\\n\\t\\tcan_delete_rows={!active_header_menu && data.length > 1 && editable}\\n\\t\\tcan_delete_cols={data.length > 0 && data[0]?.length > 1 && editable}\\n\\t\\t{i18n}\\n\\t\\ton_sort={active_header_menu\\n\\t\\t\\t? (direction) => {\\n\\t\\t\\t\\t\\tif (active_header_menu) {\\n\\t\\t\\t\\t\\t\\thandle_sort(active_header_menu.col, direction);\\n\\t\\t\\t\\t\\t\\tdf_actions.set_active_header_menu(null);\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}\\n\\t\\t\\t: undefined}\\n\\t\\ton_clear_sort={active_header_menu\\n\\t\\t\\t? () => {\\n\\t\\t\\t\\t\\tclear_sort();\\n\\t\\t\\t\\t\\tdf_actions.set_active_header_menu(null);\\n\\t\\t\\t\\t}\\n\\t\\t\\t: undefined}\\n\\t\\tsort_direction={active_header_menu\\n\\t\\t\\t? $df_state.sort_state.sort_columns.find(\\n\\t\\t\\t\\t\\t(item) => item.col === (active_header_menu?.col ?? -1)\\n\\t\\t\\t\\t)?.direction ?? null\\n\\t\\t\\t: null}\\n\\t\\tsort_priority={active_header_menu\\n\\t\\t\\t? $df_state.sort_state.sort_columns.findIndex(\\n\\t\\t\\t\\t\\t(item) => item.col === (active_header_menu?.col ?? -1)\\n\\t\\t\\t\\t) + 1 || null\\n\\t\\t\\t: null}\\n\\t/>\\n{/if}\\n\\n<style>\\n\\t.table-container {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tgap: var(--size-2);\\n\\t\\tposition: relative;\\n\\t}\\n\\n\\t.table-wrap {\\n\\t\\tposition: relative;\\n\\t\\ttransition: 150ms;\\n\\t}\\n\\n\\t.table-wrap.menu-open {\\n\\t\\toverflow: hidden;\\n\\t}\\n\\n\\t.table-wrap:focus-within {\\n\\t\\toutline: none;\\n\\t}\\n\\n\\t.table-wrap.dragging {\\n\\t\\tcursor: crosshair !important;\\n\\t\\tuser-select: none;\\n\\t}\\n\\n\\t.table-wrap.dragging * {\\n\\t\\tcursor: crosshair !important;\\n\\t\\tuser-select: none;\\n\\t}\\n\\n\\t.table-wrap > :global(button) {\\n\\t\\tborder: 1px solid var(--border-color-primary);\\n\\t\\tborder-radius: var(--table-radius);\\n\\t\\toverflow: hidden;\\n\\t}\\n\\n\\ttable {\\n\\t\\tposition: absolute;\\n\\t\\topacity: 0;\\n\\t\\tz-index: -1;\\n\\t\\ttransition: 150ms;\\n\\t\\twidth: var(--size-full);\\n\\t\\ttable-layout: auto;\\n\\t\\tcolor: var(--body-text-color);\\n\\t\\tfont-size: var(--input-text-size);\\n\\t\\tline-height: var(--line-md);\\n\\t\\tfont-family: var(--font-mono);\\n\\t\\tborder-spacing: 0;\\n\\t\\tborder-collapse: separate;\\n\\t}\\n\\n\\tthead {\\n\\t\\tposition: sticky;\\n\\t\\ttop: 0;\\n\\t\\tz-index: 5;\\n\\t\\tbox-shadow: var(--shadow-drop);\\n\\t}\\n\\n\\tthead :global(th.pinned-column) {\\n\\t\\tposition: sticky;\\n\\t\\tz-index: 6;\\n\\t\\tbackground: var(--table-even-background-fill) !important;\\n\\t}\\n\\n\\t.dragging {\\n\\t\\tborder-color: var(--color-accent);\\n\\t}\\n\\n\\t.no-wrap {\\n\\t\\twhite-space: nowrap;\\n\\t}\\n\\n\\tdiv:not(.no-wrap) td {\\n\\t\\toverflow-wrap: anywhere;\\n\\t}\\n\\n\\tdiv.no-wrap td {\\n\\t\\toverflow-x: hidden;\\n\\t}\\n\\n\\t.row-odd {\\n\\t\\tbackground: var(--table-odd-background-fill);\\n\\t}\\n\\n\\t.header-row {\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: flex-end;\\n\\t\\talign-items: center;\\n\\t\\tgap: var(--size-2);\\n\\t\\tmin-height: var(--size-6);\\n\\t\\tflex-wrap: nowrap;\\n\\t\\twidth: 100%;\\n\\t}\\n\\n\\t.header-row .label {\\n\\t\\tflex: 1 1 auto;\\n\\t\\tmargin-right: auto;\\n\\t}\\n\\n\\t.header-row .label p {\\n\\t\\tmargin: 0;\\n\\t\\tcolor: var(--block-label-text-color);\\n\\t\\tfont-size: var(--block-label-text-size);\\n\\t\\tline-height: var(--line-sm);\\n\\t\\tposition: relative;\\n\\t\\tz-index: 4;\\n\\t}\\n\\n\\t.scroll-top-button {\\n\\t\\tposition: absolute;\\n\\t\\tright: var(--size-4);\\n\\t\\tbottom: var(--size-4);\\n\\t\\twidth: var(--size-8);\\n\\t\\theight: var(--size-8);\\n\\t\\tborder-radius: var(--table-radius);\\n\\t\\tbackground: var(--color-accent);\\n\\t\\tcolor: white;\\n\\t\\tborder: none;\\n\\t\\tcursor: pointer;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t\\tfont-size: var(--text-lg);\\n\\t\\tz-index: 9;\\n\\t\\topacity: 0.5;\\n\\t}\\n\\n\\t.scroll-top-button:hover {\\n\\t\\topacity: 1;\\n\\t}\\n\\n\\ttr {\\n\\t\\tborder-bottom: 1px solid var(--border-color-primary);\\n\\t\\ttext-align: left;\\n\\t}</style>\\n"],"names":[],"mappings":"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"}'
};
function make_id() {
  return Math.random().toString(36).substring(2, 15);
}
function get_cell_width(index) {
  return `var(--cell-width-${index})`;
}
const Table = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let $df_state, $$unsubscribe_df_state;
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
  $$unsubscribe_df_state = subscribe(df_state, (value) => $df_state = value);
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
  const get_data_at = (row, col) => data?.[row]?.[col]?.value;
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
    clear_on_focus = false;
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
    parent.focus();
    if (row_count[1] !== "dynamic")
      return;
    const new_row = Array(data[0]?.length || headers.length).fill(0).map((_, i) => {
      const _id = make_id();
      els[_id] = { cell: null, input: null };
      return { id: _id, value: "" };
    });
    if (data.length === 0) {
      data = [new_row];
    } else if (index !== void 0 && index >= 0 && index <= data.length) {
      data.splice(index, 0, new_row);
    } else {
      data.push(new_row);
    }
    data = data;
    selected = [index !== void 0 ? index : data.length - 1, 0];
  }
  async function add_col(index) {
    parent.focus();
    if (col_count[1] !== "dynamic")
      return;
    const result = df_actions.add_col(data, headers, make_id, index);
    result.data.forEach((row) => {
      row.forEach((cell) => {
        if (!els[cell.id]) {
          els[cell.id] = { cell: null, input: null };
        }
      });
    });
    data = result.data;
    headers = result.headers;
    await tick();
    requestAnimationFrame(() => {
      edit_header(index !== void 0 ? index : data[0].length - 1, true);
      const new_w = parent.querySelectorAll("tbody")[1].offsetWidth;
      parent.querySelectorAll("table")[1].scrollTo({ left: new_w });
    });
  }
  let cells = [];
  let parent;
  let table;
  let table_height = values.slice(0, max_height / values.length * 37).length * 37 + 37;
  let scrollbar_width = 0;
  function sort_data2(_data, _display_value, _styling) {
    const result = sort_data_and_preserve_selection(_data, _display_value, _styling, $df_state.sort_state.sort_columns, selected, get_current_indices);
    data = result.data;
    selected = result.selected;
  }
  function toggle_cell_menu(event, row, col) {
    selection_ctx.actions.toggle_cell_menu(event, row, col);
  }
  function handle_select_column(col) {
    selection_ctx.actions.handle_select_column(col);
  }
  function handle_select_row(row) {
    selection_ctx.actions.handle_select_row(row);
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
  function delete_col_at(index) {
    if (col_count[1] !== "dynamic")
      return;
    if (data[0].length <= 1)
      return;
    const result = df_actions.delete_col_at(data, headers, index);
    data = result.data;
    headers = result.headers;
    _headers = make_headers(headers, col_count, els, make_id);
    df_actions.set_active_cell_menu(null);
    df_actions.set_active_header_menu(null);
    df_actions.set_selected(false);
    df_actions.set_selected_cells([]);
    df_actions.set_editing(false);
  }
  function delete_row_at(index) {
    data = df_actions.delete_row_at(data, index);
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
  function add_row_at(index, position) {
    const row_index = position === "above" ? index : index + 1;
    add_row(row_index);
    active_cell_menu = null;
    active_header_menu = null;
  }
  function add_col_at(index, position) {
    const col_index = position === "left" ? index : index + 1;
    add_col(col_index);
    active_cell_menu = null;
    active_header_menu = null;
  }
  function reset_sort_state() {
    df_actions.reset_sort_state();
  }
  let is_dragging = false;
  let drag_start = null;
  let mouse_down_pos = null;
  const drag_state = { is_dragging, drag_start, mouse_down_pos };
  if ($$props.datatype === void 0 && $$bindings.datatype && datatype !== void 0)
    $$bindings.datatype(datatype);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.show_label === void 0 && $$bindings.show_label && show_label !== void 0)
    $$bindings.show_label(show_label);
  if ($$props.headers === void 0 && $$bindings.headers && headers !== void 0)
    $$bindings.headers(headers);
  if ($$props.values === void 0 && $$bindings.values && values !== void 0)
    $$bindings.values(values);
  if ($$props.col_count === void 0 && $$bindings.col_count && col_count !== void 0)
    $$bindings.col_count(col_count);
  if ($$props.row_count === void 0 && $$bindings.row_count && row_count !== void 0)
    $$bindings.row_count(row_count);
  if ($$props.latex_delimiters === void 0 && $$bindings.latex_delimiters && latex_delimiters !== void 0)
    $$bindings.latex_delimiters(latex_delimiters);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.editable === void 0 && $$bindings.editable && editable !== void 0)
    $$bindings.editable(editable);
  if ($$props.wrap === void 0 && $$bindings.wrap && wrap !== void 0)
    $$bindings.wrap(wrap);
  if ($$props.root === void 0 && $$bindings.root && root !== void 0)
    $$bindings.root(root);
  if ($$props.i18n === void 0 && $$bindings.i18n && i18n !== void 0)
    $$bindings.i18n(i18n);
  if ($$props.max_height === void 0 && $$bindings.max_height && max_height !== void 0)
    $$bindings.max_height(max_height);
  if ($$props.line_breaks === void 0 && $$bindings.line_breaks && line_breaks !== void 0)
    $$bindings.line_breaks(line_breaks);
  if ($$props.column_widths === void 0 && $$bindings.column_widths && column_widths !== void 0)
    $$bindings.column_widths(column_widths);
  if ($$props.show_row_numbers === void 0 && $$bindings.show_row_numbers && show_row_numbers !== void 0)
    $$bindings.show_row_numbers(show_row_numbers);
  if ($$props.upload === void 0 && $$bindings.upload && upload !== void 0)
    $$bindings.upload(upload);
  if ($$props.stream_handler === void 0 && $$bindings.stream_handler && stream_handler !== void 0)
    $$bindings.stream_handler(stream_handler);
  if ($$props.show_fullscreen_button === void 0 && $$bindings.show_fullscreen_button && show_fullscreen_button !== void 0)
    $$bindings.show_fullscreen_button(show_fullscreen_button);
  if ($$props.show_copy_button === void 0 && $$bindings.show_copy_button && show_copy_button !== void 0)
    $$bindings.show_copy_button(show_copy_button);
  if ($$props.value_is_output === void 0 && $$bindings.value_is_output && value_is_output !== void 0)
    $$bindings.value_is_output(value_is_output);
  if ($$props.max_chars === void 0 && $$bindings.max_chars && max_chars !== void 0)
    $$bindings.max_chars(max_chars);
  if ($$props.show_search === void 0 && $$bindings.show_search && show_search !== void 0)
    $$bindings.show_search(show_search);
  if ($$props.pinned_columns === void 0 && $$bindings.pinned_columns && pinned_columns !== void 0)
    $$bindings.pinned_columns(pinned_columns);
  if ($$props.static_columns === void 0 && $$bindings.static_columns && static_columns !== void 0)
    $$bindings.static_columns(static_columns);
  if ($$props.display_value === void 0 && $$bindings.display_value && display_value !== void 0)
    $$bindings.display_value(display_value);
  if ($$props.styling === void 0 && $$bindings.styling && styling !== void 0)
    $$bindings.styling(styling);
  if ($$props.reset_sort_state === void 0 && $$bindings.reset_sort_state && reset_sort_state !== void 0)
    $$bindings.reset_sort_state(reset_sort_state);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (!dequal(values, old_val)) {
        const is_reset = values.length === 0 || values.length === 1 && values[0].length === 0;
        const is_different_structure = old_val !== void 0 && (values.length !== old_val.length || values[0] && old_val[0] && values[0].length !== old_val[0].length);
        data = process_data(values, els, data_binding, make_id, display_value);
        old_val = JSON.parse(JSON.stringify(values));
        if (is_reset || is_different_structure) {
          df_actions.reset_sort_state();
        } else if ($df_state.sort_state.sort_columns.length > 0) {
          sort_data2(data, display_value, styling);
        }
        if ($df_state.current_search_query) {
          df_actions.handle_search(null);
        }
      }
    }
    actual_pinned_columns = pinned_columns && data?.[0]?.length ? Math.min(pinned_columns, data[0].length) : 0;
    selected_cells = $df_state.ui_state.selected_cells;
    selected_header = $df_state.ui_state.selected_header;
    header_edit = $df_state.ui_state.header_edit;
    editing = $df_state.ui_state.editing;
    selected = $df_state.ui_state.selected;
    {
      {
        if (!dequal(headers, old_headers)) {
          _headers = make_headers(headers, col_count, els, make_id);
          old_headers = JSON.parse(JSON.stringify(headers));
        }
      }
    }
    keyboard_ctx = create_keyboard_context({
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
        copy_flash = value;
        if (value) {
          setTimeout(
            () => {
              copy_flash = false;
            },
            800
          );
        }
      }
    });
    {
      {
        if (copy_flash && !dequal(selected_cells, previous_selected_cells)) {
          keyboard_ctx?.set_copy_flash(false);
        }
        previous_selected_cells = selected_cells;
      }
    }
    active_cell_menu = $df_state.ui_state.active_cell_menu;
    active_header_menu = $df_state.ui_state.active_header_menu;
    {
      if ($df_state.current_search_query !== void 0) {
        const cell_map = /* @__PURE__ */ new Map();
        data.forEach((row, row_idx) => {
          row.forEach((cell, col_idx) => {
            cell_map.set(cell.id, {
              value: cell.value,
              styling: styling?.[row_idx]?.[col_idx] || ""
            });
          });
        });
        const filtered = df_actions.filter_data(data);
        search_results = filtered.map((row) => row.map((cell) => {
          const original = cell_map.get(cell.id);
          return {
            ...cell,
            display_value: original?.display_value || String(cell.value),
            styling: original?.styling || ""
          };
        }));
      }
    }
    {
      {
        if (data || _headers) {
          df_actions.trigger_change(data, _headers, previous_data, previous_headers, value_is_output, dispatch);
          previous_data = data.map((row) => row.map((cell) => String(cell.value)));
          previous_headers = _headers.map((h) => h.value);
        }
      }
    }
    {
      {
        df_actions.sort_data(data, display_value, styling);
        df_actions.update_row_order(data);
      }
    }
    {
      {
        if ($df_state.sort_state.sort_columns) {
          if ($df_state.sort_state.sort_columns.length > 0) {
            sort_data2(data, display_value, styling);
          }
        }
      }
    }
    max = get_max(data);
    {
      sort_data2(data, display_value, styling);
    }
    selected_index = !!selected && selected[0];
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
    {
      if (selected !== false) {
        const positions = calculate_selection_positions(selected, data, els, parent, table);
        document.documentElement.style.setProperty("--selected-col-pos", positions.col_pos);
        document.documentElement.style.setProperty("--selected-row-pos", positions.row_pos || "0px");
      }
    }
    {
      {
        is_dragging = drag_state.is_dragging;
        drag_start = drag_state.drag_start;
        mouse_down_pos = drag_state.mouse_down_pos;
      }
    }
    handle_mouse_down = () => {
    };
    $$rendered = ` <div class="table-container svelte-18s8a4c">${label && label.length !== 0 && show_label || show_fullscreen_button || show_copy_button || show_search !== "none" ? `<div class="header-row svelte-18s8a4c">${label && label.length !== 0 && show_label ? `<div class="label svelte-18s8a4c"><p class="svelte-18s8a4c">${escape(label)}</p></div>` : ``} ${validate_component(Toolbar, "Toolbar").$$render(
      $$result,
      {
        show_fullscreen_button,
        is_fullscreen,
        on_copy: async () => await copy_table_data(data),
        show_copy_button,
        show_search,
        on_commit_filter: commit_filter,
        current_search_query: $df_state.current_search_query
      },
      {},
      {}
    )}</div>` : ``} <div class="${[
      "table-wrap svelte-18s8a4c",
      (is_dragging ? "dragging" : "") + " " + (!wrap ? "no-wrap" : "") + " " + (active_cell_menu || active_header_menu ? "menu-open" : "")
    ].join(" ").trim()}" style="${"height:" + escape(table_height, true) + "px;"}" role="grid" tabindex="0"${add_attribute("this", parent, 0)}><table class="svelte-18s8a4c"${add_attribute("this", table, 0)}>${label && label.length !== 0 ? `<caption class="sr-only svelte-18s8a4c">${escape(label)}</caption>` : ``} <thead class="svelte-18s8a4c"><tr class="svelte-18s8a4c">${show_row_numbers ? `${validate_component(RowNumber, "RowNumber").$$render($$result, { is_header: true }, {}, {})}` : ``} ${each(_headers, ({ value, id }, i) => {
      return `${validate_component(TableHeader, "TableHeader").$$render(
        $$result,
        {
          i,
          actual_pinned_columns,
          header_edit,
          selected_header,
          get_sort_status: df_actions.get_sort_status,
          headers,
          get_cell_width,
          handle_header_click,
          toggle_header_menu,
          end_header_edit,
          sort_columns: $df_state.sort_state.sort_columns,
          latex_delimiters,
          line_breaks,
          max_chars,
          root,
          editable,
          is_static: static_columns.includes(i),
          i18n,
          col_count,
          value: _headers[i].value,
          el: els[id].input
        },
        {
          value: ($$value) => {
            _headers[i].value = $$value;
            $$settled = false;
          },
          el: ($$value) => {
            els[id].input = $$value;
            $$settled = false;
          }
        },
        {}
      )}`;
    })}</tr></thead> <tbody class="svelte-18s8a4c"><tr class="svelte-18s8a4c">${show_row_numbers ? `${validate_component(RowNumber, "RowNumber").$$render($$result, { index: 0 }, {}, {})}` : ``} ${each(max, ({ value, id }, j) => {
      return `<td tabindex="-1" class="svelte-18s8a4c"${add_attribute("this", cells[j], 0)}><div class="cell-wrap svelte-18s8a4c">${validate_component(EditableCell, "EditableCell").$$render(
        $$result,
        {
          value,
          latex_delimiters,
          line_breaks,
          datatype: Array.isArray(datatype) ? datatype[j] : datatype,
          edit: false,
          el: null,
          root,
          editable,
          i18n,
          show_selection_buttons: selected_cells.length === 1 && selected_cells[0][0] === 0 && selected_cells[0][1] === j,
          coords: [0, j],
          on_select_column: handle_select_column,
          on_select_row: handle_select_row,
          is_dragging
        },
        {},
        {}
      )}</div> </td>`;
    })}</tr></tbody></table> ${validate_component(Upload, "Upload").$$render(
      $$result,
      {
        upload,
        stream_handler,
        flex: false,
        center: false,
        boundedheight: false,
        disable_click: true,
        root,
        aria_label: i18n("dataframe.drop_to_upload"),
        dragging
      },
      {
        dragging: ($$value) => {
          dragging = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="table-wrap svelte-18s8a4c">${validate_component(VirtualTable, "VirtualTable").$$render(
            $$result,
            {
              max_height,
              selected: selected_index,
              disable_scroll: active_cell_menu !== null || active_header_menu !== null,
              items: search_results,
              actual_height: table_height,
              table_scrollbar_width: scrollbar_width,
              viewport,
              show_scroll_button
            },
            {
              items: ($$value) => {
                search_results = $$value;
                $$settled = false;
              },
              actual_height: ($$value) => {
                table_height = $$value;
                $$settled = false;
              },
              table_scrollbar_width: ($$value) => {
                scrollbar_width = $$value;
                $$settled = false;
              },
              viewport: ($$value) => {
                viewport = $$value;
                $$settled = false;
              },
              show_scroll_button: ($$value) => {
                show_scroll_button = $$value;
                $$settled = false;
              }
            },
            {
              tbody: ({ index, item }) => {
                return `<tr slot="tbody" class="${["svelte-18s8a4c", index % 2 === 0 ? "row-odd" : ""].join(" ").trim()}">${show_row_numbers ? `${validate_component(RowNumber, "RowNumber").$$render($$result, { index }, {}, {})}` : ``} ${each(item, ({ value, id }, j) => {
                  return `${validate_component(TableCell, "TableCell").$$render(
                    $$result,
                    {
                      index,
                      j,
                      actual_pinned_columns,
                      get_cell_width,
                      handle_cell_click: (e, r, c) => handle_mouse_down(e, r, c),
                      toggle_cell_menu,
                      is_cell_selected,
                      should_show_cell_menu,
                      selected_cells,
                      copy_flash,
                      active_cell_menu,
                      styling: search_results[index][j].styling,
                      latex_delimiters,
                      line_breaks,
                      datatype: Array.isArray(datatype) ? datatype[j] : datatype,
                      editing,
                      clear_on_focus,
                      max_chars,
                      root,
                      editable,
                      is_static: static_columns.includes(j),
                      i18n,
                      components,
                      handle_select_column,
                      handle_select_row,
                      is_dragging,
                      value: search_results[index][j].value,
                      el: els[id]
                    },
                    {
                      value: ($$value) => {
                        search_results[index][j].value = $$value;
                        $$settled = false;
                      },
                      el: ($$value) => {
                        els[id] = $$value;
                        $$settled = false;
                      }
                    },
                    {}
                  )}`;
                })}</tr>`;
              },
              thead: () => {
                return `<tr slot="thead" class="svelte-18s8a4c">${show_row_numbers ? `${validate_component(RowNumber, "RowNumber").$$render($$result, { is_header: true }, {}, {})}` : ``} ${each(_headers, ({ value, id }, i) => {
                  return `${validate_component(TableHeader, "TableHeader").$$render(
                    $$result,
                    {
                      i,
                      actual_pinned_columns,
                      header_edit,
                      selected_header,
                      get_sort_status: df_actions.get_sort_status,
                      headers,
                      get_cell_width,
                      handle_header_click,
                      toggle_header_menu,
                      end_header_edit,
                      sort_columns: $df_state.sort_state.sort_columns,
                      latex_delimiters,
                      line_breaks,
                      max_chars,
                      root,
                      editable,
                      is_static: static_columns.includes(i),
                      i18n,
                      col_count,
                      value: _headers[i].value,
                      el: els[id].input
                    },
                    {
                      value: ($$value) => {
                        _headers[i].value = $$value;
                        $$settled = false;
                      },
                      el: ($$value) => {
                        els[id].input = $$value;
                        $$settled = false;
                      }
                    },
                    {}
                  )}`;
                })}</tr>`;
              },
              default: () => {
                return `${label && label.length !== 0 ? `<caption class="sr-only svelte-18s8a4c">${escape(label)}</caption>` : ``}`;
              }
            }
          )}</div>`;
        }
      }
    )} ${show_scroll_button ? `<button class="scroll-top-button svelte-18s8a4c" data-svelte-h="svelte-oaisf6">↑</button>` : ``}</div></div> ${data.length === 0 && editable && row_count[1] === "dynamic" ? `${validate_component(EmptyRowButton, "EmptyRowButton").$$render($$result, { on_click: () => add_row() }, {}, {})}` : ``} ${active_cell_menu || active_header_menu ? `${validate_component(CellMenu, "CellMenu").$$render(
      $$result,
      {
        x: active_cell_menu?.x ?? active_header_menu?.x ?? 0,
        y: active_cell_menu?.y ?? active_header_menu?.y ?? 0,
        row: active_header_menu ? -1 : active_cell_menu?.row ?? 0,
        col_count,
        row_count,
        on_add_row_above: () => add_row_at(active_cell_menu?.row ?? -1, "above"),
        on_add_row_below: () => add_row_at(active_cell_menu?.row ?? -1, "below"),
        on_add_column_left: () => add_col_at(active_cell_menu?.col ?? active_header_menu?.col ?? -1, "left"),
        on_add_column_right: () => add_col_at(active_cell_menu?.col ?? active_header_menu?.col ?? -1, "right"),
        on_delete_row: () => delete_row_at(active_cell_menu?.row ?? -1),
        on_delete_col: () => delete_col_at(active_cell_menu?.col ?? active_header_menu?.col ?? -1),
        editable,
        can_delete_rows: !active_header_menu && data.length > 1 && editable,
        can_delete_cols: data.length > 0 && data[0]?.length > 1 && editable,
        i18n,
        on_sort: active_header_menu ? (direction) => {
          if (active_header_menu) {
            handle_sort(active_header_menu.col, direction);
            df_actions.set_active_header_menu(null);
          }
        } : void 0,
        on_clear_sort: active_header_menu ? () => {
          clear_sort();
          df_actions.set_active_header_menu(null);
        } : void 0,
        sort_direction: active_header_menu ? $df_state.sort_state.sort_columns.find((item) => item.col === (active_header_menu?.col ?? -1))?.direction ?? null : null,
        sort_priority: active_header_menu ? $df_state.sort_state.sort_columns.findIndex((item) => item.col === (active_header_menu?.col ?? -1)) + 1 || null : null
      },
      {},
      {}
    )}` : ``}`;
  } while (!$$settled);
  $$unsubscribe_df_state();
  return $$rendered;
});
const Table$1 = Table;
const Index = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  if ($$props.headers === void 0 && $$bindings.headers && headers !== void 0)
    $$bindings.headers(headers);
  if ($$props.elem_id === void 0 && $$bindings.elem_id && elem_id !== void 0)
    $$bindings.elem_id(elem_id);
  if ($$props.elem_classes === void 0 && $$bindings.elem_classes && elem_classes !== void 0)
    $$bindings.elem_classes(elem_classes);
  if ($$props.visible === void 0 && $$bindings.visible && visible !== void 0)
    $$bindings.visible(visible);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.value_is_output === void 0 && $$bindings.value_is_output && value_is_output !== void 0)
    $$bindings.value_is_output(value_is_output);
  if ($$props.col_count === void 0 && $$bindings.col_count && col_count !== void 0)
    $$bindings.col_count(col_count);
  if ($$props.row_count === void 0 && $$bindings.row_count && row_count !== void 0)
    $$bindings.row_count(row_count);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.show_label === void 0 && $$bindings.show_label && show_label !== void 0)
    $$bindings.show_label(show_label);
  if ($$props.wrap === void 0 && $$bindings.wrap && wrap !== void 0)
    $$bindings.wrap(wrap);
  if ($$props.datatype === void 0 && $$bindings.datatype && datatype !== void 0)
    $$bindings.datatype(datatype);
  if ($$props.scale === void 0 && $$bindings.scale && scale !== void 0)
    $$bindings.scale(scale);
  if ($$props.min_width === void 0 && $$bindings.min_width && min_width !== void 0)
    $$bindings.min_width(min_width);
  if ($$props.root === void 0 && $$bindings.root && root !== void 0)
    $$bindings.root(root);
  if ($$props.line_breaks === void 0 && $$bindings.line_breaks && line_breaks !== void 0)
    $$bindings.line_breaks(line_breaks);
  if ($$props.column_widths === void 0 && $$bindings.column_widths && column_widths !== void 0)
    $$bindings.column_widths(column_widths);
  if ($$props.gradio === void 0 && $$bindings.gradio && gradio !== void 0)
    $$bindings.gradio(gradio);
  if ($$props.latex_delimiters === void 0 && $$bindings.latex_delimiters && latex_delimiters !== void 0)
    $$bindings.latex_delimiters(latex_delimiters);
  if ($$props.max_height === void 0 && $$bindings.max_height && max_height !== void 0)
    $$bindings.max_height(max_height);
  if ($$props.loading_status === void 0 && $$bindings.loading_status && loading_status !== void 0)
    $$bindings.loading_status(loading_status);
  if ($$props.interactive === void 0 && $$bindings.interactive && interactive !== void 0)
    $$bindings.interactive(interactive);
  if ($$props.show_fullscreen_button === void 0 && $$bindings.show_fullscreen_button && show_fullscreen_button !== void 0)
    $$bindings.show_fullscreen_button(show_fullscreen_button);
  if ($$props.max_chars === void 0 && $$bindings.max_chars && max_chars !== void 0)
    $$bindings.max_chars(max_chars);
  if ($$props.show_copy_button === void 0 && $$bindings.show_copy_button && show_copy_button !== void 0)
    $$bindings.show_copy_button(show_copy_button);
  if ($$props.show_row_numbers === void 0 && $$bindings.show_row_numbers && show_row_numbers !== void 0)
    $$bindings.show_row_numbers(show_row_numbers);
  if ($$props.show_search === void 0 && $$bindings.show_search && show_search !== void 0)
    $$bindings.show_search(show_search);
  if ($$props.pinned_columns === void 0 && $$bindings.pinned_columns && pinned_columns !== void 0)
    $$bindings.pinned_columns(pinned_columns);
  if ($$props.static_columns === void 0 && $$bindings.static_columns && static_columns !== void 0)
    $$bindings.static_columns(static_columns);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    _headers = [...value.headers || headers];
    display_value = value?.metadata?.display_value ? [...value?.metadata?.display_value] : null;
    styling = !interactive && value?.metadata?.styling ? [...value?.metadata?.styling] : null;
    $$rendered = `   ${validate_component(Block, "Block").$$render(
      $$result,
      {
        visible,
        padding: false,
        elem_id,
        elem_classes,
        container: false,
        scale,
        min_width,
        overflow_behavior: "visible"
      },
      {},
      {
        default: () => {
          return `${validate_component(Static, "StatusTracker").$$render($$result, Object.assign({}, { autoscroll: gradio.autoscroll }, { i18n: gradio.i18n }, loading_status), {}, {})} ${validate_component(Table$1, "Table").$$render(
            $$result,
            {
              root,
              label,
              show_label,
              row_count,
              col_count,
              values: value.data,
              display_value,
              styling,
              headers: _headers,
              wrap,
              datatype,
              latex_delimiters,
              editable: interactive,
              max_height,
              i18n: gradio.i18n,
              line_breaks,
              column_widths,
              upload: (...args) => gradio.client.upload(...args),
              stream_handler: (...args) => gradio.client.stream(...args),
              show_fullscreen_button,
              max_chars,
              show_copy_button,
              show_row_numbers,
              show_search,
              pinned_columns,
              components: { image: Index$1 },
              static_columns,
              value_is_output
            },
            {
              value_is_output: ($$value) => {
                value_is_output = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});

export { Table$1 as BaseDataFrame, Index as default };
//# sourceMappingURL=Index58-DA4Q-Mg-.js.map
