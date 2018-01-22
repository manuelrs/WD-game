var player = {
  x: canvas.width / 2,
  y: canvas.height,
  r: 15,
  width: 50,
  height: 50,
  speedX: 5,
  speedY: 5,
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

  draw: function() {
    ctx.fillStyle = "red";
    //ctx.fillRect(this.x, this.y, this.width, this.height);
    //context.arc(x,y,r,sAngle,eAngle,counterclockwise);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    // ctx.drawImage(flappyImg, this.x, this.y, 50 * imgScale, 50);
  },

  isColliding: function(object) {
    return (
      Math.abs(this.x - object.x) < this.r + object.r &&
      Math.abs(this.y - object.y) < this.r + object.r
    );
  },

  // isDead: function(object) {
  //   return object.some(this.isColliding.bind(this));
  // },

  //Function constrains the boundaries of player1 with any circular object.
  constrainWithPlayer2: function(player2) {
    var x1 = this.x;
    var x2 = obstacles.walls[0].x;
    var r1 = this.r;
    var r2 = obstacles.walls[0].r;
    var y1 = this.y;
    var y2 = obstacles.walls[0].y;
    var x = Math.abs(x2 - x1);
    var y = Math.abs(y2 - y1);
    var r = Math.sqrt(x ** 2 + y ** 2);
    if (r <= r1 + r2) {
      //It takes the x and y coordinates of both players to find the angle of collision.
      //Then takes the distance between x2 and x1 and substracts it from x1.
      this.x -= (x2 - x1) / (r2 + r1) * r1;
      //Then takes the distance between y2 and y1 and substracts it from y1.
      this.y -= (y2 - y1) / (r2 + r1) * r1;
    }
  }
};
