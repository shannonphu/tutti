import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { RoomPageContainer, GamePortalContainer, LandingPage, GameStageDisplay } from '..';
import { GAME_STAGE, ROOM_STATE } from '../../utils/stateEnums';
import styles from './TuttiContainerStyles';
import Game from '../../utils/GameModel';
import { isUserCreated } from '../../utils/roomUtils.js';

class TuttiContainer extends Component {
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
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {(() => {
                    switch (this.props.room.roomState) {
                        case ROOM_STATE.EMPTY:
                            return <Backdrop open><CircularProgress color='inherit' /></Backdrop>;
                        case ROOM_STATE.VALID:
                            if (!isUserCreated(this.props)) {
                                return <LandingPage {...this.props} />;
                            }

                            if (this.props.game.stage == GAME_STAGE.WAITING_FOR_PLAYERS) {
                                return(
                                    <div>
                                        <GameStageDisplay {...this.props} steps={Game.Progression.map((s) => s.name)} activeStep={0} />                                    
                                        <RoomPageContainer {...this.props} />
                                    </div>
                                );
                            } else {
                                return(
                                    <div>
                                        <GameStageDisplay {...this.props} steps={Game.Progression.map((s) => s.name)} activeStep={0} />
                                        <GamePortalContainer {...this.props} />;
                                    </div>
                                );
                            }
                        case ROOM_STATE.INVALID:
                        default:
                            return <Redirect to='/' />
                    }
                })()}
            </div>
        );
    }
}

TuttiContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TuttiContainer);