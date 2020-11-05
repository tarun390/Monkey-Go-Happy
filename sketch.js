var PLAY=1;
var END=0;
var gameState=PLAY;
var player,player_running;
var jungle,backImage;
var insGround;
var bananasGroup,banana_image;
var obstaclesGroup1,obstacle_image;
var score;

function preload() {
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  backImage = loadImage("jungle.jpg");
  
  banana_image = loadImage("banana.png");
  
  obstacle_image = loadImage("stone.png");
}

function setup() {
  createCanvas(600, 200);
  
  jungle = createSprite(300,10,600,200);
  jungle.addImage("scrolling",backImage);
  jungle.VelocityX=-4
  jungle.x = jungle.width/3;
  
  player = createSprite(50,180,20,50);
  player.addAnimation("escaped",player_running);
  player.scale=0.1
  
  invGround = createSprite(200,190,400,10);
  invGround.visible=false
  
  score=0;
  score.depth=
  
  bananasGroup = new Group();
  obstaclesGroup1 = new Group();
  
}       

function draw() {
  background(220);
  stroke("red");
  fill("red");
  textSize(14);
  text("Score: "+ score, 500,50);
  text("GAME OVER",250,100);
  
  if(gameState === PLAY){
    
     jungle.velocityX = -10;
    
    if(jungle.x < 0){
      jungle.x = jungle.width/4;
    }
    
    if(keyWentDown("space")){
      player.velocityY = -12 ;
    }
    
    player.velocityY = player.velocityY + 0.8;
    
    player.collide(invGround);
    
    switch(score){
      case 10:player.scale=0.12;
              break;
      case 20:player.scale=0.14;
              break;
      case 30:player.scale=0.16;
              break;
      case 40:player.scale=0.18;
              break;
      default:break;
    }
    
    callBanana();
    
    callStone();
    
    edge = createEdgeSprites();
    player.collide(edge[0])
    
    if (bananasGroup.isTouching(player)){
      bananasGroup.destroyEach();
      score=score+1
    }
    
    if(obstaclesGroup1.isTouching(player)){
      player.scale=0;
      gameState=END
    }
  }
  
  else if(gameState===END){
    jungle.velocityX = 0;
    player.scale=0.7;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);
  }
   drawSprites();
}
 
function callBanana(){
  
  if(World.frameCount % 190 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.addImage("food",banana_image);
    banana.y = Math.round(random(80,120));
    banana.scale = 0.05;
    banana.velocityX = -3;
    banana.lifetime = 300;
    bananasGroup.add(banana);
  }
}

function callStone(){
  if (World.frameCount % 60 === 0){
    var stone1 = createSprite(600,165,10,40);
    stone1.addImage("obby",obstacle_image);
    stone1.velocityX = -11;          
    stone1.scale = 0.2;
    stone1.lifetime = 300;
    obstaclesGroup1.add(stone1);
  }
}
 

