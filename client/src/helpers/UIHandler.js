import ZoneHandler from './ZoneHandler';

export default class UIHandler {
    constructor(scene) {

        this.zoneHandler = new ZoneHandler(scene);

        this.buildZones = () => {

            scene.dropZone = this.zoneHandler.renderZone(336, 160);
            this.zoneHandler.renderOutline(scene.dropZone);
        }

        this.buildPlayerAreas = () => {
            // scene.playerHandArea = scene.add.rectangle(470, 860, 850, 230);
            // scene.playerHandArea.setStrokeStyle(4, 0xff69b4);
            // scene.playerDeckArea = scene.add.rectangle(1000, 860, 155, 215);
            // scene.playerDeckArea.setStrokeStyle(3, 0x00ffff);
            
            // scene.opponentHandArea = scene.add.rectangle(470, 135, 850, 230);
            // scene.opponentHandArea.setStrokeStyle(4, 0xff69b4);
            // scene.opponentDeckArea = scene.add.rectangle(1000, 135, 155, 215);
            // scene.opponentDeckArea.setStrokeStyle(3, 0x00ffff);  
        }

        this.buildGameText = () => {
            scene.dealCards = scene.add.text(1060, 17, "Deal Cards").setFontSize(30).setFontFamily('Montserrat');
        }

        this.buildUI = () => {
            this.buildZones();
            this.buildPlayerAreas();
            this.buildGameText();
        }

    }
}