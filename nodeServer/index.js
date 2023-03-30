//Node server which will handle socket.io connections
const io = require('socket.io')(8000)
/*const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});*/

/*httpServer.listen(3000);
const express = require("express")
var app = express();
var server = app.listen(8000);
var io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});*/

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
       // console.log("New user" , name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    });
    socket.on(`disconnect` ,message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});