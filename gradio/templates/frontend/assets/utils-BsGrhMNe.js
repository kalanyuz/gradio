class p extends Error{constructor(o){super(o),this.name="ShareError"}}async function y(t,o){if(window.__gradio_space__==null)throw new p("Must be on Spaces to share.");let e,n,r;{let c;if(typeof t=="object"&&t.url)c=t.url;else if(typeof t=="string")c=t;else throw new Error("Invalid data format for URL type");const a=await fetch(c);e=await a.blob(),n=a.headers.get("content-type")||"",r=a.headers.get("content-disposition")||""}const s=new File([e],r,{type:n}),i=await fetch("https://huggingface.co/uploads",{method:"POST",body:s,headers:{"Content-Type":s.type,"X-Requested-With":"XMLHttpRequest"}});if(!i.ok){if(i.headers.get("content-type")?.includes("application/json")){const c=await i.json();throw new p(`Upload failed: ${c.error}`)}throw new p("Upload failed.")}return await i.text()}function _(t){t.addEventListener("click",o);async function o(e){const n=e.composedPath(),[r]=n.filter(s=>s?.tagName==="BUTTON"&&s.classList.contains("copy_code_button"));if(r){let s=function(a){a.style.opacity="1",setTimeout(()=>{a.style.opacity="0"},2e3)};e.stopImmediatePropagation();const i=r.parentElement.innerText.trim(),l=Array.from(r.children)[1];await h(i)&&s(l)}}return{destroy(){t.removeEventListener("click",o)}}}async function h(t){let o=!1;if("clipboard"in navigator)await navigator.clipboard.writeText(t),o=!0;else{const e=document.createElement("textarea");e.value=t,e.style.position="absolute",e.style.left="-999999px",document.body.prepend(e),e.select();try{document.execCommand("copy"),o=!0}catch(n){console.error(n),o=!1}finally{e.remove()}}return o}const w=t=>{const o=Math.floor(t/3600),e=Math.floor(t%3600/60),n=Math.round(t)%60,r=`${e<10?"0":""}${e}`,s=`${n<10?"0":""}${n}`;return o>0?`${o}:${r}:${s}`:`${e}:${s}`},f=typeof window<"u";class b{#e;theme;version;i18n;#t;root;autoscroll;max_file_size;client;_load_component;load_component=m.bind(this);constructor(o,e,n,r,s,i,l,c=u=>u,a,d){this.#e=o,this.theme=n,this.version=r,this.#t=e,this.max_file_size=l,this.i18n=c,this.root=s,this.autoscroll=i,this.client=a,this._load_component=d}dispatch(o,e){if(!f||!this.#t)return;const n=new CustomEvent("gradio",{bubbles:!0,detail:{data:e,id:this.#e,event:o}});this.#t.dispatchEvent(n)}}function m(t,o="component"){return this._load_component({name:t,api_url:this.client.config?.root,variant:o})}const g=t=>typeof t=="number"?t+"px":t;export{b as G,p as S,_ as a,g as c,w as f,y as u};
//# sourceMappingURL=utils-BsGrhMNe.js.map
