import{gn as p,k as o,r as c,q as h,ki as d,kj as b,b1 as w,ff as v,kk as z}from"./index.13375249.js";let i=a();function a(){return new p(50)}function B(){i=a()}function S(e,r){if(e.type==="icon")return y(e,r);if(e.type==="object")return l(e,r);throw new o("symbol3d:unsupported-symbol-layer","computeLayerSize only works with symbol layers of type Icon and Object")}async function x(e,r){if(e.type==="icon")return g(e,r);if(e.type==="object")return k(e,r);throw new o("symbol3d:unsupported-symbol-layer","computeLayerSize only works with symbol layers of type Icon and Object")}async function y(e,r){if(e.resource.href)return j(e.resource.href).then(t=>[t.width,t.height]);if(e.resource.primitive)return c(r)?[r,r]:[256,256];throw new o("symbol3d:invalid-symbol-layer","symbol layers of type Icon must have either an href or a primitive resource")}function g(e,r){return y(e,r).then(t=>{if(e.size==null)return t;const n=t[0]/t[1];return n>1?[e.size,e.size/n]:[e.size*n,e.size]})}function j(e){return h(e,{responseType:"image"}).then(r=>r.data)}function l(e,r){return L(e,r).then(t=>d(t))}async function k(e,r){const t=await l(e,r);return b(t,e)}async function L(e,r){if(!e.isPrimitive){const n=e.resource.href,s=i.get(n);if(s!==void 0)return s;const f=await w(()=>import("./objectResourceUtils.dc6f0516.js").then(m=>m.o),["objectResourceUtils.dc6f0516.js","devEnvironmentUtils.8c6e6b72.js","index.13375249.js","index.f130ef48.css","quatf64.ddec7ef6.js","mat4f64.a79dd289.js","BufferView.2e307fc3.js","vec33.99b35ab0.js","DefaultMaterial_COLOR_GAMMA.f81333f9.js","types.35b28df2.js","Version.23e19add.js","quat.17d1a70c.js","vectorStacks.c238c34f.js","lineSegment.1728f78b.js","requestImageUtils.2d413639.js","Util.a52c6024.js","VertexAttribute.5551e0d8.js","Texture.cbe42c09.js","VertexArrayObject.f8d74f02.js","InterleavedLayout.2d1f7352.js","vec3f32.8d37ecf5.js","sphere.8230e863.js"],import.meta.url),u=await f.fetch(n,{disableTextures:!0});return i.put(n,u.referenceBoundingBox),u.referenceBoundingBox}let t=null;if(e.resource&&e.resource.primitive&&(t=v(z(e.resource.primitive)),c(r)))for(let n=0;n<t.length;n++)t[n]*=r;return t?Promise.resolve(t):Promise.reject(new o("symbol:invalid-resource","The symbol does not have a valid resource"))}export{B as clearBoundingBoxCache,y as computeIconLayerResourceSize,S as computeLayerResourceSize,x as computeLayerSize,l as computeObjectLayerResourceSize};