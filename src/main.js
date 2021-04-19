console.log("This is da patrol, rocket patrol!")
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ],
}

let game = new Phaser.Game(config);
// Set UI Sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3;
let starspeed = 1;
//set unlocks
let border = 0;
let flower = 0;
let macaroni = 0;
let highscore = 0;
//reserve keyboard bindings
let keyF, keyR, keyLEFT, keyRIGHT, keyM, keyE;