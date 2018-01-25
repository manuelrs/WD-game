var floorGrassImg = new Image();
floorGrassImg.src = "./images/floorGrass.png";
var treeImg = new Image();
treeImg.src = "./images/tree.png";
var townImg = new Image();
townImg.src = "./images/town.png";

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

Obstacle.prototype.createObstacle = function(x, y) {
  return {
    x: x,
    y: y,
    w: this.w,
    h: this.h,
    image: this.image
  };
};

FloorGrass.prototype = Object.create(Obstacle.prototype);
FloorGrass.prototype.constructor = FloorGrass;

function Tree(x, y) {
  Obstacle.call(this, x, y);
  this.image = treeImg;
  this.w = 38;
  this.h = 382;
}

Tree.prototype = Object.create(Obstacle.prototype);
Tree.prototype.constructor = Tree;

//Can only be implemented when the collision detection and management has been implemented.
function Town(x, y) {
  Obstacle.call(this, x, y);
  this.image = townImg;
  this.w = 388;
  this.h = 278;
}

Town.prototype = Object.create(Obstacle.prototype);
Town.prototype.constructor = Town;
