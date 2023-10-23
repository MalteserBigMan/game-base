import UserInterface from './UserInterface.js'
import Player from './Player.js'
import InputHandler from './InputHandler.js'
import Slime from './Slime.js'
import Platform from './Platform.js'
export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.input = new InputHandler(this)
    this.keys = []
    this.enemies = []
    this.gameOver = false
    this.gravity = 1
    this.debug = false
    this.player = new Player(this)
    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 1000
    this.ui = new UserInterface(this)
    this.gameTime = 0
    this.platforms = [
      new Platform(this, 0, this.ground, this.width, 100)
    ]
  }

  checkCollision(object1, object2) {
    return (
      object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.height + object1.y > object2.y
    )
  }


  update(deltaTime) {
    this.player.update(deltaTime)
    if (!this.gameOver) {
      this.gameTime += deltaTime
      if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
        this.addEnemy()
        this.enemyTimer = 0
      } else {
        this.enemyTimer += deltaTime
      }
      this.enemies.forEach((enemy) => enemy.update(deltaTime))
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)


      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime)
        if (this.checkCollision(this.player, enemy)) {
          enemy.markedForDeletion = true
        }
        this.player.projectiles.forEach((projectile) => {
          if (this.checkCollision(projectile, enemy)) {
            projectile.markedForDeletion = true
            enemy.hp--
            console.log(enemy.hp)
            if (enemy.hp <= 0){
              enemy.markedForDeletion = true 
          } 
          }
        })
      })
    }
    this.platforms.forEach((platform) => {
      if (this.checkPlatformCollision(this.player, platform)) {
        this.player.speedY = 0
        this.player.y = platform.y - this.player.height
        this.player.grounded = true
      }
      this.enemies.forEach((enemy) => {
        if (this.checkPlatformCollision(enemy, platform)) {
          enemy.speedY = 0
          enemy.y = platform.y - enemy.height
        }
      })
    })
  }
  addEnemy() {
    this.enemies.push(new Slime(this))
  }
  draw(context) {
    this.player.draw(context)
    this.enemies.forEach((enemy) => enemy.draw(context))
    this.ui.draw(context)
    this.platforms.forEach((platform) => platform.draw(context))
  }
  checkPlatformCollision(object, platform) {
    if (
      object.y + object.height >= platform.y &&
      object.y < platform.y &&
      object.x + object.width >= platform.x &&
      object.x <= platform.x + platform.width
    ) {
      if (object.grounded && object.y + object.height > platform.y) {
        object.speedY = 0
        object.y = platform.y - object.height
        object.grounded = true
      }
      return true
    } else {
      if (object.grounded && object.y + object.height < platform.y) {
        object.grounded = false
      }
      return false
    }
  }

}


