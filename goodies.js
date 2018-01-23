var burgerImg = new Image();
burgerImg.src = "./images/burger.png";
// var tacoImg = new Image();
// tacoImg.src = "./images/taco.png";

function Burger(x, y) {
  this.x = x;
  this.y = y;
  this.w = 50;
  this.h = 50;
  this.image = burgerImg;
}

Burger.prototype.drawImage = function() {
  ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
};

Burger.prototype.createBurger = function() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    w: this.w,
    h: this.h,
    image: this.image
  };
};
