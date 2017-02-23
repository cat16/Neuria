//log function
let log = function(text){
  document.getElementById("console").innerHTML += "<br>"+text;
}



//if the js crashes, it will log it so you know what happened
try{
  log("loading...");

  //loop class which acts like setInterval()
  class Loop {
    constructor(wait, func) {
      this.wait=wait; //time in ms between executions
      this.func=func; //the function to be executed
      this.count=0; //how many times the function has been run
    }
    //starts the loop
    start(){
      this.stop=false;
      try{
        function timeout(t) {
          setTimeout(function () {
            t.func();
            t.count++;
            if(!t.stop)
              timeout(t);
          }, t.wait);
        }
        timeout(this);
      }catch(ex){
        log(ex);
      }
    }
    //stops the loop
    stop(){
      this.stop=true;
    }
  }
  let test = new Loop(1000, function(){if(test.count==10) test.stop(); log(test.count)})
  test.start();



  //false if the scroll bar on the console is at the bottom
  let cscrolled = false;
  //keeps the scroll bar on the console at the bottom if the user scrolls there
  let keepScrolledDown = new Loop(10, function(){
    if(!cscrolled){
      let element = document.getElementById("console-frame");
      element.scrollTop = element.scrollHeight;
    }
  });
  keepScrolledDown.start();

  //when scrolled, see if the bar is at the bottom
  $("#console-frame").on('scroll', function(){
    let element = document.getElementById("console-frame");
    if(element.scrollTop+$("#console-frame").height() >= element.scrollHeight)
      cscrolled=false;
    else
      cscrolled=true;
  });



  //Key Handler (which keys are pressed)
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
  //main key handler
  var kh = new KeyHandler();



  //generates a randon # between min inclusive and max exclusive (I think)
  let random = function(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }



  //list of ids so you know which ones were taken
  let ids = [];
  //how many digits should each entity id be?
  let digits = 10;
  //returns a random, unique id
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



  //list of all entities
  let entities = [];

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
      this.color = "rgb("+random(0, 255)+", "+random(0, 255)+", "+random(0, 255)+")";
    }
  }
  //the player
  let player = new Neuron(100, 100, "");
  entities.push(player);



  //get context and stuff for drawing
  var c = document.getElementById("frame");
  var ctx = c.getContext("2d");
  //draws all entities to the screen
  let draw = function(){
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

    for(let entity of entities){
      ctx.beginPath();
      ctx.arc(entity.x,entity.y,50,0,Math.PI * 2);
      ctx.fillStyle = entity.color;
      ctx.fill();
      ctx.closePath();
    }
    ctx.stroke();
  }

  displayer = new Loop(16, draw);
  displayer.start();



  //import {update} from "update.js";

  //updating (does a lot)
  let update = function(){
    if (kh.keyPressed('d'))
      player.x++;
    if(kh.keyPressed('a'))
      player.x--;
    if (kh.keyPressed('s'))
      player.y++;
    if(kh.keyPressed('w'))
      player.y--;
  }

  updater = new Loop(10, update);
  updater.start();

}catch(ex){
  log(ex);
}
