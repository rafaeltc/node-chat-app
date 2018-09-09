const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


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

    socket.emit('newMessage',{
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdOn: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdOn: new Date().getTime()
    });

    socket.on('createMessage', (msg) => {
        console.log('createMessage: ', msg);
        io.emit('newMessage',{
            from: msg.from,
            text: msg.text,
            createdAt: new Date().getTime()
        });
        // socket.broadcast.emit('newMessage',{
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


//startup server
server.listen(port, () => console.log(`Server is listening on port ${port}`))
