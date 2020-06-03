import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Metronome } from '..';
import TextField from '@material-ui/core/TextField';

class GameInfoTable extends Component {
    constructor(props) {
        super(props);
        this.state = { isEditable: true };
        this.restructureData = this.restructureData.bind(this);
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    restructureData() {
        let { room: { bpm, numBars, numLoops } } = this.props;
        return [
            { label: 'BPM', name: 'bpm', value: bpm },
            { label: '# Bars', name: 'numBars', value: numBars },
            { label: '# Loops', name: 'numLoops', value: numLoops }
        ]
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
                this.props.updateRoomNumLoopsSettings(value)
                break;
            default:
                break;
        }
    }

    submitHandler(event) {
        event.preventDefault();
    }

    render() {
        let data = this.restructureData();
        return (
            <form onSubmit={this.submitHandler}>
                <TableContainer component={Paper}>
                    <Table aria-label='simple table'>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell component='th' scope='row'>
                                        {row.label}
                                        {row.name == 'bpm' ? <Metronome {...this.props} /> : null}
                                    </TableCell>
                                    <TableCell align='left' colSpan={2}>
                                        {this.state.isEditable ? 
                                            <TextField
                                                autoFocus={this.props.room.lastUpdatedField == row.name}
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
                                    {this.state.isEditable ? 
                                        <Link to={`/game/${this.props.room.roomCode}`} style={{ textDecoration: 'none' }}>
                                            <Button
                                                type='submit'
                                                name='action'
                                                color='primary'
                                                endIcon={<MusicNoteIcon fontSize='small' />}>
                                                Start Game
                                            </Button>
                                        </Link>
                                        : 
                                        <Button
                                            color='primary'
                                            endIcon={<EditIcon fontSize='small' />}>
                                            Edit
                                        </Button>
                                    }
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