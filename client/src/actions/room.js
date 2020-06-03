/* eslint-disable no-unused-vars */
import * as api from '../api/endpoints';

export function getRoom(code, cb) {
    return (dispatch, prevState) => {
        api.getRoom(code)
            .then((response) => {
                if (response.data == null) {
                    throw 'Room code does not exist.';
                }

                dispatch({
                    type    : 'LOAD_ROOM',
                    roomCode: response.data.code,
                    bpm     : response.data.bpm,
                    numBars : response.data.numBars,
                    numLoops: response.data.numLoops,
                    users   : response.data.users
                });
                return response;
            })
            .then((response) => { if (cb) cb(response); })
            .catch(error => console.error('Error in getRoom: ' + error));
    };
}

export function addRoom(bpm, numBars, numLoops, cb) {
    return (dispatch, prevState) => {
        api.addRoom(bpm, numBars, numLoops)
            .then((response) => {
                dispatch({ 
                    type: 'LOAD_ROOM',
                    roomCode: response.data,
                    bpm, 
                    numBars, 
                    numLoops
                });
                return response;
            })
            .then((response) => { if (cb) cb(response); })
            .catch(error => console.error('Error in addRoom: ' + error));
    };
}

export function joinRoom(roomCode) {
    return (dispatch, prevState) => {
        dispatch({ type: 'socket/JOIN_ROOM', roomCode });
    };
}

export function addUserToRoom(playerName, roomCode, cb) {
    return (dispatch, prevState) => {
        api.addUserToRoom(playerName, roomCode)
            .then((response) => {
                dispatch({
                    type: 'ADD_USER',
                    playerName
                });
                return response;
            })
            .then((response) => { if (cb) cb(response); })
            .catch(error => console.error('Error in addUserToRoom: ' + error));
    };
}