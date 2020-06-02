function RoomReducer(state = { 
    code      : null,
    bpm       : 120,
    numBars   : 4,
    numLoops  : 3,
    users     : null,
    playerName: ''
}, action) {
    switch (action.type) {
        case 'LOAD_ROOM':
            return {
                ...state,
                code    : action.roomCode,
                bpm     : action.bpm,
                numBars : action.numBars,
                numLoops: action.numLoops,
                users   : action.users
            };
        case 'ADD_USER':
            return {
                ...state,
                playerName : action.playerName
            }
        default:
            return state;
    }
}

export default RoomReducer;