import { c as create_ssr_component, v as validate_component, b as add_attribute, e as escape, f as each, d as add_styles } from './ssr-FJHii0oS.js';
import { aE as Prism$1 } from './2-DWTiTXXU.js';
import './index-BJuG1GWC.js';
import 'tty';
import 'path';
import 'url';
import 'fs';
import './Component--bfMfOuT.js';

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
const css = {
  code: '.header.svelte-1mlh4di.svelte-1mlh4di{display:flex;justify-content:space-between;align-items:center;padding:0.7rem 1rem;border-bottom:1px solid var(--table-border-color)}.title.svelte-1mlh4di.svelte-1mlh4di{font-size:var(--scale-0);font-weight:600;color:var(--body-text-color)}.toggle-all.svelte-1mlh4di.svelte-1mlh4di{background:none;border:none;cursor:pointer;padding:0;color:var(--body-text-color);font-size:0.7em;line-height:1;opacity:0.7;transition:opacity 0.2s ease,\n			transform 0.3s ease}.toggle-all.svelte-1mlh4di.svelte-1mlh4di:hover{opacity:1}.wrap[data-all-open="true"] .toggle-all.svelte-1mlh4di.svelte-1mlh4di{transform:rotate(180deg)}.default.svelte-1mlh4di pre,.default.svelte-1mlh4di .highlight{display:inline-block}.wrap.svelte-1mlh4di pre,.wrap.svelte-1mlh4di .highlight{margin:0 !important;background:transparent !important;font-family:var(--font-mono);font-weight:400;padding:0 !important}.wrap.svelte-1mlh4di pre a{color:var(--link-text-color-hover);text-decoration:underline}.wrap.svelte-1mlh4di pre a:hover{color:var(--link-text-color-hover)}.default.svelte-1mlh4di>span.svelte-1mlh4di{text-transform:uppercase;font-size:0.7rem;font-weight:600}.default.svelte-1mlh4di>code.svelte-1mlh4di{border:none}code.svelte-1mlh4di.svelte-1mlh4di{background:none;font-family:var(--font-mono)}.wrap.svelte-1mlh4di.svelte-1mlh4di{padding:0rem;border-radius:5px;border:1px solid #eee;overflow:hidden;position:relative;margin:0;box-shadow:var(--block-shadow);border-width:var(--block-border-width);border-color:var(--block-border-color);border-radius:var(--block-radius);width:100%;line-height:var(--line-sm);color:var(--body-text-color)}.type.svelte-1mlh4di.svelte-1mlh4di{position:relative;padding:0.7rem 1rem;padding-left:2rem;background:var(--table-odd-background-fill);border-bottom:0px solid var(--table-border-color);list-style:none}.type.svelte-1mlh4di.svelte-1mlh4di::after{content:"▼";position:absolute;top:50%;right:15px;transform:translateY(-50%);transition:transform 0.3s ease;font-size:0.7em;opacity:0.7}details[open].svelte-1mlh4di .type.svelte-1mlh4di::after{transform:translateY(-50%) rotate(180deg)}.default.svelte-1mlh4di.svelte-1mlh4di{padding:0.2rem 1rem 0.3rem 1rem;border-bottom:1px solid var(--table-border-color);background:var(--block-background-fill)}.default.last.svelte-1mlh4di.svelte-1mlh4di{border-bottom:none}.description.svelte-1mlh4di.svelte-1mlh4di{padding:0.7rem 1rem;font-size:var(--scale-00);font-family:var(--font-sans);background:var(--block-background-fill)}.param.svelte-1mlh4di.svelte-1mlh4di{border-bottom:1px solid var(--table-border-color)}.param.svelte-1mlh4di.svelte-1mlh4di:last-child{border-bottom:none}details[open].svelte-1mlh4di .type.svelte-1mlh4di{border-bottom-width:1px}.param.md.svelte-1mlh4di code.svelte-1mlh4di{background:none}details.svelte-1mlh4di>summary.svelte-1mlh4di{cursor:pointer}details.svelte-1mlh4di>summary.svelte-1mlh4di::-webkit-details-marker{display:none}.param-link.svelte-1mlh4di.svelte-1mlh4di{opacity:0;position:absolute;left:8px;top:50%;transform:translateY(-50%);transition:opacity 0.2s;color:var(--body-text-color);text-decoration:none}.link-icon.svelte-1mlh4di.svelte-1mlh4di{font-size:14px}.type.svelte-1mlh4di:hover .param-link.svelte-1mlh4di{opacity:0.7}.param-link.svelte-1mlh4di.svelte-1mlh4di:hover{opacity:1 !important}',
  map: '{"version":3,"file":"ParamViewer.svelte","sources":["ParamViewer.svelte"],"sourcesContent":["<script lang=\\"ts\\">import \\"./prism.css\\";\\nimport Prism from \\"prismjs\\";\\nimport \\"prismjs/components/prism-python\\";\\nimport \\"prismjs/components/prism-typescript\\";\\nimport { onMount } from \\"svelte\\";\\nexport let docs;\\nexport let lang = \\"python\\";\\nexport let linkify = [];\\nexport let header;\\nexport let anchor_links = false;\\nlet component_root;\\nlet _docs;\\nlet all_open = false;\\n$: _docs = highlight_code(docs, lang);\\nfunction create_slug(name, anchor_links2) {\\n    let prefix = \\"param-\\";\\n    if (typeof anchor_links2 === \\"string\\") {\\n        prefix += anchor_links2 + \\"-\\";\\n    }\\n    return prefix + name.toLowerCase().replace(/[^a-z0-9]+/g, \\"-\\");\\n}\\nfunction highlight(code, lang2) {\\n    let highlighted = Prism.highlight(code, Prism.languages[lang2], lang2);\\n    for (const link of linkify) {\\n        highlighted = highlighted.replace(new RegExp(link, \\"g\\"), `<a href=\\"#h-${link.toLocaleLowerCase()}\\">${link}</a>`);\\n    }\\n    return highlighted;\\n}\\nfunction highlight_code(_docs2, lang2) {\\n    if (!_docs2) {\\n        return [];\\n    }\\n    return Object.entries(_docs2).map(([name, { type, description, default: _default }]) => {\\n        let highlighted_type = type ? highlight(type, lang2) : null;\\n        return {\\n            name,\\n            type: highlighted_type,\\n            description,\\n            default: _default ? highlight(_default, lang2) : null\\n        };\\n    });\\n}\\nfunction toggle_all() {\\n    all_open = !all_open;\\n    const details = component_root.querySelectorAll(\\".param\\");\\n    details.forEach((detail) => {\\n        if (detail instanceof HTMLDetailsElement) {\\n            detail.open = all_open;\\n        }\\n    });\\n}\\nfunction render_links(description) {\\n    const escaped = description.replace(/&/g, \\"&amp;\\").replace(/</g, \\"&lt;\\").replace(/>/g, \\"&gt;\\").replace(/\\"/g, \\"&quot;\\").replace(/\'/g, \\"&#039;\\");\\n    const markdown_links = escaped.replace(/\\\\[([^\\\\]]+)\\\\]\\\\(([^)]+)\\\\)/g, \'<a href=\\"$2\\" target=\\"_blank\\">$1</a>\');\\n    return markdown_links;\\n}\\nonMount(() => {\\n    if (window.location.hash) {\\n        open_parameter_from_hash(window.location.hash);\\n    }\\n    window.addEventListener(\\"hashchange\\", (e) => {\\n        open_parameter_from_hash(window.location.hash);\\n    });\\n});\\nfunction open_parameter_from_hash(hash) {\\n    if (!component_root)\\n        return;\\n    const id = hash.slice(1);\\n    const detail = component_root.querySelector(`#${id}`);\\n    if (detail instanceof HTMLDetailsElement) {\\n        detail.open = true;\\n        detail.scrollIntoView({ behavior: \\"smooth\\" });\\n    }\\n}\\n<\/script>\\n\\n<div class=\\"wrap\\" bind:this={component_root}>\\n\\t{#if header !== null}\\n\\t\\t<div class=\\"header\\">\\n\\t\\t\\t<span class=\\"title\\">{header}</span>\\n\\t\\t\\t<button\\n\\t\\t\\t\\tclass=\\"toggle-all\\"\\n\\t\\t\\t\\ton:click={toggle_all}\\n\\t\\t\\t\\ttitle={all_open ? \\"Close All\\" : \\"Open All\\"}\\n\\t\\t\\t>\\n\\t\\t\\t\\t▼\\n\\t\\t\\t</button>\\n\\t\\t</div>\\n\\t{/if}\\n\\t{#if _docs}\\n\\t\\t{#each _docs as { type, description, default: _default, name } (name)}\\n\\t\\t\\t<details\\n\\t\\t\\t\\tclass=\\"param md\\"\\n\\t\\t\\t\\tid={anchor_links ? create_slug(name || \\"\\", anchor_links) : undefined}\\n\\t\\t\\t>\\n\\t\\t\\t\\t<summary class=\\"type\\">\\n\\t\\t\\t\\t\\t{#if anchor_links}\\n\\t\\t\\t\\t\\t\\t<a\\n\\t\\t\\t\\t\\t\\t\\thref=\\"#{create_slug(name || \'\', anchor_links)}\\"\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"param-link\\"\\n\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t<span class=\\"link-icon\\">🔗</span>\\n\\t\\t\\t\\t\\t\\t</a>\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t<pre class=\\"language-{lang}\\"><code\\n\\t\\t\\t\\t\\t\\t\\t>{name}{#if type}: {@html type}{/if}</code\\n\\t\\t\\t\\t\\t\\t></pre>\\n\\t\\t\\t\\t</summary>\\n\\t\\t\\t\\t{#if _default}\\n\\t\\t\\t\\t\\t<div class=\\"default\\" class:last={!description}>\\n\\t\\t\\t\\t\\t\\t<span style:padding-right={\\"4px\\"}>default</span>\\n\\t\\t\\t\\t\\t\\t<code>= {@html _default}</code>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t{#if description}\\n\\t\\t\\t\\t\\t<div class=\\"description\\">\\n\\t\\t\\t\\t\\t\\t<p>{@html render_links(description)}</p>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</details>\\n\\t\\t{/each}\\n\\t{/if}\\n</div>\\n\\n<style>\\n\\t.header {\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: space-between;\\n\\t\\talign-items: center;\\n\\t\\tpadding: 0.7rem 1rem;\\n\\t\\tborder-bottom: 1px solid var(--table-border-color);\\n\\t}\\n\\n\\t.title {\\n\\t\\tfont-size: var(--scale-0);\\n\\t\\tfont-weight: 600;\\n\\t\\tcolor: var(--body-text-color);\\n\\t}\\n\\n\\t.toggle-all {\\n\\t\\tbackground: none;\\n\\t\\tborder: none;\\n\\t\\tcursor: pointer;\\n\\t\\tpadding: 0;\\n\\t\\tcolor: var(--body-text-color);\\n\\t\\tfont-size: 0.7em;\\n\\t\\tline-height: 1;\\n\\t\\topacity: 0.7;\\n\\t\\ttransition:\\n\\t\\t\\topacity 0.2s ease,\\n\\t\\t\\ttransform 0.3s ease;\\n\\t}\\n\\n\\t.toggle-all:hover {\\n\\t\\topacity: 1;\\n\\t}\\n\\n\\t:global(.wrap[data-all-open=\\"true\\"]) .toggle-all {\\n\\t\\ttransform: rotate(180deg);\\n\\t}\\n\\n\\t.default :global(pre),\\n\\t.default :global(.highlight) {\\n\\t\\tdisplay: inline-block;\\n\\t}\\n\\n\\t.wrap :global(pre),\\n\\t.wrap :global(.highlight) {\\n\\t\\tmargin: 0 !important;\\n\\t\\tbackground: transparent !important;\\n\\t\\tfont-family: var(--font-mono);\\n\\t\\tfont-weight: 400;\\n\\t\\tpadding: 0 !important;\\n\\t}\\n\\n\\t.wrap :global(pre a) {\\n\\t\\tcolor: var(--link-text-color-hover);\\n\\t\\ttext-decoration: underline;\\n\\t}\\n\\n\\t.wrap :global(pre a:hover) {\\n\\t\\tcolor: var(--link-text-color-hover);\\n\\t}\\n\\n\\t.default > span {\\n\\t\\ttext-transform: uppercase;\\n\\t\\tfont-size: 0.7rem;\\n\\t\\tfont-weight: 600;\\n\\t}\\n\\n\\t.default > code {\\n\\t\\tborder: none;\\n\\t}\\n\\tcode {\\n\\t\\tbackground: none;\\n\\t\\tfont-family: var(--font-mono);\\n\\t}\\n\\n\\t.wrap {\\n\\t\\tpadding: 0rem;\\n\\t\\tborder-radius: 5px;\\n\\t\\tborder: 1px solid #eee;\\n\\t\\toverflow: hidden;\\n\\t\\tposition: relative;\\n\\t\\tmargin: 0;\\n\\t\\tbox-shadow: var(--block-shadow);\\n\\t\\tborder-width: var(--block-border-width);\\n\\t\\tborder-color: var(--block-border-color);\\n\\t\\tborder-radius: var(--block-radius);\\n\\t\\twidth: 100%;\\n\\t\\tline-height: var(--line-sm);\\n\\t\\tcolor: var(--body-text-color);\\n\\t}\\n\\n\\t.type {\\n\\t\\tposition: relative;\\n\\t\\tpadding: 0.7rem 1rem;\\n\\t\\tpadding-left: 2rem;\\n\\t\\tbackground: var(--table-odd-background-fill);\\n\\t\\tborder-bottom: 0px solid var(--table-border-color);\\n\\t\\tlist-style: none;\\n\\t}\\n\\n\\t.type::after {\\n\\t\\tcontent: \\"▼\\";\\n\\t\\tposition: absolute;\\n\\t\\ttop: 50%;\\n\\t\\tright: 15px;\\n\\t\\ttransform: translateY(-50%);\\n\\t\\ttransition: transform 0.3s ease;\\n\\t\\tfont-size: 0.7em;\\n\\t\\topacity: 0.7;\\n\\t}\\n\\n\\tdetails[open] .type::after {\\n\\t\\ttransform: translateY(-50%) rotate(180deg);\\n\\t}\\n\\n\\t.default {\\n\\t\\tpadding: 0.2rem 1rem 0.3rem 1rem;\\n\\t\\tborder-bottom: 1px solid var(--table-border-color);\\n\\t\\tbackground: var(--block-background-fill);\\n\\t}\\n\\n\\t.default.last {\\n\\t\\tborder-bottom: none;\\n\\t}\\n\\n\\t.description {\\n\\t\\tpadding: 0.7rem 1rem;\\n\\t\\tfont-size: var(--scale-00);\\n\\t\\tfont-family: var(--font-sans);\\n\\t\\tbackground: var(--block-background-fill);\\n\\t}\\n\\n\\t.param {\\n\\t\\tborder-bottom: 1px solid var(--table-border-color);\\n\\t}\\n\\n\\t.param:last-child {\\n\\t\\tborder-bottom: none;\\n\\t}\\n\\n\\tdetails[open] .type {\\n\\t\\tborder-bottom-width: 1px;\\n\\t}\\n\\n\\t.param.md code {\\n\\t\\tbackground: none;\\n\\t}\\n\\n\\tdetails > summary {\\n\\t\\tcursor: pointer;\\n\\t}\\n\\n\\tdetails > summary::-webkit-details-marker {\\n\\t\\tdisplay: none;\\n\\t}\\n\\n\\t.param-link {\\n\\t\\topacity: 0;\\n\\t\\tposition: absolute;\\n\\t\\tleft: 8px;\\n\\t\\ttop: 50%;\\n\\t\\ttransform: translateY(-50%);\\n\\t\\ttransition: opacity 0.2s;\\n\\t\\tcolor: var(--body-text-color);\\n\\t\\ttext-decoration: none;\\n\\t}\\n\\n\\t.link-icon {\\n\\t\\tfont-size: 14px;\\n\\t}\\n\\n\\t.type:hover .param-link {\\n\\t\\topacity: 0.7;\\n\\t}\\n\\n\\t.param-link:hover {\\n\\t\\topacity: 1 !important;\\n\\t}</style>\\n"],"names":[],"mappings":"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"}'
};
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
const ParamViewer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { docs } = $$props;
  let { lang = "python" } = $$props;
  let { linkify = [] } = $$props;
  let { header } = $$props;
  let { anchor_links = false } = $$props;
  let component_root;
  let _docs;
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
  if ($$props.docs === void 0 && $$bindings.docs && docs !== void 0)
    $$bindings.docs(docs);
  if ($$props.lang === void 0 && $$bindings.lang && lang !== void 0)
    $$bindings.lang(lang);
  if ($$props.linkify === void 0 && $$bindings.linkify && linkify !== void 0)
    $$bindings.linkify(linkify);
  if ($$props.header === void 0 && $$bindings.header && header !== void 0)
    $$bindings.header(header);
  if ($$props.anchor_links === void 0 && $$bindings.anchor_links && anchor_links !== void 0)
    $$bindings.anchor_links(anchor_links);
  $$result.css.add(css);
  _docs = highlight_code(docs, lang);
  return `<div class="wrap svelte-1mlh4di"${add_attribute("this", component_root, 0)}>${header !== null ? `<div class="header svelte-1mlh4di"><span class="title svelte-1mlh4di">${escape(header)}</span> <button class="toggle-all svelte-1mlh4di"${add_attribute("title", "Open All", 0)}>▼</button></div>` : ``} ${_docs ? `${each(_docs, ({ type, description, default: _default, name }) => {
    return `<details class="param md svelte-1mlh4di"${add_attribute(
      "id",
      anchor_links ? create_slug(name || "", anchor_links) : void 0,
      0
    )}><summary class="type svelte-1mlh4di">${anchor_links ? `<a href="${"#" + escape(create_slug(name || "", anchor_links), true)}" class="param-link svelte-1mlh4di"><span class="link-icon svelte-1mlh4di" data-svelte-h="svelte-1tjdumv">🔗</span> </a>` : ``} <pre class="${"language-" + escape(lang, true) + " svelte-1mlh4di"}"><code class="svelte-1mlh4di">${escape(name)}${type ? `: <!-- HTML_TAG_START -->${type}<!-- HTML_TAG_END -->` : ``}</code></pre></summary> ${_default ? `<div class="${["default svelte-1mlh4di", !description ? "last" : ""].join(" ").trim()}"><span class="svelte-1mlh4di"${add_styles({ "padding-right": "4px" })} data-svelte-h="svelte-8y216r">default</span> <code class="svelte-1mlh4di">= <!-- HTML_TAG_START -->${_default}<!-- HTML_TAG_END --></code> </div>` : ``} ${description ? `<div class="description svelte-1mlh4di"><p><!-- HTML_TAG_START -->${render_links(description)}<!-- HTML_TAG_END --></p> </div>` : ``} </details>`;
  })}` : ``} </div>`;
});
const Index = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value } = $$props;
  let { linkify = [] } = $$props;
  let { header = null } = $$props;
  let { anchor_links = false } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.linkify === void 0 && $$bindings.linkify && linkify !== void 0)
    $$bindings.linkify(linkify);
  if ($$props.header === void 0 && $$bindings.header && header !== void 0)
    $$bindings.header(header);
  if ($$props.anchor_links === void 0 && $$bindings.anchor_links && anchor_links !== void 0)
    $$bindings.anchor_links(anchor_links);
  return `${validate_component(ParamViewer, "ParamViewer").$$render(
    $$result,
    {
      docs: value,
      linkify,
      header,
      anchor_links
    },
    {},
    {}
  )}`;
});

export { Index as default };
//# sourceMappingURL=Index52-dVkaG0l8.js.map
