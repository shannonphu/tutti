import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import styles from './RoomInfoPanelStyles';

class RoomInfoPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getExternalRoomUrl = this.getExternalRoomUrl.bind(this);
        this.onCopy = this.onCopy.bind(this);
    }

    getExternalRoomUrl() {
        return `https://tut-ti.herokuapp.com/room/${this.props.room.roomCode}`;
    }

    onCopy() {
        navigator.clipboard.writeText(this.getExternalRoomUrl());
        this.refs.linkTextfield.getElementsByTagName('input')[0].select();
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.roomRoot}>
                <Typography variant='h5' gutterBottom>
                    Your room:
                </Typography>
                <Grid container alignItems='center'>
                    <Grid item xs={10}>
                        <TextField value={this.getExternalRoomUrl()} ref='linkTextfield' className={classes.linkTextfield} />
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton color='primary' aria-label='copy' onClick={this.onCopy}>
                            <FileCopyIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <div className={classes.playerGrid}>
                    <Typography variant='h5' gutterBottom>
                        Players:
                </Typography>
                    <GridList cellHeight={40} cols={3}>
                        {Object.entries(this.props.room.users).map(([player, data]) =>
                            <GridListTile key={player} cols={1} className={classes.gridListTile}>
                                <Chip color='primary' variant='outlined' avatar={<Avatar>{player.charAt(0).toUpperCase()}</Avatar>} label={player} />
                            </GridListTile>
                        )}
                    </GridList>
                </div>
            </Paper>
        )
    }
}

RoomInfoPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoomInfoPanel);