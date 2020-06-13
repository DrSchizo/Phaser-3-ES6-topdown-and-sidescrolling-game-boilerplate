function showPage(page, param) {
  switch(page){
    case 'dialogue' :
        showDialogue(eval(param));
      break;
  }
}
function resetDialogue() {
}
function showDialogue(param) {
  if(param.conversation) {
    // retrieves the active scene
    let scene = window.game.scene.getScene(window.const.mainScene);
    // starts the talk
    scene.talk.initTalking(param.conversation);
  }
}
