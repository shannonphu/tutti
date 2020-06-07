import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import { Nav, Container, LandingPage, RoomPageContainer, GamePortalContainer } from '..';
import { GAME_STAGE, ROOM_STATE } from '../../utils/stateEnums';
import styles from './MainStyles';
import theme from './MainTheme';

class Main extends Component {
    render() {
        const { classes } = this.props;
        return (
            <ThemeProvider theme={theme}>
                <Nav />
                <div className={classes.container}>
                    {/*Alternate pages beneath navbar, based on current route*/}
                    <Switch>
                        <Route path="/room/:roomId?" component={(props) => {
                            if (this.props.room.roomState == ROOM_STATE.EMPTY) {
                                return <RoomPageContainer {...this.props} {...props} />
                            } else if (this.props.room.roomState == ROOM_STATE.VALID) {
                                if (this.props.game.stage == GAME_STAGE.WAITING_FOR_PLAYERS) {
                                    return <RoomPageContainer {...this.props} {...props} />
                                } else {
                                    return <GamePortalContainer {...this.props} {...props} />
                                }
                            }
                            else if (this.props.room.roomState == ROOM_STATE.INVALID) {
                                return <Redirect to = '/' />
                            }
                        }}
                        />
                        <Route path='/test' render={() => <Container {...this.props} />} />                    
                        <Route path='/' render={() => <LandingPage {...this.props} />} />                    
                    </Switch>
                </div>
            </ThemeProvider>
        );
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);