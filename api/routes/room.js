const express = require('express');
let router = express.Router();

const roomController = require('../controllers/RoomController');

router.get('/:roomCode', roomController.getRoom);
router.get('/:roomCode/:playerName/new', roomController.addUserToRoom);
router.post('/new', roomController.addRoom);

module.exports = router;