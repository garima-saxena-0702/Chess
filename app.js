function getBox(m, n) {
    return document.getElementsByClassName('chessBoard')[0].children[n-1].children[m-1];
}

function initialChessBoard () {
    let allowedSpaces = [];
    for(let i = 1; i <= 8; i++){
        for(let j = 1; j <= 8; j++) {
            getBox(i, j).onclick = function(){
                console.log(i,j)
                if(!this.children[0]) return
                // let id = this.children[0].getAttribute('id');
                let piece = getPiece(this.children[0].getAttribute('id'));
                // if(allowedSpaces.length && allowedSpaces.includes([piece.x, piece.y].toString()) && this.children[0]){
                //     console.log("in here!");
                // }
                if (allowedMoves[piece.name]){
                    removeBorder(allowedSpaces);
                    allowedSpaces = [];
                    allowedSpaces = allowedMoves[piece.name](piece);
                    // console.log(allowedSpaces);
                    if(allowedSpaces)
                    drawBorder(allowedSpaces);
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