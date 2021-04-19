//MOD CREATED BY KRISTOPHER YU
//TITLE: SPACE LEFT IN THE HEART
//FINALIZED: 4/19/2021
//HOURS SUNK: 25+
class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        //load audio
        this.load.audio('menuSound', './assets/menuSound.wav');
        this.load.audio('talkSound', './assets/talk.wav');
        this.load.audio('sadSound', './assets/sadNoise.wav');
        this.load.audio('fire', './assets/Fire.wav');
        this.load.audio('music', './assets/TempMusic.wav');
        this.load.image('cafe', './assets/cafeBackground.png');
        this.load.image('default', './assets/SSSDefault.png');
        //load in instructions
        this.load.spritesheet('instructions', './assets/instructions.png', {
            frameWidth: 640,
            frameHeight: 480,
            startFrame: 0,
            endFrame: 1
        });
        this.load.spritesheet('keyPress', './assets/keyPress.png', {
            frameWidth: 640,
            frameHeight: 480,
            startFrame: 0,
            endFrame: 1
        });
        this.load.spritesheet('menuScreen', './assets/menuScreen.png', {
            frameWidth: 640,
            frameHeight: 480,
            startFrame: 0,
            endFrame: 1
        });
        this.load.spritesheet('tips', './assets/tipMenu.png', {
            frameWidth: 640,
            frameHeight: 480,
            startFrame: 0,
            endFrame: 1
        });
        //load in the equipment menu
        this.load.spritesheet('equipTail', './assets/borderMenu.png', {
            frameWidth: 640,
            frameHeight: 480,
            startFrame: 0,
            endFrame: 1
        });
        this.load.spritesheet('equipFlower', './assets/borderFlowerMenu.png', {
            frameWidth: 640,
            frameHeight: 480,
            startFrame: 0,
            endFrame: 1
        });
        this.load.spritesheet('equipMacaroni', './assets/borderMacaroniMenu.png', {
            frameWidth: 640,
            frameHeight: 480,
            startFrame: 0,
            endFrame: 1
        });
    }

    create(){
        // Create Instructions animation
        this.cafe = this.add.tileSprite(0, 0, 640, 480, 'cafe').setOrigin(0, 0);
        this.date = this.add.tileSprite(0, 0, 640, 480, 'default').setOrigin(0, 0);
        this.anims.create({
            key:'menu',
            frames: this.anims.generateFrameNumbers('menuScreen', {
                start: 0,
                end: 1,
                first: 0
            }),
            frameRate: 5,
            repeat: -1
        });
        //Add in the sprite and play it
        this.menu = this.add.sprite(0, 0, 'menu').setOrigin(0, 0);
        this.menu.anims.play('menu');
        //Create the first instruction page
        this.anims.create({
            key:'howToPlay',
            frames: this.anims.generateFrameNumbers('instructions', {
                start: 0,
                end: 1,
                first: 0
            }),
            frameRate: 5,
            repeat: -1
        });
        
        //Create the second instruction page
        this.anims.create({
            key:'keys',
            frames: this.anims.generateFrameNumbers('keyPress', {
                start: 0,
                end: 1,
                first: 0
            }),
            frameRate: 5,
            repeat: -1
        });
        //create the tips page
        this.anims.create({
            key:'tip',
            frames: this.anims.generateFrameNumbers('tips', {
                start: 0,
                end: 1,
                first: 0
            }),
            frameRate: 5,
            repeat: -1
        });
        //create the equip menus
        this.anims.create({
            key:'tail',
            frames: this.anims.generateFrameNumbers('equipTail', {
                start: 0,
                end: 1,
                first: 0
            }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key:'flower',
            frames: this.anims.generateFrameNumbers('equipFlower', {
                start: 0,
                end: 1,
                first: 0
            }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key:'macaroni',
            frames: this.anims.generateFrameNumbers('equipMacaroni', {
                start: 0,
                end: 1,
                first: 0
            }),
            frameRate: 5,
            repeat: -1
        });
        this.inInstruct = 0;
        this.moveDown = 0;
        this.borderEquip = 0;
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }

    update(){
        if(this.moveDown == 1){
            this.movePhone();
        }
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            if(this.borderEquip == 1){
                border = 0;
                this.sound.play('menuSound');
            }
            else if(this.inInstruct <= 0){
                this.moveDown = 1;
                this.inInstruct = 5;
                this.sound.play('menuSound');
                //easy mode
                this.clock = this.time.delayedCall(750, () => {
                    game.settings = {
                        spaceshipSpeed: 3,
                        gameTimer: 60000,
                        bonus: 1,
                        punish: 20,
                    }
                    this.scene.start('playScene');
                }, null, this);
            }
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            if(this.borderEquip == 1){
                if(flower == 1){
                    border = 1;
                    this.sound.play('menuSound');
                }
            }
            else if(this.inInstruct <= 0){
                this.moveDown = 1;
                this.inInstruct = 5;
                this.sound.play('menuSound');
                //hard mode
                this.clock = this.time.delayedCall(750, () => {
                    game.settings = {
                        spaceshipSpeed: 4,
                        gameTimer: 45000,
                        bonus: 1.5,
                        punish: 40,
                    }
                    this.scene.start('playScene');
                }, null, this);
            }
        }
        if(Phaser.Input.Keyboard.JustDown(keyF)) {
            if(this.inInstruct == 3){
                this.sound.play('menuSound');
                this.scene.restart();
            }
            if(this.inInstruct == 2){
                this.sound.play('menuSound');
                let tip = this.add.sprite(0, 0, 'tip').setOrigin(0, 0);
                tip.anims.play('tip');
                this.inInstruct = 3;
            }
            if(this.inInstruct == 1){
                this.sound.play('menuSound');
                let keys = this.add.sprite(0, 0, 'keys').setOrigin(0, 0);
                keys.anims.play('keys');
                this.inInstruct = 2;
            }
            if(this.inInstruct == 0){
                this.sound.play('menuSound');
                let howToPlay = this.add.sprite(0, 0, 'howToPlay').setOrigin(0, 0);
                howToPlay.anims.play('howToPlay');
                this.inInstruct = 1;
            }
        }
        if(Phaser.Input.Keyboard.JustDown(keyM) && this.borderEquip == 1 && macaroni == 1){
            border = 2;
            this.sound.play('menuSound');
        }
        if(Phaser.Input.Keyboard.JustDown(keyE) && this.inInstruct < 1){
            this.showEquip();
            this.inInstruct = 3;
            this.borderEquip = 1;
        }
    }
    movePhone(){
        this.menu.y += 10;
    }
    showEquip(){
        if(macaroni == 1){
            this.sound.play('menuSound');
            let mac = this.add.sprite(0, 0, 'macaroni').setOrigin(0, 0);
            mac.anims.play('macaroni');
        }
        else if(flower == 1){
            this.sound.play('menuSound');
            let flow = this.add.sprite(0, 0, 'flower').setOrigin(0, 0);
            flow.anims.play('flower');
        }
        else{
            this.sound.play('menuSound');
            let original = this.add.sprite(0, 0, 'tail').setOrigin(0, 0);
            original.anims.play('tail');
        }
    }
}