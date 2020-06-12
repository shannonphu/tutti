import React, { Component } from 'react';
import Tone from 'tone';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AudioWaveform, RecordingSpinIcon } from '..';
import styles from './AudioDisplayTableStyles';
import SILENCE_MP3 from '../../assets/silence.mp3';

class AudioDisplayTable extends Component {
    constructor(props) {
        super(props);
        this.playSelectedAudio = this.playSelectedAudio.bind(this);
        this.stopSelectedAudio = this.stopSelectedAudio.bind(this);
        this.playMergedAudio = this.playMergedAudio.bind(this);
        this.getPlayerList = this.getPlayerList.bind(this);
        this.shouldPanelBeFixed = this.shouldPanelBeFixed.bind(this);
        this.handlePanelChange = this.handlePanelChange.bind(this);

        let availableAudio = {};
        let initExpand = {};
        Object.keys(this.props.room.users).map((playerName, i) => {
            let playerData = this.props.room.users[playerName];
            if (playerData.audioUrl != null) {
                availableAudio[playerName] = playerData.audioUrl;
            }

            initExpand[playerName] = false;
        });

        this.state = {
            isPlayingMerged: false,
            isPlayingSingle: false,
            panelWidth: 500,
            isExpanded: initExpand,
            baselinePlayerSet: (this.props.game.baselinePlayer !== null) 
        };

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
            if (this.props.game.baselinePlayer && playerName == this.props.game.baselinePlayer.playerName) {
                baselinePlayer = user;
            } else if (playerName == this.props.user.playerName) {
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
        if (player.audioUrl && (player.playerName == this.props.game.baselinePlayer.playerName 
            || player.playerName == this.props.user.playerName)) {
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

    render() {
        const { classes } = this.props;
        let baselinePlayer = this.state.baselinePlayerSet ? this.props.game.baselinePlayer : null;
        let loopUrl = this.state.baselinePlayerSet ? this.props.room.users[baselinePlayer.playerName].loopUrl : null;
        return(
            <div width={1}>
                <ExpansionPanel expanded = {true}>
                    <ExpansionPanelSummary>
                        {this.state.baselinePlayerSet ? (baselinePlayer.isRecording ? <RecordingSpinIcon /> : null) : null}
                        {this.state.baselinePlayerSet ? (<Typography>{baselinePlayer.playerName}'s Loop</Typography>) 
                            :  <Typography>Ready to Record Loop~</Typography>}
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <AudioWaveform 
                            audioName = 'Loop'
                            audioUrl={this.state.baselinePlayerSet ? (loopUrl) : SILENCE_MP3}
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
                                expandIcon={(player.audioUrl == undefined || this.shouldPanelBeFixed(player)) ? null : <ExpandMoreIcon />} 
                                onClick={() => this.handlePanelChange(player)}>
                                {player.isRecording ? <RecordingSpinIcon /> : null}
                                <Typography>{player.playerName}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails ref='expansionPanel'>
                                {player.audioUrl != null ?
                                    <AudioWaveform audioName={player.playerName} 
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

export default withStyles(styles)(AudioDisplayTable);