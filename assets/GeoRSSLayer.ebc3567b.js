import{kE as p,kG as u,gf as d,gg as h,kF as c,gh as g,ga as S,r as m,bu as v,q as f,l7 as b,O as k,aH as o,aI as s,fo as C,ek as G,kW as w,l8 as _,gk as x,aJ as F,gr as n,l9 as P,la as R,lb as E,lc as $,gl as j}from"./index.69e87a89.js";const M=["atom","xml"],L={base:n,key:"type",typeMap:{"simple-line":P},errorContext:"symbol"},O={base:n,key:"type",typeMap:{"picture-marker":R,"simple-marker":E},errorContext:"symbol"},T={base:n,key:"type",typeMap:{"simple-fill":$},errorContext:"symbol"};let t=class extends p(u(d(h(c(g(j)))))){constructor(...e){super(...e),this.description=null,this.fullExtent=null,this.legendEnabled=!0,this.lineSymbol=null,this.pointSymbol=null,this.polygonSymbol=null,this.operationalLayerType="GeoRSS",this.url=null,this.type="geo-rss"}normalizeCtorArgs(e,r){return typeof e=="string"?{url:e,...r}:e}readFeatureCollections(e,r){return r.featureCollection.layers.forEach(l=>{var a;const i=l.layerDefinition.drawingInfo.renderer.symbol;i&&i.type==="esriSFS"&&((a=i.outline)==null?void 0:a.style.includes("esriSFS"))&&(i.outline.style="esriSLSSolid")}),r.featureCollection.layers}get hasPoints(){return this._hasGeometry("esriGeometryPoint")}get hasPolylines(){return this._hasGeometry("esriGeometryPolyline")}get hasPolygons(){return this._hasGeometry("esriGeometryPolygon")}get title(){const e=this._get("title");return e&&this.originOf("title")!=="defaults"?e:this.url?S(this.url,M)||"GeoRSS":e||""}set title(e){this._set("title",e)}load(e){const r=m(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Map Service","Feature Service","Feature Collection","Scene Service"]},e).catch(v).then(()=>this._fetchService(r)).then(l=>{this.read(l,{origin:"service"})})),Promise.resolve(this)}async hasDataChanged(){const e=await this._fetchService();return this.read(e,{origin:"service",ignoreDefaults:!0}),!0}async _fetchService(e){var i;const r=this.spatialReference,{data:l}=await f(k.geoRSSServiceUrl,{query:{url:this.url,refresh:!!this.loaded||void 0,outSR:b(r)?void 0:(i=r.wkid)!=null?i:JSON.stringify(r)},signal:e});return l}_hasGeometry(e){var r,l;return(l=(r=this.featureCollections)==null?void 0:r.some(i=>{var a,y;return((a=i.featureSet)==null?void 0:a.geometryType)===e&&((y=i.featureSet.features)==null?void 0:y.length)>0}))!=null?l:!1}};o([s()],t.prototype,"description",void 0),o([s()],t.prototype,"featureCollections",void 0),o([C("service","featureCollections",["featureCollection.layers"])],t.prototype,"readFeatureCollections",null),o([s({type:G,json:{name:"lookAtExtent"}})],t.prototype,"fullExtent",void 0),o([s(w)],t.prototype,"id",void 0),o([s(_)],t.prototype,"legendEnabled",void 0),o([s({types:L,json:{write:!0}})],t.prototype,"lineSymbol",void 0),o([s({type:["show","hide"]})],t.prototype,"listMode",void 0),o([s({types:O,json:{write:!0}})],t.prototype,"pointSymbol",void 0),o([s({types:T,json:{write:!0}})],t.prototype,"polygonSymbol",void 0),o([s({type:["GeoRSS"]})],t.prototype,"operationalLayerType",void 0),o([s(x)],t.prototype,"url",void 0),o([s({json:{origins:{service:{read:{source:"name",reader:e=>e||void 0}}}}})],t.prototype,"title",null),o([s({readOnly:!0,json:{read:!1},value:"geo-rss"})],t.prototype,"type",void 0),t=o([F("esri.layers.GeoRSSLayer")],t);const U=t;export{U as default};