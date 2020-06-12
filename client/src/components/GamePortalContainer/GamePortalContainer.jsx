import React, { Component } from 'react';
import Tone from 'tone';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { ChatMessageBox, GameInfoTable, Microphone, AudioDisplayTable } from '..';
import woodBlockUrl from '../../assets/woodblock.wav';
import MicIcon from '@material-ui/icons/Mic';
import TimerIcon from '@material-ui/icons/Timer';
import TimerOffIcon from '@material-ui/icons/TimerOff';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import LoopIcon from '@material-ui/icons/Loop';

class GamePortalContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isUserPlayerSet: false,
            isClickTrack: true,
            isLoopPlayerSet: false,
            isAllUserPlayerSet: false
        };

        // get bindings out of the way:
        this.createMetronome = this.createMetronome.bind(this);
        this.createClickTrack = this.createClickTrack.bind(this);
        this.createLoopPlayer = this.createLoopPlayer.bind(this);
        this.createAllUserPlayer = this.createAllUserPlayer.bind(this);

        this.handleRecordLoop = this.handleRecordLoop.bind(this);
        this.handleRecordOverLoop = this.handleRecordOverLoop.bind(this);
        this.handlePlaybackMerged = this.handlePlaybackMerged.bind(this);
        this.handleToggleClickTrack = this.handleToggleClickTrack.bind(this);

        this.startMicrophonePermissions = this.startMicrophonePermissions.bind(this);
        this.stopMicrophoneAccess = this.stopMicrophoneAccess.bind(this);
        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.stopRecordingLoop = this.stopRecordingLoop.bind(this);
        this.saveAudio = this.saveAudio.bind(this);
        this.saveLoopedAudio = this.saveLoopedAudio.bind(this);
        
        // singleton settings    
        Tone.context.latencyHint = 'interactive';
        Tone.Transport.bpm.value = this.props.room.bpm; // does this update??
        Tone.Buffer.on('load', 
            () => {this.setState({isLoaded: true});}
        );

        // useful Tone.Time objects (DO THESE UPDATE?)
        this.toneNumBars = Tone.Time(this.props.room.numBars, 'm');
        this.toneTotalBars = Tone.Time(this.props.room.numBars * this.props.room.numLoops, 'm')
    
        // declare the players
        this.loopPlayer = null;
        this.userPlayers = null;
        this.allUserPlayer = null;
        this.metronome = null;
        this.clickTrack = null;

        // start and stop recording events
        this.startRecordEvent = new Tone.Event(this.startRecording);
        this.stopRecordEvent = new Tone.Event(this.stopRecording);
        this.stopRecordLoopEvent = new Tone.Event(this.stopRecordingLoop);

        if (!this.state.isLoopPlayerSet) this.createLoopPlayer();
        if (!this.state.isAllUserPlayerSet) this.createAllUserPlayer();
        this.createClickTrack();
        this.createMetronome();

    }
    // -------------------------------------------------------------------------------------
    // Tone Object Creation

    createMetronome() {
        let metronomeSynth = new Tone.MembraneSynth().toMaster();
        this.metronome = new Tone.Loop(
            (time) => {metronomeSynth.triggerAttackRelease('C1', '4n', time);},
            '4n'
        );
    }

    createClickTrack() {
        let woodBlock = new Tone.Player(woodBlockUrl).toMaster();
        woodBlock.volume.value = 1;
        this.clickTrack = new Tone.Loop(
            (time) => {woodBlock.start(time, 0, '4n');},
            '4n'
        );
    }

    createLoopPlayer() {
        // check for loop audio
        if (this.props.game.baselinePlayer != null) {
            var baselinePlayerName = this.props.game.baselinePlayer.playerName;
        }
        else {
            return;
        }
        let playerData = this.props.room.users[baselinePlayerName];

        if (playerData.loopUrl != null) {
            let loopUrl = playerData.loopUrl;
        
            let player = new Tone.Player(loopUrl).toMaster();
            player.fadeOut = '4n';
            
            this.loopPlayer = new Tone.Event(
                (time, duration) => {player.start(time, 0, duration);},
                this.toneNumBars + Tone.Time('8n')
            );

            this.loopPlayer.loop = this.props.room.numLoops;
            this.loopPlayer.loopStart = 0;
            this.loopPlayer.loopEnd = this.toneNumBars;

            // eslint-disable-next-line react/no-direct-mutation-state
            this.state = { ...this.state, isLoopPlayerSet: true };
        } 
    }

    createAllUserPlayer() {
        // get available audio
        var availableAudio = {};
        var events = {};
        Object.keys(this.props.room.users).map((playerName, i) => {
            let playerData = this.props.room.users[playerName];
            if (playerData.audioUrl != null) {
                availableAudio[playerName] = playerData.audioUrl;
                events[playerName] = [0, playerName];
            }
        });
        // if any at least one exists, put together the Sequence
        if (Object.entries(availableAudio).length > 0) {

            this.userPlayers = new Tone.Players(availableAudio).toMaster();
            this.allUserPlayer = new Tone.Part(
                (time, playerName) => {
                    let p = this.userPlayers.get(playerName);
                    p.start(time, 0, this.toneTotalBars + Tone.Time('4n'));
                }, 
                Object.values(events)
            );
            // eslint-disable-next-line react/no-direct-mutation-state
            this.state = {...this.state, isAllUserPlayerSet: true};
        }
    }

    // -------------------------------------------------------------------------------------
    // Microphone Stuff

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
        if (this.mediaRecorder.state == 'inactive') {
            this.chunks = [];
            this.mediaRecorder.start(5);
            this.setState({ isRecording: true });
        }
    }
    // TODO #55 Combine with stop Recording
    stopRecordingLoop() {
        if (this.mediaRecorder.state == 'recording') {
            this.mediaRecorder.stop();
            this.setState({ isRecording: false });
            this.stopMicrophoneAccess();
            this.saveLoopedAudio();
        }
    }
    
    stopRecording() {
        if (this.mediaRecorder.state == 'recording') {
            this.mediaRecorder.stop();
            this.setState({ isRecording: false });
            this.stopMicrophoneAccess();
            this.saveAudio();
        }
    }
    // TODO: #55 Combine with SaveAudio
    saveLoopedAudio() {
        const blob = new Blob(this.chunks, { type: 'audio/webm;codecs=opus' });
        const audioURL = URL.createObjectURL(blob);
        this.props.uploadLoopedAudio(blob);
        this.setState({
            blobData: blob,
            blobUri: audioURL
        });
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
    // -------------------------------------------------------------------------------------
    // Handlers

    handleToggleClickTrack(event) {
        event.preventDefault();
        this.setState({isClickTrack: !this.state.isClickTrack});
        this.clickTrack.mute = this.state.isClickTrack;
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

        // click track
        this.clickTrack.start('1m').stop(Tone.Time('1m') + this.toneNumBars);
        
        this.startRecordEvent.start('1m');
        this.stopRecordLoopEvent.start(Tone.Time('1m') + this.toneNumBars + Tone.Time('4n'));

        Tone.Transport.start();
    }

    handleRecordOverLoop(event) {
        event.preventDefault();

        // Ask the user to activate their mic
        if (!this.state.hasAccessToMicrophone) {
            this.startMicrophonePermissions();
        }
        Tone.Transport.stop(); // Restart the Transport (probably unnecessary later)
        Tone.Transport.cancel(); 

        // schedule the events
        this.metronome.start(0).stop('1m');

        // click track
        this.clickTrack.start('1m').stop(Tone.Time('1m') + this.toneTotalBars);

        // playback loop and start recording
        this.loopPlayer.start('1m').stop(Tone.Time('1m') + this.toneTotalBars);

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
        this.loopPlayer.start(0).stop(this.toneTotalBars);
        this.allUserPlayer.start(0).stop(this.toneNumBars + Tone.Time('4n'));
        
        Tone.Transport.start();
    }
    // -------------------------------------------------------------------------------------

    render() {
        return (
            <Container fixed>
                {this.props.room.roomCode ? 
                    <Grid container spacing={5}>
                        <Grid item xs={8}>
                            <AudioDisplayTable {...this.props} />
                        </Grid>
                        <Grid item xs={4}>
                            <GameInfoTable {...this.props} />
                            <ChatMessageBox {...this.props} />
                            <Microphone {...this.props} />
                        </Grid>
                        <Grid item>
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
                                    onClick   = {this.handleRecordLoop}
                                    disabled  = {this.state.isRecording}
                                    variant   = "contained"
                                    color     = "primary"
                                    startIcon = {<LoopIcon/>}
                                >
                                    Record a Loop
                                </Button>
                                <Button
                                    onClick   = {this.handleRecordOverLoop}
                                    disabled  = {this.state.isRecording || !this.state.isLoaded || !this.state.isLoopPlayerSet }
                                    variant   = "contained"
                                    color     = "primary"
                                    startIcon = {<MicIcon/>}
                                >
                                    Record over the Loop
                                </Button>
                                <Button
                                    onClick   = {this.handlePlaybackMerged}
                                    disabled  = {this.state.isRecording || !this.state.isLoaded || !this.state.isAllUserPlayerSet}
                                    variant   = "contained"
                                    color     = "secondary"
                                    startIcon = {<LibraryMusicIcon/>}
                                > 
                                    Play back merged Loop and Recording
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                    : <div>Join the room first!</div>}
            </Container>
        );
    }
    componentWillUnmount() {
        Tone.Transport.cancel();
    }
}

export default GamePortalContainer;