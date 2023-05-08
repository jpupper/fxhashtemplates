
var hydra = new Hydra({ detectAudio: false })

function genR(min, max) {
	let result = 0;
	if (!max) { result = fxrand() * (min - 0) + 0; } else { result = fxrand() * (max - min) + min; }
	return result;
}


let scpix = genR(2,20)
let colorfase1 = genR(10)
let oscfreq = genR(100);


let brillo = 0.988;

// s0.initScreen()
osc(genR(150),0.001,genR(0,2)).saturate(0.7)
  .pixelate(genR(200),genR(40,200))
    .modulateScale(osc(genR(100),genR(0.0005,0.002),0,0).rotate(Math.PI/2)
    .scale(genR(0.7,1.2)))
    .pixelate(10,1000).modulatePixelate(src(o0).scale(1.03),genR(30)).scale(genR(0.94,0.99)).blend(osc(20,0.1,0.4).pixelate(10,10).kaleid(2).kaleid(2),0.1).out(o0)

render(o0)



