import Controler_Player_Keyboard from "../core/controler/player/Keyboard.js";

/**
 * Controls the player with the keyboard keys
 */
export default class Topdown_Controler_Player_Keyboard extends Controler_Player_Keyboard{

  create() {
    super.create();
    // Reduce the size of the hit area
    // this.player.setSize(26, 16).setOffset(3, 16);
    this.player_direction = 'down';
  }

  enable(){
    if(!this.enabled){
      // After a mouse left click, switch to mouse controler
      this.scene.input.once("pointerup", this.scene.switchControler, this.scene);
      this.npc_collider = this.scene.physics.add.collider(this.player, this.scene.npcs);
    }
    super.enable();
  }

  disable(){
    if(this.enabled){
      this.scene.input.off("pointerup", this.scene.switchControler);
      this.npc_collider.destroy();
    }
    super.disable();
  }

  update() {
    if(this.enabled){
      const keys = this.keys;
      const player = this.player;
      const speed = this.player.speed;
      // const prevVelocity = body.velocity.clone();

      // Stop any previous movement from the last frame
      player.body.setVelocity(0);

      // Horizontal movement
      if (keys.left.isDown) {
        player.body.setVelocityX(-speed);
      } else if (keys.right.isDown) {
        player.body.setVelocityX(speed);
      }

      // Vertical movement
      if (keys.up.isDown) {
        player.body.setVelocityY(-speed);
      } else if (keys.down.isDown) {
        player.body.setVelocityY(speed);
      }

      // Normalize and scale the velocity so that player can't move faster along a diagonal
      player.body.velocity.normalize().scale(speed);

      // Give left/right animations precedence over up/down animations
      if (keys.left.isDown) {
        player.setOrientation('left');
      } else if (keys.right.isDown) {
        player.setOrientation('right');
      } else if (keys.up.isDown) {
        player.setOrientation('up');
      } else if (keys.down.isDown) {
        player.setOrientation('down');
      }

      if(player.body.velocity.x !== 0 || player.body.velocity.y !== 0) {
        player.walk();
      } else {
        player.stop();
      }

      // let degre = Phaser.Math.RadToDeg(body.velocity.angle());
    }
    super.update();
  }
}
