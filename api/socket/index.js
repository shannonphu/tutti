// Handles socket connections and event callbacks
module.exports = function (server) {
    const socketio = require('socket.io');
    const io = socketio.listen(server);
    setEventHandlers();

    //  Main handler that fires on client connection
    function setEventHandlers() {
        io.sockets.on('connection', onSocketConnection);
    }

    // Set up main handlers for each client that connects
    function onSocketConnection(client) {
        console.log('A user connected');
        client.on('disconnect', onClientDisconnect);
        client.on('action', onAction);
    }

    function onClientDisconnect(client) {
        console.log('A user disconnected');
    }

    function onAction(action) {
        switch (action.type) {
        case 'socket/HELLO':
            onHello(action);
            break;
        case 'socket/MESSAGE':
            onMessage(action);
            break;
        default:
            break;
        }
    }

    function onHello(action) {
        console.log('Socket pinged: ' + action.data);
    }

    function onMessage(action) {
        console.log(`Socket received message from ${action.playerName}: ${action.message}`);
        io.emit('action', {
            type: 'RECEIVE_CHAT_MESSAGE',
            playerName: action.playerName,
            message: action.message
        });
    }
};