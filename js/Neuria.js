let log = function(text){
  document.getElementById("console").innerHTML += "<br>"+text;
}
try{
  let cscrolled = false;
  setInterval(function(){
    if(!cscrolled){
      let element = document.getElementById("console frame");
      element.scrollTop = element.scrollHeight;
    }
  }, 10)
    $("#console frame").on('scroll', function(){
      let element = document.getElementById("console frame");
      if(element.scrollTop == element.scrollHeight)
        cscrolled=false;
      else
        cscrolled=true;
    });
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
  let random = function(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;4
  }
  let ids = [];
  let digits = 10;
  let getId = function(){
    let used = true;
    let id;
    while(used){
      used = false;
      id = random(Math.pow(10, digits-1), Math.pow(10, digits));
      for(let use in ids)
        if(use == id)
          used = true;
    }
    return id;
  }
  let entities = [];
  let players = [];
  let player = Math.random();
  class Entity {
    constructor(x, y){
      this.id = getId();
      this.x = x;
      this.y = y;
    }
    onUpdate(world){}
  }
  class Sprite extends Entity{
    constructor(x, y, img){
      super(x, y);
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
  player = new Neuron(100, 100, "");
  entities.push(new Neuron());
  //drawing
  var c = document.getElementById("frame");
  var ctx = c.getContext("2d");
  setInterval(function(){
    if (kh.keyPressed('d'))
      player.x++;
    if(kh.keyPressed('a'))
      player.x--;
    if (kh.keyPressed('s'))
      player.y++;
    if(kh.keyPressed('w'))
      player.y--;
    ctx.beginPath();
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    ctx.arc(player.x,player.y,50,0,Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
  }, 1);
  setInterval(function(){log("test")}, 1000);
}catch(ex){
  log(ex);
}
