

//import "@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent";
//import "@babylonjs/core/LensFlares/lensFlareSystemSceneComponent";
//import { ShadowGenerator } from "@babylonjs/core/Lights/Shadows/shadowGenerator"
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera"
import { Engine } from "@babylonjs/core/Engines/engine"
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight"
import { PointLight } from "@babylonjs/core/Lights/pointLight"
import { SpotLight } from "@babylonjs/core/Lights/spotLight"
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight"
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder"
import { Scene } from "@babylonjs/core/scene"
import { Color3, Color4, Vector2, Vector3, Plane } from "@babylonjs/core/Maths/math"
import { test} from './utils'
import { SampleMaterial } from "./Materials/SampleMaterial"
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial'
import {
    CubeTexture,
    HDRCubeTexture,
    Texture,
    GlowLayer,
    BlurPostProcess,
    FxaaPostProcess,
    HighlightsPostProcess, ImageProcessingPostProcess, ColorCurves, SolidParticleSystem, Scalar,Animation
} from "@babylonjs/core";   
import "@babylonjs/core/Materials/standardMaterial";
import "@babylonjs/core/Meshes/Builders/boxBuilder";
import "@babylonjs/core/Helpers/sceneHelpers";
import { ShadowGenerator } from "@babylonjs/core";  


/*MAGIA NEGRA PARA QUE FUNCIONE EN TYPESCRIPT*/
declare var fxhash: any;
declare var fxrand: any;
declare var sfc32: any;
declare var hashes: any;
declare var window,$fxhashFeatures: any;
let l1;
let l2;
let view
let engine 
let scene 
let camera;
let material;
let boxes = [];
let cnter = 0; 
let ite_cnt = 10;
let isMousePressed = false;
let c1;
let c2;

var shadowGenerator;
var cntr2 = 0;

const ufx = <any>{}; //TYPESCRIPT ES RE BIZARRO PAPA

