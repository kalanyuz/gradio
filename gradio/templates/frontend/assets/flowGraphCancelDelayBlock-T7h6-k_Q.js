import{R as t}from"./index-DZX1lH7G.js";import{b as r}from"./KHR_interactivity-DdxBi2k0.js";import{b as l}from"./declarationMapper-RHOWmdbv.js";import"./index-C1aeWpzY.js";import"./svelte/svelte.js";import"./objectModelMapping-B8PDaiWm.js";class s extends r{constructor(e){super(e),this.delayIndex=this.registerDataInput("delayIndex",l)}_execute(e,n){const i=this.delayIndex.getValue(e);if(i<=0||isNaN(i)||!isFinite(i))return this._reportError(e,"Invalid delay index");const a=e._getExecutionVariable(this,"pendingDelays",[])[i];a&&a.dispose(),this.out._activateSignal(e)}getClassName(){return"FlowGraphCancelDelayBlock"}}t("FlowGraphCancelDelayBlock",s);export{s as FlowGraphCancelDelayBlock};
//# sourceMappingURL=flowGraphCancelDelayBlock-T7h6-k_Q.js.map
