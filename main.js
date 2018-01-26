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

    //Draw chillies
    if (badGoodiesContainer.length !== 0) {
      ctx.drawImage(
        badGoodiesContainer[0].image,
        badGoodiesContainer[0].x,
        badGoodiesContainer[0].y,
        badGoodiesContainer[0].w,
        badGoodiesContainer[0].h
      );
    }

    //Draw milk
    if (milkContainer.length !== 0) {
      ctx.drawImage(
        milkContainer[0].image,
        milkContainer[0].x,
        milkContainer[0].y,
        milkContainer[0].w,
        milkContainer[0].h
      );
    }

    if (cookieContainer.length !== 0) {
      ctx.drawImage(
        cookieContainer[0].image,
        cookieContainer[0].x,
        cookieContainer[0].y,
        cookieContainer[0].w,
        cookieContainer[0].h
      );
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

  //Actions taken when chilli is eaten
  if (badGoodiesContainer.length !== 0) {
    if (player.collisionWithFood(badGoodiesContainer[0])) {
      player.maxSpeed = 3;
      badGoodiesContainer.splice(
        badGoodiesContainer.indexOf(badGoodiesContainer[0]),
        1
      );
    }
  }

  //Actions taken when milk is drank
  if (milkContainer.length > 0) {
    if (player.collisionWithFood(milkContainer[0])) {
      if (player.maxSpeed < 7 && player.maxSpeed === 3) {
        player.speedX = 5;
        player.speedY = 5;
        player.maxSpeed = 5;
      }
      milkContainer.splice(milkContainer.indexOf(milkContainer[0]), 1);
    }
  }

  //Actions taken when cookie is drank
  if (cookieContainer.length > 0) {
    if (player.collisionWithFood(cookieContainer[0])) {
      player.speedX = 7;
      player.speedY = 7;
      player.maxSpeed = 7;
      cookieContainer.splice(cookieContainer.indexOf(cookieContainer[0]), 1);
    }
  }
}
