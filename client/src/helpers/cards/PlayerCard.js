import Card from "./Card";

export default class PlayerCard extends Card {
    constructor(scene, frame) {
        super(scene);
        this.name = frame.name
    }
}