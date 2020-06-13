/**
 * Character sprite
 */
export default class Object_Sprite_Spine {

  constructor(scene, key, skin, scale) {
    this.spine = scene.add.spine(400, 600, key, 'idle', true);
    if(skin) this.setSkin(skin);
    if(scale) this.spine.setScale(scale);
    // this.spine.setOrigin(0.5, 0.5);

    this.spine.setMix('walk', 'idle', 0.3);
    this.spine.setMix('idle', 'walk', 0.3);
    this.spine.setMix('jump', 'walk', 0.2);
    this.spine.setMix('walk', 'jump', 0.3);
    this.spine.setMix('idle', 'jump', 0.3);
    this.spine.setMix('jump', 'idle', 0.1);
    // this.spine.setMix('jump', 'kill', 0.2);
    // this.spine.setMix('kill', 'idle', 0.2);

    this.isCrouching = false;
  }

  // Getters and setters to access directely the spine game object
  set x(x){ this.spine.x = x; }
  set y(y){ this.spine.y = y; }
  get x(){ return this.spine.x; }
  get y(){ return this.spine.y; }
  get displayWidth(){ return Math.abs(this.spine.displayWidth); }
  get displayHeight(){ return Math.abs(this.spine.displayHeight); }

  setOrigin(originX, originY){
    // Do nothing, since you can't change the origin of Spine Game Object
  }

  setDepth(depth){
    this.spine.setDepth(depth);
  }

  setSkin(skinName){
    this.spine.setSkin(null);
    this.spine.setSkinByName(skinName);
  }

  setAnimation(animation, loop) {
    if(this.animation !== animation) {
      this.animation = animation;
      this.spine.play(animation, loop);
    }
  }

  setOrientation(orientation) {
    if(this.orientation !== orientation) {
      this.orientation = orientation;
      if(orientation=='left') this.spine.scaleX = - Math.abs(this.spine.scaleX);
      else this.spine.scaleX = Math.abs(this.spine.scaleX);
    }
  }

  // look at another object
  lookAt(target) {
    let orientation = (target.x - this.x < 0) ? 'left' : 'right';
    this.setOrientation(orientation);
  }

  lookAhead(body){
    let orientation = (body.velocity.x < 0) ? 'left' : 'right';
    this.setOrientation(orientation);
  }

  walkAhead(body){
    this.lookAhead(body);
    this.walk();
  }

  walk() {
    let animation = (this.isCrouching) ? 'crouchWalk' : 'walk';
    this.setAnimation(animation, true);
  }

  run() {
    this.setAnimation('run', true);
  }

  attack() {
    // this.setAnimation('meleeSwing1', false);
    this.setAnimation('meleeSwing2-fullBody', false);
      // this.setAnimation('punch2', false);
  }

  // crouch or stand
  setCrouch(boolean) {
    this.isCrouching = boolean;
  }

  jump(orientation) {
    this.setAnimation('jump', false);
    // this.spine.addAnimation(1, 'idle', true);
  }

  stop() {
    let animation = (this.isCrouching) ? 'crouchIdle' : 'idle';
    this.setAnimation(animation, true);
  }

  die(){
    this.setAnimation('hitBig', false);
    // this.spine.addAnimation('floorIdle', true);
  }

  destroy(){
    this.spine.destroy();
  }

  // useless function for now
  defineSkin(){
    this.skins = [
        'Assassin',
        'Beardy',
        'Chuck',
        'Fletch',
        'Gabriel',
        'Pamela-1',
        'Pamela-2',
        'Pamela-3',
        'Pamela-4',
        'Pamela-5',
        'Ducky',
        'Stumpy',
        'Truck',
        'Young',
        'Buck',
        'Turbo',
        'Dummy',
        'MetalMan',
        'Commander',
        'default'
    ]
    // add to change - for _ in meleeSwing1_fullBody and meleeSwing2_fullBody
    this.animations1 = {
      walk: { repeat:true },
      walk2: { repeat:true },
      crouchIdle: { repeat:true },
      crouchWalk: { repeat:true },
      block: { repeat:true },
      hitBig: { repeat:false },
      floorIdle: { repeat:true },
      floorGetUp: { repeat:false },
      meleeSwing1: { repeat:true },
      meleeSwing2: { repeat:true },
      meleeSwing1_fullBody: { repeat:false },
      meleeSwing2_fullBody: { repeat:false },
      hideSword: { repeat:false },
      jump: { repeat:false },
      idleTired: { repeat:true },
      idle: { repeat:true },
      punch1: { repeat:false },
      punch2: { repeat:false },
      roll: { repeat:false },
      run: { repeat:true },
      run2: { repeat:true },
      empty: { repeat:true },
    };
    this.animations2 = [{
        name: 'walk',
        repeat: true
    }, {
        name: 'walk2',
        repeat: true
    }, {
        name: 'crouchIdle',
        repeat: true
    }, {
        name: 'crouchWalk',
        repeat: true
    }, {
        name: 'block',
        repeat: true
    }, {
        name: 'hitBig',
        repeat: false
    }, {
        name: 'floorIdle',
        repeat: true
    }, {
        name: 'floorGetUp',
        repeat: false
    }, {
        name: 'meleeSwing1',
        repeat: false
    }, {
        name: 'meleeSwing2',
        repeat: false
    }, {
        name: 'meleeSwing1-fullBody',
        repeat: false
    }, {
        name: 'meleeSwing2-fullBody',
        repeat: false
    }, {
        name: 'hideSword',
        repeat: false
    }, {
        name: 'jump',
        repeat: false
    }, {
        name: 'idleTired',
        repeat: true
    }, {
        name: 'idle',
        repeat: true
    }, {
        name: 'punch1',
        repeat: false
    }, {
        name: 'punch2',
        repeat: false
    }, {
        name: 'roll',
        repeat: false
    }, {
        name: 'run',
        repeat: true
    }, {
        name: 'run2',
        repeat: true
    }, {
        name: 'empty',
        repeat: true
    }]
  }
}
