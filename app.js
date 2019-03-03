function getBox(m, n) {
    return document.getElementsByClassName('chessBoard')[0].children[n-1].children[m-1];
}

function initialChessBoard () {
    for(let i = 1; i <= 8; i++){
        for(let j = 1; j <= 8; j++) {
            getBox(i, j).onclick = function(){
                console.log(this);
            }
        }
    }
    renderChessPieces()
}

function renderChessPieces(){
    [...blackPieces, ...whitePieces].forEach(piece=>{
        let img = document.createElement('img');
        img.src = piece.img;
        getBox(piece.x, piece.y).appendChild(img);
    })
}


initialChessBoard();