import Card from "./Card.js"
export default class RealityStone extends Card {
    constructor(scene) {
        super(scene);
        this.name = "reality-stone";
        this.playerCardSprite = "reality-stone";
        this.opponentCardSprite = "reality-stone";
    }
}