import {} from '../core/init.js';
import Spritesheet_Game from "./Game.js";

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

window.game = new Spritesheet_Game(window.config);
