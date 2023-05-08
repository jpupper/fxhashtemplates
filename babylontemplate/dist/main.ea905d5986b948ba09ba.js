(()=>{var e,t={856:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.app=t.SampleMaterial=void 0;const o=n(4730),a=n(7947),r=n(890),i=n(4392),s=n(8782);a.Effect.ShadersStore.sampleVertexShader=i,a.Effect.ShadersStore.sampleFragmentShader=s;class l extends o.ShaderMaterial{constructor(e,t){super(e,t,{vertex:"sample",fragment:"sample"},{uniforms:["worldViewProjection","time","c1","c2","isPlanet","rt1","rt2","rt3"],attributes:["position","normal","uv"],needAlphaBlending:!0});const n=Date.now();t.registerBeforeRender((()=>{const e=Date.now()-n;this.time=e/1e3}))}set time(e){new r.Color3(0,0,0),this.setFloat("time",e)}}t.SampleMaterial=l,t.app=class{constructor(e){this.variable3="Hellow world",this.variable1="something",this.variable2=1+e}}},3607:(e,t,n)=>{"use strict";const o=n(4588),a=n(661),r=n(6182),i=n(7154),s=n(559),l=n(221),f=n(4808),c=n(8593),u=n(856),d=n(2031),m=n(890);let h,v,p,g,w,b;n(2031),n(4960),n(7366);let x,y,M=[],P=0,S=!1;var C=0;const _={};let I=[],V=0;function F(e,t,n,o,a){let r=!1;for(let t=0;t<I.length;t++)f.Vector3.Distance(I[t],e)<.1&&(r=!0);if(!r){var i=new d.StandardMaterial("mat_tronco",g);O(n,0,9,1,20);let a=O(n,0,9,0,1),r=f.Color3.Lerp(x,y,O(n,0,10,0,1));r=f.Color3.Lerp(x,y,.5*Math.sin(a*Math.PI*4)+.5);let l,c=O(a,0,9,_.mins.w,_.maxs.w),u=O(a,0,9,_.mins.h,_.maxs.h),m=O(a,0,9,_.mins.d,_.maxs.d);if(i.diffuseColor=r,i.specularColor=r,i.emissiveColor=f.Color3.Lerp(new f.Color3(0,0,0),r,.2),i.alpha=1,_.isBox?l=s.MeshBuilder.CreateBox("tronco1",{height:c,width:u,depth:m},g):_.worm||(l=s.MeshBuilder.CreateSphere("sphere",{diameterX:1.2*c,diameterY:2.8*u,diameterZ:1*m},g)),l.material=i,l.position=e,l.rotation=t,M.push(l),n<10){let a=O(n,0,9,0,_.ang.y),r=O(n,0,9,0,_.ang.x),i=O(n,0,9,0,_.ang.z);r=0,a=0,i=0;let s=new f.Vector3(e.x-2.5,e.y-2,e.z),l=new f.Vector3(e.x+2.5,e.y-2,e.z);_.isInverted&&(s=new f.Vector3(e.x-2.5,e.y+2,e.z),l=new f.Vector3(e.x+2.5,e.y+2,e.z));let c=new f.Vector3(t.x+r,t.y+a,t.z+o+i),u=new f.Vector3(t.x+r,t.y+a,t.z-o+i);s.x+=5.1,l.x-=5.1,F(s,c,n+1,o),F(l,u,n+1,o)}C++,console.log(C),I.push(e)}}function L(e,t){let n=0;return n=t?fxrand()*(t-e)+e:fxrand()*(e-0)+0,n}function O(e,t,n,o,a){return(e-t)/(n-t)*(a-o)+o}function B(e,t,n){return(1-n)*e+n*t}_.grosor=L(.2,.4),_.mins={w:L(0,5),h:L(.2,.4),d:L(1,10)},_.maxs={w:L(0,50),h:L(.2,.4),d:L(_.mins.d,120)},_.ang={x:L(0,Math.PI),y:L(0,Math.PI),z:L(0,Math.PI)},_.isLerps=!0,_.isInverted=L(0,1)>.5,_.isBox=L(0,1)>.3,_.worm=L(0,1)>.94,window.$fxhashFeatures={"Min ":"Width "+_.mins.w.toFixed(2)+"||Height "+_.mins.h.toFixed(2)+"||Depth "+_.mins.d.toFixed(2),"Max ":"Width "+_.maxs.w.toFixed(2)+"||Height "+_.maxs.h.toFixed(2)+"||Depth "+_.maxs.d.toFixed(2),Inverted:_.isInverted,Box:_.isBox},function(){C=0,x=new f.Color3(L(.8,1),L(.8,1),L(.8,1)),y=new f.Color3(L(.4,1),L(.4,1),L(.4,1)),c.test(),v=document.getElementById("view"),p=new a.Engine(v,!0),g=new l.Scene(p),g.clearColor=new f.Color3(0,0,0);var e,t=new m.HDRCubeTexture("./hdrs/negro.hdr",g,128,!1,!0,!1,!0),n=new d.StandardMaterial("skyBox",g);n.backFaceCulling=!1,n.reflectionTexture=t,n.reflectionTexture.coordinatesMode=m.Texture.SKYBOX_MODE,function(){w=new o.ArcRotateCamera("camera",Math.PI/2,Math.PI/3.2,2,f.Vector3.Zero(),g),w.attachControl(v),w.wheelPrecision=10;w.setPosition(new f.Vector3(Math.PI/1.9+.8+1.5,Math.PI/1.9+.4+.8,4.18)),w.position.y=50,w.heightOffset=-120,w.radius=70.5,w.upperRadiusLimit=200,w.upperBetaLimit=Math.PI/2-.2,w.cameraAcceleration=1.00001,w.speed=150.8}(),f.Color3.White(),b=new u.SampleMaterial("material",g),function(){h=new r.HemisphericLight("light",new f.Vector3(0,0,0),g),h.diffuse=x,h.specular=y,h.intensity=.2;var e=new i.SpotLight("spotLight",new f.Vector3(0,100,0),new f.Vector3(0,-80,0),Math.PI/3,2,g);e.diffuse=x,e.range=90,e.intensity=1.6;for(let e=0;e<4;e++){let t=O(e,0,3,0,2*Math.PI);f.Color3.Lerp(x,y,t),Math.sin(t),Math.cos(t)}}(),function(e,t){let n=L(2*-Math.PI,2*Math.PI),o=new f.Vector3(e.x,e.y+25,e.z);_.isInverted=!1,_.isInverted&&(o=new f.Vector3(e.x,e.y+1.5,e.z)),F(o,t,0,n)}(new f.Vector3(0,0,0),new f.Vector3(0,0,0)),function(){new u.SampleMaterial("material",g).wireframe=!0;const e=new u.SampleMaterial("material",g);e.setFloat("r1",x.r),e.setFloat("g1",x.g),e.setFloat("b1",x.b),e.setFloat("r2",y.r),e.setFloat("g2",y.g),e.setFloat("b2",y.b),e.setFloat("isPlanet",1),e.setFloat("rt1",L(1)),e.setFloat("rt2",L(0,1)),e.setFloat("rt3",L(0,1));const t=s.MeshBuilder.CreateDisc("disc",{radius:100,tessellation:256},g);t.material=e,t.rotation=new f.Vector3(Math.PI/2,0,0),t.receiveShadows=!0}(),(e=new m.ColorCurves).globalHue=200,e.globalDensity=180,e.globalSaturation=180,e.highlightsHue=20,e.highlightsDensity=180,e.highlightsSaturation=-80,e.shadowsHue=8,e.shadowsDensity=80,e.shadowsSaturation=500,new m.GlowLayer("glow",g).intensity=L(1,1.2),function(){const e=new m.SolidParticleSystem("SPS",g,{useModelMaterial:!0}),t=s.MeshBuilder.CreateSphere("s",{diameter:.05}),n=s.MeshBuilder.CreatePolyhedron("p",{type:2},g);var o=new d.StandardMaterial("mat_tronco",g);o.diffuseColor=y,o.specularColor=y,o.emissiveColor=y,t.material=o,n.material=o,e.addShape(t,3500),t.dispose(),e.buildMesh(),e.initParticles=()=>{for(let t=0;t<e.nbParticles;t++){const n=e.particles[t];n.position.x=m.Scalar.RandomRange(-50,50),n.position.y=m.Scalar.RandomRange(-10,50),n.position.z=m.Scalar.RandomRange(-50,50);let o=new f.Color4(x.r,x.g,x.b,1),a=new f.Color4(x.r,x.g,x.b,1);n.color=f.Color4.Lerp(o,a,Math.random())}},e.initParticles(),e.setParticles()}()}(),v.addEventListener("pointerup",(function(){S=!1})),v.addEventListener("pointerdown",(function(){S=!0})),v.addEventListener("click",(function(){})),p.runRenderLoop((()=>{g.render(),P++;let e={};var t;e={alpha:.002*P+Math.PI/2,radius:10*Math.sin(.001*P)+60,beta:.2*Math.sin(.002*P)+Math.PI/4},S?V+=.5:V-=.01,V=(t=V)>1?1:t<0?0:t,w.alpha=B(w.alpha,e.alpha,1-V),w.beta=B(w.beta,e.beta,1-V);for(let e=0;e<M.length;e++)if(M[e].rotation.x=0,M[e].rotation.y,0==M[e].position.x?M[e].rotation.x+=.1:M[e].position.x<0?M[e].rotation.z+=.01:M[e].rotation.z-=.01,_.worm){let t=O(e,0,M.length-1,0,1);M[e].diameterZ=17*Math.sin(P+t*Math.PI*10)+17,M[e].diameterX=17*Math.sin(P+t*Math.PI*10)+17,M[e].diameterZ=17*Math.sin(P+t*Math.PI*10)+17}}))},8593:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.test=void 0,t.test=function(){console.log("asas")}},8782:e=>{e.exports="precision highp float;\n\n// Uniforms\nuniform float time;\n\n// Varying\nvarying vec2 uvV;\n#define PI 3.141592649\n\nuniform float r1 ; \nuniform float g1 ; \nuniform float b1 ; \n\nuniform float r2 ; \nuniform float g2 ; \nuniform float b2 ;  \n\nuniform float rt1;\nuniform float rt2;\nuniform float rt3;\n\nuniform float isPlanet ;  \n#define octaves 8\nfloat mapr(float _value,float _low2,float _high2) {\n\tfloat val = _low2 + (_high2 - _low2) * (_value - 0.) / (1.0 - 0.);\n    //float val = 0.1;\n\treturn val;\n}\n\nfloat random (in vec2 _st) {\n    return fract(sin(dot(_st.xy,\n                         vec2(12.9898,78.233)))*\n        43758.56222123);\n}\nfloat noise2 (in vec2 st,float fase) {\n    vec2 i = floor(st);\n    vec2 f = fract(st);\n    \n    float fase2 = fase;\n    // Four corners in 2D of a tile\n    float a = sin(random(i)*fase2);\n    float b =  sin(random(i + vec2(1.0, 0.0))*fase2);\n    float c =  sin(random(i + vec2(0.0, 1.0))*fase2);\n    float d =  sin(random(i + vec2(1.0, 1.0))*fase2);\n\n    // Smooth Interpolation\n\n    // Cubic Hermine Curve.  Same as SmoothStep()\n    vec2 u = f*f*(3.0-2.0*f);\n    // u = smoothstep(0.,1.,f);\n\n    // Mix 4 coorners percentages\n    return mix(a, b, u.x) +\n            (c - a)* u.y * (1.0 - u.x) +\n            (d - b) * u.x * u.y;\n}\nfloat fbm2 (in vec2 st) {\n    // Initial values\n    float value = 0.0;\n    float amplitude = 0.8;\n    float frequency = 0.;\n    vec2 shift = vec2(100);\n    \n    mat2 rot = mat2(cos(0.5), sin(0.5),\n                    -sin(0.5), cos(0.50));\n    \n    // Loop of octaves\n    for (int i = 0; i < octaves; i++) {\n        value += amplitude * noise2(st,time*0.1+120.);\n        \n    \n        st = rot * st * 2.0 + shift;\n       \n        amplitude *= .5;\n    }\n    return value;\n}\n\nmat2 rotate2d(float _angle){\n    return mat2(cos(_angle),-sin(_angle),\n                sin(_angle),cos(_angle));\n}\nvoid main(void) {\n    vec2 uv = uvV.xy;\n    vec2 p = vec2(0.5) -uv;\n    float r = 1.-length(p);\n    float rm = 20.;\n    float def = fbm2(uv*50.+vec2(fbm2(uv*15.)))*2.;\n    float e = sin(r*rm+time+def*2.)*.5+.5;\n   // e = smoothstep(0.1,0.1,e);\n    \n    \n    \n    vec3 cf = mix(vec3(r1,g1,b1),vec3(r2,g2,b2),e);\n   //   vec3 cf = mix(vec3(1.-r1,1.-g1,1.-b1),vec3(1.-r2,1.-g2,1.-b2),e);\n\n    float e2 = fbm2(uv*20.)*.5+.5;\n\n    e2 = smoothstep(0.1,0.8,e2);\n    cf*=vec3(sin(r*rm+PI/2.+time+e2)*.5+.5); \n    //vec4 fin = \n\n    if(isPlanet > 0.5){\n    \n        float f2 = smoothstep(0.2,0.4,fbm2(uv*5.+fbm2(uv*20.))*.5+.5)*.2;\n    \n    }\n\n    \n    cf*=smoothstep(0.5,0.57,r);\n    gl_FragColor = vec4(cf, (length(cf)*0.7)-0.2);\n   \n\t/*cf.rg *=rotate2d(rt1*PI*2.); \n\tcf.bg *=rotate2d(rt2*PI*2.); \n\tcf.rb *=rotate2d(rt3*PI*2.); */\n   // gl_FragColor = vec4(cf, 1.);\n   //gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n}\n"},4392:e=>{e.exports="precision highp float;\n\n// Attributes\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\n\n// Uniforms\nuniform mat4 worldViewProjection;\nuniform float time;\n// Varying\nvarying vec2 uvV;\n\n\n#define octaves 8\nfloat mapr(float _value,float _low2,float _high2) {\n\tfloat val = _low2 + (_high2 - _low2) * (_value - 0.) / (1.0 - 0.);\n    //float val = 0.1;\n\treturn val;\n}\n\nfloat random (in vec2 _st) {\n    return fract(sin(dot(_st.xy,\n                         vec2(12.9898,78.233)))*\n        43758.56222123);\n}\nfloat noise2 (in vec2 st,float fase) {\n    vec2 i = floor(st);\n    vec2 f = fract(st);\n    \n    float fase2 = fase;\n    // Four corners in 2D of a tile\n    float a = sin(random(i)*fase2);\n    float b =  sin(random(i + vec2(1.0, 0.0))*fase2);\n    float c =  sin(random(i + vec2(0.0, 1.0))*fase2);\n    float d =  sin(random(i + vec2(1.0, 1.0))*fase2);\n\n    // Smooth Interpolation\n\n    // Cubic Hermine Curve.  Same as SmoothStep()\n    vec2 u = f*f*(3.0-2.0*f);\n    // u = smoothstep(0.,1.,f);\n\n    // Mix 4 coorners percentages\n    return mix(a, b, u.x) +\n            (c - a)* u.y * (1.0 - u.x) +\n            (d - b) * u.x * u.y;\n}\nfloat fbm2 (in vec2 st) {\n    // Initial values\n    float value = 0.0;\n    float amplitude = 0.8;\n    float frequency = 0.;\n    vec2 shift = vec2(100);\n    \n    mat2 rot = mat2(cos(0.5), sin(0.5),\n                    -sin(0.5), cos(0.50));\n    \n    // Loop of octaves\n    for (int i = 0; i < octaves; i++) {\n        value += amplitude * noise2(st,time*0.1);\n        \n    \n        st = rot * st * 2.0 + shift;\n       \n        amplitude *= .5;\n    }\n    return value;\n}\nvoid main(void) {\n\n    vec3 p = position;\n   // float bn = floor(position.x / 20.);\n   // p.z = position.z+ fbm2(uvV*20.+(sin(position.y*100.+time)*10.+10.));\n    \n\n    gl_Position = worldViewProjection * vec4(p, 1.0);\n\n   \n\n    uvV = uv;\n}\n"}},n={};function o(e){var a=n[e];if(void 0!==a)return a.exports;var r=n[e]={exports:{}};return t[e](r,r.exports,o),r.exports}o.m=t,e=[],o.O=(t,n,a,r)=>{if(!n){var i=1/0;for(f=0;f<e.length;f++){for(var[n,a,r]=e[f],s=!0,l=0;l<n.length;l++)(!1&r||i>=r)&&Object.keys(o.O).every((e=>o.O[e](n[l])))?n.splice(l--,1):(s=!1,r<i&&(i=r));s&&(e.splice(f--,1),t=a())}return t}r=r||0;for(var f=e.length;f>0&&e[f-1][2]>r;f--)e[f]=e[f-1];e[f]=[n,a,r]},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={179:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var a,r,[i,s,l]=n,f=0;for(a in s)o.o(s,a)&&(o.m[a]=s[a]);for(l&&l(o),t&&t(n);f<i.length;f++)r=i[f],o.o(e,r)&&e[r]&&e[r][0](),e[i[f]]=0;o.O()},n=self.webpackChunkbabylonjs_typescript_starter=self.webpackChunkbabylonjs_typescript_starter||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var a=o.O(void 0,[890],(()=>o(3607)));a=o.O(a)})();