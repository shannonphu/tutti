function UserReducer(state = { playerName: null }, action) {
    switch (action.type) {
        case 'ADD_USER':
            return {
                ...state,
                playerName : action.playerName
            };
        default:
            return state;
        }
}

export default UserReducer;