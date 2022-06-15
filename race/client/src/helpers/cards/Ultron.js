import Card from "./Card.js"
export default class Ultron extends Card {
    constructor(scene) {
        super(scene);
        this.name = "ultron";
        this.playerCardSprite = "ultron";
        this.opponentCardSprite = "ultron";
    }
}