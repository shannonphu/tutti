import { GAME_STAGE } from '../utils/stateEnums';

function GameReducer(state = { stage: GAME_STAGE.WAITING_FOR_PLAYERS }, action) {
    switch (action.type) {
        case 'ADVANCE_NEXT_STAGE':
            let nextStage = null;
            switch (state.stage) {
                case GAME_STAGE.WAITING_FOR_PLAYERS:
                    nextStage = GAME_STAGE.WAITING_TO_START;
                    break;
                case GAME_STAGE.WAITING_TO_START:
                    nextStage = GAME_STAGE.SELECTING_BASELINE_PLAYER;
                    break;
                case GAME_STAGE.SELECTING_BASELINE_PLAYER:
                    nextStage = GAME_STAGE.BASELINE_PLAYER_RECORDING;
                    break;
                default:
                    break;
            }

            return {
                ...state,
                stage: nextStage
            };
        default:
            return state;
    }
}

export default GameReducer;