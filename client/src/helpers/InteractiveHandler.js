export default class InteractiveHandler {
    constructor(scene) {

        scene.cardPreview = null;

        scene.dealCards.on('pointerdown', () => {
            scene.socket.emit("dealCards", scene.socket.id);
            
            scene.dealCards.disableInteractive();
        })

        scene.dealCards.on('pointerover', () => {
            scene.dealCards.setColor('#F2CE1B');
        })

        scene.dealCards.on('pointerout', () => {
            scene.dealCards.setColor('#2651A6')
        })

        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        scene.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setTint(0xCDCDCD);
            gameObject.setScale(1.25, 1.25)
            scene.children.bringToTop(gameObject);
        })

        scene.input.on('dragend', (pointer, gameObject, dropped) => {
            gameObject.setTint();
            gameObject.setScale(1, 1)
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        scene.input.on('drop', (pointer, gameObject, dropZone) => {
            if (scene.GameHandler.isMyTurn && scene.GameHandler.gameState === "Ready" && scene.GameHandler.canTurn) {
                gameObject.x = (dropZone.x - 110) + (dropZone.data.values.cards * 210);
                gameObject.y = dropZone.y;
                scene.dropZone.data.values.cards++;
                scene.input.setDraggable(gameObject, false);
                scene.socket.emit('cardPlayed', gameObject.data.values.name, scene.socket.id);
                scene.GameHandler.canTurn = false
            }
            else {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

    }
}