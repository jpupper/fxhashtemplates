// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// Initialize a new p1 instance It is only necessary to call this once



let sf = genR(100,300)
let c1 = [genR(255),genR(255),genR(255)]


p1.draw = () => {
  //p1.clear()
  p1.background(0,255);
  p1.rectMode(p1.CENTER);
  let cnt = 50;
  for(let i=0; i<cnt; i++){
    let a =  p1.map(i,0,cnt,0, p1.TWO_PI);
    let amp = p1.sin(p1.millis()*0.0001+a*5)*500+500;
    let x =  p1.width/2  +  p1.sin( p1.millis()*0.0001+a)*amp;
    let y =  p1.height/2 +  p1.cos( p1.millis()*0.0001+a)*amp;
    let s2 = p1.sin(p1.millis()*0.0005+a*10)*sf+20;
    p1.fill(0);
    p1.stroke(c1[0],c1[1],c1[2]);
    p1.strokeWeight(10);
    p1.rect(x,y,s2,s2);
    
    p1.fill(0);
    p1.stroke(255);
    p1.strokeWeight(10);
    p1.rect(x+50,y+50,s2,s2);
  }
  
  
}

// To use p1 as an input to hydra, simply use the canvas as a source:
s0.init({src: p1.canvas})
// Then render the canvas
src(s0).kaleid(2).repeat(2,2).kaleid(2).out()



function genR(min, max) {
	let result = 0;
	if (!max) { result = fxrand() * (min - 0) + 0; } else { result = fxrand() * (max - min) + min; }
	return result;
}
