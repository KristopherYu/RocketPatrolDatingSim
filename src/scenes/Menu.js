class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        //load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('cafe', './assets/CafeBackground.png');
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
    }

    create(){
        // Create Instructions animation
        this.cafe = this.add.tileSprite(0, 0, 640, 480, 'cafe').setOrigin(0, 0);
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
        this.inInstruct = 0;
        this.moveDown = 0;
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }

    update(){
        if(this.moveDown == 1){
            this.movePhone();
        }
        if(Phaser.Input.Keyboard.JustDown(keyLEFT) && this.inInstruct <= 0){
            this.moveDown = 1;
            this.inInstruct = 5;
            this.sound.play('sfx_select');
            //easy mode
            this.clock = this.time.delayedCall(750, () => {
                game.settings = {
                    spaceshipSpeed: 3,
                    gameTimer: 60000
                }
                this.scene.start('playScene');
            }, null, this);

        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT) && this.inInstruct <= 0) {
            this.moveDown = 1;
            this.inInstruct = 5;
            this.sound.play('sfx_select');
            //hard mode
            this.clock = this.time.delayedCall(750, () => {
                game.settings = {
                    spaceshipSpeed: 4,
                    gameTimer: 45000
                }
                this.scene.start('playScene');
            }, null, this);
        }
        if(Phaser.Input.Keyboard.JustDown(keyF)) {
            if(this.inInstruct == 2){
                this.sound.play('sfx_select');
                this.scene.restart();
            }
            if(this.inInstruct == 1){
                this.sound.play('sfx_select');
                let keys = this.add.sprite(0, 0, 'keys').setOrigin(0, 0);
                keys.anims.play('keys');
                this.inInstruct = 2;
            }
            if(this.inInstruct == 0){
                this.sound.play('sfx_select');
                let howToPlay = this.add.sprite(0, 0, 'howToPlay').setOrigin(0, 0);
                howToPlay.anims.play('howToPlay');
                this.inInstruct = 1;
            }
        }
    }
    movePhone(){
        this.menu.y += 10;
    }
}