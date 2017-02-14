const {app, BrowserWindow} = require('electron');

let win = null;

app.on('ready', function() {
  win = new BrowserWindow({backgroundColor: '#eeeeee', show: false, width:820, height:620, useContentSize:true})
  win.loadURL("file://" + __dirname + "/index.html");
  win.webContents.on('dom-ready', () => {
    win.show();
  });
});
old = function(){
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
  }, 10);
}
