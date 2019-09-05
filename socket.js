var socket = io('/my-namespace');

function createRoom() {
    socket.emit('createRoom', 'randomValue');
}

socket.on('roomCreated', function(data) {
    //Send message to everyone
    // io.sockets.emit('newmsg', data);
    console.log(data);
 })