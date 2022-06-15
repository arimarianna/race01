import Card from "./Card.js"
export default class DavidBanner extends Card {
    constructor(scene) {
        super(scene);
        this.name = "davidBanner";
        this.playerCardSprite = "davidBanner";
        this.opponentCardSprite = "davidBanner";
    }
}