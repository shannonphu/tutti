/* eslint-disable no-unused-vars */
import * as api from '../api/endpoints';

export function getRoom(roomCode, cb) {
    return (dispatch, prevState) => {
        api.getRoom(roomCode)
            .then((response) => {
                if (response.data == null) {
                    console.error('Room code does not exist.');
                    dispatch({
                        type: 'SET_INVALID_ROOM',
                        roomCode: null
                    });
                    return null;
                } else {
                    dispatch({
                        type: 'LOAD_ROOM',
                        roomCode: response.data.roomCode,
                        bpm: response.data.bpm,
                        numBars: response.data.numBars,
                        numLoops: response.data.numLoops,
                        users: response.data.users
                    });
                    return response;
                }
            })
            .then((response) => { if (cb) cb(response); })
            .catch(error => console.error('Error in getRoom: ' + error));
    };
}

export function addRoom(bpm, numBars, numLoops, user, cb) {
    return (dispatch, prevState) => {
        api.addRoom(bpm, numBars, numLoops, user)
            .then((response) => {
                dispatch({ 
                    type: 'LOAD_ROOM',
                    roomCode: response.data,
                    bpm, 
                    numBars, 
                    numLoops,
                    users: { [user.playerName]: {} }
                });
                dispatch({
                    type: 'ADD_USER',
                    playerName: user.playerName
                });
                dispatch({ type: 'socket/JOIN_ROOM', user, roomCode: response.data });
                return response;
            })
            .then((response) => { if (cb) cb(response); })
            .catch(error => console.error('Error in addRoom: ' + error));
    };
}

export function updateRoomBpmSettings(bpm) {
    return (dispatch, prevState) => {
        // Update this client's state
        dispatch({ type: 'EDIT_ROOM_BPM', bpm });
        // Emit action to socket API
        const { room: { roomCode } } = prevState();
        dispatch({ type: 'socket/EDIT_ROOM_BPM', roomCode, bpm });
    };
}

export function updateRoomNumBarsSettings(numBars) {
    return (dispatch, prevState) => {
        dispatch({ type: 'EDIT_ROOM_NUM_BARS', numBars });
        // Emit action to socket API
        const { room: { roomCode } } = prevState();
        dispatch({ type: 'socket/EDIT_ROOM_NUM_BARS', roomCode, numBars });
    };
}

export function updateRoomNumLoopsSettings(numLoops) {
    return (dispatch, prevState) => {
        dispatch({ type: 'EDIT_ROOM_NUM_LOOPS', numLoops });
        // Emit action to socket API
        const { room: { roomCode } } = prevState();
        dispatch({ type: 'socket/EDIT_ROOM_NUM_LOOPS', roomCode, numLoops });
    };
}

export function addUserToRoom(user, cb) {
    return (dispatch, prevState) => {
        const { room: { roomCode } } = prevState();

        api.addUserToRoom(user, roomCode)
            .then((response) => {
                dispatch({
                    type: 'ADD_USER',
                    playerName: user.playerName
                });
                dispatch({ type: 'socket/JOIN_ROOM', user, roomCode });
                return response;
            })
            .then((response) => { if (cb) cb(response); })
            .catch(error => console.error('Error in addUserToRoom: ' + error));
    };
}

export function uploadAudio(audioData) {
    return (dispatch, prevState) => {
        const { user: { playerName }, room: { roomCode } } = prevState();
        dispatch({ type: 'socket/UPLOAD_AUDIO', playerName, roomCode, audioData });
    };
}

export function uploadLoopedAudio(audioData) {
    return (dispatch, prevState) => {
        const { user: { playerName }, room: { roomCode } } = prevState();
        dispatch({ type: 'socket/UPLOAD_LOOPED_AUDIO', playerName, roomCode, audioData });
    };
}