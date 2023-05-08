class P5 extends p5 {
	constructor({
		width = window.innerWidth,
		height = window.innerHeight,
		mode = "P2D",
    source = s0
	} = {}) {
		//debugger
		super((p) => {
			p.setup = () => {
				p.canvas = p.createCanvas(width, height, p[mode]);
				p.canvas.style("position", "absolute");
				p.canvas.style("top", "0px");
				p.canvas.style("left", "0px");
				p.canvas.style("zIndex", "99");
				p.canvas.hide();
        		source.init({src: p1.canvas.elt});
			};
			p.draw = () => {};
			// p.show = () => p.canvas.style("visibility", "visible");
			// p.hide = () => p.canvas.style("visibility", "hidden");
			// p.hide();
		}, document.body);
		this.width = width;
		this.height = height;
		this.mode = mode; /*
		this.canvas.style.position = "absolute"
    this.canvas.style.top = "0px"
    this.canvas.style.left = "0px"
    this.canvas.style.zIndex = -1*/
	}

	/*show() {
		this.canvas.style.visibility = "visible";
	}

	hide() {
		this.canvas.style.visibility = "hidden";
	}*/

	// p5 clear function not covering canvas
	clear() {
		this.drawingContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}
