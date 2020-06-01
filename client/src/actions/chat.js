export function pingHello(text) {
    return (dispatch, prevState) => {
        dispatch({ type: 'socket/HELLO', data: text });
    };
}

export function addMessage(playerName, message) {
    return (dispatch, prevState) => {
        dispatch({ type: 'socket/MESSAGE', playerName, message });
    };
}