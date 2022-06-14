import Card from "./Card.js"
export default class NickReznickov extends Card {
    constructor(scene) {
        super(scene);
        this.name = "nick-reznickov";
        this.playerCardSprite = "nick-reznickov";
        this.opponentCardSprite = "nick-reznickov";
    }
}