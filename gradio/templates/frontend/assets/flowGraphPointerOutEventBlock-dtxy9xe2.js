import{c as n,_ as r}from"./KHR_interactivity-DdxBi2k0.js";import{b as o,R as i}from"./declarationMapper-RHOWmdbv.js";import{R as h}from"./index-DZX1lH7G.js";import"./index-C1aeWpzY.js";import"./svelte/svelte.js";import"./objectModelMapping-B8PDaiWm.js";class u extends n{constructor(t){super(t),this.type="PointerOut",this.pointerId=this.registerDataOutput("pointerId",o),this.targetMesh=this.registerDataInput("targetMesh",i,t?.targetMesh),this.meshOutOfPointer=this.registerDataOutput("meshOutOfPointer",i)}_executeEvent(t,e){const s=this.targetMesh.getValue(t);return this.meshOutOfPointer.setValue(e.mesh,t),this.pointerId.setValue(e.pointerId,t),!(e.over&&r(e.mesh,s))&&(e.mesh===s||r(e.mesh,s))?(this._execute(t),!this.config?.stopPropagation):!0}_preparePendingTasks(t){}_cancelPendingTasks(t){}getClassName(){return"FlowGraphPointerOutEventBlock"}}h("FlowGraphPointerOutEventBlock",u);export{u as FlowGraphPointerOutEventBlock};
//# sourceMappingURL=flowGraphPointerOutEventBlock-dtxy9xe2.js.map
