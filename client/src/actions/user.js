import * as api from '../api/endpoints';

/**
 * @description Calls the API method to get username and update store
 */
export function getUsername(cb) {
    return (dispatch, prevState) => {
        api.getUsername()
            .then(response => dispatch({ type: 'GET_USER_NAME', name: response.data }))
            .then(() => { if (cb) cb(); })
            .catch(error => console.error('Error in getUsername: ' + error));
    };
}

export function editUsername(name, cb) {
    return (dispatch, prevState) => {
        api.editUsername(name)
            .then(response => dispatch({ type: 'GET_USER_NAME', name: response.data }))
            .then(() => { if (cb) cb(); })
            .catch(error => console.error('Error in addUsername: ' + error));
    };
}

export function sentMessageToRoom(message) {
    return (dispatch, prevState) => {
        const { user: { playerName }, room: { roomCode } } = prevState();

        dispatch({ type: 'CHAT_MESSAGE_SENT' });
        dispatch({ type: 'socket/MESSAGE', playerName, message, roomCode });
    };
}

export function pingHello(text) {
    return (dispatch, prevState) => {
        dispatch({ type: 'socket/HELLO', data: text });
    };
}