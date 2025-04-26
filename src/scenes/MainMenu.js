import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor (config)
    {
        super('MainMenu');
        this.config = config;
        this.menu = [
            {scene:'Game', text:'Play'},
            {scene:'GameStarCoin', text:'Play Star', seconds:5},
            {scene:'GameStarCoin', text:'Play Star (10s)', seconds:10},
            {scene:'GameStarCoin', text:'Play Star (10 clicks)', clicks:10},
            {scene:'GameStarCoin', text:'Play Star (20 clicks)', clicks:20},
            {scene:null, text:'Quit'}
        ];
        this.screenCenter = [this.config.width / 2, this.config.height / 2];
    }

    create ()
    {
        let menuPositionY = 0;
        this.add.image(this.config.width / 2, 50, 'logo');

        this.menu.forEach(menuItem => {
            const menuPosition = [this.screenCenter[0], this.screenCenter[1] + menuPositionY];
            menuItem.textGO = this.add.text(...menuPosition,menuItem.text,{fontSize:100}).setInteractive().setOrigin(0.5,1);
            menuPositionY += 200;

            menuItem.textGO.on('pointerover', () => {
                menuItem.textGO.setStyle({fill: '#ff0'});
            });
            menuItem.textGO.on('pointerout', () => {
                menuItem.textGO.setStyle({fill: '#fff'});
            });
            menuItem.textGO.on('pointerup', () => {
                if(menuItem.seconds) {localStorage.setItem('gameType','seconds');localStorage.setItem('seconds', menuItem.seconds)}
                if(menuItem.clicks) {localStorage.setItem('gameType','clicks');localStorage.setItem('clicks', menuItem.clicks)}
                menuItem.scene && this.scene.start(menuItem.scene);

                if(menuItem.text === 'Quit') {
                    this.game.destroy(true);
                }
            });
        });
    }
}
