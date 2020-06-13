// import { EasyStar } from "../../ext/easystar.js";
import Controler_Player_Controler from "../core/controler/player/Controler.js";

/**
 * Controls the player with the mouse, using EasyStar pathfinder
 */
export default class Topdown_Controler_Player_Pathfinder extends Controler_Player_Controler {

  create() {
    this.over = null;

    // Initializing rexMoveTo plugin
    this.moveTo = this.scene.plugins.get('rexmovetoplugin').add(this.player, {
      speed: this.player.speed,
    });
    this.moveTo.on('complete', this.moveToNextTile, this);

    // Initializing the pathfinder
    this.pathfinder = new EasyStar.js();
    this.pathfinder.enableDiagonals();
    this.pathfinder.disableCornerCutting();

    // We need to list all the tile IDs that can be walked on. Let's iterate over all of them
    // and see what properties have been entered in Tiled.
    var tileset = this.scene.map.tilesets[0];
    var properties = tileset.tileProperties;
    this.pathfinder.acceptableTiles = [0];
    for(var i = tileset.firstgid-1; i < this.scene.tileset.total; i++){ // firstgid and total are fields from Tiled that indicate the range of IDs that the tiles can take in that tileset
      if(!properties.hasOwnProperty(i)) {
          // If there is no property indicated at all, it means it's a walkable tile
          this.pathfinder.acceptableTiles.push(i+1);
          continue;
      }
      if(!properties[i].collides) this.pathfinder.acceptableTiles.push(i+1);
    }
    // this.pathfinder.setAcceptableTiles(this.pathfinder.acceptableTiles);
    this.pathfinder.setAcceptableTiles([0]);

    // We create the 2D array representing all the tiles of our map
    var grid = [];
    for(var y = 0; y < this.scene.map.height; y++){
        var col = [];
        for(var x = 0; x < this.scene.map.width; x++){
            // 0 are walkable tiles, 1 are not
            if(this.isAcceptableTile(x,y)){
              col.push(0);
            }else{
              col.push(1);
            }
        }
        grid.push(col);
    }
    this.pathfinder.setGrid(grid);

    // NPCs and enemies are interactive, so the mouse can roll over them
		this.scene.npcs.children.each((npc) => {
      npc.setInteractive();
    });
		this.scene.enemies.children.each((enemy) => {
      enemy.setInteractive();
    });
  }

  enable(){
    if(!this.enabled){
      this.enabled = true;
      // listen to the mouse click
      this.scene.input.on('pointerup', this.mouseUp, this);
      this.scene.input.on('pointerdown', this.mouseDown, this);
      // TODO: implement RexGestures for dealing with tap and swipe on tactile screen
      // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/gesture-overview/
      // listen to the mouse over and out
      this.over = null;
      this.scene.input.on('pointerover', this.mouseOver, this);
      this.scene.input.on('pointerout', this.mouseOut, this);
      // if any keyboard key is down, switch to keyboard controler
      this.scene.input.keyboard.once("keydown", this.scene.switchControler, this.scene);
    }
  }

  disable(){
    if(this.enabled){
      this.enabled = false;
      // this.scene.marker.setVisible(false);
      this.scene.input.off('pointerup', this.mouseUp);
      this.scene.input.off('pointerdown', this.mouseDown);
      this.scene.input.off('pointerover', this.mouseOver);
      this.scene.input.off('pointerout', this.mouseOut);
      this.scene.input.keyboard.off("keydown", this.scene.switchControler);
      if(this.over!==null){
        this.over = null;
      }
      this.scene.input.setDefaultCursor('url(assets/cursors/16x16/pointer.png), pointer');
    }
  }

  // is the tile walkable?
  isAcceptableTile(x,y){
    let tile = this.scene.map.getTileAt(x, y, false, "World");
    return (!tile || this.pathfinder.acceptableTiles.includes(tile.index));
  }

  mouseOver(pointer, objects){
    const object = objects[0];
    // TODO: add a glow effect - https://stackoverflow.com/questions/52922948/glow-effect-in-phaser3
    this.over = object;
  }

  mouseOut(pointer, objects){
    const object = objects[0];
    this.over = null;
  }

  mouseDown(pointer){
    // if the player hold the click down for more than 300ms, he or she is aiming at a target
    this.timer = this.scene.time.delayedCall(300, ()=>{
      this.aiming = true;
    });
  }

  mouseUp(pointer){
    this.timer.remove();
    // const duration = pointer.getDuration();
    if(this.aiming===true || this.isMouseOver('Object_Character_Enemy')){
      this.attack();
    }else{
      this.move();
    }
    this.aiming = false;
  }

  attack(){
    const pointer = this.scene.input.activePointer.positionToCamera(this.scene.cameras.main);
    this.scene.bullets.shootAt(pointer);
  }

