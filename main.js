var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    updateCanvas();
  }
};

//Function to update the frame of the canvas. This is where the animation happens
function updateCanvas() {
  Object.keys(keysPressed).forEach(function(direction) {
    if (keysPressed[direction]) {
      player.move(direction);
    }
  });

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (player.isColliding(obstacles.walls[0])) {
    player.constrainWithPlayer2(obstacles.walls[0]);
  }

  player.draw();
  // if (player.isDead(obstacles.walls)) {
  //   console.log("Collission detected");
  //   //location.reload();
  // }

  obstacles.drawDummy();

  requestAnimationFrame(updateCanvas);
}

//Input management
//Definition of key to be used
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var DOWN_KEY = 40;
var UP_KEY = 38;

//Holds the status of the pressed keys
var keysPressed = {
  up: false,
  down: false,
  right: false,
  left: false
};

//Handles the events triggered by the keys: case down
document.onkeydown = function(event) {
  switch (event.keyCode) {
    case LEFT_KEY:
      keysPressed.left = true;
      break;
    case RIGHT_KEY:
      keysPressed.right = true;
      break;
    case UP_KEY:
      keysPressed.up = true;
      break;
    case DOWN_KEY:
      keysPressed.down = true;
      break;
  }
};

//Handles the events triggered by the keys: case up
document.onkeyup = function(event) {
  switch (event.keyCode) {
    case LEFT_KEY:
      keysPressed.left = false;
      break;
    case RIGHT_KEY:
      keysPressed.right = false;
      break;
    case UP_KEY:
      keysPressed.up = false;
      break;
    case DOWN_KEY:
      keysPressed.down = false;
      break;
  }
};

//Definition of the obstacles
var obstacles = {
  walls: [],
  width: 10,
  speed: 10,
  maxSpace: 450,
  minSpace: 175,
  r: 20,
  x: 200,
  y: 200,
  mass: 100,

  drawDummy: function(r) {
    ctx.fillStyle = "blue";
    //ctx.fillRect(this.x, this.y, this.width, this.height);
    //context.arc(x,y,r,sAngle,eAngle,counterclockwise);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  },

  createDummy: function() {
    this.walls.push({
      x: this.x,
      y: this.y,
      r: this.r,
      mass: this.mass
    });
  }
};

obstacles.createDummy();
