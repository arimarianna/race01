import Card from "./Card.js"
export default class CaptainZelensky extends Card {
    constructor(scene) {
        super(scene);
        this.name = "captain-zelensky";
        this.playerCardSprite = "captain-zelensky";
        this.opponentCardSprite = "captain-zelensky";
    }
}