const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

    var user; 
    beforeEach(() => {
        users = new Users();
        users.users = [
        {
            id: '1',
            name: 'Rodovaldo',
            room: 'Sci-Fi'
        },
        {
            id: '2',
            name: 'Francisca',
            room: 'Movies'
        },
        {
            id: '3',
            name: 'Mariazinha',
            room: 'Sci-Fi'
        }
    ];
    });

    it('should add a new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'meself',
            room: 'wizardz'
        };
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return names for room Sci-Fi', () => {
        var userList = users.getUserList('Sci-Fi');
        expect(userList).toEqual(['Rodovaldo','Mariazinha']);
    });

    it('should return names for room Movies', () => {
        var userList = users.getUserList('Movies');
        expect(userList).toEqual(['Francisca']);
    });

    it('should remove a user', () => {
        var userId = '2';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not remove user', () => {
        var user = users.removeUser('xyz');
        expect(user).toBeFalsy();
    });

    it('should find user',() => {
        var userId = '2';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not find user',() => {
        var user = users.getUser('99');
        expect(user).toBeFalsy();
    });

});