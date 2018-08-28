var myGamePiece;
var backGround;
var score;
function gameBegin(){
  myGamePiece = new component(120,150,"glider.png",700,550, "image");
 backGround=new component(1500,700,"galaxy.jpg",0,20,"background");
 score=new component("40px","Consolas","red",640,30,"text");
  field.canvasArea();              /* this will call the method canvasArea of field object*/
}
var field={
  canvas:document.createElement("canvas"),                /*field is an object which creates canvas*/                                                                                                          
  canvasArea:function(){
this.canvas.width=1500;
this.canvas.height=720;
this.context=this.canvas.getContext("2d");
document.body.insertBefore(this.canvas,document.body.childNodes[0]);/*The canvasArea() method creates a <canvas> element and inserts it as the
first child node of the body element*/
this.frameNo=0;
 this.interval = setInterval(updateGameArea, 20);
 window.addEventListener('keydown',function(e){
   field.key=e.keyCode;
 })
 window.addEventListener('keyup',function(e){
   field.key=false;
 })
  },
  cleanTrail :function(){
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height); /*this method is use to clear the trails which occur when we move the glider*/
  },
  stop:function(){
    clearInterval(this.interval);
  }
}
function component(width,height,color,x,y,type){
  this.type=type;
  if(type=="image" || type=="background"){
    this.image=new Image();
    this.image.src = color;
  }
this.width=width;
this.height=height;
this.speedX = 0;
this.speedY = 0;
this.x=x;
this.y=y;
this.update=function(){
  ctx=field.context;
   if(this.type=="text"){
    ctx.font=this.width+" "+this.height;
    ctx.fillStyle=color;
    ctx.fillText(this.text,this.x,this.y);
  }
  if(type=="image" || type=="background"){
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    if(type=="background"){
      ctx.drawImage(this.image,this.x,this.y+this.height,this.width,this.height);/*this is done to move the background in y directio*/
    }
  }
 else{
    ctx.fillStyle=color;
    ctx.fillRect(this.x,this.y,this.width,this.height);
  }
}
this.newPos=function(){                       /*this function is to change the position of the image using buttons*/
  this.x +=this.speedX;
  this.y +=this.speedY;
  if(this.type=="background"){
    if(this.y==-(this.height)){
      this.y=0;
    }
  }
}
} 
function updateGameArea(){
  field.cleanTrail();
  field.frameNo+=1;
  score.text="SCORE= " + field.frameNo;
  score.update();
  backGround.speedY=+1;
  backGround.newPos();
  backGround.update();
  myGamePiece.speedX=0;
  if(field.key&&field.key==37){
    myGamePiece.speedX=-2;
  }
  if(field.key&&field.key==39){
    myGamePiece.speedX=2;
  }
  myGamePiece.newPos();
  myGamePiece.update();
}
/*function left(){
  myGamePiece.speedX -=1;
}
function right(){
  myGamePiece.speedX +=1;
}
function stopMove(){
  myGamePiece.speedX=0;
}*/
