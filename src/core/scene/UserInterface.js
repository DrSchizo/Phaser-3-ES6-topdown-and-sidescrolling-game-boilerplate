// import UI_SpeechBubble from "../ui/SpeechBubble.js";
import UI_Subtitle from "../ui/Subtitle.js";

/**
 * The User Interface
 */
export default class Scene_UserInterface extends Phaser.Scene {

  constructor() {
    super('Scene_UserInterface');
    // super({ key: 'Scene_UserInterface', active: true });
    // super({ key: 'Scene_UserInterface' });
  }

  create() {
    // create the subtitle area
    this.subtitle = new UI_Subtitle(this);
    
    // setTimeout(() => {this.openInfoBox()}, 5000);
  }

  openInfoBox() {
    // Help text that has a "fixed" position on the screen
    const text = [
      'This is a work in progress RPG styled demo for Sandbox Adventure Engine',
      '',
      'Keyboard controler: arrows to move, space bar to interact with objects and characters, shift to shoot fireball',
      'Mouse controler: left click to move and interact with objects and characters, long left click to shoot fireball',
      'You can switch from one controler to another but do not use them at the same time.',
      '',
      'Press any key to close this popup.',
      '',
      '--------------------------------',
      '',
      'Made with Phaser 3 https://phaser.io/',
      'Tileset by Tuxemon https://github.com/Tuxemon/Tuxemon',
      'Sprites by Pipoya https://pipoya.itch.io/',
      'Mouse cursors by Freepik from Flaticon https://www.flaticon.com/',
      'Thanks to Richard Davey, Samme and all the Phaser communauty for the support',
      'Thanks to Michael Hadley for the Phaser tutorial and the head start',
    ];

    this.popup = this.add
      .text(this.cameras.main.centerX, this.cameras.main.centerY, text.join('\n'), {
        font: "16px Arial",
          // font: "18px monospace",
        fill: "#fff",
        padding: { x: 20, y: 20 },
        backgroundColor: "#303030",
        borderColor: "#fff",
      })
      .setScrollFactor(0)
      .setDepth(30)
      .setOrigin(0.5, 0.5);

    this.scene.get(window.const.mainScene).controler.disable();
    this.input.once("pointerup", this.closeInfoBox, this);
    this.input.keyboard.once("keydown", this.closeInfoBox, this);
  }

  closeInfoBox() {
    this.input.off("pointerup", this.closeInfoBox);
    this.input.keyboard.off("keydown", this.closeInfoBox);
    this.popup.destroy();
    setTimeout(() => {
      this.scene.get(window.const.mainScene).controler.enable();
    }, 100);
  }

  update(time, delta) {
  }
}
