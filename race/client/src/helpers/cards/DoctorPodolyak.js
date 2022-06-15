import Card from "./Card.js"
export default class DoctorPodolyak extends Card {
    constructor(scene) {
        super(scene);
        this.name = "doctor-podolyak";
        this.playerCardSprite = "doctor-podolyak";
        this.opponentCardSprite = "doctor-podolyak";
    }
}