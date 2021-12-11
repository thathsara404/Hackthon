import * as React from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ProfileImage from '../../../images/profile.JPG';
import { getUserDetails } from '../../../js/redux/selector/userSelector';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        maxWidth: 300,
        minHeight: 600
    },
    cardContent: {
        color: '#1c465a',
        paddingTop: 5
    },
    itemOne: {
    },

    itemSecond: {
        height: 270,
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
    const userDetails = useSelector(state => getUserDetails(state));
    // Style
    const classes = useStyles();
    
    return (
        userDetails && <Card className={classes.root}>
            <CardMedia
                component='img'
                height='250'
                image={ProfileImage}
                alt='profile picture'
            />
            <CardContent >
                <Item>
                    <Typography sx={{ color: '#1c465a' }} gutterBottom variant='h5' component='div'>
                        { userDetails.firstName + ' ' + userDetails.lastName }
                    </Typography>
                </Item>
                <Item className={classes.itemSecond}>
                    <Item className={classes.subItem}>
                        <Typography sx={{ color: '#1e252b' }} gutterBottom component='div'>
                            Course: { userDetails.courseName }
                        </Typography>
                    </Item>
                    <Item className={classes.subItem}>
                        <Typography sx={{ color: '#1e252b' }} gutterBottom component='div'>
                        First Name: { userDetails.firstName }
                        </Typography>
                    </Item>
                    <Item className={classes.subItem}>
                        <Typography sx={{ color: '#1e252b' }} gutterBottom component='div'>
                        Last Name: { userDetails.lastName }
                        </Typography>
                    </Item>
                    <Item className={classes.subItem}>
                        <Typography sx={{ color: '#1e252b' }} gutterBottom component='div'>
                        Total Score: 1200
                        </Typography>
                    </Item>
                    <Item className={classes.subItem}>
                        <Typography sx={{ color: '#1e252b' }} gutterBottom component='div'>
                        Final Rank: 20
                        </Typography>
                    </Item>
                </Item>
            </CardContent>
        </Card>
    );
}
