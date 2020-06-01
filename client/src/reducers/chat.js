function ChatReducer(state = { messages: [] }, action) {
    switch (action.type) {
        case 'RECEIVE_CHAT_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, {
                    senderName: action.playerName,
                    message: action.message,
                    id: 0
                }]
            };
        default:
            return state;
    }
}

export default ChatReducer;