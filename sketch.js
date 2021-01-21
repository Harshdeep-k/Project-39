var PLAY=1;
var END=0;
var monkey , monkey_running, ground;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup,bananaGroup;
var score=0,survivalTime;
var gameState=PLAY;
var bg,backg;
var x=1;

function preload()
{
    backg=loadImage("jungle.jpg");
    monkey_running =loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("stone.png");
 
}



function setup() 
{
    createCanvas(600,500);
    bg=createSprite(300,250);
    bg.addImage(backg);
    bg.scale=1.5;
   // bg.velocityX=-5;
 
    monkey=createSprite(50,320,20,40);
    monkey.addAnimation("running",monkey_running);
    monkey.scale=0.12;

    ground=createSprite(400,480,900,50);
    ground.x=ground.width/2;
    ground.shapeColor="brown";
    ground.visible=false;
    
    foodGroup=new Group();
    obstaclesGroup=new Group();
}


function draw() 
{
  background("black");
  camera.y=monkey.y-120;
  camera.x=monkey.x+200;
  if(gameState===PLAY)
  {
    
      background("black");
    
      if(keyDown("space")&& monkey.y>80)
      {
         monkey.velocityY=-14;
      }

     
      ground.x=monkey.x;
      monkey.velocityY=monkey.velocityY+0.5;

      if(keyDown("right"))
      {
         monkey.x=monkey.x+10;
      }
  
      if(monkey.x>500*x)
      {
        bg=createSprite(300+(500*x),250);
        bg.addImage(backg);
        bg.scale=1.5
        x+=1;
        monkey.depth=bg.depth;
        monkey.depth+=1;
      }
    
      if(monkey.isTouching(foodGroup))
      {
        foodGroup.destroyEach();
        score=score+2;
      }
    
     survivalTime=Math.round(frameCount/100);
      bananas();
      obstacles();

      if(monkey.isTouching(obstaclesGroup))
      {
         gameState=END;
        monkey.scale=0.12;
      }
      switch(score)
    {
      case 10: monkey.scale=0.12;
        break;
      case 20: monkey.scale=0.14;
        break;
      case 30: monkey.scale=0.16;
        break;
      case 40: monkey.scale=0.18;
        break;
        
    }
    drawSprites();
    textSize(20);
    fill("black");
    stroke("red");
    strokeWeight(2);
    text("Press right arrow key to go inside the jungle and space to jump",-30,monkey.y-300);
  }
  else if(gameState===END)
  {
     // background("black");
      //bg.velocityX=0;
      obstaclesGroup.setLifetimeEach(-1);
      foodGroup.setLifetimeEach(-1);
      textSize(50);
      stroke("yellow");
      strokeWeight(1);
      fill("purple");
      text("Game Over",monkey.x+30,monkey.y-150);
  }
  
  monkey.collide(ground);

 
    
  fill("black");
  textSize(25);
  stroke("red");
  strokeWeight(2);
  text("Survival time:"+survivalTime,monkey.x+150,monkey.y-250);
  text("Score: "+score,monkey.x,monkey.y-250);

}

function bananas()
{
  if(frameCount%80===0)
    {
      var banana=createSprite(monkey.x+150,350,20,20);
      
      banana.y=random(200,300);
      banana.scale=0.08;
      banana.rotation=-30;
      banana.addImage("banana",bananaImage);
      //banana.velocityX=-5;
      banana.lifetime=400;
      foodGroup.add(banana);
    }
}

function obstacles()
{
  if(frameCount%300===0)
    {
      var obstacle=createSprite(monkey.x+200,430,20,20);
      obstacle.scale=0.2;
      obstacle.rotation=5;
      obstacle.addImage("stone",obstacleImage);
      //obstacle.velocityX=-5;
      obstacle.lifetime=400;
      obstaclesGroup.add(obstacle);
    }
}




