import{aH as o,aJ as n,aw as p,ax as y,r as m,ez as u}from"./index.c64afe99.js";import d from"./FeatureLayerView2D.92fca050.js";import"./utils.9a85c230.js";import"./Utils.2d2d4942.js";import"./Texture.65d85635.js";import"./MaterialKey.e73f3fbd.js";import"./LayerView.9ac8333f.js";import"./schemaUtils.d9e2603a.js";import"./visualVariablesUtils.929a6c95.js";import"./createSymbolSchema.a1e5b766.js";import"./CIMSymbolHelper.c98eb5a0.js";import"./BidiEngine.ec67919b.js";import"./ExpandedCIM.a9d23e53.js";import"./quantizationUtils.9ea5b1c1.js";import"./MD5.97b39efc.js";import"./util.f647bf7e.js";import"./floorFilterUtils.69500d62.js";import"./popupUtils.35f7a7a1.js";import"./RefreshableLayerView.b0ee4bf8.js";function h(e,r){return!e.visible||e.minScale!==0&&r>e.minScale||e.maxScale!==0&&r<e.maxScale}let l=class extends d{initialize(){this.handles.add([p(()=>{var e;return(e=this.view)==null?void 0:e.viewpoint},()=>this._update(),y)])}_injectOverrides(e){let r=super._injectOverrides(e);const s=this.view.scale,t=this.layer.sublayers.filter(a=>h(a,s)).map(a=>a.subtypeCode);if(!t.length)return r;r=m(r)?r:new u().toJSON();const i=`NOT ${this.layer.subtypeField} IN (${t.join(",")})`;return r.where=r.where?`(${r.where}) AND (${i})`:i,r}_setLayersForFeature(e){const r=this.layer.fieldsIndex.get(this.layer.subtypeField),s=e.attributes[r.name],t=this.layer.sublayers.find(i=>i.subtypeCode===s);e.layer=t,e.sourceLayer=this.layer}_createSchemaConfig(){const e={subtypeField:this.layer.subtypeField,sublayers:Array.from(this.layer.sublayers).map(i=>({featureReduction:null,geometryType:this.layer.geometryType,labelingInfo:i.labelingInfo,labelsVisible:i.labelsVisible,renderer:i.renderer,subtypeCode:i.subtypeCode,orderBy:null}))},r=this.layer.sublayers.map(i=>i.subtypeCode).join(","),s=this.layer.sublayers.length?`${this.layer.subtypeField} IN (${r})`:"1=2";let t=this.layer.definitionExpression?this.layer.definitionExpression+" AND ":"";return t+=s,{...super._createSchemaConfig(),...e,definitionExpression:t}}};l=o([n("esri.views.2d.layers.SubtypeGroupLayerView2D")],l);const L=l;export{L as default};