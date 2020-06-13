import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import styles from './AboutPageStyles';
import shannonImage from '../../assets/shannon.png';
import allenImage from '../../assets/allen.png';

const useStyles = makeStyles({
    root: {
        minWidth: 345,
        maxWidth: 345
    },
    media: {
        height: 250,
    },
});

function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={props.imageUrl} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {props.title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link href={props.githubUrl} className={classes.link}>
            <IconButton>
                <GitHubIcon />
            </IconButton>
        </Link>
        <Link href={props.linkedInUrl} className={classes.link}>
            <IconButton>
                <LinkedInIcon />
            </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
}

class AboutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owners: [
                {
                    name: 'allen',
                    description: '...but is really a rocket scientist',
                    imageUrl: allenImage,
                    githubUrl: 'https://github.com/BaconPancakes',
                    linkedInUrl: 'https://www.linkedin.com/in/allenzqin'
                },
                {
                    name: 'shannon',
                    description: 'who likes JS anonymous functions',
                    imageUrl: shannonImage,
                    githubUrl: 'https://github.com/shannonphu',
                    linkedInUrl: 'https://www.linkedin.com/in/shannonphu'
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
                        <Typography variant='h2' gutterBottom>
                            Meet the builders
                        </Typography>
                    </Grid>
                    
                    {this.state.owners.map((person) => {
                        return(
                            <Grid item md={4}>
                                <MediaCard title={person.name} description={person.description} imageUrl={person.imageUrl} githubUrl={person.githubUrl} linkedInUrl={person.linkedInUrl} />
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