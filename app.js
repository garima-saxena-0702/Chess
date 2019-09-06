chance = isPlayerWhite;

function getBox(m, n) {
    return document.getElementsByClassName('chessBoard')[0].children[n-1].children[m-1];
}

function initialChessBoard () {
    let allowedSpaces = [];
    let currentlocation;
    let piece;
    let indexRemoved = -1;
    for(let i = 1; i <= 8; i++){
        for(let j = 1; j <= 8; j++) {
            getBox(i, j).onclick = function(){
                if(allowedSpaces.length && allowedSpaces.includes([i, j].toString())){
                    let movedLocation = getBox(i, j);
                    let imageDiv = currentlocation.innerHTML;
                    currentlocation.innerHTML = "";
                    indexRemoved = -1;
                    if(movedLocation.children[0]) {
                        let imageid = movedLocation.children[0].id;
                        document.getElementById('removedPiece'+(piece.isBlack? "White": "Black")).appendChild(movedLocation.children[0])
                        indexRemoved = (piece.isBlack? whitePieces: blackPieces).findIndex((x) => x.id == imageid)
                        pieceRemoved = removePiece(piece.isBlack? "white": "black", indexRemoved);
                    }
                    movedLocation.innerHTML = imageDiv;
                    removeBorder(allowedSpaces);
                    allowedSpaces.length = 0;
                    changePieceLocation(piece.isBlack? "black": "white", [piece.x, piece.y], [i, j])
                    chance = !chance;
                }
                else if(this.children[0] && ((this.children[0].id[0] == 'b')? true: false) == chance) {
                    // if (this.children[0].id[0] == 'b' && !isPlayerWhite)
                    currentlocation = this;
                    piece = getPiece(this.children[0].getAttribute('id'));
                    if (allowedMoves[piece.name]){
                        removeBorder(allowedSpaces);    
                        allowedSpaces.length = 0;
                        allowedSpaces = allowedMoves[piece.name](piece);
                        // console.log(allowedSpaces);
                        if(allowedSpaces)
                        drawBorder(allowedSpaces);
                    }
                }
            }
        }
    }
    renderChessPieces()
}

function removeBorder(allowedSpaces) {
    allowedSpaces.forEach(space => {
        let box = getBox(...space.split(','))
        box.style.border = "none";
    })
}

function drawBorder(allowedSpaces) {
    allowedSpaces.forEach(space => {
        let box = getBox(...space.split(','))
        box.style.border = "2px solid darkblue";
    })
}

function renderChessPieces(){
    [...blackPieces, ...whitePieces].forEach(piece=>{
         let img = document.createElement('img');
        img.src = piece.img;
        img.id = piece.id;
        getBox(piece.x, piece.y).appendChild(img);
    })
}

function getPiece(id) {
    return [...blackPieces, ...whitePieces].find(piece => {
        if(piece.id == id)
            return true;
    })
}


initialChessBoard();