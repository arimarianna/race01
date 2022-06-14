import Phaser from 'phaser';
import Game from './scenes/game';
import { WebFontLoaderPlugin } from 'phaser3-webfont-loader';

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        width: 1280,
        height: 780,
    },
    parent: 'phaser-example',
    backgroundColor: '#F5F5F5',
    scene: [
        Game
    ],
    plugins: {
        global: [{
            key: 'WebFontLoader',
            plugin: WebFontLoaderPlugin,
            start: true
        }]
    }
};

const game = new Phaser.Game(config);
