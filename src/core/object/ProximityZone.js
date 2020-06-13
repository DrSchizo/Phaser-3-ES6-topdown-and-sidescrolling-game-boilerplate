/**
 * Zone that detect when the player is close to a character
 */
export default class Object_Proximity extends Phaser.GameObjects.Zone {

  constructor(scene, controler, character) {
    const coordinate = character.getTrueCenter();
    // const coordinate = character.sprite.getCenter();
    super(scene, coordinate.x, coordinate.y, 2*scene.map.tileWidth, 2*scene.map.tileHeight);
    this.scene = scene;
    this.character = character;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    // scene.physics.add.overlap(scene.player, this);
    // this.body.setAllowGravity(false); // Prevents the proximity zone to fall down
    // Add the icon
    // this.icon = this.scene.add.image(this.x - 10, this.y - 42, 'talk_icon');
    const coordinate2 = character.getSpriteTopCenter();
    // this.icon = this.scene.add.image(this.x - 10, this.y - character.body.height/2 - 20, 'talk_icon');
    this.icon = this.scene.add.image(coordinate2.x - 10, coordinate2.y - 10, 'talk_icon');
    this.icon.setDepth(this.scene.map.heightInPixels + 20);
    this.icon.setOrigin(0.5,1);
    this.icon.setVisible(false);
  }

  update() {
    // Treat 'embedded' as 'touching' also
    if (this.body.embedded) this.body.touching.none = false;
    this.touching = !this.body.touching.none;
    this.wasTouching = !this.body.wasTouching.none;
    if (this.touching && !this.wasTouching) this.overlapIn();
    else if (!this.touching && this.wasTouching) this.overlapOut();
  }

  overlapIn(){
    this.icon.setVisible(true);
    this.scene.input.keyboard.once('keydown_SPACE', this.trigger, this);
  }

  overlapOut(){
    this.icon.setVisible(false);
    this.scene.input.keyboard.off('keydown_SPACE', this.trigger);
  }

  // If the player press the SPACE bar while being in a proximity zone
  trigger(){
    this.icon.setVisible(false);
    this.scene.player.lookAt(this.character);
    this.scene.player.stop();
    this.character.lookAt(this.scene.player);
    this.character.stop();
    this.character.talk();
  }
}
