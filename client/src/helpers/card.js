export default class Card {
    constructor(scene) {
        this.render = (x, y, sprite, frame) => {
            let card = scene.add.image(x, y, sprite, frame).setInteractive()
            scene.input.setDraggable(card)
            return card
        }
    }
}