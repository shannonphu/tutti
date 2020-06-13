import { GAME_STAGE } from './stateEnums';

class Game {
    static Progression = [
            GAME_STAGE.WAITING_FOR_PLAYERS,
            GAME_STAGE.WAITING_TO_START,
            GAME_STAGE.BASELINE_PLAYER_RECORDING,
            GAME_STAGE.OTHER_PLAYERS_LISTENING_TO_BASELINE,
            GAME_STAGE.OTHER_PLAYERS_RECORDING,
            GAME_STAGE.FINAL_RECORDING_DONE
    ]

    static NextStage(stage) {
        let index = this.Progression.indexOf(stage);
        index = index < this.Progression.length - 1 ? index + 1 : 0;
        return this.Progression[index];
    }
}

export default Game;