import Card from "./Card.js"
export default class AntiVenom extends Card {
    constructor(scene) {
        super(scene);
        this.name = "anti-venom";
        this.playerCardSprite = "anti-venom";
        this.opponentCardSprite = "anti-venom";
    }
}