import React, { Component } from 'react';
import Tone from 'tone';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';

class Microphone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRecording: false,
            blobData: null,
            blobUri: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.chunks = [];
    
        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.saveAudio = this.saveAudio.bind(this);

        this.analyser = new Tone.Analyser({
            "type" : "waveform",
            "size" : 1024
        });

        this.mic = new Tone.UserMedia();
        this.mic.connect(Tone.Master);
        this.mic.connect(this.analyser);
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
        console.log('start rec')
        this.chunks = [];
        this.mediaRecorder.start(5);
        this.setState({ isRecording: true });
        console.log('chunks')
        console.log(this.chunks)
    }

    stopRecording() {
        console.log('mic closed');
        this.mediaRecorder.stop();
        this.setState({ isRecording: false });
        this.saveAudio();
    }

    saveAudio() {
        console.log('save chunks')
        console.log(this.chunks)
        const blob = new Blob(this.chunks, { type: 'audio/webm;codecs=opus' });
        const audioURL = URL.createObjectURL(blob);
        new Audio(audioURL).play();
    }

    handleClick() {
        if (this.state.isRecording) {
            this.stopRecording()
            this.mic.close();
            Tone.Transport.stop();
        } else {
            // Ask the user to activate their mic
            this.mic.open().then(() => {
                Tone.Transport.start();
                let sig = this.analyser.getValue();
                this.startRecording();
            });
        }
    }

    render() {
        return (
            <div>
                <IconButton
                    aria-label='send'
                    type='submit'
                    name='action'
                    onClick={this.handleClick}
                    style={{ margin: '0 0 0 10px', padding: 0 }}>
                    {this.state.isOn ? <StopIcon /> : <PlayArrowIcon />}
                </IconButton>
            </div>
        )
    }
}

export default Microphone;