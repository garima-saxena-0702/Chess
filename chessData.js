var blackPieces = [];
var whitePieces = [];
var piecesPositions = []

class ChessPiece {
  constructor(pieceName, isBlack, piecelocation, id) {
    this.name = pieceName;
    this.isBlack = isBlack;
    [this.x,this.y] = piecelocation;
    this.id = id;
    this.img = "./icons/" + (isBlack ? "dark" : "white") + pieceName + ".png";
  }
}

var pieces = ['rook', 'horse', 'bishop', 'king', 'queen', 'bishop', 'horse', 'rook'];

function createChessPieces() {
        pieces.forEach((piece,i) => {
            let j=i+1;
            blackPieces.push(new ChessPiece(piece, true, [j, 1], "B-"+piece[0]+"-"+j));
            piecesPositions.push([j,1].toString())
            whitePieces.push(new ChessPiece(piece, false, [9-j, 8], "W-"+piece[0]+"-"+j));
            piecesPositions.push([9-j, 8].toString())
            blackPieces.push(new ChessPiece('pawn', true, [j, 2], "B-p-"+j))
            piecesPositions.push([j, 2].toString())
            whitePieces.push(new ChessPiece('pawn',false, [j, 7], "W-p-"+j))
            piecesPositions.push([j, 7].toString())
        })
    }
    
whitePieces.push(new ChessPiece('horse',false, [6,4], "W-h-"+5));

var allowedMoves = {
    rook: function(piece){
        x=piece.x;
        y=piece.y;
        let allowedRook =[];
        for(let i = x-1; i >= 1; i--) {
            if(piecesPositions.includes([i,y].toString()))
                break;
            else
                allowedRook.push([i,y].toString())
        }
        for(let i = x+1; i <= 8; i++) {
            if(piecesPositions.includes([i,y].toString()))
                break;
            else
                allowedRook.push([i,y].toString())
        }
        for(let i = y-1; i >= 1; i--) {
            if(piecesPositions.includes([x,i].toString()))
            break;
            else
            allowedRook.push([x,i].toLocaleString())
        }
        for(let i = y+1; i <= 8; i++) {
            if(piecesPositions.includes([x,i].toString()))
            break;
            else
            allowedRook.push([x,i].toString())
        }
        return allowedRook;
    },
    // 6,4 ==> 5,2  7,2  5,6  7,7   4,3  8,3   4,5  8,5
    horse: function(piece) {
        x=piece.x;
        y=piece.y;
        let allowedHorse = [];
        for(let i = -2; i <= 2; i++) {
            j = (i%2 == 0)?1:2;
            if(i != 0){
                if(!piecesPositions.includes([x+i, y-j].toString()))
                    allowedHorse.push([x+i, y-j].toString())
                if(!piecesPositions.includes([x+i, y+j].toString()))
                    allowedHorse.push([x+i, y+j].toString());
            }
        }
        return allowedHorse;
    },
    bishop: function(piece) {
        let allowedBishop = [];
        x=piece.x;
        y=piece.y;
        for(let i = x-1, j = y-1; i > 0 && j > 0; i--, j--) {
            if(!piecesPositions.includes([i ,j].toString()))
                allowedBishop.push([i, j].toString())
            else
                break;
        }
        for(let i = x+1, j = y+1; i < 9 && j < 9; i++, j++) {
            if(!piecesPositions.includes([i ,j].toString()))
                allowedBishop.push([i, j].toString())
            else
                break;
        }
        for(let i = x+1, j = y-1; i < 8 && j > 0; i=i+1, j--) {
            if(!piecesPositions.includes([i ,j].toString()))
                allowedBishop.push([i, j].toString())
            else
                break;
        }
        for(let i = x-1, j = y+1; i > 0 && j < 8; i--, j++) {
            if(!piecesPositions.includes([i ,j].toString()))
                allowedBishop.push([i, j].toString())
            else
                break;
        }
        return allowedBishop;
    },
    king: function(piece) {
        x=piece.x;
        y=piece.y;
        let allowedKing = [];
        for(let i =-1; i <=1; i++){
            for(let j = -1; j <= 1; j++) {               
                if (piecesPositions.includes([x+j, y+i].toString()))
                    break
                else if((x != x+j || y != y+i) && (x+j>0 && x+j<9 && y+i>0 && y+i<9))
                    allowedKing.push([x+j, y+i].toString())
            }
        }
        return allowedKing;
    },
    queen: function(piece) {
        // x=piece.x;
        // y=piece.y;
        let allowedQueen =[];
        allowedQueen = allowedMoves['bishop'](piece);
        allowedQueen = allowedMoves['rook'](piece).concat(allowedQueen);
        return allowedQueen;
    },
    pawn: function(piece) {
        let allowedPawn = [];
        if(piece.isBlack)
            allowedPawn.push([piece.x, piece.y+1].toString())
        else
            allowedPawn.push([piece.x, piece.y-1].toString())
        return allowedPawn;
    }
}

createChessPieces();