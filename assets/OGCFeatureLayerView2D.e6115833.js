import{aH as r,aI as a,aJ as o}from"./index.69e87a89.js";import s from"./FeatureLayerView2D.c03f8b97.js";import"./utils.9935d283.js";import"./Utils.ed1865ad.js";import"./Texture.81d18d4f.js";import"./MaterialKey.5b405647.js";import"./LayerView.dfaa9a8b.js";import"./schemaUtils.8fb688de.js";import"./visualVariablesUtils.96b7623d.js";import"./createSymbolSchema.95c1aaf7.js";import"./CIMSymbolHelper.f52749ee.js";import"./BidiEngine.ec67919b.js";import"./ExpandedCIM.928fbb8c.js";import"./quantizationUtils.e2c024eb.js";import"./MD5.97b39efc.js";import"./util.0f9422aa.js";import"./floorFilterUtils.69500d62.js";import"./popupUtils.24143a97.js";import"./RefreshableLayerView.fc313b66.js";const l=t=>{let e=class extends t{get availableFields(){return this.layer.fieldsIndex.fields.map(p=>p.name)}};return r([a()],e.prototype,"layer",void 0),r([a({readOnly:!0})],e.prototype,"availableFields",null),e=r([o("esri.views.layers.OGCFeatureLayerView")],e),e};let i=class extends l(s){supportsSpatialReference(t){return this.layer.serviceSupportsSpatialReference(t)}};i=r([o("esri.views.2d.layers.OGCFeatureLayerView2D")],i);const R=i;export{R as default};