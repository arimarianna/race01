import Card from "./Card.js";

export default class CardBack extends Card {
    constructor(scene) {
        super(scene);
        this.name = "subjectBack";
        this.playerCardSprite = "subjectBack";
        this.opponentCardSprite = "subjectBack";
    }
}