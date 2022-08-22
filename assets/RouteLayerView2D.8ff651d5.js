import{e7 as l,fy as u,r as o,ax as m,c as _,aw as g,aH as p,aI as d,aJ as w}from"./index.69e87a89.js";import{b as f,h as y,O as k,g as v,a as M,c as I,D as V}from"./Stop.e2b0cc49.js";import{f as G,u as F}from"./LayerView.dfaa9a8b.js";import{i as H}from"./GraphicContainer.baebe395.js";import{a as C}from"./BaseGraphicContainer.0ef5070a.js";import"./utils.9935d283.js";import"./Utils.ed1865ad.js";import"./Texture.81d18d4f.js";import"./MaterialKey.5b405647.js";import"./CIMSymbolHelper.f52749ee.js";import"./BidiEngine.ec67919b.js";import"./normalizeUtilsSync.fb968b3c.js";import"./projectionSupport.b1096d9d.js";import"./json.d1a0fa35.js";import"./VertexArrayObject.9606db33.js";import"./FeatureContainer.78319156.js";import"./TileContainer.0840e566.js";import"./WGLContainer.2da8b275.js";import"./pixelUtils.bc91c840.js";import"./ProgramTemplate.9c4d59e3.js";import"./config.40d47db8.js";import"./GeometryUtils.8166011b.js";import"./earcut.d30cbec0.js";import"./visualVariablesUtils.384540fc.js";import"./visualVariablesUtils.96b7623d.js";import"./Matcher.cdc10d0e.js";import"./tileUtils.7bd1ec4a.js";import"./TileClipper.8f28269a.js";import"./ExpandedCIM.928fbb8c.js";import"./quantizationUtils.e2c024eb.js";import"./devEnvironmentUtils.8c6e6b72.js";import"./schemaUtils.8fb688de.js";import"./createSymbolSchema.95c1aaf7.js";import"./MD5.97b39efc.js";import"./util.0f9422aa.js";import"./ComputedAttributeStorage.0712085a.js";import"./centroid.dc394d91.js";import"./vec3f32.8d37ecf5.js";const b=Object.freeze({remove(){},pause(){},resume(){}}),U=["route-info","direction-line","direction-point","polygon-barrier","polyline-barrier","point-barrier","stop"],a={graphic:null,property:null,oldValue:null,newValue:null};function c(t){return t instanceof f||t instanceof y||t instanceof k||t instanceof v||t instanceof M||t instanceof I||t instanceof V}function A(t){return l.isCollection(t)&&t.length&&c(t.getItemAt(0))}function O(t){return Array.isArray(t)&&t.length&&c(t[0])}let h=class extends G(F){constructor(){super(...arguments),this._graphics=new l,this._highlightIds=new Map,this._networkFeatureMap=new Map,this._networkGraphicMap=new Map}get _routeItems(){return new u({getCollections:()=>[o(this.layer.routeInfo)?new l([this.layer.routeInfo]):null,this.layer.directionLines,this.layer.directionPoints,this.layer.polygonBarriers,this.layer.polylineBarriers,this.layer.pointBarriers,this.layer.stops]})}initialize(){this.updatingHandles.addOnCollectionChange(()=>this._routeItems,t=>this._routeItemsChanged(t),m)}destroy(){this.handles.removeAll(),this.updatingHandles.removeAll(),this._networkFeatureMap.clear(),this._networkGraphicMap.clear(),this._graphics.removeAll()}attach(){this._createGraphicsView()}detach(){this._destroyGraphicsView()}async fetchPopupFeatures(t){return this._graphicsView.hitTest(t).filter(e=>!!e.popupTemplate)}highlight(t){let e;e=c(t)?[this._getNetworkFeatureUid(t)]:O(t)?t.map(r=>this._getNetworkFeatureUid(r)):A(t)?t.map(r=>this._getNetworkFeatureUid(r)).toArray():[t.uid];const i=e.filter(o);return i.length?(this._addHighlight(i),{remove:()=>this._removeHighlight(i)}):b}async hitTest(t,e){if(this.suspended)return null;const i=this._graphicsView.hitTest(t).filter(o).map(s=>this._networkGraphicMap.get(s));if(!i.length)return null;const{layer:r}=this;return i.reverse().map(s=>({type:"route",layer:r,mapPoint:t,networkFeature:s}))}isUpdating(){return this._graphicsView.updating}moveStart(){}moveEnd(){}update(t){this._graphicsView.processUpdate(t)}viewChange(){this._graphicsView.viewChange()}_addHighlight(t){for(const e of t)if(this._highlightIds.has(e)){const i=this._highlightIds.get(e);this._highlightIds.set(e,i+1)}else this._highlightIds.set(e,1);this._updateHighlight()}_createGraphic(t){const e=t.toGraphic();return e.layer=this.layer,e.sourceLayer=this.layer,e}_createGraphicsView(){const t=this.view,e=()=>this.requestUpdate(),i=new H(t.featuresTilingScheme);this._graphicsView=new C({container:i,graphics:this._graphics,requestUpdateCallback:e,view:t}),this.container.addChild(i),this._updateHighlight()}_destroyGraphicsView(){this.container.removeChild(this._graphicsView.container),this._graphicsView.destroy()}_getDrawOrder(t){const e=this._networkGraphicMap.get(t);return U.indexOf(e.type)}_getNetworkFeatureUid(t){return this._networkFeatureMap.has(t)?this._networkFeatureMap.get(t).uid:null}_removeHighlight(t){for(const e of t)if(this._highlightIds.has(e)){const i=this._highlightIds.get(e)-1;i===0?this._highlightIds.delete(e):this._highlightIds.set(e,i)}this._updateHighlight()}_routeItemsChanged(t){if(t.removed.length){this._graphics.removeMany(t.removed.map(e=>{const i=this._networkFeatureMap.get(e);return this._networkFeatureMap.delete(e),this._networkGraphicMap.delete(i),i}));for(const e of t.removed)this.handles.remove(e)}if(t.added.length){this._graphics.addMany(t.added.map(e=>{const i=this._createGraphic(e);return _(i.symbol)?null:(this._networkFeatureMap.set(e,i),this._networkGraphicMap.set(i,e),i)}).filter(o));for(const e of t.added)this.handles.add([g(()=>e.geometry,(i,r)=>{this._updateGraphic(e,"geometry",i,r)}),g(()=>e.symbol,(i,r)=>{this._updateGraphic(e,"symbol",i,r)})],e);this._graphics.sort((e,i)=>this._getDrawOrder(e)-this._getDrawOrder(i))}}_updateGraphic(t,e,i,r){if(!this._networkFeatureMap.has(t)){const n=this._createGraphic(t);return this._networkFeatureMap.set(t,n),this._networkGraphicMap.set(n,t),void this._graphics.add(n)}const s=this._networkFeatureMap.get(t);s[e]=i,a.graphic=s,a.property=e,a.oldValue=r,a.newValue=i,this._graphicsView.graphicUpdateHandler(a)}_updateHighlight(){const t=Array.from(this._highlightIds.keys());this._graphicsView.setHighlight(t)}};p([d()],h.prototype,"_graphics",void 0),p([d()],h.prototype,"_routeItems",null),h=p([w("esri.views.2d.layers.RouteLayerView2D")],h);const wt=h;export{wt as default};