//const posant = <any>{};
let posant = [];
let cam_interpolation = 0.0;

 
function setfxhashvalues() {
    ufx.grosor = genR(0.2, 0.4);
    ufx.mins = { w: genR(0, 5), h: genR(0.2, 0.4), d: genR(1,10) }; 
    ufx.maxs = { w: genR(0, 50), h: genR(0.2, 0.4), d: genR(ufx.mins.d, 120) };
    ufx.ang = { x: genR(0, Math.PI), y: genR(0, Math.PI ), z: genR(0, Math.PI) };
    ufx.isLerps = true;
    ufx.isInverted = genR(0.0, 1.0) > 0.5 ? true : false;
    ufx.isBox = genR(0.0, 1.0) > .3 ? true : false;
    ufx.worm = genR(0.0, 1.0) > .94 ? true : false;    


    //ufx.isBox = false;
   // ufx.worm = false;

   window.$fxhashFeatures = {
    "Min " : "Width "+ufx.mins.w.toFixed(2) +"||Height "+ufx.mins.h.toFixed(2) + "||Depth "+ufx.mins.d.toFixed(2),
    "Max " : "Width "+ufx.maxs.w.toFixed(2) +"||Height "+ufx.maxs.h.toFixed(2) + "||Depth "+ufx.maxs.d.toFixed(2),
    "Inverted": ufx.isInverted,
    "Box" : ufx.isBox,
    }
}
setfxhashvalues();
function init() {
    cntr2 = 0;
   // setfxhashvalues();

    c1 = new Color3(genR(0.8, 1.0), genR(0.8, 1), genR(0.8, 1));
    c2 = new Color3(genR(0.4, 1.0), genR(0.4, 1.0), genR(0.4, 1));

    //c1 = new Color3(1.0,1.0,1.0);
    //c2 = new Color3(0.0,0.0, 0.0);
    
    test();
    view = document.getElementById("view") as HTMLCanvasElement
    engine = new Engine(view, true) 

    scene = new Scene(engine) 
    scene.clearColor = new Color3(0.0, 0.0, 0.0);

   
   
    var rt = new HDRCubeTexture("./hdrs/negro.hdr", scene, 128, false, true, false, true);
    //var skybox = MeshBuilder.CreateSphere("skyBox", { diameter: 1000.0 }, scene);
    var skyboxMaterial = new StandardMaterial("skyBox", scene);
     

    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = rt;
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;

  //  skyboxMaterial.diffuseColor = new Color3(1.0, 1.0, 1.0);
   // skybox.material = skyboxMaterial;
    initCam();
    var options = {
       // skyboxTexture: rt,
        groundColor: Color3.White()
    };
   // scene.createDefaultEnvironment(options);
    //scene.createDefaultEnvironment();

   

   //material = new SampleMaterial("material", scene, c1, c2);
    material = new SampleMaterial("material", scene);
    initLights();
    initArbol();
    
   /* const ground = MeshBuilder.CreateGround("ground", { height: 60, width: 60, subdivisions: 20 });
    ground.position = new Vector3(0, 0, 0);

    sh.alpha = 0.4;
    ground.material = sh;*/

   /* const sh = new SampleMaterial("material", scene);
    const disc = MeshBuilder.CreateDisc("disc", { radius: 20 }, scene);
    disc.material = sh;
    disc.rotation = new Vector3(Math.PI / 2, 0.0,0.0);
    */
 
    initPostProcessing();
    initSPS();
}
init();
view.addEventListener("pointerup", function () {
    isMousePressed = false;
});
view.addEventListener("pointerdown", function () {
    isMousePressed = true;
});
view.addEventListener("click", function () {
    /*console.log("Mouse Click!");
    isMousePressed = true;
    console.log(isMousePressed);*/
});
function initPostProcessing() {
    var kernel = 12.0;
    //var postProcess0 = new BlurPostProcess("Horizontal blur", new Vector2(1.0, 0), kernel, 1.0, camera);
    //var postProcess1 = new BlurPostProcess("Vertical blur", new Vector2(0, 1.0), kernel, 1.0, camera);
    // var postProcess = new FxaaPostProcess("fxaa", 1.0, camera);

    var curve = new ColorCurves();
    curve.globalHue = 200;
    curve.globalDensity = 180;
    curve.globalSaturation = 180;

    curve.highlightsHue = 20;
    curve.highlightsDensity = 180;
    curve.highlightsSaturation = -80;

    curve.shadowsHue = 8;
    curve.shadowsDensity = 80;
    curve.shadowsSaturation = 500;
   // scene.imageProcessingConfiguration.colorCurvesEnabled = true;
   // scene.imageProcessingConfiguration.colorCurves = curve;




    var gl = new GlowLayer("glow", scene);
    gl.intensity = genR(1, 1.2);
    //var postProcess2 = new HighlightsPostProcess("highlights", 2.0, camera);
    //var postProcess3 = new ImageProcessingPostProcess("processing", 11.0, camera);

    /*scene.fogMode = Scene.FOGMODE_LINEAR;
    scene.fogStart = 10;
    scene.fogEnd = 120;
    scene.fogColor = Color3.Lerp(Color3.Lerp(c1,c2,0.5),new Color3(0.0,0.0,0.0),0.7);*/

}
function initSPS() {
    const SPS = new SolidParticleSystem("SPS", scene, { useModelMaterial: true }); // scene is required
    const sphere = MeshBuilder.CreateSphere("s", { diameter:0.05 });
    const poly = MeshBuilder.CreatePolyhedron("p", { type: 2 }, scene);


    var m1 = new StandardMaterial("mat_tronco", scene);
    m1.diffuseColor = c2;
    m1.specularColor = c2;
    m1.emissiveColor = c2;

    sphere.material = m1;
    poly.material = m1;
    

    SPS.addShape(sphere,3500); // 20 spheres 
  //  SPS.addShape(poly, 1); // 120 polyhedrons
   // SPS.addShape(sphere, 80); // 80 other spheres
    sphere.dispose(); //free memory
    //poly.dispose(); //free memory

    const mesh = SPS.buildMesh();

    // initiate particles function
    SPS.initParticles = () => {
        for (let p = 0; p < SPS.nbParticles; p++) {
            const particle = SPS.particles[p];
            //Place particles at random positions with a cube
            particle.position.x = Scalar.RandomRange(-50,50);
            particle.position.y = Scalar.RandomRange(-10,50);
            particle.position.z = Scalar.RandomRange(-50,50);


            let cc1 = new Color4(c1.r, c1.g, c1.b, 1.0);

            let cc2 = new Color4(c1.r, c1.g, c1.b, 1.0);
            particle.color = Color4.Lerp(cc1, cc2, Math.random());
        }
    };

    //Update SPS mesh
    SPS.initParticles();
    SPS.setParticles();
}
function initCam() {
    camera = new ArcRotateCamera(
        "camera",
        Math.PI / 2,
        Math.PI / 3.2,
        2,
        Vector3.Zero(),
        scene)
    camera.attachControl(view)
   
    camera.wheelPrecision = 10;
    // camera.panningDistanceLimit = 0;
    let far = 0.4;
    let xyz = 0.8;
    camera.setPosition(new Vector3(Math.PI / 1.9 + xyz + 1.5, Math.PI / 1.9 + far + xyz, far * 4.7 + xyz + 1.5));
    camera.position.y = 50;
    // The goal height of camera above local origin (centre) of target
    // camera.panningAxis = new Vector3(1, 1, 0);
    //camera.panningDistanceLimit = 4;  //half of plane size 30
    // camera.alpha = Math.PI * 2.;
    //camera.beta = +Math.PI /2;
    //camera.position = new Vector3(0.0, 15000.0, 0);
    //camera.rotation = new Vector3(0.0,- Math.PI/2, 0);
    camera.heightOffset = -120; 
    camera.radius = 90.5; 
    //camera.lowerRadiusLimit = 4;
    camera.upperRadiusLimit = 200;
  //  camera.lowerBetaLimit = Math.PI / 3;
    camera.upperBetaLimit = Math.PI / 2-0.2;

    camera.cameraAcceleration = 1.00001;
    camera.speed = 150.8;


}
function initPiso() {
    const material = new SampleMaterial("material", scene);
    material.wireframe = true;
    //let box = MeshBuilder.CreateBox("piso", { height: 5.5, width: 100.75, depth: 100.25 }, scene);
     //const disc = MeshBuilder.CreateDisc("disc", { radius: 1500, tessellation:256 }, scene);
    //box.position = _pos;
    //box.receiveShadows = true;
    const sh = new SampleMaterial("material", scene);
    sh.setFloat("r1", c1.r);
    sh.setFloat("g1", c1.g);
    sh.setFloat("b1", c1.b);
    sh.setFloat("r2", c2.r);
    sh.setFloat("g2", c2.g);
    sh.setFloat("b2", c2.b);
    //sh.setFloat("isPlanet", genR(0.0, 1.0));
    sh.setFloat("isPlanet",1.0);
    sh.setFloat("rt1", genR(1.0));
    sh.setFloat("rt2", genR(0.0, 1.0));
    sh.setFloat("rt3", genR(0.0, 1.0));
    //box.material = sh;


    const disc = MeshBuilder.CreateDisc("disc", { radius: 100, tessellation:256 }, scene);

    disc.material = sh;
    disc.rotation = new Vector3(Math.PI / 2, 0.0, 0.0);
    disc.receiveShadows = true;
    
}
function initArbol() {

    let cnt = 1;
    let cnt2 = 1;

   /* for (let i = 0; i < cnt; i++) {
        for (let k = 0; k < cnt2; k++) {


            let xx = mapr(i, 0, cnt - 1, -20, 20);
            let zz = mapr(k, 0, cnt2 - 1, -20, 20);
           
          //  console.log(i);
            let pos = new Vector3(0, 0.0, 0);
            tronco(pos);
            initPiso();
        }
        let d = mapr(i, 0, cnt - 1, 100, 500);
        d = 1;
      //  console.log("D VALUE "+ d); 
    }*/

    let pos = new Vector3(0, 0.0,0);
    let rot = new Vector3(0.,0.0,0.0);
    //let rot2 = new Vector3(Math.PI,0.0,0.0 );
   tronco(pos,rot);
   // tronco2();
   // tronco(pos,rot2);
    initPiso(); 
} 

