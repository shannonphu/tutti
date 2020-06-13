import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
    root: {
        minWidth: 375,
        maxWidth: 375
    },
    media: {
        height: 225,
    },
});

export default function AboutCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia className={classes.media} image={props.imageUrl} />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                        {props.title}
                        {props.githubUrl != null ?
                            <Link href={props.githubUrl} className={classes.link} style={{ float: 'right' }}>
                                <IconButton>
                                    <GitHubIcon />
                                </IconButton>
                            </Link>
                            : null}
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        Roles: {props.roles.map(role => <strong>{role} • </strong>)}
                    </Typography>
                    <Divider style={{ margin: 10 }} />
                    <Typography variant='body2' color='textSecondary' component='p'>
                        {props.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}