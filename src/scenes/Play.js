//MOD CREATED BY KRISTOPHER YU
//TITLE: SPACE LEFT IN THE HEART
//FINALIZED: 4/19/2021
//HOURS SUNK: 25+
class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //loads images / tile sprites 
        this.load.image('rocket', './assets/heartBomb.png');
        this.load.image('starfield', './assets/heartfield.png');
        this.load.image('cafe', './assets/cafeBackground.png');
        this.load.image('player', './assets/player.png');
        this.load.image('angry', './assets/SSSAngry.png');
        this.load.image('default', './assets/SSSDefault.png');
        this.load.image('happy', './assets/SSSHappy.png');
        this.load.image('shock', './assets/SSSShocked.png');
        this.load.image('sad', './assets/SSSSad.png');
        this.load.image('flower', './assets/flowerFrame.png');
        this.load.image('tail', './assets/tailBorder.png');
        this.load.image('macaroni', './assets/macaroniFrame.png');
        this.load.image('drinkChat', './assets/drink1.png');
        this.load.image('drinkChat2', './assets/drink2.png');
        this.load.image('flirtChat', './assets/flirt1.png');
        this.load.image('flirtChat2', './assets/flirt2.png');
        this.load.image('talkChat', './assets/talk1.png');
        this.load.image('talkChat2', './assets/talk2.png');
        this.load.image('missChat', './assets/miss1.png');
        this.load.image('missChat2', './assets/miss2.png');
        this.load.image('insultChat', './assets/insult1.png');
        this.load.image('insultChat2', './assets/insult2.png');
        this.load.image('bad', './assets/endingBad.png');
        this.load.image('worst', './assets/endingWorst.png');
        this.load.image('good', './assets/endingGood.png');
        this.load.image('best', './assets/endingBest.png');
        this.load.image('zone', './assets/endingZone.png');
        this.load.image('macGet', './assets/macaroniUnlock.png');
        this.load.image('flowGet', './assets/flowerUnlock.png');

        let spriteConfig = {            
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        };
        //load spritesheet
        this.load.spritesheet('explosion', './assets/pinkexplosion.png', spriteConfig);
        //load option ship spritesheets
        this.load.spritesheet('talk', './assets/talkShip.png', spriteConfig);
        this.load.spritesheet('flirt', './assets/flirtShip.png', spriteConfig);
        this.load.spritesheet('drink', './assets/drinkShip.png', spriteConfig);
        this.load.spritesheet('insult', './assets/insultShip.png', {
            frameWidth: 32,
            frameHeight: 18,
            startFrame: 0,
            endFrame: 9
        });
    }

    create(){
        //place starfield
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.cafe = this.add.tileSprite(0, 0, 640, 480, 'cafe').setOrigin(0, 0);
        this.date = this.add.tileSprite(0, 0, 640, 480, 'default').setOrigin(0, 0);
        //this is the textbox filler
        this.talk = this.add.tileSprite(0, 0, 640, 480, 'default').setOrigin(0, 0);

        //add music
        this.music = this.sound.add('music', {
            loop:true
        });
        this.music.play();

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
        this.anims.create({
            key:'insultShip',
            frames: this.anims.generateFrameNumbers('insult', {
                start: 0,
                end: 1,
                first: 0
            }),
            frameRate: 5,
            repeat: -1
        });

        // add x4 spaceships
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6,
            borderUISize * 4, 'flirtShip', 0, 40 * game.settings.bonus).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3,
            borderUISize * 5 + borderPadding*2, 'drinkShip', 0, 20 * game.settings.bonus).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width,
            borderUISize*6 + borderPadding*4, 'talkShip', 0, 10 * game.settings.bonus).setOrigin(0,0);
        this.ship04 = new Spaceship(this, game.config.width,
            borderUISize*6 + borderPadding*8, 'insultShip', 0, -40 * game.settings.bonus).setOrigin(0,0);

        //make the different ships have different speeds
        this.ship01.moveSpeed += 1.5;
        this.ship02.moveSpeed += 0.75;
        this.ship04.moveSpeed -= 3;
        //play animations
        this.ship01.anims.play('flirtShip');
        this.ship02.anims.play('drinkShip');
        this.ship03.anims.play('talkShip');
        this.ship04.anims.play('insultShip');
        
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
        if(this.ship04.direction == 1){
            this.ship04.x = 0;
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
            //make all ships invisible, textbox also
            this.talk.alpha = 0;
            this.ship01.alpha = 0;
            this.ship02.alpha = 0;
            this.ship03.alpha = 0;
            this.ship04.alpha = 0;
            this.p1Rocket.alpha = 0;
            //Set highscore
            if(this.p1Score > highscore){
                highscore = this.p1Score;
            }
            //Check unlockables and play certain scenes
            this.endScreen();
            //Set gameover when time is up
            this.timeCheck = false;
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER',
            endConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 32, 'BEST DATE: ' + highscore,
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

        this.timeCheck = false;   //what time it is
        this.bounce = 0;          //add bounce
        this.musicCut = 0;        //add music cut
        //This is the frame
        if(border == 2){
            this.frame = this.add.tileSprite(0, 0, 640, 480, 'macaroni').setOrigin(0, 0);
        }
        else if(border == 1){
            this.frame = this.add.tileSprite(0, 0, 640, 480, 'flower').setOrigin(0, 0);
        }
        else{
            this.frame = this.add.tileSprite(0, 0, 640, 480, 'tail').setOrigin(0, 0);
        }
    }

    update(){
        //check for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.music.stop();
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            this.music.stop();
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 1.5;
        this.cafe.tilePositionX -= 0.75;
        if(!this.gameOver){
            //update rocket
            this.p1Rocket.update();
            //check if it hit the end of the screen and change image
            if(this.p1Rocket.y <= borderUISize * 3 + borderPadding){
                this.p1Score -= game.settings.punish * game.settings.bonus;
                this.scoreLeft.text = 'Score:' + this.p1Score;
                this.setMiss();
                this.sound.play('sadSound');
                this.p1Rocket.reset();
            }
            //update spaceships x3
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }
        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship04)){
            this.setInsult();
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.setTalk();
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.setDrink();
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.setFlirt();
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        this.timeLeft = this.baseTime - Math.floor(this.clock.getElapsed() / 1000);
        this.timeDisplay.text = "Time Left: " + this.timeLeft;
        //console.log(this.timeCheck == false && this.timeLeft < 30);
        if(this.timeCheck == false && this.timeLeft < 30){
            //console.log("Speed time");
            this.ship01.moveSpeed *= 1.5;
            this.ship02.moveSpeed *= 1.5;
            this.ship03.moveSpeed *= 1.5;
            this.ship04.moveSpeed *= 1.5;
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
    }
    setDrink() {
        if(this.musicCut == 1){
            this.music.resume();
            this.musicCut = 0;
        }
        if(Math.floor(Math.random() * 2) == 1){
            this.date.setTexture('shock');
            this.talk.setTexture('drinkChat');
            this.doBounce(this.date);
            this.sound.play('talkSound');
        }
        else{
            this.date.setTexture('default');
            this.talk.setTexture('drinkChat2');
            this.doBounce(this.date);
            this.sound.play('talkSound');
        }
    }
    setFlirt(){
        if(this.musicCut == 1){
            this.music.resume();
            this.musicCut = 0;
        }
        if(Math.floor(Math.random() * 2) == 1){
            this.date.setTexture('happy');
            this.talk.setTexture('flirtChat');
            this.doBounce(this.date);
            this.sound.play('talkSound');
        }
        else{
            this.date.setTexture('happy');
            this.talk.setTexture('flirtChat2');
            this.doBounce(this.date);
            this.sound.play('talkSound');
        }
    }
    setTalk(){
        if(this.musicCut == 1){
            this.music.resume();
            this.musicCut = 0;
        }
        if(Math.floor(Math.random() * 2) == 1){
            this.date.setTexture('shock');
            this.talk.setTexture('talkChat');
            this.doBounce(this.date);
            this.sound.play('talkSound');
        }
        else{
            this.date.setTexture('shock');
            this.talk.setTexture('talkChat2');
            this.doBounce(this.date);
            this.sound.play('talkSound');
        }
    }
    setMiss(){
        if(this.musicCut == 0){
            this.music.pause();
            this.musicCut = 1;
        }
        if(Math.floor(Math.random() * 2) == 1){
            this.date.setTexture('angry');
            this.talk.setTexture('missChat');
            this.doBounce(this.date);
            this.sound.play('sadSound');
        }
        else{
            this.date.setTexture('sad');
            this.talk.setTexture('missChat2');
            this.doBounce(this.date);
            this.sound.play('sadSound');
        }
    }
    setInsult(){
        if(this.musicCut == 0){
            this.music.pause();
            this.musicCut = 1;
        }
        if(Math.floor(Math.random() * 2) == 1){
            this.date.setTexture('angry');
            this.talk.setTexture('insultChat');
            this.doBounce(this.date);
            this.sound.play('sadSound');
        }
        else{
            this.date.setTexture('sad');
            this.talk.setTexture('insultChat2');
            this.doBounce(this.date);
            this.sound.play('sadSound');
        }
    }
    endScreen(){
        if(this.p1Score >= 900){
            if(macaroni == 0){
                this.end = this.add.tileSprite(0, 0, 640, 480, 'macGet').setOrigin(0, 0);
            }
            this.date.setTexture('happy');
            macaroni = 1;
            flower = 1;
            this.end = this.add.tileSprite(0, 0, 640, 480, 'best').setOrigin(0, 0);
        }
        else if(this.p1Score >= 500){
            if(flower == 0){
                this.end = this.add.tileSprite(0, 0, 640, 480, 'flowGet').setOrigin(0, 0);
            }
            this.date.setTexture('shock');
            flower = 1;
            this.end = this.add.tileSprite(0, 0, 640, 480, 'good').setOrigin(0, 0);
        }
        else if(this.p1Score >= 0){
            
            this.date.setTexture('default');
            this.end = this.add.tileSprite(0, 0, 640, 480, 'zone').setOrigin(0, 0);
        }
        else if(this.p1Score >= -300){
            if(this.musicCut == 0){
                this.music.pause();
            }
            this.date.setTexture('angry');
            this.end = this.add.tileSprite(0, 0, 640, 480, 'bad').setOrigin(0, 0);
        }
        else{
            if(this.musicCut == 0){
                this.music.pause();
            }
            this.date.setTexture('sad');
            this.end = this.add.tileSprite(0, 0, 640, 480, 'worst').setOrigin(0, 0);
        }
        if(this.p1Score >= 0){
            if(this.musicCut == 1){
                this.music.resume();
            }
        }

    }
}