'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var NodeCache = require('node-cache');

var app = express();
var cache = new NodeCache();

app.use(bodyParser.json());
var staticFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);

var server = http.createServer(app);

var SocketRouter = require('./socket');
var socketRouter = new SocketRouter(server, cache);

// Set up router endpoints
var UserRouter = require('./routes/user');
var userRouter = new UserRouter(cache);
app.use('/api/user', userRouter);

var RoomRouter = require('./routes/room');
var roomRouter = new RoomRouter(cache);
app.use('/api/room', roomRouter);

app.use('/*', staticFiles);

app.set('port', process.env.PORT || 3001);
server.listen(process.env.PORT || 3001, function () {
    console.log('Listening on ' + app.get('port'));
});