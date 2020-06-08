import React, { Component } from 'react';
import Tone from 'tone';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import StopIcon from '@material-ui/icons/Stop';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AudioWaveform, PlayerAvatar } from '..';

class AudioDisplayTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlayingMerged: false,
            isPlayingSingle: false,
            panelWidth: 500,
        };
        this.playSelectedAudio = this.playSelectedAudio.bind(this);
        this.stopSelectedAudio = this.stopSelectedAudio.bind(this);
        this.playMergedAudio = this.playMergedAudio.bind(this);
        this.getPlayerList = this.getPlayerList.bind(this);

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

    componentDidMount() {
        const computedStyle = window.getComputedStyle(this.refs.expansionPanel);
        this.setState({ panelWidth: this.refs.expansionPanel.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight) });
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

    getPlayerList() {
        let playerList = [];

        Object.keys(this.props.room.users).forEach((playerName) => {
            const user = {
                ...this.props.room.users[playerName],
                playerName
            };
            if (this.props.game.baselinePlayer && playerName == this.props.game.baselinePlayer.playerName) {
                playerList.unshift(user);
            } else {
                playerList.push(user);
            }
        });
        console.log(playerList)
        return playerList;
    }

    render() {
        console.log(this.state.panelWidth);

        return(
            <div width={1}>
                {this.getPlayerList().map((player, i) => {
                    console.log(player);
                    return(
                        <ExpansionPanel key={i}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography>{player.playerName}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails ref='expansionPanel'>
                                {player.audioUrl != null ? <AudioWaveform audioName={player.playerName} audioUrl={player.audioUrl} height={100} width={this.state.panelWidth} shouldShowControls={false} /> : null}
                                {/* <Typography>
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
                                            {player.audioUrl != null ? <Paper><AudioWaveform audioName={player.playerName} audioUrl={player.audioUrl} height={100} shouldShowControls={false} /></Paper> : null}
                                        </Grid>
                                    </Grid>
                                </Typography> */}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    );
                })}
            </div>
        )
        /*
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
                <Button color='primary' onClick={this.playMergedAudio} endIcon={<PlayCircleFilledIcon fontSize='small' />}>Merged</Button>
            </Grid>)
            */
    }
}

export default AudioDisplayTable;