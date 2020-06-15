import {} from '../core/init.js';
import Spine_Scene_Preload from "./Scene_Preload.js";
import Spine_Scene_Tiled from "./Scene_Tiled.js";
import Scene_UserInterface from "../core/scene/UserInterface.js";

// The global variables used in the game
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

// Override the core config to add informations that are specific to the game
Object.assign(window.config, {
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

window.game = new Phaser.Game(window.config);
