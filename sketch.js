//Create variables here
var dog,dogImg,bottleImg;
//var happDog,happyDogImg;
var foodS;

var fedTime;
var lastFed;
var feedDog;
var addFood;

var database;

var foodObj;

function preload()
{
  //load images here
  dogImg=loadImage("Dog.png");
  happyDogImg=loadImage("happydog.png");
  bottleImg=loadImage("Milk.png");
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database()

    dog = createSprite(250,300,150,150);
    dog.addImage(dogImg);
    dog.scale=0.15;
    
    feed=createButton("Feed the dog");
    feed.position(500,150);
    feed.mousePressed(feedDog);

    addFood=createButton("Add food");
    addFood.position(600,150);
    addFood.mousePressed(addFoods);
 
    foodStock=database.ref('food');
    foodStock.on("value",readStock);

    
  
  
}


function draw() {  
  background(46,136,87);

  
  /*if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }*/
  drawSprites();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed:" +lastFed%12+ "PM" ,350,30);
  }else if (lastFed==0){
    text("Last Fed : 12 AM",350,30);
  }else{
    text("Last Fed : "+lastFed + lastFed + "AM",160,75);
  }
  
  /*fill(255,255,254);
  text(mouseX+ "," +mouseY, mouseX,mouseY);
  text ("Food remaining : "+foodS,200,200);
  stroke("black");
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
  add styles here*/

}
function readStock (data){
  foodS = data.val ();
}
function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref("/").update({
    food:x
  })
}

function feedDog (){
  dog.addImage(happyDog);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

