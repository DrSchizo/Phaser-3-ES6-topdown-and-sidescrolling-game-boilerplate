import Object_Character_Character from "./Character.js";

/**
 * The player character
 */
export default class Object_Character_Player extends Object_Character_Character {

  constructor(scene, x, y) {
    super(scene, x, y, 'player', 'player');
  }
  
}
