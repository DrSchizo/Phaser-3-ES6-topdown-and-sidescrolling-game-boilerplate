import Scene_Preload from "../core/scene/Preload.js";

/**
 * Scene to prelad assets
 */
export default class Spine_Scene_Preload extends Scene_Preload {

  constructor() {
    super("Spine_Scene_Preload");
  }

  preload() {
    super.preload();
    // talk icon
    this.load.image("talk_icon", "./assets/cursors/32x32/talk.png");
    // Spine sprite
    this.load.setPath('./assets/sprites/spine/');
    this.load.spine('2danim', '2danim.json', '2danim.atlas');
    this.load.setPath('./');
  }
}
