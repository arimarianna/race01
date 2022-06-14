import Card from "./Card.js"
export default class MindStone extends Card {
    constructor(scene) {
        super(scene);
        this.name = "mind-stone";
        this.playerCardSprite = "mind-stone";
        this.opponentCardSprite = "mind-stone";
    }
}