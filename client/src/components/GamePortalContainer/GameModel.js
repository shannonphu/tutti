import { GAME_STAGE } from '../../utils/stateEnums';

class Game {
    constructor() {
        this.state = GAME_STAGE.SELECTING_BASELINE_PLAYER;
    }

    next() {
        switch (this.state) {
        case GAME_STAGE.SELECTING_BASELINE_PLAYER:
            this.state = GAME_STAGE.BASELINE_PLAYER_RECORDING;
            break;
        case GAME_STAGE.BASELINE_PLAYER_RECORDING:
            this.state = GAME_STAGE.OTHER_PLAYERS_LISTENING_TO_BASELINE;
            break;
        case GAME_STAGE.OTHER_PLAYERS_LISTENING_TO_BASELINE:
            this.state = GAME_STAGE.OTHER_PLAYERS_RECORDING;
            break;
        case GAME_STAGE.OTHER_PLAYERS_RECORDING:
            this.state = GAME_STAGE.FINAL_RECORDING_DONE;
            break;
        case GAME_STAGE.FINAL_RECORDING_DONE:
        default:
            break;
        }
    }
}

export default Game;