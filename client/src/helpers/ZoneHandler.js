export default class ZoneHandler {
    constructor(scene) {
        this.renderZone = (x, y) => {
            let dropZone = scene.add.zone(x+608/2, y+286/2, 608, 286).setRectangleDropZone(608, 286);
            dropZone.setData({
                "cards": 0
            });
            return dropZone;
        }
        this.renderOutline = (dropZone) => {
            let dropZoneOutline = scene.add.graphics();
            dropZoneOutline.lineStyle(2, 0x000);
            dropZoneOutline.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height);
            dropZone.setData("outline", dropZoneOutline);
        }
    }
}