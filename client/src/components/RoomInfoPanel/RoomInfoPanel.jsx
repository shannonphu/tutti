import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import config from '../../config';
import { PlayerAvatar } from '..';
import styles from './RoomInfoPanelStyles';

class RoomInfoPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: ['Allen', 'Shannon', 'Al', 'Sam', 'Y', 'W', 'F', 'G', 'Qu', 'Jo'] // temporary dummy data; replace with this.props.room.players
        };
        this.getExternalRoomUrl = this.getExternalRoomUrl.bind(this);
    }

    getExternalRoomUrl() {
        return `https://${config.client.externalHost}/room/${this.props.room.code}`;
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <h3>Your room:</h3>
                <Grid container>
                    <Grid item xs={6}>
                        <div className={classes.link}>
                            <Link to={`/room/${this.props.room.code}`}>{this.getExternalRoomUrl()}</Link>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <IconButton aria-label='copy' onClick={() => { navigator.clipboard.writeText(`http://localhost:3000/room/${this.props.room.code}`) }}>
                            <FileCopyIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <GridList cellHeight={70} cols={5}>
                    {this.state.players.map((player) => (
                        <GridListTile key={player} cols={1}>
                            <PlayerAvatar {...this.props} name={player} />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        )
    }
}

RoomInfoPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoomInfoPanel);