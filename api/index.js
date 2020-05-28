'use strict';

const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();

app.use(bodyParser.json())
app.use(cors({
    credentials: true,
    origin: true
}));

const server = http.createServer(app);
const socket = require('./socket')(server);

// Set up router endpoints
const userRouter = require('./routes/user');
app.use('/user', userRouter);


server.listen(config.server.port, () => {
    console.log('Listening on port ' + config.server.port);
});
