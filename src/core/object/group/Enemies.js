import Object_Group_Group from "./Group.js";
import Object_Character_Enemy from "../character/Enemy.js";

/**
 * Group that contains all the enemies
 */
export default class Object_Group_Enemies extends Object_Group_Group{
	constructor(scene) {
		super(scene);
	  this.classType = Object_Character_Enemy;
	}

	// Create all enemies listed in the TMX file
	importFromJSON(){
		const objectLayer = this.scene.map.getObjectLayer('Enemies');
		if(objectLayer){
			objectLayer.objects.forEach((object) => {
				// if(object.name=='skeleton'){
					const enemy = new Object_Character_Enemy(this.scene, object.x, object.y, object.name);
					this.add(enemy);
					// let distance = this.getObjectProperty('distance', object); // useless for now
					let direction = this.getObjectProperty('direction', object);
					if(direction) enemy.moveToward(direction);
				// }
			});
		}
	}

	update(){
		this.children.each((enemy) => {
			if(enemy.active){
				enemy.update();
			}
		});
	}

	addEvents(){
    // Enemies can't go through walls and floors
    this.scene.physics.add.collider(this, this.scene.worldLayer);

    // Restart scene when the player hit an enemy
    this.scene.physics.add.collider(this, this.scene.player, (player, enemy) => {
			enemy.lookAt(player);
			enemy.attack();
			player.die();
			this.scene.startOver();
    });
	}
}
