var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');


app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', function (socket) {
    console.log('A user connected');

    socket.on('createRoom', function (data) {
        var room = Math.floor(Math.random() * 10000);
        socket.join("room-" + room);
        socket.emit('roomCreated',
            {
                room,
                isPlayerWhite: !!(room % 2)
            }
        );
    })
    
    socket.on('connectRoom', function (room) {
        socket.join("room-" + room);
        socket.emit('roomConnected',
        {
            room,
            isPlayerWhite: !(room % 2)
        });
    })

    socket.on('message', function (roomNo) {
        if (io.nsps['/'].adapter.rooms["room-" + roomNo].length == 2);
        io.to("room-" + roomNo).emit('receiveMsg', "You are in room no. " + roomNo);
    })

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});