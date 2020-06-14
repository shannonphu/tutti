import { ROOM_STATE } from '../utils/stateEnums';

const initialState = {
    roomCode: null,
    roomState: ROOM_STATE.EMPTY,
    bpm: 120,
    numBars: 4,
    numLoops: 3,
    lastUpdatedField: 'bpm',
    users: {}
}

function RoomReducer(state = initialState, action) {
    switch (action.type) {
        case 'RESET_ROOM_STATE':
            return initialState;
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
                numLoops: action.numLoops,
                users: action.users
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
        case 'ROOM_PLAYERS_UPDATED':
            return {
                ...state,
                users: { ...action.users }
            };
        case 'RECEIVED_AUDIO':
            var blob = new Blob([action.audioData], { type: 'audio/webm;codecs=opus' });
            const audioUrl = URL.createObjectURL(blob);
            return {
                ...state,
                users: { 
                    ...state.users, 
                    [action.playerName]: {
                        ...state.users[action.playerName],
                        audioUrl
                    } 
                }
            };
        case 'RECEIVED_LOOPED_AUDIO':
            var blob = new Blob([action.audioData], {type: 'audio/webm;codecs=opus' });
            const loopUrl = URL.createObjectURL(blob);
            return {
                ...state,
                users: { 
                    ...state.users, 
                    [action.playerName]: {
                        ...state.users[action.playerName],
                        loopUrl
                    } 
                }
            };
        case 'PLAYER_UPDATED_RECORDING_STATE':
            return {
                ...state,
                users: { 
                    ...state.users, 
                    [action.playerName]: {
                        ...state.users[action.playerName],
                        isRecording: action.isRecording
                    } 
                }
            };
        default:
            return state;
    }
}

export default RoomReducer;