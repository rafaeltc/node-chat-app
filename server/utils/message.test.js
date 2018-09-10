var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = "Admin";
        var text = "This is Admin!";
        var msg = generateMessage(from, text);

        expect(typeof msg.createdAt).toBe('number');
        expect(msg).toMatchObject({from, text});
    });
});