window.basepath = 'http://localhost/sandbox/demo/';
// window.basepath = 'http://sandbox-adventure.com/demo/';

window.config = {
  type: Phaser.AUTO,
  // mode: Phaser.Scale.ENVELOP,
  // autoCenter: Phaser.Scale.CENTER_BOTH,
  width: window.innerWidth * window.devicePixelRatio,
  height: window.innerHeight * window.devicePixelRatio,
  parent: "game-container",
  pixelArt: true,
};

// Make sure the game always fills all the window available space
window.addEventListener("resize", () => {
  let width = window.innerWidth * window.devicePixelRatio;
  let height = window.innerHeight * window.devicePixelRatio;
  window.game.scale.resize(width, height);
  window.game.scene.scenes.forEach(function (scene) {
    if(scene.cameras.main){
      scene.cameras.main.setViewport(0, 0, width, height);
    }
  });
},false);
