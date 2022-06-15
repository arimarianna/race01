import Card from "./Card.js"
export default class DavidBanner extends Card {
    constructor(scene) {
        super(scene);
        this.name = "david-banner";
        this.playerCardSprite = "david-banner";
        this.opponentCardSprite = "david-banner";
    }
}