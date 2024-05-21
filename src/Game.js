import UserInterface from './UserInterface.js'
import Player from './Player.js'
import InputHandler from './InputHandler.js'
import Slime from './Pumpkin.js'
import Platform from './Platform.js'
import Camera from './Camera.js'
import Granne from './Granne.js'
import Background from './Background.js'
import Highscore from './Highscore.js'
export default class Game {
  constructor(width, height) {
    this.hasinputname = false
    this.width = width
    this.height = height
    this.input = new InputHandler(this)
    this.background = new Background(this)
    this.keys = []
    this.gameOver = false
    this.doTheHighscoreThing = false
    this.gravity = 0.5
    this.debug = false
    this.player = new Player(this)
    this.enemies = [(new Slime(this, 400, 350)),
    (new Slime(this, 200, 350)),
    (new Slime(this, 700, 350)),
    (new Slime(this, 1500, 350)),
    (new Slime(this, 1300, 350)),
    (new Slime(this, 1100, 350))]
    this.speed = 1;
    this.enemyTimer = 0
    this.enemyInterval = 1000
    this.ui = new UserInterface(this)
    this.gameTime = 0
    this.ground = this.height - 100
    this.canSpawnEnemy = true;
    this.camera = new Camera(this, this.player.x, this.player.y, 0, 100)
    this.platforms = [
      new Platform(this, 0, this.ground, this.width * 20, 200),
    ]
    this.score = 0
    this.name = "def"
    this.highscore = new Highscore(this)
    this.highscore.testApi()

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
    if (!this.gameOver) {
      this.player.update(deltaTime)
      if (this.enemyTimer > this.enemyInterval && !this.gameOver) {

        this.enemyTimer = 0
      } else {
        this.enemyTimer += deltaTime
      }

      this.background.update()


      this.camera.update(this.player)
      this.gameTime += deltaTime


      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime)
        if (this.checkCollision(this.player, enemy)) {
          enemy.hp--
        }
        this.player.projectiles.forEach((projectile) => {
          if (this.checkCollision(projectile, enemy)) {
            projectile.markedForDeletion = true
            enemy.hp--
            // if (enemy.hp <= 0) {
            //   enemy.markedForDeletion = true
            // }
          }
        })
        if (enemy.hp <= 0) {

          enemy.frameY = 1
          if (enemy.frameY === 1 && enemy.frameX == 3) {
            enemy.dead++
          }

          if (enemy.dead === 1) {
            enemy.markedForDeletion = true
          }
        }
        if (enemy.markedForDeletion) {
          this.score += 10
        }
      })
      if (this.enemies === undefined || this.enemies.length == 0) {
        this.gameOver = true
        console.log(this.enemies)
        this.highscore.postScore(this.score)
        this.highscore.getScore()
      }

    }

    if (this.doTheHighscoreThing = true) {

    }


    if (this.enemyTimer > this.enemyInterval && !this.gameOver && this.canSpawnEnemy) {
      this.enemyTimer = 0;
      this.canSpawnEnemy = false;
    } else {
      this.enemyTimer += deltaTime;
    }

    this.enemies.forEach((enemy) => enemy.update(deltaTime))
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)


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
 



  draw(context) {
    this.background.draw(context)
    this.ui.draw(context)
    this.camera.apply(context)
    this.platforms.forEach((platform) => platform.draw(context))
    this.enemies.forEach((enemy) =>
      enemy.draw(context)
    )
    this.player.draw(context)
    this.camera.reset(context)
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

  // export function getScore(element) {
  //   const url = "http://localhost:3000"
  //   throttleFetch(`${url}/score`)
  //     .then((response) => response.text())
  //     .then((text) => {
  //       console.log(text)
  //       const scores = JSON.parse(text)
  //       const list = document.createElement("ul")
  //       scores.forEach((score) => {
  //         const item = document.createElement("li")
  //         item.textContent = `${score.name}: ${score.score}`
  //         list.appendChild(item)
  //       })
  //       element.appendChild(list)
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })


}


