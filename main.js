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

  goodie.draw();
  player.draw();
  player2.draw();
  player.printResults();
  player2.printResults();

  requestAnimationFrame(updateCanvas);
}

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

var player = new Player("red", canvas.width / 2, canvas.height, 50);
var player2 = new Player("blue", canvas.width / 2, canvas.height / 2, 200);
var goodie = new Goodies();

setInterval(function() {
  if (goodie.goodiesStorage.length < 6) {
    goodie.createGoodie();
  }
}, 2000);
