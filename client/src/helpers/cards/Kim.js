import Card from "./Card.js"
export default class Kim extends Card {
    constructor(scene) {
        super(scene);
        this.name = "kim";
        this.playerCardSprite = "kim";
        this.opponentCardSprite = "kim";
    }
}