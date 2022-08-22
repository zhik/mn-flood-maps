import{gQ as N,gR as T,ba as d,dP as I,bv as m,gS as $,gT as E,b1 as w,bj as v,k as y,cy as G,b8 as _}from"./index.2fb7ef6a.js";import{f as q}from"./projectionSupport.331ac822.js";import{J as f}from"./utils.cf5ce079.js";function C(e){return e==="mesh"?N:T(e)}function b(e,t){return e?t?4:3:t?3:2}function M(e,t,i,r){return P(e,t,i,r.coords[0],r.coords[1])}function F(e,t,i,r,s,n){const o=b(s,n),{coords:a,lengths:u}=r;if(!u)return!1;for(let l=0,p=0;l<u.length;l++,p+=o)if(!P(e,t,i,a[p],a[p+1]))return!1;return!0}function P(e,t,i,r,s){if(!e)return!1;const n=b(t,i),{coords:o,lengths:a}=e;let u=!1,l=0;for(const p of a)u=j(u,o,n,l,p,r,s),l+=p*n;return u}function j(e,t,i,r,s,n,o){let a=e,u=r;for(let l=r,p=r+s*i;l<p;l+=i){u=l+i,u===p&&(u=r);const h=t[l],c=t[l+1],A=t[u],R=t[u+1];(c<o&&R>=o||R<o&&c>=o)&&h+(o-c)/(R-c)*(A-h)<n&&(a=!a)}return a}const S="feature-store:unsupported-query",x={esriSpatialRelIntersects:"intersects",esriSpatialRelContains:"contains",esriSpatialRelCrosses:"crosses",esriSpatialRelDisjoint:"disjoint",esriSpatialRelEnvelopeIntersects:"intersects",esriSpatialRelIndexIntersects:null,esriSpatialRelOverlaps:"overlaps",esriSpatialRelTouches:"touches",esriSpatialRelWithin:"within",esriSpatialRelRelation:null},g={spatialRelationship:{esriSpatialRelIntersects:!0,esriSpatialRelContains:!0,esriSpatialRelWithin:!0,esriSpatialRelCrosses:!0,esriSpatialRelDisjoint:!0,esriSpatialRelTouches:!0,esriSpatialRelOverlaps:!0,esriSpatialRelEnvelopeIntersects:!0,esriSpatialRelIndexIntersects:!1,esriSpatialRelRelation:!1},queryGeometry:{esriGeometryPoint:!0,esriGeometryMultipoint:!0,esriGeometryPolyline:!0,esriGeometryPolygon:!0,esriGeometryEnvelope:!0},layerGeometry:{esriGeometryPoint:!0,esriGeometryMultipoint:!0,esriGeometryPolyline:!0,esriGeometryPolygon:!0,esriGeometryEnvelope:!1}};function D(e){return g.spatialRelationship[e]===!0}function O(e){return g.queryGeometry[_(e)]===!0}function U(e){return g.layerGeometry[e]===!0}function V(){return w(()=>import("./geometryEngineJSON.588858d2.js"),["geometryEngineJSON.588858d2.js","geometryEngineBase.cf4f989f.js","geometryEngineJSON.a34a7363.js","json.d1a0fa35.js"],import.meta.url)}function Z(e,t,i,r,s){if(d(t)&&i==="esriGeometryPoint"&&(e==="esriSpatialRelIntersects"||e==="esriSpatialRelContains")){const n=I(new v,t,!1,!1);return Promise.resolve(o=>M(n,!1,!1,o))}if(d(t)&&i==="esriGeometryMultipoint"){const n=I(new v,t,!1,!1);if(e==="esriSpatialRelContains")return Promise.resolve(o=>F(n,!1,!1,o,r,s))}if(m(t)&&i==="esriGeometryPoint"&&(e==="esriSpatialRelIntersects"||e==="esriSpatialRelContains"))return Promise.resolve(n=>$(t,f(i,r,s,n)));if(m(t)&&i==="esriGeometryMultipoint"&&e==="esriSpatialRelContains")return Promise.resolve(n=>E(t,f(i,r,s,n)));if(m(t)&&e==="esriSpatialRelIntersects"){const n=C(i);return Promise.resolve(o=>n(t,f(i,r,s,o)))}return V().then(n=>{const o=n[x[e]].bind(null,t.spatialReference,t);return a=>o(f(i,r,s,a))})}async function z(e,t,i){const{spatialRel:r,geometry:s}=e;if(s){if(!D(r))throw new y(S,"Unsupported query spatial relationship",{query:e});if(G(s.spatialReference)&&G(i)){if(!O(s))throw new y(S,"Unsupported query geometry type",{query:e});if(!U(t))throw new y(S,"Unsupported layer geometry type",{query:e});if(e.outSR)return q(e.geometry&&e.geometry.spatialReference,e.outSR)}}}function B(e){if(m(e))return!0;if(d(e)){for(const t of e.rings)if(t.length!==5||t[0][0]!==t[1][0]||t[0][0]!==t[4][0]||t[2][0]!==t[3][0]||t[0][1]!==t[3][1]||t[0][1]!==t[4][1]||t[1][1]!==t[2][1])return!1;return!0}return!1}function H(e,t){if(!e)return null;const i=t.featureAdapter,{startTimeField:r,endTimeField:s}=e;let n=Number.POSITIVE_INFINITY,o=Number.NEGATIVE_INFINITY;if(r&&s)t.forEach(a=>{const u=i.getAttribute(a,r),l=i.getAttribute(a,s);u==null||isNaN(u)||(n=Math.min(n,u)),l==null||isNaN(l)||(o=Math.max(o,l))});else{const a=r||s;t.forEach(u=>{const l=i.getAttribute(u,a);l==null||isNaN(l)||(n=Math.min(n,l),o=Math.max(o,l))})}return{start:n,end:o}}function K(e,t,i){if(!t||!e)return null;const{startTimeField:r,endTimeField:s}=e;if(!r&&!s)return null;const{start:n,end:o}=t;return n===null&&o===null?null:n===void 0&&o===void 0?k():r&&s?W(i,r,s,n,o):Y(i,r||s,n,o)}function W(e,t,i,r,s){return r!=null&&s!=null?n=>{const o=e.getAttribute(n,t),a=e.getAttribute(n,i);return(o==null||o<=s)&&(a==null||a>=r)}:r!=null?n=>{const o=e.getAttribute(n,i);return o==null||o>=r}:s!=null?n=>{const o=e.getAttribute(n,t);return o==null||o<=s}:void 0}function Y(e,t,i,r){return i!=null&&r!=null&&i===r?s=>e.getAttribute(s,t)===i:i!=null&&r!=null?s=>{const n=e.getAttribute(s,t);return n>=i&&n<=r}:i!=null?s=>e.getAttribute(s,t)>=i:r!=null?s=>e.getAttribute(s,t)<=r:void 0}function k(){return()=>!1}export{B as I,z as P,K as n,H as t,Z as v};