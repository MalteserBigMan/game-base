import UserInterface from "./UserInterface"
export default class InputHandler {
  constructor(game) {
    this.game = game
    window.addEventListener('keydown', (event) => {
      console.log(event.key)

      // movement
      if (
        (event.key === 'ArrowUp' ||
          event.key === 'ArrowDown' ||
          event.key === 'ArrowLeft' ||
          event.key === 'ArrowRight') &&
        this.game.keys.indexOf(event.key) === -1
      ) {
        this.game.keys.push(event.key)
      }

      // debug
      if (event.key === 'd') {
        this.game.debug = !this.game.debug
      }
      //Game over
      if (event.key === 'p') {
        this.game.gameOver = true
        console.log(this.game.gameOver)
      }

      // skjuta
      if (event.key === ' ') {
        this.game.player.shoot()
      }
    })
    window.addEventListener('keyup', (event) => {
      if (this.game.keys.indexOf(event.key) > -1) {
        this.game.keys.splice(this.game.keys.indexOf(event.key), 1)
      }
    })
  }
}
