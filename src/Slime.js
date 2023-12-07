import Enemy from './Enemy'

export default class Slime extends Enemy {
  constructor(game, x ,y) {
    super(game)
    this.width = 32
    this.height = 32
    this.x = x
    this.y = y
    this.speedX = 0
    this.lives = 2
    this.color = '#fff'
  }
}