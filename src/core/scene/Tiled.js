import Controler_Talk from "../controler/Talk.js";
import Controler_TiledWorld from "../controler/TiledWorld.js";
import Controler_Debugger from "../controler/Debugger.js";
import UserInterface from "./UserInterface.js";

/**
 * Scene that generates a new dungeon
 */
export default class Scene_Tiled extends Phaser.Scene {

  init(data){
    this.mapName = (data.hasOwnProperty("mapName")) ? data.mapName : this.defaultMapName;
    this.mapFrom = (data.hasOwnProperty("mapFrom")) ? data.mapFrom : this.defaultMapFrom;
    // restarting the scene after the player died
    this.hasStartedOver = (data.hasOwnProperty("hasStartedOver")) ? data.hasStartedOver : false;
  }

  preload() {
    this.isPaused = true;
  }

  create(){
    this.world = new Controler_TiledWorld(this);
    this.debugger = new Controler_Debugger(this);
    this.talk = new Controler_Talk(this);
    this.createController();

    // Camera's coordinates are always rounded, to prevent displayed object to be blurry
    this.cameras.main.roundPixels = true;

    this.resume();
    this.cameras.main.fadeIn(1000);
    // if(this.hasStartedOver===true){
    //   this.cameras.main.once('camerafadeincomplete',() => {
    //     this.cameras.main.flash(300);
    //   });
    // }
  }

  createController(){
  }

  update(time, delta) {
    if(!this.isPaused){
      this.world.update();
      this.controler.update();
    }
  }

  // Only pause physics, animation and update function
  pause() {
    this.isPaused = true;
    this.physics.pause();
    this.anims.pauseAll();
  }

  resume() {
    this.isPaused = false;
    this.physics.resume();
    this.anims.resumeAll();
  }

  // Starts over the scene, usually once the player died
  startOver() {
    this.pause();
    this.cameras.main.shake(300, 0.005);
    this.cameras.main.fadeOut(1000);
    this.cameras.main.once('camerafadeoutcomplete',() => {
      this.scene.restart({mapName: this.mapName, mapFrom:this.mapFrom, hasStartedOver:true});
    });
  }

  // Go to a new map
  exitMap(newMapName) {
    this.pause();
    this.cameras.main.fadeOut(1000);
    this.cameras.main.once('camerafadeoutcomplete',() => {
      this.scene.restart({mapName: newMapName, mapFrom:this.mapName});
    });
  }
}
