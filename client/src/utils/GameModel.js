import { GAME_STAGE } from './stateEnums';

class Game {
    static Progression = [
        {
            id: GAME_STAGE.WAITING_FOR_PLAYERS,
            name: 'Waiting for players'
        },
        {
            id: GAME_STAGE.WAITING_TO_START,
            name: 'Start game'
        },
        {
            id: GAME_STAGE.SELECTING_BASELINE_PLAYER,
            name: 'Select first player'
        },
        {
            id: GAME_STAGE.BASELINE_PLAYER_RECORDING,
            name: 'First player playing'
        },
        {
            id: GAME_STAGE.OTHER_PLAYERS_LISTENING_TO_BASELINE,
            name: 'Review first recording'
        },
        {
            id: GAME_STAGE.OTHER_PLAYERS_RECORDING,
            name: 'Everyone else records'
        },
        {
            id: GAME_STAGE.FINAL_RECORDING_DONE,
            name: 'Review final recording'
        }
    ]

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