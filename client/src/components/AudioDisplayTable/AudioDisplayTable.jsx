import React, { Component } from 'react';
import Tone from 'tone';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import MicIcon from '@material-ui/icons/Mic';

class Microphone extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handlePlayClick = this.handlePlayClick.bind(this);
    }

    handlePlayClick(playerName) {
        new Audio(this.props.room.users[playerName].audioUrl).play();
    }

    render() {
        return (
            <List>
                {Object.keys(this.props.room.users).map((playerName, i) => {
                    let playerData = this.props.room.users[playerName];
                    if (playerData.audioUrl != null) {
                        return(
                            <div key={i}>
                                <ListItem>
                                    <ListItemIcon>
                                        <IconButton
                                            onClick={() => this.handlePlayClick(playerName)}>
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
        )
    }
}

export default Microphone;