export default class ZoneHandler {
    constructor(scene) {
        this.renderZone = (x, y) => {
            let dropZone = scene.add.zone(x+304/2, y+286/2, 304, 286).setRectangleDropZone(304, 286);
            dropZone.setData({ cards: 0 });
            return dropZone;
        };
        this.renderOutline = (dropZone) => {
            let dropZoneOutline = scene.add.graphics(); //{tl:5, bl:5} doent work 
            dropZoneOutline.lineStyle(2, 0x2651A6);
            dropZoneOutline.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height)
        }
    }
}