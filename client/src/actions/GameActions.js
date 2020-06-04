export function advanceToNextGameStage() {
    return (dispatch, prevState) => {
        // Broadcast to everyone else
        const { room: { roomCode } } = prevState();
        dispatch({ type: 'socket/ADVANCE_GAME_NEXT_STAGE', roomCode });
    };
}