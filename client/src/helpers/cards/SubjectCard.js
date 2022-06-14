import Card from "./Card";

export default class SubjectCard extends Card {
    constructor(scene, frame) {
        super(scene);
        this.name = frame.name
    }
}