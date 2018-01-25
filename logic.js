//Creation of variables
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

//Create tree column trees
treesContainer.push(new Tree(600, 80));
treesContainer.push(new Tree(150, 130));

//Function to show a countdown for the game
function printTime() {
  ctx.font = "30px Moderne Sans";
  ctx.fillStyle = "white";
  ctx.fillText(timeCounter.toString(), canvas.width / 2, 50);
}

//Function to create the grass in the game
function createGrassTilesMatrix() {
  for (i = 0; i < canvas.width; i += 100) {
    for (j = 0; j < canvas.height; j += 100) {
      floorGrass.drawImage(i, j);
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

//The function constrains the are where the goodies can appear. Necessary only for town.
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
      x = Math.random() * (800 - 50);
      y = Math.random() * (600 - 50);
      loop = 1;
    } else {
      loop = 0;
      return [x, y];
    }
  }
}
