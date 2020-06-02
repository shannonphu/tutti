import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Metronome } from '..';

class GameInfoTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.restructureData = this.restructureData.bind(this);
    }

    restructureData() {
        let { room: { bpm, numBars, numLoops } } = this.props;
        return [
            { key: 'BPM', value: bpm },
            { key: '# Bars', value: numBars },
            { key: '# Loops', value: numLoops },
            { key: 'Total Bars', value: numBars * numLoops }
        ]
    }

    render() {
        let data = this.restructureData();
        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {row.key}
                                    {row.key == 'BPM' ? <Metronome {...this.props} /> : null}
                                </TableCell>
                                <TableCell align="right">{row.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default GameInfoTable;