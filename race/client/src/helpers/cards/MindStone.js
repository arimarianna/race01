import Card from "./Card.js"
export default class MindStone extends Card {
    constructor(scene) {
        super(scene);
        this.name = "mindStone";
        this.playerCardSprite = "mindStone";
        this.opponentCardSprite = "mindStone";
    }
}