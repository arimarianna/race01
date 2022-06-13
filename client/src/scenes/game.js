import Card from '../helpers/card';
import Zone from '../helpers/zone';
import io from 'socket.io-client';

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        this.load.atlas('playerCards', 'src/assets/atlas/cards.png', 'src/assets/atlas/cards.json');
        this.load.atlas('sublectCards', 'src/assets/atlas/cards.png', 'src/assets/atlas/cards.json');

        this.load.atlas('cards', 'src/assets/atlas/cards.png', 'src/assets/atlas/cards.json');
        this.load.webfont('Montserrat', 'https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Poppins:wght@300&display=swap');
    }

    create() {
        // this.socket = io({path:':3000/'});
        this.socket = io('http://127.0.0.1:3000/');
        this.socket.on('connect', () => {
            console.log('Connected!')
        })
        var frames = this.textures.get('cards').getFrameNames();
        let self = this;

        this.zone = new Zone(this)
        this.dropZone = this.zone.renderZone()
        this.outline = this.zone.renderOutline(this.dropZone)

        var x = 100;
        var y = 300;
        this.dealCards = () => {
            for (let i = 0; i < 5; i++) {
                let playerCard = new Card(this)
                playerCard.render(x + (i*10), y, 'cards', Phaser.Math.RND.pick(frames))
            }
        }

        this.dealText = this.add.text(50, 80, ['DEAL CARDS'])
            .setFontSize(20)
            .setFontFamily('Montserrat')
            .setColor('#2651A6')
            .setInteractive();

        this.dealText.on('pointerdown', () => {
            self.dealCards()
        })

        this.dealText.on('pointerover', () => {
            self.dealText.setColor('#538DFF')
            .setFontStyle('bold')
        })

        this.dealText.on('pointerout', () => {
            self.dealText.setColor('#2651A6')
            .setFontStyle('')
        })

        this.input.on('dragstart', function (pointer, gameObject) {
            self.children.bringToTop(gameObject);
            gameObject.setTint(0xCDCDCD)
        }, this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        // this.input.on('dragenter', function (pointer, gameObject, dropZone) {
        //     graphics.clear();
        //     graphics.lineStyle(2, 0x00ffff);
        //     graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
        // });

        // this.input.on('dragleave', function (pointer, gameObject, dropZone) {
        //     graphics.clear();
        //     graphics.lineStyle(2, 0xffff00);
        //     graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
        // });

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            dropZone.data.values.cards++
            gameObject.x = (dropZone.x - 50) + (dropZone.data.values.cards * 5);

            // gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            gameObject.disableInteractive();
            // gameObject.input.enabled = false;
        });

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
            gameObject.setTint()
            // graphics.clear();
            // graphics.lineStyle(2, 0xffff00);
            // graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
            
        });

        /*
        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });*/
    }

    update() {

    }
}