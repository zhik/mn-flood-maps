import{aH as r,aI as a,aJ as o}from"./index.d0d680cc.js";import s from"./FeatureLayerView2D.a68ec4a7.js";import"./utils.d804b968.js";import"./Utils.7e1a367f.js";import"./Texture.76980db5.js";import"./MaterialKey.74118aa0.js";import"./LayerView.7dd901b7.js";import"./schemaUtils.8942f02f.js";import"./visualVariablesUtils.1b1486ea.js";import"./createSymbolSchema.a81d0ae8.js";import"./CIMSymbolHelper.ff7ab4cd.js";import"./BidiEngine.ec67919b.js";import"./ExpandedCIM.40bd8128.js";import"./quantizationUtils.20d61d2b.js";import"./MD5.97b39efc.js";import"./util.026704c2.js";import"./floorFilterUtils.69500d62.js";import"./popupUtils.0365c3a1.js";import"./RefreshableLayerView.4e40d6dd.js";const l=t=>{let e=class extends t{get availableFields(){return this.layer.fieldsIndex.fields.map(p=>p.name)}};return r([a()],e.prototype,"layer",void 0),r([a({readOnly:!0})],e.prototype,"availableFields",null),e=r([o("esri.views.layers.OGCFeatureLayerView")],e),e};let i=class extends l(s){supportsSpatialReference(t){return this.layer.serviceSupportsSpatialReference(t)}};i=r([o("esri.views.2d.layers.OGCFeatureLayerView2D")],i);const R=i;export{R as default};
