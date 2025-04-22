import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor (config)
    {
        super('Game');
        this.config = config;
        this.score = 0;
        this.aika = 5;
    }

    create ()
    {
        this.scoreText = this.add.text(10,10,'Score: 0',{fontSize:100});
        this.add.text(10,100,'High Score: ' + localStorage.getItem('score'),{fontSize:100});
        this.timeText = this.add.text(10,200,'Time left: '+this.aika+'s',{fontSize:100});
        this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, repeat: this.aika });

        this.coin = this.physics.add.sprite(this.config.width / 2, this.config.height / 2, 'coin')
            .setScale(20)
            .setInteractive();
        
        this.anims.create({
                key: 'rotate',
                frames: 'coin',
                frameRate: 64,
                repeat: -1
            });
        
        this.coin.play('rotate');

        this.coin.on('pointerdown', () => {
            this.score++;
            this.scoreText.setText('Score: ' + this.score);
        });
    }

    onEvent() {
        this.aika--;
        this.timeText.setText('Time left: ' + this.aika + 's');
        if(this.aika == 0) {
            if(localStorage.getItem('score') < this.score) {
                localStorage.setItem('score',this.score);
            }
            this.score = 0; this.aika = 5; this.scene.start("GameOver");
        }
        
    }
}
