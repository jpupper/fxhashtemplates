const _width = window.innerWidth;
const _height = window.innerHeight;

const hydraCanvas = document.getElementById("hydra-canvas");
// hydraCanvas.style.width =  ""+_width+"px"
// hydraCanvas.style.height = ""+_height+"px"

let hydra = new Hydra({
	numSources: 4,
	numOutputs: 3,
	makeGlobal: true,
	detectAudio: false,
	enableStreamCapture: false,
	canvas: hydraCanvas,
});
hydra.setResolution(_width, _height);

p1 = new P5({ width: _width, height: _height, mode: "P2D" });


sketches = {}