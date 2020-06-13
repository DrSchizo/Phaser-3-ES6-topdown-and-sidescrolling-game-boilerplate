/**
 * Character sprite
 */
export default class Object_Sprite_Spritesheet extends Phaser.GameObjects.Sprite {

  constructor(scene, texture) {
    super(scene, 0, 0, texture);
    this.spritesheet = texture;
    scene.add.existing(this);
    // this.setScale(1.5);
    // this.setOrigin(0.5, 1);

    // Create the character's walking animations from the texture. These are stored in the global
    // animation manager so any sprite can access them.
    scene.anims.create({
      key: this.spritesheet + '-down',
      frames: scene.anims.generateFrameNumbers(this.spritesheet, { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: this.spritesheet + '-left',
      frames: scene.anims.generateFrameNumbers(this.spritesheet, { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: this.spritesheet + '-right',
      frames: scene.anims.generateFrameNumbers(this.spritesheet, { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: this.spritesheet + '-up',
      frames: scene.anims.generateFrameNumbers(this.spritesheet, { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1
    });
  }

  // setAnimation(animation, loop) {
  //   if(this.animation !== animation) {
  //     this.animation = animation;
  //     this.anims.play(this.spritesheet + '-' + this.orientation, true);
  //   }
  // }

  setOrientation(orientation) {
    if(orientation != this.orientation) {
      this.orientation = orientation;
      this.anims.play(this.spritesheet + '-' + this.orientation, true);
    }
  }

  // look at another object
  lookAt(target) {
    this.lookAtVector(target.x - this.x, target.y - this.y);
  }

  // look ahead, according to body velocity
  lookAhead(body){
    this.lookAtVector(body.velocity.x, body.velocity.y);
  }

  // set orientation according to a vector
  lookAtVector(varX, varY) {
    let orientation;
    if (Math.abs(varX)>Math.abs(varY)) {
      if (varX<0) {
        orientation = "left";
      } else {
        orientation = "right";
      }
    } else {
      if (varY<0) {
        orientation = "up";
      } else {
        orientation = "down";
      }
    }
    this.setOrientation(orientation);
  }

  walkAhead(body){
    this.lookAhead(body);
    this.walk(this.orientation);
  }

  walk() {
    this.action = "walk";
    this.anims.play(this.spritesheet + '-' + this.orientation, true);
  }

  jump() {
    this.walk();
    this.anims.stop();
  }

  attack() {
  }

  // crouch or stand
  setCrouch(boolean) {
    this.isCrouching = boolean;
  }

  stop() {
    this.action = "idle";
    // this.anims.restart();
    this.anims.stop();
  }

  die(){
    this.destroy();
  }
}
