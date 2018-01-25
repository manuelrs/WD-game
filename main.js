var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var timeCounter = 100000;

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    $("#start-screen").hide();
    startGame();
    timeCounter = 600;
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
      tree,
      accelerationActivated
    );

    //Check for movement in controls for player 2
    updatePlayerMovements(
      keysPressed2,
      player2,
      player,
      tree,
      accelerationActivated2
    );

    createGrassTilesMatrix();

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

    printTime();

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
    player.printResults();
    player2.printResults();

    requestAnimationFrame(updateCanvas);
  } else {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    var winner = "";
    if (player.score > player2.score) {
      winner = "Player 1 wins" + player.score;
    } else if (player.score < player2.score) {
      winner = "Player 2 wins" + player.score;
    } else {
      winner = "It's a tie! Both players scored" + player.score;
    }
    ctx.textAlign = "center";
    ctx.fillText(winner, canvas.width / 2, canvas.height / 2);
  }
}

function updatePlayerMovements(
  keysPressed,
  player,
  player2,
  tree,
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
  }
  if (player.isColliding2(treesContainer[0])) {
    console.log("collision with tree");
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
var treesContainer = [];
var burger = new Burger(0, 0);
var taco = new Taco(100, 100);
var beer = new Beer(300, 300);
var floorGrass = new FloorGrass(0, 0);
var tree = new Tree(0, 0);
var town = new Town(0, 0);

//Create tree column at the right

treesContainer.push(tree.createObstacle(600, 100));
treesContainer.push(town.createObstacle(100, 150));

function constrainGoodiesArea() {
  var x0 = 100;
  var x1 = 388;
  var y0 = 150;
  var y1 = 428;
  var x = 150;
  var y = 155;
  var loop = 1;
  while (loop === 1) {
    if (!(x < x0 || (x > x1 && y < y0) || y > y1)) {
      console.log("x= " + x + "y= " + y);
      x = Math.random() * (800 - 50);
      y = Math.random() * (600 - 50);
      loop = 1;
    } else {
      loop = 0;
      console.log("x= " + x + "y= " + y);
      return [x, y];
    }
  }
}

//Function creating the goodies for the game
setInterval(function() {
  timeCounter -= 1;
  var foodSelector = Math.floor(Math.random() * 3);

  if (goodiesContainer.length < 6) {
    switch (foodSelector) {
      case 0:
        goodiesContainer.push(
          new Burger(constrainGoodiesArea()[0], constrainGoodiesArea()[1])
        );
        break;
      case 1:
        goodiesContainer.push(
          new Taco(constrainGoodiesArea()[0], constrainGoodiesArea()[1])
        );
        break;
      case 2:
        goodiesContainer.push(
          new Beer(constrainGoodiesArea()[0], constrainGoodiesArea()[1])
        );
        break;
    }
  }
}, 1000);

//Function to create the grass in the game
function createGrassTilesMatrix() {
  for (i = 0; i < canvas.width; i += 100) {
    for (j = 0; j < canvas.height; j += 100) {
      floorGrass.drawImage(i, j);
    }
  }
}

//Function to show a countdown for the game
function printTime() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(timeCounter.toString(), canvas.width / 2, 20);
}

//Draws a rounded rectangle using the current state of the canvas.
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == "undefined") {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
  if (fill) {
    ctx.fill();
  }
}
