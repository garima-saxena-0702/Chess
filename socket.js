var socket = io('/my-namespace');

function createRoom() {
    socket.emit('setUsername', 'randomValue');
}