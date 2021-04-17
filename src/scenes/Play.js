class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //loads images / tile sprites 
        this.load.image('rocket', './assets/HeartBomb.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/heartfield.png');
        this.load.image('cafe', './assets/CafeBackground.png');
        this.load.image('player', './assets/Player.png');
        this.load.image('angry', './assets/SSSAngry.png');
        this.load.image('default', './assets/SSSDefault.png');
        this.load.image('happy', './assets/SSSHappy.png');
        this.load.image('shock', './assets/SSSShocked.png');

        //load spritesheet
        this.load.spritesheet('explosion', './assets/pinkexplosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
        //load option ship spritesheets
        this.load.spritesheet('talk', './assets/talkShip.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 1
        });
        this.load.spritesheet('flirt', './assets/flirtShip.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 1
        });
        this.load.spritesheet('drink', './assets/drinkShip.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 1
        });
    }

    create(){
        //place starfield
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.cafe = this.add.tileSprite(0, 0, 640, 480, 'cafe').setOrigin(0, 0);
        this.date = this.add.tileSprite(0, 0, 640, 480, 'default').setOrigin(0, 0);
        // UI Background
        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width,
        //borderUISize * 2, 0xE039D0).setOrigin(0,0); //bar at the top with score

        //add textbox
        //this.add.rectangle(game.config.width/2 - 100, borderUISize, game.config.width, borderUISize*2, 0x000000).setOrigin(0, 0);

        //add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding*3,
        'rocket').setOrigin(0.5, 0);

        //add spaceship animations
        this.anims.create({
            key:'flirtShip',
            frames: this.anims.generateFrameNumbers('flirt', {
                start: 0,
                end: 1,
                first: 0
            }),
            frameRate: 5,
            repeat: -1
        });
        //talk ship
        this.anims.create({
            key:'talkShip',
            frames: this.anims.generateFrameNumbers('talk', {
                start: 0,
                end: 1,
                first: 0
            }),
            frameRate: 5,
            repeat: -1
        });
        //drink ship
        this.anims.create({
            key:'drinkShip',
            frames: this.anims.generateFrameNumbers('drink', {
                start: 0,
                end: 1,
                first: 0
            }),
            frameRate: 5,
            repeat: -1
        });

        // add x3 spaceships
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6,
            borderUISize * 4, 'flirtShip', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3,
            borderUISize * 5 + borderPadding*2, 'drinkShip', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width,
            borderUISize*6 + borderPadding*4, 'talkShip', 0, 10).setOrigin(0,0);
        //play animations
        this.ship01.anims.play('flirtShip');
        this.ship02.anims.play('drinkShip');
        this.ship03.anims.play('talkShip');
        
        //if ships are flipped, change to go with it
        if(this.ship01.direction == 1){
            this.ship01.x = 0 - borderUISize*6;
        }
        if(this.ship02.direction == 1){
            this.ship02.x = 0 - borderUISize*3;
        }
        if(this.ship03.direction == 1){
            this.ship03.x = 0;
        }

        //define our keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
            
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
            //backgroundColor: '#CC2121', //background of score
            color: '#ffffff', //score number color
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 250
        }
        let endConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#000000', //background of score
            color: '#ffffff', //score number color
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 250
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding - 5,
            borderUISize, 'Score:0', scoreConfig);
        

        // GAME OVER Flag
        this.gameOver = false;
        //60 second timer
        endConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.timeCheck = false;
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER',
            endConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, // Press (M) for Menu
                'Press (R) to Restart', endConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 96, 
                'Press (M) for Menu', endConfig).setOrigin(0.5);
                this.gameOver = true;
        }, null, this);

        //countdown clock adapted from rexrainbow.github.io
        this.timeLeft = this.clock.getElapsed();
        this.baseTime = game.settings.gameTimer / 1000;
        this.timeDisplay = this.add.text(game.config.height - borderPadding*9,
            borderUISize, "Time Remaining: " + this.timeLeft, scoreConfig);
        //what time it is
        this.timeCheck = false;
        //add bounce
        this.bounce = 0;
        //white borders
        this.add.rectangle( 0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);

        this.add.rectangle(0, game.config.height - borderUISize, game.config.width,
        borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    }

    update(){
        //check for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 1.5;
        this.cafe.tilePositionX -= 0.75;
        if(!this.gameOver){
            //update rocket
            this.p1Rocket.update();
            //check if it hit the end of the screen and change image
            if(this.p1Rocket.y <= borderUISize * 3 + borderPadding){
                this.p1Score -= game.settings.punish;
                this.scoreLeft.text = 'Score:' + this.p1Score;
                this.date.setTexture('angry');
                this.doBounce(this.date);
                this.sound.play('sfx_explosion');
                this.p1Rocket.reset();
            }
            //update spaceships x3
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.date.setTexture('default');
            this.doBounce(this.date);
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.date.setTexture('shock');
            this.doBounce(this.date);
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.date.setTexture('happy');
            this.doBounce(this.date);
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        this.timeLeft = this.baseTime - Math.floor(this.clock.getElapsed() / 1000);
        this.timeDisplay.text = "Time Left: " + this.timeLeft;
        //console.log(this.timeCheck == false && this.timeLeft < 30);
        if(this.timeCheck == false && this.timeLeft < 30){
            //console.log("Speed time");
            this.ship01.moveSpeed += 2.5;
            this.ship02.moveSpeed += 2.5;
            this.ship03.moveSpeed += 2.5;
            this.timeCheck = true;
        }
        //Bounce animation for date
        if(this.bounce > 0){
            this.date.y -= 1;
            this.bounce--;
        }
    }
    doBounce(face){
        face.y += 5;
        this.bounce = 5;
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
        this.scoreLeft.text = 'Score:' + this.p1Score;
        this.sound.play('sfx_explosion');
    }
    setEmotion(face) {
        //set sprite to new face
    }
}