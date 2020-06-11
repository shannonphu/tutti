import React, { Component } from 'react';
import Tone from 'tone';
import woodBlockUrl from '../../assets/woodblock.wav';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import MicIcon from '@material-ui/icons/Mic';
import TimerIcon from '@material-ui/icons/Timer';
import TimerOffIcon from '@material-ui/icons/TimerOff';

// play back the looped recording while recording
class UserRecorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isAudioPlayerSet: false,
            isClickTrack: true
        };
        Tone.context.latencyHint = 'fastest';

        this.loopPlayer = null;
        this.userPlayers = null;
        this.allUserPlayer = null;

        Tone.Buffer.on('load', 
            () => {this.setState({isLoaded: true});}
        );

        // metronome
        let metronomeSynth = new Tone.MembraneSynth().toMaster();
        metronomeSynth.volume.value = 5;
        this.metronome = new Tone.Loop(
            (time) => {metronomeSynth.triggerAttackRelease('C1', '4n', time);},
            '4n'
        );
        // click track
        this.woodBlock = new Tone.Player(woodBlockUrl).toMaster();
        this.woodBlock.volume.value = 1;
        this.clickTrack = new Tone.Loop(
            (time) => {this.woodBlock.start(time, 0, '4n');},
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
        this.setAudioPlayer = this.setAudioPlayer.bind(this);
        this.handleToggleClickTrack = this.handleToggleClickTrack.bind(this);

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
        this.mediaRecorder.start(5);
        this.setState({ isRecording: true });
    }

    stopRecording() {
        this.mediaRecorder.stop();
        this.setState({ isRecording: false });
        this.stopMicrophoneAccess();
        this.saveAudio();
        this.setState({isAudioPlayerSet : false});
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

        // schedule the events
        // metronome for one measure
        this.metronome.start(0).stop('1m');

        // click track
        this.clickTrack.start('1m').stop(Tone.Time('1m') + this.toneTotalBars);

        // play back loop and start recording
        this.looper.start('1m').stop(Tone.Time('1m') + this.toneTotalBars);

        this.startRecordEvent.start('1m');
        this.stopRecordEvent.start(Tone.Time('1m') + this.toneTotalBars + Tone.Time('4n'));

        Tone.Transport.start();

    }
    handlePlaybackMerged(event) {
        event.preventDefault();

        // cancel recording related events and restart
        Tone.Transport.stop();
        Tone.Transport.cancel();

        // schedule playback
        this.looper.start(0).stop(this.toneTotalBars);
        this.allUserPlayer.start(0).stop(this.toneNumBars + Tone.Time('4n'));
        
        Tone.Transport.start();
    }

    setAudioPlayer() {
        let availableAudio = {};
        let loopUrl = {};
        Object.keys(this.props.room.users).map((playerName, i) => {
            let playerData = this.props.room.users[playerName];
            if (playerData.audioUrl != null) {
                availableAudio[playerName] = playerData.audioUrl;
            }
            if (playerData.loopUrl != null) {
                loopUrl = playerData.loopUrl;
            }
        });

        if (loopUrl != null) {
            this.loopPlayer = new Tone.Player(loopUrl).toMaster();
            this.loopPlayer.fadeOut = '4n';
            this.setState({isAudioPlayerSet : true});
        }

        if (Object.entries(availableAudio).length > 0) {

            this.userPlayers = new Tone.Players(availableAudio).toMaster();
            this.allUserPlayer = new Tone.Sequence(
                (time, audioUrl) => {
                    let p = this.userPlayers.get(audioUrl);
                    p.start(time);
                }, 
                Object.keys(availableAudio), 
            );

            this.setState({isAudioPlayerSet : true});
        }
        
    }
    
    handleToggleClickTrack(event) {
        event.preventDefault();
        this.setState({isClickTrack: !this.state.isClickTrack});
        this.clickTrack.mute = this.state.isClickTrack;
    }

    render() {
        // load audio data into the buffer
        if (!this.state.isAudioPlayerSet) { 
            this.setAudioPlayer();
        }
        return (
            <ButtonGroup 
                orientation="vertical"
                color="primary"
            >
                <Button
                    onClick = {this.handleToggleClickTrack}
                    variant = "contained"
                    color = "default"
                    startIcon = {this.state.isClickTrack ? <TimerOffIcon/> : <TimerIcon/>}
                >
                    Click Track
                </Button>
                <Button
                    onClick   = {this.handleRecordAudio}
                    disabled  = {this.state.isRecording || !this.state.isLoaded || !this.state.isAudioPlayerSet }
                    variant   = "contained"
                    color     = "primary"
                    startIcon = {<MicIcon/>}
                >
                    Record over the Loop
                </Button>
                <Button
                    onClick   = {this.handlePlaybackMerged}
                    disabled  = {this.state.isRecording || !this.state.isLoaded || !this.state.isAudioPlayerSet}
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