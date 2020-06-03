function RoomController(cache) {
    const randomize = require('randomatic');

    let _generateRandomCode = function (numChar = 8, namespace = 'ABCDEFG') {
        return randomize('?', numChar, { chars: namespace });
    }

    let _addRoomToCache = function (code, bpm, numBars, numLoops) {
        if (cache.set(code, {
            code,
            bpm,
            numBars,
            numLoops,
            totalBars: numBars * numLoops
        })) {
            console.log('Added room to cache');
            console.log(cache.data);
        } else {
            console.error('Could not add to cache');
        }
    }

    let _getRoomFromCache = function (code) {
        let room = cache.get(code);

        if (room != undefined) {
            return room;
        } else {
            console.error(`Could not get key ${code} from cache`);
            return null;
        }
    }

    _addRoomToCache('ABC', 120, 3, 4);
    _addRoomToCache('AAA', 60, 4, 6);

    this.getRoom = function(req, res) {
        let code = req.params.code;
        let room = _getRoomFromCache(code);
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
        let code = _generateRandomCode(8, 'ABCDEFG');

        _addRoomToCache(code, _bpm, _numBars, _numLoops);

        res.json({ data: code });
    }
}

module.exports = RoomController;