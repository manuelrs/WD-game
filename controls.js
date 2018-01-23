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
