/**
 * Group
 */
export default class Object_Group_Group extends Phaser.Physics.Arcade.Group{
	constructor(scene) {
		super(scene.physics.world, scene);
    this.scene = scene;
	}

	update(){
	}

	addEvents(){
	}

  // get a property from an object defined in the JSON map
  getObjectProperty(property, object){
    let value;
		if(object.properties){
	    object.properties.forEach((item, index) => {
	      if (item.name === property) {
	        value = item.value;
	        return;
	      }
	    });
		}
    return value;
    // for (var i=0; i < array.length; i++) {
    //   if (array[i].name === property) {
    //     return array[i].value;
    //   }
    // }
  }
}
