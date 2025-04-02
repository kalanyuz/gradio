import{P as E}from"./prism-python-Bhmms-Lt.js";import"./index-C1aeWpzY.js";import"./svelte/svelte.js";(function(a){a.languages.typescript=a.languages.extend("javascript",{"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,lookbehind:!0,greedy:!0,inside:null},builtin:/\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/}),a.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/,/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,/\btype\b(?=\s*(?:[\{*]|$))/),delete a.languages.typescript.parameter,delete a.languages.typescript["literal-property"];var e=a.languages.extend("typescript",{});delete e["class-name"],a.languages.typescript["class-name"].inside=e,a.languages.insertBefore("typescript","function",{decorator:{pattern:/@[$\w\xA0-\uFFFF]+/,inside:{at:{pattern:/^@/,alias:"operator"},function:/^[\s\S]+/}},"generic-function":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,greedy:!0,inside:{function:/^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:e}}}}),a.languages.ts=a.languages.typescript})(Prism);const{HtmlTag:G,SvelteComponent:W,append:d,attr:u,binding_callbacks:X,destroy_block:Y,detach:b,element:k,empty:J,ensure_array_like:H,flush:L,init:P,insert:w,listen:x,noop:T,safe_not_equal:ee,set_data:K,set_style:te,space:F,text:q,toggle_class:Z,update_keyed_each:le}=window.__gradio__svelte__internal,{onMount:ne}=window.__gradio__svelte__internal;function I(a,e,t){const l=a.slice();return l[13]=e[t].type,l[14]=e[t].description,l[15]=e[t].default,l[16]=e[t].name,l}function O(a){let e,t,l,n,i,s,r,f,m;return{c(){e=k("div"),t=k("span"),l=q(a[1]),n=F(),i=k("button"),s=q("▼"),u(t,"class","title svelte-1mlh4di"),u(i,"class","toggle-all svelte-1mlh4di"),u(i,"title",r=a[5]?"Close All":"Open All"),u(e,"class","header svelte-1mlh4di")},m(y,v){w(y,e,v),d(e,t),d(t,l),d(e,n),d(e,i),d(i,s),f||(m=x(i,"click",a[6]),f=!0)},p(y,v){v&2&&K(l,y[1]),v&32&&r!==(r=y[5]?"Close All":"Open All")&&u(i,"title",r)},d(y){y&&b(e),f=!1,m()}}}function j(a){let e=[],t=new Map,l,n=H(a[4]);const i=s=>s[16];for(let s=0;s<n.length;s+=1){let r=I(a,n,s),f=i(r);t.set(f,e[s]=R(f,r))}return{c(){for(let s=0;s<e.length;s+=1)e[s].c();l=J()},m(s,r){for(let f=0;f<e.length;f+=1)e[f]&&e[f].m(s,r);w(s,l,r)},p(s,r){r&21&&(n=H(s[4]),e=le(e,r,i,1,s,n,t,l.parentNode,Y,R,l,I))},d(s){s&&b(l);for(let r=0;r<e.length;r+=1)e[r].d(s)}}}function D(a){let e,t,l;return{c(){e=k("a"),t=k("span"),t.textContent="🔗",u(t,"class","link-icon svelte-1mlh4di"),u(e,"href",l="#"+M(a[16]||"",a[2])),u(e,"class","param-link svelte-1mlh4di")},m(n,i){w(n,e,i),d(e,t)},p(n,i){i&20&&l!==(l="#"+M(n[16]||"",n[2]))&&u(e,"href",l)},d(n){n&&b(e)}}}function V(a){let e,t,l=a[13]+"",n;return{c(){e=q(": "),t=new G(!1),n=J(),t.a=n},m(i,s){w(i,e,s),t.m(l,i,s),w(i,n,s)},p(i,s){s&16&&l!==(l=i[13]+"")&&t.p(l)},d(i){i&&(b(e),b(n),t.d())}}}function B(a){let e,t,l,n,i,s,r=a[15]+"";return{c(){e=k("div"),t=k("span"),t.textContent="default",l=F(),n=k("code"),i=q("= "),s=new G(!1),u(t,"class","svelte-1mlh4di"),te(t,"padding-right","4px"),s.a=null,u(n,"class","svelte-1mlh4di"),u(e,"class","default svelte-1mlh4di"),Z(e,"last",!a[14])},m(f,m){w(f,e,m),d(e,t),d(e,l),d(e,n),d(n,i),s.m(r,n)},p(f,m){m&16&&r!==(r=f[15]+"")&&s.p(r),m&16&&Z(e,"last",!f[14])},d(f){f&&b(e)}}}function N(a){let e,t,l=$(a[14])+"";return{c(){e=k("div"),t=k("p"),u(e,"class","description svelte-1mlh4di")},m(n,i){w(n,e,i),d(e,t),t.innerHTML=l},p(n,i){i&16&&l!==(l=$(n[14])+"")&&(t.innerHTML=l)},d(n){n&&b(e)}}}function R(a,e){let t,l,n,i,s,r=e[16]+"",f,m,y,v,C,A,h=e[2]&&D(e),_=e[13]&&V(e),o=e[15]&&B(e),c=e[14]&&N(e);return{key:a,first:null,c(){t=k("details"),l=k("summary"),h&&h.c(),n=F(),i=k("pre"),s=k("code"),f=q(r),_&&_.c(),y=F(),o&&o.c(),v=F(),c&&c.c(),C=F(),u(s,"class","svelte-1mlh4di"),u(i,"class",m="language-"+e[0]+" svelte-1mlh4di"),u(l,"class","type svelte-1mlh4di"),u(t,"class","param md svelte-1mlh4di"),u(t,"id",A=e[2]?M(e[16]||"",e[2]):void 0),this.first=t},m(p,g){w(p,t,g),d(t,l),h&&h.m(l,null),d(l,n),d(l,i),d(i,s),d(s,f),_&&_.m(s,null),d(t,y),o&&o.m(t,null),d(t,v),c&&c.m(t,null),d(t,C)},p(p,g){e=p,e[2]?h?h.p(e,g):(h=D(e),h.c(),h.m(l,n)):h&&(h.d(1),h=null),g&16&&r!==(r=e[16]+"")&&K(f,r),e[13]?_?_.p(e,g):(_=V(e),_.c(),_.m(s,null)):_&&(_.d(1),_=null),g&1&&m!==(m="language-"+e[0]+" svelte-1mlh4di")&&u(i,"class",m),e[15]?o?o.p(e,g):(o=B(e),o.c(),o.m(t,v)):o&&(o.d(1),o=null),e[14]?c?c.p(e,g):(c=N(e),c.c(),c.m(t,C)):c&&(c.d(1),c=null),g&20&&A!==(A=e[2]?M(e[16]||"",e[2]):void 0)&&u(t,"id",A)},d(p){p&&b(t),h&&h.d(),_&&_.d(),o&&o.d(),c&&c.d()}}}function ie(a){let e,t,l=a[1]!==null&&O(a),n=a[4]&&j(a);return{c(){e=k("div"),l&&l.c(),t=F(),n&&n.c(),u(e,"class","wrap svelte-1mlh4di")},m(i,s){w(i,e,s),l&&l.m(e,null),d(e,t),n&&n.m(e,null),a[9](e)},p(i,[s]){i[1]!==null?l?l.p(i,s):(l=O(i),l.c(),l.m(e,t)):l&&(l.d(1),l=null),i[4]?n?n.p(i,s):(n=j(i),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},i:T,o:T,d(i){i&&b(e),l&&l.d(),n&&n.d(),a[9](null)}}}function M(a,e){let t="param-";return typeof e=="string"&&(t+=e+"-"),t+a.toLowerCase().replace(/[^a-z0-9]+/g,"-")}function $(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;").replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank">$1</a>')}function ae(a,e,t){let{docs:l}=e,{lang:n="python"}=e,{linkify:i=[]}=e,{header:s}=e,{anchor_links:r=!1}=e,f,m,y=!1;function v(o,c){let p=E.highlight(o,E.languages[c],c);for(const g of i)p=p.replace(new RegExp(g,"g"),`<a href="#h-${g.toLocaleLowerCase()}">${g}</a>`);return p}function C(o,c){return o?Object.entries(o).map(([p,{type:g,description:Q,default:z}])=>{let U=g?v(g,c):null;return{name:p,type:U,description:Q,default:z?v(z,c):null}}):[]}function A(){t(5,y=!y),f.querySelectorAll(".param").forEach(c=>{c instanceof HTMLDetailsElement&&(c.open=y)})}ne(()=>{window.location.hash&&h(window.location.hash),window.addEventListener("hashchange",o=>{h(window.location.hash)})});function h(o){if(!f)return;const c=o.slice(1),p=f.querySelector(`#${c}`);p instanceof HTMLDetailsElement&&(p.open=!0,p.scrollIntoView({behavior:"smooth"}))}function _(o){X[o?"unshift":"push"](()=>{f=o,t(3,f)})}return a.$$set=o=>{"docs"in o&&t(7,l=o.docs),"lang"in o&&t(0,n=o.lang),"linkify"in o&&t(8,i=o.linkify),"header"in o&&t(1,s=o.header),"anchor_links"in o&&t(2,r=o.anchor_links)},a.$$.update=()=>{a.$$.dirty&129&&t(4,m=C(l,n))},[n,s,r,f,m,y,A,l,i,_]}class se extends W{constructor(e){super(),P(this,e,ae,ie,ee,{docs:7,lang:0,linkify:8,header:1,anchor_links:2})}get docs(){return this.$$.ctx[7]}set docs(e){this.$$set({docs:e}),L()}get lang(){return this.$$.ctx[0]}set lang(e){this.$$set({lang:e}),L()}get linkify(){return this.$$.ctx[8]}set linkify(e){this.$$set({linkify:e}),L()}get header(){return this.$$.ctx[1]}set header(e){this.$$set({header:e}),L()}get anchor_links(){return this.$$.ctx[2]}set anchor_links(e){this.$$set({anchor_links:e}),L()}}const{SvelteComponent:re,create_component:oe,destroy_component:fe,flush:S,init:ce,mount_component:ue,safe_not_equal:de,transition_in:he,transition_out:_e}=window.__gradio__svelte__internal;function ge(a){let e,t;return e=new se({props:{docs:a[0],linkify:a[1],header:a[2],anchor_links:a[3]}}),{c(){oe(e.$$.fragment)},m(l,n){ue(e,l,n),t=!0},p(l,[n]){const i={};n&1&&(i.docs=l[0]),n&2&&(i.linkify=l[1]),n&4&&(i.header=l[2]),n&8&&(i.anchor_links=l[3]),e.$set(i)},i(l){t||(he(e.$$.fragment,l),t=!0)},o(l){_e(e.$$.fragment,l),t=!1},d(l){fe(e,l)}}}function me(a,e,t){let{value:l}=e,{linkify:n=[]}=e,{header:i=null}=e,{anchor_links:s=!1}=e;return a.$$set=r=>{"value"in r&&t(0,l=r.value),"linkify"in r&&t(1,n=r.linkify),"header"in r&&t(2,i=r.header),"anchor_links"in r&&t(3,s=r.anchor_links)},[l,n,i,s]}class ve extends re{constructor(e){super(),ce(this,e,me,ge,de,{value:0,linkify:1,header:2,anchor_links:3})}get value(){return this.$$.ctx[0]}set value(e){this.$$set({value:e}),S()}get linkify(){return this.$$.ctx[1]}set linkify(e){this.$$set({linkify:e}),S()}get header(){return this.$$.ctx[2]}set header(e){this.$$set({header:e}),S()}get anchor_links(){return this.$$.ctx[3]}set anchor_links(e){this.$$set({anchor_links:e}),S()}}export{ve as default};
//# sourceMappingURL=Index-CQDdF-ka.js.map
