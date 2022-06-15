import Card from "./Card.js"
export default class SpaceStone extends Card {
    constructor(scene) {
        super(scene);
        this.name = "spaceStone";
        this.playerCardSprite = "spaceStone";
        this.opponentCardSprite = "spaceStone";
    }
}