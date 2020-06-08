import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import styles from './GameStageStepIconStyles';

function GameStageStepIcon(props) {
    const { classes, active, completed } = props;

    return (
        <div className={clsx(classes.root, {
                [classes.active]: active,
            })}>
            {completed || active ? <MusicNoteIcon className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
}

export default withStyles(styles)(GameStageStepIcon);
