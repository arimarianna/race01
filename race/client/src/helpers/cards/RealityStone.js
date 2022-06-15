import Card from "./Card.js"
export default class RealityStone extends Card {
    constructor(scene) {
        super(scene);
        this.name = "realityStone";
        this.playerCardSprite = "realityStone";
        this.opponentCardSprite = "realityStone";
    }
}