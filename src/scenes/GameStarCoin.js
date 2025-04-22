import { Scene } from 'phaser';

export class GameStarCoin extends Scene
{
    constructor (config)
    {
        super('GameStarCoin');
        this.config = config;
        this.score = 0;
    }

    create ()
    {
        this.aika = localStorage.getItem('seconds');
        this.lShighScore = 'highScore-' + this.aika;
        this.scoreText = this.add.text(10,10,'Score: 0',{fontSize:100});
        this.add.text(10,100,'High Score: ' + localStorage.getItem(this.lShighScore),{fontSize:100});
        this.timeText = this.add.text(10,200,'Time left: '+this.aika+'s',{fontSize:100});
        this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, repeat: this.aika });

        this.starCoin = this.physics.add.sprite(this.config.width / 2, this.config.height / 2, 'starcoin1')
            .setScale(0.1)
            .setInteractive();
        
        this.anims.create({
                key: 'rotateStarCoin',
                frames: [
                    { key: 'starcoin1', frame: null },
                    { key: 'starcoin2', frame: null },
                    { key: 'starcoin3', frame: null },
                    { key: 'starcoin4', frame: null },
                    { key: 'starcoin5', frame: null },
                    { key: 'starcoin6', frame: null }
                ],
                frameRate: 32,
                repeat: -1
            });
        
        this.starCoin.play('rotateStarCoin');

        this.starCoin.on('pointerdown', () => {
            this.score++;
            this.scoreText.setText('Score: ' + this.score);
        });
    }

    onEvent() {
        this.aika--;
        this.timeText.setText('Time left: ' + this.aika + 's');
        if(this.aika == 0) {
            if(localStorage.getItem(this.lShighScore) < this.score) {
                localStorage.setItem(this.lShighScore,this.score);
            }
            this.score = 0; this.scene.start("GameOver");
        }
        
    }
}
