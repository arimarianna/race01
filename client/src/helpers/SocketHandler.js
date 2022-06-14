import io from "socket.io-client";
import SubjectBackCard from "./cards/SubjectBackCard";

export default class SocketHandler {
    constructor(scene) {
        scene.socket = io('http://localhost:3000')

        scene.socket.on('connect', () => {
            console.log('connected!')
            scene.socket.emit('dealDeck', scene.socket.id)
        })


        scene.socket.on('firstTurn', () => {
            scene.GameHandler.changeTurn()
        })

        scene.socket.on('changeGameState', (gameState) => {
            scene.GameHandler.changeGameState(gameState)
            if (gameState === 'Initializing') {
                scene.DeckHandler.dealCard(1000, 860, 'cardBack', 'playerCard')
                scene.DeckHandler.dealCard(1000, 135, 'cardBack', 'opponentCard')
                scene.dealText.setInteractive()
                scene.dealText.setColor('#2651A6')
            }
        })

        scene.socket.on('dealCards', (socketId, cards) => {
            if (socketId === scene.socket.id) {
                for (let i in cards) {
                    let card = scene.GameHandler.playerHand.push(scene.DeckHandler.dealCard(367 + i*173, 470, cards[i], 'playerCard'))
                }
            } else {
                for (let i in cards) {
                    let card = scene.GameHandler.opponentHand.push(scene.DeckHandler.dealCard(302 + i*100, -200, 'subjectBackCard', 'opponentCard'))
                }
            }
        })

        scene.socket.on('cardPlayed', (cardName, SocketId) => {
            if (socketId !== scene.socket.id) {
                scene.GameHandler.opponentHand.shift().sestroy()
                scene.DeckHandler.dealCard(scene.dropZone.x, scene.dropZone.y, cardName, 'opponentCard')
            }
        })
    }
}