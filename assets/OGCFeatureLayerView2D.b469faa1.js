import{aH as r,aI as a,aJ as o}from"./index.c04fcb27.js";import s from"./FeatureLayerView2D.dd839361.js";import"./utils.5b72ccc1.js";import"./Utils.b0caaffb.js";import"./Texture.a9bacab4.js";import"./MaterialKey.68c0a940.js";import"./LayerView.2378d60c.js";import"./schemaUtils.b945c02d.js";import"./visualVariablesUtils.c9b75c9d.js";import"./createSymbolSchema.989ce52b.js";import"./CIMSymbolHelper.37d2fc9b.js";import"./BidiEngine.ec67919b.js";import"./ExpandedCIM.a13f5e05.js";import"./quantizationUtils.55f553eb.js";import"./MD5.97b39efc.js";import"./util.eca9e73b.js";import"./floorFilterUtils.69500d62.js";import"./popupUtils.2df10bf4.js";import"./RefreshableLayerView.918c3bb8.js";const l=t=>{let e=class extends t{get availableFields(){return this.layer.fieldsIndex.fields.map(p=>p.name)}};return r([a()],e.prototype,"layer",void 0),r([a({readOnly:!0})],e.prototype,"availableFields",null),e=r([o("esri.views.layers.OGCFeatureLayerView")],e),e};let i=class extends l(s){supportsSpatialReference(t){return this.layer.serviceSupportsSpatialReference(t)}};i=r([o("esri.views.2d.layers.OGCFeatureLayerView2D")],i);const R=i;export{R as default};