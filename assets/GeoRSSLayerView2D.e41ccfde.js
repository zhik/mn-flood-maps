import{aw as l,ax as h,eP as g,e7 as w,eT as f,eU as u,eV as n,aH as d,aJ as V}from"./index.69e87a89.js";import{f as b,u as S}from"./LayerView.dfaa9a8b.js";import{i as v}from"./GraphicContainer.baebe395.js";import{a as T}from"./BaseGraphicContainer.0ef5070a.js";import"./utils.9935d283.js";import"./Utils.ed1865ad.js";import"./Texture.81d18d4f.js";import"./MaterialKey.5b405647.js";import"./CIMSymbolHelper.f52749ee.js";import"./BidiEngine.ec67919b.js";import"./normalizeUtilsSync.fb968b3c.js";import"./projectionSupport.b1096d9d.js";import"./json.d1a0fa35.js";import"./VertexArrayObject.9606db33.js";import"./FeatureContainer.78319156.js";import"./TileContainer.0840e566.js";import"./WGLContainer.2da8b275.js";import"./pixelUtils.bc91c840.js";import"./ProgramTemplate.9c4d59e3.js";import"./config.40d47db8.js";import"./GeometryUtils.8166011b.js";import"./earcut.d30cbec0.js";import"./visualVariablesUtils.384540fc.js";import"./visualVariablesUtils.96b7623d.js";import"./Matcher.cdc10d0e.js";import"./tileUtils.7bd1ec4a.js";import"./TileClipper.8f28269a.js";import"./ExpandedCIM.928fbb8c.js";import"./quantizationUtils.e2c024eb.js";import"./devEnvironmentUtils.8c6e6b72.js";import"./schemaUtils.8fb688de.js";import"./createSymbolSchema.95c1aaf7.js";import"./MD5.97b39efc.js";import"./util.0f9422aa.js";import"./ComputedAttributeStorage.0712085a.js";import"./centroid.dc394d91.js";import"./vec3f32.8d37ecf5.js";let y=class extends b(S){constructor(){super(...arguments),this._graphicsViewMap={},this._popupTemplates=new Map,this.graphicsViews=[]}async hitTest(e,r){if(!this.graphicsViews.length)return null;const o=this.layer;return this.graphicsViews.reverse().map(t=>{const i=this._popupTemplates.get(t),p=t.hitTest(e);for(const s of p)s.layer=o,s.sourceLayer=o,s.popupTemplate=i;return p}).flat().map(t=>({type:"graphic",graphic:t,layer:o,mapPoint:e}))}update(e){if(this.graphicsViews)for(const r of this.graphicsViews)r.processUpdate(e)}attach(){this.handles.add([l(()=>{var e;return(e=this.layer)==null?void 0:e.featureCollections},e=>{this._clear();for(const{popupInfo:r,featureSet:o,layerDefinition:t}of e){const i=g.fromJSON(o),p=new w(i.features),s=t.drawingInfo,c=r?f.fromJSON(r):null,a=u(s.renderer),m=new T({requestUpdateCallback:()=>this.requestUpdate(),view:this.view,graphics:p,renderer:a,container:new v(this.view.featuresTilingScheme)});this._graphicsViewMap[i.geometryType]=m,this._popupTemplates.set(m,c),i.geometryType!=="polygon"||this.layer.polygonSymbol?i.geometryType!=="polyline"||this.layer.lineSymbol?i.geometryType!=="point"||this.layer.pointSymbol||(this.layer.pointSymbol=a.symbol):this.layer.lineSymbol=a.symbol:this.layer.polygonSymbol=a.symbol,this.graphicsViews.push(m),this.container.addChild(m.container)}},h),l(()=>{var e;return(e=this.layer)==null?void 0:e.polygonSymbol},e=>{this._graphicsViewMap.polygon.renderer=new n({symbol:e})},h),l(()=>{var e;return(e=this.layer)==null?void 0:e.lineSymbol},e=>{this._graphicsViewMap.polyline.renderer=new n({symbol:e})},h),l(()=>{var e;return(e=this.layer)==null?void 0:e.pointSymbol},e=>{this._graphicsViewMap.point.renderer=new n({symbol:e})},h)],"georsslayerview")}detach(){this.handles.remove("georsslayerview"),this._clear()}moveStart(){}moveEnd(){}viewChange(){for(const e of this.graphicsViews)e.viewChange()}_clear(){this.container.removeAllChildren();for(const e of this.graphicsViews)e.destroy();this._graphicsViewMap={},this._popupTemplates.clear(),this.graphicsViews.length=0}};y=d([V("esri.views.2d.layers.GeoRSSLayerView2D")],y);const ae=y;export{ae as default};