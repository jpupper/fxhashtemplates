import { Scene } from "@babylonjs/core/scene"
import { ShaderMaterial } from "@babylonjs/core/Materials/shaderMaterial"
import { Effect } from "@babylonjs/core/Materials/effect"
import { Color3 } from "@babylonjs/core"
import * as sampleVertexShader from "./Shaders/Sample/sample.vertex.glsl"
import * as sampleFragmentShader from "./Shaders/Sample/sample.fragment.glsl"

import * as sampleFragmentShader2 from "./Shaders/Sample/sample.fragment2.glsl"
Effect.ShadersStore["sampleVertexShader"] = sampleVertexShader
Effect.ShadersStore["sampleFragmentShader"] = sampleFragmentShader2 

export class SampleMaterial extends ShaderMaterial {

    constructor(name: string, scene: Scene) {
       
        super(name, scene, { vertex: "sample", fragment: "sample" }, {
            uniforms: [
                "worldViewProjection",
                "time",
                "c1",
                "c2",
                "isPlanet",
                "rt1",
                "rt2",
                "rt3"
            ],
            attributes: [
                "position",
                "normal",
                "uv"
            ],
            needAlphaBlending: true,
        })
        
        const startTime = Date.now()
    
        scene.registerBeforeRender(() => {
            const currentTime = Date.now()
            const time = currentTime - startTime
            this.time = time / 1000
            //c1 = new Color3(1.0, 0.0, 0.0);
            //c2 = new Color3(0.0, 0.0, 1.0);

        })
       // this.e = 0.;
        //console.log(c1);
        //console.log(c2);
    }

    set time(value: number) {

        let cf = new Color3(0.0, 0.0, 0.0);
        //c1.r = 1.0;
        this.setFloat("time", value)
    
    }
   /* set c1(value: Color3) {

        let cf = new Color3(1.0, 1.0, 1.0);
        
        this.setFloat("r1", value.r)
        this.setFloat("g1", value.g)
        this.setFloat("b1", value.b)

        this.setFloat("r2", 0.0)
        this.setFloat("g2", 0.0)
        this.setFloat("b2", 0.0)
    }*/
}


export class app {
    variable1: string // implicitly public in typescript
    variable2: number
    variable3 = "Hellow world"
    constructor(count: number) {
        this.variable1 = "something";
        this.variable2 = 1 + count;
    }

} 