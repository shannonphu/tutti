import React, { Component } from 'react';
import Tone from 'tone';
import IconButton from '@material-ui/core/IconButton';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';

class Microphone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRecording: false,
            blobData: null,
            blobUri: null
        };

        this.chunks = [];

        this.mic = new Tone.UserMedia();
        this.mic.connect(Tone.Master);

        this.handleClick = this.handleClick.bind(this);
        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.saveAudio = this.saveAudio.bind(this);
    }

    async componentDidMount() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.ondataavailable = e => {
            if (e.data && e.data.size > 0) {
                this.chunks.push(e.data);
            }
        };
    }

    startRecording() {
        this.chunks = [];

        // Ask the user to activate their mic
        this.mic.open().then(() => {
            Tone.Transport.start();
            this.mediaRecorder.start(5);
            this.setState({ isRecording: true });
        });
    }

    stopRecording() {
        this.mediaRecorder.stop();
        this.mic.close();
        Tone.Transport.stop();
        this.setState({ isRecording: false });
    }

    saveAudio() {
        const blob = new Blob(this.chunks, { type: 'audio/webm;codecs=opus' });
        const audioURL = URL.createObjectURL(blob);
        this.setState({
            blobData: blob,
            blobUri: audioURL
        });
    }

    handleClick() {
        if (this.state.isRecording) {
            this.stopRecording();
            this.saveAudio();
        } else {
            this.startRecording();
        }
    }

    render() {
        if (this.state.blobUri) {
            new Audio(this.state.blobUri).play();
        }

        return (
            <div>
                <IconButton
                    type='submit'
                    name='action'
                    onClick={this.handleClick}
                    style={{ margin: '0 0 0 10px', padding: 0 }}>
                    {this.state.isRecording ? <MicOffIcon /> : <MicIcon />}
                </IconButton>
            </div>
        )
    }
}

export default Microphone;