function gameBegin(){
  myGamePiece = new component(120,150,"glider.png",700,550, "image");
  field.canvasArea();              /* this will call the method canvasArea of field object*/
}
var field={
  canvas:document.createElement("canvas"),                /*field is an object which creates canvas*/                                                                                                          
  canvasArea:function(){
this.canvas.width=1510;
this.canvas.height=700;
this.context=this.canvas.getContext("2d");
document.body.insertBefore(this.canvas,document.body.childNodes[0]);/*The canvasArea() method creates a <canvas> element and inserts it as the
first child node of the body element*/
 this.interval = setInterval(updateGameArea, 20);
  }
}
function component(width,height,color,x,y,type){
  this.type=type;
  if(type=="image"){
    this.image=new Image();
    this.image.src = color;
  }
this.width=width;
this.height=height;
this.speedX = 0;
this.x=x;
this.y=y;
this.update=function(){
  ctx=field.context;
  if(type=="image"){
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
  }
  else{
    ctx.fillStyle=color;
    ctx.fillRect(this.x,this.y,this.width,this.height);
  }
}
this.newPos=function(){                       /*this function is to change the position of the image using buttons*/
  this.x +=this.speedX;
}
} 
function updateGameArea(){
  myGamePiece.newPos();
  myGamePiece.update();
}
function left(){
  myGamePiece.speedX -=1;
}
function right(){
  myGamePiece.speedX +=1;
}