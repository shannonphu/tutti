import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/Button';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import styles from './RecordingSpinIconStyles';

class RecordingSpinIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { classes, theme } = this.props;

        return(
            <div>
                <FiberManualRecordIcon style={{ fill: theme.palette.error.main }} />
                <CircularProgress size={24} className={classes.progress} />
            </div>
        )
    }
}

RecordingSpinIcon.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withTheme(withStyles(styles)(RecordingSpinIcon));