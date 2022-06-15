import Card from "./Card.js"
export default class TransparentPortal1 extends Card {
    constructor(scene) {
        super(scene);
        this.name = "transparent-portal-1";
        this.playerCardSprite = "transparent-portal-1";
        this.opponentCardSprite = "transparent-portal-1";
    }
}