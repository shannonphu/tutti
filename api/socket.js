// Handles socket connections and event callbacks
module.exports = function (server) {
    const socketio = require('socket.io');
    const io = socketio.listen(server);

    io.sockets.on('connection', function (socket) {
        console.log("A connection was made");

        socket.on('disconnect', function () {
            console.log("A user disconnected");
        });

        socket.on('action', (action) => {
            switch (action.type) {
                case 'socket/HELLO':
                    {
                        console.log("socket said hello");
                        console.log(action.data)
                    }
                    break;
                case 'socket/MESSAGE':
                    {
                        console.log("socket message received");
                        console.log(action.message)
                        io.emit('action', {
                            type: 'RECEIVE_CHAT_MESSAGE',
                            message: action.message
                        });
                    }
                    break;

            }
        });
    });
};