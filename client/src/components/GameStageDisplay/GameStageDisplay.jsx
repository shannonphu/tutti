import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import GameStageStepIcon from './GameStageStepIcon/GameStageStepIcon';
import GameStageStepConnector from './GameStageStepConnector/GameStageStepConnector';
import styles from './GameStageDisplayStyles';
import Game from '../../utils/GameModel';

function getSteps() {
    return Game.Progression.map((s) => s.name);
}

function getStepContent(step) {
    return Game.Progression[step].name;
}

class GameStageDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = { activeStep: 0 };
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleNext() {
        this.setState({ activeStep: this.state.activeStep + 1 })
    };

    handleBack() {
        this.setState({ activeStep: this.state.activeStep - 1 })
    };

    handleReset() {
        this.setState({ activeStep: 0 })
    };

    render() {
        const steps = getSteps();

        const { classes } = this.props;
        return (
            <div>
                <Stepper component={(props) => <Paper variant='outlined' {...props} />} alternativeLabel activeStep={this.state.activeStep} connector={<GameStageStepConnector />}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={GameStageStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <div>
                    {this.state.activeStep === steps.length ? (
                        <div>
                            <Typography>
                                All steps completed - youre finished
                            </Typography>
                            <Button onClick={this.handleReset}>
                                Reset
                            </Button>
                        </div>
                    ) : (
                        <div>
                                <Typography>{getStepContent(this.state.activeStep)}</Typography>
                            <div>
                                <Button disabled={this.state.activeStep === 0} onClick={this.handleBack}>
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}>
                                    {this.state.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
        </div>
        )
    }
}

GameStageDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameStageDisplay);