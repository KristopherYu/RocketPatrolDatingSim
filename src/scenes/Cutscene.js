class Cutscene extends Phaser.Scene {
    constructor(){
        super("cutScene");
    }
    preload(){
        this.load.image('cafe', './assets/CafeBackground.png');
        this.load.image('player', './assets/Player.png');
        this.load.image('angry', './assets/SSAngry.png');
        this.load.image('default', './assets/SSDefault.png');
        this.load.image('happy', './assets/SSHappy.png');
        this.load.image('disappoint', './assets/SSSad.png');
        this.load.image('seduce', './assets/SSSeduce.png');
        this.load.image('shock', './assets/SSShock.png');
        this.load.image('starfield', './assets/heartfield.png');
    }
    create(){

    }
    update(){

    }
}