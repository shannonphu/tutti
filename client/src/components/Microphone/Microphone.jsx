import React, { Component } from 'react';
import Tone from 'tone';

class Microphone extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.mic = new Tone.UserMedia();

        // Ask the user to activate their mic
        this.mic.open().then(() => {
            //promise resolves when input is available
            console.log('mic opened');
            this.mic.close();
        });
    }

    render() {
        return(
            <div></div>
        )
    }
}

export default Microphone;