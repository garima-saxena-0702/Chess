var blackPieces = [];
var whitePieces = [];
var blackPiecesPositions = [];
var whitePiecesPositions = [];

class ChessPiece {
  constructor(pieceName, isBlack, piecelocation, id) {
    this.name = pieceName;
    this.isBlack = isBlack;
    [this.x, this.y] = piecelocation;
    this.id = id;
    this.img = "./icons/" + (isBlack ? "dark" : "white") + pieceName + ".png";
  }
}

var pieces = [
  "rook",
  "horse",
  "bishop",
  "king",
  "queen",
  "bishop",
  "horse",
  "rook"
];


var addPiece = function yogurtEaterz(pieceName, color, pos) {
    this[color+'PiecesPositions'].push(pos.toString());
    this[color+'Pieces'].push(new ChessPiece(pieceName, color=='black', pos, color[0]+"-"+pieceName[0]+'-'+pos[0]));
}.bind(this)

var changePieceLocation = function yogurtConsumerz(color, originalPos, changedPos) {
    let index = this[color+'PiecesPositions'].indexOf(originalPos.toString());
    this[color+'PiecesPositions'][index] = changedPos.toString();
    this[color+'Pieces'][index].x = changedPos[0];
    this[color+'Pieces'][index].y = changedPos[1];
}.bind(this)

var removePiece = function coldCoffe(color, indexRemoved) {
        this[color+'PiecesPositions'].splice(indexRemoved,1);
        let removedPiece = this[color+'Pieces'].splice(indexRemoved,1);
        console.log(removedPiece);
}.bind(this)

function createChessPieces() {
  pieces.forEach((piece, i) => {
    let j = i + 1;
    addPiece(piece, "black", [j, 1])
    addPiece(piece, "white", [9-j, 8])
    addPiece("pawn", "black", [j, 2])
    addPiece("pawn", "white", [j, 7])
  });
}

var checkCollision = (key, piece, allowedSpots) => { 
  if ([...whitePiecesPositions, ...blackPiecesPositions].includes(key)) {
    let index = [...whitePiecesPositions, ...blackPiecesPositions].indexOf(key);
    let target = [...whitePieces, ...blackPieces][index];
    if (target.isBlack === piece.isBlack) {
      return 0;
    } else {
      allowedSpots.push(key);
      return 1;
    }
  }
  allowedSpots.push(key);
  return 2;
};

let processCollision = function (x, piece, allowedSpots){
    if(x.some((a) =>  {return a>8 || a<1})) return false;
    let collisionCode = checkCollision(
        x.toString(),
        piece,
        allowedSpots
      );
      if (collisionCode < 2) {
        return true
      }        
}

var allowedMoves = {
  rook: function(piece) {
    x = piece.x;
    y = piece.y;
    let allowedRook = [];
    for (let i = x - 1; i >= 1; i--) {
      if(processCollision([i,y], piece, allowedRook)) break;
    }
    for (let i = x + 1; i <= 8; i++) {
        if(processCollision([i,y], piece, allowedRook)) break;
    }
    for (let i = y - 1; i >= 1; i--) {
        if(processCollision([x,i], piece, allowedRook)) break;
    }
    for (let i = y + 1; i <= 8; i++) {
        if(processCollision([x,i], piece, allowedRook)) break;
    }
    return allowedRook;
  },
  horse: function(piece) {
    x = piece.x;
    y = piece.y;
    let allowedHorse = [];
    let piecesPositions = blackPiecesPositions;
    if (piece.id[0] == "W") piecesPositions = whitePiecesPositions;
    for (let i = -2; i <= 2; i++) {
      j = i % 2 == 0 ? 1 : 2;
      if (i != 0) {
        if(processCollision([x+i,y-j], piece, allowedHorse));
        if(processCollision([x+i,y+j], piece, allowedHorse));
      }
    }
    return allowedHorse;
  },
  bishop: function(piece) {
    let allowedBishop = [];
    x = piece.x;
    y = piece.y;
    for (let i = x - 1, j = y - 1; i > 0 && j > 0; i--, j--) {
        if(processCollision([i,j], piece, allowedBishop)) break;
    }
    for (let i = x + 1, j = y + 1; i < 9 && j < 9; i++, j++) {
        if(processCollision([i,j], piece, allowedBishop)) break;
    }
    for (let i = x + 1, j = y - 1; i < 9 && j > 0; i = i + 1, j--) {
        if(processCollision([i,j], piece, allowedBishop)) break;
    }
    for (let i = x - 1, j = y + 1; i > 0 && j < 9; i--, j++) {
        if(processCollision([i,j], piece, allowedBishop)) break;
    }
    return allowedBishop;
  },
  king: function(piece) {
    x = piece.x;
    y = piece.y;
    let allowedKing = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if(processCollision([x+i, y+j], piece, allowedKing)) continue;
      }
    }
    return allowedKing;
  },
  queen: function(piece) {
      return [...this.bishop(piece),...this.rook(piece)];
  },
  //x-1,y+1 x,y+1 x+1,y+1
  //
  pawn: function(piece) {
    x = piece.x;
    y = piece.y;
    i = piece.isBlack? 1 : -1;
    let allowedPawn = [];
    pawnCollision(x-1, y+i, piece, allowedPawn);
    pawnCollision(x+1, y+i, piece, allowedPawn);
    if(![...whitePiecesPositions,...blackPiecesPositions].includes([x, y+i].toString()))
        allowedPawn.push([x, y+i].toString())
    return allowedPawn;
}
};

function pawnCollision(x, y,piece, allowedPawn) {
    let index = [...whitePiecesPositions, ...blackPiecesPositions].indexOf([x, y].toString());
    let target = [...whitePieces, ...blackPieces][index];
    if(target && target.isBlack != piece.isBlack)
        allowedPawn.push([x, y].toString())
}

createChessPieces();
