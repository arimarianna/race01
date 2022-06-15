import CardHandler from '../helpers/CardHandler';
import DeckHandler from '../helpers/DeckHandler';
import GameHandler from '../helpers/GameHandler';
import InteractiveHandler from '../helpers/InteractiveHandler';
import SocketHandler from '../helpers/SocketHandler';
import UIHandler from '../helpers/UIHandler';
import { WebFontLoaderPlugin } from 'phaser3-webfont-loader';


export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {

        this.load.image('playerBack', 'src/assets/playerBack.png');
        this.load.image('subjectBack', 'src/assets/subjectBack.png');
        // this.load.image('venom', 'src/assets/venom.png');
        // this.load.image('anti-venom', 'src/assets/anti-venom.png');
        // this.load.image('iron-spider-armor', 'src/assets/iron-spider-armor.png');
        // this.load.image('panther-habit-1', 'src/assets/panther-habit-1.png');
        // this.load.image('panther-habit-2', 'src/assets/panther-habit-2.png');
        // this.load.image('ultron', 'src/assets/ultron.png');
        // this.load.image('mjolnir', 'src/assets/mjolnir.png');
        // this.load.image('cloack-of-levitation', 'src/assets/cloack-of-levitation.png');
        // this.load.image('transparent-portal-1', 'src/assets/transparent-portal-1.png');
        // this.load.image('transparent-portal-2', 'src/assets/transparent-portal-2.png');
        // this.load.image('transparent-portal-3', 'src/assets/transparent-portal-3.png');
        // this.load.image('transparent-portal-4', 'src/assets/transparent-portal-4.png');
        // this.load.image('space-stone', 'src/assets/space-stone.png');
        // this.load.image('time-stone', 'src/assets/time-stone.png');
        // this.load.image('mind-stone', 'src/assets/mind-stone.png');
        // this.load.image('reality-stone', 'src/assets/reality-stone.png');
        // this.load.image('power-stone', 'src/assets/power-stone.png');
        // this.load.image('soul-stone', 'src/assets/soul-stone.png');
        // this.load.image('wakandan-shields-1', 'src/assets/wakandan-shields-1.png');
        // this.load.image('wakandan-shields-2', 'src/assets/wakandan-shields-2.png');
        // this.load.image('captain-zelensky', 'src/assets/captain-zelensky.png');
        // this.load.image('ironstovich', 'src/assets/ironstovich.png');
        // this.load.image('david-banner', 'src/assets/david-banner.png');
        // this.load.image('nick-reznickov', 'src/assets/nick-reznickov.png');
        // this.load.image('irina-vereshshchuk', 'src/assets/irina-vereshshchuk.png');
        // this.load.image('doctor-podolyak', 'src/assets/doctor-podolyak.png');
        // this.load.image('spider-mayor', 'src/assets/spider-mayor.png');
        // this.load.image('kim', 'src/assets/kim.png');
        this.load.image('venom', 'src/assets/venom.png');
        this.load.image('antiVenom', 'src/assets/anti-venom.png');
        this.load.image('ironSpiderArmor', 'src/assets/iron-spider-armor.png');
        this.load.image('pantherHabit1', 'src/assets/panther-habit-1.png');
        this.load.image('pantherHabit2', 'src/assets/panther-habit-2.png');
        this.load.image('ultron', 'src/assets/ultron.png');
        this.load.image('mjolnir', 'src/assets/mjolnir.png');
        this.load.image('cloackOfLevitation', 'src/assets/cloack-of-levitation.png');
        this.load.image('transparentPortal1', 'src/assets/transparent-portal-1.png');
        this.load.image('transparentPortal2', 'src/assets/transparent-portal-2.png');
        this.load.image('transparentPortal3', 'src/assets/transparent-portal-3.png');
        this.load.image('transparentPortal4', 'src/assets/transparent-portal-4.png');
        this.load.image('spaceStone', 'src/assets/space-stone.png');
        this.load.image('timeStone', 'src/assets/time-stone.png');
        this.load.image('mindStone', 'src/assets/mind-stone.png');
        this.load.image('realityStone', 'src/assets/reality-stone.png');
        this.load.image('powerStone', 'src/assets/power-stone.png');
        this.load.image('soulStone', 'src/assets/soul-stone.png');
        this.load.image('wakandanShields1', 'src/assets/wakandan-shields-1.png');
        this.load.image('wakandanShields2', 'src/assets/wakandan-shields-2.png');
        this.load.image('captainZelensky', 'src/assets/captain-zelensky.png');
        this.load.image('ironstovich', 'src/assets/ironstovich.png');
        this.load.image('davidBanner', 'src/assets/david-banner.png');
        this.load.image('nickReznickov', 'src/assets/nick-reznickov.png');
        this.load.image('irinaVereshshchuk', 'src/assets/irina-vereshshchuk.png');
        this.load.image('doctorPodolyak', 'src/assets/doctor-podolyak.png');
        this.load.image('spiderMayor', 'src/assets/spider-mayor.png');
        this.load.image('kim', 'src/assets/kim.png');
        this.load.image('cardStack', 'src/assets/cardStack.png');
        this.load.webfont('Montserrat', 'https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Poppins:wght@300&display=swap');
        this.load.webfont('Anton', 'https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:wght@500&family=Poppins:wght@300&display=swap')

    }

    create() {

        this.CardHandler = new CardHandler();
        this.DeckHandler = new DeckHandler(this);
        this.GameHandler = new GameHandler(this);
        this.SocketHandler = new SocketHandler(this);
        this.UIHandler = new UIHandler(this);
        this.UIHandler.buildUI();
        this.InteractiveHandler = new InteractiveHandler(this);

    }

    update() {

    }
}