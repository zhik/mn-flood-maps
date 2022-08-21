import{aw as l,ax as h,eP as g,e7 as w,eT as f,eU as u,eV as n,aH as d,aJ as V}from"./index.d0d680cc.js";import{f as b,u as S}from"./LayerView.7dd901b7.js";import{i as v}from"./GraphicContainer.d3459885.js";import{a as T}from"./BaseGraphicContainer.9bd3de6d.js";import"./utils.d804b968.js";import"./Utils.7e1a367f.js";import"./Texture.76980db5.js";import"./MaterialKey.74118aa0.js";import"./CIMSymbolHelper.ff7ab4cd.js";import"./BidiEngine.ec67919b.js";import"./normalizeUtilsSync.28304ef6.js";import"./projectionSupport.8920ec1d.js";import"./json.d1a0fa35.js";import"./VertexArrayObject.5f0a4213.js";import"./FeatureContainer.d127b3e8.js";import"./TileContainer.fa263ca3.js";import"./WGLContainer.89287e6d.js";import"./pixelUtils.b9d87369.js";import"./ProgramTemplate.dc35262b.js";import"./config.40d47db8.js";import"./GeometryUtils.8166011b.js";import"./earcut.d30cbec0.js";import"./visualVariablesUtils.8a5bfbb0.js";import"./visualVariablesUtils.1b1486ea.js";import"./Matcher.0b8e29a1.js";import"./tileUtils.898e6388.js";import"./TileClipper.3ed66c51.js";import"./ExpandedCIM.40bd8128.js";import"./quantizationUtils.20d61d2b.js";import"./devEnvironmentUtils.8c6e6b72.js";import"./schemaUtils.8942f02f.js";import"./createSymbolSchema.a81d0ae8.js";import"./MD5.97b39efc.js";import"./util.026704c2.js";import"./ComputedAttributeStorage.1aafcf51.js";import"./centroid.ecf46765.js";import"./vec3f32.8d37ecf5.js";let y=class extends b(S){constructor(){super(...arguments),this._graphicsViewMap={},this._popupTemplates=new Map,this.graphicsViews=[]}async hitTest(e,r){if(!this.graphicsViews.length)return null;const o=this.layer;return this.graphicsViews.reverse().map(t=>{const i=this._popupTemplates.get(t),p=t.hitTest(e);for(const s of p)s.layer=o,s.sourceLayer=o,s.popupTemplate=i;return p}).flat().map(t=>({type:"graphic",graphic:t,layer:o,mapPoint:e}))}update(e){if(this.graphicsViews)for(const r of this.graphicsViews)r.processUpdate(e)}attach(){this.handles.add([l(()=>{var e;return(e=this.layer)==null?void 0:e.featureCollections},e=>{this._clear();for(const{popupInfo:r,featureSet:o,layerDefinition:t}of e){const i=g.fromJSON(o),p=new w(i.features),s=t.drawingInfo,c=r?f.fromJSON(r):null,a=u(s.renderer),m=new T({requestUpdateCallback:()=>this.requestUpdate(),view:this.view,graphics:p,renderer:a,container:new v(this.view.featuresTilingScheme)});this._graphicsViewMap[i.geometryType]=m,this._popupTemplates.set(m,c),i.geometryType!=="polygon"||this.layer.polygonSymbol?i.geometryType!=="polyline"||this.layer.lineSymbol?i.geometryType!=="point"||this.layer.pointSymbol||(this.layer.pointSymbol=a.symbol):this.layer.lineSymbol=a.symbol:this.layer.polygonSymbol=a.symbol,this.graphicsViews.push(m),this.container.addChild(m.container)}},h),l(()=>{var e;return(e=this.layer)==null?void 0:e.polygonSymbol},e=>{this._graphicsViewMap.polygon.renderer=new n({symbol:e})},h),l(()=>{var e;return(e=this.layer)==null?void 0:e.lineSymbol},e=>{this._graphicsViewMap.polyline.renderer=new n({symbol:e})},h),l(()=>{var e;return(e=this.layer)==null?void 0:e.pointSymbol},e=>{this._graphicsViewMap.point.renderer=new n({symbol:e})},h)],"georsslayerview")}detach(){this.handles.remove("georsslayerview"),this._clear()}moveStart(){}moveEnd(){}viewChange(){for(const e of this.graphicsViews)e.viewChange()}_clear(){this.container.removeAllChildren();for(const e of this.graphicsViews)e.destroy();this._graphicsViewMap={},this._popupTemplates.clear(),this.graphicsViews.length=0}};y=d([V("esri.views.2d.layers.GeoRSSLayerView2D")],y);const ae=y;export{ae as default};