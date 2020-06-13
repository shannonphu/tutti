import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Nav, Container, LandingPage, TuttiContainer, AboutPage } from '..';
import theme from './MainTheme';

class Main extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Nav />

                {/*Alternate pages beneath navbar, based on current route*/}
                <Switch>
                    <Route path="/room/:roomId?" component={(props) => <TuttiContainer {...this.props} {...props} />} />
                    <Route path='/about' render={() => <AboutPage {...this.props} />} />                    
                    <Route path='/test' render={() => <Container {...this.props} />} />                    
                    <Route path='/' render={() => <LandingPage {...this.props} />} />                    
                </Switch>
            </ThemeProvider>
        );
    }
}

export default Main;