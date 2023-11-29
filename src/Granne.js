import Enemy from './Enemy'

export default class Granne extends Enemy {
  constructor(game, x ,y) {
    super(game)
    this.width = 32
    this.height = 64
    this.x = x
    this.y = y
    this.speedX = 0
    this.lives = 1
    this.color = '#f0f'
  }
}

//block följer kameran, grafik problem och konstiga hitboxes (borde höra till kameran)