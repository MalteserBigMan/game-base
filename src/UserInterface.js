export default class UserInterface {
    constructor(game) {
      this.game = game
      this.fontSize = 25
      this.fontFamily = 'Arial'
      this.color = 'white'
    }
    draw(context) {
        context.save()
        context.fillStyle = this.color
        context.shadowOffsetX = 2
        context.shadowOffsetY = 2
        context.shadowColor = 'black'
        context.textAlign = 'left'
        context.font = `${this.fontSize}px ${this.fontFamily}`
        context.fillText(
          `Time: ${(this.game.gameTime * 0.001).toFixed(1)}`,
          20,
          100
        )
        if (this.game.gameOver) {
            context.textAlign = 'center'
            context.font = `50px ${this.fontFamily}`
            context.fillText(
              'Game Over',
              this.game.width / 2,
              this.game.height / 2 - 20
            )
          }
          if (this.game.debug) {
        }

        context.restore()
      }
    }