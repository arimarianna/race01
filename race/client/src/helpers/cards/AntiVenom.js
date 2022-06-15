import Card from "./Card.js"
export default class AntiVenom extends Card {
    constructor(scene) {
        super(scene);
        this.name = "antiVenom";
        this.playerCardSprite = "antiVenom";
        this.opponentCardSprite = "antiVenom";
    }
}