import"./IconButtonWrapper.svelte_svelte_type_style_lang-CPevJZa9.js";import{U as Q,I as X}from"./Upload-CoxNxyp7.js";const{SvelteComponent:Y,append:B,attr:_,detach:Z,init:x,insert:ee,noop:W,safe_not_equal:te,svg_element:q}=window.__gradio__svelte__internal;function le(a){let e,l,t,i,s;return{c(){e=q("svg"),l=q("path"),t=q("path"),i=q("line"),s=q("line"),_(l,"d","M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"),_(t,"d","M19 10v2a7 7 0 0 1-14 0v-2"),_(i,"x1","12"),_(i,"y1","19"),_(i,"x2","12"),_(i,"y2","23"),_(s,"x1","8"),_(s,"y1","23"),_(s,"x2","16"),_(s,"y2","23"),_(e,"xmlns","http://www.w3.org/2000/svg"),_(e,"width","100%"),_(e,"height","100%"),_(e,"viewBox","0 0 24 24"),_(e,"fill","none"),_(e,"stroke","currentColor"),_(e,"stroke-width","2"),_(e,"stroke-linecap","round"),_(e,"stroke-linejoin","round"),_(e,"class","feather feather-mic")},m(n,r){ee(n,e,r),B(e,l),B(e,t),B(e,i),B(e,s)},p:W,i:W,o:W,d(n){n&&Z(e)}}}class ne extends Y{constructor(e){super(),x(this,e,null,le,te,{})}}const{SvelteComponent:ie,append:F,attr:v,detach:se,init:ae,insert:oe,noop:j,safe_not_equal:re,svg_element:A}=window.__gradio__svelte__internal;function ce(a){let e,l,t;return{c(){e=A("svg"),l=A("path"),t=A("path"),v(l,"fill","currentColor"),v(l,"d","M12 2c-4.963 0-9 4.038-9 9c0 3.328 1.82 6.232 4.513 7.79l-2.067 1.378A1 1 0 0 0 6 22h12a1 1 0 0 0 .555-1.832l-2.067-1.378C19.18 17.232 21 14.328 21 11c0-4.962-4.037-9-9-9zm0 16c-3.859 0-7-3.141-7-7c0-3.86 3.141-7 7-7s7 3.14 7 7c0 3.859-3.141 7-7 7z"),v(t,"fill","currentColor"),v(t,"d","M12 6c-2.757 0-5 2.243-5 5s2.243 5 5 5s5-2.243 5-5s-2.243-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3s3 1.346 3 3s-1.346 3-3 3z"),v(e,"xmlns","http://www.w3.org/2000/svg"),v(e,"width","100%"),v(e,"height","100%"),v(e,"viewBox","0 0 24 24")},m(i,s){oe(i,e,s),F(e,l),F(e,t)},p:j,i:j,o:j,d(i){i&&se(e)}}}class fe extends ie{constructor(e){super(),ae(this,e,null,ce,re,{})}}const{SvelteComponent:ue,append:G,attr:p,detach:_e,init:de,insert:me,noop:R,safe_not_equal:pe,svg_element:V}=window.__gradio__svelte__internal;function he(a){let e,l,t;return{c(){e=V("svg"),l=V("circle"),t=V("animateTransform"),p(t,"attributeName","transform"),p(t,"type","rotate"),p(t,"from","0 25 25"),p(t,"to","360 25 25"),p(t,"repeatCount","indefinite"),p(l,"cx","25"),p(l,"cy","25"),p(l,"r","20"),p(l,"fill","none"),p(l,"stroke-width","3.0"),p(l,"stroke-linecap","round"),p(l,"stroke-dasharray","94.2477796076938 94.2477796076938"),p(l,"stroke-dashoffset","0"),p(e,"xmlns","http://www.w3.org/2000/svg"),p(e,"width","100%"),p(e,"height","100%"),p(e,"viewBox","0 0 50 50"),p(e,"class","svelte-184ngxt")},m(i,s){me(i,e,s),G(e,l),G(l,t)},p:R,i:R,o:R,d(i){i&&_e(e)}}}class qe extends ue{constructor(e){super(),de(this,e,null,he,pe,{})}}const{SvelteComponent:ge,append:D,attr:w,check_outros:M,create_component:I,destroy_component:N,detach:C,element:y,empty:we,flush:U,group_outros:z,init:$e,insert:S,listen:P,mount_component:T,safe_not_equal:ve,space:E,toggle_class:b,transition_in:d,transition_out:g}=window.__gradio__svelte__internal;function H(a){let e,l=a[1].includes("upload"),t,i=a[1].includes("microphone"),s,n=a[1].includes("webcam"),r,$=a[1].includes("clipboard"),k,c=l&&J(a),f=i&&K(a),u=n&&L(a),o=$&&O(a);return{c(){e=y("span"),c&&c.c(),t=E(),f&&f.c(),s=E(),u&&u.c(),r=E(),o&&o.c(),w(e,"class","source-selection svelte-snayfm"),w(e,"data-testid","source-select")},m(m,h){S(m,e,h),c&&c.m(e,null),D(e,t),f&&f.m(e,null),D(e,s),u&&u.m(e,null),D(e,r),o&&o.m(e,null),k=!0},p(m,h){h&2&&(l=m[1].includes("upload")),l?c?(c.p(m,h),h&2&&d(c,1)):(c=J(m),c.c(),d(c,1),c.m(e,t)):c&&(z(),g(c,1,1,()=>{c=null}),M()),h&2&&(i=m[1].includes("microphone")),i?f?(f.p(m,h),h&2&&d(f,1)):(f=K(m),f.c(),d(f,1),f.m(e,s)):f&&(z(),g(f,1,1,()=>{f=null}),M()),h&2&&(n=m[1].includes("webcam")),n?u?(u.p(m,h),h&2&&d(u,1)):(u=L(m),u.c(),d(u,1),u.m(e,r)):u&&(z(),g(u,1,1,()=>{u=null}),M()),h&2&&($=m[1].includes("clipboard")),$?o?(o.p(m,h),h&2&&d(o,1)):(o=O(m),o.c(),d(o,1),o.m(e,null)):o&&(z(),g(o,1,1,()=>{o=null}),M())},i(m){k||(d(c),d(f),d(u),d(o),k=!0)},o(m){g(c),g(f),g(u),g(o),k=!1},d(m){m&&C(e),c&&c.d(),f&&f.d(),u&&u.d(),o&&o.d()}}}function J(a){let e,l,t,i,s;return l=new Q({}),{c(){e=y("button"),I(l.$$.fragment),w(e,"class","icon svelte-snayfm"),w(e,"aria-label","Upload file"),b(e,"selected",a[0]==="upload"||!a[0])},m(n,r){S(n,e,r),T(l,e,null),t=!0,i||(s=P(e,"click",a[6]),i=!0)},p(n,r){(!t||r&1)&&b(e,"selected",n[0]==="upload"||!n[0])},i(n){t||(d(l.$$.fragment,n),t=!0)},o(n){g(l.$$.fragment,n),t=!1},d(n){n&&C(e),N(l),i=!1,s()}}}function K(a){let e,l,t,i,s;return l=new ne({}),{c(){e=y("button"),I(l.$$.fragment),w(e,"class","icon svelte-snayfm"),w(e,"aria-label","Record audio"),b(e,"selected",a[0]==="microphone")},m(n,r){S(n,e,r),T(l,e,null),t=!0,i||(s=P(e,"click",a[7]),i=!0)},p(n,r){(!t||r&1)&&b(e,"selected",n[0]==="microphone")},i(n){t||(d(l.$$.fragment,n),t=!0)},o(n){g(l.$$.fragment,n),t=!1},d(n){n&&C(e),N(l),i=!1,s()}}}function L(a){let e,l,t,i,s;return l=new fe({}),{c(){e=y("button"),I(l.$$.fragment),w(e,"class","icon svelte-snayfm"),w(e,"aria-label","Capture from camera"),b(e,"selected",a[0]==="webcam")},m(n,r){S(n,e,r),T(l,e,null),t=!0,i||(s=P(e,"click",a[8]),i=!0)},p(n,r){(!t||r&1)&&b(e,"selected",n[0]==="webcam")},i(n){t||(d(l.$$.fragment,n),t=!0)},o(n){g(l.$$.fragment,n),t=!1},d(n){n&&C(e),N(l),i=!1,s()}}}function O(a){let e,l,t,i,s;return l=new X({}),{c(){e=y("button"),I(l.$$.fragment),w(e,"class","icon svelte-snayfm"),w(e,"aria-label","Paste from clipboard"),b(e,"selected",a[0]==="clipboard")},m(n,r){S(n,e,r),T(l,e,null),t=!0,i||(s=P(e,"click",a[9]),i=!0)},p(n,r){(!t||r&1)&&b(e,"selected",n[0]==="clipboard")},i(n){t||(d(l.$$.fragment,n),t=!0)},o(n){g(l.$$.fragment,n),t=!1},d(n){n&&C(e),N(l),i=!1,s()}}}function be(a){let e,l,t=a[2].length>1&&H(a);return{c(){t&&t.c(),e=we()},m(i,s){t&&t.m(i,s),S(i,e,s),l=!0},p(i,[s]){i[2].length>1?t?(t.p(i,s),s&4&&d(t,1)):(t=H(i),t.c(),d(t,1),t.m(e.parentNode,e)):t&&(z(),g(t,1,1,()=>{t=null}),M())},i(i){l||(d(t),l=!0)},o(i){g(t),l=!1},d(i){i&&C(e),t&&t.d(i)}}}function ke(a,e,l){let t,{sources:i}=e,{active_source:s}=e,{handle_clear:n=()=>{}}=e,{handle_select:r=()=>{}}=e;async function $(o){n(),l(0,s=o),r(o)}const k=()=>$("upload"),c=()=>$("microphone"),f=()=>$("webcam"),u=()=>$("clipboard");return a.$$set=o=>{"sources"in o&&l(1,i=o.sources),"active_source"in o&&l(0,s=o.active_source),"handle_clear"in o&&l(4,n=o.handle_clear),"handle_select"in o&&l(5,r=o.handle_select)},a.$$.update=()=>{a.$$.dirty&2&&l(2,t=[...new Set(i)])},[s,i,t,$,n,r,k,c,f,u]}class Me extends ge{constructor(e){super(),$e(this,e,ke,be,ve,{sources:1,active_source:0,handle_clear:4,handle_select:5})}get sources(){return this.$$.ctx[1]}set sources(e){this.$$set({sources:e}),U()}get active_source(){return this.$$.ctx[0]}set active_source(e){this.$$set({active_source:e}),U()}get handle_clear(){return this.$$.ctx[4]}set handle_clear(e){this.$$set({handle_clear:e}),U()}get handle_select(){return this.$$.ctx[5]}set handle_select(e){this.$$set({handle_select:e}),U()}}export{ne as M,Me as S,fe as W,qe as a};
//# sourceMappingURL=SelectSource-C_xcpRDd.js.map
