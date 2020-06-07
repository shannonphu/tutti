import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import styles from './NavStyles';

class Nav extends Component {
    render() {
        const { classes } = this.props;
        return (
            <AppBar position='sticky' color='primary'>
                <Toolbar variant='dense'>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <MusicNoteIcon />
                    </IconButton>
                    <Typography variant='h6' color='inherit'>
                        <div className={classes.title}>tut.ti</div>
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

Nav.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);