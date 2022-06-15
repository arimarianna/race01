import Card from "./Card.js"
export default class NickReznickov extends Card {
    constructor(scene) {
        super(scene);
        this.name = "nickReznickov";
        this.playerCardSprite = "nickReznickov";
        this.opponentCardSprite = "nickReznickov";
    }
}