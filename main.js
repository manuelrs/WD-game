var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var timeCounter = 100000;

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    $("#start-screen").hide();

    startGame();
    timeCounter = 60;
  };
  function startGame() {
    updateCanvas();
  }
};

//Function to update the frame of the canvas. This is where the animation happens
function updateCanvas() {
  if (timeCounter >= 0) {
    //Check for movement in controls for player 1
    updatePlayerMovements(
      keysPressed,
      player,
      player2,
      // tree,
      accelerationActivated
    );

    //Check for movement in controls for player 2
    updatePlayerMovements(
      keysPressed2,
      player2,
      player,
      // tree,
      accelerationActivated2
    );

    //Create the grass
    createGrassTilesMatrix();

    //Draw trees
    for (var i = 0; i < treesContainer.length; i++) {
      if (treesContainer.length !== 0) {
        ctx.drawImage(
          treesContainer[i].image,
          treesContainer[i].x,
          treesContainer[i].y,
          treesContainer[i].w,
          treesContainer[i].h
        );
      }
    }

    //Print the time at the middle. Starts at 60 seconds.
    printTime();

    //Draw the goodies
    for (i = 0; i < goodiesContainer.length; i++) {
      if (goodiesContainer.length !== 0) {
        ctx.drawImage(
          goodiesContainer[i].image,
          goodiesContainer[i].x,
          goodiesContainer[i].y,
          goodiesContainer[i].w,
          goodiesContainer[i].h
        );
      }
    }

    //Start drawing the player
    player.drawImage();
    player2.drawImage();

    requestAnimationFrame(updateCanvas);
  } else {
    ctx.fillStyle = "#27ae60";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px helvetica";
    ctx.fillStyle = "white";
    var winner = "";
    if (player.score > player2.score) {
      winner = "Player 1 wins. Final score: " + player.score + " points.";
    } else if (player.score < player2.score) {
      winner = "Player 2 wins. Final score: " + player.score + " points.";
    } else {
      winner = "It's a tie! Both players scored " + player.score + " points.";
    }
    ctx.textAlign = "center";
    ctx.fillText(winner, canvas.width / 2, canvas.height / 2);
  }
}

//Function executes all the movement related events.
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
      player.selectImage(direction);
    }
  });
  if (player.isColliding(player2)) {
  }
  //Check collision with tree
  if (player.isColliding2(treesContainer[0])) {
  }
  if (player.isColliding2(treesContainer[1])) {
  }
  //Delete the food picked up by the player
  for (i = 0; i < goodiesContainer.length; i++) {
    if (goodiesContainer.length !== 0) {
      if (player.collisionWithFood(goodiesContainer[i])) {
        player.score += 1;
        goodiesContainer.splice(
          goodiesContainer.indexOf(goodiesContainer[i]),
          1
        );
      }
    }
  }
}
