/* eslint-disable indent */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { RoomInfoPanel, ChatMessageBox, GameInfoTable, LandingPage, GameStageDisplay } from '..';
import { isUserCreated, isRoomCodeSet } from '../../utils/roomUtils.js';
import { ROOM_STATE } from '../../utils/stateEnums';

class RoomPageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        // If someone new is trying to join the room, get the roomcode 
        // from the URL and fetch the room data from the API and load 
        // the data into the Redux store
        if (!props.match.params.roomId || (props.match.params.roomId && props.room.roomCode == null)) {
            props.getRoom(props.match.params.roomId);
        }
    }
    

    render() {
        return (
            <div>
                {(() => {
                    switch (this.props.room.roomState) {
                        case ROOM_STATE.EMPTY:
                            return(
                                <Backdrop open>
                                    <CircularProgress color='inherit' />
                                </Backdrop>);
                        case ROOM_STATE.VALID:
                            if (isUserCreated(this.props)) {
                                return(
                                    <Container fixed>
                                        <GameStageDisplay {...this.props} />
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={4}><GameInfoTable {...this.props} /></Grid>
                                            <Grid item xs={12} md={4}><RoomInfoPanel {...this.props} /></Grid>
                                            <Grid item xs={12} md={4}><ChatMessageBox {...this.props} /></Grid>
                                        </Grid>
                                    </Container>
                                    );
                            } else {
                                return <LandingPage {...this.props} />
                            }
                        case ROOM_STATE.INVALID:
                        default:
                            return <Redirect to = '/' />
                    }
                })()}
            </div>
        )
    }
}

export default RoomPageContainer;