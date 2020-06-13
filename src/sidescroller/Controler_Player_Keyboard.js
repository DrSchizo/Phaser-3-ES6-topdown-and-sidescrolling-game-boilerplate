import Controler_Player_Keyboard from "../core/controler/player/Keyboard.js";

/**
 * Controls the player with the keyboard keys
 */
export default class Sidescroller_Controler_Player_Keyboard extends Controler_Player_Keyboard{

  create() {
    super.create();
    this.keys2 = this.scene.input.keyboard.addKeys('SHIFT');
    this.player.setDrag(1000, 0).setMaxVelocity(300, 400);
    this.player.setOrientation('right');
  }

  update() {
    if(this.enabled){
      const keys = this.keys;
      const player = this.player;
      const onGround = player.body.blocked.down;
      const isRunning = this.keys2.SHIFT.isDown;
      const isCrouching = keys.down.isDown;
      const acceleration = onGround ? ( isRunning ? 600 : 450 ) : 200;

      // don't do anything if the player is already attacking
      if(player.isAttacking) return;

      // Jump can only be done when player is on ground
      if (onGround && keys.up.isDown) {
        player.setVelocityY(-400);
      }
      // Apply horizontal acceleration when left/a or right/d are applied
      if (keys.left.isDown) {
        player.setAccelerationX(-acceleration);
        player.setOrientation('left');
      } else if (keys.right.isDown) {
        player.setAccelerationX(acceleration);
        player.setOrientation('right');
      } else {
        player.setAccelerationX(0);
      }

      // Crouch or stand
      player.setCrouch(isCrouching);
      // if(keys.down.isDown){
      //   this.scene.cameras.main.followOffset.set(0, -100);
      // }else{
      //   this.scene.cameras.main.followOffset.set(0, 0);
      // }

      // Update the animation/texture based on the state of the player
      if (onGround) {
        if (player.body.velocity.x !== 0){
          if (isRunning){
            player.run();
          }else{
            player.walk();
          }
        }
        else{
          player.stop();
        }
      } else {
        player.jump();
      }
    }
    super.update();
  }
}
