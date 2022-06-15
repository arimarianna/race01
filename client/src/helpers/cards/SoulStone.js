import Card from "./Card.js"
export default class SoulStone extends Card {
    constructor(scene) {
        super(scene);
        this.name = "soulStone";
        this.playerCardSprite = "soulStone";
        this.opponentCardSprite = "soulStone";
    }
}