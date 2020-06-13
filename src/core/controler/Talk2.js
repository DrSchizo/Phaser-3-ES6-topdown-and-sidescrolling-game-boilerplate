import UI_SpeechBubble from "../ui/SpeechBubble.js";

/**
 * Controler that allow us to talk to NPC
 */
export default class Controler_Talk {

  constructor(scene) {
    this.scene = scene;

    // Create the speech bubble
    this.speechBubble = new UI_SpeechBubble(this.scene);
    this.speechBubble.setDepth(this.scene.map.heightInPixels + 15);

    // retrieve the subtitle area
    this.subtitle = this.scene.scene.get('Scene_UserInterface').subtitle;
  }

  // Start a new conversation
  loadNewTalk (pnj){
    // Display a subtitle
    this.subtitle.displayQuote("This is a subtitle");
    this.subtitle.setVisible(true);
    // Display the speech bubble
    const coordinate = npc.getSpriteTopLeft();
    this.speechBubble.update(coordinate.x + 10, coordinate.y - 10, "Hello");
    this.speechBubble.setVisible(true);
    // Disable the player controler and wait for a click to end the talk
    this.scene.controler.disable();
    this.waitForClick();
  }

  // Wait for the click to display the next talk
  waitForClick(){
    this.scene.input.once('pointerup', this.endTalk, this);
    this.scene.input.keyboard.once('keydown_SPACE', this.endTalk, this);
  }

  // End the conversation
  endTalk(){
    this.scene.input.off('pointerup', this.endTalk);
    this.scene.input.keyboard.off('keydown_SPACE', this.endTalk);
    this.scene.controler.enable();
  }
}
