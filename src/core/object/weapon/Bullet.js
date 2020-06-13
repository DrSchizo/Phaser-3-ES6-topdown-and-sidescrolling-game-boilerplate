import {Object_Mixin_Move} from "../mixin/Move.js";
/**
 * The bullets sent by the player
 */
export default class Object_Weapon_Bullet extends Object_Mixin_Move(Phaser.Physics.Arcade.Sprite) {

	constructor(scene, x, y) {
		super(scene, x, y, 'fireball');
    this.speed = 400;
    this.flipX = true
    // don't go out of the map
    // this.setCollideWorldBounds(true);
	}

	update(x, y, direction) {
		this.setDepth(this.y);
	}

  // shoot toward the direction of the player: top, down, left, right
	shootToward(x, y, direction) {
		this.body.reset(x, y);
		this.setActive(true);
		this.setVisible(true);
		this.body.setAllowGravity(false); // Here because body doesn't exist in the constructor. Find a better place?
		this.moveToward(direction);
    this.rotation = this.body.velocity.angle();
	}

  // shoot at an object
	shootAt(x, y, target) {
		this.body.reset(x, y);
		this.setActive(true);
		this.setVisible(true);
		this.moveToObject(target);
    this.rotation = this.body.velocity.angle();
	}

  // the direction is defined by an angle
	shootFromAngle(x, y, angle) {
		this.body.reset(x, y);
		this.setActive(true);
		this.setVisible(true);
    // this.setVelocityX(this.speed * Math.cos(Math.PI * angle / 180));
    // this.setVelocityY(this.speed * Math.sin(Math.PI * angle / 180));
    // this.scene.physics.velocityFromAngle(angle, this.speed, this.body.velocity);
	}

  explode() {
		this.body.reset(0,0);
		this.setActive(false);
		this.setVisible(false);
	}
}
