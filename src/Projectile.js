export default class Projectile {
  constructor(game, x, y) {
      this.game = game
      this.width = 4
      this.height = 4
      this.x = x
      this.y = y
      this.speed = 1000
      this.damage = 1
      this.groundslam = this.y + 20
      this.markedForDeletion = false
    }
    update() {
      this.x += this.speed
      if (this.groundslam > this.game.width) {
        this.markedForDeletion = true
      }
    }
    draw(context) {
      context.fillStyle = '#ff0'
      context.fillRect(this.x, this.y, this.width, this.height)
    }
}