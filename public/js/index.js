var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createEmail', {
        to: 'simba@leao.com',
        text: 'this is gatinha simoes'
    });

    socket.emit('createMessage', {
        from: 'simba',
        text: 'Hello from simba!'
    });

    
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newEmail', function(email) {
    console.log('New Email!', email);
});

socket.on('newMessage', function(msg) {
    console.log('New message! ', msg);
});