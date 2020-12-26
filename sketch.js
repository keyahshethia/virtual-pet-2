//Create variables here
var dog,dog1Img,dog2Img,database,foodS,foodStock;
var fedTime,lastFed,foodObj,addFood,feed;
function preload()
{
  dog1Img=  loadImage("images/dogImg.png");
  dog2Img = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  foodObj=new Food();
    foodStock = database.ref('food');
  foodStock.on("value",readStock);
  dog = createSprite(250,250,10,10);
  dog.addImage(dog2Img);
  dog.scale=0.3;
  feed=createButton("Feed Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  addFood=createButton("add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87);
  fill(255,255,254);
  foodObj.display();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  textSize(13);
if(lastFed>=12){
text("Last Feed:"+lastFed%12+"PM",350,30)
}
else if(lastFed===0){
text(";Last Feed : 12AM",350,30);
}else{
text("Last Feed:"+lastFed+"AM",350,30);  
}
drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog (){
  dog.addImage(dog1Img);
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