import Card from "./Card.js"
export default class IronSpiderArmor extends Card {
    constructor(scene) {
        super(scene);
        this.name = "iron-spider-armor";
        this.playerCardSprite = "iron-spider-armor";
        this.opponentCardSprite = "iron-spider-armor";
    }
}