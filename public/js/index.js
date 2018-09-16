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
    var formattedTime = moment(msg.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: msg.text,
        from: msg.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
});

socket.on('newLocationMessage', function(msg) {
    var formattedTime = moment(msg.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        url: msg.url,
        from: msg.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);   
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