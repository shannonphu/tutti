import React, { Component } from 'react';
import { PulseOscillator, Player } from 'tone';

class Metronome extends Component {
    constructor(props) {
        super(props);
        this.state = { isOn: false };
        this.handleClick = this.handleClick.bind(this);
        this.pulse = new PulseOscillator("E5", 0.4).toMaster();

        this.player = new Player({
            "url": "https://raw.githubusercontent.com/osidesigns/mp3/master/playlist/far_away.mp3",
            "loop": true
        }).toMaster();
    }

    handleClick() {
        if (this.state.isOn) {
            this.pulse.stop();
        } else {
            this.pulse.start();
        }

        this.setState({ isOn: !this.state.isOn })
    }

    render() {
        return (
            <div>
                <tone-content>
                    <tone-oscilloscope></tone-oscilloscope>
                    <tone-fft></tone-fft>
                    <tone-play-toggle></tone-play-toggle>
                </tone-content>
                <button onClick={this.handleClick}>
                    On/Off
                </button>
                {
                    document.querySelector("tone-play-toggle").bind(this.player) &&
                    document.querySelector("tone-oscilloscope").bind(this.player) &&
                    document.querySelector("tone-fft").bind(this.player)
                }
            </div>
        )

    }
}

export default Metronome;