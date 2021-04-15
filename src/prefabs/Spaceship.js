// Spaceship enemy class 
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);       //add to existing scene
        this.points = pointValue;       //store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed;             //pixels per frame
        this.direction = 0;
        this.randomize();
    }

    update()    {
        if(this.direction == 1){
            this.x += this.moveSpeed;
            if(this.x >= game.config.width){
                this.x = 0 - this.width;
            }
        }
        else{   // move spaceship left
            this.x -= this.moveSpeed;
            //wrap around from left to right edge
            if(this.x <= 0 - this.width){
                this.reset();
            }
        }
    }
    //position reset
    reset(){
        this.x = game.config.width;
    }
    randomize(){
        this.direction = Math.floor(Math.random() * 2);
        this.flipX = true;
    }
}