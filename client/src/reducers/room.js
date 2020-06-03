function RoomReducer(state = { 
    code      : null,
    bpm       : 120,
    numBars   : 4,
    numLoops  : 3,
    users     : {},
    playerName: ''
}, action) {
    switch (action.type) {
        case 'LOAD_ROOM':
            return {
                ...state,
                code      : action.roomCode,
                bpm       : action.bpm,
                numBars   : action.numBars,
                numLoops  : action.numLoops,
                users     : action.users,
            };
        case 'ADD_USER':
            console.log('I am called ' + action.playerName);
            return {
                ...state,
                playerName : action.playerName
            }
        default:
            return state;
    }
}

export default RoomReducer;