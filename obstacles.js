var floorGrassImg = new Image();
floorGrassImg.src = "./images/floorGrass.png";

function Obstacle(x, y) {
  this.x = x;
  this.y = y;
  this.w = 50;
  this.h = 50;
  this.image = null;
}

Obstacle.prototype.drawImage = function(x, y) {
  ctx.drawImage(this.image, x, y, this.w, this.h);
};

function FloorGrass(x, y) {
  Obstacle.call(this, x, y);
  this.image = floorGrassImg;
  this.w = 100;
  this.h = 100;
}

FloorGrass.prototype = Object.create(Obstacle.prototype);
FloorGrass.prototype.constructor = FloorGrass;
