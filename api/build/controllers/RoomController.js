'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RoomController = function RoomController(cache) {
    (0, _classCallCheck3.default)(this, RoomController);

    var randomize = require('randomatic');

    var _generateRandomCode = function _generateRandomCode() {
        var numChar = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
        var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ABCDEFG';

        return randomize('?', numChar, { chars: namespace });
    };
    var _addRoomToCache = function _addRoomToCache(roomCode, bpm, numBars, numLoops, users) {
        if (cache.set(roomCode, {
            roomCode: roomCode,
            bpm: bpm,
            numBars: numBars,
            numLoops: numLoops,
            users: users,
            totalBars: numBars * numLoops
        })) {
            console.log('Added room to cache');
            console.log(cache.data);
        } else {
            console.error('Could not add to cache');
        }
    };
    var _getRoomFromCache = function _getRoomFromCache(roomCode) {
        var room = cache.get(roomCode);
        if (room != undefined) {
            return room;
        } else {
            console.error('Could not get key ' + roomCode + ' from cache');
            return null;
        }
    };

    // Initial state
    _addRoomToCache('ABC', 120, 3, 4, {});
    _addRoomToCache('AAA', 60, 4, 6, {});

    this.getRoom = function (req, res) {
        var roomCode = req.params.roomCode;
        var room = _getRoomFromCache(roomCode);
        if (room) {
            res.json({
                data: room
            });
        } else {
            res.json({
                data: null
            });
        }
    };
    this.addRoom = function (req, res) {
        var _req$body = req.body,
            bpm = _req$body.bpm,
            numBars = _req$body.numBars,
            numLoops = _req$body.numLoops,
            user = _req$body.user;

        var _bpm = parseInt(bpm);
        var _numBars = parseInt(numBars);
        var _numLoops = parseInt(numLoops);
        var roomCode = _generateRandomCode(8, 'ABCDEFG');
        var users = (0, _defineProperty3.default)({}, user.playerName, {});
        _addRoomToCache(roomCode, _bpm, _numBars, _numLoops, users);
        res.json({ data: roomCode });
    };

    this.addUserToRoom = function (req, res) {
        var roomCode = req.params.roomCode;
        var user = req.body;
        var room = _getRoomFromCache(roomCode);

        // add user to room
        room.users[user.playerName] = {};
        _addRoomToCache(roomCode, room.bpm, room.numBars, room.numLoops, room.users);

        console.log('Added user: ' + user.playerName);
        console.log(cache.data);
        res.json({ data: _getRoomFromCache(roomCode) });
    };
};

module.exports = RoomController;