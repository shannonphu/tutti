import GameModel from '../utils/GameModel';

const initialState = {
    stage: GameModel.Progression[0],
    baselinePlayer: null,
    isClickTrack: true
}

function GameReducer(state = initialState, action) {
    switch (action.type) {
        case 'RESET_GAME_STATE':
            return initialState;
        case 'ADVANCE_NEXT_STAGE':
            return {
                ...state,
                stage: GameModel.NextStage(state.stage)
            };
        case 'ADVANCE_TO_STAGE':
            return {
                ...state,
                stage: action.stage
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