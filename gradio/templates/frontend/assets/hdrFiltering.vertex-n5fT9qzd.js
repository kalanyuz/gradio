import{j as i}from"./index-DZX1lH7G.js";import"./index-C1aeWpzY.js";import"./svelte/svelte.js";const e="hdrFilteringVertexShader",r=`attribute vec2 position;varying vec3 direction;uniform vec3 up;uniform vec3 right;uniform vec3 front;
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
mat3 view=mat3(up,right,front);direction=view*vec3(position,1.0);gl_Position=vec4(position,0.0,1.0);
#define CUSTOM_VERTEX_MAIN_END
}`;i.ShadersStore[e]||(i.ShadersStore[e]=r);const d={name:e,shader:r};export{d as hdrFilteringVertexShader};
//# sourceMappingURL=hdrFiltering.vertex-n5fT9qzd.js.map
