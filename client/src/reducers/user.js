const initialState = {
    playerName: null,
    messages: [],
    isRecording: false 
}

function UserReducer(state = initialState, action) {
    switch (action.type) {
        case 'RESET_USER_STATE':
            return initialState;
        case 'ADD_USER':
            return {
                ...state,
                playerName : action.playerName
            };
        case 'RECEIVE_CHAT_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, {
                    senderName: action.playerName,
                    message: action.message,
                    id: action.playerName === state.playerName ? 0 : action.playerName
                }]
            };
        case 'UPDATED_RECORDING_STATE':
            return {
                ...state,
                isRecording : action.isRecording
            };
        default:
            return state;
    }
}

export default UserReducer;