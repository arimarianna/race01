import Card from "./Card.js"
export default class TimeStone extends Card {
    constructor(scene) {
        super(scene);
        this.name = "time-stone";
        this.playerCardSprite = "time-stone";
        this.opponentCardSprite = "time-stone";
    }
}