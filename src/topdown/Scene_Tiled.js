import Scene_Tiled from "../core/scene/Tiled.js";
import Topdown_Controler_Player_Keyboard from "./Controler_Player_Keyboard.js";
import Topdown_Controler_Player_Pathfinder from "./Controler_Player_Pathfinder.js";

/**
 * A top-down scene with no gravity
 */
export default class Topdown_Scene_Tiled extends Scene_Tiled {

  constructor() {
    super("Topdown_Scene_Tiled");
  }

  init(data){
    this.defaultMapName = "center";
    this.defaultMapFrom = "west";
    // this.defaultMapName = "west";
    // this.defaultMapFrom = "center";
    super.init(data);
  }

  preload() {
    super.preload();
    this.load.image("tiles", "./assets/topdown/tuxemon-1200.png");
    this.load.tilemapTiledJSON("map_"+this.mapName, "./assets/topdown/"+this.mapName+".json");
  }

  create(){
    super.create();
  }

  // Create the player controler
  createController(){
    this.controler = new Topdown_Controler_Player_Pathfinder(this, this.player);
    this.controler_inactive = new Topdown_Controler_Player_Keyboard(this, this.player);
    this.controler.enable();
    this.input.setDefaultCursor('url(assets/cursors/16x16/pointer.png), pointer');
  }

  // Switch between mouse and keyboard controler
  switchControler() {
    let old_controler = this.controler;
    // Check if there is an inactive controler to switch to. If not, create a new one
    if(this.controler_inactive!=null){
      this.controler = this.controler_inactive;
    }else if(this.controler.constructor.name=='Topdown_Controler_Player_Pathfinder'){
      this.controler = new Topdown_Controler_Player_Keyboard(this);
    }else{
      this.controler = new Topdown_Controler_Player_Pathfinder(this);
    }
    // The new controler should only be enabled if the old one was too
    if(old_controler.enabled && !this.controler.enabled){
      this.controler.enable();
    }else if(!old_controler.enabled && this.controler.enabled){
      this.controler.disable();
    }
    // Keep the old controler for later
    old_controler.disable();
    this.controler_inactive = old_controler;
  }
}
