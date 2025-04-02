import { SvelteComponent, init, safe_not_equal, svg_element, claim_svg_element, children, detach, attr, insert_hydration, append_hydration, noop, space, empty, claim_space, transition_in, group_outros, transition_out, check_outros, create_component, claim_component, mount_component, destroy_component, ensure_array_like, element, claim_element, destroy_each, text, claim_text, set_style, listen, set_data, createEventDispatcher, onDestroy, bubble, construct_svelte_component, is_function, toggle_class, stop_propagation, run_all, add_render_callback, create_bidirectional_transition, binding_callbacks, null_to_empty, assign, get_spread_update, get_spread_object, set_input_value, get_svelte_dataset, src_url_equal, onMount, action_destroyer, bind, add_flush_callback, tick } from "../../../svelte/svelte.js";
import { slide } from "../../../svelte/svelte-submodules.js";
import { u as uploadToHuggingFace, I as IconButton, K as Check, N as Copy, C as Clear, M as MarkdownCode, k as Image, e as ShareError, J as copy, B as Block, S as Static } from "./2.DR-_Vqz1.js";
import { E as Edit } from "./Edit.DcJRPEI2.js";
import { U as Undo } from "./Undo.BEjgqHJW.js";
import { I as IconButtonWrapper } from "./IconButtonWrapper.CyTXqa9b.js";
import { F as File } from "./File.DqOJDDoa.js";
import { d as dequal } from "./index.DTU9giFV.js";
import { C as Community } from "./Community.4FBzcHeP.js";
import { T as Trash } from "./Trash.phFEWuFK.js";
import { M as Music } from "./Music.BKn1BNLT.js";
import { B as BlockLabel } from "./BlockLabel.BRAz7JuH.js";
function create_fragment$l(ctx) {
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
        xmlns: true,
        "xmlns:xlink": true,
        "aria-hidden": true,
        role: true,
        class: true,
        width: true,
        height: true,
        preserveAspectRatio: true,
        viewBox: true
      });
      var svg_nodes = children(svg);
      path0 = claim_svg_element(svg_nodes, "path", { fill: true, d: true });
      children(path0).forEach(detach);
      path1 = claim_svg_element(svg_nodes, "path", { fill: true, d: true });
      children(path1).forEach(detach);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path0, "fill", "currentColor");
      attr(path0, "d", "M17.74 30L16 29l4-7h6a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9v2H6a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-4.84Z");
      attr(path1, "fill", "currentColor");
      attr(path1, "d", "M8 10h16v2H8zm0 6h10v2H8z");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
      attr(svg, "aria-hidden", "true");
      attr(svg, "role", "img");
      attr(svg, "class", "iconify iconify--carbon");
      attr(svg, "width", "100%");
      attr(svg, "height", "100%");
      attr(svg, "preserveAspectRatio", "xMidYMid meet");
      attr(svg, "viewBox", "0 0 32 32");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      append_hydration(svg, path0);
      append_hydration(svg, path1);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
class Chat extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$l, safe_not_equal, {});
  }
}
function create_fragment$k(ctx) {
  let svg;
  let circle;
  let path;
  return {
    c() {
      svg = svg_element("svg");
      circle = svg_element("circle");
      path = svg_element("path");
      this.h();
    },
    l(nodes) {
      svg = claim_svg_element(nodes, "svg", {
        class: true,
        xmlns: true,
        width: true,
        height: true,
        viewBox: true
      });
      var svg_nodes = children(svg);
      circle = claim_svg_element(svg_nodes, "circle", { cx: true, cy: true, r: true, class: true });
      children(circle).forEach(detach);
      path = claim_svg_element(svg_nodes, "path", { d: true });
      children(path).forEach(detach);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(circle, "cx", "9");
      attr(circle, "cy", "9");
      attr(circle, "r", "8");
      attr(circle, "class", "circle svelte-1m886t3");
      attr(path, "d", "M5 8l4 4 4-4z");
      attr(svg, "class", "dropdown-arrow svelte-1m886t3");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "width", "100%");
      attr(svg, "height", "100%");
      attr(svg, "viewBox", "0 0 18 18");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      append_hydration(svg, circle);
      append_hydration(svg, path);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
class DropdownCircularArrow extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$k, safe_not_equal, {});
  }
}
function create_fragment$j(ctx) {
  let svg;
  let path0;
  let path1;
  let path2;
  let path3;
  return {
    c() {
      svg = svg_element("svg");
      path0 = svg_element("path");
      path1 = svg_element("path");
      path2 = svg_element("path");
      path3 = svg_element("path");
      this.h();
    },
    l(nodes) {
      svg = claim_svg_element(nodes, "svg", {
        width: true,
        height: true,
        "stroke-width": true,
        viewBox: true,
        fill: true,
        xmlns: true,
        color: true
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
        "stroke-linecap": true,
        "stroke-linejoin": true
      });
      children(path1).forEach(detach);
      path2 = claim_svg_element(svg_nodes, "path", {
        d: true,
        stroke: true,
        "stroke-width": true,
        "stroke-linecap": true,
        "stroke-linejoin": true
      });
      children(path2).forEach(detach);
      path3 = claim_svg_element(svg_nodes, "path", {
        d: true,
        stroke: true,
        "stroke-width": true,
        "stroke-linecap": true,
        "stroke-linejoin": true
      });
      children(path3).forEach(detach);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path0, "d", "M19.1679 9C18.0247 6.46819 15.3006 4.5 11.9999 4.5C8.31459 4.5 5.05104 7.44668 4.54932 11");
      attr(path0, "stroke", "currentColor");
      attr(path0, "stroke-width", "1.5");
      attr(path0, "stroke-linecap", "round");
      attr(path0, "stroke-linejoin", "round");
      attr(path1, "d", "M16 9H19.4C19.7314 9 20 8.73137 20 8.4V5");
      attr(path1, "stroke", "currentColor");
      attr(path1, "stroke-width", "1.5");
      attr(path1, "stroke-linecap", "round");
      attr(path1, "stroke-linejoin", "round");
      attr(path2, "d", "M4.88146 15C5.92458 17.5318 8.64874 19.5 12.0494 19.5C15.7347 19.5 18.9983 16.5533 19.5 13");
      attr(path2, "stroke", "currentColor");
      attr(path2, "stroke-width", "1.5");
      attr(path2, "stroke-linecap", "round");
      attr(path2, "stroke-linejoin", "round");
      attr(path3, "d", "M8.04932 15H4.64932C4.31795 15 4.04932 15.2686 4.04932 15.6V19");
      attr(path3, "stroke", "currentColor");
      attr(path3, "stroke-width", "1.5");
      attr(path3, "stroke-linecap", "round");
      attr(path3, "stroke-linejoin", "round");
      attr(svg, "width", "100%");
      attr(svg, "height", "100%");
      attr(svg, "stroke-width", "1.5");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "fill", "none");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "color", "currentColor");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      append_hydration(svg, path0);
      append_hydration(svg, path1);
      append_hydration(svg, path2);
      append_hydration(svg, path3);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
