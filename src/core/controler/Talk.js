import UI_SpeechBubble from "../ui/SpeechBubble.js";

/**
 * Controler that allow us to talk to NPC
 * This controler connects to Sandbox Adventure Engine
 * If you don't use Sandbox Adventure Engine, replace this file by Talk2.js
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
    // disable the player controler
    this.scene.controler.disable();
    this.active_pnj = pnj;
    let url = window.basepath + 'js.php?P=Action&Action=Parler&P1='+pnj.scene_id;
    this.scene.load.script('talk', url);
    this.scene.load.start();
    console.log('Load ' + url);
  }

  // Load answer to a player choice
  loadAnswer (load) {
    let url = window.basepath + this.convertToUrl('js.php', load);
    this.scene.load.script('talk', url);
    this.scene.load.start();
    console.log('Load ' + url);
  }

  initTalking (talk){
    // console.log('Init talking');
    this.talk = talk;
    this.keepTalking();
  }

  keepTalking (){
    // Remove input listener of previous talk
    this.scene.input.off('pointerup', this.keepTalking);
    this.scene.input.keyboard.off('keydown_SPACE', this.keepTalking);
    // Hide the text
    this.subtitle.setVisible(false);
    this.speechBubble.setVisible(false);
    if(this.talk.length>0){
      let step = this.talk.shift().shift();
      if(step.nom_fonction=='bulle'){
        // it is a narration or a choice
        if(step.perso=='didas' || step.perso=='pj'){
          let parsed = this.parseSubtitle(step.texte);
          if (!Array.isArray(parsed)){
            // It is a narration
            this.subtitle.displayQuote(parsed);
            // we wait for the click before displaying the next text
            this.waitForClick();
          }else{
            // It is a player choice
            this.subtitle.displayChoices(parsed);
          }
          this.subtitle.setVisible(true);
        }else{
          // we search for the character with the corresponding name
          this.scene.npcs.getChildren().forEach((npc, index) => {
            if(npc.name==step.perso){
              // this.showSpeechBubble (npc.x, npc.y, step.texte);
              const coordinate = npc.getSpriteTopLeft();
              this.speechBubble.update(coordinate.x + 10, coordinate.y - 10, step.texte);
              this.speechBubble.setVisible(true);
              this.waitForClick();
              return;
            }
          });
        }
      }else{
        this.keepTalking();
      }
    }else{
      // end of the conversation
      this.scene.controler.enable();
    }
  }

  // Wait for the click to display the next talk
  waitForClick(){
    this.scene.input.once('pointerup', this.keepTalking, this);
    this.scene.input.keyboard.once('keydown_SPACE', this.keepTalking, this);
  }

  parseSubtitle(quote){
    let parsed;
    // We check if there is a link in the text.
    let div = document.createElement('div');
    div.innerHTML = quote;
    let links = div.getElementsByTagName('a');
    // If there is a link, it is a player choice and we retrieve the available choice
    if(links.length>0){
      parsed = [];
      // for (let link of links) {
      for (let i = 0; i < links.length; i++) {
        let link = links[i];
        let load = link.getAttribute("load");
        let text = link.innerText || link.textContent;
        parsed.push({quote: text, load:load});
      };
    }else{
      // since there is no link, it is a simple text
      parsed = quote;
    }
    div.remove();
    return parsed;
  }

  // Function from ahah.js
  convertToUrl(url, page){
    page = page.toString();
    let tab = page.split(":");
    let liste = new Array('P','C','Action','P1','P2');
    let tableau = new Array();
    for(let i=0; i<5; i++) {
      if (tab[i]!=undefined && tab[i]!='') {
        tableau.push( liste[i] + '=' + tab[i] );
      }
    }
    if (tableau.length!=0){
    	var pos = page.indexOf('?') ;
    	if(pos != -1) { //PrÃ©sence de paramÃ¨tres
        url += '&';
    	}else {
        url += '?';
    	}
      url += tableau.join('&');
    }
    return url;
  }
}
