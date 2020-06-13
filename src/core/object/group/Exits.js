import Object_Group_Group from "./Group.js";

/**
 * Group that contains all the exits
 */
export default class Object_Group_Exits extends Object_Group_Group{
	constructor(scene) {
		super(scene);
	}

	// Create all exits listed in the TMX file
	importFromJSON(){
		const objectLayer = this.scene.map.getObjectLayer('Objects');
		if(objectLayer){
			objectLayer.objects.forEach((object) => {
				if (object.type === 'exit') {
						let zone = this.scene.add.zone(object.x, object.y).setSize(object.width, object.height).setOrigin(0, 0);
						zone.type = object.type;
						zone.to = object.name;
						this.add(zone);
			  		zone.body.setAllowGravity(false); // Prevents the exit to fall down
				}
			});
		}
	}

	addEvents(){
		// if the player walk over an exit
		this.scene.physics.add.overlap(this.scene.player, this, (player, exit) => {
      this.scene.exitMap(exit.to);
		});
	}
}
