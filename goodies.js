var burgerImg = new Image();
burgerImg.src = "./images/burger.png";
var tacoImg = new Image();
tacoImg.src = "./images/taco.png";
var beerImg = new Image();
beerImg.src = "./images/beer.png";

function Goodie(x, y) {
  this.x = x;
  this.y = y;
  this.w = 50;
  this.h = 50;
  this.image = null;
}

Goodie.prototype.drawImage = function() {
  ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
};

// Goodie.prototype.constrainGoodiesArea = function() {
//   var x = Math.random() * (canvas.width - this.w);
//   var y = Math.random() * (canvas.height - this.h);
//   if (town.x < x < town.x + town.w && town.y < y < town.y + town.h) {
//     console.log(x);
//     console.log(y);
//   } else {
//     this.goodieX = x;
//     this.goodieY = y;
//   }
// };

function Burger(x, y) {
  Goodie.call(this, x, y);
  this.image = burgerImg;
}

Burger.prototype = Object.create(Goodie.prototype);
Burger.prototype.constructor = Burger;

function Taco(x, y) {
  Goodie.call(this, x, y);
  this.image = tacoImg;
}

Taco.prototype = Object.create(Goodie.prototype);
Taco.prototype.constructor = Taco;

function Beer(x, y) {
  Goodie.call(this, x, y);
  this.image = beerImg;
}

Beer.prototype = Object.create(Goodie.prototype);
Beer.prototype.constructor = Beer;
