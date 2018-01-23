var burgerImg = new Image();
burgerImg.src = "./images/burger.png";
var tacoImg = new Image();
tacoImg.src = "./images/taco.png";
var imagesArray = [burgerImg, tacoImg];

function Goodies() {
  this.goodiesStorage = [];
  this.r = 10;
  this.goodiesCounter = 0;
}

Goodies.prototype.createGoodie = function() {
  var imageIndex = Math.floor(Math.random() * imagesArray.length);
  if (imageIndex >= imagesArray.length) {
    imageIndex -= 1;
  }
  console.log(imageIndex);
  this.goodiesStorage.push({
    image: imagesArray[imageIndex],
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    w: 50,
    h: 50
  });
};

Goodies.prototype.drawImage = function(goodie) {
  ctx.drawImage(goodie.image, goodie.x, goodie.y, goodie.w, goodie.h);
};

Goodies.prototype.draw = function() {
  this.goodiesStorage.forEach(this.drawImage);
};

Goodies.prototype.clearWalls = function() {
  for (var i = 0; i < this.goodies.length; i++) {
    if (this.goodies[i].x < 0) {
      this.goodies.splice(this.goodies.indexOf(this.goodies[i]), 1);
    }
  }
};