  move(){
    const pointer = this.scene.input.activePointer.positionToCamera(this.scene.cameras.main);
    let toX = Math.floor(pointer.x/this.scene.map.tileWidth);
    let toY = Math.floor(pointer.y/this.scene.map.tileHeight);
    const fromX = Math.floor(this.player.x/this.scene.map.tileWidth);
    const fromY = Math.floor(this.player.y/this.scene.map.tileHeight);

    this.target = this.over;
    if(this.isMouseOver('Object_Character_NPC')){
      // we don't want to go at the same tile as the same npc,
      // so we check if there is an walkable adjacent tile
      if(this.isAcceptableTile(toX,toY+1)){
        toY += 1;
      }else if(this.isAcceptableTile(toX-1,toY)){
        toX -= 1;
      }else if(this.isAcceptableTile(toX+1,toY)){
        toX += 1;
      }else if(this.isAcceptableTile(toX,toY-1)){
        toY -= 1;
      }
    }

    this.pathfinder.findPath(fromX, fromY, toX, toY, (path) => {
      if (path === null) {
        console.warn("Path was not found.");
      } else {
        this.path = path;
        this.path.shift(); // the first tile of the path is the current tile.
        this.moveToNextTile(path); // start the movement
      }
    });
    this.pathfinder.calculate(); // don't forget, otherwise nothing happens
  };

  // is the mouse over an active object of this classType?
  isMouseOver(classType){
    return (this.over!==null && this.over.active===true && this.over.constructor.name==classType);
  }

  // Once a tile has been reached, the player moves to the next one
  moveToNextTile(){
    // if there is a new destination in the path
    if(Array.isArray(this.path) && typeof this.path[0]!=="undefined"){
      const tile = this.path.shift(); // the tile coordinates in the grid
      const destination = {  // the tile coordinates in pixels
        x: (tile.x + 0.5) * this.scene.map.tileWidth,
        y: (tile.y + 0.5) * this.scene.map.tileHeight,
      }
      this.moveTo.moveTo(destination.x, destination.y);
      this.player.lookAt(destination);
      this.player.walk();
      // this.player.lookAhead();
      // Use Tweens instead of rexMoveTo plugin
      // const varX = destination.x - this.player.x;
      // const varY = destination.y - this.player.y;
      // const distance = Math.sqrt(Math.pow(varX, 2) + Math.pow(varY, 2));
      // const duration = distance * speed / this.scene.map.tileWidth;
      // this.scene.tweens.killTweensOf(this.player); // we remove all previous tween on the player
      // this.scene.tweens.add({
      //     targets: this.player,
      //     x: destination.x,
      //     y: destination.y,
      //     duration: duration,
      //     onComplete: () => { this.moveToNextTile() },
      // });
    // if there is no more step in the path
    } else {
      // if the player was aiming at a target
      if(this.target){
        this.player.lookAt(this.target);
        this.target.lookAt(this.player);
        this.target.stop();
        // if this target is a npc, start a conversation
        if(this.target.constructor.name == 'Object_Character_NPC'){
          this.target.talk();
          this.scene.input.setDefaultCursor('url(assets/cursors/16x16/pointer.png), pointer');
        }
      }
      this.player.stop();
    }
  };

  update() {
    if(this.enabled){
      // TODO: replace cursor by a sprite with a spritesheet
      var pointer = this.scene.input.activePointer.positionToCamera(this.scene.cameras.main);
      if(this.isMouseOver('Object_Character_NPC')){
        this.scene.input.setDefaultCursor('url(assets/cursors/16x16/talk.png), pointer');
      }else if(this.aiming===true || this.isMouseOver('Object_Character_Enemy')){
        this.scene.input.setDefaultCursor('url(assets/cursors/32x32/crosshair.png), pointer');
      }else if(this.isAcceptableTile(Math.floor(pointer.x/this.scene.map.tileWidth), Math.floor(pointer.y/this.scene.map.tileHeight))){
        this.scene.input.setDefaultCursor('url(assets/cursors/16x16/walk.png), pointer');
      }else{
        this.scene.input.setDefaultCursor('url(assets/cursors/16x16/forbidden.png), pointer');
      }
    }
  }

  // moveCharacter(path){
  //     // Sets up a list of tweens, one for each tile to walk, that will be chained by the timeline
  //     var tweens = [];
  //     for(var i = 0; i < path.length-1; i++){
  //         var ex = path[i+1].x;
  //         var ey = path[i+1].y;
  //         tweens.push({
  //             targets: this,
  //             x: {value: ex*this.scene.map.tileWidth+16, duration: 200},
  //             y: {value: ey*this.scene.map.tileHeight, duration: 200}
  //         });
  //     }
  //     this.scene.tweens.timeline({
  //         tweens: tweens
  //     });
  // };

  // Useless function since EasyStar can enableDiagonals() and disableCornerCutting().
  // The following fonction take off tiles from a path whenever a diagonal is possible
  // enableDiagonals(path){
  //   for(var i= 0; i < path.length; i++){
  //     if (i<path.length-2){ // if there is at least two tiles left after this one
  //       let current = path[i];
  //       let next = path[i+2];
  //       // A diagonal is possible between the two tiles only if both x and y are differents. If not, it is a straight line.
  //       if(current.x != next.x && current.y != next.y){
  //         // Since corner cutting is not allowed, diagonal is possible only if the two adjacent tiles are also walkable
  //         if (this.isAcceptableTile(current.x,next.y) && this.isAcceptableTile(next.x,current.y)){
  //           path.splice(i+1, 1); // since diagonal is possible, remove the next tile
  //         }
  //       }
  //     }
  //   }
  //   return path;
  // }
}
