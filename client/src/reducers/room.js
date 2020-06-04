import { ROOM_STATE } from '../utils/stateEnums';

function RoomReducer(state = { 
    roomCode        : null,
    roomState       : ROOM_STATE.EMPTY,
    bpm             : 120,
    numBars         : 4,
    numLoops        : 3,
    lastUpdatedField: 'bpm',
    users           : {}
}, action) {
    switch (action.type) {
        case 'SET_INVALID_ROOM':
            return {
                ...state,
                roomCode: action.roomCode,
                roomState: ROOM_STATE.INVALID
            };
        case 'LOAD_ROOM':
            return {
                ...state,
                roomCode: action.roomCode,
                roomState: ROOM_STATE.VALID,
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
        case 'ROOM_BPM_UPDATED':
            return {
                ...state,
                bpm: action.bpm
            };
        case 'EDIT_ROOM_NUM_BARS':
            return {
                ...state,
                lastUpdatedField: 'numBars',
                numBars: action.numBars
            };
        case 'ROOM_NUMBARS_UPDATED':
            return {
                ...state,
                numBars: action.numBars
            };
        case 'EDIT_ROOM_NUM_LOOPS':
            return {
                ...state,
                lastUpdatedField: 'numLoops',
                numLoops: action.numLoops
            };
        case 'ROOM_NUMLOOPS_UPDATED':
            return {
                ...state,
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