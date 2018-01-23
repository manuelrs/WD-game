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

Goodie.prototype.createGoodie = function() {
  return {
    x: Math.random() * (canvas.width - this.w),
    y: Math.random() * (canvas.height - this.h),
    w: this.w,
    h: this.h,
    image: this.image
  };
};

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
