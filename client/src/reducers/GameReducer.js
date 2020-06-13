import GameModel from '../utils/GameModel';

function GameReducer(state = { 
    stage: GameModel.Progression[0],
    baselinePlayer: null,
    isClickTrack: true
}, action) {
    switch (action.type) {
        case 'ADVANCE_NEXT_STAGE':
            return {
                ...state,
                stage: GameModel.NextStage(state.stage)
            };
        case 'SET_BASELINE_PLAYER':
            return {
                ...state,
                baselinePlayer: {
                    playerName: action.user.playerName
                }
            };
        case 'TOGGLE_CLICK_TRACK':
            return {
                ...state,
                isClickTrack: action.isClickTrack
            };
        default:
            return state;
    }
}


export default GameReducer;