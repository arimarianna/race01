import Card from "./Card.js"
export default class TimeStone extends Card {
    constructor(scene) {
        super(scene);
        this.name = "timeStone";
        this.playerCardSprite = "timeStone";
        this.opponentCardSprite = "timeStone";
    }
}