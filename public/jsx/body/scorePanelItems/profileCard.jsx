import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ProfileImage from '../../../images/profile.JPG';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        maxWidth: 300,
        minHeight: 600
    },
    cardContent: {
        color: '#293239',
        paddingTop: 5
    },
    itemOne: {
    },

    itemSecond: {
        height: 280,
        textAlign: 'left'
    },
    subItem: {
        textAlign: 'left',
        paddingTop: 10,
        paddingLeft: 5,
        fontWeight: 500
    }
});

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

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
                <Item>
                    <Typography gutterBottom variant='h5' component='div'>
            Thathsara Raviraj
                    </Typography>
                </Item>
                <Item className={classes.itemSecond}>
                    <Item className={classes.subItem}>
                        <Typography gutterBottom component='div'>
                        Course: Machine Learning
                        </Typography>
                    </Item>
                    <Item className={classes.subItem}>
                        <Typography gutterBottom component='div'>
                        Username: tudugampal
                        </Typography>
                    </Item>
                    <Item className={classes.subItem}>
                        <Typography gutterBottom component='div'>
                        Total Score: 1200
                        </Typography>
                    </Item>
                    <Item className={classes.subItem}>
                        <Typography gutterBottom component='div'>
                        Final Rank: 20
                        </Typography>
                    </Item>
                </Item>
            </CardContent>
        </Card>
    );
}
