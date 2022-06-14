import Card from "./Card.js"
export default class SoulStone extends Card {
    constructor(scene) {
        super(scene);
        this.name = "soul-stone";
        this.playerCardSprite = "soul-stone";
        this.opponentCardSprite = "soul-stone";
    }
}