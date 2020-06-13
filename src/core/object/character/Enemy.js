import Object_Character_Character from "./Character.js";

/**
 * Non Playable Character
 */
export default class Object_Character_Enemy extends Object_Character_Character {

  constructor(scene, x, y, name) {
    super(scene, x, y, name, 'enemy');
  }

  // Start moving toward one direction : left, right, up, down, up-left...
  moveToward (string){
    super.moveToward(string);
    this.setBounce(1)
        .setCollideWorldBounds(true); // don't go out of the map
    // this.body.onWorldBounds = true;
  }

  update(){
    super.update();
    // if the character changes direction, look toward the new direction
    if(this.body.prevVelocity && (this.body.velocity!=this.body.prevVelocity)){
      if(this.body.velocity.x==0 && this.body.velocity.y==0){
        this.stop();
      }else{
        this.walkAhead();
      }
    }
    this.body.prevVelocity = this.body.velocity.clone();
  }
}
