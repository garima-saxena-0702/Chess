var socket = io();
var room;

function createRoom() {
    socket.emit('createRoom', 'randomValue');
}

function showBasicData(isPlayerWhite) {
    document.getElementById('option').style.display = 'none';
    document.getElementById('connectedRoom').innerHTML = '<p>Connected room: ' + room + '. You are ' + (isPlayerWhite ? 'White. ' : 'Black.')+' </p><p id="turns"></p>';
    showPlayerDetail();
}

function showPlayerDetail() {
    let p = document.getElementById('turns')
    p.innerText = (chance? 'Your Turn.': 'Please wait.')
}

socket.on('roomCreated', function (data) {
    if (data) {
        room = data.room;
        isPlayerWhite = data.isPlayerWhite;
        chance = !isPlayerWhite;
        showBasicData(isPlayerWhite);
    }
})

socket.on('roomConnected', function (data) {
    if (!data.error) {
        document.getElementById('roomInavlid').innerText = "";
        room = data.room;
        isPlayerWhite = data.isPlayerWhite
        chance = !isPlayerWhite;
        showBasicData(isPlayerWhite);
    }else{
        document.getElementById('roomInavlid').innerText = data.error;
    }
})

socket.on('pieceChanged', function ({color, originalPos, changedPos}) {
    let movedLocation = getBox(changedPos[0], changedPos[1]);
    let currentlocation = getBox(originalPos[0], originalPos[1]);
    let imageDiv = currentlocation.innerHTML;
    currentlocation.innerHTML = "";
    indexRemoved = -1;
    if (movedLocation.children[0]) {
        let imageid = movedLocation.children[0].id;
        document.getElementById('removedPiece' + (piece.isBlack ? "White" : "Black")).appendChild(movedLocation.children[0])
        indexRemoved = (piece.isBlack ? whitePieces : blackPieces).findIndex((x) => x.id == imageid)
        pieceRemoved = removePiece(piece.isBlack ? "white" : "black", indexRemoved);
    }
    movedLocation.innerHTML = imageDiv;
    changePieceLocation(color, originalPos, changedPos);
    chance=!chance;
    showPlayerDetail();
})

function connectRoom() {
    var roomNo = document.getElementById('roomNo').value;
    socket.emit('connectRoom', roomNo);
}


