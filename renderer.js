/*! SoftwareRenderer - ver. 0.1.0 */
OBJmodel=function(){function a(){this.verts=[],this.faces=[],this.normals=[],this.texcoords=[]}return a.parse=function(a,b){for(var c=function(b){return a[b].split(" ").splice(1,3)},d=0;d<a.length;d++)switch(a[d].substr(0,2)){case"v ":b.verts.push(new f32a(c(d)));break;case"vn":b.normals.push(new f32a(c(d)));break;case"vt":b.texcoords.push(new f32a(c(d)));break;case"f ":for(var e=c(d),f=0;3>f;f++)e[f]=e[f].split("/").map(function(a){return parseInt(a-1)});b.faces.push(e)}},a}(),Matrix=function(){function a(){}return a.identity=function(){return[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]},a.rotation=function(a){var b=a[0],c=a[1],d=a[2],e=a[3];return[[1-2*c*c-2*d*d,2*b*c+2*d*e,2*b*d-2*c*e,0],[2*b*c-2*d*e,1-2*b*b-2*d*d,2*d*c+2*b*e,0],[2*b*d+2*c*e,2*d*c-2*b*e,1-2*b*b-2*c*c,0],[0,0,0,1]]},a.projection=function(b,c,d){var e=a.identity();return e[3][2]=coeff,e},a.view=function(b,c,d){for(var e=Vec3.normalize([b[0]-c[0],b[1]-c[1],b[2]-c[2]]),f=Vec3.normalize(Vec3.cross(d,z)),d=Vec3.normalize(Vec3.cross(e,f)),g=a.identity(),h=0;3>h;h++)g[0][h]=f[h],g[1][h]=d[h],g[2][h]=e[h];return g[3][0]=-Vec3.dot(f,b),g[3][1]=-Vec3.dot(d,b),g[3][2]=-Vec3.dot(e,b),g},a}(),Quaternion=function(){function a(){}return a.fromEuler=function(a,b,c){var d,e,f,g,h,i;return g=m.sin(.5*a),d=m.cos(.5*a),h=m.sin(.5*b),e=m.cos(.5*b),i=m.sin(.5*c),f=m.cos(.5*c),[d*e*f+g*h*i,g*e*f-d*h*i,d*h*f+g*e*i,d*e*i-g*h*f]},a}(),Vec3=function(){function a(){}return a.dot=function(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]},a.cross=function(a,b){return[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]},a.reflect=function(b,c){var d=a.dot(b,c),e=[2*c[0]*d,2*c[1]*d,2*c[2]*d];return[e[0]-b[0],e[1]-b[1],e[2]-b[2]]},a.dist=function(a){for(var b=0,c=0;c<a.length;c++)b+=a[c]*a[c];return m.sqrt(b)},a.normalize=function(b){var c=1/a.dist(b);return[b[0]*c,b[1]*c,b[2]*c]},a}(),orient2d=function(a,b,c){return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])},Buffer=function(){function a(a,b,c){this.ctx=a,this.w=b,this.h=c,this.calls=0,this.pixels=0,this.imgData=a.createImageData(this.w,this.h),this.buf=new ArrayBuffer(this.imgData.data.length),this.buf8=new Uint8ClampedArray(this.buf),this.buf32=new Uint32Array(this.buf),this.zbuf=new Uint32Array(this.imgData.data.length),this.points=new Int32Array(3)}return a.prototype={clear:function(a){for(var b=0;b<=this.h;b++)for(var c=0;c<this.w;c++){var d=b*this.w+c;this.set(c,b,a),this.zbuf[d]=0}},set:function(a,b,c){var d=255&c[0]|(255&c[1])<<8|(255&c[2])<<16;this.buf32[b*this.w+a]=4278190080|d},get:function(a,b){return this.buf32[b*this.w+a]},indexTriangle:function(a,b,c){for(var d=[a[0][0],a[1][0],a[2][0]],e=[a[0][1],a[1][1],a[2][1]],f=[a[0][2],a[1][2],a[2][2]],g=[this.w+1,this.h+1],h=[-1,-1],i=0;i<d.length;i++)for(var j=0;2>j;j++)g[j]=m.min(d[i][j],g[j]),h[j]=m.max(d[i][j],h[j]);if(!(g[0]>this.w||h[0]<0||g[1]>this.h||h[1]<0))for(var k,l,n,o,p=new f32a(2),q=new f32a(3),r=d[0][1]-d[1][1],s=d[1][0]-d[0][0],t=d[1][1]-d[2][1],u=d[2][0]-d[1][0],v=d[2][1]-d[0][1],w=d[0][0]-d[2][0],x=d[1][1]-d[0][1],y=d[2][1]-d[1][1],z=1/(s*y-u*x),A=orient2d(d[1],d[2],g),B=orient2d(d[2],d[0],g),C=orient2d(d[0],d[1],g),D=[0,0,0],E=g[1];E<=h[1];E++){for(var F=[A,B,C],G=g[0];G<=h[0];G++){if(this.pixels++,(F[0]|F[1]|F[2])>0){q[0]=F[0]*z,q[1]=F[1]*z,q[2]=F[2]*z,o=0;for(var i=0;3>i;i++)o+=d[i][2]*q[i];var H=E*this.w+G;if(this.zbuf[H]<o){var k,l,n;p[0]=q[0]*e[0][0]+q[1]*e[1][0]+q[2]*e[2][0],p[1]=q[0]*e[0][1]+q[1]*e[1][1]+q[2]*e[2][1],k=q[0]*f[0][0]+q[1]*f[1][0]+q[2]*f[2][0],l=q[0]*f[0][1]+q[1]*f[1][1]+q[2]*f[2][1],n=q[0]*f[0][2]+q[1]*f[1][2]+q[2]*f[2][2];var I=b.fragment([p,[k,l,n],a[0][3]],D);if(!I){this.zbuf[H]=o,this.set(G,E,D),this.calls++}}}F[0]+=t,F[1]+=v,F[2]+=r}A+=u,B+=w,C+=s}},indexTrianglex4:function(a,b,c){for(var d=[a[0][0],a[1][0],a[2][0]],e=[a[0][1],a[1][1],a[2][1]],f=[a[0][2],a[1][2],a[2][2]],g=[this.w+1,this.h+1],h=[-1,-1],i=0;i<d.length;i++)for(var j=0;2>j;j++)g[j]=m.min(d[i][j],g[j]),h[j]=m.max(d[i][j],h[j]);if(!(g[0]>this.w||h[0]<0||g[1]>this.h||h[1]<0))for(var k,l=SIMD.Float32x4(d[1][1]-d[2][1],d[2][1]-d[0][1],d[0][1]-d[1][1],0),n=SIMD.Float32x4(d[2][0]-d[1][0],d[0][0]-d[2][0],d[1][0]-d[0][0],0),o=SIMD.Float32x4(d[0][2],d[1][2],d[2][2],0),p=d[1][1]-d[0][1],q=d[2][1]-d[1][1],r=1/((d[1][0]-d[0][0])*q-(d[2][0]-d[1][0])*p),s=SIMD.Float32x4(orient2d(d[1],d[2],g),orient2d(d[2],d[0],g),orient2d(d[0],d[1],g),0),t=(splat(0),splat(r)),u=[0,0,0],v=SIMD.Float32x4(e[0][0],e[1][0],e[2][0],0),w=SIMD.Float32x4(e[0][1],e[1][1],e[2][1],0),x=SIMD.Float32x4(f[0][0],f[1][0],f[2][0],0),y=SIMD.Float32x4(f[0][1],f[1][1],f[2][1],0),z=SIMD.Float32x4(f[0][2],f[1][2],f[2][2],0),A=g[1];A<=h[1];A++){for(var B=s,C=g[0];C<=h[0];C++){if(store(c,4,B),this.pixels++,(c[4]|c[5]|c[6])>0){var D=mul(B,t);store(c,0,D),store(c,16,mul(o,D)),k=0;for(var i=0;3>i;i++)k+=c[16+i];var E=A*this.w+C;if(this.zbuf[E]<k){store(c,20,mul(v,D)),store(c,24,mul(w,D)),store(c,28,mul(x,D)),store(c,32,mul(y,D)),store(c,36,mul(z,D));var F=SIMD.Float32x4(c[20],c[24],c[28],c[32]),G=SIMD.Float32x4(c[21],c[25],c[29],c[33]),H=SIMD.Float32x4(c[22],c[26],c[30],c[34]),I=SIMD.Float32x4(c[35],0,0,0),J=SIMD.Float32x4(c[36],0,0,0),K=SIMD.Float32x4(c[37],0,0,0);H=add(add(F,G),H),K=add(add(I,J),K),store(c,20,H),store(c,24,K);var L=b.fragment([[c[20],c[21]],[c[22],c[23],c[24]],a[0][3]],u);if(!L){this.zbuf[E]=k,this.set(C,A,u),this.calls++}}}B=add(B,l)}s=add(s,n)}},draw:function(){this.imgData.data.set(this.buf8),this.ctx.putImageData(this.imgData,0,0)}},a}(),Effect=function(){function a(){}return a.prototype={vertex:function(a){},fragment:function(a,b){},setParameters:function(a){var b=this;Object.keys(a).map(function(c){b[c]=a[c]})}},a}(),Texture=function(){function a(a,b,c){this.texData=b,this.buf32=c,this.source=a,this.sample=function(a,b){this.texData.data;const c=m.round(b[0]*this.texData.width),d=m.round(b[1]*this.texData.height);return i=(this.texData.height-d)*this.texData.width+c,smp=this.buf32[i],[255&smp,smp>>8&255,smp>>16&255,smp>>24&255]}}return a.load=function(b){texCanvas=document.createElement("canvas"),ctx=texCanvas.getContext("2d"),texCanvas.width=b.width,texCanvas.height=b.height,ctx.drawImage(b,0,0),b.style.display="none";for(var c=ctx.getImageData(0,0,b.width,b.height),d=new ArrayBuffer(c.data.length),e=new Uint32Array(d),f=0;f<e.length;f++){var g=c.data,h=f<<2;e[f]=g[h]|g[h+1]<<8|g[h+2]<<16|g[h+3]<<24}return new a(b.src,c,e)},a}(),ContentManager=function(){function a(){}function b(a){return new Promise(function(b,c){var d=new XMLHttpRequest;d.open("GET",a,!0),d.onload=function(){200==d.status?b(d.response):c(Error(d.statusText))},d.onerror=c,d.send(null)})}function c(a){}function d(){i++,i==j&&h(k)}function e(a,e){j++;var f=function(a){if(null!=e){var b=new OBJmodel,c=a.split("\n");OBJmodel.parse(c,b),k[e]=b,d()}};return b(a).then(f,c)}function f(a,e){j++;var f=function(b){if(null!=e){var c=new Image;c.src=a,c.onload=function(){var a=Texture.load(c);k[e]=a,d()}}};return b(a).then(f,c)}function g(a,b){j++;var c=document.createElement("script");c.src=a,c.onload=function(){null!=b&&b(),d()},document.head.appendChild(c)}var h,i=0,j=0,k={};return a.prototype={load:function(a){return function(b,c){switch(c="undefined"!=typeof c?c:null,a){case"Model":return e(b,c);case"Texture":return f(b,c);case"Effect":return g(b,c)}}},contentCollection:function(){return k},finishedLoading:function(a){h=a}},a}(),function(){m=Math,doc=document,f32a=Float32Array,f64a=Float64Array,simdSupported="undefined"!=typeof SIMD,Renderer=function(){function a(){}var b,c,d,e=m.PI;return simdSupported&&(add=SIMD.Float32x4.add,mul=SIMD.Float32x4.mul,splat=SIMD.Float32x4.splat,store=SIMD.Float32x4.store,tbuf=new f32a(48),doc.getElementById("top_info").insertAdjacentHTML("beforeend",'<span class="midblue">&nbsp;SIMD optimized!</span>')),drawImage=function(){b.clear([0,0,0]),start=new Date;var a=1;c.setParameters({r:e});for(var f=0;f<d.faces.length;f++){for(var g=[],h=d.faces[f],i=0;3>i;i++){var j=d.verts[h[i][0]],k=d.texcoords.length>0?d.texcoords[h[i][1]]:[0,0],l=d.normals.length>0?d.normals[h[i][2]]:[1,0,0],n=[j,k,l],o=c.vertex(n);g.push(o)}simdSupported?b.indexTrianglex4(g,c,tbuf):b.indexTriangle(g,c,a++)}b.draw(),e+=m.max(.001*((new Date).getTime()-start.getTime()),1/60);var p="Frame took "+((new Date).getTime()-start.getTime())+" ms",q="Pixels drawn/found "+b.calls+"/"+b.pixels;doc.getElementById("info").innerHTML=p+"<br/>"+q,b.calls=0,b.pixels=0,requestAnimationFrame(function(){drawImage()})},a.prototype={ready:function(a){return function(e){d=e.model,c=new DefaultEffect;var f=e.model_diff,g=e.model_nrm,h=a.getContext("2d"),i=doc.getElementById("render_start");b=new Buffer(h,a.width,a.height),c.setParameters({scr_w:b.w,scr_h:b.h,texture:f,texture_nrm:g}),i.style.display="block",i.onclick=function(){startProfile=new Date,drawImage()}}}},a}()}();