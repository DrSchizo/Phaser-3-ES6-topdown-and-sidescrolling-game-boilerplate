/**
 *
 */
export default class Controler_Debugger {

  constructor(scene) {// Debug graphics
    this.scene = scene;

    scene.input.keyboard.on("keydown_P", event => {
      scene.scene.pause();
      // if(scene.isPaused) scene.resume();
      // else scene.pause();
    });

    scene.input.keyboard.once("keydown_D", event => {
      scene.cameras.main.flash(300);
      // Turn on physics debugging to show player's hitbox
      scene.physics.world.createDebugGraphic();

      // Create worldLayer collision graphic above the player, but below the help text
      const graphics = scene.add
        .graphics()
        .setAlpha(0.75)
        .setDepth(20);
      scene.worldLayer.renderDebug(graphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      });
    });
  }

  log(quote){
    if(!this.console){
      this.console = this.scene.add
        .text(10, 10, 'e', {
          font: "16px Arial",
          fill: "#fff",
          padding: { x: 20, y: 20 },
          backgroundColor: "#303030",
          borderColor: "#fff",
        })
        .setScrollFactor(0)
        .setDepth(3000000);
    }
    this.console.setText(quote);
  }

}
