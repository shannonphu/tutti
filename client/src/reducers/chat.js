function ChatReducer(state = { messages: [] }, action) {
    switch (action.type) {
        case 'RECEIVE_CHAT_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, {
                    playerName: action.playerName,
                    message: action.message
                }]
            };
        default:
            return state;
    }
}

export default ChatReducer;