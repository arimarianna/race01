export default class GameHandler {
    constructor(scene) {
        this.gameState = 'Initializing'
        this.isMyTurn = false
        this.playerDeck = []
        this.opponentDeck = []
        this.playerHand = []
        this.opponentDeck = []

        this.chabgeTurn = () => {
            this.isMyTurn = !this.isMyTurn
            console.log('is my turn', this.isMyTurn)
        }

        this.changeGameState = (gameState) => {
            this.gameState = gameState
            console.log('Game state', this.gameState)
        }
    }
}