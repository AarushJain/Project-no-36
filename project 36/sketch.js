//Create variables here
var dogImg, happyDogImg, database, foodS, foodStock;
var dog;
var foodStock, lastFed, feedTime;
var foodObject;
var foodOBG;
var bedroom, garden, washroom;

function preload()
{
  dogImg=loadImage("sprites/dogImg.png");
  happyDogImg=loadImage("sprites/dogImg1.png");

  bedroomImg=loadImage("sprites/Bed Room.png");
  gardenImg=loadImage("sprites/Garden.png");
  washroomImg=loadImage("sprites/Wash Room.png");


	//load images here
}

function setup() {
  createCanvas(500, 500);

  database=firebase.database();
  console.log(database);

  readState=database.ref('gameState');
  readState.on("value",function(data){
  gameState=data.val();  


  foodStock=database.ref('food');
  foodStock.on("value",readStock);
   console.log(foodStock+"hello")

  foodOBG= new Food();

  dog=createSprite(250,250,50,50);
  dog.addImage("dogImg",dogImg);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95)
  feed.mousePressed(feedDog);

  addFood=createButton("add food")
  addFood.position(800,95)
  addFood.mousePressed(addFoodS);

  bedroom=createSprite(-500,-500);
  bedroom.addImage("bedroomImg",bedroomImg);
  
  garden=createSprite(-500,-500);
  garden.addImage("gardenImg",gardenImg);
  
  washroom=createSprite(-500,-500);
	washroom.addImage("washroomImg",washroomImg);


})}


  function draw() {  
  background(46, 139, 87)
  
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

    textSize(20);
    fill("white");
    text("Foodstock Left: "+foodS, 295, 100);

    fill(255,255,254);
    textSize(15);
    
    if(lastFed>=12){
     text("last feed :"+ lastFed%12 + " PM" , 350,30)

    }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
    }
    else{
    text("Last Feed : "+ lastFed + " AM", 350,30)  
    }

    currentTime=hour();

    if(currentTime==(lastFed+1)){
    update("playing")
    console.log("hello")
    foodOBG.garden();  
    }
    
    else if(currentTime==(lastFed+2)){
    update("sleeping")
    foodOBG.bedroom();  
    }

    else if(currentTime>(lastFed) && currentTime<=(lastFed+4)){
      update("bathing")
      foodOBG.washroom();  
      }

    else{update("hungry")
    foodOBG.display();}

    if(gameState!="hungry"){
     feed.hide()
     addFood.hide()
     dog.remove() 
    }
    else{
    feed.show();
    addFood.show();
    dog.addImage(happyDogImg)
    }
    
    drawSprites();


}
  function readStock(data){
  foodS=data.val(); 
  foodOBG.updateFoodStock(foodS);
}

  
function addFoodS(){
database.ref("/").update({
food:foodS  
})
foodS++  
}

function feedDog(){

dog.addImage(dogImg)

if(foodOBG.getFoodStock()<=0){
foodOBG.updateFoodStock(foodOBG.getFoodStock()*0)

}
else{
  foodOBG.updateFoodStock(foodOBG.getFoodStock()-1)
}

database.ref("/").update({
FeedTime:hour(),
food:foodOBG.getFoodStock()
})
}

function update(state){
database.ref('/').update({
gameState:state  
});
}