//Key Handler
class KeyHandler {
  constructor(){
    this.keys = [];
    var obj = this;
    window.addEventListener("keydown",function(e){
      obj.keys[e.key.charCodeAt(0)] = true;
    });
    window.addEventListener("keyup",function(e){
      obj.keys[e.key.charCodeAt(0)] = false;
    });
  }
  keyPressed(key){
    return this.keys[key.charCodeAt(0)];
  }
}
var kh = new KeyHandler();
//setup
let NeuronTypes = {
  ROBOT : 1,
  DRIVER : 1
}
let entities = [];
class Entity {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  onUpdate(world){}
}
class Sprite{
  constructor(x, y){
    super(x, y, img);
    this.img = img;
  }
}
class Neuron extends Sprite {
  constructor(x, y, img){
    super(x, y, img);
    this.xvel = 0;
    this.yvel = 0;
  }
}
//drawing
var c = document.getElementById("frame");
var ctx = c.getContext("2d");
setInterval(function(){
  if (kh.keyPressed('d'))
    x++;
  if(kh.keyPressed('a'))
    x--;
  if (kh.keyPressed('s'))
    y++;
  if(kh.keyPressed('w'))
    y--;
  ctx.beginPath();
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.arc(x,y,50,0,Math.PI * 2);
  ctx.closePath();
  ctx.stroke();
}, 10);
