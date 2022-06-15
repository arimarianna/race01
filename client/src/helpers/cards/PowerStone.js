import Card from "./Card.js"
export default class PowerStone extends Card {
    constructor(scene) {
        super(scene);
        this.name = "powerStone";
        this.playerCardSprite = "powerStone";
        this.opponentCardSprite = "powerStone";
    }
}