import Projectile from "./Projectile";
import spriteImage from "./assets/sprites/Idle Run (78x58).png"

export default class Player {
    constructor(game) {
        const image = new Image()
        image.src = spriteImage
        this.image = image
        this.game = game;

        this.width = 64;
        this.height = 64;

        this.x = 50;
        this.y = 100;
        this.speedX = 0
        this.speedY = 0
        this.maxSpeed = 5
        this.projectiles = []
        this.jumpSpeed = 12


        const image = new Image()
        image.src = "./src/assets/karaktaren.png"
        this.image = image

        this.frameX = 0
        this.frameY = 1
        this.maxFrame = 8
        this.fps = 5
        this.timer = 0
        this.interval = 1000 / this.fps
        this.flip = false

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
        // sprite animation update
        if (this.timer > this.interval) {
            this.frameX++
            this.timer = 0
        } else {
            this.timer += deltaTime
        }

        // reset frameX when it reaches maxFrame
        if (this.frameX >= this.maxFrame) {
            this.frameX = 0
        }


        this.y += this.speedY;
        this.x += this.speedX;


    }
    draw(context) {
        //context.fillStyle = '#32CD32';
        //context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
        this.projectiles.forEach((projectile) => {
            projectile.draw(context)
        })
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height)
            context.fillStyle = 'black'
            context.font = '12px Arial'
            context.fillText(this.frameX, this.x, this.y - 5)
        }
        if (this.flip) {
            context.save()
            context.scale(-1, 1)
        }

        context.drawImage(
            this.image,
            this.frameX * this.width,
            this.frameY * this.height - 15,
            this.width,
            this.height,
            this.flip ? this.x * -1 - this.width : this.x,
            this.y,
            this.width,
            this.height
        )

        context.restore()
    }
    shoot() {
        this.projectiles.push(
            new Projectile(this.game, this.x + this.width, this.y + this.height / 2)
        )

    }
}