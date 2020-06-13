export function clickTrackStart(time) {
    return (dispatch, prevState) => {
        dispatch({ type: 'SET_CLICK_TRACK_START', time });
    };
}
export function clickTrackStop(time) {
    return (dispatch, prevState) => {
        dispatch({ type: 'SET_CLICK_TRACK_STOP', time });
    };
}