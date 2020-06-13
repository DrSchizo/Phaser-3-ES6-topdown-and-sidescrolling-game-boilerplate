export class UI_TextButton extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text) {
    let style = {
        fontFamily: 'Arial', fontSize: 20, color: '#fff', align: 'center',
        stroke: '#000',
        strokeThickness: 4,
      };
    super(scene, x, y, text, style);
    this.scene = scene;
  }

  enable(load) {
    this.load = load;
    // object[i].setInteractive({ cursor: 'url(assets/cursors/talk.png), pointer' });
    this.setInteractive({ cursor: 'url(assets/cursors/32x32/finger.png), pointer' })
      .on('pointerover', this.mouseOver)
      .on('pointerout', this.mouseOut)
      .on('pointerup', this.mouseClick);
  }

  disable() {
    this.removeInteractive()
      .off('pointerover', this.mouseOver)
      .off('pointerout', this.mouseOut)
      .off('pointerup', this.mouseClick);
  }

  mouseOver() {
    this.setStyle({ fill: '#E24646'});
  }

  mouseOut() {
    this.setStyle({ fill: '#FFFFFF'});
  }

  mouseClick() {
    // retrieves the active main scene
    let scene = this.scene.scene.get(window.const.mainScene);
    // load the answer
    scene.talk.loadAnswer(this.load);
  }
}
