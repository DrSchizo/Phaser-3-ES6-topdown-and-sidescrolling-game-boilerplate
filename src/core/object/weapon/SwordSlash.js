/**
 * The sword kick made by the player
 */
export default class Object_Weapon_SwordSlash extends Phaser.GameObjects.Zone {

	constructor(scene, width, height, length) {
		super(scene, 0, 0, width, height);
		this.scene = scene;
		this.length = length; // how long the slash is active, in ms
		this.setActive(false);
		this.setVisible(false);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
	}

	addEvents(){
		this.scene.physics.add.overlap(this, this.scene.enemies, (slash, enemy) => {
			enemy.die();
			this.kickEnd();
		});
	}

	update(){
		if(this.active){
			const body = this.scene.player.body;
			let x = body.center.x;
			let y = body.center.y;
	    switch (this.scene.player.getOrientation()){
	      case 'left' :
	          x -= body.width/2;
						this.setOrigin(1, 0.5);
	        break;
	      case 'right' :
	        	x += body.width/2;
						this.setOrigin(0, 0.5);
	        break;
	      case 'up' :
	          y -= body.height/2;
						this.setOrigin(0.5, 1);
	        break;
	      case 'down' :
	          y += body.height/2;
						this.setOrigin(0.5, 0);
	        break;
	    }
			this.body.reset(x, y);
		}
	}

  // kick toward the direction of the player: top, down, left, right
	kick(direction) {
		this.setActive(true);
		this.setVisible(true);
		// this.setOrigin(this.scene.player.originX, this.scene.player.originY);
		setTimeout(() => {
			this.kickEnd();
		}, this.length);
	}

  //
	kickEnd() {
		this.setActive(false);
		this.setVisible(false);
		this.body.reset(-100, -100);
	}

  // the direction is defined by an angle
	// shootFromAngle(x, y, angle) {
	// 	this.body.reset(x, y);
	// 	this.setActive(true);
	// 	this.setVisible(true);
  //   this.scene.physics.velocityFromAngle(angle, this.speed, this.body.velocity);
	// }
}
