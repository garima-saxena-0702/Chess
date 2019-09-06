var socket = io();

function createRoom() {
    socket.emit('createRoom', 'randomValue');
}

socket.on('roomCreated', function(data) {
    if(data) {
        isPlayerWhite = data.isPlayerWhite;
        document.getElementById('option').style.display = 'none';
        document.getElementById('connectedRoom').innerHTML = 'Connected room: ' + data.room + '. You are ' + (data.isPlayerWhite ? 'White' : 'Black');
    }
})

socket.on('roomConnected', function(data) {
    if(data) {
        document.getElementById('option').style.display = 'none';
        document.getElementById('connectedRoom').innerHTML = 'Connected room: ' + data.room + '. You are ' + (data.isPlayerWhite?'White':'Black');
    }
})

socket.on('receiveMsg', function(data) {
    console.log(data);
})

function connectRoom() {
    var roomNo = document.getElementById('roomNo').value;
    socket.emit('connectRoom', roomNo);
}

function sendMessage() {
    var roomNo = document.getElementById('roomNo').value;
    socket.emit('message', roomNo);
}

