import Card from "./Card.js"
export default class Ironstovich extends Card {
    constructor(scene) {
        super(scene);
        this.name = "ironstovich";
        this.playerCardSprite = "ironstovich";
        this.opponentCardSprite = "ironstovich";
    }
}