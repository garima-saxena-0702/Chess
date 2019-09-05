var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');


app.use(express.static(__dirname));

app.get('/', function(req, res) {
   res.sendFile(path.join(__dirname, 'index.html'));
});

var nsp = io.of('/my-namespace');
nsp.on('connection', function(socket) {
    console.log('A user connected');

    socket.on('createRoom', function(data) {
        var room = Math.floor(Math.random()*10000);
        socket.join("room-" + room);
        socket.emit('roomCreated', room);
    }) 

    socket.on('connectRoom', function(roomNo) {
        socket.join("room-" + roomNo);
        // socket.emit('roomCreated', room);
    }) 

    socket.on('message', function (roomNo) {
        console.log(roomNo);
        console.log('Heya');
        io.sockets.in("room-" + roomNo).emit('receiveMsg', "You are in room no. " + roomNo);
    }) 
    
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });
 });

http.listen(3000, function() {
   console.log('listening on *:3000');
});