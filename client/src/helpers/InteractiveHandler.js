export default class InteractiveHandler {
    constructor(scene) {
        scene.dealText.on('pointerdown', () => {
            scene.socket.emit('dealCards', scene.socket.id)
            scene.dealText.disableInteractive()
        })

        scene.dealText.on('pointerover', () => {
            scene.dealText.setColor('#538DFF')
        })

        scene.dealText.on('pointerout', () => {
            scene.dealText.setColor('#2651A6')
        })

        scene.input.on('dragstart', function (pointer, gameObject) {
            self.children.bringToTop(gameObject);
            gameObject.setTint(0xCDCDCD)
        })

        scene.input.on('dragend', function (pointer, gameObject, dropped) {
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
            gameObject.setTint()
            // graphics.clear();
            // graphics.lineStyle(2, 0xffff00);
            // graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

        })

        scene.input.on('drop', function (pointer, gameObject, dropZone) {
            if (scene.GameHandler.isMyTurn && scene.GameHandler.gameState === 'Ready') {
                gameObject.x = dropZone.x
                gameObject.y = dropZone.y;
                scene.input.setDraggable(gameObject, false)
                scene.socket.emit('cardPlayed', gameObject.data.values.name, scene.socket.id)
            } else {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
            

            // dropZone.data.values.cards++
            // gameObject.x = (dropZone.x - 50) + (dropZone.data.values.cards * 5);

            // // gameObject.x = dropZone.x;
            // gameObject.y = dropZone.y;
            // gameObject.disableInteractive();
            // gameObject.input.enabled = false;
        });
    }
}