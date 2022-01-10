var bg
var player,playerImage,playerShooting
var zombie , zombieImage
var zombieGroup
var bullet , bulletImage ,bulletGroup

function preload(){
  bg = loadImage("assets/bg.jpeg")
  playerImage = loadImage("assets/shooter_2.png")
  playerShooting = loadImage("assets/shooter_3.png")
  zombieImage = loadImage("assets/zombie.png")
  bulletImage = loadImage("assets/bullet.png")
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  
// creating player sprite
player=createSprite(100,600,20,20)
player.addImage(playerImage)
player.scale=0.5



// create group for the zombie
zombieGroup=new Group()
bulletGroup=new Group()


}



function draw() {
  background(bg);  
  drawSprites();
  createZombie();
  bulletShoot();

if(keyDown("UP_ARROW")){
  player.y-=5
}

if(keyDown("DOWN_ARROW")){
  player.y+=5
}

if(bulletGroup.isTouching(zombieGroup)){
  bulletGroup.destroyEach()
  zombieGroup[0].destroy()
}

}


function createZombie(){
    if(frameCount%60===0){
      zombie=createSprite(windowWidth-50,random(0,600),30,30)
      zombie.addImage(zombieImage)
      zombie.velocityX=-5;
      zombie.scale=0.20;
      zombie.lifetime=300
      zombieGroup.add(zombie)
      zombie.debug=true
      zombie.setCollider("rectangle",0,0,400,1000)
    }
}

function bulletShoot(){
    if(keyWentDown("space")){
      bullet=createSprite(player.x,player.y,20,20)
      bullet.addImage(bulletImage)
      bullet.scale=0.067
      bullet.velocityX=10;
      bulletGroup.add(bullet)
      bullet.debug=true
      bullet.setCollider("rectangle",0,0,300,300)
      
      bullet.depth=player.depth;
      player.depth+=1

      player.addImage(playerShooting)
    }

    else if(keyWentUp("space")){
      player.addImage(playerImage)
    }
}