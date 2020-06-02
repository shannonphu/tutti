const UserRouter = function (cache) {
    const express = require('express');
    let router = express.Router();

    const UserController = require('../controllers/UserController');
    const userController = new UserController(cache);
    router.get('/', userController.index);
    router.get('/name', userController.getName);
    router.post('/name/edit', userController.editName);

    return router;
};

module.exports = UserRouter;