function tronco2(){
   // box

 


  /* let shape = MeshBuilder.CreateBox("tronco1", { height: 1., width: 1., depth: 1. }, scene);
   shape.position = new Vector3(0, 10.0, 0);
   shape.rotation = new Vector3(0., 0.0, 0.0);
   shape.material = myMaterial;
   boxes.push(shape);*/ 
    let cnt = 10;
   for(let i=0; i<cnt;i++){
        var myMaterial = new StandardMaterial("mat_tronco", scene);
        //myMaterial.diffuseColor = Color3.Lerp(c1, c2, Math.sin(genR(1.)*Math.PI*4.)*0.5+0.5); 
        //myMaterial.specularColor = Color3.Lerp(c1, c2, Math.sin(genR(1.)*Math.PI*4.)*0.5+0.5); 
        //myMaterial.emissiveColor  = Color3.Lerp(c1, c2, Math.sin(genR(1.)*Math.PI*4.)*0.5+0.5);

        myMaterial.diffuseColor =   new Color3(1.0,0.0,0.0); 
        myMaterial.specularColor = Color3.Lerp(c1, c2, Math.sin(genR(1.)*Math.PI*4.)*0.5+0.5); 
        myMaterial.emissiveColor  = Color3.Lerp(c1, c2, Math.sin(genR(1.)*Math.PI*4.)*0.5+0.5);
        myMaterial.alpha =0.7;
        //myMaterial.intensity = 0.1;
    
        let y1 = 1.0;
        let y2 = 30.0;

        let yf = mapr(i,0,cnt-1,y1,y2);


        let cnt2 = Math.floor(genR(4,15)); 
        let minx =  genR(-20);
        let max =  genR(20); 
        let siz = 10.0;
        for(let k=0; k<cnt2; k++){
            let shape = MeshBuilder.CreateBox("tronco1", { height:siz, width: siz, depth: siz }, scene);

            let xf = mapr(k,0,cnt2-1,minx,max); 
            shape.position = new Vector3(0., yf, 0);
            shape.rotation = new Vector3(0., 0.0, 0.0);
            shape.material = myMaterial;
            boxes.push(shape); 
        }

        /*for(let k=0; k<cnt2; k++){
            let shape = MeshBuilder.CreateBox("tronco1", { height: siz, width: siz, depth: siz }, scene);

            let xf = mapr(k,0,cnt2-1,minx,max); 
            xf+=Math.sin(Math.PI);

            let amp = 10;
            let z1 =-15;
            let z2 = 15;
            let zf = mapr(k,0,cnt2-1,z1,z2);
            shape.position = new Vector3(xf, yf, zf);
            shape.rotation = new Vector3(0., 0.0, 0.0);
            shape.material = myMaterial;
            boxes.push(shape); 
        }*/
    }
}

