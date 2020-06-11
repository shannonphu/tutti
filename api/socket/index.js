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
        client.on('disconnect', () => onClientDisconnect(client));
        client.on('action', (action) => onAction(action, client));
    }

    function onClientDisconnect(client) {
        if (client.user) {
            let { playerName } = client.user;
            let roomCode = client.roomCode;

            let room = cache.get(roomCode);
            if (room != undefined) {
                delete room.users[playerName]
                if (cache.set(roomCode, {
                    ...room,
                    users: room.users
                })) {
                    io.sockets.in(roomCode).emit('action', {
                        type: 'ROOM_PLAYERS_UPDATED',
                        users: room.users
                    });
                    console.log(`User ${playerName} left room ${roomCode}`);
                    console.log(cache.data);
                }
            }
            else {
                console.error(`Could not get key ${roomCode} from cache`);
            }
        }
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
            case 'socket/UPLOAD_AUDIO':
                onUploadAudio(action);
                break;
            case 'socket/SET_BASELINE_PLAYER':
                onSetBaselinePlayer(action);
                break;
            case 'socket/UPLOAD_LOOPED_AUDIO':
                onUploadLoopedAudio(action);
                break;
            case 'socket/PLAYER_UPDATED_RECORDING_STATE':
                onPlayerUpdatedRecordingState(action);
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
            client.user = action.user;
            client.roomCode = roomCode;
            console.log(`User ${action.user.playerName} is in room: ${roomCode}`);

            let room = cache.get(roomCode);
            if (room != undefined) {
                room[action.user.playerName] = action.user;
                io.sockets.in(roomCode).emit('action', {
                    type: 'ROOM_PLAYERS_UPDATED',
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

    function onUploadAudio(action) {
        let { playerName, roomCode, audioData } = action;

        let room = cache.get(roomCode);
        if (room != undefined) {
            room.users[playerName]['audioData'] = audioData;
            if (cache.set(roomCode, {
                ...room,
                users: room.users
            })) {
                console.log(`User ${playerName} in room ${roomCode} uploaded their recording`)
                io.sockets.in(roomCode).emit('action', {
                    type: 'RECEIVED_AUDIO',
                    playerName,
                    audioData
                });
            }
        }
        else {
            console.error(`Could not get key ${roomCode} from cache`);
            return null;
        }
    }

    function onSetBaselinePlayer(action) {
        io.sockets.in(action.roomCode).emit('action', {
            type: 'SET_BASELINE_PLAYER',
            user: action.user
        });
    }

    function onUploadLoopedAudio(action) {
        let { playerName, roomCode, audioData } = action;
        console.log(`User ${playerName} in room ${roomCode} uploaded a looped recording.`)
        io.sockets.in(roomCode).emit(
            'action', {
                type: 'RECEIVED_LOOPED_AUDIO',
                playerName,
                audioData
            }
        );
    }

    function onPlayerUpdatedRecordingState(action) {
        let { playerName, roomCode, isRecording } = action;
        io.sockets.in(roomCode).emit(
            'action', {
                type: 'PLAYER_UPDATED_RECORDING_STATE',
                playerName,
                isRecording
            }
        );
    }

};

module.exports = SocketRouter;