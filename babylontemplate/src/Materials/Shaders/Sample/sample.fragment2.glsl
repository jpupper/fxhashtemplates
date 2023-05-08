precision highp float;

// Uniforms
uniform float time;

// Varying
varying vec2 uvV;
#define PI 3.141592649

uniform float r1 ; 
uniform float g1 ; 
uniform float b1 ; 

uniform float r2 ; 
uniform float g2 ; 
uniform float b2 ;  

uniform float rt1;
uniform float rt2;
uniform float rt3;

uniform float isPlanet ;  
#define octaves 8
float mapr(float _value,float _low2,float _high2) {
	float val = _low2 + (_high2 - _low2) * (_value - 0.) / (1.0 - 0.);
    //float val = 0.1;
	return val;
}

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.56222123);
}
float noise2 (in vec2 st,float fase) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    float fase2 = fase;
    // Four corners in 2D of a tile
    float a = sin(random(i)*fase2);
    float b =  sin(random(i + vec2(1.0, 0.0))*fase2);
    float c =  sin(random(i + vec2(0.0, 1.0))*fase2);
    float d =  sin(random(i + vec2(1.0, 1.0))*fase2);

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}
float fbm2 (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitude = 0.8;
    float frequency = 0.;
    vec2 shift = vec2(100);
    
    mat2 rot = mat2(cos(0.5), sin(0.5),
                    -sin(0.5), cos(0.50));
    
    // Loop of octaves
    for (int i = 0; i < octaves; i++) {
        value += amplitude * noise2(st,time*0.1+120.);
        
    
        st = rot * st * 2.0 + shift;
       
        amplitude *= .5;
    }
    return value;
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}
void main(void) {
    vec2 uv = uvV.xy;
    vec2 p = vec2(0.5) -uv;
    float r = 1.-length(p);
    float rm = 20.;
    float def = fbm2(uv*50.+vec2(fbm2(uv*15.)))*2.;
    float e = sin(r*rm+time+def*2.)*.5+.5;
   // e = smoothstep(0.1,0.1,e);
    
    
    
    vec3 cf = mix(vec3(r1,g1,b1),vec3(r2,g2,b2),e);
   //   vec3 cf = mix(vec3(1.-r1,1.-g1,1.-b1),vec3(1.-r2,1.-g2,1.-b2),e);

    float e2 = fbm2(uv*20.)*.5+.5;

    e2 = smoothstep(0.1,0.8,e2);
    cf*=vec3(sin(r*rm+PI/2.+time+e2)*.5+.5); 
    //vec4 fin = 

    if(isPlanet > 0.5){
    
        float f2 = smoothstep(0.2,0.4,fbm2(uv*5.+fbm2(uv*20.))*.5+.5)*.2;
    
    }

    
    cf*=smoothstep(0.5,0.57,r);
    gl_FragColor = vec4(cf, (length(cf)*0.7)-0.2);
   
	/*cf.rg *=rotate2d(rt1*PI*2.); 
	cf.bg *=rotate2d(rt2*PI*2.); 
	cf.rb *=rotate2d(rt3*PI*2.); */
   // gl_FragColor = vec4(cf, 1.);
   //gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}
