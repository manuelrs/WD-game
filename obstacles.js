var floorGrassImg = new Image();
floorGrassImg.src = "./images/floorGrass.png";
var treeImg = new Image();
treeImg.src = "./images/tree.png";

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

function Tree(x, y) {
  Obstacle.call(this, x, y);
  this.image = treeImg;
  this.w = 100;
  this.h = 100;
}

Tree.prototype = Object.create(Obstacle.prototype);
Tree.prototype.constructor = Tree;
