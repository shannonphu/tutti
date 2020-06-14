export function advanceToNextGameStage() {
    return (dispatch, prevState) => {
        // Broadcast to everyone else
        const { room: { roomCode } } = prevState();
        dispatch({ type: 'socket/ADVANCE_GAME_NEXT_STAGE', roomCode });
    };
}

export function setBaselinePlayer() {
    return (dispatch, prevState) => {
        const { room: { roomCode }, user } = prevState();
        dispatch({ type: 'socket/SET_BASELINE_PLAYER', roomCode, user });
    };
}

export function toggleClickTrack(isClickTrack) {
    return (dispatch, prevState) => {
        dispatch({ type: 'TOGGLE_CLICK_TRACK', isClickTrack });
    };
}

export function resetGameState() {
    return (dispatch, prevState) => {
        dispatch({ type: 'RESET_GAME_STATE' });
    };
}