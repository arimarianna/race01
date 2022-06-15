import Card from "./Card.js"
export default class PantherHabit1 extends Card {
    constructor(scene) {
        super(scene);
        this.name = "panther-habit-1";
        this.playerCardSprite = "panther-habit-1";
        this.opponentCardSprite = "panther-habit-1";
    }
}