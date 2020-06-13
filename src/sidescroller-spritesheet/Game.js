import Spritesheet_Scene_Preload from "./Scene_Preload.js";
import Spritesheet_Scene_Tiled from "./Scene_Tiled.js";
import Scene_UserInterface from "../core/scene/UserInterface.js";

export default class Spritesheet_Game extends Phaser.Game {
  constructor(config){
    Object.assign(config, {
      scene: [ Spritesheet_Scene_Preload, Spritesheet_Scene_Tiled, Scene_UserInterface ],
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 400 }
        }
      }
    });
    super(config);
  }
}
