export function pingHello(text) {
    return (dispatch, prevState) => {
        dispatch({ type: 'socket/HELLO', data: text });
    };
}

export function addMessage(message) {
    return (dispatch, prevState) => {
        dispatch({ type: 'socket/MESSAGE', message });
    };
}