import Projectile from "./Projectile";
export default class Player {
    constructor(game) {
        this.game = game;
        this.width = 32;
        this.height = 64;
        this.x = 50;
        this.y = 100;
        this.speedX = 0
        this.speedY = 0
        this.maxSpeed = 10
        this.projectiles = []
        this.jumpSpeed = 20
    
    }
    update(deltaTime) {

        if (this.game.keys.includes('ArrowLeft')) {
            this.speedX = -this.maxSpeed;
        } else if (this.game.keys.includes('ArrowRight')) {
            this.speedX = this.maxSpeed;
        } else {
            this.speedX = 0;
        }
        this.projectiles.forEach((projectile) => {
            projectile.update()
        })
        this.projectiles = this.projectiles.filter(
            (projectile) => !projectile.markedForDeletion
        )

        if (this.game.keys.includes('ArrowUp') && this.grounded) {
            this.speedY = -this.jumpSpeed
            this.grounded = false
          }

          if (this.grounded) {
            this.speedY = 0
          } else {
            this.speedY += this.game.gravity
          }


        this.y += this.speedY;
        this.x += this.speedX;


    }
    draw(context) {
        context.fillStyle = '#32CD32';
        context.fillRect(this.x, this.y, this.width, this.height);
        this.projectiles.forEach((projectile) => {
            projectile.draw(context)
        })
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height)
            context.fillStyle = 'black'
            context.font = '12px Arial'
            context.fillText(this.frameX, this.x, this.y - 5)
        }
    }
    shoot() {
        this.projectiles.push(
            new Projectile(this.game, this.x + this.width, this.y + this.height / 2)
        )
    
    } 
}