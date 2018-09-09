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

    socket.emit('newEmail',{
        from: 'gatinha@simoes.com',
        text: 'beijinhos para o meu simba',
        createdOn: 123
    });

    socket.emit('newMessage',{
        from: 'simba',
        text: 'hello from simba!',
        createdOn: 123
    });

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail: ', newEmail);
    });

    socket.on('createMessage', (msg) => {
        console.log('createMessage: ', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


//startup server
server.listen(port, () => console.log(`Server is listening on port ${port}`))
