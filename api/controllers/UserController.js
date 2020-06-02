function UserController(cache) {
    this.index = (req, res) => {
        res.json({ data: 'Hello World!' });
    }

    this.getName = (req, res) => {
        res.json({ data: 'Joe Bruin' });
    }

    this.editName = (req, res) => {
        let name = req.body.name;
        res.json({ data: name });
    }
}

module.exports = UserController;