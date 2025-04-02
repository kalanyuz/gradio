var _a;
import { SvelteComponent, init, safe_not_equal, element, space, claim_element, children, detach, claim_space, attr, insert_hydration, append_hydration, noop, onMount, onDestroy, text as text$2, claim_text, set_data, binding_callbacks } from "../../../svelte/svelte.js";
import "../../../svelte/svelte-submodules.js";
import { U as colors, g as getDefaultExportFromCjs$1 } from "./2.DR-_Vqz1.js";
import { g as get_next_color } from "./color.ehIHDD3_.js";
import { h as has, i as isNumber, a as isString, w as writeConfig, s as splitAccessPath, $, b as isObject, c as isBoolean$1, d as isArray, e as array, l as logger, W as Warn, f as isFunction, m as mergeConfig, g as eventSelector, j as identity, p as parser, v as vegaImport, k as e, n as applyPatch, o as expression$1, H as Handler, q as stringify$1 } from "./vega-tooltip.module.Oa5GxHaO.js";
function set_config(spec, computed_style, chart_type, colors2) {
  let accentColor = computed_style.getPropertyValue("--color-accent");
  let bodyTextColor = computed_style.getPropertyValue("--body-text-color");
  let borderColorPrimary = computed_style.getPropertyValue(
    "--border-color-primary"
  );
  let fontFamily = computed_style.fontFamily;
  let titleWeight = computed_style.getPropertyValue(
    "--block-title-text-weight"
  );
  const fontToPxVal = (font2) => {
    return font2.endsWith("px") ? parseFloat(font2.slice(0, -2)) : 12;
  };
  let textSizeMd = fontToPxVal(computed_style.getPropertyValue("--text-md"));
  let textSizeSm = fontToPxVal(computed_style.getPropertyValue("--text-sm"));
  let config = {
    autosize: { type: "fit", contains: "padding" },
    axis: {
      labelFont: fontFamily,
      labelColor: bodyTextColor,
      titleFont: fontFamily,
      titleColor: bodyTextColor,
      tickColor: borderColorPrimary,
      labelFontSize: textSizeSm,
      gridColor: borderColorPrimary,
      titleFontWeight: "normal",
      titleFontSize: textSizeSm,
      labelFontWeight: "normal",
      domain: false,
      labelAngle: 0
    },
    legend: {
      labelColor: bodyTextColor,
      labelFont: fontFamily,
      titleColor: bodyTextColor,
      titleFont: fontFamily,
      titleFontWeight: "normal",
      titleFontSize: textSizeSm,
      labelFontWeight: "normal",
      offset: 2
    },
    title: {
      color: bodyTextColor,
      font: fontFamily,
      fontSize: textSizeMd,
      fontWeight: titleWeight,
      anchor: "middle"
    },
    view: {
      stroke: borderColorPrimary
    }
  };
  spec.config = config;
  let encoding = spec.encoding;
  let layer = spec.layer;
  switch (chart_type) {
    case "scatter":
      spec.config.mark = { stroke: accentColor };
      if (encoding.color && encoding.color.type == "nominal") {
        encoding.color.scale.range = encoding.color.scale.range.map(
          (_, i) => get_color(colors2, i)
        );
      } else if (encoding.color && encoding.color.type == "quantitative") {
        encoding.color.scale.range = ["#eff6ff", "#1e3a8a"];
        encoding.color.scale.range.interpolate = "hsl";
      }
      break;
    case "line":
      spec.config.mark = { stroke: accentColor, cursor: "crosshair" };
      layer.forEach((d) => {
        if (d.encoding.color) {
          d.encoding.color.scale.range = d.encoding.color.scale.range.map(
            (_, i) => get_color(colors2, i)
          );
        }
      });
      break;
    case "bar":
      spec.config.mark = { opacity: 0.8, fill: accentColor };
      if (encoding.color) {
        encoding.color.scale.range = encoding.color.scale.range.map(
          (_, i) => get_color(colors2, i)
        );
      }
      break;
  }
  return spec;
}
function get_color(colors$1, index) {
  var _a2;
  let current_color = colors$1[index % colors$1.length];
  if (current_color && current_color in colors) {
    return (_a2 = colors[current_color]) == null ? void 0 : _a2.primary;
  } else if (!current_color) {
    return colors[get_next_color(index)].primary;
  }
  return current_color;
}
const name$1 = "vega-lite";
const author$1 = 'Dominik Moritz, Kanit "Ham" Wongsuphasawat, Arvind Satyanarayan, Jeffrey Heer';
const version$3 = "5.12.0";
const collaborators = [
  "Kanit Wongsuphasawat (http://kanitw.yellowpigz.com)",
  "Dominik Moritz (https://www.domoritz.de)",
  "Arvind Satyanarayan (https://arvindsatya.com)",
  "Jeffrey Heer (https://jheer.org)"
];
const homepage = "https://vega.github.io/vega-lite/";
const description$2 = "Vega-Lite is a concise high-level language for interactive visualization.";
const keywords$1 = [
  "vega",
  "chart",
  "visualization"
];
const main$2 = "build/vega-lite.js";
const unpkg$1 = "build/vega-lite.min.js";
const jsdelivr$1 = "build/vega-lite.min.js";
const module$1 = "build/src/index";
const types$1 = "build/src/index.d.ts";
const bin = {
  vl2pdf: "./bin/vl2pdf",
  vl2png: "./bin/vl2png",
  vl2svg: "./bin/vl2svg",
  vl2vg: "./bin/vl2vg"
};
const files$1 = [
  "bin",
  "build",
  "src",
  "vega-lite*",
  "tsconfig.json"
];
const scripts$1 = {
  changelog: "conventional-changelog -p angular -r 2",
  prebuild: "yarn clean:build",
  build: "yarn build:only",
  "build:only": "tsc -p tsconfig.build.json && rollup -c",
  "prebuild:examples": "yarn build:only",
  "build:examples": "yarn data && TZ=America/Los_Angeles scripts/build-examples.sh",
  "prebuild:examples-full": "yarn build:only",
  "build:examples-full": "TZ=America/Los_Angeles scripts/build-examples.sh 1",
  "build:example": "TZ=America/Los_Angeles scripts/build-example.sh",
  "build:toc": "yarn build:jekyll && scripts/generate-toc",
  "build:site": "rollup -c site/rollup.config.mjs",
  "build:jekyll": "pushd site && bundle exec jekyll build -q && popd",
  "build:versions": "scripts/update-version.sh",
  clean: "yarn clean:build && del-cli 'site/data/*' 'examples/compiled/*.png' && find site/examples ! -name 'index.md' ! -name 'data' -type f -delete",
  "clean:build": "del-cli 'build/*' !build/vega-lite-schema.json",
  data: "rsync -r node_modules/vega-datasets/data/* site/data",
  schema: "mkdir -p build && ts-json-schema-generator -f tsconfig.json -p src/index.ts -t TopLevelSpec --no-type-check --no-ref-encode > build/vega-lite-schema.json && yarn renameschema && cp build/vega-lite-schema.json site/_data/",
  renameschema: "scripts/rename-schema.sh",
  presite: "yarn data && yarn schema && yarn build:site && yarn build:versions && scripts/create-example-pages.sh",
  site: "yarn site:only",
  "site:only": "pushd site && bundle exec jekyll serve -I -l && popd",
  prettierbase: "prettier '**/*.{md,css,yml}'",
  format: "eslint . --fix && yarn prettierbase --write",
  lint: "eslint . && yarn prettierbase --check",
  jest: "NODE_OPTIONS=--experimental-vm-modules npx jest",
  test: "yarn jest test/ && yarn lint && yarn schema && yarn jest examples/ && yarn test:runtime",
  "test:cover": "yarn jest --collectCoverage test/",
  "test:inspect": "node --inspect-brk --experimental-vm-modules ./node_modules/.bin/jest --runInBand test",
  "test:runtime": "NODE_OPTIONS=--experimental-vm-modules TZ=America/Los_Angeles npx jest test-runtime/ --config test-runtime/jest-config.json",
  "test:runtime:generate": "yarn build:only && del-cli test-runtime/resources && VL_GENERATE_TESTS=true yarn test:runtime",
  watch: "tsc -p tsconfig.build.json -w",
  "watch:site": "yarn build:site -w",
  "watch:test": "yarn jest --watch test/",
  "watch:test:runtime": "NODE_OPTIONS=--experimental-vm-modules TZ=America/Los_Angeles npx jest --watch test-runtime/ --config test-runtime/jest-config.json",
  release: "release-it"
};
const repository$1 = {
  type: "git",
  url: "https://github.com/vega/vega-lite.git"
};
const license$1 = "BSD-3-Clause";
const bugs = {
  url: "https://github.com/vega/vega-lite/issues"
};
const devDependencies$1 = {
  "@babel/core": "^7.21.8",
  "@babel/plugin-proposal-class-properties": "^7.18.6",
  "@babel/preset-env": "^7.21.5",
  "@babel/preset-typescript": "^7.21.5",
  "@release-it/conventional-changelog": "^5.1.1",
  "@rollup/plugin-alias": "^5.0.0",
  "@rollup/plugin-babel": "^6.0.3",
  "@rollup/plugin-commonjs": "^25.0.0",
  "@rollup/plugin-json": "^6.0.0",
  "@rollup/plugin-node-resolve": "^15.0.2",
  "@rollup/plugin-terser": "^0.4.1",
  "@types/chai": "^4.3.5",
  "@types/d3": "^7.4.0",
  "@types/jest": "^27.4.1",
  "@types/pako": "^2.0.0",
  "@typescript-eslint/eslint-plugin": "^5.59.5",
  "@typescript-eslint/parser": "^5.59.5",
  ajv: "^8.12.0",
  "ajv-formats": "^2.1.1",
  chai: "^4.3.7",
  cheerio: "^1.0.0-rc.12",
  "conventional-changelog-cli": "^3.0.0",
  d3: "^7.8.4",
  "del-cli": "^5.0.0",
  eslint: "^8.40.0",
  "eslint-config-prettier": "^8.8.0",
  "eslint-plugin-jest": "^27.2.1",
  "eslint-plugin-prettier": "^4.2.1",
  "highlight.js": "^11.8.0",
  jest: "^27.5.1",
  "jest-dev-server": "^6.1.1",
  mkdirp: "^3.0.1",
  pako: "^2.1.0",
  prettier: "^2.8.8",
  puppeteer: "^15.0.0",
  "release-it": "^15.10.3",
  rollup: "^3.21.6",
  "rollup-plugin-bundle-size": "^1.0.3",
  "rollup-plugin-sourcemaps": "^0.6.3",
  serve: "^14.2.0",
  terser: "^5.17.3",
  "ts-jest": "^29.1.0",
  "ts-json-schema-generator": "^1.2.0",
  typescript: "~4.9.5",
  "vega-cli": "^5.25.0",
  "vega-datasets": "^2.7.0",
  "vega-embed": "^6.22.1",
  "vega-tooltip": "^0.32.0",
  "yaml-front-matter": "^4.1.1"
};
const dependencies$1 = {
  "@types/clone": "~2.1.1",
  clone: "~2.1.2",
  "fast-deep-equal": "~3.1.3",
  "fast-json-stable-stringify": "~2.1.0",
  "json-stringify-pretty-compact": "~3.0.0",
  tslib: "~2.5.0",
  "vega-event-selector": "~3.0.1",
  "vega-expression": "~5.1.0",
  "vega-util": "~1.17.2",
  yargs: "~17.7.2"
};
const peerDependencies$1 = {
  vega: "^5.24.0"
};
const engines = {
  node: ">=16"
};
const pkg$1 = {
  name: name$1,
  author: author$1,
  version: version$3,
  collaborators,
  homepage,
  description: description$2,
  keywords: keywords$1,
  main: main$2,
  unpkg: unpkg$1,
  jsdelivr: jsdelivr$1,
  module: module$1,
  types: types$1,
  bin,
  files: files$1,
  scripts: scripts$1,
  repository: repository$1,
  license: license$1,
  bugs,
  devDependencies: devDependencies$1,
  dependencies: dependencies$1,
  peerDependencies: peerDependencies$1,
  engines
};
var clone = { exports: {} };
(function(module2) {
  var clone2 = function() {
    function _instanceof(obj, type2) {
      return type2 != null && obj instanceof type2;
    }
    var nativeMap;
    try {
      nativeMap = Map;
    } catch (_) {
      nativeMap = function() {
      };
    }
    var nativeSet;
    try {
      nativeSet = Set;
    } catch (_) {
      nativeSet = function() {
      };
    }
    var nativePromise;
    try {
      nativePromise = Promise;
    } catch (_) {
      nativePromise = function() {
      };
    }
    function clone3(parent, circular, depth, prototype, includeNonEnumerable) {
      if (typeof circular === "object") {
        depth = circular.depth;
        prototype = circular.prototype;
        includeNonEnumerable = circular.includeNonEnumerable;
        circular = circular.circular;
      }
      var allParents = [];
      var allChildren = [];
      var useBuffer = typeof Buffer != "undefined";
      if (typeof circular == "undefined")
        circular = true;
      if (typeof depth == "undefined")
        depth = Infinity;
      function _clone(parent2, depth2) {
        if (parent2 === null)
          return null;
        if (depth2 === 0)
          return parent2;
        var child;
        var proto;
        if (typeof parent2 != "object") {
          return parent2;
        }
        if (_instanceof(parent2, nativeMap)) {
          child = new nativeMap();
        } else if (_instanceof(parent2, nativeSet)) {
          child = new nativeSet();
        } else if (_instanceof(parent2, nativePromise)) {
          child = new nativePromise(function(resolve, reject) {
            parent2.then(function(value) {
              resolve(_clone(value, depth2 - 1));
            }, function(err) {
              reject(_clone(err, depth2 - 1));
            });
          });
        } else if (clone3.__isArray(parent2)) {
          child = [];
        } else if (clone3.__isRegExp(parent2)) {
          child = new RegExp(parent2.source, __getRegExpFlags(parent2));
          if (parent2.lastIndex)
            child.lastIndex = parent2.lastIndex;
        } else if (clone3.__isDate(parent2)) {
          child = new Date(parent2.getTime());
        } else if (useBuffer && Buffer.isBuffer(parent2)) {
          if (Buffer.allocUnsafe) {
            child = Buffer.allocUnsafe(parent2.length);
          } else {
            child = new Buffer(parent2.length);
          }
          parent2.copy(child);
          return child;
        } else if (_instanceof(parent2, Error)) {
          child = Object.create(parent2);
        } else {
          if (typeof prototype == "undefined") {
            proto = Object.getPrototypeOf(parent2);
            child = Object.create(proto);
          } else {
            child = Object.create(prototype);
            proto = prototype;
          }
        }
        if (circular) {
          var index = allParents.indexOf(parent2);
          if (index != -1) {
            return allChildren[index];
          }
          allParents.push(parent2);
          allChildren.push(child);
        }
        if (_instanceof(parent2, nativeMap)) {
          parent2.forEach(function(value, key) {
            var keyChild = _clone(key, depth2 - 1);
            var valueChild = _clone(value, depth2 - 1);
            child.set(keyChild, valueChild);
          });
        }
        if (_instanceof(parent2, nativeSet)) {
          parent2.forEach(function(value) {
            var entryChild = _clone(value, depth2 - 1);
            child.add(entryChild);
          });
        }
        for (var i in parent2) {
          var attrs;
          if (proto) {
            attrs = Object.getOwnPropertyDescriptor(proto, i);
          }
          if (attrs && attrs.set == null) {
            continue;
          }
          child[i] = _clone(parent2[i], depth2 - 1);
        }
        if (Object.getOwnPropertySymbols) {
          var symbols2 = Object.getOwnPropertySymbols(parent2);
          for (var i = 0; i < symbols2.length; i++) {
            var symbol = symbols2[i];
            var descriptor = Object.getOwnPropertyDescriptor(parent2, symbol);
            if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
              continue;
            }
            child[symbol] = _clone(parent2[symbol], depth2 - 1);
            if (!descriptor.enumerable) {
              Object.defineProperty(child, symbol, {
                enumerable: false
              });
            }
          }
        }
        if (includeNonEnumerable) {
          var allPropertyNames = Object.getOwnPropertyNames(parent2);
          for (var i = 0; i < allPropertyNames.length; i++) {
            var propertyName = allPropertyNames[i];
            var descriptor = Object.getOwnPropertyDescriptor(parent2, propertyName);
            if (descriptor && descriptor.enumerable) {
              continue;
            }
            child[propertyName] = _clone(parent2[propertyName], depth2 - 1);
            Object.defineProperty(child, propertyName, {
              enumerable: false
            });
          }
        }
        return child;
      }
      return _clone(parent, depth);
    }
    clone3.clonePrototype = function clonePrototype(parent) {
      if (parent === null)
        return null;
      var c = function() {
      };
      c.prototype = parent;
      return new c();
    };
    function __objToStr(o) {
      return Object.prototype.toString.call(o);
    }
    clone3.__objToStr = __objToStr;
    function __isDate(o) {
      return typeof o === "object" && __objToStr(o) === "[object Date]";
    }
    clone3.__isDate = __isDate;
    function __isArray(o) {
      return typeof o === "object" && __objToStr(o) === "[object Array]";
    }
    clone3.__isArray = __isArray;
    function __isRegExp(o) {
      return typeof o === "object" && __objToStr(o) === "[object RegExp]";
    }
    clone3.__isRegExp = __isRegExp;
    function __getRegExpFlags(re2) {
      var flags = "";
      if (re2.global)
        flags += "g";
      if (re2.ignoreCase)
        flags += "i";
      if (re2.multiline)
        flags += "m";
      return flags;
    }
    clone3.__getRegExpFlags = __getRegExpFlags;
    return clone3;
  }();
  if (module2.exports) {
    module2.exports = clone2;
  }
})(clone);
var cloneExports = clone.exports;
const clone_ = /* @__PURE__ */ getDefaultExportFromCjs$1(cloneExports);
var fastDeepEqual = function equal(a, b) {
  if (a === b)
    return true;
  if (a && b && typeof a == "object" && typeof b == "object") {
    if (a.constructor !== b.constructor)
      return false;
    var length, i, keys2;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length)
        return false;
      for (i = length; i-- !== 0; )
        if (!equal(a[i], b[i]))
          return false;
      return true;
    }
    if (a.constructor === RegExp)
      return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf)
      return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString)
      return a.toString() === b.toString();
    keys2 = Object.keys(a);
    length = keys2.length;
    if (length !== Object.keys(b).length)
      return false;
    for (i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys2[i]))
        return false;
    for (i = length; i-- !== 0; ) {
      var key = keys2[i];
      if (!equal(a[key], b[key]))
        return false;
    }
    return true;
  }
  return a !== a && b !== b;
};
const deepEqual_ = /* @__PURE__ */ getDefaultExportFromCjs$1(fastDeepEqual);
var fastJsonStableStringify = function(data, opts) {
  if (!opts)
    opts = {};
  if (typeof opts === "function")
    opts = { cmp: opts };
  var cycles = typeof opts.cycles === "boolean" ? opts.cycles : false;
  var cmp2 = opts.cmp && /* @__PURE__ */ function(f) {
    return function(node) {
      return function(a, b) {
        var aobj = { key: a, value: node[a] };
        var bobj = { key: b, value: node[b] };
        return f(aobj, bobj);
      };
    };
  }(opts.cmp);
  var seen = [];
  return function stringify2(node) {
    if (node && node.toJSON && typeof node.toJSON === "function") {
      node = node.toJSON();
    }
    if (node === void 0)
      return;
    if (typeof node == "number")
      return isFinite(node) ? "" + node : "null";
    if (typeof node !== "object")
      return JSON.stringify(node);
    var i, out;
    if (Array.isArray(node)) {
      out = "[";
      for (i = 0; i < node.length; i++) {
        if (i)
          out += ",";
        out += stringify2(node[i]) || "null";
      }
      return out + "]";
    }
    if (node === null)
      return "null";
    if (seen.indexOf(node) !== -1) {
      if (cycles)
        return JSON.stringify("__cycle__");
      throw new TypeError("Converting circular structure to JSON");
    }
    var seenIndex = seen.push(node) - 1;
    var keys2 = Object.keys(node).sort(cmp2 && cmp2(node));
    out = "";
    for (i = 0; i < keys2.length; i++) {
      var key = keys2[i];
      var value = stringify2(node[key]);
      if (!value)
        continue;
      if (out)
        out += ",";
      out += JSON.stringify(key) + ":" + value;
    }
    seen.splice(seenIndex, 1);
    return "{" + out + "}";
  }(data);
};
const stableStringify = /* @__PURE__ */ getDefaultExportFromCjs$1(fastJsonStableStringify);
function isLogicalOr(op) {
  return !!op.or;
}
function isLogicalAnd(op) {
  return !!op.and;
}
function isLogicalNot(op) {
  return !!op.not;
}
function forEachLeaf(op, fn) {
  if (isLogicalNot(op)) {
    forEachLeaf(op.not, fn);
  } else if (isLogicalAnd(op)) {
    for (const subop of op.and) {
      forEachLeaf(subop, fn);
    }
  } else if (isLogicalOr(op)) {
    for (const subop of op.or) {
      forEachLeaf(subop, fn);
    }
  } else {
    fn(op);
  }
}
function normalizeLogicalComposition(op, normalizer) {
  if (isLogicalNot(op)) {
    return { not: normalizeLogicalComposition(op.not, normalizer) };
  } else if (isLogicalAnd(op)) {
    return { and: op.and.map((o) => normalizeLogicalComposition(o, normalizer)) };
  } else if (isLogicalOr(op)) {
    return { or: op.or.map((o) => normalizeLogicalComposition(o, normalizer)) };
  } else {
    return normalizer(op);
  }
}
const deepEqual = deepEqual_;
const duplicate = clone_;
function never(message) {
  throw new Error(message);
}
function pick(obj, props) {
  const copy = {};
  for (const prop of props) {
    if (has(obj, prop)) {
      copy[prop] = obj[prop];
    }
  }
  return copy;
}
function omit(obj, props) {
  const copy = { ...obj };
  for (const prop of props) {
    delete copy[prop];
  }
  return copy;
}
Set.prototype["toJSON"] = function() {
  return `Set(${[...this].map((x) => stableStringify(x)).join(",")})`;
};
const stringify = stableStringify;
function hash(a) {
  if (isNumber(a)) {
    return a;
  }
  const str = isString(a) ? a : stableStringify(a);
  if (str.length < 250) {
    return str;
  }
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    h = (h << 5) - h + char;
    h = h & h;
  }
  return h;
}
function isNullOrFalse(x) {
  return x === false || x === null;
}
function contains(array2, item) {
  return array2.includes(item);
}
function some(arr, f) {
  let i = 0;
  for (const [k, a] of arr.entries()) {
    if (f(a, k, i++)) {
      return true;
    }
  }
  return false;
}
function every(arr, f) {
  let i = 0;
  for (const [k, a] of arr.entries()) {
    if (!f(a, k, i++)) {
      return false;
    }
  }
  return true;
}
function mergeDeep$1(dest, ...src) {
  for (const s of src) {
    deepMerge_$1(dest, s ?? {});
  }
  return dest;
}
function deepMerge_$1(dest, src) {
  for (const property of keys(src)) {
    writeConfig(dest, property, src[property], true);
  }
}
function unique(values2, f) {
  const results = [];
  const u = {};
  let v;
  for (const val of values2) {
    v = f(val);
    if (v in u) {
      continue;
    }
    u[v] = 1;
    results.push(val);
  }
  return results;
}
function isEqual(dict, other) {
  const dictKeys = keys(dict);
  const otherKeys = keys(other);
  if (dictKeys.length !== otherKeys.length) {
    return false;
  }
  for (const key of dictKeys) {
    if (dict[key] !== other[key]) {
      return false;
    }
  }
  return true;
}
function setEqual(a, b) {
  if (a.size !== b.size) {
    return false;
  }
  for (const e2 of a) {
    if (!b.has(e2)) {
      return false;
    }
  }
  return true;
}
function hasIntersection(a, b) {
  for (const key of a) {
    if (b.has(key)) {
      return true;
    }
  }
  return false;
}
function prefixGenerator(a) {
  const prefixes = /* @__PURE__ */ new Set();
  for (const x of a) {
    const splitField = splitAccessPath(x);
    const wrappedWithAccessors = splitField.map((y, i) => i === 0 ? y : `[${y}]`);
    const computedPrefixes = wrappedWithAccessors.map((_, i) => wrappedWithAccessors.slice(0, i + 1).join(""));
    for (const y of computedPrefixes) {
      prefixes.add(y);
    }
  }
  return prefixes;
}
function fieldIntersection(a, b) {
  if (a === void 0 || b === void 0) {
    return true;
  }
  return hasIntersection(prefixGenerator(a), prefixGenerator(b));
}
function isEmpty(obj) {
  return keys(obj).length === 0;
}
const keys = Object.keys;
const vals = Object.values;
const entries$1 = Object.entries;
function isBoolean(b) {
  return b === true || b === false;
}
function varName(s) {
  const alphanumericS = s.replace(/\W/g, "_");
  return (s.match(/^\d+/) ? "_" : "") + alphanumericS;
}
function logicalExpr(op, cb) {
  if (isLogicalNot(op)) {
    return `!(${logicalExpr(op.not, cb)})`;
  } else if (isLogicalAnd(op)) {
    return `(${op.and.map((and) => logicalExpr(and, cb)).join(") && (")})`;
  } else if (isLogicalOr(op)) {
    return `(${op.or.map((or) => logicalExpr(or, cb)).join(") || (")})`;
  } else {
    return cb(op);
  }
}
function deleteNestedProperty(obj, orderedProps) {
  if (orderedProps.length === 0) {
    return true;
  }
  const prop = orderedProps.shift();
  if (prop in obj && deleteNestedProperty(obj[prop], orderedProps)) {
    delete obj[prop];
  }
  return isEmpty(obj);
}
function titleCase(s) {
  return s.charAt(0).toUpperCase() + s.substr(1);
}
function accessPathWithDatum(path, datum = "datum") {
  const pieces = splitAccessPath(path);
  const prefixes = [];
  for (let i = 1; i <= pieces.length; i++) {
    const prefix = `[${pieces.slice(0, i).map($).join("][")}]`;
    prefixes.push(`${datum}${prefix}`);
  }
  return prefixes.join(" && ");
}
function flatAccessWithDatum(path, datum = "datum") {
  return `${datum}[${$(splitAccessPath(path).join("."))}]`;
}
function escapePathAccess(string) {
  return string.replace(/(\[|\]|\.|'|")/g, "\\$1");
}
function replacePathInField(path) {
  return `${splitAccessPath(path).map(escapePathAccess).join("\\.")}`;
}
function replaceAll(string, find, replacement) {
  return string.replace(new RegExp(find.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"), replacement);
}
function removePathFromField(path) {
  return `${splitAccessPath(path).join(".")}`;
}
function accessPathDepth(path) {
  if (!path) {
    return 0;
  }
  return splitAccessPath(path).length;
}
function getFirstDefined(...args) {
  for (const arg of args) {
    if (arg !== void 0) {
      return arg;
    }
  }
  return void 0;
}
let idCounter = 42;
function uniqueId(prefix) {
  const id = ++idCounter;
  return prefix ? String(prefix) + id : id;
}
function resetIdCounter() {
  idCounter = 42;
}
function internalField(name2) {
  return isInternalField(name2) ? name2 : `__${name2}`;
}
function isInternalField(name2) {
  return name2.startsWith("__");
}
function normalizeAngle(angle) {
  if (angle === void 0) {
    return void 0;
  }
  return (angle % 360 + 360) % 360;
}
function isNumeric(value) {
  if (isNumber(value)) {
    return true;
  }
  return !isNaN(value) && !isNaN(parseFloat(value));
}
const ROW = "row";
const COLUMN = "column";
const FACET = "facet";
const X = "x";
const Y = "y";
const X2 = "x2";
const Y2 = "y2";
const XOFFSET = "xOffset";
const YOFFSET = "yOffset";
const RADIUS = "radius";
const RADIUS2 = "radius2";
const THETA = "theta";
const THETA2 = "theta2";
const LATITUDE = "latitude";
const LONGITUDE = "longitude";
const LATITUDE2 = "latitude2";
const LONGITUDE2 = "longitude2";
const COLOR = "color";
const FILL = "fill";
const STROKE = "stroke";
const SHAPE = "shape";
const SIZE = "size";
const ANGLE = "angle";
const OPACITY = "opacity";
const FILLOPACITY = "fillOpacity";
const STROKEOPACITY = "strokeOpacity";
const STROKEWIDTH = "strokeWidth";
const STROKEDASH = "strokeDash";
const TEXT$1 = "text";
const ORDER = "order";
const DETAIL = "detail";
const KEY = "key";
const TOOLTIP = "tooltip";
const HREF = "href";
const URL$1 = "url";
const DESCRIPTION = "description";
const POSITION_CHANNEL_INDEX = {
  x: 1,
  y: 1,
  x2: 1,
  y2: 1
};
const POLAR_POSITION_CHANNEL_INDEX = {
  theta: 1,
  theta2: 1,
  radius: 1,
  radius2: 1
};
function isPolarPositionChannel(c) {
  return c in POLAR_POSITION_CHANNEL_INDEX;
}
const GEO_POSIITON_CHANNEL_INDEX = {
  longitude: 1,
  longitude2: 1,
  latitude: 1,
  latitude2: 1
};
function getPositionChannelFromLatLong(channel) {
  switch (channel) {
    case LATITUDE:
      return "y";
    case LATITUDE2:
      return "y2";
    case LONGITUDE:
      return "x";
    case LONGITUDE2:
      return "x2";
  }
}
function isGeoPositionChannel(c) {
  return c in GEO_POSIITON_CHANNEL_INDEX;
}
const GEOPOSITION_CHANNELS = keys(GEO_POSIITON_CHANNEL_INDEX);
const UNIT_CHANNEL_INDEX = {
  ...POSITION_CHANNEL_INDEX,
  ...POLAR_POSITION_CHANNEL_INDEX,
  ...GEO_POSIITON_CHANNEL_INDEX,
  xOffset: 1,
  yOffset: 1,
  // color
  color: 1,
  fill: 1,
  stroke: 1,
  // other non-position with scale
  opacity: 1,
  fillOpacity: 1,
  strokeOpacity: 1,
  strokeWidth: 1,
  strokeDash: 1,
  size: 1,
  angle: 1,
  shape: 1,
  // channels without scales
  order: 1,
  text: 1,
  detail: 1,
  key: 1,
  tooltip: 1,
  href: 1,
  url: 1,
  description: 1
};
function isColorChannel(channel) {
  return channel === COLOR || channel === FILL || channel === STROKE;
}
const FACET_CHANNEL_INDEX = {
  row: 1,
  column: 1,
  facet: 1
};
const FACET_CHANNELS = keys(FACET_CHANNEL_INDEX);
const CHANNEL_INDEX = {
  ...UNIT_CHANNEL_INDEX,
  ...FACET_CHANNEL_INDEX
};
const CHANNELS = keys(CHANNEL_INDEX);
const { order: _o, detail: _d, tooltip: _tt1, ...SINGLE_DEF_CHANNEL_INDEX } = CHANNEL_INDEX;
const { row: _r, column: _c, facet: _f, ...SINGLE_DEF_UNIT_CHANNEL_INDEX } = SINGLE_DEF_CHANNEL_INDEX;
function isSingleDefUnitChannel(str) {
  return !!SINGLE_DEF_UNIT_CHANNEL_INDEX[str];
}
function isChannel(str) {
  return !!CHANNEL_INDEX[str];
}
const SECONDARY_RANGE_CHANNEL = [X2, Y2, LATITUDE2, LONGITUDE2, THETA2, RADIUS2];
function isSecondaryRangeChannel(c) {
  const main2 = getMainRangeChannel(c);
  return main2 !== c;
}
function getMainRangeChannel(channel) {
  switch (channel) {
    case X2:
      return X;
    case Y2:
      return Y;
    case LATITUDE2:
      return LATITUDE;
    case LONGITUDE2:
      return LONGITUDE;
    case THETA2:
      return THETA;
    case RADIUS2:
      return RADIUS;
  }
  return channel;
}
function getVgPositionChannel(channel) {
  if (isPolarPositionChannel(channel)) {
    switch (channel) {
      case THETA:
        return "startAngle";
      case THETA2:
        return "endAngle";
      case RADIUS:
        return "outerRadius";
      case RADIUS2:
        return "innerRadius";
    }
  }
  return channel;
}
function getSecondaryRangeChannel(channel) {
  switch (channel) {
    case X:
      return X2;
    case Y:
      return Y2;
    case LATITUDE:
      return LATITUDE2;
    case LONGITUDE:
      return LONGITUDE2;
    case THETA:
      return THETA2;
    case RADIUS:
      return RADIUS2;
  }
  return void 0;
}
function getSizeChannel(channel) {
  switch (channel) {
    case X:
    case X2:
      return "width";
    case Y:
    case Y2:
      return "height";
  }
  return void 0;
}
function getOffsetChannel(channel) {
  switch (channel) {
    case X:
      return "xOffset";
    case Y:
      return "yOffset";
    case X2:
      return "x2Offset";
    case Y2:
      return "y2Offset";
    case THETA:
      return "thetaOffset";
    case RADIUS:
      return "radiusOffset";
    case THETA2:
      return "theta2Offset";
    case RADIUS2:
      return "radius2Offset";
  }
  return void 0;
}
function getOffsetScaleChannel(channel) {
  switch (channel) {
    case X:
      return "xOffset";
    case Y:
      return "yOffset";
  }
  return void 0;
}
function getMainChannelFromOffsetChannel(channel) {
  switch (channel) {
    case "xOffset":
      return "x";
    case "yOffset":
      return "y";
  }
}
const UNIT_CHANNELS = keys(UNIT_CHANNEL_INDEX);
const {
  x: _x,
  y: _y,
  // x2 and y2 share the same scale as x and y
  x2: _x2,
  y2: _y2,
  //
  xOffset: _xo,
  yOffset: _yo,
  latitude: _latitude,
  longitude: _longitude,
  latitude2: _latitude2,
  longitude2: _longitude2,
  theta: _theta,
  theta2: _theta2,
  radius: _radius,
  radius2: _radius2,
  // The rest of unit channels then have scale
  ...NONPOSITION_CHANNEL_INDEX
} = UNIT_CHANNEL_INDEX;
const NONPOSITION_CHANNELS = keys(NONPOSITION_CHANNEL_INDEX);
const POSITION_SCALE_CHANNEL_INDEX = {
  x: 1,
  y: 1
};
const POSITION_SCALE_CHANNELS = keys(POSITION_SCALE_CHANNEL_INDEX);
function isXorY(channel) {
  return channel in POSITION_SCALE_CHANNEL_INDEX;
}
const POLAR_POSITION_SCALE_CHANNEL_INDEX = {
  theta: 1,
  radius: 1
};
const POLAR_POSITION_SCALE_CHANNELS = keys(POLAR_POSITION_SCALE_CHANNEL_INDEX);
function getPositionScaleChannel(sizeType) {
  return sizeType === "width" ? X : Y;
}
const OFFSET_SCALE_CHANNEL_INDEX = { xOffset: 1, yOffset: 1 };
function isXorYOffset(channel) {
  return channel in OFFSET_SCALE_CHANNEL_INDEX;
}
const {
  // x2 and y2 share the same scale as x and y
  // text and tooltip have format instead of scale,
  // href has neither format, nor scale
  text: _t,
  tooltip: _tt,
  href: _hr,
  url: _u,
  description: _al,
  // detail and order have no scale
  detail: _dd,
  key: _k,
  order: _oo,
  ...NONPOSITION_SCALE_CHANNEL_INDEX
} = NONPOSITION_CHANNEL_INDEX;
const NONPOSITION_SCALE_CHANNELS = keys(NONPOSITION_SCALE_CHANNEL_INDEX);
function isNonPositionScaleChannel(channel) {
  return !!NONPOSITION_CHANNEL_INDEX[channel];
}
function supportLegend(channel) {
  switch (channel) {
    case COLOR:
    case FILL:
    case STROKE:
    case SIZE:
    case SHAPE:
    case OPACITY:
    case STROKEWIDTH:
    case STROKEDASH:
      return true;
    case FILLOPACITY:
    case STROKEOPACITY:
    case ANGLE:
      return false;
  }
}
const SCALE_CHANNEL_INDEX = {
  ...POSITION_SCALE_CHANNEL_INDEX,
  ...POLAR_POSITION_SCALE_CHANNEL_INDEX,
  ...OFFSET_SCALE_CHANNEL_INDEX,
  ...NONPOSITION_SCALE_CHANNEL_INDEX
};
const SCALE_CHANNELS = keys(SCALE_CHANNEL_INDEX);
function isScaleChannel(channel) {
  return !!SCALE_CHANNEL_INDEX[channel];
}
function supportMark(channel, mark) {
  return getSupportedMark(channel)[mark];
}
const ALL_MARKS = {
  // all marks
  arc: "always",
  area: "always",
  bar: "always",
  circle: "always",
  geoshape: "always",
  image: "always",
  line: "always",
  rule: "always",
  point: "always",
  rect: "always",
  square: "always",
  trail: "always",
  text: "always",
  tick: "always"
};
const { geoshape: _g, ...ALL_MARKS_EXCEPT_GEOSHAPE } = ALL_MARKS;
function getSupportedMark(channel) {
  switch (channel) {
    case COLOR:
    case FILL:
    case STROKE:
    case DESCRIPTION:
    case DETAIL:
    case KEY:
    case TOOLTIP:
    case HREF:
    case ORDER:
    case OPACITY:
    case FILLOPACITY:
    case STROKEOPACITY:
    case STROKEWIDTH:
    case FACET:
    case ROW:
    case COLUMN:
      return ALL_MARKS;
    case X:
    case Y:
    case XOFFSET:
    case YOFFSET:
    case LATITUDE:
    case LONGITUDE:
      return ALL_MARKS_EXCEPT_GEOSHAPE;
    case X2:
    case Y2:
    case LATITUDE2:
    case LONGITUDE2:
      return {
        area: "always",
        bar: "always",
        image: "always",
        rect: "always",
        rule: "always",
        circle: "binned",
        point: "binned",
        square: "binned",
        tick: "binned",
        line: "binned",
        trail: "binned"
      };
    case SIZE:
      return {
        point: "always",
        tick: "always",
        rule: "always",
        circle: "always",
        square: "always",
        bar: "always",
        text: "always",
        line: "always",
        trail: "always"
      };
    case STROKEDASH:
      return {
        line: "always",
        point: "always",
        tick: "always",
        rule: "always",
        circle: "always",
        square: "always",
        bar: "always",
        geoshape: "always"
      };
    case SHAPE:
      return { point: "always", geoshape: "always" };
    case TEXT$1:
      return { text: "always" };
    case ANGLE:
      return { point: "always", square: "always", text: "always" };
    case URL$1:
      return { image: "always" };
    case THETA:
      return { text: "always", arc: "always" };
    case RADIUS:
      return { text: "always", arc: "always" };
    case THETA2:
    case RADIUS2:
      return { arc: "always" };
  }
}
function rangeType(channel) {
  switch (channel) {
    case X:
    case Y:
    case THETA:
    case RADIUS:
    case XOFFSET:
    case YOFFSET:
    case SIZE:
    case ANGLE:
    case STROKEWIDTH:
    case OPACITY:
    case FILLOPACITY:
    case STROKEOPACITY:
    case X2:
    case Y2:
    case THETA2:
    case RADIUS2:
      return void 0;
    case FACET:
    case ROW:
    case COLUMN:
    case SHAPE:
    case STROKEDASH:
    case TEXT$1:
    case TOOLTIP:
    case HREF:
    case URL$1:
    case DESCRIPTION:
      return "discrete";
    case COLOR:
    case FILL:
    case STROKE:
      return "flexible";
    case LATITUDE:
    case LONGITUDE:
    case LATITUDE2:
    case LONGITUDE2:
    case DETAIL:
    case KEY:
    case ORDER:
      return void 0;
  }
}
const AGGREGATE_OP_INDEX = {
  argmax: 1,
  argmin: 1,
  average: 1,
  count: 1,
  distinct: 1,
  product: 1,
  max: 1,
  mean: 1,
  median: 1,
  min: 1,
  missing: 1,
  q1: 1,
  q3: 1,
  ci0: 1,
  ci1: 1,
  stderr: 1,
  stdev: 1,
  stdevp: 1,
  sum: 1,
  valid: 1,
  values: 1,
  variance: 1,
  variancep: 1
};
const MULTIDOMAIN_SORT_OP_INDEX = {
  count: 1,
  min: 1,
  max: 1
};
function isArgminDef(a) {
  return !!a && !!a["argmin"];
}
function isArgmaxDef(a) {
  return !!a && !!a["argmax"];
}
function isAggregateOp(a) {
  return isString(a) && !!AGGREGATE_OP_INDEX[a];
}
const COUNTING_OPS = /* @__PURE__ */ new Set([
  "count",
  "valid",
  "missing",
  "distinct"
]);
function isCountingAggregateOp(aggregate) {
  return isString(aggregate) && COUNTING_OPS.has(aggregate);
}
function isMinMaxOp(aggregate) {
  return isString(aggregate) && contains(["min", "max"], aggregate);
}
const SUM_OPS = /* @__PURE__ */ new Set([
  "count",
  "sum",
  "distinct",
  "valid",
  "missing"
]);
const SHARED_DOMAIN_OPS = /* @__PURE__ */ new Set([
  "mean",
  "average",
  "median",
  "q1",
  "q3",
  "min",
  "max"
]);
function binToString(bin2) {
  if (isBoolean$1(bin2)) {
    bin2 = normalizeBin(bin2, void 0);
  }
  return "bin" + keys(bin2).map((p) => isParameterExtent(bin2[p]) ? varName(`_${p}_${entries$1(bin2[p])}`) : varName(`_${p}_${bin2[p]}`)).join("");
}
function isBinning(bin2) {
  return bin2 === true || isBinParams(bin2) && !bin2.binned;
}
function isBinned(bin2) {
  return bin2 === "binned" || isBinParams(bin2) && bin2.binned === true;
}
function isBinParams(bin2) {
  return isObject(bin2);
}
function isParameterExtent(extent) {
  return extent == null ? void 0 : extent["param"];
}
function autoMaxBins(channel) {
  switch (channel) {
    case ROW:
    case COLUMN:
    case SIZE:
    case COLOR:
    case FILL:
    case STROKE:
    case STROKEWIDTH:
    case OPACITY:
    case FILLOPACITY:
    case STROKEOPACITY:
    case SHAPE:
      return 6;
    case STROKEDASH:
      return 4;
    default:
      return 10;
  }
}
function isExprRef(o) {
  return !!(o == null ? void 0 : o.expr);
}
function replaceExprRef(index) {
  const props = keys(index || {});
  const newIndex = {};
  for (const prop of props) {
    newIndex[prop] = signalRefOrValue(index[prop]);
  }
  return newIndex;
}
function extractTitleConfig(titleConfig) {
  const {
    // These are non-mark title config that need to be hardcoded
    anchor,
    frame,
    offset,
    orient: orient2,
    angle,
    limit,
    // color needs to be redirect to fill
    color: color2,
    // subtitle properties
    subtitleColor,
    subtitleFont,
    subtitleFontSize,
    subtitleFontStyle,
    subtitleFontWeight,
    subtitleLineHeight,
    subtitlePadding,
    // The rest are mark config.
    ...rest
  } = titleConfig;
  const titleMarkConfig = {
    ...rest,
    ...color2 ? { fill: color2 } : {}
  };
  const nonMarkTitleProperties = {
    ...anchor ? { anchor } : {},
    ...frame ? { frame } : {},
    ...offset ? { offset } : {},
    ...orient2 ? { orient: orient2 } : {},
    ...angle !== void 0 ? { angle } : {},
    ...limit !== void 0 ? { limit } : {}
  };
  const subtitle = {
    ...subtitleColor ? { subtitleColor } : {},
    ...subtitleFont ? { subtitleFont } : {},
    ...subtitleFontSize ? { subtitleFontSize } : {},
    ...subtitleFontStyle ? { subtitleFontStyle } : {},
    ...subtitleFontWeight ? { subtitleFontWeight } : {},
    ...subtitleLineHeight ? { subtitleLineHeight } : {},
    ...subtitlePadding ? { subtitlePadding } : {}
  };
  const subtitleMarkConfig = pick(titleConfig, ["align", "baseline", "dx", "dy", "limit"]);
  return { titleMarkConfig, subtitleMarkConfig, nonMarkTitleProperties, subtitle };
}
function isText(v) {
  return isString(v) || isArray(v) && isString(v[0]);
}
function isSignalRef(o) {
  return !!(o == null ? void 0 : o.signal);
}
function isVgRangeStep(range2) {
  return !!range2["step"];
}
function isDataRefUnionedDomain(domain2) {
  if (!isArray(domain2)) {
    return "fields" in domain2 && !("data" in domain2);
  }
  return false;
}
function isFieldRefUnionDomain(domain2) {
  if (!isArray(domain2)) {
    return "fields" in domain2 && "data" in domain2;
  }
  return false;
}
function isDataRefDomain(domain2) {
  if (!isArray(domain2)) {
    return "field" in domain2 && "data" in domain2;
  }
  return false;
}
const VG_MARK_CONFIG_INDEX = {
  aria: 1,
  description: 1,
  ariaRole: 1,
  ariaRoleDescription: 1,
  blend: 1,
  opacity: 1,
  fill: 1,
  fillOpacity: 1,
  stroke: 1,
  strokeCap: 1,
  strokeWidth: 1,
  strokeOpacity: 1,
  strokeDash: 1,
  strokeDashOffset: 1,
  strokeJoin: 1,
  strokeOffset: 1,
  strokeMiterLimit: 1,
  startAngle: 1,
  endAngle: 1,
  padAngle: 1,
  innerRadius: 1,
  outerRadius: 1,
  size: 1,
  shape: 1,
  interpolate: 1,
  tension: 1,
  orient: 1,
  align: 1,
  baseline: 1,
  text: 1,
  dir: 1,
  dx: 1,
  dy: 1,
  ellipsis: 1,
  limit: 1,
  radius: 1,
  theta: 1,
  angle: 1,
  font: 1,
  fontSize: 1,
  fontWeight: 1,
  fontStyle: 1,
  lineBreak: 1,
  lineHeight: 1,
  cursor: 1,
  href: 1,
  tooltip: 1,
  cornerRadius: 1,
  cornerRadiusTopLeft: 1,
  cornerRadiusTopRight: 1,
  cornerRadiusBottomLeft: 1,
  cornerRadiusBottomRight: 1,
  aspect: 1,
  width: 1,
  height: 1,
  url: 1,
  smooth: 1
  // commented below are vg channel that do not have mark config.
  // x: 1,
  // y: 1,
  // x2: 1,
  // y2: 1,
  // xc'|'yc'
  // clip: 1,
  // path: 1,
  // url: 1,
};
const VG_MARK_CONFIGS = keys(VG_MARK_CONFIG_INDEX);
const VG_MARK_INDEX = {
  arc: 1,
  area: 1,
  group: 1,
  image: 1,
  line: 1,
  path: 1,
  rect: 1,
  rule: 1,
  shape: 1,
  symbol: 1,
  text: 1,
  trail: 1
};
const VG_CORNERRADIUS_CHANNELS = [
  "cornerRadius",
  "cornerRadiusTopLeft",
  "cornerRadiusTopRight",
  "cornerRadiusBottomLeft",
  "cornerRadiusBottomRight"
];
function signalOrValueRefWithCondition(val) {
  const condition = isArray(val.condition) ? val.condition.map(conditionalSignalRefOrValue) : conditionalSignalRefOrValue(val.condition);
  return {
    ...signalRefOrValue(val),
    condition
  };
}
function signalRefOrValue(value) {
  if (isExprRef(value)) {
    const { expr, ...rest } = value;
    return { signal: expr, ...rest };
  }
  return value;
}
function conditionalSignalRefOrValue(value) {
  if (isExprRef(value)) {
    const { expr, ...rest } = value;
    return { signal: expr, ...rest };
  }
  return value;
}
function signalOrValueRef(value) {
  if (isExprRef(value)) {
    const { expr, ...rest } = value;
    return { signal: expr, ...rest };
  }
  if (isSignalRef(value)) {
    return value;
  }
  return value !== void 0 ? { value } : void 0;
}
function exprFromSignalRefOrValue(ref) {
  if (isSignalRef(ref)) {
    return ref.signal;
  }
  return $(ref);
}
function exprFromValueRefOrSignalRef(ref) {
  if (isSignalRef(ref)) {
    return ref.signal;
  }
  return $(ref.value);
}
function signalOrStringValue(v) {
  if (isSignalRef(v)) {
    return v.signal;
  }
  return v == null ? null : $(v);
}
function applyMarkConfig(e2, model, propsList) {
  for (const property of propsList) {
    const value = getMarkConfig(property, model.markDef, model.config);
    if (value !== void 0) {
      e2[property] = signalOrValueRef(value);
    }
  }
  return e2;
}
function getStyles(mark) {
  return [].concat(mark.type, mark.style ?? []);
}
function getMarkPropOrConfig(channel, mark, config, opt = {}) {
  const { vgChannel, ignoreVgConfig } = opt;
  if (vgChannel && mark[vgChannel] !== void 0) {
    return mark[vgChannel];
  } else if (mark[channel] !== void 0) {
    return mark[channel];
  } else if (ignoreVgConfig && (!vgChannel || vgChannel === channel)) {
    return void 0;
  }
  return getMarkConfig(channel, mark, config, opt);
}
function getMarkConfig(channel, mark, config, { vgChannel } = {}) {
  return getFirstDefined(
    // style config has highest precedence
    vgChannel ? getMarkStyleConfig(channel, mark, config.style) : void 0,
    getMarkStyleConfig(channel, mark, config.style),
    // then mark-specific config
    vgChannel ? config[mark.type][vgChannel] : void 0,
    config[mark.type][channel],
    // Need to cast because MarkDef doesn't perfectly match with AnyMarkConfig, but if the type isn't available, we'll get nothing here, which is fine
    // If there is vgChannel, skip vl channel.
    // For example, vl size for text is vg fontSize, but config.mark.size is only for point size.
    vgChannel ? config.mark[vgChannel] : config.mark[channel]
    // Need to cast for the same reason as above
  );
}
function getMarkStyleConfig(prop, mark, styleConfigIndex) {
  return getStyleConfig(prop, getStyles(mark), styleConfigIndex);
}
function getStyleConfig(p, styles, styleConfigIndex) {
  styles = array(styles);
  let value;
  for (const style of styles) {
    const styleConfig = styleConfigIndex[style];
    if (styleConfig && styleConfig[p] !== void 0) {
      value = styleConfig[p];
    }
  }
  return value;
}
function sortParams(orderDef, fieldRefOption) {
  return array(orderDef).reduce((s, orderChannelDef) => {
    s.field.push(vgField(orderChannelDef, fieldRefOption));
    s.order.push(orderChannelDef.sort ?? "ascending");
    return s;
  }, { field: [], order: [] });
}
function mergeTitleFieldDefs(f1, f2) {
  const merged = [...f1];
  f2.forEach((fdToMerge) => {
    for (const fieldDef1 of merged) {
      if (deepEqual(fieldDef1, fdToMerge)) {
        return;
      }
    }
    merged.push(fdToMerge);
  });
  return merged;
}
function mergeTitle(title1, title2) {
  if (deepEqual(title1, title2) || !title2) {
    return title1;
  } else if (!title1) {
    return title2;
  } else {
    return [...array(title1), ...array(title2)].join(", ");
  }
}
function mergeTitleComponent(v1, v2) {
  const v1Val = v1.value;
  const v2Val = v2.value;
  if (v1Val == null || v2Val === null) {
    return {
      explicit: v1.explicit,
      value: null
    };
  } else if ((isText(v1Val) || isSignalRef(v1Val)) && (isText(v2Val) || isSignalRef(v2Val))) {
    return {
      explicit: v1.explicit,
      value: mergeTitle(v1Val, v2Val)
    };
  } else if (isText(v1Val) || isSignalRef(v1Val)) {
    return {
      explicit: v1.explicit,
      value: v1Val
    };
  } else if (isText(v2Val) || isSignalRef(v2Val)) {
    return {
      explicit: v1.explicit,
      value: v2Val
    };
  } else if (!isText(v1Val) && !isSignalRef(v1Val) && !isText(v2Val) && !isSignalRef(v2Val)) {
    return {
      explicit: v1.explicit,
      value: mergeTitleFieldDefs(v1Val, v2Val)
    };
  }
  throw new Error("It should never reach here");
}
function invalidSpec(spec) {
  return `Invalid specification ${stringify(spec)}. Make sure the specification includes at least one of the following properties: "mark", "layer", "facet", "hconcat", "vconcat", "concat", or "repeat".`;
}
const FIT_NON_SINGLE = 'Autosize "fit" only works for single views and layered views.';
function containerSizeNonSingle(name2) {
  const uName = name2 == "width" ? "Width" : "Height";
  return `${uName} "container" only works for single views and layered views.`;
}
function containerSizeNotCompatibleWithAutosize(name2) {
  const uName = name2 == "width" ? "Width" : "Height";
  const fitDirection = name2 == "width" ? "x" : "y";
  return `${uName} "container" only works well with autosize "fit" or "fit-${fitDirection}".`;
}
function droppingFit(channel) {
  return channel ? `Dropping "fit-${channel}" because spec has discrete ${getSizeChannel(channel)}.` : `Dropping "fit" because spec has discrete size.`;
}
function unknownField(channel) {
  return `Unknown field for ${channel}. Cannot calculate view size.`;
}
function cannotProjectOnChannelWithoutField(channel) {
  return `Cannot project a selection on encoding channel "${channel}", which has no field.`;
}
function cannotProjectAggregate(channel, aggregate) {
  return `Cannot project a selection on encoding channel "${channel}" as it uses an aggregate function ("${aggregate}").`;
}
function nearestNotSupportForContinuous(mark) {
  return `The "nearest" transform is not supported for ${mark} marks.`;
}
function selectionNotSupported(mark) {
  return `Selection not supported for ${mark} yet.`;
}
function selectionNotFound(name2) {
  return `Cannot find a selection named "${name2}".`;
}
const SCALE_BINDINGS_CONTINUOUS = "Scale bindings are currently only supported for scales with unbinned, continuous domains.";
const LEGEND_BINDINGS_MUST_HAVE_PROJECTION = "Legend bindings are only supported for selections over an individual field or encoding channel.";
function cannotLookupVariableParameter(name2) {
  return `Lookups can only be performed on selection parameters. "${name2}" is a variable parameter.`;
}
function noSameUnitLookup(name2) {
  return `Cannot define and lookup the "${name2}" selection in the same view. Try moving the lookup into a second, layered view?`;
}
const NEEDS_SAME_SELECTION = "The same selection must be used to override scale domains in a layered view.";
const INTERVAL_INITIALIZED_WITH_POS = 'Interval selections should be initialized using "x", "y", "longitude", or "latitude" keys.';
function noSuchRepeatedValue(field) {
  return `Unknown repeated value "${field}".`;
}
function columnsNotSupportByRowCol(type2) {
  return `The "columns" property cannot be used when "${type2}" has nested row/column.`;
}
const CONCAT_CANNOT_SHARE_AXIS = "Axes cannot be shared in concatenated or repeated views yet (https://github.com/vega/vega-lite/issues/2415).";
function unrecognizedParse(p) {
  return `Unrecognized parse "${p}".`;
}
function differentParse(field, local, ancestor) {
  return `An ancestor parsed field "${field}" as ${ancestor} but a child wants to parse the field as ${local}.`;
}
const ADD_SAME_CHILD_TWICE = "Attempt to add the same child twice.";
function invalidTransformIgnored(transform) {
  return `Ignoring an invalid transform: ${stringify(transform)}.`;
}
const NO_FIELDS_NEEDS_AS = 'If "from.fields" is not specified, "as" has to be a string that specifies the key to be used for the data from the secondary source.';
function customFormatTypeNotAllowed(channel) {
  return `Config.customFormatTypes is not true, thus custom format type and format for channel ${channel} are dropped.`;
}
function projectionOverridden(opt) {
  const { parentProjection, projection } = opt;
  return `Layer's shared projection ${stringify(parentProjection)} is overridden by a child projection ${stringify(projection)}.`;
}
const REPLACE_ANGLE_WITH_THETA = "Arc marks uses theta channel rather than angle, replacing angle with theta.";
function offsetNestedInsideContinuousPositionScaleDropped(mainChannel) {
  return `${mainChannel}Offset dropped because ${mainChannel} is continuous`;
}
function replaceOffsetWithMainChannel(mainChannel) {
  return `There is no ${mainChannel} encoding. Replacing ${mainChannel}Offset encoding as ${mainChannel}.`;
}
function primitiveChannelDef(channel, type2, value) {
  return `Channel ${channel} is a ${type2}. Converted to {value: ${stringify(value)}}.`;
}
function invalidFieldType(type2) {
  return `Invalid field type "${type2}".`;
}
function invalidFieldTypeForCountAggregate(type2, aggregate) {
  return `Invalid field type "${type2}" for aggregate: "${aggregate}", using "quantitative" instead.`;
}
function invalidAggregate(aggregate) {
  return `Invalid aggregation operator "${aggregate}".`;
}
function droppingColor(type2, opt) {
  const { fill, stroke } = opt;
  return `Dropping color ${type2} as the plot also has ${fill && stroke ? "fill and stroke" : fill ? "fill" : "stroke"}.`;
}
function relativeBandSizeNotSupported(sizeChannel) {
  return `Position range does not support relative band size for ${sizeChannel}.`;
}
function emptyFieldDef(fieldDef, channel) {
  return `Dropping ${stringify(fieldDef)} from channel "${channel}" since it does not contain any data field, datum, value, or signal.`;
}
const LINE_WITH_VARYING_SIZE = "Line marks cannot encode size with a non-groupby field. You may want to use trail marks instead.";
function incompatibleChannel(channel, markOrFacet, when) {
  return `${channel} dropped as it is incompatible with "${markOrFacet}"${""}.`;
}
function offsetEncodingScaleIgnored(channel) {
  return `${channel} encoding has no scale, so specified scale is ignored.`;
}
function invalidEncodingChannel(channel) {
  return `${channel}-encoding is dropped as ${channel} is not a valid encoding channel.`;
}
function channelShouldBeDiscrete(channel) {
  return `${channel} encoding should be discrete (ordinal / nominal / binned).`;
}
function channelShouldBeDiscreteOrDiscretizing(channel) {
  return `${channel} encoding should be discrete (ordinal / nominal / binned) or use a discretizing scale (e.g. threshold).`;
}
function facetChannelDropped(channels) {
  return `Facet encoding dropped as ${channels.join(" and ")} ${channels.length > 1 ? "are" : "is"} also specified.`;
}
function discreteChannelCannotEncode(channel, type2) {
  return `Using discrete channel "${channel}" to encode "${type2}" field can be misleading as it does not encode ${type2 === "ordinal" ? "order" : "magnitude"}.`;
}
function rangeMarkAlignmentCannotBeExpression(align2) {
  return `The ${align2} for range marks cannot be an expression`;
}
function lineWithRange(hasX2, hasY2) {
  const channels = hasX2 && hasY2 ? "x2 and y2" : hasX2 ? "x2" : "y2";
  return `Line mark is for continuous lines and thus cannot be used with ${channels}. We will use the rule mark (line segments) instead.`;
}
function orientOverridden(original, actual) {
  return `Specified orient "${original}" overridden with "${actual}".`;
}
function cannotUseScalePropertyWithNonColor(prop) {
  return `Cannot use the scale property "${prop}" with non-color channel.`;
}
function cannotUseRelativeBandSizeWithNonBandScale(scaleType2) {
  return `Cannot use the relative band size with ${scaleType2} scale.`;
}
function unaggregateDomainHasNoEffectForRawField(fieldDef) {
  return `Using unaggregated domain with raw field has no effect (${stringify(fieldDef)}).`;
}
function unaggregateDomainWithNonSharedDomainOp(aggregate) {
  return `Unaggregated domain not applicable for "${aggregate}" since it produces values outside the origin domain of the source data.`;
}
function unaggregatedDomainWithLogScale(fieldDef) {
  return `Unaggregated domain is currently unsupported for log scale (${stringify(fieldDef)}).`;
}
function cannotApplySizeToNonOrientedMark(mark) {
  return `Cannot apply size to non-oriented mark "${mark}".`;
}
function scaleTypeNotWorkWithChannel(channel, scaleType2, defaultScaleType) {
  return `Channel "${channel}" does not work with "${scaleType2}" scale. We are using "${defaultScaleType}" scale instead.`;
}
function scaleTypeNotWorkWithFieldDef(scaleType2, defaultScaleType) {
  return `FieldDef does not work with "${scaleType2}" scale. We are using "${defaultScaleType}" scale instead.`;
}
function scalePropertyNotWorkWithScaleType(scaleType2, propName, channel) {
  return `${channel}-scale's "${propName}" is dropped as it does not work with ${scaleType2} scale.`;
}
function stepDropped(channel) {
  return `The step for "${channel}" is dropped because the ${channel === "width" ? "x" : "y"} is continuous.`;
}
function mergeConflictingProperty(property, propertyOf, v1, v2) {
  return `Conflicting ${propertyOf.toString()} property "${property.toString()}" (${stringify(v1)} and ${stringify(v2)}). Using ${stringify(v1)}.`;
}
function mergeConflictingDomainProperty(property, propertyOf, v1, v2) {
  return `Conflicting ${propertyOf.toString()} property "${property.toString()}" (${stringify(v1)} and ${stringify(v2)}). Using the union of the two domains.`;
}
function independentScaleMeansIndependentGuide(channel) {
  return `Setting the scale to be independent for "${channel}" means we also have to set the guide (axis or legend) to be independent.`;
}
function domainSortDropped(sort) {
  return `Dropping sort property ${stringify(sort)} as unioned domains only support boolean or op "count", "min", and "max".`;
}
const MORE_THAN_ONE_SORT = "Domains that should be unioned has conflicting sort properties. Sort will be set to true.";
const FACETED_INDEPENDENT_DIFFERENT_SOURCES = "Detected faceted independent scales that union domain of multiple fields from different data sources. We will use the first field. The result view size may be incorrect.";
const FACETED_INDEPENDENT_SAME_FIELDS_DIFFERENT_SOURCES = "Detected faceted independent scales that union domain of the same fields from different source. We will assume that this is the same field from a different fork of the same data source. However, if this is not the case, the result view size may be incorrect.";
const FACETED_INDEPENDENT_SAME_SOURCE = "Detected faceted independent scales that union domain of multiple fields from the same data source. We will use the first field. The result view size may be incorrect.";
function cannotStackRangedMark(channel) {
  return `Cannot stack "${channel}" if there is already "${channel}2".`;
}
function cannotStackNonLinearScale(scaleType2) {
  return `Cannot stack non-linear scale (${scaleType2}).`;
}
function stackNonSummativeAggregate(aggregate) {
  return `Stacking is applied even though the aggregate function is non-summative ("${aggregate}").`;
}
function invalidTimeUnit(unitName2, value) {
  return `Invalid ${unitName2}: ${stringify(value)}.`;
}
function droppedDay(d) {
  return `Dropping day from datetime ${stringify(d)} as day cannot be combined with other units.`;
}
function errorBarCenterAndExtentAreNotNeeded(center, extent) {
  return `${extent ? "extent " : ""}${extent && center ? "and " : ""}${center ? "center " : ""}${extent && center ? "are " : "is "}not needed when data are aggregated.`;
}
function errorBarCenterIsUsedWithWrongExtent(center, extent, mark) {
  return `${center} is not usually used with ${extent} for ${mark}.`;
}
function errorBarContinuousAxisHasCustomizedAggregate(aggregate, compositeMark) {
  return `Continuous axis should not have customized aggregation function ${aggregate}; ${compositeMark} already agregates the axis.`;
}
function errorBand1DNotSupport(property) {
  return `1D error band does not support ${property}.`;
}
function channelRequiredForBinned(channel) {
  return `Channel ${channel} is required for "binned" bin.`;
}
function channelShouldNotBeUsedForBinned(channel) {
  return `Channel ${channel} should not be used with "binned" bin.`;
}
function domainRequiredForThresholdScale(channel) {
  return `Domain for ${channel} is required for threshold scale.`;
}
(function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
});
(function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
});
const main$1 = logger(Warn);
let current = main$1;
function set(newLogger) {
  current = newLogger;
  return current;
}
function reset() {
  current = main$1;
  return current;
}
function warn(...args) {
  current.warn(...args);
}
function debug$2(...args) {
  current.debug(...args);
}
function isDateTime(o) {
  if (o && isObject(o)) {
    for (const part of TIMEUNIT_PARTS) {
      if (part in o) {
        return true;
      }
    }
  }
  return false;
}
const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december"
];
const SHORT_MONTHS = MONTHS.map((m) => m.substr(0, 3));
const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const SHORT_DAYS = DAYS.map((d) => d.substr(0, 3));
function normalizeQuarter(q) {
  if (isNumeric(q)) {
    q = +q;
  }
  if (isNumber(q)) {
    if (q > 4) {
      warn(invalidTimeUnit("quarter", q));
    }
    return q - 1;
  } else {
    throw new Error(invalidTimeUnit("quarter", q));
  }
}
function normalizeMonth(m) {
  if (isNumeric(m)) {
    m = +m;
  }
  if (isNumber(m)) {
    return m - 1;
  } else {
    const lowerM = m.toLowerCase();
    const monthIndex = MONTHS.indexOf(lowerM);
    if (monthIndex !== -1) {
      return monthIndex;
    }
    const shortM = lowerM.substr(0, 3);
    const shortMonthIndex = SHORT_MONTHS.indexOf(shortM);
    if (shortMonthIndex !== -1) {
      return shortMonthIndex;
    }
    throw new Error(invalidTimeUnit("month", m));
  }
}
function normalizeDay(d) {
  if (isNumeric(d)) {
    d = +d;
  }
  if (isNumber(d)) {
    return d % 7;
  } else {
    const lowerD = d.toLowerCase();
    const dayIndex = DAYS.indexOf(lowerD);
    if (dayIndex !== -1) {
      return dayIndex;
    }
    const shortD = lowerD.substr(0, 3);
    const shortDayIndex = SHORT_DAYS.indexOf(shortD);
    if (shortDayIndex !== -1) {
      return shortDayIndex;
    }
    throw new Error(invalidTimeUnit("day", d));
  }
}
function dateTimeParts(d, normalize2) {
  const parts = [];
  if (normalize2 && d.day !== void 0) {
    if (keys(d).length > 1) {
      warn(droppedDay(d));
      d = duplicate(d);
      delete d.day;
    }
  }
  if (d.year !== void 0) {
    parts.push(d.year);
  } else {
    parts.push(2012);
  }
  if (d.month !== void 0) {
    const month = normalize2 ? normalizeMonth(d.month) : d.month;
    parts.push(month);
  } else if (d.quarter !== void 0) {
    const quarter = normalize2 ? normalizeQuarter(d.quarter) : d.quarter;
    parts.push(isNumber(quarter) ? quarter * 3 : `${quarter}*3`);
  } else {
    parts.push(0);
  }
  if (d.date !== void 0) {
    parts.push(d.date);
  } else if (d.day !== void 0) {
    const day = normalize2 ? normalizeDay(d.day) : d.day;
    parts.push(isNumber(day) ? day + 1 : `${day}+1`);
  } else {
    parts.push(1);
  }
  for (const timeUnit of ["hours", "minutes", "seconds", "milliseconds"]) {
    const unit = d[timeUnit];
    parts.push(typeof unit === "undefined" ? 0 : unit);
  }
  return parts;
}
function dateTimeToExpr(d) {
  const parts = dateTimeParts(d, true);
  const string = parts.join(", ");
  if (d.utc) {
    return `utc(${string})`;
  } else {
    return `datetime(${string})`;
  }
}
function dateTimeExprToExpr(d) {
  const parts = dateTimeParts(d, false);
  const string = parts.join(", ");
  if (d.utc) {
    return `utc(${string})`;
  } else {
    return `datetime(${string})`;
  }
}
function dateTimeToTimestamp(d) {
  const parts = dateTimeParts(d, true);
  if (d.utc) {
    return +new Date(Date.UTC(...parts));
  } else {
    return +new Date(...parts);
  }
}
const LOCAL_SINGLE_TIMEUNIT_INDEX = {
  year: 1,
  quarter: 1,
  month: 1,
  week: 1,
  day: 1,
  dayofyear: 1,
  date: 1,
  hours: 1,
  minutes: 1,
  seconds: 1,
  milliseconds: 1
};
const TIMEUNIT_PARTS = keys(LOCAL_SINGLE_TIMEUNIT_INDEX);
function isLocalSingleTimeUnit(timeUnit) {
  return !!LOCAL_SINGLE_TIMEUNIT_INDEX[timeUnit];
}
function isBinnedTimeUnit(timeUnit) {
  if (isObject(timeUnit)) {
    return timeUnit.binned;
  }
  return isBinnedTimeUnitString(timeUnit);
}
function isBinnedTimeUnitString(timeUnit) {
  return timeUnit && timeUnit.startsWith("binned");
}
function isUTCTimeUnit(t2) {
  return t2.startsWith("utc");
}
function getLocalTimeUnitFromUTCTimeUnit(t2) {
  return t2.substring(3);
}
const VEGALITE_TIMEFORMAT = {
  "year-month": "%b %Y ",
  "year-month-date": "%b %d, %Y "
};
function getTimeUnitParts(timeUnit) {
  return TIMEUNIT_PARTS.filter((part) => containsTimeUnit(timeUnit, part));
}
function getSmallestTimeUnitPart(timeUnit) {
  const parts = getTimeUnitParts(timeUnit);
  return parts[parts.length - 1];
}
function containsTimeUnit(fullTimeUnit, timeUnit) {
  const index = fullTimeUnit.indexOf(timeUnit);
  if (index < 0) {
    return false;
  }
  if (index > 0 && timeUnit === "seconds" && fullTimeUnit.charAt(index - 1) === "i") {
    return false;
  }
  if (fullTimeUnit.length > index + 3 && timeUnit === "day" && fullTimeUnit.charAt(index + 3) === "o") {
    return false;
  }
  if (index > 0 && timeUnit === "year" && fullTimeUnit.charAt(index - 1) === "f") {
    return false;
  }
  return true;
}
function fieldExpr(fullTimeUnit, field, { end } = { end: false }) {
  const fieldRef = accessPathWithDatum(field);
  const utc = isUTCTimeUnit(fullTimeUnit) ? "utc" : "";
  function func(timeUnit) {
    if (timeUnit === "quarter") {
      return `(${utc}quarter(${fieldRef})-1)`;
    } else {
      return `${utc}${timeUnit}(${fieldRef})`;
    }
  }
  let lastTimeUnit;
  const dateExpr = {};
  for (const part of TIMEUNIT_PARTS) {
    if (containsTimeUnit(fullTimeUnit, part)) {
      dateExpr[part] = func(part);
      lastTimeUnit = part;
    }
  }
  if (end) {
    dateExpr[lastTimeUnit] += "+1";
  }
  return dateTimeExprToExpr(dateExpr);
}
function timeUnitSpecifierExpression(timeUnit) {
  if (!timeUnit) {
    return void 0;
  }
  const timeUnitParts = getTimeUnitParts(timeUnit);
  return `timeUnitSpecifier(${stringify(timeUnitParts)}, ${stringify(VEGALITE_TIMEFORMAT)})`;
}
function formatExpression(timeUnit, field, isUTCScale) {
  if (!timeUnit) {
    return void 0;
  }
  const expr = timeUnitSpecifierExpression(timeUnit);
  const utc = isUTCScale || isUTCTimeUnit(timeUnit);
  return `${utc ? "utc" : "time"}Format(${field}, ${expr})`;
}
function normalizeTimeUnit(timeUnit) {
  if (!timeUnit) {
    return void 0;
  }
  let params;
  if (isString(timeUnit)) {
    if (isBinnedTimeUnitString(timeUnit)) {
      params = {
        unit: timeUnit.substring(6),
        binned: true
      };
    } else {
      params = {
        unit: timeUnit
      };
    }
  } else if (isObject(timeUnit)) {
    params = {
      ...timeUnit,
      ...timeUnit.unit ? { unit: timeUnit.unit } : {}
    };
  }
  if (isUTCTimeUnit(params.unit)) {
    params.utc = true;
    params.unit = getLocalTimeUnitFromUTCTimeUnit(params.unit);
  }
  return params;
}
function timeUnitToString(tu) {
  const { utc, ...rest } = normalizeTimeUnit(tu);
  if (rest.unit) {
    return (utc ? "utc" : "") + keys(rest).map((p) => varName(`${p === "unit" ? "" : `_${p}_`}${rest[p]}`)).join("");
  } else {
    return (utc ? "utc" : "") + "timeunit" + keys(rest).map((p) => varName(`_${p}_${rest[p]}`)).join("");
  }
}
function durationExpr(timeUnit, wrap = (x) => x) {
  const normalizedTimeUnit = normalizeTimeUnit(timeUnit);
  const smallestUnitPart = getSmallestTimeUnitPart(normalizedTimeUnit.unit);
  if (smallestUnitPart && smallestUnitPart !== "day") {
    const startDate = {
      year: 2001,
      month: 1,
      date: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0
    };
    const { step, part } = getDateTimePartAndStep(smallestUnitPart, normalizedTimeUnit.step);
    const endDate = {
      ...startDate,
      [part]: +startDate[part] + step
    };
    return `${wrap(dateTimeToExpr(endDate))} - ${wrap(dateTimeToExpr(startDate))}`;
  }
  return void 0;
}
const DATE_PARTS = {
  year: 1,
  month: 1,
  date: 1,
  hours: 1,
  minutes: 1,
  seconds: 1,
  milliseconds: 1
};
function isDatePart(timeUnit) {
  return !!DATE_PARTS[timeUnit];
}
function getDateTimePartAndStep(timeUnit, step = 1) {
  if (isDatePart(timeUnit)) {
    return { part: timeUnit, step };
  }
  switch (timeUnit) {
    case "day":
    case "dayofyear":
      return { part: "date", step };
    case "quarter":
      return { part: "month", step: step * 3 };
    case "week":
      return { part: "date", step: step * 7 };
  }
}
function isSelectionPredicate(predicate) {
  return predicate == null ? void 0 : predicate["param"];
}
function isFieldEqualPredicate(predicate) {
  return !!(predicate == null ? void 0 : predicate.field) && predicate.equal !== void 0;
}
function isFieldLTPredicate(predicate) {
  return !!(predicate == null ? void 0 : predicate.field) && predicate.lt !== void 0;
}
function isFieldLTEPredicate(predicate) {
  return !!(predicate == null ? void 0 : predicate.field) && predicate.lte !== void 0;
}
function isFieldGTPredicate(predicate) {
  return !!(predicate == null ? void 0 : predicate.field) && predicate.gt !== void 0;
}
function isFieldGTEPredicate(predicate) {
  return !!(predicate == null ? void 0 : predicate.field) && predicate.gte !== void 0;
}
function isFieldRangePredicate(predicate) {
  if (predicate == null ? void 0 : predicate.field) {
    if (isArray(predicate.range) && predicate.range.length === 2) {
      return true;
    } else if (isSignalRef(predicate.range)) {
      return true;
    }
  }
  return false;
}
function isFieldOneOfPredicate(predicate) {
  return !!(predicate == null ? void 0 : predicate.field) && (isArray(predicate.oneOf) || isArray(predicate.in));
}
function isFieldValidPredicate(predicate) {
  return !!(predicate == null ? void 0 : predicate.field) && predicate.valid !== void 0;
}
function isFieldPredicate(predicate) {
  return isFieldOneOfPredicate(predicate) || isFieldEqualPredicate(predicate) || isFieldRangePredicate(predicate) || isFieldLTPredicate(predicate) || isFieldGTPredicate(predicate) || isFieldLTEPredicate(predicate) || isFieldGTEPredicate(predicate);
}
function predicateValueExpr(v, timeUnit) {
  return valueExpr(v, { timeUnit, wrapTime: true });
}
function predicateValuesExpr(vals2, timeUnit) {
  return vals2.map((v) => predicateValueExpr(v, timeUnit));
}
function fieldFilterExpression(predicate, useInRange = true) {
  const { field } = predicate;
  const normalizedTimeUnit = normalizeTimeUnit(predicate.timeUnit);
  const { unit, binned } = normalizedTimeUnit || {};
  const rawFieldExpr = vgField(predicate, { expr: "datum" });
  const fieldExpr$1 = unit ? (
    // For timeUnit, cast into integer with time() so we can use ===, inrange, indexOf to compare values directly.
    // TODO: We calculate timeUnit on the fly here. Consider if we would like to consolidate this with timeUnit pipeline
    // TODO: support utc
    `time(${!binned ? fieldExpr(unit, field) : rawFieldExpr})`
  ) : rawFieldExpr;
  if (isFieldEqualPredicate(predicate)) {
    return `${fieldExpr$1}===${predicateValueExpr(predicate.equal, unit)}`;
  } else if (isFieldLTPredicate(predicate)) {
    const upper = predicate.lt;
    return `${fieldExpr$1}<${predicateValueExpr(upper, unit)}`;
  } else if (isFieldGTPredicate(predicate)) {
    const lower = predicate.gt;
    return `${fieldExpr$1}>${predicateValueExpr(lower, unit)}`;
  } else if (isFieldLTEPredicate(predicate)) {
    const upper = predicate.lte;
    return `${fieldExpr$1}<=${predicateValueExpr(upper, unit)}`;
  } else if (isFieldGTEPredicate(predicate)) {
    const lower = predicate.gte;
    return `${fieldExpr$1}>=${predicateValueExpr(lower, unit)}`;
  } else if (isFieldOneOfPredicate(predicate)) {
    return `indexof([${predicateValuesExpr(predicate.oneOf, unit).join(",")}], ${fieldExpr$1}) !== -1`;
  } else if (isFieldValidPredicate(predicate)) {
    return fieldValidPredicate(fieldExpr$1, predicate.valid);
  } else if (isFieldRangePredicate(predicate)) {
    const { range: range2 } = predicate;
    const lower = isSignalRef(range2) ? { signal: `${range2.signal}[0]` } : range2[0];
    const upper = isSignalRef(range2) ? { signal: `${range2.signal}[1]` } : range2[1];
    if (lower !== null && upper !== null && useInRange) {
      return "inrange(" + fieldExpr$1 + ", [" + predicateValueExpr(lower, unit) + ", " + predicateValueExpr(upper, unit) + "])";
    }
    const exprs = [];
    if (lower !== null) {
      exprs.push(`${fieldExpr$1} >= ${predicateValueExpr(lower, unit)}`);
    }
    if (upper !== null) {
      exprs.push(`${fieldExpr$1} <= ${predicateValueExpr(upper, unit)}`);
    }
    return exprs.length > 0 ? exprs.join(" && ") : "true";
  }
  throw new Error(`Invalid field predicate: ${stringify(predicate)}`);
}
function fieldValidPredicate(fieldExpr2, valid = true) {
  if (valid) {
    return `isValid(${fieldExpr2}) && isFinite(+${fieldExpr2})`;
  } else {
    return `!isValid(${fieldExpr2}) || !isFinite(+${fieldExpr2})`;
  }
}
function normalizePredicate$1(f) {
  if (isFieldPredicate(f) && f.timeUnit) {
    return {
      ...f,
      timeUnit: normalizeTimeUnit(f.timeUnit)
    };
  }
  return f;
}
const Type = {
  quantitative: "quantitative",
  ordinal: "ordinal",
  temporal: "temporal",
  nominal: "nominal",
  geojson: "geojson"
};
function isContinuous(type2) {
  return type2 === "quantitative" || type2 === "temporal";
}
function isDiscrete$1(type2) {
  return type2 === "ordinal" || type2 === "nominal";
}
const QUANTITATIVE = Type.quantitative;
const ORDINAL = Type.ordinal;
const TEMPORAL = Type.temporal;
const NOMINAL = Type.nominal;
const GEOJSON = Type.geojson;
function getFullName(type2) {
  if (type2) {
    type2 = type2.toLowerCase();
    switch (type2) {
      case "q":
      case QUANTITATIVE:
        return "quantitative";
      case "t":
      case TEMPORAL:
        return "temporal";
      case "o":
      case ORDINAL:
        return "ordinal";
      case "n":
      case NOMINAL:
        return "nominal";
      case GEOJSON:
        return "geojson";
    }
  }
  return void 0;
}
const ScaleType = {
  // Continuous - Quantitative
  LINEAR: "linear",
  LOG: "log",
  POW: "pow",
  SQRT: "sqrt",
  SYMLOG: "symlog",
  IDENTITY: "identity",
  SEQUENTIAL: "sequential",
  // Continuous - Time
  TIME: "time",
  UTC: "utc",
  // Discretizing scales
  QUANTILE: "quantile",
  QUANTIZE: "quantize",
  THRESHOLD: "threshold",
  BIN_ORDINAL: "bin-ordinal",
  // Discrete scales
  ORDINAL: "ordinal",
  POINT: "point",
  BAND: "band"
};
const SCALE_CATEGORY_INDEX = {
  linear: "numeric",
  log: "numeric",
  pow: "numeric",
  sqrt: "numeric",
  symlog: "numeric",
  identity: "numeric",
  sequential: "numeric",
  time: "time",
  utc: "time",
  ordinal: "ordinal",
  "bin-ordinal": "bin-ordinal",
  point: "ordinal-position",
  band: "ordinal-position",
  quantile: "discretizing",
  quantize: "discretizing",
  threshold: "discretizing"
};
function scaleCompatible(scaleType1, scaleType2) {
  const scaleCategory1 = SCALE_CATEGORY_INDEX[scaleType1];
  const scaleCategory2 = SCALE_CATEGORY_INDEX[scaleType2];
  return scaleCategory1 === scaleCategory2 || scaleCategory1 === "ordinal-position" && scaleCategory2 === "time" || scaleCategory2 === "ordinal-position" && scaleCategory1 === "time";
}
const SCALE_PRECEDENCE_INDEX = {
  // numeric
  linear: 0,
  log: 1,
  pow: 1,
  sqrt: 1,
  symlog: 1,
  identity: 1,
  sequential: 1,
  // time
  time: 0,
  utc: 0,
  // ordinal-position -- these have higher precedence than continuous scales as they support more types of data
  point: 10,
  band: 11,
  // non grouped types
  ordinal: 0,
  "bin-ordinal": 0,
  quantile: 0,
  quantize: 0,
  threshold: 0
};
function scaleTypePrecedence(scaleType2) {
  return SCALE_PRECEDENCE_INDEX[scaleType2];
}
const QUANTITATIVE_SCALES = /* @__PURE__ */ new Set([
  "linear",
  "log",
  "pow",
  "sqrt",
  "symlog"
]);
const CONTINUOUS_TO_CONTINUOUS_SCALES = /* @__PURE__ */ new Set([
  ...QUANTITATIVE_SCALES,
  "time",
  "utc"
]);
function isQuantitative(type2) {
  return QUANTITATIVE_SCALES.has(type2);
}
const CONTINUOUS_TO_DISCRETE_SCALES = /* @__PURE__ */ new Set([
  "quantile",
  "quantize",
  "threshold"
]);
const CONTINUOUS_DOMAIN_SCALES = /* @__PURE__ */ new Set([
  ...CONTINUOUS_TO_CONTINUOUS_SCALES,
  ...CONTINUOUS_TO_DISCRETE_SCALES,
  "sequential",
  "identity"
]);
const DISCRETE_DOMAIN_SCALES = /* @__PURE__ */ new Set([
  "ordinal",
  "bin-ordinal",
  "point",
  "band"
]);
function hasDiscreteDomain(type2) {
  return DISCRETE_DOMAIN_SCALES.has(type2);
}
function hasContinuousDomain(type2) {
  return CONTINUOUS_DOMAIN_SCALES.has(type2);
}
function isContinuousToContinuous(type2) {
  return CONTINUOUS_TO_CONTINUOUS_SCALES.has(type2);
}
function isContinuousToDiscrete(type2) {
  return CONTINUOUS_TO_DISCRETE_SCALES.has(type2);
}
const defaultScaleConfig = {
  pointPadding: 0.5,
  barBandPaddingInner: 0.1,
  rectBandPaddingInner: 0,
  bandWithNestedOffsetPaddingInner: 0.2,
  bandWithNestedOffsetPaddingOuter: 0.2,
  minBandSize: 2,
  minFontSize: 8,
  maxFontSize: 40,
  minOpacity: 0.3,
  maxOpacity: 0.8,
  // FIXME: revise if these *can* become ratios of width/height step
  minSize: 9,
  minStrokeWidth: 1,
  maxStrokeWidth: 4,
  quantileCount: 4,
  quantizeCount: 4,
  zero: true
};
function isExtendedScheme(scheme2) {
  return !isString(scheme2) && !!scheme2["name"];
}
function isParameterDomain(domain2) {
  return domain2 == null ? void 0 : domain2["param"];
}
function isDomainUnionWith(domain2) {
  return domain2 == null ? void 0 : domain2["unionWith"];
}
function isFieldRange(range2) {
  return isObject(range2) && "field" in range2;
}
const SCALE_PROPERTY_INDEX = {
  type: 1,
  domain: 1,
  domainMax: 1,
  domainMin: 1,
  domainMid: 1,
  align: 1,
  range: 1,
  rangeMax: 1,
  rangeMin: 1,
  scheme: 1,
  bins: 1,
  // Other properties
  reverse: 1,
  round: 1,
  // quantitative / time
  clamp: 1,
  nice: 1,
  // quantitative
  base: 1,
  exponent: 1,
  constant: 1,
  interpolate: 1,
  zero: 1,
  // band/point
  padding: 1,
  paddingInner: 1,
  paddingOuter: 1
};
const { type, domain: domain$1, range: range$1, rangeMax, rangeMin, scheme, ...NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTY_INDEX } = SCALE_PROPERTY_INDEX;
const NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTIES = keys(NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTY_INDEX);
function scaleTypeSupportProperty(scaleType2, propName) {
  switch (propName) {
    case "type":
    case "domain":
    case "reverse":
    case "range":
      return true;
    case "scheme":
    case "interpolate":
      return !["point", "band", "identity"].includes(scaleType2);
    case "bins":
      return !["point", "band", "identity", "ordinal"].includes(scaleType2);
    case "round":
      return isContinuousToContinuous(scaleType2) || scaleType2 === "band" || scaleType2 === "point";
    case "padding":
    case "rangeMin":
    case "rangeMax":
      return isContinuousToContinuous(scaleType2) || ["point", "band"].includes(scaleType2);
    case "paddingOuter":
    case "align":
      return ["point", "band"].includes(scaleType2);
    case "paddingInner":
      return scaleType2 === "band";
    case "domainMax":
    case "domainMid":
    case "domainMin":
    case "clamp":
      return isContinuousToContinuous(scaleType2);
    case "nice":
      return isContinuousToContinuous(scaleType2) || scaleType2 === "quantize" || scaleType2 === "threshold";
    case "exponent":
      return scaleType2 === "pow";
    case "base":
      return scaleType2 === "log";
    case "constant":
      return scaleType2 === "symlog";
    case "zero":
      return hasContinuousDomain(scaleType2) && !contains([
        "log",
        "time",
        "utc",
        "threshold",
        "quantile"
        // quantile depends on distribution so zero does not matter
      ], scaleType2);
  }
}
function channelScalePropertyIncompatability(channel, propName) {
  switch (propName) {
    case "interpolate":
    case "scheme":
    case "domainMid":
      if (!isColorChannel(channel)) {
        return cannotUseScalePropertyWithNonColor(propName);
      }
      return void 0;
    case "align":
    case "type":
    case "bins":
    case "domain":
    case "domainMax":
    case "domainMin":
    case "range":
    case "base":
    case "exponent":
    case "constant":
    case "nice":
    case "padding":
    case "paddingInner":
    case "paddingOuter":
    case "rangeMax":
    case "rangeMin":
    case "reverse":
    case "round":
    case "clamp":
    case "zero":
      return void 0;
  }
}
function scaleTypeSupportDataType(specifiedType, fieldDefType) {
  if (contains([ORDINAL, NOMINAL], fieldDefType)) {
    return specifiedType === void 0 || hasDiscreteDomain(specifiedType);
  } else if (fieldDefType === TEMPORAL) {
    return contains([ScaleType.TIME, ScaleType.UTC, void 0], specifiedType);
  } else if (fieldDefType === QUANTITATIVE) {
    return isQuantitative(specifiedType) || isContinuousToDiscrete(specifiedType) || specifiedType === void 0;
  }
  return true;
}
function channelSupportScaleType(channel, scaleType2, hasNestedOffsetScale = false) {
  if (!isScaleChannel(channel)) {
    return false;
  }
  switch (channel) {
    case X:
    case Y:
    case XOFFSET:
    case YOFFSET:
    case THETA:
    case RADIUS:
      if (isContinuousToContinuous(scaleType2)) {
        return true;
      } else if (scaleType2 === "band") {
        return true;
      } else if (scaleType2 === "point") {
        return !hasNestedOffsetScale;
      }
      return false;
    case SIZE:
    case STROKEWIDTH:
    case OPACITY:
    case FILLOPACITY:
    case STROKEOPACITY:
    case ANGLE:
      return isContinuousToContinuous(scaleType2) || isContinuousToDiscrete(scaleType2) || contains(["band", "point", "ordinal"], scaleType2);
    case COLOR:
    case FILL:
    case STROKE:
      return scaleType2 !== "band";
    case STROKEDASH:
    case SHAPE:
      return scaleType2 === "ordinal" || isContinuousToDiscrete(scaleType2);
  }
}
const Mark = {
  arc: "arc",
  area: "area",
  bar: "bar",
  image: "image",
  line: "line",
  point: "point",
  rect: "rect",
  rule: "rule",
  text: "text",
  tick: "tick",
  trail: "trail",
  circle: "circle",
  square: "square",
  geoshape: "geoshape"
};
const ARC = Mark.arc;
const AREA = Mark.area;
const BAR = Mark.bar;
const IMAGE = Mark.image;
const LINE = Mark.line;
const POINT = Mark.point;
const RECT = Mark.rect;
const RULE = Mark.rule;
const TEXT = Mark.text;
const TICK = Mark.tick;
const TRAIL = Mark.trail;
const CIRCLE = Mark.circle;
const SQUARE = Mark.square;
const GEOSHAPE = Mark.geoshape;
function isPathMark(m) {
  return ["line", "area", "trail"].includes(m);
}
function isRectBasedMark(m) {
  return [
    "rect",
    "bar",
    "image",
    "arc"
    /* arc is rect/interval in polar coordinate */
  ].includes(m);
}
const PRIMITIVE_MARKS = new Set(keys(Mark));
function isMarkDef(mark) {
  return mark["type"];
}
const STROKE_CONFIG = [
  "stroke",
  "strokeWidth",
  "strokeDash",
  "strokeDashOffset",
  "strokeOpacity",
  "strokeJoin",
  "strokeMiterLimit"
];
const FILL_CONFIG = ["fill", "fillOpacity"];
const FILL_STROKE_CONFIG = [...STROKE_CONFIG, ...FILL_CONFIG];
const VL_ONLY_MARK_CONFIG_INDEX = {
  color: 1,
  filled: 1,
  invalid: 1,
  order: 1,
  radius2: 1,
  theta2: 1,
  timeUnitBandSize: 1,
  timeUnitBandPosition: 1
};
const VL_ONLY_MARK_CONFIG_PROPERTIES = keys(VL_ONLY_MARK_CONFIG_INDEX);
const VL_ONLY_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX = {
  area: ["line", "point"],
  bar: ["binSpacing", "continuousBandSize", "discreteBandSize", "minBandSize"],
  rect: ["binSpacing", "continuousBandSize", "discreteBandSize", "minBandSize"],
  line: ["point"],
  tick: ["bandSize", "thickness"]
};
const defaultMarkConfig = {
  color: "#4c78a8",
  invalid: "filter",
  timeUnitBandSize: 1
};
const MARK_CONFIG_INDEX = {
  mark: 1,
  arc: 1,
  area: 1,
  bar: 1,
  circle: 1,
  image: 1,
  line: 1,
  point: 1,
  rect: 1,
  rule: 1,
  square: 1,
  text: 1,
  tick: 1,
  trail: 1,
  geoshape: 1
};
const MARK_CONFIGS = keys(MARK_CONFIG_INDEX);
function isRelativeBandSize(o) {
  return o && o["band"] != void 0;
}
const BAR_CORNER_RADIUS_INDEX = {
  horizontal: ["cornerRadiusTopRight", "cornerRadiusBottomRight"],
  vertical: ["cornerRadiusTopLeft", "cornerRadiusTopRight"]
};
const DEFAULT_RECT_BAND_SIZE = 5;
const defaultBarConfig = {
  binSpacing: 1,
  continuousBandSize: DEFAULT_RECT_BAND_SIZE,
  minBandSize: 0.25,
  timeUnitBandPosition: 0.5
};
const defaultRectConfig = {
  binSpacing: 0,
  continuousBandSize: DEFAULT_RECT_BAND_SIZE,
  minBandSize: 0.25,
  timeUnitBandPosition: 0.5
};
const defaultTickConfig = {
  thickness: 1
};
function getMarkType(m) {
  return isMarkDef(m) ? m.type : m;
}
function midPointRefWithPositionInvalidTest(params) {
  const { channel, channelDef, markDef, scale, config } = params;
  const ref = midPoint(params);
  if (
    // Only this for field def without counting aggregate (as count wouldn't be null)
    isFieldDef(channelDef) && !isCountingAggregateOp(channelDef.aggregate) && // and only for continuous scale
    scale && isContinuousToContinuous(scale.get("type"))
  ) {
    return wrapPositionInvalidTest({
      fieldDef: channelDef,
      channel,
      markDef,
      ref,
      config
    });
  }
  return ref;
}
function wrapPositionInvalidTest({ fieldDef, channel, markDef, ref, config }) {
  if (isPathMark(markDef.type)) {
    return ref;
  }
  const invalid = getMarkPropOrConfig("invalid", markDef, config);
  if (invalid === null) {
    return [fieldInvalidTestValueRef(fieldDef, channel), ref];
  }
  return ref;
}
function fieldInvalidTestValueRef(fieldDef, channel) {
  const test = fieldInvalidPredicate(fieldDef, true);
  const mainChannel = getMainRangeChannel(channel);
  const zeroValueRef = mainChannel === "y" ? { field: { group: "height" } } : (
    // x / angle / radius can all use 0
    { value: 0 }
  );
  return { test, ...zeroValueRef };
}
function fieldInvalidPredicate(field, invalid = true) {
  return fieldValidPredicate(isString(field) ? field : vgField(field, { expr: "datum" }), !invalid);
}
function datumDefToExpr(datumDef) {
  const { datum } = datumDef;
  if (isDateTime(datum)) {
    return dateTimeToExpr(datum);
  }
  return `${stringify(datum)}`;
}
function valueRefForFieldOrDatumDef(fieldDef, scaleName, opt, encode) {
  const ref = {};
  if (scaleName) {
    ref.scale = scaleName;
  }
  if (isDatumDef(fieldDef)) {
    const { datum } = fieldDef;
    if (isDateTime(datum)) {
      ref.signal = dateTimeToExpr(datum);
    } else if (isSignalRef(datum)) {
      ref.signal = datum.signal;
    } else if (isExprRef(datum)) {
      ref.signal = datum.expr;
    } else {
      ref.value = datum;
    }
  } else {
    ref.field = vgField(fieldDef, opt);
  }
  if (encode) {
    const { offset, band } = encode;
    if (offset) {
      ref.offset = offset;
    }
    if (band) {
      ref.band = band;
    }
  }
  return ref;
}
function interpolatedSignalRef({ scaleName, fieldOrDatumDef, fieldOrDatumDef2, offset, startSuffix, bandPosition = 0.5 }) {
  const expr = 0 < bandPosition && bandPosition < 1 ? "datum" : void 0;
  const start = vgField(fieldOrDatumDef, { expr, suffix: startSuffix });
  const end = fieldOrDatumDef2 !== void 0 ? vgField(fieldOrDatumDef2, { expr }) : vgField(fieldOrDatumDef, { suffix: "end", expr });
  const ref = {};
  if (bandPosition === 0 || bandPosition === 1) {
    ref.scale = scaleName;
    const field = bandPosition === 0 ? start : end;
    ref.field = field;
  } else {
    const datum = isSignalRef(bandPosition) ? `${bandPosition.signal} * ${start} + (1-${bandPosition.signal}) * ${end}` : `${bandPosition} * ${start} + ${1 - bandPosition} * ${end}`;
    ref.signal = `scale("${scaleName}", ${datum})`;
  }
  if (offset) {
    ref.offset = offset;
  }
  return ref;
}
function binSizeExpr({ scaleName, fieldDef }) {
  const start = vgField(fieldDef, { expr: "datum" });
  const end = vgField(fieldDef, { expr: "datum", suffix: "end" });
  return `abs(scale("${scaleName}", ${end}) - scale("${scaleName}", ${start}))`;
}
function midPoint({ channel, channelDef, channel2Def, markDef, config, scaleName, scale, stack: stack2, offset, defaultRef, bandPosition }) {
  if (channelDef) {
    if (isFieldOrDatumDef(channelDef)) {
      const scaleType2 = scale == null ? void 0 : scale.get("type");
      if (isTypedFieldDef(channelDef)) {
        bandPosition ?? (bandPosition = getBandPosition({
          fieldDef: channelDef,
          fieldDef2: channel2Def,
          markDef,
          config
        }));
        const { bin: bin2, timeUnit, type: type2 } = channelDef;
        if (isBinning(bin2) || bandPosition && timeUnit && type2 === TEMPORAL) {
          if (stack2 == null ? void 0 : stack2.impute) {
            return valueRefForFieldOrDatumDef(channelDef, scaleName, { binSuffix: "mid" }, { offset });
          }
          if (bandPosition && !hasDiscreteDomain(scaleType2)) {
            return interpolatedSignalRef({ scaleName, fieldOrDatumDef: channelDef, bandPosition, offset });
          }
          return valueRefForFieldOrDatumDef(channelDef, scaleName, binRequiresRange(channelDef, channel) ? { binSuffix: "range" } : {}, {
            offset
          });
        } else if (isBinned(bin2)) {
          if (isFieldDef(channel2Def)) {
            return interpolatedSignalRef({
              scaleName,
              fieldOrDatumDef: channelDef,
              fieldOrDatumDef2: channel2Def,
              bandPosition,
              offset
            });
          } else {
            const channel2 = channel === X ? X2 : Y2;
            warn(channelRequiredForBinned(channel2));
          }
        }
      }
      return valueRefForFieldOrDatumDef(
        channelDef,
        scaleName,
        hasDiscreteDomain(scaleType2) ? { binSuffix: "range" } : {},
        // no need for bin suffix if there is no scale
        {
          offset,
          // For band, to get mid point, need to offset by half of the band
          band: scaleType2 === "band" ? bandPosition ?? channelDef.bandPosition ?? 0.5 : void 0
        }
      );
    } else if (isValueDef(channelDef)) {
      const value = channelDef.value;
      const offsetMixins = offset ? { offset } : {};
      return { ...widthHeightValueOrSignalRef(channel, value), ...offsetMixins };
    }
  }
  if (isFunction(defaultRef)) {
    defaultRef = defaultRef();
  }
  if (defaultRef) {
    return {
      ...defaultRef,
      // only include offset when it is non-zero (zero = no offset)
      ...offset ? { offset } : {}
    };
  }
  return defaultRef;
}
function widthHeightValueOrSignalRef(channel, value) {
  if (contains(["x", "x2"], channel) && value === "width") {
    return { field: { group: "width" } };
  } else if (contains(["y", "y2"], channel) && value === "height") {
    return { field: { group: "height" } };
  }
  return signalOrValueRef(value);
}
function isCustomFormatType(formatType) {
  return formatType && formatType !== "number" && formatType !== "time";
}
function customFormatExpr(formatType, field, format) {
  return `${formatType}(${field}${format ? `, ${stringify(format)}` : ""})`;
}
const BIN_RANGE_DELIMITER = " – ";
function formatSignalRef({ fieldOrDatumDef, format, formatType, expr, normalizeStack, config }) {
  var _a2, _b;
  if (isCustomFormatType(formatType)) {
    return formatCustomType({
      fieldOrDatumDef,
      format,
      formatType,
      expr,
      config
    });
  }
  const field = fieldToFormat(fieldOrDatumDef, expr, normalizeStack);
  const type2 = channelDefType(fieldOrDatumDef);
  if (format === void 0 && formatType === void 0 && config.customFormatTypes) {
    if (type2 === "quantitative") {
      if (normalizeStack && config.normalizedNumberFormatType)
        return formatCustomType({
          fieldOrDatumDef,
          format: config.normalizedNumberFormat,
          formatType: config.normalizedNumberFormatType,
          expr,
          config
        });
      if (config.numberFormatType) {
        return formatCustomType({
          fieldOrDatumDef,
          format: config.numberFormat,
          formatType: config.numberFormatType,
          expr,
          config
        });
      }
    }
    if (type2 === "temporal" && config.timeFormatType && isFieldDef(fieldOrDatumDef) && fieldOrDatumDef.timeUnit === void 0) {
      return formatCustomType({
        fieldOrDatumDef,
        format: config.timeFormat,
        formatType: config.timeFormatType,
        expr,
        config
      });
    }
  }
  if (isFieldOrDatumDefForTimeFormat(fieldOrDatumDef)) {
    const signal = timeFormatExpression({
      field,
      timeUnit: isFieldDef(fieldOrDatumDef) ? (_a2 = normalizeTimeUnit(fieldOrDatumDef.timeUnit)) == null ? void 0 : _a2.unit : void 0,
      format,
      formatType: config.timeFormatType,
      rawTimeFormat: config.timeFormat,
      isUTCScale: isScaleFieldDef(fieldOrDatumDef) && ((_b = fieldOrDatumDef.scale) == null ? void 0 : _b.type) === ScaleType.UTC
    });
    return signal ? { signal } : void 0;
  }
  format = numberFormat({ type: type2, specifiedFormat: format, config, normalizeStack });
  if (isFieldDef(fieldOrDatumDef) && isBinning(fieldOrDatumDef.bin)) {
    const endField = vgField(fieldOrDatumDef, { expr, binSuffix: "end" });
    return {
      signal: binFormatExpression(field, endField, format, formatType, config)
    };
  } else if (format || channelDefType(fieldOrDatumDef) === "quantitative") {
    return {
      signal: `${formatExpr(field, format)}`
    };
  } else {
    return { signal: `isValid(${field}) ? ${field} : ""+${field}` };
  }
}
function fieldToFormat(fieldOrDatumDef, expr, normalizeStack) {
  if (isFieldDef(fieldOrDatumDef)) {
    if (normalizeStack) {
      return `${vgField(fieldOrDatumDef, { expr, suffix: "end" })}-${vgField(fieldOrDatumDef, {
        expr,
        suffix: "start"
      })}`;
    } else {
      return vgField(fieldOrDatumDef, { expr });
    }
  } else {
    return datumDefToExpr(fieldOrDatumDef);
  }
}
function formatCustomType({ fieldOrDatumDef, format, formatType, expr, normalizeStack, config, field }) {
  field ?? (field = fieldToFormat(fieldOrDatumDef, expr, normalizeStack));
  if (field !== "datum.value" && // For axis/legend, we can't correctly know the end of the bin from `datum`
  isFieldDef(fieldOrDatumDef) && isBinning(fieldOrDatumDef.bin)) {
    const endField = vgField(fieldOrDatumDef, { expr, binSuffix: "end" });
    return {
      signal: binFormatExpression(field, endField, format, formatType, config)
    };
  }
  return { signal: customFormatExpr(formatType, field, format) };
}
function guideFormat(fieldOrDatumDef, type2, format, formatType, config, omitTimeFormatConfig) {
  var _a2;
  if (isString(formatType) && isCustomFormatType(formatType)) {
    return void 0;
  } else if (format === void 0 && formatType === void 0 && config.customFormatTypes) {
    if (channelDefType(fieldOrDatumDef) === "quantitative") {
      if (config.normalizedNumberFormatType && isPositionFieldOrDatumDef(fieldOrDatumDef) && fieldOrDatumDef.stack === "normalize") {
        return void 0;
      }
      if (config.numberFormatType) {
        return void 0;
      }
    }
  }
  if (isPositionFieldOrDatumDef(fieldOrDatumDef) && fieldOrDatumDef.stack === "normalize" && config.normalizedNumberFormat) {
    return numberFormat({
      type: "quantitative",
      config,
      normalizeStack: true
    });
  }
  if (isFieldOrDatumDefForTimeFormat(fieldOrDatumDef)) {
    const timeUnit = isFieldDef(fieldOrDatumDef) ? (_a2 = normalizeTimeUnit(fieldOrDatumDef.timeUnit)) == null ? void 0 : _a2.unit : void 0;
    if (timeUnit === void 0 && config.customFormatTypes && config.timeFormatType) {
      return void 0;
    }
    return timeFormat({ specifiedFormat: format, timeUnit, config, omitTimeFormatConfig });
  }
  return numberFormat({ type: type2, specifiedFormat: format, config });
}
function guideFormatType(formatType, fieldOrDatumDef, scaleType2) {
  var _a2;
  if (formatType && (isSignalRef(formatType) || formatType === "number" || formatType === "time")) {
    return formatType;
  }
  if (isFieldOrDatumDefForTimeFormat(fieldOrDatumDef) && scaleType2 !== "time" && scaleType2 !== "utc") {
    return isFieldDef(fieldOrDatumDef) && ((_a2 = normalizeTimeUnit(fieldOrDatumDef == null ? void 0 : fieldOrDatumDef.timeUnit)) == null ? void 0 : _a2.utc) ? "utc" : "time";
  }
  return void 0;
}
function numberFormat({ type: type2, specifiedFormat, config, normalizeStack }) {
  if (isString(specifiedFormat)) {
    return specifiedFormat;
  }
  if (type2 === QUANTITATIVE) {
    return normalizeStack ? config.normalizedNumberFormat : config.numberFormat;
  }
  return void 0;
}
function timeFormat({ specifiedFormat, timeUnit, config, omitTimeFormatConfig }) {
  if (specifiedFormat) {
    return specifiedFormat;
  }
  if (timeUnit) {
    return {
      signal: timeUnitSpecifierExpression(timeUnit)
    };
  }
  return omitTimeFormatConfig ? void 0 : config.timeFormat;
}
function formatExpr(field, format) {
  return `format(${field}, "${format || ""}")`;
}
function binNumberFormatExpr(field, format, formatType, config) {
  if (isCustomFormatType(formatType)) {
    return customFormatExpr(formatType, field, format);
  }
  return formatExpr(field, (isString(format) ? format : void 0) ?? config.numberFormat);
}
function binFormatExpression(startField, endField, format, formatType, config) {
  if (format === void 0 && formatType === void 0 && config.customFormatTypes && config.numberFormatType) {
    return binFormatExpression(startField, endField, config.numberFormat, config.numberFormatType, config);
  }
  const start = binNumberFormatExpr(startField, format, formatType, config);
  const end = binNumberFormatExpr(endField, format, formatType, config);
  return `${fieldValidPredicate(startField, false)} ? "null" : ${start} + "${BIN_RANGE_DELIMITER}" + ${end}`;
}
function timeFormatExpression({ field, timeUnit, format, formatType, rawTimeFormat, isUTCScale }) {
  if (!timeUnit || format) {
    if (!timeUnit && formatType) {
      return `${formatType}(${field}, '${format}')`;
    }
    format = isString(format) ? format : rawTimeFormat;
    return `${isUTCScale ? "utc" : "time"}Format(${field}, '${format}')`;
  } else {
    return formatExpression(timeUnit, field, isUTCScale);
  }
}
const DEFAULT_SORT_OP = "min";
const SORT_BY_CHANNEL_INDEX = {
  x: 1,
  y: 1,
  color: 1,
  fill: 1,
  stroke: 1,
  strokeWidth: 1,
  size: 1,
  shape: 1,
  fillOpacity: 1,
  strokeOpacity: 1,
  opacity: 1,
  text: 1
};
function isSortByChannel(c) {
  return c in SORT_BY_CHANNEL_INDEX;
}
function isSortByEncoding(sort) {
  return !!(sort == null ? void 0 : sort["encoding"]);
}
function isSortField(sort) {
  return sort && (sort["op"] === "count" || !!sort["field"]);
}
function isSortArray(sort) {
  return sort && isArray(sort);
}
function isFacetMapping(f) {
  return "row" in f || "column" in f;
}
function isFacetFieldDef(channelDef) {
  return !!channelDef && "header" in channelDef;
}
function isFacetSpec(spec) {
  return "facet" in spec;
}
function isConditionalParameter(c) {
  return c["param"];
}
function isRepeatRef(field) {
  return field && !isString(field) && "repeat" in field;
}
function toFieldDefBase(fieldDef) {
  const { field, timeUnit, bin: bin2, aggregate } = fieldDef;
  return {
    ...timeUnit ? { timeUnit } : {},
    ...bin2 ? { bin: bin2 } : {},
    ...aggregate ? { aggregate } : {},
    field
  };
}
function isSortableFieldDef(fieldDef) {
  return "sort" in fieldDef;
}
function getBandPosition({ fieldDef, fieldDef2, markDef: mark, config }) {
  if (isFieldOrDatumDef(fieldDef) && fieldDef.bandPosition !== void 0) {
    return fieldDef.bandPosition;
  }
  if (isFieldDef(fieldDef)) {
    const { timeUnit, bin: bin2 } = fieldDef;
    if (timeUnit && !fieldDef2) {
      return isRectBasedMark(mark.type) ? 0 : getMarkConfig("timeUnitBandPosition", mark, config);
    } else if (isBinning(bin2)) {
      return 0.5;
    }
  }
  return void 0;
}
function getBandSize({ channel, fieldDef, fieldDef2, markDef: mark, config, scaleType: scaleType2, useVlSizeChannel }) {
  var _a2, _b, _c2;
  const sizeChannel = getSizeChannel(channel);
  const size = getMarkPropOrConfig(useVlSizeChannel ? "size" : sizeChannel, mark, config, {
    vgChannel: sizeChannel
  });
  if (size !== void 0) {
    return size;
  }
  if (isFieldDef(fieldDef)) {
    const { timeUnit, bin: bin2 } = fieldDef;
    if (timeUnit && !fieldDef2) {
      return { band: getMarkConfig("timeUnitBandSize", mark, config) };
    } else if (isBinning(bin2) && !hasDiscreteDomain(scaleType2)) {
      return { band: 1 };
    }
  }
  if (isRectBasedMark(mark.type)) {
    if (scaleType2) {
      if (hasDiscreteDomain(scaleType2)) {
        return ((_a2 = config[mark.type]) == null ? void 0 : _a2.discreteBandSize) || { band: 1 };
      } else {
        return (_b = config[mark.type]) == null ? void 0 : _b.continuousBandSize;
      }
    }
    return (_c2 = config[mark.type]) == null ? void 0 : _c2.discreteBandSize;
  }
  return void 0;
}
function hasBandEnd(fieldDef, fieldDef2, markDef, config) {
  if (isBinning(fieldDef.bin) || fieldDef.timeUnit && isTypedFieldDef(fieldDef) && fieldDef.type === "temporal") {
    return getBandPosition({ fieldDef, fieldDef2, markDef, config }) !== void 0;
  }
  return false;
}
function isOrderOnlyDef(orderDef) {
  return orderDef && !!orderDef.sort && !orderDef["field"];
}
function isConditionalDef(channelDef) {
  return channelDef && "condition" in channelDef;
}
function hasConditionalFieldDef(channelDef) {
  const condition = channelDef == null ? void 0 : channelDef["condition"];
  return !!condition && !isArray(condition) && isFieldDef(condition);
}
function hasConditionalFieldOrDatumDef(channelDef) {
  const condition = channelDef == null ? void 0 : channelDef["condition"];
  return !!condition && !isArray(condition) && isFieldOrDatumDef(condition);
}
function hasConditionalValueDef(channelDef) {
  const condition = channelDef == null ? void 0 : channelDef["condition"];
  return !!condition && (isArray(condition) || isValueDef(condition));
}
function isFieldDef(channelDef) {
  return channelDef && (!!channelDef["field"] || channelDef["aggregate"] === "count");
}
function channelDefType(channelDef) {
  return channelDef == null ? void 0 : channelDef["type"];
}
function isDatumDef(channelDef) {
  return channelDef && "datum" in channelDef;
}
function isContinuousFieldOrDatumDef(cd) {
  return isTypedFieldDef(cd) && !isDiscrete(cd) || isNumericDataDef(cd);
}
function isUnbinnedQuantitativeFieldOrDatumDef(cd) {
  return isTypedFieldDef(cd) && cd.type === "quantitative" && !cd.bin || isNumericDataDef(cd);
}
function isNumericDataDef(cd) {
  return isDatumDef(cd) && isNumber(cd.datum);
}
function isFieldOrDatumDef(channelDef) {
  return isFieldDef(channelDef) || isDatumDef(channelDef);
}
function isTypedFieldDef(channelDef) {
  return channelDef && ("field" in channelDef || channelDef["aggregate"] === "count") && "type" in channelDef;
}
function isValueDef(channelDef) {
  return channelDef && "value" in channelDef && "value" in channelDef;
}
function isScaleFieldDef(channelDef) {
  return channelDef && ("scale" in channelDef || "sort" in channelDef);
}
function isPositionFieldOrDatumDef(channelDef) {
  return channelDef && ("axis" in channelDef || "stack" in channelDef || "impute" in channelDef);
}
function isMarkPropFieldOrDatumDef(channelDef) {
  return channelDef && "legend" in channelDef;
}
function isStringFieldOrDatumDef(channelDef) {
  return channelDef && ("format" in channelDef || "formatType" in channelDef);
}
function toStringFieldDef(fieldDef) {
  return omit(fieldDef, ["legend", "axis", "header", "scale"]);
}
function isOpFieldDef(fieldDef) {
  return "op" in fieldDef;
}
function vgField(fieldDef, opt = {}) {
  let field = fieldDef.field;
  const prefix = opt.prefix;
  let suffix = opt.suffix;
  let argAccessor = "";
  if (isCount(fieldDef)) {
    field = internalField("count");
  } else {
    let fn;
    if (!opt.nofn) {
      if (isOpFieldDef(fieldDef)) {
        fn = fieldDef.op;
      } else {
        const { bin: bin2, aggregate, timeUnit } = fieldDef;
        if (isBinning(bin2)) {
          fn = binToString(bin2);
          suffix = (opt.binSuffix ?? "") + (opt.suffix ?? "");
        } else if (aggregate) {
          if (isArgmaxDef(aggregate)) {
            argAccessor = `["${field}"]`;
            field = `argmax_${aggregate.argmax}`;
          } else if (isArgminDef(aggregate)) {
            argAccessor = `["${field}"]`;
            field = `argmin_${aggregate.argmin}`;
          } else {
            fn = String(aggregate);
          }
        } else if (timeUnit && !isBinnedTimeUnit(timeUnit)) {
          fn = timeUnitToString(timeUnit);
          suffix = (!["range", "mid"].includes(opt.binSuffix) && opt.binSuffix || "") + (opt.suffix ?? "");
        }
      }
    }
    if (fn) {
      field = field ? `${fn}_${field}` : fn;
    }
  }
  if (suffix) {
    field = `${field}_${suffix}`;
  }
  if (prefix) {
    field = `${prefix}_${field}`;
  }
  if (opt.forAs) {
    return removePathFromField(field);
  } else if (opt.expr) {
    return flatAccessWithDatum(field, opt.expr) + argAccessor;
  } else {
    return replacePathInField(field) + argAccessor;
  }
}
function isDiscrete(def) {
  switch (def.type) {
    case "nominal":
    case "ordinal":
    case "geojson":
      return true;
    case "quantitative":
      return isFieldDef(def) && !!def.bin;
    case "temporal":
      return false;
  }
  throw new Error(invalidFieldType(def.type));
}
function isDiscretizing(def) {
  var _a2;
  return isScaleFieldDef(def) && isContinuousToDiscrete((_a2 = def.scale) == null ? void 0 : _a2.type);
}
function isCount(fieldDef) {
  return fieldDef.aggregate === "count";
}
function verbalTitleFormatter(fieldDef, config) {
  var _a2;
  const { field, bin: bin2, timeUnit, aggregate } = fieldDef;
  if (aggregate === "count") {
    return config.countTitle;
  } else if (isBinning(bin2)) {
    return `${field} (binned)`;
  } else if (timeUnit && !isBinnedTimeUnit(timeUnit)) {
    const unit = (_a2 = normalizeTimeUnit(timeUnit)) == null ? void 0 : _a2.unit;
    if (unit) {
      return `${field} (${getTimeUnitParts(unit).join("-")})`;
    }
  } else if (aggregate) {
    if (isArgmaxDef(aggregate)) {
      return `${field} for max ${aggregate.argmax}`;
    } else if (isArgminDef(aggregate)) {
      return `${field} for min ${aggregate.argmin}`;
    } else {
      return `${titleCase(aggregate)} of ${field}`;
    }
  }
  return field;
}
function functionalTitleFormatter(fieldDef) {
  const { aggregate, bin: bin2, timeUnit, field } = fieldDef;
  if (isArgmaxDef(aggregate)) {
    return `${field} for argmax(${aggregate.argmax})`;
  } else if (isArgminDef(aggregate)) {
    return `${field} for argmin(${aggregate.argmin})`;
  }
  const timeUnitParams = timeUnit && !isBinnedTimeUnit(timeUnit) ? normalizeTimeUnit(timeUnit) : void 0;
  const fn = aggregate || (timeUnitParams == null ? void 0 : timeUnitParams.unit) || (timeUnitParams == null ? void 0 : timeUnitParams.maxbins) && "timeunit" || isBinning(bin2) && "bin";
  if (fn) {
    return `${fn.toUpperCase()}(${field})`;
  } else {
    return field;
  }
}
const defaultTitleFormatter = (fieldDef, config) => {
  switch (config.fieldTitle) {
    case "plain":
      return fieldDef.field;
    case "functional":
      return functionalTitleFormatter(fieldDef);
    default:
      return verbalTitleFormatter(fieldDef, config);
  }
};
let titleFormatter = defaultTitleFormatter;
function setTitleFormatter(formatter) {
  titleFormatter = formatter;
}
function resetTitleFormatter() {
  setTitleFormatter(defaultTitleFormatter);
}
function title(fieldOrDatumDef, config, { allowDisabling, includeDefault = true }) {
  var _a2;
  const guideTitle = (_a2 = getGuide(fieldOrDatumDef)) == null ? void 0 : _a2.title;
  if (!isFieldDef(fieldOrDatumDef)) {
    return guideTitle ?? fieldOrDatumDef.title;
  }
  const fieldDef = fieldOrDatumDef;
  const def = includeDefault ? defaultTitle(fieldDef, config) : void 0;
  if (allowDisabling) {
    return getFirstDefined(guideTitle, fieldDef.title, def);
  } else {
    return guideTitle ?? fieldDef.title ?? def;
  }
}
function getGuide(fieldDef) {
  if (isPositionFieldOrDatumDef(fieldDef) && fieldDef.axis) {
    return fieldDef.axis;
  } else if (isMarkPropFieldOrDatumDef(fieldDef) && fieldDef.legend) {
    return fieldDef.legend;
  } else if (isFacetFieldDef(fieldDef) && fieldDef.header) {
    return fieldDef.header;
  }
  return void 0;
}
function defaultTitle(fieldDef, config) {
  return titleFormatter(fieldDef, config);
}
function getFormatMixins(fieldDef) {
  if (isStringFieldOrDatumDef(fieldDef)) {
    const { format, formatType } = fieldDef;
    return { format, formatType };
  } else {
    const guide = getGuide(fieldDef) ?? {};
    const { format, formatType } = guide;
    return { format, formatType };
  }
}
function defaultType$2(fieldDef, channel) {
  var _a2;
  switch (channel) {
    case "latitude":
    case "longitude":
      return "quantitative";
    case "row":
    case "column":
    case "facet":
    case "shape":
    case "strokeDash":
      return "nominal";
    case "order":
      return "ordinal";
  }
  if (isSortableFieldDef(fieldDef) && isArray(fieldDef.sort)) {
    return "ordinal";
  }
  const { aggregate, bin: bin2, timeUnit } = fieldDef;
  if (timeUnit) {
    return "temporal";
  }
  if (bin2 || aggregate && !isArgmaxDef(aggregate) && !isArgminDef(aggregate)) {
    return "quantitative";
  }
  if (isScaleFieldDef(fieldDef) && ((_a2 = fieldDef.scale) == null ? void 0 : _a2.type)) {
    switch (SCALE_CATEGORY_INDEX[fieldDef.scale.type]) {
      case "numeric":
      case "discretizing":
        return "quantitative";
      case "time":
        return "temporal";
    }
  }
  return "nominal";
}
function getFieldDef(channelDef) {
  if (isFieldDef(channelDef)) {
    return channelDef;
  } else if (hasConditionalFieldDef(channelDef)) {
    return channelDef.condition;
  }
  return void 0;
}
function getFieldOrDatumDef(channelDef) {
  if (isFieldOrDatumDef(channelDef)) {
    return channelDef;
  } else if (hasConditionalFieldOrDatumDef(channelDef)) {
    return channelDef.condition;
  }
  return void 0;
}
function initChannelDef(channelDef, channel, config, opt = {}) {
  if (isString(channelDef) || isNumber(channelDef) || isBoolean$1(channelDef)) {
    const primitiveType = isString(channelDef) ? "string" : isNumber(channelDef) ? "number" : "boolean";
    warn(primitiveChannelDef(channel, primitiveType, channelDef));
    return { value: channelDef };
  }
  if (isFieldOrDatumDef(channelDef)) {
    return initFieldOrDatumDef(channelDef, channel, config, opt);
  } else if (hasConditionalFieldOrDatumDef(channelDef)) {
    return {
      ...channelDef,
      // Need to cast as normalizeFieldDef normally return FieldDef, but here we know that it is definitely Condition<FieldDef>
      condition: initFieldOrDatumDef(channelDef.condition, channel, config, opt)
    };
  }
  return channelDef;
}
function initFieldOrDatumDef(fd, channel, config, opt) {
  if (isStringFieldOrDatumDef(fd)) {
    const { format, formatType, ...rest } = fd;
    if (isCustomFormatType(formatType) && !config.customFormatTypes) {
      warn(customFormatTypeNotAllowed(channel));
      return initFieldOrDatumDef(rest, channel, config, opt);
    }
  } else {
    const guideType = isPositionFieldOrDatumDef(fd) ? "axis" : isMarkPropFieldOrDatumDef(fd) ? "legend" : isFacetFieldDef(fd) ? "header" : null;
    if (guideType && fd[guideType]) {
      const { format, formatType, ...newGuide } = fd[guideType];
      if (isCustomFormatType(formatType) && !config.customFormatTypes) {
        warn(customFormatTypeNotAllowed(channel));
        return initFieldOrDatumDef({ ...fd, [guideType]: newGuide }, channel, config, opt);
      }
    }
  }
  if (isFieldDef(fd)) {
    return initFieldDef(fd, channel, opt);
  }
  return initDatumDef(fd);
}
function initDatumDef(datumDef) {
  let type2 = datumDef["type"];
  if (type2) {
    return datumDef;
  }
  const { datum } = datumDef;
  type2 = isNumber(datum) ? "quantitative" : isString(datum) ? "nominal" : isDateTime(datum) ? "temporal" : void 0;
  return { ...datumDef, type: type2 };
}
function initFieldDef(fd, channel, { compositeMark = false } = {}) {
  const { aggregate, timeUnit, bin: bin2, field } = fd;
  const fieldDef = { ...fd };
  if (!compositeMark && aggregate && !isAggregateOp(aggregate) && !isArgmaxDef(aggregate) && !isArgminDef(aggregate)) {
    warn(invalidAggregate(aggregate));
    delete fieldDef.aggregate;
  }
  if (timeUnit) {
    fieldDef.timeUnit = normalizeTimeUnit(timeUnit);
  }
  if (field) {
    fieldDef.field = `${field}`;
  }
  if (isBinning(bin2)) {
    fieldDef.bin = normalizeBin(bin2, channel);
  }
  if (isBinned(bin2) && !isXorY(channel)) {
    warn(channelShouldNotBeUsedForBinned(channel));
  }
  if (isTypedFieldDef(fieldDef)) {
    const { type: type2 } = fieldDef;
    const fullType = getFullName(type2);
    if (type2 !== fullType) {
      fieldDef.type = fullType;
    }
    if (type2 !== "quantitative") {
      if (isCountingAggregateOp(aggregate)) {
        warn(invalidFieldTypeForCountAggregate(type2, aggregate));
        fieldDef.type = "quantitative";
      }
    }
  } else if (!isSecondaryRangeChannel(channel)) {
    const newType = defaultType$2(fieldDef, channel);
    fieldDef["type"] = newType;
  }
  if (isTypedFieldDef(fieldDef)) {
    const { compatible, warning } = channelCompatibility(fieldDef, channel) || {};
    if (compatible === false) {
      warn(warning);
    }
  }
  if (isSortableFieldDef(fieldDef) && isString(fieldDef.sort)) {
    const { sort } = fieldDef;
    if (isSortByChannel(sort)) {
      return {
        ...fieldDef,
        sort: { encoding: sort }
      };
    }
    const sub = sort.substr(1);
    if (sort.charAt(0) === "-" && isSortByChannel(sub)) {
      return {
        ...fieldDef,
        sort: { encoding: sub, order: "descending" }
      };
    }
  }
  if (isFacetFieldDef(fieldDef)) {
    const { header } = fieldDef;
    if (header) {
      const { orient: orient2, ...rest } = header;
      if (orient2) {
        return {
          ...fieldDef,
          header: {
            ...rest,
            labelOrient: header.labelOrient || orient2,
            titleOrient: header.titleOrient || orient2
          }
        };
      }
    }
  }
  return fieldDef;
}
function normalizeBin(bin2, channel) {
  if (isBoolean$1(bin2)) {
    return { maxbins: autoMaxBins(channel) };
  } else if (bin2 === "binned") {
    return {
      binned: true
    };
  } else if (!bin2.maxbins && !bin2.step) {
    return { ...bin2, maxbins: autoMaxBins(channel) };
  } else {
    return bin2;
  }
}
const COMPATIBLE = { compatible: true };
function channelCompatibility(fieldDef, channel) {
  const type2 = fieldDef.type;
  if (type2 === "geojson" && channel !== "shape") {
    return {
      compatible: false,
      warning: `Channel ${channel} should not be used with a geojson data.`
    };
  }
  switch (channel) {
    case ROW:
    case COLUMN:
    case FACET:
      if (!isDiscrete(fieldDef)) {
        return {
          compatible: false,
          warning: channelShouldBeDiscrete(channel)
        };
      }
      return COMPATIBLE;
    case X:
    case Y:
    case XOFFSET:
    case YOFFSET:
    case COLOR:
    case FILL:
    case STROKE:
    case TEXT$1:
    case DETAIL:
    case KEY:
    case TOOLTIP:
    case HREF:
    case URL$1:
    case ANGLE:
    case THETA:
    case RADIUS:
    case DESCRIPTION:
      return COMPATIBLE;
    case LONGITUDE:
    case LONGITUDE2:
    case LATITUDE:
    case LATITUDE2:
      if (type2 !== QUANTITATIVE) {
        return {
          compatible: false,
          warning: `Channel ${channel} should be used with a quantitative field only, not ${fieldDef.type} field.`
        };
      }
      return COMPATIBLE;
    case OPACITY:
    case FILLOPACITY:
    case STROKEOPACITY:
    case STROKEWIDTH:
    case SIZE:
    case THETA2:
    case RADIUS2:
    case X2:
    case Y2:
      if (type2 === "nominal" && !fieldDef["sort"]) {
        return {
          compatible: false,
          warning: `Channel ${channel} should not be used with an unsorted discrete field.`
        };
      }
      return COMPATIBLE;
    case SHAPE:
    case STROKEDASH:
      if (!isDiscrete(fieldDef) && !isDiscretizing(fieldDef)) {
        return {
          compatible: false,
          warning: channelShouldBeDiscreteOrDiscretizing(channel)
        };
      }
      return COMPATIBLE;
    case ORDER:
      if (fieldDef.type === "nominal" && !("sort" in fieldDef)) {
        return {
          compatible: false,
          warning: `Channel order is inappropriate for nominal field, which has no inherent order.`
        };
      }
      return COMPATIBLE;
  }
}
function isFieldOrDatumDefForTimeFormat(fieldOrDatumDef) {
  const { formatType } = getFormatMixins(fieldOrDatumDef);
  return formatType === "time" || !formatType && isTimeFieldDef(fieldOrDatumDef);
}
function isTimeFieldDef(def) {
  return def && (def["type"] === "temporal" || isFieldDef(def) && !!def.timeUnit);
}
function valueExpr(v, { timeUnit, type: type2, wrapTime, undefinedIfExprNotRequired }) {
  var _a2;
  const unit = timeUnit && ((_a2 = normalizeTimeUnit(timeUnit)) == null ? void 0 : _a2.unit);
  let isTime = unit || type2 === "temporal";
  let expr;
  if (isExprRef(v)) {
    expr = v.expr;
  } else if (isSignalRef(v)) {
    expr = v.signal;
  } else if (isDateTime(v)) {
    isTime = true;
    expr = dateTimeToExpr(v);
  } else if (isString(v) || isNumber(v)) {
    if (isTime) {
      expr = `datetime(${stringify(v)})`;
      if (isLocalSingleTimeUnit(unit)) {
        if (isNumber(v) && v < 1e4 || isString(v) && isNaN(Date.parse(v))) {
          expr = dateTimeToExpr({ [unit]: v });
        }
      }
    }
  }
  if (expr) {
    return wrapTime && isTime ? `time(${expr})` : expr;
  }
  return undefinedIfExprNotRequired ? void 0 : stringify(v);
}
function valueArray(fieldOrDatumDef, values2) {
  const { type: type2 } = fieldOrDatumDef;
  return values2.map((v) => {
    const timeUnit = isFieldDef(fieldOrDatumDef) && !isBinnedTimeUnit(fieldOrDatumDef.timeUnit) ? fieldOrDatumDef.timeUnit : void 0;
    const expr = valueExpr(v, {
      timeUnit,
      type: type2,
      undefinedIfExprNotRequired: true
    });
    if (expr !== void 0) {
      return { signal: expr };
    }
    return v;
  });
}
function binRequiresRange(fieldDef, channel) {
  if (!isBinning(fieldDef.bin)) {
    console.warn("Only call this method for binned field defs.");
    return false;
  }
  return isScaleChannel(channel) && ["ordinal", "nominal"].includes(fieldDef.type);
}
const CONDITIONAL_AXIS_PROP_INDEX = {
  labelAlign: {
    part: "labels",
    vgProp: "align"
  },
  labelBaseline: {
    part: "labels",
    vgProp: "baseline"
  },
  labelColor: {
    part: "labels",
    vgProp: "fill"
  },
  labelFont: {
    part: "labels",
    vgProp: "font"
  },
  labelFontSize: {
    part: "labels",
    vgProp: "fontSize"
  },
  labelFontStyle: {
    part: "labels",
    vgProp: "fontStyle"
  },
  labelFontWeight: {
    part: "labels",
    vgProp: "fontWeight"
  },
  labelOpacity: {
    part: "labels",
    vgProp: "opacity"
  },
  labelOffset: null,
  labelPadding: null,
  gridColor: {
    part: "grid",
    vgProp: "stroke"
  },
  gridDash: {
    part: "grid",
    vgProp: "strokeDash"
  },
  gridDashOffset: {
    part: "grid",
    vgProp: "strokeDashOffset"
  },
  gridOpacity: {
    part: "grid",
    vgProp: "opacity"
  },
  gridWidth: {
    part: "grid",
    vgProp: "strokeWidth"
  },
  tickColor: {
    part: "ticks",
    vgProp: "stroke"
  },
  tickDash: {
    part: "ticks",
    vgProp: "strokeDash"
  },
  tickDashOffset: {
    part: "ticks",
    vgProp: "strokeDashOffset"
  },
  tickOpacity: {
    part: "ticks",
    vgProp: "opacity"
  },
  tickSize: null,
  tickWidth: {
    part: "ticks",
    vgProp: "strokeWidth"
  }
};
function isConditionalAxisValue(v) {
  return v == null ? void 0 : v.condition;
}
const AXIS_PARTS = ["domain", "grid", "labels", "ticks", "title"];
const AXIS_PROPERTY_TYPE = {
  grid: "grid",
  gridCap: "grid",
  gridColor: "grid",
  gridDash: "grid",
  gridDashOffset: "grid",
  gridOpacity: "grid",
  gridScale: "grid",
  gridWidth: "grid",
  orient: "main",
  bandPosition: "both",
  aria: "main",
  description: "main",
  domain: "main",
  domainCap: "main",
  domainColor: "main",
  domainDash: "main",
  domainDashOffset: "main",
  domainOpacity: "main",
  domainWidth: "main",
  format: "main",
  formatType: "main",
  labelAlign: "main",
  labelAngle: "main",
  labelBaseline: "main",
  labelBound: "main",
  labelColor: "main",
  labelFlush: "main",
  labelFlushOffset: "main",
  labelFont: "main",
  labelFontSize: "main",
  labelFontStyle: "main",
  labelFontWeight: "main",
  labelLimit: "main",
  labelLineHeight: "main",
  labelOffset: "main",
  labelOpacity: "main",
  labelOverlap: "main",
  labelPadding: "main",
  labels: "main",
  labelSeparation: "main",
  maxExtent: "main",
  minExtent: "main",
  offset: "both",
  position: "main",
  tickCap: "main",
  tickColor: "main",
  tickDash: "main",
  tickDashOffset: "main",
  tickMinStep: "both",
  tickOffset: "both",
  tickOpacity: "main",
  tickRound: "both",
  ticks: "main",
  tickSize: "main",
  tickWidth: "both",
  title: "main",
  titleAlign: "main",
  titleAnchor: "main",
  titleAngle: "main",
  titleBaseline: "main",
  titleColor: "main",
  titleFont: "main",
  titleFontSize: "main",
  titleFontStyle: "main",
  titleFontWeight: "main",
  titleLimit: "main",
  titleLineHeight: "main",
  titleOpacity: "main",
  titlePadding: "main",
  titleX: "main",
  titleY: "main",
  encode: "both",
  scale: "both",
  tickBand: "both",
  tickCount: "both",
  tickExtra: "both",
  translate: "both",
  values: "both",
  zindex: "both"
  // this is actually set afterward, so it doesn't matter
};
const COMMON_AXIS_PROPERTIES_INDEX = {
  orient: 1,
  aria: 1,
  bandPosition: 1,
  description: 1,
  domain: 1,
  domainCap: 1,
  domainColor: 1,
  domainDash: 1,
  domainDashOffset: 1,
  domainOpacity: 1,
  domainWidth: 1,
  format: 1,
  formatType: 1,
  grid: 1,
  gridCap: 1,
  gridColor: 1,
  gridDash: 1,
  gridDashOffset: 1,
  gridOpacity: 1,
  gridWidth: 1,
  labelAlign: 1,
  labelAngle: 1,
  labelBaseline: 1,
  labelBound: 1,
  labelColor: 1,
  labelFlush: 1,
  labelFlushOffset: 1,
  labelFont: 1,
  labelFontSize: 1,
  labelFontStyle: 1,
  labelFontWeight: 1,
  labelLimit: 1,
  labelLineHeight: 1,
  labelOffset: 1,
  labelOpacity: 1,
  labelOverlap: 1,
  labelPadding: 1,
  labels: 1,
  labelSeparation: 1,
  maxExtent: 1,
  minExtent: 1,
  offset: 1,
  position: 1,
  tickBand: 1,
  tickCap: 1,
  tickColor: 1,
  tickCount: 1,
  tickDash: 1,
  tickDashOffset: 1,
  tickExtra: 1,
  tickMinStep: 1,
  tickOffset: 1,
  tickOpacity: 1,
  tickRound: 1,
  ticks: 1,
  tickSize: 1,
  tickWidth: 1,
  title: 1,
  titleAlign: 1,
  titleAnchor: 1,
  titleAngle: 1,
  titleBaseline: 1,
  titleColor: 1,
  titleFont: 1,
  titleFontSize: 1,
  titleFontStyle: 1,
  titleFontWeight: 1,
  titleLimit: 1,
  titleLineHeight: 1,
  titleOpacity: 1,
  titlePadding: 1,
  titleX: 1,
  titleY: 1,
  translate: 1,
  values: 1,
  zindex: 1
};
const AXIS_PROPERTIES_INDEX = {
  ...COMMON_AXIS_PROPERTIES_INDEX,
  style: 1,
  labelExpr: 1,
  encoding: 1
};
function isAxisProperty(prop) {
  return !!AXIS_PROPERTIES_INDEX[prop];
}
const AXIS_CONFIGS_INDEX = {
  axis: 1,
  axisBand: 1,
  axisBottom: 1,
  axisDiscrete: 1,
  axisLeft: 1,
  axisPoint: 1,
  axisQuantitative: 1,
  axisRight: 1,
  axisTemporal: 1,
  axisTop: 1,
  axisX: 1,
  axisXBand: 1,
  axisXDiscrete: 1,
  axisXPoint: 1,
  axisXQuantitative: 1,
  axisXTemporal: 1,
  axisY: 1,
  axisYBand: 1,
  axisYDiscrete: 1,
  axisYPoint: 1,
  axisYQuantitative: 1,
  axisYTemporal: 1
};
const AXIS_CONFIGS = keys(AXIS_CONFIGS_INDEX);
function isUnitSpec(spec) {
  return "mark" in spec;
}
class CompositeMarkNormalizer {
  constructor(name2, run) {
    this.name = name2;
    this.run = run;
  }
  hasMatchingType(spec) {
    if (isUnitSpec(spec)) {
      return getMarkType(spec.mark) === this.name;
    }
    return false;
  }
}
function channelHasField(encoding, channel) {
  const channelDef = encoding && encoding[channel];
  if (channelDef) {
    if (isArray(channelDef)) {
      return some(channelDef, (fieldDef) => !!fieldDef.field);
    } else {
      return isFieldDef(channelDef) || hasConditionalFieldDef(channelDef);
    }
  }
  return false;
}
function channelHasFieldOrDatum(encoding, channel) {
  const channelDef = encoding && encoding[channel];
  if (channelDef) {
    if (isArray(channelDef)) {
      return some(channelDef, (fieldDef) => !!fieldDef.field);
    } else {
      return isFieldDef(channelDef) || isDatumDef(channelDef) || hasConditionalFieldOrDatumDef(channelDef);
    }
  }
  return false;
}
function channelHasNestedOffsetScale(encoding, channel) {
  if (isXorY(channel)) {
    const fieldDef = encoding[channel];
    if ((isFieldDef(fieldDef) || isDatumDef(fieldDef)) && (isDiscrete$1(fieldDef.type) || isFieldDef(fieldDef) && fieldDef.timeUnit)) {
      const offsetChannel = getOffsetScaleChannel(channel);
      return channelHasFieldOrDatum(encoding, offsetChannel);
    }
  }
  return false;
}
function isAggregate$1(encoding) {
  return some(CHANNELS, (channel) => {
    if (channelHasField(encoding, channel)) {
      const channelDef = encoding[channel];
      if (isArray(channelDef)) {
        return some(channelDef, (fieldDef) => !!fieldDef.aggregate);
      } else {
        const fieldDef = getFieldDef(channelDef);
        return fieldDef && !!fieldDef.aggregate;
      }
    }
    return false;
  });
}
function extractTransformsFromEncoding(oldEncoding, config) {
  const groupby = [];
  const bins2 = [];
  const timeUnits = [];
  const aggregate = [];
  const encoding = {};
  forEach(oldEncoding, (channelDef, channel) => {
    if (isFieldDef(channelDef)) {
      const { field, aggregate: aggOp, bin: bin2, timeUnit, ...remaining } = channelDef;
      if (aggOp || timeUnit || bin2) {
        const guide = getGuide(channelDef);
        const isTitleDefined = guide == null ? void 0 : guide.title;
        let newField = vgField(channelDef, { forAs: true });
        const newFieldDef = {
          // Only add title if it doesn't exist
          ...isTitleDefined ? [] : { title: title(channelDef, config, { allowDisabling: true }) },
          ...remaining,
          // Always overwrite field
          field: newField
        };
        if (aggOp) {
          let op;
          if (isArgmaxDef(aggOp)) {
            op = "argmax";
            newField = vgField({ op: "argmax", field: aggOp.argmax }, { forAs: true });
            newFieldDef.field = `${newField}.${field}`;
          } else if (isArgminDef(aggOp)) {
            op = "argmin";
            newField = vgField({ op: "argmin", field: aggOp.argmin }, { forAs: true });
            newFieldDef.field = `${newField}.${field}`;
          } else if (aggOp !== "boxplot" && aggOp !== "errorbar" && aggOp !== "errorband") {
            op = aggOp;
          }
          if (op) {
            const aggregateEntry = {
              op,
              as: newField
            };
            if (field) {
              aggregateEntry.field = field;
            }
            aggregate.push(aggregateEntry);
          }
        } else {
          groupby.push(newField);
          if (isTypedFieldDef(channelDef) && isBinning(bin2)) {
            bins2.push({ bin: bin2, field, as: newField });
            groupby.push(vgField(channelDef, { binSuffix: "end" }));
            if (binRequiresRange(channelDef, channel)) {
              groupby.push(vgField(channelDef, { binSuffix: "range" }));
            }
            if (isXorY(channel)) {
              const secondaryChannel = {
                field: `${newField}_end`
              };
              encoding[`${channel}2`] = secondaryChannel;
            }
            newFieldDef.bin = "binned";
            if (!isSecondaryRangeChannel(channel)) {
              newFieldDef["type"] = QUANTITATIVE;
            }
          } else if (timeUnit && !isBinnedTimeUnit(timeUnit)) {
            timeUnits.push({
              timeUnit,
              field,
              as: newField
            });
            const formatType = isTypedFieldDef(channelDef) && channelDef.type !== TEMPORAL && "time";
            if (formatType) {
              if (channel === TEXT$1 || channel === TOOLTIP) {
                newFieldDef["formatType"] = formatType;
              } else if (isNonPositionScaleChannel(channel)) {
                newFieldDef["legend"] = {
                  formatType,
                  ...newFieldDef["legend"]
                };
              } else if (isXorY(channel)) {
                newFieldDef["axis"] = {
                  formatType,
                  ...newFieldDef["axis"]
                };
              }
            }
          }
        }
        encoding[channel] = newFieldDef;
      } else {
        groupby.push(field);
        encoding[channel] = oldEncoding[channel];
      }
    } else {
      encoding[channel] = oldEncoding[channel];
    }
  });
  return {
    bins: bins2,
    timeUnits,
    aggregate,
    groupby,
    encoding
  };
}
function markChannelCompatible(encoding, channel, mark) {
  const markSupported = supportMark(channel, mark);
  if (!markSupported) {
    return false;
  } else if (markSupported === "binned") {
    const primaryFieldDef = encoding[channel === X2 ? X : Y];
    if (isFieldDef(primaryFieldDef) && isFieldDef(encoding[channel]) && isBinned(primaryFieldDef.bin)) {
      return true;
    } else {
      return false;
    }
  }
  return true;
}
function initEncoding(encoding, mark, filled, config) {
  const normalizedEncoding = {};
  for (const key of keys(encoding)) {
    if (!isChannel(key)) {
      warn(invalidEncodingChannel(key));
    }
  }
  for (let channel of UNIT_CHANNELS) {
    if (!encoding[channel]) {
      continue;
    }
    const channelDef = encoding[channel];
    if (isXorYOffset(channel)) {
      const mainChannel = getMainChannelFromOffsetChannel(channel);
      const positionDef = normalizedEncoding[mainChannel];
      if (isFieldDef(positionDef)) {
        if (isContinuous(positionDef.type)) {
          if (isFieldDef(channelDef) && !positionDef.timeUnit) {
            warn(offsetNestedInsideContinuousPositionScaleDropped(mainChannel));
            continue;
          }
        }
      } else {
        channel = mainChannel;
        warn(replaceOffsetWithMainChannel(mainChannel));
      }
    }
    if (channel === "angle" && mark === "arc" && !encoding.theta) {
      warn(REPLACE_ANGLE_WITH_THETA);
      channel = THETA;
    }
    if (!markChannelCompatible(encoding, channel, mark)) {
      warn(incompatibleChannel(channel, mark));
      continue;
    }
    if (channel === SIZE && mark === "line") {
      const fieldDef = getFieldDef(encoding[channel]);
      if (fieldDef == null ? void 0 : fieldDef.aggregate) {
        warn(LINE_WITH_VARYING_SIZE);
        continue;
      }
    }
    if (channel === COLOR && (filled ? "fill" in encoding : "stroke" in encoding)) {
      warn(droppingColor("encoding", { fill: "fill" in encoding, stroke: "stroke" in encoding }));
      continue;
    }
    if (channel === DETAIL || channel === ORDER && !isArray(channelDef) && !isValueDef(channelDef) || channel === TOOLTIP && isArray(channelDef)) {
      if (channelDef) {
        if (channel === ORDER) {
          const def = encoding[channel];
          if (isOrderOnlyDef(def)) {
            normalizedEncoding[channel] = def;
            continue;
          }
        }
        normalizedEncoding[channel] = array(channelDef).reduce((defs, fieldDef) => {
          if (!isFieldDef(fieldDef)) {
            warn(emptyFieldDef(fieldDef, channel));
          } else {
            defs.push(initFieldDef(fieldDef, channel));
          }
          return defs;
        }, []);
      }
    } else {
      if (channel === TOOLTIP && channelDef === null) {
        normalizedEncoding[channel] = null;
      } else if (!isFieldDef(channelDef) && !isDatumDef(channelDef) && !isValueDef(channelDef) && !isConditionalDef(channelDef) && !isSignalRef(channelDef)) {
        warn(emptyFieldDef(channelDef, channel));
        continue;
      }
      normalizedEncoding[channel] = initChannelDef(channelDef, channel, config);
    }
  }
  return normalizedEncoding;
}
function normalizeEncoding(encoding, config) {
  const normalizedEncoding = {};
  for (const channel of keys(encoding)) {
    const newChannelDef = initChannelDef(encoding[channel], channel, config, { compositeMark: true });
    normalizedEncoding[channel] = newChannelDef;
  }
  return normalizedEncoding;
}
function fieldDefs(encoding) {
  const arr = [];
  for (const channel of keys(encoding)) {
    if (channelHasField(encoding, channel)) {
      const channelDef = encoding[channel];
      const channelDefArray = array(channelDef);
      for (const def of channelDefArray) {
        if (isFieldDef(def)) {
          arr.push(def);
        } else if (hasConditionalFieldDef(def)) {
          arr.push(def.condition);
        }
      }
    }
  }
  return arr;
}
function forEach(mapping, f, thisArg) {
  if (!mapping) {
    return;
  }
  for (const channel of keys(mapping)) {
    const el = mapping[channel];
    if (isArray(el)) {
      for (const channelDef of el) {
        f.call(thisArg, channelDef, channel);
      }
    } else {
      f.call(thisArg, el, channel);
    }
  }
}
function reduce(mapping, f, init2, thisArg) {
  if (!mapping) {
    return init2;
  }
  return keys(mapping).reduce((r, channel) => {
    const map = mapping[channel];
    if (isArray(map)) {
      return map.reduce((r1, channelDef) => {
        return f.call(thisArg, r1, channelDef, channel);
      }, r);
    } else {
      return f.call(thisArg, r, map, channel);
    }
  }, init2);
}
function pathGroupingFields(mark, encoding) {
  return keys(encoding).reduce((details, channel) => {
    switch (channel) {
      case X:
      case Y:
      case HREF:
      case DESCRIPTION:
      case URL$1:
      case X2:
      case Y2:
      case XOFFSET:
      case YOFFSET:
      case THETA:
      case THETA2:
      case RADIUS:
      case RADIUS2:
      case LATITUDE:
      case LONGITUDE:
      case LATITUDE2:
      case LONGITUDE2:
      case TEXT$1:
      case SHAPE:
      case ANGLE:
      case TOOLTIP:
        return details;
      case ORDER:
        if (mark === "line" || mark === "trail") {
          return details;
        }
      case DETAIL:
      case KEY: {
        const channelDef = encoding[channel];
        if (isArray(channelDef) || isFieldDef(channelDef)) {
          for (const fieldDef of array(channelDef)) {
            if (!fieldDef.aggregate) {
              details.push(vgField(fieldDef, {}));
            }
          }
        }
        return details;
      }
      case SIZE:
        if (mark === "trail") {
          return details;
        }
      case COLOR:
      case FILL:
      case STROKE:
      case OPACITY:
      case FILLOPACITY:
      case STROKEOPACITY:
      case STROKEDASH:
      case STROKEWIDTH: {
        const fieldDef = getFieldDef(encoding[channel]);
        if (fieldDef && !fieldDef.aggregate) {
          details.push(vgField(fieldDef, {}));
        }
        return details;
      }
    }
  }, []);
}
function filterTooltipWithAggregatedField(oldEncoding) {
  const { tooltip: tooltip2, ...filteredEncoding } = oldEncoding;
  if (!tooltip2) {
    return { filteredEncoding };
  }
  let customTooltipWithAggregatedField;
  let customTooltipWithoutAggregatedField;
  if (isArray(tooltip2)) {
    for (const t2 of tooltip2) {
      if (t2.aggregate) {
        if (!customTooltipWithAggregatedField) {
          customTooltipWithAggregatedField = [];
        }
        customTooltipWithAggregatedField.push(t2);
      } else {
        if (!customTooltipWithoutAggregatedField) {
          customTooltipWithoutAggregatedField = [];
        }
        customTooltipWithoutAggregatedField.push(t2);
      }
    }
    if (customTooltipWithAggregatedField) {
      filteredEncoding.tooltip = customTooltipWithAggregatedField;
    }
  } else {
    if (tooltip2["aggregate"]) {
      filteredEncoding.tooltip = tooltip2;
    } else {
      customTooltipWithoutAggregatedField = tooltip2;
    }
  }
  if (isArray(customTooltipWithoutAggregatedField) && customTooltipWithoutAggregatedField.length === 1) {
    customTooltipWithoutAggregatedField = customTooltipWithoutAggregatedField[0];
  }
  return { customTooltipWithoutAggregatedField, filteredEncoding };
}
function getCompositeMarkTooltip(tooltipSummary, continuousAxisChannelDef, encodingWithoutContinuousAxis, withFieldName = true) {
  if ("tooltip" in encodingWithoutContinuousAxis) {
    return { tooltip: encodingWithoutContinuousAxis.tooltip };
  }
  const fiveSummaryTooltip = tooltipSummary.map(({ fieldPrefix, titlePrefix }) => {
    const mainTitle = withFieldName ? ` of ${getTitle(continuousAxisChannelDef)}` : "";
    return {
      field: fieldPrefix + continuousAxisChannelDef.field,
      type: continuousAxisChannelDef.type,
      title: isSignalRef(titlePrefix) ? { signal: `${titlePrefix}"${escape(mainTitle)}"` } : titlePrefix + mainTitle
    };
  });
  const tooltipFieldDefs = fieldDefs(encodingWithoutContinuousAxis).map(toStringFieldDef);
  return {
    tooltip: [
      ...fiveSummaryTooltip,
      // need to cast because TextFieldDef supports fewer types of bin
      ...unique(tooltipFieldDefs, hash)
    ]
  };
}
function getTitle(continuousAxisChannelDef) {
  const { title: title2, field } = continuousAxisChannelDef;
  return getFirstDefined(title2, field);
}
function makeCompositeAggregatePartFactory(compositeMarkDef, continuousAxis, continuousAxisChannelDef, sharedEncoding, compositeMarkConfig) {
  const { scale, axis } = continuousAxisChannelDef;
  return ({ partName, mark, positionPrefix, endPositionPrefix = void 0, extraEncoding = {} }) => {
    const title2 = getTitle(continuousAxisChannelDef);
    return partLayerMixins(compositeMarkDef, partName, compositeMarkConfig, {
      mark,
      encoding: {
        [continuousAxis]: {
          field: `${positionPrefix}_${continuousAxisChannelDef.field}`,
          type: continuousAxisChannelDef.type,
          ...title2 !== void 0 ? { title: title2 } : {},
          ...scale !== void 0 ? { scale } : {},
          ...axis !== void 0 ? { axis } : {}
        },
        ...isString(endPositionPrefix) ? {
          [`${continuousAxis}2`]: {
            field: `${endPositionPrefix}_${continuousAxisChannelDef.field}`
          }
        } : {},
        ...sharedEncoding,
        ...extraEncoding
      }
    });
  };
}
function partLayerMixins(markDef, part, compositeMarkConfig, partBaseSpec) {
  const { clip, color: color2, opacity: opacity2 } = markDef;
  const mark = markDef.type;
  if (markDef[part] || markDef[part] === void 0 && compositeMarkConfig[part]) {
    return [
      {
        ...partBaseSpec,
        mark: {
          ...compositeMarkConfig[part],
          ...clip ? { clip } : {},
          ...color2 ? { color: color2 } : {},
          ...opacity2 ? { opacity: opacity2 } : {},
          ...isMarkDef(partBaseSpec.mark) ? partBaseSpec.mark : { type: partBaseSpec.mark },
          style: `${mark}-${String(part)}`,
          ...isBoolean$1(markDef[part]) ? {} : markDef[part]
        }
      }
    ];
  }
  return [];
}
function compositeMarkContinuousAxis(spec, orient2, compositeMark) {
  const { encoding } = spec;
  const continuousAxis = orient2 === "vertical" ? "y" : "x";
  const continuousAxisChannelDef = encoding[continuousAxis];
  const continuousAxisChannelDef2 = encoding[`${continuousAxis}2`];
  const continuousAxisChannelDefError = encoding[`${continuousAxis}Error`];
  const continuousAxisChannelDefError2 = encoding[`${continuousAxis}Error2`];
  return {
    continuousAxisChannelDef: filterAggregateFromChannelDef(continuousAxisChannelDef, compositeMark),
    continuousAxisChannelDef2: filterAggregateFromChannelDef(continuousAxisChannelDef2, compositeMark),
    continuousAxisChannelDefError: filterAggregateFromChannelDef(continuousAxisChannelDefError, compositeMark),
    continuousAxisChannelDefError2: filterAggregateFromChannelDef(continuousAxisChannelDefError2, compositeMark),
    continuousAxis
  };
}
function filterAggregateFromChannelDef(continuousAxisChannelDef, compositeMark) {
  if (continuousAxisChannelDef == null ? void 0 : continuousAxisChannelDef.aggregate) {
    const { aggregate, ...continuousAxisWithoutAggregate } = continuousAxisChannelDef;
    if (aggregate !== compositeMark) {
      warn(errorBarContinuousAxisHasCustomizedAggregate(aggregate, compositeMark));
    }
    return continuousAxisWithoutAggregate;
  } else {
    return continuousAxisChannelDef;
  }
}
function compositeMarkOrient(spec, compositeMark) {
  const { mark, encoding } = spec;
  const { x, y } = encoding;
  if (isMarkDef(mark) && mark.orient) {
    return mark.orient;
  }
  if (isContinuousFieldOrDatumDef(x)) {
    if (isContinuousFieldOrDatumDef(y)) {
      const xAggregate = isFieldDef(x) && x.aggregate;
      const yAggregate = isFieldDef(y) && y.aggregate;
      if (!xAggregate && yAggregate === compositeMark) {
        return "vertical";
      } else if (!yAggregate && xAggregate === compositeMark) {
        return "horizontal";
      } else if (xAggregate === compositeMark && yAggregate === compositeMark) {
        throw new Error("Both x and y cannot have aggregate");
      } else {
        if (isFieldOrDatumDefForTimeFormat(y) && !isFieldOrDatumDefForTimeFormat(x)) {
          return "horizontal";
        }
        return "vertical";
      }
    }
    return "horizontal";
  } else if (isContinuousFieldOrDatumDef(y)) {
    return "vertical";
  } else {
    throw new Error(`Need a valid continuous axis for ${compositeMark}s`);
  }
}
const BOXPLOT = "boxplot";
const BOXPLOT_PARTS = ["box", "median", "outliers", "rule", "ticks"];
const boxPlotNormalizer = new CompositeMarkNormalizer(BOXPLOT, normalizeBoxPlot);
function getBoxPlotType(extent) {
  if (isNumber(extent)) {
    return "tukey";
  }
  return extent;
}
function normalizeBoxPlot(spec, { config }) {
  spec = {
    ...spec,
    encoding: normalizeEncoding(spec.encoding, config)
  };
  const { mark, encoding: _encoding, params, projection: _p, ...outerSpec } = spec;
  const markDef = isMarkDef(mark) ? mark : { type: mark };
  if (params) {
    warn(selectionNotSupported("boxplot"));
  }
  const extent = markDef.extent ?? config.boxplot.extent;
  const sizeValue = getMarkPropOrConfig(
    "size",
    markDef,
    // TODO: https://github.com/vega/vega-lite/issues/6245
    config
  );
  const invalid = markDef.invalid;
  const boxPlotType = getBoxPlotType(extent);
  const { bins: bins2, timeUnits, transform, continuousAxisChannelDef, continuousAxis, groupby, aggregate, encodingWithoutContinuousAxis, ticksOrient, boxOrient, customTooltipWithoutAggregatedField } = boxParams(spec, extent, config);
  const { color: color2, size, ...encodingWithoutSizeColorAndContinuousAxis } = encodingWithoutContinuousAxis;
  const makeBoxPlotPart = (sharedEncoding) => {
    return makeCompositeAggregatePartFactory(markDef, continuousAxis, continuousAxisChannelDef, sharedEncoding, config.boxplot);
  };
  const makeBoxPlotExtent = makeBoxPlotPart(encodingWithoutSizeColorAndContinuousAxis);
  const makeBoxPlotBox = makeBoxPlotPart(encodingWithoutContinuousAxis);
  const makeBoxPlotMidTick = makeBoxPlotPart({ ...encodingWithoutSizeColorAndContinuousAxis, ...size ? { size } : {} });
  const fiveSummaryTooltipEncoding = getCompositeMarkTooltip([
    { fieldPrefix: boxPlotType === "min-max" ? "upper_whisker_" : "max_", titlePrefix: "Max" },
    { fieldPrefix: "upper_box_", titlePrefix: "Q3" },
    { fieldPrefix: "mid_box_", titlePrefix: "Median" },
    { fieldPrefix: "lower_box_", titlePrefix: "Q1" },
    { fieldPrefix: boxPlotType === "min-max" ? "lower_whisker_" : "min_", titlePrefix: "Min" }
  ], continuousAxisChannelDef, encodingWithoutContinuousAxis);
  const endTick = { type: "tick", color: "black", opacity: 1, orient: ticksOrient, invalid, aria: false };
  const whiskerTooltipEncoding = boxPlotType === "min-max" ? fiveSummaryTooltipEncoding : (
    // for tukey / k-IQR, just show upper/lower-whisker
    getCompositeMarkTooltip([
      { fieldPrefix: "upper_whisker_", titlePrefix: "Upper Whisker" },
      { fieldPrefix: "lower_whisker_", titlePrefix: "Lower Whisker" }
    ], continuousAxisChannelDef, encodingWithoutContinuousAxis)
  );
  const whiskerLayers = [
    ...makeBoxPlotExtent({
      partName: "rule",
      mark: { type: "rule", invalid, aria: false },
      positionPrefix: "lower_whisker",
      endPositionPrefix: "lower_box",
      extraEncoding: whiskerTooltipEncoding
    }),
    ...makeBoxPlotExtent({
      partName: "rule",
      mark: { type: "rule", invalid, aria: false },
      positionPrefix: "upper_box",
      endPositionPrefix: "upper_whisker",
      extraEncoding: whiskerTooltipEncoding
    }),
    ...makeBoxPlotExtent({
      partName: "ticks",
      mark: endTick,
      positionPrefix: "lower_whisker",
      extraEncoding: whiskerTooltipEncoding
    }),
    ...makeBoxPlotExtent({
      partName: "ticks",
      mark: endTick,
      positionPrefix: "upper_whisker",
      extraEncoding: whiskerTooltipEncoding
    })
  ];
  const boxLayers = [
    ...boxPlotType !== "tukey" ? whiskerLayers : [],
    ...makeBoxPlotBox({
      partName: "box",
      mark: {
        type: "bar",
        ...sizeValue ? { size: sizeValue } : {},
        orient: boxOrient,
        invalid,
        ariaRoleDescription: "box"
      },
      positionPrefix: "lower_box",
      endPositionPrefix: "upper_box",
      extraEncoding: fiveSummaryTooltipEncoding
    }),
    ...makeBoxPlotMidTick({
      partName: "median",
      mark: {
        type: "tick",
        invalid,
        ...isObject(config.boxplot.median) && config.boxplot.median.color ? { color: config.boxplot.median.color } : {},
        ...sizeValue ? { size: sizeValue } : {},
        orient: ticksOrient,
        aria: false
      },
      positionPrefix: "mid_box",
      extraEncoding: fiveSummaryTooltipEncoding
    })
  ];
  if (boxPlotType === "min-max") {
    return {
      ...outerSpec,
      transform: (outerSpec.transform ?? []).concat(transform),
      layer: boxLayers
    };
  }
  const lowerBoxExpr = `datum["lower_box_${continuousAxisChannelDef.field}"]`;
  const upperBoxExpr = `datum["upper_box_${continuousAxisChannelDef.field}"]`;
  const iqrExpr = `(${upperBoxExpr} - ${lowerBoxExpr})`;
  const lowerWhiskerExpr = `${lowerBoxExpr} - ${extent} * ${iqrExpr}`;
  const upperWhiskerExpr = `${upperBoxExpr} + ${extent} * ${iqrExpr}`;
  const fieldExpr2 = `datum["${continuousAxisChannelDef.field}"]`;
  const joinaggregateTransform = {
    joinaggregate: boxParamsQuartiles(continuousAxisChannelDef.field),
    groupby
  };
  const filteredWhiskerSpec = {
    transform: [
      {
        filter: `(${lowerWhiskerExpr} <= ${fieldExpr2}) && (${fieldExpr2} <= ${upperWhiskerExpr})`
      },
      {
        aggregate: [
          {
            op: "min",
            field: continuousAxisChannelDef.field,
            as: `lower_whisker_${continuousAxisChannelDef.field}`
          },
          {
            op: "max",
            field: continuousAxisChannelDef.field,
            as: `upper_whisker_${continuousAxisChannelDef.field}`
          },
          // preserve lower_box / upper_box
          {
            op: "min",
            field: `lower_box_${continuousAxisChannelDef.field}`,
            as: `lower_box_${continuousAxisChannelDef.field}`
          },
          {
            op: "max",
            field: `upper_box_${continuousAxisChannelDef.field}`,
            as: `upper_box_${continuousAxisChannelDef.field}`
          },
          ...aggregate
        ],
        groupby
      }
    ],
    layer: whiskerLayers
  };
  const { tooltip: tooltip2, ...encodingWithoutSizeColorContinuousAxisAndTooltip } = encodingWithoutSizeColorAndContinuousAxis;
  const { scale, axis } = continuousAxisChannelDef;
  const title2 = getTitle(continuousAxisChannelDef);
  const axisWithoutTitle = omit(axis, ["title"]);
  const outlierLayersMixins = partLayerMixins(markDef, "outliers", config.boxplot, {
    transform: [{ filter: `(${fieldExpr2} < ${lowerWhiskerExpr}) || (${fieldExpr2} > ${upperWhiskerExpr})` }],
    mark: "point",
    encoding: {
      [continuousAxis]: {
        field: continuousAxisChannelDef.field,
        type: continuousAxisChannelDef.type,
        ...title2 !== void 0 ? { title: title2 } : {},
        ...scale !== void 0 ? { scale } : {},
        // add axis without title since we already added the title above
        ...isEmpty(axisWithoutTitle) ? {} : { axis: axisWithoutTitle }
      },
      ...encodingWithoutSizeColorContinuousAxisAndTooltip,
      ...color2 ? { color: color2 } : {},
      ...customTooltipWithoutAggregatedField ? { tooltip: customTooltipWithoutAggregatedField } : {}
    }
  })[0];
  let filteredLayersMixins;
  const filteredLayersMixinsTransforms = [...bins2, ...timeUnits, joinaggregateTransform];
  if (outlierLayersMixins) {
    filteredLayersMixins = {
      transform: filteredLayersMixinsTransforms,
      layer: [outlierLayersMixins, filteredWhiskerSpec]
    };
  } else {
    filteredLayersMixins = filteredWhiskerSpec;
    filteredLayersMixins.transform.unshift(...filteredLayersMixinsTransforms);
  }
  return {
    ...outerSpec,
    layer: [
      filteredLayersMixins,
      {
        // boxplot
        transform,
        layer: boxLayers
      }
    ]
  };
}
function boxParamsQuartiles(continousAxisField) {
  return [
    {
      op: "q1",
      field: continousAxisField,
      as: `lower_box_${continousAxisField}`
    },
    {
      op: "q3",
      field: continousAxisField,
      as: `upper_box_${continousAxisField}`
    }
  ];
}
function boxParams(spec, extent, config) {
  const orient2 = compositeMarkOrient(spec, BOXPLOT);
  const { continuousAxisChannelDef, continuousAxis } = compositeMarkContinuousAxis(spec, orient2, BOXPLOT);
  const continuousFieldName = continuousAxisChannelDef.field;
  const boxPlotType = getBoxPlotType(extent);
  const boxplotSpecificAggregate = [
    ...boxParamsQuartiles(continuousFieldName),
    {
      op: "median",
      field: continuousFieldName,
      as: `mid_box_${continuousFieldName}`
    },
    {
      op: "min",
      field: continuousFieldName,
      as: (boxPlotType === "min-max" ? "lower_whisker_" : "min_") + continuousFieldName
    },
    {
      op: "max",
      field: continuousFieldName,
      as: (boxPlotType === "min-max" ? "upper_whisker_" : "max_") + continuousFieldName
    }
  ];
  const postAggregateCalculates = boxPlotType === "min-max" || boxPlotType === "tukey" ? [] : [
    // This is for the  original k-IQR, which we do not expose
    {
      calculate: `datum["upper_box_${continuousFieldName}"] - datum["lower_box_${continuousFieldName}"]`,
      as: `iqr_${continuousFieldName}`
    },
    {
      calculate: `min(datum["upper_box_${continuousFieldName}"] + datum["iqr_${continuousFieldName}"] * ${extent}, datum["max_${continuousFieldName}"])`,
      as: `upper_whisker_${continuousFieldName}`
    },
    {
      calculate: `max(datum["lower_box_${continuousFieldName}"] - datum["iqr_${continuousFieldName}"] * ${extent}, datum["min_${continuousFieldName}"])`,
      as: `lower_whisker_${continuousFieldName}`
    }
  ];
  const { [continuousAxis]: oldContinuousAxisChannelDef, ...oldEncodingWithoutContinuousAxis } = spec.encoding;
  const { customTooltipWithoutAggregatedField, filteredEncoding } = filterTooltipWithAggregatedField(oldEncodingWithoutContinuousAxis);
  const { bins: bins2, timeUnits, aggregate, groupby, encoding: encodingWithoutContinuousAxis } = extractTransformsFromEncoding(filteredEncoding, config);
  const ticksOrient = orient2 === "vertical" ? "horizontal" : "vertical";
  const boxOrient = orient2;
  const transform = [
    ...bins2,
    ...timeUnits,
    {
      aggregate: [...aggregate, ...boxplotSpecificAggregate],
      groupby
    },
    ...postAggregateCalculates
  ];
  return {
    bins: bins2,
    timeUnits,
    transform,
    groupby,
    aggregate,
    continuousAxisChannelDef,
    continuousAxis,
    encodingWithoutContinuousAxis,
    ticksOrient,
    boxOrient,
    customTooltipWithoutAggregatedField
  };
}
const ERRORBAR = "errorbar";
const ERRORBAR_PARTS = ["ticks", "rule"];
const errorBarNormalizer = new CompositeMarkNormalizer(ERRORBAR, normalizeErrorBar);
function normalizeErrorBar(spec, { config }) {
  spec = {
    ...spec,
    encoding: normalizeEncoding(spec.encoding, config)
  };
  const { transform, continuousAxisChannelDef, continuousAxis, encodingWithoutContinuousAxis, ticksOrient, markDef, outerSpec, tooltipEncoding } = errorBarParams(spec, ERRORBAR, config);
  delete encodingWithoutContinuousAxis["size"];
  const makeErrorBarPart = makeCompositeAggregatePartFactory(markDef, continuousAxis, continuousAxisChannelDef, encodingWithoutContinuousAxis, config.errorbar);
  const thickness = markDef.thickness;
  const size = markDef.size;
  const tick2 = {
    type: "tick",
    orient: ticksOrient,
    aria: false,
    ...thickness !== void 0 ? { thickness } : {},
    ...size !== void 0 ? { size } : {}
  };
  const layer = [
    ...makeErrorBarPart({
      partName: "ticks",
      mark: tick2,
      positionPrefix: "lower",
      extraEncoding: tooltipEncoding
    }),
    ...makeErrorBarPart({
      partName: "ticks",
      mark: tick2,
      positionPrefix: "upper",
      extraEncoding: tooltipEncoding
    }),
    ...makeErrorBarPart({
      partName: "rule",
      mark: {
        type: "rule",
        ariaRoleDescription: "errorbar",
        ...thickness !== void 0 ? { size: thickness } : {}
      },
      positionPrefix: "lower",
      endPositionPrefix: "upper",
      extraEncoding: tooltipEncoding
    })
  ];
  return {
    ...outerSpec,
    transform,
    ...layer.length > 1 ? { layer } : { ...layer[0] }
  };
}
function errorBarOrientAndInputType(spec, compositeMark) {
  const { encoding } = spec;
  if (errorBarIsInputTypeRaw(encoding)) {
    return {
      orient: compositeMarkOrient(spec, compositeMark),
      inputType: "raw"
    };
  }
  const isTypeAggregatedUpperLower = errorBarIsInputTypeAggregatedUpperLower(encoding);
  const isTypeAggregatedError = errorBarIsInputTypeAggregatedError(encoding);
  const x = encoding.x;
  const y = encoding.y;
  if (isTypeAggregatedUpperLower) {
    if (isTypeAggregatedError) {
      throw new Error(`${compositeMark} cannot be both type aggregated-upper-lower and aggregated-error`);
    }
    const x2 = encoding.x2;
    const y2 = encoding.y2;
    if (isFieldOrDatumDef(x2) && isFieldOrDatumDef(y2)) {
      throw new Error(`${compositeMark} cannot have both x2 and y2`);
    } else if (isFieldOrDatumDef(x2)) {
      if (isContinuousFieldOrDatumDef(x)) {
        return { orient: "horizontal", inputType: "aggregated-upper-lower" };
      } else {
        throw new Error(`Both x and x2 have to be quantitative in ${compositeMark}`);
      }
    } else if (isFieldOrDatumDef(y2)) {
      if (isContinuousFieldOrDatumDef(y)) {
        return { orient: "vertical", inputType: "aggregated-upper-lower" };
      } else {
        throw new Error(`Both y and y2 have to be quantitative in ${compositeMark}`);
      }
    }
    throw new Error("No ranged axis");
  } else {
    const xError = encoding.xError;
    const xError2 = encoding.xError2;
    const yError = encoding.yError;
    const yError2 = encoding.yError2;
    if (isFieldOrDatumDef(xError2) && !isFieldOrDatumDef(xError)) {
      throw new Error(`${compositeMark} cannot have xError2 without xError`);
    }
    if (isFieldOrDatumDef(yError2) && !isFieldOrDatumDef(yError)) {
      throw new Error(`${compositeMark} cannot have yError2 without yError`);
    }
    if (isFieldOrDatumDef(xError) && isFieldOrDatumDef(yError)) {
      throw new Error(`${compositeMark} cannot have both xError and yError with both are quantiative`);
    } else if (isFieldOrDatumDef(xError)) {
      if (isContinuousFieldOrDatumDef(x)) {
        return { orient: "horizontal", inputType: "aggregated-error" };
      } else {
        throw new Error("All x, xError, and xError2 (if exist) have to be quantitative");
      }
    } else if (isFieldOrDatumDef(yError)) {
      if (isContinuousFieldOrDatumDef(y)) {
        return { orient: "vertical", inputType: "aggregated-error" };
      } else {
        throw new Error("All y, yError, and yError2 (if exist) have to be quantitative");
      }
    }
    throw new Error("No ranged axis");
  }
}
function errorBarIsInputTypeRaw(encoding) {
  return (isFieldOrDatumDef(encoding.x) || isFieldOrDatumDef(encoding.y)) && !isFieldOrDatumDef(encoding.x2) && !isFieldOrDatumDef(encoding.y2) && !isFieldOrDatumDef(encoding.xError) && !isFieldOrDatumDef(encoding.xError2) && !isFieldOrDatumDef(encoding.yError) && !isFieldOrDatumDef(encoding.yError2);
}
function errorBarIsInputTypeAggregatedUpperLower(encoding) {
  return isFieldOrDatumDef(encoding.x2) || isFieldOrDatumDef(encoding.y2);
}
function errorBarIsInputTypeAggregatedError(encoding) {
  return isFieldOrDatumDef(encoding.xError) || isFieldOrDatumDef(encoding.xError2) || isFieldOrDatumDef(encoding.yError) || isFieldOrDatumDef(encoding.yError2);
}
function errorBarParams(spec, compositeMark, config) {
  const { mark, encoding, params, projection: _p, ...outerSpec } = spec;
  const markDef = isMarkDef(mark) ? mark : { type: mark };
  if (params) {
    warn(selectionNotSupported(compositeMark));
  }
  const { orient: orient2, inputType } = errorBarOrientAndInputType(spec, compositeMark);
  const { continuousAxisChannelDef, continuousAxisChannelDef2, continuousAxisChannelDefError, continuousAxisChannelDefError2, continuousAxis } = compositeMarkContinuousAxis(spec, orient2, compositeMark);
  const { errorBarSpecificAggregate, postAggregateCalculates, tooltipSummary, tooltipTitleWithFieldName } = errorBarAggregationAndCalculation(markDef, continuousAxisChannelDef, continuousAxisChannelDef2, continuousAxisChannelDefError, continuousAxisChannelDefError2, inputType, compositeMark, config);
  const { [continuousAxis]: oldContinuousAxisChannelDef, [continuousAxis === "x" ? "x2" : "y2"]: oldContinuousAxisChannelDef2, [continuousAxis === "x" ? "xError" : "yError"]: oldContinuousAxisChannelDefError, [continuousAxis === "x" ? "xError2" : "yError2"]: oldContinuousAxisChannelDefError2, ...oldEncodingWithoutContinuousAxis } = encoding;
  const { bins: bins2, timeUnits, aggregate: oldAggregate, groupby: oldGroupBy, encoding: encodingWithoutContinuousAxis } = extractTransformsFromEncoding(oldEncodingWithoutContinuousAxis, config);
  const aggregate = [...oldAggregate, ...errorBarSpecificAggregate];
  const groupby = inputType !== "raw" ? [] : oldGroupBy;
  const tooltipEncoding = getCompositeMarkTooltip(tooltipSummary, continuousAxisChannelDef, encodingWithoutContinuousAxis, tooltipTitleWithFieldName);
  return {
    transform: [
      ...outerSpec.transform ?? [],
      ...bins2,
      ...timeUnits,
      ...aggregate.length === 0 ? [] : [{ aggregate, groupby }],
      ...postAggregateCalculates
    ],
    groupby,
    continuousAxisChannelDef,
    continuousAxis,
    encodingWithoutContinuousAxis,
    ticksOrient: orient2 === "vertical" ? "horizontal" : "vertical",
    markDef,
    outerSpec,
    tooltipEncoding
  };
}
function errorBarAggregationAndCalculation(markDef, continuousAxisChannelDef, continuousAxisChannelDef2, continuousAxisChannelDefError, continuousAxisChannelDefError2, inputType, compositeMark, config) {
  let errorBarSpecificAggregate = [];
  let postAggregateCalculates = [];
  const continuousFieldName = continuousAxisChannelDef.field;
  let tooltipSummary;
  let tooltipTitleWithFieldName = false;
  if (inputType === "raw") {
    const center = markDef.center ? markDef.center : markDef.extent ? markDef.extent === "iqr" ? "median" : "mean" : config.errorbar.center;
    const extent = markDef.extent ? markDef.extent : center === "mean" ? "stderr" : "iqr";
    if (center === "median" !== (extent === "iqr")) {
      warn(errorBarCenterIsUsedWithWrongExtent(center, extent, compositeMark));
    }
    if (extent === "stderr" || extent === "stdev") {
      errorBarSpecificAggregate = [
        { op: extent, field: continuousFieldName, as: `extent_${continuousFieldName}` },
        { op: center, field: continuousFieldName, as: `center_${continuousFieldName}` }
      ];
      postAggregateCalculates = [
        {
          calculate: `datum["center_${continuousFieldName}"] + datum["extent_${continuousFieldName}"]`,
          as: `upper_${continuousFieldName}`
        },
        {
          calculate: `datum["center_${continuousFieldName}"] - datum["extent_${continuousFieldName}"]`,
          as: `lower_${continuousFieldName}`
        }
      ];
      tooltipSummary = [
        { fieldPrefix: "center_", titlePrefix: titleCase(center) },
        { fieldPrefix: "upper_", titlePrefix: getTitlePrefix(center, extent, "+") },
        { fieldPrefix: "lower_", titlePrefix: getTitlePrefix(center, extent, "-") }
      ];
      tooltipTitleWithFieldName = true;
    } else {
      let centerOp;
      let lowerExtentOp;
      let upperExtentOp;
      if (extent === "ci") {
        centerOp = "mean";
        lowerExtentOp = "ci0";
        upperExtentOp = "ci1";
      } else {
        centerOp = "median";
        lowerExtentOp = "q1";
        upperExtentOp = "q3";
      }
      errorBarSpecificAggregate = [
        { op: lowerExtentOp, field: continuousFieldName, as: `lower_${continuousFieldName}` },
        { op: upperExtentOp, field: continuousFieldName, as: `upper_${continuousFieldName}` },
        { op: centerOp, field: continuousFieldName, as: `center_${continuousFieldName}` }
      ];
      tooltipSummary = [
        {
          fieldPrefix: "upper_",
          titlePrefix: title({ field: continuousFieldName, aggregate: upperExtentOp, type: "quantitative" }, config, {
            allowDisabling: false
          })
        },
        {
          fieldPrefix: "lower_",
          titlePrefix: title({ field: continuousFieldName, aggregate: lowerExtentOp, type: "quantitative" }, config, {
            allowDisabling: false
          })
        },
        {
          fieldPrefix: "center_",
          titlePrefix: title({ field: continuousFieldName, aggregate: centerOp, type: "quantitative" }, config, {
            allowDisabling: false
          })
        }
      ];
    }
  } else {
    if (markDef.center || markDef.extent) {
      warn(errorBarCenterAndExtentAreNotNeeded(markDef.center, markDef.extent));
    }
    if (inputType === "aggregated-upper-lower") {
      tooltipSummary = [];
      postAggregateCalculates = [
        { calculate: `datum["${continuousAxisChannelDef2.field}"]`, as: `upper_${continuousFieldName}` },
        { calculate: `datum["${continuousFieldName}"]`, as: `lower_${continuousFieldName}` }
      ];
    } else if (inputType === "aggregated-error") {
      tooltipSummary = [{ fieldPrefix: "", titlePrefix: continuousFieldName }];
      postAggregateCalculates = [
        {
          calculate: `datum["${continuousFieldName}"] + datum["${continuousAxisChannelDefError.field}"]`,
          as: `upper_${continuousFieldName}`
        }
      ];
      if (continuousAxisChannelDefError2) {
        postAggregateCalculates.push({
          calculate: `datum["${continuousFieldName}"] + datum["${continuousAxisChannelDefError2.field}"]`,
          as: `lower_${continuousFieldName}`
        });
      } else {
        postAggregateCalculates.push({
          calculate: `datum["${continuousFieldName}"] - datum["${continuousAxisChannelDefError.field}"]`,
          as: `lower_${continuousFieldName}`
        });
      }
    }
    for (const postAggregateCalculate of postAggregateCalculates) {
      tooltipSummary.push({
        fieldPrefix: postAggregateCalculate.as.substring(0, 6),
        titlePrefix: replaceAll(replaceAll(postAggregateCalculate.calculate, 'datum["', ""), '"]', "")
      });
    }
  }
  return { postAggregateCalculates, errorBarSpecificAggregate, tooltipSummary, tooltipTitleWithFieldName };
}
function getTitlePrefix(center, extent, operation) {
  return `${titleCase(center)} ${operation} ${extent}`;
}
const ERRORBAND = "errorband";
const ERRORBAND_PARTS = ["band", "borders"];
const errorBandNormalizer = new CompositeMarkNormalizer(ERRORBAND, normalizeErrorBand);
function normalizeErrorBand(spec, { config }) {
  spec = {
    ...spec,
    encoding: normalizeEncoding(spec.encoding, config)
  };
  const { transform, continuousAxisChannelDef, continuousAxis, encodingWithoutContinuousAxis, markDef, outerSpec, tooltipEncoding } = errorBarParams(spec, ERRORBAND, config);
  const errorBandDef = markDef;
  const makeErrorBandPart = makeCompositeAggregatePartFactory(errorBandDef, continuousAxis, continuousAxisChannelDef, encodingWithoutContinuousAxis, config.errorband);
  const is2D = spec.encoding.x !== void 0 && spec.encoding.y !== void 0;
  let bandMark = { type: is2D ? "area" : "rect" };
  let bordersMark = { type: is2D ? "line" : "rule" };
  const interpolate2 = {
    ...errorBandDef.interpolate ? { interpolate: errorBandDef.interpolate } : {},
    ...errorBandDef.tension && errorBandDef.interpolate ? { tension: errorBandDef.tension } : {}
  };
  if (is2D) {
    bandMark = {
      ...bandMark,
      ...interpolate2,
      ariaRoleDescription: "errorband"
    };
    bordersMark = {
      ...bordersMark,
      ...interpolate2,
      aria: false
    };
  } else if (errorBandDef.interpolate) {
    warn(errorBand1DNotSupport("interpolate"));
  } else if (errorBandDef.tension) {
    warn(errorBand1DNotSupport("tension"));
  }
  return {
    ...outerSpec,
    transform,
    layer: [
      ...makeErrorBandPart({
        partName: "band",
        mark: bandMark,
        positionPrefix: "lower",
        endPositionPrefix: "upper",
        extraEncoding: tooltipEncoding
      }),
      ...makeErrorBandPart({
        partName: "borders",
        mark: bordersMark,
        positionPrefix: "lower",
        extraEncoding: tooltipEncoding
      }),
      ...makeErrorBandPart({
        partName: "borders",
        mark: bordersMark,
        positionPrefix: "upper",
        extraEncoding: tooltipEncoding
      })
    ]
  };
}
const compositeMarkRegistry = {};
function add(mark, run, parts) {
  const normalizer = new CompositeMarkNormalizer(mark, run);
  compositeMarkRegistry[mark] = { normalizer, parts };
}
function getAllCompositeMarks() {
  return keys(compositeMarkRegistry);
}
add(BOXPLOT, normalizeBoxPlot, BOXPLOT_PARTS);
add(ERRORBAR, normalizeErrorBar, ERRORBAR_PARTS);
add(ERRORBAND, normalizeErrorBand, ERRORBAND_PARTS);
const VL_ONLY_LEGEND_CONFIG = [
  "gradientHorizontalMaxLength",
  "gradientHorizontalMinLength",
  "gradientVerticalMaxLength",
  "gradientVerticalMinLength",
  "unselectedOpacity"
];
const HEADER_TITLE_PROPERTIES_MAP = {
  titleAlign: "align",
  titleAnchor: "anchor",
  titleAngle: "angle",
  titleBaseline: "baseline",
  titleColor: "color",
  titleFont: "font",
  titleFontSize: "fontSize",
  titleFontStyle: "fontStyle",
  titleFontWeight: "fontWeight",
  titleLimit: "limit",
  titleLineHeight: "lineHeight",
  titleOrient: "orient",
  titlePadding: "offset"
};
const HEADER_LABEL_PROPERTIES_MAP = {
  labelAlign: "align",
  labelAnchor: "anchor",
  labelAngle: "angle",
  labelBaseline: "baseline",
  labelColor: "color",
  labelFont: "font",
  labelFontSize: "fontSize",
  labelFontStyle: "fontStyle",
  labelFontWeight: "fontWeight",
  labelLimit: "limit",
  labelLineHeight: "lineHeight",
  labelOrient: "orient",
  labelPadding: "offset"
};
const HEADER_TITLE_PROPERTIES = keys(HEADER_TITLE_PROPERTIES_MAP);
const HEADER_LABEL_PROPERTIES = keys(HEADER_LABEL_PROPERTIES_MAP);
const HEADER_CONFIGS_INDEX = {
  header: 1,
  headerRow: 1,
  headerColumn: 1,
  headerFacet: 1
};
const HEADER_CONFIGS = keys(HEADER_CONFIGS_INDEX);
const LEGEND_SCALE_CHANNELS = [
  "size",
  "shape",
  "fill",
  "stroke",
  "strokeDash",
  "strokeWidth",
  "opacity"
];
const defaultLegendConfig = {
  gradientHorizontalMaxLength: 200,
  gradientHorizontalMinLength: 100,
  gradientVerticalMaxLength: 200,
  gradientVerticalMinLength: 64,
  unselectedOpacity: 0.35
};
const COMMON_LEGEND_PROPERTY_INDEX = {
  aria: 1,
  clipHeight: 1,
  columnPadding: 1,
  columns: 1,
  cornerRadius: 1,
  description: 1,
  direction: 1,
  fillColor: 1,
  format: 1,
  formatType: 1,
  gradientLength: 1,
  gradientOpacity: 1,
  gradientStrokeColor: 1,
  gradientStrokeWidth: 1,
  gradientThickness: 1,
  gridAlign: 1,
  labelAlign: 1,
  labelBaseline: 1,
  labelColor: 1,
  labelFont: 1,
  labelFontSize: 1,
  labelFontStyle: 1,
  labelFontWeight: 1,
  labelLimit: 1,
  labelOffset: 1,
  labelOpacity: 1,
  labelOverlap: 1,
  labelPadding: 1,
  labelSeparation: 1,
  legendX: 1,
  legendY: 1,
  offset: 1,
  orient: 1,
  padding: 1,
  rowPadding: 1,
  strokeColor: 1,
  symbolDash: 1,
  symbolDashOffset: 1,
  symbolFillColor: 1,
  symbolLimit: 1,
  symbolOffset: 1,
  symbolOpacity: 1,
  symbolSize: 1,
  symbolStrokeColor: 1,
  symbolStrokeWidth: 1,
  symbolType: 1,
  tickCount: 1,
  tickMinStep: 1,
  title: 1,
  titleAlign: 1,
  titleAnchor: 1,
  titleBaseline: 1,
  titleColor: 1,
  titleFont: 1,
  titleFontSize: 1,
  titleFontStyle: 1,
  titleFontWeight: 1,
  titleLimit: 1,
  titleLineHeight: 1,
  titleOpacity: 1,
  titleOrient: 1,
  titlePadding: 1,
  type: 1,
  values: 1,
  zindex: 1
};
const SELECTION_ID = "_vgsid_";
const defaultConfig$1 = {
  point: {
    on: "click",
    fields: [SELECTION_ID],
    toggle: "event.shiftKey",
    resolve: "global",
    clear: "dblclick"
  },
  interval: {
    on: "[mousedown, window:mouseup] > window:mousemove!",
    encodings: ["x", "y"],
    translate: "[mousedown, window:mouseup] > window:mousemove!",
    zoom: "wheel!",
    mark: { fill: "#333", fillOpacity: 0.125, stroke: "white" },
    resolve: "global",
    clear: "dblclick"
  }
};
function isLegendBinding(bind) {
  return bind === "legend" || !!(bind == null ? void 0 : bind.legend);
}
function isLegendStreamBinding(bind) {
  return isLegendBinding(bind) && isObject(bind);
}
function isSelectionParameter(param) {
  return !!(param == null ? void 0 : param["select"]);
}
function assembleParameterSignals(params) {
  const signals = [];
  for (const param of params || []) {
    if (isSelectionParameter(param))
      continue;
    const { expr, bind, ...rest } = param;
    if (bind && expr) {
      const signal = {
        ...rest,
        bind,
        init: expr
      };
      signals.push(signal);
    } else {
      const signal = {
        ...rest,
        ...expr ? { update: expr } : {},
        ...bind ? { bind } : {}
      };
      signals.push(signal);
    }
  }
  return signals;
}
function isAnyConcatSpec(spec) {
  return isVConcatSpec(spec) || isHConcatSpec(spec) || isConcatSpec(spec);
}
function isConcatSpec(spec) {
  return "concat" in spec;
}
function isVConcatSpec(spec) {
  return "vconcat" in spec;
}
function isHConcatSpec(spec) {
  return "hconcat" in spec;
}
function getStepFor({ step, offsetIsDiscrete }) {
  if (offsetIsDiscrete) {
    return step.for ?? "offset";
  } else {
    return "position";
  }
}
function isStep(size) {
  return isObject(size) && size["step"] !== void 0;
}
function isFrameMixins(o) {
  return o["view"] || o["width"] || o["height"];
}
const DEFAULT_SPACING = 20;
const COMPOSITION_LAYOUT_INDEX = {
  align: 1,
  bounds: 1,
  center: 1,
  columns: 1,
  spacing: 1
};
const COMPOSITION_LAYOUT_PROPERTIES = keys(COMPOSITION_LAYOUT_INDEX);
function extractCompositionLayout(spec, specType, config) {
  const compositionConfig = config[specType];
  const layout = {};
  const { spacing: spacingConfig, columns } = compositionConfig;
  if (spacingConfig !== void 0) {
    layout.spacing = spacingConfig;
  }
  if (columns !== void 0) {
    if (isFacetSpec(spec) && !isFacetMapping(spec.facet) || isConcatSpec(spec)) {
      layout.columns = columns;
    }
  }
  if (isVConcatSpec(spec)) {
    layout.columns = 1;
  }
  for (const prop of COMPOSITION_LAYOUT_PROPERTIES) {
    if (spec[prop] !== void 0) {
      if (prop === "spacing") {
        const spacing = spec[prop];
        layout[prop] = isNumber(spacing) ? spacing : {
          row: spacing.row ?? spacingConfig,
          column: spacing.column ?? spacingConfig
        };
      } else {
        layout[prop] = spec[prop];
      }
    }
  }
  return layout;
}
function getViewConfigContinuousSize(viewConfig, channel) {
  return viewConfig[channel] ?? viewConfig[channel === "width" ? "continuousWidth" : "continuousHeight"];
}
function getViewConfigDiscreteStep(viewConfig, channel) {
  const size = getViewConfigDiscreteSize(viewConfig, channel);
  return isStep(size) ? size.step : DEFAULT_STEP;
}
function getViewConfigDiscreteSize(viewConfig, channel) {
  const size = viewConfig[channel] ?? viewConfig[channel === "width" ? "discreteWidth" : "discreteHeight"];
  return getFirstDefined(size, { step: viewConfig.step });
}
const DEFAULT_STEP = 20;
const defaultViewConfig = {
  continuousWidth: 200,
  continuousHeight: 200,
  step: DEFAULT_STEP
};
const defaultConfig = {
  background: "white",
  padding: 5,
  timeFormat: "%b %d, %Y",
  countTitle: "Count of Records",
  view: defaultViewConfig,
  mark: defaultMarkConfig,
  arc: {},
  area: {},
  bar: defaultBarConfig,
  circle: {},
  geoshape: {},
  image: {},
  line: {},
  point: {},
  rect: defaultRectConfig,
  rule: { color: "black" },
  square: {},
  text: { color: "black" },
  tick: defaultTickConfig,
  trail: {},
  boxplot: {
    size: 14,
    extent: 1.5,
    box: {},
    median: { color: "white" },
    outliers: {},
    rule: {},
    ticks: null
  },
  errorbar: {
    center: "mean",
    rule: true,
    ticks: false
  },
  errorband: {
    band: {
      opacity: 0.3
    },
    borders: false
  },
  scale: defaultScaleConfig,
  projection: {},
  legend: defaultLegendConfig,
  header: { titlePadding: 10, labelPadding: 10 },
  headerColumn: {},
  headerRow: {},
  headerFacet: {},
  selection: defaultConfig$1,
  style: {},
  title: {},
  facet: { spacing: DEFAULT_SPACING },
  concat: { spacing: DEFAULT_SPACING },
  normalizedNumberFormat: ".0%"
};
const tab10 = [
  "#4c78a8",
  "#f58518",
  "#e45756",
  "#72b7b2",
  "#54a24b",
  "#eeca3b",
  "#b279a2",
  "#ff9da6",
  "#9d755d",
  "#bab0ac"
];
const DEFAULT_FONT_SIZE = {
  text: 11,
  guideLabel: 10,
  guideTitle: 11,
  groupTitle: 13,
  groupSubtitle: 12
};
const DEFAULT_COLOR = {
  blue: tab10[0],
  orange: tab10[1],
  red: tab10[2],
  teal: tab10[3],
  green: tab10[4],
  yellow: tab10[5],
  purple: tab10[6],
  pink: tab10[7],
  brown: tab10[8],
  gray0: "#000",
  gray1: "#111",
  gray2: "#222",
  gray3: "#333",
  gray4: "#444",
  gray5: "#555",
  gray6: "#666",
  gray7: "#777",
  gray8: "#888",
  gray9: "#999",
  gray10: "#aaa",
  gray11: "#bbb",
  gray12: "#ccc",
  gray13: "#ddd",
  gray14: "#eee",
  gray15: "#fff"
};
function colorSignalConfig(color2 = {}) {
  return {
    signals: [
      {
        name: "color",
        value: isObject(color2) ? { ...DEFAULT_COLOR, ...color2 } : DEFAULT_COLOR
      }
    ],
    mark: { color: { signal: "color.blue" } },
    rule: { color: { signal: "color.gray0" } },
    text: {
      color: { signal: "color.gray0" }
    },
    style: {
      "guide-label": {
        fill: { signal: "color.gray0" }
      },
      "guide-title": {
        fill: { signal: "color.gray0" }
      },
      "group-title": {
        fill: { signal: "color.gray0" }
      },
      "group-subtitle": {
        fill: { signal: "color.gray0" }
      },
      cell: {
        stroke: { signal: "color.gray8" }
      }
    },
    axis: {
      domainColor: { signal: "color.gray13" },
      gridColor: { signal: "color.gray8" },
      tickColor: { signal: "color.gray13" }
    },
    range: {
      category: [
        { signal: "color.blue" },
        { signal: "color.orange" },
        { signal: "color.red" },
        { signal: "color.teal" },
        { signal: "color.green" },
        { signal: "color.yellow" },
        { signal: "color.purple" },
        { signal: "color.pink" },
        { signal: "color.brown" },
        { signal: "color.grey8" }
      ]
    }
  };
}
function fontSizeSignalConfig(fontSize) {
  return {
    signals: [
      {
        name: "fontSize",
        value: isObject(fontSize) ? { ...DEFAULT_FONT_SIZE, ...fontSize } : DEFAULT_FONT_SIZE
      }
    ],
    text: {
      fontSize: { signal: "fontSize.text" }
    },
    style: {
      "guide-label": {
        fontSize: { signal: "fontSize.guideLabel" }
      },
      "guide-title": {
        fontSize: { signal: "fontSize.guideTitle" }
      },
      "group-title": {
        fontSize: { signal: "fontSize.groupTitle" }
      },
      "group-subtitle": {
        fontSize: { signal: "fontSize.groupSubtitle" }
      }
    }
  };
}
function fontConfig(font2) {
  return {
    text: { font: font2 },
    style: {
      "guide-label": { font: font2 },
      "guide-title": { font: font2 },
      "group-title": { font: font2 },
      "group-subtitle": { font: font2 }
    }
  };
}
function getAxisConfigInternal(axisConfig) {
  const props = keys(axisConfig || {});
  const axisConfigInternal = {};
  for (const prop of props) {
    const val = axisConfig[prop];
    axisConfigInternal[prop] = isConditionalAxisValue(val) ? signalOrValueRefWithCondition(val) : signalRefOrValue(val);
  }
  return axisConfigInternal;
}
function getStyleConfigInternal(styleConfig) {
  const props = keys(styleConfig);
  const styleConfigInternal = {};
  for (const prop of props) {
    styleConfigInternal[prop] = getAxisConfigInternal(styleConfig[prop]);
  }
  return styleConfigInternal;
}
const configPropsWithExpr = [
  ...MARK_CONFIGS,
  ...AXIS_CONFIGS,
  ...HEADER_CONFIGS,
  "background",
  "padding",
  "legend",
  "lineBreak",
  "scale",
  "style",
  "title",
  "view"
];
function initConfig(specifiedConfig = {}) {
  const { color: color2, font: font2, fontSize, selection, ...restConfig } = specifiedConfig;
  const mergedConfig = mergeConfig({}, duplicate(defaultConfig), font2 ? fontConfig(font2) : {}, color2 ? colorSignalConfig(color2) : {}, fontSize ? fontSizeSignalConfig(fontSize) : {}, restConfig || {});
  if (selection) {
    writeConfig(mergedConfig, "selection", selection, true);
  }
  const outputConfig = omit(mergedConfig, configPropsWithExpr);
  for (const prop of ["background", "lineBreak", "padding"]) {
    if (mergedConfig[prop]) {
      outputConfig[prop] = signalRefOrValue(mergedConfig[prop]);
    }
  }
  for (const markConfigType of MARK_CONFIGS) {
    if (mergedConfig[markConfigType]) {
      outputConfig[markConfigType] = replaceExprRef(mergedConfig[markConfigType]);
    }
  }
  for (const axisConfigType of AXIS_CONFIGS) {
    if (mergedConfig[axisConfigType]) {
      outputConfig[axisConfigType] = getAxisConfigInternal(mergedConfig[axisConfigType]);
    }
  }
  for (const headerConfigType of HEADER_CONFIGS) {
    if (mergedConfig[headerConfigType]) {
      outputConfig[headerConfigType] = replaceExprRef(mergedConfig[headerConfigType]);
    }
  }
  if (mergedConfig.legend) {
    outputConfig.legend = replaceExprRef(mergedConfig.legend);
  }
  if (mergedConfig.scale) {
    outputConfig.scale = replaceExprRef(mergedConfig.scale);
  }
  if (mergedConfig.style) {
    outputConfig.style = getStyleConfigInternal(mergedConfig.style);
  }
  if (mergedConfig.title) {
    outputConfig.title = replaceExprRef(mergedConfig.title);
  }
  if (mergedConfig.view) {
    outputConfig.view = replaceExprRef(mergedConfig.view);
  }
  return outputConfig;
}
const MARK_STYLES = /* @__PURE__ */ new Set(["view", ...PRIMITIVE_MARKS]);
const VL_ONLY_CONFIG_PROPERTIES = [
  "color",
  "fontSize",
  "background",
  "padding",
  "facet",
  "concat",
  "numberFormat",
  "numberFormatType",
  "normalizedNumberFormat",
  "normalizedNumberFormatType",
  "timeFormat",
  "countTitle",
  "header",
  "axisQuantitative",
  "axisTemporal",
  "axisDiscrete",
  "axisPoint",
  "axisXBand",
  "axisXPoint",
  "axisXDiscrete",
  "axisXQuantitative",
  "axisXTemporal",
  "axisYBand",
  "axisYPoint",
  "axisYDiscrete",
  "axisYQuantitative",
  "axisYTemporal",
  "scale",
  "selection",
  "overlay"
  // FIXME: Redesign and unhide this
];
const VL_ONLY_ALL_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX = {
  view: ["continuousWidth", "continuousHeight", "discreteWidth", "discreteHeight", "step"],
  ...VL_ONLY_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX
};
function stripAndRedirectConfig(config) {
  config = duplicate(config);
  for (const prop of VL_ONLY_CONFIG_PROPERTIES) {
    delete config[prop];
  }
  if (config.axis) {
    for (const prop in config.axis) {
      if (isConditionalAxisValue(config.axis[prop])) {
        delete config.axis[prop];
      }
    }
  }
  if (config.legend) {
    for (const prop of VL_ONLY_LEGEND_CONFIG) {
      delete config.legend[prop];
    }
  }
  if (config.mark) {
    for (const prop of VL_ONLY_MARK_CONFIG_PROPERTIES) {
      delete config.mark[prop];
    }
    if (config.mark.tooltip && isObject(config.mark.tooltip)) {
      delete config.mark.tooltip;
    }
  }
  if (config.params) {
    config.signals = (config.signals || []).concat(assembleParameterSignals(config.params));
    delete config.params;
  }
  for (const markType of MARK_STYLES) {
    for (const prop of VL_ONLY_MARK_CONFIG_PROPERTIES) {
      delete config[markType][prop];
    }
    const vlOnlyMarkSpecificConfigs = VL_ONLY_ALL_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX[markType];
    if (vlOnlyMarkSpecificConfigs) {
      for (const prop of vlOnlyMarkSpecificConfigs) {
        delete config[markType][prop];
      }
    }
    redirectConfigToStyleConfig(config, markType);
  }
  for (const m of getAllCompositeMarks()) {
    delete config[m];
  }
  redirectTitleConfig(config);
  for (const prop in config) {
    if (isObject(config[prop]) && isEmpty(config[prop])) {
      delete config[prop];
    }
  }
  return isEmpty(config) ? void 0 : config;
}
function redirectTitleConfig(config) {
  const { titleMarkConfig, subtitleMarkConfig, subtitle } = extractTitleConfig(config.title);
  if (!isEmpty(titleMarkConfig)) {
    config.style["group-title"] = {
      ...config.style["group-title"],
      ...titleMarkConfig
      // config.title has higher precedence than config.style.group-title in Vega
    };
  }
  if (!isEmpty(subtitleMarkConfig)) {
    config.style["group-subtitle"] = {
      ...config.style["group-subtitle"],
      ...subtitleMarkConfig
    };
  }
  if (!isEmpty(subtitle)) {
    config.title = subtitle;
  } else {
    delete config.title;
  }
}
function redirectConfigToStyleConfig(config, prop, toProp, compositeMarkPart) {
  const propConfig = config[prop];
  if (prop === "view") {
    toProp = "cell";
  }
  const style = {
    ...propConfig,
    ...config.style[toProp ?? prop]
  };
  if (!isEmpty(style)) {
    config.style[toProp ?? prop] = style;
  }
  {
    delete config[prop];
  }
}
function isLayerSpec(spec) {
  return "layer" in spec;
}
function isRepeatSpec(spec) {
  return "repeat" in spec;
}
function isLayerRepeatSpec(spec) {
  return !isArray(spec.repeat) && spec.repeat["layer"];
}
class SpecMapper {
  map(spec, params) {
    if (isFacetSpec(spec)) {
      return this.mapFacet(spec, params);
    } else if (isRepeatSpec(spec)) {
      return this.mapRepeat(spec, params);
    } else if (isHConcatSpec(spec)) {
      return this.mapHConcat(spec, params);
    } else if (isVConcatSpec(spec)) {
      return this.mapVConcat(spec, params);
    } else if (isConcatSpec(spec)) {
      return this.mapConcat(spec, params);
    } else {
      return this.mapLayerOrUnit(spec, params);
    }
  }
  mapLayerOrUnit(spec, params) {
    if (isLayerSpec(spec)) {
      return this.mapLayer(spec, params);
    } else if (isUnitSpec(spec)) {
      return this.mapUnit(spec, params);
    }
    throw new Error(invalidSpec(spec));
  }
  mapLayer(spec, params) {
    return {
      ...spec,
      layer: spec.layer.map((subspec) => this.mapLayerOrUnit(subspec, params))
    };
  }
  mapHConcat(spec, params) {
    return {
      ...spec,
      hconcat: spec.hconcat.map((subspec) => this.map(subspec, params))
    };
  }
  mapVConcat(spec, params) {
    return {
      ...spec,
      vconcat: spec.vconcat.map((subspec) => this.map(subspec, params))
    };
  }
  mapConcat(spec, params) {
    const { concat, ...rest } = spec;
    return {
      ...rest,
      concat: concat.map((subspec) => this.map(subspec, params))
    };
  }
  mapFacet(spec, params) {
    return {
      // as any is required here since TS cannot infer that FO may only be FieldName or Field, but not RepeatRef
      ...spec,
      // TODO: remove "any" once we support all facet listed in https://github.com/vega/vega-lite/issues/2760
      spec: this.map(spec.spec, params)
    };
  }
  mapRepeat(spec, params) {
    return {
      ...spec,
      // as any is required here since TS cannot infer that the output type satisfies the input type
      spec: this.map(spec.spec, params)
    };
  }
}
const STACK_OFFSET_INDEX = {
  zero: 1,
  center: 1,
  normalize: 1
};
function isStackOffset(s) {
  return s in STACK_OFFSET_INDEX;
}
const STACKABLE_MARKS = /* @__PURE__ */ new Set([ARC, BAR, AREA, RULE, POINT, CIRCLE, SQUARE, LINE, TEXT, TICK]);
const STACK_BY_DEFAULT_MARKS = /* @__PURE__ */ new Set([BAR, AREA, ARC]);
function isUnbinnedQuantitative(channelDef) {
  return isFieldDef(channelDef) && channelDefType(channelDef) === "quantitative" && !channelDef.bin;
}
function potentialStackedChannel(encoding, x, { orient: orient2, type: mark }) {
  const y = x === "x" ? "y" : "radius";
  const isCartesian = x === "x";
  const xDef = encoding[x];
  const yDef = encoding[y];
  if (isFieldDef(xDef) && isFieldDef(yDef)) {
    if (isUnbinnedQuantitative(xDef) && isUnbinnedQuantitative(yDef)) {
      if (xDef.stack) {
        return x;
      } else if (yDef.stack) {
        return y;
      }
      const xAggregate = isFieldDef(xDef) && !!xDef.aggregate;
      const yAggregate = isFieldDef(yDef) && !!yDef.aggregate;
      if (xAggregate !== yAggregate) {
        return xAggregate ? x : y;
      }
      if (isCartesian && mark === "bar") {
        if (orient2 === "vertical") {
          return y;
        } else if (orient2 === "horizontal") {
          return x;
        }
      }
    } else if (isUnbinnedQuantitative(xDef)) {
      return x;
    } else if (isUnbinnedQuantitative(yDef)) {
      return y;
    }
  } else if (isUnbinnedQuantitative(xDef)) {
    return x;
  } else if (isUnbinnedQuantitative(yDef)) {
    return y;
  }
  return void 0;
}
function getDimensionChannel(channel) {
  switch (channel) {
    case "x":
      return "y";
    case "y":
      return "x";
    case "theta":
      return "radius";
    case "radius":
      return "theta";
  }
}
function stack(m, encoding) {
  var _a2, _b;
  const markDef = isMarkDef(m) ? m : { type: m };
  const mark = markDef.type;
  if (!STACKABLE_MARKS.has(mark)) {
    return null;
  }
  const fieldChannel = potentialStackedChannel(encoding, "x", markDef) || potentialStackedChannel(encoding, "theta", markDef);
  if (!fieldChannel) {
    return null;
  }
  const stackedFieldDef = encoding[fieldChannel];
  const stackedField = isFieldDef(stackedFieldDef) ? vgField(stackedFieldDef, {}) : void 0;
  const dimensionChannel = getDimensionChannel(fieldChannel);
  const groupbyChannels = [];
  const groupbyFields = /* @__PURE__ */ new Set();
  if (encoding[dimensionChannel]) {
    const dimensionDef = encoding[dimensionChannel];
    const dimensionField = isFieldDef(dimensionDef) ? vgField(dimensionDef, {}) : void 0;
    if (dimensionField && dimensionField !== stackedField) {
      groupbyChannels.push(dimensionChannel);
      groupbyFields.add(dimensionField);
    }
    const dimensionOffsetChannel = dimensionChannel === "x" ? "xOffset" : "yOffset";
    const dimensionOffsetDef = encoding[dimensionOffsetChannel];
    const dimensionOffsetField = isFieldDef(dimensionOffsetDef) ? vgField(dimensionOffsetDef, {}) : void 0;
    if (dimensionOffsetField && dimensionOffsetField !== stackedField) {
      groupbyChannels.push(dimensionOffsetChannel);
      groupbyFields.add(dimensionOffsetField);
    }
  }
  const stackBy = NONPOSITION_CHANNELS.reduce((sc, channel) => {
    if (channel !== "tooltip" && channelHasField(encoding, channel)) {
      const channelDef = encoding[channel];
      for (const cDef of array(channelDef)) {
        const fieldDef = getFieldDef(cDef);
        if (fieldDef.aggregate) {
          continue;
        }
        const f = vgField(fieldDef, {});
        if (
          // if fielddef is a repeat, just include it in the stack by
          !f || // otherwise, the field must be different from the groupBy fields.
          !groupbyFields.has(f)
        ) {
          sc.push({ channel, fieldDef });
        }
      }
    }
    return sc;
  }, []);
  let offset;
  if (stackedFieldDef.stack !== void 0) {
    if (isBoolean$1(stackedFieldDef.stack)) {
      offset = stackedFieldDef.stack ? "zero" : null;
    } else {
      offset = stackedFieldDef.stack;
    }
  } else if (STACK_BY_DEFAULT_MARKS.has(mark)) {
    offset = "zero";
  }
  if (!offset || !isStackOffset(offset)) {
    return null;
  }
  if (isAggregate$1(encoding) && stackBy.length === 0) {
    return null;
  }
  if (((_a2 = stackedFieldDef == null ? void 0 : stackedFieldDef.scale) == null ? void 0 : _a2.type) && ((_b = stackedFieldDef == null ? void 0 : stackedFieldDef.scale) == null ? void 0 : _b.type) !== ScaleType.LINEAR) {
    if (stackedFieldDef == null ? void 0 : stackedFieldDef.stack) {
      warn(cannotStackNonLinearScale(stackedFieldDef.scale.type));
    }
    return null;
  }
  if (isFieldOrDatumDef(encoding[getSecondaryRangeChannel(fieldChannel)])) {
    if (stackedFieldDef.stack !== void 0) {
      warn(cannotStackRangedMark(fieldChannel));
    }
    return null;
  }
  if (isFieldDef(stackedFieldDef) && stackedFieldDef.aggregate && !SUM_OPS.has(stackedFieldDef.aggregate)) {
    warn(stackNonSummativeAggregate(stackedFieldDef.aggregate));
  }
  return {
    groupbyChannels,
    groupbyFields,
    fieldChannel,
    impute: stackedFieldDef.impute === null ? false : isPathMark(mark),
    stackBy,
    offset
  };
}
function dropLineAndPoint(markDef) {
  const { point: _point, line: _line, ...mark } = markDef;
  return keys(mark).length > 1 ? mark : mark.type;
}
function dropLineAndPointFromConfig(config) {
  for (const mark of ["line", "area", "rule", "trail"]) {
    if (config[mark]) {
      config = {
        ...config,
        // TODO: remove as any
        [mark]: omit(config[mark], ["point", "line"])
      };
    }
  }
  return config;
}
function getPointOverlay(markDef, markConfig = {}, encoding) {
  if (markDef.point === "transparent") {
    return { opacity: 0 };
  } else if (markDef.point) {
    return isObject(markDef.point) ? markDef.point : {};
  } else if (markDef.point !== void 0) {
    return null;
  } else {
    if (markConfig.point || encoding.shape) {
      return isObject(markConfig.point) ? markConfig.point : {};
    }
    return void 0;
  }
}
function getLineOverlay(markDef, markConfig = {}) {
  if (markDef.line) {
    return markDef.line === true ? {} : markDef.line;
  } else if (markDef.line !== void 0) {
    return null;
  } else {
    if (markConfig.line) {
      return markConfig.line === true ? {} : markConfig.line;
    }
    return void 0;
  }
}
class PathOverlayNormalizer {
  constructor() {
    this.name = "path-overlay";
  }
  hasMatchingType(spec, config) {
    if (isUnitSpec(spec)) {
      const { mark, encoding } = spec;
      const markDef = isMarkDef(mark) ? mark : { type: mark };
      switch (markDef.type) {
        case "line":
        case "rule":
        case "trail":
          return !!getPointOverlay(markDef, config[markDef.type], encoding);
        case "area":
          return (
            // false / null are also included as we want to remove the properties
            !!getPointOverlay(markDef, config[markDef.type], encoding) || !!getLineOverlay(markDef, config[markDef.type])
          );
      }
    }
    return false;
  }
  run(spec, normParams, normalize2) {
    const { config } = normParams;
    const { params, projection, mark, name: name2, encoding: e2, ...outerSpec } = spec;
    const encoding = normalizeEncoding(e2, config);
    const markDef = isMarkDef(mark) ? mark : { type: mark };
    const pointOverlay = getPointOverlay(markDef, config[markDef.type], encoding);
    const lineOverlay = markDef.type === "area" && getLineOverlay(markDef, config[markDef.type]);
    const layer = [
      {
        name: name2,
        ...params ? { params } : {},
        mark: dropLineAndPoint({
          // TODO: extract this 0.7 to be shared with default opacity for point/tick/...
          ...markDef.type === "area" && markDef.opacity === void 0 && markDef.fillOpacity === void 0 ? { opacity: 0.7 } : {},
          ...markDef
        }),
        // drop shape from encoding as this might be used to trigger point overlay
        encoding: omit(encoding, ["shape"])
      }
    ];
    const stackProps = stack(markDef, encoding);
    let overlayEncoding = encoding;
    if (stackProps) {
      const { fieldChannel: stackFieldChannel, offset } = stackProps;
      overlayEncoding = {
        ...encoding,
        [stackFieldChannel]: {
          ...encoding[stackFieldChannel],
          ...offset ? { stack: offset } : {}
        }
      };
    }
    overlayEncoding = omit(overlayEncoding, ["y2", "x2"]);
    if (lineOverlay) {
      layer.push({
        ...projection ? { projection } : {},
        mark: {
          type: "line",
          ...pick(markDef, ["clip", "interpolate", "tension", "tooltip"]),
          ...lineOverlay
        },
        encoding: overlayEncoding
      });
    }
    if (pointOverlay) {
      layer.push({
        ...projection ? { projection } : {},
        mark: {
          type: "point",
          opacity: 1,
          filled: true,
          ...pick(markDef, ["clip", "tooltip"]),
          ...pointOverlay
        },
        encoding: overlayEncoding
      });
    }
    return normalize2({
      ...outerSpec,
      layer
    }, {
      ...normParams,
      config: dropLineAndPointFromConfig(config)
    });
  }
}
function replaceRepeaterInFacet(facet, repeater) {
  if (!repeater) {
    return facet;
  }
  if (isFacetMapping(facet)) {
    return replaceRepeaterInMapping(facet, repeater);
  }
  return replaceRepeaterInFieldDef(facet, repeater);
}
function replaceRepeaterInEncoding(encoding, repeater) {
  if (!repeater) {
    return encoding;
  }
  return replaceRepeaterInMapping(encoding, repeater);
}
function replaceRepeatInProp(prop, o, repeater) {
  const val = o[prop];
  if (isRepeatRef(val)) {
    if (val.repeat in repeater) {
      return { ...o, [prop]: repeater[val.repeat] };
    } else {
      warn(noSuchRepeatedValue(val.repeat));
      return void 0;
    }
  }
  return o;
}
function replaceRepeaterInFieldDef(fieldDef, repeater) {
  fieldDef = replaceRepeatInProp("field", fieldDef, repeater);
  if (fieldDef === void 0) {
    return void 0;
  } else if (fieldDef === null) {
    return null;
  }
  if (isSortableFieldDef(fieldDef) && isSortField(fieldDef.sort)) {
    const sort = replaceRepeatInProp("field", fieldDef.sort, repeater);
    fieldDef = {
      ...fieldDef,
      ...sort ? { sort } : {}
    };
  }
  return fieldDef;
}
function replaceRepeaterInFieldOrDatumDef(def, repeater) {
  if (isFieldDef(def)) {
    return replaceRepeaterInFieldDef(def, repeater);
  } else {
    const datumDef = replaceRepeatInProp("datum", def, repeater);
    if (datumDef !== def && !datumDef.type) {
      datumDef.type = "nominal";
    }
    return datumDef;
  }
}
function replaceRepeaterInChannelDef(channelDef, repeater) {
  if (isFieldOrDatumDef(channelDef)) {
    const fd = replaceRepeaterInFieldOrDatumDef(channelDef, repeater);
    if (fd) {
      return fd;
    } else if (isConditionalDef(channelDef)) {
      return { condition: channelDef.condition };
    }
  } else {
    if (hasConditionalFieldOrDatumDef(channelDef)) {
      const fd = replaceRepeaterInFieldOrDatumDef(channelDef.condition, repeater);
      if (fd) {
        return {
          ...channelDef,
          condition: fd
        };
      } else {
        const { condition, ...channelDefWithoutCondition } = channelDef;
        return channelDefWithoutCondition;
      }
    }
    return channelDef;
  }
  return void 0;
}
function replaceRepeaterInMapping(mapping, repeater) {
  const out = {};
  for (const channel in mapping) {
    if (has(mapping, channel)) {
      const channelDef = mapping[channel];
      if (isArray(channelDef)) {
        out[channel] = channelDef.map((cd) => replaceRepeaterInChannelDef(cd, repeater)).filter((cd) => cd);
      } else {
        const cd = replaceRepeaterInChannelDef(channelDef, repeater);
        if (cd !== void 0) {
          out[channel] = cd;
        }
      }
    }
  }
  return out;
}
class RuleForRangedLineNormalizer {
  constructor() {
    this.name = "RuleForRangedLine";
  }
  hasMatchingType(spec) {
    if (isUnitSpec(spec)) {
      const { encoding, mark } = spec;
      if (mark === "line" || isMarkDef(mark) && mark.type === "line") {
        for (const channel of SECONDARY_RANGE_CHANNEL) {
          const mainChannel = getMainRangeChannel(channel);
          const mainChannelDef = encoding[mainChannel];
          if (encoding[channel]) {
            if (isFieldDef(mainChannelDef) && !isBinned(mainChannelDef.bin) || isDatumDef(mainChannelDef)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  run(spec, params, normalize2) {
    const { encoding, mark } = spec;
    warn(lineWithRange(!!encoding.x2, !!encoding.y2));
    return normalize2({
      ...spec,
      mark: isObject(mark) ? { ...mark, type: "rule" } : "rule"
    }, params);
  }
}
class CoreNormalizer extends SpecMapper {
  constructor() {
    super(...arguments);
    this.nonFacetUnitNormalizers = [
      boxPlotNormalizer,
      errorBarNormalizer,
      errorBandNormalizer,
      new PathOverlayNormalizer(),
      new RuleForRangedLineNormalizer()
    ];
  }
  map(spec, params) {
    if (isUnitSpec(spec)) {
      const hasRow = channelHasField(spec.encoding, ROW);
      const hasColumn = channelHasField(spec.encoding, COLUMN);
      const hasFacet = channelHasField(spec.encoding, FACET);
      if (hasRow || hasColumn || hasFacet) {
        return this.mapFacetedUnit(spec, params);
      }
    }
    return super.map(spec, params);
  }
  // This is for normalizing non-facet unit
  mapUnit(spec, params) {
    const { parentEncoding, parentProjection } = params;
    const encoding = replaceRepeaterInEncoding(spec.encoding, params.repeater);
    const specWithReplacedEncoding = {
      ...spec,
      ...spec.name ? { name: [params.repeaterPrefix, spec.name].filter((n) => n).join("_") } : {},
      ...encoding ? { encoding } : {}
    };
    if (parentEncoding || parentProjection) {
      return this.mapUnitWithParentEncodingOrProjection(specWithReplacedEncoding, params);
    }
    const normalizeLayerOrUnit = this.mapLayerOrUnit.bind(this);
    for (const unitNormalizer of this.nonFacetUnitNormalizers) {
      if (unitNormalizer.hasMatchingType(specWithReplacedEncoding, params.config)) {
        return unitNormalizer.run(specWithReplacedEncoding, params, normalizeLayerOrUnit);
      }
    }
    return specWithReplacedEncoding;
  }
  mapRepeat(spec, params) {
    if (isLayerRepeatSpec(spec)) {
      return this.mapLayerRepeat(spec, params);
    } else {
      return this.mapNonLayerRepeat(spec, params);
    }
  }
  mapLayerRepeat(spec, params) {
    const { repeat, spec: childSpec, ...rest } = spec;
    const { row, column, layer } = repeat;
    const { repeater = {}, repeaterPrefix = "" } = params;
    if (row || column) {
      return this.mapRepeat({
        ...spec,
        repeat: {
          ...row ? { row } : {},
          ...column ? { column } : {}
        },
        spec: {
          repeat: { layer },
          spec: childSpec
        }
      }, params);
    } else {
      return {
        ...rest,
        layer: layer.map((layerValue) => {
          const childRepeater = {
            ...repeater,
            layer: layerValue
          };
          const childName = `${(childSpec.name ? `${childSpec.name}_` : "") + repeaterPrefix}child__layer_${varName(layerValue)}`;
          const child = this.mapLayerOrUnit(childSpec, { ...params, repeater: childRepeater, repeaterPrefix: childName });
          child.name = childName;
          return child;
        })
      };
    }
  }
  mapNonLayerRepeat(spec, params) {
    const { repeat, spec: childSpec, data, ...remainingProperties } = spec;
    if (!isArray(repeat) && spec.columns) {
      spec = omit(spec, ["columns"]);
      warn(columnsNotSupportByRowCol("repeat"));
    }
    const concat = [];
    const { repeater = {}, repeaterPrefix = "" } = params;
    const row = !isArray(repeat) && repeat.row || [repeater ? repeater.row : null];
    const column = !isArray(repeat) && repeat.column || [repeater ? repeater.column : null];
    const repeatValues = isArray(repeat) && repeat || [repeater ? repeater.repeat : null];
    for (const repeatValue of repeatValues) {
      for (const rowValue of row) {
        for (const columnValue of column) {
          const childRepeater = {
            repeat: repeatValue,
            row: rowValue,
            column: columnValue,
            layer: repeater.layer
          };
          const childName = (childSpec.name ? `${childSpec.name}_` : "") + repeaterPrefix + "child__" + (isArray(repeat) ? `${varName(repeatValue)}` : (repeat.row ? `row_${varName(rowValue)}` : "") + (repeat.column ? `column_${varName(columnValue)}` : ""));
          const child = this.map(childSpec, { ...params, repeater: childRepeater, repeaterPrefix: childName });
          child.name = childName;
          concat.push(omit(child, ["data"]));
        }
      }
    }
    const columns = isArray(repeat) ? spec.columns : repeat.column ? repeat.column.length : 1;
    return {
      data: childSpec.data ?? data,
      align: "all",
      ...remainingProperties,
      columns,
      concat
    };
  }
  mapFacet(spec, params) {
    const { facet } = spec;
    if (isFacetMapping(facet) && spec.columns) {
      spec = omit(spec, ["columns"]);
      warn(columnsNotSupportByRowCol("facet"));
    }
    return super.mapFacet(spec, params);
  }
  mapUnitWithParentEncodingOrProjection(spec, params) {
    const { encoding, projection } = spec;
    const { parentEncoding, parentProjection, config } = params;
    const mergedProjection = mergeProjection({ parentProjection, projection });
    const mergedEncoding = mergeEncoding({
      parentEncoding,
      encoding: replaceRepeaterInEncoding(encoding, params.repeater)
    });
    return this.mapUnit({
      ...spec,
      ...mergedProjection ? { projection: mergedProjection } : {},
      ...mergedEncoding ? { encoding: mergedEncoding } : {}
    }, { config });
  }
  mapFacetedUnit(spec, normParams) {
    const { row, column, facet, ...encoding } = spec.encoding;
    const { mark, width, projection, height, view, params, encoding: _, ...outerSpec } = spec;
    const { facetMapping, layout } = this.getFacetMappingAndLayout({ row, column, facet }, normParams);
    const newEncoding = replaceRepeaterInEncoding(encoding, normParams.repeater);
    return this.mapFacet({
      ...outerSpec,
      ...layout,
      // row / column has higher precedence than facet
      facet: facetMapping,
      spec: {
        ...width ? { width } : {},
        ...height ? { height } : {},
        ...view ? { view } : {},
        ...projection ? { projection } : {},
        mark,
        encoding: newEncoding,
        ...params ? { params } : {}
      }
    }, normParams);
  }
  getFacetMappingAndLayout(facets, params) {
    const { row, column, facet } = facets;
    if (row || column) {
      if (facet) {
        warn(facetChannelDropped([...row ? [ROW] : [], ...column ? [COLUMN] : []]));
      }
      const facetMapping = {};
      const layout = {};
      for (const channel of [ROW, COLUMN]) {
        const def = facets[channel];
        if (def) {
          const { align: align2, center, spacing, columns, ...defWithoutLayout } = def;
          facetMapping[channel] = defWithoutLayout;
          for (const prop of ["align", "center", "spacing"]) {
            if (def[prop] !== void 0) {
              layout[prop] ?? (layout[prop] = {});
              layout[prop][channel] = def[prop];
            }
          }
        }
      }
      return { facetMapping, layout };
    } else {
      const { align: align2, center, spacing, columns, ...facetMapping } = facet;
      return {
        facetMapping: replaceRepeaterInFacet(facetMapping, params.repeater),
        layout: {
          ...align2 ? { align: align2 } : {},
          ...center ? { center } : {},
          ...spacing ? { spacing } : {},
          ...columns ? { columns } : {}
        }
      };
    }
  }
  mapLayer(spec, { parentEncoding, parentProjection, ...otherParams }) {
    const { encoding, projection, ...rest } = spec;
    const params = {
      ...otherParams,
      parentEncoding: mergeEncoding({ parentEncoding, encoding, layer: true }),
      parentProjection: mergeProjection({ parentProjection, projection })
    };
    return super.mapLayer({
      ...rest,
      ...spec.name ? { name: [params.repeaterPrefix, spec.name].filter((n) => n).join("_") } : {}
    }, params);
  }
}
function mergeEncoding({ parentEncoding, encoding = {}, layer }) {
  let merged = {};
  if (parentEncoding) {
    const channels = /* @__PURE__ */ new Set([...keys(parentEncoding), ...keys(encoding)]);
    for (const channel of channels) {
      const channelDef = encoding[channel];
      const parentChannelDef = parentEncoding[channel];
      if (isFieldOrDatumDef(channelDef)) {
        const mergedChannelDef = {
          ...parentChannelDef,
          ...channelDef
        };
        merged[channel] = mergedChannelDef;
      } else if (hasConditionalFieldOrDatumDef(channelDef)) {
        merged[channel] = {
          ...channelDef,
          condition: {
            ...parentChannelDef,
            ...channelDef.condition
          }
        };
      } else if (channelDef || channelDef === null) {
        merged[channel] = channelDef;
      } else if (layer || isValueDef(parentChannelDef) || isSignalRef(parentChannelDef) || isFieldOrDatumDef(parentChannelDef) || isArray(parentChannelDef)) {
        merged[channel] = parentChannelDef;
      }
    }
  } else {
    merged = encoding;
  }
  return !merged || isEmpty(merged) ? void 0 : merged;
}
function mergeProjection(opt) {
  const { parentProjection, projection } = opt;
  if (parentProjection && projection) {
    warn(projectionOverridden({ parentProjection, projection }));
  }
  return projection ?? parentProjection;
}
function isFilter(t2) {
  return "filter" in t2;
}
function isImputeSequence(t2) {
  return (t2 == null ? void 0 : t2["stop"]) !== void 0;
}
function isLookup(t2) {
  return "lookup" in t2;
}
function isLookupData(from) {
  return "data" in from;
}
function isLookupSelection(from) {
  return "param" in from;
}
function isPivot(t2) {
  return "pivot" in t2;
}
function isDensity(t2) {
  return "density" in t2;
}
function isQuantile(t2) {
  return "quantile" in t2;
}
function isRegression(t2) {
  return "regression" in t2;
}
function isLoess(t2) {
  return "loess" in t2;
}
function isSample(t2) {
  return "sample" in t2;
}
function isWindow(t2) {
  return "window" in t2;
}
function isJoinAggregate(t2) {
  return "joinaggregate" in t2;
}
function isFlatten(t2) {
  return "flatten" in t2;
}
function isCalculate(t2) {
  return "calculate" in t2;
}
function isBin(t2) {
  return "bin" in t2;
}
function isImpute(t2) {
  return "impute" in t2;
}
function isTimeUnit(t2) {
  return "timeUnit" in t2;
}
function isAggregate(t2) {
  return "aggregate" in t2;
}
function isStack(t2) {
  return "stack" in t2;
}
function isFold(t2) {
  return "fold" in t2;
}
function isExtent(t2) {
  return "extent" in t2 && !("density" in t2);
}
function normalizeTransform(transform) {
  return transform.map((t2) => {
    if (isFilter(t2)) {
      return {
        filter: normalizeLogicalComposition(t2.filter, normalizePredicate$1)
      };
    }
    return t2;
  });
}
class SelectionCompatibilityNormalizer extends SpecMapper {
  map(spec, normParams) {
    normParams.emptySelections ?? (normParams.emptySelections = {});
    normParams.selectionPredicates ?? (normParams.selectionPredicates = {});
    spec = normalizeTransforms(spec, normParams);
    return super.map(spec, normParams);
  }
  mapLayerOrUnit(spec, normParams) {
    spec = normalizeTransforms(spec, normParams);
    if (spec.encoding) {
      const encoding = {};
      for (const [channel, enc] of entries$1(spec.encoding)) {
        encoding[channel] = normalizeChannelDef(enc, normParams);
      }
      spec = { ...spec, encoding };
    }
    return super.mapLayerOrUnit(spec, normParams);
  }
  mapUnit(spec, normParams) {
    const { selection, ...rest } = spec;
    if (selection) {
      return {
        ...rest,
        params: entries$1(selection).map(([name2, selDef]) => {
          const { init: value, bind, empty, ...select } = selDef;
          if (select.type === "single") {
            select.type = "point";
            select.toggle = false;
          } else if (select.type === "multi") {
            select.type = "point";
          }
          normParams.emptySelections[name2] = empty !== "none";
          for (const pred of vals(normParams.selectionPredicates[name2] ?? {})) {
            pred.empty = empty !== "none";
          }
          return { name: name2, value, select, bind };
        })
      };
    }
    return spec;
  }
}
function normalizeTransforms(spec, normParams) {
  const { transform: tx, ...rest } = spec;
  if (tx) {
    const transform = tx.map((t2) => {
      if (isFilter(t2)) {
        return { filter: normalizePredicate(t2, normParams) };
      } else if (isBin(t2) && isBinParams(t2.bin)) {
        return {
          ...t2,
          bin: normalizeBinExtent(t2.bin)
        };
      } else if (isLookup(t2)) {
        const { selection: param, ...from } = t2.from;
        return param ? {
          ...t2,
          from: { param, ...from }
        } : t2;
      }
      return t2;
    });
    return { ...rest, transform };
  }
  return spec;
}
function normalizeChannelDef(obj, normParams) {
  var _a2, _b;
  const enc = duplicate(obj);
  if (isFieldDef(enc) && isBinParams(enc.bin)) {
    enc.bin = normalizeBinExtent(enc.bin);
  }
  if (isScaleFieldDef(enc) && ((_b = (_a2 = enc.scale) == null ? void 0 : _a2.domain) == null ? void 0 : _b.selection)) {
    const { selection: param, ...domain2 } = enc.scale.domain;
    enc.scale.domain = { ...domain2, ...param ? { param } : {} };
  }
  if (isConditionalDef(enc)) {
    if (isArray(enc.condition)) {
      enc.condition = enc.condition.map((c) => {
        const { selection, param, test, ...cond } = c;
        return param ? c : { ...cond, test: normalizePredicate(c, normParams) };
      });
    } else {
      const { selection, param, test, ...cond } = normalizeChannelDef(enc.condition, normParams);
      enc.condition = param ? enc.condition : {
        ...cond,
        test: normalizePredicate(enc.condition, normParams)
      };
    }
  }
  return enc;
}
function normalizeBinExtent(bin2) {
  const ext = bin2.extent;
  if (ext == null ? void 0 : ext.selection) {
    const { selection: param, ...rest } = ext;
    return { ...bin2, extent: { ...rest, param } };
  }
  return bin2;
}
function normalizePredicate(op, normParams) {
  const normalizeSelectionComposition = (o) => {
    return normalizeLogicalComposition(o, (param) => {
      var _a2;
      const empty = normParams.emptySelections[param] ?? true;
      const pred = { param, empty };
      (_a2 = normParams.selectionPredicates)[param] ?? (_a2[param] = []);
      normParams.selectionPredicates[param].push(pred);
      return pred;
    });
  };
  return op.selection ? normalizeSelectionComposition(op.selection) : normalizeLogicalComposition(op.test || op.filter, (o) => o.selection ? normalizeSelectionComposition(o.selection) : o);
}
class TopLevelSelectionsNormalizer extends SpecMapper {
  map(spec, normParams) {
    const selections = normParams.selections ?? [];
    if (spec.params && !isUnitSpec(spec)) {
      const params = [];
      for (const param of spec.params) {
        if (isSelectionParameter(param)) {
          selections.push(param);
        } else {
          params.push(param);
        }
      }
      spec.params = params;
    }
    normParams.selections = selections;
    return super.map(spec, normParams);
  }
  mapUnit(spec, normParams) {
    const selections = normParams.selections;
    if (!selections || !selections.length)
      return spec;
    const path = (normParams.path ?? []).concat(spec.name);
    const params = [];
    for (const selection of selections) {
      if (!selection.views || !selection.views.length) {
        params.push(selection);
      } else {
        for (const view of selection.views) {
          if (isString(view) && (view === spec.name || path.includes(view)) || isArray(view) && // logic for backwards compatibility with view paths before we had unique names
          // @ts-ignore
          view.map((v) => path.indexOf(v)).every((v, i, arr) => v !== -1 && (i === 0 || v > arr[i - 1]))) {
            params.push(selection);
          }
        }
      }
    }
    if (params.length)
      spec.params = params;
    return spec;
  }
}
for (const method of ["mapFacet", "mapRepeat", "mapHConcat", "mapVConcat", "mapLayer"]) {
  const proto = TopLevelSelectionsNormalizer.prototype[method];
  TopLevelSelectionsNormalizer.prototype[method] = function(spec, params) {
    return proto.call(this, spec, addSpecNameToParams(spec, params));
  };
}
function addSpecNameToParams(spec, params) {
  return spec.name ? {
    ...params,
    path: (params.path ?? []).concat(spec.name)
  } : params;
}
function normalize(spec, config) {
  if (config === void 0) {
    config = initConfig(spec.config);
  }
  const normalizedSpec = normalizeGenericSpec(spec, config);
  const { width, height } = spec;
  const autosize = normalizeAutoSize(normalizedSpec, { width, height, autosize: spec.autosize }, config);
  return {
    ...normalizedSpec,
    ...autosize ? { autosize } : {}
  };
}
const coreNormalizer = new CoreNormalizer();
const selectionCompatNormalizer = new SelectionCompatibilityNormalizer();
const topLevelSelectionNormalizer = new TopLevelSelectionsNormalizer();
function normalizeGenericSpec(spec, config = {}) {
  const normParams = { config };
  return topLevelSelectionNormalizer.map(coreNormalizer.map(selectionCompatNormalizer.map(spec, normParams), normParams), normParams);
}
function _normalizeAutoSize(autosize) {
  return isString(autosize) ? { type: autosize } : autosize ?? {};
}
function normalizeAutoSize(spec, sizeInfo, config) {
  let { width, height } = sizeInfo;
  const isFitCompatible = isUnitSpec(spec) || isLayerSpec(spec);
  const autosizeDefault = {};
  if (!isFitCompatible) {
    if (width == "container") {
      warn(containerSizeNonSingle("width"));
      width = void 0;
    }
    if (height == "container") {
      warn(containerSizeNonSingle("height"));
      height = void 0;
    }
  } else {
    if (width == "container" && height == "container") {
      autosizeDefault.type = "fit";
      autosizeDefault.contains = "padding";
    } else if (width == "container") {
      autosizeDefault.type = "fit-x";
      autosizeDefault.contains = "padding";
    } else if (height == "container") {
      autosizeDefault.type = "fit-y";
      autosizeDefault.contains = "padding";
    }
  }
  const autosize = {
    type: "pad",
    ...autosizeDefault,
    ...config ? _normalizeAutoSize(config.autosize) : {},
    ..._normalizeAutoSize(spec.autosize)
  };
  if (autosize.type === "fit" && !isFitCompatible) {
    warn(FIT_NON_SINGLE);
    autosize.type = "pad";
  }
  if (width == "container" && !(autosize.type == "fit" || autosize.type == "fit-x")) {
    warn(containerSizeNotCompatibleWithAutosize("width"));
  }
  if (height == "container" && !(autosize.type == "fit" || autosize.type == "fit-y")) {
    warn(containerSizeNotCompatibleWithAutosize("height"));
  }
  if (deepEqual(autosize, { type: "pad" })) {
    return void 0;
  }
  return autosize;
}
function isFitType(autoSizeType) {
  return autoSizeType === "fit" || autoSizeType === "fit-x" || autoSizeType === "fit-y";
}
function getFitType(sizeType) {
  return sizeType ? `fit-${getPositionScaleChannel(sizeType)}` : "fit";
}
const TOP_LEVEL_PROPERTIES = [
  "background",
  "padding"
  // We do not include "autosize" here as it is supported by only unit and layer specs and thus need to be normalized
];
function extractTopLevelProperties(t2, includeParams) {
  const o = {};
  for (const p of TOP_LEVEL_PROPERTIES) {
    if (t2 && t2[p] !== void 0) {
      o[p] = signalRefOrValue(t2[p]);
    }
  }
  if (includeParams) {
    o.params = t2.params;
  }
  return o;
}
class Split {
  constructor(explicit = {}, implicit = {}) {
    this.explicit = explicit;
    this.implicit = implicit;
  }
  clone() {
    return new Split(duplicate(this.explicit), duplicate(this.implicit));
  }
  combine() {
    return {
      ...this.explicit,
      ...this.implicit
    };
  }
  get(key) {
    return getFirstDefined(this.explicit[key], this.implicit[key]);
  }
  getWithExplicit(key) {
    if (this.explicit[key] !== void 0) {
      return { explicit: true, value: this.explicit[key] };
    } else if (this.implicit[key] !== void 0) {
      return { explicit: false, value: this.implicit[key] };
    }
    return { explicit: false, value: void 0 };
  }
  setWithExplicit(key, { value, explicit }) {
    if (value !== void 0) {
      this.set(key, value, explicit);
    }
  }
  set(key, value, explicit) {
    delete this[explicit ? "implicit" : "explicit"][key];
    this[explicit ? "explicit" : "implicit"][key] = value;
    return this;
  }
  copyKeyFromSplit(key, { explicit, implicit }) {
    if (explicit[key] !== void 0) {
      this.set(key, explicit[key], true);
    } else if (implicit[key] !== void 0) {
      this.set(key, implicit[key], false);
    }
  }
  copyKeyFromObject(key, s) {
    if (s[key] !== void 0) {
      this.set(key, s[key], true);
    }
  }
  /**
   * Merge split object into this split object. Properties from the other split
   * overwrite properties from this split.
   */
  copyAll(other) {
    for (const key of keys(other.combine())) {
      const val = other.getWithExplicit(key);
      this.setWithExplicit(key, val);
    }
  }
}
function makeExplicit(value) {
  return {
    explicit: true,
    value
  };
}
function makeImplicit(value) {
  return {
    explicit: false,
    value
  };
}
function tieBreakByComparing(compare2) {
  return (v1, v2, property, propertyOf) => {
    const diff = compare2(v1.value, v2.value);
    if (diff > 0) {
      return v1;
    } else if (diff < 0) {
      return v2;
    }
    return defaultTieBreaker(v1, v2, property, propertyOf);
  };
}
function defaultTieBreaker(v1, v2, property, propertyOf) {
  if (v1.explicit && v2.explicit) {
    warn(mergeConflictingProperty(property, propertyOf, v1.value, v2.value));
  }
  return v1;
}
function mergeValuesWithExplicit(v1, v2, property, propertyOf, tieBreaker = defaultTieBreaker) {
  if (v1 === void 0 || v1.value === void 0) {
    return v2;
  }
  if (v1.explicit && !v2.explicit) {
    return v1;
  } else if (v2.explicit && !v1.explicit) {
    return v2;
  } else if (deepEqual(v1.value, v2.value)) {
    return v1;
  } else {
    return tieBreaker(v1, v2, property, propertyOf);
  }
}
class AncestorParse extends Split {
  constructor(explicit = {}, implicit = {}, parseNothing = false) {
    super(explicit, implicit);
    this.explicit = explicit;
    this.implicit = implicit;
    this.parseNothing = parseNothing;
  }
  clone() {
    const clone2 = super.clone();
    clone2.parseNothing = this.parseNothing;
    return clone2;
  }
}
function isUrlData(data) {
  return "url" in data;
}
function isInlineData(data) {
  return "values" in data;
}
function isNamedData(data) {
  return "name" in data && !isUrlData(data) && !isInlineData(data) && !isGenerator(data);
}
function isGenerator(data) {
  return data && (isSequenceGenerator(data) || isSphereGenerator(data) || isGraticuleGenerator(data));
}
function isSequenceGenerator(data) {
  return "sequence" in data;
}
function isSphereGenerator(data) {
  return "sphere" in data;
}
function isGraticuleGenerator(data) {
  return "graticule" in data;
}
var DataSourceType;
(function(DataSourceType2) {
  DataSourceType2[DataSourceType2["Raw"] = 0] = "Raw";
  DataSourceType2[DataSourceType2["Main"] = 1] = "Main";
  DataSourceType2[DataSourceType2["Row"] = 2] = "Row";
  DataSourceType2[DataSourceType2["Column"] = 3] = "Column";
  DataSourceType2[DataSourceType2["Lookup"] = 4] = "Lookup";
})(DataSourceType || (DataSourceType = {}));
function assembleProjection(proj) {
  const { signals, hasLegend, index, ...rest } = proj;
  rest.field = replacePathInField(rest.field);
  return rest;
}
function assembleInit(init2, isExpr = true, wrap = identity) {
  if (isArray(init2)) {
    const assembled = init2.map((v) => assembleInit(v, isExpr, wrap));
    return isExpr ? `[${assembled.join(", ")}]` : assembled;
  } else if (isDateTime(init2)) {
    if (isExpr) {
      return wrap(dateTimeToExpr(init2));
    } else {
      return wrap(dateTimeToTimestamp(init2));
    }
  }
  return isExpr ? wrap(stringify(init2)) : init2;
}
function assembleUnitSelectionSignals(model, signals) {
  for (const selCmpt of vals(model.component.selection ?? {})) {
    const name2 = selCmpt.name;
    let modifyExpr = `${name2}${TUPLE}, ${selCmpt.resolve === "global" ? "true" : `{unit: ${unitName(model)}}`}`;
    for (const c of selectionCompilers) {
      if (!c.defined(selCmpt))
        continue;
      if (c.signals)
        signals = c.signals(model, selCmpt, signals);
      if (c.modifyExpr)
        modifyExpr = c.modifyExpr(model, selCmpt, modifyExpr);
    }
    signals.push({
      name: name2 + MODIFY,
      on: [
        {
          events: { signal: selCmpt.name + TUPLE },
          update: `modify(${$(selCmpt.name + STORE)}, ${modifyExpr})`
        }
      ]
    });
  }
  return cleanupEmptyOnArray(signals);
}
function assembleFacetSignals(model, signals) {
  if (model.component.selection && keys(model.component.selection).length) {
    const name2 = $(model.getName("cell"));
    signals.unshift({
      name: "facet",
      value: {},
      on: [
        {
          events: eventSelector("mousemove", "scope"),
          update: `isTuple(facet) ? facet : group(${name2}).datum`
        }
      ]
    });
  }
  return cleanupEmptyOnArray(signals);
}
function assembleTopLevelSignals(model, signals) {
  let hasSelections = false;
  for (const selCmpt of vals(model.component.selection ?? {})) {
    const name2 = selCmpt.name;
    const store = $(name2 + STORE);
    const hasSg = signals.filter((s) => s.name === name2);
    if (hasSg.length === 0) {
      const resolve = selCmpt.resolve === "global" ? "union" : selCmpt.resolve;
      const isPoint = selCmpt.type === "point" ? ", true, true)" : ")";
      signals.push({
        name: selCmpt.name,
        update: `${VL_SELECTION_RESOLVE}(${store}, ${$(resolve)}${isPoint}`
      });
    }
    hasSelections = true;
    for (const c of selectionCompilers) {
      if (c.defined(selCmpt) && c.topLevelSignals) {
        signals = c.topLevelSignals(model, selCmpt, signals);
      }
    }
  }
  if (hasSelections) {
    const hasUnit = signals.filter((s) => s.name === "unit");
    if (hasUnit.length === 0) {
      signals.unshift({
        name: "unit",
        value: {},
        on: [{ events: "mousemove", update: "isTuple(group()) ? group() : unit" }]
      });
    }
  }
  return cleanupEmptyOnArray(signals);
}
function assembleUnitSelectionData(model, data) {
  const dataCopy = [...data];
  const unit = unitName(model, { escape: false });
  for (const selCmpt of vals(model.component.selection ?? {})) {
    const store = { name: selCmpt.name + STORE };
    if (selCmpt.project.hasSelectionId) {
      store.transform = [{ type: "collect", sort: { field: SELECTION_ID } }];
    }
    if (selCmpt.init) {
      const fields = selCmpt.project.items.map(assembleProjection);
      store.values = selCmpt.project.hasSelectionId ? selCmpt.init.map((i) => ({ unit, [SELECTION_ID]: assembleInit(i, false)[0] })) : selCmpt.init.map((i) => ({ unit, fields, values: assembleInit(i, false) }));
    }
    const contains2 = dataCopy.filter((d) => d.name === selCmpt.name + STORE);
    if (!contains2.length) {
      dataCopy.push(store);
    }
  }
  return dataCopy;
}
function assembleUnitSelectionMarks(model, marks) {
  for (const selCmpt of vals(model.component.selection ?? {})) {
    for (const c of selectionCompilers) {
      if (c.defined(selCmpt) && c.marks) {
        marks = c.marks(model, selCmpt, marks);
      }
    }
  }
  return marks;
}
function assembleLayerSelectionMarks(model, marks) {
  for (const child of model.children) {
    if (isUnitModel(child)) {
      marks = assembleUnitSelectionMarks(child, marks);
    }
  }
  return marks;
}
function assembleSelectionScaleDomain(model, extent, scaleCmpt, domain2) {
  const parsedExtent = parseSelectionExtent(model, extent.param, extent);
  return {
    signal: hasContinuousDomain(scaleCmpt.get("type")) && isArray(domain2) && domain2[0] > domain2[1] ? `isValid(${parsedExtent}) && reverse(${parsedExtent})` : parsedExtent
  };
}
function cleanupEmptyOnArray(signals) {
  return signals.map((s) => {
    if (s.on && !s.on.length)
      delete s.on;
    return s;
  });
}
class DataFlowNode {
  constructor(parent, debugName) {
    this.debugName = debugName;
    this._children = [];
    this._parent = null;
    if (parent) {
      this.parent = parent;
    }
  }
  /**
   * Clone this node with a deep copy but don't clone links to children or parents.
   */
  clone() {
    throw new Error("Cannot clone node");
  }
  get parent() {
    return this._parent;
  }
  /**
   * Set the parent of the node and also add this node to the parent's children.
   */
  set parent(parent) {
    this._parent = parent;
    if (parent) {
      parent.addChild(this);
    }
  }
  get children() {
    return this._children;
  }
  numChildren() {
    return this._children.length;
  }
  addChild(child, loc) {
    if (this._children.includes(child)) {
      warn(ADD_SAME_CHILD_TWICE);
      return;
    }
    if (loc !== void 0) {
      this._children.splice(loc, 0, child);
    } else {
      this._children.push(child);
    }
  }
  removeChild(oldChild) {
    const loc = this._children.indexOf(oldChild);
    this._children.splice(loc, 1);
    return loc;
  }
  /**
   * Remove node from the dataflow.
   */
  remove() {
    let loc = this._parent.removeChild(this);
    for (const child of this._children) {
      child._parent = this._parent;
      this._parent.addChild(child, loc++);
    }
  }
  /**
   * Insert another node as a parent of this node.
   */
  insertAsParentOf(other) {
    const parent = other.parent;
    parent.removeChild(this);
    this.parent = parent;
    other.parent = this;
  }
  swapWithParent() {
    const parent = this._parent;
    const newParent = parent.parent;
    for (const child of this._children) {
      child.parent = parent;
    }
    this._children = [];
    parent.removeChild(this);
    const loc = parent.parent.removeChild(parent);
    this._parent = newParent;
    newParent.addChild(this, loc);
    parent.parent = this;
  }
}
class OutputNode extends DataFlowNode {
  clone() {
    const cloneObj = new this.constructor();
    cloneObj.debugName = `clone_${this.debugName}`;
    cloneObj._source = this._source;
    cloneObj._name = `clone_${this._name}`;
    cloneObj.type = this.type;
    cloneObj.refCounts = this.refCounts;
    cloneObj.refCounts[cloneObj._name] = 0;
    return cloneObj;
  }
  /**
   * @param source The name of the source. Will change in assemble.
   * @param type The type of the output node.
   * @param refCounts A global ref counter map.
   */
  constructor(parent, source, type2, refCounts) {
    super(parent, source);
    this.type = type2;
    this.refCounts = refCounts;
    this._source = this._name = source;
    if (this.refCounts && !(this._name in this.refCounts)) {
      this.refCounts[this._name] = 0;
    }
  }
  dependentFields() {
    return /* @__PURE__ */ new Set();
  }
  producedFields() {
    return /* @__PURE__ */ new Set();
  }
  hash() {
    if (this._hash === void 0) {
      this._hash = `Output ${uniqueId()}`;
    }
    return this._hash;
  }
  /**
   * Request the datasource name and increase the ref counter.
   *
   * During the parsing phase, this will return the simple name such as 'main' or 'raw'.
   * It is crucial to request the name from an output node to mark it as a required node.
   * If nobody ever requests the name, this datasource will not be instantiated in the assemble phase.
   *
   * In the assemble phase, this will return the correct name.
   */
  getSource() {
    this.refCounts[this._name]++;
    return this._source;
  }
  isRequired() {
    return !!this.refCounts[this._name];
  }
  setSource(source) {
    this._source = source;
  }
}
function isTimeUnitTransformComponent(timeUnitComponent) {
  return timeUnitComponent.as !== void 0;
}
function offsetAs(field) {
  return `${field}_end`;
}
class TimeUnitNode extends DataFlowNode {
  clone() {
    return new TimeUnitNode(null, duplicate(this.formula));
  }
  constructor(parent, formula) {
    super(parent);
    this.formula = formula;
  }
  static makeFromEncoding(parent, model) {
    const formula = model.reduceFieldDef((timeUnitComponent, fieldDef) => {
      const { field, timeUnit } = fieldDef;
      if (timeUnit) {
        let component;
        if (isBinnedTimeUnit(timeUnit)) {
          if (isUnitModel(model)) {
            const { mark } = model;
            if (isRectBasedMark(mark) || !!fieldDef.bandPosition) {
              component = {
                timeUnit: normalizeTimeUnit(timeUnit),
                field
              };
            }
          }
        } else {
          component = {
            as: vgField(fieldDef, { forAs: true }),
            field,
            timeUnit
          };
        }
        if (component) {
          timeUnitComponent[hash(component)] = component;
        }
      }
      return timeUnitComponent;
    }, {});
    if (isEmpty(formula)) {
      return null;
    }
    return new TimeUnitNode(parent, formula);
  }
  static makeFromTransform(parent, t2) {
    const { timeUnit, ...other } = { ...t2 };
    const normalizedTimeUnit = normalizeTimeUnit(timeUnit);
    const component = {
      ...other,
      timeUnit: normalizedTimeUnit
    };
    return new TimeUnitNode(parent, {
      [hash(component)]: component
    });
  }
  /**
   * Merge together TimeUnitNodes assigning the children of `other` to `this`
   * and removing `other`.
   */
  merge(other) {
    this.formula = { ...this.formula };
    for (const key in other.formula) {
      if (!this.formula[key]) {
        this.formula[key] = other.formula[key];
      }
    }
    for (const child of other.children) {
      other.removeChild(child);
      child.parent = this;
    }
    other.remove();
  }
  /**
   * Remove time units coming from the other node.
   */
  removeFormulas(fields) {
    const newFormula = {};
    for (const [key, timeUnitComponent] of entries$1(this.formula)) {
      const fieldAs = isTimeUnitTransformComponent(timeUnitComponent) ? timeUnitComponent.as : `${timeUnitComponent.field}_end`;
      if (!fields.has(fieldAs)) {
        newFormula[key] = timeUnitComponent;
      }
    }
    this.formula = newFormula;
  }
  producedFields() {
    return new Set(vals(this.formula).map((f) => {
      return isTimeUnitTransformComponent(f) ? f.as : offsetAs(f.field);
    }));
  }
  dependentFields() {
    return new Set(vals(this.formula).map((f) => f.field));
  }
  hash() {
    return `TimeUnit ${hash(this.formula)}`;
  }
  assemble() {
    const transforms = [];
    for (const f of vals(this.formula)) {
      if (isTimeUnitTransformComponent(f)) {
        const { field, as, timeUnit } = f;
        const { unit, utc, ...params } = normalizeTimeUnit(timeUnit);
        transforms.push({
          field: replacePathInField(field),
          type: "timeunit",
          ...unit ? { units: getTimeUnitParts(unit) } : {},
          ...utc ? { timezone: "utc" } : {},
          ...params,
          as: [as, `${as}_end`]
        });
      } else if (f) {
        const { field, timeUnit } = f;
        const smallestUnit = getSmallestTimeUnitPart(timeUnit == null ? void 0 : timeUnit.unit);
        const { part, step } = getDateTimePartAndStep(smallestUnit, timeUnit.step);
        transforms.push({
          type: "formula",
          expr: `timeOffset('${part}', datum['${field}'], ${step})`,
          as: offsetAs(field)
        });
      }
    }
    return transforms;
  }
}
const TUPLE_FIELDS = "_tuple_fields";
class SelectionProjectionComponent {
  constructor(...items) {
    this.items = items;
    this.hasChannel = {};
    this.hasField = {};
    this.hasSelectionId = false;
  }
}
const project = {
  defined: () => {
    return true;
  },
  parse: (model, selCmpt, selDef) => {
    const name2 = selCmpt.name;
    const proj = selCmpt.project ?? (selCmpt.project = new SelectionProjectionComponent());
    const parsed = {};
    const timeUnits = {};
    const signals = /* @__PURE__ */ new Set();
    const signalName = (p, range2) => {
      const suffix = range2 === "visual" ? p.channel : p.field;
      let sg = varName(`${name2}_${suffix}`);
      for (let counter = 1; signals.has(sg); counter++) {
        sg = varName(`${name2}_${suffix}_${counter}`);
      }
      signals.add(sg);
      return { [range2]: sg };
    };
    const type2 = selCmpt.type;
    const cfg = model.config.selection[type2];
    const init2 = selDef.value !== void 0 ? array(selDef.value) : null;
    let { fields, encodings } = isObject(selDef.select) ? selDef.select : {};
    if (!fields && !encodings && init2) {
      for (const initVal of init2) {
        if (!isObject(initVal)) {
          continue;
        }
        for (const key of keys(initVal)) {
          if (isSingleDefUnitChannel(key)) {
            (encodings || (encodings = [])).push(key);
          } else {
            if (type2 === "interval") {
              warn(INTERVAL_INITIALIZED_WITH_POS);
              encodings = cfg.encodings;
            } else {
              (fields ?? (fields = [])).push(key);
            }
          }
        }
      }
    }
    if (!fields && !encodings) {
      encodings = cfg.encodings;
      if ("fields" in cfg) {
        fields = cfg.fields;
      }
    }
    for (const channel of encodings ?? []) {
      const fieldDef = model.fieldDef(channel);
      if (fieldDef) {
        let field = fieldDef.field;
        if (fieldDef.aggregate) {
          warn(cannotProjectAggregate(channel, fieldDef.aggregate));
          continue;
        } else if (!field) {
          warn(cannotProjectOnChannelWithoutField(channel));
          continue;
        }
        if (fieldDef.timeUnit && !isBinnedTimeUnit(fieldDef.timeUnit)) {
          field = model.vgField(channel);
          const component = {
            timeUnit: fieldDef.timeUnit,
            as: field,
            field: fieldDef.field
          };
          timeUnits[hash(component)] = component;
        }
        if (!parsed[field]) {
          const tplType = type2 === "interval" && isScaleChannel(channel) && hasContinuousDomain(model.getScaleComponent(channel).get("type")) ? "R" : fieldDef.bin ? "R-RE" : "E";
          const p = { field, channel, type: tplType, index: proj.items.length };
          p.signals = { ...signalName(p, "data"), ...signalName(p, "visual") };
          proj.items.push(parsed[field] = p);
          proj.hasField[field] = parsed[field];
          proj.hasSelectionId = proj.hasSelectionId || field === SELECTION_ID;
          if (isGeoPositionChannel(channel)) {
            p.geoChannel = channel;
            p.channel = getPositionChannelFromLatLong(channel);
            proj.hasChannel[p.channel] = parsed[field];
          } else {
            proj.hasChannel[channel] = parsed[field];
          }
        }
      } else {
        warn(cannotProjectOnChannelWithoutField(channel));
      }
    }
    for (const field of fields ?? []) {
      if (proj.hasField[field])
        continue;
      const p = { type: "E", field, index: proj.items.length };
      p.signals = { ...signalName(p, "data") };
      proj.items.push(p);
      proj.hasField[field] = p;
      proj.hasSelectionId = proj.hasSelectionId || field === SELECTION_ID;
    }
    if (init2) {
      selCmpt.init = init2.map((v) => {
        return proj.items.map((p) => isObject(v) ? v[p.geoChannel || p.channel] !== void 0 ? v[p.geoChannel || p.channel] : v[p.field] : v);
      });
    }
    if (!isEmpty(timeUnits)) {
      proj.timeUnit = new TimeUnitNode(null, timeUnits);
    }
  },
  signals: (model, selCmpt, allSignals) => {
    const name2 = selCmpt.name + TUPLE_FIELDS;
    const hasSignal = allSignals.filter((s) => s.name === name2);
    return hasSignal.length > 0 || selCmpt.project.hasSelectionId ? allSignals : allSignals.concat({
      name: name2,
      value: selCmpt.project.items.map(assembleProjection)
    });
  }
};
const scaleBindings = {
  defined: (selCmpt) => {
    return selCmpt.type === "interval" && selCmpt.resolve === "global" && selCmpt.bind && selCmpt.bind === "scales";
  },
  parse: (model, selCmpt) => {
    const bound = selCmpt.scales = [];
    for (const proj of selCmpt.project.items) {
      const channel = proj.channel;
      if (!isScaleChannel(channel)) {
        continue;
      }
      const scale = model.getScaleComponent(channel);
      const scaleType2 = scale ? scale.get("type") : void 0;
      if (!scale || !hasContinuousDomain(scaleType2)) {
        warn(SCALE_BINDINGS_CONTINUOUS);
        continue;
      }
      scale.set("selectionExtent", { param: selCmpt.name, field: proj.field }, true);
      bound.push(proj);
    }
  },
  topLevelSignals: (model, selCmpt, signals) => {
    const bound = selCmpt.scales.filter((proj) => signals.filter((s) => s.name === proj.signals.data).length === 0);
    if (!model.parent || isTopLevelLayer(model) || bound.length === 0) {
      return signals;
    }
    const namedSg = signals.filter((s) => s.name === selCmpt.name)[0];
    let update = namedSg.update;
    if (update.indexOf(VL_SELECTION_RESOLVE) >= 0) {
      namedSg.update = `{${bound.map((proj) => `${$(replacePathInField(proj.field))}: ${proj.signals.data}`).join(", ")}}`;
    } else {
      for (const proj of bound) {
        const mapping = `${$(replacePathInField(proj.field))}: ${proj.signals.data}`;
        if (!update.includes(mapping)) {
          update = `${update.substring(0, update.length - 1)}, ${mapping}}`;
        }
      }
      namedSg.update = update;
    }
    return signals.concat(bound.map((proj) => ({ name: proj.signals.data })));
  },
  signals: (model, selCmpt, signals) => {
    if (model.parent && !isTopLevelLayer(model)) {
      for (const proj of selCmpt.scales) {
        const signal = signals.filter((s) => s.name === proj.signals.data)[0];
        signal.push = "outer";
        delete signal.value;
        delete signal.update;
      }
    }
    return signals;
  }
};
function domain(model, channel) {
  const scale = $(model.scaleName(channel));
  return `domain(${scale})`;
}
function isTopLevelLayer(model) {
  return model.parent && isLayerModel(model.parent) && !model.parent.parent;
}
const BRUSH = "_brush";
const SCALE_TRIGGER = "_scale_trigger";
const GEO_INIT_TICK = "geo_interval_init_tick";
const INIT = "_init";
const CENTER = "_center";
const interval = {
  defined: (selCmpt) => selCmpt.type === "interval",
  parse: (model, selCmpt, selDef) => {
    var _a2;
    if (model.hasProjection) {
      const def = { ...isObject(selDef.select) ? selDef.select : {} };
      def.fields = [SELECTION_ID];
      if (!def.encodings) {
        def.encodings = selDef.value ? keys(selDef.value) : [LONGITUDE, LATITUDE];
      }
      selDef.select = { type: "interval", ...def };
    }
    if (selCmpt.translate && !scaleBindings.defined(selCmpt)) {
      const filterExpr = `!event.item || event.item.mark.name !== ${$(selCmpt.name + BRUSH)}`;
      for (const evt of selCmpt.events) {
        if (!evt.between) {
          warn(`${evt} is not an ordered event stream for interval selections.`);
          continue;
        }
        const filters = array((_a2 = evt.between[0]).filter ?? (_a2.filter = []));
        if (filters.indexOf(filterExpr) < 0) {
          filters.push(filterExpr);
        }
      }
    }
  },
  signals: (model, selCmpt, signals) => {
    const name2 = selCmpt.name;
    const tupleSg = name2 + TUPLE;
    const channels = vals(selCmpt.project.hasChannel).filter((p) => p.channel === X || p.channel === Y);
    const init2 = selCmpt.init ? selCmpt.init[0] : null;
    signals.push(...channels.reduce((arr, proj) => arr.concat(channelSignals(model, selCmpt, proj, init2 && init2[proj.index])), []));
    if (!model.hasProjection) {
      if (!scaleBindings.defined(selCmpt)) {
        const triggerSg = name2 + SCALE_TRIGGER;
        const scaleTriggers = channels.map((proj) => {
          const channel = proj.channel;
          const { data: dname, visual: vname } = proj.signals;
          const scaleName = $(model.scaleName(channel));
          const scaleType2 = model.getScaleComponent(channel).get("type");
          const toNum = hasContinuousDomain(scaleType2) ? "+" : "";
          return `(!isArray(${dname}) || (${toNum}invert(${scaleName}, ${vname})[0] === ${toNum}${dname}[0] && ${toNum}invert(${scaleName}, ${vname})[1] === ${toNum}${dname}[1]))`;
        });
        if (scaleTriggers.length) {
          signals.push({
            name: triggerSg,
            value: {},
            on: [
              {
                events: channels.map((proj) => ({ scale: model.scaleName(proj.channel) })),
                update: scaleTriggers.join(" && ") + ` ? ${triggerSg} : {}`
              }
            ]
          });
        }
      }
      const dataSignals = channels.map((proj) => proj.signals.data);
      const update = `unit: ${unitName(model)}, fields: ${name2 + TUPLE_FIELDS}, values`;
      return signals.concat({
        name: tupleSg,
        ...init2 ? { init: `{${update}: ${assembleInit(init2)}}` } : {},
        ...dataSignals.length ? {
          on: [
            {
              events: [{ signal: dataSignals.join(" || ") }],
              update: `${dataSignals.join(" && ")} ? {${update}: [${dataSignals}]} : null`
            }
          ]
        } : {}
      });
    } else {
      const projection = $(model.projectionName());
      const centerSg = model.projectionName() + CENTER;
      const { x, y } = selCmpt.project.hasChannel;
      const xvname = x && x.signals.visual;
      const yvname = y && y.signals.visual;
      const xinit = x ? init2 && init2[x.index] : `${centerSg}[0]`;
      const yinit = y ? init2 && init2[y.index] : `${centerSg}[1]`;
      const sizeSg = (layout) => model.getSizeSignalRef(layout).signal;
      const bbox = `[[${xvname ? xvname + "[0]" : "0"}, ${yvname ? yvname + "[0]" : "0"}],[${xvname ? xvname + "[1]" : sizeSg("width")}, ${yvname ? yvname + "[1]" : sizeSg("height")}]]`;
      if (init2) {
        signals.unshift({
          name: name2 + INIT,
          init: `[scale(${projection}, [${x ? xinit[0] : xinit}, ${y ? yinit[0] : yinit}]), scale(${projection}, [${x ? xinit[1] : xinit}, ${y ? yinit[1] : yinit}])]`
        });
        if (!x || !y) {
          const hasCenterSg = signals.find((s) => s.name === centerSg);
          if (!hasCenterSg) {
            signals.unshift({
              name: centerSg,
              update: `invert(${projection}, [${sizeSg("width")}/2, ${sizeSg("height")}/2])`
            });
          }
        }
      }
      const intersect = `intersect(${bbox}, {markname: ${$(model.getName("marks"))}}, unit.mark)`;
      const base = `{unit: ${unitName(model)}}`;
      const update = `vlSelectionTuples(${intersect}, ${base})`;
      const visualSignals = channels.map((proj) => proj.signals.visual);
      return signals.concat({
        name: tupleSg,
        on: [
          {
            events: [
              ...visualSignals.length ? [{ signal: visualSignals.join(" || ") }] : [],
              ...init2 ? [{ signal: GEO_INIT_TICK }] : []
            ],
            update
          }
        ]
      });
    }
  },
  topLevelSignals: (model, selCmpt, signals) => {
    if (isUnitModel(model) && model.hasProjection && selCmpt.init) {
      const hasTick = signals.filter((s) => s.name === GEO_INIT_TICK);
      if (!hasTick.length) {
        signals.unshift({
          name: GEO_INIT_TICK,
          value: null,
          on: [
            {
              events: "timer{1}",
              update: `${GEO_INIT_TICK} === null ? {} : ${GEO_INIT_TICK}`
            }
          ]
        });
      }
    }
    return signals;
  },
  marks: (model, selCmpt, marks) => {
    const name2 = selCmpt.name;
    const { x, y } = selCmpt.project.hasChannel;
    const xvname = x == null ? void 0 : x.signals.visual;
    const yvname = y == null ? void 0 : y.signals.visual;
    const store = `data(${$(selCmpt.name + STORE)})`;
    if (scaleBindings.defined(selCmpt) || !x && !y) {
      return marks;
    }
    const update = {
      x: x !== void 0 ? { signal: `${xvname}[0]` } : { value: 0 },
      y: y !== void 0 ? { signal: `${yvname}[0]` } : { value: 0 },
      x2: x !== void 0 ? { signal: `${xvname}[1]` } : { field: { group: "width" } },
      y2: y !== void 0 ? { signal: `${yvname}[1]` } : { field: { group: "height" } }
    };
    if (selCmpt.resolve === "global") {
      for (const key of keys(update)) {
        update[key] = [
          {
            test: `${store}.length && ${store}[0].unit === ${unitName(model)}`,
            ...update[key]
          },
          { value: 0 }
        ];
      }
    }
    const { fill, fillOpacity, cursor: cursor2, ...stroke } = selCmpt.mark;
    const vgStroke = keys(stroke).reduce((def, k) => {
      def[k] = [
        {
          test: [x !== void 0 && `${xvname}[0] !== ${xvname}[1]`, y !== void 0 && `${yvname}[0] !== ${yvname}[1]`].filter((t2) => t2).join(" && "),
          value: stroke[k]
        },
        { value: null }
      ];
      return def;
    }, {});
    return [
      {
        name: `${name2 + BRUSH}_bg`,
        type: "rect",
        clip: true,
        encode: {
          enter: {
            fill: { value: fill },
            fillOpacity: { value: fillOpacity }
          },
          update
        }
      },
      ...marks,
      {
        name: name2 + BRUSH,
        type: "rect",
        clip: true,
        encode: {
          enter: {
            ...cursor2 ? { cursor: { value: cursor2 } } : {},
            fill: { value: "transparent" }
          },
          update: { ...update, ...vgStroke }
        }
      }
    ];
  }
};
function channelSignals(model, selCmpt, proj, init2) {
  const scaledInterval = !model.hasProjection;
  const channel = proj.channel;
  const vname = proj.signals.visual;
  const scaleName = $(scaledInterval ? model.scaleName(channel) : model.projectionName());
  const scaled = (str) => `scale(${scaleName}, ${str})`;
  const size = model.getSizeSignalRef(channel === X ? "width" : "height").signal;
  const coord = `${channel}(unit)`;
  const von = selCmpt.events.reduce((def, evt) => {
    return [
      ...def,
      { events: evt.between[0], update: `[${coord}, ${coord}]` },
      { events: evt, update: `[${vname}[0], clamp(${coord}, 0, ${size})]` }
      // Brush End
    ];
  }, []);
  if (scaledInterval) {
    const dname = proj.signals.data;
    const hasScales = scaleBindings.defined(selCmpt);
    const scale = model.getScaleComponent(channel);
    const scaleType2 = scale ? scale.get("type") : void 0;
    const vinit = init2 ? { init: assembleInit(init2, true, scaled) } : { value: [] };
    von.push({
      events: { signal: selCmpt.name + SCALE_TRIGGER },
      update: hasContinuousDomain(scaleType2) ? `[${scaled(`${dname}[0]`)}, ${scaled(`${dname}[1]`)}]` : `[0, 0]`
    });
    return hasScales ? [{ name: dname, on: [] }] : [
      { name: vname, ...vinit, on: von },
      {
        name: dname,
        ...init2 ? { init: assembleInit(init2) } : {},
        on: [
          {
            events: { signal: vname },
            update: `${vname}[0] === ${vname}[1] ? null : invert(${scaleName}, ${vname})`
          }
        ]
      }
    ];
  } else {
    const initIdx = channel === X ? 0 : 1;
    const initSg = selCmpt.name + INIT;
    const vinit = init2 ? { init: `[${initSg}[0][${initIdx}], ${initSg}[1][${initIdx}]]` } : { value: [] };
    return [{ name: vname, ...vinit, on: von }];
  }
}
const point$1 = {
  defined: (selCmpt) => selCmpt.type === "point",
  signals: (model, selCmpt, signals) => {
    const name2 = selCmpt.name;
    const fieldsSg = name2 + TUPLE_FIELDS;
    const project2 = selCmpt.project;
    const datum = "(item().isVoronoi ? datum.datum : datum)";
    const brushes = vals(model.component.selection ?? {}).reduce((acc, cmpt) => {
      return cmpt.type === "interval" ? acc.concat(cmpt.name + BRUSH) : acc;
    }, []).map((b) => `indexof(item().mark.name, '${b}') < 0`).join(" && ");
    const test = `datum && item().mark.marktype !== 'group' && indexof(item().mark.role, 'legend') < 0${brushes ? ` && ${brushes}` : ""}`;
    let update = `unit: ${unitName(model)}, `;
    if (selCmpt.project.hasSelectionId) {
      update += `${SELECTION_ID}: ${datum}[${$(SELECTION_ID)}]`;
    } else {
      const values2 = project2.items.map((p) => {
        const fieldDef = model.fieldDef(p.channel);
        return (fieldDef == null ? void 0 : fieldDef.bin) ? `[${datum}[${$(model.vgField(p.channel, {}))}], ${datum}[${$(model.vgField(p.channel, { binSuffix: "end" }))}]]` : `${datum}[${$(p.field)}]`;
      }).join(", ");
      update += `fields: ${fieldsSg}, values: [${values2}]`;
    }
    const events = selCmpt.events;
    return signals.concat([
      {
        name: name2 + TUPLE,
        on: events ? [
          {
            events,
            update: `${test} ? {${update}} : null`,
            force: true
          }
        ] : []
      }
    ]);
  }
};
function wrapCondition(model, channelDef, vgChannel, refFn) {
  const condition = isConditionalDef(channelDef) && channelDef.condition;
  const valueRef = refFn(channelDef);
  if (condition) {
    const conditions = array(condition);
    const vgConditions = conditions.map((c) => {
      const conditionValueRef = refFn(c);
      if (isConditionalParameter(c)) {
        const { param, empty } = c;
        const test = parseSelectionPredicate(model, { param, empty });
        return { test, ...conditionValueRef };
      } else {
        const test = expression(model, c.test);
        return { test, ...conditionValueRef };
      }
    });
    return {
      [vgChannel]: [...vgConditions, ...valueRef !== void 0 ? [valueRef] : []]
    };
  } else {
    return valueRef !== void 0 ? { [vgChannel]: valueRef } : {};
  }
}
function text$1(model, channel = "text") {
  const channelDef = model.encoding[channel];
  return wrapCondition(model, channelDef, channel, (cDef) => textRef(cDef, model.config));
}
function textRef(channelDef, config, expr = "datum") {
  if (channelDef) {
    if (isValueDef(channelDef)) {
      return signalOrValueRef(channelDef.value);
    }
    if (isFieldOrDatumDef(channelDef)) {
      const { format, formatType } = getFormatMixins(channelDef);
      return formatSignalRef({ fieldOrDatumDef: channelDef, format, formatType, expr, config });
    }
  }
  return void 0;
}
function tooltip(model, opt = {}) {
  const { encoding, markDef, config, stack: stack2 } = model;
  const channelDef = encoding.tooltip;
  if (isArray(channelDef)) {
    return { tooltip: tooltipRefForEncoding({ tooltip: channelDef }, stack2, config, opt) };
  } else {
    const datum = opt.reactiveGeom ? "datum.datum" : "datum";
    return wrapCondition(model, channelDef, "tooltip", (cDef) => {
      const tooltipRefFromChannelDef = textRef(cDef, config, datum);
      if (tooltipRefFromChannelDef) {
        return tooltipRefFromChannelDef;
      }
      if (cDef === null) {
        return void 0;
      }
      let markTooltip = getMarkPropOrConfig("tooltip", markDef, config);
      if (markTooltip === true) {
        markTooltip = { content: "encoding" };
      }
      if (isString(markTooltip)) {
        return { value: markTooltip };
      } else if (isObject(markTooltip)) {
        if (isSignalRef(markTooltip)) {
          return markTooltip;
        } else if (markTooltip.content === "encoding") {
          return tooltipRefForEncoding(encoding, stack2, config, opt);
        } else {
          return { signal: datum };
        }
      }
      return void 0;
    });
  }
}
function tooltipData(encoding, stack2, config, { reactiveGeom } = {}) {
  const formatConfig = { ...config, ...config.tooltipFormat };
  const toSkip = {};
  const expr = reactiveGeom ? "datum.datum" : "datum";
  const tuples = [];
  function add2(fDef, channel) {
    const mainChannel = getMainRangeChannel(channel);
    const fieldDef = isTypedFieldDef(fDef) ? fDef : {
      ...fDef,
      type: encoding[mainChannel].type
      // for secondary field def, copy type from main channel
    };
    const title2 = fieldDef.title || defaultTitle(fieldDef, formatConfig);
    const key = array(title2).join(", ");
    let value;
    if (isXorY(channel)) {
      const channel2 = channel === "x" ? "x2" : "y2";
      const fieldDef2 = getFieldDef(encoding[channel2]);
      if (isBinned(fieldDef.bin) && fieldDef2) {
        const startField = vgField(fieldDef, { expr });
        const endField = vgField(fieldDef2, { expr });
        const { format, formatType } = getFormatMixins(fieldDef);
        value = binFormatExpression(startField, endField, format, formatType, formatConfig);
        toSkip[channel2] = true;
      }
    }
    if ((isXorY(channel) || channel === THETA || channel === RADIUS) && stack2 && stack2.fieldChannel === channel && stack2.offset === "normalize") {
      const { format, formatType } = getFormatMixins(fieldDef);
      value = formatSignalRef({
        fieldOrDatumDef: fieldDef,
        format,
        formatType,
        expr,
        config: formatConfig,
        normalizeStack: true
      }).signal;
    }
    value ?? (value = textRef(fieldDef, formatConfig, expr).signal);
    tuples.push({ channel, key, value });
  }
  forEach(encoding, (channelDef, channel) => {
    if (isFieldDef(channelDef)) {
      add2(channelDef, channel);
    } else if (hasConditionalFieldDef(channelDef)) {
      add2(channelDef.condition, channel);
    }
  });
  const out = {};
  for (const { channel, key, value } of tuples) {
    if (!toSkip[channel] && !out[key]) {
      out[key] = value;
    }
  }
  return out;
}
function tooltipRefForEncoding(encoding, stack2, config, { reactiveGeom } = {}) {
  const data = tooltipData(encoding, stack2, config, { reactiveGeom });
  const keyValues = entries$1(data).map(([key, value]) => `"${key}": ${value}`);
  return keyValues.length > 0 ? { signal: `{${keyValues.join(", ")}}` } : void 0;
}
function aria(model) {
  const { markDef, config } = model;
  const enableAria = getMarkPropOrConfig("aria", markDef, config);
  if (enableAria === false) {
    return {};
  }
  return {
    ...enableAria ? { aria: enableAria } : {},
    ...ariaRoleDescription(model),
    ...description$1(model)
  };
}
function ariaRoleDescription(model) {
  const { mark, markDef, config } = model;
  if (config.aria === false) {
    return {};
  }
  const ariaRoleDesc = getMarkPropOrConfig("ariaRoleDescription", markDef, config);
  if (ariaRoleDesc != null) {
    return { ariaRoleDescription: { value: ariaRoleDesc } };
  }
  return mark in VG_MARK_INDEX ? {} : { ariaRoleDescription: { value: mark } };
}
function description$1(model) {
  const { encoding, markDef, config, stack: stack2 } = model;
  const channelDef = encoding.description;
  if (channelDef) {
    return wrapCondition(model, channelDef, "description", (cDef) => textRef(cDef, model.config));
  }
  const descriptionValue = getMarkPropOrConfig("description", markDef, config);
  if (descriptionValue != null) {
    return {
      description: signalOrValueRef(descriptionValue)
    };
  }
  if (config.aria === false) {
    return {};
  }
  const data = tooltipData(encoding, stack2, config);
  if (isEmpty(data)) {
    return void 0;
  }
  return {
    description: {
      signal: entries$1(data).map(([key, value], index) => `"${index > 0 ? "; " : ""}${key}: " + (${value})`).join(" + ")
    }
  };
}
function nonPosition(channel, model, opt = {}) {
  const { markDef, encoding, config } = model;
  const { vgChannel } = opt;
  let { defaultRef, defaultValue } = opt;
  if (defaultRef === void 0) {
    defaultValue ?? (defaultValue = getMarkPropOrConfig(channel, markDef, config, { vgChannel, ignoreVgConfig: true }));
    if (defaultValue !== void 0) {
      defaultRef = signalOrValueRef(defaultValue);
    }
  }
  const channelDef = encoding[channel];
  return wrapCondition(model, channelDef, vgChannel ?? channel, (cDef) => {
    return midPoint({
      channel,
      channelDef: cDef,
      markDef,
      config,
      scaleName: model.scaleName(channel),
      scale: model.getScaleComponent(channel),
      stack: null,
      defaultRef
    });
  });
}
function color(model, opt = { filled: void 0 }) {
  const { markDef, encoding, config } = model;
  const { type: markType } = markDef;
  const filled = opt.filled ?? getMarkPropOrConfig("filled", markDef, config);
  const transparentIfNeeded = contains(["bar", "point", "circle", "square", "geoshape"], markType) ? "transparent" : void 0;
  const defaultFill = getMarkPropOrConfig(filled === true ? "color" : void 0, markDef, config, { vgChannel: "fill" }) ?? // need to add this manually as getMarkConfig normally drops config.mark[channel] if vgChannel is specified
  config.mark[filled === true && "color"] ?? // If there is no fill, always fill symbols, bar, geoshape
  // with transparent fills https://github.com/vega/vega-lite/issues/1316
  transparentIfNeeded;
  const defaultStroke = getMarkPropOrConfig(filled === false ? "color" : void 0, markDef, config, { vgChannel: "stroke" }) ?? // need to add this manually as getMarkConfig normally drops config.mark[channel] if vgChannel is specified
  config.mark[filled === false && "color"];
  const colorVgChannel = filled ? "fill" : "stroke";
  const fillStrokeMarkDefAndConfig = {
    ...defaultFill ? { fill: signalOrValueRef(defaultFill) } : {},
    ...defaultStroke ? { stroke: signalOrValueRef(defaultStroke) } : {}
  };
  if (markDef.color && (filled ? markDef.fill : markDef.stroke)) {
    warn(droppingColor("property", { fill: "fill" in markDef, stroke: "stroke" in markDef }));
  }
  return {
    ...fillStrokeMarkDefAndConfig,
    ...nonPosition("color", model, {
      vgChannel: colorVgChannel,
      defaultValue: filled ? defaultFill : defaultStroke
    }),
    ...nonPosition("fill", model, {
      // if there is encoding.fill, include default fill just in case we have conditional-only fill encoding
      defaultValue: encoding.fill ? defaultFill : void 0
    }),
    ...nonPosition("stroke", model, {
      // if there is encoding.stroke, include default fill just in case we have conditional-only stroke encoding
      defaultValue: encoding.stroke ? defaultStroke : void 0
    })
  };
}
function zindex(model) {
  const { encoding, mark } = model;
  const order = encoding.order;
  if (!isPathMark(mark) && isValueDef(order)) {
    return wrapCondition(model, order, "zindex", (cd) => signalOrValueRef(cd.value));
  }
  return {};
}
function positionOffset({ channel: baseChannel, markDef, encoding = {}, model, bandPosition }) {
  const channel = `${baseChannel}Offset`;
  const defaultValue = markDef[channel];
  const channelDef = encoding[channel];
  if ((channel === "xOffset" || channel === "yOffset") && channelDef) {
    const ref = midPoint({
      channel,
      channelDef,
      markDef,
      config: model == null ? void 0 : model.config,
      scaleName: model.scaleName(channel),
      scale: model.getScaleComponent(channel),
      stack: null,
      defaultRef: signalOrValueRef(defaultValue),
      bandPosition
    });
    return { offsetType: "encoding", offset: ref };
  }
  const markDefOffsetValue = markDef[channel];
  if (markDefOffsetValue) {
    return { offsetType: "visual", offset: markDefOffsetValue };
  }
  return {};
}
function pointPosition(channel, model, { defaultPos, vgChannel }) {
  const { encoding, markDef, config, stack: stack2 } = model;
  const channelDef = encoding[channel];
  const channel2Def = encoding[getSecondaryRangeChannel(channel)];
  const scaleName = model.scaleName(channel);
  const scale = model.getScaleComponent(channel);
  const { offset, offsetType } = positionOffset({
    channel,
    markDef,
    encoding,
    model,
    bandPosition: 0.5
  });
  const defaultRef = pointPositionDefaultRef({
    model,
    defaultPos,
    channel,
    scaleName,
    scale
  });
  const valueRef = !channelDef && isXorY(channel) && (encoding.latitude || encoding.longitude) ? (
    // use geopoint output if there are lat/long and there is no point position overriding lat/long.
    { field: model.getName(channel) }
  ) : positionRef({
    channel,
    channelDef,
    channel2Def,
    markDef,
    config,
    scaleName,
    scale,
    stack: stack2,
    offset,
    defaultRef,
    bandPosition: offsetType === "encoding" ? 0 : void 0
  });
  return valueRef ? { [vgChannel || channel]: valueRef } : void 0;
}
function positionRef(params) {
  const { channel, channelDef, scaleName, stack: stack2, offset, markDef } = params;
  if (isFieldOrDatumDef(channelDef) && stack2 && channel === stack2.fieldChannel) {
    if (isFieldDef(channelDef)) {
      let bandPosition = channelDef.bandPosition;
      if (bandPosition === void 0 && markDef.type === "text" && (channel === "radius" || channel === "theta")) {
        bandPosition = 0.5;
      }
      if (bandPosition !== void 0) {
        return interpolatedSignalRef({
          scaleName,
          fieldOrDatumDef: channelDef,
          startSuffix: "start",
          bandPosition,
          offset
        });
      }
    }
    return valueRefForFieldOrDatumDef(channelDef, scaleName, { suffix: "end" }, { offset });
  }
  return midPointRefWithPositionInvalidTest(params);
}
function pointPositionDefaultRef({ model, defaultPos, channel, scaleName, scale }) {
  const { markDef, config } = model;
  return () => {
    const mainChannel = getMainRangeChannel(channel);
    const vgChannel = getVgPositionChannel(channel);
    const definedValueOrConfig = getMarkPropOrConfig(channel, markDef, config, { vgChannel });
    if (definedValueOrConfig !== void 0) {
      return widthHeightValueOrSignalRef(channel, definedValueOrConfig);
    }
    switch (defaultPos) {
      case "zeroOrMin":
      case "zeroOrMax":
        if (scaleName) {
          const scaleType2 = scale.get("type");
          if (contains([ScaleType.LOG, ScaleType.TIME, ScaleType.UTC], scaleType2))
            ;
          else {
            if (scale.domainDefinitelyIncludesZero()) {
              return {
                scale: scaleName,
                value: 0
              };
            }
          }
        }
        if (defaultPos === "zeroOrMin") {
          return mainChannel === "y" ? { field: { group: "height" } } : { value: 0 };
        } else {
          switch (mainChannel) {
            case "radius":
              return {
                signal: `min(${model.width.signal},${model.height.signal})/2`
              };
            case "theta":
              return { signal: "2*PI" };
            case "x":
              return { field: { group: "width" } };
            case "y":
              return { value: 0 };
          }
        }
        break;
      case "mid": {
        const sizeRef = model[getSizeChannel(channel)];
        return { ...sizeRef, mult: 0.5 };
      }
    }
    return void 0;
  };
}
const ALIGNED_X_CHANNEL = {
  left: "x",
  center: "xc",
  right: "x2"
};
const BASELINED_Y_CHANNEL = {
  top: "y",
  middle: "yc",
  bottom: "y2"
};
function vgAlignedPositionChannel(channel, markDef, config, defaultAlign = "middle") {
  if (channel === "radius" || channel === "theta") {
    return getVgPositionChannel(channel);
  }
  const alignChannel = channel === "x" ? "align" : "baseline";
  const align2 = getMarkPropOrConfig(alignChannel, markDef, config);
  let alignExcludingSignal;
  if (isSignalRef(align2)) {
    warn(rangeMarkAlignmentCannotBeExpression(alignChannel));
    alignExcludingSignal = void 0;
  } else {
    alignExcludingSignal = align2;
  }
  if (channel === "x") {
    return ALIGNED_X_CHANNEL[alignExcludingSignal || (defaultAlign === "top" ? "left" : "center")];
  } else {
    return BASELINED_Y_CHANNEL[alignExcludingSignal || defaultAlign];
  }
}
function pointOrRangePosition(channel, model, { defaultPos, defaultPos2, range: range2 }) {
  if (range2) {
    return rangePosition(channel, model, { defaultPos, defaultPos2 });
  }
  return pointPosition(channel, model, { defaultPos });
}
function rangePosition(channel, model, { defaultPos, defaultPos2 }) {
  const { markDef, config } = model;
  const channel2 = getSecondaryRangeChannel(channel);
  const sizeChannel = getSizeChannel(channel);
  const pos2Mixins = pointPosition2OrSize(model, defaultPos2, channel2);
  const vgChannel = pos2Mixins[sizeChannel] ? (
    // If there is width/height, we need to position the marks based on the alignment.
    vgAlignedPositionChannel(channel, markDef, config)
  ) : (
    // Otherwise, make sure to apply to the right Vg Channel (for arc mark)
    getVgPositionChannel(channel)
  );
  return {
    ...pointPosition(channel, model, { defaultPos, vgChannel }),
    ...pos2Mixins
  };
}
function pointPosition2OrSize(model, defaultPos, channel) {
  const { encoding, mark, markDef, stack: stack2, config } = model;
  const baseChannel = getMainRangeChannel(channel);
  const sizeChannel = getSizeChannel(channel);
  const vgChannel = getVgPositionChannel(channel);
  const channelDef = encoding[baseChannel];
  const scaleName = model.scaleName(baseChannel);
  const scale = model.getScaleComponent(baseChannel);
  const { offset } = channel in encoding || channel in markDef ? positionOffset({ channel, markDef, encoding, model }) : positionOffset({ channel: baseChannel, markDef, encoding, model });
  if (!channelDef && (channel === "x2" || channel === "y2") && (encoding.latitude || encoding.longitude)) {
    const vgSizeChannel = getSizeChannel(channel);
    const size = model.markDef[vgSizeChannel];
    if (size != null) {
      return {
        [vgSizeChannel]: { value: size }
      };
    } else {
      return {
        [vgChannel]: { field: model.getName(channel) }
      };
    }
  }
  const valueRef = position2Ref({
    channel,
    channelDef,
    channel2Def: encoding[channel],
    markDef,
    config,
    scaleName,
    scale,
    stack: stack2,
    offset,
    defaultRef: void 0
  });
  if (valueRef !== void 0) {
    return { [vgChannel]: valueRef };
  }
  return position2orSize(channel, markDef) || position2orSize(channel, {
    [channel]: getMarkStyleConfig(channel, markDef, config.style),
    [sizeChannel]: getMarkStyleConfig(sizeChannel, markDef, config.style)
  }) || position2orSize(channel, config[mark]) || position2orSize(channel, config.mark) || {
    [vgChannel]: pointPositionDefaultRef({
      model,
      defaultPos,
      channel,
      scaleName,
      scale
    })()
  };
}
function position2Ref({ channel, channelDef, channel2Def, markDef, config, scaleName, scale, stack: stack2, offset, defaultRef }) {
  if (isFieldOrDatumDef(channelDef) && stack2 && // If fieldChannel is X and channel is X2 (or Y and Y2)
  channel.charAt(0) === stack2.fieldChannel.charAt(0)) {
    return valueRefForFieldOrDatumDef(channelDef, scaleName, { suffix: "start" }, { offset });
  }
  return midPointRefWithPositionInvalidTest({
    channel,
    channelDef: channel2Def,
    scaleName,
    scale,
    stack: stack2,
    markDef,
    config,
    offset,
    defaultRef
  });
}
function position2orSize(channel, markDef) {
  const sizeChannel = getSizeChannel(channel);
  const vgChannel = getVgPositionChannel(channel);
  if (markDef[vgChannel] !== void 0) {
    return { [vgChannel]: widthHeightValueOrSignalRef(channel, markDef[vgChannel]) };
  } else if (markDef[channel] !== void 0) {
    return { [vgChannel]: widthHeightValueOrSignalRef(channel, markDef[channel]) };
  } else if (markDef[sizeChannel]) {
    const dimensionSize = markDef[sizeChannel];
    if (isRelativeBandSize(dimensionSize)) {
      warn(relativeBandSizeNotSupported(sizeChannel));
    } else {
      return { [sizeChannel]: widthHeightValueOrSignalRef(channel, dimensionSize) };
    }
  }
  return void 0;
}
function rectPosition(model, channel) {
  const { config, encoding, markDef } = model;
  const mark = markDef.type;
  const channel2 = getSecondaryRangeChannel(channel);
  const sizeChannel = getSizeChannel(channel);
  const channelDef = encoding[channel];
  const channelDef2 = encoding[channel2];
  const scale = model.getScaleComponent(channel);
  const scaleType2 = scale ? scale.get("type") : void 0;
  const orient2 = markDef.orient;
  const hasSizeDef = encoding[sizeChannel] ?? encoding.size ?? getMarkPropOrConfig("size", markDef, config, { vgChannel: sizeChannel });
  const offsetScaleChannel = getOffsetChannel(channel);
  const isBarBand = mark === "bar" && (channel === "x" ? orient2 === "vertical" : orient2 === "horizontal");
  if (isFieldDef(channelDef) && (isBinning(channelDef.bin) || isBinned(channelDef.bin) || channelDef.timeUnit && !channelDef2) && !(hasSizeDef && !isRelativeBandSize(hasSizeDef)) && !encoding[offsetScaleChannel] && !hasDiscreteDomain(scaleType2)) {
    return rectBinPosition({
      fieldDef: channelDef,
      fieldDef2: channelDef2,
      channel,
      model
    });
  } else if ((isFieldOrDatumDef(channelDef) && hasDiscreteDomain(scaleType2) || isBarBand) && !channelDef2) {
    return positionAndSize(channelDef, channel, model);
  } else {
    return rangePosition(channel, model, { defaultPos: "zeroOrMax", defaultPos2: "zeroOrMin" });
  }
}
function defaultSizeRef(sizeChannel, scaleName, scale, config, bandSize, hasFieldDef, mark) {
  if (isRelativeBandSize(bandSize)) {
    if (scale) {
      const scaleType2 = scale.get("type");
      if (scaleType2 === "band") {
        let bandWidth = `bandwidth('${scaleName}')`;
        if (bandSize.band !== 1) {
          bandWidth = `${bandSize.band} * ${bandWidth}`;
        }
        const minBandSize = getMarkConfig("minBandSize", { type: mark }, config);
        return { signal: minBandSize ? `max(${signalOrStringValue(minBandSize)}, ${bandWidth})` : bandWidth };
      } else if (bandSize.band !== 1) {
        warn(cannotUseRelativeBandSizeWithNonBandScale(scaleType2));
        bandSize = void 0;
      }
    } else {
      return {
        mult: bandSize.band,
        field: { group: sizeChannel }
      };
    }
  } else if (isSignalRef(bandSize)) {
    return bandSize;
  } else if (bandSize) {
    return { value: bandSize };
  }
  if (scale) {
    const scaleRange = scale.get("range");
    if (isVgRangeStep(scaleRange) && isNumber(scaleRange.step)) {
      return { value: scaleRange.step - 2 };
    }
  }
  if (!hasFieldDef) {
    const { bandPaddingInner, barBandPaddingInner, rectBandPaddingInner } = config.scale;
    const padding2 = getFirstDefined(bandPaddingInner, mark === "bar" ? barBandPaddingInner : rectBandPaddingInner);
    if (isSignalRef(padding2)) {
      return { signal: `(1 - (${padding2.signal})) * ${sizeChannel}` };
    } else if (isNumber(padding2)) {
      return { signal: `${1 - padding2} * ${sizeChannel}` };
    }
  }
  const defaultStep = getViewConfigDiscreteStep(config.view, sizeChannel);
  return { value: defaultStep - 2 };
}
function positionAndSize(fieldDef, channel, model) {
  const { markDef, encoding, config, stack: stack2 } = model;
  const orient2 = markDef.orient;
  const scaleName = model.scaleName(channel);
  const scale = model.getScaleComponent(channel);
  const vgSizeChannel = getSizeChannel(channel);
  const channel2 = getSecondaryRangeChannel(channel);
  const offsetScaleChannel = getOffsetChannel(channel);
  const offsetScaleName = model.scaleName(offsetScaleChannel);
  const offsetScale = model.getScaleComponent(getOffsetScaleChannel(channel));
  const useVlSizeChannel = orient2 === "horizontal" && channel === "y" || orient2 === "vertical" && channel === "x";
  let sizeMixins;
  if (encoding.size || markDef.size) {
    if (useVlSizeChannel) {
      sizeMixins = nonPosition("size", model, {
        vgChannel: vgSizeChannel,
        defaultRef: signalOrValueRef(markDef.size)
      });
    } else {
      warn(cannotApplySizeToNonOrientedMark(markDef.type));
    }
  }
  const hasSizeFromMarkOrEncoding = !!sizeMixins;
  const bandSize = getBandSize({ channel, fieldDef, markDef, config, scaleType: scale == null ? void 0 : scale.get("type"), useVlSizeChannel });
  sizeMixins = sizeMixins || {
    [vgSizeChannel]: defaultSizeRef(vgSizeChannel, offsetScaleName || scaleName, offsetScale || scale, config, bandSize, !!fieldDef, markDef.type)
  };
  const defaultBandAlign = (scale == null ? void 0 : scale.get("type")) === "band" && isRelativeBandSize(bandSize) && !hasSizeFromMarkOrEncoding ? "top" : "middle";
  const vgChannel = vgAlignedPositionChannel(channel, markDef, config, defaultBandAlign);
  const center = vgChannel === "xc" || vgChannel === "yc";
  const { offset, offsetType } = positionOffset({ channel, markDef, encoding, model, bandPosition: center ? 0.5 : 0 });
  const posRef = midPointRefWithPositionInvalidTest({
    channel,
    channelDef: fieldDef,
    markDef,
    config,
    scaleName,
    scale,
    stack: stack2,
    offset,
    defaultRef: pointPositionDefaultRef({ model, defaultPos: "mid", channel, scaleName, scale }),
    bandPosition: center ? offsetType === "encoding" ? 0 : 0.5 : isSignalRef(bandSize) ? { signal: `(1-${bandSize})/2` } : isRelativeBandSize(bandSize) ? (1 - bandSize.band) / 2 : 0
  });
  if (vgSizeChannel) {
    return { [vgChannel]: posRef, ...sizeMixins };
  } else {
    const vgChannel2 = getVgPositionChannel(channel2);
    const sizeRef = sizeMixins[vgSizeChannel];
    const sizeOffset = offset ? { ...sizeRef, offset } : sizeRef;
    return {
      [vgChannel]: posRef,
      // posRef might be an array that wraps position invalid test
      [vgChannel2]: isArray(posRef) ? [posRef[0], { ...posRef[1], offset: sizeOffset }] : {
        ...posRef,
        offset: sizeOffset
      }
    };
  }
}
function getBinSpacing(channel, spacing, reverse2, translate2, offset, minBandSize, bandSizeExpr) {
  if (isPolarPositionChannel(channel)) {
    return 0;
  }
  const isEnd = channel === "x" || channel === "y2";
  const spacingOffset = isEnd ? -spacing / 2 : spacing / 2;
  if (isSignalRef(reverse2) || isSignalRef(offset) || isSignalRef(translate2) || minBandSize) {
    const reverseExpr = signalOrStringValue(reverse2);
    const offsetExpr = signalOrStringValue(offset);
    const translateExpr = signalOrStringValue(translate2);
    const minBandSizeExpr = signalOrStringValue(minBandSize);
    const sign = isEnd ? "" : "-";
    const spacingAndSizeOffset = minBandSize ? `(${bandSizeExpr} < ${minBandSizeExpr} ? ${sign}0.5 * (${minBandSizeExpr} - (${bandSizeExpr})) : ${spacingOffset})` : spacingOffset;
    const t2 = translateExpr ? `${translateExpr} + ` : "";
    const r = reverseExpr ? `(${reverseExpr} ? -1 : 1) * ` : "";
    const o = offsetExpr ? `(${offsetExpr} + ${spacingAndSizeOffset})` : spacingAndSizeOffset;
    return {
      signal: t2 + r + o
    };
  } else {
    offset = offset || 0;
    return translate2 + (reverse2 ? -offset - spacingOffset : +offset + spacingOffset);
  }
}
function rectBinPosition({ fieldDef, fieldDef2, channel, model }) {
  var _a2;
  const { config, markDef, encoding } = model;
  const scale = model.getScaleComponent(channel);
  const scaleName = model.scaleName(channel);
  const scaleType2 = scale ? scale.get("type") : void 0;
  const reverse2 = scale.get("reverse");
  const bandSize = getBandSize({ channel, fieldDef, markDef, config, scaleType: scaleType2 });
  const axis = (_a2 = model.component.axes[channel]) == null ? void 0 : _a2[0];
  const axisTranslate = (axis == null ? void 0 : axis.get("translate")) ?? 0.5;
  const spacing = isXorY(channel) ? getMarkPropOrConfig("binSpacing", markDef, config) ?? 0 : 0;
  const channel2 = getSecondaryRangeChannel(channel);
  const vgChannel = getVgPositionChannel(channel);
  const vgChannel2 = getVgPositionChannel(channel2);
  const minBandSize = getMarkConfig("minBandSize", markDef, config);
  const { offset } = positionOffset({ channel, markDef, encoding, model, bandPosition: 0 });
  const { offset: offset2 } = positionOffset({ channel: channel2, markDef, encoding, model, bandPosition: 0 });
  const bandSizeExpr = binSizeExpr({ fieldDef, scaleName });
  const binSpacingOffset = getBinSpacing(channel, spacing, reverse2, axisTranslate, offset, minBandSize, bandSizeExpr);
  const binSpacingOffset2 = getBinSpacing(channel2, spacing, reverse2, axisTranslate, offset2 ?? offset, minBandSize, bandSizeExpr);
  const bandPosition = isSignalRef(bandSize) ? { signal: `(1-${bandSize.signal})/2` } : isRelativeBandSize(bandSize) ? (1 - bandSize.band) / 2 : 0.5;
  if (isBinning(fieldDef.bin) || fieldDef.timeUnit) {
    return {
      [vgChannel2]: rectBinRef({
        fieldDef,
        scaleName,
        bandPosition,
        offset: binSpacingOffset2
      }),
      [vgChannel]: rectBinRef({
        fieldDef,
        scaleName,
        bandPosition: isSignalRef(bandPosition) ? { signal: `1-${bandPosition.signal}` } : 1 - bandPosition,
        offset: binSpacingOffset
      })
    };
  } else if (isBinned(fieldDef.bin)) {
    const startRef = valueRefForFieldOrDatumDef(fieldDef, scaleName, {}, { offset: binSpacingOffset2 });
    if (isFieldDef(fieldDef2)) {
      return {
        [vgChannel2]: startRef,
        [vgChannel]: valueRefForFieldOrDatumDef(fieldDef2, scaleName, {}, { offset: binSpacingOffset })
      };
    } else if (isBinParams(fieldDef.bin) && fieldDef.bin.step) {
      return {
        [vgChannel2]: startRef,
        [vgChannel]: {
          signal: `scale("${scaleName}", ${vgField(fieldDef, { expr: "datum" })} + ${fieldDef.bin.step})`,
          offset: binSpacingOffset
        }
      };
    }
  }
  warn(channelRequiredForBinned(channel2));
  return void 0;
}
function rectBinRef({ fieldDef, scaleName, bandPosition, offset }) {
  return interpolatedSignalRef({
    scaleName,
    fieldOrDatumDef: fieldDef,
    bandPosition,
    offset
  });
}
const ALWAYS_IGNORE = /* @__PURE__ */ new Set(["aria", "width", "height"]);
function baseEncodeEntry(model, ignore) {
  const { fill = void 0, stroke = void 0 } = ignore.color === "include" ? color(model) : {};
  return {
    ...markDefProperties(model.markDef, ignore),
    ...wrapAllFieldsInvalid(model, "fill", fill),
    ...wrapAllFieldsInvalid(model, "stroke", stroke),
    ...nonPosition("opacity", model),
    ...nonPosition("fillOpacity", model),
    ...nonPosition("strokeOpacity", model),
    ...nonPosition("strokeWidth", model),
    ...nonPosition("strokeDash", model),
    ...zindex(model),
    ...tooltip(model),
    ...text$1(model, "href"),
    ...aria(model)
  };
}
function wrapAllFieldsInvalid(model, channel, valueRef) {
  const { config, mark, markDef } = model;
  const invalid = getMarkPropOrConfig("invalid", markDef, config);
  if (invalid === "hide" && valueRef && !isPathMark(mark)) {
    const test = allFieldsInvalidPredicate$1(model, { invalid: true, channels: SCALE_CHANNELS });
    if (test) {
      return {
        [channel]: [
          // prepend the invalid case
          // TODO: support custom value
          { test, value: null },
          ...array(valueRef)
        ]
      };
    }
  }
  return valueRef ? { [channel]: valueRef } : {};
}
function markDefProperties(mark, ignore) {
  return VG_MARK_CONFIGS.reduce((m, prop) => {
    if (!ALWAYS_IGNORE.has(prop) && mark[prop] !== void 0 && ignore[prop] !== "ignore") {
      m[prop] = signalOrValueRef(mark[prop]);
    }
    return m;
  }, {});
}
function allFieldsInvalidPredicate$1(model, { invalid = false, channels }) {
  const filterIndex = channels.reduce((aggregator, channel) => {
    const scaleComponent = model.getScaleComponent(channel);
    if (scaleComponent) {
      const scaleType2 = scaleComponent.get("type");
      const field = model.vgField(channel, { expr: "datum" });
      if (field && hasContinuousDomain(scaleType2)) {
        aggregator[field] = true;
      }
    }
    return aggregator;
  }, {});
  const fields = keys(filterIndex);
  if (fields.length > 0) {
    const op = invalid ? "||" : "&&";
    return fields.map((field) => fieldInvalidPredicate(field, invalid)).join(` ${op} `);
  }
  return void 0;
}
function defined(model) {
  const { config, markDef } = model;
  const invalid = getMarkPropOrConfig("invalid", markDef, config);
  if (invalid) {
    const signal = allFieldsInvalidPredicate(model, { channels: POSITION_SCALE_CHANNELS });
    if (signal) {
      return { defined: { signal } };
    }
  }
  return {};
}
function allFieldsInvalidPredicate(model, { invalid = false, channels }) {
  const filterIndex = channels.reduce((aggregator, channel) => {
    var _a2;
    const scaleComponent = model.getScaleComponent(channel);
    if (scaleComponent) {
      const scaleType2 = scaleComponent.get("type");
      const field = model.vgField(channel, { expr: "datum", binSuffix: ((_a2 = model.stack) == null ? void 0 : _a2.impute) ? "mid" : void 0 });
      if (field && hasContinuousDomain(scaleType2)) {
        aggregator[field] = true;
      }
    }
    return aggregator;
  }, {});
  const fields = keys(filterIndex);
  if (fields.length > 0) {
    const op = invalid ? "||" : "&&";
    return fields.map((field) => fieldInvalidPredicate(field, invalid)).join(` ${op} `);
  }
  return void 0;
}
function valueIfDefined(prop, value) {
  if (value !== void 0) {
    return { [prop]: signalOrValueRef(value) };
  }
  return void 0;
}
const VORONOI = "voronoi";
const nearest = {
  defined: (selCmpt) => {
    return selCmpt.type === "point" && selCmpt.nearest;
  },
  parse: (model, selCmpt) => {
    if (selCmpt.events) {
      for (const s of selCmpt.events) {
        s.markname = model.getName(VORONOI);
      }
    }
  },
  marks: (model, selCmpt, marks) => {
    const { x, y } = selCmpt.project.hasChannel;
    const markType = model.mark;
    if (isPathMark(markType)) {
      warn(nearestNotSupportForContinuous(markType));
      return marks;
    }
    const cellDef = {
      name: model.getName(VORONOI),
      type: "path",
      interactive: true,
      from: { data: model.getName("marks") },
      encode: {
        update: {
          fill: { value: "transparent" },
          strokeWidth: { value: 0.35 },
          stroke: { value: "transparent" },
          isVoronoi: { value: true },
          ...tooltip(model, { reactiveGeom: true })
        }
      },
      transform: [
        {
          type: "voronoi",
          x: { expr: x || !y ? "datum.datum.x || 0" : "0" },
          y: { expr: y || !x ? "datum.datum.y || 0" : "0" },
          size: [model.getSizeSignalRef("width"), model.getSizeSignalRef("height")]
        }
      ]
    };
    let index = 0;
    let exists = false;
    marks.forEach((mark, i) => {
      const name2 = mark.name ?? "";
      if (name2 === model.component.mark[0].name) {
        index = i;
      } else if (name2.indexOf(VORONOI) >= 0) {
        exists = true;
      }
    });
    if (!exists) {
      marks.splice(index + 1, 0, cellDef);
    }
    return marks;
  }
};
const inputBindings = {
  defined: (selCmpt) => {
    return selCmpt.type === "point" && selCmpt.resolve === "global" && selCmpt.bind && selCmpt.bind !== "scales" && !isLegendBinding(selCmpt.bind);
  },
  parse: (model, selCmpt, selDef) => disableDirectManipulation(selCmpt, selDef),
  topLevelSignals: (model, selCmpt, signals) => {
    const name2 = selCmpt.name;
    const proj = selCmpt.project;
    const bind = selCmpt.bind;
    const init2 = selCmpt.init && selCmpt.init[0];
    const datum = nearest.defined(selCmpt) ? "(item().isVoronoi ? datum.datum : datum)" : "datum";
    proj.items.forEach((p, i) => {
      const sgname = varName(`${name2}_${p.field}`);
      const hasSignal = signals.filter((s) => s.name === sgname);
      if (!hasSignal.length) {
        signals.unshift({
          name: sgname,
          ...init2 ? { init: assembleInit(init2[i]) } : { value: null },
          on: selCmpt.events ? [
            {
              events: selCmpt.events,
              update: `datum && item().mark.marktype !== 'group' ? ${datum}[${$(p.field)}] : null`
            }
          ] : [],
          bind: bind[p.field] ?? bind[p.channel] ?? bind
        });
      }
    });
    return signals;
  },
  signals: (model, selCmpt, signals) => {
    const name2 = selCmpt.name;
    const proj = selCmpt.project;
    const signal = signals.filter((s) => s.name === name2 + TUPLE)[0];
    const fields = name2 + TUPLE_FIELDS;
    const values2 = proj.items.map((p) => varName(`${name2}_${p.field}`));
    const valid = values2.map((v) => `${v} !== null`).join(" && ");
    if (values2.length) {
      signal.update = `${valid} ? {fields: ${fields}, values: [${values2.join(", ")}]} : null`;
    }
    delete signal.value;
    delete signal.on;
    return signals;
  }
};
const TOGGLE = "_toggle";
const toggle = {
  defined: (selCmpt) => {
    return selCmpt.type === "point" && !!selCmpt.toggle;
  },
  signals: (model, selCmpt, signals) => {
    return signals.concat({
      name: selCmpt.name + TOGGLE,
      value: false,
      on: [{ events: selCmpt.events, update: selCmpt.toggle }]
    });
  },
  modifyExpr: (model, selCmpt) => {
    const tpl = selCmpt.name + TUPLE;
    const signal = selCmpt.name + TOGGLE;
    return `${signal} ? null : ${tpl}, ` + (selCmpt.resolve === "global" ? `${signal} ? null : true, ` : `${signal} ? null : {unit: ${unitName(model)}}, `) + `${signal} ? ${tpl} : null`;
  }
};
const clear = {
  defined: (selCmpt) => {
    return selCmpt.clear !== void 0 && selCmpt.clear !== false;
  },
  parse: (model, selCmpt) => {
    if (selCmpt.clear) {
      selCmpt.clear = isString(selCmpt.clear) ? eventSelector(selCmpt.clear, "view") : selCmpt.clear;
    }
  },
  topLevelSignals: (model, selCmpt, signals) => {
    if (inputBindings.defined(selCmpt)) {
      for (const proj of selCmpt.project.items) {
        const idx = signals.findIndex((n) => n.name === varName(`${selCmpt.name}_${proj.field}`));
        if (idx !== -1) {
          signals[idx].on.push({ events: selCmpt.clear, update: "null" });
        }
      }
    }
    return signals;
  },
  signals: (model, selCmpt, signals) => {
    function addClear(idx, update) {
      if (idx !== -1 && signals[idx].on) {
        signals[idx].on.push({ events: selCmpt.clear, update });
      }
    }
    if (selCmpt.type === "interval") {
      for (const proj of selCmpt.project.items) {
        const vIdx = signals.findIndex((n) => n.name === proj.signals.visual);
        addClear(vIdx, "[0, 0]");
        if (vIdx === -1) {
          const dIdx = signals.findIndex((n) => n.name === proj.signals.data);
          addClear(dIdx, "null");
        }
      }
    } else {
      let tIdx = signals.findIndex((n) => n.name === selCmpt.name + TUPLE);
      addClear(tIdx, "null");
      if (toggle.defined(selCmpt)) {
        tIdx = signals.findIndex((n) => n.name === selCmpt.name + TOGGLE);
        addClear(tIdx, "false");
      }
    }
    return signals;
  }
};
const legendBindings = {
  defined: (selCmpt) => {
    const spec = selCmpt.resolve === "global" && selCmpt.bind && isLegendBinding(selCmpt.bind);
    const projLen = selCmpt.project.items.length === 1 && selCmpt.project.items[0].field !== SELECTION_ID;
    if (spec && !projLen) {
      warn(LEGEND_BINDINGS_MUST_HAVE_PROJECTION);
    }
    return spec && projLen;
  },
  parse: (model, selCmpt, selDef) => {
    const selDef_ = duplicate(selDef);
    selDef_.select = isString(selDef_.select) ? { type: selDef_.select, toggle: selCmpt.toggle } : { ...selDef_.select, toggle: selCmpt.toggle };
    disableDirectManipulation(selCmpt, selDef_);
    if (isObject(selDef.select) && (selDef.select.on || selDef.select.clear)) {
      const legendFilter = 'event.item && indexof(event.item.mark.role, "legend") < 0';
      for (const evt2 of selCmpt.events) {
        evt2.filter = array(evt2.filter ?? []);
        if (!evt2.filter.includes(legendFilter)) {
          evt2.filter.push(legendFilter);
        }
      }
    }
    const evt = isLegendStreamBinding(selCmpt.bind) ? selCmpt.bind.legend : "click";
    const stream = isString(evt) ? eventSelector(evt, "view") : array(evt);
    selCmpt.bind = { legend: { merge: stream } };
  },
  topLevelSignals: (model, selCmpt, signals) => {
    const selName = selCmpt.name;
    const stream = isLegendStreamBinding(selCmpt.bind) && selCmpt.bind.legend;
    const markName = (name2) => (s) => {
      const ds = duplicate(s);
      ds.markname = name2;
      return ds;
    };
    for (const proj of selCmpt.project.items) {
      if (!proj.hasLegend)
        continue;
      const prefix = `${varName(proj.field)}_legend`;
      const sgName = `${selName}_${prefix}`;
      const hasSignal = signals.filter((s) => s.name === sgName);
      if (hasSignal.length === 0) {
        const events = stream.merge.map(markName(`${prefix}_symbols`)).concat(stream.merge.map(markName(`${prefix}_labels`))).concat(stream.merge.map(markName(`${prefix}_entries`)));
        signals.unshift({
          name: sgName,
          ...!selCmpt.init ? { value: null } : {},
          on: [
            // Legend entries do not store values, so we need to walk the scenegraph to the symbol datum.
            {
              events,
              update: "isDefined(datum.value) ? datum.value : item().items[0].items[0].datum.value",
              force: true
            },
            { events: stream.merge, update: `!event.item || !datum ? null : ${sgName}`, force: true }
          ]
        });
      }
    }
    return signals;
  },
  signals: (model, selCmpt, signals) => {
    const name2 = selCmpt.name;
    const proj = selCmpt.project;
    const tuple = signals.find((s) => s.name === name2 + TUPLE);
    const fields = name2 + TUPLE_FIELDS;
    const values2 = proj.items.filter((p) => p.hasLegend).map((p) => varName(`${name2}_${varName(p.field)}_legend`));
    const valid = values2.map((v) => `${v} !== null`).join(" && ");
    const update = `${valid} ? {fields: ${fields}, values: [${values2.join(", ")}]} : null`;
    if (selCmpt.events && values2.length > 0) {
      tuple.on.push({
        events: values2.map((signal) => ({ signal })),
        update
      });
    } else if (values2.length > 0) {
      tuple.update = update;
      delete tuple.value;
      delete tuple.on;
    }
    const toggle2 = signals.find((s) => s.name === name2 + TOGGLE);
    const events = isLegendStreamBinding(selCmpt.bind) && selCmpt.bind.legend;
    if (toggle2) {
      if (!selCmpt.events)
        toggle2.on[0].events = events;
      else
        toggle2.on.push({ ...toggle2.on[0], events });
    }
    return signals;
  }
};
function parseInteractiveLegend(model, channel, legendCmpt) {
  var _a2;
  const field = (_a2 = model.fieldDef(channel)) == null ? void 0 : _a2.field;
  for (const selCmpt of vals(model.component.selection ?? {})) {
    const proj = selCmpt.project.hasField[field] ?? selCmpt.project.hasChannel[channel];
    if (proj && legendBindings.defined(selCmpt)) {
      const legendSelections = legendCmpt.get("selections") ?? [];
      legendSelections.push(selCmpt.name);
      legendCmpt.set("selections", legendSelections, false);
      proj.hasLegend = true;
    }
  }
}
const ANCHOR$1 = "_translate_anchor";
const DELTA$1 = "_translate_delta";
const translate = {
  defined: (selCmpt) => {
    return selCmpt.type === "interval" && selCmpt.translate;
  },
  signals: (model, selCmpt, signals) => {
    const name2 = selCmpt.name;
    const boundScales = scaleBindings.defined(selCmpt);
    const anchor = name2 + ANCHOR$1;
    const { x, y } = selCmpt.project.hasChannel;
    let events = eventSelector(selCmpt.translate, "scope");
    if (!boundScales) {
      events = events.map((e2) => (e2.between[0].markname = name2 + BRUSH, e2));
    }
    signals.push({
      name: anchor,
      value: {},
      on: [
        {
          events: events.map((e2) => e2.between[0]),
          update: "{x: x(unit), y: y(unit)" + (x !== void 0 ? `, extent_x: ${boundScales ? domain(model, X) : `slice(${x.signals.visual})`}` : "") + (y !== void 0 ? `, extent_y: ${boundScales ? domain(model, Y) : `slice(${y.signals.visual})`}` : "") + "}"
        }
      ]
    }, {
      name: name2 + DELTA$1,
      value: {},
      on: [
        {
          events,
          update: `{x: ${anchor}.x - x(unit), y: ${anchor}.y - y(unit)}`
        }
      ]
    });
    if (x !== void 0) {
      onDelta$1(model, selCmpt, x, "width", signals);
    }
    if (y !== void 0) {
      onDelta$1(model, selCmpt, y, "height", signals);
    }
    return signals;
  }
};
function onDelta$1(model, selCmpt, proj, size, signals) {
  const name2 = selCmpt.name;
  const anchor = name2 + ANCHOR$1;
  const delta = name2 + DELTA$1;
  const channel = proj.channel;
  const boundScales = scaleBindings.defined(selCmpt);
  const signal = signals.filter((s) => s.name === proj.signals[boundScales ? "data" : "visual"])[0];
  const sizeSg = model.getSizeSignalRef(size).signal;
  const scaleCmpt = model.getScaleComponent(channel);
  const scaleType2 = scaleCmpt && scaleCmpt.get("type");
  const reversed = scaleCmpt && scaleCmpt.get("reverse");
  const sign = !boundScales ? "" : channel === X ? reversed ? "" : "-" : reversed ? "-" : "";
  const extent = `${anchor}.extent_${channel}`;
  const offset = `${sign}${delta}.${channel} / ${boundScales ? `${sizeSg}` : `span(${extent})`}`;
  const panFn = !boundScales || !scaleCmpt ? "panLinear" : scaleType2 === "log" ? "panLog" : scaleType2 === "symlog" ? "panSymlog" : scaleType2 === "pow" ? "panPow" : "panLinear";
  const arg = !boundScales ? "" : scaleType2 === "pow" ? `, ${scaleCmpt.get("exponent") ?? 1}` : scaleType2 === "symlog" ? `, ${scaleCmpt.get("constant") ?? 1}` : "";
  const update = `${panFn}(${extent}, ${offset}${arg})`;
  signal.on.push({
    events: { signal: delta },
    update: boundScales ? update : `clampRange(${update}, 0, ${sizeSg})`
  });
}
const ANCHOR = "_zoom_anchor";
const DELTA = "_zoom_delta";
const zoom = {
  defined: (selCmpt) => {
    return selCmpt.type === "interval" && selCmpt.zoom;
  },
  signals: (model, selCmpt, signals) => {
    const name2 = selCmpt.name;
    const boundScales = scaleBindings.defined(selCmpt);
    const delta = name2 + DELTA;
    const { x, y } = selCmpt.project.hasChannel;
    const sx = $(model.scaleName(X));
    const sy = $(model.scaleName(Y));
    let events = eventSelector(selCmpt.zoom, "scope");
    if (!boundScales) {
      events = events.map((e2) => (e2.markname = name2 + BRUSH, e2));
    }
    signals.push({
      name: name2 + ANCHOR,
      on: [
        {
          events,
          update: !boundScales ? `{x: x(unit), y: y(unit)}` : "{" + [sx ? `x: invert(${sx}, x(unit))` : "", sy ? `y: invert(${sy}, y(unit))` : ""].filter((expr) => expr).join(", ") + "}"
        }
      ]
    }, {
      name: delta,
      on: [
        {
          events,
          force: true,
          update: "pow(1.001, event.deltaY * pow(16, event.deltaMode))"
        }
      ]
    });
    if (x !== void 0) {
      onDelta(model, selCmpt, x, "width", signals);
    }
    if (y !== void 0) {
      onDelta(model, selCmpt, y, "height", signals);
    }
    return signals;
  }
};
function onDelta(model, selCmpt, proj, size, signals) {
  const name2 = selCmpt.name;
  const channel = proj.channel;
  const boundScales = scaleBindings.defined(selCmpt);
  const signal = signals.filter((s) => s.name === proj.signals[boundScales ? "data" : "visual"])[0];
  const sizeSg = model.getSizeSignalRef(size).signal;
  const scaleCmpt = model.getScaleComponent(channel);
  const scaleType2 = scaleCmpt && scaleCmpt.get("type");
  const base = boundScales ? domain(model, channel) : signal.name;
  const delta = name2 + DELTA;
  const anchor = `${name2}${ANCHOR}.${channel}`;
  const zoomFn = !boundScales || !scaleCmpt ? "zoomLinear" : scaleType2 === "log" ? "zoomLog" : scaleType2 === "symlog" ? "zoomSymlog" : scaleType2 === "pow" ? "zoomPow" : "zoomLinear";
  const arg = !boundScales ? "" : scaleType2 === "pow" ? `, ${scaleCmpt.get("exponent") ?? 1}` : scaleType2 === "symlog" ? `, ${scaleCmpt.get("constant") ?? 1}` : "";
  const update = `${zoomFn}(${base}, ${anchor}, ${delta}${arg})`;
  signal.on.push({
    events: { signal: delta },
    update: boundScales ? update : `clampRange(${update}, 0, ${sizeSg})`
  });
}
const STORE = "_store";
const TUPLE = "_tuple";
const MODIFY = "_modify";
const VL_SELECTION_RESOLVE = "vlSelectionResolve";
const selectionCompilers = [
  point$1,
  interval,
  project,
  toggle,
  // Bindings may disable direct manipulation.
  inputBindings,
  scaleBindings,
  legendBindings,
  clear,
  translate,
  zoom,
  nearest
];
function getFacetModel(model) {
  let parent = model.parent;
  while (parent) {
    if (isFacetModel(parent))
      break;
    parent = parent.parent;
  }
  return parent;
}
function unitName(model, { escape: escape2 } = { escape: true }) {
  let name2 = escape2 ? $(model.name) : model.name;
  const facetModel = getFacetModel(model);
  if (facetModel) {
    const { facet } = facetModel;
    for (const channel of FACET_CHANNELS) {
      if (facet[channel]) {
        name2 += ` + '__facet_${channel}_' + (facet[${$(facetModel.vgField(channel))}])`;
      }
    }
  }
  return name2;
}
function requiresSelectionId(model) {
  return vals(model.component.selection ?? {}).reduce((identifier, selCmpt) => {
    return identifier || selCmpt.project.hasSelectionId;
  }, false);
}
function disableDirectManipulation(selCmpt, selDef) {
  if (isString(selDef.select) || !selDef.select.on)
    delete selCmpt.events;
  if (isString(selDef.select) || !selDef.select.clear)
    delete selCmpt.clear;
  if (isString(selDef.select) || !selDef.select.toggle)
    delete selCmpt.toggle;
}
function getName(node) {
  const name2 = [];
  if (node.type === "Identifier") {
    return [node.name];
  }
  if (node.type === "Literal") {
    return [node.value];
  }
  if (node.type === "MemberExpression") {
    name2.push(...getName(node.object));
    name2.push(...getName(node.property));
  }
  return name2;
}
function startsWithDatum(node) {
  if (node.object.type === "MemberExpression") {
    return startsWithDatum(node.object);
  }
  return node.object.name === "datum";
}
function getDependentFields(expression2) {
  const ast = parser(expression2);
  const dependents = /* @__PURE__ */ new Set();
  ast.visit((node) => {
    if (node.type === "MemberExpression" && startsWithDatum(node)) {
      dependents.add(getName(node).slice(1).join("."));
    }
  });
  return dependents;
}
class FilterNode extends DataFlowNode {
  clone() {
    return new FilterNode(null, this.model, duplicate(this.filter));
  }
  constructor(parent, model, filter) {
    super(parent);
    this.model = model;
    this.filter = filter;
    this.expr = expression(this.model, this.filter, this);
    this._dependentFields = getDependentFields(this.expr);
  }
  dependentFields() {
    return this._dependentFields;
  }
  producedFields() {
    return /* @__PURE__ */ new Set();
  }
  assemble() {
    return {
      type: "filter",
      expr: this.expr
    };
  }
  hash() {
    return `Filter ${this.expr}`;
  }
}
function parseUnitSelection(model, selDefs) {
  const selCmpts = {};
  const selectionConfig = model.config.selection;
  if (!selDefs || !selDefs.length)
    return selCmpts;
  for (const def of selDefs) {
    const name2 = varName(def.name);
    const selDef = def.select;
    const type2 = isString(selDef) ? selDef : selDef.type;
    const defaults = isObject(selDef) ? duplicate(selDef) : { type: type2 };
    const cfg = selectionConfig[type2];
    for (const key in cfg) {
      if (key === "fields" || key === "encodings") {
        continue;
      }
      if (key === "mark") {
        defaults[key] = { ...cfg[key], ...defaults[key] };
      }
      if (defaults[key] === void 0 || defaults[key] === true) {
        defaults[key] = duplicate(cfg[key] ?? defaults[key]);
      }
    }
    const selCmpt = selCmpts[name2] = {
      ...defaults,
      name: name2,
      type: type2,
      init: def.value,
      bind: def.bind,
      events: isString(defaults.on) ? eventSelector(defaults.on, "scope") : array(duplicate(defaults.on))
    };
    const def_ = duplicate(def);
    for (const c of selectionCompilers) {
      if (c.defined(selCmpt) && c.parse) {
        c.parse(model, selCmpt, def_);
      }
    }
  }
  return selCmpts;
}
function parseSelectionPredicate(model, pred, dfnode, datum = "datum") {
  const name2 = isString(pred) ? pred : pred.param;
  const vname = varName(name2);
  const store = $(vname + STORE);
  let selCmpt;
  try {
    selCmpt = model.getSelectionComponent(vname, name2);
  } catch (e2) {
    return `!!${vname}`;
  }
  if (selCmpt.project.timeUnit) {
    const child = dfnode ?? model.component.data.raw;
    const tunode = selCmpt.project.timeUnit.clone();
    if (child.parent) {
      tunode.insertAsParentOf(child);
    } else {
      child.parent = tunode;
    }
  }
  const fn = selCmpt.project.hasSelectionId ? "vlSelectionIdTest(" : "vlSelectionTest(";
  const resolve = selCmpt.resolve === "global" ? ")" : `, ${$(selCmpt.resolve)})`;
  const test = `${fn}${store}, ${datum}${resolve}`;
  const length = `length(data(${store}))`;
  return pred.empty === false ? `${length} && ${test}` : `!${length} || ${test}`;
}
function parseSelectionExtent(model, name2, extent) {
  const vname = varName(name2);
  const encoding = extent["encoding"];
  let field = extent["field"];
  let selCmpt;
  try {
    selCmpt = model.getSelectionComponent(vname, name2);
  } catch (e2) {
    return vname;
  }
  if (!encoding && !field) {
    field = selCmpt.project.items[0].field;
    if (selCmpt.project.items.length > 1) {
      warn(`A "field" or "encoding" must be specified when using a selection as a scale domain. Using "field": ${$(field)}.`);
    }
  } else if (encoding && !field) {
    const encodings = selCmpt.project.items.filter((p) => p.channel === encoding);
    if (!encodings.length || encodings.length > 1) {
      field = selCmpt.project.items[0].field;
      warn((!encodings.length ? "No " : "Multiple ") + `matching ${$(encoding)} encoding found for selection ${$(extent.param)}. Using "field": ${$(field)}.`);
    } else {
      field = encodings[0].field;
    }
  }
  return `${selCmpt.name}[${$(replacePathInField(field))}]`;
}
function materializeSelections(model, main2) {
  for (const [selection, selCmpt] of entries$1(model.component.selection ?? {})) {
    const lookupName = model.getName(`lookup_${selection}`);
    model.component.data.outputNodes[lookupName] = selCmpt.materialized = new OutputNode(new FilterNode(main2, model, { param: selection }), lookupName, DataSourceType.Lookup, model.component.data.outputNodeRefCounts);
  }
}
function expression(model, filterOp, node) {
  return logicalExpr(filterOp, (predicate) => {
    if (isString(predicate)) {
      return predicate;
    } else if (isSelectionPredicate(predicate)) {
      return parseSelectionPredicate(model, predicate, node);
    } else {
      return fieldFilterExpression(predicate);
    }
  });
}
function assembleTitle(title2, config) {
  if (!title2) {
    return void 0;
  }
  if (isArray(title2) && !isText(title2)) {
    return title2.map((fieldDef) => defaultTitle(fieldDef, config)).join(", ");
  }
  return title2;
}
function setAxisEncode(axis, part, vgProp, vgRef) {
  var _a2, _b;
  axis.encode ?? (axis.encode = {});
  (_a2 = axis.encode)[part] ?? (_a2[part] = {});
  (_b = axis.encode[part]).update ?? (_b.update = {});
  axis.encode[part].update[vgProp] = vgRef;
}
function assembleAxis(axisCmpt, kind, config, opt = { header: false }) {
  var _a2, _b;
  const { disable, orient: orient2, scale, labelExpr, title: title2, zindex: zindex2, ...axis } = axisCmpt.combine();
  if (disable) {
    return void 0;
  }
  for (const prop in axis) {
    const propType = AXIS_PROPERTY_TYPE[prop];
    const propValue = axis[prop];
    if (propType && propType !== kind && propType !== "both") {
      delete axis[prop];
    } else if (isConditionalAxisValue(propValue)) {
      const { condition, ...valueOrSignalRef } = propValue;
      const conditions = array(condition);
      const propIndex = CONDITIONAL_AXIS_PROP_INDEX[prop];
      if (propIndex) {
        const { vgProp, part } = propIndex;
        const vgRef = [
          ...conditions.map((c) => {
            const { test, ...valueOrSignalCRef } = c;
            return {
              test: expression(null, test),
              ...valueOrSignalCRef
            };
          }),
          valueOrSignalRef
        ];
        setAxisEncode(axis, part, vgProp, vgRef);
        delete axis[prop];
      } else if (propIndex === null) {
        const signalRef = {
          signal: conditions.map((c) => {
            const { test, ...valueOrSignalCRef } = c;
            return `${expression(null, test)} ? ${exprFromValueRefOrSignalRef(valueOrSignalCRef)} : `;
          }).join("") + exprFromValueRefOrSignalRef(valueOrSignalRef)
        };
        axis[prop] = signalRef;
      }
    } else if (isSignalRef(propValue)) {
      const propIndex = CONDITIONAL_AXIS_PROP_INDEX[prop];
      if (propIndex) {
        const { vgProp, part } = propIndex;
        setAxisEncode(axis, part, vgProp, propValue);
        delete axis[prop];
      }
    }
    if (contains(["labelAlign", "labelBaseline"], prop) && axis[prop] === null) {
      delete axis[prop];
    }
  }
  if (kind === "grid") {
    if (!axis.grid) {
      return void 0;
    }
    if (axis.encode) {
      const { grid } = axis.encode;
      axis.encode = {
        ...grid ? { grid } : {}
      };
      if (isEmpty(axis.encode)) {
        delete axis.encode;
      }
    }
    return {
      scale,
      orient: orient2,
      ...axis,
      domain: false,
      labels: false,
      aria: false,
      // Always set min/maxExtent to 0 to ensure that `config.axis*.minExtent` and `config.axis*.maxExtent`
      // would not affect gridAxis
      maxExtent: 0,
      minExtent: 0,
      ticks: false,
      zindex: getFirstDefined(zindex2, 0)
      // put grid behind marks by default
    };
  } else {
    if (!opt.header && axisCmpt.mainExtracted) {
      return void 0;
    }
    if (labelExpr !== void 0) {
      let expr = labelExpr;
      if (((_b = (_a2 = axis.encode) == null ? void 0 : _a2.labels) == null ? void 0 : _b.update) && isSignalRef(axis.encode.labels.update.text)) {
        expr = replaceAll(labelExpr, "datum.label", axis.encode.labels.update.text.signal);
      }
      setAxisEncode(axis, "labels", "text", { signal: expr });
    }
    if (axis.labelAlign === null) {
      delete axis.labelAlign;
    }
    if (axis.encode) {
      for (const part of AXIS_PARTS) {
        if (!axisCmpt.hasAxisPart(part)) {
          delete axis.encode[part];
        }
      }
      if (isEmpty(axis.encode)) {
        delete axis.encode;
      }
    }
    const titleString = assembleTitle(title2, config);
    return {
      scale,
      orient: orient2,
      grid: false,
      ...titleString ? { title: titleString } : {},
      ...axis,
      ...config.aria === false ? { aria: false } : {},
      zindex: getFirstDefined(zindex2, 0)
      // put axis line above marks by default
    };
  }
}
function assembleAxisSignals(model) {
  const { axes } = model.component;
  const signals = [];
  for (const channel of POSITION_SCALE_CHANNELS) {
    if (axes[channel]) {
      for (const axis of axes[channel]) {
        if (!axis.get("disable") && !axis.get("gridScale")) {
          const sizeType = channel === "x" ? "height" : "width";
          const update = model.getSizeSignalRef(sizeType).signal;
          if (sizeType !== update) {
            signals.push({
              name: sizeType,
              update
            });
          }
        }
      }
    }
  }
  return signals;
}
function assembleAxes(axisComponents, config) {
  const { x = [], y = [] } = axisComponents;
  return [
    ...x.map((a) => assembleAxis(a, "grid", config)),
    ...y.map((a) => assembleAxis(a, "grid", config)),
    ...x.map((a) => assembleAxis(a, "main", config)),
    ...y.map((a) => assembleAxis(a, "main", config))
  ].filter((a) => a);
}
function getAxisConfigFromConfigTypes(configTypes, config, channel, orient2) {
  return Object.assign.apply(null, [
    {},
    ...configTypes.map((configType) => {
      if (configType === "axisOrient") {
        const orient1 = channel === "x" ? "bottom" : "left";
        const orientConfig1 = config[channel === "x" ? "axisBottom" : "axisLeft"] || {};
        const orientConfig2 = config[channel === "x" ? "axisTop" : "axisRight"] || {};
        const props = /* @__PURE__ */ new Set([...keys(orientConfig1), ...keys(orientConfig2)]);
        const conditionalOrientAxisConfig = {};
        for (const prop of props.values()) {
          conditionalOrientAxisConfig[prop] = {
            // orient is surely signal in this case
            signal: `${orient2["signal"]} === "${orient1}" ? ${signalOrStringValue(orientConfig1[prop])} : ${signalOrStringValue(orientConfig2[prop])}`
          };
        }
        return conditionalOrientAxisConfig;
      }
      return config[configType];
    })
  ]);
}
function getAxisConfigs(channel, scaleType2, orient2, config) {
  const typeBasedConfigTypes = scaleType2 === "band" ? ["axisDiscrete", "axisBand"] : scaleType2 === "point" ? ["axisDiscrete", "axisPoint"] : isQuantitative(scaleType2) ? ["axisQuantitative"] : scaleType2 === "time" || scaleType2 === "utc" ? ["axisTemporal"] : [];
  const axisChannel = channel === "x" ? "axisX" : "axisY";
  const axisOrient = isSignalRef(orient2) ? "axisOrient" : `axis${titleCase(orient2)}`;
  const vlOnlyConfigTypes = [
    // technically Vega does have axisBand, but if we make another separation here,
    // it will further introduce complexity in the code
    ...typeBasedConfigTypes,
    ...typeBasedConfigTypes.map((c) => axisChannel + c.substr(4))
  ];
  const vgConfigTypes = ["axis", axisOrient, axisChannel];
  return {
    vlOnlyAxisConfig: getAxisConfigFromConfigTypes(vlOnlyConfigTypes, config, channel, orient2),
    vgAxisConfig: getAxisConfigFromConfigTypes(vgConfigTypes, config, channel, orient2),
    axisConfigStyle: getAxisConfigStyle([...vgConfigTypes, ...vlOnlyConfigTypes], config)
  };
}
function getAxisConfigStyle(axisConfigTypes, config) {
  var _a2;
  const toMerge = [{}];
  for (const configType of axisConfigTypes) {
    let style = (_a2 = config[configType]) == null ? void 0 : _a2.style;
    if (style) {
      style = array(style);
      for (const s of style) {
        toMerge.push(config.style[s]);
      }
    }
  }
  return Object.assign.apply(null, toMerge);
}
function getAxisConfig(property, styleConfigIndex, style, axisConfigs = {}) {
  var _a2;
  const styleConfig = getStyleConfig(property, style, styleConfigIndex);
  if (styleConfig !== void 0) {
    return {
      configFrom: "style",
      configValue: styleConfig
    };
  }
  for (const configFrom of ["vlOnlyAxisConfig", "vgAxisConfig", "axisConfigStyle"]) {
    if (((_a2 = axisConfigs[configFrom]) == null ? void 0 : _a2[property]) !== void 0) {
      return { configFrom, configValue: axisConfigs[configFrom][property] };
    }
  }
  return {};
}
const axisRules = {
  scale: ({ model, channel }) => model.scaleName(channel),
  format: ({ format }) => format,
  formatType: ({ formatType }) => formatType,
  grid: ({ fieldOrDatumDef, axis, scaleType: scaleType2 }) => axis.grid ?? defaultGrid(scaleType2, fieldOrDatumDef),
  gridScale: ({ model, channel }) => gridScale(model, channel),
  labelAlign: ({ axis, labelAngle, orient: orient2, channel }) => axis.labelAlign || defaultLabelAlign(labelAngle, orient2, channel),
  labelAngle: ({ labelAngle }) => labelAngle,
  labelBaseline: ({ axis, labelAngle, orient: orient2, channel }) => axis.labelBaseline || defaultLabelBaseline(labelAngle, orient2, channel),
  labelFlush: ({ axis, fieldOrDatumDef, channel }) => axis.labelFlush ?? defaultLabelFlush(fieldOrDatumDef.type, channel),
  labelOverlap: ({ axis, fieldOrDatumDef, scaleType: scaleType2 }) => axis.labelOverlap ?? defaultLabelOverlap$1(fieldOrDatumDef.type, scaleType2, isFieldDef(fieldOrDatumDef) && !!fieldOrDatumDef.timeUnit, isFieldDef(fieldOrDatumDef) ? fieldOrDatumDef.sort : void 0),
  // we already calculate orient in parse
  orient: ({ orient: orient2 }) => orient2,
  tickCount: ({ channel, model, axis, fieldOrDatumDef, scaleType: scaleType2 }) => {
    const sizeType = channel === "x" ? "width" : channel === "y" ? "height" : void 0;
    const size = sizeType ? model.getSizeSignalRef(sizeType) : void 0;
    return axis.tickCount ?? defaultTickCount({ fieldOrDatumDef, scaleType: scaleType2, size, values: axis.values });
  },
  tickMinStep: defaultTickMinStep,
  title: ({ axis, model, channel }) => {
    if (axis.title !== void 0) {
      return axis.title;
    }
    const fieldDefTitle = getFieldDefTitle(model, channel);
    if (fieldDefTitle !== void 0) {
      return fieldDefTitle;
    }
    const fieldDef = model.typedFieldDef(channel);
    const channel2 = channel === "x" ? "x2" : "y2";
    const fieldDef2 = model.fieldDef(channel2);
    return mergeTitleFieldDefs(fieldDef ? [toFieldDefBase(fieldDef)] : [], isFieldDef(fieldDef2) ? [toFieldDefBase(fieldDef2)] : []);
  },
  values: ({ axis, fieldOrDatumDef }) => values$1(axis, fieldOrDatumDef),
  zindex: ({ axis, fieldOrDatumDef, mark }) => axis.zindex ?? defaultZindex(mark, fieldOrDatumDef)
};
function defaultGrid(scaleType2, fieldDef) {
  return !hasDiscreteDomain(scaleType2) && isFieldDef(fieldDef) && !isBinning(fieldDef == null ? void 0 : fieldDef.bin) && !isBinned(fieldDef == null ? void 0 : fieldDef.bin);
}
function gridScale(model, channel) {
  const gridChannel = channel === "x" ? "y" : "x";
  if (model.getScaleComponent(gridChannel)) {
    return model.scaleName(gridChannel);
  }
  return void 0;
}
function getLabelAngle(fieldOrDatumDef, axis, channel, styleConfig, axisConfigs) {
  const labelAngle = axis == null ? void 0 : axis.labelAngle;
  if (labelAngle !== void 0) {
    return isSignalRef(labelAngle) ? labelAngle : normalizeAngle(labelAngle);
  } else {
    const { configValue: angle } = getAxisConfig("labelAngle", styleConfig, axis == null ? void 0 : axis.style, axisConfigs);
    if (angle !== void 0) {
      return normalizeAngle(angle);
    } else {
      if (channel === X && contains([NOMINAL, ORDINAL], fieldOrDatumDef.type) && !(isFieldDef(fieldOrDatumDef) && fieldOrDatumDef.timeUnit)) {
        return 270;
      }
      return void 0;
    }
  }
}
function normalizeAngleExpr(angle) {
  return `(((${angle.signal} % 360) + 360) % 360)`;
}
function defaultLabelBaseline(angle, orient2, channel, alwaysIncludeMiddle) {
  if (angle !== void 0) {
    if (channel === "x") {
      if (isSignalRef(angle)) {
        const a = normalizeAngleExpr(angle);
        const orientIsTop = isSignalRef(orient2) ? `(${orient2.signal} === "top")` : orient2 === "top";
        return {
          signal: `(45 < ${a} && ${a} < 135) || (225 < ${a} && ${a} < 315) ? "middle" :(${a} <= 45 || 315 <= ${a}) === ${orientIsTop} ? "bottom" : "top"`
        };
      }
      if (45 < angle && angle < 135 || 225 < angle && angle < 315) {
        return "middle";
      }
      if (isSignalRef(orient2)) {
        const op = angle <= 45 || 315 <= angle ? "===" : "!==";
        return { signal: `${orient2.signal} ${op} "top" ? "bottom" : "top"` };
      }
      return (angle <= 45 || 315 <= angle) === (orient2 === "top") ? "bottom" : "top";
    } else {
      if (isSignalRef(angle)) {
        const a = normalizeAngleExpr(angle);
        const orientIsLeft = isSignalRef(orient2) ? `(${orient2.signal} === "left")` : orient2 === "left";
        const middle = alwaysIncludeMiddle ? '"middle"' : "null";
        return {
          signal: `${a} <= 45 || 315 <= ${a} || (135 <= ${a} && ${a} <= 225) ? ${middle} : (45 <= ${a} && ${a} <= 135) === ${orientIsLeft} ? "top" : "bottom"`
        };
      }
      if (angle <= 45 || 315 <= angle || 135 <= angle && angle <= 225) {
        return alwaysIncludeMiddle ? "middle" : null;
      }
      if (isSignalRef(orient2)) {
        const op = 45 <= angle && angle <= 135 ? "===" : "!==";
        return { signal: `${orient2.signal} ${op} "left" ? "top" : "bottom"` };
      }
      return (45 <= angle && angle <= 135) === (orient2 === "left") ? "top" : "bottom";
    }
  }
  return void 0;
}
function defaultLabelAlign(angle, orient2, channel) {
  if (angle === void 0) {
    return void 0;
  }
  const isX = channel === "x";
  const startAngle = isX ? 0 : 90;
  const mainOrient = isX ? "bottom" : "left";
  if (isSignalRef(angle)) {
    const a = normalizeAngleExpr(angle);
    const orientIsMain = isSignalRef(orient2) ? `(${orient2.signal} === "${mainOrient}")` : orient2 === mainOrient;
    return {
      signal: `(${startAngle ? `(${a} + 90)` : a} % 180 === 0) ? ${isX ? null : '"center"'} :(${startAngle} < ${a} && ${a} < ${180 + startAngle}) === ${orientIsMain} ? "left" : "right"`
    };
  }
  if ((angle + startAngle) % 180 === 0) {
    return isX ? null : "center";
  }
  if (isSignalRef(orient2)) {
    const op = startAngle < angle && angle < 180 + startAngle ? "===" : "!==";
    const orientIsMain = `${orient2.signal} ${op} "${mainOrient}"`;
    return {
      signal: `${orientIsMain} ? "left" : "right"`
    };
  }
  if ((startAngle < angle && angle < 180 + startAngle) === (orient2 === mainOrient)) {
    return "left";
  }
  return "right";
}
function defaultLabelFlush(type2, channel) {
  if (channel === "x" && contains(["quantitative", "temporal"], type2)) {
    return true;
  }
  return void 0;
}
function defaultLabelOverlap$1(type2, scaleType2, hasTimeUnit, sort) {
  if (hasTimeUnit && !isObject(sort) || type2 !== "nominal" && type2 !== "ordinal") {
    if (scaleType2 === "log" || scaleType2 === "symlog") {
      return "greedy";
    }
    return true;
  }
  return void 0;
}
function defaultOrient(channel) {
  return channel === "x" ? "bottom" : "left";
}
function defaultTickCount({ fieldOrDatumDef, scaleType: scaleType2, size, values: vals2 }) {
  var _a2;
  if (!vals2 && !hasDiscreteDomain(scaleType2) && scaleType2 !== "log") {
    if (isFieldDef(fieldOrDatumDef)) {
      if (isBinning(fieldOrDatumDef.bin)) {
        return { signal: `ceil(${size.signal}/10)` };
      }
      if (fieldOrDatumDef.timeUnit && contains(["month", "hours", "day", "quarter"], (_a2 = normalizeTimeUnit(fieldOrDatumDef.timeUnit)) == null ? void 0 : _a2.unit)) {
        return void 0;
      }
    }
    return { signal: `ceil(${size.signal}/40)` };
  }
  return void 0;
}
function defaultTickMinStep({ format, fieldOrDatumDef }) {
  if (format === "d") {
    return 1;
  }
  if (isFieldDef(fieldOrDatumDef)) {
    const { timeUnit } = fieldOrDatumDef;
    if (timeUnit) {
      const signal = durationExpr(timeUnit);
      if (signal) {
        return { signal };
      }
    }
  }
  return void 0;
}
function getFieldDefTitle(model, channel) {
  const channel2 = channel === "x" ? "x2" : "y2";
  const fieldDef = model.fieldDef(channel);
  const fieldDef2 = model.fieldDef(channel2);
  const title1 = fieldDef ? fieldDef.title : void 0;
  const title2 = fieldDef2 ? fieldDef2.title : void 0;
  if (title1 && title2) {
    return mergeTitle(title1, title2);
  } else if (title1) {
    return title1;
  } else if (title2) {
    return title2;
  } else if (title1 !== void 0) {
    return title1;
  } else if (title2 !== void 0) {
    return title2;
  }
  return void 0;
}
function values$1(axis, fieldOrDatumDef) {
  const vals2 = axis.values;
  if (isArray(vals2)) {
    return valueArray(fieldOrDatumDef, vals2);
  } else if (isSignalRef(vals2)) {
    return vals2;
  }
  return void 0;
}
function defaultZindex(mark, fieldDef) {
  if (mark === "rect" && isDiscrete(fieldDef)) {
    return 1;
  }
  return 0;
}
class CalculateNode extends DataFlowNode {
  clone() {
    return new CalculateNode(null, duplicate(this.transform));
  }
  constructor(parent, transform) {
    super(parent);
    this.transform = transform;
    this._dependentFields = getDependentFields(this.transform.calculate);
  }
  static parseAllForSortIndex(parent, model) {
    model.forEachFieldDef((fieldDef, channel) => {
      if (!isScaleFieldDef(fieldDef)) {
        return;
      }
      if (isSortArray(fieldDef.sort)) {
        const { field, timeUnit } = fieldDef;
        const sort = fieldDef.sort;
        const calculate = sort.map((sortValue, i) => {
          return `${fieldFilterExpression({ field, timeUnit, equal: sortValue })} ? ${i} : `;
        }).join("") + sort.length;
        parent = new CalculateNode(parent, {
          calculate,
          as: sortArrayIndexField(fieldDef, channel, { forAs: true })
        });
      }
    });
    return parent;
  }
  producedFields() {
    return /* @__PURE__ */ new Set([this.transform.as]);
  }
  dependentFields() {
    return this._dependentFields;
  }
  assemble() {
    return {
      type: "formula",
      expr: this.transform.calculate,
      as: this.transform.as
    };
  }
  hash() {
    return `Calculate ${hash(this.transform)}`;
  }
}
function sortArrayIndexField(fieldDef, channel, opt) {
  return vgField(fieldDef, { prefix: channel, suffix: "sort_index", ...opt ?? {} });
}
function getHeaderChannel(channel, orient2) {
  if (contains(["top", "bottom"], orient2)) {
    return "column";
  } else if (contains(["left", "right"], orient2)) {
    return "row";
  }
  return channel === "row" ? "row" : "column";
}
function getHeaderProperty(prop, header, config, channel) {
  const headerSpecificConfig = channel === "row" ? config.headerRow : channel === "column" ? config.headerColumn : config.headerFacet;
  return getFirstDefined((header || {})[prop], headerSpecificConfig[prop], config.header[prop]);
}
function getHeaderProperties(properties, header, config, channel) {
  const props = {};
  for (const prop of properties) {
    const value = getHeaderProperty(prop, header || {}, config, channel);
    if (value !== void 0) {
      props[prop] = value;
    }
  }
  return props;
}
const HEADER_CHANNELS = ["row", "column"];
const HEADER_TYPES = ["header", "footer"];
function assembleTitleGroup(model, channel) {
  const title2 = model.component.layoutHeaders[channel].title;
  const config = model.config ? model.config : void 0;
  const facetFieldDef = model.component.layoutHeaders[channel].facetFieldDef ? model.component.layoutHeaders[channel].facetFieldDef : void 0;
  const { titleAnchor, titleAngle: ta, titleOrient } = getHeaderProperties(["titleAnchor", "titleAngle", "titleOrient"], facetFieldDef.header, config, channel);
  const headerChannel = getHeaderChannel(channel, titleOrient);
  const titleAngle = normalizeAngle(ta);
  return {
    name: `${channel}-title`,
    type: "group",
    role: `${headerChannel}-title`,
    title: {
      text: title2,
      ...channel === "row" ? { orient: "left" } : {},
      style: "guide-title",
      ...defaultHeaderGuideBaseline(titleAngle, headerChannel),
      ...defaultHeaderGuideAlign(headerChannel, titleAngle, titleAnchor),
      ...assembleHeaderProperties(config, facetFieldDef, channel, HEADER_TITLE_PROPERTIES, HEADER_TITLE_PROPERTIES_MAP)
    }
  };
}
function defaultHeaderGuideAlign(headerChannel, angle, anchor = "middle") {
  switch (anchor) {
    case "start":
      return { align: "left" };
    case "end":
      return { align: "right" };
  }
  const align2 = defaultLabelAlign(angle, headerChannel === "row" ? "left" : "top", headerChannel === "row" ? "y" : "x");
  return align2 ? { align: align2 } : {};
}
function defaultHeaderGuideBaseline(angle, channel) {
  const baseline2 = defaultLabelBaseline(angle, channel === "row" ? "left" : "top", channel === "row" ? "y" : "x", true);
  return baseline2 ? { baseline: baseline2 } : {};
}
function assembleHeaderGroups(model, channel) {
  const layoutHeader = model.component.layoutHeaders[channel];
  const groups = [];
  for (const headerType of HEADER_TYPES) {
    if (layoutHeader[headerType]) {
      for (const headerComponent of layoutHeader[headerType]) {
        const group = assembleHeaderGroup(model, channel, headerType, layoutHeader, headerComponent);
        if (group != null) {
          groups.push(group);
        }
      }
    }
  }
  return groups;
}
function getSort$1(facetFieldDef, channel) {
  const { sort } = facetFieldDef;
  if (isSortField(sort)) {
    return {
      field: vgField(sort, { expr: "datum" }),
      order: sort.order ?? "ascending"
    };
  } else if (isArray(sort)) {
    return {
      field: sortArrayIndexField(facetFieldDef, channel, { expr: "datum" }),
      order: "ascending"
    };
  } else {
    return {
      field: vgField(facetFieldDef, { expr: "datum" }),
      order: sort ?? "ascending"
    };
  }
}
function assembleLabelTitle(facetFieldDef, channel, config) {
  const { format, formatType, labelAngle, labelAnchor, labelOrient, labelExpr } = getHeaderProperties(["format", "formatType", "labelAngle", "labelAnchor", "labelOrient", "labelExpr"], facetFieldDef.header, config, channel);
  const titleTextExpr = formatSignalRef({
    fieldOrDatumDef: facetFieldDef,
    format,
    formatType,
    expr: "parent",
    config
  }).signal;
  const headerChannel = getHeaderChannel(channel, labelOrient);
  return {
    text: {
      signal: labelExpr ? replaceAll(replaceAll(labelExpr, "datum.label", titleTextExpr), "datum.value", vgField(facetFieldDef, { expr: "parent" })) : titleTextExpr
    },
    ...channel === "row" ? { orient: "left" } : {},
    style: "guide-label",
    frame: "group",
    ...defaultHeaderGuideBaseline(labelAngle, headerChannel),
    ...defaultHeaderGuideAlign(headerChannel, labelAngle, labelAnchor),
    ...assembleHeaderProperties(config, facetFieldDef, channel, HEADER_LABEL_PROPERTIES, HEADER_LABEL_PROPERTIES_MAP)
  };
}
function assembleHeaderGroup(model, channel, headerType, layoutHeader, headerComponent) {
  if (headerComponent) {
    let title2 = null;
    const { facetFieldDef } = layoutHeader;
    const config = model.config ? model.config : void 0;
    if (facetFieldDef && headerComponent.labels) {
      const { labelOrient } = getHeaderProperties(["labelOrient"], facetFieldDef.header, config, channel);
      if (channel === "row" && !contains(["top", "bottom"], labelOrient) || channel === "column" && !contains(["left", "right"], labelOrient)) {
        title2 = assembleLabelTitle(facetFieldDef, channel, config);
      }
    }
    const isFacetWithoutRowCol = isFacetModel(model) && !isFacetMapping(model.facet);
    const axes = headerComponent.axes;
    const hasAxes = (axes == null ? void 0 : axes.length) > 0;
    if (title2 || hasAxes) {
      const sizeChannel = channel === "row" ? "height" : "width";
      return {
        name: model.getName(`${channel}_${headerType}`),
        type: "group",
        role: `${channel}-${headerType}`,
        ...layoutHeader.facetFieldDef ? {
          from: { data: model.getName(`${channel}_domain`) },
          sort: getSort$1(facetFieldDef, channel)
        } : {},
        ...hasAxes && isFacetWithoutRowCol ? {
          from: { data: model.getName(`facet_domain_${channel}`) }
        } : {},
        ...title2 ? { title: title2 } : {},
        ...headerComponent.sizeSignal ? {
          encode: {
            update: {
              [sizeChannel]: headerComponent.sizeSignal
            }
          }
        } : {},
        ...hasAxes ? { axes } : {}
      };
    }
  }
  return null;
}
const LAYOUT_TITLE_BAND = {
  column: {
    start: 0,
    end: 1
  },
  row: {
    start: 1,
    end: 0
  }
};
function getLayoutTitleBand(titleAnchor, headerChannel) {
  return LAYOUT_TITLE_BAND[headerChannel][titleAnchor];
}
function assembleLayoutTitleBand(headerComponentIndex, config) {
  const titleBand = {};
  for (const channel of FACET_CHANNELS) {
    const headerComponent = headerComponentIndex[channel];
    if (headerComponent == null ? void 0 : headerComponent.facetFieldDef) {
      const { titleAnchor, titleOrient } = getHeaderProperties(["titleAnchor", "titleOrient"], headerComponent.facetFieldDef.header, config, channel);
      const headerChannel = getHeaderChannel(channel, titleOrient);
      const band = getLayoutTitleBand(titleAnchor, headerChannel);
      if (band !== void 0) {
        titleBand[headerChannel] = band;
      }
    }
  }
  return isEmpty(titleBand) ? void 0 : titleBand;
}
function assembleHeaderProperties(config, facetFieldDef, channel, properties, propertiesMap) {
  const props = {};
  for (const prop of properties) {
    if (!propertiesMap[prop]) {
      continue;
    }
    const value = getHeaderProperty(prop, facetFieldDef == null ? void 0 : facetFieldDef.header, config, channel);
    if (value !== void 0) {
      props[propertiesMap[prop]] = value;
    }
  }
  return props;
}
function assembleLayoutSignals(model) {
  return [
    ...sizeSignals(model, "width"),
    ...sizeSignals(model, "height"),
    ...sizeSignals(model, "childWidth"),
    ...sizeSignals(model, "childHeight")
  ];
}
function sizeSignals(model, sizeType) {
  const channel = sizeType === "width" ? "x" : "y";
  const size = model.component.layoutSize.get(sizeType);
  if (!size || size === "merged") {
    return [];
  }
  const name2 = model.getSizeSignalRef(sizeType).signal;
  if (size === "step") {
    const scaleComponent = model.getScaleComponent(channel);
    if (scaleComponent) {
      const type2 = scaleComponent.get("type");
      const range2 = scaleComponent.get("range");
      if (hasDiscreteDomain(type2) && isVgRangeStep(range2)) {
        const scaleName = model.scaleName(channel);
        if (isFacetModel(model.parent)) {
          const parentResolve = model.parent.component.resolve;
          if (parentResolve.scale[channel] === "independent") {
            return [stepSignal(scaleName, range2)];
          }
        }
        return [
          stepSignal(scaleName, range2),
          {
            name: name2,
            update: sizeExpr(scaleName, scaleComponent, `domain('${scaleName}').length`)
          }
        ];
      }
    }
    throw new Error("layout size is step although width/height is not step.");
  } else if (size == "container") {
    const isWidth = name2.endsWith("width");
    const expr = isWidth ? "containerSize()[0]" : "containerSize()[1]";
    const defaultValue = getViewConfigContinuousSize(model.config.view, isWidth ? "width" : "height");
    const safeExpr = `isFinite(${expr}) ? ${expr} : ${defaultValue}`;
    return [{ name: name2, init: safeExpr, on: [{ update: safeExpr, events: "window:resize" }] }];
  } else {
    return [
      {
        name: name2,
        value: size
      }
    ];
  }
}
function stepSignal(scaleName, range2) {
  const name2 = `${scaleName}_step`;
  if (isSignalRef(range2.step)) {
    return { name: name2, update: range2.step.signal };
  } else {
    return { name: name2, value: range2.step };
  }
}
function sizeExpr(scaleName, scaleComponent, cardinality) {
  const type2 = scaleComponent.get("type");
  const padding2 = scaleComponent.get("padding");
  const paddingOuter2 = getFirstDefined(scaleComponent.get("paddingOuter"), padding2);
  let paddingInner2 = scaleComponent.get("paddingInner");
  paddingInner2 = type2 === "band" ? (
    // only band has real paddingInner
    paddingInner2 !== void 0 ? paddingInner2 : padding2
  ) : (
    // For point, as calculated in https://github.com/vega/vega-scale/blob/master/src/band.js#L128,
    // it's equivalent to have paddingInner = 1 since there is only n-1 steps between n points.
    1
  );
  return `bandspace(${cardinality}, ${signalOrStringValue(paddingInner2)}, ${signalOrStringValue(paddingOuter2)}) * ${scaleName}_step`;
}
function getSizeTypeFromLayoutSizeType(layoutSizeType) {
  return layoutSizeType === "childWidth" ? "width" : layoutSizeType === "childHeight" ? "height" : layoutSizeType;
}
function guideEncodeEntry(encoding, model) {
  return keys(encoding).reduce((encode, channel) => {
    const valueDef = encoding[channel];
    return {
      ...encode,
      ...wrapCondition(model, valueDef, channel, (def) => signalOrValueRef(def.value))
    };
  }, {});
}
function defaultScaleResolve(channel, model) {
  if (isFacetModel(model)) {
    return channel === "theta" ? "independent" : "shared";
  } else if (isLayerModel(model)) {
    return "shared";
  } else if (isConcatModel(model)) {
    return isXorY(channel) || channel === "theta" || channel === "radius" ? "independent" : "shared";
  }
  throw new Error("invalid model type for resolve");
}
function parseGuideResolve(resolve, channel) {
  const channelScaleResolve = resolve.scale[channel];
  const guide = isXorY(channel) ? "axis" : "legend";
  if (channelScaleResolve === "independent") {
    if (resolve[guide][channel] === "shared") {
      warn(independentScaleMeansIndependentGuide(channel));
    }
    return "independent";
  }
  return resolve[guide][channel] || "shared";
}
const LEGEND_COMPONENT_PROPERTY_INDEX = {
  ...COMMON_LEGEND_PROPERTY_INDEX,
  disable: 1,
  labelExpr: 1,
  selections: 1,
  // channel scales
  opacity: 1,
  shape: 1,
  stroke: 1,
  fill: 1,
  size: 1,
  strokeWidth: 1,
  strokeDash: 1,
  // encode
  encode: 1
};
const LEGEND_COMPONENT_PROPERTIES = keys(LEGEND_COMPONENT_PROPERTY_INDEX);
class LegendComponent extends Split {
}
const legendEncodeRules = {
  symbols,
  gradient,
  labels: labels$1,
  entries
};
function symbols(symbolsSpec, { fieldOrDatumDef, model, channel, legendCmpt, legendType }) {
  if (legendType !== "symbol") {
    return void 0;
  }
  const { markDef, encoding, config, mark } = model;
  const filled = markDef.filled && mark !== "trail";
  let out = {
    ...applyMarkConfig({}, model, FILL_STROKE_CONFIG),
    ...color(model, { filled })
  };
  const symbolOpacity = legendCmpt.get("symbolOpacity") ?? config.legend.symbolOpacity;
  const symbolFillColor = legendCmpt.get("symbolFillColor") ?? config.legend.symbolFillColor;
  const symbolStrokeColor = legendCmpt.get("symbolStrokeColor") ?? config.legend.symbolStrokeColor;
  const opacity2 = symbolOpacity === void 0 ? getMaxValue(encoding.opacity) ?? markDef.opacity : void 0;
  if (out.fill) {
    if (channel === "fill" || filled && channel === COLOR) {
      delete out.fill;
    } else {
      if (out.fill["field"]) {
        if (symbolFillColor) {
          delete out.fill;
        } else {
          out.fill = signalOrValueRef(config.legend.symbolBaseFillColor ?? "black");
          out.fillOpacity = signalOrValueRef(opacity2 ?? 1);
        }
      } else if (isArray(out.fill)) {
        const fill = getFirstConditionValue(encoding.fill ?? encoding.color) ?? markDef.fill ?? (filled && markDef.color);
        if (fill) {
          out.fill = signalOrValueRef(fill);
        }
      }
    }
  }
  if (out.stroke) {
    if (channel === "stroke" || !filled && channel === COLOR) {
      delete out.stroke;
    } else {
      if (out.stroke["field"] || symbolStrokeColor) {
        delete out.stroke;
      } else if (isArray(out.stroke)) {
        const stroke = getFirstDefined(getFirstConditionValue(encoding.stroke || encoding.color), markDef.stroke, filled ? markDef.color : void 0);
        if (stroke) {
          out.stroke = { value: stroke };
        }
      }
    }
  }
  if (channel !== OPACITY) {
    const condition = isFieldDef(fieldOrDatumDef) && selectedCondition(model, legendCmpt, fieldOrDatumDef);
    if (condition) {
      out.opacity = [
        { test: condition, ...signalOrValueRef(opacity2 ?? 1) },
        signalOrValueRef(config.legend.unselectedOpacity)
      ];
    } else if (opacity2) {
      out.opacity = signalOrValueRef(opacity2);
    }
  }
  out = { ...out, ...symbolsSpec };
  return isEmpty(out) ? void 0 : out;
}
function gradient(gradientSpec, { model, legendType, legendCmpt }) {
  if (legendType !== "gradient") {
    return void 0;
  }
  const { config, markDef, encoding } = model;
  let out = {};
  const gradientOpacity = legendCmpt.get("gradientOpacity") ?? config.legend.gradientOpacity;
  const opacity2 = gradientOpacity === void 0 ? getMaxValue(encoding.opacity) || markDef.opacity : void 0;
  if (opacity2) {
    out.opacity = signalOrValueRef(opacity2);
  }
  out = { ...out, ...gradientSpec };
  return isEmpty(out) ? void 0 : out;
}
function labels$1(specifiedlabelsSpec, { fieldOrDatumDef, model, channel, legendCmpt }) {
  const legend = model.legend(channel) || {};
  const config = model.config;
  const condition = isFieldDef(fieldOrDatumDef) ? selectedCondition(model, legendCmpt, fieldOrDatumDef) : void 0;
  const opacity2 = condition ? [{ test: condition, value: 1 }, { value: config.legend.unselectedOpacity }] : void 0;
  const { format, formatType } = legend;
  let text2 = void 0;
  if (isCustomFormatType(formatType)) {
    text2 = formatCustomType({
      fieldOrDatumDef,
      field: "datum.value",
      format,
      formatType,
      config
    });
  } else if (format === void 0 && formatType === void 0 && config.customFormatTypes) {
    if (fieldOrDatumDef.type === "quantitative" && config.numberFormatType) {
      text2 = formatCustomType({
        fieldOrDatumDef,
        field: "datum.value",
        format: config.numberFormat,
        formatType: config.numberFormatType,
        config
      });
    } else if (fieldOrDatumDef.type === "temporal" && config.timeFormatType && isFieldDef(fieldOrDatumDef) && fieldOrDatumDef.timeUnit === void 0) {
      text2 = formatCustomType({
        fieldOrDatumDef,
        field: "datum.value",
        format: config.timeFormat,
        formatType: config.timeFormatType,
        config
      });
    }
  }
  const labelsSpec = {
    ...opacity2 ? { opacity: opacity2 } : {},
    ...text2 ? { text: text2 } : {},
    ...specifiedlabelsSpec
  };
  return isEmpty(labelsSpec) ? void 0 : labelsSpec;
}
function entries(entriesSpec, { legendCmpt }) {
  const selections = legendCmpt.get("selections");
  return (selections == null ? void 0 : selections.length) ? { ...entriesSpec, fill: { value: "transparent" } } : entriesSpec;
}
function getMaxValue(channelDef) {
  return getConditionValue(channelDef, (v, conditionalDef) => Math.max(v, conditionalDef.value));
}
function getFirstConditionValue(channelDef) {
  return getConditionValue(channelDef, (v, conditionalDef) => {
    return getFirstDefined(v, conditionalDef.value);
  });
}
function getConditionValue(channelDef, reducer) {
  if (hasConditionalValueDef(channelDef)) {
    return array(channelDef.condition).reduce(reducer, channelDef.value);
  } else if (isValueDef(channelDef)) {
    return channelDef.value;
  }
  return void 0;
}
function selectedCondition(model, legendCmpt, fieldDef) {
  const selections = legendCmpt.get("selections");
  if (!(selections == null ? void 0 : selections.length))
    return void 0;
  const field = $(fieldDef.field);
  return selections.map((name2) => {
    const store = $(varName(name2) + STORE);
    return `(!length(data(${store})) || (${name2}[${field}] && indexof(${name2}[${field}], datum.value) >= 0))`;
  }).join(" || ");
}
const legendRules = {
  direction: ({ direction }) => direction,
  format: ({ fieldOrDatumDef, legend, config }) => {
    const { format, formatType } = legend;
    return guideFormat(fieldOrDatumDef, fieldOrDatumDef.type, format, formatType, config, false);
  },
  formatType: ({ legend, fieldOrDatumDef, scaleType: scaleType2 }) => {
    const { formatType } = legend;
    return guideFormatType(formatType, fieldOrDatumDef, scaleType2);
  },
  gradientLength: (params) => {
    const { legend, legendConfig } = params;
    return legend.gradientLength ?? legendConfig.gradientLength ?? defaultGradientLength(params);
  },
  labelOverlap: ({ legend, legendConfig, scaleType: scaleType2 }) => legend.labelOverlap ?? legendConfig.labelOverlap ?? defaultLabelOverlap(scaleType2),
  symbolType: ({ legend, markDef, channel, encoding }) => legend.symbolType ?? defaultSymbolType(markDef.type, channel, encoding.shape, markDef.shape),
  title: ({ fieldOrDatumDef, config }) => title(fieldOrDatumDef, config, { allowDisabling: true }),
  type: ({ legendType, scaleType: scaleType2, channel }) => {
    if (isColorChannel(channel) && isContinuousToContinuous(scaleType2)) {
      if (legendType === "gradient") {
        return void 0;
      }
    } else if (legendType === "symbol") {
      return void 0;
    }
    return legendType;
  },
  values: ({ fieldOrDatumDef, legend }) => values(legend, fieldOrDatumDef)
};
function values(legend, fieldOrDatumDef) {
  const vals2 = legend.values;
  if (isArray(vals2)) {
    return valueArray(fieldOrDatumDef, vals2);
  } else if (isSignalRef(vals2)) {
    return vals2;
  }
  return void 0;
}
function defaultSymbolType(mark, channel, shapeChannelDef, markShape) {
  if (channel !== "shape") {
    const shape = getFirstConditionValue(shapeChannelDef) ?? markShape;
    if (shape) {
      return shape;
    }
  }
  switch (mark) {
    case "bar":
    case "rect":
    case "image":
    case "square":
      return "square";
    case "line":
    case "trail":
    case "rule":
      return "stroke";
    case "arc":
    case "point":
    case "circle":
    case "tick":
    case "geoshape":
    case "area":
    case "text":
      return "circle";
  }
}
function getLegendType(params) {
  const { legend } = params;
  return getFirstDefined(legend.type, defaultType$1(params));
}
function defaultType$1({ channel, timeUnit, scaleType: scaleType2 }) {
  if (isColorChannel(channel)) {
    if (contains(["quarter", "month", "day"], timeUnit)) {
      return "symbol";
    }
    if (isContinuousToContinuous(scaleType2)) {
      return "gradient";
    }
  }
  return "symbol";
}
function getDirection({ legendConfig, legendType, orient: orient2, legend }) {
  return legend.direction ?? legendConfig[legendType ? "gradientDirection" : "symbolDirection"] ?? defaultDirection(orient2, legendType);
}
function defaultDirection(orient2, legendType) {
  switch (orient2) {
    case "top":
    case "bottom":
      return "horizontal";
    case "left":
    case "right":
    case "none":
    case void 0:
      return void 0;
    default:
      return legendType === "gradient" ? "horizontal" : void 0;
  }
}
function defaultGradientLength({ legendConfig, model, direction, orient: orient2, scaleType: scaleType2 }) {
  const { gradientHorizontalMaxLength, gradientHorizontalMinLength, gradientVerticalMaxLength, gradientVerticalMinLength } = legendConfig;
  if (isContinuousToContinuous(scaleType2)) {
    if (direction === "horizontal") {
      if (orient2 === "top" || orient2 === "bottom") {
        return gradientLengthSignal(model, "width", gradientHorizontalMinLength, gradientHorizontalMaxLength);
      } else {
        return gradientHorizontalMinLength;
      }
    } else {
      return gradientLengthSignal(model, "height", gradientVerticalMinLength, gradientVerticalMaxLength);
    }
  }
  return void 0;
}
function gradientLengthSignal(model, sizeType, min, max) {
  const sizeSignal = model.getSizeSignalRef(sizeType).signal;
  return { signal: `clamp(${sizeSignal}, ${min}, ${max})` };
}
function defaultLabelOverlap(scaleType2) {
  if (contains(["quantile", "threshold", "log", "symlog"], scaleType2)) {
    return "greedy";
  }
  return void 0;
}
function parseLegend(model) {
  const legendComponent = isUnitModel(model) ? parseUnitLegend(model) : parseNonUnitLegend(model);
  model.component.legends = legendComponent;
  return legendComponent;
}
function parseUnitLegend(model) {
  const { encoding } = model;
  const legendComponent = {};
  for (const channel of [COLOR, ...LEGEND_SCALE_CHANNELS]) {
    const def = getFieldOrDatumDef(encoding[channel]);
    if (!def || !model.getScaleComponent(channel)) {
      continue;
    }
    if (channel === SHAPE && isFieldDef(def) && def.type === GEOJSON) {
      continue;
    }
    legendComponent[channel] = parseLegendForChannel(model, channel);
  }
  return legendComponent;
}
function getLegendDefWithScale(model, channel) {
  const scale = model.scaleName(channel);
  if (model.mark === "trail") {
    if (channel === "color") {
      return { stroke: scale };
    } else if (channel === "size") {
      return { strokeWidth: scale };
    }
  }
  if (channel === "color") {
    return model.markDef.filled ? { fill: scale } : { stroke: scale };
  }
  return { [channel]: scale };
}
function isExplicit$1(value, property, legend, fieldDef) {
  switch (property) {
    case "disable":
      return legend !== void 0;
    case "values":
      return !!(legend == null ? void 0 : legend.values);
    case "title":
      if (property === "title" && value === (fieldDef == null ? void 0 : fieldDef.title)) {
        return true;
      }
  }
  return value === (legend || {})[property];
}
function parseLegendForChannel(model, channel) {
  var _a2;
  let legend = model.legend(channel);
  const { markDef, encoding, config } = model;
  const legendConfig = config.legend;
  const legendCmpt = new LegendComponent({}, getLegendDefWithScale(model, channel));
  parseInteractiveLegend(model, channel, legendCmpt);
  const disable = legend !== void 0 ? !legend : legendConfig.disable;
  legendCmpt.set("disable", disable, legend !== void 0);
  if (disable) {
    return legendCmpt;
  }
  legend = legend || {};
  const scaleType2 = model.getScaleComponent(channel).get("type");
  const fieldOrDatumDef = getFieldOrDatumDef(encoding[channel]);
  const timeUnit = isFieldDef(fieldOrDatumDef) ? (_a2 = normalizeTimeUnit(fieldOrDatumDef.timeUnit)) == null ? void 0 : _a2.unit : void 0;
  const orient2 = legend.orient || config.legend.orient || "right";
  const legendType = getLegendType({ legend, channel, timeUnit, scaleType: scaleType2 });
  const direction = getDirection({ legend, legendType, orient: orient2, legendConfig });
  const ruleParams = {
    legend,
    channel,
    model,
    markDef,
    encoding,
    fieldOrDatumDef,
    legendConfig,
    config,
    scaleType: scaleType2,
    orient: orient2,
    legendType,
    direction
  };
  for (const property of LEGEND_COMPONENT_PROPERTIES) {
    if (legendType === "gradient" && property.startsWith("symbol") || legendType === "symbol" && property.startsWith("gradient")) {
      continue;
    }
    const value = property in legendRules ? legendRules[property](ruleParams) : legend[property];
    if (value !== void 0) {
      const explicit = isExplicit$1(value, property, legend, model.fieldDef(channel));
      if (explicit || config.legend[property] === void 0) {
        legendCmpt.set(property, value, explicit);
      }
    }
  }
  const legendEncoding = (legend == null ? void 0 : legend.encoding) ?? {};
  const selections = legendCmpt.get("selections");
  const legendEncode = {};
  const legendEncodeParams = { fieldOrDatumDef, model, channel, legendCmpt, legendType };
  for (const part of ["labels", "legend", "title", "symbols", "gradient", "entries"]) {
    const legendEncodingPart = guideEncodeEntry(legendEncoding[part] ?? {}, model);
    const value = part in legendEncodeRules ? legendEncodeRules[part](legendEncodingPart, legendEncodeParams) : legendEncodingPart;
    if (value !== void 0 && !isEmpty(value)) {
      legendEncode[part] = {
        ...(selections == null ? void 0 : selections.length) && isFieldDef(fieldOrDatumDef) ? { name: `${varName(fieldOrDatumDef.field)}_legend_${part}` } : {},
        ...(selections == null ? void 0 : selections.length) ? { interactive: !!selections } : {},
        update: value
      };
    }
  }
  if (!isEmpty(legendEncode)) {
    legendCmpt.set("encode", legendEncode, !!(legend == null ? void 0 : legend.encoding));
  }
  return legendCmpt;
}
function parseNonUnitLegend(model) {
  const { legends, resolve } = model.component;
  for (const child of model.children) {
    parseLegend(child);
    for (const channel of keys(child.component.legends)) {
      resolve.legend[channel] = parseGuideResolve(model.component.resolve, channel);
      if (resolve.legend[channel] === "shared") {
        legends[channel] = mergeLegendComponent(legends[channel], child.component.legends[channel]);
        if (!legends[channel]) {
          resolve.legend[channel] = "independent";
          delete legends[channel];
        }
      }
    }
  }
  for (const channel of keys(legends)) {
    for (const child of model.children) {
      if (!child.component.legends[channel]) {
        continue;
      }
      if (resolve.legend[channel] === "shared") {
        delete child.component.legends[channel];
      }
    }
  }
  return legends;
}
function mergeLegendComponent(mergedLegend, childLegend) {
  var _a2, _b, _c2, _d2;
  if (!mergedLegend) {
    return childLegend.clone();
  }
  const mergedOrient = mergedLegend.getWithExplicit("orient");
  const childOrient = childLegend.getWithExplicit("orient");
  if (mergedOrient.explicit && childOrient.explicit && mergedOrient.value !== childOrient.value) {
    return void 0;
  }
  let typeMerged = false;
  for (const prop of LEGEND_COMPONENT_PROPERTIES) {
    const mergedValueWithExplicit = mergeValuesWithExplicit(
      mergedLegend.getWithExplicit(prop),
      childLegend.getWithExplicit(prop),
      prop,
      "legend",
      // Tie breaker function
      (v1, v2) => {
        switch (prop) {
          case "symbolType":
            return mergeSymbolType(v1, v2);
          case "title":
            return mergeTitleComponent(v1, v2);
          case "type":
            typeMerged = true;
            return makeImplicit("symbol");
        }
        return defaultTieBreaker(v1, v2, prop, "legend");
      }
    );
    mergedLegend.setWithExplicit(prop, mergedValueWithExplicit);
  }
  if (typeMerged) {
    if ((_b = (_a2 = mergedLegend.implicit) == null ? void 0 : _a2.encode) == null ? void 0 : _b.gradient) {
      deleteNestedProperty(mergedLegend.implicit, ["encode", "gradient"]);
    }
    if ((_d2 = (_c2 = mergedLegend.explicit) == null ? void 0 : _c2.encode) == null ? void 0 : _d2.gradient) {
      deleteNestedProperty(mergedLegend.explicit, ["encode", "gradient"]);
    }
  }
  return mergedLegend;
}
function mergeSymbolType(st1, st2) {
  if (st2.value === "circle") {
    return st2;
  }
  return st1;
}
function setLegendEncode(legend, part, vgProp, vgRef) {
  var _a2, _b;
  legend.encode ?? (legend.encode = {});
  (_a2 = legend.encode)[part] ?? (_a2[part] = {});
  (_b = legend.encode[part]).update ?? (_b.update = {});
  legend.encode[part].update[vgProp] = vgRef;
}
function assembleLegends(model) {
  const legendComponentIndex = model.component.legends;
  const legendByDomain = {};
  for (const channel of keys(legendComponentIndex)) {
    const scaleComponent = model.getScaleComponent(channel);
    const domainHash = stringify(scaleComponent.get("domains"));
    if (legendByDomain[domainHash]) {
      for (const mergedLegendComponent of legendByDomain[domainHash]) {
        const merged = mergeLegendComponent(mergedLegendComponent, legendComponentIndex[channel]);
        if (!merged) {
          legendByDomain[domainHash].push(legendComponentIndex[channel]);
        }
      }
    } else {
      legendByDomain[domainHash] = [legendComponentIndex[channel].clone()];
    }
  }
  const legends = vals(legendByDomain).flat().map((l) => assembleLegend(l, model.config)).filter((l) => l !== void 0);
  return legends;
}
function assembleLegend(legendCmpt, config) {
  var _a2, _b, _c2;
  const { disable, labelExpr, selections, ...legend } = legendCmpt.combine();
  if (disable) {
    return void 0;
  }
  if (config.aria === false && legend.aria == void 0) {
    legend.aria = false;
  }
  if ((_a2 = legend.encode) == null ? void 0 : _a2.symbols) {
    const out = legend.encode.symbols.update;
    if (out.fill && out.fill["value"] !== "transparent" && !out.stroke && !legend.stroke) {
      out.stroke = { value: "transparent" };
    }
    for (const property of LEGEND_SCALE_CHANNELS) {
      if (legend[property]) {
        delete out[property];
      }
    }
  }
  if (!legend.title) {
    delete legend.title;
  }
  if (labelExpr !== void 0) {
    let expr = labelExpr;
    if (((_c2 = (_b = legend.encode) == null ? void 0 : _b.labels) == null ? void 0 : _c2.update) && isSignalRef(legend.encode.labels.update.text)) {
      expr = replaceAll(labelExpr, "datum.label", legend.encode.labels.update.text.signal);
    }
    setLegendEncode(legend, "labels", "text", { signal: expr });
  }
  return legend;
}
function assembleProjections(model) {
  if (isLayerModel(model) || isConcatModel(model)) {
    return assembleProjectionsForModelAndChildren(model);
  } else {
    return assembleProjectionForModel(model);
  }
}
function assembleProjectionsForModelAndChildren(model) {
  return model.children.reduce((projections, child) => {
    return projections.concat(child.assembleProjections());
  }, assembleProjectionForModel(model));
}
function assembleProjectionForModel(model) {
  const component = model.component.projection;
  if (!component || component.merged) {
    return [];
  }
  const projection = component.combine();
  const { name: name2 } = projection;
  if (!component.data) {
    return [
      {
        name: name2,
        // translate to center by default
        ...{ translate: { signal: "[width / 2, height / 2]" } },
        // parameters, overwrite default translate if specified
        ...projection
      }
    ];
  } else {
    const size = {
      signal: `[${component.size.map((ref) => ref.signal).join(", ")}]`
    };
    const fits = component.data.reduce((sources, data) => {
      const source = isSignalRef(data) ? data.signal : `data('${model.lookupDataSource(data)}')`;
      if (!contains(sources, source)) {
        sources.push(source);
      }
      return sources;
    }, []);
    if (fits.length <= 0) {
      throw new Error("Projection's fit didn't find any data sources");
    }
    return [
      {
        name: name2,
        size,
        fit: {
          signal: fits.length > 1 ? `[${fits.join(", ")}]` : fits[0]
        },
        ...projection
      }
    ];
  }
}
const PROJECTION_PROPERTIES = [
  "type",
  "clipAngle",
  "clipExtent",
  "center",
  "rotate",
  "precision",
  "reflectX",
  "reflectY",
  "coefficient",
  "distance",
  "fraction",
  "lobes",
  "parallel",
  "radius",
  "ratio",
  "spacing",
  "tilt"
];
class ProjectionComponent extends Split {
  constructor(name2, specifiedProjection, size, data) {
    super(
      { ...specifiedProjection },
      // all explicit properties of projection
      { name: name2 }
      // name as initial implicit property
    );
    this.specifiedProjection = specifiedProjection;
    this.size = size;
    this.data = data;
    this.merged = false;
  }
  /**
   * Whether the projection parameters should fit provided data.
   */
  get isFit() {
    return !!this.data;
  }
}
function parseProjection(model) {
  model.component.projection = isUnitModel(model) ? parseUnitProjection(model) : parseNonUnitProjections(model);
}
function parseUnitProjection(model) {
  if (model.hasProjection) {
    const proj = replaceExprRef(model.specifiedProjection);
    const fit = !(proj && (proj.scale != null || proj.translate != null));
    const size = fit ? [model.getSizeSignalRef("width"), model.getSizeSignalRef("height")] : void 0;
    const data = fit ? gatherFitData(model) : void 0;
    const projComp = new ProjectionComponent(model.projectionName(true), {
      ...replaceExprRef(model.config.projection) ?? {},
      ...proj ?? {}
    }, size, data);
    if (!projComp.get("type")) {
      projComp.set("type", "equalEarth", false);
    }
    return projComp;
  }
  return void 0;
}
function gatherFitData(model) {
  const data = [];
  const { encoding } = model;
  for (const posssiblePair of [
    [LONGITUDE, LATITUDE],
    [LONGITUDE2, LATITUDE2]
  ]) {
    if (getFieldOrDatumDef(encoding[posssiblePair[0]]) || getFieldOrDatumDef(encoding[posssiblePair[1]])) {
      data.push({
        signal: model.getName(`geojson_${data.length}`)
      });
    }
  }
  if (model.channelHasField(SHAPE) && model.typedFieldDef(SHAPE).type === GEOJSON) {
    data.push({
      signal: model.getName(`geojson_${data.length}`)
    });
  }
  if (data.length === 0) {
    data.push(model.requestDataName(DataSourceType.Main));
  }
  return data;
}
function mergeIfNoConflict(first, second) {
  const allPropertiesShared = every(PROJECTION_PROPERTIES, (prop) => {
    if (!has(first.explicit, prop) && !has(second.explicit, prop)) {
      return true;
    }
    if (has(first.explicit, prop) && has(second.explicit, prop) && // some properties might be signals or objects and require hashing for comparison
    deepEqual(first.get(prop), second.get(prop))) {
      return true;
    }
    return false;
  });
  const size = deepEqual(first.size, second.size);
  if (size) {
    if (allPropertiesShared) {
      return first;
    } else if (deepEqual(first.explicit, {})) {
      return second;
    } else if (deepEqual(second.explicit, {})) {
      return first;
    }
  }
  return null;
}
function parseNonUnitProjections(model) {
  if (model.children.length === 0) {
    return void 0;
  }
  let nonUnitProjection;
  for (const child of model.children) {
    parseProjection(child);
  }
  const mergable = every(model.children, (child) => {
    const projection = child.component.projection;
    if (!projection) {
      return true;
    } else if (!nonUnitProjection) {
      nonUnitProjection = projection;
      return true;
    } else {
      const merge = mergeIfNoConflict(nonUnitProjection, projection);
      if (merge) {
        nonUnitProjection = merge;
      }
      return !!merge;
    }
  });
  if (nonUnitProjection && mergable) {
    const name2 = model.projectionName(true);
    const modelProjection = new ProjectionComponent(name2, nonUnitProjection.specifiedProjection, nonUnitProjection.size, duplicate(nonUnitProjection.data));
    for (const child of model.children) {
      const projection = child.component.projection;
      if (projection) {
        if (projection.isFit) {
          modelProjection.data.push(...child.component.projection.data);
        }
        child.renameProjection(projection.get("name"), name2);
        projection.merged = true;
      }
    }
    return modelProjection;
  }
  return void 0;
}
function rangeFormula(model, fieldDef, channel, config) {
  if (binRequiresRange(fieldDef, channel)) {
    const guide = isUnitModel(model) ? model.axis(channel) ?? model.legend(channel) ?? {} : {};
    const startField = vgField(fieldDef, { expr: "datum" });
    const endField = vgField(fieldDef, { expr: "datum", binSuffix: "end" });
    return {
      formulaAs: vgField(fieldDef, { binSuffix: "range", forAs: true }),
      formula: binFormatExpression(startField, endField, guide.format, guide.formatType, config)
    };
  }
  return {};
}
function binKey(bin2, field) {
  return `${binToString(bin2)}_${field}`;
}
function getSignalsFromModel(model, key) {
  return {
    signal: model.getName(`${key}_bins`),
    extentSignal: model.getName(`${key}_extent`)
  };
}
function getBinSignalName(model, field, bin2) {
  const normalizedBin = normalizeBin(bin2, void 0) ?? {};
  const key = binKey(normalizedBin, field);
  return model.getName(`${key}_bins`);
}
function isBinTransform(t2) {
  return "as" in t2;
}
function createBinComponent(t2, bin2, model) {
  let as;
  let span;
  if (isBinTransform(t2)) {
    as = isString(t2.as) ? [t2.as, `${t2.as}_end`] : [t2.as[0], t2.as[1]];
  } else {
    as = [vgField(t2, { forAs: true }), vgField(t2, { binSuffix: "end", forAs: true })];
  }
  const normalizedBin = { ...normalizeBin(bin2, void 0) };
  const key = binKey(normalizedBin, t2.field);
  const { signal, extentSignal } = getSignalsFromModel(model, key);
  if (isParameterExtent(normalizedBin.extent)) {
    const ext = normalizedBin.extent;
    span = parseSelectionExtent(model, ext.param, ext);
    delete normalizedBin.extent;
  }
  const binComponent = {
    bin: normalizedBin,
    field: t2.field,
    as: [as],
    ...signal ? { signal } : {},
    ...extentSignal ? { extentSignal } : {},
    ...span ? { span } : {}
  };
  return { key, binComponent };
}
class BinNode extends DataFlowNode {
  clone() {
    return new BinNode(null, duplicate(this.bins));
  }
  constructor(parent, bins2) {
    super(parent);
    this.bins = bins2;
  }
  static makeFromEncoding(parent, model) {
    const bins2 = model.reduceFieldDef((binComponentIndex, fieldDef, channel) => {
      if (isTypedFieldDef(fieldDef) && isBinning(fieldDef.bin)) {
        const { key, binComponent } = createBinComponent(fieldDef, fieldDef.bin, model);
        binComponentIndex[key] = {
          ...binComponent,
          ...binComponentIndex[key],
          ...rangeFormula(model, fieldDef, channel, model.config)
        };
      }
      return binComponentIndex;
    }, {});
    if (isEmpty(bins2)) {
      return null;
    }
    return new BinNode(parent, bins2);
  }
  /**
   * Creates a bin node from BinTransform.
   * The optional parameter should provide
   */
  static makeFromTransform(parent, t2, model) {
    const { key, binComponent } = createBinComponent(t2, t2.bin, model);
    return new BinNode(parent, {
      [key]: binComponent
    });
  }
  /**
   * Merge bin nodes. This method either integrates the bin config from the other node
   * or if this node already has a bin config, renames the corresponding signal in the model.
   */
  merge(other, renameSignal) {
    for (const key of keys(other.bins)) {
      if (key in this.bins) {
        renameSignal(other.bins[key].signal, this.bins[key].signal);
        this.bins[key].as = unique([...this.bins[key].as, ...other.bins[key].as], hash);
      } else {
        this.bins[key] = other.bins[key];
      }
    }
    for (const child of other.children) {
      other.removeChild(child);
      child.parent = this;
    }
    other.remove();
  }
  producedFields() {
    return new Set(vals(this.bins).map((c) => c.as).flat(2));
  }
  dependentFields() {
    return new Set(vals(this.bins).map((c) => c.field));
  }
  hash() {
    return `Bin ${hash(this.bins)}`;
  }
  assemble() {
    return vals(this.bins).flatMap((bin2) => {
      const transform = [];
      const [binAs, ...remainingAs] = bin2.as;
      const { extent, ...params } = bin2.bin;
      const binTrans = {
        type: "bin",
        field: replacePathInField(bin2.field),
        as: binAs,
        signal: bin2.signal,
        ...!isParameterExtent(extent) ? { extent } : { extent: null },
        ...bin2.span ? { span: { signal: `span(${bin2.span})` } } : {},
        ...params
      };
      if (!extent && bin2.extentSignal) {
        transform.push({
          type: "extent",
          field: replacePathInField(bin2.field),
          signal: bin2.extentSignal
        });
        binTrans.extent = { signal: bin2.extentSignal };
      }
      transform.push(binTrans);
      for (const as of remainingAs) {
        for (let i = 0; i < 2; i++) {
          transform.push({
            type: "formula",
            expr: vgField({ field: binAs[i] }, { expr: "datum" }),
            as: as[i]
          });
        }
      }
      if (bin2.formula) {
        transform.push({
          type: "formula",
          expr: bin2.formula,
          as: bin2.formulaAs
        });
      }
      return transform;
    });
  }
}
function addDimension(dims, channel, fieldDef, model) {
  var _a2;
  const channelDef2 = isUnitModel(model) ? model.encoding[getSecondaryRangeChannel(channel)] : void 0;
  if (isTypedFieldDef(fieldDef) && isUnitModel(model) && hasBandEnd(fieldDef, channelDef2, model.markDef, model.config)) {
    dims.add(vgField(fieldDef, {}));
    dims.add(vgField(fieldDef, { suffix: "end" }));
    if (fieldDef.bin && binRequiresRange(fieldDef, channel)) {
      dims.add(vgField(fieldDef, { binSuffix: "range" }));
    }
  } else if (isGeoPositionChannel(channel)) {
    const posChannel = getPositionChannelFromLatLong(channel);
    dims.add(model.getName(posChannel));
  } else {
    dims.add(vgField(fieldDef));
  }
  if (isScaleFieldDef(fieldDef) && isFieldRange((_a2 = fieldDef.scale) == null ? void 0 : _a2.range)) {
    dims.add(fieldDef.scale.range.field);
  }
  return dims;
}
function mergeMeasures(parentMeasures, childMeasures) {
  for (const field of keys(childMeasures)) {
    const ops = childMeasures[field];
    for (const op of keys(ops)) {
      if (field in parentMeasures) {
        parentMeasures[field][op] = /* @__PURE__ */ new Set([...parentMeasures[field][op] ?? [], ...ops[op]]);
      } else {
        parentMeasures[field] = { [op]: ops[op] };
      }
    }
  }
}
class AggregateNode extends DataFlowNode {
  clone() {
    return new AggregateNode(null, new Set(this.dimensions), duplicate(this.measures));
  }
  /**
   * @param dimensions string set for dimensions
   * @param measures dictionary mapping field name => dict of aggregation functions and names to use
   */
  constructor(parent, dimensions, measures) {
    super(parent);
    this.dimensions = dimensions;
    this.measures = measures;
  }
  get groupBy() {
    return this.dimensions;
  }
  static makeFromEncoding(parent, model) {
    let isAggregate2 = false;
    model.forEachFieldDef((fd) => {
      if (fd.aggregate) {
        isAggregate2 = true;
      }
    });
    const meas = {};
    const dims = /* @__PURE__ */ new Set();
    if (!isAggregate2) {
      return null;
    }
    model.forEachFieldDef((fieldDef, channel) => {
      const { aggregate, field } = fieldDef;
      if (aggregate) {
        if (aggregate === "count") {
          meas["*"] ?? (meas["*"] = {});
          meas["*"]["count"] = /* @__PURE__ */ new Set([vgField(fieldDef, { forAs: true })]);
        } else {
          if (isArgminDef(aggregate) || isArgmaxDef(aggregate)) {
            const op = isArgminDef(aggregate) ? "argmin" : "argmax";
            const argField = aggregate[op];
            meas[argField] ?? (meas[argField] = {});
            meas[argField][op] = /* @__PURE__ */ new Set([vgField({ op, field: argField }, { forAs: true })]);
          } else {
            meas[field] ?? (meas[field] = {});
            meas[field][aggregate] = /* @__PURE__ */ new Set([vgField(fieldDef, { forAs: true })]);
          }
          if (isScaleChannel(channel) && model.scaleDomain(channel) === "unaggregated") {
            meas[field] ?? (meas[field] = {});
            meas[field]["min"] = /* @__PURE__ */ new Set([vgField({ field, aggregate: "min" }, { forAs: true })]);
            meas[field]["max"] = /* @__PURE__ */ new Set([vgField({ field, aggregate: "max" }, { forAs: true })]);
          }
        }
      } else {
        addDimension(dims, channel, fieldDef, model);
      }
    });
    if (dims.size + keys(meas).length === 0) {
      return null;
    }
    return new AggregateNode(parent, dims, meas);
  }
  static makeFromTransform(parent, t2) {
    const dims = /* @__PURE__ */ new Set();
    const meas = {};
    for (const s of t2.aggregate) {
      const { op, field, as } = s;
      if (op) {
        if (op === "count") {
          meas["*"] ?? (meas["*"] = {});
          meas["*"]["count"] = /* @__PURE__ */ new Set([as ? as : vgField(s, { forAs: true })]);
        } else {
          meas[field] ?? (meas[field] = {});
          meas[field][op] = /* @__PURE__ */ new Set([as ? as : vgField(s, { forAs: true })]);
        }
      }
    }
    for (const s of t2.groupby ?? []) {
      dims.add(s);
    }
    if (dims.size + keys(meas).length === 0) {
      return null;
    }
    return new AggregateNode(parent, dims, meas);
  }
  merge(other) {
    if (setEqual(this.dimensions, other.dimensions)) {
      mergeMeasures(this.measures, other.measures);
      return true;
    }
    debug$2("different dimensions, cannot merge");
    return false;
  }
  addDimensions(fields) {
    fields.forEach(this.dimensions.add, this.dimensions);
  }
  dependentFields() {
    return /* @__PURE__ */ new Set([...this.dimensions, ...keys(this.measures)]);
  }
  producedFields() {
    const out = /* @__PURE__ */ new Set();
    for (const field of keys(this.measures)) {
      for (const op of keys(this.measures[field])) {
        const m = this.measures[field][op];
        if (m.size === 0) {
          out.add(`${op}_${field}`);
        } else {
          m.forEach(out.add, out);
        }
      }
    }
    return out;
  }
  hash() {
    return `Aggregate ${hash({ dimensions: this.dimensions, measures: this.measures })}`;
  }
  assemble() {
    const ops = [];
    const fields = [];
    const as = [];
    for (const field of keys(this.measures)) {
      for (const op of keys(this.measures[field])) {
        for (const alias of this.measures[field][op]) {
          as.push(alias);
          ops.push(op);
          fields.push(field === "*" ? null : replacePathInField(field));
        }
      }
    }
    const result = {
      type: "aggregate",
      groupby: [...this.dimensions].map(replacePathInField),
      ops,
      fields,
      as
    };
    return result;
  }
}
class FacetNode extends DataFlowNode {
  /**
   * @param model The facet model.
   * @param name The name that this facet source will have.
   * @param data The source data for this facet data.
   */
  constructor(parent, model, name2, data) {
    super(parent);
    this.model = model;
    this.name = name2;
    this.data = data;
    for (const channel of FACET_CHANNELS) {
      const fieldDef = model.facet[channel];
      if (fieldDef) {
        const { bin: bin2, sort } = fieldDef;
        this[channel] = {
          name: model.getName(`${channel}_domain`),
          fields: [vgField(fieldDef), ...isBinning(bin2) ? [vgField(fieldDef, { binSuffix: "end" })] : []],
          ...isSortField(sort) ? { sortField: sort } : isArray(sort) ? { sortIndexField: sortArrayIndexField(fieldDef, channel) } : {}
        };
      }
    }
    this.childModel = model.child;
  }
  hash() {
    let out = `Facet`;
    for (const channel of FACET_CHANNELS) {
      if (this[channel]) {
        out += ` ${channel.charAt(0)}:${hash(this[channel])}`;
      }
    }
    return out;
  }
  get fields() {
    var _a2;
    const f = [];
    for (const channel of FACET_CHANNELS) {
      if ((_a2 = this[channel]) == null ? void 0 : _a2.fields) {
        f.push(...this[channel].fields);
      }
    }
    return f;
  }
  dependentFields() {
    const depFields = new Set(this.fields);
    for (const channel of FACET_CHANNELS) {
      if (this[channel]) {
        if (this[channel].sortField) {
          depFields.add(this[channel].sortField.field);
        }
        if (this[channel].sortIndexField) {
          depFields.add(this[channel].sortIndexField);
        }
      }
    }
    return depFields;
  }
  producedFields() {
    return /* @__PURE__ */ new Set();
  }
  /**
   * The name to reference this source is its name.
   */
  getSource() {
    return this.name;
  }
  getChildIndependentFieldsWithStep() {
    const childIndependentFieldsWithStep = {};
    for (const channel of POSITION_SCALE_CHANNELS) {
      const childScaleComponent = this.childModel.component.scales[channel];
      if (childScaleComponent && !childScaleComponent.merged) {
        const type2 = childScaleComponent.get("type");
        const range2 = childScaleComponent.get("range");
        if (hasDiscreteDomain(type2) && isVgRangeStep(range2)) {
          const domain2 = assembleDomain(this.childModel, channel);
          const field = getFieldFromDomain(domain2);
          if (field) {
            childIndependentFieldsWithStep[channel] = field;
          } else {
            warn(unknownField(channel));
          }
        }
      }
    }
    return childIndependentFieldsWithStep;
  }
  assembleRowColumnHeaderData(channel, crossedDataName, childIndependentFieldsWithStep) {
    const childChannel = { row: "y", column: "x", facet: void 0 }[channel];
    const fields = [];
    const ops = [];
    const as = [];
    if (childChannel && childIndependentFieldsWithStep && childIndependentFieldsWithStep[childChannel]) {
      if (crossedDataName) {
        fields.push(`distinct_${childIndependentFieldsWithStep[childChannel]}`);
        ops.push("max");
      } else {
        fields.push(childIndependentFieldsWithStep[childChannel]);
        ops.push("distinct");
      }
      as.push(`distinct_${childIndependentFieldsWithStep[childChannel]}`);
    }
    const { sortField, sortIndexField } = this[channel];
    if (sortField) {
      const { op = DEFAULT_SORT_OP, field } = sortField;
      fields.push(field);
      ops.push(op);
      as.push(vgField(sortField, { forAs: true }));
    } else if (sortIndexField) {
      fields.push(sortIndexField);
      ops.push("max");
      as.push(sortIndexField);
    }
    return {
      name: this[channel].name,
      // Use data from the crossed one if it exist
      source: crossedDataName ?? this.data,
      transform: [
        {
          type: "aggregate",
          groupby: this[channel].fields,
          ...fields.length ? {
            fields,
            ops,
            as
          } : {}
        }
      ]
    };
  }
  assembleFacetHeaderData(childIndependentFieldsWithStep) {
    var _a2;
    const { columns } = this.model.layout;
    const { layoutHeaders } = this.model.component;
    const data = [];
    const hasSharedAxis = {};
    for (const headerChannel of HEADER_CHANNELS) {
      for (const headerType of HEADER_TYPES) {
        const headers = (layoutHeaders[headerChannel] && layoutHeaders[headerChannel][headerType]) ?? [];
        for (const header of headers) {
          if (((_a2 = header.axes) == null ? void 0 : _a2.length) > 0) {
            hasSharedAxis[headerChannel] = true;
            break;
          }
        }
      }
      if (hasSharedAxis[headerChannel]) {
        const cardinality = `length(data("${this.facet.name}"))`;
        const stop = headerChannel === "row" ? columns ? { signal: `ceil(${cardinality} / ${columns})` } : 1 : columns ? { signal: `min(${cardinality}, ${columns})` } : { signal: cardinality };
        data.push({
          name: `${this.facet.name}_${headerChannel}`,
          transform: [
            {
              type: "sequence",
              start: 0,
              stop
            }
          ]
        });
      }
    }
    const { row, column } = hasSharedAxis;
    if (row || column) {
      data.unshift(this.assembleRowColumnHeaderData("facet", null, childIndependentFieldsWithStep));
    }
    return data;
  }
  assemble() {
    const data = [];
    let crossedDataName = null;
    const childIndependentFieldsWithStep = this.getChildIndependentFieldsWithStep();
    const { column, row, facet } = this;
    if (column && row && (childIndependentFieldsWithStep.x || childIndependentFieldsWithStep.y)) {
      crossedDataName = `cross_${this.column.name}_${this.row.name}`;
      const fields = [].concat(childIndependentFieldsWithStep.x ?? [], childIndependentFieldsWithStep.y ?? []);
      const ops = fields.map(() => "distinct");
      data.push({
        name: crossedDataName,
        source: this.data,
        transform: [
          {
            type: "aggregate",
            groupby: this.fields,
            fields,
            ops
          }
        ]
      });
    }
    for (const channel of [COLUMN, ROW]) {
      if (this[channel]) {
        data.push(this.assembleRowColumnHeaderData(channel, crossedDataName, childIndependentFieldsWithStep));
      }
    }
    if (facet) {
      const facetData = this.assembleFacetHeaderData(childIndependentFieldsWithStep);
      if (facetData) {
        data.push(...facetData);
      }
    }
    return data;
  }
}
function unquote(pattern) {
  if (pattern.startsWith("'") && pattern.endsWith("'") || pattern.startsWith('"') && pattern.endsWith('"')) {
    return pattern.slice(1, -1);
  }
  return pattern;
}
function parseExpression(field, parse) {
  const f = accessPathWithDatum(field);
  if (parse === "number") {
    return `toNumber(${f})`;
  } else if (parse === "boolean") {
    return `toBoolean(${f})`;
  } else if (parse === "string") {
    return `toString(${f})`;
  } else if (parse === "date") {
    return `toDate(${f})`;
  } else if (parse === "flatten") {
    return f;
  } else if (parse.startsWith("date:")) {
    const specifier = unquote(parse.slice(5, parse.length));
    return `timeParse(${f},'${specifier}')`;
  } else if (parse.startsWith("utc:")) {
    const specifier = unquote(parse.slice(4, parse.length));
    return `utcParse(${f},'${specifier}')`;
  } else {
    warn(unrecognizedParse(parse));
    return null;
  }
}
function getImplicitFromFilterTransform(transform) {
  const implicit = {};
  forEachLeaf(transform.filter, (filter) => {
    if (isFieldPredicate(filter)) {
      let val = null;
      if (isFieldEqualPredicate(filter)) {
        val = signalRefOrValue(filter.equal);
      } else if (isFieldLTEPredicate(filter)) {
        val = signalRefOrValue(filter.lte);
      } else if (isFieldLTPredicate(filter)) {
        val = signalRefOrValue(filter.lt);
      } else if (isFieldGTPredicate(filter)) {
        val = signalRefOrValue(filter.gt);
      } else if (isFieldGTEPredicate(filter)) {
        val = signalRefOrValue(filter.gte);
      } else if (isFieldRangePredicate(filter)) {
        val = filter.range[0];
      } else if (isFieldOneOfPredicate(filter)) {
        val = (filter.oneOf ?? filter["in"])[0];
      }
      if (val) {
        if (isDateTime(val)) {
          implicit[filter.field] = "date";
        } else if (isNumber(val)) {
          implicit[filter.field] = "number";
        } else if (isString(val)) {
          implicit[filter.field] = "string";
        }
      }
      if (filter.timeUnit) {
        implicit[filter.field] = "date";
      }
    }
  });
  return implicit;
}
function getImplicitFromEncoding(model) {
  const implicit = {};
  function add2(fieldDef) {
    if (isFieldOrDatumDefForTimeFormat(fieldDef)) {
      implicit[fieldDef.field] = "date";
    } else if (fieldDef.type === "quantitative" && isMinMaxOp(fieldDef.aggregate)) {
      implicit[fieldDef.field] = "number";
    } else if (accessPathDepth(fieldDef.field) > 1) {
      if (!(fieldDef.field in implicit)) {
        implicit[fieldDef.field] = "flatten";
      }
    } else if (isScaleFieldDef(fieldDef) && isSortField(fieldDef.sort) && accessPathDepth(fieldDef.sort.field) > 1) {
      if (!(fieldDef.sort.field in implicit)) {
        implicit[fieldDef.sort.field] = "flatten";
      }
    }
  }
  if (isUnitModel(model) || isFacetModel(model)) {
    model.forEachFieldDef((fieldDef, channel) => {
      if (isTypedFieldDef(fieldDef)) {
        add2(fieldDef);
      } else {
        const mainChannel = getMainRangeChannel(channel);
        const mainFieldDef = model.fieldDef(mainChannel);
        add2({
          ...fieldDef,
          type: mainFieldDef.type
        });
      }
    });
  }
  if (isUnitModel(model)) {
    const { mark, markDef, encoding } = model;
    if (isPathMark(mark) && // No need to sort by dimension if we have a connected scatterplot (order channel is present)
    !model.encoding.order) {
      const dimensionChannel = markDef.orient === "horizontal" ? "y" : "x";
      const dimensionChannelDef = encoding[dimensionChannel];
      if (isFieldDef(dimensionChannelDef) && dimensionChannelDef.type === "quantitative" && !(dimensionChannelDef.field in implicit)) {
        implicit[dimensionChannelDef.field] = "number";
      }
    }
  }
  return implicit;
}
function getImplicitFromSelection(model) {
  const implicit = {};
  if (isUnitModel(model) && model.component.selection) {
    for (const name2 of keys(model.component.selection)) {
      const selCmpt = model.component.selection[name2];
      for (const proj of selCmpt.project.items) {
        if (!proj.channel && accessPathDepth(proj.field) > 1) {
          implicit[proj.field] = "flatten";
        }
      }
    }
  }
  return implicit;
}
class ParseNode extends DataFlowNode {
  clone() {
    return new ParseNode(null, duplicate(this._parse));
  }
  constructor(parent, parse) {
    super(parent);
    this._parse = parse;
  }
  hash() {
    return `Parse ${hash(this._parse)}`;
  }
  /**
   * Creates a parse node from a data.format.parse and updates ancestorParse.
   */
  static makeExplicit(parent, model, ancestorParse) {
    var _a2;
    let explicit = {};
    const data = model.data;
    if (!isGenerator(data) && ((_a2 = data == null ? void 0 : data.format) == null ? void 0 : _a2.parse)) {
      explicit = data.format.parse;
    }
    return this.makeWithAncestors(parent, explicit, {}, ancestorParse);
  }
  /**
   * Creates a parse node from "explicit" parse and "implicit" parse and updates ancestorParse.
   */
  static makeWithAncestors(parent, explicit, implicit, ancestorParse) {
    for (const field of keys(implicit)) {
      const parsedAs = ancestorParse.getWithExplicit(field);
      if (parsedAs.value !== void 0) {
        if (parsedAs.explicit || parsedAs.value === implicit[field] || parsedAs.value === "derived" || implicit[field] === "flatten") {
          delete implicit[field];
        } else {
          warn(differentParse(field, implicit[field], parsedAs.value));
        }
      }
    }
    for (const field of keys(explicit)) {
      const parsedAs = ancestorParse.get(field);
      if (parsedAs !== void 0) {
        if (parsedAs === explicit[field]) {
          delete explicit[field];
        } else {
          warn(differentParse(field, explicit[field], parsedAs));
        }
      }
    }
    const parse = new Split(explicit, implicit);
    ancestorParse.copyAll(parse);
    const p = {};
    for (const key of keys(parse.combine())) {
      const val = parse.get(key);
      if (val !== null) {
        p[key] = val;
      }
    }
    if (keys(p).length === 0 || ancestorParse.parseNothing) {
      return null;
    }
    return new ParseNode(parent, p);
  }
  get parse() {
    return this._parse;
  }
  merge(other) {
    this._parse = { ...this._parse, ...other.parse };
    other.remove();
  }
  /**
   * Assemble an object for Vega's format.parse property.
   */
  assembleFormatParse() {
    const formatParse = {};
    for (const field of keys(this._parse)) {
      const p = this._parse[field];
      if (accessPathDepth(field) === 1) {
        formatParse[field] = p;
      }
    }
    return formatParse;
  }
  // format parse depends and produces all fields in its parse
  producedFields() {
    return new Set(keys(this._parse));
  }
  dependentFields() {
    return new Set(keys(this._parse));
  }
  assembleTransforms(onlyNested = false) {
    return keys(this._parse).filter((field) => onlyNested ? accessPathDepth(field) > 1 : true).map((field) => {
      const expr = parseExpression(field, this._parse[field]);
      if (!expr) {
        return null;
      }
      const formula = {
        type: "formula",
        expr,
        as: removePathFromField(field)
        // Vega output is always flattened
      };
      return formula;
    }).filter((t2) => t2 !== null);
  }
}
class IdentifierNode extends DataFlowNode {
  clone() {
    return new IdentifierNode(null);
  }
  constructor(parent) {
    super(parent);
  }
  dependentFields() {
    return /* @__PURE__ */ new Set();
  }
  producedFields() {
    return /* @__PURE__ */ new Set([SELECTION_ID]);
  }
  hash() {
    return "Identifier";
  }
  assemble() {
    return { type: "identifier", as: SELECTION_ID };
  }
}
class GraticuleNode extends DataFlowNode {
  clone() {
    return new GraticuleNode(null, this.params);
  }
  constructor(parent, params) {
    super(parent);
    this.params = params;
  }
  dependentFields() {
    return /* @__PURE__ */ new Set();
  }
  producedFields() {
    return void 0;
  }
  hash() {
    return `Graticule ${hash(this.params)}`;
  }
  assemble() {
    return {
      type: "graticule",
      ...this.params === true ? {} : this.params
    };
  }
}
class SequenceNode extends DataFlowNode {
  clone() {
    return new SequenceNode(null, this.params);
  }
  constructor(parent, params) {
    super(parent);
    this.params = params;
  }
  dependentFields() {
    return /* @__PURE__ */ new Set();
  }
  producedFields() {
    return /* @__PURE__ */ new Set([this.params.as ?? "data"]);
  }
  hash() {
    return `Hash ${hash(this.params)}`;
  }
  assemble() {
    return {
      type: "sequence",
      ...this.params
    };
  }
}
class SourceNode extends DataFlowNode {
  constructor(data) {
    super(null);
    data ?? (data = { name: "source" });
    let format;
    if (!isGenerator(data)) {
      format = data.format ? { ...omit(data.format, ["parse"]) } : {};
    }
    if (isInlineData(data)) {
      this._data = { values: data.values };
    } else if (isUrlData(data)) {
      this._data = { url: data.url };
      if (!format.type) {
        let defaultExtension = /(?:\.([^.]+))?$/.exec(data.url)[1];
        if (!contains(["json", "csv", "tsv", "dsv", "topojson"], defaultExtension)) {
          defaultExtension = "json";
        }
        format.type = defaultExtension;
      }
    } else if (isSphereGenerator(data)) {
      this._data = { values: [{ type: "Sphere" }] };
    } else if (isNamedData(data) || isGenerator(data)) {
      this._data = {};
    }
    this._generator = isGenerator(data);
    if (data.name) {
      this._name = data.name;
    }
    if (format && !isEmpty(format)) {
      this._data.format = format;
    }
  }
  dependentFields() {
    return /* @__PURE__ */ new Set();
  }
  producedFields() {
    return void 0;
  }
  get data() {
    return this._data;
  }
  hasName() {
    return !!this._name;
  }
  get isGenerator() {
    return this._generator;
  }
  get dataName() {
    return this._name;
  }
  set dataName(name2) {
    this._name = name2;
  }
  set parent(parent) {
    throw new Error("Source nodes have to be roots.");
  }
  remove() {
    throw new Error("Source nodes are roots and cannot be removed.");
  }
  hash() {
    throw new Error("Cannot hash sources");
  }
  assemble() {
    return {
      name: this._name,
      ...this._data,
      transform: []
    };
  }
}
var __classPrivateFieldSet = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Optimizer_modified;
function isDataSourceNode(node) {
  return node instanceof SourceNode || node instanceof GraticuleNode || node instanceof SequenceNode;
}
class Optimizer {
  constructor() {
    _Optimizer_modified.set(this, void 0);
    __classPrivateFieldSet(this, _Optimizer_modified, false, "f");
  }
  // Once true, #modified is never set to false
  setModified() {
    __classPrivateFieldSet(this, _Optimizer_modified, true, "f");
  }
  get modifiedFlag() {
    return __classPrivateFieldGet(this, _Optimizer_modified, "f");
  }
}
_Optimizer_modified = /* @__PURE__ */ new WeakMap();
class BottomUpOptimizer extends Optimizer {
  /**
   * Compute a map of node depths that we can use to determine a topological sort order.
   */
  getNodeDepths(node, depth, depths) {
    depths.set(node, depth);
    for (const child of node.children) {
      this.getNodeDepths(child, depth + 1, depths);
    }
    return depths;
  }
  /**
   * Run the optimizer on all nodes starting from the leaves.
   */
  optimize(node) {
    const depths = this.getNodeDepths(node, 0, /* @__PURE__ */ new Map());
    const topologicalSort = [...depths.entries()].sort((a, b) => b[1] - a[1]);
    for (const tuple of topologicalSort) {
      this.run(tuple[0]);
    }
    return this.modifiedFlag;
  }
}
class TopDownOptimizer extends Optimizer {
  /**
   * Run the optimizer depth first on all nodes starting from the roots.
   */
  optimize(node) {
    this.run(node);
    for (const child of node.children) {
      this.optimize(child);
    }
    return this.modifiedFlag;
  }
}
class MergeIdenticalNodes extends TopDownOptimizer {
  mergeNodes(parent, nodes) {
    const mergedNode = nodes.shift();
    for (const node of nodes) {
      parent.removeChild(node);
      node.parent = mergedNode;
      node.remove();
    }
  }
  run(node) {
    const hashes = node.children.map((x) => x.hash());
    const buckets = {};
    for (let i = 0; i < hashes.length; i++) {
      if (buckets[hashes[i]] === void 0) {
        buckets[hashes[i]] = [node.children[i]];
      } else {
        buckets[hashes[i]].push(node.children[i]);
      }
    }
    for (const k of keys(buckets)) {
      if (buckets[k].length > 1) {
        this.setModified();
        this.mergeNodes(node, buckets[k]);
      }
    }
  }
}
class RemoveUnnecessaryIdentifierNodes extends TopDownOptimizer {
  constructor(model) {
    super();
    this.requiresSelectionId = model && requiresSelectionId(model);
  }
  run(node) {
    if (node instanceof IdentifierNode) {
      if (!(this.requiresSelectionId && (isDataSourceNode(node.parent) || node.parent instanceof AggregateNode || node.parent instanceof ParseNode))) {
        this.setModified();
        node.remove();
      }
    }
  }
}
class RemoveDuplicateTimeUnits extends Optimizer {
  optimize(node) {
    this.run(node, /* @__PURE__ */ new Set());
    return this.modifiedFlag;
  }
  run(node, timeUnitFields) {
    let producedFields = /* @__PURE__ */ new Set();
    if (node instanceof TimeUnitNode) {
      producedFields = node.producedFields();
      if (hasIntersection(producedFields, timeUnitFields)) {
        this.setModified();
        node.removeFormulas(timeUnitFields);
        if (node.producedFields.length === 0) {
          node.remove();
        }
      }
    }
    for (const child of node.children) {
      this.run(child, /* @__PURE__ */ new Set([...timeUnitFields, ...producedFields]));
    }
  }
}
class RemoveUnnecessaryOutputNodes extends TopDownOptimizer {
  constructor() {
    super();
  }
  run(node) {
    if (node instanceof OutputNode && !node.isRequired()) {
      this.setModified();
      node.remove();
    }
  }
}
class MoveParseUp extends BottomUpOptimizer {
  run(node) {
    if (isDataSourceNode(node)) {
      return;
    }
    if (node.numChildren() > 1) {
      return;
    }
    for (const child of node.children) {
      if (child instanceof ParseNode) {
        if (node instanceof ParseNode) {
          this.setModified();
          node.merge(child);
        } else {
          if (fieldIntersection(node.producedFields(), child.dependentFields())) {
            continue;
          }
          this.setModified();
          child.swapWithParent();
        }
      }
    }
    return;
  }
}
class MergeParse extends BottomUpOptimizer {
  run(node) {
    const originalChildren = [...node.children];
    const parseChildren = node.children.filter((child) => child instanceof ParseNode);
    if (node.numChildren() > 1 && parseChildren.length >= 1) {
      const commonParse = {};
      const conflictingParse = /* @__PURE__ */ new Set();
      for (const parseNode of parseChildren) {
        const parse = parseNode.parse;
        for (const k of keys(parse)) {
          if (!(k in commonParse)) {
            commonParse[k] = parse[k];
          } else if (commonParse[k] !== parse[k]) {
            conflictingParse.add(k);
          }
        }
      }
      for (const field of conflictingParse) {
        delete commonParse[field];
      }
      if (!isEmpty(commonParse)) {
        this.setModified();
        const mergedParseNode = new ParseNode(node, commonParse);
        for (const childNode of originalChildren) {
          if (childNode instanceof ParseNode) {
            for (const key of keys(commonParse)) {
              delete childNode.parse[key];
            }
          }
          node.removeChild(childNode);
          childNode.parent = mergedParseNode;
          if (childNode instanceof ParseNode && keys(childNode.parse).length === 0) {
            childNode.remove();
          }
        }
      }
    }
  }
}
class RemoveUnusedSubtrees extends BottomUpOptimizer {
  run(node) {
    if (node instanceof OutputNode || node.numChildren() > 0 || node instanceof FacetNode)
      ;
    else if (node instanceof SourceNode)
      ;
    else {
      this.setModified();
      node.remove();
    }
  }
}
class MergeTimeUnits extends BottomUpOptimizer {
  run(node) {
    const timeUnitChildren = node.children.filter((x) => x instanceof TimeUnitNode);
    const combination = timeUnitChildren.pop();
    for (const timeUnit of timeUnitChildren) {
      this.setModified();
      combination.merge(timeUnit);
    }
  }
}
class MergeAggregates extends BottomUpOptimizer {
  run(node) {
    const aggChildren = node.children.filter((child) => child instanceof AggregateNode);
    const groupedAggregates = {};
    for (const agg of aggChildren) {
      const groupBys = hash(agg.groupBy);
      if (!(groupBys in groupedAggregates)) {
        groupedAggregates[groupBys] = [];
      }
      groupedAggregates[groupBys].push(agg);
    }
    for (const group of keys(groupedAggregates)) {
      const mergeableAggs = groupedAggregates[group];
      if (mergeableAggs.length > 1) {
        const mergedAggs = mergeableAggs.pop();
        for (const agg of mergeableAggs) {
          if (mergedAggs.merge(agg)) {
            node.removeChild(agg);
            agg.parent = mergedAggs;
            agg.remove();
            this.setModified();
          }
        }
      }
    }
  }
}
class MergeBins extends BottomUpOptimizer {
  constructor(model) {
    super();
    this.model = model;
  }
  run(node) {
    const moveBinsUp = !(isDataSourceNode(node) || node instanceof FilterNode || node instanceof ParseNode || node instanceof IdentifierNode);
    const promotableBins = [];
    const remainingBins = [];
    for (const child of node.children) {
      if (child instanceof BinNode) {
        if (moveBinsUp && !fieldIntersection(node.producedFields(), child.dependentFields())) {
          promotableBins.push(child);
        } else {
          remainingBins.push(child);
        }
      }
    }
    if (promotableBins.length > 0) {
      const promotedBin = promotableBins.pop();
      for (const bin2 of promotableBins) {
        promotedBin.merge(bin2, this.model.renameSignal.bind(this.model));
      }
      this.setModified();
      if (node instanceof BinNode) {
        node.merge(promotedBin, this.model.renameSignal.bind(this.model));
      } else {
        promotedBin.swapWithParent();
      }
    }
    if (remainingBins.length > 1) {
      const remainingBin = remainingBins.pop();
      for (const bin2 of remainingBins) {
        remainingBin.merge(bin2, this.model.renameSignal.bind(this.model));
      }
      this.setModified();
    }
  }
}
class MergeOutputs extends BottomUpOptimizer {
  run(node) {
    const children2 = [...node.children];
    const hasOutputChild = some(children2, (child) => child instanceof OutputNode);
    if (!hasOutputChild || node.numChildren() <= 1) {
      return;
    }
    const otherChildren = [];
    let mainOutput;
    for (const child of children2) {
      if (child instanceof OutputNode) {
        let lastOutput = child;
        while (lastOutput.numChildren() === 1) {
          const [theChild] = lastOutput.children;
          if (theChild instanceof OutputNode) {
            lastOutput = theChild;
          } else {
            break;
          }
        }
        otherChildren.push(...lastOutput.children);
        if (mainOutput) {
          node.removeChild(child);
          child.parent = mainOutput.parent;
          mainOutput.parent.removeChild(mainOutput);
          mainOutput.parent = lastOutput;
          this.setModified();
        } else {
          mainOutput = lastOutput;
        }
      } else {
        otherChildren.push(child);
      }
    }
    if (otherChildren.length) {
      this.setModified();
      for (const child of otherChildren) {
        child.parent.removeChild(child);
        child.parent = mainOutput;
      }
    }
  }
}
class JoinAggregateTransformNode extends DataFlowNode {
  clone() {
    return new JoinAggregateTransformNode(null, duplicate(this.transform));
  }
  constructor(parent, transform) {
    super(parent);
    this.transform = transform;
  }
  addDimensions(fields) {
    this.transform.groupby = unique(this.transform.groupby.concat(fields), (d) => d);
  }
  dependentFields() {
    const out = /* @__PURE__ */ new Set();
    if (this.transform.groupby) {
      this.transform.groupby.forEach(out.add, out);
    }
    this.transform.joinaggregate.map((w2) => w2.field).filter((f) => f !== void 0).forEach(out.add, out);
    return out;
  }
  producedFields() {
    return new Set(this.transform.joinaggregate.map(this.getDefaultName));
  }
  getDefaultName(joinAggregateFieldDef) {
    return joinAggregateFieldDef.as ?? vgField(joinAggregateFieldDef);
  }
  hash() {
    return `JoinAggregateTransform ${hash(this.transform)}`;
  }
  assemble() {
    const fields = [];
    const ops = [];
    const as = [];
    for (const joinaggregate of this.transform.joinaggregate) {
      ops.push(joinaggregate.op);
      as.push(this.getDefaultName(joinaggregate));
      fields.push(joinaggregate.field === void 0 ? null : joinaggregate.field);
    }
    const groupby = this.transform.groupby;
    return {
      type: "joinaggregate",
      as,
      ops,
      fields,
      ...groupby !== void 0 ? { groupby } : {}
    };
  }
}
function getStackByFields(model) {
  return model.stack.stackBy.reduce((fields, by) => {
    const fieldDef = by.fieldDef;
    const _field = vgField(fieldDef);
    if (_field) {
      fields.push(_field);
    }
    return fields;
  }, []);
}
function isValidAsArray(as) {
  return isArray(as) && as.every((s) => isString(s)) && as.length > 1;
}
class StackNode extends DataFlowNode {
  clone() {
    return new StackNode(null, duplicate(this._stack));
  }
  constructor(parent, stack2) {
    super(parent);
    this._stack = stack2;
  }
  static makeFromTransform(parent, stackTransform) {
    const { stack: stack2, groupby, as, offset = "zero" } = stackTransform;
    const sortFields = [];
    const sortOrder = [];
    if (stackTransform.sort !== void 0) {
      for (const sortField of stackTransform.sort) {
        sortFields.push(sortField.field);
        sortOrder.push(getFirstDefined(sortField.order, "ascending"));
      }
    }
    const sort = {
      field: sortFields,
      order: sortOrder
    };
    let normalizedAs;
    if (isValidAsArray(as)) {
      normalizedAs = as;
    } else if (isString(as)) {
      normalizedAs = [as, `${as}_end`];
    } else {
      normalizedAs = [`${stackTransform.stack}_start`, `${stackTransform.stack}_end`];
    }
    return new StackNode(parent, {
      dimensionFieldDefs: [],
      stackField: stack2,
      groupby,
      offset,
      sort,
      facetby: [],
      as: normalizedAs
    });
  }
  static makeFromEncoding(parent, model) {
    const stackProperties = model.stack;
    const { encoding } = model;
    if (!stackProperties) {
      return null;
    }
    const { groupbyChannels, fieldChannel, offset, impute } = stackProperties;
    const dimensionFieldDefs = groupbyChannels.map((groupbyChannel) => {
      const cDef = encoding[groupbyChannel];
      return getFieldDef(cDef);
    }).filter((def) => !!def);
    const stackby = getStackByFields(model);
    const orderDef = model.encoding.order;
    let sort;
    if (isArray(orderDef) || isFieldDef(orderDef)) {
      sort = sortParams(orderDef);
    } else {
      const sortOrder = isOrderOnlyDef(orderDef) ? orderDef.sort : fieldChannel === "y" ? "descending" : "ascending";
      sort = stackby.reduce((s, field) => {
        s.field.push(field);
        s.order.push(sortOrder);
        return s;
      }, { field: [], order: [] });
    }
    return new StackNode(parent, {
      dimensionFieldDefs,
      stackField: model.vgField(fieldChannel),
      facetby: [],
      stackby,
      sort,
      offset,
      impute,
      as: [
        model.vgField(fieldChannel, { suffix: "start", forAs: true }),
        model.vgField(fieldChannel, { suffix: "end", forAs: true })
      ]
    });
  }
  get stack() {
    return this._stack;
  }
  addDimensions(fields) {
    this._stack.facetby.push(...fields);
  }
  dependentFields() {
    const out = /* @__PURE__ */ new Set();
    out.add(this._stack.stackField);
    this.getGroupbyFields().forEach(out.add, out);
    this._stack.facetby.forEach(out.add, out);
    this._stack.sort.field.forEach(out.add, out);
    return out;
  }
  producedFields() {
    return new Set(this._stack.as);
  }
  hash() {
    return `Stack ${hash(this._stack)}`;
  }
  getGroupbyFields() {
    const { dimensionFieldDefs, impute, groupby } = this._stack;
    if (dimensionFieldDefs.length > 0) {
      return dimensionFieldDefs.map((dimensionFieldDef) => {
        if (dimensionFieldDef.bin) {
          if (impute) {
            return [vgField(dimensionFieldDef, { binSuffix: "mid" })];
          }
          return [
            // For binned group by field without impute, we need both bin (start) and bin_end
            vgField(dimensionFieldDef, {}),
            vgField(dimensionFieldDef, { binSuffix: "end" })
          ];
        }
        return [vgField(dimensionFieldDef)];
      }).flat();
    }
    return groupby ?? [];
  }
  assemble() {
    const transform = [];
    const { facetby, dimensionFieldDefs, stackField: field, stackby, sort, offset, impute, as } = this._stack;
    if (impute) {
      for (const dimensionFieldDef of dimensionFieldDefs) {
        const { bandPosition = 0.5, bin: bin2 } = dimensionFieldDef;
        if (bin2) {
          const binStart = vgField(dimensionFieldDef, { expr: "datum" });
          const binEnd = vgField(dimensionFieldDef, { expr: "datum", binSuffix: "end" });
          transform.push({
            type: "formula",
            expr: `${bandPosition}*${binStart}+${1 - bandPosition}*${binEnd}`,
            as: vgField(dimensionFieldDef, { binSuffix: "mid", forAs: true })
          });
        }
        transform.push({
          type: "impute",
          field,
          groupby: [...stackby, ...facetby],
          key: vgField(dimensionFieldDef, { binSuffix: "mid" }),
          method: "value",
          value: 0
        });
      }
    }
    transform.push({
      type: "stack",
      groupby: [...this.getGroupbyFields(), ...facetby],
      field,
      sort,
      as,
      offset
    });
    return transform;
  }
}
class WindowTransformNode extends DataFlowNode {
  clone() {
    return new WindowTransformNode(null, duplicate(this.transform));
  }
  constructor(parent, transform) {
    super(parent);
    this.transform = transform;
  }
  addDimensions(fields) {
    this.transform.groupby = unique(this.transform.groupby.concat(fields), (d) => d);
  }
  dependentFields() {
    const out = /* @__PURE__ */ new Set();
    (this.transform.groupby ?? []).forEach(out.add, out);
    (this.transform.sort ?? []).forEach((m) => out.add(m.field));
    this.transform.window.map((w2) => w2.field).filter((f) => f !== void 0).forEach(out.add, out);
    return out;
  }
  producedFields() {
    return new Set(this.transform.window.map(this.getDefaultName));
  }
  getDefaultName(windowFieldDef) {
    return windowFieldDef.as ?? vgField(windowFieldDef);
  }
  hash() {
    return `WindowTransform ${hash(this.transform)}`;
  }
  assemble() {
    const fields = [];
    const ops = [];
    const as = [];
    const params = [];
    for (const window2 of this.transform.window) {
      ops.push(window2.op);
      as.push(this.getDefaultName(window2));
      params.push(window2.param === void 0 ? null : window2.param);
      fields.push(window2.field === void 0 ? null : window2.field);
    }
    const frame = this.transform.frame;
    const groupby = this.transform.groupby;
    if (frame && frame[0] === null && frame[1] === null && ops.every((o) => isAggregateOp(o))) {
      return {
        type: "joinaggregate",
        as,
        ops,
        fields,
        ...groupby !== void 0 ? { groupby } : {}
      };
    }
    const sortFields = [];
    const sortOrder = [];
    if (this.transform.sort !== void 0) {
      for (const sortField of this.transform.sort) {
        sortFields.push(sortField.field);
        sortOrder.push(sortField.order ?? "ascending");
      }
    }
    const sort = {
      field: sortFields,
      order: sortOrder
    };
    const ignorePeers = this.transform.ignorePeers;
    return {
      type: "window",
      params,
      as,
      ops,
      fields,
      sort,
      ...ignorePeers !== void 0 ? { ignorePeers } : {},
      ...groupby !== void 0 ? { groupby } : {},
      ...frame !== void 0 ? { frame } : {}
    };
  }
}
function cloneSubtree(facet) {
  function clone2(node) {
    if (!(node instanceof FacetNode)) {
      const copy = node.clone();
      if (copy instanceof OutputNode) {
        const newName = FACET_SCALE_PREFIX + copy.getSource();
        copy.setSource(newName);
        facet.model.component.data.outputNodes[newName] = copy;
      } else if (copy instanceof AggregateNode || copy instanceof StackNode || copy instanceof WindowTransformNode || copy instanceof JoinAggregateTransformNode) {
        copy.addDimensions(facet.fields);
      }
      for (const n of node.children.flatMap(clone2)) {
        n.parent = copy;
      }
      return [copy];
    }
    return node.children.flatMap(clone2);
  }
  return clone2;
}
function moveFacetDown(node) {
  if (node instanceof FacetNode) {
    if (node.numChildren() === 1 && !(node.children[0] instanceof OutputNode)) {
      const child = node.children[0];
      if (child instanceof AggregateNode || child instanceof StackNode || child instanceof WindowTransformNode || child instanceof JoinAggregateTransformNode) {
        child.addDimensions(node.fields);
      }
      child.swapWithParent();
      moveFacetDown(node);
    } else {
      const facetMain = node.model.component.data.main;
      moveMainDownToFacet(facetMain);
      const cloner = cloneSubtree(node);
      const copy = node.children.map(cloner).flat();
      for (const c of copy) {
        c.parent = facetMain;
      }
    }
  } else {
    node.children.map(moveFacetDown);
  }
}
function moveMainDownToFacet(node) {
  if (node instanceof OutputNode && node.type === DataSourceType.Main) {
    if (node.numChildren() === 1) {
      const child = node.children[0];
      if (!(child instanceof FacetNode)) {
        child.swapWithParent();
        moveMainDownToFacet(node);
      }
    }
  }
}
const FACET_SCALE_PREFIX = "scale_";
const MAX_OPTIMIZATION_RUNS = 5;
function checkLinks(nodes) {
  for (const node of nodes) {
    for (const child of node.children) {
      if (child.parent !== node) {
        return false;
      }
    }
    if (!checkLinks(node.children)) {
      return false;
    }
  }
  return true;
}
function runOptimizer(optimizer, nodes) {
  let modified = false;
  for (const node of nodes) {
    modified = optimizer.optimize(node) || modified;
  }
  return modified;
}
function optimizationDataflowHelper(dataComponent, model, firstPass) {
  let roots = dataComponent.sources;
  let modified = false;
  modified = runOptimizer(new RemoveUnnecessaryOutputNodes(), roots) || modified;
  modified = runOptimizer(new RemoveUnnecessaryIdentifierNodes(model), roots) || modified;
  roots = roots.filter((r) => r.numChildren() > 0);
  modified = runOptimizer(new RemoveUnusedSubtrees(), roots) || modified;
  roots = roots.filter((r) => r.numChildren() > 0);
  if (!firstPass) {
    modified = runOptimizer(new MoveParseUp(), roots) || modified;
    modified = runOptimizer(new MergeBins(model), roots) || modified;
    modified = runOptimizer(new RemoveDuplicateTimeUnits(), roots) || modified;
    modified = runOptimizer(new MergeParse(), roots) || modified;
    modified = runOptimizer(new MergeAggregates(), roots) || modified;
    modified = runOptimizer(new MergeTimeUnits(), roots) || modified;
    modified = runOptimizer(new MergeIdenticalNodes(), roots) || modified;
    modified = runOptimizer(new MergeOutputs(), roots) || modified;
  }
  dataComponent.sources = roots;
  return modified;
}
function optimizeDataflow(data, model) {
  checkLinks(data.sources);
  let firstPassCounter = 0;
  let secondPassCounter = 0;
  for (let i = 0; i < MAX_OPTIMIZATION_RUNS; i++) {
    if (!optimizationDataflowHelper(data, model, true)) {
      break;
    }
    firstPassCounter++;
  }
  data.sources.map(moveFacetDown);
  for (let i = 0; i < MAX_OPTIMIZATION_RUNS; i++) {
    if (!optimizationDataflowHelper(data, model, false)) {
      break;
    }
    secondPassCounter++;
  }
  checkLinks(data.sources);
  if (Math.max(firstPassCounter, secondPassCounter) === MAX_OPTIMIZATION_RUNS) {
    warn(`Maximum optimization runs(${MAX_OPTIMIZATION_RUNS}) reached.`);
  }
}
class SignalRefWrapper {
  constructor(exprGenerator) {
    Object.defineProperty(this, "signal", {
      enumerable: true,
      get: exprGenerator
    });
  }
  static fromName(rename, signalName) {
    return new SignalRefWrapper(() => rename(signalName));
  }
}
function parseScaleDomain(model) {
  if (isUnitModel(model)) {
    parseUnitScaleDomain(model);
  } else {
    parseNonUnitScaleDomain(model);
  }
}
function parseUnitScaleDomain(model) {
  const localScaleComponents = model.component.scales;
  for (const channel of keys(localScaleComponents)) {
    const domains = parseDomainForChannel(model, channel);
    const localScaleCmpt = localScaleComponents[channel];
    localScaleCmpt.setWithExplicit("domains", domains);
    parseSelectionDomain(model, channel);
    if (model.component.data.isFaceted) {
      let facetParent = model;
      while (!isFacetModel(facetParent) && facetParent.parent) {
        facetParent = facetParent.parent;
      }
      const resolve = facetParent.component.resolve.scale[channel];
      if (resolve === "shared") {
        for (const domain2 of domains.value) {
          if (isDataRefDomain(domain2)) {
            domain2.data = FACET_SCALE_PREFIX + domain2.data.replace(FACET_SCALE_PREFIX, "");
          }
        }
      }
    }
  }
}
function parseNonUnitScaleDomain(model) {
  for (const child of model.children) {
    parseScaleDomain(child);
  }
  const localScaleComponents = model.component.scales;
  for (const channel of keys(localScaleComponents)) {
    let domains;
    let selectionExtent = null;
    for (const child of model.children) {
      const childComponent = child.component.scales[channel];
      if (childComponent) {
        if (domains === void 0) {
          domains = childComponent.getWithExplicit("domains");
        } else {
          domains = mergeValuesWithExplicit(domains, childComponent.getWithExplicit("domains"), "domains", "scale", domainsTieBreaker);
        }
        const se = childComponent.get("selectionExtent");
        if (selectionExtent && se && selectionExtent.param !== se.param) {
          warn(NEEDS_SAME_SELECTION);
        }
        selectionExtent = se;
      }
    }
    localScaleComponents[channel].setWithExplicit("domains", domains);
    if (selectionExtent) {
      localScaleComponents[channel].set("selectionExtent", selectionExtent, true);
    }
  }
}
function normalizeUnaggregatedDomain(domain2, fieldDef, scaleType2, scaleConfig) {
  if (domain2 === "unaggregated") {
    const { valid, reason } = canUseUnaggregatedDomain(fieldDef, scaleType2);
    if (!valid) {
      warn(reason);
      return void 0;
    }
  } else if (domain2 === void 0 && scaleConfig.useUnaggregatedDomain) {
    const { valid } = canUseUnaggregatedDomain(fieldDef, scaleType2);
    if (valid) {
      return "unaggregated";
    }
  }
  return domain2;
}
function parseDomainForChannel(model, channel) {
  const scaleType2 = model.getScaleComponent(channel).get("type");
  const { encoding } = model;
  const domain2 = normalizeUnaggregatedDomain(model.scaleDomain(channel), model.typedFieldDef(channel), scaleType2, model.config.scale);
  if (domain2 !== model.scaleDomain(channel)) {
    model.specifiedScales[channel] = {
      ...model.specifiedScales[channel],
      domain: domain2
    };
  }
  if (channel === "x" && getFieldOrDatumDef(encoding.x2)) {
    if (getFieldOrDatumDef(encoding.x)) {
      return mergeValuesWithExplicit(parseSingleChannelDomain(scaleType2, domain2, model, "x"), parseSingleChannelDomain(scaleType2, domain2, model, "x2"), "domain", "scale", domainsTieBreaker);
    } else {
      return parseSingleChannelDomain(scaleType2, domain2, model, "x2");
    }
  } else if (channel === "y" && getFieldOrDatumDef(encoding.y2)) {
    if (getFieldOrDatumDef(encoding.y)) {
      return mergeValuesWithExplicit(parseSingleChannelDomain(scaleType2, domain2, model, "y"), parseSingleChannelDomain(scaleType2, domain2, model, "y2"), "domain", "scale", domainsTieBreaker);
    } else {
      return parseSingleChannelDomain(scaleType2, domain2, model, "y2");
    }
  }
  return parseSingleChannelDomain(scaleType2, domain2, model, channel);
}
function mapDomainToDataSignal(domain2, type2, timeUnit) {
  return domain2.map((v) => {
    const data = valueExpr(v, { timeUnit, type: type2 });
    return { signal: `{data: ${data}}` };
  });
}
function convertDomainIfItIsDateTime(domain2, type2, timeUnit) {
  var _a2;
  const normalizedTimeUnit = (_a2 = normalizeTimeUnit(timeUnit)) == null ? void 0 : _a2.unit;
  if (type2 === "temporal" || normalizedTimeUnit) {
    return mapDomainToDataSignal(domain2, type2, normalizedTimeUnit);
  }
  return [domain2];
}
function parseSingleChannelDomain(scaleType2, domain2, model, channel) {
  const { encoding } = model;
  const fieldOrDatumDef = getFieldOrDatumDef(encoding[channel]);
  const { type: type2 } = fieldOrDatumDef;
  const timeUnit = fieldOrDatumDef["timeUnit"];
  if (isDomainUnionWith(domain2)) {
    const defaultDomain = parseSingleChannelDomain(scaleType2, void 0, model, channel);
    const unionWith = convertDomainIfItIsDateTime(domain2.unionWith, type2, timeUnit);
    return makeExplicit([...unionWith, ...defaultDomain.value]);
  } else if (isSignalRef(domain2)) {
    return makeExplicit([domain2]);
  } else if (domain2 && domain2 !== "unaggregated" && !isParameterDomain(domain2)) {
    return makeExplicit(convertDomainIfItIsDateTime(domain2, type2, timeUnit));
  }
  const stack2 = model.stack;
  if (stack2 && channel === stack2.fieldChannel) {
    if (stack2.offset === "normalize") {
      return makeImplicit([[0, 1]]);
    }
    const data = model.requestDataName(DataSourceType.Main);
    return makeImplicit([
      {
        data,
        field: model.vgField(channel, { suffix: "start" })
      },
      {
        data,
        field: model.vgField(channel, { suffix: "end" })
      }
    ]);
  }
  const sort = isScaleChannel(channel) && isFieldDef(fieldOrDatumDef) ? domainSort(model, channel, scaleType2) : void 0;
  if (isDatumDef(fieldOrDatumDef)) {
    const d = convertDomainIfItIsDateTime([fieldOrDatumDef.datum], type2, timeUnit);
    return makeImplicit(d);
  }
  const fieldDef = fieldOrDatumDef;
  if (domain2 === "unaggregated") {
    const data = model.requestDataName(DataSourceType.Main);
    const { field } = fieldOrDatumDef;
    return makeImplicit([
      {
        data,
        field: vgField({ field, aggregate: "min" })
      },
      {
        data,
        field: vgField({ field, aggregate: "max" })
      }
    ]);
  } else if (isBinning(fieldDef.bin)) {
    if (hasDiscreteDomain(scaleType2)) {
      if (scaleType2 === "bin-ordinal") {
        return makeImplicit([]);
      }
      return makeImplicit([
        {
          // If sort by aggregation of a specified sort field, we need to use RAW table,
          // so we can aggregate values for the scale independently from the main aggregation.
          data: isBoolean(sort) ? model.requestDataName(DataSourceType.Main) : model.requestDataName(DataSourceType.Raw),
          // Use range if we added it and the scale does not support computing a range as a signal.
          field: model.vgField(channel, binRequiresRange(fieldDef, channel) ? { binSuffix: "range" } : {}),
          // we have to use a sort object if sort = true to make the sort correct by bin start
          sort: sort === true || !isObject(sort) ? {
            field: model.vgField(channel, {}),
            op: "min"
            // min or max doesn't matter since we sort by the start of the bin range
          } : sort
        }
      ]);
    } else {
      const { bin: bin2 } = fieldDef;
      if (isBinning(bin2)) {
        const binSignal = getBinSignalName(model, fieldDef.field, bin2);
        return makeImplicit([
          new SignalRefWrapper(() => {
            const signal = model.getSignalName(binSignal);
            return `[${signal}.start, ${signal}.stop]`;
          })
        ]);
      } else {
        return makeImplicit([
          {
            data: model.requestDataName(DataSourceType.Main),
            field: model.vgField(channel, {})
          }
        ]);
      }
    }
  } else if (fieldDef.timeUnit && contains(["time", "utc"], scaleType2) && hasBandEnd(fieldDef, isUnitModel(model) ? model.encoding[getSecondaryRangeChannel(channel)] : void 0, model.markDef, model.config)) {
    const data = model.requestDataName(DataSourceType.Main);
    return makeImplicit([
      {
        data,
        field: model.vgField(channel)
      },
      {
        data,
        field: model.vgField(channel, { suffix: "end" })
      }
    ]);
  } else if (sort) {
    return makeImplicit([
      {
        // If sort by aggregation of a specified sort field, we need to use RAW table,
        // so we can aggregate values for the scale independently from the main aggregation.
        data: isBoolean(sort) ? model.requestDataName(DataSourceType.Main) : model.requestDataName(DataSourceType.Raw),
        field: model.vgField(channel),
        sort
      }
    ]);
  } else {
    return makeImplicit([
      {
        data: model.requestDataName(DataSourceType.Main),
        field: model.vgField(channel)
      }
    ]);
  }
}
function normalizeSortField(sort, isStackedMeasure) {
  const { op, field, order } = sort;
  return {
    // Apply default op
    op: op ?? (isStackedMeasure ? "sum" : DEFAULT_SORT_OP),
    // flatten nested fields
    ...field ? { field: replacePathInField(field) } : {},
    ...order ? { order } : {}
  };
}
function parseSelectionDomain(model, channel) {
  var _a2;
  const scale = model.component.scales[channel];
  const spec = model.specifiedScales[channel].domain;
  const bin2 = (_a2 = model.fieldDef(channel)) == null ? void 0 : _a2.bin;
  const domain2 = isParameterDomain(spec) && spec;
  const extent = isBinParams(bin2) && isParameterExtent(bin2.extent) && bin2.extent;
  if (domain2 || extent) {
    scale.set("selectionExtent", domain2 ?? extent, true);
  }
}
function domainSort(model, channel, scaleType2) {
  if (!hasDiscreteDomain(scaleType2)) {
    return void 0;
  }
  const fieldDef = model.fieldDef(channel);
  const sort = fieldDef.sort;
  if (isSortArray(sort)) {
    return {
      op: "min",
      field: sortArrayIndexField(fieldDef, channel),
      order: "ascending"
    };
  }
  const { stack: stack2 } = model;
  const stackDimensions = stack2 ? /* @__PURE__ */ new Set([...stack2.groupbyFields, ...stack2.stackBy.map((s) => s.fieldDef.field)]) : void 0;
  if (isSortField(sort)) {
    const isStackedMeasure = stack2 && !stackDimensions.has(sort.field);
    return normalizeSortField(sort, isStackedMeasure);
  } else if (isSortByEncoding(sort)) {
    const { encoding, order } = sort;
    const fieldDefToSortBy = model.fieldDef(encoding);
    const { aggregate, field } = fieldDefToSortBy;
    const isStackedMeasure = stack2 && !stackDimensions.has(field);
    if (isArgminDef(aggregate) || isArgmaxDef(aggregate)) {
      return normalizeSortField({
        field: vgField(fieldDefToSortBy),
        order
      }, isStackedMeasure);
    } else if (isAggregateOp(aggregate) || !aggregate) {
      return normalizeSortField({
        op: aggregate,
        field,
        order
      }, isStackedMeasure);
    }
  } else if (sort === "descending") {
    return {
      op: "min",
      field: model.vgField(channel),
      order: "descending"
    };
  } else if (contains([
    "ascending",
    void 0
    /* default =ascending*/
  ], sort)) {
    return true;
  }
  return void 0;
}
function canUseUnaggregatedDomain(fieldDef, scaleType2) {
  const { aggregate, type: type2 } = fieldDef;
  if (!aggregate) {
    return {
      valid: false,
      reason: unaggregateDomainHasNoEffectForRawField(fieldDef)
    };
  }
  if (isString(aggregate) && !SHARED_DOMAIN_OPS.has(aggregate)) {
    return {
      valid: false,
      reason: unaggregateDomainWithNonSharedDomainOp(aggregate)
    };
  }
  if (type2 === "quantitative") {
    if (scaleType2 === "log") {
      return {
        valid: false,
        reason: unaggregatedDomainWithLogScale(fieldDef)
      };
    }
  }
  return { valid: true };
}
function domainsTieBreaker(v1, v2, property, propertyOf) {
  if (v1.explicit && v2.explicit) {
    warn(mergeConflictingDomainProperty(property, propertyOf, v1.value, v2.value));
  }
  return { explicit: v1.explicit, value: [...v1.value, ...v2.value] };
}
function mergeDomains(domains) {
  const uniqueDomains = unique(domains.map((domain2) => {
    if (isDataRefDomain(domain2)) {
      const { sort: _s, ...domainWithoutSort } = domain2;
      return domainWithoutSort;
    }
    return domain2;
  }), hash);
  const sorts = unique(domains.map((d) => {
    if (isDataRefDomain(d)) {
      const s = d.sort;
      if (s !== void 0 && !isBoolean(s)) {
        if ("op" in s && s.op === "count") {
          delete s.field;
        }
        if (s.order === "ascending") {
          delete s.order;
        }
      }
      return s;
    }
    return void 0;
  }).filter((s) => s !== void 0), hash);
  if (uniqueDomains.length === 0) {
    return void 0;
  } else if (uniqueDomains.length === 1) {
    const domain2 = domains[0];
    if (isDataRefDomain(domain2) && sorts.length > 0) {
      let sort2 = sorts[0];
      if (sorts.length > 1) {
        warn(MORE_THAN_ONE_SORT);
        const filteredSorts = sorts.filter((s) => isObject(s) && "op" in s && s.op !== "min");
        if (sorts.every((s) => isObject(s) && "op" in s) && filteredSorts.length === 1) {
          sort2 = filteredSorts[0];
        } else {
          sort2 = true;
        }
      } else {
        if (isObject(sort2) && "field" in sort2) {
          const sortField = sort2.field;
          if (domain2.field === sortField) {
            sort2 = sort2.order ? { order: sort2.order } : true;
          }
        }
      }
      return {
        ...domain2,
        sort: sort2
      };
    }
    return domain2;
  }
  const unionDomainSorts = unique(sorts.map((s) => {
    if (isBoolean(s) || !("op" in s) || isString(s.op) && s.op in MULTIDOMAIN_SORT_OP_INDEX) {
      return s;
    }
    warn(domainSortDropped(s));
    return true;
  }), hash);
  let sort;
  if (unionDomainSorts.length === 1) {
    sort = unionDomainSorts[0];
  } else if (unionDomainSorts.length > 1) {
    warn(MORE_THAN_ONE_SORT);
    sort = true;
  }
  const allData = unique(domains.map((d) => {
    if (isDataRefDomain(d)) {
      return d.data;
    }
    return null;
  }), (x) => x);
  if (allData.length === 1 && allData[0] !== null) {
    const domain2 = {
      data: allData[0],
      fields: uniqueDomains.map((d) => d.field),
      ...sort ? { sort } : {}
    };
    return domain2;
  }
  return { fields: uniqueDomains, ...sort ? { sort } : {} };
}
function getFieldFromDomain(domain2) {
  if (isDataRefDomain(domain2) && isString(domain2.field)) {
    return domain2.field;
  } else if (isDataRefUnionedDomain(domain2)) {
    let field;
    for (const nonUnionDomain of domain2.fields) {
      if (isDataRefDomain(nonUnionDomain) && isString(nonUnionDomain.field)) {
        if (!field) {
          field = nonUnionDomain.field;
        } else if (field !== nonUnionDomain.field) {
          warn(FACETED_INDEPENDENT_DIFFERENT_SOURCES);
          return field;
        }
      }
    }
    warn(FACETED_INDEPENDENT_SAME_FIELDS_DIFFERENT_SOURCES);
    return field;
  } else if (isFieldRefUnionDomain(domain2)) {
    warn(FACETED_INDEPENDENT_SAME_SOURCE);
    const field = domain2.fields[0];
    return isString(field) ? field : void 0;
  }
  return void 0;
}
function assembleDomain(model, channel) {
  const scaleComponent = model.component.scales[channel];
  const domains = scaleComponent.get("domains").map((domain2) => {
    if (isDataRefDomain(domain2)) {
      domain2.data = model.lookupDataSource(domain2.data);
    }
    return domain2;
  });
  return mergeDomains(domains);
}
function assembleScales(model) {
  if (isLayerModel(model) || isConcatModel(model)) {
    return model.children.reduce((scales, child) => {
      return scales.concat(assembleScales(child));
    }, assembleScalesForModel(model));
  } else {
    return assembleScalesForModel(model);
  }
}
function assembleScalesForModel(model) {
  return keys(model.component.scales).reduce((scales, channel) => {
    const scaleComponent = model.component.scales[channel];
    if (scaleComponent.merged) {
      return scales;
    }
    const scale = scaleComponent.combine();
    const { name: name2, type: type2, selectionExtent, domains: _d2, range: _r2, reverse: reverse2, ...otherScaleProps } = scale;
    const range2 = assembleScaleRange(scale.range, name2, channel, model);
    const domain2 = assembleDomain(model, channel);
    const domainRaw = selectionExtent ? assembleSelectionScaleDomain(model, selectionExtent, scaleComponent, domain2) : null;
    scales.push({
      name: name2,
      type: type2,
      ...domain2 ? { domain: domain2 } : {},
      ...domainRaw ? { domainRaw } : {},
      range: range2,
      ...reverse2 !== void 0 ? { reverse: reverse2 } : {},
      ...otherScaleProps
    });
    return scales;
  }, []);
}
function assembleScaleRange(scaleRange, scaleName, channel, model) {
  if (isXorY(channel)) {
    if (isVgRangeStep(scaleRange)) {
      return {
        step: { signal: `${scaleName}_step` }
      };
    }
  } else if (isObject(scaleRange) && isDataRefDomain(scaleRange)) {
    return {
      ...scaleRange,
      data: model.lookupDataSource(scaleRange.data)
    };
  }
  return scaleRange;
}
class ScaleComponent extends Split {
  constructor(name2, typeWithExplicit) {
    super(
      {},
      // no initial explicit property
      { name: name2 }
      // name as initial implicit property
    );
    this.merged = false;
    this.setWithExplicit("type", typeWithExplicit);
  }
  /**
   * Whether the scale definitely includes zero in the domain
   */
  domainDefinitelyIncludesZero() {
    if (this.get("zero") !== false) {
      return true;
    }
    return some(this.get("domains"), (d) => isArray(d) && d.length === 2 && d[0] <= 0 && d[1] >= 0);
  }
}
const RANGE_PROPERTIES = ["range", "scheme"];
function parseUnitScaleRange(model) {
  const localScaleComponents = model.component.scales;
  for (const channel of SCALE_CHANNELS) {
    const localScaleCmpt = localScaleComponents[channel];
    if (!localScaleCmpt) {
      continue;
    }
    const rangeWithExplicit = parseRangeForChannel(channel, model);
    localScaleCmpt.setWithExplicit("range", rangeWithExplicit);
  }
}
function getBinStepSignal(model, channel) {
  const fieldDef = model.fieldDef(channel);
  if (fieldDef == null ? void 0 : fieldDef.bin) {
    const { bin: bin2, field } = fieldDef;
    const sizeType = getSizeChannel(channel);
    const sizeSignal = model.getName(sizeType);
    if (isObject(bin2) && bin2.binned && bin2.step !== void 0) {
      return new SignalRefWrapper(() => {
        const scaleName = model.scaleName(channel);
        const binCount = `(domain("${scaleName}")[1] - domain("${scaleName}")[0]) / ${bin2.step}`;
        return `${model.getSignalName(sizeSignal)} / (${binCount})`;
      });
    } else if (isBinning(bin2)) {
      const binSignal = getBinSignalName(model, field, bin2);
      return new SignalRefWrapper(() => {
        const updatedName = model.getSignalName(binSignal);
        const binCount = `(${updatedName}.stop - ${updatedName}.start) / ${updatedName}.step`;
        return `${model.getSignalName(sizeSignal)} / (${binCount})`;
      });
    }
  }
  return void 0;
}
function parseRangeForChannel(channel, model) {
  const specifiedScale = model.specifiedScales[channel];
  const { size } = model;
  const mergedScaleCmpt = model.getScaleComponent(channel);
  const scaleType2 = mergedScaleCmpt.get("type");
  for (const property of RANGE_PROPERTIES) {
    if (specifiedScale[property] !== void 0) {
      const supportedByScaleType = scaleTypeSupportProperty(scaleType2, property);
      const channelIncompatability = channelScalePropertyIncompatability(channel, property);
      if (!supportedByScaleType) {
        warn(scalePropertyNotWorkWithScaleType(scaleType2, property, channel));
      } else if (channelIncompatability) {
        warn(channelIncompatability);
      } else {
        switch (property) {
          case "range": {
            const range2 = specifiedScale.range;
            if (isArray(range2)) {
              if (isXorY(channel)) {
                return makeExplicit(range2.map((v) => {
                  if (v === "width" || v === "height") {
                    const sizeSignal = model.getName(v);
                    const getSignalName = model.getSignalName.bind(model);
                    return SignalRefWrapper.fromName(getSignalName, sizeSignal);
                  }
                  return v;
                }));
              }
            } else if (isObject(range2)) {
              return makeExplicit({
                data: model.requestDataName(DataSourceType.Main),
                field: range2.field,
                sort: { op: "min", field: model.vgField(channel) }
              });
            }
            return makeExplicit(range2);
          }
          case "scheme":
            return makeExplicit(parseScheme(specifiedScale[property]));
        }
      }
    }
  }
  const sizeChannel = channel === X || channel === "xOffset" ? "width" : "height";
  const sizeValue = size[sizeChannel];
  if (isStep(sizeValue)) {
    if (isXorY(channel)) {
      if (hasDiscreteDomain(scaleType2)) {
        const step = getPositionStep(sizeValue, model, channel);
        if (step) {
          return makeExplicit({ step });
        }
      } else {
        warn(stepDropped(sizeChannel));
      }
    } else if (isXorYOffset(channel)) {
      const positionChannel = channel === XOFFSET ? "x" : "y";
      const positionScaleCmpt = model.getScaleComponent(positionChannel);
      const positionScaleType = positionScaleCmpt.get("type");
      if (positionScaleType === "band") {
        const step = getOffsetStep(sizeValue, scaleType2);
        if (step) {
          return makeExplicit(step);
        }
      }
    }
  }
  const { rangeMin: rangeMin2, rangeMax: rangeMax2 } = specifiedScale;
  const d = defaultRange(channel, model);
  if ((rangeMin2 !== void 0 || rangeMax2 !== void 0) && // it's ok to check just rangeMin's compatibility since rangeMin/rangeMax are the same
  scaleTypeSupportProperty(scaleType2, "rangeMin") && isArray(d) && d.length === 2) {
    return makeExplicit([rangeMin2 ?? d[0], rangeMax2 ?? d[1]]);
  }
  return makeImplicit(d);
}
function parseScheme(scheme2) {
  if (isExtendedScheme(scheme2)) {
    return {
      scheme: scheme2.name,
      ...omit(scheme2, ["name"])
    };
  }
  return { scheme: scheme2 };
}
function defaultRange(channel, model) {
  const { size, config, mark, encoding } = model;
  const getSignalName = model.getSignalName.bind(model);
  const { type: type2 } = getFieldOrDatumDef(encoding[channel]);
  const mergedScaleCmpt = model.getScaleComponent(channel);
  const scaleType2 = mergedScaleCmpt.get("type");
  const { domain: domain2, domainMid } = model.specifiedScales[channel];
  switch (channel) {
    case X:
    case Y: {
      if (contains(["point", "band"], scaleType2)) {
        const positionSize = getDiscretePositionSize(channel, size, config.view);
        if (isStep(positionSize)) {
          const step = getPositionStep(positionSize, model, channel);
          return { step };
        }
      }
      const sizeType = getSizeChannel(channel);
      const sizeSignal = model.getName(sizeType);
      if (channel === Y && hasContinuousDomain(scaleType2)) {
        return [SignalRefWrapper.fromName(getSignalName, sizeSignal), 0];
      } else {
        return [0, SignalRefWrapper.fromName(getSignalName, sizeSignal)];
      }
    }
    case XOFFSET:
    case YOFFSET:
      return getOffsetRange(channel, model, scaleType2);
    case SIZE: {
      const zero2 = model.component.scales[channel].get("zero");
      const rangeMin2 = sizeRangeMin(mark, zero2, config);
      const rangeMax2 = sizeRangeMax(mark, size, model, config);
      if (isContinuousToDiscrete(scaleType2)) {
        return interpolateRange(rangeMin2, rangeMax2, defaultContinuousToDiscreteCount(scaleType2, config, domain2, channel));
      } else {
        return [rangeMin2, rangeMax2];
      }
    }
    case THETA:
      return [0, Math.PI * 2];
    case ANGLE:
      return [0, 360];
    case RADIUS: {
      return [
        0,
        new SignalRefWrapper(() => {
          const w2 = model.getSignalName("width");
          const h = model.getSignalName("height");
          return `min(${w2},${h})/2`;
        })
      ];
    }
    case STROKEWIDTH:
      return [config.scale.minStrokeWidth, config.scale.maxStrokeWidth];
    case STROKEDASH:
      return [
        // TODO: add this to Vega's config.range?
        [1, 0],
        [4, 2],
        [2, 1],
        [1, 1],
        [1, 2, 4, 2]
      ];
    case SHAPE:
      return "symbol";
    case COLOR:
    case FILL:
    case STROKE:
      if (scaleType2 === "ordinal") {
        return type2 === "nominal" ? "category" : "ordinal";
      } else {
        if (domainMid !== void 0) {
          return "diverging";
        } else {
          return mark === "rect" || mark === "geoshape" ? "heatmap" : "ramp";
        }
      }
    case OPACITY:
    case FILLOPACITY:
    case STROKEOPACITY:
      return [config.scale.minOpacity, config.scale.maxOpacity];
  }
}
function getPositionStep(step, model, channel) {
  const { encoding } = model;
  const mergedScaleCmpt = model.getScaleComponent(channel);
  const offsetChannel = getOffsetScaleChannel(channel);
  const offsetDef = encoding[offsetChannel];
  const stepFor = getStepFor({ step, offsetIsDiscrete: isFieldOrDatumDef(offsetDef) && isDiscrete$1(offsetDef.type) });
  if (stepFor === "offset" && channelHasFieldOrDatum(encoding, offsetChannel)) {
    const offsetScaleCmpt = model.getScaleComponent(offsetChannel);
    const offsetScaleName = model.scaleName(offsetChannel);
    let stepCount = `domain('${offsetScaleName}').length`;
    if (offsetScaleCmpt.get("type") === "band") {
      const offsetPaddingInner = offsetScaleCmpt.get("paddingInner") ?? offsetScaleCmpt.get("padding") ?? 0;
      const offsetPaddingOuter = offsetScaleCmpt.get("paddingOuter") ?? offsetScaleCmpt.get("padding") ?? 0;
      stepCount = `bandspace(${stepCount}, ${offsetPaddingInner}, ${offsetPaddingOuter})`;
    }
    const paddingInner2 = mergedScaleCmpt.get("paddingInner") ?? mergedScaleCmpt.get("padding");
    return {
      signal: `${step.step} * ${stepCount} / (1-${exprFromSignalRefOrValue(paddingInner2)})`
    };
  } else {
    return step.step;
  }
}
function getOffsetStep(step, offsetScaleType) {
  const stepFor = getStepFor({ step, offsetIsDiscrete: hasDiscreteDomain(offsetScaleType) });
  if (stepFor === "offset") {
    return { step: step.step };
  }
  return void 0;
}
function getOffsetRange(channel, model, offsetScaleType) {
  const positionChannel = channel === XOFFSET ? "x" : "y";
  const positionScaleCmpt = model.getScaleComponent(positionChannel);
  const positionScaleType = positionScaleCmpt.get("type");
  const positionScaleName = model.scaleName(positionChannel);
  if (positionScaleType === "band") {
    const size = getDiscretePositionSize(positionChannel, model.size, model.config.view);
    if (isStep(size)) {
      const step = getOffsetStep(size, offsetScaleType);
      if (step) {
        return step;
      }
    }
    return [0, { signal: `bandwidth('${positionScaleName}')` }];
  } else {
    const positionDef = model.encoding[positionChannel];
    if (isFieldDef(positionDef) && positionDef.timeUnit) {
      const duration = durationExpr(positionDef.timeUnit, (expr) => `scale('${positionScaleName}', ${expr})`);
      const padding2 = model.config.scale.bandWithNestedOffsetPaddingInner;
      if (padding2) {
        const startRatio = isSignalRef(padding2) ? `${padding2.signal}/2` : `${padding2 / 2}`;
        const endRatio = isSignalRef(padding2) ? `(1 - ${padding2.signal}/2)` : `${1 - padding2 / 2}`;
        return [{ signal: `${startRatio} * (${duration})` }, { signal: `${endRatio} * (${duration})` }];
      }
      return [0, { signal: duration }];
    }
    return never(`Cannot use ${channel} scale if ${positionChannel} scale is not discrete.`);
  }
}
function getDiscretePositionSize(channel, size, viewConfig) {
  const sizeChannel = channel === X ? "width" : "height";
  const sizeValue = size[sizeChannel];
  if (sizeValue) {
    return sizeValue;
  }
  return getViewConfigDiscreteSize(viewConfig, sizeChannel);
}
function defaultContinuousToDiscreteCount(scaleType2, config, domain2, channel) {
  switch (scaleType2) {
    case "quantile":
      return config.scale.quantileCount;
    case "quantize":
      return config.scale.quantizeCount;
    case "threshold":
      if (domain2 !== void 0 && isArray(domain2)) {
        return domain2.length + 1;
      } else {
        warn(domainRequiredForThresholdScale(channel));
        return 3;
      }
  }
}
function interpolateRange(rangeMin2, rangeMax2, cardinality) {
  const f = () => {
    const rMax = signalOrStringValue(rangeMax2);
    const rMin = signalOrStringValue(rangeMin2);
    const step = `(${rMax} - ${rMin}) / (${cardinality} - 1)`;
    return `sequence(${rMin}, ${rMax} + ${step}, ${step})`;
  };
  if (isSignalRef(rangeMax2)) {
    return new SignalRefWrapper(f);
  } else {
    return { signal: f() };
  }
}
function sizeRangeMin(mark, zero2, config) {
  if (zero2) {
    if (isSignalRef(zero2)) {
      return { signal: `${zero2.signal} ? 0 : ${sizeRangeMin(mark, false, config)}` };
    } else {
      return 0;
    }
  }
  switch (mark) {
    case "bar":
    case "tick":
      return config.scale.minBandSize;
    case "line":
    case "trail":
    case "rule":
      return config.scale.minStrokeWidth;
    case "text":
      return config.scale.minFontSize;
    case "point":
    case "square":
    case "circle":
      return config.scale.minSize;
  }
  throw new Error(incompatibleChannel("size", mark));
}
const MAX_SIZE_RANGE_STEP_RATIO = 0.95;
function sizeRangeMax(mark, size, model, config) {
  const xyStepSignals = {
    x: getBinStepSignal(model, "x"),
    y: getBinStepSignal(model, "y")
  };
  switch (mark) {
    case "bar":
    case "tick": {
      if (config.scale.maxBandSize !== void 0) {
        return config.scale.maxBandSize;
      }
      const min = minXYStep(size, xyStepSignals, config.view);
      if (isNumber(min)) {
        return min - 1;
      } else {
        return new SignalRefWrapper(() => `${min.signal} - 1`);
      }
    }
    case "line":
    case "trail":
    case "rule":
      return config.scale.maxStrokeWidth;
    case "text":
      return config.scale.maxFontSize;
    case "point":
    case "square":
    case "circle": {
      if (config.scale.maxSize) {
        return config.scale.maxSize;
      }
      const pointStep = minXYStep(size, xyStepSignals, config.view);
      if (isNumber(pointStep)) {
        return Math.pow(MAX_SIZE_RANGE_STEP_RATIO * pointStep, 2);
      } else {
        return new SignalRefWrapper(() => `pow(${MAX_SIZE_RANGE_STEP_RATIO} * ${pointStep.signal}, 2)`);
      }
    }
  }
  throw new Error(incompatibleChannel("size", mark));
}
function minXYStep(size, xyStepSignals, viewConfig) {
  const widthStep = isStep(size.width) ? size.width.step : getViewConfigDiscreteStep(viewConfig, "width");
  const heightStep = isStep(size.height) ? size.height.step : getViewConfigDiscreteStep(viewConfig, "height");
  if (xyStepSignals.x || xyStepSignals.y) {
    return new SignalRefWrapper(() => {
      const exprs = [
        xyStepSignals.x ? xyStepSignals.x.signal : widthStep,
        xyStepSignals.y ? xyStepSignals.y.signal : heightStep
      ];
      return `min(${exprs.join(", ")})`;
    });
  }
  return Math.min(widthStep, heightStep);
}
function parseScaleProperty(model, property) {
  if (isUnitModel(model)) {
    parseUnitScaleProperty(model, property);
  } else {
    parseNonUnitScaleProperty(model, property);
  }
}
function parseUnitScaleProperty(model, property) {
  const localScaleComponents = model.component.scales;
  const { config, encoding, markDef, specifiedScales } = model;
  for (const channel of keys(localScaleComponents)) {
    const specifiedScale = specifiedScales[channel];
    const localScaleCmpt = localScaleComponents[channel];
    const mergedScaleCmpt = model.getScaleComponent(channel);
    const fieldOrDatumDef = getFieldOrDatumDef(encoding[channel]);
    const specifiedValue = specifiedScale[property];
    const scaleType2 = mergedScaleCmpt.get("type");
    const scalePadding = mergedScaleCmpt.get("padding");
    const scalePaddingInner = mergedScaleCmpt.get("paddingInner");
    const supportedByScaleType = scaleTypeSupportProperty(scaleType2, property);
    const channelIncompatability = channelScalePropertyIncompatability(channel, property);
    if (specifiedValue !== void 0) {
      if (!supportedByScaleType) {
        warn(scalePropertyNotWorkWithScaleType(scaleType2, property, channel));
      } else if (channelIncompatability) {
        warn(channelIncompatability);
      }
    }
    if (supportedByScaleType && channelIncompatability === void 0) {
      if (specifiedValue !== void 0) {
        const timeUnit = fieldOrDatumDef["timeUnit"];
        const type2 = fieldOrDatumDef.type;
        switch (property) {
          case "domainMax":
          case "domainMin":
            if (isDateTime(specifiedScale[property]) || type2 === "temporal" || timeUnit) {
              localScaleCmpt.set(property, { signal: valueExpr(specifiedScale[property], { type: type2, timeUnit }) }, true);
            } else {
              localScaleCmpt.set(property, specifiedScale[property], true);
            }
            break;
          default:
            localScaleCmpt.copyKeyFromObject(property, specifiedScale);
        }
      } else {
        const value = property in scaleRules ? scaleRules[property]({
          model,
          channel,
          fieldOrDatumDef,
          scaleType: scaleType2,
          scalePadding,
          scalePaddingInner,
          domain: specifiedScale.domain,
          domainMin: specifiedScale.domainMin,
          domainMax: specifiedScale.domainMax,
          markDef,
          config,
          hasNestedOffsetScale: channelHasNestedOffsetScale(encoding, channel),
          hasSecondaryRangeChannel: !!encoding[getSecondaryRangeChannel(channel)]
        }) : config.scale[property];
        if (value !== void 0) {
          localScaleCmpt.set(property, value, false);
        }
      }
    }
  }
}
const scaleRules = {
  bins: ({ model, fieldOrDatumDef }) => isFieldDef(fieldOrDatumDef) ? bins(model, fieldOrDatumDef) : void 0,
  interpolate: ({ channel, fieldOrDatumDef }) => interpolate(channel, fieldOrDatumDef.type),
  nice: ({ scaleType: scaleType2, channel, domain: domain2, domainMin, domainMax, fieldOrDatumDef }) => nice(scaleType2, channel, domain2, domainMin, domainMax, fieldOrDatumDef),
  padding: ({ channel, scaleType: scaleType2, fieldOrDatumDef, markDef, config }) => padding(channel, scaleType2, config.scale, fieldOrDatumDef, markDef, config.bar),
  paddingInner: ({ scalePadding, channel, markDef, scaleType: scaleType2, config, hasNestedOffsetScale }) => paddingInner(scalePadding, channel, markDef.type, scaleType2, config.scale, hasNestedOffsetScale),
  paddingOuter: ({ scalePadding, channel, scaleType: scaleType2, scalePaddingInner, config, hasNestedOffsetScale }) => paddingOuter(scalePadding, channel, scaleType2, scalePaddingInner, config.scale, hasNestedOffsetScale),
  reverse: ({ fieldOrDatumDef, scaleType: scaleType2, channel, config }) => {
    const sort = isFieldDef(fieldOrDatumDef) ? fieldOrDatumDef.sort : void 0;
    return reverse(scaleType2, sort, channel, config.scale);
  },
  zero: ({ channel, fieldOrDatumDef, domain: domain2, markDef, scaleType: scaleType2, config, hasSecondaryRangeChannel }) => zero(channel, fieldOrDatumDef, domain2, markDef, scaleType2, config.scale, hasSecondaryRangeChannel)
};
function parseScaleRange(model) {
  if (isUnitModel(model)) {
    parseUnitScaleRange(model);
  } else {
    parseNonUnitScaleProperty(model, "range");
  }
}
function parseNonUnitScaleProperty(model, property) {
  const localScaleComponents = model.component.scales;
  for (const child of model.children) {
    if (property === "range") {
      parseScaleRange(child);
    } else {
      parseScaleProperty(child, property);
    }
  }
  for (const channel of keys(localScaleComponents)) {
    let valueWithExplicit;
    for (const child of model.children) {
      const childComponent = child.component.scales[channel];
      if (childComponent) {
        const childValueWithExplicit = childComponent.getWithExplicit(property);
        valueWithExplicit = mergeValuesWithExplicit(valueWithExplicit, childValueWithExplicit, property, "scale", tieBreakByComparing((v1, v2) => {
          switch (property) {
            case "range":
              if (v1.step && v2.step) {
                return v1.step - v2.step;
              }
              return 0;
          }
          return 0;
        }));
      }
    }
    localScaleComponents[channel].setWithExplicit(property, valueWithExplicit);
  }
}
function bins(model, fieldDef) {
  const bin2 = fieldDef.bin;
  if (isBinning(bin2)) {
    const binSignal = getBinSignalName(model, fieldDef.field, bin2);
    return new SignalRefWrapper(() => {
      return model.getSignalName(binSignal);
    });
  } else if (isBinned(bin2) && isBinParams(bin2) && bin2.step !== void 0) {
    return {
      step: bin2.step
    };
  }
  return void 0;
}
function interpolate(channel, type2) {
  if (contains([COLOR, FILL, STROKE], channel) && type2 !== "nominal") {
    return "hcl";
  }
  return void 0;
}
function nice(scaleType2, channel, specifiedDomain, domainMin, domainMax, fieldOrDatumDef) {
  var _a2;
  if (((_a2 = getFieldDef(fieldOrDatumDef)) == null ? void 0 : _a2.bin) || isArray(specifiedDomain) || domainMax != null || domainMin != null || contains([ScaleType.TIME, ScaleType.UTC], scaleType2)) {
    return void 0;
  }
  return isXorY(channel) ? true : void 0;
}
function padding(channel, scaleType2, scaleConfig, fieldOrDatumDef, markDef, barConfig) {
  if (isXorY(channel)) {
    if (isContinuousToContinuous(scaleType2)) {
      if (scaleConfig.continuousPadding !== void 0) {
        return scaleConfig.continuousPadding;
      }
      const { type: type2, orient: orient2 } = markDef;
      if (type2 === "bar" && !(isFieldDef(fieldOrDatumDef) && (fieldOrDatumDef.bin || fieldOrDatumDef.timeUnit))) {
        if (orient2 === "vertical" && channel === "x" || orient2 === "horizontal" && channel === "y") {
          return barConfig.continuousBandSize;
        }
      }
    }
    if (scaleType2 === ScaleType.POINT) {
      return scaleConfig.pointPadding;
    }
  }
  return void 0;
}
function paddingInner(paddingValue, channel, mark, scaleType2, scaleConfig, hasNestedOffsetScale = false) {
  if (paddingValue !== void 0) {
    return void 0;
  }
  if (isXorY(channel)) {
    const { bandPaddingInner, barBandPaddingInner, rectBandPaddingInner, bandWithNestedOffsetPaddingInner } = scaleConfig;
    if (hasNestedOffsetScale) {
      return bandWithNestedOffsetPaddingInner;
    }
    return getFirstDefined(bandPaddingInner, mark === "bar" ? barBandPaddingInner : rectBandPaddingInner);
  } else if (isXorYOffset(channel)) {
    if (scaleType2 === ScaleType.BAND) {
      return scaleConfig.offsetBandPaddingInner;
    }
  }
  return void 0;
}
function paddingOuter(paddingValue, channel, scaleType2, paddingInnerValue, scaleConfig, hasNestedOffsetScale = false) {
  if (paddingValue !== void 0) {
    return void 0;
  }
  if (isXorY(channel)) {
    const { bandPaddingOuter, bandWithNestedOffsetPaddingOuter } = scaleConfig;
    if (hasNestedOffsetScale) {
      return bandWithNestedOffsetPaddingOuter;
    }
    if (scaleType2 === ScaleType.BAND) {
      return getFirstDefined(
        bandPaddingOuter,
        /* By default, paddingOuter is paddingInner / 2. The reason is that
          size (width/height) = step * (cardinality - paddingInner + 2 * paddingOuter).
          and we want the width/height to be integer by default.
          Note that step (by default) and cardinality are integers.) */
        isSignalRef(paddingInnerValue) ? { signal: `${paddingInnerValue.signal}/2` } : paddingInnerValue / 2
      );
    }
  } else if (isXorYOffset(channel)) {
    if (scaleType2 === ScaleType.POINT) {
      return 0.5;
    } else if (scaleType2 === ScaleType.BAND) {
      return scaleConfig.offsetBandPaddingOuter;
    }
  }
  return void 0;
}
function reverse(scaleType2, sort, channel, scaleConfig) {
  if (channel === "x" && scaleConfig.xReverse !== void 0) {
    if (hasContinuousDomain(scaleType2) && sort === "descending") {
      if (isSignalRef(scaleConfig.xReverse)) {
        return { signal: `!${scaleConfig.xReverse.signal}` };
      } else {
        return !scaleConfig.xReverse;
      }
    }
    return scaleConfig.xReverse;
  }
  if (hasContinuousDomain(scaleType2) && sort === "descending") {
    return true;
  }
  return void 0;
}
function zero(channel, fieldDef, specifiedDomain, markDef, scaleType2, scaleConfig, hasSecondaryRangeChannel) {
  const hasCustomDomain = !!specifiedDomain && specifiedDomain !== "unaggregated";
  if (hasCustomDomain) {
    if (hasContinuousDomain(scaleType2)) {
      if (isArray(specifiedDomain)) {
        const first = specifiedDomain[0];
        const last = specifiedDomain[specifiedDomain.length - 1];
        if (first <= 0 && last >= 0) {
          return true;
        }
      }
      return false;
    }
  }
  if (channel === "size" && fieldDef.type === "quantitative" && !isContinuousToDiscrete(scaleType2)) {
    return true;
  }
  if (!(isFieldDef(fieldDef) && fieldDef.bin) && contains([...POSITION_SCALE_CHANNELS, ...POLAR_POSITION_SCALE_CHANNELS], channel)) {
    const { orient: orient2, type: type2 } = markDef;
    if (contains(["bar", "area", "line", "trail"], type2)) {
      if (orient2 === "horizontal" && channel === "y" || orient2 === "vertical" && channel === "x") {
        return false;
      }
    }
    if (contains(["bar", "area"], type2) && !hasSecondaryRangeChannel) {
      return true;
    }
    return scaleConfig == null ? void 0 : scaleConfig.zero;
  }
  return false;
}
function scaleType(specifiedScale, channel, fieldDef, mark, hasNestedOffsetScale = false) {
  const defaultScaleType = defaultType(channel, fieldDef, mark, hasNestedOffsetScale);
  const { type: type2 } = specifiedScale;
  if (!isScaleChannel(channel)) {
    return null;
  }
  if (type2 !== void 0) {
    if (!channelSupportScaleType(channel, type2)) {
      warn(scaleTypeNotWorkWithChannel(channel, type2, defaultScaleType));
      return defaultScaleType;
    }
    if (isFieldDef(fieldDef) && !scaleTypeSupportDataType(type2, fieldDef.type)) {
      warn(scaleTypeNotWorkWithFieldDef(type2, defaultScaleType));
      return defaultScaleType;
    }
    return type2;
  }
  return defaultScaleType;
}
function defaultType(channel, fieldDef, mark, hasNestedOffsetScale) {
  var _a2;
  switch (fieldDef.type) {
    case "nominal":
    case "ordinal": {
      if (isColorChannel(channel) || rangeType(channel) === "discrete") {
        if (channel === "shape" && fieldDef.type === "ordinal") {
          warn(discreteChannelCannotEncode(channel, "ordinal"));
        }
        return "ordinal";
      }
      if (isXorY(channel) || isXorYOffset(channel)) {
        if (contains(["rect", "bar", "image", "rule"], mark.type)) {
          return "band";
        }
        if (hasNestedOffsetScale) {
          return "band";
        }
      } else if (mark.type === "arc" && channel in POLAR_POSITION_SCALE_CHANNEL_INDEX) {
        return "band";
      }
      const dimensionSize = mark[getSizeChannel(channel)];
      if (isRelativeBandSize(dimensionSize)) {
        return "band";
      }
      if (isPositionFieldOrDatumDef(fieldDef) && ((_a2 = fieldDef.axis) == null ? void 0 : _a2.tickBand)) {
        return "band";
      }
      return "point";
    }
    case "temporal":
      if (isColorChannel(channel)) {
        return "time";
      } else if (rangeType(channel) === "discrete") {
        warn(discreteChannelCannotEncode(channel, "temporal"));
        return "ordinal";
      } else if (isFieldDef(fieldDef) && fieldDef.timeUnit && normalizeTimeUnit(fieldDef.timeUnit).utc) {
        return "utc";
      }
      return "time";
    case "quantitative":
      if (isColorChannel(channel)) {
        if (isFieldDef(fieldDef) && isBinning(fieldDef.bin)) {
          return "bin-ordinal";
        }
        return "linear";
      } else if (rangeType(channel) === "discrete") {
        warn(discreteChannelCannotEncode(channel, "quantitative"));
        return "ordinal";
      }
      return "linear";
    case "geojson":
      return void 0;
  }
  throw new Error(invalidFieldType(fieldDef.type));
}
function parseScales(model, { ignoreRange } = {}) {
  parseScaleCore(model);
  parseScaleDomain(model);
  for (const prop of NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTIES) {
    parseScaleProperty(model, prop);
  }
  if (!ignoreRange) {
    parseScaleRange(model);
  }
}
function parseScaleCore(model) {
  if (isUnitModel(model)) {
    model.component.scales = parseUnitScaleCore(model);
  } else {
    model.component.scales = parseNonUnitScaleCore(model);
  }
}
function parseUnitScaleCore(model) {
  const { encoding, mark, markDef } = model;
  const scaleComponents = {};
  for (const channel of SCALE_CHANNELS) {
    const fieldOrDatumDef = getFieldOrDatumDef(encoding[channel]);
    if (fieldOrDatumDef && mark === GEOSHAPE && channel === SHAPE && fieldOrDatumDef.type === GEOJSON) {
      continue;
    }
    let specifiedScale = fieldOrDatumDef && fieldOrDatumDef["scale"];
    if (isXorYOffset(channel)) {
      const mainChannel = getMainChannelFromOffsetChannel(channel);
      if (!channelHasNestedOffsetScale(encoding, mainChannel)) {
        if (specifiedScale) {
          warn(offsetEncodingScaleIgnored(channel));
        }
        continue;
      }
    }
    if (fieldOrDatumDef && specifiedScale !== null && specifiedScale !== false) {
      specifiedScale ?? (specifiedScale = {});
      const hasNestedOffsetScale = channelHasNestedOffsetScale(encoding, channel);
      const sType = scaleType(specifiedScale, channel, fieldOrDatumDef, markDef, hasNestedOffsetScale);
      scaleComponents[channel] = new ScaleComponent(model.scaleName(`${channel}`, true), {
        value: sType,
        explicit: specifiedScale.type === sType
      });
    }
  }
  return scaleComponents;
}
const scaleTypeTieBreaker = tieBreakByComparing((st1, st2) => scaleTypePrecedence(st1) - scaleTypePrecedence(st2));
function parseNonUnitScaleCore(model) {
  var _a2;
  const scaleComponents = model.component.scales = {};
  const scaleTypeWithExplicitIndex = {};
  const resolve = model.component.resolve;
  for (const child of model.children) {
    parseScaleCore(child);
    for (const channel of keys(child.component.scales)) {
      (_a2 = resolve.scale)[channel] ?? (_a2[channel] = defaultScaleResolve(channel, model));
      if (resolve.scale[channel] === "shared") {
        const explicitScaleType = scaleTypeWithExplicitIndex[channel];
        const childScaleType = child.component.scales[channel].getWithExplicit("type");
        if (explicitScaleType) {
          if (scaleCompatible(explicitScaleType.value, childScaleType.value)) {
            scaleTypeWithExplicitIndex[channel] = mergeValuesWithExplicit(explicitScaleType, childScaleType, "type", "scale", scaleTypeTieBreaker);
          } else {
            resolve.scale[channel] = "independent";
            delete scaleTypeWithExplicitIndex[channel];
          }
        } else {
          scaleTypeWithExplicitIndex[channel] = childScaleType;
        }
      }
    }
  }
  for (const channel of keys(scaleTypeWithExplicitIndex)) {
    const name2 = model.scaleName(channel, true);
    const typeWithExplicit = scaleTypeWithExplicitIndex[channel];
    scaleComponents[channel] = new ScaleComponent(name2, typeWithExplicit);
    for (const child of model.children) {
      const childScale = child.component.scales[channel];
      if (childScale) {
        child.renameScale(childScale.get("name"), name2);
        childScale.merged = true;
      }
    }
  }
  return scaleComponents;
}
class NameMap {
  constructor() {
    this.nameMap = {};
  }
  rename(oldName, newName) {
    this.nameMap[oldName] = newName;
  }
  has(name2) {
    return this.nameMap[name2] !== void 0;
  }
  get(name2) {
    while (this.nameMap[name2] && name2 !== this.nameMap[name2]) {
      name2 = this.nameMap[name2];
    }
    return name2;
  }
}
function isUnitModel(model) {
  return (model == null ? void 0 : model.type) === "unit";
}
function isFacetModel(model) {
  return (model == null ? void 0 : model.type) === "facet";
}
function isConcatModel(model) {
  return (model == null ? void 0 : model.type) === "concat";
}
function isLayerModel(model) {
  return (model == null ? void 0 : model.type) === "layer";
}
class Model {
  constructor(spec, type2, parent, parentGivenName, config, resolve, view) {
    this.type = type2;
    this.parent = parent;
    this.config = config;
    this.correctDataNames = (mark) => {
      var _a2, _b, _c2;
      if ((_a2 = mark.from) == null ? void 0 : _a2.data) {
        mark.from.data = this.lookupDataSource(mark.from.data);
      }
      if ((_c2 = (_b = mark.from) == null ? void 0 : _b.facet) == null ? void 0 : _c2.data) {
        mark.from.facet.data = this.lookupDataSource(mark.from.facet.data);
      }
      return mark;
    };
    this.parent = parent;
    this.config = config;
    this.view = replaceExprRef(view);
    this.name = spec.name ?? parentGivenName;
    this.title = isText(spec.title) ? { text: spec.title } : spec.title ? replaceExprRef(spec.title) : void 0;
    this.scaleNameMap = parent ? parent.scaleNameMap : new NameMap();
    this.projectionNameMap = parent ? parent.projectionNameMap : new NameMap();
    this.signalNameMap = parent ? parent.signalNameMap : new NameMap();
    this.data = spec.data;
    this.description = spec.description;
    this.transforms = normalizeTransform(spec.transform ?? []);
    this.layout = type2 === "layer" || type2 === "unit" ? {} : extractCompositionLayout(spec, type2, config);
    this.component = {
      data: {
        sources: parent ? parent.component.data.sources : [],
        outputNodes: parent ? parent.component.data.outputNodes : {},
        outputNodeRefCounts: parent ? parent.component.data.outputNodeRefCounts : {},
        // data is faceted if the spec is a facet spec or the parent has faceted data and data is undefined
        isFaceted: isFacetSpec(spec) || (parent == null ? void 0 : parent.component.data.isFaceted) && spec.data === void 0
      },
      layoutSize: new Split(),
      layoutHeaders: { row: {}, column: {}, facet: {} },
      mark: null,
      resolve: {
        scale: {},
        axis: {},
        legend: {},
        ...resolve ? duplicate(resolve) : {}
      },
      selection: null,
      scales: null,
      projection: null,
      axes: {},
      legends: {}
    };
  }
  get width() {
    return this.getSizeSignalRef("width");
  }
  get height() {
    return this.getSizeSignalRef("height");
  }
  parse() {
    this.parseScale();
    this.parseLayoutSize();
    this.renameTopLevelLayoutSizeSignal();
    this.parseSelections();
    this.parseProjection();
    this.parseData();
    this.parseAxesAndHeaders();
    this.parseLegends();
    this.parseMarkGroup();
  }
  parseScale() {
    parseScales(this);
  }
  parseProjection() {
    parseProjection(this);
  }
  /**
   * Rename top-level spec's size to be just width / height, ignoring model name.
   * This essentially merges the top-level spec's width/height signals with the width/height signals
   * to help us reduce redundant signals declaration.
   */
  renameTopLevelLayoutSizeSignal() {
    if (this.getName("width") !== "width") {
      this.renameSignal(this.getName("width"), "width");
    }
    if (this.getName("height") !== "height") {
      this.renameSignal(this.getName("height"), "height");
    }
  }
  parseLegends() {
    parseLegend(this);
  }
  assembleEncodeFromView(view) {
    const { style: _, ...baseView } = view;
    const e2 = {};
    for (const property of keys(baseView)) {
      const value = baseView[property];
      if (value !== void 0) {
        e2[property] = signalOrValueRef(value);
      }
    }
    return e2;
  }
  assembleGroupEncodeEntry(isTopLevel) {
    let encodeEntry2 = {};
    if (this.view) {
      encodeEntry2 = this.assembleEncodeFromView(this.view);
    }
    if (!isTopLevel) {
      if (this.description) {
        encodeEntry2["description"] = signalOrValueRef(this.description);
      }
      if (this.type === "unit" || this.type === "layer") {
        return {
          width: this.getSizeSignalRef("width"),
          height: this.getSizeSignalRef("height"),
          ...encodeEntry2 ?? {}
        };
      }
    }
    return isEmpty(encodeEntry2) ? void 0 : encodeEntry2;
  }
  assembleLayout() {
    if (!this.layout) {
      return void 0;
    }
    const { spacing, ...layout } = this.layout;
    const { component, config } = this;
    const titleBand = assembleLayoutTitleBand(component.layoutHeaders, config);
    return {
      padding: spacing,
      ...this.assembleDefaultLayout(),
      ...layout,
      ...titleBand ? { titleBand } : {}
    };
  }
  assembleDefaultLayout() {
    return {};
  }
  assembleHeaderMarks() {
    const { layoutHeaders } = this.component;
    let headerMarks = [];
    for (const channel of FACET_CHANNELS) {
      if (layoutHeaders[channel].title) {
        headerMarks.push(assembleTitleGroup(this, channel));
      }
    }
    for (const channel of HEADER_CHANNELS) {
      headerMarks = headerMarks.concat(assembleHeaderGroups(this, channel));
    }
    return headerMarks;
  }
  assembleAxes() {
    return assembleAxes(this.component.axes, this.config);
  }
  assembleLegends() {
    return assembleLegends(this);
  }
  assembleProjections() {
    return assembleProjections(this);
  }
  assembleTitle() {
    const { encoding, ...titleNoEncoding } = this.title ?? {};
    const title2 = {
      ...extractTitleConfig(this.config.title).nonMarkTitleProperties,
      ...titleNoEncoding,
      ...encoding ? { encode: { update: encoding } } : {}
    };
    if (title2.text) {
      if (contains(["unit", "layer"], this.type)) {
        if (contains(["middle", void 0], title2.anchor)) {
          title2.frame ?? (title2.frame = "group");
        }
      } else {
        title2.anchor ?? (title2.anchor = "start");
      }
      return isEmpty(title2) ? void 0 : title2;
    }
    return void 0;
  }
  /**
   * Assemble the mark group for this model. We accept optional `signals` so that we can include concat top-level signals with the top-level model's local signals.
   */
  assembleGroup(signals = []) {
    const group = {};
    signals = signals.concat(this.assembleSignals());
    if (signals.length > 0) {
      group.signals = signals;
    }
    const layout = this.assembleLayout();
    if (layout) {
      group.layout = layout;
    }
    group.marks = [].concat(this.assembleHeaderMarks(), this.assembleMarks());
    const scales = !this.parent || isFacetModel(this.parent) ? assembleScales(this) : [];
    if (scales.length > 0) {
      group.scales = scales;
    }
    const axes = this.assembleAxes();
    if (axes.length > 0) {
      group.axes = axes;
    }
    const legends = this.assembleLegends();
    if (legends.length > 0) {
      group.legends = legends;
    }
    return group;
  }
  getName(text2) {
    return varName((this.name ? `${this.name}_` : "") + text2);
  }
  getDataName(type2) {
    return this.getName(DataSourceType[type2].toLowerCase());
  }
  /**
   * Request a data source name for the given data source type and mark that data source as required.
   * This method should be called in parse, so that all used data source can be correctly instantiated in assembleData().
   * You can lookup the correct dataset name in assemble with `lookupDataSource`.
   */
  requestDataName(name2) {
    const fullName = this.getDataName(name2);
    const refCounts = this.component.data.outputNodeRefCounts;
    refCounts[fullName] = (refCounts[fullName] || 0) + 1;
    return fullName;
  }
  getSizeSignalRef(layoutSizeType) {
    if (isFacetModel(this.parent)) {
      const sizeType = getSizeTypeFromLayoutSizeType(layoutSizeType);
      const channel = getPositionScaleChannel(sizeType);
      const scaleComponent = this.component.scales[channel];
      if (scaleComponent && !scaleComponent.merged) {
        const type2 = scaleComponent.get("type");
        const range2 = scaleComponent.get("range");
        if (hasDiscreteDomain(type2) && isVgRangeStep(range2)) {
          const scaleName = scaleComponent.get("name");
          const domain2 = assembleDomain(this, channel);
          const field = getFieldFromDomain(domain2);
          if (field) {
            const fieldRef = vgField({ aggregate: "distinct", field }, { expr: "datum" });
            return {
              signal: sizeExpr(scaleName, scaleComponent, fieldRef)
            };
          } else {
            warn(unknownField(channel));
            return null;
          }
        }
      }
    }
    return {
      signal: this.signalNameMap.get(this.getName(layoutSizeType))
    };
  }
  /**
   * Lookup the name of the datasource for an output node. You probably want to call this in assemble.
   */
  lookupDataSource(name2) {
    const node = this.component.data.outputNodes[name2];
    if (!node) {
      return name2;
    }
    return node.getSource();
  }
  getSignalName(oldSignalName) {
    return this.signalNameMap.get(oldSignalName);
  }
  renameSignal(oldName, newName) {
    this.signalNameMap.rename(oldName, newName);
  }
  renameScale(oldName, newName) {
    this.scaleNameMap.rename(oldName, newName);
  }
  renameProjection(oldName, newName) {
    this.projectionNameMap.rename(oldName, newName);
  }
  /**
   * @return scale name for a given channel after the scale has been parsed and named.
   */
  scaleName(originalScaleName, parse) {
    if (parse) {
      return this.getName(originalScaleName);
    }
    if (
      // If there is a scale for the channel, there should be a local scale component for it
      isChannel(originalScaleName) && isScaleChannel(originalScaleName) && this.component.scales[originalScaleName] || // in the scale name map (the scale get merged by its parent)
      this.scaleNameMap.has(this.getName(originalScaleName))
    ) {
      return this.scaleNameMap.get(this.getName(originalScaleName));
    }
    return void 0;
  }
  /**
   * @return projection name after the projection has been parsed and named.
   */
  projectionName(parse) {
    if (parse) {
      return this.getName("projection");
    }
    if (this.component.projection && !this.component.projection.merged || this.projectionNameMap.has(this.getName("projection"))) {
      return this.projectionNameMap.get(this.getName("projection"));
    }
    return void 0;
  }
  /**
   * Traverse a model's hierarchy to get the scale component for a particular channel.
   */
  getScaleComponent(channel) {
    if (!this.component.scales) {
      throw new Error("getScaleComponent cannot be called before parseScale(). Make sure you have called parseScale or use parseUnitModelWithScale().");
    }
    const localScaleComponent = this.component.scales[channel];
    if (localScaleComponent && !localScaleComponent.merged) {
      return localScaleComponent;
    }
    return this.parent ? this.parent.getScaleComponent(channel) : void 0;
  }
  /**
   * Traverse a model's hierarchy to get a particular selection component.
   */
  getSelectionComponent(variableName, origName) {
    let sel = this.component.selection[variableName];
    if (!sel && this.parent) {
      sel = this.parent.getSelectionComponent(variableName, origName);
    }
    if (!sel) {
      throw new Error(selectionNotFound(origName));
    }
    return sel;
  }
  /**
   * Returns true if the model has a signalRef for an axis orient.
   */
  hasAxisOrientSignalRef() {
    var _a2, _b;
    return ((_a2 = this.component.axes.x) == null ? void 0 : _a2.some((a) => a.hasOrientSignalRef())) || ((_b = this.component.axes.y) == null ? void 0 : _b.some((a) => a.hasOrientSignalRef()));
  }
}
class ModelWithField extends Model {
  /** Get "field" reference for Vega */
  vgField(channel, opt = {}) {
    const fieldDef = this.fieldDef(channel);
    if (!fieldDef) {
      return void 0;
    }
    return vgField(fieldDef, opt);
  }
  reduceFieldDef(f, init2) {
    return reduce(this.getMapping(), (acc, cd, c) => {
      const fieldDef = getFieldDef(cd);
      if (fieldDef) {
        return f(acc, fieldDef, c);
      }
      return acc;
    }, init2);
  }
  forEachFieldDef(f, t2) {
    forEach(this.getMapping(), (cd, c) => {
      const fieldDef = getFieldDef(cd);
      if (fieldDef) {
        f(fieldDef, c);
      }
    }, t2);
  }
}
class DensityTransformNode extends DataFlowNode {
  clone() {
    return new DensityTransformNode(null, duplicate(this.transform));
  }
  constructor(parent, transform) {
    super(parent);
    this.transform = transform;
    this.transform = duplicate(transform);
    const specifiedAs = this.transform.as ?? [void 0, void 0];
    this.transform.as = [specifiedAs[0] ?? "value", specifiedAs[1] ?? "density"];
    if (transform.groupby && transform.minsteps == null && transform.maxsteps == null && transform.steps == null) {
      this.transform.steps = 200;
    }
  }
  dependentFields() {
    return /* @__PURE__ */ new Set([this.transform.density, ...this.transform.groupby ?? []]);
  }
  producedFields() {
    return new Set(this.transform.as);
  }
  hash() {
    return `DensityTransform ${hash(this.transform)}`;
  }
  assemble() {
    const { density, ...rest } = this.transform;
    const result = {
      type: "kde",
      field: density,
      ...rest
    };
    return result;
  }
}
class ExtentTransformNode extends DataFlowNode {
  clone() {
    return new ExtentTransformNode(null, duplicate(this.transform));
  }
  constructor(parent, transform) {
    super(parent);
    this.transform = transform;
    this.transform = duplicate(transform);
  }
  dependentFields() {
    return /* @__PURE__ */ new Set([this.transform.extent]);
  }
  producedFields() {
    return /* @__PURE__ */ new Set([]);
  }
  hash() {
    return `ExtentTransform ${hash(this.transform)}`;
  }
  assemble() {
    const { extent, param } = this.transform;
    const result = {
      type: "extent",
      field: extent,
      signal: param
    };
    return result;
  }
}
class FilterInvalidNode extends DataFlowNode {
  clone() {
    return new FilterInvalidNode(null, { ...this.filter });
  }
  constructor(parent, filter) {
    super(parent);
    this.filter = filter;
  }
  static make(parent, model) {
    const { config, mark, markDef } = model;
    const invalid = getMarkPropOrConfig("invalid", markDef, config);
    if (invalid !== "filter") {
      return null;
    }
    const filter = model.reduceFieldDef((aggregator, fieldDef, channel) => {
      const scaleComponent = isScaleChannel(channel) && model.getScaleComponent(channel);
      if (scaleComponent) {
        const scaleType2 = scaleComponent.get("type");
        if (hasContinuousDomain(scaleType2) && fieldDef.aggregate !== "count" && !isPathMark(mark)) {
          aggregator[fieldDef.field] = fieldDef;
        }
      }
      return aggregator;
    }, {});
    if (!keys(filter).length) {
      return null;
    }
    return new FilterInvalidNode(parent, filter);
  }
  dependentFields() {
    return new Set(keys(this.filter));
  }
  producedFields() {
    return /* @__PURE__ */ new Set();
  }
  hash() {
    return `FilterInvalid ${hash(this.filter)}`;
  }
  /**
   * Create the VgTransforms for each of the filtered fields.
   */
  assemble() {
    const filters = keys(this.filter).reduce((vegaFilters, field) => {
      const fieldDef = this.filter[field];
      const ref = vgField(fieldDef, { expr: "datum" });
      if (fieldDef !== null) {
        if (fieldDef.type === "temporal") {
          vegaFilters.push(`(isDate(${ref}) || (isValid(${ref}) && isFinite(+${ref})))`);
        } else if (fieldDef.type === "quantitative") {
          vegaFilters.push(`isValid(${ref})`);
          vegaFilters.push(`isFinite(+${ref})`);
        } else
          ;
      }
      return vegaFilters;
    }, []);
    return filters.length > 0 ? {
      type: "filter",
      expr: filters.join(" && ")
    } : null;
  }
}
class FlattenTransformNode extends DataFlowNode {
  clone() {
    return new FlattenTransformNode(this.parent, duplicate(this.transform));
  }
  constructor(parent, transform) {
    super(parent);
    this.transform = transform;
    this.transform = duplicate(transform);
    const { flatten, as = [] } = this.transform;
    this.transform.as = flatten.map((f, i) => as[i] ?? f);
  }
  dependentFields() {
    return new Set(this.transform.flatten);
  }
  producedFields() {
    return new Set(this.transform.as);
  }
  hash() {
    return `FlattenTransform ${hash(this.transform)}`;
  }
  assemble() {
    const { flatten: fields, as } = this.transform;
    const result = {
      type: "flatten",
      fields,
      as
    };
    return result;
  }
}
class FoldTransformNode extends DataFlowNode {
  clone() {
    return new FoldTransformNode(null, duplicate(this.transform));
  }
  constructor(parent, transform) {
    super(parent);
    this.transform = transform;
    this.transform = duplicate(transform);
    const specifiedAs = this.transform.as ?? [void 0, void 0];
    this.transform.as = [specifiedAs[0] ?? "key", specifiedAs[1] ?? "value"];
  }
  dependentFields() {
    return new Set(this.transform.fold);
  }
  producedFields() {
    return new Set(this.transform.as);
  }
  hash() {
    return `FoldTransform ${hash(this.transform)}`;
  }
  assemble() {
    const { fold, as } = this.transform;
    const result = {
      type: "fold",
      fields: fold,
      as
    };
    return result;
  }
}
class GeoJSONNode extends DataFlowNode {
  clone() {
    return new GeoJSONNode(null, duplicate(this.fields), this.geojson, this.signal);
  }
  static parseAll(parent, model) {
    if (model.component.projection && !model.component.projection.isFit) {
      return parent;
    }
    let geoJsonCounter = 0;
    for (const coordinates of [
      [LONGITUDE, LATITUDE],
      [LONGITUDE2, LATITUDE2]
    ]) {
      const pair = coordinates.map((channel) => {
        const def = getFieldOrDatumDef(model.encoding[channel]);
        return isFieldDef(def) ? def.field : isDatumDef(def) ? { expr: `${def.datum}` } : isValueDef(def) ? { expr: `${def["value"]}` } : void 0;
      });
      if (pair[0] || pair[1]) {
        parent = new GeoJSONNode(parent, pair, null, model.getName(`geojson_${geoJsonCounter++}`));
      }
    }
    if (model.channelHasField(SHAPE)) {
      const fieldDef = model.typedFieldDef(SHAPE);
      if (fieldDef.type === GEOJSON) {
        parent = new GeoJSONNode(parent, null, fieldDef.field, model.getName(`geojson_${geoJsonCounter++}`));
      }
    }
    return parent;
  }
  constructor(parent, fields, geojson, signal) {
    super(parent);
    this.fields = fields;
    this.geojson = geojson;
    this.signal = signal;
  }
  dependentFields() {
    const fields = (this.fields ?? []).filter(isString);
    return /* @__PURE__ */ new Set([...this.geojson ? [this.geojson] : [], ...fields]);
  }
  producedFields() {
    return /* @__PURE__ */ new Set();
  }
  hash() {
    return `GeoJSON ${this.geojson} ${this.signal} ${hash(this.fields)}`;
  }
  assemble() {
    return [
      ...this.geojson ? [
        {
          type: "filter",
          expr: `isValid(datum["${this.geojson}"])`
        }
      ] : [],
      {
        type: "geojson",
        ...this.fields ? { fields: this.fields } : {},
        ...this.geojson ? { geojson: this.geojson } : {},
        signal: this.signal
      }
    ];
  }
}
class GeoPointNode extends DataFlowNode {
  clone() {
    return new GeoPointNode(null, this.projection, duplicate(this.fields), duplicate(this.as));
  }
  constructor(parent, projection, fields, as) {
    super(parent);
    this.projection = projection;
    this.fields = fields;
    this.as = as;
  }
  static parseAll(parent, model) {
    if (!model.projectionName()) {
      return parent;
    }
    for (const coordinates of [
      [LONGITUDE, LATITUDE],
      [LONGITUDE2, LATITUDE2]
    ]) {
      const pair = coordinates.map((channel) => {
        const def = getFieldOrDatumDef(model.encoding[channel]);
        return isFieldDef(def) ? def.field : isDatumDef(def) ? { expr: `${def.datum}` } : isValueDef(def) ? { expr: `${def["value"]}` } : void 0;
      });
      const suffix = coordinates[0] === LONGITUDE2 ? "2" : "";
      if (pair[0] || pair[1]) {
        parent = new GeoPointNode(parent, model.projectionName(), pair, [
          model.getName(`x${suffix}`),
          model.getName(`y${suffix}`)
        ]);
      }
    }
    return parent;
  }
  dependentFields() {
    return new Set(this.fields.filter(isString));
  }
  producedFields() {
    return new Set(this.as);
  }
  hash() {
    return `Geopoint ${this.projection} ${hash(this.fields)} ${hash(this.as)}`;
  }
  assemble() {
    return {
      type: "geopoint",
      projection: this.projection,
      fields: this.fields,
      as: this.as
    };
  }
}
class ImputeNode extends DataFlowNode {
  clone() {
    return new ImputeNode(null, duplicate(this.transform));
  }
  constructor(parent, transform) {
    super(parent);
    this.transform = transform;
  }
  dependentFields() {
    return /* @__PURE__ */ new Set([this.transform.impute, this.transform.key, ...this.transform.groupby ?? []]);
  }
  producedFields() {
    return /* @__PURE__ */ new Set([this.transform.impute]);
  }
  processSequence(keyvals) {
    const { start = 0, stop, step } = keyvals;
    const result = [start, stop, ...step ? [step] : []].join(",");
    return { signal: `sequence(${result})` };
  }
  static makeFromTransform(parent, imputeTransform) {
    return new ImputeNode(parent, imputeTransform);
  }
  static makeFromEncoding(parent, model) {
    const encoding = model.encoding;
    const xDef = encoding.x;
    const yDef = encoding.y;
    if (isFieldDef(xDef) && isFieldDef(yDef)) {
      const imputedChannel = xDef.impute ? xDef : yDef.impute ? yDef : void 0;
      if (imputedChannel === void 0) {
        return void 0;
      }
      const keyChannel = xDef.impute ? yDef : yDef.impute ? xDef : void 0;
      const { method, value, frame, keyvals } = imputedChannel.impute;
      const groupbyFields = pathGroupingFields(model.mark, encoding);
      return new ImputeNode(parent, {
        impute: imputedChannel.field,
        key: keyChannel.field,
        ...method ? { method } : {},
        ...value !== void 0 ? { value } : {},
        ...frame ? { frame } : {},
        ...keyvals !== void 0 ? { keyvals } : {},
        ...groupbyFields.length ? { groupby: groupbyFields } : {}
      });
    }
    return null;
  }
  hash() {
    return `Impute ${hash(this.transform)}`;
  }
  assemble() {
    const { impute, key, keyvals, method, groupby, value, frame = [null, null] } = this.transform;
    const imputeTransform = {
      type: "impute",
      field: impute,
      key,
      ...keyvals ? { keyvals: isImputeSequence(keyvals) ? this.processSequence(keyvals) : keyvals } : {},
      method: "value",
      ...groupby ? { groupby } : {},
      value: !method || method === "value" ? value : null
    };
    if (method && method !== "value") {
      const deriveNewField = {
        type: "window",
        as: [`imputed_${impute}_value`],
        ops: [method],
        fields: [impute],
        frame,
        ignorePeers: false,
        ...groupby ? { groupby } : {}
      };
      const replaceOriginal = {
        type: "formula",
        expr: `datum.${impute} === null ? datum.imputed_${impute}_value : datum.${impute}`,
        as: impute
      };
      return [imputeTransform, deriveNewField, replaceOriginal];
    } else {
      return [imputeTransform];
    }
  }
}
class LoessTransformNode extends DataFlowNode {
  clone() {
    return new LoessTransformNode(null, duplicate(this.transform));
  }
  constructor(parent, transform) {
    super(parent);
    this.transform = transform;
    this.transform = duplicate(transform);
    const specifiedAs = this.transform.as ?? [void 0, void 0];
    this.transform.as = [specifiedAs[0] ?? transform.on, specifiedAs[1] ?? transform.loess];
  }
  dependentFields() {
    return /* @__PURE__ */ new Set([this.transform.loess, this.transform.on, ...this.transform.groupby ?? []]);
  }
  producedFields() {
    return new Set(this.transform.as);
  }
  hash() {
    return `LoessTransform ${hash(this.transform)}`;
  }
  assemble() {
    const { loess, on, ...rest } = this.transform;
    const result = {
      type: "loess",
      x: on,
      y: loess,
      ...rest
    };
    return result;
  }
}
class LookupNode extends DataFlowNode {
  clone() {
    return new LookupNode(null, duplicate(this.transform), this.secondary);
  }
  constructor(parent, transform, secondary) {
    super(parent);
    this.transform = transform;
    this.secondary = secondary;
  }
  static make(parent, model, transform, counter) {
    const sources = model.component.data.sources;
    const { from } = transform;
    let fromOutputNode = null;
    if (isLookupData(from)) {
      let fromSource = findSource(from.data, sources);
      if (!fromSource) {
        fromSource = new SourceNode(from.data);
        sources.push(fromSource);
      }
      const fromOutputName = model.getName(`lookup_${counter}`);
      fromOutputNode = new OutputNode(fromSource, fromOutputName, DataSourceType.Lookup, model.component.data.outputNodeRefCounts);
      model.component.data.outputNodes[fromOutputName] = fromOutputNode;
    } else if (isLookupSelection(from)) {
      const selName = from.param;
      transform = { as: selName, ...transform };
      let selCmpt;
      try {
        selCmpt = model.getSelectionComponent(varName(selName), selName);
      } catch (e2) {
        throw new Error(cannotLookupVariableParameter(selName));
      }
      fromOutputNode = selCmpt.materialized;
      if (!fromOutputNode) {
        throw new Error(noSameUnitLookup(selName));
      }
    }
    return new LookupNode(parent, transform, fromOutputNode.getSource());
  }
  dependentFields() {
    return /* @__PURE__ */ new Set([this.transform.lookup]);
  }
  producedFields() {
    return new Set(this.transform.as ? array(this.transform.as) : this.transform.from.fields);
  }
  hash() {
    return `Lookup ${hash({ transform: this.transform, secondary: this.secondary })}`;
  }
  assemble() {
    let foreign;
    if (this.transform.from.fields) {
      foreign = {
        values: this.transform.from.fields,
        ...this.transform.as ? { as: array(this.transform.as) } : {}
      };
    } else {
      let asName = this.transform.as;
      if (!isString(asName)) {
        warn(NO_FIELDS_NEEDS_AS);
        asName = "_lookup";
      }
      foreign = {
        as: [asName]
      };
    }
    return {
      type: "lookup",
      from: this.secondary,
      key: this.transform.from.key,
      fields: [this.transform.lookup],
      ...foreign,
      ...this.transform.default ? { default: this.transform.default } : {}
    };
  }
}
class QuantileTransformNode extends DataFlowNode {
  clone() {
    return new QuantileTransformNode(null, duplicate(this.transform));
  }
  constructor(parent, transform) {
    super(parent);
    this.transform = transform;
    this.transform = duplicate(transform);
    const specifiedAs = this.transform.as ?? [void 0, void 0];
    this.transform.as = [specifiedAs[0] ?? "prob", specifiedAs[1] ?? "value"];
  }
  dependentFields() {
    return /* @__PURE__ */ new Set([this.transform.quantile, ...this.transform.groupby ?? []]);
  }
  producedFields() {
    return new Set(this.transform.as);
  }
  hash() {
    return `QuantileTransform ${hash(this.transform)}`;
  }
  assemble() {
    const { quantile, ...rest } = this.transform;
    const result = {
      type: "quantile",
      field: quantile,
      ...rest
    };
    return result;
  }
}
class RegressionTransformNode extends DataFlowNode {
  clone() {
    return new RegressionTransformNode(null, duplicate(this.transform));
  }
  constructor(parent, transform) {
    super(parent);
    this.transform = transform;
    this.transform = duplicate(transform);
    const specifiedAs = this.transform.as ?? [void 0, void 0];
    this.transform.as = [specifiedAs[0] ?? transform.on, specifiedAs[1] ?? transform.regression];
  }
  dependentFields() {
    return /* @__PURE__ */ new Set([this.transform.regression, this.transform.on, ...this.transform.groupby ?? []]);
  }
  producedFields() {
    return new Set(this.transform.as);
  }
  hash() {
    return `RegressionTransform ${hash(this.transform)}`;
  }
  assemble() {
    const { regression, on, ...rest } = this.transform;
    const result = {
      type: "regression",
      x: on,
      y: regression,
      ...rest
    };
    return result;
  }
}
class PivotTransformNode extends DataFlowNode {
  clone() {
    return new PivotTransformNode(null, duplicate(this.transform));
  }
  constructor(parent, transform) {
    super(parent);
    this.transform = transform;
  }
  addDimensions(fields) {
    this.transform.groupby = unique((this.transform.groupby ?? []).concat(fields), (d) => d);
  }
  producedFields() {
    return void 0;
  }
  dependentFields() {
    return /* @__PURE__ */ new Set([this.transform.pivot, this.transform.value, ...this.transform.groupby ?? []]);
  }
  hash() {
    return `PivotTransform ${hash(this.transform)}`;
  }
  assemble() {
    const { pivot, value, groupby, limit, op } = this.transform;
    return {
      type: "pivot",
      field: pivot,
      value,
      ...limit !== void 0 ? { limit } : {},
      ...op !== void 0 ? { op } : {},
      ...groupby !== void 0 ? { groupby } : {}
    };
  }
}
class SampleTransformNode extends DataFlowNode {
  clone() {
    return new SampleTransformNode(null, duplicate(this.transform));
  }
  constructor(parent, transform) {
    super(parent);
    this.transform = transform;
  }
  dependentFields() {
    return /* @__PURE__ */ new Set();
  }
  producedFields() {
    return /* @__PURE__ */ new Set();
  }
  hash() {
    return `SampleTransform ${hash(this.transform)}`;
  }
  assemble() {
    return {
      type: "sample",
      size: this.transform.sample
    };
  }
}
function makeWalkTree(data) {
  let datasetIndex = 0;
  function walkTree(node, dataSource) {
    if (node instanceof SourceNode) {
      if (!node.isGenerator && !isUrlData(node.data)) {
        data.push(dataSource);
        const newData = {
          name: null,
          source: dataSource.name,
          transform: []
        };
        dataSource = newData;
      }
    }
    if (node instanceof ParseNode) {
      if (node.parent instanceof SourceNode && !dataSource.source) {
        dataSource.format = {
          ...dataSource.format ?? {},
          parse: node.assembleFormatParse()
        };
        dataSource.transform.push(...node.assembleTransforms(true));
      } else {
        dataSource.transform.push(...node.assembleTransforms());
      }
    }
    if (node instanceof FacetNode) {
      if (!dataSource.name) {
        dataSource.name = `data_${datasetIndex++}`;
      }
      if (!dataSource.source || dataSource.transform.length > 0) {
        data.push(dataSource);
        node.data = dataSource.name;
      } else {
        node.data = dataSource.source;
      }
      data.push(...node.assemble());
      return;
    }
    if (node instanceof GraticuleNode || node instanceof SequenceNode || node instanceof FilterInvalidNode || node instanceof FilterNode || node instanceof CalculateNode || node instanceof GeoPointNode || node instanceof AggregateNode || node instanceof LookupNode || node instanceof WindowTransformNode || node instanceof JoinAggregateTransformNode || node instanceof FoldTransformNode || node instanceof FlattenTransformNode || node instanceof DensityTransformNode || node instanceof LoessTransformNode || node instanceof QuantileTransformNode || node instanceof RegressionTransformNode || node instanceof IdentifierNode || node instanceof SampleTransformNode || node instanceof PivotTransformNode || node instanceof ExtentTransformNode) {
      dataSource.transform.push(node.assemble());
    }
    if (node instanceof BinNode || node instanceof TimeUnitNode || node instanceof ImputeNode || node instanceof StackNode || node instanceof GeoJSONNode) {
      dataSource.transform.push(...node.assemble());
    }
    if (node instanceof OutputNode) {
      if (dataSource.source && dataSource.transform.length === 0) {
        node.setSource(dataSource.source);
      } else if (node.parent instanceof OutputNode) {
        node.setSource(dataSource.name);
      } else {
        if (!dataSource.name) {
          dataSource.name = `data_${datasetIndex++}`;
        }
        node.setSource(dataSource.name);
        if (node.numChildren() === 1) {
          data.push(dataSource);
          const newData = {
            name: null,
            source: dataSource.name,
            transform: []
          };
          dataSource = newData;
        }
      }
    }
    switch (node.numChildren()) {
      case 0:
        if (node instanceof OutputNode && (!dataSource.source || dataSource.transform.length > 0)) {
          data.push(dataSource);
        }
        break;
      case 1:
        walkTree(node.children[0], dataSource);
        break;
      default: {
        if (!dataSource.name) {
          dataSource.name = `data_${datasetIndex++}`;
        }
        let source = dataSource.name;
        if (!dataSource.source || dataSource.transform.length > 0) {
          data.push(dataSource);
        } else {
          source = dataSource.source;
        }
        for (const child of node.children) {
          const newData = {
            name: null,
            source,
            transform: []
          };
          walkTree(child, newData);
        }
        break;
      }
    }
  }
  return walkTree;
}
function assembleFacetData(root) {
  const data = [];
  const walkTree = makeWalkTree(data);
  for (const child of root.children) {
    walkTree(child, {
      source: root.name,
      name: null,
      transform: []
    });
  }
  return data;
}
function assembleRootData(dataComponent, datasets) {
  const data = [];
  const walkTree = makeWalkTree(data);
  let sourceIndex = 0;
  for (const root of dataComponent.sources) {
    if (!root.hasName()) {
      root.dataName = `source_${sourceIndex++}`;
    }
    const newData = root.assemble();
    walkTree(root, newData);
  }
  for (const d of data) {
    if (d.transform.length === 0) {
      delete d.transform;
    }
  }
  let whereTo = 0;
  for (const [i, d] of data.entries()) {
    if ((d.transform ?? []).length === 0 && !d.source) {
      data.splice(whereTo++, 0, data.splice(i, 1)[0]);
    }
  }
  for (const d of data) {
    for (const t2 of d.transform ?? []) {
      if (t2.type === "lookup") {
        t2.from = dataComponent.outputNodes[t2.from].getSource();
      }
    }
  }
  for (const d of data) {
    if (d.name in datasets) {
      d.values = datasets[d.name];
    }
  }
  return data;
}
function getHeaderType(orient2) {
  if (orient2 === "top" || orient2 === "left" || isSignalRef(orient2)) {
    return "header";
  }
  return "footer";
}
function parseFacetHeaders(model) {
  for (const channel of FACET_CHANNELS) {
    parseFacetHeader(model, channel);
  }
  mergeChildAxis(model, "x");
  mergeChildAxis(model, "y");
}
function parseFacetHeader(model, channel) {
  var _a2;
  const { facet, config, child, component } = model;
  if (model.channelHasField(channel)) {
    const fieldDef = facet[channel];
    const titleConfig = getHeaderProperty("title", null, config, channel);
    let title$1 = title(fieldDef, config, {
      allowDisabling: true,
      includeDefault: titleConfig === void 0 || !!titleConfig
    });
    if (child.component.layoutHeaders[channel].title) {
      title$1 = isArray(title$1) ? title$1.join(", ") : title$1;
      title$1 += ` / ${child.component.layoutHeaders[channel].title}`;
      child.component.layoutHeaders[channel].title = null;
    }
    const labelOrient = getHeaderProperty("labelOrient", fieldDef.header, config, channel);
    const labels2 = fieldDef.header !== null ? getFirstDefined((_a2 = fieldDef.header) == null ? void 0 : _a2.labels, config.header.labels, true) : false;
    const headerType = contains(["bottom", "right"], labelOrient) ? "footer" : "header";
    component.layoutHeaders[channel] = {
      title: fieldDef.header !== null ? title$1 : null,
      facetFieldDef: fieldDef,
      [headerType]: channel === "facet" ? [] : [makeHeaderComponent(model, channel, labels2)]
    };
  }
}
function makeHeaderComponent(model, channel, labels2) {
  const sizeType = channel === "row" ? "height" : "width";
  return {
    labels: labels2,
    sizeSignal: model.child.component.layoutSize.get(sizeType) ? model.child.getSizeSignalRef(sizeType) : void 0,
    axes: []
  };
}
function mergeChildAxis(model, channel) {
  const { child } = model;
  if (child.component.axes[channel]) {
    const { layoutHeaders, resolve } = model.component;
    resolve.axis[channel] = parseGuideResolve(resolve, channel);
    if (resolve.axis[channel] === "shared") {
      const headerChannel = channel === "x" ? "column" : "row";
      const layoutHeader = layoutHeaders[headerChannel];
      for (const axisComponent of child.component.axes[channel]) {
        const headerType = getHeaderType(axisComponent.get("orient"));
        layoutHeader[headerType] ?? (layoutHeader[headerType] = [makeHeaderComponent(model, headerChannel, false)]);
        const mainAxis = assembleAxis(axisComponent, "main", model.config, { header: true });
        if (mainAxis) {
          layoutHeader[headerType][0].axes.push(mainAxis);
        }
        axisComponent.mainExtracted = true;
      }
    }
  }
}
function parseLayerLayoutSize(model) {
  parseChildrenLayoutSize(model);
  parseNonUnitLayoutSizeForChannel(model, "width");
  parseNonUnitLayoutSizeForChannel(model, "height");
}
function parseConcatLayoutSize(model) {
  parseChildrenLayoutSize(model);
  const widthType = model.layout.columns === 1 ? "width" : "childWidth";
  const heightType = model.layout.columns === void 0 ? "height" : "childHeight";
  parseNonUnitLayoutSizeForChannel(model, widthType);
  parseNonUnitLayoutSizeForChannel(model, heightType);
}
function parseChildrenLayoutSize(model) {
  for (const child of model.children) {
    child.parseLayoutSize();
  }
}
function parseNonUnitLayoutSizeForChannel(model, layoutSizeType) {
  const sizeType = getSizeTypeFromLayoutSizeType(layoutSizeType);
  const channel = getPositionScaleChannel(sizeType);
  const resolve = model.component.resolve;
  const layoutSizeCmpt = model.component.layoutSize;
  let mergedSize;
  for (const child of model.children) {
    const childSize = child.component.layoutSize.getWithExplicit(sizeType);
    const scaleResolve = resolve.scale[channel] ?? defaultScaleResolve(channel, model);
    if (scaleResolve === "independent" && childSize.value === "step") {
      mergedSize = void 0;
      break;
    }
    if (mergedSize) {
      if (scaleResolve === "independent" && mergedSize.value !== childSize.value) {
        mergedSize = void 0;
        break;
      }
      mergedSize = mergeValuesWithExplicit(mergedSize, childSize, sizeType, "");
    } else {
      mergedSize = childSize;
    }
  }
  if (mergedSize) {
    for (const child of model.children) {
      model.renameSignal(child.getName(sizeType), model.getName(layoutSizeType));
      child.component.layoutSize.set(sizeType, "merged", false);
    }
    layoutSizeCmpt.setWithExplicit(layoutSizeType, mergedSize);
  } else {
    layoutSizeCmpt.setWithExplicit(layoutSizeType, {
      explicit: false,
      value: void 0
    });
  }
}
function parseUnitLayoutSize(model) {
  const { size, component } = model;
  for (const channel of POSITION_SCALE_CHANNELS) {
    const sizeType = getSizeChannel(channel);
    if (size[sizeType]) {
      const specifiedSize = size[sizeType];
      component.layoutSize.set(sizeType, isStep(specifiedSize) ? "step" : specifiedSize, true);
    } else {
      const defaultSize2 = defaultUnitSize(model, sizeType);
      component.layoutSize.set(sizeType, defaultSize2, false);
    }
  }
}
function defaultUnitSize(model, sizeType) {
  const channel = sizeType === "width" ? "x" : "y";
  const config = model.config;
  const scaleComponent = model.getScaleComponent(channel);
  if (scaleComponent) {
    const scaleType2 = scaleComponent.get("type");
    const range2 = scaleComponent.get("range");
    if (hasDiscreteDomain(scaleType2)) {
      const size = getViewConfigDiscreteSize(config.view, sizeType);
      if (isVgRangeStep(range2) || isStep(size)) {
        return "step";
      } else {
        return size;
      }
    } else {
      return getViewConfigContinuousSize(config.view, sizeType);
    }
  } else if (model.hasProjection || model.mark === "arc") {
    return getViewConfigContinuousSize(config.view, sizeType);
  } else {
    const size = getViewConfigDiscreteSize(config.view, sizeType);
    return isStep(size) ? size.step : size;
  }
}
function facetSortFieldName(fieldDef, sort, opt) {
  return vgField(sort, { suffix: `by_${vgField(fieldDef)}`, ...opt ?? {} });
}
class FacetModel extends ModelWithField {
  constructor(spec, parent, parentGivenName, config) {
    super(spec, "facet", parent, parentGivenName, config, spec.resolve);
    this.child = buildModel(spec.spec, this, this.getName("child"), void 0, config);
    this.children = [this.child];
    this.facet = this.initFacet(spec.facet);
  }
  initFacet(facet) {
    if (!isFacetMapping(facet)) {
      return { facet: this.initFacetFieldDef(facet, "facet") };
    }
    const channels = keys(facet);
    const normalizedFacet = {};
    for (const channel of channels) {
      if (![ROW, COLUMN].includes(channel)) {
        warn(incompatibleChannel(channel, "facet"));
        break;
      }
      const fieldDef = facet[channel];
      if (fieldDef.field === void 0) {
        warn(emptyFieldDef(fieldDef, channel));
        break;
      }
      normalizedFacet[channel] = this.initFacetFieldDef(fieldDef, channel);
    }
    return normalizedFacet;
  }
  initFacetFieldDef(fieldDef, channel) {
    const facetFieldDef = initFieldDef(fieldDef, channel);
    if (facetFieldDef.header) {
      facetFieldDef.header = replaceExprRef(facetFieldDef.header);
    } else if (facetFieldDef.header === null) {
      facetFieldDef.header = null;
    }
    return facetFieldDef;
  }
  channelHasField(channel) {
    return !!this.facet[channel];
  }
  fieldDef(channel) {
    return this.facet[channel];
  }
  parseData() {
    this.component.data = parseData(this);
    this.child.parseData();
  }
  parseLayoutSize() {
    parseChildrenLayoutSize(this);
  }
  parseSelections() {
    this.child.parseSelections();
    this.component.selection = this.child.component.selection;
  }
  parseMarkGroup() {
    this.child.parseMarkGroup();
  }
  parseAxesAndHeaders() {
    this.child.parseAxesAndHeaders();
    parseFacetHeaders(this);
  }
  assembleSelectionTopLevelSignals(signals) {
    return this.child.assembleSelectionTopLevelSignals(signals);
  }
  assembleSignals() {
    this.child.assembleSignals();
    return [];
  }
  assembleSelectionData(data) {
    return this.child.assembleSelectionData(data);
  }
  getHeaderLayoutMixins() {
    const layoutMixins = {};
    for (const channel of FACET_CHANNELS) {
      for (const headerType of HEADER_TYPES) {
        const layoutHeaderComponent = this.component.layoutHeaders[channel];
        const headerComponent = layoutHeaderComponent[headerType];
        const { facetFieldDef } = layoutHeaderComponent;
        if (facetFieldDef) {
          const titleOrient = getHeaderProperty("titleOrient", facetFieldDef.header, this.config, channel);
          if (["right", "bottom"].includes(titleOrient)) {
            const headerChannel = getHeaderChannel(channel, titleOrient);
            layoutMixins.titleAnchor ?? (layoutMixins.titleAnchor = {});
            layoutMixins.titleAnchor[headerChannel] = "end";
          }
        }
        if (headerComponent == null ? void 0 : headerComponent[0]) {
          const sizeType = channel === "row" ? "height" : "width";
          const bandType = headerType === "header" ? "headerBand" : "footerBand";
          if (channel !== "facet" && !this.child.component.layoutSize.get(sizeType)) {
            layoutMixins[bandType] ?? (layoutMixins[bandType] = {});
            layoutMixins[bandType][channel] = 0.5;
          }
          if (layoutHeaderComponent.title) {
            layoutMixins.offset ?? (layoutMixins.offset = {});
            layoutMixins.offset[channel === "row" ? "rowTitle" : "columnTitle"] = 10;
          }
        }
      }
    }
    return layoutMixins;
  }
  assembleDefaultLayout() {
    const { column, row } = this.facet;
    const columns = column ? this.columnDistinctSignal() : row ? 1 : void 0;
    let align2 = "all";
    if (!row && this.component.resolve.scale.x === "independent") {
      align2 = "none";
    } else if (!column && this.component.resolve.scale.y === "independent") {
      align2 = "none";
    }
    return {
      ...this.getHeaderLayoutMixins(),
      ...columns ? { columns } : {},
      bounds: "full",
      align: align2
    };
  }
  assembleLayoutSignals() {
    return this.child.assembleLayoutSignals();
  }
  columnDistinctSignal() {
    if (this.parent && this.parent instanceof FacetModel) {
      return void 0;
    } else {
      const facetLayoutDataName = this.getName("column_domain");
      return { signal: `length(data('${facetLayoutDataName}'))` };
    }
  }
  assembleGroupStyle() {
    return void 0;
  }
  assembleGroup(signals) {
    if (this.parent && this.parent instanceof FacetModel) {
      return {
        ...this.channelHasField("column") ? {
          encode: {
            update: {
              // TODO(https://github.com/vega/vega-lite/issues/2759):
              // Correct the signal for facet of concat of facet_column
              columns: { field: vgField(this.facet.column, { prefix: "distinct" }) }
            }
          }
        } : {},
        ...super.assembleGroup(signals)
      };
    }
    return super.assembleGroup(signals);
  }
  /**
   * Aggregate cardinality for calculating size
   */
  getCardinalityAggregateForChild() {
    const fields = [];
    const ops = [];
    const as = [];
    if (this.child instanceof FacetModel) {
      if (this.child.channelHasField("column")) {
        const field = vgField(this.child.facet.column);
        fields.push(field);
        ops.push("distinct");
        as.push(`distinct_${field}`);
      }
    } else {
      for (const channel of POSITION_SCALE_CHANNELS) {
        const childScaleComponent = this.child.component.scales[channel];
        if (childScaleComponent && !childScaleComponent.merged) {
          const type2 = childScaleComponent.get("type");
          const range2 = childScaleComponent.get("range");
          if (hasDiscreteDomain(type2) && isVgRangeStep(range2)) {
            const domain2 = assembleDomain(this.child, channel);
            const field = getFieldFromDomain(domain2);
            if (field) {
              fields.push(field);
              ops.push("distinct");
              as.push(`distinct_${field}`);
            } else {
              warn(unknownField(channel));
            }
          }
        }
      }
    }
    return { fields, ops, as };
  }
  assembleFacet() {
    const { name: name2, data } = this.component.data.facetRoot;
    const { row, column } = this.facet;
    const { fields, ops, as } = this.getCardinalityAggregateForChild();
    const groupby = [];
    for (const channel of FACET_CHANNELS) {
      const fieldDef = this.facet[channel];
      if (fieldDef) {
        groupby.push(vgField(fieldDef));
        const { bin: bin2, sort } = fieldDef;
        if (isBinning(bin2)) {
          groupby.push(vgField(fieldDef, { binSuffix: "end" }));
        }
        if (isSortField(sort)) {
          const { field, op = DEFAULT_SORT_OP } = sort;
          const outputName = facetSortFieldName(fieldDef, sort);
          if (row && column) {
            fields.push(outputName);
            ops.push("max");
            as.push(outputName);
          } else {
            fields.push(field);
            ops.push(op);
            as.push(outputName);
          }
        } else if (isArray(sort)) {
          const outputName = sortArrayIndexField(fieldDef, channel);
          fields.push(outputName);
          ops.push("max");
          as.push(outputName);
        }
      }
    }
    const cross = !!row && !!column;
    return {
      name: name2,
      data,
      groupby,
      ...cross || fields.length > 0 ? {
        aggregate: {
          ...cross ? { cross } : {},
          ...fields.length ? { fields, ops, as } : {}
        }
      } : {}
    };
  }
  facetSortFields(channel) {
    const { facet } = this;
    const fieldDef = facet[channel];
    if (fieldDef) {
      if (isSortField(fieldDef.sort)) {
        return [facetSortFieldName(fieldDef, fieldDef.sort, { expr: "datum" })];
      } else if (isArray(fieldDef.sort)) {
        return [sortArrayIndexField(fieldDef, channel, { expr: "datum" })];
      }
      return [vgField(fieldDef, { expr: "datum" })];
    }
    return [];
  }
  facetSortOrder(channel) {
    const { facet } = this;
    const fieldDef = facet[channel];
    if (fieldDef) {
      const { sort } = fieldDef;
      const order = (isSortField(sort) ? sort.order : !isArray(sort) && sort) || "ascending";
      return [order];
    }
    return [];
  }
  assembleLabelTitle() {
    var _a2;
    const { facet, config } = this;
    if (facet.facet) {
      return assembleLabelTitle(facet.facet, "facet", config);
    }
    const ORTHOGONAL_ORIENT = {
      row: ["top", "bottom"],
      column: ["left", "right"]
    };
    for (const channel of HEADER_CHANNELS) {
      if (facet[channel]) {
        const labelOrient = getHeaderProperty("labelOrient", (_a2 = facet[channel]) == null ? void 0 : _a2.header, config, channel);
        if (ORTHOGONAL_ORIENT[channel].includes(labelOrient)) {
          return assembleLabelTitle(facet[channel], channel, config);
        }
      }
    }
    return void 0;
  }
  assembleMarks() {
    const { child } = this;
    const facetRoot = this.component.data.facetRoot;
    const data = assembleFacetData(facetRoot);
    const encodeEntry2 = child.assembleGroupEncodeEntry(false);
    const title2 = this.assembleLabelTitle() || child.assembleTitle();
    const style = child.assembleGroupStyle();
    const markGroup = {
      name: this.getName("cell"),
      type: "group",
      ...title2 ? { title: title2 } : {},
      ...style ? { style } : {},
      from: {
        facet: this.assembleFacet()
      },
      // TODO: move this to after data
      sort: {
        field: FACET_CHANNELS.map((c) => this.facetSortFields(c)).flat(),
        order: FACET_CHANNELS.map((c) => this.facetSortOrder(c)).flat()
      },
      ...data.length > 0 ? { data } : {},
      ...encodeEntry2 ? { encode: { update: encodeEntry2 } } : {},
      ...child.assembleGroup(assembleFacetSignals(this, []))
    };
    return [markGroup];
  }
  getMapping() {
    return this.facet;
  }
}
function makeJoinAggregateFromFacet(parent, facet) {
  const { row, column } = facet;
  if (row && column) {
    let newParent = null;
    for (const fieldDef of [row, column]) {
      if (isSortField(fieldDef.sort)) {
        const { field, op = DEFAULT_SORT_OP } = fieldDef.sort;
        parent = newParent = new JoinAggregateTransformNode(parent, {
          joinaggregate: [
            {
              op,
              field,
              as: facetSortFieldName(fieldDef, fieldDef.sort, { forAs: true })
            }
          ],
          groupby: [vgField(fieldDef)]
        });
      }
    }
    return newParent;
  }
  return null;
}
function findSource(data, sources) {
  var _a2, _b, _c2, _d2;
  for (const other of sources) {
    const otherData = other.data;
    if (data.name && other.hasName() && data.name !== other.dataName) {
      continue;
    }
    const formatMesh = (_a2 = data["format"]) == null ? void 0 : _a2.mesh;
    const otherFeature = (_b = otherData.format) == null ? void 0 : _b.feature;
    if (formatMesh && otherFeature) {
      continue;
    }
    const formatFeature = (_c2 = data["format"]) == null ? void 0 : _c2.feature;
    if ((formatFeature || otherFeature) && formatFeature !== otherFeature) {
      continue;
    }
    const otherMesh = (_d2 = otherData.format) == null ? void 0 : _d2.mesh;
    if ((formatMesh || otherMesh) && formatMesh !== otherMesh) {
      continue;
    }
    if (isInlineData(data) && isInlineData(otherData)) {
      if (deepEqual(data.values, otherData.values)) {
        return other;
      }
    } else if (isUrlData(data) && isUrlData(otherData)) {
      if (data.url === otherData.url) {
        return other;
      }
    } else if (isNamedData(data)) {
      if (data.name === other.dataName) {
        return other;
      }
    }
  }
  return null;
}
function parseRoot(model, sources) {
  if (model.data || !model.parent) {
    if (model.data === null) {
      const source = new SourceNode({ values: [] });
      sources.push(source);
      return source;
    }
    const existingSource = findSource(model.data, sources);
    if (existingSource) {
      if (!isGenerator(model.data)) {
        existingSource.data.format = mergeDeep$1({}, model.data.format, existingSource.data.format);
      }
      if (!existingSource.hasName() && model.data.name) {
        existingSource.dataName = model.data.name;
      }
      return existingSource;
    } else {
      const source = new SourceNode(model.data);
      sources.push(source);
      return source;
    }
  } else {
    return model.parent.component.data.facetRoot ? model.parent.component.data.facetRoot : model.parent.component.data.main;
  }
}
function parseTransformArray(head, model, ancestorParse) {
  let lookupCounter = 0;
  for (const t2 of model.transforms) {
    let derivedType = void 0;
    let transformNode;
    if (isCalculate(t2)) {
      transformNode = head = new CalculateNode(head, t2);
      derivedType = "derived";
    } else if (isFilter(t2)) {
      const implicit = getImplicitFromFilterTransform(t2);
      transformNode = head = ParseNode.makeWithAncestors(head, {}, implicit, ancestorParse) ?? head;
      head = new FilterNode(head, model, t2.filter);
    } else if (isBin(t2)) {
      transformNode = head = BinNode.makeFromTransform(head, t2, model);
      derivedType = "number";
    } else if (isTimeUnit(t2)) {
      derivedType = "date";
      const parsedAs = ancestorParse.getWithExplicit(t2.field);
      if (parsedAs.value === void 0) {
        head = new ParseNode(head, { [t2.field]: derivedType });
        ancestorParse.set(t2.field, derivedType, false);
      }
      transformNode = head = TimeUnitNode.makeFromTransform(head, t2);
    } else if (isAggregate(t2)) {
      transformNode = head = AggregateNode.makeFromTransform(head, t2);
      derivedType = "number";
      if (requiresSelectionId(model)) {
        head = new IdentifierNode(head);
      }
    } else if (isLookup(t2)) {
      transformNode = head = LookupNode.make(head, model, t2, lookupCounter++);
      derivedType = "derived";
    } else if (isWindow(t2)) {
      transformNode = head = new WindowTransformNode(head, t2);
      derivedType = "number";
    } else if (isJoinAggregate(t2)) {
      transformNode = head = new JoinAggregateTransformNode(head, t2);
      derivedType = "number";
    } else if (isStack(t2)) {
      transformNode = head = StackNode.makeFromTransform(head, t2);
      derivedType = "derived";
    } else if (isFold(t2)) {
      transformNode = head = new FoldTransformNode(head, t2);
      derivedType = "derived";
    } else if (isExtent(t2)) {
      transformNode = head = new ExtentTransformNode(head, t2);
      derivedType = "derived";
    } else if (isFlatten(t2)) {
      transformNode = head = new FlattenTransformNode(head, t2);
      derivedType = "derived";
    } else if (isPivot(t2)) {
      transformNode = head = new PivotTransformNode(head, t2);
      derivedType = "derived";
    } else if (isSample(t2)) {
      head = new SampleTransformNode(head, t2);
    } else if (isImpute(t2)) {
      transformNode = head = ImputeNode.makeFromTransform(head, t2);
      derivedType = "derived";
    } else if (isDensity(t2)) {
      transformNode = head = new DensityTransformNode(head, t2);
      derivedType = "derived";
    } else if (isQuantile(t2)) {
      transformNode = head = new QuantileTransformNode(head, t2);
      derivedType = "derived";
    } else if (isRegression(t2)) {
      transformNode = head = new RegressionTransformNode(head, t2);
      derivedType = "derived";
    } else if (isLoess(t2)) {
      transformNode = head = new LoessTransformNode(head, t2);
      derivedType = "derived";
    } else {
      warn(invalidTransformIgnored(t2));
      continue;
    }
    if (transformNode && derivedType !== void 0) {
      for (const field of transformNode.producedFields() ?? []) {
        ancestorParse.set(field, derivedType, false);
      }
    }
  }
  return head;
}
function parseData(model) {
  var _a2;
  let head = parseRoot(model, model.component.data.sources);
  const { outputNodes, outputNodeRefCounts } = model.component.data;
  const data = model.data;
  const newData = data && (isGenerator(data) || isUrlData(data) || isInlineData(data));
  const ancestorParse = !newData && model.parent ? model.parent.component.data.ancestorParse.clone() : new AncestorParse();
  if (isGenerator(data)) {
    if (isSequenceGenerator(data)) {
      head = new SequenceNode(head, data.sequence);
    } else if (isGraticuleGenerator(data)) {
      head = new GraticuleNode(head, data.graticule);
    }
    ancestorParse.parseNothing = true;
  } else if (((_a2 = data == null ? void 0 : data.format) == null ? void 0 : _a2.parse) === null) {
    ancestorParse.parseNothing = true;
  }
  head = ParseNode.makeExplicit(head, model, ancestorParse) ?? head;
  head = new IdentifierNode(head);
  const parentIsLayer = model.parent && isLayerModel(model.parent);
  if (isUnitModel(model) || isFacetModel(model)) {
    if (parentIsLayer) {
      head = BinNode.makeFromEncoding(head, model) ?? head;
    }
  }
  if (model.transforms.length > 0) {
    head = parseTransformArray(head, model, ancestorParse);
  }
  const implicitSelection = getImplicitFromSelection(model);
  const implicitEncoding = getImplicitFromEncoding(model);
  head = ParseNode.makeWithAncestors(head, {}, { ...implicitSelection, ...implicitEncoding }, ancestorParse) ?? head;
  if (isUnitModel(model)) {
    head = GeoJSONNode.parseAll(head, model);
    head = GeoPointNode.parseAll(head, model);
  }
  if (isUnitModel(model) || isFacetModel(model)) {
    if (!parentIsLayer) {
      head = BinNode.makeFromEncoding(head, model) ?? head;
    }
    head = TimeUnitNode.makeFromEncoding(head, model) ?? head;
    head = CalculateNode.parseAllForSortIndex(head, model);
  }
  const rawName = model.getDataName(DataSourceType.Raw);
  const raw = new OutputNode(head, rawName, DataSourceType.Raw, outputNodeRefCounts);
  outputNodes[rawName] = raw;
  head = raw;
  if (isUnitModel(model)) {
    const agg = AggregateNode.makeFromEncoding(head, model);
    if (agg) {
      head = agg;
      if (requiresSelectionId(model)) {
        head = new IdentifierNode(head);
      }
    }
    head = ImputeNode.makeFromEncoding(head, model) ?? head;
    head = StackNode.makeFromEncoding(head, model) ?? head;
  }
  if (isUnitModel(model)) {
    head = FilterInvalidNode.make(head, model) ?? head;
  }
  const mainName = model.getDataName(DataSourceType.Main);
  const main2 = new OutputNode(head, mainName, DataSourceType.Main, outputNodeRefCounts);
  outputNodes[mainName] = main2;
  head = main2;
  if (isUnitModel(model)) {
    materializeSelections(model, main2);
  }
  let facetRoot = null;
  if (isFacetModel(model)) {
    const facetName = model.getName("facet");
    head = makeJoinAggregateFromFacet(head, model.facet) ?? head;
    facetRoot = new FacetNode(head, model, facetName, main2.getSource());
    outputNodes[facetName] = facetRoot;
  }
  return {
    ...model.component.data,
    outputNodes,
    outputNodeRefCounts,
    raw,
    main: main2,
    facetRoot,
    ancestorParse
  };
}
class ConcatModel extends Model {
  constructor(spec, parent, parentGivenName, config) {
    var _a2, _b, _c2, _d2;
    super(spec, "concat", parent, parentGivenName, config, spec.resolve);
    if (((_b = (_a2 = spec.resolve) == null ? void 0 : _a2.axis) == null ? void 0 : _b.x) === "shared" || ((_d2 = (_c2 = spec.resolve) == null ? void 0 : _c2.axis) == null ? void 0 : _d2.y) === "shared") {
      warn(CONCAT_CANNOT_SHARE_AXIS);
    }
    this.children = this.getChildren(spec).map((child, i) => {
      return buildModel(child, this, this.getName(`concat_${i}`), void 0, config);
    });
  }
  parseData() {
    this.component.data = parseData(this);
    for (const child of this.children) {
      child.parseData();
    }
  }
  parseSelections() {
    this.component.selection = {};
    for (const child of this.children) {
      child.parseSelections();
      for (const key of keys(child.component.selection)) {
        this.component.selection[key] = child.component.selection[key];
      }
    }
  }
  parseMarkGroup() {
    for (const child of this.children) {
      child.parseMarkGroup();
    }
  }
  parseAxesAndHeaders() {
    for (const child of this.children) {
      child.parseAxesAndHeaders();
    }
  }
  getChildren(spec) {
    if (isVConcatSpec(spec)) {
      return spec.vconcat;
    } else if (isHConcatSpec(spec)) {
      return spec.hconcat;
    }
    return spec.concat;
  }
  parseLayoutSize() {
    parseConcatLayoutSize(this);
  }
  parseAxisGroup() {
    return null;
  }
  assembleSelectionTopLevelSignals(signals) {
    return this.children.reduce((sg, child) => child.assembleSelectionTopLevelSignals(sg), signals);
  }
  assembleSignals() {
    this.children.forEach((child) => child.assembleSignals());
    return [];
  }
  assembleLayoutSignals() {
    const layoutSignals = assembleLayoutSignals(this);
    for (const child of this.children) {
      layoutSignals.push(...child.assembleLayoutSignals());
    }
    return layoutSignals;
  }
  assembleSelectionData(data) {
    return this.children.reduce((db, child) => child.assembleSelectionData(db), data);
  }
  assembleMarks() {
    return this.children.map((child) => {
      const title2 = child.assembleTitle();
      const style = child.assembleGroupStyle();
      const encodeEntry2 = child.assembleGroupEncodeEntry(false);
      return {
        type: "group",
        name: child.getName("group"),
        ...title2 ? { title: title2 } : {},
        ...style ? { style } : {},
        ...encodeEntry2 ? { encode: { update: encodeEntry2 } } : {},
        ...child.assembleGroup()
      };
    });
  }
  assembleGroupStyle() {
    return void 0;
  }
  assembleDefaultLayout() {
    const columns = this.layout.columns;
    return {
      ...columns != null ? { columns } : {},
      bounds: "full",
      // Use align each so it can work with multiple plots with different size
      align: "each"
    };
  }
}
function isFalseOrNull(v) {
  return v === false || v === null;
}
const AXIS_COMPONENT_PROPERTIES_INDEX = {
  disable: 1,
  gridScale: 1,
  scale: 1,
  ...COMMON_AXIS_PROPERTIES_INDEX,
  labelExpr: 1,
  encode: 1
};
const AXIS_COMPONENT_PROPERTIES = keys(AXIS_COMPONENT_PROPERTIES_INDEX);
class AxisComponent extends Split {
  constructor(explicit = {}, implicit = {}, mainExtracted = false) {
    super();
    this.explicit = explicit;
    this.implicit = implicit;
    this.mainExtracted = mainExtracted;
  }
  clone() {
    return new AxisComponent(duplicate(this.explicit), duplicate(this.implicit), this.mainExtracted);
  }
  hasAxisPart(part) {
    if (part === "axis") {
      return true;
    }
    if (part === "grid" || part === "title") {
      return !!this.get(part);
    }
    return !isFalseOrNull(this.get(part));
  }
  hasOrientSignalRef() {
    return isSignalRef(this.explicit.orient);
  }
}
function labels(model, channel, specifiedLabelsSpec) {
  const { encoding, config } = model;
  const fieldOrDatumDef = getFieldOrDatumDef(encoding[channel]) ?? getFieldOrDatumDef(encoding[getSecondaryRangeChannel(channel)]);
  const axis = model.axis(channel) || {};
  const { format, formatType } = axis;
  if (isCustomFormatType(formatType)) {
    return {
      text: formatCustomType({
        fieldOrDatumDef,
        field: "datum.value",
        format,
        formatType,
        config
      }),
      ...specifiedLabelsSpec
    };
  } else if (format === void 0 && formatType === void 0 && config.customFormatTypes) {
    if (channelDefType(fieldOrDatumDef) === "quantitative") {
      if (isPositionFieldOrDatumDef(fieldOrDatumDef) && fieldOrDatumDef.stack === "normalize" && config.normalizedNumberFormatType) {
        return {
          text: formatCustomType({
            fieldOrDatumDef,
            field: "datum.value",
            format: config.normalizedNumberFormat,
            formatType: config.normalizedNumberFormatType,
            config
          }),
          ...specifiedLabelsSpec
        };
      } else if (config.numberFormatType) {
        return {
          text: formatCustomType({
            fieldOrDatumDef,
            field: "datum.value",
            format: config.numberFormat,
            formatType: config.numberFormatType,
            config
          }),
          ...specifiedLabelsSpec
        };
      }
    }
    if (channelDefType(fieldOrDatumDef) === "temporal" && config.timeFormatType && isFieldDef(fieldOrDatumDef) && !fieldOrDatumDef.timeUnit) {
      return {
        text: formatCustomType({
          fieldOrDatumDef,
          field: "datum.value",
          format: config.timeFormat,
          formatType: config.timeFormatType,
          config
        }),
        ...specifiedLabelsSpec
      };
    }
  }
  return specifiedLabelsSpec;
}
function parseUnitAxes(model) {
  return POSITION_SCALE_CHANNELS.reduce((axis, channel) => {
    if (model.component.scales[channel]) {
      axis[channel] = [parseAxis(channel, model)];
    }
    return axis;
  }, {});
}
const OPPOSITE_ORIENT = {
  bottom: "top",
  top: "bottom",
  left: "right",
  right: "left"
};
function parseLayerAxes(model) {
  const { axes, resolve } = model.component;
  const axisCount = { top: 0, bottom: 0, right: 0, left: 0 };
  for (const child of model.children) {
    child.parseAxesAndHeaders();
    for (const channel of keys(child.component.axes)) {
      resolve.axis[channel] = parseGuideResolve(model.component.resolve, channel);
      if (resolve.axis[channel] === "shared") {
        axes[channel] = mergeAxisComponents(axes[channel], child.component.axes[channel]);
        if (!axes[channel]) {
          resolve.axis[channel] = "independent";
          delete axes[channel];
        }
      }
    }
  }
  for (const channel of POSITION_SCALE_CHANNELS) {
    for (const child of model.children) {
      if (!child.component.axes[channel]) {
        continue;
      }
      if (resolve.axis[channel] === "independent") {
        axes[channel] = (axes[channel] ?? []).concat(child.component.axes[channel]);
        for (const axisComponent of child.component.axes[channel]) {
          const { value: orient2, explicit } = axisComponent.getWithExplicit("orient");
          if (isSignalRef(orient2)) {
            continue;
          }
          if (axisCount[orient2] > 0 && !explicit) {
            const oppositeOrient = OPPOSITE_ORIENT[orient2];
            if (axisCount[orient2] > axisCount[oppositeOrient]) {
              axisComponent.set("orient", oppositeOrient, false);
            }
          }
          axisCount[orient2]++;
        }
      }
      delete child.component.axes[channel];
    }
    if (resolve.axis[channel] === "independent" && axes[channel] && axes[channel].length > 1) {
      for (const [index, axisCmpt] of (axes[channel] || []).entries()) {
        if (index > 0 && !!axisCmpt.get("grid") && !axisCmpt.explicit.grid) {
          axisCmpt.implicit.grid = false;
        }
      }
    }
  }
}
function mergeAxisComponents(mergedAxisCmpts, childAxisCmpts) {
  if (mergedAxisCmpts) {
    if (mergedAxisCmpts.length !== childAxisCmpts.length) {
      return void 0;
    }
    const length = mergedAxisCmpts.length;
    for (let i = 0; i < length; i++) {
      const merged = mergedAxisCmpts[i];
      const child = childAxisCmpts[i];
      if (!!merged !== !!child) {
        return void 0;
      } else if (merged && child) {
        const mergedOrient = merged.getWithExplicit("orient");
        const childOrient = child.getWithExplicit("orient");
        if (mergedOrient.explicit && childOrient.explicit && mergedOrient.value !== childOrient.value) {
          return void 0;
        } else {
          mergedAxisCmpts[i] = mergeAxisComponent(merged, child);
        }
      }
    }
  } else {
    return childAxisCmpts.map((axisComponent) => axisComponent.clone());
  }
  return mergedAxisCmpts;
}
function mergeAxisComponent(merged, child) {
  for (const prop of AXIS_COMPONENT_PROPERTIES) {
    const mergedValueWithExplicit = mergeValuesWithExplicit(
      merged.getWithExplicit(prop),
      child.getWithExplicit(prop),
      prop,
      "axis",
      // Tie breaker function
      (v1, v2) => {
        switch (prop) {
          case "title":
            return mergeTitleComponent(v1, v2);
          case "gridScale":
            return {
              explicit: v1.explicit,
              value: getFirstDefined(v1.value, v2.value)
            };
        }
        return defaultTieBreaker(v1, v2, prop, "axis");
      }
    );
    merged.setWithExplicit(prop, mergedValueWithExplicit);
  }
  return merged;
}
function isExplicit(value, property, axis, model, channel) {
  if (property === "disable") {
    return axis !== void 0;
  }
  axis = axis || {};
  switch (property) {
    case "titleAngle":
    case "labelAngle":
      return value === (isSignalRef(axis.labelAngle) ? axis.labelAngle : normalizeAngle(axis.labelAngle));
    case "values":
      return !!axis.values;
    case "encode":
      return !!axis.encoding || !!axis.labelAngle;
    case "title":
      if (value === getFieldDefTitle(model, channel)) {
        return true;
      }
  }
  return value === axis[property];
}
const propsToAlwaysIncludeConfig = /* @__PURE__ */ new Set([
  "grid",
  "translate",
  // the rest are not axis configs in Vega, but are in VL, so we need to set too.
  "format",
  "formatType",
  "orient",
  "labelExpr",
  "tickCount",
  "position",
  "tickMinStep"
]);
function parseAxis(channel, model) {
  var _a2, _b;
  let axis = model.axis(channel);
  const axisComponent = new AxisComponent();
  const fieldOrDatumDef = getFieldOrDatumDef(model.encoding[channel]);
  const { mark, config } = model;
  const orient2 = (axis == null ? void 0 : axis.orient) || ((_a2 = config[channel === "x" ? "axisX" : "axisY"]) == null ? void 0 : _a2.orient) || ((_b = config.axis) == null ? void 0 : _b.orient) || defaultOrient(channel);
  const scaleType2 = model.getScaleComponent(channel).get("type");
  const axisConfigs = getAxisConfigs(channel, scaleType2, orient2, model.config);
  const disable = axis !== void 0 ? !axis : getAxisConfig("disable", config.style, axis == null ? void 0 : axis.style, axisConfigs).configValue;
  axisComponent.set("disable", disable, axis !== void 0);
  if (disable) {
    return axisComponent;
  }
  axis = axis || {};
  const labelAngle = getLabelAngle(fieldOrDatumDef, axis, channel, config.style, axisConfigs);
  const formatType = guideFormatType(axis.formatType, fieldOrDatumDef, scaleType2);
  const format = guideFormat(fieldOrDatumDef, fieldOrDatumDef.type, axis.format, axis.formatType, config, true);
  const ruleParams = {
    fieldOrDatumDef,
    axis,
    channel,
    model,
    scaleType: scaleType2,
    orient: orient2,
    labelAngle,
    format,
    formatType,
    mark,
    config
  };
  for (const property of AXIS_COMPONENT_PROPERTIES) {
    const value = property in axisRules ? axisRules[property](ruleParams) : isAxisProperty(property) ? axis[property] : void 0;
    const hasValue = value !== void 0;
    const explicit = isExplicit(value, property, axis, model, channel);
    if (hasValue && explicit) {
      axisComponent.set(property, value, explicit);
    } else {
      const { configValue = void 0, configFrom = void 0 } = isAxisProperty(property) && property !== "values" ? getAxisConfig(property, config.style, axis.style, axisConfigs) : {};
      const hasConfigValue = configValue !== void 0;
      if (hasValue && !hasConfigValue) {
        axisComponent.set(property, value, explicit);
      } else if (
        // Cases need implicit values
        // 1. Axis config that aren't available in Vega
        !(configFrom === "vgAxisConfig") || // 2. Certain properties are always included (see `propsToAlwaysIncludeConfig`'s declaration for more details)
        propsToAlwaysIncludeConfig.has(property) && hasConfigValue || // 3. Conditional axis values and signals
        isConditionalAxisValue(configValue) || isSignalRef(configValue)
      ) {
        axisComponent.set(property, configValue, false);
      }
    }
  }
  const axisEncoding = axis.encoding ?? {};
  const axisEncode = AXIS_PARTS.reduce((e2, part) => {
    if (!axisComponent.hasAxisPart(part)) {
      return e2;
    }
    const axisEncodingPart = guideEncodeEntry(axisEncoding[part] ?? {}, model);
    const value = part === "labels" ? labels(model, channel, axisEncodingPart) : axisEncodingPart;
    if (value !== void 0 && !isEmpty(value)) {
      e2[part] = { update: value };
    }
    return e2;
  }, {});
  if (!isEmpty(axisEncode)) {
    axisComponent.set("encode", axisEncode, !!axis.encoding || axis.labelAngle !== void 0);
  }
  return axisComponent;
}
function initLayoutSize({ encoding, size }) {
  for (const channel of POSITION_SCALE_CHANNELS) {
    const sizeType = getSizeChannel(channel);
    if (isStep(size[sizeType])) {
      if (isContinuousFieldOrDatumDef(encoding[channel])) {
        delete size[sizeType];
        warn(stepDropped(sizeType));
      }
    }
  }
  return size;
}
function initMarkdef(originalMarkDef, encoding, config) {
  const markDef = replaceExprRef(originalMarkDef);
  const specifiedOrient = getMarkPropOrConfig("orient", markDef, config);
  markDef.orient = orient(markDef.type, encoding, specifiedOrient);
  if (specifiedOrient !== void 0 && specifiedOrient !== markDef.orient) {
    warn(orientOverridden(markDef.orient, specifiedOrient));
  }
  if (markDef.type === "bar" && markDef.orient) {
    const cornerRadiusEnd = getMarkPropOrConfig("cornerRadiusEnd", markDef, config);
    if (cornerRadiusEnd !== void 0) {
      const newProps = markDef.orient === "horizontal" && encoding.x2 || markDef.orient === "vertical" && encoding.y2 ? ["cornerRadius"] : BAR_CORNER_RADIUS_INDEX[markDef.orient];
      for (const newProp of newProps) {
        markDef[newProp] = cornerRadiusEnd;
      }
      if (markDef.cornerRadiusEnd !== void 0) {
        delete markDef.cornerRadiusEnd;
      }
    }
  }
  const specifiedOpacity = getMarkPropOrConfig("opacity", markDef, config);
  if (specifiedOpacity === void 0) {
    markDef.opacity = opacity(markDef.type, encoding);
  }
  const specifiedCursor = getMarkPropOrConfig("cursor", markDef, config);
  if (specifiedCursor === void 0) {
    markDef.cursor = cursor(markDef, encoding, config);
  }
  return markDef;
}
function cursor(markDef, encoding, config) {
  if (encoding.href || markDef.href || getMarkPropOrConfig("href", markDef, config)) {
    return "pointer";
  }
  return markDef.cursor;
}
function opacity(mark, encoding) {
  if (contains([POINT, TICK, CIRCLE, SQUARE], mark)) {
    if (!isAggregate$1(encoding)) {
      return 0.7;
    }
  }
  return void 0;
}
function defaultFilled(markDef, config, { graticule }) {
  if (graticule) {
    return false;
  }
  const filledConfig = getMarkConfig("filled", markDef, config);
  const mark = markDef.type;
  return getFirstDefined(filledConfig, mark !== POINT && mark !== LINE && mark !== RULE);
}
function orient(mark, encoding, specifiedOrient) {
  switch (mark) {
    case POINT:
    case CIRCLE:
    case SQUARE:
    case TEXT:
    case RECT:
    case IMAGE:
      return void 0;
  }
  const { x, y, x2, y2 } = encoding;
  switch (mark) {
    case BAR:
      if (isFieldDef(x) && (isBinned(x.bin) || isFieldDef(y) && y.aggregate && !x.aggregate)) {
        return "vertical";
      }
      if (isFieldDef(y) && (isBinned(y.bin) || isFieldDef(x) && x.aggregate && !y.aggregate)) {
        return "horizontal";
      }
      if (y2 || x2) {
        if (specifiedOrient) {
          return specifiedOrient;
        }
        if (!x2) {
          if (isFieldDef(x) && x.type === QUANTITATIVE && !isBinning(x.bin) || isNumericDataDef(x)) {
            if (isFieldDef(y) && isBinned(y.bin)) {
              return "horizontal";
            }
          }
          return "vertical";
        }
        if (!y2) {
          if (isFieldDef(y) && y.type === QUANTITATIVE && !isBinning(y.bin) || isNumericDataDef(y)) {
            if (isFieldDef(x) && isBinned(x.bin)) {
              return "vertical";
            }
          }
          return "horizontal";
        }
      }
    case RULE:
      if (x2 && !(isFieldDef(x) && isBinned(x.bin)) && y2 && !(isFieldDef(y) && isBinned(y.bin))) {
        return void 0;
      }
    case AREA:
      if (y2) {
        if (isFieldDef(y) && isBinned(y.bin)) {
          return "horizontal";
        } else {
          return "vertical";
        }
      } else if (x2) {
        if (isFieldDef(x) && isBinned(x.bin)) {
          return "vertical";
        } else {
          return "horizontal";
        }
      } else if (mark === RULE) {
        if (x && !y) {
          return "vertical";
        } else if (y && !x) {
          return "horizontal";
        }
      }
    case LINE:
    case TICK: {
      const xIsMeasure = isUnbinnedQuantitativeFieldOrDatumDef(x);
      const yIsMeasure = isUnbinnedQuantitativeFieldOrDatumDef(y);
      if (specifiedOrient) {
        return specifiedOrient;
      } else if (xIsMeasure && !yIsMeasure) {
        return mark !== "tick" ? "horizontal" : "vertical";
      } else if (!xIsMeasure && yIsMeasure) {
        return mark !== "tick" ? "vertical" : "horizontal";
      } else if (xIsMeasure && yIsMeasure) {
        return "vertical";
      } else {
        const xIsTemporal = isTypedFieldDef(x) && x.type === TEMPORAL;
        const yIsTemporal = isTypedFieldDef(y) && y.type === TEMPORAL;
        if (xIsTemporal && !yIsTemporal) {
          return "vertical";
        } else if (!xIsTemporal && yIsTemporal) {
          return "horizontal";
        }
      }
      return void 0;
    }
  }
  return "vertical";
}
const arc = {
  vgMark: "arc",
  encodeEntry: (model) => {
    return {
      ...baseEncodeEntry(model, {
        align: "ignore",
        baseline: "ignore",
        color: "include",
        size: "ignore",
        orient: "ignore",
        theta: "ignore"
      }),
      ...pointPosition("x", model, { defaultPos: "mid" }),
      ...pointPosition("y", model, { defaultPos: "mid" }),
      // arcs are rectangles in polar coordinates
      ...rectPosition(model, "radius"),
      ...rectPosition(model, "theta")
    };
  }
};
const area = {
  vgMark: "area",
  encodeEntry: (model) => {
    return {
      ...baseEncodeEntry(model, {
        align: "ignore",
        baseline: "ignore",
        color: "include",
        orient: "include",
        size: "ignore",
        theta: "ignore"
      }),
      ...pointOrRangePosition("x", model, {
        defaultPos: "zeroOrMin",
        defaultPos2: "zeroOrMin",
        range: model.markDef.orient === "horizontal"
      }),
      ...pointOrRangePosition("y", model, {
        defaultPos: "zeroOrMin",
        defaultPos2: "zeroOrMin",
        range: model.markDef.orient === "vertical"
      }),
      ...defined(model)
    };
  }
};
const bar = {
  vgMark: "rect",
  encodeEntry: (model) => {
    return {
      ...baseEncodeEntry(model, {
        align: "ignore",
        baseline: "ignore",
        color: "include",
        orient: "ignore",
        size: "ignore",
        theta: "ignore"
      }),
      ...rectPosition(model, "x"),
      ...rectPosition(model, "y")
    };
  }
};
const geoshape = {
  vgMark: "shape",
  encodeEntry: (model) => {
    return {
      ...baseEncodeEntry(model, {
        align: "ignore",
        baseline: "ignore",
        color: "include",
        size: "ignore",
        orient: "ignore",
        theta: "ignore"
      })
    };
  },
  postEncodingTransform: (model) => {
    const { encoding } = model;
    const shapeDef = encoding.shape;
    const transform = {
      type: "geoshape",
      projection: model.projectionName(),
      // as: 'shape',
      ...shapeDef && isFieldDef(shapeDef) && shapeDef.type === GEOJSON ? { field: vgField(shapeDef, { expr: "datum" }) } : {}
    };
    return [transform];
  }
};
const image = {
  vgMark: "image",
  encodeEntry: (model) => {
    return {
      ...baseEncodeEntry(model, {
        align: "ignore",
        baseline: "ignore",
        color: "ignore",
        orient: "ignore",
        size: "ignore",
        theta: "ignore"
      }),
      ...rectPosition(model, "x"),
      ...rectPosition(model, "y"),
      ...text$1(model, "url")
    };
  }
};
const line = {
  vgMark: "line",
  encodeEntry: (model) => {
    return {
      ...baseEncodeEntry(model, {
        align: "ignore",
        baseline: "ignore",
        color: "include",
        size: "ignore",
        orient: "ignore",
        theta: "ignore"
      }),
      ...pointPosition("x", model, { defaultPos: "mid" }),
      ...pointPosition("y", model, { defaultPos: "mid" }),
      ...nonPosition("size", model, {
        vgChannel: "strokeWidth"
        // VL's line size is strokeWidth
      }),
      ...defined(model)
    };
  }
};
const trail = {
  vgMark: "trail",
  encodeEntry: (model) => {
    return {
      ...baseEncodeEntry(model, {
        align: "ignore",
        baseline: "ignore",
        color: "include",
        size: "include",
        orient: "ignore",
        theta: "ignore"
      }),
      ...pointPosition("x", model, { defaultPos: "mid" }),
      ...pointPosition("y", model, { defaultPos: "mid" }),
      ...nonPosition("size", model),
      ...defined(model)
    };
  }
};
function encodeEntry(model, fixedShape) {
  const { config } = model;
  return {
    ...baseEncodeEntry(model, {
      align: "ignore",
      baseline: "ignore",
      color: "include",
      size: "include",
      orient: "ignore",
      theta: "ignore"
    }),
    ...pointPosition("x", model, { defaultPos: "mid" }),
    ...pointPosition("y", model, { defaultPos: "mid" }),
    ...nonPosition("size", model),
    ...nonPosition("angle", model),
    ...shapeMixins(model, config, fixedShape)
  };
}
function shapeMixins(model, config, fixedShape) {
  if (fixedShape) {
    return { shape: { value: fixedShape } };
  }
  return nonPosition("shape", model);
}
const point = {
  vgMark: "symbol",
  encodeEntry: (model) => {
    return encodeEntry(model);
  }
};
const circle = {
  vgMark: "symbol",
  encodeEntry: (model) => {
    return encodeEntry(model, "circle");
  }
};
const square = {
  vgMark: "symbol",
  encodeEntry: (model) => {
    return encodeEntry(model, "square");
  }
};
const rect = {
  vgMark: "rect",
  encodeEntry: (model) => {
    return {
      ...baseEncodeEntry(model, {
        align: "ignore",
        baseline: "ignore",
        color: "include",
        orient: "ignore",
        size: "ignore",
        theta: "ignore"
      }),
      ...rectPosition(model, "x"),
      ...rectPosition(model, "y")
    };
  }
};
const rule = {
  vgMark: "rule",
  encodeEntry: (model) => {
    const { markDef } = model;
    const orient2 = markDef.orient;
    if (!model.encoding.x && !model.encoding.y && !model.encoding.latitude && !model.encoding.longitude) {
      return {};
    }
    return {
      ...baseEncodeEntry(model, {
        align: "ignore",
        baseline: "ignore",
        color: "include",
        orient: "ignore",
        size: "ignore",
        theta: "ignore"
      }),
      ...pointOrRangePosition("x", model, {
        defaultPos: orient2 === "horizontal" ? "zeroOrMax" : "mid",
        defaultPos2: "zeroOrMin",
        range: orient2 !== "vertical"
        // include x2 for horizontal or line segment rule
      }),
      ...pointOrRangePosition("y", model, {
        defaultPos: orient2 === "vertical" ? "zeroOrMax" : "mid",
        defaultPos2: "zeroOrMin",
        range: orient2 !== "horizontal"
        // include y2 for vertical or line segment rule
      }),
      ...nonPosition("size", model, {
        vgChannel: "strokeWidth"
        // VL's rule size is strokeWidth
      })
    };
  }
};
const text = {
  vgMark: "text",
  encodeEntry: (model) => {
    const { config, encoding } = model;
    return {
      ...baseEncodeEntry(model, {
        align: "include",
        baseline: "include",
        color: "include",
        size: "ignore",
        orient: "ignore",
        theta: "include"
      }),
      ...pointPosition("x", model, { defaultPos: "mid" }),
      ...pointPosition("y", model, { defaultPos: "mid" }),
      ...text$1(model),
      ...nonPosition("size", model, {
        vgChannel: "fontSize"
        // VL's text size is fontSize
      }),
      ...nonPosition("angle", model),
      ...valueIfDefined("align", align(model.markDef, encoding, config)),
      ...valueIfDefined("baseline", baseline(model.markDef, encoding, config)),
      ...pointPosition("radius", model, { defaultPos: null }),
      ...pointPosition("theta", model, { defaultPos: null })
    };
  }
};
function align(markDef, encoding, config) {
  const a = getMarkPropOrConfig("align", markDef, config);
  if (a === void 0) {
    return "center";
  }
  return void 0;
}
function baseline(markDef, encoding, config) {
  const b = getMarkPropOrConfig("baseline", markDef, config);
  if (b === void 0) {
    return "middle";
  }
  return void 0;
}
const tick = {
  vgMark: "rect",
  encodeEntry: (model) => {
    const { config, markDef } = model;
    const orient2 = markDef.orient;
    const vgSizeChannel = orient2 === "horizontal" ? "width" : "height";
    const vgThicknessChannel = orient2 === "horizontal" ? "height" : "width";
    return {
      ...baseEncodeEntry(model, {
        align: "ignore",
        baseline: "ignore",
        color: "include",
        orient: "ignore",
        size: "ignore",
        theta: "ignore"
      }),
      ...pointPosition("x", model, { defaultPos: "mid", vgChannel: "xc" }),
      ...pointPosition("y", model, { defaultPos: "mid", vgChannel: "yc" }),
      // size / thickness => width / height
      ...nonPosition("size", model, {
        defaultValue: defaultSize(model),
        vgChannel: vgSizeChannel
      }),
      [vgThicknessChannel]: signalOrValueRef(getMarkPropOrConfig("thickness", markDef, config))
    };
  }
};
function defaultSize(model) {
  const { config, markDef } = model;
  const { orient: orient2 } = markDef;
  const vgSizeChannel = orient2 === "horizontal" ? "width" : "height";
  const scale = model.getScaleComponent(orient2 === "horizontal" ? "x" : "y");
  const markPropOrConfig = getMarkPropOrConfig("size", markDef, config, { vgChannel: vgSizeChannel }) ?? config.tick.bandSize;
  if (markPropOrConfig !== void 0) {
    return markPropOrConfig;
  } else {
    const scaleRange = scale ? scale.get("range") : void 0;
    if (scaleRange && isVgRangeStep(scaleRange) && isNumber(scaleRange.step)) {
      return scaleRange.step * 3 / 4;
    }
    const defaultViewStep = getViewConfigDiscreteStep(config.view, vgSizeChannel);
    return defaultViewStep * 3 / 4;
  }
}
const markCompiler = {
  arc,
  area,
  bar,
  circle,
  geoshape,
  image,
  line,
  point,
  rect,
  rule,
  square,
  text,
  tick,
  trail
};
function parseMarkGroups(model) {
  if (contains([LINE, AREA, TRAIL], model.mark)) {
    const details = pathGroupingFields(model.mark, model.encoding);
    if (details.length > 0) {
      return getPathGroups(model, details);
    }
  } else if (model.mark === BAR) {
    const hasCornerRadius = VG_CORNERRADIUS_CHANNELS.some((prop) => getMarkPropOrConfig(prop, model.markDef, model.config));
    if (model.stack && !model.fieldDef("size") && hasCornerRadius) {
      return getGroupsForStackedBarWithCornerRadius(model);
    }
  }
  return getMarkGroup(model);
}
const FACETED_PATH_PREFIX = "faceted_path_";
function getPathGroups(model, details) {
  return [
    {
      name: model.getName("pathgroup"),
      type: "group",
      from: {
        facet: {
          name: FACETED_PATH_PREFIX + model.requestDataName(DataSourceType.Main),
          data: model.requestDataName(DataSourceType.Main),
          groupby: details
        }
      },
      encode: {
        update: {
          width: { field: { group: "width" } },
          height: { field: { group: "height" } }
        }
      },
      // With subfacet for line/area group, need to use faceted data from above.
      marks: getMarkGroup(model, { fromPrefix: FACETED_PATH_PREFIX })
    }
  ];
}
const STACK_GROUP_PREFIX = "stack_group_";
function getGroupsForStackedBarWithCornerRadius(model) {
  var _a2;
  const [mark] = getMarkGroup(model, { fromPrefix: STACK_GROUP_PREFIX });
  const fieldScale = model.scaleName(model.stack.fieldChannel);
  const stackField = (opt = {}) => model.vgField(model.stack.fieldChannel, opt);
  const stackFieldGroup = (func, expr) => {
    const vgFieldMinMax = [
      stackField({ prefix: "min", suffix: "start", expr }),
      stackField({ prefix: "max", suffix: "start", expr }),
      stackField({ prefix: "min", suffix: "end", expr }),
      stackField({ prefix: "max", suffix: "end", expr })
    ];
    return `${func}(${vgFieldMinMax.map((field) => `scale('${fieldScale}',${field})`).join(",")})`;
  };
  let groupUpdate;
  let innerGroupUpdate;
  if (model.stack.fieldChannel === "x") {
    groupUpdate = {
      ...pick(mark.encode.update, ["y", "yc", "y2", "height", ...VG_CORNERRADIUS_CHANNELS]),
      x: { signal: stackFieldGroup("min", "datum") },
      x2: { signal: stackFieldGroup("max", "datum") },
      clip: { value: true }
    };
    innerGroupUpdate = {
      x: { field: { group: "x" }, mult: -1 },
      height: { field: { group: "height" } }
    };
    mark.encode.update = {
      ...omit(mark.encode.update, ["y", "yc", "y2"]),
      height: { field: { group: "height" } }
    };
  } else {
    groupUpdate = {
      ...pick(mark.encode.update, ["x", "xc", "x2", "width"]),
      y: { signal: stackFieldGroup("min", "datum") },
      y2: { signal: stackFieldGroup("max", "datum") },
      clip: { value: true }
    };
    innerGroupUpdate = {
      y: { field: { group: "y" }, mult: -1 },
      width: { field: { group: "width" } }
    };
    mark.encode.update = {
      ...omit(mark.encode.update, ["x", "xc", "x2"]),
      width: { field: { group: "width" } }
    };
  }
  for (const key of VG_CORNERRADIUS_CHANNELS) {
    const configValue = getMarkConfig(key, model.markDef, model.config);
    if (mark.encode.update[key]) {
      groupUpdate[key] = mark.encode.update[key];
      delete mark.encode.update[key];
    } else if (configValue) {
      groupUpdate[key] = signalOrValueRef(configValue);
    }
    if (configValue) {
      mark.encode.update[key] = { value: 0 };
    }
  }
  const groupby = [];
  if (((_a2 = model.stack.groupbyChannels) == null ? void 0 : _a2.length) > 0) {
    for (const groupbyChannel of model.stack.groupbyChannels) {
      const groupByField = model.fieldDef(groupbyChannel);
      const field = vgField(groupByField);
      if (field) {
        groupby.push(field);
      }
      if ((groupByField == null ? void 0 : groupByField.bin) || (groupByField == null ? void 0 : groupByField.timeUnit)) {
        groupby.push(vgField(groupByField, { binSuffix: "end" }));
      }
    }
  }
  const strokeProperties = [
    "stroke",
    "strokeWidth",
    "strokeJoin",
    "strokeCap",
    "strokeDash",
    "strokeDashOffset",
    "strokeMiterLimit",
    "strokeOpacity"
  ];
  groupUpdate = strokeProperties.reduce((encode, prop) => {
    if (mark.encode.update[prop]) {
      return { ...encode, [prop]: mark.encode.update[prop] };
    } else {
      const configValue = getMarkConfig(prop, model.markDef, model.config);
      if (configValue !== void 0) {
        return { ...encode, [prop]: signalOrValueRef(configValue) };
      } else {
        return encode;
      }
    }
  }, groupUpdate);
  if (groupUpdate.stroke) {
    groupUpdate.strokeForeground = { value: true };
    groupUpdate.strokeOffset = { value: 0 };
  }
  return [
    {
      type: "group",
      from: {
        facet: {
          data: model.requestDataName(DataSourceType.Main),
          name: STACK_GROUP_PREFIX + model.requestDataName(DataSourceType.Main),
          groupby,
          aggregate: {
            fields: [
              stackField({ suffix: "start" }),
              stackField({ suffix: "start" }),
              stackField({ suffix: "end" }),
              stackField({ suffix: "end" })
            ],
            ops: ["min", "max", "min", "max"]
          }
        }
      },
      encode: {
        update: groupUpdate
      },
      marks: [
        {
          type: "group",
          encode: { update: innerGroupUpdate },
          marks: [mark]
        }
      ]
    }
  ];
}
function getSort(model) {
  var _a2;
  const { encoding, stack: stack2, mark, markDef, config } = model;
  const order = encoding.order;
  if (!isArray(order) && isValueDef(order) && isNullOrFalse(order.value) || !order && isNullOrFalse(getMarkPropOrConfig("order", markDef, config))) {
    return void 0;
  } else if ((isArray(order) || isFieldDef(order)) && !stack2) {
    return sortParams(order, { expr: "datum" });
  } else if (isPathMark(mark)) {
    const dimensionChannel = markDef.orient === "horizontal" ? "y" : "x";
    const dimensionChannelDef = encoding[dimensionChannel];
    if (isFieldDef(dimensionChannelDef)) {
      const s = dimensionChannelDef.sort;
      if (isArray(s)) {
        return {
          field: vgField(dimensionChannelDef, { prefix: dimensionChannel, suffix: "sort_index", expr: "datum" })
        };
      } else if (isSortField(s)) {
        return {
          field: vgField({
            // FIXME: this op might not already exist?
            // FIXME: what if dimensionChannel (x or y) contains custom domain?
            aggregate: isAggregate$1(model.encoding) ? s.op : void 0,
            field: s.field
          }, { expr: "datum" })
        };
      } else if (isSortByEncoding(s)) {
        const fieldDefToSort = model.fieldDef(s.encoding);
        return {
          field: vgField(fieldDefToSort, { expr: "datum" }),
          order: s.order
        };
      } else if (s === null) {
        return void 0;
      } else {
        return {
          field: vgField(dimensionChannelDef, {
            // For stack with imputation, we only have bin_mid
            binSuffix: ((_a2 = model.stack) == null ? void 0 : _a2.impute) ? "mid" : void 0,
            expr: "datum"
          })
        };
      }
    }
    return void 0;
  }
  return void 0;
}
function getMarkGroup(model, opt = { fromPrefix: "" }) {
  const { mark, markDef, encoding, config } = model;
  const clip = getFirstDefined(markDef.clip, scaleClip(model), projectionClip(model));
  const style = getStyles(markDef);
  const key = encoding.key;
  const sort = getSort(model);
  const interactive = interactiveFlag(model);
  const aria2 = getMarkPropOrConfig("aria", markDef, config);
  const postEncodingTransform = markCompiler[mark].postEncodingTransform ? markCompiler[mark].postEncodingTransform(model) : null;
  return [
    {
      name: model.getName("marks"),
      type: markCompiler[mark].vgMark,
      ...clip ? { clip: true } : {},
      ...style ? { style } : {},
      ...key ? { key: key.field } : {},
      ...sort ? { sort } : {},
      ...interactive ? interactive : {},
      ...aria2 === false ? { aria: aria2 } : {},
      from: { data: opt.fromPrefix + model.requestDataName(DataSourceType.Main) },
      encode: {
        update: markCompiler[mark].encodeEntry(model)
      },
      ...postEncodingTransform ? {
        transform: postEncodingTransform
      } : {}
    }
  ];
}
function scaleClip(model) {
  const xScale = model.getScaleComponent("x");
  const yScale = model.getScaleComponent("y");
  return (xScale == null ? void 0 : xScale.get("selectionExtent")) || (yScale == null ? void 0 : yScale.get("selectionExtent")) ? true : void 0;
}
function projectionClip(model) {
  const projection = model.component.projection;
  return projection && !projection.isFit ? true : void 0;
}
function interactiveFlag(model) {
  if (!model.component.selection)
    return null;
  const unitCount = keys(model.component.selection).length;
  let parentCount = unitCount;
  let parent = model.parent;
  while (parent && parentCount === 0) {
    parentCount = keys(parent.component.selection).length;
    parent = parent.parent;
  }
  return parentCount ? {
    interactive: unitCount > 0 || model.mark === "geoshape" || !!model.encoding.tooltip
  } : null;
}
class UnitModel extends ModelWithField {
  constructor(spec, parent, parentGivenName, parentGivenSize = {}, config) {
    super(spec, "unit", parent, parentGivenName, config, void 0, isFrameMixins(spec) ? spec.view : void 0);
    this.specifiedScales = {};
    this.specifiedAxes = {};
    this.specifiedLegends = {};
    this.specifiedProjection = {};
    this.selection = [];
    this.children = [];
    const markDef = isMarkDef(spec.mark) ? { ...spec.mark } : { type: spec.mark };
    const mark = markDef.type;
    if (markDef.filled === void 0) {
      markDef.filled = defaultFilled(markDef, config, {
        graticule: spec.data && isGraticuleGenerator(spec.data)
      });
    }
    const encoding = this.encoding = initEncoding(spec.encoding || {}, mark, markDef.filled, config);
    this.markDef = initMarkdef(markDef, encoding, config);
    this.size = initLayoutSize({
      encoding,
      size: isFrameMixins(spec) ? {
        ...parentGivenSize,
        ...spec.width ? { width: spec.width } : {},
        ...spec.height ? { height: spec.height } : {}
      } : parentGivenSize
    });
    this.stack = stack(this.markDef, encoding);
    this.specifiedScales = this.initScales(mark, encoding);
    this.specifiedAxes = this.initAxes(encoding);
    this.specifiedLegends = this.initLegends(encoding);
    this.specifiedProjection = spec.projection;
    this.selection = (spec.params ?? []).filter((p) => isSelectionParameter(p));
  }
  get hasProjection() {
    const { encoding } = this;
    const isGeoShapeMark = this.mark === GEOSHAPE;
    const hasGeoPosition = encoding && GEOPOSITION_CHANNELS.some((channel) => isFieldOrDatumDef(encoding[channel]));
    return isGeoShapeMark || hasGeoPosition;
  }
  /**
   * Return specified Vega-Lite scale domain for a particular channel
   * @param channel
   */
  scaleDomain(channel) {
    const scale = this.specifiedScales[channel];
    return scale ? scale.domain : void 0;
  }
  axis(channel) {
    return this.specifiedAxes[channel];
  }
  legend(channel) {
    return this.specifiedLegends[channel];
  }
  initScales(mark, encoding) {
    return SCALE_CHANNELS.reduce((scales, channel) => {
      const fieldOrDatumDef = getFieldOrDatumDef(encoding[channel]);
      if (fieldOrDatumDef) {
        scales[channel] = this.initScale(fieldOrDatumDef.scale ?? {});
      }
      return scales;
    }, {});
  }
  initScale(scale) {
    const { domain: domain2, range: range2 } = scale;
    const scaleInternal = replaceExprRef(scale);
    if (isArray(domain2)) {
      scaleInternal.domain = domain2.map(signalRefOrValue);
    }
    if (isArray(range2)) {
      scaleInternal.range = range2.map(signalRefOrValue);
    }
    return scaleInternal;
  }
  initAxes(encoding) {
    return POSITION_SCALE_CHANNELS.reduce((_axis, channel) => {
      const channelDef = encoding[channel];
      if (isFieldOrDatumDef(channelDef) || channel === X && isFieldOrDatumDef(encoding.x2) || channel === Y && isFieldOrDatumDef(encoding.y2)) {
        const axisSpec = isFieldOrDatumDef(channelDef) ? channelDef.axis : void 0;
        _axis[channel] = axisSpec ? this.initAxis({ ...axisSpec }) : axisSpec;
      }
      return _axis;
    }, {});
  }
  initAxis(axis) {
    const props = keys(axis);
    const axisInternal = {};
    for (const prop of props) {
      const val = axis[prop];
      axisInternal[prop] = isConditionalAxisValue(val) ? signalOrValueRefWithCondition(val) : signalRefOrValue(val);
    }
    return axisInternal;
  }
  initLegends(encoding) {
    return NONPOSITION_SCALE_CHANNELS.reduce((_legend, channel) => {
      const fieldOrDatumDef = getFieldOrDatumDef(encoding[channel]);
      if (fieldOrDatumDef && supportLegend(channel)) {
        const legend = fieldOrDatumDef.legend;
        _legend[channel] = legend ? replaceExprRef(legend) : legend;
      }
      return _legend;
    }, {});
  }
  parseData() {
    this.component.data = parseData(this);
  }
  parseLayoutSize() {
    parseUnitLayoutSize(this);
  }
  parseSelections() {
    this.component.selection = parseUnitSelection(this, this.selection);
  }
  parseMarkGroup() {
    this.component.mark = parseMarkGroups(this);
  }
  parseAxesAndHeaders() {
    this.component.axes = parseUnitAxes(this);
  }
  assembleSelectionTopLevelSignals(signals) {
    return assembleTopLevelSignals(this, signals);
  }
  assembleSignals() {
    return [...assembleAxisSignals(this), ...assembleUnitSelectionSignals(this, [])];
  }
  assembleSelectionData(data) {
    return assembleUnitSelectionData(this, data);
  }
  assembleLayout() {
    return null;
  }
  assembleLayoutSignals() {
    return assembleLayoutSignals(this);
  }
  assembleMarks() {
    let marks = this.component.mark ?? [];
    if (!this.parent || !isLayerModel(this.parent)) {
      marks = assembleUnitSelectionMarks(this, marks);
    }
    return marks.map(this.correctDataNames);
  }
  assembleGroupStyle() {
    const { style } = this.view || {};
    if (style !== void 0) {
      return style;
    }
    if (this.encoding.x || this.encoding.y) {
      return "cell";
    } else {
      return "view";
    }
  }
  getMapping() {
    return this.encoding;
  }
  get mark() {
    return this.markDef.type;
  }
  channelHasField(channel) {
    return channelHasField(this.encoding, channel);
  }
  fieldDef(channel) {
    const channelDef = this.encoding[channel];
    return getFieldDef(channelDef);
  }
  typedFieldDef(channel) {
    const fieldDef = this.fieldDef(channel);
    if (isTypedFieldDef(fieldDef)) {
      return fieldDef;
    }
    return null;
  }
}
class LayerModel extends Model {
  constructor(spec, parent, parentGivenName, parentGivenSize, config) {
    super(spec, "layer", parent, parentGivenName, config, spec.resolve, spec.view);
    const layoutSize = {
      ...parentGivenSize,
      ...spec.width ? { width: spec.width } : {},
      ...spec.height ? { height: spec.height } : {}
    };
    this.children = spec.layer.map((layer, i) => {
      if (isLayerSpec(layer)) {
        return new LayerModel(layer, this, this.getName(`layer_${i}`), layoutSize, config);
      } else if (isUnitSpec(layer)) {
        return new UnitModel(layer, this, this.getName(`layer_${i}`), layoutSize, config);
      }
      throw new Error(invalidSpec(layer));
    });
  }
  parseData() {
    this.component.data = parseData(this);
    for (const child of this.children) {
      child.parseData();
    }
  }
  parseLayoutSize() {
    parseLayerLayoutSize(this);
  }
  parseSelections() {
    this.component.selection = {};
    for (const child of this.children) {
      child.parseSelections();
      for (const key of keys(child.component.selection)) {
        this.component.selection[key] = child.component.selection[key];
      }
    }
  }
  parseMarkGroup() {
    for (const child of this.children) {
      child.parseMarkGroup();
    }
  }
  parseAxesAndHeaders() {
    parseLayerAxes(this);
  }
  assembleSelectionTopLevelSignals(signals) {
    return this.children.reduce((sg, child) => child.assembleSelectionTopLevelSignals(sg), signals);
  }
  // TODO: Support same named selections across children.
  assembleSignals() {
    return this.children.reduce((signals, child) => {
      return signals.concat(child.assembleSignals());
    }, assembleAxisSignals(this));
  }
  assembleLayoutSignals() {
    return this.children.reduce((signals, child) => {
      return signals.concat(child.assembleLayoutSignals());
    }, assembleLayoutSignals(this));
  }
  assembleSelectionData(data) {
    return this.children.reduce((db, child) => child.assembleSelectionData(db), data);
  }
  assembleGroupStyle() {
    const uniqueStyles = /* @__PURE__ */ new Set();
    for (const child of this.children) {
      for (const style of array(child.assembleGroupStyle())) {
        uniqueStyles.add(style);
      }
    }
    const styles = Array.from(uniqueStyles);
    return styles.length > 1 ? styles : styles.length === 1 ? styles[0] : void 0;
  }
  assembleTitle() {
    let title2 = super.assembleTitle();
    if (title2) {
      return title2;
    }
    for (const child of this.children) {
      title2 = child.assembleTitle();
      if (title2) {
        return title2;
      }
    }
    return void 0;
  }
  assembleLayout() {
    return null;
  }
  assembleMarks() {
    return assembleLayerSelectionMarks(this, this.children.flatMap((child) => {
      return child.assembleMarks();
    }));
  }
  assembleLegends() {
    return this.children.reduce((legends, child) => {
      return legends.concat(child.assembleLegends());
    }, assembleLegends(this));
  }
}
function buildModel(spec, parent, parentGivenName, unitSize, config) {
  if (isFacetSpec(spec)) {
    return new FacetModel(spec, parent, parentGivenName, config);
  } else if (isLayerSpec(spec)) {
    return new LayerModel(spec, parent, parentGivenName, unitSize, config);
  } else if (isUnitSpec(spec)) {
    return new UnitModel(spec, parent, parentGivenName, unitSize, config);
  } else if (isAnyConcatSpec(spec)) {
    return new ConcatModel(spec, parent, parentGivenName, config);
  }
  throw new Error(invalidSpec(spec));
}
function compile(inputSpec, opt = {}) {
  if (opt.logger) {
    set(opt.logger);
  }
  if (opt.fieldTitle) {
    setTitleFormatter(opt.fieldTitle);
  }
  try {
    const config = initConfig(mergeConfig(opt.config, inputSpec.config));
    const spec = normalize(inputSpec, config);
    const model = buildModel(spec, null, "", void 0, config);
    model.parse();
    optimizeDataflow(model.component.data, model);
    const vgSpec = assembleTopLevelModel(model, getTopLevelProperties(inputSpec, spec.autosize, config, model), inputSpec.datasets, inputSpec.usermeta);
    return {
      spec: vgSpec,
      normalized: spec
    };
  } finally {
    if (opt.logger) {
      reset();
    }
    if (opt.fieldTitle) {
      resetTitleFormatter();
    }
  }
}
function getTopLevelProperties(inputSpec, autosize, config, model) {
  const width = model.component.layoutSize.get("width");
  const height = model.component.layoutSize.get("height");
  if (autosize === void 0) {
    autosize = { type: "pad" };
    if (model.hasAxisOrientSignalRef()) {
      autosize.resize = true;
    }
  } else if (isString(autosize)) {
    autosize = { type: autosize };
  }
  if (width && height && isFitType(autosize.type)) {
    if (width === "step" && height === "step") {
      warn(droppingFit());
      autosize.type = "pad";
    } else if (width === "step" || height === "step") {
      const sizeType = width === "step" ? "width" : "height";
      warn(droppingFit(getPositionScaleChannel(sizeType)));
      const inverseSizeType = sizeType === "width" ? "height" : "width";
      autosize.type = getFitType(inverseSizeType);
    }
  }
  return {
    ...keys(autosize).length === 1 && autosize.type ? autosize.type === "pad" ? {} : { autosize: autosize.type } : { autosize },
    ...extractTopLevelProperties(config, false),
    ...extractTopLevelProperties(inputSpec, true)
  };
}
function assembleTopLevelModel(model, topLevelProperties, datasets = {}, usermeta) {
  const vgConfig = model.config ? stripAndRedirectConfig(model.config) : void 0;
  const data = [].concat(
    model.assembleSelectionData([]),
    // only assemble data in the root
    assembleRootData(model.component.data, datasets)
  );
  const projections = model.assembleProjections();
  const title2 = model.assembleTitle();
  const style = model.assembleGroupStyle();
  const encodeEntry2 = model.assembleGroupEncodeEntry(true);
  let layoutSignals = model.assembleLayoutSignals();
  layoutSignals = layoutSignals.filter((signal) => {
    if ((signal.name === "width" || signal.name === "height") && signal.value !== void 0) {
      topLevelProperties[signal.name] = +signal.value;
      return false;
    }
    return true;
  });
  const { params, ...otherTopLevelProps } = topLevelProperties;
  return {
    $schema: "https://vega.github.io/schema/vega/v5.json",
    ...model.description ? { description: model.description } : {},
    ...otherTopLevelProps,
    ...title2 ? { title: title2 } : {},
    ...style ? { style } : {},
    ...encodeEntry2 ? { encode: { update: encodeEntry2 } } : {},
    data,
    ...projections.length > 0 ? { projections } : {},
    ...model.assembleGroup([
      ...layoutSignals,
      ...model.assembleSelectionTopLevelSignals([]),
      ...assembleParameterSignals(params)
    ]),
    ...vgConfig ? { config: vgConfig } : {},
    ...usermeta ? { usermeta } : {}
  };
}
const version$2 = pkg$1.version;
const vegaLiteImport = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accessPathDepth,
  accessPathWithDatum,
  compile,
  contains,
  deepEqual,
  deleteNestedProperty,
  duplicate,
  entries: entries$1,
  every,
  fieldIntersection,
  flatAccessWithDatum,
  getFirstDefined,
  hasIntersection,
  hash,
  internalField,
  isBoolean,
  isEmpty,
  isEqual,
  isInternalField,
  isNullOrFalse,
  isNumeric,
  keys,
  logicalExpr,
  mergeDeep: mergeDeep$1,
  never,
  normalize,
  normalizeAngle,
  omit,
  pick,
  prefixGenerator,
  removePathFromField,
  replaceAll,
  replacePathInField,
  resetIdCounter,
  setEqual,
  some,
  stringify,
  titleCase,
  unique,
  uniqueId,
  vals,
  varName,
  version: version$2
}, Symbol.toStringTag, { value: "Module" }));
var name = "vega-themes";
var version$1 = "2.14.0";
var description = "Themes for stylized Vega and Vega-Lite visualizations.";
var keywords = ["vega", "vega-lite", "themes", "style"];
var license = "BSD-3-Clause";
var author = {
  name: "UW Interactive Data Lab",
  url: "https://idl.cs.washington.edu"
};
var contributors = [{
  name: "Emily Gu",
  url: "https://github.com/emilygu"
}, {
  name: "Arvind Satyanarayan",
  url: "http://arvindsatya.com"
}, {
  name: "Jeffrey Heer",
  url: "https://idl.cs.washington.edu"
}, {
  name: "Dominik Moritz",
  url: "https://www.domoritz.de"
}];
var main = "build/vega-themes.js";
var module = "build/vega-themes.module.js";
var unpkg = "build/vega-themes.min.js";
var jsdelivr = "build/vega-themes.min.js";
var types = "build/vega-themes.module.d.ts";
var repository = {
  type: "git",
  url: "https://github.com/vega/vega-themes.git"
};
var files = ["src", "build"];
var scripts = {
  prebuild: "yarn clean",
  build: "rollup -c",
  clean: "rimraf build && rimraf examples/build",
  "copy:data": "rsync -r node_modules/vega-datasets/data/* examples/data",
  "copy:build": "rsync -r build/* examples/build",
  "deploy:gh": "yarn build && mkdir -p examples/build && rsync -r build/* examples/build && gh-pages -d examples",
  preversion: "yarn lint",
  serve: "browser-sync start -s -f build examples --serveStatic examples",
  start: "yarn build && concurrently --kill-others -n Server,Rollup 'yarn serve' 'rollup -c -w'",
  format: "eslint . --fix",
  lint: "eslint .",
  release: "release-it"
};
var devDependencies = {
  "@babel/core": "^7.22.9",
  "@babel/plugin-proposal-async-generator-functions": "^7.20.7",
  "@babel/plugin-proposal-json-strings": "^7.18.6",
  "@babel/plugin-proposal-object-rest-spread": "^7.20.7",
  "@babel/plugin-proposal-optional-catch-binding": "^7.18.6",
  "@babel/plugin-transform-runtime": "^7.22.9",
  "@babel/preset-env": "^7.22.9",
  "@babel/preset-typescript": "^7.22.5",
  "@release-it/conventional-changelog": "^7.0.0",
  "@rollup/plugin-json": "^6.0.0",
  "@rollup/plugin-node-resolve": "^15.1.0",
  "@rollup/plugin-terser": "^0.4.3",
  "@typescript-eslint/eslint-plugin": "^6.0.0",
  "@typescript-eslint/parser": "^6.0.0",
  "browser-sync": "^2.29.3",
  concurrently: "^8.2.0",
  eslint: "^8.45.0",
  "eslint-config-prettier": "^8.8.0",
  "eslint-plugin-prettier": "^5.0.0",
  "gh-pages": "^5.0.0",
  prettier: "^3.0.0",
  "release-it": "^16.1.0",
  rollup: "^3.26.2",
  "rollup-plugin-bundle-size": "^1.0.3",
  "rollup-plugin-ts": "^3.2.0",
  typescript: "^5.1.6",
  vega: "^5.25.0",
  "vega-lite": "^5.9.3"
};
var peerDependencies = {
  vega: "*",
  "vega-lite": "*"
};
var dependencies = {};
var pkg = {
  name,
  version: version$1,
  description,
  keywords,
  license,
  author,
  contributors,
  main,
  module,
  unpkg,
  jsdelivr,
  types,
  repository,
  files,
  scripts,
  devDependencies,
  peerDependencies,
  dependencies
};
const lightColor = "#fff";
const medColor = "#888";
const darkTheme = {
  background: "#333",
  view: {
    stroke: medColor
  },
  title: {
    color: lightColor,
    subtitleColor: lightColor
  },
  style: {
    "guide-label": {
      fill: lightColor
    },
    "guide-title": {
      fill: lightColor
    }
  },
  axis: {
    domainColor: lightColor,
    gridColor: medColor,
    tickColor: lightColor
  }
};
const markColor$7 = "#4572a7";
const excelTheme = {
  background: "#fff",
  arc: {
    fill: markColor$7
  },
  area: {
    fill: markColor$7
  },
  line: {
    stroke: markColor$7,
    strokeWidth: 2
  },
  path: {
    stroke: markColor$7
  },
  rect: {
    fill: markColor$7
  },
  shape: {
    stroke: markColor$7
  },
  symbol: {
    fill: markColor$7,
    strokeWidth: 1.5,
    size: 50
  },
  axis: {
    bandPosition: 0.5,
    grid: true,
    gridColor: "#000000",
    gridOpacity: 1,
    gridWidth: 0.5,
    labelPadding: 10,
    tickSize: 5,
    tickWidth: 0.5
  },
  axisBand: {
    grid: false,
    tickExtra: true
  },
  legend: {
    labelBaseline: "middle",
    labelFontSize: 11,
    symbolSize: 50,
    symbolType: "square"
  },
  range: {
    category: ["#4572a7", "#aa4643", "#8aa453", "#71598e", "#4598ae", "#d98445", "#94aace", "#d09393", "#b9cc98", "#a99cbc"]
  }
};
const markColor$6 = "#30a2da";
const axisColor$2 = "#cbcbcb";
const guideLabelColor = "#999";
const guideTitleColor = "#333";
const backgroundColor$2 = "#f0f0f0";
const blackTitle = "#333";
const fiveThirtyEightTheme = {
  arc: {
    fill: markColor$6
  },
  area: {
    fill: markColor$6
  },
  axis: {
    domainColor: axisColor$2,
    grid: true,
    gridColor: axisColor$2,
    gridWidth: 1,
    labelColor: guideLabelColor,
    labelFontSize: 10,
    titleColor: guideTitleColor,
    tickColor: axisColor$2,
    tickSize: 10,
    titleFontSize: 14,
    titlePadding: 10,
    labelPadding: 4
  },
  axisBand: {
    grid: false
  },
  background: backgroundColor$2,
  group: {
    fill: backgroundColor$2
  },
  legend: {
    labelColor: blackTitle,
    labelFontSize: 11,
    padding: 1,
    symbolSize: 30,
    symbolType: "square",
    titleColor: blackTitle,
    titleFontSize: 14,
    titlePadding: 10
  },
  line: {
    stroke: markColor$6,
    strokeWidth: 2
  },
  path: {
    stroke: markColor$6,
    strokeWidth: 0.5
  },
  rect: {
    fill: markColor$6
  },
  range: {
    category: ["#30a2da", "#fc4f30", "#e5ae38", "#6d904f", "#8b8b8b", "#b96db8", "#ff9e27", "#56cc60", "#52d2ca", "#52689e", "#545454", "#9fe4f8"],
    diverging: ["#cc0020", "#e77866", "#f6e7e1", "#d6e8ed", "#91bfd9", "#1d78b5"],
    heatmap: ["#d6e8ed", "#cee0e5", "#91bfd9", "#549cc6", "#1d78b5"]
  },
  point: {
    filled: true,
    shape: "circle"
  },
  shape: {
    stroke: markColor$6
  },
  bar: {
    binSpacing: 2,
    fill: markColor$6,
    stroke: null
  },
  title: {
    anchor: "start",
    fontSize: 24,
    fontWeight: 600,
    offset: 20
  }
};
const markColor$5 = "#000";
const ggplot2Theme = {
  group: {
    fill: "#e5e5e5"
  },
  arc: {
    fill: markColor$5
  },
  area: {
    fill: markColor$5
  },
  line: {
    stroke: markColor$5
  },
  path: {
    stroke: markColor$5
  },
  rect: {
    fill: markColor$5
  },
  shape: {
    stroke: markColor$5
  },
  symbol: {
    fill: markColor$5,
    size: 40
  },
  axis: {
    domain: false,
    grid: true,
    gridColor: "#FFFFFF",
    gridOpacity: 1,
    labelColor: "#7F7F7F",
    labelPadding: 4,
    tickColor: "#7F7F7F",
    tickSize: 5.67,
    titleFontSize: 16,
    titleFontWeight: "normal"
  },
  legend: {
    labelBaseline: "middle",
    labelFontSize: 11,
    symbolSize: 40
  },
  range: {
    category: ["#000000", "#7F7F7F", "#1A1A1A", "#999999", "#333333", "#B0B0B0", "#4D4D4D", "#C9C9C9", "#666666", "#DCDCDC"]
  }
};
const headlineFontSize = 22;
const headlineFontWeight = "normal";
const labelFont$1 = "Benton Gothic, sans-serif";
const labelFontSize = 11.5;
const labelFontWeight = "normal";
const markColor$4 = "#82c6df";
const titleFont = "Benton Gothic Bold, sans-serif";
const titleFontWeight = "normal";
const titleFontSize$1 = 13;
const colorSchemes$1 = {
  "category-6": ["#ec8431", "#829eb1", "#c89d29", "#3580b1", "#adc839", "#ab7fb4"],
  "fire-7": ["#fbf2c7", "#f9e39c", "#f8d36e", "#f4bb6a", "#e68a4f", "#d15a40", "#ab4232"],
  "fireandice-6": ["#e68a4f", "#f4bb6a", "#f9e39c", "#dadfe2", "#a6b7c6", "#849eae"],
  "ice-7": ["#edefee", "#dadfe2", "#c4ccd2", "#a6b7c6", "#849eae", "#607785", "#47525d"]
};
const latimesTheme = {
  background: "#ffffff",
  title: {
    anchor: "start",
    color: "#000000",
    font: titleFont,
    fontSize: headlineFontSize,
    fontWeight: headlineFontWeight
  },
  arc: {
    fill: markColor$4
  },
  area: {
    fill: markColor$4
  },
  line: {
    stroke: markColor$4,
    strokeWidth: 2
  },
  path: {
    stroke: markColor$4
  },
  rect: {
    fill: markColor$4
  },
  shape: {
    stroke: markColor$4
  },
  symbol: {
    fill: markColor$4,
    size: 30
  },
  axis: {
    labelFont: labelFont$1,
    labelFontSize,
    labelFontWeight,
    titleFont,
    titleFontSize: titleFontSize$1,
    titleFontWeight
  },
  axisX: {
    labelAngle: 0,
    labelPadding: 4,
    tickSize: 3
  },
  axisY: {
    labelBaseline: "middle",
    maxExtent: 45,
    minExtent: 45,
    tickSize: 2,
    titleAlign: "left",
    titleAngle: 0,
    titleX: -45,
    titleY: -11
  },
  legend: {
    labelFont: labelFont$1,
    labelFontSize,
    symbolType: "square",
    titleFont,
    titleFontSize: titleFontSize$1,
    titleFontWeight
  },
  range: {
    category: colorSchemes$1["category-6"],
    diverging: colorSchemes$1["fireandice-6"],
    heatmap: colorSchemes$1["fire-7"],
    ordinal: colorSchemes$1["fire-7"],
    ramp: colorSchemes$1["fire-7"]
  }
};
const markColor$3 = "#ab5787";
const axisColor$1 = "#979797";
const quartzTheme = {
  background: "#f9f9f9",
  arc: {
    fill: markColor$3
  },
  area: {
    fill: markColor$3
  },
  line: {
    stroke: markColor$3
  },
  path: {
    stroke: markColor$3
  },
  rect: {
    fill: markColor$3
  },
  shape: {
    stroke: markColor$3
  },
  symbol: {
    fill: markColor$3,
    size: 30
  },
  axis: {
    domainColor: axisColor$1,
    domainWidth: 0.5,
    gridWidth: 0.2,
    labelColor: axisColor$1,
    tickColor: axisColor$1,
    tickWidth: 0.2,
    titleColor: axisColor$1
  },
  axisBand: {
    grid: false
  },
  axisX: {
    grid: true,
    tickSize: 10
  },
  axisY: {
    domain: false,
    grid: true,
    tickSize: 0
  },
  legend: {
    labelFontSize: 11,
    padding: 1,
    symbolSize: 30,
    symbolType: "square"
  },
  range: {
    category: ["#ab5787", "#51b2e5", "#703c5c", "#168dd9", "#d190b6", "#00609f", "#d365ba", "#154866", "#666666", "#c4c4c4"]
  }
};
const markColor$2 = "#3e5c69";
const voxTheme = {
  background: "#fff",
  arc: {
    fill: markColor$2
  },
  area: {
    fill: markColor$2
  },
  line: {
    stroke: markColor$2
  },
  path: {
    stroke: markColor$2
  },
  rect: {
    fill: markColor$2
  },
  shape: {
    stroke: markColor$2
  },
  symbol: {
    fill: markColor$2
  },
  axis: {
    domainWidth: 0.5,
    grid: true,
    labelPadding: 2,
    tickSize: 5,
    tickWidth: 0.5,
    titleFontWeight: "normal"
  },
  axisBand: {
    grid: false
  },
  axisX: {
    gridWidth: 0.2
  },
  axisY: {
    gridDash: [3],
    gridWidth: 0.4
  },
  legend: {
    labelFontSize: 11,
    padding: 1,
    symbolType: "square"
  },
  range: {
    category: ["#3e5c69", "#6793a6", "#182429", "#0570b0", "#3690c0", "#74a9cf", "#a6bddb", "#e2ddf2"]
  }
};
const markColor$1 = "#1696d2";
const axisColor = "#000000";
const backgroundColor$1 = "#FFFFFF";
const font = "Lato";
const labelFont = "Lato";
const sourceFont = "Lato";
const gridColor$1 = "#DEDDDD";
const titleFontSize = 18;
const colorSchemes = {
  "main-colors": ["#1696d2", "#d2d2d2", "#000000", "#fdbf11", "#ec008b", "#55b748", "#5c5859", "#db2b27"],
  "shades-blue": ["#CFE8F3", "#A2D4EC", "#73BFE2", "#46ABDB", "#1696D2", "#12719E", "#0A4C6A", "#062635"],
  "shades-gray": ["#F5F5F5", "#ECECEC", "#E3E3E3", "#DCDBDB", "#D2D2D2", "#9D9D9D", "#696969", "#353535"],
  "shades-yellow": ["#FFF2CF", "#FCE39E", "#FDD870", "#FCCB41", "#FDBF11", "#E88E2D", "#CA5800", "#843215"],
  "shades-magenta": ["#F5CBDF", "#EB99C2", "#E46AA7", "#E54096", "#EC008B", "#AF1F6B", "#761548", "#351123"],
  "shades-green": ["#DCEDD9", "#BCDEB4", "#98CF90", "#78C26D", "#55B748", "#408941", "#2C5C2D", "#1A2E19"],
  "shades-black": ["#D5D5D4", "#ADABAC", "#848081", "#5C5859", "#332D2F", "#262223", "#1A1717", "#0E0C0D"],
  "shades-red": ["#F8D5D4", "#F1AAA9", "#E9807D", "#E25552", "#DB2B27", "#A4201D", "#6E1614", "#370B0A"],
  "one-group": ["#1696d2", "#000000"],
  "two-groups-cat-1": ["#1696d2", "#000000"],
  "two-groups-cat-2": ["#1696d2", "#fdbf11"],
  "two-groups-cat-3": ["#1696d2", "#db2b27"],
  "two-groups-seq": ["#a2d4ec", "#1696d2"],
  "three-groups-cat": ["#1696d2", "#fdbf11", "#000000"],
  "three-groups-seq": ["#a2d4ec", "#1696d2", "#0a4c6a"],
  "four-groups-cat-1": ["#000000", "#d2d2d2", "#fdbf11", "#1696d2"],
  "four-groups-cat-2": ["#1696d2", "#ec0008b", "#fdbf11", "#5c5859"],
  "four-groups-seq": ["#cfe8f3", "#73bf42", "#1696d2", "#0a4c6a"],
  "five-groups-cat-1": ["#1696d2", "#fdbf11", "#d2d2d2", "#ec008b", "#000000"],
  "five-groups-cat-2": ["#1696d2", "#0a4c6a", "#d2d2d2", "#fdbf11", "#332d2f"],
  "five-groups-seq": ["#cfe8f3", "#73bf42", "#1696d2", "#0a4c6a", "#000000"],
  "six-groups-cat-1": ["#1696d2", "#ec008b", "#fdbf11", "#000000", "#d2d2d2", "#55b748"],
  "six-groups-cat-2": ["#1696d2", "#d2d2d2", "#ec008b", "#fdbf11", "#332d2f", "#0a4c6a"],
  "six-groups-seq": ["#cfe8f3", "#a2d4ec", "#73bfe2", "#46abdb", "#1696d2", "#12719e"],
  "diverging-colors": ["#ca5800", "#fdbf11", "#fdd870", "#fff2cf", "#cfe8f3", "#73bfe2", "#1696d2", "#0a4c6a"]
};
const urbanInstituteTheme = {
  background: backgroundColor$1,
  title: {
    anchor: "start",
    fontSize: titleFontSize,
    font
  },
  axisX: {
    domain: true,
    domainColor: axisColor,
    domainWidth: 1,
    grid: false,
    labelFontSize: 12,
    labelFont,
    labelAngle: 0,
    tickColor: axisColor,
    tickSize: 5,
    titleFontSize: 12,
    titlePadding: 10,
    titleFont: font
  },
  axisY: {
    domain: false,
    domainWidth: 1,
    grid: true,
    gridColor: gridColor$1,
    gridWidth: 1,
    labelFontSize: 12,
    labelFont,
    labelPadding: 8,
    ticks: false,
    titleFontSize: 12,
    titlePadding: 10,
    titleFont: font,
    titleAngle: 0,
    titleY: -10,
    titleX: 18
  },
  legend: {
    labelFontSize: 12,
    labelFont,
    symbolSize: 100,
    titleFontSize: 12,
    titlePadding: 10,
    titleFont: font,
    orient: "right",
    offset: 10
  },
  view: {
    stroke: "transparent"
  },
  range: {
    category: colorSchemes["six-groups-cat-1"],
    diverging: colorSchemes["diverging-colors"],
    heatmap: colorSchemes["diverging-colors"],
    ordinal: colorSchemes["six-groups-seq"],
    ramp: colorSchemes["shades-blue"]
  },
  area: {
    fill: markColor$1
  },
  rect: {
    fill: markColor$1
  },
  line: {
    color: markColor$1,
    stroke: markColor$1,
    strokeWidth: 5
  },
  trail: {
    color: markColor$1,
    stroke: markColor$1,
    strokeWidth: 0,
    size: 1
  },
  path: {
    stroke: markColor$1,
    strokeWidth: 0.5
  },
  point: {
    filled: true
  },
  text: {
    font: sourceFont,
    color: markColor$1,
    fontSize: 11,
    align: "center",
    fontWeight: 400,
    size: 11
  },
  style: {
    bar: {
      fill: markColor$1,
      stroke: null
    }
  },
  arc: {
    fill: markColor$1
  },
  shape: {
    stroke: markColor$1
  },
  symbol: {
    fill: markColor$1,
    size: 30
  }
};
const markColor = "#3366CC";
const gridColor = "#ccc";
const defaultFont$1 = "Arial, sans-serif";
const googlechartsTheme = {
  arc: {
    fill: markColor
  },
  area: {
    fill: markColor
  },
  path: {
    stroke: markColor
  },
  rect: {
    fill: markColor
  },
  shape: {
    stroke: markColor
  },
  symbol: {
    stroke: markColor
  },
  circle: {
    fill: markColor
  },
  background: "#fff",
  padding: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  },
  style: {
    "guide-label": {
      font: defaultFont$1,
      fontSize: 12
    },
    "guide-title": {
      font: defaultFont$1,
      fontSize: 12
    },
    "group-title": {
      font: defaultFont$1,
      fontSize: 12
    }
  },
  title: {
    font: defaultFont$1,
    fontSize: 14,
    fontWeight: "bold",
    dy: -3,
    anchor: "start"
  },
  axis: {
    gridColor,
    tickColor: gridColor,
    domain: false,
    grid: true
  },
  range: {
    category: ["#4285F4", "#DB4437", "#F4B400", "#0F9D58", "#AB47BC", "#00ACC1", "#FF7043", "#9E9D24", "#5C6BC0", "#F06292", "#00796B", "#C2185B"],
    heatmap: ["#c6dafc", "#5e97f6", "#2a56c6"]
  }
};
const ptToPx = (value) => value * (1 / 3 + 1);
const fontSmallPx = ptToPx(9);
const legendFontPx = ptToPx(10);
const fontLargePx = ptToPx(12);
const fontStandard = "Segoe UI";
const fontTitle = "wf_standard-font, helvetica, arial, sans-serif";
const firstLevelElementColor = "#252423";
const secondLevelElementColor = "#605E5C";
const backgroundColor = "transparent";
const backgroundSecondaryColor = "#C8C6C4";
const paletteColor1 = "#118DFF";
const paletteColor2 = "#12239E";
const paletteColor3 = "#E66C37";
const paletteColor4 = "#6B007B";
const paletteColor5 = "#E044A7";
const paletteColor6 = "#744EC2";
const paletteColor7 = "#D9B300";
const paletteColor8 = "#D64550";
const divergentColorMax = paletteColor1;
const divergentColorMin = "#DEEFFF";
const divergentPalette = [divergentColorMin, divergentColorMax];
const ordinalPalette = [divergentColorMin, "#c7e4ff", "#b0d9ff", "#9aceff", "#83c3ff", "#6cb9ff", "#55aeff", "#3fa3ff", "#2898ff", divergentColorMax];
const powerbiTheme = {
  view: {
    stroke: backgroundColor
  },
  background: backgroundColor,
  font: fontStandard,
  header: {
    titleFont: fontTitle,
    titleFontSize: fontLargePx,
    titleColor: firstLevelElementColor,
    labelFont: fontStandard,
    labelFontSize: legendFontPx,
    labelColor: secondLevelElementColor
  },
  axis: {
    ticks: false,
    grid: false,
    domain: false,
    labelColor: secondLevelElementColor,
    labelFontSize: fontSmallPx,
    titleFont: fontTitle,
    titleColor: firstLevelElementColor,
    titleFontSize: fontLargePx,
    titleFontWeight: "normal"
  },
  axisQuantitative: {
    tickCount: 3,
    grid: true,
    gridColor: backgroundSecondaryColor,
    gridDash: [1, 5],
    labelFlush: false
  },
  axisBand: {
    tickExtra: true
  },
  axisX: {
    labelPadding: 5
  },
  axisY: {
    labelPadding: 10
  },
  bar: {
    fill: paletteColor1
  },
  line: {
    stroke: paletteColor1,
    strokeWidth: 3,
    strokeCap: "round",
    strokeJoin: "round"
  },
  text: {
    font: fontStandard,
    fontSize: fontSmallPx,
    fill: secondLevelElementColor
  },
  arc: {
    fill: paletteColor1
  },
  area: {
    fill: paletteColor1,
    line: true,
    opacity: 0.6
  },
  path: {
    stroke: paletteColor1
  },
  rect: {
    fill: paletteColor1
  },
  point: {
    fill: paletteColor1,
    filled: true,
    size: 75
  },
  shape: {
    stroke: paletteColor1
  },
  symbol: {
    fill: paletteColor1,
    strokeWidth: 1.5,
    size: 50
  },
  legend: {
    titleFont: fontStandard,
    titleFontWeight: "bold",
    titleColor: secondLevelElementColor,
    labelFont: fontStandard,
    labelFontSize: legendFontPx,
    labelColor: secondLevelElementColor,
    symbolType: "circle",
    symbolSize: 75
  },
  range: {
    category: [paletteColor1, paletteColor2, paletteColor3, paletteColor4, paletteColor5, paletteColor6, paletteColor7, paletteColor8],
    diverging: divergentPalette,
    heatmap: divergentPalette,
    ordinal: ordinalPalette
  }
};
const defaultFont = 'IBM Plex Sans,system-ui,-apple-system,BlinkMacSystemFont,".sfnstext-regular",sans-serif';
const fontWeight = 400;
const darkCategories = ["#8a3ffc", "#33b1ff", "#007d79", "#ff7eb6", "#fa4d56", "#fff1f1", "#6fdc8c", "#4589ff", "#d12771", "#d2a106", "#08bdba", "#bae6ff", "#ba4e00", "#d4bbff"];
const lightCategories = ["#6929c4", "#1192e8", "#005d5d", "#9f1853", "#fa4d56", "#570408", "#198038", "#002d9c", "#ee538b", "#b28600", "#009d9a", "#012749", "#8a3800", "#a56eff"];
function genCarbonConfig({
  type: type2,
  background
}) {
  const viewbg = type2 === "dark" ? "#161616" : "#ffffff";
  const textColor = type2 === "dark" ? "#f4f4f4" : "#161616";
  const category = type2 === "dark" ? darkCategories : lightCategories;
  const markColor2 = type2 === "dark" ? "#d4bbff" : "#6929c4";
  return {
    background,
    arc: {
      fill: markColor2
    },
    area: {
      fill: markColor2
    },
    path: {
      stroke: markColor2
    },
    rect: {
      fill: markColor2
    },
    shape: {
      stroke: markColor2
    },
    symbol: {
      stroke: markColor2
    },
    circle: {
      fill: markColor2
    },
    view: {
      fill: viewbg,
      stroke: viewbg
    },
    group: {
      fill: viewbg
    },
    title: {
      color: textColor,
      anchor: "start",
      dy: -15,
      fontSize: 16,
      font: defaultFont,
      fontWeight: 600
    },
    axis: {
      labelColor: textColor,
      labelFontSize: 12,
      grid: true,
      gridColor: "#525252",
      titleColor: textColor,
      labelAngle: 0
    },
    style: {
      "guide-label": {
        font: defaultFont,
        fill: textColor,
        fontWeight
      },
      "guide-title": {
        font: defaultFont,
        fill: textColor,
        fontWeight
      }
    },
    range: {
      category,
      diverging: ["#750e13", "#a2191f", "#da1e28", "#fa4d56", "#ff8389", "#ffb3b8", "#ffd7d9", "#fff1f1", "#e5f6ff", "#bae6ff", "#82cfff", "#33b1ff", "#1192e8", "#0072c3", "#00539a", "#003a6d"],
      heatmap: ["#f6f2ff", "#e8daff", "#d4bbff", "#be95ff", "#a56eff", "#8a3ffc", "#6929c4", "#491d8b", "#31135e", "#1c0f30"]
    }
  };
}
const carbonwhite = genCarbonConfig({
  type: "light",
  background: "#ffffff"
});
const carbong10 = genCarbonConfig({
  type: "light",
  background: "#f4f4f4"
});
const carbong90 = genCarbonConfig({
  type: "dark",
  background: "#262626"
});
const carbong100 = genCarbonConfig({
  type: "dark",
  background: "#161616"
});
const version = pkg.version;
const themes = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  carbong10,
  carbong100,
  carbong90,
  carbonwhite,
  dark: darkTheme,
  excel: excelTheme,
  fivethirtyeight: fiveThirtyEightTheme,
  ggplot2: ggplot2Theme,
  googlecharts: googlechartsTheme,
  latimes: latimesTheme,
  powerbi: powerbiTheme,
  quartz: quartzTheme,
  urbaninstitute: urbanInstituteTheme,
  version,
  vox: voxTheme
}, Symbol.toStringTag, { value: "Module" }));
var define_process_env_default = {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var iterator;
var hasRequiredIterator;
function requireIterator() {
  if (hasRequiredIterator)
    return iterator;
  hasRequiredIterator = 1;
  iterator = function(Yallist2) {
    Yallist2.prototype[Symbol.iterator] = function* () {
      for (let walker = this.head; walker; walker = walker.next) {
        yield walker.value;
      }
    };
  };
  return iterator;
}
var yallist = Yallist$1;
Yallist$1.Node = Node;
Yallist$1.create = Yallist$1;
function Yallist$1(list) {
  var self = this;
  if (!(self instanceof Yallist$1)) {
    self = new Yallist$1();
  }
  self.tail = null;
  self.head = null;
  self.length = 0;
  if (list && typeof list.forEach === "function") {
    list.forEach(function(item) {
      self.push(item);
    });
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i]);
    }
  }
  return self;
}
Yallist$1.prototype.removeNode = function(node) {
  if (node.list !== this) {
    throw new Error("removing node which does not belong to this list");
  }
  var next = node.next;
  var prev = node.prev;
  if (next) {
    next.prev = prev;
  }
  if (prev) {
    prev.next = next;
  }
  if (node === this.head) {
    this.head = next;
  }
  if (node === this.tail) {
    this.tail = prev;
  }
  node.list.length--;
  node.next = null;
  node.prev = null;
  node.list = null;
  return next;
};
Yallist$1.prototype.unshiftNode = function(node) {
  if (node === this.head) {
    return;
  }
  if (node.list) {
    node.list.removeNode(node);
  }
  var head = this.head;
  node.list = this;
  node.next = head;
  if (head) {
    head.prev = node;
  }
  this.head = node;
  if (!this.tail) {
    this.tail = node;
  }
  this.length++;
};
Yallist$1.prototype.pushNode = function(node) {
  if (node === this.tail) {
    return;
  }
  if (node.list) {
    node.list.removeNode(node);
  }
  var tail = this.tail;
  node.list = this;
  node.prev = tail;
  if (tail) {
    tail.next = node;
  }
  this.tail = node;
  if (!this.head) {
    this.head = node;
  }
  this.length++;
};
Yallist$1.prototype.push = function() {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i]);
  }
  return this.length;
};
Yallist$1.prototype.unshift = function() {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i]);
  }
  return this.length;
};
Yallist$1.prototype.pop = function() {
  if (!this.tail) {
    return void 0;
  }
  var res = this.tail.value;
  this.tail = this.tail.prev;
  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = null;
  }
  this.length--;
  return res;
};
Yallist$1.prototype.shift = function() {
  if (!this.head) {
    return void 0;
  }
  var res = this.head.value;
  this.head = this.head.next;
  if (this.head) {
    this.head.prev = null;
  } else {
    this.tail = null;
  }
  this.length--;
  return res;
};
Yallist$1.prototype.forEach = function(fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.next;
  }
};
Yallist$1.prototype.forEachReverse = function(fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.prev;
  }
};
Yallist$1.prototype.get = function(n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    walker = walker.next;
  }
  if (i === n && walker !== null) {
    return walker.value;
  }
};
Yallist$1.prototype.getReverse = function(n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    walker = walker.prev;
  }
  if (i === n && walker !== null) {
    return walker.value;
  }
};
Yallist$1.prototype.map = function(fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist$1();
  for (var walker = this.head; walker !== null; ) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.next;
  }
  return res;
};
Yallist$1.prototype.mapReverse = function(fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist$1();
  for (var walker = this.tail; walker !== null; ) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.prev;
  }
  return res;
};
Yallist$1.prototype.reduce = function(fn, initial) {
  var acc;
  var walker = this.head;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.head) {
    walker = this.head.next;
    acc = this.head.value;
  } else {
    throw new TypeError("Reduce of empty list with no initial value");
  }
  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i);
    walker = walker.next;
  }
  return acc;
};
Yallist$1.prototype.reduceReverse = function(fn, initial) {
  var acc;
  var walker = this.tail;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.tail) {
    walker = this.tail.prev;
    acc = this.tail.value;
  } else {
    throw new TypeError("Reduce of empty list with no initial value");
  }
  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i);
    walker = walker.prev;
  }
  return acc;
};
Yallist$1.prototype.toArray = function() {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.next;
  }
  return arr;
};
Yallist$1.prototype.toArrayReverse = function() {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.prev;
  }
  return arr;
};
Yallist$1.prototype.slice = function(from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist$1();
  if (to < from || to < 0) {
    return ret;
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next;
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value);
  }
  return ret;
};
Yallist$1.prototype.sliceReverse = function(from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist$1();
  if (to < from || to < 0) {
    return ret;
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev;
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value);
  }
  return ret;
};
Yallist$1.prototype.splice = function(start, deleteCount, ...nodes) {
  if (start > this.length) {
    start = this.length - 1;
  }
  if (start < 0) {
    start = this.length + start;
  }
  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next;
  }
  var ret = [];
  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value);
    walker = this.removeNode(walker);
  }
  if (walker === null) {
    walker = this.tail;
  }
  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev;
  }
  for (var i = 0; i < nodes.length; i++) {
    walker = insert(this, walker, nodes[i]);
  }
  return ret;
};
Yallist$1.prototype.reverse = function() {
  var head = this.head;
  var tail = this.tail;
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev;
    walker.prev = walker.next;
    walker.next = p;
  }
  this.head = tail;
  this.tail = head;
  return this;
};
function insert(self, node, value) {
  var inserted = node === self.head ? new Node(value, null, node, self) : new Node(value, node, node.next, self);
  if (inserted.next === null) {
    self.tail = inserted;
  }
  if (inserted.prev === null) {
    self.head = inserted;
  }
  self.length++;
  return inserted;
}
function push(self, item) {
  self.tail = new Node(item, self.tail, null, self);
  if (!self.head) {
    self.head = self.tail;
  }
  self.length++;
}
function unshift(self, item) {
  self.head = new Node(item, null, self.head, self);
  if (!self.tail) {
    self.tail = self.head;
  }
  self.length++;
}
function Node(value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list);
  }
  this.list = list;
  this.value = value;
  if (prev) {
    prev.next = this;
    this.prev = prev;
  } else {
    this.prev = null;
  }
  if (next) {
    next.prev = this;
    this.next = next;
  } else {
    this.next = null;
  }
}
try {
  requireIterator()(Yallist$1);
} catch (er) {
}
const Yallist = yallist;
const MAX = Symbol("max");
const LENGTH = Symbol("length");
const LENGTH_CALCULATOR = Symbol("lengthCalculator");
const ALLOW_STALE = Symbol("allowStale");
const MAX_AGE = Symbol("maxAge");
const DISPOSE = Symbol("dispose");
const NO_DISPOSE_ON_SET = Symbol("noDisposeOnSet");
const LRU_LIST = Symbol("lruList");
const CACHE = Symbol("cache");
const UPDATE_AGE_ON_GET = Symbol("updateAgeOnGet");
const naiveLength = () => 1;
class LRUCache {
  constructor(options) {
    if (typeof options === "number")
      options = {
        max: options
      };
    if (!options)
      options = {};
    if (options.max && (typeof options.max !== "number" || options.max < 0))
      throw new TypeError("max must be a non-negative number");
    this[MAX] = options.max || Infinity;
    const lc = options.length || naiveLength;
    this[LENGTH_CALCULATOR] = typeof lc !== "function" ? naiveLength : lc;
    this[ALLOW_STALE] = options.stale || false;
    if (options.maxAge && typeof options.maxAge !== "number")
      throw new TypeError("maxAge must be a number");
    this[MAX_AGE] = options.maxAge || 0;
    this[DISPOSE] = options.dispose;
    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
    this.reset();
  }
  // resize the cache when the max changes.
  set max(mL) {
    if (typeof mL !== "number" || mL < 0)
      throw new TypeError("max must be a non-negative number");
    this[MAX] = mL || Infinity;
    trim(this);
  }
  get max() {
    return this[MAX];
  }
  set allowStale(allowStale) {
    this[ALLOW_STALE] = !!allowStale;
  }
  get allowStale() {
    return this[ALLOW_STALE];
  }
  set maxAge(mA) {
    if (typeof mA !== "number")
      throw new TypeError("maxAge must be a non-negative number");
    this[MAX_AGE] = mA;
    trim(this);
  }
  get maxAge() {
    return this[MAX_AGE];
  }
  // resize the cache when the lengthCalculator changes.
  set lengthCalculator(lC) {
    if (typeof lC !== "function")
      lC = naiveLength;
    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC;
      this[LENGTH] = 0;
      this[LRU_LIST].forEach((hit) => {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
        this[LENGTH] += hit.length;
      });
    }
    trim(this);
  }
  get lengthCalculator() {
    return this[LENGTH_CALCULATOR];
  }
  get length() {
    return this[LENGTH];
  }
  get itemCount() {
    return this[LRU_LIST].length;
  }
  rforEach(fn, thisp) {
    thisp = thisp || this;
    for (let walker = this[LRU_LIST].tail; walker !== null; ) {
      const prev = walker.prev;
      forEachStep(this, fn, walker, thisp);
      walker = prev;
    }
  }
  forEach(fn, thisp) {
    thisp = thisp || this;
    for (let walker = this[LRU_LIST].head; walker !== null; ) {
      const next = walker.next;
      forEachStep(this, fn, walker, thisp);
      walker = next;
    }
  }
  keys() {
    return this[LRU_LIST].toArray().map((k) => k.key);
  }
  values() {
    return this[LRU_LIST].toArray().map((k) => k.value);
  }
  reset() {
    if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
      this[LRU_LIST].forEach((hit) => this[DISPOSE](hit.key, hit.value));
    }
    this[CACHE] = /* @__PURE__ */ new Map();
    this[LRU_LIST] = new Yallist();
    this[LENGTH] = 0;
  }
  dump() {
    return this[LRU_LIST].map((hit) => isStale(this, hit) ? false : {
      k: hit.key,
      v: hit.value,
      e: hit.now + (hit.maxAge || 0)
    }).toArray().filter((h) => h);
  }
  dumpLru() {
    return this[LRU_LIST];
  }
  set(key, value, maxAge) {
    maxAge = maxAge || this[MAX_AGE];
    if (maxAge && typeof maxAge !== "number")
      throw new TypeError("maxAge must be a number");
    const now = maxAge ? Date.now() : 0;
    const len = this[LENGTH_CALCULATOR](value, key);
    if (this[CACHE].has(key)) {
      if (len > this[MAX]) {
        del(this, this[CACHE].get(key));
        return false;
      }
      const node = this[CACHE].get(key);
      const item = node.value;
      if (this[DISPOSE]) {
        if (!this[NO_DISPOSE_ON_SET])
          this[DISPOSE](key, item.value);
      }
      item.now = now;
      item.maxAge = maxAge;
      item.value = value;
      this[LENGTH] += len - item.length;
      item.length = len;
      this.get(key);
      trim(this);
      return true;
    }
    const hit = new Entry(key, value, len, now, maxAge);
    if (hit.length > this[MAX]) {
      if (this[DISPOSE])
        this[DISPOSE](key, value);
      return false;
    }
    this[LENGTH] += hit.length;
    this[LRU_LIST].unshift(hit);
    this[CACHE].set(key, this[LRU_LIST].head);
    trim(this);
    return true;
  }
  has(key) {
    if (!this[CACHE].has(key))
      return false;
    const hit = this[CACHE].get(key).value;
    return !isStale(this, hit);
  }
  get(key) {
    return get(this, key, true);
  }
  peek(key) {
    return get(this, key, false);
  }
  pop() {
    const node = this[LRU_LIST].tail;
    if (!node)
      return null;
    del(this, node);
    return node.value;
  }
  del(key) {
    del(this, this[CACHE].get(key));
  }
  load(arr) {
    this.reset();
    const now = Date.now();
    for (let l = arr.length - 1; l >= 0; l--) {
      const hit = arr[l];
      const expiresAt = hit.e || 0;
      if (expiresAt === 0)
        this.set(hit.k, hit.v);
      else {
        const maxAge = expiresAt - now;
        if (maxAge > 0) {
          this.set(hit.k, hit.v, maxAge);
        }
      }
    }
  }
  prune() {
    this[CACHE].forEach((value, key) => get(this, key, false));
  }
}
const get = (self, key, doUse) => {
  const node = self[CACHE].get(key);
  if (node) {
    const hit = node.value;
    if (isStale(self, hit)) {
      del(self, node);
      if (!self[ALLOW_STALE])
        return void 0;
    } else {
      if (doUse) {
        if (self[UPDATE_AGE_ON_GET])
          node.value.now = Date.now();
        self[LRU_LIST].unshiftNode(node);
      }
    }
    return hit.value;
  }
};
const isStale = (self, hit) => {
  if (!hit || !hit.maxAge && !self[MAX_AGE])
    return false;
  const diff = Date.now() - hit.now;
  return hit.maxAge ? diff > hit.maxAge : self[MAX_AGE] && diff > self[MAX_AGE];
};
const trim = (self) => {
  if (self[LENGTH] > self[MAX]) {
    for (let walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && walker !== null; ) {
      const prev = walker.prev;
      del(self, walker);
      walker = prev;
    }
  }
};
const del = (self, node) => {
  if (node) {
    const hit = node.value;
    if (self[DISPOSE])
      self[DISPOSE](hit.key, hit.value);
    self[LENGTH] -= hit.length;
    self[CACHE].delete(hit.key);
    self[LRU_LIST].removeNode(node);
  }
};
class Entry {
  constructor(key, value, length, now, maxAge) {
    this.key = key;
    this.value = value;
    this.length = length;
    this.now = now;
    this.maxAge = maxAge || 0;
  }
}
const forEachStep = (self, fn, node, thisp) => {
  let hit = node.value;
  if (isStale(self, hit)) {
    del(self, node);
    if (!self[ALLOW_STALE])
      hit = void 0;
  }
  if (hit)
    fn.call(thisp, hit.value, hit.key, self);
};
var lruCache = LRUCache;
const looseOption = Object.freeze({
  loose: true
});
const emptyOpts = Object.freeze({});
const parseOptions$1 = (options) => {
  if (!options) {
    return emptyOpts;
  }
  if (typeof options !== "object") {
    return looseOption;
  }
  return options;
};
var parseOptions_1 = parseOptions$1;
var re$1 = { exports: {} };
const SEMVER_SPEC_VERSION = "2.0.0";
const MAX_LENGTH$1 = 256;
const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991;
const MAX_SAFE_COMPONENT_LENGTH = 16;
const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH$1 - 6;
const RELEASE_TYPES = ["major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease"];
var constants = {
  MAX_LENGTH: MAX_LENGTH$1,
  MAX_SAFE_COMPONENT_LENGTH,
  MAX_SAFE_BUILD_LENGTH,
  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
  RELEASE_TYPES,
  SEMVER_SPEC_VERSION,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const debug$1 = typeof process === "object" && define_process_env_default && define_process_env_default.NODE_DEBUG && /\bsemver\b/i.test(define_process_env_default.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
};
var debug_1 = debug$1;
(function(module2, exports) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: MAX_SAFE_COMPONENT_LENGTH2,
    MAX_SAFE_BUILD_LENGTH: MAX_SAFE_BUILD_LENGTH2,
    MAX_LENGTH: MAX_LENGTH2
  } = constants;
  const debug2 = debug_1;
  exports = module2.exports = {};
  const re2 = exports.re = [];
  const safeRe = exports.safeRe = [];
  const src = exports.src = [];
  const t2 = exports.t = {};
  let R = 0;
  const LETTERDASHNUMBER = "[a-zA-Z0-9-]";
  const safeRegexReplacements = [["\\s", 1], ["\\d", MAX_LENGTH2], [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH2]];
  const makeSafeRegex = (value) => {
    for (const [token, max] of safeRegexReplacements) {
      value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
    }
    return value;
  };
  const createToken = (name2, value, isGlobal) => {
    const safe = makeSafeRegex(value);
    const index = R++;
    debug2(name2, index, value);
    t2[name2] = index;
    src[index] = value;
    re2[index] = new RegExp(value, isGlobal ? "g" : void 0);
    safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
  };
  createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
  createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
  createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
  createToken("MAINVERSION", `(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})`);
  createToken("MAINVERSIONLOOSE", `(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})`);
  createToken("PRERELEASEIDENTIFIER", `(?:${src[t2.NUMERICIDENTIFIER]}|${src[t2.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t2.NUMERICIDENTIFIERLOOSE]}|${src[t2.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASE", `(?:-(${src[t2.PRERELEASEIDENTIFIER]}(?:\\.${src[t2.PRERELEASEIDENTIFIER]})*))`);
  createToken("PRERELEASELOOSE", `(?:-?(${src[t2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t2.PRERELEASEIDENTIFIERLOOSE]})*))`);
  createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
  createToken("BUILD", `(?:\\+(${src[t2.BUILDIDENTIFIER]}(?:\\.${src[t2.BUILDIDENTIFIER]})*))`);
  createToken("FULLPLAIN", `v?${src[t2.MAINVERSION]}${src[t2.PRERELEASE]}?${src[t2.BUILD]}?`);
  createToken("FULL", `^${src[t2.FULLPLAIN]}$`);
  createToken("LOOSEPLAIN", `[v=\\s]*${src[t2.MAINVERSIONLOOSE]}${src[t2.PRERELEASELOOSE]}?${src[t2.BUILD]}?`);
  createToken("LOOSE", `^${src[t2.LOOSEPLAIN]}$`);
  createToken("GTLT", "((?:<|>)?=?)");
  createToken("XRANGEIDENTIFIERLOOSE", `${src[t2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
  createToken("XRANGEIDENTIFIER", `${src[t2.NUMERICIDENTIFIER]}|x|X|\\*`);
  createToken("XRANGEPLAIN", `[v=\\s]*(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:${src[t2.PRERELEASE]})?${src[t2.BUILD]}?)?)?`);
  createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:${src[t2.PRERELEASELOOSE]})?${src[t2.BUILD]}?)?)?`);
  createToken("XRANGE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAIN]}$`);
  createToken("XRANGELOOSE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH2}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?`);
  createToken("COERCE", `${src[t2.COERCEPLAIN]}(?:$|[^\\d])`);
  createToken("COERCEFULL", src[t2.COERCEPLAIN] + `(?:${src[t2.PRERELEASE]})?(?:${src[t2.BUILD]})?(?:$|[^\\d])`);
  createToken("COERCERTL", src[t2.COERCE], true);
  createToken("COERCERTLFULL", src[t2.COERCEFULL], true);
  createToken("LONETILDE", "(?:~>?)");
  createToken("TILDETRIM", `(\\s*)${src[t2.LONETILDE]}\\s+`, true);
  exports.tildeTrimReplace = "$1~";
  createToken("TILDE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAIN]}$`);
  createToken("TILDELOOSE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("LONECARET", "(?:\\^)");
  createToken("CARETTRIM", `(\\s*)${src[t2.LONECARET]}\\s+`, true);
  exports.caretTrimReplace = "$1^";
  createToken("CARET", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAIN]}$`);
  createToken("CARETLOOSE", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("COMPARATORLOOSE", `^${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]})$|^$`);
  createToken("COMPARATOR", `^${src[t2.GTLT]}\\s*(${src[t2.FULLPLAIN]})$|^$`);
  createToken("COMPARATORTRIM", `(\\s*)${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]}|${src[t2.XRANGEPLAIN]})`, true);
  exports.comparatorTrimReplace = "$1$2$3";
  createToken("HYPHENRANGE", `^\\s*(${src[t2.XRANGEPLAIN]})\\s+-\\s+(${src[t2.XRANGEPLAIN]})\\s*$`);
  createToken("HYPHENRANGELOOSE", `^\\s*(${src[t2.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t2.XRANGEPLAINLOOSE]})\\s*$`);
  createToken("STAR", "(<|>)?=?\\s*\\*");
  createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
  createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(re$1, re$1.exports);
var reExports = re$1.exports;
const numeric = /^[0-9]+$/;
const compareIdentifiers$1 = (a, b) => {
  const anum = numeric.test(a);
  const bnum = numeric.test(b);
  if (anum && bnum) {
    a = +a;
    b = +b;
  }
  return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
};
const rcompareIdentifiers = (a, b) => compareIdentifiers$1(b, a);
var identifiers = {
  compareIdentifiers: compareIdentifiers$1,
  rcompareIdentifiers
};
const debug = debug_1;
const {
  MAX_LENGTH,
  MAX_SAFE_INTEGER
} = constants;
const {
  safeRe: re,
  t
} = reExports;
const parseOptions = parseOptions_1;
const {
  compareIdentifiers
} = identifiers;
let SemVer$1 = class SemVer {
  constructor(version2, options) {
    options = parseOptions(options);
    if (version2 instanceof SemVer) {
      if (version2.loose === !!options.loose && version2.includePrerelease === !!options.includePrerelease) {
        return version2;
      } else {
        version2 = version2.version;
      }
    } else if (typeof version2 !== "string") {
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version2}".`);
    }
    if (version2.length > MAX_LENGTH) {
      throw new TypeError(`version is longer than ${MAX_LENGTH} characters`);
    }
    debug("SemVer", version2, options);
    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease;
    const m = version2.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
    if (!m) {
      throw new TypeError(`Invalid Version: ${version2}`);
    }
    this.raw = version2;
    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];
    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError("Invalid major version");
    }
    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError("Invalid minor version");
    }
    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError("Invalid patch version");
    }
    if (!m[4]) {
      this.prerelease = [];
    } else {
      this.prerelease = m[4].split(".").map((id) => {
        if (/^[0-9]+$/.test(id)) {
          const num = +id;
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num;
          }
        }
        return id;
      });
    }
    this.build = m[5] ? m[5].split(".") : [];
    this.format();
  }
  format() {
    this.version = `${this.major}.${this.minor}.${this.patch}`;
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join(".")}`;
    }
    return this.version;
  }
  toString() {
    return this.version;
  }
  compare(other) {
    debug("SemVer.compare", this.version, this.options, other);
    if (!(other instanceof SemVer)) {
      if (typeof other === "string" && other === this.version) {
        return 0;
      }
      other = new SemVer(other, this.options);
    }
    if (other.version === this.version) {
      return 0;
    }
    return this.compareMain(other) || this.comparePre(other);
  }
  compareMain(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
  }
  comparePre(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    if (this.prerelease.length && !other.prerelease.length) {
      return -1;
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1;
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0;
    }
    let i = 0;
    do {
      const a = this.prerelease[i];
      const b = other.prerelease[i];
      debug("prerelease compare", i, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }
  compareBuild(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    let i = 0;
    do {
      const a = this.build[i];
      const b = other.build[i];
      debug("prerelease compare", i, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(release, identifier, identifierBase) {
    switch (release) {
      case "premajor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc("pre", identifier, identifierBase);
        break;
      case "preminor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc("pre", identifier, identifierBase);
        break;
      case "prepatch":
        this.prerelease.length = 0;
        this.inc("patch", identifier, identifierBase);
        this.inc("pre", identifier, identifierBase);
        break;
      case "prerelease":
        if (this.prerelease.length === 0) {
          this.inc("patch", identifier, identifierBase);
        }
        this.inc("pre", identifier, identifierBase);
        break;
      case "major":
        if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
          this.major++;
        }
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break;
      case "minor":
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++;
        }
        this.patch = 0;
        this.prerelease = [];
        break;
      case "patch":
        if (this.prerelease.length === 0) {
          this.patch++;
        }
        this.prerelease = [];
        break;
      case "pre": {
        const base = Number(identifierBase) ? 1 : 0;
        if (!identifier && identifierBase === false) {
          throw new Error("invalid increment argument: identifier is empty");
        }
        if (this.prerelease.length === 0) {
          this.prerelease = [base];
        } else {
          let i = this.prerelease.length;
          while (--i >= 0) {
            if (typeof this.prerelease[i] === "number") {
              this.prerelease[i]++;
              i = -2;
            }
          }
          if (i === -1) {
            if (identifier === this.prerelease.join(".") && identifierBase === false) {
              throw new Error("invalid increment argument: identifier already exists");
            }
            this.prerelease.push(base);
          }
        }
        if (identifier) {
          let prerelease = [identifier, base];
          if (identifierBase === false) {
            prerelease = [identifier];
          }
          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = prerelease;
            }
          } else {
            this.prerelease = prerelease;
          }
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${release}`);
    }
    this.raw = this.format();
    if (this.build.length) {
      this.raw += `+${this.build.join(".")}`;
    }
    return this;
  }
};
var semver = SemVer$1;
const SemVer2 = semver;
const compare$6 = (a, b, loose) => new SemVer2(a, loose).compare(new SemVer2(b, loose));
var compare_1 = compare$6;
const compare$5 = compare_1;
const eq$1 = (a, b, loose) => compare$5(a, b, loose) === 0;
var eq_1 = eq$1;
const compare$4 = compare_1;
const neq$1 = (a, b, loose) => compare$4(a, b, loose) !== 0;
var neq_1 = neq$1;
const compare$3 = compare_1;
const gt$1 = (a, b, loose) => compare$3(a, b, loose) > 0;
var gt_1 = gt$1;
const compare$2 = compare_1;
const gte$1 = (a, b, loose) => compare$2(a, b, loose) >= 0;
var gte_1 = gte$1;
const compare$1 = compare_1;
const lt$1 = (a, b, loose) => compare$1(a, b, loose) < 0;
var lt_1 = lt$1;
const compare = compare_1;
const lte$1 = (a, b, loose) => compare(a, b, loose) <= 0;
var lte_1 = lte$1;
const eq = eq_1;
const neq = neq_1;
const gt = gt_1;
const gte = gte_1;
const lt = lt_1;
const lte = lte_1;
const cmp = (a, op, b, loose) => {
  switch (op) {
    case "===":
      if (typeof a === "object") {
        a = a.version;
      }
      if (typeof b === "object") {
        b = b.version;
      }
      return a === b;
    case "!==":
      if (typeof a === "object") {
        a = a.version;
      }
      if (typeof b === "object") {
        b = b.version;
      }
      return a !== b;
    case "":
    case "=":
    case "==":
      return eq(a, b, loose);
    case "!=":
      return neq(a, b, loose);
    case ">":
      return gt(a, b, loose);
    case ">=":
      return gte(a, b, loose);
    case "<":
      return lt(a, b, loose);
    case "<=":
      return lte(a, b, loose);
    default:
      throw new TypeError(`Invalid operator: ${op}`);
  }
};
var cmp_1 = cmp;
var comparator;
var hasRequiredComparator;
function requireComparator() {
  if (hasRequiredComparator)
    return comparator;
  hasRequiredComparator = 1;
  const ANY = Symbol("SemVer ANY");
  class Comparator {
    static get ANY() {
      return ANY;
    }
    constructor(comp, options) {
      options = parseOptions2(options);
      if (comp instanceof Comparator) {
        if (comp.loose === !!options.loose) {
          return comp;
        } else {
          comp = comp.value;
        }
      }
      comp = comp.trim().split(/\s+/).join(" ");
      debug2("comparator", comp, options);
      this.options = options;
      this.loose = !!options.loose;
      this.parse(comp);
      if (this.semver === ANY) {
        this.value = "";
      } else {
        this.value = this.operator + this.semver.version;
      }
      debug2("comp", this);
    }
    parse(comp) {
      const r = this.options.loose ? re2[t2.COMPARATORLOOSE] : re2[t2.COMPARATOR];
      const m = comp.match(r);
      if (!m) {
        throw new TypeError(`Invalid comparator: ${comp}`);
      }
      this.operator = m[1] !== void 0 ? m[1] : "";
      if (this.operator === "=") {
        this.operator = "";
      }
      if (!m[2]) {
        this.semver = ANY;
      } else {
        this.semver = new SemVer3(m[2], this.options.loose);
      }
    }
    toString() {
      return this.value;
    }
    test(version2) {
      debug2("Comparator.test", version2, this.options.loose);
      if (this.semver === ANY || version2 === ANY) {
        return true;
      }
      if (typeof version2 === "string") {
        try {
          version2 = new SemVer3(version2, this.options);
        } catch (er) {
          return false;
        }
      }
      return cmp2(version2, this.operator, this.semver, this.options);
    }
    intersects(comp, options) {
      if (!(comp instanceof Comparator)) {
        throw new TypeError("a Comparator is required");
      }
      if (this.operator === "") {
        if (this.value === "") {
          return true;
        }
        return new Range2(comp.value, options).test(this.value);
      } else if (comp.operator === "") {
        if (comp.value === "") {
          return true;
        }
        return new Range2(this.value, options).test(comp.semver);
      }
      options = parseOptions2(options);
      if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
        return false;
      }
      if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
        return false;
      }
      if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
        return true;
      }
      if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
        return true;
      }
      if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
        return true;
      }
      if (cmp2(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
        return true;
      }
      if (cmp2(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
        return true;
      }
      return false;
    }
  }
  comparator = Comparator;
  const parseOptions2 = parseOptions_1;
  const {
    safeRe: re2,
    t: t2
  } = reExports;
  const cmp2 = cmp_1;
  const debug2 = debug_1;
  const SemVer3 = semver;
  const Range2 = requireRange();
  return comparator;
}
var range;
var hasRequiredRange;
function requireRange() {
  if (hasRequiredRange)
    return range;
  hasRequiredRange = 1;
  class Range2 {
    constructor(range2, options) {
      options = parseOptions2(options);
      if (range2 instanceof Range2) {
        if (range2.loose === !!options.loose && range2.includePrerelease === !!options.includePrerelease) {
          return range2;
        } else {
          return new Range2(range2.raw, options);
        }
      }
      if (range2 instanceof Comparator) {
        this.raw = range2.value;
        this.set = [[range2]];
        this.format();
        return this;
      }
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      this.raw = range2.trim().split(/\s+/).join(" ");
      this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
      if (!this.set.length) {
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      }
      if (this.set.length > 1) {
        const first = this.set[0];
        this.set = this.set.filter((c) => !isNullSet(c[0]));
        if (this.set.length === 0) {
          this.set = [first];
        } else if (this.set.length > 1) {
          for (const c of this.set) {
            if (c.length === 1 && isAny(c[0])) {
              this.set = [c];
              break;
            }
          }
        }
      }
      this.format();
    }
    format() {
      this.range = this.set.map((comps) => comps.join(" ").trim()).join("||").trim();
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(range2) {
      const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
      const memoKey = memoOpts + ":" + range2;
      const cached = cache.get(memoKey);
      if (cached) {
        return cached;
      }
      const loose = this.options.loose;
      const hr = loose ? re2[t2.HYPHENRANGELOOSE] : re2[t2.HYPHENRANGE];
      range2 = range2.replace(hr, hyphenReplace(this.options.includePrerelease));
      debug2("hyphen replace", range2);
      range2 = range2.replace(re2[t2.COMPARATORTRIM], comparatorTrimReplace);
      debug2("comparator trim", range2);
      range2 = range2.replace(re2[t2.TILDETRIM], tildeTrimReplace);
      debug2("tilde trim", range2);
      range2 = range2.replace(re2[t2.CARETTRIM], caretTrimReplace);
      debug2("caret trim", range2);
      let rangeList = range2.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
      if (loose) {
        rangeList = rangeList.filter((comp) => {
          debug2("loose invalid filter", comp, this.options);
          return !!comp.match(re2[t2.COMPARATORLOOSE]);
        });
      }
      debug2("range list", rangeList);
      const rangeMap = /* @__PURE__ */ new Map();
      const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
      for (const comp of comparators) {
        if (isNullSet(comp)) {
          return [comp];
        }
        rangeMap.set(comp.value, comp);
      }
      if (rangeMap.size > 1 && rangeMap.has("")) {
        rangeMap.delete("");
      }
      const result = [...rangeMap.values()];
      cache.set(memoKey, result);
      return result;
    }
    intersects(range2, options) {
      if (!(range2 instanceof Range2)) {
        throw new TypeError("a Range is required");
      }
      return this.set.some((thisComparators) => {
        return isSatisfiable(thisComparators, options) && range2.set.some((rangeComparators) => {
          return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
            return rangeComparators.every((rangeComparator) => {
              return thisComparator.intersects(rangeComparator, options);
            });
          });
        });
      });
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(version2) {
      if (!version2) {
        return false;
      }
      if (typeof version2 === "string") {
        try {
          version2 = new SemVer3(version2, this.options);
        } catch (er) {
          return false;
        }
      }
      for (let i = 0; i < this.set.length; i++) {
        if (testSet(this.set[i], version2, this.options)) {
          return true;
        }
      }
      return false;
    }
  }
  range = Range2;
  const LRU = lruCache;
  const cache = new LRU({
    max: 1e3
  });
  const parseOptions2 = parseOptions_1;
  const Comparator = requireComparator();
  const debug2 = debug_1;
  const SemVer3 = semver;
  const {
    safeRe: re2,
    t: t2,
    comparatorTrimReplace,
    tildeTrimReplace,
    caretTrimReplace
  } = reExports;
  const {
    FLAG_INCLUDE_PRERELEASE,
    FLAG_LOOSE
  } = constants;
  const isNullSet = (c) => c.value === "<0.0.0-0";
  const isAny = (c) => c.value === "";
  const isSatisfiable = (comparators, options) => {
    let result = true;
    const remainingComparators = comparators.slice();
    let testComparator = remainingComparators.pop();
    while (result && remainingComparators.length) {
      result = remainingComparators.every((otherComparator) => {
        return testComparator.intersects(otherComparator, options);
      });
      testComparator = remainingComparators.pop();
    }
    return result;
  };
  const parseComparator = (comp, options) => {
    debug2("comp", comp, options);
    comp = replaceCarets(comp, options);
    debug2("caret", comp);
    comp = replaceTildes(comp, options);
    debug2("tildes", comp);
    comp = replaceXRanges(comp, options);
    debug2("xrange", comp);
    comp = replaceStars(comp, options);
    debug2("stars", comp);
    return comp;
  };
  const isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
  const replaceTildes = (comp, options) => {
    return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
  };
  const replaceTilde = (comp, options) => {
    const r = options.loose ? re2[t2.TILDELOOSE] : re2[t2.TILDE];
    return comp.replace(r, (_, M, m, p, pr) => {
      debug2("tilde", comp, _, M, m, p, pr);
      let ret;
      if (isX(M)) {
        ret = "";
      } else if (isX(m)) {
        ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
      } else if (isX(p)) {
        ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
      } else if (pr) {
        debug2("replaceTilde pr", pr);
        ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
      } else {
        ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
      }
      debug2("tilde return", ret);
      return ret;
    });
  };
  const replaceCarets = (comp, options) => {
    return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
  };
  const replaceCaret = (comp, options) => {
    debug2("caret", comp, options);
    const r = options.loose ? re2[t2.CARETLOOSE] : re2[t2.CARET];
    const z = options.includePrerelease ? "-0" : "";
    return comp.replace(r, (_, M, m, p, pr) => {
      debug2("caret", comp, _, M, m, p, pr);
      let ret;
      if (isX(M)) {
        ret = "";
      } else if (isX(m)) {
        ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
      } else if (isX(p)) {
        if (M === "0") {
          ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
        }
      } else if (pr) {
        debug2("replaceCaret pr", pr);
        if (M === "0") {
          if (m === "0") {
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
          }
        } else {
          ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
        }
      } else {
        debug2("no pr");
        if (M === "0") {
          if (m === "0") {
            ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
          } else {
            ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
          }
        } else {
          ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
        }
      }
      debug2("caret return", ret);
      return ret;
    });
  };
  const replaceXRanges = (comp, options) => {
    debug2("replaceXRanges", comp, options);
    return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
  };
  const replaceXRange = (comp, options) => {
    comp = comp.trim();
    const r = options.loose ? re2[t2.XRANGELOOSE] : re2[t2.XRANGE];
    return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
      debug2("xRange", comp, ret, gtlt, M, m, p, pr);
      const xM = isX(M);
      const xm = xM || isX(m);
      const xp = xm || isX(p);
      const anyX = xp;
      if (gtlt === "=" && anyX) {
        gtlt = "";
      }
      pr = options.includePrerelease ? "-0" : "";
      if (xM) {
        if (gtlt === ">" || gtlt === "<") {
          ret = "<0.0.0-0";
        } else {
          ret = "*";
        }
      } else if (gtlt && anyX) {
        if (xm) {
          m = 0;
        }
        p = 0;
        if (gtlt === ">") {
          gtlt = ">=";
          if (xm) {
            M = +M + 1;
            m = 0;
            p = 0;
          } else {
            m = +m + 1;
            p = 0;
          }
        } else if (gtlt === "<=") {
          gtlt = "<";
          if (xm) {
            M = +M + 1;
          } else {
            m = +m + 1;
          }
        }
        if (gtlt === "<") {
          pr = "-0";
        }
        ret = `${gtlt + M}.${m}.${p}${pr}`;
      } else if (xm) {
        ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
      } else if (xp) {
        ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
      }
      debug2("xRange return", ret);
      return ret;
    });
  };
  const replaceStars = (comp, options) => {
    debug2("replaceStars", comp, options);
    return comp.trim().replace(re2[t2.STAR], "");
  };
  const replaceGTE0 = (comp, options) => {
    debug2("replaceGTE0", comp, options);
    return comp.trim().replace(re2[options.includePrerelease ? t2.GTE0PRE : t2.GTE0], "");
  };
  const hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) => {
    if (isX(fM)) {
      from = "";
    } else if (isX(fm)) {
      from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
    } else if (isX(fp)) {
      from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
    } else if (fpr) {
      from = `>=${from}`;
    } else {
      from = `>=${from}${incPr ? "-0" : ""}`;
    }
    if (isX(tM)) {
      to = "";
    } else if (isX(tm)) {
      to = `<${+tM + 1}.0.0-0`;
    } else if (isX(tp)) {
      to = `<${tM}.${+tm + 1}.0-0`;
    } else if (tpr) {
      to = `<=${tM}.${tm}.${tp}-${tpr}`;
    } else if (incPr) {
      to = `<${tM}.${tm}.${+tp + 1}-0`;
    } else {
      to = `<=${to}`;
    }
    return `${from} ${to}`.trim();
  };
  const testSet = (set2, version2, options) => {
    for (let i = 0; i < set2.length; i++) {
      if (!set2[i].test(version2)) {
        return false;
      }
    }
    if (version2.prerelease.length && !options.includePrerelease) {
      for (let i = 0; i < set2.length; i++) {
        debug2(set2[i].semver);
        if (set2[i].semver === Comparator.ANY) {
          continue;
        }
        if (set2[i].semver.prerelease.length > 0) {
          const allowed = set2[i].semver;
          if (allowed.major === version2.major && allowed.minor === version2.minor && allowed.patch === version2.patch) {
            return true;
          }
        }
      }
      return false;
    }
    return true;
  };
  return range;
}
const Range = requireRange();
const satisfies = (version2, range2, options) => {
  try {
    range2 = new Range(range2, options);
  } catch (er) {
    return false;
  }
  return range2.test(version2);
};
var satisfies_1 = satisfies;
var satisfies$1 = /* @__PURE__ */ getDefaultExportFromCjs(satisfies_1);
function post(window2, url, data) {
  const editor = window2.open(url);
  const wait = 1e4;
  const step = 250;
  const {
    origin
  } = new URL(url);
  let count = ~~(wait / step);
  function listen(evt) {
    if (evt.source === editor) {
      count = 0;
      window2.removeEventListener("message", listen, false);
    }
  }
  window2.addEventListener("message", listen, false);
  function send() {
    if (count <= 0) {
      return;
    }
    editor.postMessage(data, origin);
    setTimeout(send, step);
    count -= 1;
  }
  setTimeout(send, step);
}
var embedStyle = `.vega-embed {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
}
.vega-embed.has-actions {
  padding-right: 38px;
}
.vega-embed details:not([open]) > :not(summary) {
  display: none !important;
}
.vega-embed summary {
  list-style: none;
  position: absolute;
  top: 0;
  right: 0;
  padding: 6px;
  z-index: 1000;
  background: white;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  color: #1b1e23;
  border: 1px solid #aaa;
  border-radius: 999px;
  opacity: 0.2;
  transition: opacity 0.4s ease-in;
  cursor: pointer;
  line-height: 0px;
}
.vega-embed summary::-webkit-details-marker {
  display: none;
}
.vega-embed summary:active {
  box-shadow: #aaa 0px 0px 0px 1px inset;
}
.vega-embed summary svg {
  width: 14px;
  height: 14px;
}
.vega-embed details[open] summary {
  opacity: 0.7;
}
.vega-embed:hover summary, .vega-embed:focus-within summary {
  opacity: 1 !important;
  transition: opacity 0.2s ease;
}
.vega-embed .vega-actions {
  position: absolute;
  z-index: 1001;
  top: 35px;
  right: -9px;
  display: flex;
  flex-direction: column;
  padding-bottom: 8px;
  padding-top: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #d9d9d9;
  background: white;
  animation-duration: 0.15s;
  animation-name: scale-in;
  animation-timing-function: cubic-bezier(0.2, 0, 0.13, 1.5);
  text-align: left;
}
.vega-embed .vega-actions a {
  padding: 8px 16px;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  color: #434a56;
  text-decoration: none;
}
.vega-embed .vega-actions a:hover, .vega-embed .vega-actions a:focus {
  background-color: #f7f7f9;
  color: black;
}
.vega-embed .vega-actions::before, .vega-embed .vega-actions::after {
  content: "";
  display: inline-block;
  position: absolute;
}
.vega-embed .vega-actions::before {
  left: auto;
  right: 14px;
  top: -16px;
  border: 8px solid rgba(0, 0, 0, 0);
  border-bottom-color: #d9d9d9;
}
.vega-embed .vega-actions::after {
  left: auto;
  right: 15px;
  top: -14px;
  border: 7px solid rgba(0, 0, 0, 0);
  border-bottom-color: #fff;
}
.vega-embed .chart-wrapper.fit-x {
  width: 100%;
}
.vega-embed .chart-wrapper.fit-y {
  height: 100%;
}

.vega-embed-wrapper {
  max-width: 100%;
  overflow: auto;
  padding-right: 14px;
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
`;
function mergeDeep(dest, ...src) {
  for (const s of src) {
    deepMerge_(dest, s);
  }
  return dest;
}
function deepMerge_(dest, src) {
  for (const property of Object.keys(src)) {
    writeConfig(dest, property, src[property], true);
  }
}
const vega = vegaImport;
let vegaLite = vegaLiteImport;
const w = typeof window !== "undefined" ? window : void 0;
if (vegaLite === void 0 && ((_a = w == null ? void 0 : w.vl) == null ? void 0 : _a.compile)) {
  vegaLite = w.vl;
}
const DEFAULT_ACTIONS = {
  export: {
    svg: true,
    png: true
  },
  source: true,
  compiled: true,
  editor: true
};
const I18N = {
  CLICK_TO_VIEW_ACTIONS: "Click to view actions",
  COMPILED_ACTION: "View Compiled Vega",
  EDITOR_ACTION: "Open in Vega Editor",
  PNG_ACTION: "Save as PNG",
  SOURCE_ACTION: "View Source",
  SVG_ACTION: "Save as SVG"
};
const NAMES = {
  vega: "Vega",
  "vega-lite": "Vega-Lite"
};
const VERSION = {
  vega: vega.version,
  "vega-lite": vegaLite ? vegaLite.version : "not available"
};
const PREPROCESSOR = {
  vega: (vgSpec) => vgSpec,
  "vega-lite": (vlSpec, config) => vegaLite.compile(vlSpec, {
    config
  }).spec
};
const SVG_CIRCLES = `
<svg viewBox="0 0 16 16" fill="currentColor" stroke="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
  <circle r="2" cy="8" cx="2"></circle>
  <circle r="2" cy="8" cx="8"></circle>
  <circle r="2" cy="8" cx="14"></circle>
</svg>`;
const CHART_WRAPPER_CLASS = "chart-wrapper";
function isTooltipHandler(h) {
  return typeof h === "function";
}
function viewSource(source, sourceHeader, sourceFooter, mode) {
  const header = `<html><head>${sourceHeader}</head><body><pre><code class="json">`;
  const footer = `</code></pre>${sourceFooter}</body></html>`;
  const win = window.open("");
  win.document.write(header + source + footer);
  win.document.title = `${NAMES[mode]} JSON Source`;
}
function guessMode(spec, providedMode) {
  if (spec.$schema) {
    const parsed = e(spec.$schema);
    if (providedMode && providedMode !== parsed.library) {
      console.warn(`The given visualization spec is written in ${NAMES[parsed.library]}, but mode argument sets ${NAMES[providedMode] ?? providedMode}.`);
    }
    const mode = parsed.library;
    if (!satisfies$1(VERSION[mode], `^${parsed.version.slice(1)}`)) {
      console.warn(`The input spec uses ${NAMES[mode]} ${parsed.version}, but the current version of ${NAMES[mode]} is v${VERSION[mode]}.`);
    }
    return mode;
  }
  if ("mark" in spec || "encoding" in spec || "layer" in spec || "hconcat" in spec || "vconcat" in spec || "facet" in spec || "repeat" in spec) {
    return "vega-lite";
  }
  if ("marks" in spec || "signals" in spec || "scales" in spec || "axes" in spec) {
    return "vega";
  }
  return providedMode ?? "vega";
}
function isLoader(o) {
  return !!(o && "load" in o);
}
function createLoader(opts) {
  return isLoader(opts) ? opts : vega.loader(opts);
}
function embedOptionsFromUsermeta(parsedSpec) {
  var _a2;
  const opts = ((_a2 = parsedSpec.usermeta) == null ? void 0 : _a2.embedOptions) ?? {};
  if (isString(opts.defaultStyle)) {
    opts.defaultStyle = false;
  }
  return opts;
}
async function embed(el, spec, opts = {}) {
  let parsedSpec;
  let loader;
  if (isString(spec)) {
    loader = createLoader(opts.loader);
    parsedSpec = JSON.parse(await loader.load(spec));
  } else {
    parsedSpec = spec;
  }
  const loadedEmbedOptions = embedOptionsFromUsermeta(parsedSpec);
  const usermetaLoader = loadedEmbedOptions.loader;
  if (!loader || usermetaLoader) {
    loader = createLoader(opts.loader ?? usermetaLoader);
  }
  const usermetaOpts = await loadOpts(loadedEmbedOptions, loader);
  const parsedOpts = await loadOpts(opts, loader);
  const mergedOpts = {
    ...mergeDeep(parsedOpts, usermetaOpts),
    config: mergeConfig(parsedOpts.config ?? {}, usermetaOpts.config ?? {})
  };
  return await _embed(el, parsedSpec, mergedOpts, loader);
}
async function loadOpts(opt, loader) {
  const config = isString(opt.config) ? JSON.parse(await loader.load(opt.config)) : opt.config ?? {};
  const patch = isString(opt.patch) ? JSON.parse(await loader.load(opt.patch)) : opt.patch;
  return {
    ...opt,
    ...patch ? {
      patch
    } : {},
    ...config ? {
      config
    } : {}
  };
}
function getRoot(el) {
  const possibleRoot = el.getRootNode ? el.getRootNode() : document;
  return possibleRoot instanceof ShadowRoot ? {
    root: possibleRoot,
    rootContainer: possibleRoot
  } : {
    root: document,
    rootContainer: document.head ?? document.body
  };
}
async function _embed(el, spec, opts = {}, loader) {
  const config = opts.theme ? mergeConfig(themes[opts.theme], opts.config ?? {}) : opts.config;
  const actions = isBoolean$1(opts.actions) ? opts.actions : mergeDeep({}, DEFAULT_ACTIONS, opts.actions ?? {});
  const i18n = {
    ...I18N,
    ...opts.i18n
  };
  const renderer = opts.renderer ?? "canvas";
  const logLevel = opts.logLevel ?? vega.Warn;
  const downloadFileName = opts.downloadFileName ?? "visualization";
  const element2 = typeof el === "string" ? document.querySelector(el) : el;
  if (!element2) {
    throw new Error(`${el} does not exist`);
  }
  if (opts.defaultStyle !== false) {
    const ID = "vega-embed-style";
    const {
      root,
      rootContainer
    } = getRoot(element2);
    if (!root.getElementById(ID)) {
      const style = document.createElement("style");
      style.id = ID;
      style.innerHTML = opts.defaultStyle === void 0 || opts.defaultStyle === true ? embedStyle.toString() : opts.defaultStyle;
      rootContainer.appendChild(style);
    }
  }
  const mode = guessMode(spec, opts.mode);
  let vgSpec = PREPROCESSOR[mode](spec, config);
  if (mode === "vega-lite") {
    if (vgSpec.$schema) {
      const parsed = e(vgSpec.$schema);
      if (!satisfies$1(VERSION.vega, `^${parsed.version.slice(1)}`)) {
        console.warn(`The compiled spec uses Vega ${parsed.version}, but current version is v${VERSION.vega}.`);
      }
    }
  }
  element2.classList.add("vega-embed");
  if (actions) {
    element2.classList.add("has-actions");
  }
  element2.innerHTML = "";
  let container = element2;
  if (actions) {
    const chartWrapper = document.createElement("div");
    chartWrapper.classList.add(CHART_WRAPPER_CLASS);
    element2.appendChild(chartWrapper);
    container = chartWrapper;
  }
  const patch = opts.patch;
  if (patch) {
    vgSpec = patch instanceof Function ? patch(vgSpec) : applyPatch(vgSpec, patch, true, false).newDocument;
  }
  if (opts.formatLocale) {
    vega.formatLocale(opts.formatLocale);
  }
  if (opts.timeFormatLocale) {
    vega.timeFormatLocale(opts.timeFormatLocale);
  }
  if (opts.expressionFunctions) {
    for (const name2 in opts.expressionFunctions) {
      const expressionFunction = opts.expressionFunctions[name2];
      if ("fn" in expressionFunction) {
        vega.expressionFunction(name2, expressionFunction.fn, expressionFunction["visitor"]);
      } else if (expressionFunction instanceof Function) {
        vega.expressionFunction(name2, expressionFunction);
      }
    }
  }
  const {
    ast
  } = opts;
  const runtime = vega.parse(vgSpec, mode === "vega-lite" ? {} : config, {
    ast
  });
  const view = new (opts.viewClass || vega.View)(runtime, {
    loader,
    logLevel,
    renderer,
    ...ast ? {
      expr: vega.expressionInterpreter ?? opts.expr ?? expression$1
    } : {}
  });
  view.addSignalListener("autosize", (_, autosize) => {
    const {
      type: type2
    } = autosize;
    if (type2 == "fit-x") {
      container.classList.add("fit-x");
      container.classList.remove("fit-y");
    } else if (type2 == "fit-y") {
      container.classList.remove("fit-x");
      container.classList.add("fit-y");
    } else if (type2 == "fit") {
      container.classList.add("fit-x", "fit-y");
    } else {
      container.classList.remove("fit-x", "fit-y");
    }
  });
  if (opts.tooltip !== false) {
    const {
      loader: loader_,
      tooltip: tooltip2
    } = opts;
    const baseURL = loader_ && !isLoader(loader_) ? loader_ == null ? void 0 : loader_.baseURL : void 0;
    const handler = isTooltipHandler(tooltip2) ? tooltip2 : (
      // user provided boolean true or tooltip options
      new Handler({
        baseURL,
        ...tooltip2 === true ? {} : tooltip2
      }).call
    );
    view.tooltip(handler);
  }
  let {
    hover
  } = opts;
  if (hover === void 0) {
    hover = mode === "vega";
  }
  if (hover) {
    const {
      hoverSet,
      updateSet
    } = typeof hover === "boolean" ? {} : hover;
    view.hover(hoverSet, updateSet);
  }
  if (opts) {
    if (opts.width != null) {
      view.width(opts.width);
    }
    if (opts.height != null) {
      view.height(opts.height);
    }
    if (opts.padding != null) {
      view.padding(opts.padding);
    }
  }
  await view.initialize(container, opts.bind).runAsync();
  let documentClickHandler;
  if (actions !== false) {
    let wrapper = element2;
    if (opts.defaultStyle !== false || opts.forceActionsMenu) {
      const details = document.createElement("details");
      details.title = i18n.CLICK_TO_VIEW_ACTIONS;
      element2.append(details);
      wrapper = details;
      const summary = document.createElement("summary");
      summary.innerHTML = SVG_CIRCLES;
      details.append(summary);
      documentClickHandler = (ev) => {
        if (!details.contains(ev.target)) {
          details.removeAttribute("open");
        }
      };
      document.addEventListener("click", documentClickHandler);
    }
    const ctrl = document.createElement("div");
    wrapper.append(ctrl);
    ctrl.classList.add("vega-actions");
    if (actions === true || actions.export !== false) {
      for (const ext of ["svg", "png"]) {
        if (actions === true || actions.export === true || actions.export[ext]) {
          const i18nExportAction = i18n[`${ext.toUpperCase()}_ACTION`];
          const exportLink = document.createElement("a");
          const scaleFactor = isObject(opts.scaleFactor) ? opts.scaleFactor[ext] : opts.scaleFactor;
          exportLink.text = i18nExportAction;
          exportLink.href = "#";
          exportLink.target = "_blank";
          exportLink.download = `${downloadFileName}.${ext}`;
          exportLink.addEventListener("mousedown", async function(e2) {
            e2.preventDefault();
            const url = await view.toImageURL(ext, scaleFactor);
            this.href = url;
          });
          ctrl.append(exportLink);
        }
      }
    }
    if (actions === true || actions.source !== false) {
      const viewSourceLink = document.createElement("a");
      viewSourceLink.text = i18n.SOURCE_ACTION;
      viewSourceLink.href = "#";
      viewSourceLink.addEventListener("click", function(e2) {
        viewSource(stringify$1(spec), opts.sourceHeader ?? "", opts.sourceFooter ?? "", mode);
        e2.preventDefault();
      });
      ctrl.append(viewSourceLink);
    }
    if (mode === "vega-lite" && (actions === true || actions.compiled !== false)) {
      const compileLink = document.createElement("a");
      compileLink.text = i18n.COMPILED_ACTION;
      compileLink.href = "#";
      compileLink.addEventListener("click", function(e2) {
        viewSource(stringify$1(vgSpec), opts.sourceHeader ?? "", opts.sourceFooter ?? "", "vega");
        e2.preventDefault();
      });
      ctrl.append(compileLink);
    }
    if (actions === true || actions.editor !== false) {
      const editorUrl = opts.editorUrl ?? "https://vega.github.io/editor/";
      const editorLink = document.createElement("a");
      editorLink.text = i18n.EDITOR_ACTION;
      editorLink.href = "#";
      editorLink.addEventListener("click", function(e2) {
        post(window, editorUrl, {
          config,
          mode,
          renderer,
          spec: stringify$1(spec)
        });
        e2.preventDefault();
      });
      ctrl.append(editorLink);
    }
  }
  function finalize() {
    if (documentClickHandler) {
      document.removeEventListener("click", documentClickHandler);
    }
    view.finalize();
  }
  return {
    view,
    spec,
    vgSpec,
    finalize,
    embedOptions: opts
  };
}
function create_if_block(ctx) {
  let div;
  let t2;
  return {
    c() {
      div = element("div");
      t2 = text$2(
        /*caption*/
        ctx[0]
      );
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      t2 = claim_text(
        div_nodes,
        /*caption*/
        ctx[0]
      );
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "caption layout svelte-1qhqpn7");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, t2);
    },
    p(ctx2, dirty) {
      if (dirty & /*caption*/
      1)
        set_data(
          t2,
          /*caption*/
          ctx2[0]
        );
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_fragment(ctx) {
  let div1;
  let div0;
  let t2;
  let if_block = (
    /*caption*/
    ctx[0] && create_if_block(ctx)
  );
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      t2 = space();
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", { "data-testid": true, class: true });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {});
      children(div0).forEach(detach);
      t2 = claim_space(div1_nodes);
      if (if_block)
        if_block.l(div1_nodes);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div1, "data-testid", "altair");
      attr(div1, "class", "altair layout svelte-1qhqpn7");
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      append_hydration(div1, div0);
      ctx[11](div0);
      append_hydration(div1, t2);
      if (if_block)
        if_block.m(div1, null);
      ctx[12](div1);
    },
    p(ctx2, [dirty]) {
      if (
        /*caption*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          if_block.m(div1, null);
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
        detach(div1);
      }
      ctx[11](null);
      if (if_block)
        if_block.d();
      ctx[12](null);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let plot;
  let spec;
  let fit_width_to_parent;
  let { value } = $$props;
  let { colors: colors2 = [] } = $$props;
  let { caption } = $$props;
  let { show_actions_button } = $$props;
  let { gradio } = $$props;
  let element2;
  let parent_element;
  let view;
  let { _selectable } = $$props;
  let computed_style = window.getComputedStyle(document.body);
  let old_spec;
  let spec_width;
  const get_width = () => {
    return Math.min(parent_element.offsetWidth, spec_width || parent_element.offsetWidth);
  };
  let resize_callback = () => {
  };
  const renderPlot = () => {
    if (fit_width_to_parent) {
      $$invalidate(9, spec.width = get_width(), spec);
    }
    embed(element2, spec, { actions: show_actions_button }).then(function(result) {
      view = result.view;
      resize_callback = () => {
        view.signal("width", get_width()).run();
      };
      if (!_selectable)
        return;
      const callback = (event, item) => {
        const brushValue = view.signal("brush");
        if (brushValue) {
          if (Object.keys(brushValue).length === 0) {
            gradio.dispatch("select", {
              value: null,
              index: null,
              selected: false
            });
          } else {
            const key = Object.keys(brushValue)[0];
            let range2 = brushValue[key].map((x) => x / 1e3);
            gradio.dispatch("select", {
              value: brushValue,
              index: range2,
              selected: true
            });
          }
        }
      };
      view.addEventListener("mouseup", callback);
      view.addEventListener("touchup", callback);
    });
  };
  let resizeObserver = new ResizeObserver(() => {
    if (fit_width_to_parent && spec.width !== parent_element.offsetWidth) {
      resize_callback();
    }
  });
  onMount(() => {
    renderPlot();
    resizeObserver.observe(parent_element);
  });
  onDestroy(() => {
    resizeObserver.disconnect();
  });
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(1, element2);
    });
  }
  function div1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      parent_element = $$value;
      $$invalidate(2, parent_element);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("value" in $$props2)
      $$invalidate(3, value = $$props2.value);
    if ("colors" in $$props2)
      $$invalidate(4, colors2 = $$props2.colors);
    if ("caption" in $$props2)
      $$invalidate(0, caption = $$props2.caption);
    if ("show_actions_button" in $$props2)
      $$invalidate(5, show_actions_button = $$props2.show_actions_button);
    if ("gradio" in $$props2)
      $$invalidate(6, gradio = $$props2.gradio);
    if ("_selectable" in $$props2)
      $$invalidate(7, _selectable = $$props2._selectable);
  };
  $$self.$$.update = () => {
    var _a2, _b, _c2, _d2;
    if ($$self.$$.dirty & /*value*/
    8) {
      $$invalidate(10, plot = value == null ? void 0 : value.plot);
    }
    if ($$self.$$.dirty & /*plot*/
    1024) {
      $$invalidate(9, spec = JSON.parse(plot));
    }
    if ($$self.$$.dirty & /*spec, _selectable*/
    640) {
      if (spec && spec.params && !_selectable) {
        $$invalidate(9, spec.params = spec.params.filter((param) => param.name !== "brush"), spec);
      }
    }
    if ($$self.$$.dirty & /*value, spec, colors*/
    536) {
      if (value.chart) {
        $$invalidate(9, spec = set_config(spec, computed_style, value.chart, colors2));
      }
    }
    if ($$self.$$.dirty & /*old_spec, spec*/
    768) {
      if (old_spec !== spec) {
        $$invalidate(8, old_spec = spec);
        spec_width = spec.width;
      }
    }
    if ($$self.$$.dirty & /*spec, value*/
    520) {
      fit_width_to_parent = ((_b = (_a2 = spec.encoding) == null ? void 0 : _a2.column) == null ? void 0 : _b.field) || ((_d2 = (_c2 = spec.encoding) == null ? void 0 : _c2.row) == null ? void 0 : _d2.field) || value.chart === void 0 ? false : true;
    }
  };
  return [
    caption,
    element2,
    parent_element,
    value,
    colors2,
    show_actions_button,
    gradio,
    _selectable,
    old_spec,
    spec,
    plot,
    div0_binding,
    div1_binding
  ];
}
class AltairPlot extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      value: 3,
      colors: 4,
      caption: 0,
      show_actions_button: 5,
      gradio: 6,
      _selectable: 7
    });
  }
}
export {
  AltairPlot as default
};
