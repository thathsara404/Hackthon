import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ProfileImage from '../../../images/profile.JPG';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        maxWidth: 300,
        minHeight: 600
    },
    cardContent: {
        color: '#293239',
        padding: 5
    }
});

export default function ProfileCard () {

    // Style
    const classes = useStyles();
    
    return (
        <Card className={classes.root}>
            <CardMedia
                component='img'
                height='250'
                image={ProfileImage}
                alt='profile picture'
            />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant='h5' component='div'>
            Thathsara Raviraj
                </Typography>
                <Typography variant='body2' color='text.secondary'>
            ...
                </Typography>
            </CardContent>
        </Card>
    );
}