function tronco(_pos,_rot) {
    let alto = 0.5;
    let grosor = 8.5;

    let a = genR(-Math.PI * 2, Math.PI * 2);
    let pos = new Vector3(_pos.x, _pos.y + 25 , _pos.z);
    ufx.isInverted = false;
    if (ufx.isInverted) {
        pos = new Vector3(_pos.x, _pos.y+1.5, _pos.z);
    } 
    drawBranch(pos, _rot, 0, a, alto);
   //drawBranch(pos, new Vector3(0.0, 0.0, Math.PI / 2), 0, a, alto);
}
function drawBranch(_pos, _rot, _ite, _a, _alto) {

    let tocopos = false;
    //Checkeamos si ya toco una geometria en esa posicion para que no tire 8000 cajitas como un forro. 
    //Esto es cualquiera pero ubeno que se yo FUNCIONA no me jodas.
    for(let i=0; i<posant.length;i++){
        if(Vector3.Distance(posant[i],_pos) < 0.1){
            tocopos = true;
        }
    }



    if(!tocopos){
        var myMaterial = new StandardMaterial("mat_tronco", scene);
        // myMaterial.wireframe = true;


        var alto = mapr(_ite, 0, ite_cnt-1, 1, 20);
        alto = 4;
        var ancho = 5; 
        let idx =  mapr(_ite, 0, ite_cnt-1, 0, 1);
        let c3 = Color3.Lerp(c1, c2, mapr(_ite, 0, ite_cnt, 0, 1));
        c3 = Color3.Lerp(c1, c2, Math.sin(idx*Math.PI*4.)*0.5+0.5); 

        //if (ufx.isLerps) {
    // ufx.mins = { w: genR(0.2, 0.4), h: genR(0.2, 0.4), d: genR(0.2, 0.4) };
        //ufx.maxs = { w: genR(0.2, 0.4), h: genR(0.2, 0.4), d: genR(0.2, 0.4) };
        //ufx.isLerps = true;

        let sfw = mapr(idx, 0, ite_cnt - 1, ufx.mins.w, ufx.maxs.w);
        let sfh = mapr(idx, 0, ite_cnt - 1, ufx.mins.h, ufx.maxs.h);
        let sfd = mapr(idx, 0, ite_cnt - 1, ufx.mins.d, ufx.maxs.d);

    // console.log(sfw);
    //var myMaterial = new StandardMaterial("mat_tronco", scene);
        myMaterial.diffuseColor = c3;
        myMaterial.specularColor = c3;
        myMaterial.emissiveColor = Color3.Lerp(new Color3(0, 0.0, 0.0), c3, 0.2);
        myMaterial.alpha = 1.0;
    

        /*shp.material = myMaterial;
        shp.position = _pos;
        shp.rotation = _rot;
        boxes.push(shp);*/
        let shape ;
        //ufx.isBox = false;
        if (ufx.isBox) {
            shape = MeshBuilder.CreateBox("tronco1", { height: sfw, width: sfh, depth: sfd }, scene);
        } else {
            /*shape = MeshBuilder.CreateSphere("sphere", {
                diameterX: 20,
                diameterY: 20,
                diameterZ: 20
            }, scene);*/
            const frameRate = 1500;
            if (ufx.worm) {
            } else {
                shape = MeshBuilder.CreateSphere("sphere",  
                { diameterX: sfw*1.2, diameterY: sfh*2.8, diameterZ: sfd*1. },
                 scene);
            }
        }
    
        //shape.updable = true;
        shape.material = myMaterial;
        shape.position = _pos;
        shape.rotation = _rot;

        boxes.push(shape);


        //shadowGenerator.getShadowMap().renderList.push(box);

        if (_ite < ite_cnt) {
            let ay = mapr(_ite, 0, ite_cnt - 1, 0, ufx.ang.y);
            let ax = mapr(_ite, 0, ite_cnt - 1, 0, ufx.ang.x);
            let az = mapr(_ite, 0, ite_cnt - 1, 0, ufx.ang.z);
            ax = 0;
            ay = 0;
            az = 0;
            let pos = new Vector3(_pos.x - ancho / 2, _pos.y - alto / 2, _pos.z);
            let pos2 = new Vector3(_pos.x + ancho / 2, _pos.y - alto / 2, _pos.z); 
            if (ufx.isInverted) {
            
                pos = new Vector3(_pos.x - ancho / 2, _pos.y + alto / 2, _pos.z);
                pos2 = new Vector3(_pos.x + ancho / 2, _pos.y + alto / 2, _pos.z); 
            }
            let rot = new Vector3(_rot.x+ax, _rot.y  +ay, _rot.z + _a +az );
            let rot2 = new Vector3(_rot.x + ax, _rot.y + ay, _rot.z - _a + az);
            
            pos.x+=5.1;
            pos2.x-=5.1;
            drawBranch(pos, rot, _ite + 1, _a, alto)
            drawBranch(pos2, rot2, _ite + 1, _a, alto)
        }

        cntr2++;
        console.log(cntr2);
        posant.push(_pos);  
    }

} 
function initLights() {

    l1 = new HemisphericLight(
        "light",
        new Vector3(0.0, 0.0, 0.0),
        scene)
    l1.diffuse = c1;
    l1.specular = c2;
    l1.intensity = .2;
 
    var sl = new SpotLight("spotLight", new Vector3(0, 100, 0), new Vector3(0, -80, 0), Math.PI / 3, 2, scene);

 

    sl.diffuse = c1;
    sl.range = 90;
    sl.intensity = 1.6;
    
   // shadowGenerator = new ShadowGenerator(1024, sl);


    let cntpoints = 4;

    for (let i = 0; i < cntpoints; i++) {

        let amp = 8;
        let idx = mapr(i, 0, cntpoints - 1, 0, Math.PI * 2);


        let cf = Color3.Lerp(c1, c2, idx);

        //let amp = 4;
        let x = Math.sin(idx) * amp / 2 * amp / 2;
        let z = Math.cos(idx) * amp / 2 * amp / 2;

      //  var pl = new PointLight("pointLight", new Vector3(x, 0, z), scene);
       // pl.range = 1300;
       // pl.specular = cf;
      //  p1.diffuse = new Color3(1.0, 0.0, 0.0); 
      //  pl.intensity = 0.4;
       
    }

}
engine.runRenderLoop(() => {
    scene.render();
    cnter++; //VAMOS A SER CABEZAS ENTONCES ? LO HACEMOS CABEZA EH

    let camp = <any>{};
    camp = {
        alpha: cnter * 0.002 + Math.PI / 2,
        radius: Math.sin(cnter * 0.001) * 10 + 60,
        beta: Math.sin(cnter * 0.002) * 0.2 + Math.PI / 4
    }
    if (!isMousePressed) {
        /*camera.alpha = cnter * 0.002 + Math.PI / 2;
        camera.radius = Math.sin(cnter * 0.001) * 10 + 50;
        camera.beta = Math.sin(cnter * 0.002) * 0.2 + Math.PI / 4;*/
        cam_interpolation -= 0.01;
    } else {
        cam_interpolation += 0.5;
    }
    cam_interpolation = clamp(cam_interpolation, 0.0, 1.0);
    camera.alpha = lerp(camera.alpha, camp.alpha, 1. - cam_interpolation);
    camera.beta = lerp(camera.beta, camp.beta, 1. - cam_interpolation);


    for (let i = 0; i < boxes.length; i++){

        //boxes[i].rotation(Vector3(0.0, 0.0, 0.0));
        boxes[i].rotation.x = 0.0;
        boxes[i].rotation.y;
        if (boxes[i].position.x == 0) {
            boxes[i].rotation.x += 0.1;
        }else if (boxes[i].position.x < 0) {
            boxes[i].rotation.z += 0.01;
        } else {
            boxes[i].rotation.z -= 0.01;
        }
        if (ufx.worm) {
            let idx = mapr(i, 0, boxes.length - 1, 0, 1);
            boxes[i].diameterZ = Math.sin(cnter + idx * Math.PI * 10.) * 17. + 17.;
            boxes[i].diameterX = Math.sin(cnter + idx * Math.PI * 10.) * 17. + 17.;
            boxes[i].diameterZ = Math.sin(cnter + idx * Math.PI * 10.) * 17. + 17.;
        }
    }


})
function genR(min?:number, max?:number) {
    let result = 0;
    if (!max) { result = fxrand() * (min - 0) + 0; } else { result = fxrand() * (max - min) + min; }
    return result;
}


function mapr(n, start1, stop1, start2, stop2) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};
function lerp(a, b, t) {
    return (1 - t) * a + t * b;
}
function clamp(val, min, max) {
    return val > max ? max : val < min ? min : val;
}
function jplerpColor(c1,c2,idx) {

    return new Color3(lerp(c1.red, c2.red, idx), lerp(c1.green, c2.green, idx), lerp(c1.blue, c2.blue, idx));
}