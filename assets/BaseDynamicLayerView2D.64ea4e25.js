import{s as o,J as p,aH as a,aI as r,aJ as n}from"./index.d0d680cc.js";import{t as m}from"./BitmapContainer.98ad1b6d.js";import{f as h,u as d}from"./LayerView.7dd901b7.js";import{S as c}from"./ExportStrategy.ca4c29db.js";import{i as y}from"./RefreshableLayerView.4e40d6dd.js";import"./WGLContainer.89287e6d.js";import"./pixelUtils.b9d87369.js";import"./utils.d804b968.js";import"./Utils.7e1a367f.js";import"./Texture.76980db5.js";import"./MaterialKey.74118aa0.js";import"./VertexArrayObject.5f0a4213.js";import"./ProgramTemplate.dc35262b.js";import"./config.40d47db8.js";import"./GeometryUtils.8166011b.js";import"./earcut.d30cbec0.js";import"./Bitmap.afd1c346.js";const g=o.getLogger("esri.views.2d.layers.BaseDynamicLayerView2D");let t=class extends y(h(d)){update(i){this.strategy.update(i).catch(e=>{p(e)||g.error(e)}),this.notifyChange("updating")}attach(){this._bitmapContainer=new m,this.container.addChild(this._bitmapContainer),this.strategy=new c({container:this._bitmapContainer,fetchSource:this.fetchBitmapData.bind(this),requestUpdate:this.requestUpdate.bind(this)})}detach(){this.strategy.destroy(),this.strategy=null,this.container.removeChild(this._bitmapContainer),this._bitmapContainer.removeAllChildren()}moveStart(){}viewChange(){}moveEnd(){this.requestUpdate()}fetchBitmapData(i,e,s){return this.layer.fetchImage(i,e,s)}async doRefresh(){this.requestUpdate()}isUpdating(){return this.strategy.updating||this.updateRequested}};a([r()],t.prototype,"strategy",void 0),a([r()],t.prototype,"updating",void 0),t=a([n("esri.views.2d.layers.BaseDynamicLayerView2D")],t);const R=t;export{R as default};