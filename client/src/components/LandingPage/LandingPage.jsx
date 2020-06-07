import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';
import { isRoomCodeSet } from'../../utils/roomUtils.js';
import styles from './LandingPageStyles';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerName : '',
            isError    : false
        };

        this.handleJoinRoom   = this.handleJoinRoom.bind(this);
        this.handleCreateRoom = this.handleCreateRoom.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.buttonGenerator  = this.buttonGenerator.bind(this);

    }

    handleJoinRoom(event) {
        event.preventDefault(); 
        if (this.state.playerName.length < 1) {
            this.setState({
                isError: true
            });
            return;
        }

        let user = { playerName: this.state.playerName };
        this.props.addUserToRoom(user);
    }

    handleCreateRoom(event) {
        event.preventDefault();
        if (this.state.playerName.length < 1) {
            this.setState({
                isError: true
            });
            return;
        }

        let user = { playerName: this.state.playerName };
        let defaultRoom = this.props.room;

        this.props.addRoom(defaultRoom.bpm, defaultRoom.numBars, defaultRoom.numLoops, user, (room) => {
            this.props.history.push(`/room/${room.data}`);
        });
    }

    handleTextChange(event) {
        this.setState({
            playerName: event.target.value,
            isError   : false
        });
    }

    buttonGenerator() {
        var button;
        if (isRoomCodeSet(this.props)) {
            button = 
                <Button
                    onClick = {this.handleJoinRoom}
                    variant = "contained"
                >
                    Join Room
                </Button>;
        }
        else {
            button =
                <Button
                    onClick = {this.handleCreateRoom}
                    variant = "contained"
                >
                    Create Room
                </Button>;
        }
        return button;
    }

    render() {
        const { classes } = this.props; // paradigm for styling

        return (
            <Grid container
                component = "main"
                className = {classes.root}
            > 
                <CssBaseline/>

                <Grid item 
                    xs        = {12}
                    sm        = {8}
                    md        = {5}
                    component = {Paper}
                    variant   = "outlined"
                    square
                >
                    <Grid container
                        spacing    = {2}
                        direction  = "column"
                        alignItems = "center"
                        justify    = "center"
                        className  = {classes.container}
                    >
                        <Grid item>
                            <form onSubmit={isRoomCodeSet(this.props) ? this.handleJoinRoom : this.handleCreateRoom}>    
                                <TextField
                                    autoFocus
                                    onChange     = {this.handleTextChange}
                                    variant      = "outlined"
                                    margin       = "normal"
                                    id           = "name"
                                    label        = "Name"
                                    autoComplete = "off"
                                    error        = {this.state.isError}
                                    helperText   = {this.state.isError ? 'pls' : ''}
                                    fullWidth
                                    autoFocus
                                />
                            </form>
                        </Grid>
                        <Grid item>
                            {this.buttonGenerator()}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item 
                    xs = {false} 
                    sm = {4} 
                    md = {7} 
                    className = {classes.image} 
                />
            </Grid> // Grid container main
        ); // return    
    } // render
}

LandingPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingPage);