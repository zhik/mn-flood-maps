import{aH as e,aJ as h,e3 as O,aI as t,di as x,eo as A,ek as I,b7 as U,e7 as j,ep as N,k as P,aw as y,eq as v,er as _,aF as C,bp as L,es as M,ah as V,aK as k,s as E,ap as q}from"./index.b82fad90.js";import{s as T}from"./utils.29d76383.js";let w=class extends O{};w=e([h("esri.views.layers.support.ClipArea")],w);const g=w;var m;let l=m=class extends g{constructor(){super(...arguments),this.type="rect",this.left=null,this.right=null,this.top=null,this.bottom=null}clone(){return new m({left:this.left,right:this.right,top:this.top,bottom:this.bottom})}get version(){return(this._get("version")||0)+1}};e([t({type:[Number,String],json:{write:!0}})],l.prototype,"left",void 0),e([t({type:[Number,String],json:{write:!0}})],l.prototype,"right",void 0),e([t({type:[Number,String],json:{write:!0}})],l.prototype,"top",void 0),e([t({type:[Number,String],json:{write:!0}})],l.prototype,"bottom",void 0),e([t({readOnly:!0})],l.prototype,"version",null),l=m=e([h("esri.views.layers.support.ClipRect")],l);const D=l;var b;const F={base:A,key:"type",typeMap:{extent:I,polygon:U}};let u=b=class extends g{constructor(){super(...arguments),this.type="geometry",this.geometry=null}get version(){return(this._get("version")||0)+1}clone(){return new b({geometry:this.geometry.clone()})}};e([t({types:F,json:{read:x,write:!0}})],u.prototype,"geometry",void 0),e([t({readOnly:!0})],u.prototype,"version",null),u=b=e([h("esri.views.layers.support.Geometry")],u);const H=u;let c=class extends g{constructor(){super(...arguments),this.type="path",this.path=[]}get version(){return(this._get("version")||0)+1}};e([t({type:[[[Number]]],json:{write:!0}})],c.prototype,"path",void 0),e([t({readOnly:!0})],c.prototype,"version",null),c=e([h("esri.views.layers.support.Path")],c);const z=c,f=j.ofType({key:"type",base:g,typeMap:{rect:D,path:z,geometry:H}}),J=s=>{let r=class extends s{constructor(){super(...arguments),this.attached=!1,this.clips=new f,this.lastUpdateId=-1,this.moving=!1,this.updateRequested=!1}initialize(){var p,d,R,S;const i=(d=(p=this.view)==null?void 0:p.spatialReferenceLocked)!=null?d:!0;((R=this.view)==null?void 0:R.spatialReference)&&i&&!this.spatialReferenceSupported?this.addResolvingPromise(Promise.reject(new P("layerview:spatial-reference-incompatible","The spatial reference of this layer does not meet the requirements of the view",{layer:this.layer}))):(this.container||(this.container=new T),this.container.fadeTransitionEnabled=!0,this.container.opacity=0,this.container.clips=this.clips,this.handles.add([y(()=>this.suspended,a=>{this.container&&(this.container.visible=!a),this.view&&!a&&this.updateRequested&&this.view.requestUpdate()},v),y(()=>{var a,$;return($=(a=this.layer)==null?void 0:a.opacity)!=null?$:1},a=>{this.container&&(this.container.opacity=a)},v),y(()=>this.layer&&"blendMode"in this.layer?this.layer.blendMode:"normal",a=>{this.container&&(this.container.blendMode=a)},v),y(()=>this.layer&&"effect"in this.layer?this.layer.effect:null,a=>{this.container&&(this.container.effect=a)},v),_(()=>this.clips,"change",()=>{this.container&&(this.container.clips=this.clips)})]),(S=this.view)!=null&&S.whenLayerView?this.view.whenLayerView(this.layer).then(a=>{a===this&&this.processAttach()},()=>{}):this.when().then(()=>{this.processAttach()},()=>{}))}destroy(){this.processDetach(),this.updateRequested=!1}get spatialReferenceSupported(){var o;const i=(o=this.view)==null?void 0:o.spatialReference;return i==null||this.supportsSpatialReference(i)}get updating(){var i;return this.spatialReferenceSupported&&(!this.attached||!this.suspended&&(this.updateRequested||this.isUpdating())||!!((i=this.updatingHandles)!=null&&i.updating))}get visibleAtCurrentScale(){return this.isVisibleAtScale(this.view.scale)}processAttach(){this.isResolved()&&!this.attached&&!this.destroyed&&this.spatialReferenceSupported&&(this.attach(),this.attached=!0,this.requestUpdate())}processDetach(){this.attached&&(this.attached=!1,this.detach(),this.updateRequested=!1)}isVisibleAtScale(i){const o=this.layer&&"effectiveScaleRange"in this.layer?this.layer.effectiveScaleRange:null;if(!o)return!0;const{minScale:p,maxScale:d}=o;return(p===0||i<=p)&&(d===0||i>=d)}requestUpdate(){this.destroyed||this.updateRequested||(this.updateRequested=!0,this.suspended||this.view.requestUpdate())}processUpdate(i){!this.isFulfilled()||this.isResolved()?(this._set("updateParameters",i),this.updateRequested&&!this.suspended&&(this.updateRequested=!1,this.update(i))):this.updateRequested=!1}hitTest(i,o){return Promise.resolve(null)}supportsSpatialReference(i){return!0}canResume(){return!!this.spatialReferenceSupported&&!!super.canResume()&&this.visibleAtCurrentScale}getSuspendInfo(){const i=super.getSuspendInfo(),o=!this.spatialReferenceSupported,p=this.visibleAtCurrentScale;return o&&(i.spatialReferenceNotSupported=o),p&&(i.outsideScaleRange=p),i}};return e([t()],r.prototype,"attached",void 0),e([t({type:f,set(i){const o=N(i,this._get("clips"),f);this._set("clips",o)}})],r.prototype,"clips",void 0),e([t()],r.prototype,"container",void 0),e([t()],r.prototype,"moving",void 0),e([t({readOnly:!0})],r.prototype,"spatialReferenceSupported",null),e([t({readOnly:!0})],r.prototype,"updateParameters",void 0),e([t()],r.prototype,"updateRequested",void 0),e([t()],r.prototype,"updating",null),e([t()],r.prototype,"view",void 0),e([t({readOnly:!0})],r.prototype,"visibleAtCurrentScale",null),r=e([h("esri.views.2d.layers.LayerView2D")],r),r};let n=class extends C(L(M(V.EventedMixin(k)))){constructor(s){super(s),this.layer=null,this.parent=null}initialize(){this.when().catch(s=>{if(s.name!=="layerview:create-error"){const r=this.layer&&this.layer.id||"no id",i=this.layer&&this.layer.title||"no title";E.getLogger(this.declaredClass).error("#resolve()",`Failed to resolve layer view (layer title: '${i}', id: '${r}')`,s)}})}get fullOpacity(){return q(this.get("layer.opacity"),1)*q(this.get("parent.fullOpacity"),1)}get suspended(){return!this.canResume()}get suspendInfo(){return this.getSuspendInfo()}get legendEnabled(){var s;return!this.suspended&&((s=this.layer)==null?void 0:s.legendEnabled)===!0}get updating(){var s;return!(!((s=this.updatingHandles)!=null&&s.updating)&&!this.isUpdating())}get updatingProgress(){return this.updating?0:1}get visible(){var s;return((s=this.layer)==null?void 0:s.visible)===!0}set visible(s){s!==void 0?this._override("visible",s):this._clearOverride("visible")}canResume(){var s,r,i;return this.visible&&((s=this.layer)==null?void 0:s.loaded)&&!((r=this.parent)!=null&&r.suspended)&&((i=this.view)==null?void 0:i.ready)||!1}getSuspendInfo(){const s=this.parent&&this.parent.suspended?this.parent.suspendInfo:{},r=this;return r.view&&r.view.ready||(s.viewNotReady=!0),this.layer&&this.layer.loaded||(s.layerNotLoaded=!0),this.visible||(s.layerInvisible=!0),s}isUpdating(){return!1}};e([t()],n.prototype,"fullOpacity",null),e([t()],n.prototype,"layer",void 0),e([t()],n.prototype,"parent",void 0),e([t({readOnly:!0})],n.prototype,"suspended",null),e([t({readOnly:!0})],n.prototype,"suspendInfo",null),e([t({readOnly:!0})],n.prototype,"legendEnabled",null),e([t({type:Boolean,readOnly:!0})],n.prototype,"updating",null),e([t({readOnly:!0})],n.prototype,"updatingProgress",null),e([t()],n.prototype,"visible",null),e([t()],n.prototype,"view",void 0),n=e([h("esri.views.layers.LayerView")],n);const K=n;export{J as f,K as u};
