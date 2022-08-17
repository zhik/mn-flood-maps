import{aj as D,ak as b,ai as _,R as r,a1 as d,q as B}from"./index.b82fad90.js";var h,p,f,o,g,O,N,S,T,v,I,A,C,W;(function(t){t[t.None=0]="None",t[t.Front=1]="Front",t[t.Back=2]="Back",t[t.COUNT=3]="COUNT"})(h||(h={})),function(t){t[t.Less=0]="Less",t[t.Lequal=1]="Lequal",t[t.COUNT=2]="COUNT"}(p||(p={})),function(t){t[t.NONE=0]="NONE",t[t.SMAA=1]="SMAA"}(f||(f={})),function(t){t[t.Color=0]="Color",t[t.Alpha=1]="Alpha",t[t.FrontFace=2]="FrontFace",t[t.NONE=3]="NONE",t[t.COUNT=4]="COUNT"}(o||(o={})),function(t){t[t.BACKGROUND=0]="BACKGROUND",t[t.UPDATE=1]="UPDATE"}(g||(g={})),function(t){t[t.NOT_LOADED=0]="NOT_LOADED",t[t.LOADING=1]="LOADING",t[t.LOADED=2]="LOADED"}(O||(O={})),function(t){t[t.IntegratedMeshMaskExcluded=1]="IntegratedMeshMaskExcluded",t[t.OutlineVisualElementMask=2]="OutlineVisualElementMask"}(N||(N={})),function(t){t[t.ASYNC=0]="ASYNC",t[t.SYNC=1]="SYNC"}(S||(S={})),function(t){t[t.Highlight=0]="Highlight",t[t.MaskOccludee=1]="MaskOccludee",t[t.COUNT=2]="COUNT"}(T||(T={})),function(t){t[t.Triangle=0]="Triangle",t[t.Point=1]="Point",t[t.Line=2]="Line"}(v||(v={})),function(t){t[t.STRETCH=1]="STRETCH",t[t.PAD=2]="PAD"}(I||(I={})),function(t){t[t.CHANGED=0]="CHANGED",t[t.UNCHANGED=1]="UNCHANGED"}(A||(A={})),function(t){t[t.Blend=0]="Blend",t[t.Opaque=1]="Opaque",t[t.Mask=2]="Mask",t[t.MaskBlend=3]="MaskBlend",t[t.COUNT=4]="COUNT"}(C||(C={})),function(t){t[t.OFF=0]="OFF",t[t.ON=1]="ON"}(W||(W={}));function E(t,e,n=_.ADD,i=[0,0,0,0]){return{srcRgb:t,srcAlpha:t,dstRgb:e,dstAlpha:e,opRgb:n,opAlpha:n,color:{r:i[0],g:i[1],b:i[2],a:i[3]}}}function m(t,e,n,i,u=_.ADD,P=_.ADD,c=[0,0,0,0]){return{srcRgb:t,srcAlpha:e,dstRgb:n,dstAlpha:i,opRgb:u,opAlpha:P,color:{r:c[0],g:c[1],b:c[2],a:c[3]}}}const w={face:D.BACK,mode:b.CCW},H={face:D.FRONT,mode:b.CCW},ht=t=>t===h.Back?w:t===h.Front?H:null,ut={zNear:0,zFar:1},_t={r:!0,g:!0,b:!0,a:!0};function G(t){return Q.intern(t)}function z(t){return Z.intern(t)}function K(t){return J.intern(t)}function q(t){return X.intern(t)}function j(t){return tt.intern(t)}function x(t){return et.intern(t)}function Y(t){return it.intern(t)}function V(t){return nt.intern(t)}function dt(t){return st.intern(t)}class s{constructor(e,n){this.makeKey=e,this.makeRef=n,this.interns=new Map}intern(e){if(!e)return null;const n=this.makeKey(e),i=this.interns;return i.has(n)||i.set(n,this.makeRef(e)),i.get(n)}}function l(t){return"["+t.join(",")+"]"}const Q=new s($,t=>({__tag:"Blending",...t}));function $(t){return t?l([t.srcRgb,t.srcAlpha,t.dstRgb,t.dstAlpha,t.opRgb,t.opAlpha,t.color.r,t.color.g,t.color.b,t.color.a]):null}const Z=new s(R,t=>({__tag:"Culling",...t}));function R(t){return t?l([t.face,t.mode]):null}const J=new s(k,t=>({__tag:"PolygonOffset",...t}));function k(t){return t?l([t.factor,t.units]):null}const X=new s(y,t=>({__tag:"DepthTest",...t}));function y(t){return t?l([t.func]):null}const tt=new s(F,t=>({__tag:"StencilTest",...t}));function F(t){return t?l([t.function.func,t.function.ref,t.function.mask,t.operation.fail,t.operation.zFail,t.operation.zPass]):null}const et=new s(U,t=>({__tag:"DepthWrite",...t}));function U(t){return t?l([t.zNear,t.zFar]):null}const it=new s(L,t=>({__tag:"ColorWrite",...t}));function L(t){return t?l([t.r,t.g,t.b,t.a]):null}const nt=new s(M,t=>({__tag:"StencilWrite",...t}));function M(t){return t?l([t.mask]):null}const st=new s(lt,t=>({blending:G(t.blending),culling:z(t.culling),polygonOffset:K(t.polygonOffset),depthTest:q(t.depthTest),stencilTest:j(t.stencilTest),depthWrite:x(t.depthWrite),colorWrite:Y(t.colorWrite),stencilWrite:V(t.stencilWrite)}));function lt(t){return t?l([$(t.blending),R(t.culling),k(t.polygonOffset),y(t.depthTest),F(t.stencilTest),U(t.depthWrite),L(t.colorWrite),M(t.stencilWrite)]):null}class pt{constructor(e){this._pipelineInvalid=!0,this._blendingInvalid=!0,this._cullingInvalid=!0,this._polygonOffsetInvalid=!0,this._depthTestInvalid=!0,this._stencilTestInvalid=!0,this._depthWriteInvalid=!0,this._colorWriteInvalid=!0,this._stencilWriteInvalid=!0,this._stateSetters=e}setPipeline(e){(this._pipelineInvalid||e!==this._pipeline)&&(this._setBlending(e.blending),this._setCulling(e.culling),this._setPolygonOffset(e.polygonOffset),this._setDepthTest(e.depthTest),this._setStencilTest(e.stencilTest),this._setDepthWrite(e.depthWrite),this._setColorWrite(e.colorWrite),this._setStencilWrite(e.stencilWrite),this._pipeline=e),this._pipelineInvalid=!1}invalidateBlending(){this._blendingInvalid=!0,this._pipelineInvalid=!0}invalidateCulling(){this._cullingInvalid=!0,this._pipelineInvalid=!0}invalidatePolygonOffset(){this._polygonOffsetInvalid=!0,this._pipelineInvalid=!0}invalidateDepthTest(){this._depthTestInvalid=!0,this._pipelineInvalid=!0}invalidateStencilTest(){this._stencilTestInvalid=!0,this._pipelineInvalid=!0}invalidateDepthWrite(){this._depthWriteInvalid=!0,this._pipelineInvalid=!0}invalidateColorWrite(){this._colorWriteInvalid=!0,this._pipelineInvalid=!0}invalidateStencilWrite(){this._stencilTestInvalid=!0,this._pipelineInvalid=!0}_setBlending(e){this._blending=this._setSubState(e,this._blending,this._blendingInvalid,this._stateSetters.setBlending),this._blendingInvalid=!1}_setCulling(e){this._culling=this._setSubState(e,this._culling,this._cullingInvalid,this._stateSetters.setCulling),this._cullingInvalid=!1}_setPolygonOffset(e){this._polygonOffset=this._setSubState(e,this._polygonOffset,this._polygonOffsetInvalid,this._stateSetters.setPolygonOffset),this._polygonOffsetInvalid=!1}_setDepthTest(e){this._depthTest=this._setSubState(e,this._depthTest,this._depthTestInvalid,this._stateSetters.setDepthTest),this._depthTestInvalid=!1}_setStencilTest(e){this._stencilTest=this._setSubState(e,this._stencilTest,this._stencilTestInvalid,this._stateSetters.setStencilTest),this._stencilTestInvalid=!1}_setDepthWrite(e){this._depthWrite=this._setSubState(e,this._depthWrite,this._depthWriteInvalid,this._stateSetters.setDepthWrite),this._depthWriteInvalid=!1}_setColorWrite(e){this._colorWrite=this._setSubState(e,this._colorWrite,this._colorWriteInvalid,this._stateSetters.setColorWrite),this._colorWriteInvalid=!1}_setStencilWrite(e){this._stencilWrite=this._setSubState(e,this._stencilWrite,this._stencilWriteInvalid,this._stateSetters.setStencilWrite),this._stencilTestInvalid=!1}_setSubState(e,n,i,u){return(i||e!==n)&&(u(e),this._pipelineInvalid=!0),e}}function ft(t,e,n){for(let i=0;i<n;++i)e[2*i]=t[i],e[2*i+1]=t[i]-e[2*i]}function gt(t,e){const n=t.length;for(let i=0;i<n;++i)a[0]=t[i],e[i]=a[0];return e}function Ot(t,e){const n=t.length;for(let i=0;i<n;++i)a[0]=t[i],a[1]=t[i]-a[0],e[i]=a[1];return e}const a=new Float32Array(2),Nt=m(r.SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA),rt=E(r.ONE,r.ONE),at=E(r.ZERO,r.ONE_MINUS_SRC_ALPHA);function St(t){return t===o.FrontFace?null:t===o.Alpha?at:rt}const Tt=5e5,ot={factor:-1,units:-2};function vt(t){return t?ot:null}function It(t,e=d.LESS){return t===o.NONE||t===o.FrontFace?e:d.LEQUAL}async function At(t,e){const{data:n}=await B(t,{responseType:"image",...e});return n}export{at as A,C,St as E,pt as M,p as N,o as O,dt as W,Tt as _,At as a,N as b,v as c,Nt as d,It as e,ut as f,_t as g,ht as h,O as i,vt as j,I as l,h as n,gt as o,Ot as r,ft as t};
