import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';
import Tone from 'tone';
import LoopIcon from '@material-ui/icons/Loop';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class Looper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isRecording: false,
            isPlaying: false
        };

        this.chunks = [];

        this.mic = new Tone.UserMedia().toMaster(); // recording feedback for testing
        // Tone.Transport.bpm.value = this.props.room.bpm;
        Tone.context.latencyHint = 'fastest';

        this.player = new Tone.Player().toMaster(); // eventually use Tone.Player to get audio from server
        this.mediaRecorder = null;

        // metronome
        let metronomeSynth = new Tone.MembraneSynth({volume: 5}).toMaster();
        this.metronome = new Tone.Loop(
            (time) => {metronomeSynth.triggerAttackRelease('C1', '4n', time);},
            '4n'
        );

        this.handleRecordLoop = this.handleRecordLoop.bind(this);
        this.handlePlaybackLoop = this.handlePlaybackLoop.bind(this);
        this.playAudioCallback = this.playAudioCallback.bind(this);
        this.startMicrophonePermissions = this.startMicrophonePermissions.bind(this);
        this.stopMicrophoneAccess = this.stopMicrophoneAccess.bind(this);
        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.saveAudio = this.saveAudio.bind(this);

        // declare Tone.Time objects
        this.toneNumBars = Tone.Time(this.props.room.numBars, 'm');
        this.toneTotalBars = Tone.Time(this.props.room.numBars * this.props.room.numLoops, 'm')
        
        // looper initialization
        this.looper = new Tone.Event((this.playAudioCallback), this.toneNumBars + Tone.Time('4n'));
        this.looper.loop = this.props.room.numLoops;
        this.looper.loopStart = 0;
        this.looper.loopEnd = this.toneNumBars;

        // start and stop recording events
        this.startRecordEvent = new Tone.Event(this.startRecording);
        this.stopRecordEvent = new Tone.Event(this.stopRecording);
    }

    startMicrophonePermissions() {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            window.streamReference = stream;

            this.setState({ hasAccessToMicrophone: true });

            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.ondataavailable = e => {
                if (e.data && e.data.size > 0) {
                    this.chunks.push(e.data);
                }
            };
        });
    }
    
    stopMicrophoneAccess() {
        window.streamReference.getAudioTracks().forEach((track) => {
            track.stop();
        });
        this.setState({ hasAccessToMicrophone: false });
    }

    startRecording() {
        this.chunks = [];

        this.mic.open().then(() => {
            this.mediaRecorder.start(5);
            this.setState({ isRecording: true });
        });
    }

    stopRecording() {

        this.stopMicrophoneAccess();
        this.mediaRecorder.stop();
        this.mic.close();
        this.setState({ isRecording: false });
        this.saveAudio();
    }

    saveAudio() {
        const blob = new Blob(this.chunks, { type: 'audio/webm;codecs=opus' });
        const audioURL = URL.createObjectURL(blob);
        this.props.uploadLoopedAudio(blob);
        this.setState({
            blobData: blob,
            blobUri: audioURL
        });
    }

    playAudioCallback(time, duration) {
        this.player.start(time, 0, duration); 
    }

    handleRecordLoop(event) {
        event.preventDefault();

        // Ask the user to activate their mic
        if (!this.state.hasAccessToMicrophone) {
            this.startMicrophonePermissions();
        }

        Tone.Transport.stop(); // Restart the Transport (probably unnecessary later)
        Tone.Transport.cancel(); 

        // schedule the events
        this.metronome.start(0).stop('1m');
        this.startRecordEvent.start('1m');
        this.stopRecordEvent.start(Tone.Time('1m') + this.toneNumBars + Tone.Time('4n'));
        console.log(this.toneNumBars);

        Tone.Transport.start();
  
    }
    handlePlaybackLoop(event) {

        event.preventDefault();

        // Grab the audio data and load to the buffer.
        let playerName = this.props.user.playerName;
        let playerData = this.props.room.users[playerName];

        let loopUrl = playerData.loopUrl;
        this.player.buffer = new Tone.Buffer(loopUrl);

        // cancel recording related events and restart
        Tone.Transport.cancel();
        Tone.Transport.seconds = 0; // restart

        this.looper.start(0); 
        this.looper.stop(this.toneTotalBars);

        if (Tone.Transport.state == 'stopped') {
            Tone.Transport.start();
        }
    }

    render() {
        return (
            <Grid container
                direction  = "column"
                justify    = "center"
                alignItems = "center"
            >
                <Grid item>
                    <Button
                        onClick   = {this.handleRecordLoop}
                        disabled  = {this.state.isRecording || this.state.isPlaying}
                        variant   = "contained"
                        color     = "primary"
                        startIcon = {<LoopIcon/>}
                    >
                        Record a Loop
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        onClick   = {this.handlePlaybackLoop}
                        disabled  = {this.state.isRecording || this.state.isPlaying}
                        variant   = "contained"
                        color     = "secondary"
                        startIcon = {<PlayCircleOutlineIcon/>}
                    > Play back my Loop
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default Looper;