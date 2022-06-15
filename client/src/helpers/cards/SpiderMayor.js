import Card from "./Card.js"
export default class SpiderMayor extends Card {
    constructor(scene) {
        super(scene);
        this.name = "spiderMayor";
        this.playerCardSprite = "spiderMayor";
        this.opponentCardSprite = "spiderMayor";
    }
}