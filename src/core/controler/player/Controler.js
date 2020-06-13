/**
 * Abstract class to control the player movements
 */
export default class Controler_Player_Controler {

  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
    this.create();
  }

  create() {
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  update() {
    if(this.enabled){
      // Do something
    }
  }
}
