export default class Player {
    constructor(game){
        this.game = game;
        this.width = 32;
        this.height = 64;
        this.x = 50;
        this.y = 100;
        this.speedx = 1
        this.speedy = 0
    }
    update(deltaTime) {
    this.x += this.speedx
    }
    draw(context) {
        context.fillStyle = '#f00';
        context.fillRect(this.x, this.y, this.width, this.height);
      }
}