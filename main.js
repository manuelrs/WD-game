var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var timeCounter = 60;

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    $("#start-screen").hide();
    startGame();
  };
  function startGame() {
    updateCanvas();
  }
};

//Function to update the frame of the canvas. This is where the animation happens
function updateCanvas() {
  if (timeCounter >= 0) {
    //Check for movement in controls for player 1
    updatePlayerMovements(keysPressed, player, player2, accelerationActivated);

    //Check for movement in controls for player 2
    updatePlayerMovements(
      keysPressed2,
      player2,
      player,
      accelerationActivated2
    );

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    printTime();
    //createGrassTilesMatrix();

    for (var i = 0; i < goodiesContainer.length; i++) {
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
    player.printResults();
    player2.printResults();
    //catchGoodies(player, goodie);

    requestAnimationFrame(updateCanvas);
  } else {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
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
      player.selectImage(direction);
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

var player = new Player(
  "red",
  canvas.width / 2,
  canvas.height - 50,
  50,
  imageset1
);
var player2 = new Player(
  "blue",
  canvas.width / 2,
  canvas.height / 2,
  200,
  imageset2
);

var goodiesContainer = [];
var burger = new Burger(200, 200);
var taco = new Taco(100, 100);
var beer = new Beer(300, 300);
var floorGrass = new FloorGrass(0, 0);

//Function creating the goodies for the game
setInterval(function() {
  timeCounter -= 1;
  var foodSelector = Math.floor(Math.random() * 3);

  if (goodiesContainer.length < 6) {
    switch (foodSelector) {
      case 0:
        goodiesContainer.push(burger.createGoodie());
        break;
      case 1:
        goodiesContainer.push(taco.createGoodie());
        break;
      case 2:
        goodiesContainer.push(beer.createGoodie());
        break;
    }
  }
}, 1000);

// //Function to create the grass in the game
// function createGrassTilesMatrix() {
//   for (i = 0; i < canvas.width; i += 100) {
//     for (j = 0; j < canvas.height; i += 100) {
//       console.log("printing");
//       floorGrass.drawImage(i, j);
//     }
//   }
// }

//Function to show a countdown for the game
function printTime() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(timeCounter.toString(), canvas.width / 2, 20);
}
