const RoomRouter = function (cache) { 
    const express = require('express');
    let router = express.Router();

    const RoomController = require('../controllers/RoomController');
    const roomController = new RoomController(cache);
    router.get('/:roomCode', roomController.getRoom);
    router.post('/new', roomController.addRoom);
    router.post('/:roomCode/user/new', roomController.addUserToRoom);

    return router;
};

module.exports = RoomRouter;