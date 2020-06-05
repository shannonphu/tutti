import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tone from 'tone';
import LoopIcon from '@material-ui/icons/Loop';
import Button from '@material-ui/core/Button';
import SAMPLE_MP3 from '../../assets/kevin_bossa.mp3';


class Looper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isPlaying: false
        };
        this.player = new Tone.Player(SAMPLE_MP3).toMaster();
        this.player.loop = true;
        Tone.Buffer.on('load', 
            () => {this.setState({...this.state, isLoaded: true})
        })
        
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(event) {
        event.preventDefault();
        console.log(this.state.isLoaded)
        console.log(this.player.buffer)
        if (!(this.state.isPlaying)) {
            this.player.start()
            console.log("start")
            this.setState({...this.state, isPlaying: true})
        }
        else {
            this.player.stop()
            console.log("stop")
            this.setState({...this.state, isPlaying: false})
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