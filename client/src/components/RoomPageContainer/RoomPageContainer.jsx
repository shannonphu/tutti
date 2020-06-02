import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { RoomInfoPanel, ChatMessageBox, GameInfoTable } from '..'
import {isRoomCodeSet} from '../../utils/roomUtils.js';

class RoomPageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        // If someone new is trying to join the room, get the roomcode 
        // from the URL and fetch the room data from the API and load 
        // the data into the Redux store
        if (props.match.params.roomId && props.room.code == null) {
            props.getRoom(props.match.params.roomId);
        }

        // Join client socket to room if it exists in server
        if (isRoomCodeSet(props)) {
            let code = props.room.code || props.match.params.roomId;
            props.joinRoom(code);
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
                        <GameInfoTable {...this.props} />
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