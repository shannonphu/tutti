import React, { Component } from 'react';
import Tone from 'tone';
import LoopIcon from '@material-ui/icons/Loop';
import SAMPLE_MP3 from '../../assets/kevin_bossa.mp3';

class Looper extends Component {
    constructor(props) {
        super(props);
        this.player = new Tone.Player(SAMPLE_MP3).toMaster();
    }

    render() {
        return (
            <div>
                < LoopIcon 
                    fontSize="large"
                />
            </div>
        );
    }
}

export default Looper;