import { get, post } from '../utils/httpHelper';

const config = require('../config');
const serverBaseUrl = `http://${config.server.host}:${config.server.port}`;

/**
 * @description Makes server request for username
 * @returns {JSON} username in JSON format
 */
export function getUsername() {
    return get(`${serverBaseUrl}/user/name`);
}

export function editUsername(name) {
    return post(`${serverBaseUrl}/user/name/edit`, {
        name
    });
}

export function getRoom(roomCode) {
    return get(`${serverBaseUrl}/room/${roomCode}`);
}

export function addUserToRoom(user, roomCode) {
    return post(`${serverBaseUrl}/room/${roomCode}/user/new`, user);
}

export function addRoom(bpm, numBars, numLoops) {
    return post(`${serverBaseUrl}/room/new`, {
        bpm, 
        numBars, 
        numLoops
    });
}