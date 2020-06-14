module.exports = {
    ROOM_STATE: Object.freeze({
        EMPTY: 'EMPTY', 
        INVALID: 'INVALID', 
        VALID: 'VALID'
    }),
    GAME_STAGE: Object.freeze({
        WAITING_FOR_PLAYERS: 'Waiting for players',
        WAITING_TO_START: 'Start game',
        BASELINE_PLAYER_RECORDING: 'First player recording',
        OTHER_PLAYERS_LISTENING_TO_BASELINE: 'Review first recording',
        OTHER_PLAYERS_RECORDING: 'Everyone else records',
        FINAL_RECORDING_DONE: 'Review final recording'
    })
}