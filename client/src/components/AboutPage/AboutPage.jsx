import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AboutCard from './AboutCard';
import styles from './AboutPageStyles';
import shannonImage from '../../assets/shannon.png';
import allenImage from '../../assets/allen.png';

class AboutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owners: [
                {
                    name: 'allen',
                    roles: ['Dynamic Division Engineer', 'Global Interactions Supervisor', 'Senior Integration Specialist', 'Senior Marketing Analyst'],
                    description: 'Allen is a Guidance, Navigation, and Control (GNC) engineer, with expertise in boost ascent guidance, INS/GPS navigation systems, multi-modality sensor fusion, and aircraft/spacecraft attitude controls. He specializes in 6-DOF dynamic simulation architecture and high-fidelity physics-based modeling.',
                    quote: 'It\'s not rocket science',
                    imageUrl: allenImage,
                    githubUrl: null
                },
                {
                    name: 'shannon',
                    roles: ['Principal Communications Executive', 'Corporate Applications Designer', 'Deployment Operations Architect'],
                    description: 'Shannon specializes in graph mining and modelling, machine learning model evaluation techniques, big data analytics, real-time computer vision algorithms, and content-based and collaborative filtering recommendation systems. Outside of also being a full-stack web developer, she is additionally an expert in mobile application development. Sadly she does not play any musical instrument.',
                    imageUrl: shannonImage,
                    githubUrl: 'https://github.com/shannonphu'
                }
            ]
        };
    }

    render() {
        const { classes } = this.props;

        return (
            <Container>
                <Grid container
                    className={classes.root}
                    spacing={3}
                    justify='center'
                    alignItems='center'
                >
                    <Grid item md={4}>
                        <Typography variant='h2'>
                            What is tutti?
                        </Typography>
                    </Grid>
                    <Grid item md={8}>
                        <Typography variant='overline'>
                            We want to <strong>synergize musical communities</strong> and <strong>deliver innovative functionalities</strong> by <strong>architecting revolutionary applications</strong> to <strong>streamline real-time platforms</strong> and <strong>syndicate cutting-edge compositions</strong>.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container 
                    className={classes.root} 
                    spacing={3} 
                    justify='center'
                    alignItems='center'
                >
                    <Grid item md={4}>
                        <Typography variant='h2' gutterBottom>
                            Meet the founders
                        </Typography>
                    </Grid>
                    {this.state.owners.map((person) => {
                        return(
                            <Grid item md={4}>
                                <AboutCard 
                                    title={person.name} 
                                    roles={person.roles} 
                                    description={person.description} 
                                    imageUrl={person.imageUrl} 
                                    githubUrl={person.githubUrl} 
                                    linkedInUrl={person.linkedInUrl} 
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        ); 
    }
}

AboutPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AboutPage);