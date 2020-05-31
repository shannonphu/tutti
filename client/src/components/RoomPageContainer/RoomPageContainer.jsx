import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { GameSettingPanel } from '..'

class RoomPageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container fixed>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <Grid item xs>
                        <GameSettingPanel {...this.props} />
                    </Grid>
                    <Grid item xs>
                        <Paper>Room info goes here</Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper>Chat goes here</Paper>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

export default RoomPageContainer;