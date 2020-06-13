import Topdown_Scene_Preload from "./Scene_Preload.js";
import Topdown_Scene_Tiled from "./Scene_Tiled.js";
import Scene_UserInterface from "../core/scene/UserInterface.js";

export default class Topdown_Game extends Phaser.Game {
  constructor(config){
    Object.assign(config, {
      scene: [ Topdown_Scene_Preload, Topdown_Scene_Tiled, Scene_UserInterface ],
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 }
        }
      }
    });
    super(config);
  }
}
