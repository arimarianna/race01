import Phaser from 'phaser';
import Game from './scenes/game';
import { WebFontLoaderPlugin } from 'phaser3-webfont-loader';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#F5F5F5',
    width: 1280,
    height: 780,
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
