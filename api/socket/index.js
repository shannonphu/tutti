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
        client.on('room', function(room) {
            client.join(room);
        });
    }

    function onClientDisconnect(client) {
        console.log('A user disconnected');
    }

    function onAction(action, client) {
        switch (action.type) {
        case 'socket/HELLO':
            onHello(action);
            break;
        case 'socket/MESSAGE':
            onMessage(action, client);
            break;
        case 'socket/JOIN_ROOM':
            onJoinRoom(action, client);
            break;
        default:
            break;
        }
    }
    // TODO
    function isValidRoomCode(roomCode) {
        return true;
    }

    function onJoinRoom(action, client) {
        if (isValidRoomCode(action.roomCode)) {
            let roomCode = action.roomCode;
            client.join(roomCode);
            console.log(`User joined room code: ${roomCode}`);
        }
    }

    function onHello(action) {
        console.log('Socket pinged: ' + action.data);
    }

    function onMessage(action) {
        console.log(`Socket received message from
            ${action.playerName}: ${action.message} 
            in room: ${action.roomCode}`);

        io.sockets.in(action.roomCode).emit('action', {
            type: 'RECEIVE_CHAT_MESSAGE',
            playerName: action.playerName,
            message: action.message
        });
    }
};