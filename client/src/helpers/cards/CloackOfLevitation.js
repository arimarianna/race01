import Card from "./Card.js"
export default class CloackOfLevitation extends Card {
    constructor(scene) {
        super(scene);
        this.name = "cloack-of-levitation";
        this.playerCardSprite = "cloack-of-levitation";
        this.opponentCardSprite = "cloack-of-levitation";
    }
}