import{aH as o,aJ as n,aw as p,ax as y,r as m,ez as u}from"./index.13375249.js";import d from"./FeatureLayerView2D.bd60ca10.js";import"./utils.5547bb95.js";import"./Utils.c545520e.js";import"./Texture.cbe42c09.js";import"./MaterialKey.40c8cf0d.js";import"./LayerView.9226b744.js";import"./schemaUtils.3945fef4.js";import"./visualVariablesUtils.6b3b0e76.js";import"./createSymbolSchema.b0611ecb.js";import"./CIMSymbolHelper.2581653a.js";import"./BidiEngine.ec67919b.js";import"./ExpandedCIM.25ecb4b1.js";import"./quantizationUtils.3e30225a.js";import"./MD5.97b39efc.js";import"./util.3738f994.js";import"./floorFilterUtils.69500d62.js";import"./popupUtils.b4db03f4.js";import"./RefreshableLayerView.179a9c75.js";function h(e,r){return!e.visible||e.minScale!==0&&r>e.minScale||e.maxScale!==0&&r<e.maxScale}let l=class extends d{initialize(){this.handles.add([p(()=>{var e;return(e=this.view)==null?void 0:e.viewpoint},()=>this._update(),y)])}_injectOverrides(e){let r=super._injectOverrides(e);const s=this.view.scale,t=this.layer.sublayers.filter(a=>h(a,s)).map(a=>a.subtypeCode);if(!t.length)return r;r=m(r)?r:new u().toJSON();const i=`NOT ${this.layer.subtypeField} IN (${t.join(",")})`;return r.where=r.where?`(${r.where}) AND (${i})`:i,r}_setLayersForFeature(e){const r=this.layer.fieldsIndex.get(this.layer.subtypeField),s=e.attributes[r.name],t=this.layer.sublayers.find(i=>i.subtypeCode===s);e.layer=t,e.sourceLayer=this.layer}_createSchemaConfig(){const e={subtypeField:this.layer.subtypeField,sublayers:Array.from(this.layer.sublayers).map(i=>({featureReduction:null,geometryType:this.layer.geometryType,labelingInfo:i.labelingInfo,labelsVisible:i.labelsVisible,renderer:i.renderer,subtypeCode:i.subtypeCode,orderBy:null}))},r=this.layer.sublayers.map(i=>i.subtypeCode).join(","),s=this.layer.sublayers.length?`${this.layer.subtypeField} IN (${r})`:"1=2";let t=this.layer.definitionExpression?this.layer.definitionExpression+" AND ":"";return t+=s,{...super._createSchemaConfig(),...e,definitionExpression:t}}};l=o([n("esri.views.2d.layers.SubtypeGroupLayerView2D")],l);const L=l;export{L as default};