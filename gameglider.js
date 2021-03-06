var myGamePiece, score,obstacles=[],mySound,out,scoring;
function gameBegin(){
myGamePiece = new component(70,140,"ima.png",700,560, "image");
mySound=new sound("sound.mp3");
score=new component("40px","Consolas","pink",640,40,"text");
out=new component("70px","Arial","red",520,300,"text");
scoring=new component("50px","Arial","yellow",520,400,"text");
field.canvasArea();              /* this will call the method canvasArea of field object*/
}
var field={
canvas:document.createElement("canvas"),                /*field is an object which creates canvas*/                                                                                                          
canvasArea:function(){
this.canvas.width=1500;
this.canvas.height=700;
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
if(type=="image"){
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
if(type=="image"){
  ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
}
else{
  ctx.fillStyle=color;
  ctx.fillRect(this.x,this.y,this.width,this.height);
  }
}
this.newPos=function(){
if(this.width+this.x>field.canvas.width) {    /*boundary conditions */
this.x-=1;
}
else if(this.x<0){
this.x+=1;
}
else{                    /*this function is to change the position of the image using buttons*/
this.x +=this.speedX;
this.y +=this.speedY;
 }
}
this.crashWith = function(otherobj) {
  var myleft = this.x;
  var myright = this.x+ (this.width)-40;
  var mytop = this.y-20;
  var mybottom = this.y + (this.height);
  var otherleft = otherobj.x-20;
  var otherright = otherobj.x + (otherobj.width)-20;
  var othertop = otherobj.y-10;
  var otherbottom = otherobj.y + (otherobj.height)-30;
  var crash = true;
  if ((mybottom < othertop) ||
         (mytop > otherbottom) ||
         (myright < otherleft) ||
         (myleft > otherright)) {
     crash = false;
  }
  return crash;
}
} 
function updateGameArea(){
  for (i = 0; i < obstacles.length; i += 1) {
    if (myGamePiece.crashWith(obstacles[i])) {
      mySound.play();
      field.stop();
      out.text="GAMEOVER!";
      out.update();
      scoring.text="YOUR SCORE="+field.frameNo;
      scoring.update();
        return;
    } 
  }
field.cleanTrail();
myGamePiece.speedX=0;
field.frameNo += 1;
score.text="SCORE:"+field.frameNo;
score.update();
if(everyinterval(30)){
  x=Math.random()*1430;/*obstacles can come from anywhere in width(1500) of canvas*/
  y = field.canvas.height-670;  //y will take values from (720-700) below
  obstacles.push(new component(50,60, "star.jpg",x,y,"image"));
  obstacles.push(new component(60,80, "obs.png",Math.random()*1440,y,"image"));
}
for (i = 0; i < obstacles.length; i += 1) {
    obstacles[i].y +=5;
    obstacles[i].update();
}
if(field.frameNo>=500){
  if(everyinterval(35)){
  x = Math.random()*1440;/*obstacles can come from anywhere in width(1500) of canvas*/
  y = field.canvas.height-680;  //y will take values from (720-700) below
  //obstacles.push(new component(50,60, "star.jpg",Math.random()*1450,y,"image"));
  obstacles.push(new component(60,80, "enemy1.png", x, y,"image"));
  }
  for (i = 0; i < obstacles.length; i += 1) {
    obstacles[i].y +=6;
    obstacles[i].update();
}
} 
if(field.frameNo>=1500){
  if(everyinterval(40)){
    x = Math.random()*1440;/*obstacles can come from anywhere in width(1500) of canvas*/
    y = field.canvas.height-690;  //y will take values from (720-700) below
    obstacles.push(new component(70,80, "ufo2.png", Math.random()*1430, y,"image"));
    //obstacles.push(new component(60,80, "enemy1.png", x, y,"image"));
    //obstacles.push(new component(50,60, "star.jpg",Math.random()*1450,y,"image"));
  }
  for (i = 0; i < obstacles.length; i += 1) {
    obstacles[i].y +=7;
    obstacles[i].update();
}
}
if(field.frameNo>=2500){
  if(everyinterval(45)){
    x = Math.random()*1440;/*obstacles can come from anywhere in width(1500) of canvas*/
    y = field.canvas.height-700;  //y will take values from (720-700) below
    //obstacles.push(new component(60,80, "ufo2.png", x, y,"image"));
    obstacles.push(new component(70,80, "enemy1.png",Math.random()*1430, y,"image"));
    //obstacles.push(new component(50,60, "star.jpg",Math.random()*1450,y,"image"));
}
  for (i = 0; i < obstacles.length; i += 1) {
    obstacles[i].y +=8;
    obstacles[i].update();
}
} 
if(field.key&&field.key==37){
  myGamePiece.speedX=-8;
}
if(field.key&&field.key==39){
  myGamePiece.speedX=8;
}
myGamePiece.newPos();    
myGamePiece.update();
obstacles.update();
enemy.update();
}
function sound(src){
this.sound=document.createElement("audio");
this.sound.src=src;
this.sound.setAttribute("preload","auto");
this.sound.setAttribute("controls","none");
this.sound.display="none";
document.body.appendChild(this.sound);
this.play=function(){
this.sound.play();
}
this.stop=function(){
this.sound.pause();
}
}
function everyinterval(n) {
if ((field.frameNo / n) % 1 == 0) {return true;}
return false;
}
