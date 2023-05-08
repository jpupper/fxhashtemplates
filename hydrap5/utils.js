reset = () => {
	hush();
	s0.init({src: p1.canvas.elt});
	o0.setMode(); o1.setMode();
	hydra.sandbox.set("time", 0);
	hydra.sandbox.set("fps", 0);
	hydra.sandbox.set("bpm", 30);
	hydra.sandbox.set("speed", 1);
	p1.clear();
	p1.imageMode(p1.CORNER);
	p1.frameRate(60);
	p1.draw = () => {};
};

// define custom hydra functions, p5 classes, etc
