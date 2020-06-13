/**
 * Mixin for moving game object
 * Better technic to do mixin: https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
 */
// export const Object_Mixin_Move = {
export let Object_Mixin_Move = (superclass) => class extends superclass {

  // Start moving toward one destination
  moveToObject (destination){
    this.scene.physics.moveToObject(this, destination, this.speed);
  }

  // Start moving toward one direction : left, right, up, down, up-left...
  moveToward (string){
    const directions = string.split('-');
    directions.forEach((direction, i) => {
      switch (direction){
        case 'left' :
            this.body.setVelocityX(-this.speed);
          break;
        case 'right' :
            this.body.setVelocityX(this.speed);
          break;
        case 'up' :
            this.body.setVelocityY(-this.speed);
          break;
        case 'down' :
            this.body.setVelocityY(this.speed);
          break;
      }
    });

    // Normalize and scale the velocity so the sprite can't move faster along a diagonal
    this.body.velocity.normalize().scale(this.speed);

    // Update the animation
    this.walkAhead();
  }

  walkAhead(){
  }
}
