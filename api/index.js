'use strict';

const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const NodeCache = require('node-cache');

const config = require('./config');

const app = express();
const cache = new NodeCache();

app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: true
}));

const server = http.createServer(app);
require('./socket')(server);

// Set up router endpoints
const UserRouter = require('./routes/user');
const userRouter = new UserRouter(cache);
app.use('/user', userRouter);

const RoomRouter = require('./routes/room');
const roomRouter = new RoomRouter(cache);
app.use('/room', roomRouter);

server.listen(config.server.port, () => {
    console.log('Listening on port ' + config.server.port);
});
