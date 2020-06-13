import Scene_Preload from "../core/scene/Preload.js";

/**
 * Scene to prelad assets
 */
export default class Spritesheet_Scene_Preload extends Scene_Preload {

  constructor() {
    super("Spritesheet_Scene_Preload");
  }

  preload() {
    super.preload();
    // talk icon
    this.load.image("talk_icon", "./assets/cursors/32x32/talk.png");
    // weapon
    this.load.image("fireball", "./assets/sprites/fireball.png");
    // player
    this.load.spritesheet('player', './assets/sprites/pipoya/player.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('shadow', './assets/sprites/pipoya/shadow.png', { frameWidth: 32, frameHeight: 32 });
    // npc
    this.load.spritesheet('heroin', './assets/sprites/pipoya/npc/heroin.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('polkin', './assets/sprites/pipoya/npc/polkin.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('munch', './assets/sprites/pipoya/npc/munch.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('ilvis', './assets/sprites/pipoya/npc/ilvis.png', { frameWidth: 32, frameHeight: 32 });
    // Enemy
    this.load.spritesheet('skeleton', './assets/sprites/pipoya/enemy/skeleton.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('specter', './assets/sprites/pipoya/enemy/specter.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('ghost', './assets/sprites/pipoya/enemy/ghost.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('pumpkin', './assets/sprites/pipoya/enemy/pumpkin.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('demon', './assets/sprites/pipoya/enemy/demon.png', { frameWidth: 32, frameHeight: 32 });
  }
}
