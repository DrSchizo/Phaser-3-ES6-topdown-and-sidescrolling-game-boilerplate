import Sidescroller_Scene_Tiled from "../sidescroller/Scene_Tiled.js";
import Spine_Controler_Player_Keyboard from "./Controler_Player_Keyboard.js";
import Object_Weapon_SwordSlash from "../core/object/weapon/SwordSlash.js";

/**
 * A side-scroller scene with gravity and Spine sprite
 */
export default class Spine_Scene_Tiled extends Sidescroller_Scene_Tiled {
// export default class Spine_Scene_Tiled extends Phaser.Scene {

  constructor(config) {
    if (!config) config = 'Spine_Scene_Tiled';
    super(config);
  }

  preload() {
    super.preload();

    this.load.image('background', './assets/platformer/background.png');
    this.load.image("tiles", "./assets/platformer/tileset_128_extruded.png");
    this.load.tilemapTiledJSON("map_"+this.mapName, "./assets/platformer/"+this.mapName+"_128.json");
  }

  create(){
    super.create();

    // the weapon
    this.swordSlash = new Object_Weapon_SwordSlash(this,80,this.player.body.height, 350);
    this.swordSlash.addEvents();

    // Create a fake 3d depth effect, by offsetting aboveLayer and worldlayer
    const offsetLayer = 8;
    this.aboveLayer.y += 2 * offsetLayer;
    this.worldLayer.forEachTile(function(tile){
      if(tile.canCollide){
        tile.setSize(tile.width,tile.height - offsetLayer);
      }
    });
    this.player.y += offsetLayer;
		this.exits.children.each((exit) => { exit.y += offsetLayer; });
		this.npcs.children.each((npc) => { npc.y += offsetLayer; });
		this.enemies.children.each((enemy) => {	enemy.y += offsetLayer; });
  }

  // Create the player controler
  createController(){
    this.controler = new Spine_Controler_Player_Keyboard(this, this.player);
    this.controler.enable();
  }

  update(time, delta) {
    super.update(time, delta);
    if(!this.isPaused){
      this.swordSlash.update();
    }
  }
}
