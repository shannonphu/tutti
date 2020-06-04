import React, { Component } from 'react';
import { Nav, Container, LandingPage, RoomPageContainer, GamePortalContainer } from '..';
import { Route, Switch, Redirect } from 'react-router-dom';
import { GAME_STAGE, ROOM_STATE } from '../../utils/stateEnums';

class Main extends Component {
    render() {
        return (
            <div>
                <Nav />

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
        );
    }
}

export default Main;
