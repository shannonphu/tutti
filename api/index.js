'use strict';

const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const NodeCache = require('node-cache');

const app = express();
const cache = new NodeCache();

app.use(bodyParser.json());
const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use(staticFiles)

const server = http.createServer(app);

const SocketRouter = require('./socket');
const socketRouter = new SocketRouter(server, cache);

// Set up router endpoints
const UserRouter = require('./routes/user');
const userRouter = new UserRouter(cache);
app.use('/api/user', userRouter);

const RoomRouter = require('./routes/room');
const roomRouter = new RoomRouter(cache);
app.use('/api/room', roomRouter);

app.use('/*', staticFiles)

app.set('port', (process.env.PORT || 3001))
server.listen(process.env.PORT || 3001, () => {
    console.log(`Listening on ${app.get('port')}`)
});