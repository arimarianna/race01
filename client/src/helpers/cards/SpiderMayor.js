import Card from "./Card.js"
export default class SpiderMayor extends Card {
    constructor(scene) {
        super(scene);
        this.name = "spider-mayor";
        this.playerCardSprite = "spider-mayor";
        this.opponentCardSprite = "spider-mayor";
    }
}