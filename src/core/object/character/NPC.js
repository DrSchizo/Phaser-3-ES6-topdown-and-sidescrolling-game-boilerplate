import Object_Character_Character from "./Character.js";

/**
 * Non Playable Character
 */
export default class Object_Character_NPC extends Object_Character_Character {

  constructor(scene, x, y, name, scene_id) {
    super(scene, x, y, name, 'npc');
    this.scene_id = scene_id; // scene_id is the id of the scene launched when we talk to the character
  }

  talk(){
    this.scene.talk.loadNewTalk(this);
  }
}
