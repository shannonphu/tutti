class RoomController {
    constructor(cache) {
        const randomize = require('randomatic');
        let _generateRandomCode = function (numChar = 8, namespace = 'ABCDEFG') {
            return randomize('?', numChar, { chars: namespace });
        };
        let _addRoomToCache = function (roomCode, bpm, numBars, numLoops, users) {
            if (cache.set(roomCode, {
                roomCode,
                bpm,
                numBars,
                numLoops,
                users,
                totalBars: numBars * numLoops
            })) {
                console.log('Added room to cache');
                console.log(cache.data);
            }
            else {
                console.error('Could not add to cache');
            }
        };
        let _getRoomFromCache = function (roomCode) {
            let room = cache.get(roomCode);
            if (room != undefined) {
                return room;
            }
            else {
                console.error(`Could not get key ${roomCode} from cache`);
                return null;
            }
        };
        _addRoomToCache('ABC', 120, 3, 4);
        _addRoomToCache('AAA', 60, 4, 6);
        this.getRoom = function (req, res) {
            let roomCode = req.params.roomCode;
            let room = _getRoomFromCache(roomCode);
            if (room) {
                res.json({
                    data: room
                });
            }
            else {
                res.json({
                    data: null
                });
            }
        };
        this.addRoom = function (req, res) {
            let { bpm, numBars, numLoops, user } = req.body;
            let _bpm = parseInt(bpm);
            let _numBars = parseInt(numBars);
            let _numLoops = parseInt(numLoops);
            let roomCode = _generateRandomCode(8, 'ABCDEFG');
            let users = {user}
            _addRoomToCache(roomCode, _bpm, _numBars, _numLoops, users);
            res.json({ data: roomCode });
        };
        
        this.addUserToRoom = function (req, res) {
            let roomCode = req.params.roomCode;
            let user = req.body;
            let room = _getRoomFromCache(roomCode);
            if (room) { // add user to room
                let usersInRoom = room.users;
                room.users = { ...usersInRoom, user };
                _addRoomToCache(...room);
            }
            console.log(`Added user: ${user.playerName}`);
            res.json({data: _getRoomFromCache(roomCode)})
        };
    }
}

module.exports = RoomController;
