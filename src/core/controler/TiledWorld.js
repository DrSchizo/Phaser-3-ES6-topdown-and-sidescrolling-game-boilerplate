import Object_Character_Player from "../object/character/Player.js";
import Object_Weapon_SwordSlash from "../object/weapon/SwordSlash.js";
import Object_Group_NPCs from "../object/group/NPCs.js";
import Object_Group_Exits from "../object/group/Exits.js";
import Object_Group_Bullets from "../object/group/Bullets.js";
import Object_Group_Enemies from "../object/group/Enemies.js";

/**
 * The world : map, npc, player
 */
export default class Controler_TiledWorld {

  constructor(scene) {

    this.scene = scene;

    scene.map = scene.make.tilemap({ key: "map_"+scene.mapName });

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    scene.tileset = scene.map.addTilesetImage("tileset", "tiles");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    scene.belowLayer = scene.map.createStaticLayer("Below", scene.tileset, 0, 0);
    scene.worldLayer = scene.map.createStaticLayer("World", scene.tileset, 0, 0);
    scene.aboveLayer = scene.map.createStaticLayer("Above", scene.tileset, 0, 0);

    scene.worldLayer.setCollisionByProperty({ collides: true });

    // Sprite depth is equal to its y coordinate.
    // The aboye layer must be over all sprites, so it must be higher than the map height
    scene.aboveLayer.setDepth(scene.map.heightInPixels + 10);

    // Define the world bound so characters don't go out of the map
    scene.physics.world.bounds.width = scene.map.widthInPixels;
    scene.physics.world.bounds.height = scene.map.heightInPixels;

    // Create the player
    scene.player = new Object_Character_Player(scene, 0, 0);

    // Create the player weapons
    scene.bullets = new Object_Group_Bullets(scene);
    // scene.swordSlash = new Object_Weapon_SwordSlash(scene);

    // Create the interactive objects
    scene.npcs = new Object_Group_NPCs(scene);
    scene.exits = new Object_Group_Exits(scene);
    scene.enemies = new Object_Group_Enemies(scene);

    // Import the interactive objects from the loaded JSON map
    scene.npcs.importFromJSON();
    scene.exits.importFromJSON();
    scene.enemies.importFromJSON();

    // Find the player spawning point
		const objectLayer = scene.map.getObjectLayer('Objects');
		if(objectLayer){
			objectLayer.objects.forEach((object) => {
				if (object.type === 'entrance' && object.name == scene.mapFrom) {
          scene.player.setPosition(object.x, object.y).alignToTile();
          return;
        }
      });
    }

    // Camera settings
    const camera = scene.cameras.main;
    camera.startFollow(scene.player);
    camera.setBounds(0, 0, scene.map.widthInPixels, scene.map.heightInPixels);

    // Add event listeners
    this.addEvents();
  }

  // Add event listeners
  addEvents(){
    this.scene.exits.addEvents();
    this.scene.npcs.addEvents();
    this.scene.enemies.addEvents();
    this.scene.bullets.addEvents();
    // if(this.scene.swordSlash) this.scene.swordSlash.addEvents();
  }

  update(){
    this.scene.player.update();
    this.scene.npcs.update();
    this.scene.enemies.update();
    this.scene.bullets.update();
    // if(this.scene.swordSlash) this.scene.swordSlash.update();
  }

}
