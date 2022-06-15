import Card from "./Card.js"
export default class CaptainZelensky extends Card {
    constructor(scene) {
        super(scene);
        this.name = "captainZelensky";
        this.playerCardSprite = "captainZelensky";
        this.opponentCardSprite = "captainZelensky";
    }
}