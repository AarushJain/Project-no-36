class Food {
    constructor() {

      this.foodStock=10;
      this.lastFed;
      this.image=loadImage("sprites/Milk.png");
    }
    getFoodStock(){
      return this.foodStock;
    }
    deductFood(){
    if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
    }  
    }
    display(){
      var x=80,y=100;
      imageMode(CENTER);
      image(this.image,720,220,70,70)
      if(this.foodStock>0)
      {
        for (var i = 0; i < this.foodStock; i+=1){
        if(i%10==0)
      {
        x=80
        y=300
      }
      image(this.image,x,y,50,50);
      x=x+20;
      }
      }
    }
    updateFoodStock(foodStock){
    this.foodStock=foodStock;  
    }
    getFeedTime(){
    this.lastFeed=lastFeed;

    }

    bedroom(){
    background(bedroom,550,500)  
    }

    garden(){
    background(garden,550,500) 
    }

    washroom(){
    background(washroom,550,500) 
    }

  }; 