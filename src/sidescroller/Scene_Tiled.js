import Scene_Tiled from "../core/scene/Tiled.js";
import Sidescroller_Controler_Player_Keyboard from "./Controler_Player_Keyboard.js";

/**
 * A side-scroller scene with gravity
 */
export default class Sidescroller_Scene_Tiled extends Scene_Tiled {

  init(data){
    this.defaultMapName = "tilemap";
    this.defaultMapFrom = "tilemap";
    super.init(data);
  }

  create(){
    // background image
    let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
    let scaleX = this.cameras.main.width / image.width;
    let scaleY = this.cameras.main.height / image.height;
    let scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0);

    super.create();

    // The player can jump through the platform
    this.worldLayer.forEachTile(function(tile){
      if(tile.canCollide){
        tile.setCollision(false, false, true, false);
      }
    });

    // Enemies don't bounce back when they fall. They only bounce when they meet a wall (bounceX)
		this.enemies.children.each((enemy) => {
			enemy.setBounceY(0);
		});

    // Increase the world bounds so the player can fall
    this.physics.world.bounds.height += 100;
  }

  // Create the player controler
  createController(){
    this.controler = new Sidescroller_Controler_Player_Keyboard(this, this.player);
    this.controler.enable();
  }

  update(time, delta) {
    super.update(time, delta);
    if(!this.isPaused){
      // If the enemy can't stand on the upcoming tile, he turns back
      this.enemies.children.each((enemy) => {
        const onGround = enemy.body.blocked.down;
        if(onGround){
          let x = Math.round(enemy.x + enemy.body.velocity.x/20);
          let y = Math.round(enemy.y + this.map.tileHeight / 2);
          let tile = this.worldLayer.getTileAtWorldXY(x, y, false);
          if(!tile || !tile.canCollide){
            enemy.body.velocity.x *= -1;
          }
        }
      });

      // if the player fall
      if(this.player.y > this.map.heightInPixels + this.player.displayHeight){
        this.startOver();
      }
    }
  }
}
