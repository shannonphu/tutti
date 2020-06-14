import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import ReplayIcon from '@material-ui/icons/Replay';
import React, { Component } from 'react';
import Tone from 'tone';
import { Metronome } from '..';
import { GAME_STAGE } from '../../utils/stateEnums';
import GameModel from '../../utils/GameModel';

class GameInfoTable extends Component {
    constructor(props) {
        super(props);
        this.state = { };
        this.restructureData = this.restructureData.bind(this);
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    restructureData() {
        let { room: { bpm, numBars, numLoops } } = this.props;
        return [
            { label: 'BPM', name: 'bpm', value: bpm },
            { label: 'Bars per Loop', name: 'numBars', value: numBars },
            { label: 'Loops', name: 'numLoops', value: numLoops }
        ];
    }

    handleTextFieldChange(e) {
        let key = e.target.name;
        let value = parseInt(e.target.value) || 0;

        switch (key) {
            case 'bpm': 
                this.props.updateRoomBpmSettings(value);
                break;
            case 'numBars':
                this.props.updateRoomNumBarsSettings(value);
                break;
            case 'numLoops':
                this.props.updateRoomNumLoopsSettings(value);
                break;
            default:
                break;
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const nextStage = GameModel.NextStage(this.props.game.stage);

        if (this.props.game.stage === GAME_STAGE.WAITING_TO_START) {
            this.props.setBaselinePlayer();
        }
        this.props.advanceToGameStage(nextStage);
    }

    render() {
        let data = this.restructureData();
        return (
            <form onSubmit={this.handleSubmit}>
                <TableContainer component={Paper}>
                    <Table size='small' aria-label='simple table'>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={2}>
                                    <Typography variant='h6'>Game Settings</Typography>
                                </TableCell>
                            </TableRow>
                            {data.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell component='th' scope='row'>
                                        {row.label}
                                        {row.name === 'bpm' ? <Metronome {...this.props} isLoaded = {this.state.isLoaded} /> : null}
                                    </TableCell>
                                    <TableCell align='left' colSpan={2}>
                                        {this.props.game.stage === GAME_STAGE.WAITING_FOR_PLAYERS || this.props.game.stage === GAME_STAGE.WAITING_TO_START ? 
                                            <TextField
                                                autoFocus={this.props.room.lastUpdatedField === row.name}
                                                value={row.value}
                                                name={row.name}
                                                type='number'
                                                onChange={this.handleTextFieldChange}
                                                margin='none'
                                                error={row.value <= 0}
                                                helperText={row.value <= 0 ? `${row.label} must be greater than 0` : ''}
                                                style={{ width: '100%' }}
                                            /> : row.value
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}

                            <TableRow>
                                <TableCell component='th' scope='row'>
                                    Total Measures
                                </TableCell>
                                <TableCell>
                                    {this.props.room.numBars * this.props.room.numLoops}
                                </TableCell>
                                <TableCell align='right' style={{ padding: '0 16px 0 0' }}>
                                    {(() => {
                                        switch (this.props.game.stage) {
                                            case GAME_STAGE.WAITING_FOR_PLAYERS:
                                                return <Button type='submit' name='start' color='primary' onClick={this.handleSubmit} endIcon={<MusicNoteIcon fontSize='small' />}>Enter Room</Button>;
      
                                            case GAME_STAGE.WAITING_TO_START:
                                                return(
                                                    <Button type='submit' name='start' color='primary' endIcon={<MusicNoteIcon fontSize='small' />}>I'll start first!</Button>
                                                );

                                            case GAME_STAGE.BASELINE_PLAYER_RECORDING:
                                                return(
                                                    <Button 
                                                        onClick={() => this.props.advanceToGameStage(GameModel.NextStage(this.props.game.stage))} 
                                                        disabled={!this.props.isLoopPlayerSet}
                                                        name='start' 
                                                        color='primary'
                                                        endIcon={<SettingsInputAntennaIcon fontSize='small' />}
                                                    >
                                                        Broadcast Loop!
                                                    </Button>
                                                );

                                            case GAME_STAGE.FINAL_RECORDING_DONE:
                                                return(
                                                    <Button 
                                                        onClick={() => this.props.advanceToGameStage(GameModel.NextStage(this.props.game.stage))} 
                                                        disabled={!this.props.isLoopPlayerSet}
                                                        name='start' 
                                                        color='primary'
                                                        endIcon={<ReplayIcon fontSize='small' />}
                                                    >
                                                        Start Over!
                                                    </Button>
                                                );

                                            default:
                                                return null;
                                        }
                                    })()}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </form>
        );
    }
}

export default GameInfoTable;