import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor (config)
    {
        super('Preloader');
        this.config = config;
    }

    init ()
    {
        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(540, 1206, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(540-230, 1206, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png');
        this.load.image('starcoin1', 'star-coin-rotate-1.png');
        this.load.image('starcoin2', 'star-coin-rotate-2.png');
        this.load.image('starcoin3', 'star-coin-rotate-3.png');
        this.load.image('starcoin4', 'star-coin-rotate-4.png');
        this.load.image('starcoin5', 'star-coin-rotate-5.png');
        this.load.image('starcoin6', 'star-coin-rotate-6.png');
        
        this.load.spritesheet('coin', 'coin.png', {
            frameWidth:16,frameHeight:16
        })
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
