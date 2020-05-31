import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import config from '../../config';
import { PlayerAvatar } from '..';

class RoomInfoPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: ['Allen', 'Shannon', 'Al', 'Sam', 'Y', 'W', 'F', 'G', 'Qu', 'Jo'] // temporary dummy data; replace with this.props.room.players
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
                    <GridList cellHeight={50} cols={6}>
                        {this.state.players.map((player) => (
                            <GridListTile key={player} cols={1}>
                                <PlayerAvatar {...this.props} name={player} />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </div>
        )
    }
}

export default RoomInfoPanel;