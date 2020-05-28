import * as api from '../api';

/**
 * @description Calls the API method to get username and update store
 */
export function getUsername(cb) {
   return (dispatch, prevState) => {
        api.getUsername()
            .then(response => dispatch({ type: 'GET_USER_NAME', name: response.data }))
            .then(() => { if (cb) cb(); })
            .catch(error => console.error("Error in getUsername: " + error));
   };
}

export function editUsername(name, cb) {
    return (dispatch, prevState) => {
        api.editUsername(name)
            .then(response => dispatch({ type: 'GET_USER_NAME', name: response.data }))
            .then(() => { if (cb) cb(); })
            .catch(error => console.error("Error in addUsername: " + error));
    };
}

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