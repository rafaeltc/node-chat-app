const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//configure express static middleware 
app.use(express.static(publicPath));

//register event listener
io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', generateMessage('Admin', "Welcome to the chat app"));

    socket.broadcast.emit('newMessage', generateMessage('Admin',"New user joined"));

    socket.on('createMessage', (msg, callback) => {
        console.log('createMessage: ', msg);
        io.emit('newMessage', generateMessage(msg.from,msg.text));
        callback('This is from the server');
        // socket.broadcast.emit('newMessage',{
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


//startup server
server.listen(port, () => console.log(`Server is listening on port ${port}`))
