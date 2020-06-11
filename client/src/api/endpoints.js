import { get, post } from '../utils/httpHelper';

/**
 * @description Makes server request for username
 * @returns {JSON} username in JSON format
 */
export function getUsername() {
    return get(`/user/name`);
}

export function editUsername(name) {
    return post(`/user/name/edit`, {
        name
    });
}

export function getRoom(roomCode) {
    return get(`/room/${roomCode}`);
}

export function addUserToRoom(user, roomCode) {
    return post(`/room/${roomCode}/user/new`, user);
}

export function addRoom(bpm, numBars, numLoops, user) {
    return post(`/room/new`, {
        bpm, 
        numBars, 
        numLoops,
        user
    });
}