import Object_Group_Group from "./Group.js";
import Object_Weapon_Bullet from "../weapon/Bullet.js";
/**
 * The bullets sent by the player
 */
export default class Object_Group_Bullets extends Object_Group_Group{
	constructor(scene) {
		super(scene);
	  this.classType = Object_Weapon_Bullet;
	}

	update(){
		// Clear the bullets that leaves the map
		this.children.each((bullet) => {
			if (bullet.active) {
				if(bullet.x<0 || bullet.y<0 || bullet.x>this.scene.map.widthInPixels || bullet.y>this.scene.map.heightInPixels){
					bullet.explode();
				}else{
					bullet.update();
				}
			}
		});
	}

	addEvents(){
		this.scene.physics.add.collider(this, this.scene.worldLayer, (bullet) => {
			bullet.explode();
		});
		if(this.scene.enemies){
			this.scene.physics.add.collider(this, this.scene.enemies, (bullet, enemy) => {
				bullet.explode();
				enemy.die();
			});
		}
	}

	shootToward(direction) {
		// Get the first available sprite in the group. If none, create one.
		let bullet = this.getFirstDead(true);
		let spawn = this.getSpawningPoint();
		bullet.shootToward(spawn.x, spawn.y, direction);
	}

	shootAt(target) {
		// Get the first available sprite in the group. If none, create one.
		let bullet = this.getFirstDead(true);
		let spawn = this.getSpawningPoint();
		bullet.shootAt(spawn.x, spawn.y, target);
	}

	getSpawningPoint() {
		return {
			x: this.scene.player.x,
			y: this.scene.player.y + (0.5 - this.scene.player.originY) * this.scene.player.displayHeight
		};
	}
}
