var canvas = document.getElementById("chessBoard");
var ctx = canvas.getContext("2d");
var lineHeight = canvas.width;

/**
 * @param x x coordinate
 * @param y y coordinate
 * @param direction 0 for Horizontal else 1 for vertical
 */
function drawLine(x, y, direction) {
  ctx.moveTo(x, y);
  ctx.lineTo(x + lineHeight * !direction, y + lineHeight * direction);
  ctx.stroke();
}

function fillChessSqaure() {
  let color = true;
  for (let i = 0; i < lineHeight; i += lineHeight / 8) {
    color = !color;
    for (let j = 0; j < lineHeight; j += lineHeight / 8) {
      ctx.fillStyle = color ? "white" : "black";
      color = !color;
      ctx.fillRect(i, j, lineHeight / 8, lineHeight / 8);
    }
  }
}

function drawBoardBorder(){
    drawLine(0, 0, 0);
    drawLine(0, 0, 1);
    drawLine(lineHeight, 0, 1);
    drawLine(0, lineHeight, 0);
}

function drawChessBoard(){
    fillChessSqaure();
    drawBoardBorder();
}

drawChessBoard()