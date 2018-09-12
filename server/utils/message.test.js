var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = "Admin";
        var text = "This is Admin!";
        var msg = generateMessage(from, text);

        expect(typeof msg.createdAt).toBe('number');
        expect(msg).toMatchObject({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location message', () => {
        var from = 'Jhony';
        var latitude = 20;
        var longitude = 20;
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        var message = generateLocationMessage(from, latitude, longitude);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,url});

    });


    
});