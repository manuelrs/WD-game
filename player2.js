var player2 = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  r: 15,
  width: 50,
  height: 50,
  maxSpeed: 10,
  acceleration: 0.01,
  initialSpeed: 3,
  speedX: 3,
  speedY: 3,
  mass: 10,

  move: function(direction) {
    if (direction === "right") {
      this.x += this.speedX;
    } else if (direction === "left") {
      this.x -= this.speedX;
    } else if (direction === "up") {
      this.y -= this.speedY;
    } else {
      this.y += this.speedY;
    }
    this.x = Math.min(canvas.width - this.r, Math.max(0, this.x));
    this.y = Math.min(canvas.height - this.r, Math.max(0, this.y));
  },

  //Accelerate
  accelerate: function(direction) {
    if (direction === "right") {
      this.speedX += this.acceleration;
    } else if (direction === "left") {
      this.speedX += this.acceleration;
    } else if (direction === "up") {
      this.speedY += this.acceleration;
    } else {
      this.speedY += this.acceleration;
    }
  },

  //Sets the speed to a maximum of maxSpeed
  setMaxSpeed: function() {
    this.speedX = Math.min(this.maxSpeed, this.speedX);
    this.speedY = Math.min(this.maxSpeed, this.speedY);
  },

  resetSpeedX: function() {
    this.speedX = this.initialSpeed;
  },

  resetSpeedY: function() {
    this.speedY = this.initialSpeed;
  },

  draw: function() {
    ctx.fillStyle = "blue";
    //ctx.fillRect(this.x, this.y, this.width, this.height);
    //context.arc(x,y,r,sAngle,eAngle,counterclockwise);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    // ctx.drawImage(flappyImg, this.x, this.y, 50 * imgScale, 50);
  },

  isColliding: function(object) {
    var x1 = this.x;
    var x2 = object.x;
    var r1 = this.r;
    var r2 = object.r;
    var y1 = this.y;
    var y2 = object.y;
    var x = Math.abs(x2 - x1);
    var y = Math.abs(y2 - y1);
    var r = Math.sqrt(x ** 2 + y ** 2);
    if (r < r1 + r2) {
      console.log("collision2");
      //It takes the x and y coordinates of both players to find the angle of collision.
      //Then takes the distance between x2 and x1 and substracts it from x1.
      this.x -= (x2 - x1) / (r2 + r1) * r1;
      //Then takes the distance between y2 and y1 and substracts it from y1.
      this.y -= (y2 - y1) / (r2 + r1) * r1;
      return true;
    }
  },

  setCollision: function(object) {
    console.log("enter collision");
    //Update speedX of player
    this.speedX =
      2 *
        (this.mass * this.speedX + object.mass * object.speedX) /
        (this.mass + object.mass) -
      this.speedX;
    console.log(this.speedX);
    //Object speedX of player 2
    object.speedX =
      2 *
        (this.mass * this.speedX + object.mass * object.speedX) /
        (this.mass + object.mass) -
      object.speedX;
    //Update speedY of player
    this.speedY =
      2 *
        (this.mass * this.speedY + object.mass * object.speedY) /
        (this.mass + object.mass) -
      this.speedY;
    //Update speedY of player 2
    object.speedY = this.speedY =
      2 *
        (this.mass * this.speedY + object.mass * object.speedY) /
        (this.mass + object.mass) -
      object.speedY;
  },

  printResults: function() {
    //\n break line
    var w = canvas.width - 200;
    var h = 50;
    var line1 = "Player2 speedX: " + this.speedX.toFixed(2);
    var line2 = "Player2 speedY: " + this.speedY.toFixed(2);
    ctx.font = "12px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(line1, w, 5 * h);
    ctx.fillText(line2, w, 5.3 * h);
  }
};