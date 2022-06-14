import Card from "./Card.js"
export default class Mjolnir extends Card {
    constructor(scene) {
        super(scene);
        this.name = "mjolnir";
        this.playerCardSprite = "mjolnir";
        this.opponentCardSprite = "mjolnir";
    }
}