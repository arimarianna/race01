import Card from "./Card.js"
export default class SpaceStone extends Card {
    constructor(scene) {
        super(scene);
        this.name = "space-stone";
        this.playerCardSprite = "space-stone";
        this.opponentCardSprite = "space-stone";
    }
}