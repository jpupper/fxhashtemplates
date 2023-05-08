

function genR(min, max) {
	let result = 0;
	if (!max) { result = fxrand() * (min - 0) + 0; } else { result = fxrand() * (max - min) + min; }
	return result;
}



let size ;
let c1 ;
function setup() {
  createCanvas(windowWidth,windowHeight);   
 
  
  size = genR(50,500);
  c1 = color(genR(255),genR(255),genR(255));
}

function draw() {

	fill(c1)
	ellipse(mouseX,mouseY,size,size);
	
	
	
}

function mousePressed() { 
  
}