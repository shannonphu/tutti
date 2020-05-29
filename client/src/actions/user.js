import * as api from '../api/endpoints';

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