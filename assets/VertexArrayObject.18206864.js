import{s as V,t as g,A as l,o as x,F as w,C as O,r as U,i as $,a as Y,b as tt,c as H,u as d,U as c,B as R,P as E,f as m,V as f,G as v,d as j,e as F,M as b,Y as M,L as Q,D as Z,g as et}from"./index.b82fad90.js";import{s as y,u as D,a as k,c as it}from"./Texture.6046e9e1.js";const T=V.getLogger("esri.views.webgl.BufferObject");function st(n){return tt(n)}class S{constructor(t,e,i,s){this._context=t,this.bufferType=e,this.usage=i,this._glName=null,this._size=-1,this._indexType=void 0,t.instanceCounter.increment(g.BufferObject,this),this._glName=this._context.gl.createBuffer(),y(this._context.gl),s&&this.setData(s)}static createIndex(t,e,i){return new S(t,l.ELEMENT_ARRAY_BUFFER,e,i)}static createVertex(t,e,i){return new S(t,l.ARRAY_BUFFER,e,i)}static createUniform(t,e,i){if(t.type!==x.WEBGL2)throw new Error("Uniform buffers are supported in WebGL2 only!");return new S(t,l.UNIFORM_BUFFER,e,i)}static createPixelPack(t,e=w.STREAM_READ,i){if(t.type!==x.WEBGL2)throw new Error("Pixel pack buffers are supported in WebGL2 only!");const s=new S(t,l.PIXEL_PACK_BUFFER,e);return i&&s.setSize(i),s}static createPixelUnpack(t,e=w.STREAM_DRAW,i){if(t.type!==x.WEBGL2)throw new Error("Pixel unpack buffers are supported in WebGL2 only!");return new S(t,l.PIXEL_UNPACK_BUFFER,e,i)}get glName(){return this._glName}get size(){return this._size}get indexType(){return this._indexType}get byteSize(){return this.bufferType===l.ELEMENT_ARRAY_BUFFER?this._indexType===O.UNSIGNED_INT?4*this._size:2*this._size:this._size}get _isVAOAware(){return this.bufferType===l.ELEMENT_ARRAY_BUFFER||this.bufferType===l.ARRAY_BUFFER}dispose(){var t;(t=this._context)!=null&&t.gl?(this._glName&&(this._context.gl.deleteBuffer(this._glName),this._glName=null),this._context.instanceCounter.decrement(g.BufferObject,this),this._context=null):this._glName&&T.warn("Leaked WebGL buffer object")}setSize(t,e=null){if(t<=0&&T.error("Buffer size needs to be positive!"),this.bufferType===l.ELEMENT_ARRAY_BUFFER&&U(e))switch(this._indexType=e,e){case O.UNSIGNED_SHORT:t*=2;break;case O.UNSIGNED_INT:t*=4}this._setBufferData(t)}setData(t){if(!t)return;let e=t.byteLength;this.bufferType===l.ELEMENT_ARRAY_BUFFER&&($(t)&&(e/=2,this._indexType=O.UNSIGNED_SHORT),Y(t)&&(e/=4,this._indexType=O.UNSIGNED_INT)),this._setBufferData(e,t)}_setBufferData(t,e=null){this._size=t;const i=this._context.getBoundVAO();this._isVAOAware&&this._context.bindVAO(null),this._context.bindBuffer(this);const s=this._context.gl;U(e)?s.bufferData(this.bufferType,e,this.usage):s.bufferData(this.bufferType,t,this.usage),y(s),this._isVAOAware&&this._context.bindVAO(i)}setSubData(t,e=0,i=0,s=t.byteLength){if(!t)return;(e<0||e>=this._size)&&T.error("offset is out of range!");let h=e,a=i,r=s,o=t.byteLength;this.bufferType===l.ELEMENT_ARRAY_BUFFER&&($(t)?(o/=2,h*=2,a*=2,r*=2):Y(t)&&(o/=4,h*=4,a*=4,r*=4)),s===void 0&&(s=o-1),i>=s&&T.error("end must be bigger than start!"),e+i-s>this._size&&T.error("An attempt to write beyond the end of the buffer!");const u=this._context.getBoundVAO();this._isVAOAware&&this._context.bindVAO(null),this._context.bindBuffer(this);const _=this._context.gl,N=ArrayBuffer.isView(t)?t.buffer:t,L=a===0&&r===t.byteLength?N:N.slice(a,r);_.bufferSubData(this.bufferType,h,L),y(_),this._isVAOAware&&this._context.bindVAO(u)}setSubDataFromView(t,e,i,s){if(!t)return;(e<0||e>=this._size)&&T.error("offset is out of range!"),i>=s&&T.error("end must be bigger than start!"),e+i-s>this._size&&T.error("An attempt to write beyond the end of the buffer!");const h=this._context.getBoundVAO();this._isVAOAware&&this._context.bindVAO(null),this._context.bindBuffer(this);const a=this._context.gl;if(this._context.type===x.WEBGL2)a.bufferSubData(this.bufferType,e*t.BYTES_PER_ELEMENT,t,i,s-i);else{const r=i===0&&s===t.length?t:t.subarray(i,s);a.bufferSubData(this.bufferType,e*t.BYTES_PER_ELEMENT,r)}y(a),this._isVAOAware&&this._context.bindVAO(h)}getSubData(t,e=0,i,s){if(this._context.type!==x.WEBGL2)return void T.error("Get buffer subdata is supported in WebGL2 only!");if(i<0||s<0)return void T.error("Problem getting subdata: offset and length were less than zero!");const h=st(t)?t.BYTES_PER_ELEMENT:1;if(h*((i!=null?i:0)+(s!=null?s:0))>t.byteLength)return void T.error("Problem getting subdata: offset and length exceeded destination size!");e+h*(s!=null?s:0)>this.byteSize&&T.warn("Potential problem getting subdata: requested data exceeds buffer size!");const a=this._context.gl;this._context.bindBuffer(this,l.COPY_READ_BUFFER),a.getBufferSubData(l.COPY_READ_BUFFER,e,t,i,s),this._context.unbindBuffer(l.COPY_READ_BUFFER)}async getSubDataAsync(t,e=0,i,s){this._context.type===x.WEBGL2?(await this._context.clientWaitAsync(),this.getSubData(t,e,i,s)):T.error("Get buffer subdata is supported in WebGL2 only!")}}class P{constructor(t,e){this._context=t,this._desc=e,this.type="renderbuffer",this._context.instanceCounter.increment(g.Renderbuffer,this);const i=this._context.gl;this.glName=i.createRenderbuffer(),this._context.bindRenderbuffer(this);const{width:s,height:h,internalFormat:a,multisampled:r}=e;if(r){if(this._context.type!==x.WEBGL2)throw new Error("Multisampled renderbuffers are not supported in WebGL1!");i.renderbufferStorageMultisample(i.RENDERBUFFER,this.samples,a,s,h)}else i.renderbufferStorage(i.RENDERBUFFER,a,s,h)}get descriptor(){return this._desc}get samples(){const t=this._desc.samples,e=this._context.parameters.maxSamples;return t?Math.min(t,e):e}resize(t,e){const i=this._desc;if(i.width===t&&i.height===e)return;i.width=t,i.height=e;const s=this._context.gl;this._context.bindRenderbuffer(this),i.multisampled?s.renderbufferStorageMultisample(s.RENDERBUFFER,this.samples,i.internalFormat,i.width,i.height):s.renderbufferStorage(s.RENDERBUFFER,i.internalFormat,i.width,i.height)}dispose(){this._context&&(this._context.gl.deleteRenderbuffer(this.glName),this._context.instanceCounter.decrement(g.Renderbuffer,this),this._context=null)}}function ft(n){const t=n.gl;switch(t.getError()){case t.NO_ERROR:return null;case t.INVALID_ENUM:return"An unacceptable value has been specified for an enumerated argument";case t.INVALID_VALUE:return"A numeric argument is out of range";case t.INVALID_OPERATION:return"The specified command is not allowed for the current state";case t.INVALID_FRAMEBUFFER_OPERATION:return"The currently bound framebuffer is not framebuffer complete";case t.OUT_OF_MEMORY:return"Not enough memory is left to execute the command";case t.CONTEXT_LOST_WEBGL:return"WebGL context is lost"}return"Unknown error"}function lt(n,t){return n.vertexBuffers[t].size/rt(n.layout[t])}function rt(n){return n[0].stride}function nt(n,t,e,i,s=0){const h=n.gl,a=n.capabilities.instancing;n.bindBuffer(e);for(const r of i){const o=t.get(r.name);o===void 0&&console.error(`There is no location for vertex attribute '${r.name}' defined.`);const u=s*r.stride;if(r.count<=4)h.vertexAttribPointer(o,r.count,r.type,r.normalized,r.stride,r.offset+u),h.enableVertexAttribArray(o),r.divisor>0&&a&&a.vertexAttribDivisor(o,r.divisor);else if(r.count===9)for(let _=0;_<3;_++)h.vertexAttribPointer(o+_,3,r.type,r.normalized,r.stride,r.offset+12*_+u),h.enableVertexAttribArray(o+_),r.divisor>0&&a&&a.vertexAttribDivisor(o+_,r.divisor);else if(r.count===16)for(let _=0;_<4;_++)h.vertexAttribPointer(o+_,4,r.type,r.normalized,r.stride,r.offset+16*_+u),h.enableVertexAttribArray(o+_),r.divisor>0&&a&&a.vertexAttribDivisor(o+_,r.divisor);else console.error("Unsupported vertex attribute element count: "+r.count)}}function at(n,t,e,i){const s=n.gl,h=n.capabilities.instancing;n.bindBuffer(e);for(const a of i){const r=t.get(a.name);if(a.count<=4)s.disableVertexAttribArray(r),a.divisor&&a.divisor>0&&h&&h.vertexAttribDivisor(r,0);else if(a.count===9)for(let o=0;o<3;o++)s.disableVertexAttribArray(r+o),a.divisor&&a.divisor>0&&h&&h.vertexAttribDivisor(r+o,0);else if(a.count===16)for(let o=0;o<4;o++)s.disableVertexAttribArray(r+o),a.divisor&&a.divisor>0&&h&&h.vertexAttribDivisor(r+o,0);else console.error("Unsupported vertex attribute element count: "+a.count)}n.unbindBuffer(l.ARRAY_BUFFER)}function ht(n){switch(n){case E.ALPHA:case E.LUMINANCE:case E.RED:case E.RED_INTEGER:case c.R8:case c.R8I:case c.R8UI:case c.R8_SNORM:case R.STENCIL_INDEX8:return 1;case E.LUMINANCE_ALPHA:case E.RG:case E.RG_INTEGER:case c.RGBA4:case c.R16F:case c.R16I:case c.R16UI:case c.RG8:case c.RG8I:case c.RG8UI:case c.RG8_SNORM:case c.RGB565:case c.RGB5_A1:case R.DEPTH_COMPONENT16:return 2;case E.DEPTH_COMPONENT:case E.RGB:case E.RGB_INTEGER:case c.RGB8:case c.RGB8I:case c.RGB8UI:case c.RGB8_SNORM:case c.SRGB8:case R.DEPTH_COMPONENT24:return 3;case E.DEPTH_STENCIL:case E.RGBA:case E.RGBA_INTEGER:case c.RGBA8:case c.R32F:case c.R11F_G11F_B10F:case c.RG16F:case c.R32I:case c.R32UI:case c.RG16I:case c.RG16UI:case c.RGBA8I:case c.RGBA8UI:case c.RGBA8_SNORM:case c.SRGB8_ALPHA8:case c.RGB9_E5:case c.RGB10_A2UI:case c.RGB10_A2:case R.DEPTH_STENCIL:case R.DEPTH_COMPONENT32F:case R.DEPTH24_STENCIL8:return 4;case R.DEPTH32F_STENCIL8:return 5;case c.RGB16F:case c.RGB16I:case c.RGB16UI:return 6;case c.RG32F:case c.RG32I:case c.RG32UI:case c.RGBA16F:case c.RGBA16I:case c.RGBA16UI:return 8;case c.RGB32F:case c.RGB32I:case c.RGB32UI:return 12;case c.RGBA32F:case c.RGBA32I:case c.RGBA32UI:return 16;case d.COMPRESSED_RGB_S3TC_DXT1_EXT:case d.COMPRESSED_RGBA_S3TC_DXT1_EXT:return .5;case d.COMPRESSED_RGBA_S3TC_DXT3_EXT:case d.COMPRESSED_RGBA_S3TC_DXT5_EXT:return 1;case d.COMPRESSED_R11_EAC:case d.COMPRESSED_SIGNED_R11_EAC:case d.COMPRESSED_RGB8_ETC2:case d.COMPRESSED_SRGB8_ETC2:case d.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2:case d.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2:return .5;case d.COMPRESSED_RG11_EAC:case d.COMPRESSED_SIGNED_RG11_EAC:case d.COMPRESSED_RGBA8_ETC2_EAC:case d.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:return 1}return 0}function z(n){if(H(n))return 0;if("descriptor"in n)return n.glName?z(n.descriptor):0;const t=n.internalFormat||"pixelFormat"in n&&n.pixelFormat;if(!t)return 0;const e="hasMipmap"in n&&n.hasMipmap?1.3:1,i=n.width*n.height;return ht(t)*i*e}const ct=V.getLogger("esri.views.webgl.FrameBufferObject");class C{constructor(t,e,i=null,s=null){var h;if(this._context=t,this._glName=null,this._depthAttachment=null,this._stencilAttachment=null,this._colorAttachments=new Map,this._initialized=!1,this._desc={...e},t.instanceCounter.increment(g.FramebufferObject,this),U(i)){Array.isArray(i)||(i=[i]);for(let a=0;a<i.length;++a){const r=i[a],o=m.COLOR_ATTACHMENT0+a;let u;q(r)?(p(r)?(u=r.descriptor,this._colorAttachments.set(o,r)):(u=r,this._colorAttachments.set(o,new D(this._context,u))),G(u,this._desc)):(K(r)?(u=r.descriptor,this._colorAttachments.set(o,r)):(u=r,this._colorAttachments.set(o,new P(this._context,u))),I(u,this._desc)),this._validateColorAttachmentPoint(o)}}if(U(s)){let a,r;if(q(s))this._context.capabilities.depthTexture||console.error("Setting the depth/stencil texture as an attachment requires WEBGL_depth_texture or WebGL2"),p(s)?(r=s.descriptor,this._depthStencilTexture=s):(r=s,this._depthStencilTexture=new D(this._context,r)),G(r,this._desc);else{K(s)?(r=s.descriptor,a=s):(r=s,a=new P(this._context,r));const o=(h=this._desc.depthStencilTarget)!=null?h:f.DEPTH_STENCIL_RENDER_BUFFER;o===f.STENCIL_RENDER_BUFFER?this._stencilAttachment=a:o===f.DEPTH_RENDER_BUFFER||o===f.DEPTH_STENCIL_RENDER_BUFFER?this._depthAttachment=a:console.error('If a Renderbuffer is provided, "depthStencilTarget" must be one of STENCIL_RENDER_BUFFER, DEPTH_RENDER_BUFFER or DEPTH_STENCIL_RENDER_BUFFER'),I(r,this._desc)}}}dispose(){if(!this._desc)return;const t=this._context.getBoundFramebufferObject();this._disposeColorAttachments(),this._disposeDepthStencilAttachments(),this._glName&&(this._context.gl.deleteFramebuffer(this._glName),this._glName=null),this._context.bindFramebuffer(t),this._context.instanceCounter.decrement(g.FramebufferObject,this),this._desc=null}get glName(){return this._glName}get descriptor(){return this._desc}get colorTexture(){const t=this._colorAttachments.get(m.COLOR_ATTACHMENT0);return t&&p(t)?t:null}get colorAttachment(){return this._colorAttachments.get(m.COLOR_ATTACHMENT0)}get depthStencilAttachment(){return this._depthStencilTexture||this._depthAttachment||this._stencilAttachment}get depthStencilTexture(){return this._depthStencilTexture}get width(){return this._desc.width}get height(){return this._desc.height}get gpuMemoryUsage(){return[...this._colorAttachments].reduce((t,[e,i])=>t+z(i),0)+z(this.depthStencilAttachment)}getColorTexture(t){const e=this._colorAttachments.get(t);return e&&p(e)?e:null}attachColorTexture(t,e=m.COLOR_ATTACHMENT0){!t||(this._validateColorAttachmentPoint(e),G(t.descriptor,this._desc),this._disposeColorAttachments(),this._initialized&&(this._context.bindFramebuffer(this),this._framebufferTexture2D(t.glName,e)),this._colorAttachments.set(e,t))}detachColorTexture(t=m.COLOR_ATTACHMENT0){const e=this._colorAttachments.get(t);if(p(e)){const i=e;return this._initialized&&(this._context.bindFramebuffer(this),this._framebufferTexture2D(null,t)),this._colorAttachments.delete(t),i}}setColorTextureTarget(t,e=m.COLOR_ATTACHMENT0){const i=this._colorAttachments.get(e);p(i)&&this._framebufferTexture2D(i.glName,e,t)}attachDepthStencilTexture(t){if(H(t))return;const e=t.descriptor;e.pixelFormat!==E.DEPTH_STENCIL&&console.error("Depth/Stencil texture must have a pixel type of DEPTH_STENCIL!"),e.dataType!==v.UNSIGNED_INT_24_8&&console.error("Depth/Stencil texture must have data type of UNSIGNED_INT_24_8!"),this._context.capabilities.depthTexture||console.error("Extension WEBGL_depth_texture isn't supported therefore it is no possible to set the depth/stencil texture!"),G(e,this._desc),this._desc.depthStencilTarget&&this._desc.depthStencilTarget!==f.DEPTH_STENCIL_TEXTURE&&(this._desc.depthStencilTarget=f.DEPTH_STENCIL_TEXTURE),this._disposeDepthStencilAttachments(),this._initialized&&(this._context.bindFramebuffer(this),this._framebufferTexture2D(t.glName,j)),this._depthStencilTexture=t}detachDepthStencilTexture(){const t=this._depthStencilTexture;return t&&this._initialized&&(this._context.bindFramebuffer(this),this._framebufferTexture2D(null,j)),this._depthStencilTexture=null,t}attachDepthStencilBuffer(t){if(H(t))return;const e=t.descriptor;if(e.internalFormat!==R.DEPTH_STENCIL&&e.internalFormat!==R.DEPTH_COMPONENT16&&console.error("Depth/Stencil buffer must have correct internalFormat"),I(e,this._desc),this._disposeDepthStencilAttachments(),this._desc.depthStencilTarget=e.internalFormat===R.DEPTH_STENCIL?f.DEPTH_STENCIL_RENDER_BUFFER:f.DEPTH_RENDER_BUFFER,this._initialized){this._context.bindFramebuffer(this);const i=this._context.gl,s=this._desc.depthStencilTarget===f.DEPTH_RENDER_BUFFER?i.DEPTH_ATTACHMENT:i.DEPTH_STENCIL_ATTACHMENT;i.framebufferRenderbuffer(F.FRAMEBUFFER,s,i.RENDERBUFFER,t.glName)}this._depthAttachment=t}detachDepthStencilBuffer(){const t=this._context.gl,e=this._depthAttachment;if(e&&this._initialized){this._context.bindFramebuffer(this);const i=this._desc.depthStencilTarget===f.DEPTH_RENDER_BUFFER?t.DEPTH_ATTACHMENT:t.DEPTH_STENCIL_ATTACHMENT;t.framebufferRenderbuffer(F.FRAMEBUFFER,i,t.RENDERBUFFER,null)}return this._depthAttachment=null,e}detachAll(){this._colorAttachments.forEach((t,e)=>this._detachColorAttachment(e)),this.detachDepthStencilBuffer(),this.detachDepthStencilTexture()}copyToTexture(t,e,i,s,h,a,r){(t<0||e<0||h<0||a<0)&&console.error("Offsets cannot be negative!"),(i<=0||s<=0)&&console.error("Copy width and height must be greater than zero!");const o=this._desc,u=r.descriptor;r.descriptor.target!==b.TEXTURE_2D&&console.error("Texture target must be TEXTURE_2D!"),(t+i>o.width||e+s>o.height||h+i>u.width||a+s>u.height)&&console.error("Bad dimensions, the current input values will attempt to read or copy out of bounds!");const _=this._context,N=_.bindTexture(r,D.TEXTURE_UNIT_FOR_UPDATES);_.setActiveTexture(D.TEXTURE_UNIT_FOR_UPDATES),_.bindFramebuffer(this),_.gl.copyTexSubImage2D(b.TEXTURE_2D,0,h,a,t,e,i,s),_.bindTexture(N,D.TEXTURE_UNIT_FOR_UPDATES)}readPixels(t,e,i,s,h,a,r){(i<=0||s<=0)&&console.error("Copy width and height must be greater than zero!"),r||console.error("Target memory is not initialized!"),this._context.bindFramebuffer(this),this._context.gl.readPixels(t,e,i,s,h,a,r)}async readPixelsAsync(t,e,i,s,h,a,r){if(this._context.type!==x.WEBGL2)return k()&&console.warn("Attempting to read pixels using pixel buffer object without WebGL2"),void this.readPixels(t,e,i,s,h,a,r);const o=this._context.gl,u=S.createPixelPack(this._context,w.STREAM_READ,r.byteLength);this._context.bindBuffer(u),this._context.bindFramebuffer(this),o.readPixels(t,e,i,s,h,a,0),this._context.unbindBuffer(l.PIXEL_PACK_BUFFER),await u.getSubDataAsync(r),u.dispose()}resize(t,e){const i=this._desc;if(i.width!==t||i.height!==e){if(!this._initialized)return i.width=t,i.height=e,this._colorAttachments.forEach(s=>{s&&s.resize(t,e)}),void(this._depthStencilTexture&&this._depthStencilTexture.resize(t,e));i.width=t,i.height=e,this._colorAttachments.forEach(s=>{s&&s.resize(t,e)}),this._depthStencilTexture!=null?this._depthStencilTexture.resize(t,e):(this._depthAttachment||this._stencilAttachment)&&(this._depthAttachment&&this._depthAttachment.resize(t,e),this._stencilAttachment&&this._stencilAttachment.resize(t,e)),this._context.getBoundFramebufferObject()===this&&this._context.bindFramebuffer(null),this._initialized=!1}}initializeAndBind(t=F.FRAMEBUFFER){var _,N,L,X;const e=this._context.gl;if(this._initialized)return void e.bindFramebuffer(t,this.glName);this._glName&&e.deleteFramebuffer(this._glName);const i=this._context,s=e.createFramebuffer(),h=this._desc,a=(_=h.colorTarget)!=null?_:M.RENDER_BUFFER,r=(N=h.width)!=null?N:1,o=(L=h.height)!=null?L:1;if(e.bindFramebuffer(t,s),this._colorAttachments.size===0)if(a===M.TEXTURE||a===M.CUBEMAP)this._colorAttachments.set(m.COLOR_ATTACHMENT0,ot(i,h,this.descriptor.colorTarget===M.CUBEMAP?b.TEXTURE_CUBE_MAP:b.TEXTURE_2D));else{const A=new P(i,{internalFormat:c.RGBA4,width:r,height:o});this._colorAttachments.set(m.COLOR_ATTACHMENT0,A)}this._colorAttachments.forEach((A,W)=>{A&&(p(A)?this._framebufferTexture2D(A.glName,W,J(A),t):e.framebufferRenderbuffer(t,W,e.RENDERBUFFER,A.glName))});const u=(X=h.depthStencilTarget)!=null?X:f.NONE;switch(u){case f.DEPTH_RENDER_BUFFER:case f.DEPTH_STENCIL_RENDER_BUFFER:{this._depthAttachment||(this._depthAttachment=new P(i,{internalFormat:h.depthStencilTarget===f.DEPTH_RENDER_BUFFER?R.DEPTH_COMPONENT16:R.DEPTH_STENCIL,width:r,height:o}));const A=u===f.DEPTH_RENDER_BUFFER?e.DEPTH_ATTACHMENT:e.DEPTH_STENCIL_ATTACHMENT;e.framebufferRenderbuffer(t,A,e.RENDERBUFFER,this._depthAttachment.glName);break}case f.STENCIL_RENDER_BUFFER:this._stencilAttachment||(this._stencilAttachment=new P(i,{internalFormat:R.STENCIL_INDEX8,width:r,height:o})),e.framebufferRenderbuffer(t,e.STENCIL_ATTACHMENT,e.RENDERBUFFER,this._stencilAttachment.glName);break;case f.DEPTH_STENCIL_TEXTURE:if(!this._depthStencilTexture){i.capabilities.depthTexture||console.error("Extension WEBGL_depth_texture isn't supported therefore it is no possible to set the depth/stencil texture as an attachment!");const A={target:b.TEXTURE_2D,pixelFormat:E.DEPTH_STENCIL,dataType:v.UNSIGNED_INT_24_8,samplingMode:Q.NEAREST,wrapMode:Z.CLAMP_TO_EDGE,width:r,height:o};this._depthStencilTexture=new D(i,A)}this._framebufferTexture2D(this._depthStencilTexture.glName,e.DEPTH_STENCIL_ATTACHMENT,J(this._depthStencilTexture),t)}it()&&e.checkFramebufferStatus(t)!==e.FRAMEBUFFER_COMPLETE&&console.error("Framebuffer is incomplete!"),this._glName=s,this._initialized=!0}_framebufferTexture2D(t,e=m.COLOR_ATTACHMENT0,i=b.TEXTURE_2D,s=F.FRAMEBUFFER,h=0){this._context.gl.framebufferTexture2D(s,e,i,t,h)}_detachColorAttachment(t){k()&&console.warn("Detaching an FBO attachment can be a slow due to invalidating framebuffer completeness!");const e=this._context.gl,i=this._colorAttachments.get(t);return p(i)?this._initialized&&(this._context.bindFramebuffer(this),this._framebufferTexture2D(null,t)):this._initialized&&(this._context.bindFramebuffer(this),e.framebufferRenderbuffer(F.FRAMEBUFFER,t,e.RENDERBUFFER,null)),this._colorAttachments.delete(t),i}_disposeColorAttachments(){this._colorAttachments.forEach((t,e)=>{this._detachColorAttachment(e),t.dispose()}),this._colorAttachments.clear()}_disposeDepthStencilAttachments(){const t=this._context.gl;if(this._depthAttachment){if(this._initialized){this._context.bindFramebuffer(this);const e=this._desc.depthStencilTarget===f.DEPTH_RENDER_BUFFER?t.DEPTH_ATTACHMENT:t.DEPTH_STENCIL_ATTACHMENT;t.framebufferRenderbuffer(F.FRAMEBUFFER,e,t.RENDERBUFFER,null)}this._depthAttachment.dispose(),this._depthAttachment=null}this._stencilAttachment&&(this._initialized&&(this._context.bindFramebuffer(this),t.framebufferRenderbuffer(F.FRAMEBUFFER,t.STENCIL_ATTACHMENT,t.RENDERBUFFER,null)),this._stencilAttachment.dispose(),this._stencilAttachment=null),this._depthStencilTexture&&(this._initialized&&(this._context.bindFramebuffer(this),this._framebufferTexture2D(null,t.DEPTH_STENCIL_ATTACHMENT)),this._depthStencilTexture.dispose(),this._depthStencilTexture=null)}_validateColorAttachmentPoint(t){if(C._MAX_COLOR_ATTACHMENTS===-1){const i=this._context.capabilities.drawBuffers;if(i){const s=this._context.gl;C._MAX_COLOR_ATTACHMENTS=s.getParameter(i.MAX_COLOR_ATTACHMENTS)}else C._MAX_COLOR_ATTACHMENTS=1}const e=t-m.COLOR_ATTACHMENT0;e+1>C._MAX_COLOR_ATTACHMENTS&&ct.error("esri.FrameBufferObject",`illegal attachment point for color attachment: ${e+1}. Implementation supports up to ${C._MAX_COLOR_ATTACHMENTS} color attachments`)}}function p(n){return"type"in n&&n.type==="texture"}function K(n){return"type"in n&&n.type==="renderbuffer"}function q(n){return p(n)||"pixelFormat"in n}function ot(n,t,e){return new D(n,{target:e,pixelFormat:E.RGBA,dataType:v.UNSIGNED_BYTE,samplingMode:Q.NEAREST,wrapMode:Z.CLAMP_TO_EDGE,width:t.width,height:t.height})}function G(n,t){n.target!==b.TEXTURE_2D&&n.target!==b.TEXTURE_CUBE_MAP&&console.error("Texture type must be TEXTURE_2D or TEXTURE_CUBE_MAP!"),t.width!==void 0&&t.width>=0&&t.height!==void 0&&t.height>=0?t.width===n.width&&t.height===n.height||console.error("Color attachment texture must match the framebuffer's!"):(t.width=n.width,t.height=n.height)}function I(n,t){t.width!==void 0&&t.width>=0&&t.height!==void 0&&t.height>=0?t.width===n.width&&t.height===n.height||console.error("Renderbuffer dimensions must match the framebuffer's!"):(t.width=n.width,t.height=n.height)}function J(n){return n.descriptor.target===b.TEXTURE_CUBE_MAP?b.TEXTURE_CUBE_MAP_POSITIVE_X:b.TEXTURE_2D}C._MAX_COLOR_ATTACHMENTS=-1;const B=V.getLogger("esri.views.webgl.VertexArrayObject");class Et{constructor(t,e,i,s,h=null){this._context=t,this._locations=e,this._layout=i,this._buffers=s,this._indexBuffer=h,this._glName=null,this._initialized=!1,t.instanceCounter.increment(g.VertexArrayObject,this)}get glName(){return this._glName}get context(){return this._context}get vertexBuffers(){return this._buffers}get indexBuffer(){return this._indexBuffer}get size(){return Object.keys(this._buffers).reduce((t,e)=>t+this._buffers[e].size,U(this._indexBuffer)?this._indexBuffer.size:0)}get layout(){return this._layout}get locations(){return this._locations}dispose(t=!0){var e,i;if(!this._context)return void((this._glName||t&&Object.getOwnPropertyNames(this._buffers).length>0)&&B.warn("Leaked WebGL VAO"));if(this._glName){const s=(i=(e=this._context)==null?void 0:e.capabilities)==null?void 0:i.vao;s?(s.deleteVertexArray(this._glName),this._glName=null):B.warn("Leaked WebGL VAO")}if(this._context.getBoundVAO()===this&&this._context.bindVAO(null),t){for(const s in this._buffers)this._buffers[s].dispose(),delete this._buffers[s];this._indexBuffer=et(this._indexBuffer)}this._context.instanceCounter.decrement(g.VertexArrayObject,this),this._context=null}initialize(){if(this._initialized)return;const t=this._context.capabilities.vao;if(t){const e=t.createVertexArray();t.bindVertexArray(e),this._bindLayout(),t.bindVertexArray(null),this._glName=e}this._initialized=!0}bind(){this.initialize();const t=this._context.capabilities.vao;t?t.bindVertexArray(this.glName):(this._context.bindVAO(null),this._bindLayout())}_bindLayout(){const{_buffers:t,_layout:e,_indexBuffer:i}=this;t||B.error("Vertex buffer dictionary is empty!");const s=this._context.gl;for(const h in t){const a=t[h];a||B.error("Vertex buffer is uninitialized!");const r=e[h];r||B.error("Vertex element descriptor is empty!"),nt(this._context,this._locations,a,r)}U(i)&&(this._context.capabilities.vao?s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,i.glName):this._context.bindBuffer(i))}unbind(){this.initialize();const t=this._context.capabilities.vao;t?t.bindVertexArray(null):this._unbindLayout()}_unbindLayout(){const{_buffers:t,_layout:e}=this;t||B.error("Vertex buffer dictionary is empty!");for(const i in t){const s=t[i];s||B.error("Vertex buffer is uninitialized!");const h=e[i];at(this._context,this._locations,s,h)}U(this._indexBuffer)&&this._context.unbindBuffer(this._indexBuffer.bufferType)}}export{C as D,ht as _,S as c,Et as f,ft as i,lt as n,P as r};
