
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var ground;
var PLAY=1;
var END=0;
var gameState = PLAY;
var monkeyendimage;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  ground=createSprite(300,180,600,15);
// invisibleground=createSprite(300,190,600,15);
  monkeyendimage=loadImage("monkey-1.png");
}



function setup() {
  createCanvas(600,200);
monkey=createSprite(50,160,50,70);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
 FoodGroup = new Group();
  obstacleGroup= new Group();
  
  
}


function draw() {
  background("white");
    monkey.collide(ground);
  text("score:"+score,500,60);
  if(gameState===PLAY){
    
    //monkey jumps
  if(keyDown("space")&&monkey.y>=141){
    monkey.velocityY=-10;
  }
    //adding gravity
   monkey.velocityY = monkey.velocityY+0.5;
    
    //adding velocity
   ground.velocityX=-4;
    
  //creating the scrolling ground
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  createEdgeSprites();
console.log(monkey.y);
  createbanana();
  createobstacles();
    
 
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
  score = score+1;
 }
 if(obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
 
  }

    else if(gameState===END){
       ground.velocityX=0;
      monkey.velocityY=0;
       monkey.velocityY = monkey.velocityY+0.5;
      obstacleGroup.setVelocityXEach(0);
      // obstacleGroup.setlifetimeEach(-1);
      monkey.addImage(monkeyendimage);
      
    }
  

drawSprites();

}

function createobstacles(){
 if(frameCount%300===0){
     obstacle= createSprite(300,160,30,30);
 obstacle.addImage(obstacleImage);
   obstacle.scale=0.1;
   obstacle.velocityX=-3;
   obstacle.lifetime=200;
   obstacleGroup.add(obstacle);
 }
}

function createbanana(){
  if(frameCount%80===0){
    
  banana = createSprite(300,Math.round(random(120,160)),30,30);
    banana.addImage( bananaImage);
    banana.scale=0.1;
    banana.velocityX=-4;
    banana.lifetime=150;
    FoodGroup.add(banana);
  }

}