class Retry extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$j, safe_not_equal, {});
  }
}
function create_fragment$i(ctx) {
  let svg;
  let path;
  return {
    c() {
      svg = svg_element("svg");
      path = svg_element("path");
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
      path = claim_svg_element(svg_nodes, "path", {
        d: true,
        stroke: true,
        "stroke-width": true,
        "stroke-linecap": true,
        "stroke-linejoin": true
      });
      children(path).forEach(detach);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path, "d", "M12 20L12 4M12 20L7 15M12 20L17 15");
      attr(path, "stroke", "currentColor");
      attr(path, "stroke-width", "2");
      attr(path, "stroke-linecap", "round");
      attr(path, "stroke-linejoin", "round");
      attr(svg, "width", "100%");
      attr(svg, "height", "100%");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "fill", "none");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      append_hydration(svg, path);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
class ScrollDownArrow extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$i, safe_not_equal, {});
  }
}
const format_chat_for_sharing = async (chat, url_length_limit = 1800) => {
  let messages_to_share = [...chat];
  let formatted = await format_messages(messages_to_share);
  if (formatted.length > url_length_limit && messages_to_share.length > 2) {
    const first_message = messages_to_share[0];
    const last_message = messages_to_share[messages_to_share.length - 1];
    messages_to_share = [first_message, last_message];
    formatted = await format_messages(messages_to_share);
  }
  if (formatted.length > url_length_limit && messages_to_share.length > 0) {
    const truncated_messages = messages_to_share.map((msg) => {
      if (msg.type === "text") {
        const max_length = Math.floor(url_length_limit / messages_to_share.length) - 20;
        if (msg.content.length > max_length) {
          return {
            ...msg,
            content: msg.content.substring(0, max_length) + "..."
          };
        }
      }
      return msg;
    });
    messages_to_share = truncated_messages;
    formatted = await format_messages(messages_to_share);
  }
  return formatted;
};
const format_messages = async (chat) => {
  let messages = await Promise.all(
    chat.map(async (message) => {
      var _a;
      if (message.role === "system")
        return "";
      let speaker_emoji = message.role === "user" ? "😃" : "🤖";
      let html_content = "";
      if (message.type === "text") {
        const regexPatterns = {
          audio: /<audio.*?src="(\/file=.*?)"/g,
          video: /<video.*?src="(\/file=.*?)"/g,
          image: /<img.*?src="(\/file=.*?)".*?\/>|!\[.*?\]\((\/file=.*?)\)/g
        };
        html_content = message.content;
        for (let [_, regex] of Object.entries(regexPatterns)) {
          let match;
          while ((match = regex.exec(message.content)) !== null) {
            const fileUrl = match[1] || match[2];
            const newUrl = await uploadToHuggingFace(fileUrl);
            html_content = html_content.replace(fileUrl, newUrl);
          }
        }
      } else {
        if (!message.content.value)
          return "";
        const url = message.content.component === "video" ? (_a = message.content.value) == null ? void 0 : _a.video.path : message.content.value;
        const file_url = await uploadToHuggingFace(url);
        if (message.content.component === "audio") {
          html_content = `<audio controls src="${file_url}"></audio>`;
        } else if (message.content.component === "video") {
          html_content = file_url;
        } else if (message.content.component === "image") {
          html_content = `<img src="${file_url}" />`;
        }
      }
      return `${speaker_emoji}: ${html_content}`;
    })
  );
  return messages.filter((msg) => msg !== "").join("\n");
};
const redirect_src_url = (src, root) => src.replace('src="/file', `src="${root}file`);
function get_component_for_mime_type(mime_type) {
  if (!mime_type)
    return "file";
  if (mime_type.includes("audio"))
    return "audio";
  if (mime_type.includes("video"))
    return "video";
  if (mime_type.includes("image"))
    return "image";
  return "file";
}
function convert_file_message_to_component_message(message) {
  const _file = Array.isArray(message.file) ? message.file[0] : message.file;
  return {
    component: get_component_for_mime_type(_file == null ? void 0 : _file.mime_type),
    value: message.file,
    alt_text: message.alt_text,
    constructor_args: {},
    props: {}
  };
}
function normalise_messages(messages, root) {
  if (messages === null)
    return messages;
  const thought_map = /* @__PURE__ */ new Map();
  return messages.map((message, i) => {
    let normalized = typeof message.content === "string" ? {
      role: message.role,
      metadata: message.metadata,
      content: redirect_src_url(message.content, root),
      type: "text",
      index: i,
      options: message.options
    } : "file" in message.content ? {
      content: convert_file_message_to_component_message(
        message.content
      ),
      metadata: message.metadata,
      role: message.role,
      type: "component",
      index: i,
      options: message.options
    } : { type: "component", ...message };
    const { id, title, parent_id } = message.metadata || {};
    if (parent_id) {
      const parent = thought_map.get(String(parent_id));
      if (parent) {
        const thought = { ...normalized, children: [] };
        parent.children.push(thought);
        if (id && title) {
          thought_map.set(String(id), thought);
        }
        return null;
      }
    }
    if (id && title) {
      const thought = { ...normalized, children: [] };
      thought_map.set(String(id), thought);
      return thought;
    }
    return normalized;
  }).filter((msg) => msg !== null);
}
function normalise_tuples(messages, root) {
  if (messages === null)
    return messages;
  const msg = messages.flatMap((message_pair, i) => {
    return message_pair.map((message, index) => {
      if (message == null)
        return null;
      const role = index == 0 ? "user" : "assistant";
      if (typeof message === "string") {
        return {
          role,
          type: "text",
          content: redirect_src_url(message, root),
          metadata: { title: null },
          index: [i, index]
        };
      }
      if ("file" in message) {
        return {
          content: convert_file_message_to_component_message(message),
          role,
          type: "component",
          index: [i, index]
        };
      }
      return {
        role,
        content: message,
        type: "component",
        index: [i, index]
      };
    });
  });
  return msg.filter((message) => message != null);
}
function is_component_message(message) {
  return message.type === "component";
}
function is_last_bot_message(messages, all_messages) {
  const is_bot = messages[messages.length - 1].role === "assistant";
  const last_index = messages[messages.length - 1].index;
  const is_last = JSON.stringify(last_index) === JSON.stringify(all_messages[all_messages.length - 1].index);
  return is_last && is_bot;
}
function group_messages(messages, msg_format) {
  const groupedMessages = [];
  let currentGroup = [];
  let currentRole = null;
  for (const message of messages) {
    if (!(message.role === "assistant" || message.role === "user")) {
      continue;
    }
    if (message.role === currentRole) {
      currentGroup.push(message);
    } else {
      if (currentGroup.length > 0) {
        groupedMessages.push(currentGroup);
      }
      currentGroup = [message];
      currentRole = message.role;
    }
  }
  if (currentGroup.length > 0) {
    groupedMessages.push(currentGroup);
  }
  return groupedMessages;
}
async function load_components(component_names, _components, load_component) {
  let names = [];
  let components = [];
  component_names.forEach((component_name) => {
    if (_components[component_name] || component_name === "file") {
      return;
    }
    const variant = component_name === "dataframe" ? "component" : "base";
    const { name, component } = load_component(component_name, variant);
    names.push(name);
    components.push(component);
  });
  const loaded_components = await Promise.all(components);
  loaded_components.forEach((component, i) => {
    _components[names[i]] = component.default;
  });
  return _components;
}
function get_components_from_messages(messages) {
  if (!messages)
    return [];
  let components = /* @__PURE__ */ new Set();
  messages.forEach((message) => {
    if (message.type === "component") {
      components.add(message.content.component);
    }
  });
  return Array.from(components);
}
function get_thought_content(msg, depth = 0) {
  var _a, _b;
  let content = "";
  const indent = "  ".repeat(depth);
  if ((_a = msg.metadata) == null ? void 0 : _a.title) {
    content += `${indent}${depth > 0 ? "- " : ""}${msg.metadata.title}
`;
  }
  if (typeof msg.content === "string") {
    content += `${indent}  ${msg.content}
`;
  }
  const thought = msg;
  if (((_b = thought.children) == null ? void 0 : _b.length) > 0) {
    content += thought.children.map((child) => get_thought_content(child, depth + 1)).join("");
  }
  return content;
}
function all_text(message) {
  var _a;
  if (Array.isArray(message)) {
    return message.map((m) => {
      var _a2;
      if ((_a2 = m.metadata) == null ? void 0 : _a2.title) {
        return get_thought_content(m);
      }
      return m.content;
    }).join("\n");
  }
  if ((_a = message.metadata) == null ? void 0 : _a.title) {
    return get_thought_content(message);
  }
  return message.content;
}
function is_all_text(message) {
  return Array.isArray(message) && message.every((m) => typeof m.content === "string") || !Array.isArray(message) && typeof message.content === "string";
}
function create_fragment$h(ctx) {
  let svg;
  let path;
  return {
    c() {
      svg = svg_element("svg");
      path = svg_element("path");
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
      path = claim_svg_element(svg_nodes, "path", { d: true, fill: true });
      children(path).forEach(detach);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path, "d", "M11.25 6.61523H9.375V1.36523H11.25V6.61523ZM3.375 1.36523H8.625V6.91636L7.48425 8.62748L7.16737 10.8464C7.14108 11.0248 7.05166 11.1879 6.91535 11.3061C6.77904 11.4242 6.60488 11.4896 6.4245 11.4902H6.375C6.07672 11.4899 5.79075 11.3713 5.57983 11.1604C5.36892 10.9495 5.2503 10.6635 5.25 10.3652V8.11523H2.25C1.85233 8.11474 1.47109 7.95654 1.18989 7.67535C0.908691 7.39415 0.750496 7.01291 0.75 6.61523V3.99023C0.750992 3.29435 1.02787 2.62724 1.51994 2.13517C2.01201 1.64311 2.67911 1.36623 3.375 1.36523Z");
      attr(path, "fill", "currentColor");
      attr(svg, "width", "100%");
      attr(svg, "height", "100%");
      attr(svg, "viewBox", "0 0 12 12");
      attr(svg, "fill", "none");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      append_hydration(svg, path);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
class ThumbDownActive extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$h, safe_not_equal, {});
  }
}
function create_fragment$g(ctx) {
  let svg;
  let path;
  return {
    c() {
      svg = svg_element("svg");
      path = svg_element("path");
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
      path = claim_svg_element(svg_nodes, "path", { d: true, fill: true });
      children(path).forEach(detach);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path, "d", "M2.25 8.11523H4.5V10.3652C4.5003 10.6635 4.61892 10.9495 4.82983 11.1604C5.04075 11.3713 5.32672 11.4899 5.625 11.4902H6.42488C6.60519 11.4895 6.77926 11.4241 6.91549 11.3059C7.05172 11.1878 7.14109 11.0248 7.16737 10.8464L7.48425 8.62748L8.82562 6.61523H11.25V1.36523H3.375C2.67911 1.36623 2.01201 1.64311 1.51994 2.13517C1.02787 2.62724 0.750992 3.29435 0.75 3.99023V6.61523C0.750496 7.01291 0.908691 7.39415 1.18989 7.67535C1.47109 7.95654 1.85233 8.11474 2.25 8.11523ZM9 2.11523H10.5V5.86523H9V2.11523ZM1.5 3.99023C1.5006 3.49314 1.69833 3.01657 2.04983 2.66507C2.40133 2.31356 2.8779 2.11583 3.375 2.11523H8.25V6.12661L6.76575 8.35298L6.4245 10.7402H5.625C5.52554 10.7402 5.43016 10.7007 5.35983 10.6304C5.28951 10.5601 5.25 10.4647 5.25 10.3652V7.36523H2.25C2.05118 7.36494 1.86059 7.28582 1.72 7.14524C1.57941 7.00465 1.5003 6.81406 1.5 6.61523V3.99023Z");
      attr(path, "fill", "currentColor");
      attr(svg, "width", "100%");
      attr(svg, "height", "100%");
      attr(svg, "viewBox", "0 0 12 12");
      attr(svg, "fill", "none");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      append_hydration(svg, path);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
class ThumbDownDefault extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$g, safe_not_equal, {});
  }
}
function create_fragment$f(ctx) {
  let svg;
  let path;
  return {
    c() {
      svg = svg_element("svg");
      path = svg_element("path");
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
      path = claim_svg_element(svg_nodes, "path", { d: true, fill: true });
      children(path).forEach(detach);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path, "d", "M0.75 6.24023H2.625V11.4902H0.75V6.24023ZM8.625 11.4902H3.375V5.93911L4.51575 4.22798L4.83263 2.00911C4.85892 1.83065 4.94834 1.66754 5.08465 1.5494C5.22096 1.43125 5.39512 1.36591 5.5755 1.36523H5.625C5.92328 1.36553 6.20925 1.48415 6.42017 1.69507C6.63108 1.90598 6.7497 2.19196 6.75 2.49023V4.74023H9.75C10.1477 4.74073 10.5289 4.89893 10.8101 5.18012C11.0913 5.46132 11.2495 5.84256 11.25 6.24023V8.86523C11.249 9.56112 10.9721 10.2282 10.4801 10.7203C9.98799 11.2124 9.32089 11.4892 8.625 11.4902Z");
      attr(path, "fill", "currentColor");
      attr(svg, "width", "100%");
      attr(svg, "height", "100%");
      attr(svg, "viewBox", "0 0 12 12");
      attr(svg, "fill", "none");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      append_hydration(svg, path);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
class ThumbUpActive extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$f, safe_not_equal, {});
  }
}
function create_fragment$e(ctx) {
  let svg;
  let path;
  return {
    c() {
      svg = svg_element("svg");
      path = svg_element("path");
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
      path = claim_svg_element(svg_nodes, "path", { d: true, fill: true });
      children(path).forEach(detach);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path, "d", "M9.75 4.74023H7.5V2.49023C7.4997 2.19196 7.38108 1.90598 7.17017 1.69507C6.95925 1.48415 6.67328 1.36553 6.375 1.36523H5.57512C5.39481 1.366 5.22074 1.43138 5.08451 1.54952C4.94828 1.66766 4.85891 1.83072 4.83262 2.00911L4.51575 4.22798L3.17438 6.24023H0.75V11.4902H8.625C9.32089 11.4892 9.98799 11.2124 10.4801 10.7203C10.9721 10.2282 11.249 9.56112 11.25 8.86523V6.24023C11.2495 5.84256 11.0913 5.46132 10.8101 5.18012C10.5289 4.89893 10.1477 4.74073 9.75 4.74023ZM3 10.7402H1.5V6.99023H3V10.7402ZM10.5 8.86523C10.4994 9.36233 10.3017 9.8389 9.95017 10.1904C9.59867 10.5419 9.1221 10.7396 8.625 10.7402H3.75V6.72886L5.23425 4.50248L5.5755 2.11523H6.375C6.47446 2.11523 6.56984 2.15474 6.64017 2.22507C6.71049 2.2954 6.75 2.39078 6.75 2.49023V5.49023H9.75C9.94882 5.49053 10.1394 5.56965 10.28 5.71023C10.4206 5.85082 10.4997 6.04141 10.5 6.24023V8.86523Z");
      attr(path, "fill", "currentColor");
      attr(svg, "width", "100%");
      attr(svg, "height", "100%");
      attr(svg, "viewBox", "0 0 12 12");
      attr(svg, "fill", "none");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      append_hydration(svg, path);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
class ThumbUpDefault extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$e, safe_not_equal, {});
  }
}
function create_fragment$d(ctx) {
  let svg;
  let path;
  return {
    c() {
      svg = svg_element("svg");
      path = svg_element("path");
      this.h();
    },
    l(nodes) {
      svg = claim_svg_element(nodes, "svg", {
        id: true,
        xmlns: true,
        viewBox: true,
        fill: true
      });
      var svg_nodes = children(svg);
      path = claim_svg_element(svg_nodes, "path", { fill: true, d: true });
      children(path).forEach(detach);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path, "fill", "currentColor");
      attr(path, "d", "M6,30H4V2H28l-5.8,9L28,20H6ZM6,18H24.33L19.8,11l4.53-7H6Z");
      attr(svg, "id", "icon");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "viewBox", "0 0 32 32");
      attr(svg, "fill", "none");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      append_hydration(svg, path);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
class Flag extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$d, safe_not_equal, {});
  }
}
function create_fragment$c(ctx) {
  let svg;
  let path;
  return {
    c() {
      svg = svg_element("svg");
      path = svg_element("path");
      this.h();
    },
    l(nodes) {
      svg = claim_svg_element(nodes, "svg", {
        id: true,
        xmlns: true,
        viewBox: true,
        fill: true
      });
      var svg_nodes = children(svg);
      path = claim_svg_element(svg_nodes, "path", { fill: true, d: true });
      children(path).forEach(detach);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path, "fill", "currentColor");
      attr(path, "d", "M4,2H28l-5.8,9L28,20H6v10H4V2z");
      attr(svg, "id", "icon");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "viewBox", "0 0 32 32");
      attr(svg, "fill", "none");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      append_hydration(svg, path);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
class FlagActive extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$c, safe_not_equal, {});
  }
}
function get_each_context$4(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[8] = list[i];
  return child_ctx;
}
function create_if_block_1$8(ctx) {
  let show_if_1 = (
    /*feedback_options*/
    ctx[2].includes("Dislike")
  );
  let t;
  let show_if = (
    /*feedback_options*/
    ctx[2].includes("Like")
  );
  let if_block1_anchor;
  let current;
  let if_block0 = show_if_1 && create_if_block_3$6(ctx);
  let if_block1 = show_if && create_if_block_2$7(ctx);
  return {
    c() {
      if (if_block0)
        if_block0.c();
      t = space();
      if (if_block1)
        if_block1.c();
      if_block1_anchor = empty();
    },
    l(nodes) {
      if (if_block0)
        if_block0.l(nodes);
      t = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      if_block1_anchor = empty();
    },
    m(target, anchor) {
      if (if_block0)
        if_block0.m(target, anchor);
      insert_hydration(target, t, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, if_block1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*feedback_options*/
      4)
        show_if_1 = /*feedback_options*/
        ctx2[2].includes("Dislike");
      if (show_if_1) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty & /*feedback_options*/
          4) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_3$6(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(t.parentNode, t);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (dirty & /*feedback_options*/
      4)
        show_if = /*feedback_options*/
        ctx2[2].includes("Like");
      if (show_if) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & /*feedback_options*/
          4) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_2$7(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
        detach(if_block1_anchor);
      }
      if (if_block0)
        if_block0.d(detaching);
      if (if_block1)
        if_block1.d(detaching);
    }
  };
}
function create_if_block_3$6(ctx) {
  let iconbutton;
  let current;
  iconbutton = new IconButton({
    props: {
      Icon: (
        /*selected*/
        ctx[0] === "Dislike" ? ThumbDownActive : ThumbDownDefault
      ),
      label: (
        /*selected*/
        ctx[0] === "Dislike" ? "clicked dislike" : "dislike"
      ),
      color: (
        /*selected*/
        ctx[0] === "Dislike" ? "var(--color-accent)" : "var(--block-label-text-color)"
      )
    }
  });
  iconbutton.$on(
    "click",
    /*click_handler*/
    ctx[5]
  );
  return {
    c() {
      create_component(iconbutton.$$.fragment);
    },
    l(nodes) {
      claim_component(iconbutton.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(iconbutton, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const iconbutton_changes = {};
      if (dirty & /*selected*/
      1)
        iconbutton_changes.Icon = /*selected*/
        ctx2[0] === "Dislike" ? ThumbDownActive : ThumbDownDefault;
      if (dirty & /*selected*/
      1)
        iconbutton_changes.label = /*selected*/
        ctx2[0] === "Dislike" ? "clicked dislike" : "dislike";
      if (dirty & /*selected*/
      1)
        iconbutton_changes.color = /*selected*/
        ctx2[0] === "Dislike" ? "var(--color-accent)" : "var(--block-label-text-color)";
      iconbutton.$set(iconbutton_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(iconbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(iconbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(iconbutton, detaching);
    }
  };
}
function create_if_block_2$7(ctx) {
  let iconbutton;
  let current;
  iconbutton = new IconButton({
    props: {
      Icon: (
        /*selected*/
        ctx[0] === "Like" ? ThumbUpActive : ThumbUpDefault
      ),
      label: (
        /*selected*/
        ctx[0] === "Like" ? "clicked like" : "like"
      ),
      color: (
        /*selected*/
        ctx[0] === "Like" ? "var(--color-accent)" : "var(--block-label-text-color)"
      )
    }
  });
  iconbutton.$on(
    "click",
    /*click_handler_1*/
    ctx[6]
  );
  return {
    c() {
      create_component(iconbutton.$$.fragment);
    },
    l(nodes) {
      claim_component(iconbutton.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(iconbutton, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const iconbutton_changes = {};
      if (dirty & /*selected*/
      1)
        iconbutton_changes.Icon = /*selected*/
        ctx2[0] === "Like" ? ThumbUpActive : ThumbUpDefault;
      if (dirty & /*selected*/
      1)
        iconbutton_changes.label = /*selected*/
        ctx2[0] === "Like" ? "clicked like" : "like";
      if (dirty & /*selected*/
      1)
        iconbutton_changes.color = /*selected*/
        ctx2[0] === "Like" ? "var(--color-accent)" : "var(--block-label-text-color)";
      iconbutton.$set(iconbutton_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(iconbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(iconbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(iconbutton, detaching);
    }
  };
}
function create_if_block$9(ctx) {
  let div1;
  let iconbutton;
  let t;
  let div0;
  let current;
  iconbutton = new IconButton({
    props: {
      Icon: (
        /*selected*/
        ctx[0] && /*extra_feedback*/
        ctx[3].includes(
          /*selected*/
          ctx[0]
        ) ? FlagActive : Flag
      ),
      label: "Feedback",
      color: (
        /*selected*/
        ctx[0] && /*extra_feedback*/
        ctx[3].includes(
          /*selected*/
          ctx[0]
        ) ? "var(--color-accent)" : "var(--block-label-text-color)"
      )
    }
  });
  let each_value = ensure_array_like(
    /*extra_feedback*/
    ctx[3]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
  }
  return {
    c() {
      div1 = element("div");
      create_component(iconbutton.$$.fragment);
      t = space();
      div0 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      claim_component(iconbutton.$$.fragment, div1_nodes);
      t = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div0_nodes);
      }
      div0_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "extra-feedback-options svelte-14rmxes");
      attr(div1, "class", "extra-feedback no-border svelte-14rmxes");
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      mount_component(iconbutton, div1, null);
      append_hydration(div1, t);
      append_hydration(div1, div0);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div0, null);
        }
      }
      current = true;
    },
    p(ctx2, dirty) {
      const iconbutton_changes = {};
      if (dirty & /*selected, extra_feedback*/
      9)
        iconbutton_changes.Icon = /*selected*/
        ctx2[0] && /*extra_feedback*/
        ctx2[3].includes(
          /*selected*/
          ctx2[0]
        ) ? FlagActive : Flag;
      if (dirty & /*selected, extra_feedback*/
      9)
        iconbutton_changes.color = /*selected*/
        ctx2[0] && /*extra_feedback*/
        ctx2[3].includes(
          /*selected*/
          ctx2[0]
        ) ? "var(--color-accent)" : "var(--block-label-text-color)";
      iconbutton.$set(iconbutton_changes);
      if (dirty & /*selected, extra_feedback, toggleSelection, handle_action*/
      27) {
        each_value = ensure_array_like(
          /*extra_feedback*/
          ctx2[3]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$4(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$4(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div0, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(iconbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(iconbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      destroy_component(iconbutton);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_each_block$4(ctx) {
  let button;
  let t_value = (
    /*option*/
    ctx[8] + ""
  );
  let t;
  let mounted;
  let dispose;
  function click_handler_2() {
    return (
      /*click_handler_2*/
      ctx[7](
        /*option*/
        ctx[8]
      )
    );
  }
  return {
    c() {
      button = element("button");
      t = text(t_value);
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      t = claim_text(button_nodes, t_value);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(button, "class", "extra-feedback-option svelte-14rmxes");
      set_style(
        button,
        "font-weight",
        /*selected*/
        ctx[0] === /*option*/
        ctx[8] ? "bold" : "normal"
      );
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      append_hydration(button, t);
      if (!mounted) {
        dispose = listen(button, "click", click_handler_2);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*extra_feedback*/
      8 && t_value !== (t_value = /*option*/
      ctx[8] + ""))
        set_data(t, t_value);
      if (dirty & /*selected, extra_feedback*/
      9) {
        set_style(
          button,
          "font-weight",
          /*selected*/
          ctx[0] === /*option*/
          ctx[8] ? "bold" : "normal"
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$b(ctx) {
  let show_if = (
    /*feedback_options*/
    ctx[2].includes("Like") || /*feedback_options*/
    ctx[2].includes("Dislike")
  );
  let t;
  let if_block1_anchor;
  let current;
  let if_block0 = show_if && create_if_block_1$8(ctx);
  let if_block1 = (
    /*extra_feedback*/
    ctx[3].length > 0 && create_if_block$9(ctx)
  );
  return {
    c() {
      if (if_block0)
        if_block0.c();
      t = space();
      if (if_block1)
        if_block1.c();
      if_block1_anchor = empty();
    },
    l(nodes) {
      if (if_block0)
        if_block0.l(nodes);
      t = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      if_block1_anchor = empty();
    },
    m(target, anchor) {
      if (if_block0)
        if_block0.m(target, anchor);
      insert_hydration(target, t, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, if_block1_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (dirty & /*feedback_options*/
      4)
        show_if = /*feedback_options*/
        ctx2[2].includes("Like") || /*feedback_options*/
        ctx2[2].includes("Dislike");
      if (show_if) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty & /*feedback_options*/
          4) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_1$8(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(t.parentNode, t);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (
        /*extra_feedback*/
        ctx2[3].length > 0
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & /*extra_feedback*/
          8) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$9(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
        detach(if_block1_anchor);
      }
      if (if_block0)
        if_block0.d(detaching);
      if (if_block1)
        if_block1.d(detaching);
    }
  };
}
function instance$b($$self, $$props, $$invalidate) {
  let extra_feedback;
  let { handle_action } = $$props;
  let { feedback_options } = $$props;
  let { selected = null } = $$props;
  function toggleSelection(newSelection) {
    $$invalidate(0, selected = selected === newSelection ? null : newSelection);
    handle_action(selected);
  }
  const click_handler = () => toggleSelection("Dislike");
  const click_handler_1 = () => toggleSelection("Like");
  const click_handler_2 = (option) => {
    toggleSelection(option);
    handle_action(selected ? selected : null);
  };
  $$self.$$set = ($$props2) => {
    if ("handle_action" in $$props2)
      $$invalidate(1, handle_action = $$props2.handle_action);
    if ("feedback_options" in $$props2)
      $$invalidate(2, feedback_options = $$props2.feedback_options);
    if ("selected" in $$props2)
      $$invalidate(0, selected = $$props2.selected);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*feedback_options*/
    4) {
      $$invalidate(3, extra_feedback = feedback_options.filter((option) => option !== "Like" && option !== "Dislike"));
    }
  };
  return [
    selected,
    handle_action,
    feedback_options,
    extra_feedback,
    toggleSelection,
    click_handler,
    click_handler_1,
    click_handler_2
  ];
}
class LikeDislike extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$b, create_fragment$b, safe_not_equal, {
      handle_action: 1,
      feedback_options: 2,
      selected: 0
    });
  }
}
function create_fragment$a(ctx) {
  let iconbutton;
  let current;
  iconbutton = new IconButton({
    props: {
      label: (
        /*copied*/
        ctx[0] ? "Copied message" : "Copy message"
      ),
      Icon: (
        /*copied*/
        ctx[0] ? Check : Copy
      )
    }
  });
  iconbutton.$on(
    "click",
    /*handle_copy*/
    ctx[1]
  );
  return {
    c() {
      create_component(iconbutton.$$.fragment);
    },
    l(nodes) {
      claim_component(iconbutton.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(iconbutton, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const iconbutton_changes = {};
      if (dirty & /*copied*/
      1)
        iconbutton_changes.label = /*copied*/
        ctx2[0] ? "Copied message" : "Copy message";
      if (dirty & /*copied*/
      1)
        iconbutton_changes.Icon = /*copied*/
        ctx2[0] ? Check : Copy;
      iconbutton.$set(iconbutton_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(iconbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(iconbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(iconbutton, detaching);
    }
  };
}
function instance$a($$self, $$props, $$invalidate) {
  const dispatch = createEventDispatcher();
  let copied = false;
  let { value } = $$props;
  let { watermark = null } = $$props;
  let timer;
  function copy_feedback() {
    $$invalidate(0, copied = true);
    if (timer)
      clearTimeout(timer);
    timer = setTimeout(
      () => {
        $$invalidate(0, copied = false);
      },
      2e3
    );
  }
  async function handle_copy() {
    if ("clipboard" in navigator) {
      dispatch("copy", { value });
      const text_to_copy = watermark ? `${value}

${watermark}` : value;
      await navigator.clipboard.writeText(text_to_copy);
      copy_feedback();
    } else {
      const textArea = document.createElement("textarea");
      const text_to_copy = watermark ? `${value}

${watermark}` : value;
      textArea.value = text_to_copy;
      textArea.style.position = "absolute";
      textArea.style.left = "-999999px";
      document.body.prepend(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        copy_feedback();
      } catch (error) {
        console.error(error);
      } finally {
        textArea.remove();
      }
    }
  }
  onDestroy(() => {
    if (timer)
      clearTimeout(timer);
  });
  $$self.$$set = ($$props2) => {
    if ("value" in $$props2)
      $$invalidate(2, value = $$props2.value);
    if ("watermark" in $$props2)
      $$invalidate(3, watermark = $$props2.watermark);
  };
  return [copied, handle_copy, value, watermark];
}
class Copy_1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$a, create_fragment$a, safe_not_equal, { value: 2, watermark: 3 });
  }
}
function create_if_block$8(ctx) {
  let div;
  let iconbuttonwrapper;
  let div_class_value;
  let current;
  iconbuttonwrapper = new IconButtonWrapper({
    props: {
      top_panel: false,
      $$slots: { default: [create_default_slot$3] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      div = element("div");
      create_component(iconbuttonwrapper.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(iconbuttonwrapper.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", div_class_value = "message-buttons-" + /*position*/
      ctx[7] + " " + /*layout*/
      ctx[12] + " message-buttons " + /*avatar*/
      (ctx[8] !== null && "with-avatar") + " svelte-j7nkv7");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(iconbuttonwrapper, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const iconbuttonwrapper_changes = {};
      if (dirty & /*$$scope, generating, handle_action, in_edit_mode, feedback_options, current_feedback, likeable, show_edit, show_undo, show_retry, message_text, watermark, dispatch, show_copy*/
      16838271) {
        iconbuttonwrapper_changes.$$scope = { dirty, ctx: ctx2 };
      }
      iconbuttonwrapper.$set(iconbuttonwrapper_changes);
      if (!current || dirty & /*position, layout, avatar*/
      4480 && div_class_value !== (div_class_value = "message-buttons-" + /*position*/
      ctx2[7] + " " + /*layout*/
      ctx2[12] + " message-buttons " + /*avatar*/
      (ctx2[8] !== null && "with-avatar") + " svelte-j7nkv7")) {
        attr(div, "class", div_class_value);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(iconbuttonwrapper.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(iconbuttonwrapper.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(iconbuttonwrapper);
    }
  };
}
function create_else_block$4(ctx) {
  let t0;
  let t1;
  let t2;
  let t3;
  let if_block4_anchor;
  let current;
  let if_block0 = (
    /*show_copy*/
    ctx[14] && create_if_block_6$4(ctx)
  );
  let if_block1 = (
    /*show_retry*/
    ctx[2] && create_if_block_5$4(ctx)
  );
  let if_block2 = (
    /*show_undo*/
    ctx[3] && create_if_block_4$5(ctx)
  );
  let if_block3 = (
    /*show_edit*/
    ctx[4] && create_if_block_3$5(ctx)
  );
  let if_block4 = (
    /*likeable*/
    ctx[0] && create_if_block_2$6(ctx)
  );
  return {
    c() {
      if (if_block0)
        if_block0.c();
      t0 = space();
      if (if_block1)
        if_block1.c();
      t1 = space();
      if (if_block2)
        if_block2.c();
      t2 = space();
      if (if_block3)
        if_block3.c();
      t3 = space();
      if (if_block4)
        if_block4.c();
      if_block4_anchor = empty();
    },
    l(nodes) {
      if (if_block0)
        if_block0.l(nodes);
      t0 = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      t1 = claim_space(nodes);
      if (if_block2)
        if_block2.l(nodes);
      t2 = claim_space(nodes);
      if (if_block3)
        if_block3.l(nodes);
      t3 = claim_space(nodes);
      if (if_block4)
        if_block4.l(nodes);
      if_block4_anchor = empty();
    },
    m(target, anchor) {
      if (if_block0)
        if_block0.m(target, anchor);
      insert_hydration(target, t0, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, t1, anchor);
      if (if_block2)
        if_block2.m(target, anchor);
      insert_hydration(target, t2, anchor);
      if (if_block3)
        if_block3.m(target, anchor);
      insert_hydration(target, t3, anchor);
      if (if_block4)
        if_block4.m(target, anchor);
      insert_hydration(target, if_block4_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (
        /*show_copy*/
        ctx2[14]
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty & /*show_copy*/
          16384) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_6$4(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(t0.parentNode, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (
        /*show_retry*/
        ctx2[2]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & /*show_retry*/
          4) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_5$4(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(t1.parentNode, t1);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (
        /*show_undo*/
        ctx2[3]
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
          if (dirty & /*show_undo*/
          8) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block_4$5(ctx2);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(t2.parentNode, t2);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
      if (
        /*show_edit*/
        ctx2[4]
      ) {
        if (if_block3) {
          if_block3.p(ctx2, dirty);
          if (dirty & /*show_edit*/
          16) {
            transition_in(if_block3, 1);
          }
        } else {
          if_block3 = create_if_block_3$5(ctx2);
          if_block3.c();
          transition_in(if_block3, 1);
          if_block3.m(t3.parentNode, t3);
        }
      } else if (if_block3) {
        group_outros();
        transition_out(if_block3, 1, 1, () => {
          if_block3 = null;
        });
        check_outros();
      }
      if (
        /*likeable*/
        ctx2[0]
      ) {
        if (if_block4) {
          if_block4.p(ctx2, dirty);
          if (dirty & /*likeable*/
          1) {
            transition_in(if_block4, 1);
          }
        } else {
          if_block4 = create_if_block_2$6(ctx2);
          if_block4.c();
          transition_in(if_block4, 1);
          if_block4.m(if_block4_anchor.parentNode, if_block4_anchor);
        }
      } else if (if_block4) {
        group_outros();
        transition_out(if_block4, 1, 1, () => {
          if_block4 = null;
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
      transition_in(if_block3);
      transition_in(if_block4);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(if_block2);
      transition_out(if_block3);
      transition_out(if_block4);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
        detach(t2);
        detach(t3);
        detach(if_block4_anchor);
      }
      if (if_block0)
        if_block0.d(detaching);
      if (if_block1)
        if_block1.d(detaching);
      if (if_block2)
        if_block2.d(detaching);
      if (if_block3)
        if_block3.d(detaching);
      if (if_block4)
        if_block4.d(detaching);
    }
  };
}
function create_if_block_1$7(ctx) {
  let iconbutton0;
  let t;
  let iconbutton1;
  let current;
  iconbutton0 = new IconButton({
    props: {
      label: "Submit",
      Icon: Check,
      disabled: (
        /*generating*/
        ctx[9]
      )
    }
  });
  iconbutton0.$on(
    "click",
    /*click_handler*/
    ctx[18]
  );
  iconbutton1 = new IconButton({
    props: {
      label: "Cancel",
      Icon: Clear,
      disabled: (
        /*generating*/
        ctx[9]
      )
    }
  });
  iconbutton1.$on(
    "click",
    /*click_handler_1*/
    ctx[19]
  );
  return {
    c() {
      create_component(iconbutton0.$$.fragment);
      t = space();
      create_component(iconbutton1.$$.fragment);
    },
    l(nodes) {
      claim_component(iconbutton0.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(iconbutton1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(iconbutton0, target, anchor);
      insert_hydration(target, t, anchor);
      mount_component(iconbutton1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const iconbutton0_changes = {};
      if (dirty & /*generating*/
      512)
        iconbutton0_changes.disabled = /*generating*/
        ctx2[9];
      iconbutton0.$set(iconbutton0_changes);
      const iconbutton1_changes = {};
      if (dirty & /*generating*/
      512)
        iconbutton1_changes.disabled = /*generating*/
        ctx2[9];
      iconbutton1.$set(iconbutton1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(iconbutton0.$$.fragment, local);
      transition_in(iconbutton1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(iconbutton0.$$.fragment, local);
      transition_out(iconbutton1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      destroy_component(iconbutton0, detaching);
      destroy_component(iconbutton1, detaching);
    }
  };
}
function create_if_block_6$4(ctx) {
  let copy2;
  let current;
  copy2 = new Copy_1({
    props: {
      value: (
        /*message_text*/
        ctx[15]
      ),
      watermark: (
        /*watermark*/
        ctx[6]
      )
    }
  });
  copy2.$on(
    "copy",
    /*copy_handler*/
    ctx[20]
  );
  return {
    c() {
      create_component(copy2.$$.fragment);
    },
    l(nodes) {
      claim_component(copy2.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(copy2, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const copy_changes = {};
      if (dirty & /*message_text*/
      32768)
        copy_changes.value = /*message_text*/
        ctx2[15];
      if (dirty & /*watermark*/
      64)
        copy_changes.watermark = /*watermark*/
        ctx2[6];
      copy2.$set(copy_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(copy2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(copy2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(copy2, detaching);
    }
  };
}
function create_if_block_5$4(ctx) {
  let iconbutton;
  let current;
  iconbutton = new IconButton({
    props: {
      Icon: Retry,
      label: "Retry",
      disabled: (
        /*generating*/
        ctx[9]
      )
    }
  });
  iconbutton.$on(
    "click",
    /*click_handler_2*/
    ctx[21]
  );
  return {
    c() {
      create_component(iconbutton.$$.fragment);
    },
    l(nodes) {
      claim_component(iconbutton.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(iconbutton, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const iconbutton_changes = {};
      if (dirty & /*generating*/
      512)
        iconbutton_changes.disabled = /*generating*/
        ctx2[9];
      iconbutton.$set(iconbutton_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(iconbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(iconbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(iconbutton, detaching);
    }
  };
}
function create_if_block_4$5(ctx) {
  let iconbutton;
  let current;
  iconbutton = new IconButton({
    props: {
      label: "Undo",
      Icon: Undo,
      disabled: (
        /*generating*/
        ctx[9]
      )
    }
  });
  iconbutton.$on(
    "click",
    /*click_handler_3*/
    ctx[22]
  );
  return {
    c() {
      create_component(iconbutton.$$.fragment);
    },
    l(nodes) {
      claim_component(iconbutton.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(iconbutton, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const iconbutton_changes = {};
      if (dirty & /*generating*/
      512)
        iconbutton_changes.disabled = /*generating*/
        ctx2[9];
      iconbutton.$set(iconbutton_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(iconbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(iconbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(iconbutton, detaching);
    }
  };
}
function create_if_block_3$5(ctx) {
  let iconbutton;
  let current;
  iconbutton = new IconButton({
    props: {
      label: "Edit",
      Icon: Edit,
      disabled: (
        /*generating*/
        ctx[9]
      )
    }
  });
  iconbutton.$on(
    "click",
    /*click_handler_4*/
    ctx[23]
  );
  return {
    c() {
      create_component(iconbutton.$$.fragment);
    },
    l(nodes) {
      claim_component(iconbutton.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(iconbutton, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const iconbutton_changes = {};
      if (dirty & /*generating*/
      512)
        iconbutton_changes.disabled = /*generating*/
        ctx2[9];
      iconbutton.$set(iconbutton_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(iconbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(iconbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(iconbutton, detaching);
    }
  };
}
function create_if_block_2$6(ctx) {
  let likedislike;
  let current;
  likedislike = new LikeDislike({
    props: {
      handle_action: (
        /*handle_action*/
        ctx[11]
      ),
      feedback_options: (
        /*feedback_options*/
        ctx[1]
      ),
      selected: (
        /*current_feedback*/
        ctx[10]
      )
    }
  });
  return {
    c() {
      create_component(likedislike.$$.fragment);
    },
    l(nodes) {
      claim_component(likedislike.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(likedislike, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const likedislike_changes = {};
      if (dirty & /*handle_action*/
      2048)
        likedislike_changes.handle_action = /*handle_action*/
        ctx2[11];
      if (dirty & /*feedback_options*/
      2)
        likedislike_changes.feedback_options = /*feedback_options*/
        ctx2[1];
      if (dirty & /*current_feedback*/
      1024)
        likedislike_changes.selected = /*current_feedback*/
        ctx2[10];
      likedislike.$set(likedislike_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(likedislike.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(likedislike.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(likedislike, detaching);
    }
  };
}
function create_default_slot$3(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block_1$7, create_else_block$4];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*in_edit_mode*/
      ctx2[5]
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
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
      if_blocks[current_block_type_index].m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
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
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
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
        detach(if_block_anchor);
      }
      if_blocks[current_block_type_index].d(detaching);
    }
  };
}
function create_fragment$9(ctx) {
  let if_block_anchor;
  let current;
  let if_block = (
    /*show_copy*/
    (ctx[14] || /*show_retry*/
    ctx[2] || /*show_undo*/
    ctx[3] || /*show_edit*/
    ctx[4] || /*likeable*/
    ctx[0]) && create_if_block$8(ctx)
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
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*show_copy*/
        ctx2[14] || /*show_retry*/
        ctx2[2] || /*show_undo*/
        ctx2[3] || /*show_edit*/
        ctx2[4] || /*likeable*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*show_copy, show_retry, show_undo, show_edit, likeable*/
          16413) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$8(ctx2);
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
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
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
function instance$9($$self, $$props, $$invalidate) {
  let message_text;
  let show_copy;
  let { likeable } = $$props;
  let { feedback_options } = $$props;
  let { show_retry } = $$props;
  let { show_undo } = $$props;
  let { show_edit } = $$props;
  let { in_edit_mode } = $$props;
  let { show_copy_button } = $$props;
  let { watermark = null } = $$props;
  let { message } = $$props;
  let { position } = $$props;
  let { avatar } = $$props;
  let { generating } = $$props;
  let { current_feedback } = $$props;
  let { handle_action } = $$props;
  let { layout } = $$props;
  let { dispatch } = $$props;
  const click_handler = () => handle_action("edit_submit");
  const click_handler_1 = () => handle_action("edit_cancel");
  const copy_handler = (e) => dispatch("copy", e.detail);
  const click_handler_2 = () => handle_action("retry");
  const click_handler_3 = () => handle_action("undo");
  const click_handler_4 = () => handle_action("edit");
  $$self.$$set = ($$props2) => {
    if ("likeable" in $$props2)
      $$invalidate(0, likeable = $$props2.likeable);
    if ("feedback_options" in $$props2)
      $$invalidate(1, feedback_options = $$props2.feedback_options);
    if ("show_retry" in $$props2)
      $$invalidate(2, show_retry = $$props2.show_retry);
    if ("show_undo" in $$props2)
      $$invalidate(3, show_undo = $$props2.show_undo);
    if ("show_edit" in $$props2)
      $$invalidate(4, show_edit = $$props2.show_edit);
    if ("in_edit_mode" in $$props2)
      $$invalidate(5, in_edit_mode = $$props2.in_edit_mode);
    if ("show_copy_button" in $$props2)
      $$invalidate(16, show_copy_button = $$props2.show_copy_button);
    if ("watermark" in $$props2)
      $$invalidate(6, watermark = $$props2.watermark);
    if ("message" in $$props2)
      $$invalidate(17, message = $$props2.message);
    if ("position" in $$props2)
      $$invalidate(7, position = $$props2.position);
    if ("avatar" in $$props2)
      $$invalidate(8, avatar = $$props2.avatar);
    if ("generating" in $$props2)
      $$invalidate(9, generating = $$props2.generating);
    if ("current_feedback" in $$props2)
      $$invalidate(10, current_feedback = $$props2.current_feedback);
    if ("handle_action" in $$props2)
      $$invalidate(11, handle_action = $$props2.handle_action);
    if ("layout" in $$props2)
      $$invalidate(12, layout = $$props2.layout);
    if ("dispatch" in $$props2)
      $$invalidate(13, dispatch = $$props2.dispatch);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*message*/
    131072) {
      $$invalidate(15, message_text = is_all_text(message) ? all_text(message) : "");
    }
    if ($$self.$$.dirty & /*show_copy_button, message*/
    196608) {
      $$invalidate(14, show_copy = show_copy_button && message && is_all_text(message));
    }
  };
  return [
    likeable,
    feedback_options,
    show_retry,
    show_undo,
    show_edit,
    in_edit_mode,
    watermark,
    position,
    avatar,
    generating,
    current_feedback,
    handle_action,
    layout,
    dispatch,
    show_copy,
    message_text,
    show_copy_button,
    message,
    click_handler,
    click_handler_1,
    copy_handler,
    click_handler_2,
    click_handler_3,
    click_handler_4
  ];
}
class ButtonPanel extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$9, create_fragment$9, safe_not_equal, {
      likeable: 0,
      feedback_options: 1,
      show_retry: 2,
      show_undo: 3,
      show_edit: 4,
      in_edit_mode: 5,
      show_copy_button: 16,
      watermark: 6,
      message: 17,
      position: 7,
      avatar: 8,
      generating: 9,
      current_feedback: 10,
      handle_action: 11,
      layout: 12,
      dispatch: 13
    });
  }
}
function create_if_block_6$3(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value = (
    /*components*/
    ctx[1][
      /*type*/
      ctx[0]
    ]
  );
  function switch_props(ctx2, dirty) {
    return {
      props: {
        value: (
          /*value*/
          ctx2[2]
        ),
        show_label: false,
        label: "chatbot-image",
        show_share_button: true,
        i18n: (
          /*i18n*/
          ctx2[6]
        ),
        gradio: { dispatch: func_1$1 }
      }
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    switch_instance.$on(
      "load",
      /*load_handler_6*/
      ctx[17]
    );
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
      if (dirty & /*components, type*/
      3 && switch_value !== (switch_value = /*components*/
      ctx2[1][
        /*type*/
        ctx2[0]
      ])) {
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
          switch_instance.$on(
            "load",
            /*load_handler_6*/
            ctx2[17]
          );
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        const switch_instance_changes = {};
        if (dirty & /*value*/
        4)
          switch_instance_changes.value = /*value*/
          ctx2[2];
        if (dirty & /*i18n*/
        64)
          switch_instance_changes.i18n = /*i18n*/
          ctx2[6];
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
function create_if_block_5$3(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value = (
    /*components*/
    ctx[1][
      /*type*/
      ctx[0]
    ]
  );
  function switch_props(ctx2, dirty) {
    return {
      props: {
        value: (
          /*value*/
          ctx2[2]
        ),
        show_label: false,
        label: "chatbot-image",
        show_download_button: (
          /*allow_file_downloads*/
          ctx2[9]
        ),
        display_icon_button_wrapper_top_corner: (
          /*display_icon_button_wrapper_top_corner*/
          ctx2[10]
        ),
        i18n: (
          /*i18n*/
          ctx2[6]
        )
      }
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    switch_instance.$on(
      "load",
      /*load_handler_5*/
      ctx[16]
    );
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
      if (dirty & /*components, type*/
      3 && switch_value !== (switch_value = /*components*/
      ctx2[1][
        /*type*/
        ctx2[0]
      ])) {
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
          switch_instance.$on(
            "load",
            /*load_handler_5*/
            ctx2[16]
          );
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        const switch_instance_changes = {};
        if (dirty & /*value*/
        4)
          switch_instance_changes.value = /*value*/
          ctx2[2];
        if (dirty & /*allow_file_downloads*/
        512)
          switch_instance_changes.show_download_button = /*allow_file_downloads*/
          ctx2[9];
        if (dirty & /*display_icon_button_wrapper_top_corner*/
        1024)
          switch_instance_changes.display_icon_button_wrapper_top_corner = /*display_icon_button_wrapper_top_corner*/
          ctx2[10];
        if (dirty & /*i18n*/
        64)
          switch_instance_changes.i18n = /*i18n*/
          ctx2[6];
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
function create_if_block_4$4(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value = (
    /*components*/
    ctx[1][
      /*type*/
      ctx[0]
    ]
  );
  function switch_props(ctx2, dirty) {
    return {
      props: {
        autoplay: (
          /*props*/
          ctx2[5].autoplay
        ),
        value: (
          /*value*/
          ctx2[2].video || /*value*/
          ctx2[2]
        ),
        show_label: false,
        show_share_button: true,
        i18n: (
          /*i18n*/
          ctx2[6]
        ),
        upload: (
          /*upload*/
          ctx2[7]
        ),
        display_icon_button_wrapper_top_corner: (
          /*display_icon_button_wrapper_top_corner*/
          ctx2[10]
        ),
        show_download_button: (
          /*allow_file_downloads*/
          ctx2[9]
        ),
        $$slots: { default: [create_default_slot$2] },
        $$scope: { ctx: ctx2 }
      }
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    switch_instance.$on(
      "load",
      /*load_handler_4*/
      ctx[15]
    );
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
      if (dirty & /*components, type*/
      3 && switch_value !== (switch_value = /*components*/
      ctx2[1][
        /*type*/
        ctx2[0]
      ])) {
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
          switch_instance.$on(
            "load",
            /*load_handler_4*/
            ctx2[15]
          );
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        const switch_instance_changes = {};
        if (dirty & /*props*/
        32)
          switch_instance_changes.autoplay = /*props*/
          ctx2[5].autoplay;
        if (dirty & /*value*/
        4)
          switch_instance_changes.value = /*value*/
          ctx2[2].video || /*value*/
          ctx2[2];
        if (dirty & /*i18n*/
        64)
          switch_instance_changes.i18n = /*i18n*/
          ctx2[6];
        if (dirty & /*upload*/
        128)
          switch_instance_changes.upload = /*upload*/
          ctx2[7];
        if (dirty & /*display_icon_button_wrapper_top_corner*/
        1024)
          switch_instance_changes.display_icon_button_wrapper_top_corner = /*display_icon_button_wrapper_top_corner*/
          ctx2[10];
        if (dirty & /*allow_file_downloads*/
        512)
          switch_instance_changes.show_download_button = /*allow_file_downloads*/
          ctx2[9];
        if (dirty & /*$$scope*/
        262144) {
          switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
        }
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
function create_if_block_3$4(ctx) {
  let div;
  let switch_instance;
  let current;
  var switch_value = (
    /*components*/
    ctx[1][
      /*type*/
      ctx[0]
    ]
  );
  function switch_props(ctx2, dirty) {
    return {
      props: {
        value: (
          /*value*/
          ctx2[2]
        ),
        show_label: false,
        show_share_button: true,
        i18n: (
          /*i18n*/
          ctx2[6]
        ),
        label: "",
        waveform_settings: { autoplay: (
          /*props*/
          ctx2[5].autoplay
        ) },
        show_download_button: (
          /*allow_file_downloads*/
          ctx2[9]
        ),
        display_icon_button_wrapper_top_corner: (
          /*display_icon_button_wrapper_top_corner*/
          ctx2[10]
        )
      }
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    switch_instance.$on(
      "load",
      /*load_handler_3*/
      ctx[14]
    );
  }
  return {
    c() {
      div = element("div");
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { style: true });
      var div_nodes = children(div);
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_style(div, "position", "relative");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (switch_instance)
        mount_component(switch_instance, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*components, type*/
      3 && switch_value !== (switch_value = /*components*/
      ctx2[1][
        /*type*/
        ctx2[0]
      ])) {
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
          switch_instance.$on(
            "load",
            /*load_handler_3*/
            ctx2[14]
          );
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, div, null);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        const switch_instance_changes = {};
        if (dirty & /*value*/
        4)
          switch_instance_changes.value = /*value*/
          ctx2[2];
        if (dirty & /*i18n*/
        64)
          switch_instance_changes.i18n = /*i18n*/
          ctx2[6];
        if (dirty & /*props*/
        32)
          switch_instance_changes.waveform_settings = { autoplay: (
            /*props*/
            ctx2[5].autoplay
          ) };
        if (dirty & /*allow_file_downloads*/
        512)
          switch_instance_changes.show_download_button = /*allow_file_downloads*/
          ctx2[9];
        if (dirty & /*display_icon_button_wrapper_top_corner*/
        1024)
          switch_instance_changes.display_icon_button_wrapper_top_corner = /*display_icon_button_wrapper_top_corner*/
          ctx2[10];
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
        detach(div);
      }
      if (switch_instance)
        destroy_component(switch_instance);
    }
  };
}
function create_if_block_2$5(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value = (
    /*components*/
    ctx[1][
      /*type*/
      ctx[0]
    ]
  );
  function switch_props(ctx2, dirty) {
    return {
      props: {
        value: (
          /*value*/
          ctx2[2]
        ),
        target: (
          /*target*/
          ctx2[3]
        ),
        theme_mode: (
          /*theme_mode*/
          ctx2[4]
        ),
        bokeh_version: (
          /*props*/
          ctx2[5].bokeh_version
        ),
        caption: "",
        show_actions_button: true
      }
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    switch_instance.$on(
      "load",
      /*load_handler_2*/
      ctx[13]
    );
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
      if (dirty & /*components, type*/
      3 && switch_value !== (switch_value = /*components*/
      ctx2[1][
        /*type*/
        ctx2[0]
      ])) {
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
          switch_instance.$on(
            "load",
            /*load_handler_2*/
            ctx2[13]
          );
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        const switch_instance_changes = {};
        if (dirty & /*value*/
        4)
          switch_instance_changes.value = /*value*/
          ctx2[2];
        if (dirty & /*target*/
        8)
          switch_instance_changes.target = /*target*/
          ctx2[3];
        if (dirty & /*theme_mode*/
        16)
          switch_instance_changes.theme_mode = /*theme_mode*/
          ctx2[4];
        if (dirty & /*props*/
        32)
          switch_instance_changes.bokeh_version = /*props*/
          ctx2[5].bokeh_version;
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
function create_if_block_1$6(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value = (
    /*components*/
    ctx[1][
      /*type*/
      ctx[0]
    ]
  );
  function switch_props(ctx2, dirty) {
    return {
      props: {
        value: (
          /*value*/
          ctx2[2]
        ),
        show_label: false,
        i18n: (
          /*i18n*/
          ctx2[6]
        ),
        label: "",
        interactive: false,
        line_breaks: (
          /*props*/
          ctx2[5].line_breaks
        ),
        wrap: true,
        root: "",
        gradio: { dispatch: func },
        datatype: (
          /*props*/
          ctx2[5].datatype
        ),
        latex_delimiters: (
          /*props*/
          ctx2[5].latex_delimiters
        ),
        col_count: (
          /*props*/
          ctx2[5].col_count
        ),
        row_count: (
          /*props*/
          ctx2[5].row_count
        )
      }
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    switch_instance.$on(
      "load",
      /*load_handler_1*/
      ctx[12]
    );
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
      if (dirty & /*components, type*/
      3 && switch_value !== (switch_value = /*components*/
      ctx2[1][
        /*type*/
        ctx2[0]
      ])) {
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
          switch_instance.$on(
            "load",
            /*load_handler_1*/
            ctx2[12]
          );
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        const switch_instance_changes = {};
        if (dirty & /*value*/
        4)
          switch_instance_changes.value = /*value*/
          ctx2[2];
        if (dirty & /*i18n*/
        64)
          switch_instance_changes.i18n = /*i18n*/
          ctx2[6];
        if (dirty & /*props*/
        32)
          switch_instance_changes.line_breaks = /*props*/
          ctx2[5].line_breaks;
        if (dirty & /*props*/
        32)
          switch_instance_changes.datatype = /*props*/
          ctx2[5].datatype;
        if (dirty & /*props*/
        32)
          switch_instance_changes.latex_delimiters = /*props*/
          ctx2[5].latex_delimiters;
        if (dirty & /*props*/
        32)
          switch_instance_changes.col_count = /*props*/
          ctx2[5].col_count;
        if (dirty & /*props*/
        32)
          switch_instance_changes.row_count = /*props*/
          ctx2[5].row_count;
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
function create_if_block$7(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value = (
    /*components*/
    ctx[1][
      /*type*/
      ctx[0]
    ]
  );
  function switch_props(ctx2, dirty) {
    return {
      props: {
        value: (
          /*value*/
          ctx2[2]
        ),
        display_icon_button_wrapper_top_corner: (
          /*display_icon_button_wrapper_top_corner*/
          ctx2[10]
        ),
        show_label: false,
        i18n: (
          /*i18n*/
          ctx2[6]
        ),
        label: "",
        _fetch: (
          /*_fetch*/
          ctx2[8]
        ),
        allow_preview: false,
        interactive: false,
        mode: "minimal",
        fixed_height: 1
      }
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    switch_instance.$on(
      "load",
      /*load_handler*/
      ctx[11]
    );
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
      if (dirty & /*components, type*/
      3 && switch_value !== (switch_value = /*components*/
      ctx2[1][
        /*type*/
        ctx2[0]
      ])) {
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
          switch_instance.$on(
            "load",
            /*load_handler*/
            ctx2[11]
          );
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        const switch_instance_changes = {};
        if (dirty & /*value*/
        4)
          switch_instance_changes.value = /*value*/
          ctx2[2];
        if (dirty & /*display_icon_button_wrapper_top_corner*/
        1024)
          switch_instance_changes.display_icon_button_wrapper_top_corner = /*display_icon_button_wrapper_top_corner*/
          ctx2[10];
        if (dirty & /*i18n*/
        64)
          switch_instance_changes.i18n = /*i18n*/
          ctx2[6];
        if (dirty & /*_fetch*/
        256)
          switch_instance_changes._fetch = /*_fetch*/
          ctx2[8];
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
function create_default_slot$2(ctx) {
  let track;
  return {
    c() {
      track = element("track");
      this.h();
    },
    l(nodes) {
      track = claim_element(nodes, "TRACK", { kind: true });
      this.h();
    },
    h() {
      attr(track, "kind", "captions");
    },
    m(target, anchor) {
      insert_hydration(target, track, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(track);
      }
    }
  };
}
function create_fragment$8(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [
    create_if_block$7,
    create_if_block_1$6,
    create_if_block_2$5,
    create_if_block_3$4,
    create_if_block_4$4,
    create_if_block_5$3,
    create_if_block_6$3
  ];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*type*/
      ctx2[0] === "gallery"
    )
      return 0;
    if (
      /*type*/
      ctx2[0] === "dataframe"
    )
      return 1;
    if (
      /*type*/
      ctx2[0] === "plot"
    )
      return 2;
    if (
      /*type*/
      ctx2[0] === "audio"
    )
      return 3;
    if (
      /*type*/
      ctx2[0] === "video"
    )
      return 4;
    if (
      /*type*/
      ctx2[0] === "image"
    )
      return 5;
    if (
      /*type*/
      ctx2[0] === "html"
    )
      return 6;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
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
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(target, anchor);
      }
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        }
      } else {
        if (if_block) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        } else {
          if_block = null;
        }
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
        detach(if_block_anchor);
      }
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d(detaching);
      }
    }
  };
}
const func = () => {
};
const func_1$1 = () => {
};
function instance$8($$self, $$props, $$invalidate) {
  let { type } = $$props;
  let { components } = $$props;
  let { value } = $$props;
  let { target } = $$props;
  let { theme_mode } = $$props;
  let { props } = $$props;
  let { i18n } = $$props;
  let { upload } = $$props;
  let { _fetch } = $$props;
  let { allow_file_downloads } = $$props;
  let { display_icon_button_wrapper_top_corner = false } = $$props;
  function load_handler(event) {
    bubble.call(this, $$self, event);
  }
  function load_handler_1(event) {
    bubble.call(this, $$self, event);
  }
  function load_handler_2(event) {
    bubble.call(this, $$self, event);
  }
  function load_handler_3(event) {
    bubble.call(this, $$self, event);
  }
  function load_handler_4(event) {
    bubble.call(this, $$self, event);
  }
  function load_handler_5(event) {
    bubble.call(this, $$self, event);
  }
  function load_handler_6(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$props2) => {
    if ("type" in $$props2)
      $$invalidate(0, type = $$props2.type);
    if ("components" in $$props2)
      $$invalidate(1, components = $$props2.components);
    if ("value" in $$props2)
      $$invalidate(2, value = $$props2.value);
    if ("target" in $$props2)
      $$invalidate(3, target = $$props2.target);
    if ("theme_mode" in $$props2)
      $$invalidate(4, theme_mode = $$props2.theme_mode);
    if ("props" in $$props2)
      $$invalidate(5, props = $$props2.props);
    if ("i18n" in $$props2)
      $$invalidate(6, i18n = $$props2.i18n);
    if ("upload" in $$props2)
      $$invalidate(7, upload = $$props2.upload);
    if ("_fetch" in $$props2)
      $$invalidate(8, _fetch = $$props2._fetch);
    if ("allow_file_downloads" in $$props2)
      $$invalidate(9, allow_file_downloads = $$props2.allow_file_downloads);
    if ("display_icon_button_wrapper_top_corner" in $$props2)
      $$invalidate(10, display_icon_button_wrapper_top_corner = $$props2.display_icon_button_wrapper_top_corner);
  };
  return [
    type,
    components,
    value,
    target,
    theme_mode,
    props,
    i18n,
    upload,
    _fetch,
    allow_file_downloads,
    display_icon_button_wrapper_top_corner,
    load_handler,
    load_handler_1,
    load_handler_2,
    load_handler_3,
    load_handler_4,
    load_handler_5,
    load_handler_6
  ];
}
class Component extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$8, create_fragment$8, safe_not_equal, {
      type: 0,
      components: 1,
      value: 2,
      target: 3,
      theme_mode: 4,
      props: 5,
      i18n: 6,
      upload: 7,
      _fetch: 8,
      allow_file_downloads: 9,
      display_icon_button_wrapper_top_corner: 10
    });
  }
}
function create_if_block_2$4(ctx) {
  var _a, _b, _c, _d;
  let div2;
  let div0;
  let file;
  let t0;
  let div1;
  let a;
  let span0;
  let t1_value = (
    /*message*/
    (((_a = ctx[16].content.value) == null ? void 0 : _a.orig_name) || /*message*/
    ((_b = ctx[16].content.value) == null ? void 0 : _b.path.split("/").pop()) || "file") + ""
  );
  let t1;
  let a_href_value;
  let a_download_value;
  let t2;
  let span1;
  let t3_value = (
    /*message*/
    (((_c = ctx[16].content.value) == null ? void 0 : _c.orig_name) || /*message*/
    ((_d = ctx[16].content.value) == null ? void 0 : _d.path) || "").split(".").pop().toUpperCase() + ""
  );
  let t3;
  let current;
  file = new File({});
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      create_component(file.$$.fragment);
      t0 = space();
      div1 = element("div");
      a = element("a");
      span0 = element("span");
      t1 = text(t1_value);
      t2 = space();
      span1 = element("span");
      t3 = text(t3_value);
      this.h();
    },
    l(nodes) {
      div2 = claim_element(nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      div0 = claim_element(div2_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      claim_component(file.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach);
      t0 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      a = claim_element(div1_nodes, "A", {
        "data-testid": true,
        class: true,
        href: true,
        target: true,
        download: true
      });
      var a_nodes = children(a);
      span0 = claim_element(a_nodes, "SPAN", { class: true });
      var span0_nodes = children(span0);
      t1 = claim_text(span0_nodes, t1_value);
      span0_nodes.forEach(detach);
      a_nodes.forEach(detach);
      t2 = claim_space(div1_nodes);
      span1 = claim_element(div1_nodes, "SPAN", { class: true });
      var span1_nodes = children(span1);
      t3 = claim_text(span1_nodes, t3_value);
      span1_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      div2_nodes.forEach(detach);
      this.h();
    },
    h() {
      var _a2, _b2;
      attr(div0, "class", "file-icon svelte-ulpe0d");
      attr(span0, "class", "file-name svelte-ulpe0d");
      attr(a, "data-testid", "chatbot-file");
      attr(a, "class", "file-link svelte-ulpe0d");
      attr(a, "href", a_href_value = /*message*/
      ctx[16].content.value.url);
      attr(a, "target", "_blank");
      attr(a, "download", a_download_value = window.__is_colab__ ? null : (
        /*message*/
        ((_a2 = ctx[16].content.value) == null ? void 0 : _a2.orig_name) || /*message*/
        ((_b2 = ctx[16].content.value) == null ? void 0 : _b2.path.split("/").pop()) || "file"
      ));
      attr(span1, "class", "file-type svelte-ulpe0d");
      attr(div1, "class", "file-info svelte-ulpe0d");
      attr(div2, "class", "file-container svelte-ulpe0d");
    },
    m(target, anchor) {
      insert_hydration(target, div2, anchor);
      append_hydration(div2, div0);
      mount_component(file, div0, null);
      append_hydration(div2, t0);
      append_hydration(div2, div1);
      append_hydration(div1, a);
      append_hydration(a, span0);
      append_hydration(span0, t1);
      append_hydration(div1, t2);
      append_hydration(div1, span1);
      append_hydration(span1, t3);
      current = true;
    },
    p(ctx2, dirty) {
      var _a2, _b2, _c2, _d2, _e, _f;
      if ((!current || dirty & /*message*/
      65536) && t1_value !== (t1_value = /*message*/
      (((_a2 = ctx2[16].content.value) == null ? void 0 : _a2.orig_name) || /*message*/
      ((_b2 = ctx2[16].content.value) == null ? void 0 : _b2.path.split("/").pop()) || "file") + ""))
        set_data(t1, t1_value);
      if (!current || dirty & /*message*/
      65536 && a_href_value !== (a_href_value = /*message*/
      ctx2[16].content.value.url)) {
        attr(a, "href", a_href_value);
      }
      if (!current || dirty & /*message*/
      65536 && a_download_value !== (a_download_value = window.__is_colab__ ? null : (
        /*message*/
        ((_c2 = ctx2[16].content.value) == null ? void 0 : _c2.orig_name) || /*message*/
        ((_d2 = ctx2[16].content.value) == null ? void 0 : _d2.path.split("/").pop()) || "file"
      ))) {
        attr(a, "download", a_download_value);
      }
      if ((!current || dirty & /*message*/
      65536) && t3_value !== (t3_value = /*message*/
      (((_e = ctx2[16].content.value) == null ? void 0 : _e.orig_name) || /*message*/
      ((_f = ctx2[16].content.value) == null ? void 0 : _f.path) || "").split(".").pop().toUpperCase() + ""))
        set_data(t3, t3_value);
    },
    i(local) {
      if (current)
        return;
      transition_in(file.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(file.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div2);
      }
      destroy_component(file);
    }
  };
}
function create_if_block_1$5(ctx) {
  let component;
  let current;
  component = new Component({
    props: {
      target: (
        /*target*/
        ctx[6]
      ),
      theme_mode: (
        /*theme_mode*/
        ctx[8]
      ),
      props: (
        /*message*/
        ctx[16].content.props
      ),
      type: (
        /*message*/
        ctx[16].content.component
      ),
      components: (
        /*_components*/
        ctx[9]
      ),
      value: (
        /*message*/
        ctx[16].content.value
      ),
      display_icon_button_wrapper_top_corner: (
        /*thought_index*/
        ctx[14] > 0 && /*display_consecutive_in_same_bubble*/
        ctx[13]
      ),
      i18n: (
        /*i18n*/
        ctx[3]
      ),
      upload: (
        /*upload*/
        ctx[5]
      ),
      _fetch: (
        /*_fetch*/
        ctx[2]
      ),
      allow_file_downloads: (
        /*allow_file_downloads*/
        ctx[12]
      )
    }
  });
  component.$on(
    "load",
    /*load_handler*/
    ctx[17]
  );
  return {
    c() {
      create_component(component.$$.fragment);
    },
    l(nodes) {
      claim_component(component.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(component, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const component_changes = {};
      if (dirty & /*target*/
      64)
        component_changes.target = /*target*/
        ctx2[6];
      if (dirty & /*theme_mode*/
      256)
        component_changes.theme_mode = /*theme_mode*/
        ctx2[8];
      if (dirty & /*message*/
      65536)
        component_changes.props = /*message*/
        ctx2[16].content.props;
      if (dirty & /*message*/
      65536)
        component_changes.type = /*message*/
        ctx2[16].content.component;
      if (dirty & /*_components*/
      512)
        component_changes.components = /*_components*/
        ctx2[9];
      if (dirty & /*message*/
      65536)
        component_changes.value = /*message*/
        ctx2[16].content.value;
      if (dirty & /*thought_index, display_consecutive_in_same_bubble*/
      24576)
        component_changes.display_icon_button_wrapper_top_corner = /*thought_index*/
        ctx2[14] > 0 && /*display_consecutive_in_same_bubble*/
        ctx2[13];
      if (dirty & /*i18n*/
      8)
        component_changes.i18n = /*i18n*/
        ctx2[3];
      if (dirty & /*upload*/
      32)
        component_changes.upload = /*upload*/
        ctx2[5];
      if (dirty & /*_fetch*/
      4)
        component_changes._fetch = /*_fetch*/
        ctx2[2];
      if (dirty & /*allow_file_downloads*/
      4096)
        component_changes.allow_file_downloads = /*allow_file_downloads*/
        ctx2[12];
      component.$set(component_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(component.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(component.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(component, detaching);
    }
  };
}
function create_if_block$6(ctx) {
  let div;
  let markdown;
  let current;
  markdown = new MarkdownCode({
    props: {
      message: (
        /*message*/
        ctx[16].content
      ),
      latex_delimiters: (
        /*latex_delimiters*/
        ctx[0]
      ),
      sanitize_html: (
        /*sanitize_html*/
        ctx[1]
      ),
      render_markdown: (
        /*render_markdown*/
        ctx[10]
      ),
      line_breaks: (
        /*line_breaks*/
        ctx[4]
      ),
      root: (
        /*root*/
        ctx[7]
      ),
      allow_tags: (
        /*allow_tags*/
        ctx[15]
      ),
      theme_mode: (
        /*theme_mode*/
        ctx[8]
      )
    }
  });
  markdown.$on("load", function() {
    if (is_function(
      /*scroll*/
      ctx[11]
    ))
      ctx[11].apply(this, arguments);
  });
  return {
    c() {
      div = element("div");
      create_component(markdown.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(markdown.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "message-content");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(markdown, div, null);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const markdown_changes = {};
      if (dirty & /*message*/
      65536)
        markdown_changes.message = /*message*/
        ctx[16].content;
      if (dirty & /*latex_delimiters*/
      1)
        markdown_changes.latex_delimiters = /*latex_delimiters*/
        ctx[0];
      if (dirty & /*sanitize_html*/
      2)
        markdown_changes.sanitize_html = /*sanitize_html*/
        ctx[1];
      if (dirty & /*render_markdown*/
      1024)
        markdown_changes.render_markdown = /*render_markdown*/
        ctx[10];
      if (dirty & /*line_breaks*/
      16)
        markdown_changes.line_breaks = /*line_breaks*/
        ctx[4];
      if (dirty & /*root*/
      128)
        markdown_changes.root = /*root*/
        ctx[7];
      if (dirty & /*allow_tags*/
      32768)
        markdown_changes.allow_tags = /*allow_tags*/
        ctx[15];
      if (dirty & /*theme_mode*/
      256)
        markdown_changes.theme_mode = /*theme_mode*/
        ctx[8];
      markdown.$set(markdown_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(markdown.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(markdown.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(markdown);
    }
  };
}
function create_fragment$7(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block$6, create_if_block_1$5, create_if_block_2$4];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*message*/
      ctx2[16].type === "text"
    )
      return 0;
    if (
      /*message*/
      ctx2[16].type === "component" && /*message*/
      ctx2[16].content.component in /*_components*/
      ctx2[9]
    )
      return 1;
    if (
      /*message*/
      ctx2[16].type === "component" && /*message*/
      ctx2[16].content.component === "file"
    )
      return 2;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
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
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(target, anchor);
      }
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        }
      } else {
        if (if_block) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        } else {
          if_block = null;
        }
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
        detach(if_block_anchor);
      }
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d(detaching);
      }
    }
  };
}
function instance$7($$self, $$props, $$invalidate) {
  let { latex_delimiters } = $$props;
  let { sanitize_html } = $$props;
  let { _fetch } = $$props;
  let { i18n } = $$props;
  let { line_breaks } = $$props;
  let { upload } = $$props;
  let { target } = $$props;
  let { root } = $$props;
  let { theme_mode } = $$props;
  let { _components } = $$props;
  let { render_markdown } = $$props;
  let { scroll: scroll2 } = $$props;
  let { allow_file_downloads } = $$props;
  let { display_consecutive_in_same_bubble } = $$props;
  let { thought_index } = $$props;
  let { allow_tags = false } = $$props;
  let { message } = $$props;
  const load_handler = () => scroll2();
  $$self.$$set = ($$props2) => {
    if ("latex_delimiters" in $$props2)
      $$invalidate(0, latex_delimiters = $$props2.latex_delimiters);
    if ("sanitize_html" in $$props2)
      $$invalidate(1, sanitize_html = $$props2.sanitize_html);
    if ("_fetch" in $$props2)
      $$invalidate(2, _fetch = $$props2._fetch);
    if ("i18n" in $$props2)
      $$invalidate(3, i18n = $$props2.i18n);
    if ("line_breaks" in $$props2)
      $$invalidate(4, line_breaks = $$props2.line_breaks);
    if ("upload" in $$props2)
      $$invalidate(5, upload = $$props2.upload);
    if ("target" in $$props2)
      $$invalidate(6, target = $$props2.target);
    if ("root" in $$props2)
      $$invalidate(7, root = $$props2.root);
    if ("theme_mode" in $$props2)
      $$invalidate(8, theme_mode = $$props2.theme_mode);
    if ("_components" in $$props2)
      $$invalidate(9, _components = $$props2._components);
    if ("render_markdown" in $$props2)
      $$invalidate(10, render_markdown = $$props2.render_markdown);
    if ("scroll" in $$props2)
      $$invalidate(11, scroll2 = $$props2.scroll);
    if ("allow_file_downloads" in $$props2)
      $$invalidate(12, allow_file_downloads = $$props2.allow_file_downloads);
    if ("display_consecutive_in_same_bubble" in $$props2)
      $$invalidate(13, display_consecutive_in_same_bubble = $$props2.display_consecutive_in_same_bubble);
    if ("thought_index" in $$props2)
      $$invalidate(14, thought_index = $$props2.thought_index);
    if ("allow_tags" in $$props2)
      $$invalidate(15, allow_tags = $$props2.allow_tags);
    if ("message" in $$props2)
      $$invalidate(16, message = $$props2.message);
  };
  return [
    latex_delimiters,
    sanitize_html,
    _fetch,
    i18n,
    line_breaks,
    upload,
    target,
    root,
    theme_mode,
    _components,
    render_markdown,
    scroll2,
    allow_file_downloads,
    display_consecutive_in_same_bubble,
    thought_index,
    allow_tags,
    message,
    load_handler
  ];
}
class MessageContent extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$7, safe_not_equal, {
      latex_delimiters: 0,
      sanitize_html: 1,
      _fetch: 2,
      i18n: 3,
      line_breaks: 4,
      upload: 5,
      target: 6,
      root: 7,
      theme_mode: 8,
      _components: 9,
      render_markdown: 10,
      scroll: 11,
      allow_file_downloads: 12,
      display_consecutive_in_same_bubble: 13,
      thought_index: 14,
      allow_tags: 15,
      message: 16
    });
  }
}
function get_each_context$3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[27] = list[i];
  child_ctx[29] = i;
  return child_ctx;
}
function create_if_block_7$2(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { class: true });
      children(span).forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "loading-spinner svelte-1qn6r4f");
    },
    m(target, anchor) {
      insert_hydration(target, span, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_if_block_2$3(ctx) {
  let span;
  let t;
  let if_block0 = (
    /*thought_node*/
    ctx[17].metadata.log && create_if_block_6$2(ctx)
  );
  let if_block1 = (
    /*thought_node*/
    ctx[17].metadata.duration !== void 0 && create_if_block_3$3(ctx)
  );
  return {
    c() {
      span = element("span");
      if (if_block0)
        if_block0.c();
      t = space();
      if (if_block1)
        if_block1.c();
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      if (if_block0)
        if_block0.l(span_nodes);
      t = claim_space(span_nodes);
      if (if_block1)
        if_block1.l(span_nodes);
      span_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "duration svelte-1qn6r4f");
    },
    m(target, anchor) {
      insert_hydration(target, span, anchor);
      if (if_block0)
        if_block0.m(span, null);
      append_hydration(span, t);
      if (if_block1)
        if_block1.m(span, null);
    },
    p(ctx2, dirty) {
      if (
        /*thought_node*/
        ctx2[17].metadata.log
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_6$2(ctx2);
          if_block0.c();
          if_block0.m(span, t);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (
        /*thought_node*/
        ctx2[17].metadata.duration !== void 0
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block_3$3(ctx2);
          if_block1.c();
          if_block1.m(span, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
    }
  };
}
function create_if_block_6$2(ctx) {
  let t_value = (
    /*thought_node*/
    ctx[17].metadata.log + ""
  );
  let t;
  return {
    c() {
      t = text(t_value);
    },
    l(nodes) {
      t = claim_text(nodes, t_value);
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*thought_node*/
      131072 && t_value !== (t_value = /*thought_node*/
      ctx2[17].metadata.log + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_if_block_3$3(ctx) {
  let t0;
  let show_if;
  let t1;
  function select_block_type(ctx2, dirty) {
    if (dirty & /*thought_node*/
    131072)
      show_if = null;
    if (show_if == null)
      show_if = !!Number.isInteger(
        /*thought_node*/
        ctx2[17].metadata.duration
      );
    if (show_if)
      return create_if_block_4$3;
    if (
      /*thought_node*/
      ctx2[17].metadata.duration >= 0.1
    )
      return create_if_block_5$2;
    return create_else_block$3;
  }
  let current_block_type = select_block_type(ctx, -1);
  let if_block = current_block_type(ctx);
  return {
    c() {
      t0 = text("(");
      if_block.c();
      t1 = text(")");
    },
    l(nodes) {
      t0 = claim_text(nodes, "(");
      if_block.l(nodes);
      t1 = claim_text(nodes, ")");
    },
    m(target, anchor) {
      insert_hydration(target, t0, anchor);
      if_block.m(target, anchor);
      insert_hydration(target, t1, anchor);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx2, dirty)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(t1.parentNode, t1);
        }
      }
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
      }
      if_block.d(detaching);
    }
  };
}
function create_else_block$3(ctx) {
  let t0_value = (
    /*thought_node*/
    (ctx[17].metadata.duration * 1e3).toFixed(1) + ""
  );
  let t0;
  let t1;
  return {
    c() {
      t0 = text(t0_value);
      t1 = text("ms");
    },
    l(nodes) {
      t0 = claim_text(nodes, t0_value);
      t1 = claim_text(nodes, "ms");
    },
    m(target, anchor) {
      insert_hydration(target, t0, anchor);
      insert_hydration(target, t1, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*thought_node*/
      131072 && t0_value !== (t0_value = /*thought_node*/
      (ctx2[17].metadata.duration * 1e3).toFixed(1) + ""))
        set_data(t0, t0_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
      }
    }
  };
}
function create_if_block_5$2(ctx) {
  let t0_value = (
    /*thought_node*/
    ctx[17].metadata.duration.toFixed(1) + ""
  );
  let t0;
  let t1;
  return {
    c() {
      t0 = text(t0_value);
      t1 = text("s");
    },
    l(nodes) {
      t0 = claim_text(nodes, t0_value);
      t1 = claim_text(nodes, "s");
    },
    m(target, anchor) {
      insert_hydration(target, t0, anchor);
      insert_hydration(target, t1, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*thought_node*/
      131072 && t0_value !== (t0_value = /*thought_node*/
      ctx2[17].metadata.duration.toFixed(1) + ""))
        set_data(t0, t0_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
      }
    }
  };
}
function create_if_block_4$3(ctx) {
  let t0_value = (
    /*thought_node*/
    ctx[17].metadata.duration + ""
  );
  let t0;
  let t1;
  return {
    c() {
      t0 = text(t0_value);
      t1 = text("s");
    },
    l(nodes) {
      t0 = claim_text(nodes, t0_value);
      t1 = claim_text(nodes, "s");
    },
    m(target, anchor) {
      insert_hydration(target, t0, anchor);
      insert_hydration(target, t1, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*thought_node*/
      131072 && t0_value !== (t0_value = /*thought_node*/
      ctx2[17].metadata.duration + ""))
        set_data(t0, t0_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
      }
    }
  };
}
function create_if_block$5(ctx) {
  var _a;
  let div;
  let messagecontent;
  let t;
  let div_transition;
  let current;
  let mounted;
  let dispose;
  messagecontent = new MessageContent({
    props: {
      message: (
        /*thought_node*/
        ctx[17]
      ),
      sanitize_html: (
        /*sanitize_html*/
        ctx[1]
      ),
      allow_tags: (
        /*allow_tags*/
        ctx[16]
      ),
      latex_delimiters: (
        /*latex_delimiters*/
        ctx[2]
      ),
      render_markdown: (
        /*render_markdown*/
        ctx[3]
      ),
      _components: (
        /*_components*/
        ctx[4]
      ),
      upload: (
        /*upload*/
        ctx[5]
      ),
      thought_index: (
        /*thought_index*/
        ctx[6]
      ),
      target: (
        /*target*/
        ctx[7]
      ),
      root: (
        /*root*/
        ctx[8]
      ),
      theme_mode: (
        /*theme_mode*/
        ctx[9]
      ),
      _fetch: (
        /*_fetch*/
        ctx[10]
      ),
      scroll: (
        /*scroll*/
        ctx[11]
      ),
      allow_file_downloads: (
        /*allow_file_downloads*/
        ctx[12]
      ),
      display_consecutive_in_same_bubble: (
        /*display_consecutive_in_same_bubble*/
        ctx[13]
      ),
      i18n: (
        /*i18n*/
        ctx[14]
      ),
      line_breaks: (
        /*line_breaks*/
        ctx[15]
      )
    }
  });
  let if_block = (
    /*thought_node*/
    ((_a = ctx[17].children) == null ? void 0 : _a.length) > 0 && create_if_block_1$4(ctx)
  );
  return {
    c() {
      div = element("div");
      create_component(messagecontent.$$.fragment);
      t = space();
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(messagecontent.$$.fragment, div_nodes);
      t = claim_space(div_nodes);
      if (if_block)
        if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      var _a2;
      attr(div, "class", "svelte-1qn6r4f");
      toggle_class(
        div,
        "content",
        /*expanded*/
        ctx[19]
      );
      toggle_class(div, "content-preview", !/*expanded*/
      ctx[19] && /*thought_node*/
      ((_a2 = ctx[17].metadata) == null ? void 0 : _a2.status) !== "done");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(messagecontent, div, null);
      append_hydration(div, t);
      if (if_block)
        if_block.m(div, null);
      ctx[24](div);
      current = true;
      if (!mounted) {
        dispose = listen(
          div,
          "scroll",
          /*handleScroll*/
          ctx[21]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      var _a2, _b;
      const messagecontent_changes = {};
      if (dirty & /*thought_node*/
      131072)
        messagecontent_changes.message = /*thought_node*/
        ctx2[17];
      if (dirty & /*sanitize_html*/
      2)
        messagecontent_changes.sanitize_html = /*sanitize_html*/
        ctx2[1];
      if (dirty & /*allow_tags*/
      65536)
        messagecontent_changes.allow_tags = /*allow_tags*/
        ctx2[16];
      if (dirty & /*latex_delimiters*/
      4)
        messagecontent_changes.latex_delimiters = /*latex_delimiters*/
        ctx2[2];
      if (dirty & /*render_markdown*/
      8)
        messagecontent_changes.render_markdown = /*render_markdown*/
        ctx2[3];
      if (dirty & /*_components*/
      16)
        messagecontent_changes._components = /*_components*/
        ctx2[4];
      if (dirty & /*upload*/
      32)
        messagecontent_changes.upload = /*upload*/
        ctx2[5];
      if (dirty & /*thought_index*/
      64)
        messagecontent_changes.thought_index = /*thought_index*/
        ctx2[6];
      if (dirty & /*target*/
      128)
        messagecontent_changes.target = /*target*/
        ctx2[7];
      if (dirty & /*root*/
      256)
        messagecontent_changes.root = /*root*/
        ctx2[8];
      if (dirty & /*theme_mode*/
      512)
        messagecontent_changes.theme_mode = /*theme_mode*/
        ctx2[9];
      if (dirty & /*_fetch*/
      1024)
        messagecontent_changes._fetch = /*_fetch*/
        ctx2[10];
      if (dirty & /*scroll*/
      2048)
        messagecontent_changes.scroll = /*scroll*/
        ctx2[11];
      if (dirty & /*allow_file_downloads*/
      4096)
        messagecontent_changes.allow_file_downloads = /*allow_file_downloads*/
        ctx2[12];
      if (dirty & /*display_consecutive_in_same_bubble*/
      8192)
        messagecontent_changes.display_consecutive_in_same_bubble = /*display_consecutive_in_same_bubble*/
        ctx2[13];
      if (dirty & /*i18n*/
      16384)
        messagecontent_changes.i18n = /*i18n*/
        ctx2[14];
      if (dirty & /*line_breaks*/
      32768)
        messagecontent_changes.line_breaks = /*line_breaks*/
        ctx2[15];
      messagecontent.$set(messagecontent_changes);
      if (
        /*thought_node*/
        ((_a2 = ctx2[17].children) == null ? void 0 : _a2.length) > 0
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*thought_node*/
          131072) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_1$4(ctx2);
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
      if (!current || dirty & /*expanded*/
      524288) {
        toggle_class(
          div,
          "content",
          /*expanded*/
          ctx2[19]
        );
      }
      if (!current || dirty & /*expanded, thought_node*/
      655360) {
        toggle_class(div, "content-preview", !/*expanded*/
        ctx2[19] && /*thought_node*/
        ((_b = ctx2[17].metadata) == null ? void 0 : _b.status) !== "done");
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(messagecontent.$$.fragment, local);
      transition_in(if_block);
      if (local) {
        add_render_callback(() => {
          if (!current)
            return;
          if (!div_transition)
            div_transition = create_bidirectional_transition(div, slide, {}, true);
          div_transition.run(1);
        });
      }
      current = true;
    },
    o(local) {
      transition_out(messagecontent.$$.fragment, local);
      transition_out(if_block);
      if (local) {
        if (!div_transition)
          div_transition = create_bidirectional_transition(div, slide, {}, false);
        div_transition.run(0);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(messagecontent);
      if (if_block)
        if_block.d();
      ctx[24](null);
      if (detaching && div_transition)
        div_transition.end();
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_1$4(ctx) {
  let div;
  let current;
  let each_value = ensure_array_like(
    /*thought_node*/
    ctx[17].children
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div_nodes);
      }
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "children svelte-1qn6r4f");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div, null);
        }
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*thought_node, rtl, sanitize_html, latex_delimiters, render_markdown, _components, upload, thought_index, target, root, theme_mode, _fetch, scroll, allow_file_downloads, display_consecutive_in_same_bubble, i18n, line_breaks*/
      196607) {
        each_value = ensure_array_like(
          /*thought_node*/
          ctx2[17].children
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$3(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$3(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
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
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_each_block$3(ctx) {
  let thought_1;
  let current;
  thought_1 = new Thought({
    props: {
      thought: (
        /*child*/
        ctx[27]
      ),
      rtl: (
        /*rtl*/
        ctx[0]
      ),
      sanitize_html: (
        /*sanitize_html*/
        ctx[1]
      ),
      latex_delimiters: (
        /*latex_delimiters*/
        ctx[2]
      ),
      render_markdown: (
        /*render_markdown*/
        ctx[3]
      ),
      _components: (
        /*_components*/
        ctx[4]
      ),
      upload: (
        /*upload*/
        ctx[5]
      ),
      thought_index: (
        /*thought_index*/
        ctx[6] + 1
      ),
      target: (
        /*target*/
        ctx[7]
      ),
      root: (
        /*root*/
        ctx[8]
      ),
      theme_mode: (
        /*theme_mode*/
        ctx[9]
      ),
      _fetch: (
        /*_fetch*/
        ctx[10]
      ),
      scroll: (
        /*scroll*/
        ctx[11]
      ),
      allow_file_downloads: (
        /*allow_file_downloads*/
        ctx[12]
      ),
      display_consecutive_in_same_bubble: (
        /*display_consecutive_in_same_bubble*/
        ctx[13]
      ),
      i18n: (
        /*i18n*/
        ctx[14]
      ),
      line_breaks: (
        /*line_breaks*/
        ctx[15]
      )
    }
  });
  return {
    c() {
      create_component(thought_1.$$.fragment);
    },
    l(nodes) {
      claim_component(thought_1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(thought_1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const thought_1_changes = {};
      if (dirty & /*thought_node*/
      131072)
        thought_1_changes.thought = /*child*/
        ctx2[27];
      if (dirty & /*rtl*/
      1)
        thought_1_changes.rtl = /*rtl*/
        ctx2[0];
      if (dirty & /*sanitize_html*/
      2)
        thought_1_changes.sanitize_html = /*sanitize_html*/
        ctx2[1];
      if (dirty & /*latex_delimiters*/
      4)
        thought_1_changes.latex_delimiters = /*latex_delimiters*/
        ctx2[2];
      if (dirty & /*render_markdown*/
      8)
        thought_1_changes.render_markdown = /*render_markdown*/
        ctx2[3];
      if (dirty & /*_components*/
      16)
        thought_1_changes._components = /*_components*/
        ctx2[4];
      if (dirty & /*upload*/
      32)
        thought_1_changes.upload = /*upload*/
        ctx2[5];
      if (dirty & /*thought_index*/
      64)
        thought_1_changes.thought_index = /*thought_index*/
        ctx2[6] + 1;
      if (dirty & /*target*/
      128)
        thought_1_changes.target = /*target*/
        ctx2[7];
      if (dirty & /*root*/
      256)
        thought_1_changes.root = /*root*/
        ctx2[8];
      if (dirty & /*theme_mode*/
      512)
        thought_1_changes.theme_mode = /*theme_mode*/
        ctx2[9];
      if (dirty & /*_fetch*/
      1024)
        thought_1_changes._fetch = /*_fetch*/
        ctx2[10];
      if (dirty & /*scroll*/
      2048)
        thought_1_changes.scroll = /*scroll*/
        ctx2[11];
      if (dirty & /*allow_file_downloads*/
      4096)
        thought_1_changes.allow_file_downloads = /*allow_file_downloads*/
        ctx2[12];
      if (dirty & /*display_consecutive_in_same_bubble*/
      8192)
        thought_1_changes.display_consecutive_in_same_bubble = /*display_consecutive_in_same_bubble*/
        ctx2[13];
      if (dirty & /*i18n*/
      16384)
        thought_1_changes.i18n = /*i18n*/
        ctx2[14];
      if (dirty & /*line_breaks*/
      32768)
        thought_1_changes.line_breaks = /*line_breaks*/
        ctx2[15];
      thought_1.$set(thought_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(thought_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(thought_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(thought_1, detaching);
    }
  };
}
function create_fragment$6(ctx) {
  var _a, _b, _c, _d, _e, _f, _g;
  let div1;
  let div0;
  let span;
  let iconbutton;
  let t0;
  let markdown;
  let t1;
  let t2;
  let div0_aria_busy_value;
  let t3;
  let current;
  let mounted;
  let dispose;
  iconbutton = new IconButton({ props: { Icon: DropdownCircularArrow } });
  markdown = new MarkdownCode({
    props: {
      message: (
        /*thought_node*/
        ((_a = ctx[17].metadata) == null ? void 0 : _a.title) || ""
      ),
      render_markdown: (
        /*render_markdown*/
        ctx[3]
      ),
      latex_delimiters: (
        /*latex_delimiters*/
        ctx[2]
      ),
      sanitize_html: (
        /*sanitize_html*/
        ctx[1]
      ),
      root: (
        /*root*/
        ctx[8]
      ),
      allow_tags: (
        /*allow_tags*/
        ctx[16]
      )
    }
  });
  let if_block0 = (
    /*thought_node*/
    ((_b = ctx[17].metadata) == null ? void 0 : _b.status) === "pending" && create_if_block_7$2()
  );
  let if_block1 = (
    /*thought_node*/
    (((_d = (_c = ctx[17]) == null ? void 0 : _c.metadata) == null ? void 0 : _d.log) || /*thought_node*/
    ((_f = (_e = ctx[17]) == null ? void 0 : _e.metadata) == null ? void 0 : _f.duration)) && create_if_block_2$3(ctx)
  );
  let if_block2 = (
    /*expanded*/
    (ctx[19] || /*thought_node*/
    ((_g = ctx[17].metadata) == null ? void 0 : _g.status) !== "done") && create_if_block$5(ctx)
  );
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      span = element("span");
      create_component(iconbutton.$$.fragment);
      t0 = space();
      create_component(markdown.$$.fragment);
      t1 = space();
      if (if_block0)
        if_block0.c();
      t2 = space();
      if (if_block1)
        if_block1.c();
      t3 = space();
      if (if_block2)
        if_block2.c();
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true,
        "aria-busy": true,
        role: true,
        tabindex: true
      });
      var div0_nodes = children(div0);
      span = claim_element(div0_nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      claim_component(iconbutton.$$.fragment, span_nodes);
      span_nodes.forEach(detach);
      t0 = claim_space(div0_nodes);
      claim_component(markdown.$$.fragment, div0_nodes);
      t1 = claim_space(div0_nodes);
      if (if_block0)
        if_block0.l(div0_nodes);
      t2 = claim_space(div0_nodes);
      if (if_block1)
        if_block1.l(div0_nodes);
      div0_nodes.forEach(detach);
      t3 = claim_space(div1_nodes);
      if (if_block2)
        if_block2.l(div1_nodes);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "arrow svelte-1qn6r4f");
      set_style(
        span,
        "transform",
        /*expanded*/
        ctx[19] ? "rotate(180deg)" : "rotate(0deg)"
      );
      attr(div0, "class", "title svelte-1qn6r4f");
      attr(div0, "aria-busy", div0_aria_busy_value = /*thought_node*/
      ctx[17].content === "" || /*thought_node*/
      ctx[17].content === null);
      attr(div0, "role", "button");
      attr(div0, "tabindex", "0");
      toggle_class(
        div0,
        "expanded",
        /*expanded*/
        ctx[19]
      );
      attr(div1, "class", "thought-group svelte-1qn6r4f");
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      append_hydration(div1, div0);
      append_hydration(div0, span);
      mount_component(iconbutton, span, null);
      append_hydration(div0, t0);
      mount_component(markdown, div0, null);
      append_hydration(div0, t1);
      if (if_block0)
        if_block0.m(div0, null);
      append_hydration(div0, t2);
      if (if_block1)
        if_block1.m(div0, null);
      append_hydration(div1, t3);
      if (if_block2)
        if_block2.m(div1, null);
      current = true;
      if (!mounted) {
        dispose = [
          listen(div0, "click", stop_propagation(
            /*toggleExpanded*/
            ctx[20]
          )),
          listen(
            div0,
            "keydown",
            /*keydown_handler*/
            ctx[23]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2;
      if (dirty & /*expanded*/
      524288) {
        set_style(
          span,
          "transform",
          /*expanded*/
          ctx2[19] ? "rotate(180deg)" : "rotate(0deg)"
        );
      }
      const markdown_changes = {};
      if (dirty & /*thought_node*/
      131072)
        markdown_changes.message = /*thought_node*/
        ((_a2 = ctx2[17].metadata) == null ? void 0 : _a2.title) || "";
      if (dirty & /*render_markdown*/
      8)
        markdown_changes.render_markdown = /*render_markdown*/
        ctx2[3];
      if (dirty & /*latex_delimiters*/
      4)
        markdown_changes.latex_delimiters = /*latex_delimiters*/
        ctx2[2];
      if (dirty & /*sanitize_html*/
      2)
        markdown_changes.sanitize_html = /*sanitize_html*/
        ctx2[1];
      if (dirty & /*root*/
      256)
        markdown_changes.root = /*root*/
        ctx2[8];
      if (dirty & /*allow_tags*/
      65536)
        markdown_changes.allow_tags = /*allow_tags*/
        ctx2[16];
      markdown.$set(markdown_changes);
      if (
        /*thought_node*/
        ((_b2 = ctx2[17].metadata) == null ? void 0 : _b2.status) === "pending"
      ) {
        if (if_block0)
          ;
        else {
          if_block0 = create_if_block_7$2();
          if_block0.c();
          if_block0.m(div0, t2);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (
        /*thought_node*/
        ((_d2 = (_c2 = ctx2[17]) == null ? void 0 : _c2.metadata) == null ? void 0 : _d2.log) || /*thought_node*/
        ((_f2 = (_e2 = ctx2[17]) == null ? void 0 : _e2.metadata) == null ? void 0 : _f2.duration)
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block_2$3(ctx2);
          if_block1.c();
          if_block1.m(div0, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (!current || dirty & /*thought_node*/
      131072 && div0_aria_busy_value !== (div0_aria_busy_value = /*thought_node*/
      ctx2[17].content === "" || /*thought_node*/
      ctx2[17].content === null)) {
        attr(div0, "aria-busy", div0_aria_busy_value);
      }
      if (!current || dirty & /*expanded*/
      524288) {
        toggle_class(
          div0,
          "expanded",
          /*expanded*/
          ctx2[19]
        );
      }
      if (
        /*expanded*/
        ctx2[19] || /*thought_node*/
        ((_g2 = ctx2[17].metadata) == null ? void 0 : _g2.status) !== "done"
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
          if (dirty & /*expanded, thought_node*/
          655360) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block$5(ctx2);
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
    },
    i(local) {
      if (current)
        return;
      transition_in(iconbutton.$$.fragment, local);
      transition_in(markdown.$$.fragment, local);
      transition_in(if_block2);
      current = true;
    },
    o(local) {
      transition_out(iconbutton.$$.fragment, local);
      transition_out(markdown.$$.fragment, local);
      transition_out(if_block2);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      destroy_component(iconbutton);
      destroy_component(markdown);
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
function is_thought_node(msg) {
  return "children" in msg;
}
function instance$6($$self, $$props, $$invalidate) {
  let { thought } = $$props;
  let { rtl = false } = $$props;
  let { sanitize_html } = $$props;
  let { latex_delimiters } = $$props;
  let { render_markdown } = $$props;
  let { _components } = $$props;
  let { upload } = $$props;
  let { thought_index } = $$props;
  let { target } = $$props;
  let { root } = $$props;
  let { theme_mode } = $$props;
  let { _fetch } = $$props;
  let { scroll: scroll2 } = $$props;
  let { allow_file_downloads } = $$props;
  let { display_consecutive_in_same_bubble } = $$props;
  let { i18n } = $$props;
  let { line_breaks } = $$props;
  let { allow_tags = false } = $$props;
  let thought_node;
  let expanded = false;
  let contentPreviewElement;
  let userIsScrolling = false;
  function toggleExpanded() {
    $$invalidate(19, expanded = !expanded);
  }
  function scrollToBottom() {
    if (contentPreviewElement && !userIsScrolling) {
      $$invalidate(18, contentPreviewElement.scrollTop = contentPreviewElement.scrollHeight, contentPreviewElement);
    }
  }
  function handleScroll() {
    if (contentPreviewElement) {
      const isAtBottom = contentPreviewElement.scrollHeight - contentPreviewElement.scrollTop <= contentPreviewElement.clientHeight + 10;
      if (!isAtBottom) {
        userIsScrolling = true;
      }
    }
  }
  const keydown_handler = (e) => e.key === "Enter" && toggleExpanded();
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      contentPreviewElement = $$value;
      $$invalidate(18, contentPreviewElement);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("thought" in $$props2)
      $$invalidate(22, thought = $$props2.thought);
    if ("rtl" in $$props2)
      $$invalidate(0, rtl = $$props2.rtl);
    if ("sanitize_html" in $$props2)
      $$invalidate(1, sanitize_html = $$props2.sanitize_html);
    if ("latex_delimiters" in $$props2)
      $$invalidate(2, latex_delimiters = $$props2.latex_delimiters);
    if ("render_markdown" in $$props2)
      $$invalidate(3, render_markdown = $$props2.render_markdown);
    if ("_components" in $$props2)
      $$invalidate(4, _components = $$props2._components);
    if ("upload" in $$props2)
      $$invalidate(5, upload = $$props2.upload);
    if ("thought_index" in $$props2)
      $$invalidate(6, thought_index = $$props2.thought_index);
    if ("target" in $$props2)
      $$invalidate(7, target = $$props2.target);
    if ("root" in $$props2)
      $$invalidate(8, root = $$props2.root);
    if ("theme_mode" in $$props2)
      $$invalidate(9, theme_mode = $$props2.theme_mode);
    if ("_fetch" in $$props2)
      $$invalidate(10, _fetch = $$props2._fetch);
    if ("scroll" in $$props2)
      $$invalidate(11, scroll2 = $$props2.scroll);
    if ("allow_file_downloads" in $$props2)
      $$invalidate(12, allow_file_downloads = $$props2.allow_file_downloads);
    if ("display_consecutive_in_same_bubble" in $$props2)
      $$invalidate(13, display_consecutive_in_same_bubble = $$props2.display_consecutive_in_same_bubble);
    if ("i18n" in $$props2)
      $$invalidate(14, i18n = $$props2.i18n);
    if ("line_breaks" in $$props2)
      $$invalidate(15, line_breaks = $$props2.line_breaks);
    if ("allow_tags" in $$props2)
      $$invalidate(16, allow_tags = $$props2.allow_tags);
  };
  $$self.$$.update = () => {
    var _a;
    if ($$self.$$.dirty & /*thought*/
    4194304) {
      $$invalidate(17, thought_node = {
        ...thought,
        children: is_thought_node(thought) ? thought.children : []
      });
    }
    if ($$self.$$.dirty & /*thought_node, contentPreviewElement*/
    393216) {
      if (thought_node.content && contentPreviewElement && ((_a = thought_node.metadata) == null ? void 0 : _a.status) !== "done") {
        setTimeout(scrollToBottom, 0);
      }
    }
  };
  return [
    rtl,
    sanitize_html,
    latex_delimiters,
    render_markdown,
    _components,
    upload,
    thought_index,
    target,
    root,
    theme_mode,
    _fetch,
    scroll2,
    allow_file_downloads,
    display_consecutive_in_same_bubble,
    i18n,
    line_breaks,
    allow_tags,
    thought_node,
    contentPreviewElement,
    expanded,
    toggleExpanded,
    handleScroll,
    thought,
    keydown_handler,
    div_binding
  ];
}
class Thought extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$6, safe_not_equal, {
      thought: 22,
      rtl: 0,
      sanitize_html: 1,
      latex_delimiters: 2,
      render_markdown: 3,
      _components: 4,
      upload: 5,
      thought_index: 6,
      target: 7,
      root: 8,
      theme_mode: 9,
      _fetch: 10,
      scroll: 11,
      allow_file_downloads: 12,
      display_consecutive_in_same_bubble: 13,
      i18n: 14,
      line_breaks: 15,
      allow_tags: 16
    });
  }
}
function get_each_context$2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[48] = list[i];
  child_ctx[49] = list;
  child_ctx[50] = i;
  return child_ctx;
}
function create_if_block_4$2(ctx) {
  var _a;
  let div;
  let image;
  let current;
  image = new Image({
    props: {
      class: "avatar-image",
      src: (
        /*avatar_img*/
        (_a = ctx[2]) == null ? void 0 : _a.url
      ),
      alt: (
        /*role*/
        ctx[4] + " avatar"
      )
    }
  });
  return {
    c() {
      div = element("div");
      create_component(image.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(image.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "avatar-container svelte-yaaj3");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(image, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      var _a2;
      const image_changes = {};
      if (dirty[0] & /*avatar_img*/
      4)
        image_changes.src = /*avatar_img*/
        (_a2 = ctx2[2]) == null ? void 0 : _a2.url;
      if (dirty[0] & /*role*/
      16)
        image_changes.alt = /*role*/
        ctx2[4] + " avatar";
      image.$set(image_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(image.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(image.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(image);
    }
  };
}
function create_else_block$2(ctx) {
  let div;
  let current_block_type_index;
  let if_block;
  let div_dir_value;
  let div_aria_label_value;
  let thought_index = (
    /*thought_index*/
    ctx[50]
  );
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block_3$2, create_else_block_1$1];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    var _a, _b;
    if (
      /*message*/
      (_b = (_a = ctx2[48]) == null ? void 0 : _a.metadata) == null ? void 0 : _b.title
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type_1(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  const assign_div = () => (
    /*div_binding*/
    ctx[44](div, thought_index)
  );
  const unassign_div = () => (
    /*div_binding*/
    ctx[44](null, thought_index)
  );
  function click_handler() {
    return (
      /*click_handler*/
      ctx[45](
        /*message*/
        ctx[48]
      )
    );
  }
  function keydown_handler(...args) {
    return (
      /*keydown_handler*/
      ctx[46](
        /*message*/
        ctx[48],
        ...args
      )
    );
  }
  return {
    c() {
      div = element("div");
      if_block.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {
        "data-testid": true,
        dir: true,
        "aria-label": true,
        class: true
      });
      var div_nodes = children(div);
      if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(
        div,
        "data-testid",
        /*role*/
        ctx[4]
      );
      attr(div, "dir", div_dir_value = /*rtl*/
      ctx[12] ? "rtl" : "ltr");
      attr(div, "aria-label", div_aria_label_value = /*role*/
      ctx[4] + "'s message: " + get_message_label_data(
        /*message*/
        ctx[48]
      ));
      attr(div, "class", "svelte-yaaj3");
      toggle_class(
        div,
        "latest",
        /*i*/
        ctx[21] === /*value*/
        ctx[1].length - 1
      );
      toggle_class(div, "message-markdown-disabled", !/*render_markdown*/
      ctx[7]);
      toggle_class(
        div,
        "selectable",
        /*selectable*/
        ctx[10]
      );
      set_style(div, "user-select", `text`);
      set_style(
        div,
        "cursor",
        /*selectable*/
        ctx[10] ? "pointer" : "auto"
      );
      set_style(
        div,
        "text-align",
        /*rtl*/
        ctx[12] ? "right" : "left"
      );
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if_blocks[current_block_type_index].m(div, null);
      assign_div();
      current = true;
      if (!mounted) {
        dispose = [
          listen(div, "click", click_handler),
          listen(div, "keydown", keydown_handler)
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        } else {
          if_block.p(ctx, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(div, null);
      }
      if (!current || dirty[0] & /*role*/
      16) {
        attr(
          div,
          "data-testid",
          /*role*/
          ctx[4]
        );
      }
      if (!current || dirty[0] & /*rtl*/
      4096 && div_dir_value !== (div_dir_value = /*rtl*/
      ctx[12] ? "rtl" : "ltr")) {
        attr(div, "dir", div_dir_value);
      }
      if (!current || dirty[0] & /*role, messages*/
      48 && div_aria_label_value !== (div_aria_label_value = /*role*/
      ctx[4] + "'s message: " + get_message_label_data(
        /*message*/
        ctx[48]
      ))) {
        attr(div, "aria-label", div_aria_label_value);
      }
      if (thought_index !== /*thought_index*/
      ctx[50]) {
        unassign_div();
        thought_index = /*thought_index*/
        ctx[50];
        assign_div();
      }
      if (!current || dirty[0] & /*i, value*/
      2097154) {
        toggle_class(
          div,
          "latest",
          /*i*/
          ctx[21] === /*value*/
          ctx[1].length - 1
        );
      }
      if (!current || dirty[0] & /*render_markdown*/
      128) {
        toggle_class(div, "message-markdown-disabled", !/*render_markdown*/
        ctx[7]);
      }
      if (!current || dirty[0] & /*selectable*/
      1024) {
        toggle_class(
          div,
          "selectable",
          /*selectable*/
          ctx[10]
        );
      }
      if (dirty[0] & /*selectable*/
      1024) {
        set_style(
          div,
          "cursor",
          /*selectable*/
          ctx[10] ? "pointer" : "auto"
        );
      }
      if (dirty[0] & /*rtl*/
      4096) {
        set_style(
          div,
          "text-align",
          /*rtl*/
          ctx[12] ? "right" : "left"
        );
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
      if_blocks[current_block_type_index].d();
      unassign_div();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_2$2(ctx) {
  let textarea;
  let mounted;
  let dispose;
  return {
    c() {
      textarea = element("textarea");
      this.h();
    },
    l(nodes) {
      textarea = claim_element(nodes, "TEXTAREA", { class: true });
      children(textarea).forEach(detach);
      this.h();
    },
    h() {
      attr(textarea, "class", "edit-textarea svelte-yaaj3");
      textarea.autofocus = true;
      set_style(textarea, "width", `max(${/*last_message_width*/
      ctx[30]}px, 160px)`);
      set_style(textarea, "min-height", `${/*last_message_height*/
      ctx[31]}px`);
    },
    m(target, anchor) {
      insert_hydration(target, textarea, anchor);
      set_input_value(
        textarea,
        /*edit_message*/
        ctx[0]
      );
      textarea.focus();
      if (!mounted) {
        dispose = listen(
          textarea,
          "input",
          /*textarea_input_handler*/
          ctx[43]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*edit_message*/
      1) {
        set_input_value(
          textarea,
          /*edit_message*/
          ctx2[0]
        );
      }
      if (dirty[0] & /*last_message_width*/
      1073741824) {
        set_style(textarea, "width", `max(${/*last_message_width*/
        ctx2[30]}px, 160px)`);
      }
      if (dirty[1] & /*last_message_height*/
      1) {
        set_style(textarea, "min-height", `${/*last_message_height*/
        ctx2[31]}px`);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(textarea);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_else_block_1$1(ctx) {
  let messagecontent;
  let current;
  messagecontent = new MessageContent({
    props: {
      message: (
        /*message*/
        ctx[48]
      ),
      sanitize_html: (
        /*sanitize_html*/
        ctx[9]
      ),
      allow_tags: (
        /*allow_tags*/
        ctx[27]
      ),
      latex_delimiters: (
        /*latex_delimiters*/
        ctx[8]
      ),
      render_markdown: (
        /*render_markdown*/
        ctx[7]
      ),
      _components: (
        /*_components*/
        ctx[20]
      ),
      upload: (
        /*upload*/
        ctx[16]
      ),
      thought_index: (
        /*thought_index*/
        ctx[50]
      ),
      target: (
        /*target*/
        ctx[17]
      ),
      root: (
        /*root*/
        ctx[18]
      ),
      theme_mode: (
        /*theme_mode*/
        ctx[19]
      ),
      _fetch: (
        /*_fetch*/
        ctx[11]
      ),
      scroll: (
        /*scroll*/
        ctx[22]
      ),
      allow_file_downloads: (
        /*allow_file_downloads*/
        ctx[23]
      ),
      display_consecutive_in_same_bubble: (
        /*display_consecutive_in_same_bubble*/
        ctx[25]
      ),
      i18n: (
        /*i18n*/
        ctx[14]
      ),
      line_breaks: (
        /*line_breaks*/
        ctx[15]
      )
    }
  });
  return {
    c() {
      create_component(messagecontent.$$.fragment);
    },
    l(nodes) {
      claim_component(messagecontent.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(messagecontent, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const messagecontent_changes = {};
      if (dirty[0] & /*messages*/
      32)
        messagecontent_changes.message = /*message*/
        ctx2[48];
      if (dirty[0] & /*sanitize_html*/
      512)
        messagecontent_changes.sanitize_html = /*sanitize_html*/
        ctx2[9];
      if (dirty[0] & /*allow_tags*/
      134217728)
        messagecontent_changes.allow_tags = /*allow_tags*/
        ctx2[27];
      if (dirty[0] & /*latex_delimiters*/
      256)
        messagecontent_changes.latex_delimiters = /*latex_delimiters*/
        ctx2[8];
      if (dirty[0] & /*render_markdown*/
      128)
        messagecontent_changes.render_markdown = /*render_markdown*/
        ctx2[7];
      if (dirty[0] & /*_components*/
      1048576)
        messagecontent_changes._components = /*_components*/
        ctx2[20];
      if (dirty[0] & /*upload*/
      65536)
        messagecontent_changes.upload = /*upload*/
        ctx2[16];
      if (dirty[0] & /*target*/
      131072)
        messagecontent_changes.target = /*target*/
        ctx2[17];
      if (dirty[0] & /*root*/
      262144)
        messagecontent_changes.root = /*root*/
        ctx2[18];
      if (dirty[0] & /*theme_mode*/
      524288)
        messagecontent_changes.theme_mode = /*theme_mode*/
        ctx2[19];
      if (dirty[0] & /*_fetch*/
      2048)
        messagecontent_changes._fetch = /*_fetch*/
        ctx2[11];
      if (dirty[0] & /*scroll*/
      4194304)
        messagecontent_changes.scroll = /*scroll*/
        ctx2[22];
      if (dirty[0] & /*allow_file_downloads*/
      8388608)
        messagecontent_changes.allow_file_downloads = /*allow_file_downloads*/
        ctx2[23];
      if (dirty[0] & /*display_consecutive_in_same_bubble*/
      33554432)
        messagecontent_changes.display_consecutive_in_same_bubble = /*display_consecutive_in_same_bubble*/
        ctx2[25];
      if (dirty[0] & /*i18n*/
      16384)
        messagecontent_changes.i18n = /*i18n*/
        ctx2[14];
      if (dirty[0] & /*line_breaks*/
      32768)
        messagecontent_changes.line_breaks = /*line_breaks*/
        ctx2[15];
      messagecontent.$set(messagecontent_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(messagecontent.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(messagecontent.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(messagecontent, detaching);
    }
  };
}
function create_if_block_3$2(ctx) {
  let thought;
  let current;
  thought = new Thought({
    props: {
      thought: (
        /*message*/
        ctx[48]
      ),
      rtl: (
        /*rtl*/
        ctx[12]
      ),
      sanitize_html: (
        /*sanitize_html*/
        ctx[9]
      ),
      allow_tags: (
        /*allow_tags*/
        ctx[27]
      ),
      latex_delimiters: (
        /*latex_delimiters*/
        ctx[8]
      ),
      render_markdown: (
        /*render_markdown*/
        ctx[7]
      ),
      _components: (
        /*_components*/
        ctx[20]
      ),
      upload: (
        /*upload*/
        ctx[16]
      ),
      thought_index: (
        /*thought_index*/
        ctx[50]
      ),
      target: (
        /*target*/
        ctx[17]
      ),
      root: (
        /*root*/
        ctx[18]
      ),
      theme_mode: (
        /*theme_mode*/
        ctx[19]
      ),
      _fetch: (
        /*_fetch*/
        ctx[11]
      ),
      scroll: (
        /*scroll*/
        ctx[22]
      ),
      allow_file_downloads: (
        /*allow_file_downloads*/
        ctx[23]
      ),
      display_consecutive_in_same_bubble: (
        /*display_consecutive_in_same_bubble*/
        ctx[25]
      ),
      i18n: (
        /*i18n*/
        ctx[14]
      ),
      line_breaks: (
        /*line_breaks*/
        ctx[15]
      )
    }
  });
  return {
    c() {
      create_component(thought.$$.fragment);
    },
    l(nodes) {
      claim_component(thought.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(thought, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const thought_changes = {};
      if (dirty[0] & /*messages*/
      32)
        thought_changes.thought = /*message*/
        ctx2[48];
      if (dirty[0] & /*rtl*/
      4096)
        thought_changes.rtl = /*rtl*/
        ctx2[12];
      if (dirty[0] & /*sanitize_html*/
      512)
        thought_changes.sanitize_html = /*sanitize_html*/
        ctx2[9];
      if (dirty[0] & /*allow_tags*/
      134217728)
        thought_changes.allow_tags = /*allow_tags*/
        ctx2[27];
      if (dirty[0] & /*latex_delimiters*/
      256)
        thought_changes.latex_delimiters = /*latex_delimiters*/
        ctx2[8];
      if (dirty[0] & /*render_markdown*/
      128)
        thought_changes.render_markdown = /*render_markdown*/
        ctx2[7];
      if (dirty[0] & /*_components*/
      1048576)
        thought_changes._components = /*_components*/
        ctx2[20];
      if (dirty[0] & /*upload*/
      65536)
        thought_changes.upload = /*upload*/
        ctx2[16];
      if (dirty[0] & /*target*/
      131072)
        thought_changes.target = /*target*/
        ctx2[17];
      if (dirty[0] & /*root*/
      262144)
        thought_changes.root = /*root*/
        ctx2[18];
      if (dirty[0] & /*theme_mode*/
      524288)
        thought_changes.theme_mode = /*theme_mode*/
        ctx2[19];
      if (dirty[0] & /*_fetch*/
      2048)
        thought_changes._fetch = /*_fetch*/
        ctx2[11];
      if (dirty[0] & /*scroll*/
      4194304)
        thought_changes.scroll = /*scroll*/
        ctx2[22];
      if (dirty[0] & /*allow_file_downloads*/
      8388608)
        thought_changes.allow_file_downloads = /*allow_file_downloads*/
        ctx2[23];
      if (dirty[0] & /*display_consecutive_in_same_bubble*/
      33554432)
        thought_changes.display_consecutive_in_same_bubble = /*display_consecutive_in_same_bubble*/
        ctx2[25];
      if (dirty[0] & /*i18n*/
      16384)
        thought_changes.i18n = /*i18n*/
        ctx2[14];
      if (dirty[0] & /*line_breaks*/
      32768)
        thought_changes.line_breaks = /*line_breaks*/
        ctx2[15];
      thought.$set(thought_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(thought.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(thought.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(thought, detaching);
    }
  };
}
function create_if_block_1$3(ctx) {
  let buttonpanel;
  let current;
  const buttonpanel_spread_levels = [
    /*button_panel_props*/
    ctx[32],
    {
      current_feedback: (
        /*current_feedback*/
        ctx[26]
      )
    },
    { watermark: (
      /*watermark*/
      ctx[28]
    ) }
  ];
  let buttonpanel_props = {};
  for (let i = 0; i < buttonpanel_spread_levels.length; i += 1) {
    buttonpanel_props = assign(buttonpanel_props, buttonpanel_spread_levels[i]);
  }
  buttonpanel = new ButtonPanel({ props: buttonpanel_props });
  buttonpanel.$on(
    "copy",
    /*copy_handler*/
    ctx[47]
  );
  return {
    c() {
      create_component(buttonpanel.$$.fragment);
    },
    l(nodes) {
      claim_component(buttonpanel.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(buttonpanel, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const buttonpanel_changes = dirty[0] & /*current_feedback, watermark*/
      335544320 | dirty[1] & /*button_panel_props*/
      2 ? get_spread_update(buttonpanel_spread_levels, [
        dirty[1] & /*button_panel_props*/
        2 && get_spread_object(
          /*button_panel_props*/
          ctx2[32]
        ),
        dirty[0] & /*current_feedback*/
        67108864 && {
          current_feedback: (
            /*current_feedback*/
            ctx2[26]
          )
        },
        dirty[0] & /*watermark*/
        268435456 && { watermark: (
          /*watermark*/
          ctx2[28]
        ) }
      ]) : {};
      buttonpanel.$set(buttonpanel_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(buttonpanel.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(buttonpanel.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(buttonpanel, detaching);
    }
  };
}
function create_each_block$2(ctx) {
  let div;
  let current_block_type_index;
  let if_block0;
  let div_class_value;
  let t;
  let if_block1_anchor;
  let current;
  const if_block_creators = [create_if_block_2$2, create_else_block$2];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*in_edit_mode*/
      ctx2[24] && /*thought_index*/
      ctx2[50] === /*messages*/
      ctx2[5].length - 1 && /*message*/
      ctx2[48].type === "text"
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  let if_block1 = (
    /*layout*/
    ctx[6] === "panel" && create_if_block_1$3(ctx)
  );
  return {
    c() {
      div = element("div");
      if_block0.c();
      t = space();
      if (if_block1)
        if_block1.c();
      if_block1_anchor = empty();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if_block0.l(div_nodes);
      div_nodes.forEach(detach);
      t = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      if_block1_anchor = empty();
      this.h();
    },
    h() {
      attr(div, "class", div_class_value = "message " + (!/*display_consecutive_in_same_bubble*/
      ctx[25] ? (
        /*role*/
        ctx[4]
      ) : "") + " svelte-yaaj3");
      toggle_class(div, "panel-full-width", true);
      toggle_class(div, "message-markdown-disabled", !/*render_markdown*/
      ctx[7]);
      toggle_class(
        div,
        "component",
        /*message*/
        ctx[48].type === "component"
      );
      toggle_class(div, "html", is_component_message(
        /*message*/
        ctx[48]
      ) && /*message*/
      ctx[48].content.component === "html");
      toggle_class(
        div,
        "thought",
        /*thought_index*/
        ctx[50] > 0
      );
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if_blocks[current_block_type_index].m(div, null);
      insert_hydration(target, t, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, if_block1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
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
        if_block0 = if_blocks[current_block_type_index];
        if (!if_block0) {
          if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block0.c();
        } else {
          if_block0.p(ctx2, dirty);
        }
        transition_in(if_block0, 1);
        if_block0.m(div, null);
      }
      if (!current || dirty[0] & /*display_consecutive_in_same_bubble, role*/
      33554448 && div_class_value !== (div_class_value = "message " + (!/*display_consecutive_in_same_bubble*/
      ctx2[25] ? (
        /*role*/
        ctx2[4]
      ) : "") + " svelte-yaaj3")) {
        attr(div, "class", div_class_value);
      }
      if (!current || dirty[0] & /*display_consecutive_in_same_bubble, role*/
      33554448) {
        toggle_class(div, "panel-full-width", true);
      }
      if (!current || dirty[0] & /*display_consecutive_in_same_bubble, role, render_markdown*/
      33554576) {
        toggle_class(div, "message-markdown-disabled", !/*render_markdown*/
        ctx2[7]);
      }
      if (!current || dirty[0] & /*display_consecutive_in_same_bubble, role, messages*/
      33554480) {
        toggle_class(
          div,
          "component",
          /*message*/
          ctx2[48].type === "component"
        );
      }
      if (!current || dirty[0] & /*display_consecutive_in_same_bubble, role, messages*/
      33554480) {
        toggle_class(div, "html", is_component_message(
          /*message*/
          ctx2[48]
        ) && /*message*/
        ctx2[48].content.component === "html");
      }
      if (!current || dirty[0] & /*display_consecutive_in_same_bubble, role*/
      33554448) {
        toggle_class(
          div,
          "thought",
          /*thought_index*/
          ctx2[50] > 0
        );
      }
      if (
        /*layout*/
        ctx2[6] === "panel"
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & /*layout*/
          64) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_1$3(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
        detach(t);
        detach(if_block1_anchor);
      }
      if_blocks[current_block_type_index].d();
      if (if_block1)
        if_block1.d(detaching);
    }
  };
}
function create_if_block$4(ctx) {
  let buttonpanel;
  let current;
  const buttonpanel_spread_levels = [
    /*button_panel_props*/
    ctx[32]
  ];
  let buttonpanel_props = {};
  for (let i = 0; i < buttonpanel_spread_levels.length; i += 1) {
    buttonpanel_props = assign(buttonpanel_props, buttonpanel_spread_levels[i]);
  }
  buttonpanel = new ButtonPanel({ props: buttonpanel_props });
  return {
    c() {
      create_component(buttonpanel.$$.fragment);
    },
    l(nodes) {
      claim_component(buttonpanel.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(buttonpanel, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const buttonpanel_changes = dirty[1] & /*button_panel_props*/
      2 ? get_spread_update(buttonpanel_spread_levels, [get_spread_object(
        /*button_panel_props*/
        ctx2[32]
      )]) : {};
      buttonpanel.$set(buttonpanel_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(buttonpanel.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(buttonpanel.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(buttonpanel, detaching);
    }
  };
}
function create_fragment$5(ctx) {
  let div2;
  let t0;
  let div1;
  let div0;
  let div0_class_value;
  let div2_class_value;
  let t1;
  let if_block1_anchor;
  let current;
  let if_block0 = (
    /*avatar_img*/
    ctx[2] !== null && create_if_block_4$2(ctx)
  );
  let each_value = ensure_array_like(
    /*messages*/
    ctx[5]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  let if_block1 = (
    /*layout*/
    ctx[6] === "bubble" && create_if_block$4(ctx)
  );
  return {
    c() {
      div2 = element("div");
      if (if_block0)
        if_block0.c();
      t0 = space();
      div1 = element("div");
      div0 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t1 = space();
      if (if_block1)
        if_block1.c();
      if_block1_anchor = empty();
      this.h();
    },
    l(nodes) {
      div2 = claim_element(nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      if (if_block0)
        if_block0.l(div2_nodes);
      t0 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div0_nodes);
      }
      div0_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      div2_nodes.forEach(detach);
      t1 = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      if_block1_anchor = empty();
      this.h();
    },
    h() {
      attr(div0, "class", div0_class_value = null_to_empty(
        /*display_consecutive_in_same_bubble*/
        ctx[25] ? (
          /*role*/
          ctx[4]
        ) : ""
      ) + " svelte-yaaj3");
      toggle_class(
        div0,
        "message",
        /*display_consecutive_in_same_bubble*/
        ctx[25]
      );
      attr(div1, "class", "flex-wrap svelte-yaaj3");
      toggle_class(
        div1,
        "role",
        /*role*/
        ctx[4]
      );
      toggle_class(
        div1,
        "component-wrap",
        /*messages*/
        ctx[5][0].type === "component"
      );
      attr(div2, "class", div2_class_value = "message-row " + /*layout*/
      ctx[6] + " " + /*role*/
      ctx[4] + "-row svelte-yaaj3");
      toggle_class(
        div2,
        "with_avatar",
        /*avatar_img*/
        ctx[2] !== null
      );
      toggle_class(
        div2,
        "with_opposite_avatar",
        /*opposite_avatar_img*/
        ctx[3] !== null
      );
    },
    m(target, anchor) {
      insert_hydration(target, div2, anchor);
      if (if_block0)
        if_block0.m(div2, null);
      append_hydration(div2, t0);
      append_hydration(div2, div1);
      append_hydration(div1, div0);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div0, null);
        }
      }
      insert_hydration(target, t1, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, if_block1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (
        /*avatar_img*/
        ctx2[2] !== null
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty[0] & /*avatar_img*/
          4) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_4$2(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div2, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (dirty[0] & /*current_feedback, watermark, dispatch, layout, display_consecutive_in_same_bubble, role, render_markdown, messages, edit_message, last_message_width, in_edit_mode, rtl, messageElements, i, value, selectable, sanitize_html, allow_tags, latex_delimiters, _components, upload, target, root, theme_mode, _fetch, scroll, allow_file_downloads, i18n, line_breaks*/
      2147483635 | dirty[1] & /*button_panel_props, last_message_height, handle_select*/
      7) {
        each_value = ensure_array_like(
          /*messages*/
          ctx2[5]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$2(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$2(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div0, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      if (!current || dirty[0] & /*display_consecutive_in_same_bubble, role*/
      33554448 && div0_class_value !== (div0_class_value = null_to_empty(
        /*display_consecutive_in_same_bubble*/
        ctx2[25] ? (
          /*role*/
          ctx2[4]
        ) : ""
      ) + " svelte-yaaj3")) {
        attr(div0, "class", div0_class_value);
      }
      if (!current || dirty[0] & /*display_consecutive_in_same_bubble, role, display_consecutive_in_same_bubble*/
      33554448) {
        toggle_class(
          div0,
          "message",
          /*display_consecutive_in_same_bubble*/
          ctx2[25]
        );
      }
      if (!current || dirty[0] & /*role*/
      16) {
        toggle_class(
          div1,
          "role",
          /*role*/
          ctx2[4]
        );
      }
      if (!current || dirty[0] & /*messages*/
      32) {
        toggle_class(
          div1,
          "component-wrap",
          /*messages*/
          ctx2[5][0].type === "component"
        );
      }
      if (!current || dirty[0] & /*layout, role*/
      80 && div2_class_value !== (div2_class_value = "message-row " + /*layout*/
      ctx2[6] + " " + /*role*/
      ctx2[4] + "-row svelte-yaaj3")) {
        attr(div2, "class", div2_class_value);
      }
      if (!current || dirty[0] & /*layout, role, avatar_img*/
      84) {
        toggle_class(
          div2,
          "with_avatar",
          /*avatar_img*/
          ctx2[2] !== null
        );
      }
      if (!current || dirty[0] & /*layout, role, opposite_avatar_img*/
      88) {
        toggle_class(
          div2,
          "with_opposite_avatar",
          /*opposite_avatar_img*/
          ctx2[3] !== null
        );
      }
      if (
        /*layout*/
        ctx2[6] === "bubble"
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & /*layout*/
          64) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$4(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div2);
        detach(t1);
        detach(if_block1_anchor);
      }
      if (if_block0)
        if_block0.d();
      destroy_each(each_blocks, detaching);
      if (if_block1)
        if_block1.d(detaching);
    }
  };
}
let previous_edit_mode = false;
function get_message_label_data(message) {
  var _a, _b, _c, _d;
  if (message.type === "text") {
    return message.content;
  } else if (message.type === "component" && message.content.component === "file") {
    if (Array.isArray(message.content.value)) {
      return `file of extension type: ${(_a = message.content.value[0].orig_name) == null ? void 0 : _a.split(".").pop()}`;
    }
    return `file of extension type: ${(_c = (_b = message.content.value) == null ? void 0 : _b.orig_name) == null ? void 0 : _c.split(".").pop()}` + (((_d = message.content.value) == null ? void 0 : _d.orig_name) ?? "");
  }
  return `a component of type ${message.content.component ?? "unknown"}`;
}
function instance$5($$self, $$props, $$invalidate) {
  let { value } = $$props;
  let { avatar_img } = $$props;
  let { opposite_avatar_img = null } = $$props;
  let { role = "user" } = $$props;
  let { messages = [] } = $$props;
  let { layout } = $$props;
  let { render_markdown } = $$props;
  let { latex_delimiters } = $$props;
  let { sanitize_html } = $$props;
  let { selectable } = $$props;
  let { _fetch } = $$props;
  let { rtl } = $$props;
  let { dispatch } = $$props;
  let { i18n } = $$props;
  let { line_breaks } = $$props;
  let { upload } = $$props;
  let { target } = $$props;
  let { root } = $$props;
  let { theme_mode } = $$props;
  let { _components } = $$props;
  let { i } = $$props;
  let { show_copy_button } = $$props;
  let { generating } = $$props;
  let { feedback_options } = $$props;
  let { show_like } = $$props;
  let { show_edit } = $$props;
  let { show_retry } = $$props;
  let { show_undo } = $$props;
  let { msg_format } = $$props;
  let { handle_action } = $$props;
  let { scroll: scroll2 } = $$props;
  let { allow_file_downloads } = $$props;
  let { in_edit_mode } = $$props;
  let { edit_message } = $$props;
  let { display_consecutive_in_same_bubble } = $$props;
  let { current_feedback = null } = $$props;
  let { allow_tags = false } = $$props;
  let { watermark = null } = $$props;
  let messageElements = [];
  let last_message_width = 0;
  let last_message_height = 0;
  function handle_select(i2, message) {
    dispatch("select", {
      index: message.index,
      value: message.content
    });
  }
  let button_panel_props;
  function textarea_input_handler() {
    edit_message = this.value;
    $$invalidate(0, edit_message);
  }
  function div_binding($$value, thought_index) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      messageElements[thought_index] = $$value;
      $$invalidate(29, messageElements);
    });
  }
  const click_handler = (message) => handle_select(i, message);
  const keydown_handler = (message, e) => {
    if (e.key === "Enter") {
      handle_select(i, message);
    }
  };
  const copy_handler = (e) => dispatch("copy", e.detail);
  $$self.$$set = ($$props2) => {
    if ("value" in $$props2)
      $$invalidate(1, value = $$props2.value);
    if ("avatar_img" in $$props2)
      $$invalidate(2, avatar_img = $$props2.avatar_img);
    if ("opposite_avatar_img" in $$props2)
      $$invalidate(3, opposite_avatar_img = $$props2.opposite_avatar_img);
    if ("role" in $$props2)
      $$invalidate(4, role = $$props2.role);
    if ("messages" in $$props2)
      $$invalidate(5, messages = $$props2.messages);
    if ("layout" in $$props2)
      $$invalidate(6, layout = $$props2.layout);
    if ("render_markdown" in $$props2)
      $$invalidate(7, render_markdown = $$props2.render_markdown);
    if ("latex_delimiters" in $$props2)
      $$invalidate(8, latex_delimiters = $$props2.latex_delimiters);
    if ("sanitize_html" in $$props2)
      $$invalidate(9, sanitize_html = $$props2.sanitize_html);
    if ("selectable" in $$props2)
      $$invalidate(10, selectable = $$props2.selectable);
    if ("_fetch" in $$props2)
      $$invalidate(11, _fetch = $$props2._fetch);
    if ("rtl" in $$props2)
      $$invalidate(12, rtl = $$props2.rtl);
    if ("dispatch" in $$props2)
      $$invalidate(13, dispatch = $$props2.dispatch);
    if ("i18n" in $$props2)
      $$invalidate(14, i18n = $$props2.i18n);
    if ("line_breaks" in $$props2)
      $$invalidate(15, line_breaks = $$props2.line_breaks);
    if ("upload" in $$props2)
      $$invalidate(16, upload = $$props2.upload);
    if ("target" in $$props2)
      $$invalidate(17, target = $$props2.target);
    if ("root" in $$props2)
      $$invalidate(18, root = $$props2.root);
    if ("theme_mode" in $$props2)
      $$invalidate(19, theme_mode = $$props2.theme_mode);
    if ("_components" in $$props2)
      $$invalidate(20, _components = $$props2._components);
    if ("i" in $$props2)
      $$invalidate(21, i = $$props2.i);
    if ("show_copy_button" in $$props2)
      $$invalidate(34, show_copy_button = $$props2.show_copy_button);
    if ("generating" in $$props2)
      $$invalidate(35, generating = $$props2.generating);
    if ("feedback_options" in $$props2)
      $$invalidate(36, feedback_options = $$props2.feedback_options);
    if ("show_like" in $$props2)
      $$invalidate(37, show_like = $$props2.show_like);
    if ("show_edit" in $$props2)
      $$invalidate(38, show_edit = $$props2.show_edit);
    if ("show_retry" in $$props2)
      $$invalidate(39, show_retry = $$props2.show_retry);
    if ("show_undo" in $$props2)
      $$invalidate(40, show_undo = $$props2.show_undo);
    if ("msg_format" in $$props2)
      $$invalidate(41, msg_format = $$props2.msg_format);
    if ("handle_action" in $$props2)
      $$invalidate(42, handle_action = $$props2.handle_action);
    if ("scroll" in $$props2)
      $$invalidate(22, scroll2 = $$props2.scroll);
    if ("allow_file_downloads" in $$props2)
      $$invalidate(23, allow_file_downloads = $$props2.allow_file_downloads);
    if ("in_edit_mode" in $$props2)
      $$invalidate(24, in_edit_mode = $$props2.in_edit_mode);
    if ("edit_message" in $$props2)
      $$invalidate(0, edit_message = $$props2.edit_message);
    if ("display_consecutive_in_same_bubble" in $$props2)
      $$invalidate(25, display_consecutive_in_same_bubble = $$props2.display_consecutive_in_same_bubble);
    if ("current_feedback" in $$props2)
      $$invalidate(26, current_feedback = $$props2.current_feedback);
    if ("allow_tags" in $$props2)
      $$invalidate(27, allow_tags = $$props2.allow_tags);
    if ("watermark" in $$props2)
      $$invalidate(28, watermark = $$props2.watermark);
  };
  $$self.$$.update = () => {
    var _a, _b;
    if ($$self.$$.dirty[0] & /*in_edit_mode, messageElements*/
    553648128) {
      if (in_edit_mode && !previous_edit_mode) {
        $$invalidate(30, last_message_width = (_a = messageElements[messageElements.length - 1]) == null ? void 0 : _a.clientWidth);
        $$invalidate(31, last_message_height = (_b = messageElements[messageElements.length - 1]) == null ? void 0 : _b.clientHeight);
      }
    }
    if ($$self.$$.dirty[0] & /*in_edit_mode, messages, role, avatar_img, layout, dispatch, current_feedback, watermark*/
    352329844 | $$self.$$.dirty[1] & /*handle_action, show_like, feedback_options, show_retry, show_undo, show_edit, generating, show_copy_button, msg_format*/
    4088) {
      $$invalidate(32, button_panel_props = {
        handle_action,
        likeable: show_like,
        feedback_options,
        show_retry,
        show_undo,
        show_edit,
        in_edit_mode,
        generating,
        show_copy_button,
        message: msg_format === "tuples" ? messages[0] : messages,
        position: role === "user" ? "right" : "left",
        avatar: avatar_img,
        layout,
        dispatch,
        current_feedback,
        watermark
      });
    }
  };
  return [
    edit_message,
    value,
    avatar_img,
    opposite_avatar_img,
    role,
    messages,
    layout,
    render_markdown,
    latex_delimiters,
    sanitize_html,
    selectable,
    _fetch,
    rtl,
    dispatch,
    i18n,
    line_breaks,
    upload,
    target,
    root,
    theme_mode,
    _components,
    i,
    scroll2,
    allow_file_downloads,
    in_edit_mode,
    display_consecutive_in_same_bubble,
    current_feedback,
    allow_tags,
    watermark,
    messageElements,
    last_message_width,
    last_message_height,
    button_panel_props,
    handle_select,
    show_copy_button,
    generating,
    feedback_options,
    show_like,
    show_edit,
    show_retry,
    show_undo,
    msg_format,
    handle_action,
    textarea_input_handler,
    div_binding,
    click_handler,
    keydown_handler,
    copy_handler
  ];
}
class Message extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance$5,
      create_fragment$5,
      safe_not_equal,
      {
        value: 1,
        avatar_img: 2,
        opposite_avatar_img: 3,
        role: 4,
        messages: 5,
        layout: 6,
        render_markdown: 7,
        latex_delimiters: 8,
        sanitize_html: 9,
        selectable: 10,
        _fetch: 11,
        rtl: 12,
        dispatch: 13,
        i18n: 14,
        line_breaks: 15,
        upload: 16,
        target: 17,
        root: 18,
        theme_mode: 19,
        _components: 20,
        i: 21,
        show_copy_button: 34,
        generating: 35,
        feedback_options: 36,
        show_like: 37,
        show_edit: 38,
        show_retry: 39,
        show_undo: 40,
        msg_format: 41,
        handle_action: 42,
        scroll: 22,
        allow_file_downloads: 23,
        in_edit_mode: 24,
        edit_message: 0,
        display_consecutive_in_same_bubble: 25,
        current_feedback: 26,
        allow_tags: 27,
        watermark: 28
      },
      null,
      [-1, -1]
    );
  }
}
function create_if_block$3(ctx) {
  let div;
  let image;
  let current;
  image = new Image({
    props: {
      class: "avatar-image",
      src: (
        /*avatar_images*/
        ctx[1][1].url
      ),
      alt: "bot avatar"
    }
  });
  return {
    c() {
      div = element("div");
      create_component(image.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(image.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "avatar-container svelte-134ihlx");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(image, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const image_changes = {};
      if (dirty & /*avatar_images*/
      2)
        image_changes.src = /*avatar_images*/
        ctx2[1][1].url;
      image.$set(image_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(image.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(image.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(image);
    }
  };
}
function create_fragment$4(ctx) {
  let div6;
  let t0;
  let div5;
  let div4;
  let textContent = `<span class="sr-only">Loading content</span> <div class="dots svelte-134ihlx"><div class="dot svelte-134ihlx"></div> <div class="dot svelte-134ihlx"></div> <div class="dot svelte-134ihlx"></div></div>`;
  let div5_class_value;
  let current;
  let if_block = (
    /*avatar_images*/
    ctx[1][1] !== null && create_if_block$3(ctx)
  );
  return {
    c() {
      div6 = element("div");
      if (if_block)
        if_block.c();
      t0 = space();
      div5 = element("div");
      div4 = element("div");
      div4.innerHTML = textContent;
      this.h();
    },
    l(nodes) {
      div6 = claim_element(nodes, "DIV", { class: true });
      var div6_nodes = children(div6);
      if (if_block)
        if_block.l(div6_nodes);
      t0 = claim_space(div6_nodes);
      div5 = claim_element(div6_nodes, "DIV", {
        class: true,
        role: true,
        "aria-label": true,
        "aria-live": true
      });
      var div5_nodes = children(div5);
      div4 = claim_element(div5_nodes, "DIV", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(div4) !== "svelte-1vfby8")
        div4.innerHTML = textContent;
      div5_nodes.forEach(detach);
      div6_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div4, "class", "message-content svelte-134ihlx");
      attr(div5, "class", div5_class_value = "message bot pending " + /*layout*/
      ctx[0] + " svelte-134ihlx");
      attr(div5, "role", "status");
      attr(div5, "aria-label", "Loading response");
      attr(div5, "aria-live", "polite");
      toggle_class(
        div5,
        "with_avatar",
        /*avatar_images*/
        ctx[1][1] !== null
      );
      toggle_class(
        div5,
        "with_opposite_avatar",
        /*avatar_images*/
        ctx[1][0] !== null
      );
      attr(div6, "class", "container svelte-134ihlx");
    },
    m(target, anchor) {
      insert_hydration(target, div6, anchor);
      if (if_block)
        if_block.m(div6, null);
      append_hydration(div6, t0);
      append_hydration(div6, div5);
      append_hydration(div5, div4);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*avatar_images*/
        ctx2[1][1] !== null
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*avatar_images*/
          2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$3(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div6, t0);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (!current || dirty & /*layout*/
      1 && div5_class_value !== (div5_class_value = "message bot pending " + /*layout*/
      ctx2[0] + " svelte-134ihlx")) {
        attr(div5, "class", div5_class_value);
      }
      if (!current || dirty & /*layout, avatar_images*/
      3) {
        toggle_class(
          div5,
          "with_avatar",
          /*avatar_images*/
          ctx2[1][1] !== null
        );
      }
      if (!current || dirty & /*layout, avatar_images*/
      3) {
        toggle_class(
          div5,
          "with_opposite_avatar",
          /*avatar_images*/
          ctx2[1][0] !== null
        );
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
        detach(div6);
      }
      if (if_block)
        if_block.d();
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let { layout = "bubble" } = $$props;
  let { avatar_images = [null, null] } = $$props;
  $$self.$$set = ($$props2) => {
    if ("layout" in $$props2)
      $$invalidate(0, layout = $$props2.layout);
    if ("avatar_images" in $$props2)
      $$invalidate(1, avatar_images = $$props2.avatar_images);
  };
  return [layout, avatar_images];
}
class Pending extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, { layout: 0, avatar_images: 1 });
  }
}
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[7] = list[i];
  child_ctx[9] = i;
  return child_ctx;
}
function get_each_context_1$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[10] = list[i];
  child_ctx[9] = i;
  return child_ctx;
}
function create_if_block_14(ctx) {
  let div;
  let markdown;
  let current;
  markdown = new MarkdownCode({
    props: {
      message: (
        /*placeholder*/
        ctx[1]
      ),
      latex_delimiters: (
        /*latex_delimiters*/
        ctx[2]
      ),
      root: (
        /*root*/
        ctx[3]
      )
    }
  });
  return {
    c() {
      div = element("div");
      create_component(markdown.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(markdown.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "placeholder svelte-9pi8y1");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(markdown, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const markdown_changes = {};
      if (dirty & /*placeholder*/
      2)
        markdown_changes.message = /*placeholder*/
        ctx2[1];
      if (dirty & /*latex_delimiters*/
      4)
        markdown_changes.latex_delimiters = /*latex_delimiters*/
        ctx2[2];
      if (dirty & /*root*/
      8)
        markdown_changes.root = /*root*/
        ctx2[3];
      markdown.$set(markdown_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(markdown.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(markdown.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(markdown);
    }
  };
}
function create_if_block$2(ctx) {
  let div;
  let current;
  let each_value = ensure_array_like(
    /*examples*/
    ctx[0]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, role: true });
      var div_nodes = children(div);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div_nodes);
      }
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "examples svelte-9pi8y1");
      attr(div, "role", "list");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div, null);
        }
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*examples, handle_example_select, undefined*/
      17) {
        each_value = ensure_array_like(
          /*examples*/
          ctx2[0]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
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
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_if_block_3$1(ctx) {
  let show_if;
  let show_if_1;
  let show_if_2;
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [
    create_if_block_4$1,
    create_if_block_11,
    create_if_block_12,
    create_if_block_13,
    create_else_block_2
  ];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    var _a, _b, _c;
    if (dirty & /*examples*/
    1)
      show_if = null;
    if (dirty & /*examples*/
    1)
      show_if_1 = null;
    if (dirty & /*examples*/
    1)
      show_if_2 = null;
    if (
      /*example*/
      ctx2[7].files.length > 1
    )
      return 0;
    if (show_if == null)
      show_if = !!/*example*/
      ((_a = ctx2[7].files[0].mime_type) == null ? void 0 : _a.includes("image"));
    if (show_if)
      return 1;
    if (show_if_1 == null)
      show_if_1 = !!/*example*/
      ((_b = ctx2[7].files[0].mime_type) == null ? void 0 : _b.includes("video"));
    if (show_if_1)
      return 2;
    if (show_if_2 == null)
      show_if_2 = !!/*example*/
      ((_c = ctx2[7].files[0].mime_type) == null ? void 0 : _c.includes("audio"));
    if (show_if_2)
      return 3;
    return 4;
  }
  current_block_type_index = select_block_type_1(ctx, -1);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
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
      if_blocks[current_block_type_index].m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx2, dirty);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
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
        detach(if_block_anchor);
      }
      if_blocks[current_block_type_index].d(detaching);
    }
  };
}
function create_if_block_2$1(ctx) {
  let div;
  let textContent = `<span class="text-icon-aa svelte-9pi8y1">Aa</span>`;
  return {
    c() {
      div = element("div");
      div.innerHTML = textContent;
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true,
        "aria-hidden": true,
        ["data-svelte-h"]: true
      });
      if (get_svelte_dataset(div) !== "svelte-15cq9iz")
        div.innerHTML = textContent;
      this.h();
    },
    h() {
      attr(div, "class", "example-icon svelte-9pi8y1");
      attr(div, "aria-hidden", "true");
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
function create_if_block_1$2(ctx) {
  let div;
  let image;
  let current;
  image = new Image({
    props: {
      class: "example-image",
      src: (
        /*example*/
        ctx[7].icon.url
      ),
      alt: "Example icon"
    }
  });
  return {
    c() {
      div = element("div");
      create_component(image.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(image.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "example-image-container svelte-9pi8y1");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(image, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const image_changes = {};
      if (dirty & /*examples*/
      1)
        image_changes.src = /*example*/
        ctx2[7].icon.url;
      image.$set(image_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(image.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(image.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(image);
    }
  };
}
function create_else_block_2(ctx) {
  let div;
  let file_1;
  let div_aria_label_value;
  let current;
  file_1 = new File({});
  return {
    c() {
      div = element("div");
      create_component(file_1.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, "aria-label": true });
      var div_nodes = children(div);
      claim_component(file_1.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "example-icon svelte-9pi8y1");
      attr(div, "aria-label", div_aria_label_value = `File: ${/*example*/
      ctx[7].files[0].orig_name}`);
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(file_1, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      if (!current || dirty & /*examples*/
      1 && div_aria_label_value !== (div_aria_label_value = `File: ${/*example*/
      ctx2[7].files[0].orig_name}`)) {
        attr(div, "aria-label", div_aria_label_value);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(file_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(file_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(file_1);
    }
  };
}
function create_if_block_13(ctx) {
  let div;
  let music;
  let div_aria_label_value;
  let current;
  music = new Music({});
  return {
    c() {
      div = element("div");
      create_component(music.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, "aria-label": true });
      var div_nodes = children(div);
      claim_component(music.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "example-icon svelte-9pi8y1");
      attr(div, "aria-label", div_aria_label_value = `File: ${/*example*/
      ctx[7].files[0].orig_name}`);
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(music, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      if (!current || dirty & /*examples*/
      1 && div_aria_label_value !== (div_aria_label_value = `File: ${/*example*/
      ctx2[7].files[0].orig_name}`)) {
        attr(div, "aria-label", div_aria_label_value);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(music.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(music.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(music);
    }
  };
}
function create_if_block_12(ctx) {
  let div;
  let video;
  let video_src_value;
  return {
    c() {
      div = element("div");
      video = element("video");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      video = claim_element(div_nodes, "VIDEO", {
        class: true,
        src: true,
        "aria-hidden": true
      });
      children(video).forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(video, "class", "example-image");
      if (!src_url_equal(video.src, video_src_value = /*example*/
      ctx[7].files[0].url))
        attr(video, "src", video_src_value);
      attr(video, "aria-hidden", "true");
      attr(div, "class", "example-image-container svelte-9pi8y1");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, video);
    },
    p(ctx2, dirty) {
      if (dirty & /*examples*/
      1 && !src_url_equal(video.src, video_src_value = /*example*/
      ctx2[7].files[0].url)) {
        attr(video, "src", video_src_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_if_block_11(ctx) {
  let div;
  let image;
  let current;
  image = new Image({
    props: {
      class: "example-image",
      src: (
        /*example*/
        ctx[7].files[0].url
      ),
      alt: (
        /*example*/
        ctx[7].files[0].orig_name || "Example image"
      )
    }
  });
  return {
    c() {
      div = element("div");
      create_component(image.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(image.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "example-image-container svelte-9pi8y1");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(image, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const image_changes = {};
      if (dirty & /*examples*/
      1)
        image_changes.src = /*example*/
        ctx2[7].files[0].url;
      if (dirty & /*examples*/
      1)
        image_changes.alt = /*example*/
        ctx2[7].files[0].orig_name || "Example image";
      image.$set(image_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(image.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(image.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(image);
    }
  };
}
function create_if_block_4$1(ctx) {
  let div;
  let t;
  let current;
  let each_value_1 = ensure_array_like(
    /*example*/
    ctx[7].files.slice(0, 4)
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  let if_block = (
    /*example*/
    ctx[7].files.length > 4 && create_if_block_5$1(ctx)
  );
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t = space();
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true,
        role: true,
        "aria-label": true
      });
      var div_nodes = children(div);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div_nodes);
      }
      t = claim_space(div_nodes);
      if (if_block)
        if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "example-icons-grid svelte-9pi8y1");
      attr(div, "role", "group");
      attr(div, "aria-label", "Example attachments");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div, null);
        }
      }
      append_hydration(div, t);
      if (if_block)
        if_block.m(div, null);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*examples*/
      1) {
        each_value_1 = ensure_array_like(
          /*example*/
          ctx2[7].files.slice(0, 4)
        );
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1$1(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block_1$1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div, t);
          }
        }
        group_outros();
        for (i = each_value_1.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      if (
        /*example*/
        ctx2[7].files.length > 4
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_5$1(ctx2);
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value_1.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_each(each_blocks, detaching);
      if (if_block)
        if_block.d();
    }
  };
}
function create_else_block$1(ctx) {
  let div;
  let show_if;
  let current_block_type_index;
  let if_block;
  let div_aria_label_value;
  let current;
  const if_block_creators = [create_if_block_10, create_else_block_1];
  const if_blocks = [];
  function select_block_type_3(ctx2, dirty) {
    var _a;
    if (dirty & /*examples*/
    1)
      show_if = null;
    if (show_if == null)
      show_if = !!/*file*/
      ((_a = ctx2[10].mime_type) == null ? void 0 : _a.includes("audio"));
    if (show_if)
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type_3(ctx, -1);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      div = element("div");
      if_block.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, "aria-label": true });
      var div_nodes = children(div);
      if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "example-icon svelte-9pi8y1");
      attr(div, "aria-label", div_aria_label_value = `File: ${/*file*/
      ctx[10].orig_name}`);
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if_blocks[current_block_type_index].m(div, null);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_3(ctx2, dirty);
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
        if_block.m(div, null);
      }
      if (!current || dirty & /*examples*/
      1 && div_aria_label_value !== (div_aria_label_value = `File: ${/*file*/
      ctx2[10].orig_name}`)) {
        attr(div, "aria-label", div_aria_label_value);
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
      if_blocks[current_block_type_index].d();
    }
  };
}
function create_if_block_8(ctx) {
  let div;
  let video;
  let video_src_value;
  let t;
  let if_block = (
    /*i*/
    ctx[9] === 3 && /*example*/
    ctx[7].files.length > 4 && create_if_block_9(ctx)
  );
  return {
    c() {
      div = element("div");
      video = element("video");
      t = space();
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      video = claim_element(div_nodes, "VIDEO", {
        class: true,
        src: true,
        "aria-hidden": true
      });
      children(video).forEach(detach);
      t = claim_space(div_nodes);
      if (if_block)
        if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(video, "class", "example-image");
      if (!src_url_equal(video.src, video_src_value = /*file*/
      ctx[10].url))
        attr(video, "src", video_src_value);
      attr(video, "aria-hidden", "true");
      attr(div, "class", "example-image-container svelte-9pi8y1");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, video);
      append_hydration(div, t);
      if (if_block)
        if_block.m(div, null);
    },
    p(ctx2, dirty) {
      if (dirty & /*examples*/
      1 && !src_url_equal(video.src, video_src_value = /*file*/
      ctx2[10].url)) {
        attr(video, "src", video_src_value);
      }
      if (
        /*i*/
        ctx2[9] === 3 && /*example*/
        ctx2[7].files.length > 4
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_9(ctx2);
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block)
        if_block.d();
    }
  };
}
function create_if_block_6$1(ctx) {
  let div;
  let image;
  let t;
  let current;
  image = new Image({
    props: {
      class: "example-image",
      src: (
        /*file*/
        ctx[10].url
      ),
      alt: (
        /*file*/
        ctx[10].orig_name || `Example image ${/*i*/
        ctx[9] + 1}`
      )
    }
  });
  let if_block = (
    /*i*/
    ctx[9] === 3 && /*example*/
    ctx[7].files.length > 4 && create_if_block_7$1(ctx)
  );
  return {
    c() {
      div = element("div");
      create_component(image.$$.fragment);
      t = space();
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(image.$$.fragment, div_nodes);
      t = claim_space(div_nodes);
      if (if_block)
        if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "example-image-container svelte-9pi8y1");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(image, div, null);
      append_hydration(div, t);
      if (if_block)
        if_block.m(div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const image_changes = {};
      if (dirty & /*examples*/
      1)
        image_changes.src = /*file*/
        ctx2[10].url;
      if (dirty & /*examples*/
      1)
        image_changes.alt = /*file*/
        ctx2[10].orig_name || `Example image ${/*i*/
        ctx2[9] + 1}`;
      image.$set(image_changes);
      if (
        /*i*/
        ctx2[9] === 3 && /*example*/
        ctx2[7].files.length > 4
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_7$1(ctx2);
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(image.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(image.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(image);
      if (if_block)
        if_block.d();
    }
  };
}
function create_else_block_1(ctx) {
  let file_1;
  let current;
  file_1 = new File({});
  return {
    c() {
      create_component(file_1.$$.fragment);
    },
    l(nodes) {
      claim_component(file_1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(file_1, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(file_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(file_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(file_1, detaching);
    }
  };
}
function create_if_block_10(ctx) {
  let music;
  let current;
  music = new Music({});
  return {
    c() {
      create_component(music.$$.fragment);
    },
    l(nodes) {
      claim_component(music.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(music, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(music.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(music.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(music, detaching);
    }
  };
}
function create_if_block_9(ctx) {
  let div;
  let t0;
  let t1_value = (
    /*example*/
    ctx[7].files.length - 4 + ""
  );
  let t1;
  let div_aria_label_value;
  return {
    c() {
      div = element("div");
      t0 = text("+");
      t1 = text(t1_value);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true,
        role: true,
        "aria-label": true
      });
      var div_nodes = children(div);
      t0 = claim_text(div_nodes, "+");
      t1 = claim_text(div_nodes, t1_value);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "image-overlay svelte-9pi8y1");
      attr(div, "role", "status");
      attr(div, "aria-label", div_aria_label_value = `${/*example*/
      ctx[7].files.length - 4} more files`);
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, t0);
      append_hydration(div, t1);
    },
    p(ctx2, dirty) {
      if (dirty & /*examples*/
      1 && t1_value !== (t1_value = /*example*/
      ctx2[7].files.length - 4 + ""))
        set_data(t1, t1_value);
      if (dirty & /*examples*/
      1 && div_aria_label_value !== (div_aria_label_value = `${/*example*/
      ctx2[7].files.length - 4} more files`)) {
        attr(div, "aria-label", div_aria_label_value);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_if_block_7$1(ctx) {
  let div;
  let t0;
  let t1_value = (
    /*example*/
    ctx[7].files.length - 4 + ""
  );
  let t1;
  let div_aria_label_value;
  return {
    c() {
      div = element("div");
      t0 = text("+");
      t1 = text(t1_value);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true,
        role: true,
        "aria-label": true
      });
      var div_nodes = children(div);
      t0 = claim_text(div_nodes, "+");
      t1 = claim_text(div_nodes, t1_value);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "image-overlay svelte-9pi8y1");
      attr(div, "role", "status");
      attr(div, "aria-label", div_aria_label_value = `${/*example*/
      ctx[7].files.length - 4} more files`);
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, t0);
      append_hydration(div, t1);
    },
    p(ctx2, dirty) {
      if (dirty & /*examples*/
      1 && t1_value !== (t1_value = /*example*/
      ctx2[7].files.length - 4 + ""))
        set_data(t1, t1_value);
      if (dirty & /*examples*/
      1 && div_aria_label_value !== (div_aria_label_value = `${/*example*/
      ctx2[7].files.length - 4} more files`)) {
        attr(div, "aria-label", div_aria_label_value);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_each_block_1$1(ctx) {
  let show_if;
  let show_if_1;
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block_6$1, create_if_block_8, create_else_block$1];
  const if_blocks = [];
  function select_block_type_2(ctx2, dirty) {
    var _a, _b;
    if (dirty & /*examples*/
    1)
      show_if = null;
    if (dirty & /*examples*/
    1)
      show_if_1 = null;
    if (show_if == null)
      show_if = !!/*file*/
      ((_a = ctx2[10].mime_type) == null ? void 0 : _a.includes("image"));
    if (show_if)
      return 0;
    if (show_if_1 == null)
      show_if_1 = !!/*file*/
      ((_b = ctx2[10].mime_type) == null ? void 0 : _b.includes("video"));
    if (show_if_1)
      return 1;
    return 2;
  }
  current_block_type_index = select_block_type_2(ctx, -1);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
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
      if_blocks[current_block_type_index].m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_2(ctx2, dirty);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
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
        detach(if_block_anchor);
      }
      if_blocks[current_block_type_index].d(detaching);
    }
  };
}
function create_if_block_5$1(ctx) {
  let div1;
  let div0;
  let t0;
  let t1_value = (
    /*example*/
    ctx[7].files.length - 4 + ""
  );
  let t1;
  let div0_aria_label_value;
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      t0 = text("+");
      t1 = text(t1_value);
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true,
        role: true,
        "aria-label": true
      });
      var div0_nodes = children(div0);
      t0 = claim_text(div0_nodes, "+");
      t1 = claim_text(div0_nodes, t1_value);
      div0_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "file-overlay svelte-9pi8y1");
      attr(div0, "role", "status");
      attr(div0, "aria-label", div0_aria_label_value = `${/*example*/
      ctx[7].files.length - 4} more files`);
      attr(div1, "class", "example-icon svelte-9pi8y1");
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      append_hydration(div1, div0);
      append_hydration(div0, t0);
      append_hydration(div0, t1);
    },
    p(ctx2, dirty) {
      if (dirty & /*examples*/
      1 && t1_value !== (t1_value = /*example*/
      ctx2[7].files.length - 4 + ""))
        set_data(t1, t1_value);
      if (dirty & /*examples*/
      1 && div0_aria_label_value !== (div0_aria_label_value = `${/*example*/
      ctx2[7].files.length - 4} more files`)) {
        attr(div0, "aria-label", div0_aria_label_value);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
    }
  };
}
function create_each_block$1(ctx) {
  let button;
  let div1;
  let current_block_type_index;
  let if_block;
  let t0;
  let div0;
  let span;
  let t1_value = (
    /*example*/
    (ctx[7].display_text || /*example*/
    ctx[7].text) + ""
  );
  let t1;
  let t2;
  let button_aria_label_value;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block_1$2, create_if_block_2$1, create_if_block_3$1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    var _a, _b, _c, _d;
    if (
      /*example*/
      (_b = (_a = ctx2[7]) == null ? void 0 : _a.icon) == null ? void 0 : _b.url
    )
      return 0;
    if (
      /*example*/
      ((_d = (_c = ctx2[7]) == null ? void 0 : _c.icon) == null ? void 0 : _d.mime_type) === "text"
    )
      return 1;
    if (
      /*example*/
      ctx2[7].files !== void 0 && /*example*/
      ctx2[7].files.length > 0
    )
      return 2;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  function click_handler() {
    return (
      /*click_handler*/
      ctx[5](
        /*i*/
        ctx[9],
        /*example*/
        ctx[7]
      )
    );
  }
  return {
    c() {
      button = element("button");
      div1 = element("div");
      if (if_block)
        if_block.c();
      t0 = space();
      div0 = element("div");
      span = element("span");
      t1 = text(t1_value);
      t2 = space();
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", { class: true, "aria-label": true });
      var button_nodes = children(button);
      div1 = claim_element(button_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      if (if_block)
        if_block.l(div1_nodes);
      t0 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      span = claim_element(div0_nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      t1 = claim_text(span_nodes, t1_value);
      span_nodes.forEach(detach);
      div0_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      t2 = claim_space(button_nodes);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "example-text svelte-9pi8y1");
      attr(div0, "class", "example-text-content svelte-9pi8y1");
      attr(div1, "class", "example-content svelte-9pi8y1");
      attr(button, "class", "example svelte-9pi8y1");
      attr(button, "aria-label", button_aria_label_value = `Select example ${/*i*/
      ctx[9] + 1}: ${/*example*/
      ctx[7].display_text || /*example*/
      ctx[7].text}`);
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      append_hydration(button, div1);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(div1, null);
      }
      append_hydration(div1, t0);
      append_hydration(div1, div0);
      append_hydration(div0, span);
      append_hydration(span, t1);
      append_hydration(button, t2);
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", click_handler);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx, dirty);
        }
      } else {
        if (if_block) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
            if_block.c();
          } else {
            if_block.p(ctx, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(div1, t0);
        } else {
          if_block = null;
        }
      }
      if ((!current || dirty & /*examples*/
      1) && t1_value !== (t1_value = /*example*/
      (ctx[7].display_text || /*example*/
      ctx[7].text) + ""))
        set_data(t1, t1_value);
      if (!current || dirty & /*examples*/
      1 && button_aria_label_value !== (button_aria_label_value = `Select example ${/*i*/
      ctx[9] + 1}: ${/*example*/
      ctx[7].display_text || /*example*/
      ctx[7].text}`)) {
        attr(button, "aria-label", button_aria_label_value);
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
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$3(ctx) {
  let div;
  let t;
  let current;
  let if_block0 = (
    /*placeholder*/
    ctx[1] !== null && create_if_block_14(ctx)
  );
  let if_block1 = (
    /*examples*/
    ctx[0] !== null && create_if_block$2(ctx)
  );
  return {
    c() {
      div = element("div");
      if (if_block0)
        if_block0.c();
      t = space();
      if (if_block1)
        if_block1.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, role: true });
      var div_nodes = children(div);
      if (if_block0)
        if_block0.l(div_nodes);
      t = claim_space(div_nodes);
      if (if_block1)
        if_block1.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "placeholder-content svelte-9pi8y1");
      attr(div, "role", "complementary");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (if_block0)
        if_block0.m(div, null);
      append_hydration(div, t);
      if (if_block1)
        if_block1.m(div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*placeholder*/
        ctx2[1] !== null
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty & /*placeholder*/
          2) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_14(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div, t);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (
        /*examples*/
        ctx2[0] !== null
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & /*examples*/
          1) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$2(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
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
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let { examples = null } = $$props;
  let { placeholder = null } = $$props;
  let { latex_delimiters } = $$props;
  let { root } = $$props;
  const dispatch = createEventDispatcher();
  function handle_example_select(i, example) {
    const example_obj = typeof example === "string" ? { text: example } : example;
    dispatch("example_select", {
      index: i,
      value: {
        text: example_obj.text,
        files: example_obj.files
      }
    });
  }
  const click_handler = (i, example) => handle_example_select(i, typeof example === "string" ? { text: example } : example);
  $$self.$$set = ($$props2) => {
    if ("examples" in $$props2)
      $$invalidate(0, examples = $$props2.examples);
    if ("placeholder" in $$props2)
      $$invalidate(1, placeholder = $$props2.placeholder);
    if ("latex_delimiters" in $$props2)
      $$invalidate(2, latex_delimiters = $$props2.latex_delimiters);
    if ("root" in $$props2)
      $$invalidate(3, root = $$props2.root);
  };
  return [
    examples,
    placeholder,
    latex_delimiters,
    root,
    handle_example_select,
    click_handler
  ];
}
class Examples extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, {
      examples: 0,
      placeholder: 1,
      latex_delimiters: 2,
      root: 3
    });
  }
}
function create_fragment$2(ctx) {
  let iconbutton;
  let current;
  iconbutton = new IconButton({
    props: {
      Icon: (
        /*copied*/
        ctx[0] ? Check : Copy
      ),
      label: (
        /*copied*/
        ctx[0] ? "Copied conversation" : "Copy conversation"
      )
    }
  });
  iconbutton.$on(
    "click",
    /*handle_copy*/
    ctx[1]
  );
  return {
    c() {
      create_component(iconbutton.$$.fragment);
    },
    l(nodes) {
      claim_component(iconbutton.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(iconbutton, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const iconbutton_changes = {};
      if (dirty & /*copied*/
      1)
        iconbutton_changes.Icon = /*copied*/
        ctx2[0] ? Check : Copy;
      if (dirty & /*copied*/
      1)
        iconbutton_changes.label = /*copied*/
        ctx2[0] ? "Copied conversation" : "Copy conversation";
      iconbutton.$set(iconbutton_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(iconbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(iconbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(iconbutton, detaching);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let copied = false;
  let { value } = $$props;
  let { watermark = null } = $$props;
  let timer;
  function copy_feedback() {
    $$invalidate(0, copied = true);
    if (timer)
      clearTimeout(timer);
    timer = setTimeout(
      () => {
        $$invalidate(0, copied = false);
      },
      1e3
    );
  }
  const copy_conversation = () => {
    if (value) {
      const conversation_value = value.map((message) => {
        if (message.type === "text") {
          return `${message.role}: ${message.content}`;
        }
        return `${message.role}: ${message.content.value.url}`;
      }).join("\n\n");
      const text_to_copy = watermark ? `${conversation_value}

${watermark}` : conversation_value;
      navigator.clipboard.writeText(text_to_copy).catch((err) => {
        console.error("Failed to copy conversation: ", err);
      });
    }
  };
  async function handle_copy() {
    if ("clipboard" in navigator) {
      copy_conversation();
      copy_feedback();
    }
  }
  onDestroy(() => {
    if (timer)
      clearTimeout(timer);
  });
  $$self.$$set = ($$props2) => {
    if ("value" in $$props2)
      $$invalidate(2, value = $$props2.value);
    if ("watermark" in $$props2)
      $$invalidate(3, watermark = $$props2.watermark);
  };
  return [copied, handle_copy, value, watermark];
}
class CopyAll extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { value: 2, watermark: 3 });
  }
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[61] = list[i];
  child_ctx[63] = i;
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[64] = list[i];
  child_ctx[71] = i;
  const constants_0 = (
    /*messages*/
    child_ctx[64][0].role === "user" ? "user" : "bot"
  );
  child_ctx[65] = constants_0;
  const constants_1 = (
    /*avatar_images*/
    child_ctx[16][
      /*role*/
      child_ctx[65] === "user" ? 0 : 1
    ]
  );
  child_ctx[66] = constants_1;
  const constants_2 = (
    /*avatar_images*/
    child_ctx[16][
      /*role*/
      child_ctx[65] === "user" ? 0 : 1
    ]
  );
  child_ctx[67] = constants_2;
  const constants_3 = (
    /*groupedMessages*/
    child_ctx[39].slice(
      0,
      /*i*/
      child_ctx[71]
    ).filter((m) => m[0].role === "assistant").length
  );
  child_ctx[68] = constants_3;
  const constants_4 = (
    /*role*/
    child_ctx[65] === "bot" && /*feedback_value*/
    child_ctx[10] && /*feedback_value*/
    child_ctx[10][
      /*feedback_index*/
      child_ctx[68]
    ] ? (
      /*feedback_value*/
      child_ctx[10][
        /*feedback_index*/
        child_ctx[68]
      ]
    ) : null
  );
  child_ctx[69] = constants_4;
  return child_ctx;
}
function create_if_block_5(ctx) {
  let iconbuttonwrapper;
  let current;
  iconbuttonwrapper = new IconButtonWrapper({
    props: {
      $$slots: { default: [create_default_slot$1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(iconbuttonwrapper.$$.fragment);
    },
    l(nodes) {
      claim_component(iconbuttonwrapper.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(iconbuttonwrapper, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const iconbuttonwrapper_changes = {};
      if (dirty[0] & /*value, show_copy_all_button, show_share_button*/
      12289 | dirty[1] & /*watermark*/
      2 | dirty[2] & /*$$scope*/
      1024) {
        iconbuttonwrapper_changes.$$scope = { dirty, ctx: ctx2 };
      }
      iconbuttonwrapper.$set(iconbuttonwrapper_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(iconbuttonwrapper.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(iconbuttonwrapper.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(iconbuttonwrapper, detaching);
    }
  };
}
function create_if_block_7(ctx) {
  let iconbutton;
  let current;
  iconbutton = new IconButton({ props: { Icon: Community } });
  iconbutton.$on(
    "click",
    /*click_handler*/
    ctx[48]
  );
  return {
    c() {
      create_component(iconbutton.$$.fragment);
    },
    l(nodes) {
      claim_component(iconbutton.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(iconbutton, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(iconbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(iconbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(iconbutton, detaching);
    }
  };
}
function create_if_block_6(ctx) {
  let copyall;
  let current;
  copyall = new CopyAll({
    props: {
      value: (
        /*value*/
        ctx[0]
      ),
      watermark: (
        /*watermark*/
        ctx[32]
      )
    }
  });
  return {
    c() {
      create_component(copyall.$$.fragment);
    },
    l(nodes) {
      claim_component(copyall.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(copyall, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const copyall_changes = {};
      if (dirty[0] & /*value*/
      1)
        copyall_changes.value = /*value*/
        ctx2[0];
      if (dirty[1] & /*watermark*/
      2)
        copyall_changes.watermark = /*watermark*/
        ctx2[32];
      copyall.$set(copyall_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(copyall.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(copyall.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(copyall, detaching);
    }
  };
}
function create_default_slot$1(ctx) {
  let t0;
  let iconbutton;
  let t1;
  let if_block1_anchor;
  let current;
  let if_block0 = (
    /*show_share_button*/
    ctx[12] && create_if_block_7(ctx)
  );
  iconbutton = new IconButton({ props: { Icon: Trash, label: "Clear" } });
  iconbutton.$on(
    "click",
    /*click_handler_1*/
    ctx[49]
  );
  let if_block1 = (
    /*show_copy_all_button*/
    ctx[13] && create_if_block_6(ctx)
  );
  return {
    c() {
      if (if_block0)
        if_block0.c();
      t0 = space();
      create_component(iconbutton.$$.fragment);
      t1 = space();
      if (if_block1)
        if_block1.c();
      if_block1_anchor = empty();
    },
    l(nodes) {
      if (if_block0)
        if_block0.l(nodes);
      t0 = claim_space(nodes);
      claim_component(iconbutton.$$.fragment, nodes);
      t1 = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      if_block1_anchor = empty();
    },
    m(target, anchor) {
      if (if_block0)
        if_block0.m(target, anchor);
      insert_hydration(target, t0, anchor);
      mount_component(iconbutton, target, anchor);
      insert_hydration(target, t1, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, if_block1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (
        /*show_share_button*/
        ctx2[12]
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty[0] & /*show_share_button*/
          4096) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_7(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(t0.parentNode, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (
        /*show_copy_all_button*/
        ctx2[13]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & /*show_copy_all_button*/
          8192) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_6(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(iconbutton.$$.fragment, local);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(iconbutton.$$.fragment, local);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
        detach(if_block1_anchor);
      }
      if (if_block0)
        if_block0.d(detaching);
      destroy_component(iconbutton, detaching);
      if (if_block1)
        if_block1.d(detaching);
    }
  };
}
function create_else_block(ctx) {
  let examples_1;
  let current;
  examples_1 = new Examples({
    props: {
      examples: (
        /*examples*/
        ctx[26]
      ),
      placeholder: (
        /*placeholder*/
        ctx[23]
      ),
      latex_delimiters: (
        /*latex_delimiters*/
        ctx[4]
      ),
      root: (
        /*root*/
        ctx[30]
      )
    }
  });
  examples_1.$on(
    "example_select",
    /*example_select_handler*/
    ctx[54]
  );
  return {
    c() {
      create_component(examples_1.$$.fragment);
    },
    l(nodes) {
      claim_component(examples_1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(examples_1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const examples_1_changes = {};
      if (dirty[0] & /*examples*/
      67108864)
        examples_1_changes.examples = /*examples*/
        ctx2[26];
      if (dirty[0] & /*placeholder*/
      8388608)
        examples_1_changes.placeholder = /*placeholder*/
        ctx2[23];
      if (dirty[0] & /*latex_delimiters*/
      16)
        examples_1_changes.latex_delimiters = /*latex_delimiters*/
        ctx2[4];
      if (dirty[0] & /*root*/
      1073741824)
        examples_1_changes.root = /*root*/
        ctx2[30];
      examples_1.$set(examples_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(examples_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(examples_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(examples_1, detaching);
    }
  };
}
function create_if_block_1$1(ctx) {
  let div_1;
  let t;
  let current_block_type_index;
  let if_block;
  let current;
  let mounted;
  let dispose;
  let each_value_1 = ensure_array_like(
    /*groupedMessages*/
    ctx[39]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  const if_block_creators = [create_if_block_2, create_if_block_3];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    if (
      /*pending_message*/
      ctx2[5]
    )
      return 0;
    if (
      /*options*/
      ctx2[40]
    )
      return 1;
    return -1;
  }
  if (~(current_block_type_index = select_block_type_1(ctx))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  return {
    c() {
      div_1 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t = space();
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      div_1 = claim_element(nodes, "DIV", { class: true });
      var div_1_nodes = children(div_1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div_1_nodes);
      }
      t = claim_space(div_1_nodes);
      if (if_block)
        if_block.l(div_1_nodes);
      div_1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div_1, "class", "message-wrap svelte-gjtrl6");
    },
    m(target, anchor) {
      insert_hydration(target, div_1, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div_1, null);
        }
      }
      append_hydration(div_1, t);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(div_1, null);
      }
      current = true;
      if (!mounted) {
        dispose = action_destroyer(copy.call(null, div_1));
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*layout, avatar_images, generating, display_consecutive_in_same_bubble, i18n, _fetch, line_breaks, theme_mode, root, upload, selectable, sanitize_html, render_markdown, rtl, value, latex_delimiters, msg_format, feedback_options, feedback_value, likeable, like_user_message, _retryable, _undoable, editable, show_copy_button, allow_file_downloads*/
      2071973855 | dirty[1] & /*groupedMessages, dispatch, target, _components, allow_tags, watermark, edit_index, handle_action, is_browser, edit_message*/
      11583) {
        each_value_1 = ensure_array_like(
          /*groupedMessages*/
          ctx2[39]
        );
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div_1, t);
          }
        }
        group_outros();
        for (i = each_value_1.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx2);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        }
      } else {
        if (if_block) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(div_1, null);
        } else {
          if_block = null;
        }
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value_1.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      transition_in(if_block);
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div_1);
      }
      destroy_each(each_blocks, detaching);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_4(ctx) {
  let pending;
  let current;
  pending = new Pending({
    props: {
      layout: (
        /*layout*/
        ctx[22]
      ),
      avatar_images: (
        /*avatar_images*/
        ctx[16]
      )
    }
  });
  return {
    c() {
      create_component(pending.$$.fragment);
    },
    l(nodes) {
      claim_component(pending.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(pending, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const pending_changes = {};
      if (dirty[0] & /*layout*/
      4194304)
        pending_changes.layout = /*layout*/
        ctx2[22];
      if (dirty[0] & /*avatar_images*/
      65536)
        pending_changes.avatar_images = /*avatar_images*/
        ctx2[16];
      pending.$set(pending_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(pending.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(pending.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(pending, detaching);
    }
  };
}
function create_each_block_1(ctx) {
  var _a;
  let message;
  let updating_edit_message;
  let t;
  let if_block_anchor;
  let current;
  function func2(...args) {
    return (
      /*func*/
      ctx[50](
        /*i*/
        ctx[71],
        /*messages*/
        ctx[64],
        ...args
      )
    );
  }
  function message_edit_message_binding(value) {
    ctx[51](value);
  }
  let message_props = {
    messages: (
      /*messages*/
      ctx[64]
    ),
    display_consecutive_in_same_bubble: (
      /*display_consecutive_in_same_bubble*/
      ctx[3]
    ),
    opposite_avatar_img: (
      /*opposite_avatar_img*/
      ctx[67]
    ),
    avatar_img: (
      /*avatar_img*/
      ctx[66]
    ),
    role: (
      /*role*/
      ctx[65]
    ),
    layout: (
      /*layout*/
      ctx[22]
    ),
    dispatch: (
      /*dispatch*/
      ctx[42]
    ),
    i18n: (
      /*i18n*/
      ctx[21]
    ),
    _fetch: (
      /*_fetch*/
      ctx[1]
    ),
    line_breaks: (
      /*line_breaks*/
      ctx[19]
    ),
    theme_mode: (
      /*theme_mode*/
      ctx[20]
    ),
    target: (
      /*target*/
      ctx[34]
    ),
    root: (
      /*root*/
      ctx[30]
    ),
    upload: (
      /*upload*/
      ctx[24]
    ),
    selectable: (
      /*selectable*/
      ctx[7]
    ),
    sanitize_html: (
      /*sanitize_html*/
      ctx[17]
    ),
    render_markdown: (
      /*render_markdown*/
      ctx[18]
    ),
    rtl: (
      /*rtl*/
      ctx[14]
    ),
    i: (
      /*i*/
      ctx[71]
    ),
    value: (
      /*value*/
      ctx[0]
    ),
    latex_delimiters: (
      /*latex_delimiters*/
      ctx[4]
    ),
    _components: (
      /*_components*/
      ctx[33]
    ),
    generating: (
      /*generating*/
      ctx[6]
    ),
    msg_format: (
      /*msg_format*/
      ctx[25]
    ),
    feedback_options: (
      /*feedback_options*/
      ctx[9]
    ),
    current_feedback: (
      /*current_feedback*/
      ctx[69]
    ),
    allow_tags: (
      /*allow_tags*/
      ctx[31]
    ),
    watermark: (
      /*watermark*/
      ctx[32]
    ),
    show_like: (
      /*role*/
      ctx[65] === "user" ? (
        /*likeable*/
        ctx[8] && /*like_user_message*/
        ctx[29]
      ) : (
        /*likeable*/
        ctx[8]
      )
    ),
    show_retry: (
      /*_retryable*/
      ctx[27] && is_last_bot_message(
        /*messages*/
        ctx[64],
        /*value*/
        ctx[0]
      )
    ),
    show_undo: (
      /*_undoable*/
      ctx[28] && is_last_bot_message(
        /*messages*/
        ctx[64],
        /*value*/
        ctx[0]
      )
    ),
    show_edit: (
      /*editable*/
      ctx[11] === "all" || /*editable*/
      ctx[11] == "user" && /*role*/
      ctx[65] === "user" && /*messages*/
      ctx[64].length > 0 && /*messages*/
      ctx[64][
        /*messages*/
        ctx[64].length - 1
      ].type == "text"
    ),
    in_edit_mode: (
      /*edit_index*/
      ctx[35] === /*i*/
      ctx[71]
    ),
    show_copy_button: (
      /*show_copy_button*/
      ctx[15]
    ),
    handle_action: func2,
    scroll: (
      /*is_browser*/
      ctx[41] ? scroll : func_1
    ),
    allow_file_downloads: (
      /*allow_file_downloads*/
      ctx[2]
    )
  };
  if (
    /*edit_message*/
    ctx[36] !== void 0
  ) {
    message_props.edit_message = /*edit_message*/
    ctx[36];
  }
  message = new Message({ props: message_props });
  binding_callbacks.push(() => bind(message, "edit_message", message_edit_message_binding));
  message.$on(
    "copy",
    /*copy_handler*/
    ctx[52]
  );
  let if_block = (
    /*generating*/
    ctx[6] && /*messages*/
    ctx[64][
      /*messages*/
      ctx[64].length - 1
    ].role === "assistant" && /*messages*/
    ((_a = ctx[64][
      /*messages*/
      ctx[64].length - 1
    ].metadata) == null ? void 0 : _a.status) === "done" && create_if_block_4(ctx)
  );
  return {
    c() {
      create_component(message.$$.fragment);
      t = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      claim_component(message.$$.fragment, nodes);
      t = claim_space(nodes);
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      mount_component(message, target, anchor);
      insert_hydration(target, t, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      var _a2;
      ctx = new_ctx;
      const message_changes = {};
      if (dirty[1] & /*groupedMessages*/
      256)
        message_changes.messages = /*messages*/
        ctx[64];
      if (dirty[0] & /*display_consecutive_in_same_bubble*/
      8)
        message_changes.display_consecutive_in_same_bubble = /*display_consecutive_in_same_bubble*/
        ctx[3];
      if (dirty[0] & /*avatar_images*/
      65536 | dirty[1] & /*groupedMessages*/
      256)
        message_changes.opposite_avatar_img = /*opposite_avatar_img*/
        ctx[67];
      if (dirty[0] & /*avatar_images*/
      65536 | dirty[1] & /*groupedMessages*/
      256)
        message_changes.avatar_img = /*avatar_img*/
        ctx[66];
      if (dirty[1] & /*groupedMessages*/
      256)
        message_changes.role = /*role*/
        ctx[65];
      if (dirty[0] & /*layout*/
      4194304)
        message_changes.layout = /*layout*/
        ctx[22];
      if (dirty[0] & /*i18n*/
      2097152)
        message_changes.i18n = /*i18n*/
        ctx[21];
      if (dirty[0] & /*_fetch*/
      2)
        message_changes._fetch = /*_fetch*/
        ctx[1];
      if (dirty[0] & /*line_breaks*/
      524288)
        message_changes.line_breaks = /*line_breaks*/
        ctx[19];
      if (dirty[0] & /*theme_mode*/
      1048576)
        message_changes.theme_mode = /*theme_mode*/
        ctx[20];
      if (dirty[1] & /*target*/
      8)
        message_changes.target = /*target*/
        ctx[34];
      if (dirty[0] & /*root*/
      1073741824)
        message_changes.root = /*root*/
        ctx[30];
      if (dirty[0] & /*upload*/
      16777216)
        message_changes.upload = /*upload*/
        ctx[24];
      if (dirty[0] & /*selectable*/
      128)
        message_changes.selectable = /*selectable*/
        ctx[7];
      if (dirty[0] & /*sanitize_html*/
      131072)
        message_changes.sanitize_html = /*sanitize_html*/
        ctx[17];
      if (dirty[0] & /*render_markdown*/
      262144)
        message_changes.render_markdown = /*render_markdown*/
        ctx[18];
      if (dirty[0] & /*rtl*/
      16384)
        message_changes.rtl = /*rtl*/
        ctx[14];
      if (dirty[0] & /*value*/
      1)
        message_changes.value = /*value*/
        ctx[0];
      if (dirty[0] & /*latex_delimiters*/
      16)
        message_changes.latex_delimiters = /*latex_delimiters*/
        ctx[4];
      if (dirty[1] & /*_components*/
      4)
        message_changes._components = /*_components*/
        ctx[33];
      if (dirty[0] & /*generating*/
      64)
        message_changes.generating = /*generating*/
        ctx[6];
      if (dirty[0] & /*msg_format*/
      33554432)
        message_changes.msg_format = /*msg_format*/
        ctx[25];
      if (dirty[0] & /*feedback_options*/
      512)
        message_changes.feedback_options = /*feedback_options*/
        ctx[9];
      if (dirty[0] & /*feedback_value*/
      1024 | dirty[1] & /*groupedMessages*/
      256)
        message_changes.current_feedback = /*current_feedback*/
        ctx[69];
      if (dirty[1] & /*allow_tags*/
      1)
        message_changes.allow_tags = /*allow_tags*/
        ctx[31];
      if (dirty[1] & /*watermark*/
      2)
        message_changes.watermark = /*watermark*/
        ctx[32];
      if (dirty[0] & /*likeable, like_user_message*/
      536871168 | dirty[1] & /*groupedMessages*/
      256)
        message_changes.show_like = /*role*/
        ctx[65] === "user" ? (
          /*likeable*/
          ctx[8] && /*like_user_message*/
          ctx[29]
        ) : (
          /*likeable*/
          ctx[8]
        );
      if (dirty[0] & /*_retryable, value*/
      134217729 | dirty[1] & /*groupedMessages*/
      256)
        message_changes.show_retry = /*_retryable*/
        ctx[27] && is_last_bot_message(
          /*messages*/
          ctx[64],
          /*value*/
          ctx[0]
        );
      if (dirty[0] & /*_undoable, value*/
      268435457 | dirty[1] & /*groupedMessages*/
      256)
        message_changes.show_undo = /*_undoable*/
        ctx[28] && is_last_bot_message(
          /*messages*/
          ctx[64],
          /*value*/
          ctx[0]
        );
      if (dirty[0] & /*editable*/
      2048 | dirty[1] & /*groupedMessages*/
      256)
        message_changes.show_edit = /*editable*/
        ctx[11] === "all" || /*editable*/
        ctx[11] == "user" && /*role*/
        ctx[65] === "user" && /*messages*/
        ctx[64].length > 0 && /*messages*/
        ctx[64][
          /*messages*/
          ctx[64].length - 1
        ].type == "text";
      if (dirty[1] & /*edit_index*/
      16)
        message_changes.in_edit_mode = /*edit_index*/
        ctx[35] === /*i*/
        ctx[71];
      if (dirty[0] & /*show_copy_button*/
      32768)
        message_changes.show_copy_button = /*show_copy_button*/
        ctx[15];
      if (dirty[1] & /*groupedMessages*/
      256)
        message_changes.handle_action = func2;
      if (dirty[0] & /*allow_file_downloads*/
      4)
        message_changes.allow_file_downloads = /*allow_file_downloads*/
        ctx[2];
      if (!updating_edit_message && dirty[1] & /*edit_message*/
      32) {
        updating_edit_message = true;
        message_changes.edit_message = /*edit_message*/
        ctx[36];
        add_flush_callback(() => updating_edit_message = false);
      }
      message.$set(message_changes);
      if (
        /*generating*/
        ctx[6] && /*messages*/
        ctx[64][
          /*messages*/
          ctx[64].length - 1
        ].role === "assistant" && /*messages*/
        ((_a2 = ctx[64][
          /*messages*/
          ctx[64].length - 1
        ].metadata) == null ? void 0 : _a2.status) === "done"
      ) {
        if (if_block) {
          if_block.p(ctx, dirty);
          if (dirty[0] & /*generating*/
          64 | dirty[1] & /*groupedMessages*/
          256) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_4(ctx);
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
      transition_in(message.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(message.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
        detach(if_block_anchor);
      }
      destroy_component(message, detaching);
      if (if_block)
        if_block.d(detaching);
    }
  };
}
function create_if_block_3(ctx) {
  let div_1;
  let each_value = ensure_array_like(
    /*options*/
    ctx[40]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  return {
    c() {
      div_1 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      div_1 = claim_element(nodes, "DIV", { class: true });
      var div_1_nodes = children(div_1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div_1_nodes);
      }
      div_1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div_1, "class", "options svelte-gjtrl6");
    },
    m(target, anchor) {
      insert_hydration(target, div_1, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div_1, null);
        }
      }
    },
    p(ctx2, dirty) {
      if (dirty[1] & /*dispatch, options*/
      2560) {
        each_value = ensure_array_like(
          /*options*/
          ctx2[40]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div_1, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div_1);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_if_block_2(ctx) {
  let pending;
  let current;
  pending = new Pending({
    props: {
      layout: (
        /*layout*/
        ctx[22]
      ),
      avatar_images: (
        /*avatar_images*/
        ctx[16]
      )
    }
  });
  return {
    c() {
      create_component(pending.$$.fragment);
    },
    l(nodes) {
      claim_component(pending.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(pending, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const pending_changes = {};
      if (dirty[0] & /*layout*/
      4194304)
        pending_changes.layout = /*layout*/
        ctx2[22];
      if (dirty[0] & /*avatar_images*/
      65536)
        pending_changes.avatar_images = /*avatar_images*/
        ctx2[16];
      pending.$set(pending_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(pending.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(pending.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(pending, detaching);
    }
  };
}
function create_each_block(ctx) {
  let button;
  let t0_value = (
    /*option*/
    (ctx[61].label || /*option*/
    ctx[61].value) + ""
  );
  let t0;
  let t1;
  let mounted;
  let dispose;
  function click_handler_2() {
    return (
      /*click_handler_2*/
      ctx[53](
        /*index*/
        ctx[63],
        /*option*/
        ctx[61]
      )
    );
  }
  return {
    c() {
      button = element("button");
      t0 = text(t0_value);
      t1 = space();
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      t0 = claim_text(button_nodes, t0_value);
      t1 = claim_space(button_nodes);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(button, "class", "option svelte-gjtrl6");
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      append_hydration(button, t0);
      append_hydration(button, t1);
      if (!mounted) {
        dispose = listen(button, "click", click_handler_2);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty[1] & /*options*/
      512 && t0_value !== (t0_value = /*option*/
      (ctx[61].label || /*option*/
      ctx[61].value) + ""))
        set_data(t0, t0_value);
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block$1(ctx) {
  let div_1;
  let iconbutton;
  let current;
  iconbutton = new IconButton({
    props: {
      Icon: ScrollDownArrow,
      label: "Scroll down",
      size: "large"
    }
  });
  iconbutton.$on(
    "click",
    /*scroll_to_bottom*/
    ctx[43]
  );
  return {
    c() {
      div_1 = element("div");
      create_component(iconbutton.$$.fragment);
      this.h();
    },
    l(nodes) {
      div_1 = claim_element(nodes, "DIV", { class: true });
      var div_1_nodes = children(div_1);
      claim_component(iconbutton.$$.fragment, div_1_nodes);
      div_1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div_1, "class", "scroll-down-button-container svelte-gjtrl6");
    },
    m(target, anchor) {
      insert_hydration(target, div_1, anchor);
      mount_component(iconbutton, div_1, null);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(iconbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(iconbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div_1);
      }
      destroy_component(iconbutton);
    }
  };
}
function create_fragment$1(ctx) {
  let t0;
  let div_1;
  let current_block_type_index;
  let if_block1;
  let div_1_class_value;
  let t1;
  let if_block2_anchor;
  let current;
  let if_block0 = (
    /*value*/
    ctx[0] !== null && /*value*/
    ctx[0].length > 0 && create_if_block_5(ctx)
  );
  const if_block_creators = [create_if_block_1$1, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*value*/
      ctx2[0] !== null && /*value*/
      ctx2[0].length > 0 && /*groupedMessages*/
      ctx2[39] !== null
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  let if_block2 = (
    /*show_scroll_button*/
    ctx[38] && create_if_block$1(ctx)
  );
  return {
    c() {
      if (if_block0)
        if_block0.c();
      t0 = space();
      div_1 = element("div");
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
      div_1 = claim_element(nodes, "DIV", {
        class: true,
        role: true,
        "aria-label": true,
        "aria-live": true
      });
      var div_1_nodes = children(div_1);
      if_block1.l(div_1_nodes);
      div_1_nodes.forEach(detach);
      t1 = claim_space(nodes);
      if (if_block2)
        if_block2.l(nodes);
      if_block2_anchor = empty();
      this.h();
    },
    h() {
      attr(div_1, "class", div_1_class_value = null_to_empty(
        /*layout*/
        ctx[22] === "bubble" ? "bubble-wrap" : "panel-wrap"
      ) + " svelte-gjtrl6");
      attr(div_1, "role", "log");
      attr(div_1, "aria-label", "chatbot conversation");
      attr(div_1, "aria-live", "polite");
    },
    m(target, anchor) {
      if (if_block0)
        if_block0.m(target, anchor);
      insert_hydration(target, t0, anchor);
      insert_hydration(target, div_1, anchor);
      if_blocks[current_block_type_index].m(div_1, null);
      ctx[55](div_1);
      insert_hydration(target, t1, anchor);
      if (if_block2)
        if_block2.m(target, anchor);
      insert_hydration(target, if_block2_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (
        /*value*/
        ctx2[0] !== null && /*value*/
        ctx2[0].length > 0
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty[0] & /*value*/
          1) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_5(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(t0.parentNode, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
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
        if_block1.m(div_1, null);
      }
      if (!current || dirty[0] & /*layout*/
      4194304 && div_1_class_value !== (div_1_class_value = null_to_empty(
        /*layout*/
        ctx2[22] === "bubble" ? "bubble-wrap" : "panel-wrap"
      ) + " svelte-gjtrl6")) {
        attr(div_1, "class", div_1_class_value);
      }
      if (
        /*show_scroll_button*/
        ctx2[38]
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
          if (dirty[1] & /*show_scroll_button*/
          128) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block$1(ctx2);
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
        detach(t0);
        detach(div_1);
        detach(t1);
        detach(if_block2_anchor);
      }
      if (if_block0)
        if_block0.d(detaching);
      if_blocks[current_block_type_index].d();
      ctx[55](null);
      if (if_block2)
        if_block2.d(detaching);
    }
  };
}
const func_1 = () => {
};
function instance$1($$self, $$props, $$invalidate) {
  let groupedMessages;
  let options;
  let { value = [] } = $$props;
  let old_value = null;
  let { _fetch } = $$props;
  let { load_component } = $$props;
  let { allow_file_downloads } = $$props;
  let { display_consecutive_in_same_bubble } = $$props;
  let _components = {};
  const is_browser = typeof window !== "undefined";
  async function update_components() {
    $$invalidate(33, _components = await load_components(get_components_from_messages(value), _components, load_component));
  }
  let { latex_delimiters } = $$props;
  let { pending_message = false } = $$props;
  let { generating = false } = $$props;
  let { selectable = false } = $$props;
  let { likeable = false } = $$props;
  let { feedback_options } = $$props;
  let { feedback_value = null } = $$props;
  let { editable = null } = $$props;
  let { show_share_button = false } = $$props;
  let { show_copy_all_button = false } = $$props;
  let { rtl = false } = $$props;
  let { show_copy_button = false } = $$props;
  let { avatar_images = [null, null] } = $$props;
  let { sanitize_html = true } = $$props;
  let { render_markdown = true } = $$props;
  let { line_breaks = true } = $$props;
  let { autoscroll = true } = $$props;
  let { theme_mode } = $$props;
  let { i18n } = $$props;
  let { layout = "bubble" } = $$props;
  let { placeholder = null } = $$props;
  let { upload } = $$props;
  let { msg_format = "tuples" } = $$props;
  let { examples = null } = $$props;
  let { _retryable = false } = $$props;
  let { _undoable = false } = $$props;
  let { like_user_message = false } = $$props;
  let { root } = $$props;
  let { allow_tags = false } = $$props;
  let { watermark = null } = $$props;
  let target = null;
  let edit_index = null;
  let edit_message = "";
  onMount(() => {
    $$invalidate(34, target = document.querySelector("div.gradio-container"));
  });
  let div;
  let show_scroll_button = false;
  const dispatch = createEventDispatcher();
  function is_at_bottom() {
    return div && div.offsetHeight + div.scrollTop > div.scrollHeight - 100;
  }
  function scroll_to_bottom() {
    if (!div)
      return;
    div.scrollTo(0, div.scrollHeight);
    $$invalidate(38, show_scroll_button = false);
  }
  async function scroll_on_value_update() {
    if (!autoscroll)
      return;
    if (is_at_bottom()) {
      await tick();
      scroll_to_bottom();
    } else {
      $$invalidate(38, show_scroll_button = true);
    }
  }
  onMount(() => {
    scroll_on_value_update();
  });
  onMount(() => {
    function handle_scroll() {
      if (is_at_bottom()) {
        $$invalidate(38, show_scroll_button = false);
      }
    }
    div == null ? void 0 : div.addEventListener("scroll", handle_scroll);
    return () => {
      div == null ? void 0 : div.removeEventListener("scroll", handle_scroll);
    };
  });
  function handle_action(i, message, selected) {
    if (selected === "undo" || selected === "retry") {
      const val_ = value;
      let last_index = val_.length - 1;
      while (val_[last_index].role === "assistant") {
        last_index--;
      }
      dispatch(selected, {
        index: val_[last_index].index,
        value: val_[last_index].content
      });
    } else if (selected == "edit") {
      $$invalidate(35, edit_index = i);
      $$invalidate(36, edit_message = message.content);
    } else if (selected == "edit_cancel") {
      $$invalidate(35, edit_index = null);
    } else if (selected == "edit_submit") {
      $$invalidate(35, edit_index = null);
      dispatch("edit", {
        index: message.index,
        value: edit_message,
        previous_value: message.content
      });
    } else {
      let feedback = selected === "Like" ? true : selected === "Dislike" ? false : selected || "";
      if (msg_format === "tuples") {
        dispatch("like", {
          index: message.index,
          value: message.content,
          liked: feedback
        });
      } else {
        if (!groupedMessages)
          return;
        const message_group = groupedMessages[i];
        const [first, last] = [message_group[0], message_group[message_group.length - 1]];
        dispatch("like", {
          index: first.index,
          value: message_group.map((m) => m.content),
          liked: feedback
        });
      }
    }
  }
  function get_last_bot_options() {
    if (!value || !groupedMessages || groupedMessages.length === 0)
      return void 0;
    const last_group = groupedMessages[groupedMessages.length - 1];
    if (last_group[0].role !== "assistant")
      return void 0;
    return last_group[last_group.length - 1].options;
  }
  const click_handler = async () => {
    try {
      const formatted = await format_chat_for_sharing(value);
      dispatch("share", { description: formatted });
    } catch (e) {
      console.error(e);
      let message = e instanceof ShareError ? e.message : "Share failed.";
      dispatch("error", message);
    }
  };
  const click_handler_1 = () => dispatch("clear");
  const func2 = (i, messages, selected) => handle_action(i, messages[0], selected);
  function message_edit_message_binding(value2) {
    edit_message = value2;
    $$invalidate(36, edit_message);
  }
  const copy_handler = (e) => dispatch("copy", e.detail);
  const click_handler_2 = (index, option) => dispatch("option_select", { index, value: option.value });
  const example_select_handler = (e) => dispatch("example_select", e.detail);
  function div_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      div = $$value;
      $$invalidate(37, div);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("value" in $$props2)
      $$invalidate(0, value = $$props2.value);
    if ("_fetch" in $$props2)
      $$invalidate(1, _fetch = $$props2._fetch);
    if ("load_component" in $$props2)
      $$invalidate(45, load_component = $$props2.load_component);
    if ("allow_file_downloads" in $$props2)
      $$invalidate(2, allow_file_downloads = $$props2.allow_file_downloads);
    if ("display_consecutive_in_same_bubble" in $$props2)
      $$invalidate(3, display_consecutive_in_same_bubble = $$props2.display_consecutive_in_same_bubble);
    if ("latex_delimiters" in $$props2)
      $$invalidate(4, latex_delimiters = $$props2.latex_delimiters);
    if ("pending_message" in $$props2)
      $$invalidate(5, pending_message = $$props2.pending_message);
    if ("generating" in $$props2)
      $$invalidate(6, generating = $$props2.generating);
    if ("selectable" in $$props2)
      $$invalidate(7, selectable = $$props2.selectable);
    if ("likeable" in $$props2)
      $$invalidate(8, likeable = $$props2.likeable);
    if ("feedback_options" in $$props2)
      $$invalidate(9, feedback_options = $$props2.feedback_options);
    if ("feedback_value" in $$props2)
      $$invalidate(10, feedback_value = $$props2.feedback_value);
    if ("editable" in $$props2)
      $$invalidate(11, editable = $$props2.editable);
    if ("show_share_button" in $$props2)
      $$invalidate(12, show_share_button = $$props2.show_share_button);
    if ("show_copy_all_button" in $$props2)
      $$invalidate(13, show_copy_all_button = $$props2.show_copy_all_button);
    if ("rtl" in $$props2)
      $$invalidate(14, rtl = $$props2.rtl);
    if ("show_copy_button" in $$props2)
      $$invalidate(15, show_copy_button = $$props2.show_copy_button);
    if ("avatar_images" in $$props2)
      $$invalidate(16, avatar_images = $$props2.avatar_images);
    if ("sanitize_html" in $$props2)
      $$invalidate(17, sanitize_html = $$props2.sanitize_html);
    if ("render_markdown" in $$props2)
      $$invalidate(18, render_markdown = $$props2.render_markdown);
    if ("line_breaks" in $$props2)
      $$invalidate(19, line_breaks = $$props2.line_breaks);
    if ("autoscroll" in $$props2)
      $$invalidate(46, autoscroll = $$props2.autoscroll);
    if ("theme_mode" in $$props2)
      $$invalidate(20, theme_mode = $$props2.theme_mode);
    if ("i18n" in $$props2)
      $$invalidate(21, i18n = $$props2.i18n);
    if ("layout" in $$props2)
      $$invalidate(22, layout = $$props2.layout);
    if ("placeholder" in $$props2)
      $$invalidate(23, placeholder = $$props2.placeholder);
    if ("upload" in $$props2)
      $$invalidate(24, upload = $$props2.upload);
    if ("msg_format" in $$props2)
      $$invalidate(25, msg_format = $$props2.msg_format);
    if ("examples" in $$props2)
      $$invalidate(26, examples = $$props2.examples);
    if ("_retryable" in $$props2)
      $$invalidate(27, _retryable = $$props2._retryable);
    if ("_undoable" in $$props2)
      $$invalidate(28, _undoable = $$props2._undoable);
    if ("like_user_message" in $$props2)
      $$invalidate(29, like_user_message = $$props2.like_user_message);
    if ("root" in $$props2)
      $$invalidate(30, root = $$props2.root);
    if ("allow_tags" in $$props2)
      $$invalidate(31, allow_tags = $$props2.allow_tags);
    if ("watermark" in $$props2)
      $$invalidate(32, watermark = $$props2.watermark);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*value*/
    1) {
      update_components();
    }
    if ($$self.$$.dirty[0] & /*value, pending_message*/
    33 | $$self.$$.dirty[1] & /*_components*/
    4) {
      if (value || pending_message || _components) {
        scroll_on_value_update();
      }
    }
    if ($$self.$$.dirty[0] & /*value*/
    1 | $$self.$$.dirty[1] & /*old_value*/
    65536) {
      {
        if (!dequal(value, old_value)) {
          $$invalidate(47, old_value = value);
          dispatch("change");
        }
      }
    }
    if ($$self.$$.dirty[0] & /*value, msg_format*/
    33554433) {
      $$invalidate(39, groupedMessages = value && group_messages(value));
    }
    if ($$self.$$.dirty[0] & /*value*/
    1) {
      $$invalidate(40, options = value && get_last_bot_options());
    }
  };
  return [
    value,
    _fetch,
    allow_file_downloads,
    display_consecutive_in_same_bubble,
    latex_delimiters,
    pending_message,
    generating,
    selectable,
    likeable,
    feedback_options,
    feedback_value,
    editable,
    show_share_button,
    show_copy_all_button,
    rtl,
    show_copy_button,
    avatar_images,
    sanitize_html,
    render_markdown,
    line_breaks,
    theme_mode,
    i18n,
    layout,
    placeholder,
    upload,
    msg_format,
    examples,
    _retryable,
    _undoable,
    like_user_message,
    root,
    allow_tags,
    watermark,
    _components,
    target,
    edit_index,
    edit_message,
    div,
    show_scroll_button,
    groupedMessages,
    options,
    is_browser,
    dispatch,
    scroll_to_bottom,
    handle_action,
    load_component,
    autoscroll,
    old_value,
    click_handler,
    click_handler_1,
    func2,
    message_edit_message_binding,
    copy_handler,
    click_handler_2,
    example_select_handler,
    div_1_binding
  ];
}
class ChatBot extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance$1,
      create_fragment$1,
      safe_not_equal,
      {
        value: 0,
        _fetch: 1,
        load_component: 45,
        allow_file_downloads: 2,
        display_consecutive_in_same_bubble: 3,
        latex_delimiters: 4,
        pending_message: 5,
        generating: 6,
        selectable: 7,
        likeable: 8,
        feedback_options: 9,
        feedback_value: 10,
        editable: 11,
        show_share_button: 12,
        show_copy_all_button: 13,
        rtl: 14,
        show_copy_button: 15,
        avatar_images: 16,
        sanitize_html: 17,
        render_markdown: 18,
        line_breaks: 19,
        autoscroll: 46,
        theme_mode: 20,
        i18n: 21,
        layout: 22,
        placeholder: 23,
        upload: 24,
        msg_format: 25,
        examples: 26,
        _retryable: 27,
        _undoable: 28,
        like_user_message: 29,
        root: 30,
        allow_tags: 31,
        watermark: 32
      },
      null,
      [-1, -1, -1]
    );
  }
}
const ChatBot$1 = ChatBot;
function create_if_block_1(ctx) {
  let statustracker;
  let current;
  const statustracker_spread_levels = [
    {
      autoscroll: (
        /*gradio*/
        ctx[27].autoscroll
      )
    },
    { i18n: (
      /*gradio*/
      ctx[27].i18n
    ) },
    /*loading_status*/
    ctx[30],
    {
      show_progress: (
        /*loading_status*/
        ctx[30].show_progress === "hidden" ? "hidden" : "minimal"
      )
    }
  ];
  let statustracker_props = {};
  for (let i = 0; i < statustracker_spread_levels.length; i += 1) {
    statustracker_props = assign(statustracker_props, statustracker_spread_levels[i]);
  }
  statustracker = new Static({ props: statustracker_props });
  statustracker.$on(
    "clear_status",
    /*clear_status_handler*/
    ctx[43]
  );
  return {
    c() {
      create_component(statustracker.$$.fragment);
    },
    l(nodes) {
      claim_component(statustracker.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(statustracker, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const statustracker_changes = dirty[0] & /*gradio, loading_status*/
      1207959552 ? get_spread_update(statustracker_spread_levels, [
        dirty[0] & /*gradio*/
        134217728 && {
          autoscroll: (
            /*gradio*/
            ctx2[27].autoscroll
          )
        },
        dirty[0] & /*gradio*/
        134217728 && { i18n: (
          /*gradio*/
          ctx2[27].i18n
        ) },
        dirty[0] & /*loading_status*/
        1073741824 && get_spread_object(
          /*loading_status*/
          ctx2[30]
        ),
        dirty[0] & /*loading_status*/
        1073741824 && {
          show_progress: (
            /*loading_status*/
            ctx2[30].show_progress === "hidden" ? "hidden" : "minimal"
          )
        }
      ]) : {};
      statustracker.$set(statustracker_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(statustracker.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(statustracker.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(statustracker, detaching);
    }
  };
}
function create_if_block(ctx) {
  let blocklabel;
  let current;
  blocklabel = new BlockLabel({
    props: {
      show_label: (
        /*show_label*/
        ctx[7]
      ),
      Icon: Chat,
      float: true,
      label: (
        /*label*/
        ctx[6] || "Chatbot"
      )
    }
  });
  return {
    c() {
      create_component(blocklabel.$$.fragment);
    },
    l(nodes) {
      claim_component(blocklabel.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(blocklabel, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const blocklabel_changes = {};
      if (dirty[0] & /*show_label*/
      128)
        blocklabel_changes.show_label = /*show_label*/
        ctx2[7];
      if (dirty[0] & /*label*/
      64)
        blocklabel_changes.label = /*label*/
        ctx2[6] || "Chatbot";
      blocklabel.$set(blocklabel_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(blocklabel.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(blocklabel.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(blocklabel, detaching);
    }
  };
}
function create_default_slot(ctx) {
  var _a, _b;
  let t0;
  let div;
  let t1;
  let chatbot;
  let current;
  let if_block0 = (
    /*loading_status*/
    ctx[30] && create_if_block_1(ctx)
  );
  let if_block1 = (
    /*show_label*/
    ctx[7] && create_if_block(ctx)
  );
  chatbot = new ChatBot$1({
    props: {
      i18n: (
        /*gradio*/
        ctx[27].i18n
      ),
      selectable: (
        /*_selectable*/
        ctx[8]
      ),
      likeable: (
        /*likeable*/
        ctx[9]
      ),
      feedback_options: (
        /*feedback_options*/
        ctx[10]
      ),
      feedback_value: (
        /*feedback_value*/
        ctx[11]
      ),
      show_share_button: (
        /*show_share_button*/
        ctx[12]
      ),
      show_copy_all_button: (
        /*show_copy_all_button*/
        ctx[15]
      ),
      value: (
        /*_value*/
        ctx[41]
      ),
      latex_delimiters: (
        /*latex_delimiters*/
        ctx[26]
      ),
      display_consecutive_in_same_bubble: (
        /*group_consecutive_messages*/
        ctx[24]
      ),
      render_markdown: (
        /*render_markdown*/
        ctx[19]
      ),
      theme_mode: (
        /*theme_mode*/
        ctx[38]
      ),
      editable: (
        /*editable*/
        ctx[35]
      ),
      pending_message: (
        /*loading_status*/
        ((_a = ctx[30]) == null ? void 0 : _a.status) === "pending"
      ),
      generating: (
        /*loading_status*/
        ((_b = ctx[30]) == null ? void 0 : _b.status) === "generating"
      ),
      rtl: (
        /*rtl*/
        ctx[13]
      ),
      show_copy_button: (
        /*show_copy_button*/
        ctx[14]
      ),
      like_user_message: (
        /*like_user_message*/
        ctx[29]
      ),
      avatar_images: (
        /*avatar_images*/
        ctx[28]
      ),
      sanitize_html: (
        /*sanitize_html*/
        ctx[16]
      ),
      line_breaks: (
        /*line_breaks*/
        ctx[20]
      ),
      autoscroll: (
        /*autoscroll*/
        ctx[21]
      ),
      layout: (
        /*layout*/
        ctx[17]
      ),
      placeholder: (
        /*placeholder*/
        ctx[36]
      ),
      examples: (
        /*examples*/
        ctx[37]
      ),
      _retryable: (
        /*_retryable*/
        ctx[22]
      ),
      _undoable: (
        /*_undoable*/
        ctx[23]
      ),
      upload: (
        /*func*/
        ctx[44]
      ),
      _fetch: (
        /*func_1*/
        ctx[45]
      ),
      load_component: (
        /*gradio*/
        ctx[27].load_component
      ),
      msg_format: (
        /*type*/
        ctx[18]
      ),
      root: (
        /*gradio*/
        ctx[27].root
      ),
      allow_file_downloads: (
        /*allow_file_downloads*/
        ctx[39]
      ),
      allow_tags: (
        /*allow_tags*/
        ctx[25]
      ),
      watermark: (
        /*watermark*/
        ctx[40]
      )
    }
  });
  chatbot.$on(
    "change",
    /*change_handler*/
    ctx[46]
  );
  chatbot.$on(
    "select",
    /*select_handler*/
    ctx[47]
  );
  chatbot.$on(
    "like",
    /*like_handler*/
    ctx[48]
  );
  chatbot.$on(
    "share",
    /*share_handler*/
    ctx[49]
  );
  chatbot.$on(
    "error",
    /*error_handler*/
    ctx[50]
  );
  chatbot.$on(
    "example_select",
    /*example_select_handler*/
    ctx[51]
  );
  chatbot.$on(
    "option_select",
    /*option_select_handler*/
    ctx[52]
  );
  chatbot.$on(
    "retry",
    /*retry_handler*/
    ctx[53]
  );
  chatbot.$on(
    "undo",
    /*undo_handler*/
    ctx[54]
  );
  chatbot.$on(
    "clear",
    /*clear_handler*/
    ctx[55]
  );
  chatbot.$on(
    "copy",
    /*copy_handler*/
    ctx[56]
  );
  chatbot.$on(
    "edit",
    /*edit_handler*/
    ctx[57]
  );
  return {
    c() {
      if (if_block0)
        if_block0.c();
      t0 = space();
      div = element("div");
      if (if_block1)
        if_block1.c();
      t1 = space();
      create_component(chatbot.$$.fragment);
      this.h();
    },
    l(nodes) {
      if (if_block0)
        if_block0.l(nodes);
      t0 = claim_space(nodes);
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if (if_block1)
        if_block1.l(div_nodes);
      t1 = claim_space(div_nodes);
      claim_component(chatbot.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "wrapper svelte-g3p8na");
    },
    m(target, anchor) {
      if (if_block0)
        if_block0.m(target, anchor);
      insert_hydration(target, t0, anchor);
      insert_hydration(target, div, anchor);
      if (if_block1)
        if_block1.m(div, null);
      append_hydration(div, t1);
      mount_component(chatbot, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      var _a2, _b2;
      if (
        /*loading_status*/
        ctx2[30]
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty[0] & /*loading_status*/
          1073741824) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_1(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(t0.parentNode, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (
        /*show_label*/
        ctx2[7]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & /*show_label*/
          128) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block(ctx2);
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
      const chatbot_changes = {};
      if (dirty[0] & /*gradio*/
      134217728)
        chatbot_changes.i18n = /*gradio*/
        ctx2[27].i18n;
      if (dirty[0] & /*_selectable*/
      256)
        chatbot_changes.selectable = /*_selectable*/
        ctx2[8];
      if (dirty[0] & /*likeable*/
      512)
        chatbot_changes.likeable = /*likeable*/
        ctx2[9];
      if (dirty[0] & /*feedback_options*/
      1024)
        chatbot_changes.feedback_options = /*feedback_options*/
        ctx2[10];
      if (dirty[0] & /*feedback_value*/
      2048)
        chatbot_changes.feedback_value = /*feedback_value*/
        ctx2[11];
      if (dirty[0] & /*show_share_button*/
      4096)
        chatbot_changes.show_share_button = /*show_share_button*/
        ctx2[12];
      if (dirty[0] & /*show_copy_all_button*/
      32768)
        chatbot_changes.show_copy_all_button = /*show_copy_all_button*/
        ctx2[15];
      if (dirty[1] & /*_value*/
      1024)
        chatbot_changes.value = /*_value*/
        ctx2[41];
      if (dirty[0] & /*latex_delimiters*/
      67108864)
        chatbot_changes.latex_delimiters = /*latex_delimiters*/
        ctx2[26];
      if (dirty[0] & /*group_consecutive_messages*/
      16777216)
        chatbot_changes.display_consecutive_in_same_bubble = /*group_consecutive_messages*/
        ctx2[24];
      if (dirty[0] & /*render_markdown*/
      524288)
        chatbot_changes.render_markdown = /*render_markdown*/
        ctx2[19];
      if (dirty[1] & /*theme_mode*/
      128)
        chatbot_changes.theme_mode = /*theme_mode*/
        ctx2[38];
      if (dirty[1] & /*editable*/
      16)
        chatbot_changes.editable = /*editable*/
        ctx2[35];
      if (dirty[0] & /*loading_status*/
      1073741824)
        chatbot_changes.pending_message = /*loading_status*/
        ((_a2 = ctx2[30]) == null ? void 0 : _a2.status) === "pending";
      if (dirty[0] & /*loading_status*/
      1073741824)
        chatbot_changes.generating = /*loading_status*/
        ((_b2 = ctx2[30]) == null ? void 0 : _b2.status) === "generating";
      if (dirty[0] & /*rtl*/
      8192)
        chatbot_changes.rtl = /*rtl*/
        ctx2[13];
      if (dirty[0] & /*show_copy_button*/
      16384)
        chatbot_changes.show_copy_button = /*show_copy_button*/
        ctx2[14];
      if (dirty[0] & /*like_user_message*/
      536870912)
        chatbot_changes.like_user_message = /*like_user_message*/
        ctx2[29];
      if (dirty[0] & /*avatar_images*/
      268435456)
        chatbot_changes.avatar_images = /*avatar_images*/
        ctx2[28];
      if (dirty[0] & /*sanitize_html*/
      65536)
        chatbot_changes.sanitize_html = /*sanitize_html*/
        ctx2[16];
      if (dirty[0] & /*line_breaks*/
      1048576)
        chatbot_changes.line_breaks = /*line_breaks*/
        ctx2[20];
      if (dirty[0] & /*autoscroll*/
      2097152)
        chatbot_changes.autoscroll = /*autoscroll*/
        ctx2[21];
      if (dirty[0] & /*layout*/
      131072)
        chatbot_changes.layout = /*layout*/
        ctx2[17];
      if (dirty[1] & /*placeholder*/
      32)
        chatbot_changes.placeholder = /*placeholder*/
        ctx2[36];
      if (dirty[1] & /*examples*/
      64)
        chatbot_changes.examples = /*examples*/
        ctx2[37];
      if (dirty[0] & /*_retryable*/
      4194304)
        chatbot_changes._retryable = /*_retryable*/
        ctx2[22];
      if (dirty[0] & /*_undoable*/
      8388608)
        chatbot_changes._undoable = /*_undoable*/
        ctx2[23];
      if (dirty[0] & /*gradio*/
      134217728)
        chatbot_changes.upload = /*func*/
        ctx2[44];
      if (dirty[0] & /*gradio*/
      134217728)
        chatbot_changes._fetch = /*func_1*/
        ctx2[45];
      if (dirty[0] & /*gradio*/
      134217728)
        chatbot_changes.load_component = /*gradio*/
        ctx2[27].load_component;
      if (dirty[0] & /*type*/
      262144)
        chatbot_changes.msg_format = /*type*/
        ctx2[18];
      if (dirty[0] & /*gradio*/
      134217728)
        chatbot_changes.root = /*gradio*/
        ctx2[27].root;
      if (dirty[1] & /*allow_file_downloads*/
      256)
        chatbot_changes.allow_file_downloads = /*allow_file_downloads*/
        ctx2[39];
      if (dirty[0] & /*allow_tags*/
      33554432)
        chatbot_changes.allow_tags = /*allow_tags*/
        ctx2[25];
      if (dirty[1] & /*watermark*/
      512)
        chatbot_changes.watermark = /*watermark*/
        ctx2[40];
      chatbot.$set(chatbot_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(chatbot.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(chatbot.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(div);
      }
      if (if_block0)
        if_block0.d(detaching);
      if (if_block1)
        if_block1.d();
      destroy_component(chatbot);
    }
  };
}
function create_fragment(ctx) {
  let block;
  let current;
  block = new Block({
    props: {
      elem_id: (
        /*elem_id*/
        ctx[1]
      ),
      elem_classes: (
        /*elem_classes*/
        ctx[2]
      ),
      visible: (
        /*visible*/
        ctx[3]
      ),
      padding: false,
      scale: (
        /*scale*/
        ctx[4]
      ),
      min_width: (
        /*min_width*/
        ctx[5]
      ),
      height: (
        /*height*/
        ctx[31]
      ),
      resizable: (
        /*resizable*/
        ctx[32]
      ),
      min_height: (
        /*min_height*/
        ctx[33]
      ),
      max_height: (
        /*max_height*/
        ctx[34]
      ),
      allow_overflow: true,
      flex: true,
      overflow_behavior: "auto",
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
      if (dirty[0] & /*elem_id*/
      2)
        block_changes.elem_id = /*elem_id*/
        ctx2[1];
      if (dirty[0] & /*elem_classes*/
      4)
        block_changes.elem_classes = /*elem_classes*/
        ctx2[2];
      if (dirty[0] & /*visible*/
      8)
        block_changes.visible = /*visible*/
        ctx2[3];
      if (dirty[0] & /*scale*/
      16)
        block_changes.scale = /*scale*/
        ctx2[4];
      if (dirty[0] & /*min_width*/
      32)
        block_changes.min_width = /*min_width*/
        ctx2[5];
      if (dirty[1] & /*height*/
      1)
        block_changes.height = /*height*/
        ctx2[31];
      if (dirty[1] & /*resizable*/
      2)
        block_changes.resizable = /*resizable*/
        ctx2[32];
      if (dirty[1] & /*min_height*/
      4)
        block_changes.min_height = /*min_height*/
        ctx2[33];
      if (dirty[1] & /*max_height*/
      8)
        block_changes.max_height = /*max_height*/
        ctx2[34];
      if (dirty[0] & /*gradio, _selectable, likeable, feedback_options, feedback_value, show_share_button, show_copy_all_button, latex_delimiters, group_consecutive_messages, render_markdown, loading_status, rtl, show_copy_button, like_user_message, avatar_images, sanitize_html, line_breaks, autoscroll, layout, _retryable, _undoable, type, allow_tags, value, show_label, label*/
      2147483585 | dirty[1] & /*$$scope, _value, theme_mode, editable, placeholder, examples, allow_file_downloads, watermark*/
      134219760) {
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
  let { elem_id = "" } = $$props;
  let { elem_classes = [] } = $$props;
  let { visible = true } = $$props;
  let { value = [] } = $$props;
  let { scale = null } = $$props;
  let { min_width = void 0 } = $$props;
  let { label } = $$props;
  let { show_label = true } = $$props;
  let { root } = $$props;
  let { _selectable = false } = $$props;
  let { likeable = false } = $$props;
  let { feedback_options = ["Like", "Dislike"] } = $$props;
  let { feedback_value = null } = $$props;
  let { show_share_button = false } = $$props;
  let { rtl = false } = $$props;
  let { show_copy_button = true } = $$props;
  let { show_copy_all_button = false } = $$props;
  let { sanitize_html = true } = $$props;
  let { layout = "bubble" } = $$props;
  let { type = "tuples" } = $$props;
  let { render_markdown = true } = $$props;
  let { line_breaks = true } = $$props;
  let { autoscroll = true } = $$props;
  let { _retryable = false } = $$props;
  let { _undoable = false } = $$props;
  let { group_consecutive_messages = true } = $$props;
  let { allow_tags = false } = $$props;
  let { latex_delimiters } = $$props;
  let { gradio } = $$props;
  let _value = [];
  let { avatar_images = [null, null] } = $$props;
  let { like_user_message = false } = $$props;
  let { loading_status = void 0 } = $$props;
  let { height } = $$props;
  let { resizable } = $$props;
  let { min_height } = $$props;
  let { max_height } = $$props;
  let { editable = null } = $$props;
  let { placeholder = null } = $$props;
  let { examples = null } = $$props;
  let { theme_mode } = $$props;
  let { allow_file_downloads = true } = $$props;
  let { watermark = null } = $$props;
  const clear_status_handler = () => gradio.dispatch("clear_status", loading_status);
  const func2 = (...args) => gradio.client.upload(...args);
  const func_12 = (...args) => gradio.client.fetch(...args);
  const change_handler = () => gradio.dispatch("change", value);
  const select_handler = (e) => gradio.dispatch("select", e.detail);
  const like_handler = (e) => gradio.dispatch("like", e.detail);
  const share_handler = (e) => gradio.dispatch("share", e.detail);
  const error_handler = (e) => gradio.dispatch("error", e.detail);
  const example_select_handler = (e) => gradio.dispatch("example_select", e.detail);
  const option_select_handler = (e) => gradio.dispatch("option_select", e.detail);
  const retry_handler = (e) => gradio.dispatch("retry", e.detail);
  const undo_handler = (e) => gradio.dispatch("undo", e.detail);
  const clear_handler = () => {
    $$invalidate(0, value = []);
    gradio.dispatch("clear");
  };
  const copy_handler = (e) => gradio.dispatch("copy", e.detail);
  const edit_handler = (e) => {
    if (value === null || value.length === 0)
      return;
    if (type === "messages") {
      $$invalidate(0, value[e.detail.index].content = e.detail.value, value);
    } else {
      $$invalidate(0, value[e.detail.index[0]][e.detail.index[1]] = e.detail.value, value);
    }
    $$invalidate(0, value);
    gradio.dispatch("edit", e.detail);
  };
  $$self.$$set = ($$props2) => {
    if ("elem_id" in $$props2)
      $$invalidate(1, elem_id = $$props2.elem_id);
    if ("elem_classes" in $$props2)
      $$invalidate(2, elem_classes = $$props2.elem_classes);
    if ("visible" in $$props2)
      $$invalidate(3, visible = $$props2.visible);
    if ("value" in $$props2)
      $$invalidate(0, value = $$props2.value);
    if ("scale" in $$props2)
      $$invalidate(4, scale = $$props2.scale);
    if ("min_width" in $$props2)
      $$invalidate(5, min_width = $$props2.min_width);
    if ("label" in $$props2)
      $$invalidate(6, label = $$props2.label);
    if ("show_label" in $$props2)
      $$invalidate(7, show_label = $$props2.show_label);
    if ("root" in $$props2)
      $$invalidate(42, root = $$props2.root);
    if ("_selectable" in $$props2)
      $$invalidate(8, _selectable = $$props2._selectable);
    if ("likeable" in $$props2)
      $$invalidate(9, likeable = $$props2.likeable);
    if ("feedback_options" in $$props2)
      $$invalidate(10, feedback_options = $$props2.feedback_options);
    if ("feedback_value" in $$props2)
      $$invalidate(11, feedback_value = $$props2.feedback_value);
    if ("show_share_button" in $$props2)
      $$invalidate(12, show_share_button = $$props2.show_share_button);
    if ("rtl" in $$props2)
      $$invalidate(13, rtl = $$props2.rtl);
    if ("show_copy_button" in $$props2)
      $$invalidate(14, show_copy_button = $$props2.show_copy_button);
    if ("show_copy_all_button" in $$props2)
      $$invalidate(15, show_copy_all_button = $$props2.show_copy_all_button);
    if ("sanitize_html" in $$props2)
      $$invalidate(16, sanitize_html = $$props2.sanitize_html);
    if ("layout" in $$props2)
      $$invalidate(17, layout = $$props2.layout);
    if ("type" in $$props2)
      $$invalidate(18, type = $$props2.type);
    if ("render_markdown" in $$props2)
      $$invalidate(19, render_markdown = $$props2.render_markdown);
    if ("line_breaks" in $$props2)
      $$invalidate(20, line_breaks = $$props2.line_breaks);
    if ("autoscroll" in $$props2)
      $$invalidate(21, autoscroll = $$props2.autoscroll);
    if ("_retryable" in $$props2)
      $$invalidate(22, _retryable = $$props2._retryable);
    if ("_undoable" in $$props2)
      $$invalidate(23, _undoable = $$props2._undoable);
    if ("group_consecutive_messages" in $$props2)
      $$invalidate(24, group_consecutive_messages = $$props2.group_consecutive_messages);
    if ("allow_tags" in $$props2)
      $$invalidate(25, allow_tags = $$props2.allow_tags);
    if ("latex_delimiters" in $$props2)
      $$invalidate(26, latex_delimiters = $$props2.latex_delimiters);
    if ("gradio" in $$props2)
      $$invalidate(27, gradio = $$props2.gradio);
    if ("avatar_images" in $$props2)
      $$invalidate(28, avatar_images = $$props2.avatar_images);
    if ("like_user_message" in $$props2)
      $$invalidate(29, like_user_message = $$props2.like_user_message);
    if ("loading_status" in $$props2)
      $$invalidate(30, loading_status = $$props2.loading_status);
    if ("height" in $$props2)
      $$invalidate(31, height = $$props2.height);
    if ("resizable" in $$props2)
      $$invalidate(32, resizable = $$props2.resizable);
    if ("min_height" in $$props2)
      $$invalidate(33, min_height = $$props2.min_height);
    if ("max_height" in $$props2)
      $$invalidate(34, max_height = $$props2.max_height);
    if ("editable" in $$props2)
      $$invalidate(35, editable = $$props2.editable);
    if ("placeholder" in $$props2)
      $$invalidate(36, placeholder = $$props2.placeholder);
    if ("examples" in $$props2)
      $$invalidate(37, examples = $$props2.examples);
    if ("theme_mode" in $$props2)
      $$invalidate(38, theme_mode = $$props2.theme_mode);
    if ("allow_file_downloads" in $$props2)
      $$invalidate(39, allow_file_downloads = $$props2.allow_file_downloads);
    if ("watermark" in $$props2)
      $$invalidate(40, watermark = $$props2.watermark);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*type, value*/
    262145 | $$self.$$.dirty[1] & /*root*/
    2048) {
      $$invalidate(41, _value = type === "tuples" ? normalise_tuples(value, root) : normalise_messages(value, root));
    }
  };
  return [
    value,
    elem_id,
    elem_classes,
    visible,
    scale,
    min_width,
    label,
    show_label,
    _selectable,
    likeable,
    feedback_options,
    feedback_value,
    show_share_button,
    rtl,
    show_copy_button,
    show_copy_all_button,
    sanitize_html,
    layout,
    type,
    render_markdown,
    line_breaks,
    autoscroll,
    _retryable,
    _undoable,
    group_consecutive_messages,
    allow_tags,
    latex_delimiters,
    gradio,
    avatar_images,
    like_user_message,
    loading_status,
    height,
    resizable,
    min_height,
    max_height,
    editable,
    placeholder,
    examples,
    theme_mode,
    allow_file_downloads,
    watermark,
    _value,
    root,
    clear_status_handler,
    func2,
    func_12,
    change_handler,
    select_handler,
    like_handler,
    share_handler,
    error_handler,
    example_select_handler,
    option_select_handler,
    retry_handler,
    undo_handler,
    clear_handler,
    copy_handler,
    edit_handler
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
        elem_id: 1,
        elem_classes: 2,
        visible: 3,
        value: 0,
        scale: 4,
        min_width: 5,
        label: 6,
        show_label: 7,
        root: 42,
        _selectable: 8,
        likeable: 9,
        feedback_options: 10,
        feedback_value: 11,
        show_share_button: 12,
        rtl: 13,
        show_copy_button: 14,
        show_copy_all_button: 15,
        sanitize_html: 16,
        layout: 17,
        type: 18,
        render_markdown: 19,
        line_breaks: 20,
        autoscroll: 21,
        _retryable: 22,
        _undoable: 23,
        group_consecutive_messages: 24,
        allow_tags: 25,
        latex_delimiters: 26,
        gradio: 27,
        avatar_images: 28,
        like_user_message: 29,
        loading_status: 30,
        height: 31,
        resizable: 32,
        min_height: 33,
        max_height: 34,
        editable: 35,
        placeholder: 36,
        examples: 37,
        theme_mode: 38,
        allow_file_downloads: 39,
        watermark: 40
      },
      null,
      [-1, -1]
    );
  }
}
export {
  ChatBot$1 as BaseChatBot,
  Index as default
};
