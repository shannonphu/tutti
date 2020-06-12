import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Metronome } from '..';
import TextField from '@material-ui/core/TextField';
import { GAME_STAGE } from '../../utils/stateEnums';

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
            { label: '# Bars', name: 'numBars', value: numBars },
            { label: '# Loops', name: 'numLoops', value: numLoops }
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

        if (this.props.game.stage === GAME_STAGE.WAITING_TO_START) {
            this.props.setBaselinePlayer();
        }

        this.props.advanceToNextGameStage();
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
                                        {row.name === 'bpm' ? <Metronome {...this.props} /> : null}
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