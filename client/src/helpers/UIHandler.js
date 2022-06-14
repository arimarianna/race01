import ZoneHandler from "./ZoneHandler"

export default class UIHandler {
    constructor(scene) {
        this.zoneHandler = new ZoneHandler(scene)

        this.buildZones = () => {
            scene.dropZone = this.zoneHandler.renderZone(640, 160)
            this.zoneHandler.renderOutline(scene.dropZone)
        }

        this.buildPlayerAreas = () => {
            scene.playerHandArea = scene.add.rectangle(367+546/2, 470+333/2, 546, 333)
            scene.playerHandArea.setStrokeStyle(4, 0xB6AD81)
            scene.DeckArea = scene.add.rectangle(15+216/2, 608+348/2, 216, 348)
            scene.DeckArea.setStrokeStyle(3, 0x49A632)
            scene.playerDropArea = scene.add.rectangle(640+304/2, 160+286/2, 304, 286, 0xB6AD81)
            scene.playerDropArea.setStrokeStyle(1, 0x000)
        
            scene.opponentHandArea = scene.add.rectangle(302+397/2, -200+333/2, 397, 333)
            scene.opponentHandArea.setStrokeStyle(4, 0xF21D2F)
            scene.opponentDropArea = scene.add.rectangle(336+304/2, 160+286/2, 304, 286, 0xB6AD81)
            scene.opponentDropArea.setStrokeStyle(1, 0x000)
        }
        this.buildGameText = () => {
            scene.dealText = scene.add.text(1060, 17, ['DEAL CARDS'], {fontFamily: 'Montserrat', fontSize: 30, color: '#2651A6', fontStyle: 'bold'})
            .setInteractive()
        }
        this.buildUI = () => {
            this.buildGameText()
            this.buildZones()
            this.buildPlayerAreas()
        }
    }
}