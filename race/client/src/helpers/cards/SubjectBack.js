import Card from "./Card.js"
export default class SubjectBack extends Card {
    constructor(scene) {
        super(scene);
        this.name = "subjectBack";
        this.playerCardSprite = "subjectBack";
        this.opponentCardSprite = "subjectBack";
    }
}