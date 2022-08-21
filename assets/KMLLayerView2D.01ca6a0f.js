import{eZ as u,e7 as T,aw as q,q as R,ek as P,cA as E,ed as W,r as _,c as F,f0 as z,ea as C,bt as M,f9 as G,fa as D,fb as H,fc as J,aH as p,aI as m,aJ as K}from"./index.d0d680cc.js";import{b as V,g as N,d as j}from"./kmlUtils.097dc59d.js";import{v as B}from"./Bitmap.afd1c346.js";import{t as O}from"./BitmapContainer.98ad1b6d.js";import{f as Q,u as Z}from"./LayerView.7dd901b7.js";import{i as b}from"./GraphicContainer.d3459885.js";import{a as f}from"./BaseGraphicContainer.9bd3de6d.js";import"./utils.d804b968.js";import"./Utils.7e1a367f.js";import"./Texture.76980db5.js";import"./MaterialKey.74118aa0.js";import"./WGLContainer.89287e6d.js";import"./pixelUtils.b9d87369.js";import"./VertexArrayObject.5f0a4213.js";import"./ProgramTemplate.dc35262b.js";import"./config.40d47db8.js";import"./GeometryUtils.8166011b.js";import"./earcut.d30cbec0.js";import"./CIMSymbolHelper.ff7ab4cd.js";import"./BidiEngine.ec67919b.js";import"./normalizeUtilsSync.28304ef6.js";import"./projectionSupport.8920ec1d.js";import"./json.d1a0fa35.js";import"./FeatureContainer.d127b3e8.js";import"./TileContainer.fa263ca3.js";import"./visualVariablesUtils.8a5bfbb0.js";import"./visualVariablesUtils.1b1486ea.js";import"./Matcher.0b8e29a1.js";import"./tileUtils.898e6388.js";import"./TileClipper.3ed66c51.js";import"./ExpandedCIM.40bd8128.js";import"./quantizationUtils.20d61d2b.js";import"./devEnvironmentUtils.8c6e6b72.js";import"./schemaUtils.8942f02f.js";import"./createSymbolSchema.a81d0ae8.js";import"./MD5.97b39efc.js";import"./util.026704c2.js";import"./ComputedAttributeStorage.1aafcf51.js";import"./centroid.ecf46765.js";import"./vec3f32.8d37ecf5.js";class L{constructor(){this.allSublayers=new Map,this.allPoints=[],this.allPolylines=[],this.allPolygons=[],this.allMapImages=[]}}let n=class extends Q(Z){constructor(){super(...arguments),this._bitmapIndex=new Map,this._mapImageContainer=new O,this._kmlVisualData=new L,this.allVisiblePoints=new u,this.allVisiblePolylines=new u,this.allVisiblePolygons=new u,this.allVisibleMapImages=new T}async hitTest(i,t){var l,s,a;const e=this.layer;return[(l=this._pointsView)==null?void 0:l.hitTest(i),(s=this._polylinesView)==null?void 0:s.hitTest(i),(a=this._polygonsView)==null?void 0:a.hitTest(i)].flat().filter(Boolean).map(r=>(r.layer=e,r.sourceLayer=e,{type:"graphic",graphic:r,layer:e,mapPoint:i}))}update(i){this._polygonsView&&this._polygonsView.processUpdate(i),this._polylinesView&&this._polylinesView.processUpdate(i),this._pointsView&&this._pointsView.processUpdate(i)}attach(){this._fetchController=new AbortController,this.container.addChild(this._mapImageContainer),this._polygonsView=new f({view:this.view,graphics:this.allVisiblePolygons,requestUpdateCallback:()=>this.requestUpdate(),container:new b(this.view.featuresTilingScheme)}),this.container.addChild(this._polygonsView.container),this._polylinesView=new f({view:this.view,graphics:this.allVisiblePolylines,requestUpdateCallback:()=>this.requestUpdate(),container:new b(this.view.featuresTilingScheme)}),this.container.addChild(this._polylinesView.container),this._pointsView=new f({view:this.view,graphics:this.allVisiblePoints,requestUpdateCallback:()=>this.requestUpdate(),container:new b(this.view.featuresTilingScheme)}),this.container.addChild(this._pointsView.container),this.handles.add([this.allVisibleMapImages.on("change",i=>{i.added.forEach(t=>this._addMapImage(t)),i.removed.forEach(t=>this._removeMapImage(t))}),q(()=>this.layer.visibleSublayers,i=>{for(const[t,e]of this._kmlVisualData.allSublayers)e.visibility=0;for(const t of i){const e=this._kmlVisualData.allSublayers.get(t.id);e&&(e.visibility=1)}this._refreshCollections()})]),this.updatingHandles.addPromise(this._fetchService(this._fetchController.signal))}detach(){this._fetchController.abort(),this._fetchController=null,this._mapImageContainer.removeAllChildren(),this.container.removeAllChildren(),this._bitmapIndex.clear(),this._polygonsView&&(this._polygonsView.destroy(),this._polygonsView=null),this._polylinesView&&(this._polylinesView.destroy(),this._polylinesView=null),this._pointsView&&(this._pointsView.destroy(),this._pointsView=null)}moveStart(){}viewChange(){this._polygonsView.viewChange(),this._polylinesView.viewChange(),this._pointsView.viewChange()}moveEnd(){}isUpdating(){return this._pointsView.updating||this._polygonsView.updating||this._polylinesView.updating}_addMapImage(i){(this.view.spatialReference.isWGS84||this.view.spatialReference.isWebMercator)&&R(i.href,{responseType:"image"}).then(({data:t})=>{let e=P.fromJSON(i.extent);E(e,this.view.spatialReference)&&(e=W(e,this.view.spatialReference));const l=new B(t,"standard");l.x=e.xmin,l.y=e.ymax,l.resolution=e.width/t.naturalWidth,l.rotation=i.rotation,this._mapImageContainer.addChild(l),this._bitmapIndex.set(i,l)})}async _getViewDependentUrl(i,t){const{viewFormat:e,viewBoundScale:l,httpQuery:s}=i;if(_(e)){if(F(t))throw new Error("Loading this network link requires a view state.");let a;if(await z(),_(l)&&l!==1){const h=new P(t.extent);h.expand(l),a=h}else a=t.extent;a=C(a,M.WGS84);const r=C(a,M.WebMercator),d=a.xmin,y=a.xmax,o=a.ymin,U=a.ymax,$=t.size[0]*t.pixelRatio,A=t.size[1]*t.pixelRatio,v=Math.max(r.width,r.height),S={"[bboxWest]":d.toString(),"[bboxEast]":y.toString(),"[bboxSouth]":o.toString(),"[bboxNorth]":U.toString(),"[lookatLon]":a.center.x.toString(),"[lookatLat]":a.center.y.toString(),"[lookatRange]":v.toString(),"[lookatTilt]":"0","[lookatHeading]":t.rotation.toString(),"[lookatTerrainLon]":a.center.x.toString(),"[lookatTerrainLat]":a.center.y.toString(),"[lookatTerrainAlt]":"0","[cameraLon]":a.center.x.toString(),"[cameraLat]":a.center.y.toString(),"[cameraAlt]":v.toString(),"[horizFov]":"60","[vertFov]":"60","[horizPixels]":$.toString(),"[vertPixels]":A.toString(),"[terrainEnabled]":"0","[clientVersion]":G,"[kmlVersion]":"2.2","[clientName]":"ArcGIS API for JavaScript","[language]":"en-US"},I=h=>{for(const x in h)for(const k in S)h[x]=h[x].replace(k,S[k])},c=D(e);I(c);let w={};_(s)&&(w=D(s),I(w));const g=H(i.href);return g.query={...g.query,...c,...w},`${g.path}?${J(c)}`}return i.href}async _fetchService(i){const t=new L;await this._loadVisualData(this.layer.url,t,i),this._kmlVisualData=t,this._refreshCollections()}_refreshCollections(){this.allVisiblePoints.removeAll(),this.allVisiblePolylines.removeAll(),this.allVisiblePolygons.removeAll(),this.allVisibleMapImages.removeAll(),this.allVisiblePoints.addMany(this._kmlVisualData.allPoints.filter(i=>this._isSublayerVisible(i.sublayerId)).map(({item:i})=>i)),this.allVisiblePolylines.addMany(this._kmlVisualData.allPolylines.filter(i=>this._isSublayerVisible(i.sublayerId)).map(({item:i})=>i)),this.allVisiblePolygons.addMany(this._kmlVisualData.allPolygons.filter(i=>this._isSublayerVisible(i.sublayerId)).map(({item:i})=>i)),this.allVisibleMapImages.addMany(this._kmlVisualData.allMapImages.filter(i=>this._isSublayerVisible(i.sublayerId)).map(({item:i})=>i))}_isSublayerVisible(i){const t=this._kmlVisualData.allSublayers.get(i);return!!t.visibility&&(t.parentFolderId===-1||this._isSublayerVisible(t.parentFolderId))}_loadVisualData(i,t,e){return this._fetchParsedKML(i,e).then(async l=>{for(const s of l.sublayers){t.allSublayers.set(s.id,s);const a=s.points?await V(s.points):[],r=s.polylines?await V(s.polylines):[],d=s.polygons?await V(s.polygons):[],y=s.mapImages||[];if(t.allPoints.push(...a.map(o=>({item:o,sublayerId:s.id}))),t.allPolylines.push(...r.map(o=>({item:o,sublayerId:s.id}))),t.allPolygons.push(...d.map(o=>({item:o,sublayerId:s.id}))),t.allMapImages.push(...y.map(o=>({item:o,sublayerId:s.id}))),s.networkLink){const o=await this._getViewDependentUrl(s.networkLink,this.view.state);await this._loadVisualData(o,t,e)}}})}_fetchParsedKML(i,t){return N(i,this.view.spatialReference,this.layer.refreshInterval,t).then(e=>j(e.data))}_removeMapImage(i){const t=this._bitmapIndex.get(i);t&&(this._mapImageContainer.removeChild(t),this._bitmapIndex.delete(i))}};p([m()],n.prototype,"_pointsView",void 0),p([m()],n.prototype,"_polylinesView",void 0),p([m()],n.prototype,"_polygonsView",void 0),p([m()],n.prototype,"updating",void 0),n=p([K("esri.views.2d.layers.KMLLayerView2D")],n);const Ei=n;export{Ei as default};