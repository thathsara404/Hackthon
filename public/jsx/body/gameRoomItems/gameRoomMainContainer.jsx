import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Instructions from './instructions';
import Buttonpanel from './buttonPanel';

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

export default function GameRoomMainContainer () {

    // Style
    const classes = useStyles();
    
    return (
        <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
                <Instructions/>
                <Buttonpanel/>
            </CardContent>
        </Card>
    );
}
