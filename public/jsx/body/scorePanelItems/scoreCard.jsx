import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ScoreCardContent from './scoreCardContent';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        maxWidth: 'auto',
        minHeight: 600
    },
    cardMedia: {
    },
    cardContent: {
        color: '#293239',
        padding: 5
    }
});

export default function ScoreCard () {

    // Style
    const classes = useStyles();
    
    return (
        <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant='h5' component='div'>
                    Score Board
                </Typography>
                <FormControlLabel
                    value='start'
                    control={<Switch color='primary' />}
                    label='My Last Session'
                    labelPlacement='start'
                />
                <ScoreCardContent/>
            </CardContent>
        </Card>
    );
}
