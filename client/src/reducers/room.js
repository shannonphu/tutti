function RoomReducer(state = { 
    code: null, 
    bpm: 120, 
    numBars: 4, 
    numLoops: 3,
    players: []
}, action) {
    switch (action.type) {
        case 'LOAD_ROOM':
            return {
                ...state,
                code: action.roomCode,
                bpm: action.bpm,
                numBars: action.numBars,
                numLoops: action.numLoops,
                players: action.players
            };
        default:
            return state;
    }
}

export default RoomReducer;