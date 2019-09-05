var socket = io('/my-namespace');

function createRoom() {
    socket.emit('createRoom', 'randomValue');
}

socket.on('roomCreated', function(data) {
    console.log(data);
 })

socket.on('receiveMsg', function(data) {
    console.log(data);
 })

function connectRoom() {
    var roomNo = document.getElementById('roomNo').value;
    console.log(roomNo);
    socket.emit('connectRoom', roomNo);
}

function sendMessage() {
    var roomNo = document.getElementById('roomNo').value;
    socket.emit('message', roomNo);
}

