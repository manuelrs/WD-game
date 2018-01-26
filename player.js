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
  this.x = Math.min(canvas.width - this.width, Math.max(0, this.x));
  this.y = Math.min(canvas.height - this.height, Math.max(0, this.y));
};

//Returns true when collision is detected. Used for collision with other player (modelled as circles).
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

//Collision with the trees. An adequate library is necessary for collision with bigger elements (town).
Player.prototype.isColliding2 = function(object) {
  var x1 = this.x;
  var x2 = object.x;
  var y1 = this.y;
  var y2 = object.y;
  var x = x2 - x1;
  var y = y2 - y1;
  if (
    this.x - this.r < object.x + object.w &&
    this.x + this.r > object.x &&
    this.y - this.r < object.y + object.h &&
    this.r + this.y > object.y
  ) {
    if (x1 < x2) {
      this.x = object.x - 0.5 * this.width;
    } else if (x1 > x2) {
      this.x = object.x + 1.2 * this.width;
    } else if (y1 < x2) {
      this.y = object.y - this.height;
    } else {
      this.y = object.y + this.height;
    }
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

//Different function since it does not need to alter the x and y values of the objects.
Player.prototype.collisionWithFood = function(food) {
  if (
    this.x - this.r < food.x + food.w &&
    this.x + this.r > food.x &&
    this.y - this.r < food.y + food.h &&
    this.r + this.y > food.y
  ) {
    if (food.image === burgerImg) {
      burgerSound.play();
    } else if (food.image === tacoImg) {
      tacoSound.play();
    } else if (food.image === beerImg) {
      beerSound.play();
    } else if (food.image === milkImg) {
      beerSound.play();
    } else if (food.image === cookieImg) {
      cookieSound.play();
    } else if (food.image === chilliImg) {
      ouchSound.play();
    }
    return true;
  } else {
    return false;
  }
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
