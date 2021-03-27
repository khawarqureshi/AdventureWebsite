var squareHeight = 100;
var squareWidth = 100;
var squareGap = 10;
var column = 4;
var row = 3;

var colorCount = column * row;
var genOnce = false;

var temp;
var totalTiles = column * row;
var squarePlacement = [];
var highlight = createjs.Graphics.getRGB(255, 0, 0);
var tileChecked;
function init() {
  var stage = new createjs.Stage("myCanvas");

  randomDoubleColor();

  for (i = 0; i < squarePlacement.length; i++) {
    var color = randomColor();
    var square = drawSquare(color);

    square["color"] = square.graphics._fill.style;
    square.graphics._fill.style = "rgb(140, 136, 136)";

    square.x = (squareWidth + squareGap) * (squarePlacement[i] % column);
    square.y =
      (squareHeight + squareGap) * Math.floor(squarePlacement[i] / column);
    stage.addChild(square);
    square.addEventListener("click", handleOnPress);
    stage.update();
  }

  function handleOnPress(e) {
    var tile = e.target;

    tile.graphics.beginFill(tile.color).rect(5, 5, squareHeight, squareWidth);
    tile.mouseEnabled = false;

    if (!!tileChecked === false) {
      tileChecked = tile;
    } else {
      stage.mouseChildren = false;
      tile.graphics.beginFill(tile.color).rect(5, 5, squareHeight, squareWidth);

      setTimeout(function () {
        if (tileChecked.color === tile.color && tileChecked !== tile) {
          tileChecked.visible = false;
          tile.visible = false;
          console.log("match");
          console.log((colorCount = colorCount - 2));
          if (colorCount < 1) {
            console.log("finished");

            document.getElementById(
              "countdown"
            ).innerHTML = document.location.reload();
            document.getElementById(
              "countdown"
            ).innerHTML = document.getElementById("startBtn").style.display =
              "<p id=winMsg> YOU WIN!<p>";
            document.getElementById("startBtn").style.display = "block";
          }
        } else {
          console.log("not match");
          tile.graphics
            .beginFill("rgb(140, 136, 136)")
            .rect(5, 5, squareHeight, squareWidth);
          tileChecked.graphics
            .beginFill("rgb(140, 136, 136)")
            .rect(5, 5, squareHeight, squareWidth);
        }
        tile.mouseEnabled = true;
        tileChecked.mouseEnabled = true;
        stage.mouseChildren = true;
        tileChecked = null;

        stage.update();
      }, 1000);
    }
    console.log("we are at the end");
    stage.update();
  }
}

function drawSquare(color) {
  var graphics = new createjs.Graphics()
    .setStrokeStyle(5)
    .beginStroke("rgba(20,20,20,1)");

  if (!genOnce) {
    graphics.beginFill(color).rect(5, 5, squareHeight, squareWidth);
    temp = color;
    genOnce = true;
  } else {
    graphics.beginFill(temp).rect(5, 5, squareHeight, squareWidth);
    genOnce = false;
  }

  var shape = new createjs.Shape(graphics);
  return shape;
}

function randomColor() {
  var num1 = Math.floor(Math.random() * 255);
  var num2 = Math.floor(Math.random() * 255);
  var num3 = Math.floor(Math.random() * 255);

  return "rgba(" + num1 + "," + num2 + "," + num3 + ",1)";
}

function randomDoubleColor() {
  for (i = 0; i < totalTiles; i++) {
    squarePlacement.push(i);
  }

  squarePlacement = shuffleArray(squarePlacement);

  return squarePlacement;
}
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function hideStart() {
  document.getElementById("startBtn").style.display = "none";
  var timeleft = 40;
  var downloadTimer = setInterval(function () {
    if (timeleft < 0) {
      clearInterval(downloadTimer);
      document.getElementById(
        "countdown"
      ).innerHTML = document.location.reload();
      document.getElementById("countdown").innerHTML = document.getElementById(
        "startBtn"
      ).style.display = "<p id=lossMsg> Time's Up!<p>";
      document.getElementById("startBtn").style.display = "block";
    } else {
      document.getElementById("countdown").innerHTML =
        timeleft + " seconds remaining...";
      document.getElementById("progressBar").value = 40 - timeleft;
    }
    timeleft -= 1;
  }, 1000);
}
