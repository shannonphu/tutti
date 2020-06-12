'use strict';

var RoomRouter = function RoomRouter(cache) {
    var express = require('express');
    var router = express.Router();

    var RoomController = require('../controllers/RoomController');
    var roomController = new RoomController(cache);
    router.get('/:roomCode', roomController.getRoom);
    router.post('/new', roomController.addRoom);
    router.post('/:roomCode/user/new', roomController.addUserToRoom);

    return router;
};

module.exports = RoomRouter;