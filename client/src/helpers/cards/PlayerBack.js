import Card from "./Card.js"
export default class PlayerBack extends Card {
    constructor(scene) {
        super(scene);
        this.name = "playerBack";
        this.playerCardSprite = "playerBack";
        this.opponentCardSprite = "playerBack";
    }
}