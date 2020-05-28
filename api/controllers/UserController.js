'use strict';

const User = require('../models/User'); // eslint-disable-line

function index(req, res) {
	res.json({ data: 'Hello World!' })
}

function getName(req, res) {
	res.json({ data: 'Joe Bruin' })
}

function addName(req, res) {
	res.json({ data: req.name })
}

module.exports = {
	index,
	getName,
	addName
};