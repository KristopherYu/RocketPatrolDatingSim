class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //loads images / tile sprites 
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/heartfield.png');
        this.load.image('player', './assets/Player.png');
        this.load.image('angry', './assets/SSAngry.png');
        this.load.image('default', './assets/SSDefault.png');
        this.load.image('happy', './assets/SSHappy.png');
        this.load.image('disappoint', './assets/SSSad.png');
        this.load.image('seduce', './assets/SSSeduce.png');
        this.load.image('shock', './assets/SSShock.png');

        //load spritesheet
        this.load.spritesheet('explosion', './assets/pinkexplosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
    }

    create(){
        //place starfield
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // UI Background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width,
        borderUISize * 2, 0xE039D0).setOrigin(0,0); //bar at the top with score

        //white borders
        this.add.rectangle( 0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);

        this.add.rectangle(0, game.config.height - borderUISize, game.config.width,
        borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        
        //add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding,
        'rocket').setOrigin(0.5, 0);

        // add x3 spaceships
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6,
            borderUISize * 4, 'spaceship', 0, 30).setOrigin(0,0);
            //this.ship01.moveSpeed = this.ship01.moveSpeed + 1;
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3,
            borderUISize * 5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width,
            borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
            //this.ship03.moveSpeed = this.ship03.moveSpeed - 1;

        //define our keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
            
        // animation config
        this.anims.create({
            key:'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });
        //initialize score
        this.p1Score = 0;
        //display the score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#CC2121', //background of score
            color: '#78062D', //score number color
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding,
            borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        

        // GAME OVER Flag
        this.gameOver = false;
        //60 second timer
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER',
            scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64,
                'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
                this.gameOver = true;
        }, null, this);

        //countdown clock adapted from rexrainbow.github.io
        this.timeLeft = this.clock.getElapsed();
        this.baseTime = game.settings.gameTimer / 1000;
        this.timeDisplay = this.add.text(game.config.height - borderPadding,
            borderUISize + borderPadding*2, this.p1Score, scoreConfig);
    }

    update(){
        //check for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            currTime.start();
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 1.5;
        if(!this.gameOver){
            //update rocket
            this.p1Rocket.update();
            //update spaceships x3
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        this.timeLeft = Math.floor(this.clock.getElapsed() / 1000);
        this.timeDisplay.text = this.baseTime - this.timeLeft;
    }

    //Check collision
    checkCollision(rocket, ship){
        //simple AABB checking
        if( rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        }
        else{
            return false;
        }
    }

    shipExplode(ship) {
        //temporary ship camoflague 
        ship.alpha = 0;
        //create explosion sprite
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        //score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }
    setEmotion(face) {
        //set sprite to new face
    }
}