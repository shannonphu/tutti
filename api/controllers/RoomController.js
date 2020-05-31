const randomize = require('randomatic');

let rooms = {};

function _generateRandomCode(numChar = 8, namespace = 'ABCDEFG') {
    return randomize('?', numChar, { chars: namespace })
}

function getRoom(req, res) {
    console.log(rooms);

    let code = req.params.code;
    let room = rooms[code];
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
    let { bpm, numBars, numLoops } = req.body;
    let _bpm = parseInt(bpm);
    let _numBars = parseInt(numBars);
    let _numLoops = parseInt(numLoops);
    let code = _generateRandomCode(8, 'ABCDEFG');

    rooms[code] = {
        code,
        bpm: _bpm,
        numBars: _numBars,
        numLoops: _numLoops,
        totalBars: _numBars * _numLoops
    };

    console.log(rooms);

    res.json({ data: code });
}

module.exports = {
    getRoom,
    addRoom
};