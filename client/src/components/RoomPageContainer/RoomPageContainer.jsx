/* eslint-disable indent */
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { RoomInfoPanel, ChatMessageBox, GameInfoTable } from '..';

class RoomPageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Container fixed>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}><GameInfoTable {...this.props} /></Grid>
                        <Grid item xs={12} md={4}><RoomInfoPanel {...this.props} /></Grid>
                        <Grid item xs={12} md={4}><ChatMessageBox {...this.props} /></Grid>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default RoomPageContainer;