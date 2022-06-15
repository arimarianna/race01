import Card from "./Card.js";

export default class CardStack extends Card {
    constructor(scene) {
        super(scene);
        this.name = "cardStack";
        this.playerCardSprite = "cardStack";
        this.opponentCardSprite = "cardStack";
    }
}