import Card from "./Card.js"
export default class IronSpiderArmor extends Card {
    constructor(scene) {
        super(scene);
        this.name = "ironSpiderArmor";
        this.playerCardSprite = "ironSpiderArmor";
        this.opponentCardSprite = "ironSpiderArmor";
    }
}