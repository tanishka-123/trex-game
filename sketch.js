var trex ,trex_run,trex_collided;
var ground,ground1,groundimg;
var PLAY=1;
var END=0;
var gameState=PLAY;
var count=0;
var gameOver,gameOverimg,restart,restartimg;
function preload(){
  trex_run=loadAnimation("trex1.png","trex3.png","trex4,png");
  trex_collided=loadImage("trex_collided.png");
  groundimg=loadImage("ground2.png");
  gameOverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
  
}
function setup() {
  createCanvas(400, 400);
  trex =createSprite(50, 380,20,50);
  trex.addAnimation("trexrun",trex_run);
  trex.scale=0.5;
  ground = createSprite(200,380,400,20);
  ground.addImage("ground",groundimg);
  ground1 =createSprite(200,390,400,20);
  ground1.visible=false;
  gameOver=createSprite(300,100,20,20);
  gameOver.addImage("game1",gameOverimg);
  restart=createSprite(300,140,20,20);
  restart.addImage("restart",restartimg);
  gameOver.scale=0.5;
  restart.scale=0.5;
  gameOver.visible=false;
  restart.visible=false;
}

function draw() {
  background(220);
  text("score:"+count,500,50);
  trex.collide(ground1);
  if(gameState===PLAY){
    count=count+Math.round(getFrameRate()/60);
  if(keyDown("space")){
    trex.velocityY=-10;
  }
  trex.velocityY=trex.velocityY+0.8;
  if (ground.x<0)
  {ground.x=200;
  }
    spawnClouds();
  spawnObstacles();
  if (obstaclesGroup.isTouching(trex))
  {gamestate=END;}
  }
   else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.addImage("trex_c",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  drawSprites();
}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.addAnimation("trex",trex);
  
  count = 0;
  
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y =Math.round(random (80,120));
    cloud.addImage(cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    CloudsGroup.add(cloud);
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    //generate random obstacles
    var rand = math.round(random(1,6));
    switch(rand){case 1:obstacle.addImage(obstacle1);
        break;case 2:obstacle.addImage(obstacle2);
        break;case 3:obstacle.addImage(obstacle3);
        break;case 4:obstacle.addImage(obstacle4);
        break;case 5:obstacle.addImage(obstacle5);
        break;case 6:obstacle.addImage(obstacle6);
        break;}
    obstacle.setAnimation("obstacle" + rand);
    //assign scale and lifetime to the obstacle       
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
  }
}
 