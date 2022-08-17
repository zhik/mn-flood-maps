import{r as W,aQ as F}from"./index.b82fad90.js";import{F as L,v as P,t as Q}from"./rasterProjectionHelper.89a91399.js";class q{constructor(n=15e3,e=5e3){this._timer=null,this._cachedBlocks=new Map,this._size=-1,this._duration=n,this._interval=Math.min(n,e)}decreaseRefCount(n,e){const t=n+"/"+e,l=this._cachedBlocks;if(l.has(t)){const r=l.get(t);return r.refCount--,r.refCount<=0&&(l.delete(t),r.controller&&r.controller.abort()),r.refCount}return 0}getBlock(n,e){const t=n+"/"+e,l=this._cachedBlocks;if(l.has(t)){const r=l.get(t);return r.ts=Date.now(),r.refCount++,l.delete(t),l.set(t,r),r.block}return null}putBlock(n,e,t,l=null){const r=this._cachedBlocks,c=n+"/"+e;if(r.has(c)){const u=r.get(c);u.ts=Date.now(),u.refCount++}else r.set(c,{block:t,ts:Date.now(),refCount:1,controller:l});this._trim(),this._updateTimer()}deleteBlock(n,e){const t=this._cachedBlocks,l=n+"/"+e;t.has(l)&&t.delete(l)}updateMaxSize(n){this._size=n,this._trim()}empty(){this._cachedBlocks.clear(),this._clearTimer()}getCurrentSize(){return this._cachedBlocks.size}_updateTimer(){if(this._timer!=null)return;const n=this._cachedBlocks;this._timer=setInterval(()=>{const e=Array.from(n),t=Date.now();for(let l=0;l<e.length&&e[l][1].ts<=t-this._duration;l++)n.delete(e[l][0]);n.size===0&&this._clearTimer()},this._interval)}_trim(){const n=this._cachedBlocks;if(this._size===-1||this._size>=n.size)return;const e=Array.from(n);for(let t=0;t<e.length-this._size;t++)n.delete(e[t][0])}_clearTimer(){this._timer!=null&&(clearInterval(this._timer),this._timer=null)}}const s=new Map,h=new q;function N(o,n){return n==null?o:`${o}?sliceId=${n}`}function O(o,n){const e={extent:null,rasterInfo:n,cache:new Map};if(s.has(o)){const t=s.get(o);return t.push(e),t.length-1}return s.set(o,[e]),0}function U(o,n){if(s.has(o)){const e=s.get(o);e[n]=null,e.some(t=>t!=null)||s.delete(o)}}function V(o,n,e){if(!s.has(o))return n==null?h.decreaseRefCount(o,e):0;const t=s.get(o);if(t[n]==null)return h.decreaseRefCount(o,e);const l=t[n].cache;if(l.has(e)){const r=l.get(e);if(r.refCount--,r.refCount===0){l.delete(e);for(let c=0;c<t.length;c++)t[c]&&t[c].cache.has(e)&&t[c].cache.delete(e);r.controller&&r.controller.abort()}return r.refCount}return 0}function X(o,n,e){if(!s.has(o))return n==null?h.getBlock(o,e):null;const t=s.get(o);if(t[n]==null){for(let r=0;r<t.length;r++)if(t[r]&&t[r].cache.has(e)){const c=t[r].cache.get(e);return c.refCount++,c.block}return h.getBlock(o,e)}const l=t[n].cache;if(l.has(e)){const r=l.get(e);return r.refCount++,r.block}for(let r=0;r<t.length;r++)if(r!==n&&t[r]&&t[r]&&t[r].cache.has(e)){const c=t[r].cache.get(e);return c.refCount++,l.set(e,c),c.block}return null}function Y(o,n,e,t,l=null){if(!s.has(o))return void(n==null&&h.putBlock(o,e,t,l));const r=s.get(o);if(r[n]==null)return void h.putBlock(o,e,t,l);const c={refCount:1,block:t,isResolved:!1,isRejected:!1,controller:l};t.then(()=>c.isResolved=!0).catch(()=>c.isRejected=!0),r[n].cache.set(e,c)}function Z(o,n,e){if(!s.has(o))return void(n==null&&h.deleteBlock(o,e));const t=s.get(o);t[n]!=null?t[n].cache.delete(e):h.deleteBlock(o,e)}function G(o,n){if(!s.has(o))return null;const e=s.get(o);return e[n]==null?null:e[n]}function ee(o,n,e,t,l,r,c=null){const u=G(o,n),f=u.extent,{cache:k,rasterInfo:y}=u;if(f&&f.xmin===e.xmin&&f.xmax===e.xmax&&f.ymin===e.ymin&&f.ymax===e.ymax)return;const M=e.clone().normalize(),{spatialReference:v,transform:R}=y,b=new Set;for(let d=0;d<M.length;d++){const a=M[d];if(a.xmax-a.xmin<=t||a.ymax-a.ymin<=t)continue;let i=L(a,v,c);W(R)&&(i=R.inverseTransform(i));const I=new F({x:t,y:t,spatialReference:a.spatialReference});if(l==null&&!(l=P(I,v,a,c)))return;const{pyramidLevel:p,pyramidResolution:x,excessiveReading:T}=Q(l,y,r||"closest");if(T)return;const{storageInfo:m}=y,{origin:w}=m,g={x:Math.max(0,Math.floor((i.xmin-w.x)/x.x)),y:Math.max(0,Math.floor((w.y-i.ymax)/x.y))},j=Math.ceil((i.xmax-i.xmin)/x.x-.1),D=Math.ceil((i.ymax-i.ymin)/x.y-.1),z=p>0?m.pyramidBlockWidth:m.blockWidth,$=p>0?m.pyramidBlockHeight:m.blockHeight,_=1,H=Math.max(0,Math.floor(g.x/z)-_),S=Math.max(0,Math.floor(g.y/$)-_),A=Math.floor((g.x+j-1)/z)+_,E=Math.floor((g.y+D-1)/$)+_;for(let B=S;B<=E;B++)for(let C=H;C<=A;C++)b.add(`${p}/${B}/${C}`)}k.forEach((d,a)=>{if(!b.has(a)){const i=k.get(a);(i==null||i.isResolved||i.isRejected)&&k.delete(a)}}),u.extent={xmin:e.xmin,ymin:e.ymin,xmax:e.xmax,ymax:e.ymax}}export{Z as d,ee as g,V as h,N as i,X as m,O as s,U as u,Y as x};
