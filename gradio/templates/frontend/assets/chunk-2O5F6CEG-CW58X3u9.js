import{_ as n,j as r,k as g,l as d}from"./mermaid.core-C7TtMA4K.js";var u=n((t,e)=>{let o;return e==="sandbox"&&(o=r("#i"+t)),(e==="sandbox"?r(o.nodes()[0].contentDocument.body):r("body")).select(`[id="${t}"]`)},"getDiagramElement"),b=n((t,e,o,a)=>{t.attr("class",o);const{width:i,height:s,x:h,y:x}=l(t,e);g(t,s,i,a);const c=w(h,x,i,s,e);t.attr("viewBox",c),d.debug(`viewBox configured: ${c} with padding: ${e}`)},"setupViewPortForSVG"),l=n((t,e)=>{const o=t.node()?.getBBox()||{width:0,height:0,x:0,y:0};return{width:o.width+e*2,height:o.height+e*2,x:o.x,y:o.y}},"calculateDimensionsWithPadding"),w=n((t,e,o,a,i)=>`${t-i} ${e-i} ${o} ${a}`,"createViewBox");export{u as g,b as s};
//# sourceMappingURL=chunk-2O5F6CEG-CW58X3u9.js.map
