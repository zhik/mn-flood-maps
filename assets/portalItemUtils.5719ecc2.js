import{e9 as o,bt as s,cx as i,ea as c}from"./index.b82fad90.js";async function a(n){const t=n.spatialReference;if(t.isWGS84)return n.clone();if(t.isWebMercator)return o(n);const e=s.WGS84;return await i(t,e),c(n,e)}function u(n,t){if(!f(n,t)){const e=n.typeKeywords;e?e.push(t):n.typeKeywords=[t]}}function f(n,t){var e;return!!((e=n.typeKeywords)!=null&&e.includes(t))}function p(n,t){const e=n.typeKeywords;if(e){const r=e.indexOf(t);r>-1&&e.splice(r,1)}}async function y(n){const t=n.clone().normalize();let e;if(t.length>1)for(const r of t)e?r.width>e.width&&(e=r):e=r;else e=t[0];return a(e)}const A={DEVELOPER_BASEMAP:"DeveloperBasemap",JSAPI:"ArcGIS API for JavaScript",METADATA:"Metadata",MULTI_LAYER:"Multilayer",SINGLE_LAYER:"Singlelayer",TABLE:"Table"};export{y as a,p as c,A as f,u as i,f as s};
