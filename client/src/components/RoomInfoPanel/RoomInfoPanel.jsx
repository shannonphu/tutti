import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
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
        this.state = {};
        this.getExternalRoomUrl = this.getExternalRoomUrl.bind(this);
    }

    getExternalRoomUrl() {
        return `https://${config.client.externalHost}/room/${this.props.room.roomCode}`;
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <h3>Your room:</h3>
                <Grid container>
                    <Grid item xs={6}>
                        <div className={classes.link}>
                            <Link to={`/room/${this.props.room.roomCode}`}>{this.getExternalRoomUrl()}</Link>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <IconButton aria-label='copy' onClick={() => { navigator.clipboard.writeText(`http://localhost:3000/room/${this.props.room.roomCode}`) }}>
                            <FileCopyIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <GridList cellHeight={40} cols={3}>
                    {Object.entries(this.props.room.users).map(([player, data]) => 
                        <GridListTile key={player} cols={1} className={classes.gridListTile}>
                            <Chip className={classes.navyChip} variant='outlined' avatar={<Avatar>{player.charAt(0).toUpperCase()}</Avatar>} label={player} />
                        </GridListTile>    
                    )}
                </GridList>
            </div>
        )
    }
}

RoomInfoPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoomInfoPanel);