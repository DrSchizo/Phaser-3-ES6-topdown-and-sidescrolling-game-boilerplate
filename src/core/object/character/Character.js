import Object_Sprite_Spine from "../sprite/Spine.js";
import Object_Sprite_Spritesheet from "../sprite/Spritesheet.js";
import {Object_Mixin_Move} from "../mixin/Move.js";

/**
 * Abstract character class
 */
export default class Object_Character_Character extends Object_Mixin_Move(Phaser.Physics.Arcade.Sprite) {

  constructor(scene, x, y, name, role) {
    super(scene, x, y);
    this.scene = scene;
    this.name = name; // same as the texture name and the default param
    this.role = role; // player, enemy, npc
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.isCrouching = false;
    this.isAttacking = false;

    // Assign mixin
    // Object.assign(this, Object_Mixin_Move);

    this.applyDefaultParam(); // apply default parameters defined in init.js
    this.setCollideWorldBounds(true); // don't go out of the map
    this.alignToTile(); // align the character to the tiles
    //
    this.setOrientation('down');
    this.stop();

    // The sprite follow the character on poststep event
    scene.game.events.on('poststep', this.poststep, this);

    // this.shadow = new Phaser.Physics.Arcade.Sprite(scene, this.x, this.y, "shadow");
    // this.shadow.setScale(1.5);
    // scene.add.existing(this.shadow);
  }

  // Apply default parameters defined in init.js
  applyDefaultParam(){
    let defaultParam = this.getDefaultParam();
    // if there is a relative scale, modify width, height and spriteScale accordingly
    if(defaultParam.relativeScale){
      if(defaultParam.width) defaultParam.width *= defaultParam.relativeScale;
      if(defaultParam.height) defaultParam.height *= defaultParam.relativeScale;
      if(!defaultParam.spriteScale) defaultParam.spriteScale = 1;
      defaultParam.spriteScale *= defaultParam.relativeScale;
    }
    // creation of the sprite
    if(defaultParam.spriteType){
      switch(defaultParam.spriteType){
        case 'Spritesheet':
          let texture = (defaultParam.spriteKey) ? defaultParam.spriteKey : this.name;
          this.sprite = new Object_Sprite_Spritesheet(this.scene, texture);
          if(defaultParam.spriteScale){
            this.sprite.setScale(defaultParam.spriteScale);
          }
          break;
        case 'Spine':
          let key = (defaultParam.spriteKey) ? defaultParam.spriteKey : this.name;
          let skin = (defaultParam.spriteSkin) ? defaultParam.spriteSkin : null;
          let scale = (defaultParam.spriteScale) ? defaultParam.spriteScale : null;
          this.sprite = new Object_Sprite_Spine(this.scene, key, skin, scale);
          break;
      }
    }
    // modification of the origin
    if(defaultParam.originX && defaultParam.originY){
      this.setOrigin(defaultParam.originX, defaultParam.originY);
      if(this.sprite){
        this.sprite.setOrigin(defaultParam.originX, defaultParam.originY);
      }
    }
    // modification of the size
    if(defaultParam.width && defaultParam.height){
      this.setSize(defaultParam.width, defaultParam.height);
      // since the character has no texture by itself, its default width is 32x32
      // since we change the size, we have to modify the offset accordingly
      let offsetX = (32 - defaultParam.width) * this.originX;
      let offsetY = (32 - defaultParam.height) * this.originY;
      this.setOffset(offsetX, offsetY);
    }
    // definition of the speed
    this.speed = (defaultParam.speed) ? defaultParam.speed : 100;
    this.speedBase = this.speed; // remember the default speed
  }

  // Get default parameters defined in init.js
  getDefaultParam(){
    let defaultParam = { sprite:'Spritesheet', width:26, height:48, originX:0.5, originY:1, speed: 100 };
    if(window.const.characters){
      if(window.const.characters.default){
        Object.assign(defaultParam, window.const.characters.default);
      }
      if(window.const.characters[this.role]){
        Object.assign(defaultParam, window.const.characters[this.role]);
      }
      if(window.const.characters[this.name]){
        Object.assign(defaultParam, window.const.characters[this.name]);
      }
    }
    return defaultParam;
  }

