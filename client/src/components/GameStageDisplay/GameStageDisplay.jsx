import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import GameStageStepIcon from './GameStageStepIcon/GameStageStepIcon';
import GameStageStepConnector from './GameStageStepConnector/GameStageStepConnector';
import styles from './GameStageDisplayStyles';

class GameStageDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const steps = this.props.steps;
        const activeStep = this.props.activeStep;

        const { classes } = this.props;
        return (
            <div>
                <Stepper alternativeLabel activeStep={activeStep} connector={<GameStageStepConnector />} className={classes.stageRoot}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={GameStageStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
        </div>
        )
    }
}

GameStageDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameStageDisplay);