import { Scene } from 'phaser';

export class GameOver extends Scene
{
    constructor (config)
    {
        super('GameOver');
        this.config = config;
    }

    create ()
    {
        this.add.text(this.config.width / 2, this.config.height / 2, 'Your Score was: ' + localStorage.getItem('score')+ '\r\nPress to continue', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.back2MM = this.add.text(this.config.width / 2, this.config.height - 100, 'Back2MainMenu', {
            fontSize:100
        }).setInteractive().setOrigin(0.5);

        this.back2MM.on('pointerdown', () => {

            this.scene.start('MainMenu');

        });
    }
}
