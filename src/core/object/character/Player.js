import Object_Character_Character from "./Character.js";
import Object_Sprite_Spine from "../sprite/Spine.js";

/**
 * A class that wraps up our top down player logic. It creates, animates and moves a sprite.
 * Call its update method from the scene's update and call its destroy method when you're done with the player.
 */
export default class Object_Character_Player extends Object_Character_Character {

  constructor(scene, x, y) {
    super(scene, x, y, 'player', 'player');
    // scene.game.events.on('poststep', this.poststep, this);
  }

  // Add the sprite
  // addSprite() {
  //   this.sprite = new Object_Sprite_Spine(this.scene);
  // }

  poststep() {
    super.poststep();
    // if(this.sprite) {
      // console.log(this.body.center);
    // }
  }
}
