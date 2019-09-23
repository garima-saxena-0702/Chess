var socket = io('/chess');
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
        document.getElementById("roomId").innerHTML = 'Room Id: <strong>' + room + ' <strong>.'
    }
})

socket.on('roomConnected', function (data) {
    if (!data.error) {
        console.log(data);
        document.getElementById('roomInavlid').innerText = "";
        room = data.room;
        isPlayerWhite = data.isPlayerWhite
        chance = !isPlayerWhite;
    }else{
        document.getElementById('roomInavlid').innerText = data.error;
    }
})

socket.on("startGm", function(data) {
    showBasicData(isPlayerWhite);
})

socket.on('pieceChanged', function ({piece, originalPos, changedPos}) {
    let movedLocation = getBox(changedPos[0], changedPos[1]);
    let currentlocation = getBox(originalPos[0], originalPos[1]);
    let imageDiv = currentlocation.innerHTML;
    currentlocation.innerHTML = "";
    indexRemoved = -1;
    if (movedLocation.children[0]) {
        let imageid = movedLocation.children[0].id;
            if(movedLocation.children[0].id.slice(2,3) == 'k'){
                document.getElementById('matchResult').innerHTML += '<p> <strong>' + (piece.isBlack ? "Black" : "White") + '</strong> </p> <div>Wins</div>';
                document.getElementById('matchResult').style.display = 'block';
                return;
            }
        document.getElementById('removedPiece' + (piece.isBlack ? "White" : "Black")).appendChild(movedLocation.children[0])
        indexRemoved = (piece.isBlack ? whitePieces : blackPieces).findIndex((x) => x.id == imageid)
        pieceRemoved = removePiece(piece.isBlack ? "white" : "black", indexRemoved);
    }
    movedLocation.innerHTML = imageDiv;
    changePieceLocation(piece.isBlack ? "black" : "white", originalPos, changedPos);
    chance=!chance;
    showPlayerDetail();
})

function connectRoom() {
    var roomNo = document.getElementById('roomNo').value;
    socket.emit('connectRoom', roomNo);
}

function playagain() {
    document.getElementById('option').style.display = 'block';
}