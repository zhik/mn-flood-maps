import{mw as a,aH as m,aJ as l,cm as h}from"./index.769151e2.js";import{n as p}from"./BitmapTileContainer.fd9f7398.js";import{o as c}from"./BaseTileRenderer.aaa327ed.js";import"./Bitmap.c587d450.js";import"./utils.43e9b114.js";import"./Utils.58433441.js";import"./Texture.8ade5b67.js";import"./MaterialKey.d718a93c.js";import"./TileContainer.85f873c9.js";import"./WGLContainer.164c1fd8.js";import"./pixelUtils.918bf71e.js";import"./VertexArrayObject.6726f8cc.js";import"./ProgramTemplate.c32e935d.js";import"./config.40d47db8.js";import"./GeometryUtils.8166011b.js";import"./earcut.d30cbec0.js";class d{constructor(){this.gradient=null,this.height=512,this.width=512}render(i){a(i,512,this.intensities,this.gradient,this.minDensity,this.maxDensity)}}let o=class extends c{constructor(t){super(t),this._intensityInfo={minDensity:0,maxDensity:0},this.type="heatmap",this.featuresView={attributeView:{initialize:()=>{},requestUpdate:()=>{}},requestRender:()=>{}},this._container=new p(t.tileInfoView)}createTile(t){const i=this._container.createTile(t);return this.tileInfoView.getTileCoords(i.bitmap,t),i.bitmap.resolution=this.tileInfoView.getTileResolution(t),i}onConfigUpdate(){const t=this.layer.renderer;if(t.type==="heatmap"){const{minDensity:i,maxDensity:s,colorStops:r}=t;this._intensityInfo.minDensity=i,this._intensityInfo.maxDensity=s,this._gradient=h(r),this.tiles.forEach(n=>{const e=n.bitmap.source;e&&(e.minDensity=i,e.maxDensity=s,e.gradient=this._gradient,n.bitmap.invalidateTexture())})}}hitTest(){return Promise.resolve([])}install(t){t.addChild(this._container)}uninstall(t){this._container.removeAllChildren(),t.removeChild(this._container)}disposeTile(t){this._container.removeChild(t),t.destroy()}supportsRenderer(t){return t&&t.type==="heatmap"}onTileData(t){const i=this.tiles.get(t.tileKey);if(!i)return;const s=t.intensityInfo,{minDensity:r,maxDensity:n}=this._intensityInfo,e=i.bitmap.source||new d;e.intensities=s&&s.matrix||null,e.minDensity=r,e.maxDensity=n,e.gradient=this._gradient,i.bitmap.source=e,this._container.addChild(i),this._container.requestRender(),this.requestUpdate()}onTileError(t){console.error(t)}lockGPUUploads(){}unlockGPUUploads(){}fetchResource(t,i){return console.error(t),Promise.reject()}};o=m([l("esri.views.2d.layers.features.tileRenderers.HeatmapTileRenderer")],o);const q=o;export{q as default};