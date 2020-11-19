//Create variables here
var dog, dogImg1,happyDog, database, foodS, foodStock;
var database;
var PressUP_ARROWKeytofeedDragoMilk;

var feed,addFood;
var fedTime, lastFed;
var foodObj;

function preload()
{
  //load images here
  dogImg1=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png")
}

function setup() {

  database= firebase.database();
    console.log("database");

  createCanvas(800,600);
  
  dog=createSprite(250,250,10,10);
  dog.addImage(dogImg1);
  dog.scale=0.15;
  //dog.addImage(happyDog);
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  foodObj=new Food(355,200,20,20);
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87);
  
  foodObj.display();

  drawSprites();
  
  //add styles here
  fill("yellow");
  stroke("black");
  text("Food remaining : "+foodS,200,170);
  textSize(13);
  
  textSize(20);
  fill("blue");
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
       lastFed=data.val();
  });
  
}
function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })

}
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
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



