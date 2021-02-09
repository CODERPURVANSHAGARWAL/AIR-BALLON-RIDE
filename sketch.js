const Engine = Matter.Engine;

const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
function preload(){

background1= loadImage("images/Hot Air Ballon-01.png")


}

function setup() {

  database = firebase.database();
  console.log(database);

  createCanvas(800,400);
  engine = Engine.create();
  world = engine.world;

  hot = new Ballon(200,200,200,200)
  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);
  textSize(20); 
  // var hypnoticBallPosition = database.ref('ball/position');
  // hypnoticBallPosition.on("value", readPosition, showError);
 
}

function draw() {

  Engine.update(engine);

  background(background1);  

  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+1);
  }

hot.display()

 // drawSprites();
}

function writePosition(x,y){
  database.ref('ball/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}