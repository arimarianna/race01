import io from 'socket.io-client';

export default class SocketHandler {
    constructor(scene) {

        scene.socket = io('http://localhost:3000/');

        scene.socket.on('connect', () => {
            console.log('Connected!');
            scene.socket.emit('dealDeck', scene.socket.id);
        });

        scene.socket.on('firstTurn', () => {
            scene.GameHandler.changeTurn();
        })

        scene.socket.on('changeGameState', (gameState) => {
            scene.GameHandler.changeGameState(gameState);
            if (gameState === "Initializing") {
                scene.DeckHandler.dealCard(24 + 206 / 2, 608 + 340 / 2, "cardStack", "opponentCard");

                scene.DeckHandler.dealCard(15 + 206 / 2, 617 + 340 / 2, "cardStack", "playerCard");

                scene.dealCards.setInteractive();
                scene.dealCards.setColor('#2651A6');
            }
        });

        scene.socket.on('changeTurn', () => {
            scene.GameHandler.changeTurn();
        })

        scene.socket.on('notChangeTurn', () => {
            scene.GameHandler.changeTurn();
        })

        scene.socket.on('attackerWin', (socketId, healthLost = null) => {
            scene.dealCards.setText('Attacker Won')
            if (health == null) { // i won
                scene.GameHandler.opponentHealth -= healthLost
                scene.opponentHealth.setText(`${scene.GameHandler.opponentHealth} ♥`)
            } else { // i lost
                scene.GameHandler.playerHealth -= healthLost
                scene.playerHealth.setText(`${scene.GameHandler.playerHealth} ♥`)
            }
        })

        scene.socket.on('defenderWin', (socketId, healthLost = null) => {
            scene.dealCards.setText('Defender Won')
        })

        scene.socket.on('dealCards', (socketId, cards, playerCard) => {
            if (socketId === scene.socket.id) {
                scene.playerHealth = scene.add.text(1031, 457, `${scene.GameHandler.playerHealth} ♥`).setFontSize(16).setFontFamily('Anton');
                scene.playerHealth.setColor('#000')
                let pcard = scene.GameHandler.playerCard = scene.DeckHandler.dealCard(1080 + 200 / 2, 447 + 334 / 2, playerCard, 'person')
                for (let i in cards) {
                    let card = scene.GameHandler.playerHand.push(scene.DeckHandler.dealCard(367 + (i * 173) + 200 / 2, 480 + 334 / 2, cards[i], "playerCard"));
                }
            } else {
                scene.opponentHealth = scene.add.text(208, 12, `${scene.GameHandler.opponentHealth} ♥`).setFontSize(16).setFontFamily('Anton');
                scene.opponentHealth.setColor('#000')
                let pcard = scene.GameHandler.playerCard = scene.DeckHandler.dealCard(0 + 200 / 2, 0 + 334 / 2, playerCard, 'person')
                for (let i in cards) {
                    let card = scene.GameHandler.opponentHand.push(scene.DeckHandler.dealCard(302 + (i * 100) + 200 / 2, -200 + 334 / 2, "subjectBack", "opponentCard"));
                }
            }
        })

        scene.socket.on('cardPlayed', (cardName, socketId) => {
            if (socketId !== scene.socket.id) {
                scene.GameHandler.opponentHand.shift().destroy();
                scene.DeckHandler.dealCard((scene.dropZone.x - 110) + (scene.dropZone.data.values.cards * 210), scene.dropZone.y, cardName, "opponentCard");
                scene.dropZone.data.values.cards++;
            }
        })

    }
}