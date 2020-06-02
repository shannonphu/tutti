function RoomReducer(state = { 
    code: null, 
    bpm: 120, 
    numBars: 4, 
    numLoops: 3,
    lastUpdatedField: 'bpm'
}, action) {
    switch (action.type) {
        case 'LOAD_ROOM':
            return {
                ...state,
                code: action.roomCode,
                bpm: action.bpm,
                numBars: action.numBars,
                numLoops: action.numLoops
            };
        case 'EDIT_ROOM_BPM':
            return {
                ...state,
                lastUpdatedField: 'bpm',
                bpm: action.bpm
            };
        case 'EDIT_ROOM_NUM_BARS':
            return {
                ...state,
                lastUpdatedField: 'numBars',
                numBars: action.numBars
            };
        case 'EDIT_ROOM_NUM_LOOPS':
            return {
                ...state,
                lastUpdatedField: 'numLoops',
                numLoops: action.numLoops
            };
        case 'CHAT_MESSAGE_SENT':
            return {
                ...state,
                lastUpdatedField: 'chat'
            };
        default:
            return state;
    }
}

export default RoomReducer;