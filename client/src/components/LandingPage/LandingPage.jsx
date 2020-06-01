import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import theLick from '../../assets/transparent_lick.png';
import { TextField } from '@material-ui/core';

const styles = {
    root: {
        flexGrow: 1,
    },
    image: {
        backgroundImage: `url(${theLick})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '90%',
        backgroundColor: '#434343ff',
        backgroundPosition: 'center center',
    },
    paper: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        minHeight: '100vh',
    },
};

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    submitHandler(event) {
        event.preventDefault();
    }

    render() {
        const { classes } = this.props; // paradigm for styling
        return (
            <Grid container 
                component="main"
                className={classes.root}
            >
                <CssBaseline/>
                <Grid item xs={12} sm={8} md={5} 
                    component={Paper}
                    variant="outlined"
                    square
                >
                    <Grid container
                        spacing={3}
                        direction="column"
                        minHeight="100vh"
                        alignItems="center"
                        justify="center"
                        className={classes.container}
                    >
                        <Grid item>
                            <form
                                noValidate
                                onSubmit={this.submitHandler}
                            > 
                                <Grid container
                                    spacing={2}
                                    direction="column"
                                    alignItems="center"   
                                >
                                    <Grid item>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Name"
                                            autoComplete="off"
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                        >
                                    Join Room
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                        <Grid item>
                            <Button
                                type="button"
                                variant="contained"
                            >
                        Create Private Room
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={false} sm={4} md ={7} className={classes.image} />
            </Grid>
        );
    }
}

export default withStyles(styles)(LandingPage);