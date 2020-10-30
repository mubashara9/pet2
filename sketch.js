//Create variables here
var dog, database;
var foodS, foodStock, dogimg, happydogimg;

var feedB, addFoodB;

var fedTime, foodObj
var lastFed

function preload()
{
  //load images here
  dogimg = loadImage("images/dogImg.png");
  happydogimg = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  database= firebase.database();
  dog = createSprite(250,350,50,50);
  dog.addImage(dogimg);

 // happydog = createSprite(300,350,50,50);
  
  dog.scale = 0.3
  foodStock= database.ref('Food');
  foodStock.on("value",readStock);

  foodObj = new Food();

  feedB = createButton('Feed');
 addFoodB = createButton('Add Food');

 feedB.mousePressed(feedDog);
 addFoodB.mousePressed(addFoodS)  //don't know addFoodS and feedDog

feedB.position(350,100);
addFoodB.position(100,150);

}


function draw() {  
background(46,139,87);


textSize(20);
fill("yellow");
noStroke();
//text("Note: Press UP arrow to feed the dog", 100,100)

text("Foodcount: "+foodS,100,50)
  
  //add styles here

  foodObj.display();

  fedTime= database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last fed: "+lastFed%12+" PM",400,30)
  }
  else if(lastFed===0){
    text("Last fed: 12 AM",400,30)
  }
  else{
    text("Last fed: "+lastFed+" AM",400,30)
  }
  drawSprites();
}

function readStock(data){
  foodS = data.val()
  foodObj.updateFoodStock(foodS)
}



function feedDog(){
  dog.addImage(happydogimg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoodS(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}