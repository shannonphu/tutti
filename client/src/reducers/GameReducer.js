import GameModel from '../utils/GameModel';

function GameReducer(state = { 
    stage: GameModel.Progression[0],
    baselinePlayer: null
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
                baselinePlayer: action.user
            };
        default:
            return state;
    }
}

export default GameReducer;