import React, { Component } from 'react';
import Tone from 'tone';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

class AudioDisplayTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlayingMerged: false,
            isPlayingSingle: false
        };
        this.playSelectedAudio = this.playSelectedAudio.bind(this);
        this.playMergedAudio = this.playMergedAudio.bind(this);

        this.waveform = new Tone.Waveform();

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
        if (this.state.isPlayingSingle) {
            this.player.get(playerName).stop();
            Tone.Transport.stop();
        } else {
            Tone.Transport.start();
            this.player.get(playerName).start();
        }
        
        this.setState({ isPlayingSingle: !this.state.isPlayingSingle });
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
            <div>
                <IconButton
                    onClick={this.playMergedAudio}>
                    <PlayCircleFilledIcon /> Merged
                </IconButton>
                <List>
                    {Object.keys(this.props.room.users).map((playerName, i) => {
                        let playerData = this.props.room.users[playerName];
                        if (playerData.audioUrl != null) {
                            return (
                                <div key={i}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <IconButton
                                                onClick={() => this.playSelectedAudio(playerName)}>
                                                <PlayCircleFilledIcon />
                                            </IconButton>
                                        </ListItemIcon>
                                        <ListItemText primary={playerName} />
                                    </ListItem>
                                    <Divider />
                                </div>
                            )
                        }
                    })}
                </List>
            </div>
        )
    }
}

export default AudioDisplayTable;