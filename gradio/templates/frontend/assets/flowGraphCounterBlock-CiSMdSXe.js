import{b as i}from"./declarationMapper-RHOWmdbv.js";import{b as s}from"./KHR_interactivity-DdxBi2k0.js";import{R as o}from"./index-DZX1lH7G.js";import"./index-C1aeWpzY.js";import"./svelte/svelte.js";import"./objectModelMapping-B8PDaiWm.js";class a extends s{constructor(t){super(t),this.count=this.registerDataOutput("count",i),this.reset=this._registerSignalInput("reset")}_execute(t,r){if(r===this.reset){t._setExecutionVariable(this,"count",0),this.count.setValue(0,t);return}const e=t._getExecutionVariable(this,"count",0)+1;t._setExecutionVariable(this,"count",e),this.count.setValue(e,t),this.out._activateSignal(t)}getClassName(){return"FlowGraphCallCounterBlock"}}o("FlowGraphCallCounterBlock",a);export{a as FlowGraphCallCounterBlock};
//# sourceMappingURL=flowGraphCounterBlock-CiSMdSXe.js.map
