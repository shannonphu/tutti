import React, { Component } from 'react';
import Tone from 'tone';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import StopIcon from '@material-ui/icons/Stop';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import { AudioWaveform, PlayerAvatar } from '..';

class AudioDisplayTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlayingMerged: false,
            isPlayingSingle: false
        };
        this.playSelectedAudio = this.playSelectedAudio.bind(this);
        this.stopSelectedAudio = this.stopSelectedAudio.bind(this);
        this.playMergedAudio = this.playMergedAudio.bind(this);

        let availableAudio = {};
        Object.keys(this.props.room.users).map((playerName, i) => {
            let playerData = this.props.room.users[playerName];
            if (playerData.audioUrl != null) {
                availableAudio[playerName] = playerData.audioUrl;
            }
        });

        this.sequence = null;
        this.player = new Tone.Players(availableAudio, {
            onload: () => {
                this.sequence = new Tone.Sequence((time, note) => {
                    let p = this.player.get(note);
                    p.sync();
                    p.start();
                }, Object.keys(availableAudio), '4n');
                this.sequence.sync();
            }
        }).toMaster();
    }

    playSelectedAudio(playerName) {
        Tone.Transport.start();
        this.player.get(playerName).start();
        this.setState({ isPlayingSingle: true });
    }

    stopSelectedAudio(playerName) {
        this.player.get(playerName).stop();
        Tone.Transport.stop();
        this.setState({ isPlayingSingle: false });
    }

    playMergedAudio() {
        if (this.state.isPlayingMerged) {
            this.sequence.stop(this.sequence.length);
            Tone.Transport.stop();
        } else {
            Tone.Transport.start();
            this.sequence.start();
        }

        this.setState({ isPlayingMerged: !this.state.isPlayingMerged });
    }

    render() {
        return (
            <Grid container spacing={10}>
                {Object.keys(this.props.room.users).map((playerName, i) => {
                    let playerData = this.props.room.users[playerName];
                    if (playerData.audioUrl != null) {
                        return (
                            <Grid container 
                                direction="row"
                                justify="center"
                                alignItems="center" 
                                key={i}>
                                <Grid item xs={1}>
                                    <div><PlayerAvatar name={playerName} /></div>
                                    <IconButton onClick={() => this.playSelectedAudio(playerName)}>
                                        <PlayCircleFilledIcon />
                                    </IconButton>
                                    <IconButton onClick={() => this.stopSelectedAudio(playerName)}>
                                        <StopIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={11}>
                                    <Paper><AudioWaveform audioName={playerName} audioUrl={playerData.audioUrl} height={100} shouldShowControls={false} /></Paper>
                                </Grid>
                            </Grid>)
                    }
                })}
                <IconButton
                    onClick={this.playMergedAudio}>
                    <PlayCircleFilledIcon /> Merged
                </IconButton>
            </Grid>)
    }
}

export default AudioDisplayTable;