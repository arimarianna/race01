
import io from 'socket.io-client';

import GameHandler from '../helpers/GameHandler'
import UIHandler from '../helpers/UIHandler';
import CardHandler from '../helpers/CardHandler';
import DeckHandler from '../helpers/DeckHandler';
import InteractiveHandler from '../helpers/InteractiveHandler';
import SocketHandler from '../helpers/SocketHandler';

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        this.load.atlas('playerCards', 'src/assets/atlas/cards.png', 'src/assets/atlas/playerCards.json');
        this.load.atlas('subjectCards', 'src/assets/atlas/cards.png', 'src/assets/atlas/subjectCards.json');
        this.load.atlas('sublectCardBack', 'src/assets/atlas/cards.png', 'src/assets/atlas/subjectCardBack.json');

        this.load.atlas('cards', 'src/assets/atlas/cards.png', 'src/assets/atlas/cards.json');
        this.load.webfont('Montserrat', 'https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Poppins:wght@300&display=swap');
    }

    create() {
        this.UIHandler = new UIHandler(this)
        this.UIHandler.buildUI()
        this.CardHandler = new CardHandler()
        this.SocketHandler = new SocketHandler(this)
        this.DeckHandler = new DeckHandler(this)
        this.GameHandler = new GameHandler(this)
        this.InteractiveHandler = new InteractiveHandler(this)





        // this.socket = io({path:':3000/'});
        this.socket = io('http://127.0.0.1:3000/');
        this.socket.on('connect', () => {
            console.log('Connected!')
        })
        var frames = this.textures.get('cards').getFrameNames();
        let self = this;

        var x = 100;
        var y = 300;
        this.dealCards = () => {
            for (let i = 0; i < 5; i++) {
                let playerCard = new Card(this)
                playerCard.render(x + (i*10), y, 'cards', Phaser.Math.RND.pick(frames))
            }
        }



        // this.dealText.on('pointerdown', () => {
        //     self.dealCards()
        // })

        // this.dealText.on('pointerover', () => {
        //     self.dealText.setColor('#538DFF')
        //     .setFontStyle('bold')
        // })

        // this.dealText.on('pointerout', () => {
        //     self.dealText.setColor('#2651A6')
        //     .setFontStyle('')
        // })



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