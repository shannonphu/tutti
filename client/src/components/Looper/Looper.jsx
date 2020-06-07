import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';
import Tone from 'tone';
import LoopIcon from '@material-ui/icons/Loop';
import Button from '@material-ui/core/Button';
import SAMPLE_MP3 from '../../assets/kevin_bossa.mp3';

class Looper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
        };
        Tone.Transport.bpm.value = this.props.room.bpm;
        this.player = new Tone.Player(SAMPLE_MP3).toMaster();
        this.player.retrigger = true;

        Tone.Buffer.on('load', 
            () => {this.setState({...this.state, isLoaded: true});}
        );
        
        this.handleOnClick = this.handleOnClick.bind(this);
        this.playAudioCallback = this.playAudioCallback.bind(this);

        this.toneNumBars = Tone.Time(this.props.room.numBars, 'm');
        this.toneTotalBars = Tone.Time(this.props.room.numBars * this.props.room.numLoops, 'm')
        this.looper = new Tone.Event((this.playAudioCallback), this.toneNumBars);
        this.looper.loop = this.props.room.numLoops;
        this.looper.loopEnd = this.toneNumBars;

    }
    
    playAudioCallback(time, duration) {
        this.player.start(time).stop(time+duration);
    }


    handleOnClick(event) {
        event.preventDefault();
        console.log(this.looper.state)
        if (this.looper.state == 'stopped') {
            this.looper.start(0); 
            this.looper.stop(this.toneTotalBars);
            Tone.Transport.seconds = 0; // restart
        }
        else if (this.looper.state == 'started') {
            this.looper.cancel();
            this.player.stop();
        }
        else {
            console.log('state is busted');
        }
        if (Tone.Transport.state == 'stopped') {
            Tone.Transport.start();
        }
    }

    render() {
        const isLoaded = this.state.isLoaded;
        return (
            <div>
                <Button
                    onClick   = {this.handleOnClick}
                    disabled  = {!isLoaded}
                    variant   = "contained"
                    color     = "default"
                    startIcon = {<LoopIcon/>}
                >
                    Loop Sample mp3
                </Button>
            </div>
        );
    }
}

export default Looper;