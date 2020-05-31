import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { GameSettingPanel } from '..'

class RoomPageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <GameSettingPanel {...this.props} />
                </Grid>
                <Grid item xs={4}>
                    <Paper>xs=6</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper>xs=6</Paper>
                </Grid>
            </Grid>
        )
    }
}

export default RoomPageContainer;