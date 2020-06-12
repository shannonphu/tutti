'use strict';

var UserRouter = function UserRouter(cache) {
    var express = require('express');
    var router = express.Router();

    var UserController = require('../controllers/UserController');
    var userController = new UserController(cache);
    router.get('/', userController.index);
    router.get('/name', userController.getName);
    router.post('/name/edit', userController.editName);

    return router;
};

module.exports = UserRouter;