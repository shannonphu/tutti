import React, { Component } from 'react';
import Tone from 'tone';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import MicIcon from '@material-ui/icons/Mic';

// play back the looped recording while recording
class UserRecorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isUserPlayerSet: false
        };

        let playerName = this.props.user.playerName;
        let playerData = this.props.room.users[playerName];
        let loopUrl = playerData.loopUrl;

        this.loopPlayer = new Tone.Player(loopUrl).toMaster();
        this.userPlayer = null;

        Tone.Buffer.on('load', 
            () => {this.setState({isLoaded: true});}
        );

        // metronome
        let metronomeSynth = new Tone.MembraneSynth({volume: 5}).toMaster();
        this.metronome = new Tone.Loop(
            (time) => {metronomeSynth.triggerAttackRelease('C1', '4n', time);},
            '4n'
        );

        this.handleRecordAudio = this.handleRecordAudio.bind(this);
        this.handlePlaybackMerged = this.handlePlaybackMerged.bind(this);
        this.playAudioCallback = this.playAudioCallback.bind(this);
        this.startMicrophonePermissions = this.startMicrophonePermissions.bind(this);
        this.stopMicrophoneAccess = this.stopMicrophoneAccess.bind(this);
        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.saveAudio = this.saveAudio.bind(this);
        this.setUserPlayer = this.setUserPlayer.bind(this);

        // declare Tone.Time objects
        this.toneNumBars = Tone.Time(this.props.room.numBars, 'm');
        this.toneTotalBars = Tone.Time(this.props.room.numBars * this.props.room.numLoops, 'm')

        // looper initialization
        this.looper = new Tone.Event((this.playAudioCallback), this.toneNumBars);
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
        this.mediaRecorder.start(5);
        this.setState({ isRecording: true });
    }

    stopRecording() {
        this.mediaRecorder.stop();
        this.setState({ isRecording: false });
        this.stopMicrophoneAccess();
        this.saveAudio();
    }

    saveAudio() {
        const blob = new Blob(this.chunks, { type: 'audio/webm;codecs=opus' });
        const audioURL = URL.createObjectURL(blob);
        this.props.uploadAudio(blob);
        this.setState({
            blobData: blob,
            blobUri: audioURL
        });
    }

    playAudioCallback(time, duration) {
        this.loopPlayer.start(time, 0, duration); 
    }

    handleRecordAudio(event) {
        event.preventDefault();

        // Ask the user to activate their mic
        if (!this.state.hasAccessToMicrophone) {
            this.startMicrophonePermissions();
        }

        Tone.Transport.stop(); // Restart the Transport (probably unnecessary later)
        Tone.Transport.cancel(); 
        console.log(this.looper)

        // schedule the events

        // metronome for one measure
        this.metronome.start(0).stop('1:0:0');

        // play back loop and start recording
        this.looper.start('1:0:0').stop(Tone.Time('1:1:0') + this.toneTotalBars);
        this.startRecordEvent.start('1:1:0');
        this.stopRecordEvent.start(Tone.Time('1:1:0') + this.toneTotalBars);

        Tone.Transport.start();

    }
    handlePlaybackMerged(event) {
        event.preventDefault();

        // cancel recording related events and restart
        Tone.Transport.stop();
        Tone.Transport.cancel();

        // schedule playback
        // this.looper.start(0).stop(this.toneTotalBars);
        this.userPlayer.start(Tone.now());
        
        // Tone.Transport.start();
    }

    setUserPlayer() {
        let playerName = this.props.user.playerName;
        let playerData = this.props.room.users[playerName];
        let audioUrl = playerData.audioUrl;
        if (audioUrl != null) {
            this.userPlayer = new Tone.Player(audioUrl).toMaster();
            this.setState({isUserPlayerSet : true});
        }
    }
    render() {
        console.log(this.state)
        // load audio data into the buffer
        if (!this.state.isUserPlayerSet) { 
            this.setUserPlayer();
        }
        return (
            <ButtonGroup 
                orientation="vertical"
                color="primary"
            >
                <Button
                    onClick   = {this.handleRecordAudio}
                    disabled  = {this.state.isRecording || this.state.isPlaying}
                    variant   = "contained"
                    color     = "primary"
                    startIcon = {<MicIcon/>}
                >
                    Record over the Loop
                </Button>
                <Button
                    onClick   = {this.handlePlaybackMerged}
                    disabled  = {this.state.isRecording || !this.state.isLoaded || !this.state.isUserPlayerSet}
                    variant   = "contained"
                    color     = "secondary"
                    startIcon = {<LibraryMusicIcon/>}
                > 
                    Play back merged Loop and Recording
                </Button>
            </ButtonGroup>
        );
    }
}

export default UserRecorder;