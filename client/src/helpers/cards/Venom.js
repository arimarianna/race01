import Card from "./Card.js"
export default class Venom extends Card {
    constructor(scene) {
        super(scene);
        this.name = "venom";
        this.playerCardSprite = "venom";
        this.opponentCardSprite = "venom";
    }
}