import"./StreamingBar.svelte_svelte_type_style_lang-CDNxkBIr.js";const{SvelteComponent:_,attr:f,detach:o,element:c,empty:u,flush:d,init:p,insert:a,noop:s,safe_not_equal:$,set_style:r}=window.__gradio__svelte__internal;function m(l){let i,t=`${l[0]}s`;return{c(){i=c("div"),f(i,"class","streaming-bar svelte-roz8lq"),r(i,"animation-duration",t)},m(e,n){a(e,i,n)},p(e,n){n&1&&t!==(t=`${e[0]}s`)&&r(i,"animation-duration",t)},d(e){e&&o(i)}}}function v(l){let i,t=l[0]&&m(l);return{c(){t&&t.c(),i=u()},m(e,n){t&&t.m(e,n),a(e,i,n)},p(e,[n]){e[0]?t?t.p(e,n):(t=m(e),t.c(),t.m(i.parentNode,i)):t&&(t.d(1),t=null)},i:s,o:s,d(e){e&&o(i),t&&t.d(e)}}}function b(l,i,t){let{time_limit:e}=i;return l.$$set=n=>{"time_limit"in n&&t(0,e=n.time_limit)},[e]}class g extends _{constructor(i){super(),p(this,i,b,v,$,{time_limit:0})}get time_limit(){return this.$$.ctx[0]}set time_limit(i){this.$$set({time_limit:i}),d()}}export{g as S};
//# sourceMappingURL=StreamingBar-BU9S4hA7.js.map