  // TODO: set the correct width and height to make getCenter and getTopCenter to work properly
  // Gets the center coordinate of this Game Object, regardless of origin.
  // Replaces getCenter
  getTrueCenter() {
    const x = this.x + (0.5 - this.originX) * this.body.width;
    const y = this.y + (0.5 - this.originY) * this.body.height;
    return new Phaser.Math.Vector2(x,y);
  }

  // TODO: set the correct width and height to make getCenter and getTopCenter to work properly
  // Gets the top center and top left coordinate of the sprite, regardless of origin.
  // Use for displaying the bubble speech on top of the character, so use sprite size if possible
  getSpriteTopCenter(checkBody) {
    const width = (this.sprite) ? this.sprite.displayWidth : this.body.width;
    const height = (this.sprite) ? this.sprite.displayHeight : this.body.height;
    const x = this.x + (0.5 - this.originX) * width;
    const y = this.y - this.originY * height;
    return new Phaser.Math.Vector2(x,y);
  }
  getSpriteTopLeft(checkBody) {
    const width = (this.sprite) ? this.sprite.displayWidth : this.body.width;
    const height = (this.sprite) ? this.sprite.displayHeight : this.body.height;
    const x = this.x + (1 - this.originX) * width;
    const y = this.y - this.originY * height;
    return new Phaser.Math.Vector2(x,y);
  }

  // The character is aligned to the current tile
  alignToTile() {
    this.x = this.scene.map.tileWidth * (Math.floor(this.x/this.scene.map.tileWidth) + this.originX);
    this.y = this.scene.map.tileHeight * (Math.floor(this.y/this.scene.map.tileHeight) + this.originY);
  }

  // The x and y coordinates are calculated according to the tile grid, not in pixel
  setGridCoordinate(x,y) {
    this.x = this.scene.map.tileWidth * (x + 0.5);
    this.y = this.scene.map.tileHeight * (y + 0.5);
  }

  // The x and y coordinates are calculated in tiles, not in pixel
  getGridCoordinate() {
    return {
      x: Math.floor(this.x/this.scene.map.tileWidth),
      y: Math.floor(this.y/this.scene.map.tileHeight)
    };
  }

  update() {
    super.update();
  }

  poststep() {
    if(this.active && this.sprite) {
      this.sprite.x = this.x;
      this.sprite.y = this.y;
      this.sprite.setDepth(this.sprite.y);
    }
  }

  // look at another object
  lookAt(target) {
    if(this.sprite) this.sprite.lookAt(target);
  }

  // look ahead, according to player velocity
  lookAhead(){
    if(this.sprite) this.sprite.lookAhead(this.body);
  }

  // look ahead, according to player velocity
  walkAhead(){
    if(this.sprite) this.sprite.walkAhead(this.body);
  }

  // Orientation
  getOrientation() { return this.orientation; }
  setOrientation(orientation) {
    if(orientation != this.orientation){
      this.orientation = orientation;
      if(this.sprite) this.sprite.setOrientation(orientation);
    }
  }

  // play walk animation
  walk() {
    if(this.sprite) this.sprite.walk();
  }

  // play run animation
  run() {
    if(this.sprite) this.sprite.run();
  }

  // play jump animation
  jump() {
    if(this.sprite) this.sprite.jump();
  }

  // an attack takes 500ms
  attack(){
    if(!this.isAttacking){
      this.isAttacking = true;
      if(this.sprite) this.sprite.attack();
      this.scene.time.addEvent({
        delay: 500,
        callback: () => {
          this.isAttacking = false;
        }
      })
    }
  }

  stop() {
    if(this.sprite) this.sprite.stop();
  }

  die(){
    if(this.sprite) this.sprite.die();
		// this.setActive(false);
    this.destroy();
  }

  // toggle crouch or stand
  setCrouch(isCrouching) {
    if(this.isCrouching != isCrouching){
      // change the speed accordingly. Works?
      // this.body.setMaxSpeed((isCrouching) ? this.speedBase / 2 : this.speed);
      this.isCrouching = isCrouching;
      if(this.sprite){
        this.sprite.setCrouch(isCrouching);
      }
    }
  }

  destroy(){
    // this.scene.game.events.off('poststep', this.poststep);
    // this.shadow.destroy();
    // if(this.sprite) this.sprite.destroy();
    super.destroy();
  }
}
