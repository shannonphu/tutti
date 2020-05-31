import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import config from '../../config';

class RoomInfoPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: ['Allen', 'Shannon'] // temporary dummy data; replace with this.props.room.players
        };
        this.getInternalRoomUrl = this.getInternalRoomUrl.bind(this);
        this.getExternalRoomUrl = this.getExternalRoomUrl.bind(this);
    }

    getInternalRoomUrl() {
        const baseURL = `http://${config.client.internalHost}:${config.client.port}`;
        return `${baseURL}/room/${this.props.room.code}`;
    }

    getExternalRoomUrl() {
        return `https://${config.client.externalHost}/room/${this.props.room.code}`;
    }

    render() {
        return (
            <div>
                <h3>Your room:</h3>
                <div>
                    <Link href={this.getInternalRoomUrl()}>{this.getExternalRoomUrl()}</Link>
                </div>
                <div>
                    <IconButton aria-label='copy' onClick={() => { navigator.clipboard.writeText(this.getInternalRoomUrl()) }}>
                        <FileCopyIcon />
                    </IconButton>
                </div>
                <Button variant='contained' label='Submit' type='submit'>Start</Button>
                <div>
                    {this.state.players.map(player => <li>{player}</li>)}
                </div>
            </div>
        )
    }
}

export default RoomInfoPanel;