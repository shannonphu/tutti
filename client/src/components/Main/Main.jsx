import React, { Component } from 'react';
import { Nav, Container, RoomPageContainer } from '..'
import { Route, Switch } from 'react-router-dom';

class Main extends Component {
   render() {
      return (
         <div>
            <Nav />

            {/*Alternate pages beneath navbar, based on current route*/}
            <Switch>
                <Route path="/room/:roomId?" component={(props) => <RoomPageContainer {...this.props} {...props} />} />
                <Route path='/test' render={() => <Container {...this.props} />} />
                <Route exact path='/' render={() => <Container {...this.props} />} />
            </Switch>
         </div>
      )
   }
}

export default Main;
