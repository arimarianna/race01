import Card from "./Card.js"
export default class PowerStone extends Card {
    constructor(scene) {
        super(scene);
        this.name = "power-stone";
        this.playerCardSprite = "power-stone";
        this.opponentCardSprite = "power-stone";
    }
}