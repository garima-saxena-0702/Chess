var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');


app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

var nsp = io.of('/chess');
nsp.on('connection', function (socket) {
    console.log('A user connected');

    socket.on('createRoom', function (data) {
        var room = Math.floor(Math.random() * 10000);
        socket.join("room-" + room)
        socket.emit('roomCreated',
            {
                room,
                isPlayerWhite: !!(room % 2)
            }
        );
    })
    
    socket.on('connectRoom', function (room) {
        if(io.nsps['/chess'].adapter.rooms["room-"+room] && io.nsps['/chess'].adapter.rooms["room-"+room].length == 1) {
            socket.join("room-" + room);
            socket.emit('roomConnected',
            {
                room,
                isPlayerWhite: !(room % 2)
            });
            console.log("Room "+room);
            nsp.to("room-"+room).emit("startGm", "strt");
        } else {
            socket.emit('roomConnected', {error : 'Room does not exist!'})
        }
    })

    // socket.on('message', function (roomNo) {
    //     io.to("room-" + roomNo).emit('receiveMsg', "You are in room no. " + roomNo);
    // });io.nsps

    socket.on('changePieceLocation', function(data) {
        nsp.to("room-"+data.room).emit('pieceChanged', data);
    });

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});