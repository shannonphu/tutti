import React, { Component } from 'react';
import Tone from 'tone';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { withStyles } from '@material-ui/core/styles';
import styles from './VolumeSliderStyles';

class VolumeSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            volume: 100
        };
        this.handleChange = this.handleChange.bind(this);
        Tone.Master.volume.value = 10;
    }

    handleChange(event, newValue) {
        this.setState({ volume: newValue });

        // Map Slider values [0, 100] to decibel range [-10, 10]
        let newValueDecibels = newValue / 5 - 10;
        Tone.Master.volume.value = newValueDecibels;
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container
                    direction='row'
                    justify='center'
                    alignItems='center'>
                    <Grid item className={classes.volumeIcon}>
                        <VolumeDown />
                    </Grid>
                    <Grid item xs className={classes.sliderGrid}>
                        <Slider className={classes.slider} value={this.state.volume} onChange={this.handleChange} />
                    </Grid>
                    <Grid item className={classes.volumeIcon}>
                        <VolumeUp />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

VolumeSlider.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VolumeSlider);