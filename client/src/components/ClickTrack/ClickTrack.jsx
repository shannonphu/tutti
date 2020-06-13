import React, { Component } from 'react';
import Tone from 'tone';
import woodBlockUrl from '../../assets/woodblock.wav';
import TimerIcon from '@material-ui/icons/Timer';
import TimerOffIcon from '@material-ui/icons/TimerOff';
import IconButton from '@material-ui/core/IconButton';
import { Tooltip } from '@material-ui/core';


class ClickTrack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClickTrack: true
        };

        this.handleToggleClickTrack = this.handleToggleClickTrack.bind(this);
        this.props.toggleClickTrack(this.state.isClickTrack);
    }

    handleToggleClickTrack(event) {
        event.preventDefault();

        this.props.toggleClickTrack(!this.state.isClickTrack);
        this.setState({isClickTrack: !this.state.isClickTrack});
        
    }

    render() {
        return(
            <Tooltip title={this.state.isClickTrack ? 'disable click track' : 'enable click track'} >
                <IconButton
                    onClick = {this.handleToggleClickTrack}
                    variant = "contained"
                    style={{ top: -8 }}
                    edge='end'
                    color="inherit"
                >
                    {this.state.isClickTrack ? <TimerIcon/> : <TimerOffIcon/>}
                </IconButton>
            </Tooltip>
        );
    }
}

export default ClickTrack;