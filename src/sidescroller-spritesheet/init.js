import {} from '../core/init.js';
import Spritesheet_Scene_Preload from "./Scene_Preload.js";
import Spritesheet_Scene_Tiled from "./Scene_Tiled.js";
import Scene_UserInterface from "../core/scene/UserInterface.js";

// The global variables used in the game
window.const = {
  rep: 'sidescroller-spritesheet',
  mainScene: 'Spritesheet_Scene_Tiled',
  characters:{
    default: { spriteType:'Spritesheet', spriteScale:1.5, width:26, height:48, originX:0.5, originY:1, speed: 100 },
    player: { speed: 200 },
    enemy: { width:8 },
    skeleton: { width:50 },
  }
}

// Override the core config to add informations that are specific to the game
Object.assign(window.config, {
  scene: [ Spritesheet_Scene_Preload, Spritesheet_Scene_Tiled, Scene_UserInterface ],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 400 }
    }
  }
});

window.game = new Phaser.Game(window.config);
