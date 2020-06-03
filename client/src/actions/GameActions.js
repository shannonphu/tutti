export function advanceToNextGameStage() {
    return (dispatch, prevState) => {
        dispatch({ type: 'ADVANCE_NEXT_STAGE' });
    };
}