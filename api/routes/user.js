'use strict';

const express = require('express');
let router = express.Router();

const userController = require('../controllers/UserController');

router.get('/', userController.index);
router.get('/name', userController.getName);
router.post('/name/add', userController.addName);

module.exports = router;