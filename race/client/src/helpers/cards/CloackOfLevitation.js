import Card from "./Card.js"
export default class CloackOfLevitation extends Card {
    constructor(scene) {
        super(scene);
        this.name = "cloackOfLevitation";
        this.playerCardSprite = "cloackOfLevitation";
        this.opponentCardSprite = "cloackOfLevitation";
    }
}