import Sidescroller_Scene_Tiled from "../sidescroller/Scene_Tiled.js";

/**
 * A side-scroller scene with gravity and Spritesheet sprite
 */
export default class Spritesheet_Scene_Tiled extends Sidescroller_Scene_Tiled {
// export default class Spritesheet_Scene_Tiled extends Phaser.Scene {

  constructor(config) {
    if (!config) config = 'Spritesheet_Scene_Tiled';
    super(config);
  }

  preload() {
    super.preload();

    this.load.image('background', './assets/platformer/background.png');
    this.load.image("tiles", "./assets/platformer/tileset_96_extruded.png");
    this.load.tilemapTiledJSON("map_"+this.mapName, "./assets/platformer/"+this.mapName+"_96.json");
  }
}
