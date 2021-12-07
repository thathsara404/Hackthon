import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Instructions from './instructions';
import Buttonpanel from './buttonPanel';
import { useSelector } from 'react-redux';
import { getGameRoomConnectedStatus, getGameStartedStatus } from '../../../js/redux/selector/gameRoomSelector';
import { DEFAULT_SOCKET_ROOM } from '../../../../app/config/config';
import { WebSocket } from '../../../js/websocketmodule/WebSocket';

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

    const isGameRoomConnected = useSelector(state => getGameRoomConnectedStatus(state));

    useEffect(() => {
        // Connect to the game
        if (!isGameRoomConnected) {
            // TODO: Pass the correct User data
            WebSocket.connect(DEFAULT_SOCKET_ROOM, 'thathsara', Math.floor((Math.random() * 100) + 1));
        }
    });

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
