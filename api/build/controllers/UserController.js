'use strict';

function UserController(cache) {
    this.index = function (req, res) {
        res.json({ data: 'Hello World!' });
    };

    this.getName = function (req, res) {
        res.json({ data: 'Joe Bruin' });
    };

    this.editName = function (req, res) {
        var name = req.body.name;
        res.json({ data: name });
    };
}

module.exports = UserController;