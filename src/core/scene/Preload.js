/*
 * Boot scene from Tilemap & File Pack Project Template by B3L7
 * https://github.com/B3L7/phaser3-tilemap-pack/blob/master/src/scenes/Preload.js
 * Not currently used
 */

export default class Scene_Preload extends Phaser.Scene {

  preload(){
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    //create a background and prepare loading bar
    // this.cameras.main.setBackgroundColor(0x2a0503);
    this.fullBar = this.add.graphics();
    this.fullBar.fillStyle(0xdddddd, 1);
    this.fullBar.fillRect((width / 4)-2,(height /2) - 28, (width / 2) + 4, 30);
    this.progress = this.add.graphics();

    this.loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '14px Arial',
        fill: '#dddddd'
      }
    });
    this.loadingText.setOrigin(0.5, 0.5);

    this.percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 13,
      text: '0%',
      style: {
        font: '14px Arial',
        fill: '#dddddd'
      }
    });
    this.percentText.setOrigin(0.5, 0.5);

    this.assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 24,
      text: '',
      style: {
        font: '14px Arial',
        fill: '#dddddd'
      }
    });
    this.assetText.setOrigin(0.5, 0.5);

    //pass loading progress as value to loading bar and redraw as files load
    this.load.on('progress', function (value) {
      this.percentText.setText(parseInt(value * 100) + '%');
      this.progress.clear();
      this.progress.fillStyle(0x333333, 1);
      this.progress.fillRect((width / 4), (height /2) - 26, (width / 2) * value, 26);
    }, this);

    this.load.on('fileprogress', function (file) {
      this.assetText.setText(file.key);
    }, this);

    //cleanup our graphics on complete
    this.load.on('complete', function () {
      this.progress.destroy();
      this.fullBar.destroy();
      this.loadingText.destroy();
      this.percentText.destroy();
      this.assetText.destroy();
    }, this);

    // Load a JSON pack file
    // https://github.com/photonstorm/phaser3-examples/blob/master/public/assets/loader-tests/pack1.json
    // https://github.com/photonstorm/phaser3-examples/blob/master/public/assets/loader-tests/pack5.json

    // Load a JSON fil with additional information
    // https://labs.phaser.io/edit.html?src=src\cache\json%20file.js

    // this.load.bitmapFont('gothic', './assets/fonts/gothic.png', './assets/fonts/gothic.xml');

    // An atlas is a way to pack multiple images together into one texture.
    // I'm using it to load all the player animations (walking left, walking right, etc.) in one image.
    // this.load.atlas("atlas", "./assets/tuxemon/atlas/atlas.png", "./assets/tuxemon/atlas/atlas.json");
  }

  create() {
    // this.initRegistry();
    this.scene.launch('Scene_UserInterface');
    this.scene.start(window.const.mainScene);
  }

  initRegistry() {
    // the registry is common to every scenes. It allows to share data easily accross scenes.
    this.registry.set('score', 0);
  }
}
