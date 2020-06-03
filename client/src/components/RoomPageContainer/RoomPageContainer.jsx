import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { RoomInfoPanel, ChatMessageBox, GameInfoTable } from '..'
import { isRoomCodeSet } from '../../utils/roomUtils.js';
import { ROOM_STATE } from '../../utils/stateEnums';

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
                {(() => {
                    switch (this.props.room.roomState) {
                        case ROOM_STATE.EMPTY:
                            return(
                                <Backdrop open>
                                    <CircularProgress color='inherit' />
                                </Backdrop>);
                        case ROOM_STATE.VALID:
                            return(
                                <Grid container direction="row" justify="center" alignItems="center">
                                    <Grid item xs><GameInfoTable {...this.props} /></Grid>
                                    <Grid item xs><RoomInfoPanel {...this.props} /></Grid>
                                    <Grid item xs><ChatMessageBox {...this.props} /></Grid>
                                </Grid>);
                        case ROOM_STATE.INVALID:
                        default:
                            return <Redirect to='/' />;
                    }
                })()}
                </Container>
        )
    }
}

export default RoomPageContainer;