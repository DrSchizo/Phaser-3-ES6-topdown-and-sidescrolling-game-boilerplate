import {} from '../core/init.js';
import Topdown_Game from "./Game.js";

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

window.game = new Topdown_Game(window.config);
