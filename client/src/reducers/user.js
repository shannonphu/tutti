function UserReducer(state = { 
    playerName: null, 
    messages: [], 
    isRecording: false 
}, action) {
    switch (action.type) {
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