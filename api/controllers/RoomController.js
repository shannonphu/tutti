const randomize = require('randomatic');

let rooms = {};

function _generateRandomCode(numChar = 8, namespace = 'ABCDEFG') {
    return randomize('?', numChar, { chars: namespace });
}

function getRoom(req, res) {
    console.log(rooms);

    let roomCode = req.params.roomCode; 
    let room = rooms[roomCode];
    if (room) {
        res.json({
            data: room
        });
    } else {
        res.json({
            data: null
        });
    }
}

function addRoom(req, res) {
    let { bpm, numBars, numLoops} = req.body;
    let _bpm = parseInt(bpm);
    let _numBars = parseInt(numBars);
    let _numLoops = parseInt(numLoops);
    let roomCode = _generateRandomCode(8, 'ABCDEFG');

    rooms[roomCode] = {
        roomCode,
        bpm: _bpm,
        numBars: _numBars,
        numLoops: _numLoops,
        totalBars: _numBars * _numLoops,
    };

    console.log(rooms);

    res.json({ data: roomCode });
}

function addUserToRoom(req, res) {
    let roomCode = req.params.roomCode; 
    let playerName = req.body;
    rooms[roomCode].users[playerName] = {
        name: req.playerName
    };

    console.log(`Added user: ${playerName}`);
    getRoom(req, res);
}
//TODO #19
function getUsersInRoom(req, res) {
    Function.prototype; //noop
}

module.exports = {
    getRoom,
    addRoom,
    addUserToRoom,
    getUsersInRoom
};