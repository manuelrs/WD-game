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
  //Check for movement in controls for player 1
  updatePlayerMovements(keysPressed, player, player2, accelerationActivated);

  //Check for movement in controls for player 2
  updatePlayerMovements(keysPressed2, player2, player, accelerationActivated2);

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //player.move(direction);

  player.draw();
  player2.draw();
  player.printResults();
  player2.printResults();

  requestAnimationFrame(updateCanvas);
}

//Input management
//Definition of key to be used: player
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var DOWN_KEY = 40;
var UP_KEY = 38;
//Definition of key to be used: player2
var LEFT_KEY_2 = 65;
var RIGHT_KEY_2 = 68;
var DOWN_KEY_2 = 83;
var UP_KEY_2 = 87;

//Holds the status of the pressed keys: player 1
var keysPressed = {
  up: false,
  down: false,
  right: false,
  left: false
};
//Holds the toggle if the acceleration was activated: player 1
var accelerationActivated = {
  up: false,
  down: false,
  right: false,
  left: false
};
//Holds the status of the pressed keys: player 2
var keysPressed2 = {
  up: false,
  down: false,
  right: false,
  left: false
};
//Holds the toggle if the acceleration was activated: player 1
var accelerationActivated2 = {
  up: false,
  down: false,
  right: false,
  left: false
};

//Handles the events triggered by the keys: case down
document.onkeydown = function(event) {
  switch (event.keyCode) {
    //Player 1
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
    //Player 2
    case LEFT_KEY_2:
      keysPressed2.left = true;
      break;
    case RIGHT_KEY_2:
      keysPressed2.right = true;
      break;
    case UP_KEY_2:
      keysPressed2.up = true;
      break;
    case DOWN_KEY_2:
      keysPressed2.down = true;
      break;
  }
};

//Handles the events triggered by the keys: case up
document.onkeyup = function(event) {
  //Player 1
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
    //Player 2
    case LEFT_KEY_2:
      keysPressed2.left = false;
      break;
    case RIGHT_KEY_2:
      keysPressed2.right = false;
      break;
    case UP_KEY_2:
      keysPressed2.up = false;
      break;
    case DOWN_KEY_2:
      keysPressed2.down = false;
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
  mass: 100
};

// function speedToggle(accelerationActivated, keysPressed, player) {
//   console.log(accelerationActivated.up === true && keysPressed.up === false);
//   if (accelerationActivated.up === true && keysPressed.up === false) {
//     player.resetSpeedY();
//     accelerationActivated.up = false;
//   } else if (
//     accelerationActivated.down === true &&
//     keysPressed.down === false
//   ) {
//     console.log("reset speed");
//     player.resetSpeedY();
//     accelerationActivated.down = false;
//   } else if (
//     accelerationActivated.left === true &&
//     keysPressed.left === false
//   ) {
//     player.resetSpeedX();
//     accelerationActivated.left = false;
//   } else if (
//     accelerationActivated.right === true &&
//     keysPressed.right === false
//   ) {
//     player.resetSpeedX();
//     accelerationActivated.right = false;
//   }
// }

function updatePlayerMovements(
  keysPressed,
  player,
  player2,
  accelerationActivated,
  direction
) {
  Object.keys(keysPressed).forEach(function(direction) {
    //Check for movement in controls
    if (keysPressed[direction]) {
      player.accelerate(direction);
      player.setMaxSpeed();
      player.move(direction);
      //Reset speeds if player stops from being accelerated
      //Stores the info that the acceleration was activated in pressed direction
      //accelerationActivated[direction] = true;
      //Then checks if there is the key pressed and accelaration toggle match.
      //If they don't match, it means the player stopped accelerating, so speed is reset.
      //speedToggle(accelerationActivated, keysPressed, player);
    }
  });
  if (player.isColliding(player2)) {
    //player.setCollision(player2);
  }
}

var player = new Player();
var player2 = new Player();
