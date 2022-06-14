export default class Card {
    constructor(scene) {
        this.render = (x, y, type, frame) => {
            let sprite;
            let card = scene.add.image(x, y, sprite, frame)
                .setInteractive()
                .setData({
                    name: this.name,
                    type: type,
                    sprite: sprite
                })

            if (type === 'playerCard') {
                scene.input.setDraggable(card)
            }
            return card
        }
    }
}