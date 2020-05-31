import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import config from '../../config';
const serverBaseURL = `http://${config.server.host}:${config.server.port}`;

class RoomInfoPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: ['Allen', 'Shannon'] // temporary dummy data; replace with this.props.room.players
        };
        this.getRoomUrl = this.getRoomUrl.bind(this);
    }

    getRoomUrl() {
        return `${serverBaseURL}/room/${this.props.room.code}`;
    }

    render() {
        return (
            <div>
                <h3>Your room:</h3>
                <div>{this.getRoomUrl()}</div>
                <Button variant='contained' label='Submit' type='submit'>Start</Button>
                {this.state.players.map(player => <li>{player}</li>)}
            </div>
        )
    }
}

export default RoomInfoPanel;