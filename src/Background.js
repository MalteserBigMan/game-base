import Layer from './Layer'
import skyImage from './assets/Layers/sky_layer.png'
import middleImage from './assets/Layers/middle_layer.png'
import foregroundImage from './assets/Layers/foreground_layer.png'

export default class{
    constructor(game){
        this.game = game
        const background = new Image()
        background.src = skyImage
        this.skyLayer = new Layer(this.game, background, 1760, 512, 0.2, -45)
        const middle = new Image()
        middle.src = middleImage
        this.middleLayer = new Layer(this.game, middle, 1760, 512, 0.4, -165 )
        const foreground = new Image()
        foreground.src = foregroundImage
        this.foregroundLayer = new Layer(this.game, foreground, 1760, 512, 0.8)
        this.layers = [
            this.skyLayer,
            this.middleLayer,
            this.foregroundLayer
        ]
        
    }

    update() {
        this.layers.forEach((layer) => layer.update())
    }

    draw(context) {
        this.layers.forEach((layer) => layer.draw(context))
    }
}