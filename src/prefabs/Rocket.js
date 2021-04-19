// Rocket(player) prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add object to existing scene
        scene.add.existing(this);
        this.isFiring = false;      //track rocket firing status
        this.moveSpeed = 5;         //pixels per frame
        this.fire = scene.sound.add('fire');
    }

    update() {
        //if(!this.isFiring){
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                if(this.isFiring){
                    this.x -= 2;
                }
                else{
                    this.x -= 4;
                }
            }
            else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
                if(this.isFiring){
                    this.x += 2;
                }
                else{
                    this.x += 4;
                }
            }
        //}
        //fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.fire.play();
        }
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        //reset on miss (Put into play)
        //if(this.y <= borderUISize * 3 + borderPadding){
        //    this.reset();
        //}
    }

    // reset rocket to "ground"
    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding*3;
    }
}