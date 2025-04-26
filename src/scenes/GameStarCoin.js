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
        this.score = 0;
        if(localStorage.getItem('gameType') == 'clicks') {
            this.aika = 0;
            this.clicks = localStorage.getItem('clicks');
            this.textTime = 'Time: ';
            this.lShighScore = 'hS-clicks-' + this.clicks;
        } else {
            this.aika = localStorage.getItem('seconds');
            this.textTime = 'Time left: ';
            this.lShighScore = 'hS-seconds-' + this.aika;
        }
        this.scoreText = this.add.text(10,10,'Score: 0',{fontSize:100});
        this.add.text(10,100,'High Score: ' + localStorage.getItem(this.lShighScore),{fontSize:100});
        this.timeText = this.add.text(10,200,this.textTime+this.aika+'s',{fontSize:100});
        this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, repeat: -1 });

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
            if(localStorage.getItem('gameType') == 'clicks') {
                this.clicks--;
            }
            if(localStorage.getItem('gameType') == 'clicks' && this.clicks == 0) {
                localStorage.setItem('score',this.aika);
                if(!localStorage.getItem(this.lShighScore) || localStorage.getItem(this.lShighScore) > this.aika) {
                    localStorage.setItem(this.lShighScore,this.aika);
                }
                this.scene.start("GameOver");
            }
            this.score++;
            this.scoreText.setText('Score: ' + this.score);
        });
    }

    onEvent() {
        if(localStorage.getItem('gameType') == 'clicks') {
            this.aika++;
        } else {
            this.aika--;
        }
        this.timeText.setText(this.textTime + this.aika + 's');
        if(this.aika == 0 && localStorage.getItem('seconds') != 0) {
            if(localStorage.getItem(this.lShighScore) < this.score) {
                localStorage.setItem(this.lShighScore,this.score);
            }
            localStorage.setItem('score',this.score);
            this.scene.start("GameOver");
        }
        
    }
}
