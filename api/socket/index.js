const SocketRouter = function (server, cache) {
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
        client.on('action', (action) => onAction(action, client));
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
            onMessage(action);
            break;
        case 'socket/JOIN_ROOM':
            onJoinRoom(action, client);
            break;
        case 'socket/EDIT_ROOM_BPM':
            // Emits ROOM_BPM_UPDATED
            onEditRoomProperties(action, 'bpm');
            break;
        case 'socket/EDIT_ROOM_NUM_BARS':
            // Emits ROOM_NUMBARS_UPDATED
            onEditRoomProperties(action, 'numBars');
            break;
        case 'socket/EDIT_ROOM_NUM_LOOPS':
            // Emits ROOM_NUMLOOPS_UPDATED
            onEditRoomProperties(action, 'numLoops');
            break;
        case 'socket/ADVANCE_GAME_NEXT_STAGE':
            onAdvanceGameNextStage(action);
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
            console.log(`User is in room: ${roomCode}`);

            let room = cache.get(roomCode);
            if (room != undefined) {
                io.sockets.in(roomCode).emit('action', {
                    type: 'NEW_PLAYER_ADDED',
                    users: room.users
                });
            }
            else {
                console.error(`Could not get key ${roomCode} from cache`);
            }
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

    function onEditRoomProperties(action, property) {
        let room = cache.get(action.roomCode);
        if (room == undefined) {
            return;
        }

        if (cache.set(action.roomCode, {
            ...room,
            [property]: action[property]
        })) {
            console.log(`Updated room ${action.roomCode} ${property} from ${room[property]} to ${action[property]}`);
            io.sockets.in(action.roomCode).emit('action', {
                type: `ROOM_${property.toUpperCase()}_UPDATED`,
                [property]: action[property]
            });
        }
    }

    function onAdvanceGameNextStage(action) {
        io.sockets.in(action.roomCode).emit('action', {
            type: 'ADVANCE_NEXT_STAGE',
        });
    }
};

module.exports = SocketRouter;