import React, { Component } from 'react';
import { Nav, Container } from '..'
import { Route, Switch } from 'react-router-dom';

class Main extends Component {
   render() {
      return (
         <div>
            <Nav />

            {/*Alternate pages beneath navbar, based on current route*/}
            <Switch>
               <Route exact path='/' render={() => <Container {...this.props} />} />
               <Route path='/test' render={() => <Container {...this.props} />} />
            </Switch>
         </div>
      )
   }
}

export default Main;
