import{r as c,q as P,fx as S,cg as R,m as h,ao as b,hc as M,ng as B,E as A,D as T,is as _,al as D,c as j}from"./index.13375249.js";import{a as F}from"./quatf64.ddec7ef6.js";import{p as k,m as q,c as z,f as U}from"./meshFeatureSet.903fd9d2.js";import{T as V,i as N,c as O,x as G,u as K,L as Q,O as I,E as W}from"./BufferView.2e307fc3.js";import{t as X,r as Y,o as Z,b as H,f as J,e as tt,n as et}from"./vec33.99b35ab0.js";import{n as ot,c as nt,r as w,a as rt,j as st,t as C,b as at,k as it,d as ct,e as ut,m as lt,i as ft,f as mt,h as pt,p as dt,o as gt}from"./DefaultMaterial_COLOR_GAMMA.f81333f9.js";import{b as xt}from"./georeference.a8604e4f.js";import"./earcut.d30cbec0.js";import"./deduplicate.c086dba6.js";import"./mat4f64.a79dd289.js";import"./types.35b28df2.js";import"./Version.23e19add.js";import"./quat.17d1a70c.js";import"./vectorStacks.c238c34f.js";import"./lineSegment.1728f78b.js";async function Ut(t,e,n){const s=new ot($t(n)),o=(await nt(s,e,n,!0)).model,m=o.lods.shift(),l=new Map,u=new Map;o.textures.forEach(($,E)=>l.set(E,wt($))),o.materials.forEach(($,E)=>u.set(E,yt($,l)));const i=bt(m);for(const $ of i.parts)vt(i,$,u);const{position:d,normal:f,tangent:r,color:a,texCoord0:p}=i.vertexAttributes,x={position:d.typedBuffer,normal:c(f)?f.typedBuffer:null,tangent:c(r)?r.typedBuffer:null,uv:c(p)?p.typedBuffer:null,color:c(a)?a.typedBuffer:null},v=xt(x,t,n);return{transform:v.transform,components:i.components,spatialReference:t.spatialReference,vertexAttributes:new k({position:v.vertexAttributes.position,normal:v.vertexAttributes.normal,tangent:v.vertexAttributes.tangent,color:x.color,uv:x.uv})}}function $t(t){return t!=null&&t.resolveFile?{busy:!1,request:async(e,n,s)=>{const o=t.resolveFile(e);return(await P(o,{responseType:n==="image"?"image":n==="binary"?"array-buffer":"json",signal:c(s)?s.signal:null})).data}}:null}function y(t,e){if(j(t))return"-";const n=t.typedBuffer;return`${S(e,n.buffer,()=>e.size)}/${n.byteOffset}/${n.byteLength}`}function ht(t){return c(t)?t.toString():"-"}function bt(t){let e=0;const n={color:!1,tangent:!1,normal:!1,texCoord0:!1},s=new Map,o=new Map,m=[];for(const l of t.parts){const{attributes:{position:u,normal:i,color:d,tangent:f,texCoord0:r}}=l,a=`
      ${y(u,s)}/
      ${y(i,s)}/
      ${y(d,s)}/
      ${y(f,s)}/
      ${y(r,s)}/
      ${ht(l.transform)}
    `;let p=!1;const x=S(o,a,()=>(p=!0,{start:e,length:u.count}));p&&(e+=u.count),i&&(n.normal=!0),d&&(n.color=!0),f&&(n.tangent=!0),r&&(n.texCoord0=!0),m.push({gltf:l,writeVertices:p,region:x})}return{vertexAttributes:{position:w(V,e),normal:n.normal?w(N,e):null,tangent:n.tangent?w(O,e):null,color:n.color?w(G,e):null,texCoord0:n.texCoord0?w(K,e):null},parts:m,components:[]}}function wt(t){return new q({data:t.data,wrap:Ct(t.parameters.wrap)})}function yt(t,e){const n=new R(Rt(t.color,t.opacity)),s=t.emissiveFactor?new R(Mt(t.emissiveFactor)):null;return new z({color:n,colorTexture:h(b(t.textureColor,o=>e.get(o))),normalTexture:h(b(t.textureNormal,o=>e.get(o))),emissiveColor:s,emissiveTexture:h(b(t.textureEmissive,o=>e.get(o))),occlusionTexture:h(b(t.textureOcclusion,o=>e.get(o))),alphaMode:Tt(t.alphaMode),alphaCutoff:t.alphaCutoff,doubleSided:t.doubleSided,metallic:t.metallicFactor,roughness:t.roughnessFactor,metallicRoughnessTexture:h(b(t.textureMetallicRoughness,o=>e.get(o)))})}function vt(t,e,n){e.writeVertices&&Et(t,e);const s=e.gltf,o=At(s.indices||s.attributes.position.count,s.primitiveType),m=e.region.start;if(m)for(let l=0;l<o.length;l++)o[l]+=m;t.components.push(new U({faces:o,material:n.get(s.material),trustSourceNormals:!0}))}function Et(t,e){const{position:n,normal:s,tangent:o,color:m,texCoord0:l}=t.vertexAttributes,u=e.region.start,{attributes:i,transform:d}=e.gltf,f=i.position.count;if(X(n.slice(u,f),i.position,d),c(i.normal)&&c(s)){const r=M(F(),d),a=s.slice(u,f);Y(a,i.normal,r),B(r)&&Z(a,a)}else c(s)&&H(s,0,0,1,{dstIndex:u,count:f});if(c(i.tangent)&&c(o)){const r=M(F(),d),a=o.slice(u,f);rt(a,i.tangent,r),B(r)&&st(a,a)}else c(o)&&C(o,0,0,1,1,{dstIndex:u,count:f});if(c(i.texCoord0)&&c(l)?at(l.slice(u,f),i.texCoord0):c(l)&&it(l,0,0,{dstIndex:u,count:f}),c(i.color)&&c(m)){const r=i.color,a=m.slice(u,f);if(r.elementCount===4)r instanceof O?ct(a,r,255):r instanceof G?ut(a,r):r instanceof Q&&lt(a,r,8);else{C(a,255,255,255,255);const p=I.fromTypedArray(a.typedBuffer,a.typedBufferStride);r instanceof N?J(p,r,255):r instanceof I?tt(p,r):r instanceof W&&et(p,r,8)}}else c(m)&&C(m.slice(u,f),255,255,255,255)}function At(t,e){switch(e){case A.TRIANGLES:return pt(t,dt);case A.TRIANGLE_STRIP:return mt(t);case A.TRIANGLE_FAN:return ft(t)}}function Tt(t){switch(t){case"OPAQUE":return"opaque";case"MASK":return"mask";case"BLEND":return"blend"}}function Ct(t){return{horizontal:L(t.s),vertical:L(t.t)}}function L(t){switch(t){case T.CLAMP_TO_EDGE:return"clamp";case T.MIRRORED_REPEAT:return"mirror";case T.REPEAT:return"repeat"}}function g(t){return t**(1/gt)*255}function Rt(t,e){return _(g(t[0]),g(t[1]),g(t[2]),e)}function Mt(t){return D(g(t[0]),g(t[1]),g(t[2]))}export{Ut as loadGLTFMesh};