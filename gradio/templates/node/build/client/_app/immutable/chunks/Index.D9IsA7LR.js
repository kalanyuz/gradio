import { SvelteComponent, init, safe_not_equal, element, space, claim_element, children, claim_space, detach, attr, insert_hydration, append_hydration, noop, onMount, text, claim_text, listen, set_data, ensure_array_like, empty, update_keyed_each, destroy_block, binding_callbacks, get_svelte_dataset, HtmlTagHydration, claim_html_tag, set_style, toggle_class, create_component, claim_component, mount_component, transition_in, transition_out, destroy_component } from "../../../svelte/svelte.js";
import "../../../svelte/svelte-submodules.js";
import { Q as Prism$1 } from "./2.DR-_Vqz1.js";
(function(Prism2) {
  Prism2.languages.typescript = Prism2.languages.extend("javascript", {
    "class-name": {
      pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
      lookbehind: true,
      greedy: true,
      inside: null
      // see below
    },
    "builtin": /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/
  });
  Prism2.languages.typescript.keyword.push(
    /\b(?:abstract|declare|is|keyof|readonly|require)\b/,
    // keywords that have to be followed by an identifier
    /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
    // This is for `import type *, {}`
    /\btype\b(?=\s*(?:[\{*]|$))/
  );
  delete Prism2.languages.typescript["parameter"];
  delete Prism2.languages.typescript["literal-property"];
  var typeInside = Prism2.languages.extend("typescript", {});
  delete typeInside["class-name"];
  Prism2.languages.typescript["class-name"].inside = typeInside;
  Prism2.languages.insertBefore("typescript", "function", {
    "decorator": {
      pattern: /@[$\w\xA0-\uFFFF]+/,
      inside: {
        "at": {
          pattern: /^@/,
          alias: "operator"
        },
        "function": /^[\s\S]+/
      }
    },
    "generic-function": {
      // e.g. foo<T extends "bar" | "baz">( ...
      pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
      greedy: true,
      inside: {
        "function": /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
        "generic": {
          pattern: /<[\s\S]+/,
          // everything after the first <
          alias: "class-name",
          inside: typeInside
        }
      }
    }
  });
  Prism2.languages.ts = Prism2.languages.typescript;
})(Prism);
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[13] = list[i].type;
  child_ctx[14] = list[i].description;
  child_ctx[15] = list[i].default;
  child_ctx[16] = list[i].name;
  return child_ctx;
}
function create_if_block_5(ctx) {
  let div;
  let span;
  let t0;
  let t1;
  let button;
  let t2;
  let button_title_value;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      span = element("span");
      t0 = text(
        /*header*/
        ctx[1]
      );
      t1 = space();
      button = element("button");
      t2 = text("▼");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      span = claim_element(div_nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      t0 = claim_text(
        span_nodes,
        /*header*/
        ctx[1]
      );
      span_nodes.forEach(detach);
      t1 = claim_space(div_nodes);
      button = claim_element(div_nodes, "BUTTON", { class: true, title: true });
      var button_nodes = children(button);
      t2 = claim_text(button_nodes, "▼");
      button_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "title svelte-1mlh4di");
      attr(button, "class", "toggle-all svelte-1mlh4di");
      attr(button, "title", button_title_value = /*all_open*/
      ctx[5] ? "Close All" : "Open All");
      attr(div, "class", "header svelte-1mlh4di");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, span);
      append_hydration(span, t0);
      append_hydration(div, t1);
      append_hydration(div, button);
      append_hydration(button, t2);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*toggle_all*/
          ctx[6]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*header*/
      2)
        set_data(
          t0,
          /*header*/
          ctx2[1]
        );
      if (dirty & /*all_open*/
      32 && button_title_value !== (button_title_value = /*all_open*/
      ctx2[5] ? "Close All" : "Open All")) {
        attr(button, "title", button_title_value);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block(ctx) {
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let each_1_anchor;
  let each_value = ensure_array_like(
    /*_docs*/
    ctx[4]
  );
  const get_key = (ctx2) => (
    /*name*/
    ctx2[16]
  );
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
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
    },
    p(ctx2, dirty) {
      if (dirty & /*anchor_links, create_slug, _docs, undefined, render_links, lang*/
      21) {
        each_value = ensure_array_like(
          /*_docs*/
          ctx2[4]
        );
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, each_1_anchor.parentNode, destroy_block, create_each_block, each_1_anchor, get_each_context);
      }
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
function create_if_block_4(ctx) {
  let a;
  let span;
  let textContent = "🔗";
  let a_href_value;
  return {
    c() {
      a = element("a");
      span = element("span");
      span.textContent = textContent;
      this.h();
    },
    l(nodes) {
      a = claim_element(nodes, "A", { href: true, class: true });
      var a_nodes = children(a);
      span = claim_element(a_nodes, "SPAN", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(span) !== "svelte-1tjdumv")
        span.textContent = textContent;
      a_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "link-icon svelte-1mlh4di");
      attr(a, "href", a_href_value = "#" + create_slug(
        /*name*/
        ctx[16] || "",
        /*anchor_links*/
        ctx[2]
      ));
      attr(a, "class", "param-link svelte-1mlh4di");
    },
    m(target, anchor) {
      insert_hydration(target, a, anchor);
      append_hydration(a, span);
    },
    p(ctx2, dirty) {
      if (dirty & /*_docs, anchor_links*/
      20 && a_href_value !== (a_href_value = "#" + create_slug(
        /*name*/
        ctx2[16] || "",
        /*anchor_links*/
        ctx2[2]
      ))) {
        attr(a, "href", a_href_value);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(a);
      }
    }
  };
}
function create_if_block_3(ctx) {
  let t;
  let html_tag;
  let raw_value = (
    /*type*/
    ctx[13] + ""
  );
  let html_anchor;
  return {
    c() {
      t = text(": ");
      html_tag = new HtmlTagHydration(false);
      html_anchor = empty();
      this.h();
    },
    l(nodes) {
      t = claim_text(nodes, ": ");
      html_tag = claim_html_tag(nodes, false);
      html_anchor = empty();
      this.h();
    },
    h() {
      html_tag.a = html_anchor;
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
      html_tag.m(raw_value, target, anchor);
      insert_hydration(target, html_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*_docs*/
      16 && raw_value !== (raw_value = /*type*/
      ctx2[13] + ""))
        html_tag.p(raw_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
        detach(html_anchor);
        html_tag.d();
      }
    }
  };
}
function create_if_block_2(ctx) {
  let div;
  let span;
  let textContent = "default";
  let t1;
  let code;
  let t2;
  let html_tag;
  let raw_value = (
    /*_default*/
    ctx[15] + ""
  );
  return {
    c() {
      div = element("div");
      span = element("span");
      span.textContent = textContent;
      t1 = space();
      code = element("code");
      t2 = text("= ");
      html_tag = new HtmlTagHydration(false);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      span = claim_element(div_nodes, "SPAN", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(span) !== "svelte-8y216r")
        span.textContent = textContent;
      t1 = claim_space(div_nodes);
      code = claim_element(div_nodes, "CODE", { class: true });
      var code_nodes = children(code);
      t2 = claim_text(code_nodes, "= ");
      html_tag = claim_html_tag(code_nodes, false);
      code_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "svelte-1mlh4di");
      set_style(span, "padding-right", "4px");
      html_tag.a = null;
      attr(code, "class", "svelte-1mlh4di");
      attr(div, "class", "default svelte-1mlh4di");
      toggle_class(div, "last", !/*description*/
      ctx[14]);
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, span);
      append_hydration(div, t1);
      append_hydration(div, code);
      append_hydration(code, t2);
      html_tag.m(raw_value, code);
    },
    p(ctx2, dirty) {
      if (dirty & /*_docs*/
      16 && raw_value !== (raw_value = /*_default*/
      ctx2[15] + ""))
        html_tag.p(raw_value);
      if (dirty & /*_docs*/
      16) {
        toggle_class(div, "last", !/*description*/
        ctx2[14]);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_if_block_1(ctx) {
  let div;
  let p;
  let html_tag;
  let raw_value = render_links(
    /*description*/
    ctx[14]
  ) + "";
  return {
    c() {
      div = element("div");
      p = element("p");
      html_tag = new HtmlTagHydration(false);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      p = claim_element(div_nodes, "P", {});
      var p_nodes = children(p);
      html_tag = claim_html_tag(p_nodes, false);
      p_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      html_tag.a = null;
      attr(div, "class", "description svelte-1mlh4di");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, p);
      html_tag.m(raw_value, p);
    },
    p(ctx2, dirty) {
      if (dirty & /*_docs*/
      16 && raw_value !== (raw_value = render_links(
        /*description*/
        ctx2[14]
      ) + ""))
        html_tag.p(raw_value);
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_each_block(key_1, ctx) {
  let details;
  let summary;
  let t0;
  let pre;
  let code;
  let t1_value = (
    /*name*/
    ctx[16] + ""
  );
  let t1;
  let pre_class_value;
  let t2;
  let t3;
  let t4;
  let details_id_value;
  let if_block0 = (
    /*anchor_links*/
    ctx[2] && create_if_block_4(ctx)
  );
  let if_block1 = (
    /*type*/
    ctx[13] && create_if_block_3(ctx)
  );
  let if_block2 = (
    /*_default*/
    ctx[15] && create_if_block_2(ctx)
  );
  let if_block3 = (
    /*description*/
    ctx[14] && create_if_block_1(ctx)
  );
  return {
    key: key_1,
    first: null,
    c() {
      details = element("details");
      summary = element("summary");
      if (if_block0)
        if_block0.c();
      t0 = space();
      pre = element("pre");
      code = element("code");
      t1 = text(t1_value);
      if (if_block1)
        if_block1.c();
      t2 = space();
      if (if_block2)
        if_block2.c();
      t3 = space();
      if (if_block3)
        if_block3.c();
      t4 = space();
      this.h();
    },
    l(nodes) {
      details = claim_element(nodes, "DETAILS", { class: true, id: true });
      var details_nodes = children(details);
      summary = claim_element(details_nodes, "SUMMARY", { class: true });
      var summary_nodes = children(summary);
      if (if_block0)
        if_block0.l(summary_nodes);
      t0 = claim_space(summary_nodes);
      pre = claim_element(summary_nodes, "PRE", { class: true });
      var pre_nodes = children(pre);
      code = claim_element(pre_nodes, "CODE", { class: true });
      var code_nodes = children(code);
      t1 = claim_text(code_nodes, t1_value);
      if (if_block1)
        if_block1.l(code_nodes);
      code_nodes.forEach(detach);
      pre_nodes.forEach(detach);
      summary_nodes.forEach(detach);
      t2 = claim_space(details_nodes);
      if (if_block2)
        if_block2.l(details_nodes);
      t3 = claim_space(details_nodes);
      if (if_block3)
        if_block3.l(details_nodes);
      t4 = claim_space(details_nodes);
      details_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(code, "class", "svelte-1mlh4di");
      attr(pre, "class", pre_class_value = "language-" + /*lang*/
      ctx[0] + " svelte-1mlh4di");
      attr(summary, "class", "type svelte-1mlh4di");
      attr(details, "class", "param md svelte-1mlh4di");
      attr(details, "id", details_id_value = /*anchor_links*/
      ctx[2] ? create_slug(
        /*name*/
        ctx[16] || "",
        /*anchor_links*/
        ctx[2]
      ) : void 0);
      this.first = details;
    },
    m(target, anchor) {
      insert_hydration(target, details, anchor);
      append_hydration(details, summary);
      if (if_block0)
        if_block0.m(summary, null);
      append_hydration(summary, t0);
      append_hydration(summary, pre);
      append_hydration(pre, code);
      append_hydration(code, t1);
      if (if_block1)
        if_block1.m(code, null);
      append_hydration(details, t2);
      if (if_block2)
        if_block2.m(details, null);
      append_hydration(details, t3);
      if (if_block3)
        if_block3.m(details, null);
      append_hydration(details, t4);
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (
        /*anchor_links*/
        ctx[2]
      ) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_4(ctx);
          if_block0.c();
          if_block0.m(summary, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (dirty & /*_docs*/
      16 && t1_value !== (t1_value = /*name*/
      ctx[16] + ""))
        set_data(t1, t1_value);
      if (
        /*type*/
        ctx[13]
      ) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_3(ctx);
          if_block1.c();
          if_block1.m(code, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (dirty & /*lang*/
      1 && pre_class_value !== (pre_class_value = "language-" + /*lang*/
      ctx[0] + " svelte-1mlh4di")) {
        attr(pre, "class", pre_class_value);
      }
      if (
        /*_default*/
        ctx[15]
      ) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
        } else {
          if_block2 = create_if_block_2(ctx);
          if_block2.c();
          if_block2.m(details, t3);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
      if (
        /*description*/
        ctx[14]
      ) {
        if (if_block3) {
          if_block3.p(ctx, dirty);
        } else {
          if_block3 = create_if_block_1(ctx);
          if_block3.c();
          if_block3.m(details, t4);
        }
      } else if (if_block3) {
        if_block3.d(1);
        if_block3 = null;
      }
      if (dirty & /*anchor_links, _docs*/
      20 && details_id_value !== (details_id_value = /*anchor_links*/
      ctx[2] ? create_slug(
        /*name*/
        ctx[16] || "",
        /*anchor_links*/
        ctx[2]
      ) : void 0)) {
        attr(details, "id", details_id_value);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(details);
      }
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      if (if_block2)
        if_block2.d();
      if (if_block3)
        if_block3.d();
    }
  };
}
function create_fragment$1(ctx) {
  let div;
  let t;
  let if_block0 = (
    /*header*/
    ctx[1] !== null && create_if_block_5(ctx)
  );
  let if_block1 = (
    /*_docs*/
    ctx[4] && create_if_block(ctx)
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
      div = claim_element(nodes, "DIV", { class: true });
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
      attr(div, "class", "wrap svelte-1mlh4di");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (if_block0)
        if_block0.m(div, null);
      append_hydration(div, t);
      if (if_block1)
        if_block1.m(div, null);
      ctx[9](div);
    },
    p(ctx2, [dirty]) {
      if (
        /*header*/
        ctx2[1] !== null
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_5(ctx2);
          if_block0.c();
          if_block0.m(div, t);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (
        /*_docs*/
        ctx2[4]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block(ctx2);
          if_block1.c();
          if_block1.m(div, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      ctx[9](null);
    }
  };
}
function create_slug(name, anchor_links2) {
  let prefix = "param-";
  if (typeof anchor_links2 === "string") {
    prefix += anchor_links2 + "-";
  }
  return prefix + name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
function render_links(description) {
  const escaped = description.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  const markdown_links = escaped.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  return markdown_links;
}
function instance$1($$self, $$props, $$invalidate) {
  let { docs } = $$props;
  let { lang = "python" } = $$props;
  let { linkify = [] } = $$props;
  let { header } = $$props;
  let { anchor_links = false } = $$props;
  let component_root;
  let _docs;
  let all_open = false;
  function highlight(code, lang2) {
    let highlighted = Prism$1.highlight(code, Prism$1.languages[lang2], lang2);
    for (const link of linkify) {
      highlighted = highlighted.replace(new RegExp(link, "g"), `<a href="#h-${link.toLocaleLowerCase()}">${link}</a>`);
    }
    return highlighted;
  }
  function highlight_code(_docs2, lang2) {
    if (!_docs2) {
      return [];
    }
    return Object.entries(_docs2).map(([name, { type, description, default: _default }]) => {
      let highlighted_type = type ? highlight(type, lang2) : null;
      return {
        name,
        type: highlighted_type,
        description,
        default: _default ? highlight(_default, lang2) : null
      };
    });
  }
  function toggle_all() {
    $$invalidate(5, all_open = !all_open);
    const details = component_root.querySelectorAll(".param");
    details.forEach((detail) => {
      if (detail instanceof HTMLDetailsElement) {
        detail.open = all_open;
      }
    });
  }
  onMount(() => {
    if (window.location.hash) {
      open_parameter_from_hash(window.location.hash);
    }
    window.addEventListener("hashchange", (e) => {
      open_parameter_from_hash(window.location.hash);
    });
  });
  function open_parameter_from_hash(hash) {
    if (!component_root)
      return;
    const id = hash.slice(1);
    const detail = component_root.querySelector(`#${id}`);
    if (detail instanceof HTMLDetailsElement) {
      detail.open = true;
      detail.scrollIntoView({ behavior: "smooth" });
    }
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      component_root = $$value;
      $$invalidate(3, component_root);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("docs" in $$props2)
      $$invalidate(7, docs = $$props2.docs);
    if ("lang" in $$props2)
      $$invalidate(0, lang = $$props2.lang);
    if ("linkify" in $$props2)
      $$invalidate(8, linkify = $$props2.linkify);
    if ("header" in $$props2)
      $$invalidate(1, header = $$props2.header);
    if ("anchor_links" in $$props2)
      $$invalidate(2, anchor_links = $$props2.anchor_links);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*docs, lang*/
    129) {
      $$invalidate(4, _docs = highlight_code(docs, lang));
    }
  };
  return [
    lang,
    header,
    anchor_links,
    component_root,
    _docs,
    all_open,
    toggle_all,
    docs,
    linkify,
    div_binding
  ];
}
class ParamViewer extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {
      docs: 7,
      lang: 0,
      linkify: 8,
      header: 1,
      anchor_links: 2
    });
  }
}
function create_fragment(ctx) {
  let paramviewer;
  let current;
  paramviewer = new ParamViewer({
    props: {
      docs: (
        /*value*/
        ctx[0]
      ),
      linkify: (
        /*linkify*/
        ctx[1]
      ),
      header: (
        /*header*/
        ctx[2]
      ),
      anchor_links: (
        /*anchor_links*/
        ctx[3]
      )
    }
  });
  return {
    c() {
      create_component(paramviewer.$$.fragment);
    },
    l(nodes) {
      claim_component(paramviewer.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(paramviewer, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const paramviewer_changes = {};
      if (dirty & /*value*/
      1)
        paramviewer_changes.docs = /*value*/
        ctx2[0];
      if (dirty & /*linkify*/
      2)
        paramviewer_changes.linkify = /*linkify*/
        ctx2[1];
      if (dirty & /*header*/
      4)
        paramviewer_changes.header = /*header*/
        ctx2[2];
      if (dirty & /*anchor_links*/
      8)
        paramviewer_changes.anchor_links = /*anchor_links*/
        ctx2[3];
      paramviewer.$set(paramviewer_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(paramviewer.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(paramviewer.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(paramviewer, detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { value } = $$props;
  let { linkify = [] } = $$props;
  let { header = null } = $$props;
  let { anchor_links = false } = $$props;
  $$self.$$set = ($$props2) => {
    if ("value" in $$props2)
      $$invalidate(0, value = $$props2.value);
    if ("linkify" in $$props2)
      $$invalidate(1, linkify = $$props2.linkify);
    if ("header" in $$props2)
      $$invalidate(2, header = $$props2.header);
    if ("anchor_links" in $$props2)
      $$invalidate(3, anchor_links = $$props2.anchor_links);
  };
  return [value, linkify, header, anchor_links];
}
class Index extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      value: 0,
      linkify: 1,
      header: 2,
      anchor_links: 3
    });
  }
}
export {
  Index as default
};
