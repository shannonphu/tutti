import React, { Component } from 'react';
import { Nav, Container, LandingPage, RoomPageContainer, GamePortalContainer } from '..';
import { Route, Switch } from 'react-router-dom';

class Main extends Component {
    render() {
        return (
            <div>
                <Nav />

                {/*Alternate pages beneath navbar, based on current route*/}
                <Switch>
                    <Route path="/room/:roomId?" component={(props) => <RoomPageContainer {...this.props} {...props} />} />
                    <Route path="/game/:roomId?" component={(props) => <GamePortalContainer {...this.props} {...props} />} />
                    <Route path='/test' render={() => <Container {...this.props} />} />                    
                    <Route path='/' render={() => <LandingPage {...this.props} />} />                    
                </Switch>
            </div>
        );
    }
}

export default Main;
