function UserReducer(state = { playerName: null, messages: [] }, action) {
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
                    id: action.playerName == state.playerName ? 0 : action.playerName
                }]
            };
        default:
            return state;
        }
}

export default UserReducer;