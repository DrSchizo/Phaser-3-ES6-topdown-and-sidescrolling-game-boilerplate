import Sidescroller_Controler_Player_Keyboard from "../sidescroller/Controler_Player_Keyboard.js";

/**
 * Controls the player with the keyboard keys
 */
export default class Spine_Controler_Player_Keyboard extends Sidescroller_Controler_Player_Keyboard{

  attack() {
    const onGround = this.player.body.blocked.down;
    if(onGround){
      this.player.attack();
      this.scene.swordSlash.kick(this.player.getOrientation());
    }
  }
}
