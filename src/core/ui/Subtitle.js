import { UI_TextButton } from './TextButton.js';

/**
 * A subtitle for talks. Used for narration and player choices
 */
export default class UI_Subtitle {

  constructor(scene) {
    this.scene = scene;
    this.padding = 10;
    this.contents = scene.add.group();
    // this.update("<a href=\"#\" load=\"Action::Dialoguer:pnj:10\"); return false;\">Please tell me more<\/a><br\/><a href=\"#\" load=\"Action::Dialoguer:pnj:11\"); return false;\">I've heard enough<\/a>");
    // this.setVisible(true);
  }

  // Display a narration
  displayQuote(quote){
    this.resetText();
    this.addText(quote);
  }

  // Display all the player's choice
  displayChoices(choices){
    this.resetText();
    choices.forEach((choice, index) => {
      this.addText(choice.quote, choice.load);
    });
  }

  // we reset all the text elements
  resetText(){
    this.contents.children.iterate((text) => {
      text.setActive(false);
    });
  }

  update(parsed){
    // we reset all the text elements
    this.contents.children.iterate((text) => {
      text.setActive(false);
    });
    // It is a narration
    if (!Array.isArray(parsed)){
      this.addText(parsed);
    }else{
      // Display all the player's choice
      parsed.forEach((item, index) => {
        this.addText(item.quote, item.load);
      });
    }
    div.remove();
  }

  addText(quote, load){
    // Search for the first inactive text element
    let text = this.contents.getFirstDead();
    // if there isn't, let's create one!
    if(text == null){
      text = new UI_TextButton(this.scene);
      this.scene.add.existing(text);
      this.contents.add(text);
    }
    text.setText(quote);
    text.setWordWrapWidth(this.scene.cameras.main.width);
    text.setActive(true);
    if(load){
      text.enable(load);
    }else{
      text.disable();
    }
  }

  setVisible(value){
    if(value===false){
      this.contents.children.iterate((text) => {
        text.setVisible(false);
      });
    }else{
      let totalHeight = 0;
      let i = this.contents.countActive();
      this.contents.children.iterate((text) => {
        if(text.active){
          let b = text.getBounds();
          text.x = this.scene.cameras.main.centerX - b.width/2;
          // text.y = this.scene.cameras.main.height - b.height - 200 + 50*i;
          text.y = totalHeight;
          totalHeight += b.height + this.padding;
          text.setVisible(true);
          i--;
        }else{
          text.setVisible(false);
        }
      });
      totalHeight += this.padding;
      this.contents.incY(this.scene.cameras.main.height - totalHeight);
    }
  }

  setDepth(depth){
    this.contents.children.iterate((text) => {
      text.setDepth(depth);
    });
  }
}
