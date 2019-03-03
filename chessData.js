var blackPieces = [];
var whitePieces = [];

class ChessPiece {
  constructor(pieceName, isBlack, piecelocation) {
    this.name = pieceName;
    this.isBlack = isBlack;
    [this.x,this.y] = piecelocation;
    this.img = "./icons/" + (isBlack ? "dark" : "white") + pieceName + ".png";
  }
}

var pieces = ['rook', 'horse', 'bishop', 'king', 'queen', 'bishop', 'horse', 'rook'];

function createChessPieces() {
        pieces.forEach((piece,i) => {
            let j=i+1;
            blackPieces.push(new ChessPiece(piece, true, [j, 1]));
            whitePieces.push(new ChessPiece(piece, false, [9-j, 8]));
            blackPieces.push(new ChessPiece('pawn', true, [j, 2]))
            whitePieces.push(new ChessPiece('pawn',false, [j, 7]))
        })
}

createChessPieces();

// var initialLocations = {
//     white:8,
//     black:1,
//     whitePawn:7,
//     blackPawn:1,
//     rookX:1,
//     horseX:2,
//     bishopX:3,
// }

// var addPieceType = function(type){

//     if(type==='pawn'){

//     }

//     blackPieces.push(new ChessPiece(type, true, [ initialLocations[type+'X'], initialLocations.black ]))
//     whitePieces.push(new ChessPiece(type, false, [ initialLocations[type+'X'], initialLocations.white ]))
//     blackPieces.push(new ChessPiece(type, true, [ 9-initialLocations[type+'X'], initialLocations.black ]))
//     whitePieces.push(new ChessPiece(type, false, [ 9-initialLocations[type+'X'], initialLocations.white ]))
// }

// addPieceType('bishop')
// addPieceType('rook')
// addPieceType('horse')
