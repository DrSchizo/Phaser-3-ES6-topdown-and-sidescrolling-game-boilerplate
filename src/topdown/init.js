import {} from '../core/init.js';
import Topdown_Scene_Preload from "./Scene_Preload.js";
import Topdown_Scene_Tiled from "./Scene_Tiled.js";
import Scene_UserInterface from "../core/scene/UserInterface.js";

// The global variables used in the game
window.const = {
  rep: 'topdown',
  mainScene: 'Topdown_Scene_Tiled',
  characters:{
    default: { spriteType:'Spritesheet', spriteScale:1.5, width:26, height:16, originX:0.5, originY:1, speed: 100 },
    player: { speed: 200 },
    skeleton: { speed:50 },
    demon: { speed:150 },
  }
}

// Override the core config to add informations that are specific to the game
Object.assign(window.config, {
  scene: [ Topdown_Scene_Preload, Topdown_Scene_Tiled, Scene_UserInterface ],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  }
});

window.game = new Phaser.Game(window.config);
