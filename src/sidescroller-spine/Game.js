import Spine_Scene_Preload from "./Scene_Preload.js";
import Spine_Scene_Tiled from "./Scene_Tiled.js";
import Scene_UserInterface from "../core/scene/UserInterface.js";

export default class Spine_Game extends Phaser.Game {
  constructor(config){
    Object.assign(config, {
      scene: [ Spine_Scene_Preload, Spine_Scene_Tiled, Scene_UserInterface ],
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 300 }
        }
      },
      plugins: {
        scene: [
          // { key: 'FollowPlugin', plugin: PhaserFollowPlugin, mapping: 'follow' },
        	{ key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine' },
        ]
      }
    });
    super(config);
  }
}
