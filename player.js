//Images player 1: 4 direction
var player1u = new Image();
player1u.src = "./images/player1u.png";
var player1r = new Image();
player1r.src = "./images/player1r.png";
var player1d = new Image();
player1d.src = "./images/player1d.png";
var player1l = new Image();
player1l.src = "./images/player1l.png";
var imageset1 = [player1u, player1r, player1d, player1l];

//Images player 2: 4 direction
var player2u = new Image();
player2u.src = "./images/player2u.png";
var player2r = new Image();
player2r.src = "./images/player2r.png";
var player2d = new Image();
player2d.src = "./images/player2d.png";
var player2l = new Image();
player2l.src = "./images/player2l.png";
var imageset2 = [player2u, player2r, player2d, player2l];

function Player(color, x, y, dbh, imageset) {
  this.x = x;
  this.y = y;
  this.r = 25;
  //No need for w and h, delete later
  this.width = 50;
  this.height = 50;
  this.maxSpeed = 5;
  this.acceleration = 0.0;
  //No need for friction yet
  this.friction = 0.05;
  this.initialSpeed = 0;
  this.speedX = 5;
  this.speedY = 5;
  this.mass = 10;
  this.score = 0;
  this.color = color;
  this.debuggerHeight = dbh;
  this.image = player1l;
  this.imageset = imageset;
}

Player.prototype.move = function(direction) {
  if (direction === "right") {
    this.x += this.speedX;
  } else if (direction === "left") {
    this.x -= this.speedX;
  } else if (direction === "up") {
    this.y -= this.speedY;
  } else {
    this.y += this.speedY;
  }
  this.x = Math.min(canvas.width - this.r, Math.max(this.r, this.x));
  this.y = Math.min(canvas.height - this.r, Math.max(this.r, this.y));
};

Player.prototype.draw = function() {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
};

//Returns true when collision is detected
Player.prototype.isColliding = function(object) {
  var x1 = this.x;
  var x2 = object.x;
  var r1 = this.r;
  var r2 = object.r;
  var y1 = this.y;
  var y2 = object.y;
  var x = x2 - x1;
  var y = y2 - y1;
  var r = Math.sqrt(x ** 2 + y ** 2);
  if (r < r1 + r2) {
    //It takes the x and y coordinates of both players to find the angle of collision.
    //Then takes the distance between x2 and x1 and substracts it from x1.
    this.x -= (x2 - x1) / (r2 + r1) * r1;
    //Then takes the distance between y2 and y1 and substracts it from y1.
    this.y -= (y2 - y1) / (r2 + r1) * r1;
    return true;
  }
};

//Accelerate
Player.prototype.accelerate = function(direction) {
  if (direction === "right") {
    this.speedX += this.acceleration;
  } else if (direction === "left") {
    this.speedX += this.acceleration;
  } else if (direction === "up") {
    this.speedY += this.acceleration;
  } else {
    this.speedY += this.acceleration;
  }
};

//Sets the speed to a maximum of maxSpeed
Player.prototype.setMaxSpeed = function() {
  this.speedX = Math.min(this.maxSpeed, this.speedX);
  this.speedY = Math.min(this.maxSpeed, this.speedY);
};

Player.prototype.resetSpeedX = function() {
  this.speedX = this.initialSpeed;
};

Player.prototype.resetSpeedY = function() {
  this.speedY = this.initialSpeed;
};

Player.prototype.printResults = function() {
  //\n break line
  var w = canvas.width - 200;
  var h = 50;

  var line0 = "Player";
  var line1 = "SpeedX: " + this.speedX.toFixed(2);
  var line2 = "SpeedY: " + this.speedY.toFixed(2);
  var line5 = "X: " + this.x.toFixed(2);
  var line6 = "Y: " + this.y.toFixed(2);
  var line7 = "Score: " + this.score;
  ctx.font = "12px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(line0, w, this.debuggerHeight + h);
  ctx.fillText(line1, w, this.debuggerHeight + 1.3 * h);
  ctx.fillText(line2, w, this.debuggerHeight + 1.6 * h);
  ctx.fillText(line5, w, this.debuggerHeight + 1.9 * h);
  ctx.fillText(line6, w, this.debuggerHeight + 2.2 * h);
  ctx.fillText(line7, w, this.debuggerHeight + 2.5 * h);
};

Player.prototype.collisionWithFood = function(food) {
  return (
    this.x - this.r < food.x + food.w &&
    this.x + this.r > food.x &&
    this.y - this.r < food.y + food.h &&
    this.r + this.y > food.y
  );
};

Player.prototype.selectImage = function(direction) {
  if (direction === "up") {
    this.image = this.imageset[0];
  } else if (direction === "right") {
    this.image = this.imageset[1];
  } else if (direction === "down") {
    this.image = this.imageset[2];
  } else if (direction === "left") {
    this.image = this.imageset[3];
  }
};

Player.prototype.drawImage = function() {
  ctx.drawImage(
    this.image,
    this.x - this.r,
    this.y - this.r,
    this.width,
    this.height
  );
};
