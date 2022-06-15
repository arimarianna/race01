export default class GameHandler {
    constructor(scene) {
        this.gameState = "Initializing";
        this.isMyTurn = false;
        this.canTurn = true;
        this.playerDeck = [];
        this.opponentDeck = [];
        this.playerHand = [];
        this.opponentHand = [];
        this.playerCard;
        this.opponentCard;
        this.playerHealth = 20;
        this.opponentHealth = 20;
        
        this.changeTurn = () => {
            this.isMyTurn = !this.isMyTurn;
            console.log("isMyTurn: " + this.isMyTurn);
        }

        this.notChangeTurn = () => {
            this.isMyTurn = this.isMyTurn;
            console.log("isMyTurn: " + this.isMyTurn);
        }

        this.changeGameState = (gameState) => {
            this.gameState = gameState;
            console.log("GameState: " + this.gameState);
        }
    }
}