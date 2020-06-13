import Controler_Player_Controler from "./Controler.js";
import Object_ProximityZone from "../../object/ProximityZone.js";

/**
 * Controls the player with the keyboard keys
 */
export default class Controler_Player_Keyboard extends Controler_Player_Controler{

  create() {
    // this.player.body.setMaxSpeed(this.player.speed);
    this.proximityZones = this.scene.physics.add.group();
		this.scene.npcs.children.each((npc) => {
      // Prevents NPC bouncing
      npc.body.setImmovable();
      // Creates proximity zones
      let zone = new Object_ProximityZone(this.scene, this, npc);
      this.proximityZones.add(zone);
  		zone.body.setAllowGravity(false); // Prevents the proximity zone to fall down
      // Watch the player and worldLayer for collisions
      this.world_collider = this.scene.physics.add.collider(this.player, this.scene.worldLayer);
    })
  }

  enable(){
    if(!this.enabled){
      this.enabled = true;
      this.proximity_overlap = this.scene.physics.add.overlap(this.player, this.proximityZones);
      // Add the cursor keys
      this.keys = this.scene.input.keyboard.createCursorKeys();
      // Attack
      this.scene.input.keyboard.on("keyup_CTRL", this.attack, this);
      // Sword kick
      // this.scene.input.keyboard.on("keyup_SHIFT", event => {
      //     this.scene.swordSlash.kick(this.player_direction);
      // });
    }
  }

  disable(){
    if(this.enabled){
      this.enabled = false;
      this.proximity_overlap.destroy();
      this.scene.input.keyboard.resetKeys();
      this.scene.input.keyboard.off("keyup_CTRL", this.attack);
      // Make sure that there is no active proximity zone
  		this.proximityZones.children.each((zone) => {
        zone.overlapOut();
  		});
    }
  }

  update() {
    if(this.enabled){
      // Check if the player is in one of the proximity zone
  		this.proximityZones.children.each((zone) => {
        zone.update();
  		});
    }
  }

  attack() {
    this.scene.bullets.shootToward(this.player.getOrientation());
  }
}
