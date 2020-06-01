class Game {
    _states = Object.freeze({
        SELECTING_BASELINE_PLAYER: 'SELECTING_BASELINE_PLAYER',
        BASELINE_PLAYER_RECORDING: 'BASELINE_PLAYER_RECORDING',
        OTHER_PLAYERS_LISTENING_TO_BASELINE: 'OTHER_PLAYERS_LISTENING_TO_BASELINE',
        OTHER_PLAYERS_RECORDING: 'OTHER_PLAYERS_RECORDING',
        FINAL_RECORDING_DONE: 'FINAL_RECORDING_DONE'
    });

    constructor() {
        this.state = this._states.SELECTING_BASELINE_PLAYER;
    }

    next() {
        switch (this.state) {
            case this._states.SELECTING_BASELINE_PLAYER:
                console.log('aa');
                this.state = this._states.BASELINE_PLAYER_RECORDING;
                console.log(this.state);
                break;
            case this._states.BASELINE_PLAYER_RECORDING:
                this.state = this._states.OTHER_PLAYERS_LISTENING_TO_BASELINE
                break;
            case this._states.OTHER_PLAYERS_LISTENING_TO_BASELINE:
                this.state = this._states.OTHER_PLAYERS_RECORDING
                break;
            case this._states.OTHER_PLAYERS_RECORDING:
                this.state = this._states.FINAL_RECORDING_DONE
                break;
            case this._states.FINAL_RECORDING_DONE:
            default:
                break;
        }
    }
}

export default Game;