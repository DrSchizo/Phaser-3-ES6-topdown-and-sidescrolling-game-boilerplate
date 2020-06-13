import Object_Group_Group from "./Group.js";
import Object_Character_NPC from "../character/NPC.js";

/**
 * Group that contains all the npcs
 */
export default class Object_Group_NPCs extends Object_Group_Group{
	constructor(scene) {
		super(scene);
	  this.classType = Object_Character_NPC;
	}

	// Create all NPCs listed in the TMX file
	importFromJSON(){
		const objectLayer = this.scene.map.getObjectLayer('NPCs');
		if(objectLayer){
			objectLayer.objects.forEach((object) => {
				//  object.name can be either "Eileen" or "Eileen_1", the optional second part being the scene id
				const array = object.name.split("_");
				const name = array[0];
				const scene_id = (array.length>1) ? array[1] : array[0];
				const npc = new Object_Character_NPC(this.scene, object.x, object.y, name, scene_id);
				this.add(npc);
			});
		}
	}

	update(){
		this.children.each((npc) => {
			if(npc.active){
				npc.update();
			}
		});
	}

	addEvents(){
    // NPCs can't go through walls and floors
    this.scene.physics.add.collider(this, this.scene.worldLayer);
	}
}
