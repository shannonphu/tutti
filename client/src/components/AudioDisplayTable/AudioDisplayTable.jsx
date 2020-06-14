import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Tone from 'tone';
import { AudioWaveform, RecordingSpinIcon } from '..';
import { GAME_STAGE } from '../../utils/stateEnums';
import styles from './AudioDisplayTableStyles';
import StopIcon from '@material-ui/icons/Stop';

class AudioDisplayTable extends Component {
    constructor(props) {
        super(props);
        this.playSelectedAudio = this.playSelectedAudio.bind(this);
        this.stopSelectedAudio = this.stopSelectedAudio.bind(this);
        this.playMergedAudio = this.playMergedAudio.bind(this);
        this.getPlayerList = this.getPlayerList.bind(this);
        this.shouldPanelBeFixed = this.shouldPanelBeFixed.bind(this);
        this.handlePanelChange = this.handlePanelChange.bind(this);
        this.LoopExpansionPanelSummary = this.LoopExpansionPanelSummary.bind(this);
        this.handleOnClickRecord = this.handleOnClickRecord.bind(this);
        this.handleOnClickPlay = this.handleOnClickPlay.bind(this);
        this.handleOnClickStop = this.handleOnClickStop.bind(this);
        this.recordTooltip = this.recordTooltip.bind(this);
        this.stopTooltip = this.stopTooltip.bind(this);
        this.playbackTooltip = this.playbackTooltip.bind(this);

        let availableAudio = {};
        let initExpand = {};
        Object.keys(this.props.room.users).map((playerName, i) => {
            let playerData = this.props.room.users[playerName];
            if (playerData.audioUrl !== null) {
                availableAudio[playerName] = playerData.audioUrl;
            }

            initExpand[playerName] = false;
        });

        this.state = {
            isPlayingMerged: false,
            isPlayingSingle: false,
            panelWidth: 500,
            isExpanded: initExpand,
            isPlaying: false
        };

        this.baselinePlayer = this.props.game.baselinePlayer;
        if (this.props.game.baselinePlayer !== null) {
            this.loopUrl = this.props.room.users[this.baselinePlayer.playerName].loopUrl;
        }
        else {
            this.loopUrl = null;
        }
        
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
        let baselinePlayer = null;
        let currPlayer = null;

        Object.keys(this.props.room.users).forEach((playerName) => {
            const user = {
                ...this.props.room.users[playerName],
                playerName
            };
            if (this.props.game.baselinePlayer && playerName === this.props.game.baselinePlayer.playerName) {
                baselinePlayer = user;
            } else if (playerName === this.props.user.playerName) {
                currPlayer = user;
            } else {
                playerList.push(user);
            }
        });

        if (baselinePlayer) {
            // Move baseline player to front of list
            playerList.unshift(baselinePlayer);
        }
        
        if (currPlayer) {
            // Move curr player to end of list
            playerList.push(currPlayer);
        }
        
        return playerList;
    }

    shouldPanelBeFixed(player) {
        if (player.audioUrl && (player.playerName === this.props.game.baselinePlayer.playerName 
            || player.playerName === this.props.user.playerName)) {
            return true;
        } else {
            return false;
        }
    }

    handlePanelChange(player) {
        let newIsExpanded = {
            ...this.state.isExpanded,
            [player.playerName]: !this.state.isExpanded[player.playerName]
        };
        this.setState({
            isExpanded: newIsExpanded
        });
    }

    handleOnClickRecord(event) {
        event.preventDefault();
        this.props.recordLoopFunction();
    }

    handleOnClickPlay(event) {
        event.preventDefault();
        this.setState({isPlaying: true});

        this.props.playLoopFunction();
    }

    handleOnClickStop(event) {
        event.preventDefault();
        this.setState({isPlaying: false});

        Tone.Transport.stop();
    }

    recordTooltip() {
        const { theme } = this.props;
        return(
            <Tooltip title="Record a Loop" placement="top">
                <IconButton onClick={this.handleOnClickRecord} style={{ padding: 0 }}>
                    <FiberManualRecordIcon style={{ fill: theme.palette.error.main }}/>
                </IconButton>
            </Tooltip>
        );
    }

    playbackTooltip() {
        return(
            <Tooltip title={this.props.isLoopPlayerSet ? 'play back the loop' : 'record a loop first'} placement="top">
                <span>
                    <IconButton 
                        color='primary'
                        disabled = {!this.props.isLoopPlayerSet}
                        onClick={this.handleOnClickPlay}
                        style={{ padding: 0 }}
                    >
                        <PlayArrowIcon />
                    </IconButton>
                </span>
            </Tooltip>
        );
    }
    stopTooltip() {
        return(
            <Tooltip title= 'stop playback' placement="top">
                <IconButton 
                    color='secondary'
                    onClick={this.handleOnClickStop}
                    style={{ padding: 0 }}
                >
                    <StopIcon />
                </IconButton>
            </Tooltip>
        );
    }

    LoopExpansionPanelSummary() {
        switch (this.props.game.stage) {
            case GAME_STAGE.BASELINE_PLAYER_RECORDING:
                return (
                    <ExpansionPanelSummary> 
                        <Typography>
                            {this.props.isRecording ? <IconButton style={{ padding: 0 }} disabled><RecordingSpinIcon /></IconButton> : this.recordTooltip()}
                            {this.state.isPlaying ? this.stopTooltip() : this.playbackTooltip()}
                        </Typography>
                    </ExpansionPanelSummary>
                );
            default:
                return (
                    <ExpansionPanelSummary>
                        {this.baselinePlayer !== null ? (<Typography>{this.baselinePlayer.playerName}'s Loop</Typography>) 
                            :  <Typography>Ready to Record Loop~</Typography>}
                    </ExpansionPanelSummary>
                );
        }
    }

    render() {
        return(
            <div width={1}>
                <ExpansionPanel expanded={true}>
                    {this.LoopExpansionPanelSummary()}
                    <ExpansionPanelDetails>
                        <AudioWaveform
                            {...this.props}
                            audioName = 'Loop'
                            audioUrl={this.props.isLoopPlayerSet ? (this.loopUrl) : 'Loop'}
                            height={100}
                            width={this.state.panelWidth}
                            shouldShowControls={false}
                        />
                    </ExpansionPanelDetails>

                </ExpansionPanel>
                {this.getPlayerList().map((player, i) => {
                    return(
                        <ExpansionPanel key={i} expanded={this.shouldPanelBeFixed(player) || this.state.isExpanded[player.playerName]}>
                            <ExpansionPanelSummary 
                                expandIcon={(player.audioUrl === undefined || this.shouldPanelBeFixed(player)) ? null : <ExpandMoreIcon />} 
                                onClick={() => this.handlePanelChange(player)}>
                                {player.isRecording ? <RecordingSpinIcon /> : null}
                                <Typography>{player.playerName}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails ref='expansionPanel'>
                                {(player.audioUrl !== null) && (player.audioUrl !== undefined)
                                    ? <AudioWaveform audioName={player.playerName} 
                                        audioUrl={player.audioUrl} 
                                        height={100} 
                                        width={this.state.panelWidth} 
                                        shouldShowControls={false} /> 
                                    : null}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    );
                })}
            </div>
        );
    }
}

AudioDisplayTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withTheme(withStyles(styles)(AudioDisplayTable));