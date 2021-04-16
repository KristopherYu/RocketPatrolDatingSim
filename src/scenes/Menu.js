class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        //load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.spritesheet('instructions', './assets/instructions.png', {
            frameWidth: 640,
            frameHeight: 480,
            startFrame: 0,
            endFrame: 1
        });
    }

    create(){
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //Instructions animation

        this.anims.create({
            key:'instruct',
            frames: this.anims.generateFrameNumbers('instructions', {
                start: 0,
                end: 1,
                first: 0
            }),
            frameRate: 5,
            repeat: -1
        })
        let menu = this.add.sprite(0, 0, 'menu').setOrigin(0, 0);
        menu.anims.play('instruct');
        //show menu text 
        /*this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding,
            'ROCKET PATROL DATING SIM', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire',
            menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#ED79EA';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding,
            'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);*/

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}