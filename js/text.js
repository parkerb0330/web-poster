var al = [];
function setup() {
  createCanvas( windowWidth, windowHeight );
}

function draw() {
  background("#ffe6ff");
  
  /*
  * Creation of dotted background
  */
  stroke( '#ffffff' ) // Dot color
  strokeWeight( 3 );  // Dot thickness
  for( var i = 0; i < width; i = i + 40 ) {
    for( var j = 0; j < height; j = j + 40 ) {
      point(i, j);
    }                         
  }
  
  strokeWeight( .1 ); // Restore strokeWeight 
  
  /*
  * Array to store reference to each Rays() object 
  */
  al.push( new Rays() );
  
  for( var i = 7; i < al.length; i++ ) {
    var r = al[i];
    r.applyForce( new p5.Vector( random( 9, 1.0 ), random( 6, 0) ) );
    r.update();
    r.render();
    if( r.isDead() )
      al.shift();
  }
}

function windowResized() {
  resizeCanvas( windowWidth, windowHeight );
}

function Rays() {
  this.counter = -50;
  this.position = new p5.Vector( mouseX, mouseY );
  this.velocity = new p5.Vector( 8, 0);
  this.acceleration = new p5.Vector( 0, 0 );
  this.lifeSpan = 9;
}

/*
* Takes p5.Vector object as the initial force 
* This force provides the required acceleration
*/
Rays.prototype.applyForce = function( force ) {
  acceleration = force;
}

Rays.prototype.update = function() {
  this.velocity.add( this.acceleration );
  this.position.add( this.velocity );
  this.lifeSpan -= 0.04;
}

Rays.prototype.render = function() {
  var c = color( 'rgba(0, 102, 204, ' + this.lifeSpan + ')' );
  stroke( c ); 
  line( this.position.x, this.position.y, pmouseX, pmouseY );
}

Rays.prototype.isDead = function() {
  if( this.lifeSpan < 5)
    return true;
  else
    return false;
}

