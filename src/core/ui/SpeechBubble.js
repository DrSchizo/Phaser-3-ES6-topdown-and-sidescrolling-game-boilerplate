/**
 * A speech bubble for talks
 */
export default class UI_SpeechBubble {

  constructor(scene) {
    // Create variables
    this.bubbleWidth;
    this.bubbleHeight;
    this.arrowHeight = 20;
    this.bubblePadding = 15;
	
	// Create visible elements
    this.bubble = scene.add.graphics();
    this.content = scene.add.text(0, 0, '', { fontFamily: 'Arial', fontSize: 18, color: '#000000', align: 'center' });

    this.setVisible(false);
  }

  update(x, y, quote){
    // The width depends on the quote length
    if(quote.length<15){
      this.content.setWordWrapWidth()
      this.bubbleWidth = 100 + ( 2 * this.bubblePadding ) ;
    }else{
      this.content.setWordWrapWidth(200);
      this.bubbleWidth = 220 + ( 2 * this.bubblePadding ) ;
    }
	// Change the content and draw the speech bubble
    this.content.setText(quote);
    this.drawBubble();
	// Set the position
    var b = this.content.getBounds();
    this.bubble.x = x - Math.floor(this.bubbleWidth / 7);
    this.bubble.y = y - Math.floor(this.bubbleHeight + this.arrowHeight);
    this.content.setPosition(Math.floor(this.bubble.x + (this.bubbleWidth / 2) - (b.width / 2)), Math.floor(this.bubble.y + (this.bubbleHeight / 2) - (b.height / 2)));
  }

  drawBubble(){
    // TODO: replace graphics by shapes?
    // Roundrectangle shape here: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/shape-roundrectangle/

    var b = this.content.getBounds();
    this.bubbleHeight = b.height + (2 * this.bubblePadding);

    this.bubble.clear();

    //  Bubble shadow
    this.bubble.fillStyle(0x222222, 0.5);
    this.bubble.fillRoundedRect(6, 6, this.bubbleWidth, this.bubbleHeight, 16);

    //  Bubble color
    this.bubble.fillStyle(0xffffff, 1);

    //  Bubble outline line style
    this.bubble.lineStyle(4, 0x565656, 1);

    //  Bubble shape and outline
    this.bubble.strokeRoundedRect(0, 0, this.bubbleWidth, this.bubbleHeight, 16);
    this.bubble.fillRoundedRect(0, 0, this.bubbleWidth, this.bubbleHeight, 16);

    //  Calculate arrow coordinates
    var point1X = Math.floor(this.bubbleWidth / 7);
    var point1Y = this.bubbleHeight;
    var point2X = Math.floor((this.bubbleWidth / 7) * 2);
    var point2Y = this.bubbleHeight;
    var point3X = Math.floor(this.bubbleWidth / 7);
    var point3Y = Math.floor(this.bubbleHeight + this.arrowHeight);

    //  Bubble arrow shadow
    this.bubble.lineStyle(4, 0x222222, 0.5);
    this.bubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);

    //  Bubble arrow fill
    this.bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
    this.bubble.lineStyle(2, 0x565656, 1);
    this.bubble.lineBetween(point2X, point2Y, point3X, point3Y);
    this.bubble.lineBetween(point1X, point1Y, point3X, point3Y);
  }

  setVisible(value){
    this.bubble.setVisible(value);
    this.content.setVisible(value);
  }

  setDepth(depth){
    this.bubble.setDepth(depth);
    this.content.setDepth(depth + 1);
  }
}
