import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { GameSettingPanel, RoomInfoPanel, ChatMessageBox } from '..';
import { isRoomCodeSet } from '../../utils/roomUtils.js';

class RoomPageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        // join room if exists
        if(isRoomCodeSet(this.props)) {
            this.props.joinRoom(this.props.room.code);
        }
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
                    {this.props.room.code ? 
                        <Grid item xs>
                            <RoomInfoPanel {...this.props} />
                        </Grid> 
                        : <Grid item xs></Grid>}
                    {this.props.room.code ? 
                        <Grid item xs>
                            <Paper><ChatMessageBox {...this.props} /></Paper>
                        </Grid>
                        : <Grid item xs></Grid>}
                </Grid>
            </Container>
        )
    }
}

export default RoomPageContainer;