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

        let woodBlock = new Tone.Player(woodBlockUrl).toMaster();
        woodBlock.volume.value = 1;
        this.clickTrack = new Tone.Loop(
            (time) => {woodBlock.start(time, 0, '4n');},
            '4n'
        );

    }

    handleToggleClickTrack(event) {
        event.preventDefault();
        this.setState({isClickTrack: !this.state.isClickTrack});
        this.clickTrack.mute = this.state.isClickTrack;
    }

    componentDidUpdate() {
        this.clickTrack.start(this.props.clickTrack.startTime);
        this.clickTrack.stop(this.props.clickTrack.stopTime);
    }
    render() {
        return(
            <Tooltip title={this.state.isClickTrack ? 'disable click track' : 'enable click track'} >
                <IconButton
                    onClick = {this.handleToggleClickTrack}
                    variant = "contained"
                    style={{ top: -6 }}
                    edge='end'
                    color="inherit"
                >
                    {this.state.isClickTrack ? <TimerIcon/> : <TimerOffIcon/>}
                </IconButton>
            </Tooltip>
        );
    }
}

export default ClickTrack