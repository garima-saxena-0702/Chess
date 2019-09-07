chance = isPlayerWhite;

function getBox(m, n) {
    return document.getElementsByClassName('chessBoard')[0].children[n-1].children[m-1];
}

function renderNewBorders ( allowedSpaces, piece ){
    removeBorder(allowedSpaces);    
    allowedSpaces = allowedMoves[piece.name](piece);
    drawBorder(allowedSpaces);
    return allowedSpaces
}

function initialChessBoard () {
    let allowedSpaces = [];
    let piece;
    for(let i = 1; i <= 8; i++){
        for(let j = 1; j <= 8; j++) {
            getBox(i, j).onclick = function(){
                if(allowedSpaces.length && allowedSpaces.includes([i, j].toString())){
                    removeBorder(allowedSpaces);
                    allowedSpaces.length = 0;
                    socket.emit('changePieceLocation', { color: piece.isBlack ? "black" : "white", originalPos: [piece.x, piece.y], changedPos: [i, j], room: room });
                }
                else if(this.children[0] && ((this.children[0].id[0] == 'w')? true: false) == isPlayerWhite) {
                    if(!chance) return;
                    currentlocation = this;
                    piece = getPiece(this.children[0].getAttribute('id'));
                    if (allowedMoves[piece.name]){
                        allowedSpaces = renderNewBorders(allowedSpaces, piece);
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