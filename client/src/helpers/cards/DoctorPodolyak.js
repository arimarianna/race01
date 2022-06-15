import Card from "./Card.js"
export default class DoctorPodolyak extends Card {
    constructor(scene) {
        super(scene);
        this.name = "doctorPodolyak";
        this.playerCardSprite = "doctorPodolyak";
        this.opponentCardSprite = "doctorPodolyak";
    }
}