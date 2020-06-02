function RoomController(cache) {
    const randomize = require('randomatic');

    let rooms = {
        'ABCDE': {
            code: 'ABCDE',
            bpm: 120,
            numBars: 3,
            numLoops: 4,
            totalBars: 3 * 4
        },
        'ABCDF': {
            code: 'ABCDF',
            bpm: 60,
            numBars: 4,
            numLoops: 6,
            totalBars: 4 * 6
        },
    };

    this._generateRandomCode = function(numChar = 8, namespace = 'ABCDEFG') {
        return randomize('?', numChar, { chars: namespace });
    }

    this.getRoom = function(req, res) {
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

    this.addRoom = function(req, res) {
        let { bpm, numBars, numLoops } = req.body;
        let _bpm = parseInt(bpm);
        let _numBars = parseInt(numBars);
        let _numLoops = parseInt(numLoops);
        let code = this._generateRandomCode(8, 'ABCDEFG');

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
}

module.exports = RoomController;