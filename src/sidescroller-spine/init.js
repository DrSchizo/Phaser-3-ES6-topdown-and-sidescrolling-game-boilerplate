import {} from '../core/init.js';
import Spine_Game from "./Game.js";

window.const = {
  rep: 'sidescroller-spine',
  mainScene: 'Spine_Scene_Tiled',
  characters:{
    default: { spriteType:'Spine', spriteKey:'2danim', spriteSkin:'Dummy', spriteScale:0.45, width:40, height:110, originX:0.5, originY:1, speed: 100 },
    player: { spriteSkin:'Pamela-1', speed: 400 },
    munch: { spriteSkin:'Beardy' },
    ilvis: { spriteSkin:'Young', relativeScale:1.1 },
    polkin: { spriteSkin:'Pamela-5' },
    heroin: { spriteSkin:'Pamela-3', relativeScale:0.95 },
    skeleton: { spriteSkin:'Assassin', speed: 50 },
    pumpkin: { spriteSkin:'Turbo', relativeScale:1.6 },
  }
}

window.game = new Spine_Game(window.config);
