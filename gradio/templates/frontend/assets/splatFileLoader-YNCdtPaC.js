import{j as F,R as Ht,P as Dt,E as Rt,F as Mt,H as kt,U as Ut,Z as Bt,$ as Ft,aL as Ot,a2 as Pt,a4 as Nt,a6 as Wt,S as _t,a8 as Zt,aa as X,bp as Gt,bq as Xt,ab as Oe,M as we,V as b,aU as Pe,br as jt,a as W,h as he,ak as Tt,bs as He,b as $t,av as ne,bt as Vt,ay as Y,bu as De,aS as q,Q as Kt,C as ye,az as ie,bv as L,B as qt,bw as Re,af as Qt}from"./index-DZX1lH7G.js";import{_ as Se}from"./index-C1aeWpzY.js";import"./fogFragment-BBc48syc.js";import"./logDepthDeclaration-raT6oXA4.js";import"./logDepthVertex-B6jR5aH2.js";import"./helperFunctions-BRbS76QU.js";import"./fogFragment-DxiRxFNm.js";import"./logDepthDeclaration-BY-Hzxaa.js";import"./meshUboDeclaration-pgVFCx8a.js";import"./logDepthVertex-D_SeDXFY.js";import{R as Ce}from"./rawTexture-CJyjoOuf.js";import"./thinInstanceMesh-Dd2HHxIy.js";import{A as Jt}from"./assetContainer-BKIij59_.js";import{Ray as Lt}from"./ray-BjBwSpqd.js";import{S as Yt}from"./standardMaterial-T3217qbk.js";import"./svelte/svelte.js";const dt="gaussianSplattingFragmentDeclaration",es=`vec4 gaussianColor(vec4 inColor)
{float A=-dot(vPosition,vPosition);if (A<-4.0) discard;float B=exp(A)*inColor.a;
#include<logDepthFragment>
vec3 color=inColor.rgb;
#ifdef FOG
#include<fogFragment>
#endif
return vec4(color,B);}
`;F.IncludesShadersStore[dt]||(F.IncludesShadersStore[dt]=es);const ke="gaussianSplattingPixelShader",At=`#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
varying vec4 vColor;varying vec2 vPosition;
#include<gaussianSplattingFragmentDeclaration>
void main () { 
#include<clipPlaneFragment>
gl_FragColor=gaussianColor(vColor);}
`;F.ShadersStore[ke]||(F.ShadersStore[ke]=At);const ts={name:ke,shader:At},ss=Object.freeze(Object.defineProperty({__proto__:null,gaussianSplattingPixelShader:ts},Symbol.toStringTag,{value:"Module"})),pt="gaussianSplattingVertexDeclaration",rs="attribute vec2 position;uniform mat4 view;uniform mat4 projection;uniform mat4 world;uniform vec4 vEyePosition;";F.IncludesShadersStore[pt]||(F.IncludesShadersStore[pt]=rs);const xt="gaussianSplattingUboDeclaration",os=`#include<sceneUboDeclaration>
#include<meshUboDeclaration>
attribute vec2 position;`;F.IncludesShadersStore[xt]||(F.IncludesShadersStore[xt]=os);const mt="gaussianSplatting",ns=`#if !defined(WEBGL2) && !defined(WEBGPU) && !defined(NATIVE)
mat3 transpose(mat3 matrix) {return mat3(matrix[0][0],matrix[1][0],matrix[2][0],
matrix[0][1],matrix[1][1],matrix[2][1],
matrix[0][2],matrix[1][2],matrix[2][2]);}
#endif
vec2 getDataUV(float index,vec2 textureSize) {float y=floor(index/textureSize.x);float x=index-y*textureSize.x;return vec2((x+0.5)/textureSize.x,(y+0.5)/textureSize.y);}
#if SH_DEGREE>0
ivec2 getDataUVint(float index,vec2 textureSize) {float y=floor(index/textureSize.x);float x=index-y*textureSize.x;return ivec2(uint(x+0.5),uint(y+0.5));}
#endif
struct Splat {vec4 center;vec4 color;vec4 covA;vec4 covB;
#if SH_DEGREE>0
uvec4 sh0; 
#endif
#if SH_DEGREE>1
uvec4 sh1;
#endif
#if SH_DEGREE>2
uvec4 sh2;
#endif
};Splat readSplat(float splatIndex)
{Splat splat;vec2 splatUV=getDataUV(splatIndex,dataTextureSize);splat.center=texture2D(centersTexture,splatUV);splat.color=texture2D(colorsTexture,splatUV);splat.covA=texture2D(covariancesATexture,splatUV)*splat.center.w;splat.covB=texture2D(covariancesBTexture,splatUV)*splat.center.w;
#if SH_DEGREE>0
ivec2 splatUVint=getDataUVint(splatIndex,dataTextureSize);splat.sh0=texelFetch(shTexture0,splatUVint,0);
#endif
#if SH_DEGREE>1
splat.sh1=texelFetch(shTexture1,splatUVint,0);
#endif
#if SH_DEGREE>2
splat.sh2=texelFetch(shTexture2,splatUVint,0);
#endif
return splat;}
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
vec3 computeColorFromSHDegree(vec3 dir,const vec3 sh[16])
{const float SH_C0=0.28209479;const float SH_C1=0.48860251;float SH_C2[5];SH_C2[0]=1.092548430;SH_C2[1]=-1.09254843;SH_C2[2]=0.315391565;SH_C2[3]=-1.09254843;SH_C2[4]=0.546274215;float SH_C3[7];SH_C3[0]=-0.59004358;SH_C3[1]=2.890611442;SH_C3[2]=-0.45704579;SH_C3[3]=0.373176332;SH_C3[4]=-0.45704579;SH_C3[5]=1.445305721;SH_C3[6]=-0.59004358;vec3 result=/*SH_C0**/sh[0];
#if SH_DEGREE>0
float x=dir.x;float y=dir.y;float z=dir.z;result+=- SH_C1*y*sh[1]+SH_C1*z*sh[2]-SH_C1*x*sh[3];
#if SH_DEGREE>1
float xx=x*x,yy=y*y,zz=z*z;float xy=x*y,yz=y*z,xz=x*z;result+=
SH_C2[0]*xy*sh[4] +
SH_C2[1]*yz*sh[5] +
SH_C2[2]*(2.0*zz-xx-yy)*sh[6] +
SH_C2[3]*xz*sh[7] +
SH_C2[4]*(xx-yy)*sh[8];
#if SH_DEGREE>2
result+=
SH_C3[0]*y*(3.0*xx-yy)*sh[9] +
SH_C3[1]*xy*z*sh[10] +
SH_C3[2]*y*(4.0*zz-xx-yy)*sh[11] +
SH_C3[3]*z*(2.0*zz-3.0*xx-3.0*yy)*sh[12] +
SH_C3[4]*x*(4.0*zz-xx-yy)*sh[13] +
SH_C3[5]*z*(xx-yy)*sh[14] +
SH_C3[6]*x*(xx-3.0*yy)*sh[15];
#endif
#endif
#endif
return result;}
vec4 decompose(uint value)
{vec4 components=vec4(
float((value ) & 255u),
float((value>>uint( 8)) & 255u),
float((value>>uint(16)) & 255u),
float((value>>uint(24)) & 255u));return components*vec4(2./255.)-vec4(1.);}
vec3 computeSH(Splat splat,vec3 color,vec3 dir)
{vec3 sh[16];sh[0]=color;
#if SH_DEGREE>0
vec4 sh00=decompose(splat.sh0.x);vec4 sh01=decompose(splat.sh0.y);vec4 sh02=decompose(splat.sh0.z);sh[1]=vec3(sh00.x,sh00.y,sh00.z);sh[2]=vec3(sh00.w,sh01.x,sh01.y);sh[3]=vec3(sh01.z,sh01.w,sh02.x);
#endif
#if SH_DEGREE>1
vec4 sh03=decompose(splat.sh0.w);vec4 sh04=decompose(splat.sh1.x);vec4 sh05=decompose(splat.sh1.y);sh[4]=vec3(sh02.y,sh02.z,sh02.w);sh[5]=vec3(sh03.x,sh03.y,sh03.z);sh[6]=vec3(sh03.w,sh04.x,sh04.y);sh[7]=vec3(sh04.z,sh04.w,sh05.x);sh[8]=vec3(sh05.y,sh05.z,sh05.w);
#endif
#if SH_DEGREE>2
vec4 sh06=decompose(splat.sh1.z);vec4 sh07=decompose(splat.sh1.w);vec4 sh08=decompose(splat.sh2.x);vec4 sh09=decompose(splat.sh2.y);vec4 sh10=decompose(splat.sh2.z);vec4 sh11=decompose(splat.sh2.w);sh[9]=vec3(sh06.x,sh06.y,sh06.z);sh[10]=vec3(sh06.w,sh07.x,sh07.y);sh[11]=vec3(sh07.z,sh07.w,sh08.x);sh[12]=vec3(sh08.y,sh08.z,sh08.w);sh[13]=vec3(sh09.x,sh09.y,sh09.z);sh[14]=vec3(sh09.w,sh10.x,sh10.y);sh[15]=vec3(sh10.z,sh10.w,sh11.x); 
#endif
return computeColorFromSHDegree(dir,sh);}
#else
vec3 computeSH(Splat splat,vec3 color,vec3 dir)
{return color;}
#endif
vec4 gaussianSplatting(vec2 meshPos,vec3 worldPos,vec2 scale,vec3 covA,vec3 covB,mat4 worldMatrix,mat4 viewMatrix,mat4 projectionMatrix)
{mat4 modelView=viewMatrix*worldMatrix;vec4 camspace=viewMatrix*vec4(worldPos,1.);vec4 pos2d=projectionMatrix*camspace;float bounds=1.2*pos2d.w;if (pos2d.z<-pos2d.w || pos2d.x<-bounds || pos2d.x>bounds
|| pos2d.y<-bounds || pos2d.y>bounds) {return vec4(0.0,0.0,2.0,1.0);}
mat3 Vrk=mat3(
covA.x,covA.y,covA.z,
covA.y,covB.x,covB.y,
covA.z,covB.y,covB.z
);mat3 J=mat3(
focal.x/camspace.z,0.,-(focal.x*camspace.x)/(camspace.z*camspace.z),
0.,focal.y/camspace.z,-(focal.y*camspace.y)/(camspace.z*camspace.z),
0.,0.,0.
);mat3 invy=mat3(1,0,0,0,-1,0,0,0,1);mat3 T=invy*transpose(mat3(modelView))*J;mat3 cov2d=transpose(T)*Vrk*T;float mid=(cov2d[0][0]+cov2d[1][1])/2.0;float radius=length(vec2((cov2d[0][0]-cov2d[1][1])/2.0,cov2d[0][1]));float epsilon=0.0001;float lambda1=mid+radius+epsilon,lambda2=mid-radius+epsilon;if (lambda2<0.0)
{return vec4(0.0,0.0,2.0,1.0);}
vec2 diagonalVector=normalize(vec2(cov2d[0][1],lambda1-cov2d[0][0]));vec2 majorAxis=min(sqrt(2.0*lambda1),1024.0)*diagonalVector;vec2 minorAxis=min(sqrt(2.0*lambda2),1024.0)*vec2(diagonalVector.y,-diagonalVector.x);vec2 vCenter=vec2(pos2d);return vec4(
vCenter 
+ ((meshPos.x*majorAxis
+ meshPos.y*minorAxis)*invViewport*pos2d.w)*scale,pos2d.zw);}`;F.IncludesShadersStore[mt]||(F.IncludesShadersStore[mt]=ns);const Ue="gaussianSplattingVertexShader",Et=`#include<__decl__gaussianSplattingVertex>
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<logDepthDeclaration>
#include<helperFunctions>
attribute float splatIndex;uniform vec2 invViewport;uniform vec2 dataTextureSize;uniform vec2 focal;uniform sampler2D covariancesATexture;uniform sampler2D covariancesBTexture;uniform sampler2D centersTexture;uniform sampler2D colorsTexture;
#if SH_DEGREE>0
uniform highp usampler2D shTexture0;
#endif
#if SH_DEGREE>1
uniform highp usampler2D shTexture1;
#endif
#if SH_DEGREE>2
uniform highp usampler2D shTexture2;
#endif
varying vec4 vColor;varying vec2 vPosition;
#include<gaussianSplatting>
void main () {Splat splat=readSplat(splatIndex);vec3 covA=splat.covA.xyz;vec3 covB=vec3(splat.covA.w,splat.covB.xy);vec4 worldPos=world*vec4(splat.center.xyz,1.0);vColor=splat.color;vPosition=position;
#if SH_DEGREE>0
mat3 worldRot=mat3(world);mat3 normWorldRot=inverseMat3(worldRot);vec3 dir=normalize(normWorldRot*(worldPos.xyz-vEyePosition.xyz));dir.y*=-1.; 
vColor.xyz=computeSH(splat,splat.color.xyz,dir);
#endif
gl_Position=gaussianSplatting(position,worldPos.xyz,vec2(1.,1.),covA,covB,world,view,projection);
#include<clipPlaneVertex>
#include<fogVertex>
#include<logDepthVertex>
}
`;F.ShadersStore[Ue]||(F.ShadersStore[Ue]=Et);const is={name:Ue,shader:Et},as=Object.freeze(Object.defineProperty({__proto__:null,gaussianSplattingVertexShader:is},Symbol.toStringTag,{value:"Module"})),vt="gaussianSplattingFragmentDeclaration",cs=`fn gaussianColor(inColor: vec4f,inPosition: vec2f)->vec4f
{var A : f32=-dot(inPosition,inPosition);if (A>-4.0)
{var B: f32=exp(A)*inColor.a;
#include<logDepthFragment>
var color: vec3f=inColor.rgb;
#ifdef FOG
#include<fogFragment>
#endif
return vec4f(color,B);} else {return vec4f(0.0);}}
`;F.IncludesShadersStoreWGSL[vt]||(F.IncludesShadersStoreWGSL[vt]=cs);const Be="gaussianSplattingPixelShader",zt=`#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
varying vColor: vec4f;varying vPosition: vec2f;
#include<gaussianSplattingFragmentDeclaration>
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {
#include<clipPlaneFragment>
fragmentOutputs.color=gaussianColor(input.vColor,input.vPosition);}
`;F.ShadersStoreWGSL[Be]||(F.ShadersStoreWGSL[Be]=zt);const ls={name:Be,shader:zt},us=Object.freeze(Object.defineProperty({__proto__:null,gaussianSplattingPixelShaderWGSL:ls},Symbol.toStringTag,{value:"Module"})),gt="gaussianSplatting",hs=`fn getDataUV(index: f32,dataTextureSize: vec2f)->vec2<f32> {let y: f32=floor(index/dataTextureSize.x);let x: f32=index-y*dataTextureSize.x;return vec2f((x+0.5),(y+0.5));}
struct Splat {center: vec4f,
color: vec4f,
covA: vec4f,
covB: vec4f,
#if SH_DEGREE>0
sh0: vec4<u32>,
#endif
#if SH_DEGREE>1
sh1: vec4<u32>,
#endif
#if SH_DEGREE>2
sh2: vec4<u32>,
#endif
};fn readSplat(splatIndex: f32,dataTextureSize: vec2f)->Splat {var splat: Splat;let splatUV=getDataUV(splatIndex,dataTextureSize);let splatUVi32=vec2<i32>(i32(splatUV.x),i32(splatUV.y));splat.center=textureLoad(centersTexture,splatUVi32,0);splat.color=textureLoad(colorsTexture,splatUVi32,0);splat.covA=textureLoad(covariancesATexture,splatUVi32,0)*splat.center.w;splat.covB=textureLoad(covariancesBTexture,splatUVi32,0)*splat.center.w;
#if SH_DEGREE>0
splat.sh0=textureLoad(shTexture0,splatUVi32,0);
#endif
#if SH_DEGREE>1
splat.sh1=textureLoad(shTexture1,splatUVi32,0);
#endif
#if SH_DEGREE>2
splat.sh2=textureLoad(shTexture2,splatUVi32,0);
#endif
return splat;}
fn computeColorFromSHDegree(dir: vec3f,sh: array<vec3<f32>,16>)->vec3f
{let SH_C0: f32=0.28209479;let SH_C1: f32=0.48860251;var SH_C2: array<f32,5>=array<f32,5>(
1.092548430,
-1.09254843,
0.315391565,
-1.09254843,
0.546274215
);var SH_C3: array<f32,7>=array<f32,7>(
-0.59004358,
2.890611442,
-0.45704579,
0.373176332,
-0.45704579,
1.445305721,
-0.59004358
);var result: vec3f=/*SH_C0**/sh[0];
#if SH_DEGREE>0
let x: f32=dir.x;let y: f32=dir.y;let z: f32=dir.z;result+=-SH_C1*y*sh[1]+SH_C1*z*sh[2]-SH_C1*x*sh[3];
#if SH_DEGREE>1
let xx: f32=x*x;let yy: f32=y*y;let zz: f32=z*z;let xy: f32=x*y;let yz: f32=y*z;let xz: f32=x*z;result+=
SH_C2[0]*xy*sh[4] +
SH_C2[1]*yz*sh[5] +
SH_C2[2]*(2.0f*zz-xx-yy)*sh[6] +
SH_C2[3]*xz*sh[7] +
SH_C2[4]*(xx-yy)*sh[8];
#if SH_DEGREE>2
result+=
SH_C3[0]*y*(3.0f*xx-yy)*sh[9] +
SH_C3[1]*xy*z*sh[10] +
SH_C3[2]*y*(4.0f*zz-xx-yy)*sh[11] +
SH_C3[3]*z*(2.0f*zz-3.0f*xx-3.0f*yy)*sh[12] +
SH_C3[4]*x*(4.0f*zz-xx-yy)*sh[13] +
SH_C3[5]*z*(xx-yy)*sh[14] +
SH_C3[6]*x*(xx-3.0f*yy)*sh[15];
#endif
#endif
#endif
return result;}
fn decompose(value: u32)->vec4f
{let components : vec4f=vec4f(
f32((value ) & 255u),
f32((value>>u32( 8)) & 255u),
f32((value>>u32(16)) & 255u),
f32((value>>u32(24)) & 255u));return components*vec4f(2./255.)-vec4f(1.);}
fn computeSH(splat: Splat,color: vec3f,dir: vec3f)->vec3f
{var sh: array<vec3<f32>,16>;sh[0]=color;
#if SH_DEGREE>0
let sh00: vec4f=decompose(splat.sh0.x);let sh01: vec4f=decompose(splat.sh0.y);let sh02: vec4f=decompose(splat.sh0.z);sh[1]=vec3f(sh00.x,sh00.y,sh00.z);sh[2]=vec3f(sh00.w,sh01.x,sh01.y);sh[3]=vec3f(sh01.z,sh01.w,sh02.x);
#endif
#if SH_DEGREE>1
let sh03: vec4f=decompose(splat.sh0.w);let sh04: vec4f=decompose(splat.sh1.x);let sh05: vec4f=decompose(splat.sh1.y);sh[4]=vec3f(sh02.y,sh02.z,sh02.w);sh[5]=vec3f(sh03.x,sh03.y,sh03.z);sh[6]=vec3f(sh03.w,sh04.x,sh04.y);sh[7]=vec3f(sh04.z,sh04.w,sh05.x);sh[8]=vec3f(sh05.y,sh05.z,sh05.w);
#endif
#if SH_DEGREE>2
let sh06: vec4f=decompose(splat.sh1.z);let sh07: vec4f=decompose(splat.sh1.w);let sh08: vec4f=decompose(splat.sh2.x);let sh09: vec4f=decompose(splat.sh2.y);let sh10: vec4f=decompose(splat.sh2.z);let sh11: vec4f=decompose(splat.sh2.w);sh[9]=vec3f(sh06.x,sh06.y,sh06.z);sh[10]=vec3f(sh06.w,sh07.x,sh07.y);sh[11]=vec3f(sh07.z,sh07.w,sh08.x);sh[12]=vec3f(sh08.y,sh08.z,sh08.w);sh[13]=vec3f(sh09.x,sh09.y,sh09.z);sh[14]=vec3f(sh09.w,sh10.x,sh10.y);sh[15]=vec3f(sh10.z,sh10.w,sh11.x); 
#endif
return computeColorFromSHDegree(dir,sh);}
fn gaussianSplatting(
meshPos: vec2<f32>,
worldPos: vec3<f32>,
scale: vec2<f32>,
covA: vec3<f32>,
covB: vec3<f32>,
worldMatrix: mat4x4<f32>,
viewMatrix: mat4x4<f32>,
projectionMatrix: mat4x4<f32>,
focal: vec2f,
invViewport: vec2f
)->vec4f {let modelView=viewMatrix*worldMatrix;let camspace=viewMatrix*vec4f(worldPos,1.0);let pos2d=projectionMatrix*camspace;let bounds=1.2*pos2d.w;if (pos2d.z<0. || pos2d.x<-bounds || pos2d.x>bounds || pos2d.y<-bounds || pos2d.y>bounds) {return vec4f(0.0,0.0,2.0,1.0);}
let Vrk=mat3x3<f32>(
covA.x,covA.y,covA.z,
covA.y,covB.x,covB.y,
covA.z,covB.y,covB.z
);let J=mat3x3<f32>(
focal.x/camspace.z,0.0,-(focal.x*camspace.x)/(camspace.z*camspace.z),
0.0,focal.y/camspace.z,-(focal.y*camspace.y)/(camspace.z*camspace.z),
0.0,0.0,0.0
);let invy=mat3x3<f32>(
1.0,0.0,0.0,
0.0,-1.0,0.0,
0.0,0.0,1.0
);let T=invy*transpose(mat3x3<f32>(
modelView[0].xyz,
modelView[1].xyz,
modelView[2].xyz))*J;let cov2d=transpose(T)*Vrk*T;let mid=(cov2d[0][0]+cov2d[1][1])/2.0;let radius=length(vec2<f32>((cov2d[0][0]-cov2d[1][1])/2.0,cov2d[0][1]));let lambda1=mid+radius;let lambda2=mid-radius;if (lambda2<0.0) {return vec4f(0.0,0.0,2.0,1.0);}
let diagonalVector=normalize(vec2<f32>(cov2d[0][1],lambda1-cov2d[0][0]));let majorAxis=min(sqrt(2.0*lambda1),1024.0)*diagonalVector;let minorAxis=min(sqrt(2.0*lambda2),1024.0)*vec2<f32>(diagonalVector.y,-diagonalVector.x);let vCenter=vec2<f32>(pos2d.x,pos2d.y);return vec4f(
vCenter+((meshPos.x*majorAxis+meshPos.y*minorAxis)*invViewport*pos2d.w)*scale,
pos2d.z,
pos2d.w
);}
`;F.IncludesShadersStoreWGSL[gt]||(F.IncludesShadersStoreWGSL[gt]=hs);const Fe="gaussianSplattingVertexShader",It=`#include<sceneUboDeclaration>
#include<meshUboDeclaration>
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<logDepthDeclaration>
attribute splatIndex: f32;attribute position: vec2f;uniform invViewport: vec2f;uniform dataTextureSize: vec2f;uniform focal: vec2f;var covariancesATexture: texture_2d<f32>;var covariancesBTexture: texture_2d<f32>;var centersTexture: texture_2d<f32>;var colorsTexture: texture_2d<f32>;
#if SH_DEGREE>0
var shTexture0: texture_2d<u32>;
#endif
#if SH_DEGREE>1
var shTexture1: texture_2d<u32>;
#endif
#if SH_DEGREE>2
var shTexture2: texture_2d<u32>;
#endif
varying vColor: vec4f;varying vPosition: vec2f;
#include<gaussianSplatting>
@vertex
fn main(input : VertexInputs)->FragmentInputs {var splat: Splat=readSplat(input.splatIndex,uniforms.dataTextureSize);var covA: vec3f=splat.covA.xyz;var covB: vec3f=vec3f(splat.covA.w,splat.covB.xy);let worldPos: vec4f=mesh.world*vec4f(splat.center.xyz,1.0);vertexOutputs.vPosition=input.position;
#if SH_DEGREE>0
let dir: vec3f=normalize(worldPos.xyz-scene.vEyePosition.xyz);vertexOutputs.vColor=vec4f(computeSH(splat,splat.color.xyz,dir),1.0);
#else
vertexOutputs.vColor=splat.color;
#endif
vertexOutputs.position=gaussianSplatting(input.position,worldPos.xyz,vec2f(1.0,1.0),covA,covB,mesh.world,scene.view,scene.projection,uniforms.focal,uniforms.invViewport);
#include<clipPlaneVertex>
#include<fogVertex>
#include<logDepthVertex>
}
`;F.ShadersStoreWGSL[Fe]||(F.ShadersStoreWGSL[Fe]=It);const fs={name:Fe,shader:It},_s=Object.freeze(Object.defineProperty({__proto__:null,gaussianSplattingVertexShaderWGSL:fs},Symbol.toStringTag,{value:"Module"}));class ds extends Zt{constructor(){super(),this.FOG=!1,this.THIN_INSTANCES=!0,this.LOGARITHMICDEPTH=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.SH_DEGREE=0,this.rebuild()}}class ae extends Dt{constructor(e,s){super(e,s),this.backFaceCulling=!1}get hasRenderTargetTextures(){return!1}needAlphaTesting(){return!1}needAlphaBlending(){return!0}isReadyForSubMesh(e,s){const i=s._drawWrapper;if(i.effect&&this.isFrozen&&i._wasPreviouslyReady&&i._wasPreviouslyUsingInstances===!0)return!0;s.materialDefines||(s.materialDefines=new ds);const o=this.getScene(),n=s.materialDefines;if(this._isReadyForSubMesh(s))return!0;const u=o.getEngine();if(Rt(e,o,this._useLogarithmicDepth,this.pointsCloud,this.fogEnabled,!1,n),Mt(o,u,this,n,!0,null,!0),kt(e,n,!1,!1),(u.version>1||u.isWebGPU)&&(n.SH_DEGREE=e.shDegree),n.isDirty){n.markAsProcessed(),o.resetCachedMaterial();const _=[X.PositionKind,"splatIndex"];Ut(_,n);const a=["world","view","projection","vFogInfos","vFogColor","logarithmicDepthConstant","invViewport","dataTextureSize","focal","vEyePosition"],l=["covariancesATexture","covariancesBTexture","centersTexture","colorsTexture","shTexture0","shTexture1","shTexture2"],c=["Scene","Mesh"];Bt({uniformsNames:a,uniformBuffersNames:c,samplers:l,defines:n}),Ft(a);const h=n.toString(),v=o.getEngine().createEffect("gaussianSplatting",{attributes:_,uniformsNames:a,uniformBuffersNames:c,samplers:l,defines:h,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{},shaderLanguage:this._shaderLanguage,extraInitializationsAsync:async()=>{this._shaderLanguage===1?await Promise.all([Se(()=>Promise.resolve().then(()=>us),void 0,import.meta.url),Se(()=>Promise.resolve().then(()=>_s),void 0,import.meta.url)]):await Promise.all([Se(()=>Promise.resolve().then(()=>ss),void 0,import.meta.url),Se(()=>Promise.resolve().then(()=>as),void 0,import.meta.url)])}},u);s.setEffect(v,n,this._materialContext)}return!s.effect||!s.effect.isReady()?!1:(n._renderId=o.getRenderId(),i._wasPreviouslyReady=!0,i._wasPreviouslyUsingInstances=!0,!0)}static BindEffect(e,s,r){const i=r.getEngine(),o=r.activeCamera,n=i.getRenderWidth(),u=i.getRenderHeight(),_=o?.rigParent?.rigCameras.length||1;s.setFloat2("invViewport",1/(n/_),1/u);let a=1e3;if(o){const c=o.getProjectionMatrix().m[5];o.fovMode==Ot.FOVMODE_VERTICAL_FIXED?a=u*c/2:a=n*c/2}s.setFloat2("focal",a,a);const l=e;if(l.covariancesATexture){const c=l.covariancesATexture.getSize();if(s.setFloat2("dataTextureSize",c.width,c.height),s.setTexture("covariancesATexture",l.covariancesATexture),s.setTexture("covariancesBTexture",l.covariancesBTexture),s.setTexture("centersTexture",l.centersTexture),s.setTexture("colorsTexture",l.colorsTexture),l.shTextures)for(let h=0;h<l.shTextures?.length;h++)s.setTexture(`shTexture${h}`,l.shTextures[h])}}bindForSubMesh(e,s,r){const i=this.getScene(),o=r.materialDefines;if(!o)return;const n=r.effect;if(!n)return;this._activeEffect=n,s.getMeshUniformBuffer().bindToEffect(n,"Mesh"),s.transferToEffect(e),this._mustRebind(i,n,r,s.visibility)?(this.bindView(n),this.bindViewProjection(n),ae.BindEffect(s,this._activeEffect,i),Pt(n,this,i)):i.getEngine()._features.needToAlwaysBindUniformBuffers&&(this._needToBindSceneUbo=!0),Nt(i,s,n),this.useLogarithmicDepth&&Wt(o,n,i),this._afterBind(s,this._activeEffect,r)}clone(e){return _t.Clone(()=>new ae(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.GaussianSplattingMaterial",e}getClassName(){return"GaussianSplattingMaterial"}static Parse(e,s,r){return _t.Parse(()=>new ae(e.name,s),e,s,r)}}Ht("BABYLON.GaussianSplattingMaterial",ae);const ps=Xt,j={...Gt,TwoPi:Math.PI*2,Sign:Math.sign,Log2:Math.log2,HCF:ps},V=(t,e)=>{const s=(1<<e)-1;return(t&s)/s},yt=(t,e)=>{e.x=V(t>>>21,11),e.y=V(t>>>11,10),e.z=V(t,11)},xs=(t,e)=>{e[0]=V(t>>>24,8)*255,e[1]=V(t>>>16,8)*255,e[2]=V(t>>>8,8)*255,e[3]=V(t,8)*255},ms=(t,e)=>{const s=1/(Math.sqrt(2)*.5),r=(V(t>>>20,10)-.5)*s,i=(V(t>>>10,10)-.5)*s,o=(V(t,10)-.5)*s,n=Math.sqrt(1-(r*r+i*i+o*o));switch(t>>>30){case 0:e.set(n,r,i,o);break;case 1:e.set(r,n,i,o);break;case 2:e.set(r,i,n,o);break;case 3:e.set(r,i,o,n);break}};var St;(function(t){t[t.FLOAT=0]="FLOAT",t[t.INT=1]="INT",t[t.UINT=2]="UINT",t[t.DOUBLE=3]="DOUBLE",t[t.UCHAR=4]="UCHAR",t[t.UNDEFINED=5]="UNDEFINED"})(St||(St={}));var Ct;(function(t){t[t.MIN_X=0]="MIN_X",t[t.MIN_Y=1]="MIN_Y",t[t.MIN_Z=2]="MIN_Z",t[t.MAX_X=3]="MAX_X",t[t.MAX_Y=4]="MAX_Y",t[t.MAX_Z=5]="MAX_Z",t[t.MIN_SCALE_X=6]="MIN_SCALE_X",t[t.MIN_SCALE_Y=7]="MIN_SCALE_Y",t[t.MIN_SCALE_Z=8]="MIN_SCALE_Z",t[t.MAX_SCALE_X=9]="MAX_SCALE_X",t[t.MAX_SCALE_Y=10]="MAX_SCALE_Y",t[t.MAX_SCALE_Z=11]="MAX_SCALE_Z",t[t.PACKED_POSITION=12]="PACKED_POSITION",t[t.PACKED_ROTATION=13]="PACKED_ROTATION",t[t.PACKED_SCALE=14]="PACKED_SCALE",t[t.PACKED_COLOR=15]="PACKED_COLOR",t[t.X=16]="X",t[t.Y=17]="Y",t[t.Z=18]="Z",t[t.SCALE_0=19]="SCALE_0",t[t.SCALE_1=20]="SCALE_1",t[t.SCALE_2=21]="SCALE_2",t[t.DIFFUSE_RED=22]="DIFFUSE_RED",t[t.DIFFUSE_GREEN=23]="DIFFUSE_GREEN",t[t.DIFFUSE_BLUE=24]="DIFFUSE_BLUE",t[t.OPACITY=25]="OPACITY",t[t.F_DC_0=26]="F_DC_0",t[t.F_DC_1=27]="F_DC_1",t[t.F_DC_2=28]="F_DC_2",t[t.F_DC_3=29]="F_DC_3",t[t.ROT_0=30]="ROT_0",t[t.ROT_1=31]="ROT_1",t[t.ROT_2=32]="ROT_2",t[t.ROT_3=33]="ROT_3",t[t.MIN_COLOR_R=34]="MIN_COLOR_R",t[t.MIN_COLOR_G=35]="MIN_COLOR_G",t[t.MIN_COLOR_B=36]="MIN_COLOR_B",t[t.MAX_COLOR_R=37]="MAX_COLOR_R",t[t.MAX_COLOR_G=38]="MAX_COLOR_G",t[t.MAX_COLOR_B=39]="MAX_COLOR_B",t[t.SH_0=40]="SH_0",t[t.SH_1=41]="SH_1",t[t.SH_2=42]="SH_2",t[t.SH_3=43]="SH_3",t[t.SH_4=44]="SH_4",t[t.SH_5=45]="SH_5",t[t.SH_6=46]="SH_6",t[t.SH_7=47]="SH_7",t[t.SH_8=48]="SH_8",t[t.SH_9=49]="SH_9",t[t.SH_10=50]="SH_10",t[t.SH_11=51]="SH_11",t[t.SH_12=52]="SH_12",t[t.SH_13=53]="SH_13",t[t.SH_14=54]="SH_14",t[t.SH_15=55]="SH_15",t[t.SH_16=56]="SH_16",t[t.SH_17=57]="SH_17",t[t.SH_18=58]="SH_18",t[t.SH_19=59]="SH_19",t[t.SH_20=60]="SH_20",t[t.SH_21=61]="SH_21",t[t.SH_22=62]="SH_22",t[t.SH_23=63]="SH_23",t[t.SH_24=64]="SH_24",t[t.SH_25=65]="SH_25",t[t.SH_26=66]="SH_26",t[t.SH_27=67]="SH_27",t[t.SH_28=68]="SH_28",t[t.SH_29=69]="SH_29",t[t.SH_30=70]="SH_30",t[t.SH_31=71]="SH_31",t[t.SH_32=72]="SH_32",t[t.SH_33=73]="SH_33",t[t.SH_34=74]="SH_34",t[t.SH_35=75]="SH_35",t[t.SH_36=76]="SH_36",t[t.SH_37=77]="SH_37",t[t.SH_38=78]="SH_38",t[t.SH_39=79]="SH_39",t[t.SH_40=80]="SH_40",t[t.SH_41=81]="SH_41",t[t.SH_42=82]="SH_42",t[t.SH_43=83]="SH_43",t[t.SH_44=84]="SH_44",t[t.UNDEFINED=85]="UNDEFINED"})(Ct||(Ct={}));class A extends Oe{get shDegree(){return this._shDegree}get splatsData(){return this._splatsData}get covariancesATexture(){return this._covariancesATexture}get covariancesBTexture(){return this._covariancesBTexture}get centersTexture(){return this._centersTexture}get colorsTexture(){return this._colorsTexture}get shTextures(){return this._shTextures}set material(e){this._material=e,this._material.backFaceCulling=!0,this._material.cullBackFaces=!1,e.resetDrawCache()}get material(){return this._material}constructor(e,s=null,r=null,i=!1){super(e,r),this._vertexCount=0,this._worker=null,this._frameIdLastUpdate=-1,this._modelViewMatrix=we.Identity(),this._canPostToWorker=!0,this._readyToDisplay=!1,this._covariancesATexture=null,this._covariancesBTexture=null,this._centersTexture=null,this._colorsTexture=null,this._splatPositions=null,this._splatIndex=null,this._shTextures=null,this._splatsData=null,this._sh=null,this._keepInRam=!1,this._delayedTextureUpdate=null,this._oldDirection=new b,this._useRGBACovariants=!1,this._material=null,this._tmpCovariances=[0,0,0,0,0,0],this._sortIsDirty=!1,this._shDegree=0;const o=new Pe;o.positions=[-3,-2,0,3,-2,0,0,4,0],o.indices=[0,1,2],o.applyToMesh(this),this.subMeshes=[],new jt(0,0,3,0,3,this),this.setEnabled(!1),this._useRGBACovariants=!this.getEngine().isWebGPU&&this.getEngine().version===1,this._keepInRam=i,s&&this.loadFileAsync(s),this._material=new ae(this.name+"_material",this._scene)}getClassName(){return"GaussianSplattingMesh"}getTotalVertices(){return this._vertexCount}isReady(e=!1){return super.isReady(e,!0)?this._readyToDisplay?!0:(this._postToWorker(!0),!1):!1}_postToWorker(e=!1){const s=this.getScene().getFrameId();if((e||s!==this._frameIdLastUpdate)&&this._worker&&this._scene.activeCamera&&this._canPostToWorker){const r=this._scene.activeCamera.getViewMatrix();this.getWorldMatrix().multiplyToRef(r,this._modelViewMatrix),r.invertToRef(W.Matrix[0]),this.getWorldMatrix().multiplyToRef(W.Matrix[0],W.Matrix[1]),b.TransformNormalToRef(b.Forward(this._scene.useRightHandedSystem),W.Matrix[1],W.Vector3[2]),W.Vector3[2].normalize();const i=b.Dot(W.Vector3[2],this._oldDirection);(e||Math.abs(i-1)>=.01)&&(this._oldDirection.copyFrom(W.Vector3[2]),this._frameIdLastUpdate=s,this._canPostToWorker=!1,this._worker.postMessage({view:this._modelViewMatrix.m,depthMix:this._depthMix,useRightHandedSystem:this._scene.useRightHandedSystem},[this._depthMix.buffer]))}}render(e,s,r){return this._postToWorker(),super.render(e,s,r)}static _TypeNameToEnum(e){switch(e){case"float":return 0;case"int":return 1;case"uint":return 2;case"double":return 3;case"uchar":return 4}return 5}static _ValueNameToEnum(e){switch(e){case"min_x":return 0;case"min_y":return 1;case"min_z":return 2;case"max_x":return 3;case"max_y":return 4;case"max_z":return 5;case"min_scale_x":return 6;case"min_scale_y":return 7;case"min_scale_z":return 8;case"max_scale_x":return 9;case"max_scale_y":return 10;case"max_scale_z":return 11;case"packed_position":return 12;case"packed_rotation":return 13;case"packed_scale":return 14;case"packed_color":return 15;case"x":return 16;case"y":return 17;case"z":return 18;case"scale_0":return 19;case"scale_1":return 20;case"scale_2":return 21;case"diffuse_red":case"red":return 22;case"diffuse_green":case"green":return 23;case"diffuse_blue":case"blue":return 24;case"f_dc_0":return 26;case"f_dc_1":return 27;case"f_dc_2":return 28;case"f_dc_3":return 29;case"opacity":return 25;case"rot_0":return 30;case"rot_1":return 31;case"rot_2":return 32;case"rot_3":return 33;case"min_r":return 34;case"min_g":return 35;case"min_b":return 36;case"max_r":return 37;case"max_g":return 38;case"max_b":return 39;case"f_rest_0":return 40;case"f_rest_1":return 41;case"f_rest_2":return 42;case"f_rest_3":return 43;case"f_rest_4":return 44;case"f_rest_5":return 45;case"f_rest_6":return 46;case"f_rest_7":return 47;case"f_rest_8":return 48;case"f_rest_9":return 49;case"f_rest_10":return 50;case"f_rest_11":return 51;case"f_rest_12":return 52;case"f_rest_13":return 53;case"f_rest_14":return 54;case"f_rest_15":return 55;case"f_rest_16":return 56;case"f_rest_17":return 57;case"f_rest_18":return 58;case"f_rest_19":return 59;case"f_rest_20":return 60;case"f_rest_21":return 61;case"f_rest_22":return 62;case"f_rest_23":return 63;case"f_rest_24":return 64;case"f_rest_25":return 65;case"f_rest_26":return 66;case"f_rest_27":return 67;case"f_rest_28":return 68;case"f_rest_29":return 69;case"f_rest_30":return 70;case"f_rest_31":return 71;case"f_rest_32":return 72;case"f_rest_33":return 73;case"f_rest_34":return 74;case"f_rest_35":return 75;case"f_rest_36":return 76;case"f_rest_37":return 77;case"f_rest_38":return 78;case"f_rest_39":return 79;case"f_rest_40":return 80;case"f_rest_41":return 81;case"f_rest_42":return 82;case"f_rest_43":return 83;case"f_rest_44":return 84}return 85}static ParseHeader(e){const s=new Uint8Array(e),r=new TextDecoder().decode(s.slice(0,1024*10)),i=`end_header
`,o=r.indexOf(i);if(o<0||!r)return null;const n=parseInt(/element vertex (\d+)\n/.exec(r)[1]),u=/element chunk (\d+)\n/.exec(r);let _=0;u&&(_=parseInt(u[1]));let a=0,l=0;const c={double:8,int:4,uint:4,float:4,short:2,ushort:2,uchar:1,list:0};let h;(function(m){m[m.Vertex=0]="Vertex",m[m.Chunk=1]="Chunk"})(h||(h={}));let v=1;const y=[],g=[],p=r.slice(0,o).split(`
`);let S=0;for(const m of p)if(m.startsWith("property ")){const[,f,z]=m.split(" "),I=A._ValueNameToEnum(z);I>=84?S=3:I>=64?S=2:I>=48&&(S=1);const M=A._TypeNameToEnum(f);v==1?(g.push({value:I,type:M,offset:l}),l+=c[f]):v==0&&(y.push({value:I,type:M,offset:a}),a+=c[f]),c[f]||he.Warn(`Unsupported property type: ${f}.`)}else if(m.startsWith("element ")){const[,f]=m.split(" ");f=="chunk"?v=1:f=="vertex"&&(v=0)}const T=new DataView(e,o+i.length),C=new ArrayBuffer(A._RowOutputLength*n);let d=null,x=0;return S&&(x=((S+1)*(S+1)-1)*3,d=new ArrayBuffer(x*n)),{vertexCount:n,chunkCount:_,rowVertexLength:a,rowChunkLength:l,vertexProperties:y,chunkProperties:g,dataView:T,buffer:C,shDegree:S,shCoefficientCount:x,shBuffer:d}}static _GetCompressedChunks(e,s){if(!e.chunkCount)return null;const r=e.dataView,i=new Array(e.chunkCount);for(let o=0;o<e.chunkCount;o++){const n={min:new b,max:new b,minScale:new b,maxScale:new b,minColor:new b(0,0,0),maxColor:new b(1,1,1)};i[o]=n;for(let u=0;u<e.chunkProperties.length;u++){const _=e.chunkProperties[u];let a;switch(_.type){case 0:a=r.getFloat32(_.offset+s.value,!0);break;default:continue}switch(_.value){case 0:n.min.x=a;break;case 1:n.min.y=a;break;case 2:n.min.z=a;break;case 3:n.max.x=a;break;case 4:n.max.y=a;break;case 5:n.max.z=a;break;case 6:n.minScale.x=a;break;case 7:n.minScale.y=a;break;case 8:n.minScale.z=a;break;case 9:n.maxScale.x=a;break;case 10:n.maxScale.y=a;break;case 11:n.maxScale.z=a;break;case 34:n.minColor.x=a;break;case 35:n.minColor.y=a;break;case 36:n.minColor.z=a;break;case 37:n.maxColor.x=a;break;case 38:n.maxColor.y=a;break;case 39:n.maxColor.z=a;break}}s.value+=e.rowChunkLength}return i}static _GetSplat(e,s,r,i){const o=W.Quaternion[0],n=W.Vector3[0],u=A._RowOutputLength,_=e.buffer,a=e.dataView,l=new Float32Array(_,s*u,3),c=new Float32Array(_,s*u+12,3),h=new Uint8ClampedArray(_,s*u+24,4),v=new Uint8ClampedArray(_,s*u+28,4);let y=null;e.shBuffer&&(y=new Uint8ClampedArray(e.shBuffer,s*e.shCoefficientCount,e.shCoefficientCount));const g=s>>8;let p=255,S=0,T=0,C=0;for(let d=0;d<e.vertexProperties.length;d++){const x=e.vertexProperties[d];let m;switch(x.type){case 0:m=a.getFloat32(i.value+x.offset,!0);break;case 1:m=a.getInt32(i.value+x.offset,!0);break;case 2:m=a.getUint32(i.value+x.offset,!0);break;case 3:m=a.getFloat64(i.value+x.offset,!0);break;case 4:m=a.getUint8(i.value+x.offset);break;default:continue}switch(x.value){case 12:{const f=r[g];yt(m,n),l[0]=j.Lerp(f.min.x,f.max.x,n.x),l[1]=j.Lerp(f.min.y,f.max.y,n.y),l[2]=j.Lerp(f.min.z,f.max.z,n.z)}break;case 13:ms(m,o),p=o.w,S=-o.z,T=o.y,C=-o.x;break;case 14:{const f=r[g];yt(m,n),c[0]=Math.exp(j.Lerp(f.minScale.x,f.maxScale.x,n.x)),c[1]=Math.exp(j.Lerp(f.minScale.y,f.maxScale.y,n.y)),c[2]=Math.exp(j.Lerp(f.minScale.z,f.maxScale.z,n.z))}break;case 15:{const f=r[g];xs(m,h),h[0]=j.Lerp(f.minColor.x,f.maxColor.x,h[0]/255)*255,h[1]=j.Lerp(f.minColor.y,f.maxColor.y,h[1]/255)*255,h[2]=j.Lerp(f.minColor.z,f.maxColor.z,h[2]/255)*255}break;case 16:l[0]=m;break;case 17:l[1]=m;break;case 18:l[2]=m;break;case 19:c[0]=Math.exp(m);break;case 20:c[1]=Math.exp(m);break;case 21:c[2]=Math.exp(m);break;case 22:h[0]=m;break;case 23:h[1]=m;break;case 24:h[2]=m;break;case 26:h[0]=(.5+A._SH_C0*m)*255;break;case 27:h[1]=(.5+A._SH_C0*m)*255;break;case 28:h[2]=(.5+A._SH_C0*m)*255;break;case 29:h[3]=(.5+A._SH_C0*m)*255;break;case 25:h[3]=1/(1+Math.exp(-m))*255;break;case 30:p=m;break;case 31:S=m;break;case 32:T=m;break;case 33:C=m;break}if(y&&x.value>=40&&x.value<=84){const f=j.Clamp(m*127.5+127.5,0,255),z=x.value-40;y[z]=f}}o.set(S,T,C,p),o.normalize(),v[0]=o.w*128+128,v[1]=o.x*128+128,v[2]=o.y*128+128,v[3]=o.z*128+128,i.value+=e.rowVertexLength}static*ConvertPLYWithSHToSplat(e,s=!1){const r=A.ParseHeader(e);if(!r)return{buffer:e};const i={value:0},o=A._GetCompressedChunks(r,i);for(let u=0;u<r.vertexCount;u++)A._GetSplat(r,u,o,i),u%A._PlyConversionBatchSize===0&&s&&(yield);let n=null;if(r.shDegree&&r.shBuffer){const u=Math.ceil(r.shCoefficientCount/16);let _=0;const a=new Uint8Array(r.shBuffer);n=[];const l=r.vertexCount,c=Tt.LastCreatedEngine;if(c){const h=c.getCaps().maxTextureSize,v=Math.ceil(l/h);for(let y=0;y<u;y++){const g=new Uint8Array(v*h*4*4);n.push(g)}for(let y=0;y<l;y++)for(let g=0;g<r.shCoefficientCount;g++){const p=a[_++],S=Math.floor(g/16),T=n[S],C=g%16,d=y*16;T[C+d]=p}}}return{buffer:r.buffer,sh:n}}static*ConvertPLYToSplat(e,s=!1){const r=A.ParseHeader(e);if(!r)return e;const i={value:0},o=A._GetCompressedChunks(r,i);for(let n=0;n<r.vertexCount;n++)A._GetSplat(r,n,o,i),n%A._PlyConversionBatchSize===0&&s&&(yield);return r.buffer}static async ConvertPLYToSplatAsync(e){return He(A.ConvertPLYToSplat(e,!0),De())}static async ConvertPLYWithSHToSplatAsync(e){return He(A.ConvertPLYWithSHToSplat(e,!0),De())}loadDataAsync(e){return this.updateDataAsync(e)}loadFileAsync(e){return $t.LoadFileAsync(e,!0).then(async s=>{A.ConvertPLYWithSHToSplatAsync(s).then(r=>{this.updateDataAsync(r.buffer,r.sh)})})}dispose(e){this._covariancesATexture?.dispose(),this._covariancesBTexture?.dispose(),this._centersTexture?.dispose(),this._colorsTexture?.dispose(),this._shTextures&&this._shTextures.forEach(s=>{s.dispose()}),this._covariancesATexture=null,this._covariancesBTexture=null,this._centersTexture=null,this._colorsTexture=null,this._shTextures=null,this._worker?.terminate(),this._worker=null,super.dispose(e,!0)}_copyTextures(e){this._covariancesATexture=e.covariancesATexture?.clone(),this._covariancesBTexture=e.covariancesBTexture?.clone(),this._centersTexture=e.centersTexture?.clone(),this._colorsTexture=e.colorsTexture?.clone(),e._shTextures&&(this._shTextures=[],this._shTextures.forEach(s=>{this._shTextures?.push(s.clone())}))}clone(e=""){const s=new A(e,void 0,this.getScene());s._copySource(this),s.makeGeometryUnique(),s._vertexCount=this._vertexCount,s._copyTextures(this),s._modelViewMatrix=we.Identity(),s._splatPositions=this._splatPositions,s._readyToDisplay=!1,s._instanciateWorker();const r=this.getBoundingInfo();return s.getBoundingInfo().reConstruct(r.minimum,r.maximum,this.getWorldMatrix()),s.forcedInstanceCount=s._vertexCount,s.setEnabled(!0),s}_makeSplat(e,s,r,i,o,n,u,_){const a=W.Matrix[0],l=W.Matrix[1],c=W.Quaternion[0],h=this._useRGBACovariants?4:2,v=s[8*e+0],y=-s[8*e+1],g=s[8*e+2];this._splatPositions[4*e+0]=v,this._splatPositions[4*e+1]=y,this._splatPositions[4*e+2]=g,u.minimizeInPlaceFromFloats(v,y,g),_.maximizeInPlaceFromFloats(v,y,g),c.set((r[32*e+28+1]-127.5)/127.5,(r[32*e+28+2]-127.5)/127.5,(r[32*e+28+3]-127.5)/127.5,-(r[32*e+28+0]-127.5)/127.5),c.toRotationMatrix(a),we.ScalingToRef(s[8*e+3+0]*2,s[8*e+3+1]*2,s[8*e+3+2]*2,l);const p=a.multiplyToRef(l,W.Matrix[0]).m,S=this._tmpCovariances;S[0]=p[0]*p[0]+p[1]*p[1]+p[2]*p[2],S[1]=p[0]*p[4]+p[1]*p[5]+p[2]*p[6],S[2]=p[0]*p[8]+p[1]*p[9]+p[2]*p[10],S[3]=p[4]*p[4]+p[5]*p[5]+p[6]*p[6],S[4]=p[4]*p[8]+p[5]*p[9]+p[6]*p[10],S[5]=p[8]*p[8]+p[9]*p[9]+p[10]*p[10];let T=-1e4;for(let d=0;d<6;d++)T=Math.max(T,Math.abs(S[d]));this._splatPositions[4*e+3]=T;const C=T;i[e*4+0]=ne(S[0]/C),i[e*4+1]=ne(S[1]/C),i[e*4+2]=ne(S[2]/C),i[e*4+3]=ne(S[3]/C),o[e*h+0]=ne(S[4]/C),o[e*h+1]=ne(S[5]/C),n[e*4+0]=r[32*e+24+0],n[e*4+1]=r[32*e+24+1],n[e*4+2]=r[32*e+24+2],n[e*4+3]=r[32*e+24+3]}_updateTextures(e,s,r,i){const o=this._getTextureSize(this._vertexCount),n=(l,c,h,v)=>new Ce(l,c,h,v,this._scene,!1,!1,2,1),u=(l,c,h,v)=>new Ce(l,c,h,v,this._scene,!1,!1,2,0),_=(l,c,h,v)=>new Ce(l,c,h,v,this._scene,!1,!1,1,7),a=(l,c,h,v)=>new Ce(l,c,h,v,this._scene,!1,!1,2,2);if(this._covariancesATexture){this._delayedTextureUpdate={covA:e,covB:s,colors:r,centers:this._splatPositions,sh:i};const l=Float32Array.from(this._splatPositions),c=this._vertexCount;this._worker.postMessage({positions:l,vertexCount:c},[l.buffer]),this._postToWorker(!0)}else this._covariancesATexture=a(e,o.x,o.y,5),this._covariancesBTexture=a(s,o.x,o.y,this._useRGBACovariants?5:7),this._centersTexture=n(this._splatPositions,o.x,o.y,5),this._colorsTexture=u(r,o.x,o.y,5),i&&(this._shTextures=[],i.forEach(l=>{const c=new Uint32Array(l.buffer),h=_(c,o.x,o.y,11);h.wrapU=0,h.wrapV=0,this._shTextures.push(h)})),this._instanciateWorker()}*_updateData(e,s,r){this._covariancesATexture||(this._readyToDisplay=!1);const i=new Uint8Array(e),o=new Float32Array(i.buffer);this._keepInRam&&(this._splatsData=e,r&&(this._sh=r));const n=i.length/A._RowOutputLength;n!=this._vertexCount&&this._updateSplatIndexBuffer(n),this._vertexCount=n,this._shDegree=r?r.length:0;const u=this._getTextureSize(n),_=u.x*u.y,a=A.ProgressiveUpdateAmount??u.y,l=u.x*a;this._splatPositions=new Float32Array(4*_);const c=new Uint16Array(_*4),h=new Uint16Array((this._useRGBACovariants?4:2)*_),v=new Uint8Array(_*4),y=new b(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),g=new b(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);if(A.ProgressiveUpdateAmount){this._updateTextures(c,h,v,r),this.setEnabled(!0);const p=Math.ceil(u.y/a);for(let C=0;C<p;C++){const d=C*a,x=d*u.x;for(let m=0;m<l;m++)this._makeSplat(x+m,o,i,c,h,v,y,g);this._updateSubTextures(this._splatPositions,c,h,v,d,Math.min(a,u.y-d)),this.getBoundingInfo().reConstruct(y,g,this.getWorldMatrix()),s&&(yield)}const S=Float32Array.from(this._splatPositions),T=this._vertexCount;this._worker.postMessage({positions:S,vertexCount:T},[S.buffer]),this._sortIsDirty=!0}else{for(let p=0;p<n;p++)this._makeSplat(p,o,i,c,h,v,y,g),s&&p%A._SplatBatchSize===0&&(yield);this._updateTextures(c,h,v,r),this.getBoundingInfo().reConstruct(y,g,this.getWorldMatrix()),this.setEnabled(!0)}this._postToWorker(!0)}async updateDataAsync(e,s){return He(this._updateData(e,!0,s),De())}updateData(e,s){Vt(this._updateData(e,!1,s))}refreshBoundingInfo(){return this.thinInstanceRefreshBoundingInfo(!1),this}_updateSplatIndexBuffer(e){(!this._splatIndex||e>this._splatIndex.length)&&(this._splatIndex=new Float32Array(e),this.thinInstanceSetBuffer("splatIndex",this._splatIndex,1,!1)),this.forcedInstanceCount=e}_updateSubTextures(e,s,r,i,o,n,u){const _=(S,T,C,d,x)=>{this.getEngine().updateTextureData(S.getInternalTexture(),T,0,d,C,x,0,0,!1)},a=this._getTextureSize(this._vertexCount),l=this._useRGBACovariants?4:2,c=o*a.x,h=n*a.x,v=new Uint16Array(s.buffer,c*4*Uint16Array.BYTES_PER_ELEMENT,h*4),y=new Uint16Array(r.buffer,c*l*Uint16Array.BYTES_PER_ELEMENT,h*l),g=new Uint8Array(i.buffer,c*4,h*4),p=new Float32Array(e.buffer,c*4*Float32Array.BYTES_PER_ELEMENT,h*4);if(_(this._covariancesATexture,v,a.x,o,n),_(this._covariancesBTexture,y,a.x,o,n),_(this._centersTexture,p,a.x,o,n),_(this._colorsTexture,g,a.x,o,n),u)for(let S=0;S<u.length;S++){const C=new Uint8Array(this._sh[S].buffer,c*4,h*4);_(this._shTextures[S],C,a.x,o,n)}}_instanciateWorker(){if(!this._vertexCount)return;this._updateSplatIndexBuffer(this._vertexCount),this._worker?.terminate(),this._worker=new Worker(URL.createObjectURL(new Blob(["(",A._CreateWorker.toString(),")(self)"],{type:"application/javascript"}))),this._depthMix=new BigInt64Array(this._vertexCount);const e=Float32Array.from(this._splatPositions),s=this._vertexCount;this._worker.postMessage({positions:e,vertexCount:s},[e.buffer]),this._worker.onmessage=r=>{this._depthMix=r.data.depthMix;const i=new Uint32Array(r.data.depthMix.buffer);if(this._splatIndex)for(let o=0;o<this._vertexCount;o++)this._splatIndex[o]=i[2*o];if(this._delayedTextureUpdate){const o=this._getTextureSize(s);this._updateSubTextures(this._delayedTextureUpdate.centers,this._delayedTextureUpdate.covA,this._delayedTextureUpdate.covB,this._delayedTextureUpdate.colors,0,o.y,this._delayedTextureUpdate.sh),this._delayedTextureUpdate=null}this.thinInstanceBufferUpdated("splatIndex"),this._canPostToWorker=!0,this._readyToDisplay=!0,this._sortIsDirty&&(this._postToWorker(!0),this._sortIsDirty=!1)}}_getTextureSize(e){const s=this._scene.getEngine(),r=s.getCaps().maxTextureSize;let i=1;if(s.version===1&&!s.isWebGPU)for(;r*i<e;)i*=2;else i=Math.ceil(e/r);return i>r&&(he.Error("GaussianSplatting texture size: ("+r+", "+i+"), maxTextureSize: "+r),i=r),new Y(r,i)}}A._RowOutputLength=3*4+3*4+4+4;A._SH_C0=.28209479177387814;A._SplatBatchSize=327680;A._PlyConversionBatchSize=32768;A.ProgressiveUpdateAmount=0;A._CreateWorker=function(t){let e=0,s,r,i,o;t.onmessage=n=>{if(n.data.positions)s=n.data.positions,e=n.data.vertexCount;else{const u=n.data.view;if(!s||!u)throw new Error("positions or view is not defined!");r=n.data.depthMix,i=new Uint32Array(r.buffer),o=new Float32Array(r.buffer);for(let a=0;a<e;a++)i[2*a]=a;let _=-1;n.data.useRightHandedSystem&&(_=1);for(let a=0;a<e;a++)o[2*a+1]=1e4+(u[2]*s[4*a+0]+u[6]*s[4*a+1]+u[10]*s[4*a+2])*_;r.sort(),t.postMessage({depthMix:r},[r.buffer])}}};class vs{constructor(e,s,r,i,o){this.idx=0,this.color=new q(1,1,1,1),this.position=b.Zero(),this.rotation=b.Zero(),this.uv=new Y(0,0),this.velocity=b.Zero(),this.pivot=b.Zero(),this.translateFromPivot=!1,this._pos=0,this._ind=0,this.groupId=0,this.idxInGroup=0,this._stillInvisible=!1,this._rotationMatrix=[1,0,0,0,1,0,0,0,1],this.parentId=null,this._globalPosition=b.Zero(),this.idx=e,this._group=s,this.groupId=r,this.idxInGroup=i,this._pcs=o}get size(){return this.size}set size(e){this.size=e}get quaternion(){return this.rotationQuaternion}set quaternion(e){this.rotationQuaternion=e}intersectsMesh(e,s){if(!e.hasBoundingInfo)return!1;if(!this._pcs.mesh)throw new Error("Point Cloud System doesnt contain the Mesh");if(s)return e.getBoundingInfo().boundingSphere.intersectsPoint(this.position.add(this._pcs.mesh.position));const r=e.getBoundingInfo().boundingBox,i=r.maximumWorld.x,o=r.minimumWorld.x,n=r.maximumWorld.y,u=r.minimumWorld.y,_=r.maximumWorld.z,a=r.minimumWorld.z,l=this.position.x+this._pcs.mesh.position.x,c=this.position.y+this._pcs.mesh.position.y,h=this.position.z+this._pcs.mesh.position.z;return o<=l&&l<=i&&u<=c&&c<=n&&a<=h&&h<=_}getRotationMatrix(e){let s;if(this.rotationQuaternion)s=this.rotationQuaternion;else{s=W.Quaternion[0];const r=this.rotation;Kt.RotationYawPitchRollToRef(r.y,r.x,r.z,s)}s.toRotationMatrix(e)}}class Me{get groupID(){return this.groupId}set groupID(e){this.groupId=e}constructor(e,s){this.groupId=e,this._positionFunction=s}}var wt;(function(t){t[t.Color=2]="Color",t[t.UV=1]="UV",t[t.Random=0]="Random",t[t.Stated=3]="Stated"})(wt||(wt={}));class gs{get positions(){return this._positions32}get colors(){return this._colors32}get uvs(){return this._uvs32}constructor(e,s,r,i){this.particles=new Array,this.nbParticles=0,this.counter=0,this.vars={},this._promises=[],this._positions=new Array,this._indices=new Array,this._normals=new Array,this._colors=new Array,this._uvs=new Array,this._updatable=!0,this._isVisibilityBoxLocked=!1,this._alwaysVisible=!1,this._groups=new Array,this._groupCounter=0,this._computeParticleColor=!0,this._computeParticleTexture=!0,this._computeParticleRotation=!0,this._computeBoundingBox=!1,this._isReady=!1,this.name=e,this._size=s,this._scene=r||Tt.LastCreatedScene,i&&i.updatable!==void 0?this._updatable=i.updatable:this._updatable=!0}buildMeshAsync(e){return Promise.all(this._promises).then(()=>(this._isReady=!0,this._buildMesh(e)))}_buildMesh(e){this.nbParticles===0&&this.addPoints(1),this._positions32=new Float32Array(this._positions),this._uvs32=new Float32Array(this._uvs),this._colors32=new Float32Array(this._colors);const s=new Pe;s.set(this._positions32,X.PositionKind),this._uvs32.length>0&&s.set(this._uvs32,X.UVKind);let r=0;this._colors32.length>0&&(r=1,s.set(this._colors32,X.ColorKind));const i=new Oe(this.name,this._scene);s.applyToMesh(i,this._updatable),this.mesh=i,this._positions=null,this._uvs=null,this._colors=null,this._updatable||(this.particles.length=0);let o=e;return o||(o=new Yt("point cloud material",this._scene),o.emissiveColor=new ye(r,r,r),o.disableLighting=!0,o.pointsCloud=!0,o.pointSize=this._size),i.material=o,new Promise(n=>n(i))}_addParticle(e,s,r,i){const o=new vs(e,s,r,i,this);return this.particles.push(o),o}_randomUnitVector(e){e.position=new b(Math.random(),Math.random(),Math.random()),e.color=new q(1,1,1,1)}_getColorIndicesForCoord(e,s,r,i){const o=e._groupImageData,n=r*(i*4)+s*4,u=[n,n+1,n+2,n+3],_=u[0],a=u[1],l=u[2],c=u[3],h=o[_],v=o[a],y=o[l],g=o[c];return new q(h/255,v/255,y/255,g)}_setPointsColorOrUV(e,s,r,i,o,n,u,_){_=_??0,r&&e.updateFacetData();const l=2*e.getBoundingInfo().boundingSphere.radius;let c=e.getVerticesData(X.PositionKind);const h=e.getIndices(),v=e.getVerticesData(X.UVKind+(_?_+1:"")),y=e.getVerticesData(X.ColorKind),g=b.Zero();e.computeWorldMatrix();const p=e.getWorldMatrix();if(!p.isIdentity()){c=c.slice(0);for(let N=0;N<c.length/3;N++)b.TransformCoordinatesFromFloatsToRef(c[3*N],c[3*N+1],c[3*N+2],p,g),c[3*N]=g.x,c[3*N+1]=g.y,c[3*N+2]=g.z}let S=0,T=0,C=0,d=0,x=0,m=0,f=0,z=0,I=0,M=0,O=0,D=0,P=0;const k=b.Zero(),R=b.Zero(),B=b.Zero(),Z=b.Zero(),K=b.Zero();let $=0,U=0,w=0,ee=0,fe=0,_e=0;const ce=Y.Zero(),E=Y.Zero(),Ne=Y.Zero(),We=Y.Zero(),Ze=Y.Zero();let Ge=0,Xe=0,je=0,$e=0,Ve=0,Ke=0,qe=0,Qe=0,Je=0,Le=0,Ye=0,et=0;const le=ie.Zero(),be=ie.Zero(),tt=ie.Zero(),st=ie.Zero(),rt=ie.Zero();let J=0,de=0;u=u||0;let ue,pe,H=new ie(0,0,0,0),Te=b.Zero(),Ae=b.Zero(),ot=b.Zero(),te=0,nt=b.Zero(),it=0,at=0;const xe=new Lt(b.Zero(),new b(1,0,0));let Ee,me=b.Zero();for(let N=0;N<h.length/3;N++){T=h[3*N],C=h[3*N+1],d=h[3*N+2],x=c[3*T],m=c[3*T+1],f=c[3*T+2],z=c[3*C],I=c[3*C+1],M=c[3*C+2],O=c[3*d],D=c[3*d+1],P=c[3*d+2],k.set(x,m,f),R.set(z,I,M),B.set(O,D,P),R.subtractToRef(k,Z),B.subtractToRef(R,K),v&&($=v[2*T],U=v[2*T+1],w=v[2*C],ee=v[2*C+1],fe=v[2*d],_e=v[2*d+1],ce.set($,U),E.set(w,ee),Ne.set(fe,_e),E.subtractToRef(ce,We),Ne.subtractToRef(E,Ze)),y&&i&&(Ge=y[4*T],Xe=y[4*T+1],je=y[4*T+2],$e=y[4*T+3],Ve=y[4*C],Ke=y[4*C+1],qe=y[4*C+2],Qe=y[4*C+3],Je=y[4*d],Le=y[4*d+1],Ye=y[4*d+2],et=y[4*d+3],le.set(Ge,Xe,je,$e),be.set(Ve,Ke,qe,Qe),tt.set(Je,Le,Ye,et),be.subtractToRef(le,st),tt.subtractToRef(be,rt));let ze,ct,lt,ut,ht,se,re,ve;const ft=new ye(0,0,0),ge=new ye(0,0,0);let oe,G;for(let Ie=0;Ie<s._groupDensity[N];Ie++)S=this.particles.length,this._addParticle(S,s,this._groupCounter,N+Ie),G=this.particles[S],J=Math.sqrt(L(0,1)),de=L(0,1),ue=k.add(Z.scale(J)).add(K.scale(J*de)),r&&(Te=e.getFacetNormal(N).normalize().scale(-1),Ae=Z.clone().normalize(),ot=b.Cross(Te,Ae),te=L(0,2*Math.PI),nt=Ae.scale(Math.cos(te)).add(ot.scale(Math.sin(te))),te=L(.1,Math.PI/2),me=nt.scale(Math.cos(te)).add(Te.scale(Math.sin(te))),xe.origin=ue.add(me.scale(1e-5)),xe.direction=me,xe.length=l,Ee=xe.intersectsMesh(e),Ee.hit&&(at=Ee.pickedPoint.subtract(ue).length(),it=L(0,1)*at,ue.addInPlace(me.scale(it)))),G.position=ue.clone(),this._positions.push(G.position.x,G.position.y,G.position.z),i!==void 0?v&&(pe=ce.add(We.scale(J)).add(Ze.scale(J*de)),i?o&&s._groupImageData!==null?(ze=s._groupImgWidth,ct=s._groupImgHeight,oe=this._getColorIndicesForCoord(s,Math.round(pe.x*ze),Math.round(pe.y*ct),ze),G.color=oe,this._colors.push(oe.r,oe.g,oe.b,oe.a)):y?(H=le.add(st.scale(J)).add(rt.scale(J*de)),G.color=new q(H.x,H.y,H.z,H.w),this._colors.push(H.x,H.y,H.z,H.w)):(H=le.set(Math.random(),Math.random(),Math.random(),1),G.color=new q(H.x,H.y,H.z,H.w),this._colors.push(H.x,H.y,H.z,H.w)):(G.uv=pe.clone(),this._uvs.push(G.uv.x,G.uv.y))):(n?(ft.set(n.r,n.g,n.b),lt=L(-u,u),ut=L(-u,u),ve=ft.toHSV(),ht=ve.r,se=ve.g+lt,re=ve.b+ut,se<0&&(se=0),se>1&&(se=1),re<0&&(re=0),re>1&&(re=1),ye.HSVtoRGBToRef(ht,se,re,ge),H.set(ge.r,ge.g,ge.b,1)):H=le.set(Math.random(),Math.random(),Math.random(),1),G.color=new q(H.x,H.y,H.z,H.w),this._colors.push(H.x,H.y,H.z,H.w))}}_colorFromTexture(e,s,r){if(e.material===null){he.Warn(e.name+"has no material."),s._groupImageData=null,this._setPointsColorOrUV(e,s,r,!0,!1);return}const o=e.material.getActiveTextures();if(o.length===0){he.Warn(e.name+"has no usable texture."),s._groupImageData=null,this._setPointsColorOrUV(e,s,r,!0,!1);return}const n=e.clone();n.setEnabled(!1),this._promises.push(new Promise(u=>{qt.WhenAllReady(o,()=>{let _=s._textureNb;_<0&&(_=0),_>o.length-1&&(_=o.length-1);const a=()=>{s._groupImgWidth=o[_].getSize().width,s._groupImgHeight=o[_].getSize().height,this._setPointsColorOrUV(n,s,r,!0,!0,void 0,void 0,o[_].coordinatesIndex),n.dispose(),u()};s._groupImageData=null;const l=o[_].readPixels();l?l.then(c=>{s._groupImageData=c,a()}):a()})}))}_calculateDensity(e,s,r){let i,o,n,u,_,a,l,c,h,v,y,g;const p=b.Zero(),S=b.Zero(),T=b.Zero(),C=b.Zero(),d=b.Zero(),x=b.Zero();let m;const f=[];let z=0;const I=r.length/3;for(let D=0;D<I;D++)i=r[3*D],o=r[3*D+1],n=r[3*D+2],u=s[3*i],_=s[3*i+1],a=s[3*i+2],l=s[3*o],c=s[3*o+1],h=s[3*o+2],v=s[3*n],y=s[3*n+1],g=s[3*n+2],p.set(u,_,a),S.set(l,c,h),T.set(v,y,g),S.subtractToRef(p,C),T.subtractToRef(S,d),b.CrossToRef(C,d,x),m=.5*x.length(),z+=m,f[D]=z;const M=new Array(I);let O=e;for(let D=I-1;D>0;D--){const P=f[D];if(P===0)M[D]=0;else{const R=(P-f[D-1])/P*O,B=Math.floor(R),Z=R-B,K=+(Math.random()<Z),$=B+K;M[D]=$,O-=$}}return M[0]=O,M}addPoints(e,s=this._randomUnitVector){const r=new Me(this._groupCounter,s);let i,o=this.nbParticles;for(let n=0;n<e;n++)i=this._addParticle(o,r,this._groupCounter,n),r&&r._positionFunction&&r._positionFunction(i,o,n),this._positions.push(i.position.x,i.position.y,i.position.z),i.color&&this._colors.push(i.color.r,i.color.g,i.color.b,i.color.a),i.uv&&this._uvs.push(i.uv.x,i.uv.y),o++;return this.nbParticles+=e,this._groupCounter++,this._groupCounter}addSurfacePoints(e,s,r,i,o){let n=r||0;(isNaN(n)||n<0||n>3)&&(n=0);const u=e.getVerticesData(X.PositionKind),_=e.getIndices();this._groups.push(this._groupCounter);const a=new Me(this._groupCounter,null);switch(a._groupDensity=this._calculateDensity(s,u,_),n===2?a._textureNb=i||0:i=i||new q(1,1,1,1),n){case 2:this._colorFromTexture(e,a,!1);break;case 1:this._setPointsColorOrUV(e,a,!1,!1,!1);break;case 0:this._setPointsColorOrUV(e,a,!1);break;case 3:this._setPointsColorOrUV(e,a,!1,void 0,void 0,i,o);break}return this.nbParticles+=s,this._groupCounter++,this._groupCounter-1}addVolumePoints(e,s,r,i,o){let n=r||0;(isNaN(n)||n<0||n>3)&&(n=0);const u=e.getVerticesData(X.PositionKind),_=e.getIndices();this._groups.push(this._groupCounter);const a=new Me(this._groupCounter,null);switch(a._groupDensity=this._calculateDensity(s,u,_),n===2?a._textureNb=i||0:i=i||new q(1,1,1,1),n){case 2:this._colorFromTexture(e,a,!0);break;case 1:this._setPointsColorOrUV(e,a,!0,!1,!1);break;case 0:this._setPointsColorOrUV(e,a,!0);break;case 3:this._setPointsColorOrUV(e,a,!0,void 0,void 0,i,o);break}return this.nbParticles+=s,this._groupCounter++,this._groupCounter-1}setParticles(e=0,s=this.nbParticles-1,r=!0){if(!this._updatable||!this._isReady)return this;this.beforeUpdateParticles(e,s,r);const i=W.Matrix[0],o=this.mesh,n=this._colors32,u=this._positions32,_=this._uvs32,a=W.Vector3,l=a[5].copyFromFloats(1,0,0),c=a[6].copyFromFloats(0,1,0),h=a[7].copyFromFloats(0,0,1),v=a[8].setAll(Number.MAX_VALUE),y=a[9].setAll(-Number.MAX_VALUE);we.IdentityToRef(i);let g=0;if(this.mesh?.isFacetDataEnabled&&(this._computeBoundingBox=!0),s=s>=this.nbParticles?this.nbParticles-1:s,this._computeBoundingBox&&(e!=0||s!=this.nbParticles-1)){const C=this.mesh?.getBoundingInfo();C&&(v.copyFrom(C.minimum),y.copyFrom(C.maximum))}g=0;let p=0,S=0,T=0;for(let C=e;C<=s;C++){const d=this.particles[C];g=d.idx,p=3*g,S=4*g,T=2*g,this.updateParticle(d);const x=d._rotationMatrix,m=d.position,f=d._globalPosition;if(this._computeParticleRotation&&d.getRotationMatrix(i),d.parentId!==null){const U=this.particles[d.parentId],w=U._rotationMatrix,ee=U._globalPosition,fe=m.x*w[1]+m.y*w[4]+m.z*w[7],_e=m.x*w[0]+m.y*w[3]+m.z*w[6],ce=m.x*w[2]+m.y*w[5]+m.z*w[8];if(f.x=ee.x+_e,f.y=ee.y+fe,f.z=ee.z+ce,this._computeParticleRotation){const E=i.m;x[0]=E[0]*w[0]+E[1]*w[3]+E[2]*w[6],x[1]=E[0]*w[1]+E[1]*w[4]+E[2]*w[7],x[2]=E[0]*w[2]+E[1]*w[5]+E[2]*w[8],x[3]=E[4]*w[0]+E[5]*w[3]+E[6]*w[6],x[4]=E[4]*w[1]+E[5]*w[4]+E[6]*w[7],x[5]=E[4]*w[2]+E[5]*w[5]+E[6]*w[8],x[6]=E[8]*w[0]+E[9]*w[3]+E[10]*w[6],x[7]=E[8]*w[1]+E[9]*w[4]+E[10]*w[7],x[8]=E[8]*w[2]+E[9]*w[5]+E[10]*w[8]}}else if(f.x=0,f.y=0,f.z=0,this._computeParticleRotation){const U=i.m;x[0]=U[0],x[1]=U[1],x[2]=U[2],x[3]=U[4],x[4]=U[5],x[5]=U[6],x[6]=U[8],x[7]=U[9],x[8]=U[10]}const I=a[11];d.translateFromPivot?I.setAll(0):I.copyFrom(d.pivot);const M=a[0];M.copyFrom(d.position);const O=M.x-d.pivot.x,D=M.y-d.pivot.y,P=M.z-d.pivot.z;let k=O*x[0]+D*x[3]+P*x[6],R=O*x[1]+D*x[4]+P*x[7],B=O*x[2]+D*x[5]+P*x[8];k+=I.x,R+=I.y,B+=I.z;const Z=u[p]=f.x+l.x*k+c.x*R+h.x*B,K=u[p+1]=f.y+l.y*k+c.y*R+h.y*B,$=u[p+2]=f.z+l.z*k+c.z*R+h.z*B;if(this._computeBoundingBox&&(v.minimizeInPlaceFromFloats(Z,K,$),y.maximizeInPlaceFromFloats(Z,K,$)),this._computeParticleColor&&d.color){const U=d.color,w=this._colors32;w[S]=U.r,w[S+1]=U.g,w[S+2]=U.b,w[S+3]=U.a}if(this._computeParticleTexture&&d.uv){const U=d.uv,w=this._uvs32;w[T]=U.x,w[T+1]=U.y}}return o&&(r&&(this._computeParticleColor&&o.updateVerticesData(X.ColorKind,n,!1,!1),this._computeParticleTexture&&o.updateVerticesData(X.UVKind,_,!1,!1),o.updateVerticesData(X.PositionKind,u,!1,!1)),this._computeBoundingBox&&(o.hasBoundingInfo?o.getBoundingInfo().reConstruct(v,y,o._worldMatrix):o.buildBoundingInfo(v,y,o._worldMatrix))),this.afterUpdateParticles(e,s,r),this}dispose(){this.mesh?.dispose(),this.vars=null,this._positions=null,this._indices=null,this._normals=null,this._uvs=null,this._colors=null,this._indices32=null,this._positions32=null,this._uvs32=null,this._colors32=null}refreshVisibleSize(){return this._isVisibilityBoxLocked||this.mesh?.refreshBoundingInfo(),this}setVisibilityBox(e){if(!this.mesh)return;const s=e/2;this.mesh.buildBoundingInfo(new b(-s,-s,-s),new b(s,s,s))}get isAlwaysVisible(){return this._alwaysVisible}set isAlwaysVisible(e){this.mesh&&(this._alwaysVisible=e,this.mesh.alwaysSelectAsActiveMesh=e)}set computeParticleRotation(e){this._computeParticleRotation=e}set computeParticleColor(e){this._computeParticleColor=e}set computeParticleTexture(e){this._computeParticleTexture=e}get computeParticleColor(){return this._computeParticleColor}get computeParticleTexture(){return this._computeParticleTexture}set computeBoundingBox(e){this._computeBoundingBox=e}get computeBoundingBox(){return this._computeBoundingBox}initParticles(){}recycleParticle(e){return e}updateParticle(e){return e}beforeUpdateParticles(e,s,r){}afterUpdateParticles(e,s,r){}}var bt;(function(t){t[t.Splat=0]="Splat",t[t.PointCloud=1]="PointCloud",t[t.Mesh=2]="Mesh",t[t.Reject=3]="Reject"})(bt||(bt={}));class Q{constructor(e=Q._DefaultLoadingOptions){this.name=Re.name,this._assetContainer=null,this.extensions=Re.extensions,this._loadingOptions=e}createPlugin(e){return new Q(e[Re.name])}async importMeshAsync(e,s,r,i,o,n){return this._parse(e,s,r,i).then(u=>({meshes:u,particleSystems:[],skeletons:[],animationGroups:[],transformNodes:[],geometries:[],lights:[],spriteManagers:[]}))}static _BuildPointCloud(e,s){if(!s.byteLength)return!1;const r=new Uint8Array(s),i=new Float32Array(s),o=3*4+3*4+4+4,n=r.length/o,u=function(_,a){const l=i[8*a+0],c=i[8*a+1],h=i[8*a+2];_.position=new b(l,c,h);const v=r[o*a+24+0]/255,y=r[o*a+24+1]/255,g=r[o*a+24+2]/255;_.color=new q(v,y,g,1)};return e.addPoints(n,u),!0}static _BuildMesh(e,s){const r=new Oe("PLYMesh",e),i=new Uint8Array(s.data),o=new Float32Array(s.data),n=3*4+3*4+4+4,u=i.length/n,_=[],a=new Pe;for(let l=0;l<u;l++){const c=o[8*l+0],h=o[8*l+1],v=o[8*l+2];_.push(c,h,v)}if(s.hasVertexColors){const l=new Float32Array(u*4);for(let c=0;c<u;c++){const h=i[n*c+24+0]/255,v=i[n*c+24+1]/255,y=i[n*c+24+2]/255;l[c*4+0]=h,l[c*4+1]=v,l[c*4+2]=y,l[c*4+3]=1}a.colors=l}return a.positions=_,a.indices=s.faces,a.applyToMesh(r),r}_parseSPZ(e,s){const r=new Uint8Array(e),i=new Uint32Array(e),o=i[2],n=r[12],u=r[13];if(r[15]||i[0]!=1347635022||i[1]!=2)return new Promise(f=>{f({mode:3,data:l,hasVertexColors:!1})});const a=3*4+3*4+4+4,l=new ArrayBuffer(a*o),c=1/(1<<u),h=new Int32Array(1),v=new Uint8Array(h.buffer),y=function(f,z){return v[0]=f[z+0],v[1]=f[z+1],v[2]=f[z+2],v[3]=f[z+2]&128?255:0,h[0]*c};let g=16;const p=new Float32Array(l),S=new Float32Array(l),T=new Uint8ClampedArray(l),C=new Uint8ClampedArray(l);let d=1,x=0;this._loadingOptions.flipY||(d=-1,x=255);for(let f=0;f<o;f++)p[f*8+0]=y(r,g+0),p[f*8+1]=d*y(r,g+3),p[f*8+2]=d*y(r,g+6),g+=9;const m=.282;for(let f=0;f<o;f++){for(let z=0;z<3;z++){const M=(r[g+o+f*3+z]-127.5)/(.15*255);T[f*32+24+z]=j.Clamp((.5+m*M)*255,0,255)}T[f*32+24+3]=r[g+f]}g+=o*4;for(let f=0;f<o;f++)S[f*8+3+0]=Math.exp(r[g+0]/16-10),S[f*8+3+1]=Math.exp(r[g+1]/16-10),S[f*8+3+2]=Math.exp(r[g+2]/16-10),g+=3;for(let f=0;f<o;f++){const z=r[g+0],I=r[g+1]*d+x,M=r[g+2]*d+x,O=z/127.5-1,D=I/127.5-1,P=M/127.5-1;C[f*32+28+1]=z,C[f*32+28+2]=I,C[f*32+28+3]=M;const k=1-(O*O+D*D+P*P);C[f*32+28+0]=127.5+Math.sqrt(k<0?0:k)*127.5,g+=3}if(n){const z=((n+1)*(n+1)-1)*3,I=Math.ceil(z/16);let M=g;const O=[],P=s.getEngine().getCaps().maxTextureSize,k=Math.ceil(o/P);for(let R=0;R<I;R++){const B=new Uint8Array(k*P*4*4);O.push(B)}for(let R=0;R<o;R++)for(let B=0;B<z;B++){const Z=r[M++],K=Math.floor(B/16),$=O[K],U=B%16,w=R*16;$[U+w]=Z}return new Promise(R=>{R({mode:0,data:l,hasVertexColors:!1,sh:O})})}return new Promise(f=>{f({mode:0,data:l,hasVertexColors:!1})})}_parse(e,s,r,i){const o=[],n=new ReadableStream({start(a){a.enqueue(new Uint8Array(r)),a.close()}}),u=new DecompressionStream("gzip"),_=n.pipeThrough(u);return new Promise(a=>{new Response(_).arrayBuffer().then(l=>{this._parseSPZ(l,s).then(c=>{s._blockEntityCollection=!!this._assetContainer;const h=new A("GaussianSplatting",null,s,this._loadingOptions.keepInRam);h._parentContainer=this._assetContainer,o.push(h),h.updateData(c.data,c.sh),s._blockEntityCollection=!1,a(o)})}).catch(()=>{Q._ConvertPLYToSplat(r).then(async l=>{switch(s._blockEntityCollection=!!this._assetContainer,l.mode){case 0:{const c=new A("GaussianSplatting",null,s,this._loadingOptions.keepInRam);c._parentContainer=this._assetContainer,o.push(c),c.updateData(l.data)}break;case 1:{const c=new gs("PointCloud",1,s);Q._BuildPointCloud(c,l.data)?await c.buildMeshAsync().then(h=>{o.push(h)}):c.dispose()}break;case 2:if(l.faces)o.push(Q._BuildMesh(s,l));else throw new Error("PLY mesh doesn't contain face informations.");break;default:throw new Error("Unsupported Splat mode")}s._blockEntityCollection=!1,a(o)})})})}loadAssetContainerAsync(e,s,r){const i=new Jt(e);return this._assetContainer=i,this.importMeshAsync(null,e,s,r).then(o=>(o.meshes.forEach(n=>i.meshes.push(n)),this._assetContainer=null,i)).catch(o=>{throw this._assetContainer=null,o})}loadAsync(e,s,r){return this.importMeshAsync(null,e,s,r).then(()=>{})}static _ConvertPLYToSplat(e){const s=new Uint8Array(e),r=new TextDecoder().decode(s.slice(0,1024*10)),i=`end_header
`,o=r.indexOf(i);if(o<0||!r)return new Promise(d=>{d({mode:0,data:e})});const n=parseInt(/element vertex (\d+)\n/.exec(r)[1]),u=/element face (\d+)\n/.exec(r);let _=0;u&&(_=parseInt(u[1]));const a=/element chunk (\d+)\n/.exec(r);let l=0;a&&(l=parseInt(a[1]));let c=0,h=0;const v={double:8,int:4,uint:4,float:4,short:2,ushort:2,uchar:1,list:0};let y;(function(d){d[d.Vertex=0]="Vertex",d[d.Chunk=1]="Chunk"})(y||(y={}));let g=1;const p=[],S=r.slice(0,o).split(`
`);for(const d of S)if(d.startsWith("property ")){const[,x,m]=d.split(" ");g==1?h+=v[x]:g==0&&(p.push({name:m,type:x,offset:c}),c+=v[x]),v[x]||he.Warn(`Unsupported property type: ${x}.`)}else if(d.startsWith("element ")){const[,x]=d.split(" ");x=="chunk"?g=1:x=="vertex"&&(g=0)}const T=c,C=h;return A.ConvertPLYWithSHToSplatAsync(e).then(d=>{const x=new DataView(e,o+i.length);let m=C*l+T*n;const f=[];if(_)for(let k=0;k<_;k++){const R=x.getUint8(m);if(R==3){m+=1;for(let B=0;B<R;B++){const Z=x.getUint32(m+(2-B)*4,!0);f.push(Z)}m+=12}}if(l)return new Promise(k=>{k({mode:0,data:d.buffer,sh:d.sh,faces:f,hasVertexColors:!1})});let z=0,I=0;const M=["x","y","z","scale_0","scale_1","scale_2","opacity","rot_0","rot_1","rot_2","rot_3"],O=["red","green","blue","f_dc_0","f_dc_1","f_dc_2"];for(let k=0;k<p.length;k++){const R=p[k];M.includes(R.name)&&z++,O.includes(R.name)&&I++}const D=z==M.length&&I==3,P=_?2:D?0:1;return new Promise(k=>{k({mode:P,data:d.buffer,sh:d.sh,faces:f,hasVertexColors:!!I})})})}}Q._DefaultLoadingOptions={keepInRam:!1,flipY:!1};Qt(new Q);export{Q as SPLATFileLoader};
//# sourceMappingURL=splatFileLoader-YNCdtPaC.js.map
