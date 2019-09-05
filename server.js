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

    socket.on('setUsername', function(data) {
        console.log(data);
        
    }) 
 
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });
 });

http.listen(3000, function() {
   console.log('listening on *:3000');
});