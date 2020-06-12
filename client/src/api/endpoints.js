import { get, post } from '../utils/httpHelper';

/**
 * @description Makes server request for username
 * @returns {JSON} username in JSON format
 */
export function getUsername() {
    return get(`/api/user/name`);
}

export function editUsername(name) {
    return post(`/api/user/name/edit`, {
        name
    });
}

export function getRoom(roomCode) {
    return get(`/api/room/${roomCode}`);
}

export function addUserToRoom(user, roomCode) {
    return post(`/api/room/${roomCode}/user/new`, user);
}

export function addRoom(bpm, numBars, numLoops, user) {
    return post(`/api/room/new`, {
        bpm, 
        numBars, 
        numLoops,
        user
    });
}