import React, { Component } from 'react';
import Tone from 'tone';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';

class Metronome extends Component {
    constructor(props) {
        super(props);
        Tone.Transport.bpm.value = this.props.room.bpm;
        

        this.handleClick = this.handleClick.bind(this);


        let synth = new Tone.MembraneSynth().toMaster();
        this.metronome = new Tone.Event((time) => {
            synth.triggerAttackRelease('C1', '4n', time);
        });
        this.metronome.loop = true;
        this.metronome.loopEnd = '4n';

        this.state = { metronomeState: this.metronome.state};
    }

    handleClick(e) {
        e.preventDefault();
        Tone.Transport.cancel();
        if (this.state.metronomeState === 'started') {
            this.metronome.stop();
        } else {
            console.log('got here')
            this.metronome.start();
        }
        if (Tone.Transport.state === 'stopped') {
            Tone.Transport.start('+0.05');
        }
        this.setState({ metronomeState: this.metronome.state });
    }

    render() {
        return (
            <IconButton 
                aria-label='send' 
                type='submit' 
                name='action' 
                disabled={this.props.isLoaded}
                onClick={this.handleClick}
                style={{ margin: '0 0 0 10px', padding: 0 }}>
                {this.state.metronomeState === 'started' ? <StopIcon /> : <PlayArrowIcon />}
            </IconButton>
        )
    }
}

export default Metronome;