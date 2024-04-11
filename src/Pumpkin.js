import Enemy from './Enemy';
import pumpkinImage from "./assets/sprites/pumpa_animation.png";

export default class Slime extends Enemy {
  constructor(game, x, y) {
    super(game);
    this.width =  128;
    this.height = 128;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.lives = 2;
    this.color = '#fff';

    
    const image = new Image();
    image.src = pumpkinImage;
    this.image = image;
   
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 3;
    this.fps = 2;
    this.timer = 0;
    this.interval = 1000 / this.fps;
    this.flip = false;
    
  }

  update(deltaTime) {
    if (this.hp <= 0) {

      this.frameY === 1
    }    

    if (this.frameY === 0) {
      this.frameX = 0; 
    } else {
      if (this.timer > this.interval) {
        this.frameX++;
        this.timer = 0;


        if (this.frameX >= this.maxFrame) {
          this.frameX = 0;
        }
      } else {
        this.timer += deltaTime;
      }
    }

    
  }


  draw(context) {
    if (this.flip) {
      context.save();
      context.scale(-1, 1);
    }
  

    const sourceX = this.frameX * this.width;
    const sourceY = this.frameY * this.height;

    context.drawImage(
      this.image,
      sourceX,
      sourceY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  
    if (this.flip) {
      context.restore();
    }
  



  }
}
