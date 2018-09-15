var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    // socket.emit('createMessage', {
    //     from: 'simba',
    //     text: 'Hello from simba!'
    // });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(msg) {
    console.log('New message! ', msg);
    var li = jQuery('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}:`);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    //document.querySelector('[name=message]')
    var messageTextbox = $('[name=message]');
  
    socket.emit('createMessage', {
      from: 'User',
      text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
  });
  
  var locationButton = jQuery('#send-location');
  locationButton.on('click', function() {
      if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
      }

      locationButton.attr('disabled','disabled').text('Sending location...');

      navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
      }, function() {
          locationButton.removeAttr('disabled').text('Send location');
          alert('Unable to fetch location.');
      });
  });