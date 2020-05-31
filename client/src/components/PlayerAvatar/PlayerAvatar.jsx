import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import styles from './PlayerAvatarStyles';

class PlayerAvatar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Avatar className={classes.purple}>{this.props.name.charAt(0).toUpperCase()}</Avatar>
            </div>
        )
    }
}

PlayerAvatar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayerAvatar);