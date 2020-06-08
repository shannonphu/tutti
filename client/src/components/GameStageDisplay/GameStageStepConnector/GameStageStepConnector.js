import StepConnector from '@material-ui/core/StepConnector';
import { withStyles } from '@material-ui/core/styles';

const GameStageStepConnector = withStyles((theme) => ({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: theme.palette.primary.extraLight,
        },
    },
    completed: {
        '& $line': {
            borderColor: theme.palette.primary.extraLight,
        },
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}))(StepConnector);

export default GameStageStepConnector;