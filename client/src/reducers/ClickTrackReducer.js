function ClickTrackReducer(
    state = { startTime: 0, stopTime: null}, 
    action
) {
    console.log(action)
    switch (action.type) {
        case 'SET_CLICK_TRACK_START':
            return {
                ...state,
                startTime: action.time
            };
        case 'SET_CLICK_TRACK_STOP':
            return {
                ...state,
                stopTime: action.time
            };
        default:
            return state;
    }
}
export default ClickTrackReducer;