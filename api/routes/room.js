const express = require('express');
let router = express.Router();

const roomController = require('../controllers/RoomController');

router.get('/:code', roomController.getRoom);
router.post('/new', roomController.addRoom);

module.exports = router;