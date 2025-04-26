import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { GameStarCoin } from './scenes/GameStarCoin';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import Phaser from 'phaser';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig

const SHARED_CONFIG = {
    width: 1080,
    height: 2412
}
const config = {
    type: Phaser.AUTO,
    pixelArt: true,
    width: SHARED_CONFIG.width,
    height: SHARED_CONFIG.height,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade'
    },
    scene: [
        Boot,
        new Preloader(SHARED_CONFIG),
        new MainMenu(SHARED_CONFIG),
        new Game(SHARED_CONFIG),
        new GameStarCoin(SHARED_CONFIG),
        new GameOver(SHARED_CONFIG)
    ]
};
if(import.meta.env.FB_ENV) {
FBInstant.initializeAsync() 
  .then(function() {
    new Phaser.Game(config);
});
} else {
    new Phaser.Game(config);
}
