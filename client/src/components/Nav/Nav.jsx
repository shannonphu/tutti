import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { VolumeSlider } from '..';
import styles from './NavStyles';

class Nav extends Component {
    render() {
        const { classes } = this.props;
        return (
            <AppBar position='sticky' className={classes.root}>
                <Toolbar variant='dense'>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <MusicNoteIcon />
                    </IconButton>
                    <Typography variant='h6' color='inherit'>
                        <Link to='/' className={classes.title}>tut.ti</Link>
                    </Typography>
                    <div className={classes.slider}><VolumeSlider {...this.props} /></div>
                </Toolbar>
            </AppBar>
        )
    }
}

Nav.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);