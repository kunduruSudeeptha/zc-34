const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg,Evil_monster;
var canvas, angle, tower, ground, cannon;
var EMonster1,EMonster2;
var balls=[]


function preload(){
  backgroundImg = loadImage("background.jfif");
  towerImage = loadImage("tower.png");
  EMonster1 = loadImage("Evil_monster.gif");
  EMonster2 = loadImage("Evil-monster2.gif");
}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;

  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
  
 EvilG = new Group()

}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  Evilmonsters()
 
  rect(ground.position.x, ground.position.y, width * 2, 1);
  
  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();

  

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    CollisionWithMonster(i)
  }

  cannon.display();
}

function CollisionWithMonster(index){
  for(var i=0;i<Evilmonsters.length;i=i+1){
    if(balls[index] !==undefined &&  Evilmonsters[i] !==undefined){
    var collision=Matter.SAT.collides(balls[index].body,Evilmonsters[i].body)
    if(collision.collides){
      Evilmonsters[i].remove();
     Matter.World.remove(world,balls[index].body)
     delete balls[index];
    }
    }
  }
}

function Evilmonsters(){
  if (frameCount % 60 === 0){
    var evilmonster = createSprite(600,195,10,40);
    //evilmonster.velocityX = -(6 + score/100);

     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: evilmonster.addImage(EMonster1);
               break;
       case 2: evilmonster.addImage(EMonster2);
       default: break;
     }
          
     evilmonster.scale = 0.5;
     evilmonster.lifetime = 300;
  
     EvilG.add(evilmonster);
  }
 }



function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    if(ball.body.position.x>=width || ball.body.position.y>=height-50){
      ball.remove(index)
    }
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}


