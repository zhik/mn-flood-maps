import{fP as n,fQ as p,mp as d,aH as r,aI as i,aJ as l,fU as u,k as y}from"./index.c64afe99.js";let t=class extends n(p(u)){constructor(e){super(e),this.resourceInfo=null,this.type="unsupported"}initialize(){this.addResolvingPromise(new Promise((e,o)=>{d(()=>{const s=this.resourceInfo&&(this.resourceInfo.layerType||this.resourceInfo.type);let a="Unsupported layer type";s&&(a+=" "+s),o(new y("layer:unsupported-layer-type",a,{layerType:s}))})}))}read(e,o){const s={resourceInfo:e};e.id!=null&&(s.id=e.id),e.title!=null&&(s.title=e.title),super.read(s,o)}write(e){return Object.assign(e||{},this.resourceInfo,{id:this.id})}};r([i({readOnly:!0})],t.prototype,"resourceInfo",void 0),r([i({type:["show","hide"]})],t.prototype,"listMode",void 0),r([i({json:{read:!1},readOnly:!0,value:"unsupported"})],t.prototype,"type",void 0),t=r([l("esri.layers.UnsupportedLayer")],t);const f=t;export{f as default};