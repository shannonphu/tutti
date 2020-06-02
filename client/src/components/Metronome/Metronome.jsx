import React, { Component } from 'react';
import Tone from 'tone';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';

class Metronome extends Component {
    constructor(props) {
        super(props);
        this.state = { isOn: false };
        this.handleClick = this.handleClick.bind(this);

        Tone.Transport.bpm.value = this.props.room.bpm;

        let volume = new Tone.Volume(10);
        let synth = new Tone.MembraneSynth().chain(volume, Tone.Master);
        this.loop = new Tone.Loop((time) => {
            synth.triggerAttackRelease('C1', '4n', time);
        }, '4n');
    }

    handleClick() {
        if (this.state.isOn) {
            this.loop.stop();
            Tone.Transport.stop();
        } else {
            Tone.Transport.start();
            this.loop.start();
        }

        this.setState({ isOn: !this.state.isOn })
    }

    render() {
        return (
            <IconButton 
                aria-label='send' 
                type='submit' 
                name='action' 
                onClick={this.handleClick}
                style={{ margin: '0 0 0 10px', padding: 0 }}>
                {this.state.isOn ? <StopIcon /> : <PlayArrowIcon />}
            </IconButton>
        )
    }
}

export default Metronome;