'use strict';

const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const NodeCache = require('node-cache');

const app = express();
const cache = new NodeCache();

app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: true
}));

const server = http.createServer(app);

const SocketRouter = require('./socket');
const socketRouter = new SocketRouter(server, cache);

// Set up router endpoints
const UserRouter = require('./routes/user');
const userRouter = new UserRouter(cache);
app.use('/user', userRouter);

const RoomRouter = require('./routes/room');
const roomRouter = new RoomRouter(cache);
app.use('/room', roomRouter);

server.listen(process.env.API_SERVER_PORT, () => {
    console.log('Listening on port ' + process.env.API_SERVER_PORT);
});
