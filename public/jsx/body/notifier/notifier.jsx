import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { getGameRoomConnectedStatus, getGameStartedStatus } from '../../../js/redux/selector/gameRoomSelector';

const MyApp = () => {

    const { enqueueSnackbar } = useSnackbar();
    const isGameRoomConnected = useSelector(state => getGameRoomConnectedStatus(state));

    const displayMessage = (message, variant) => {
        enqueueSnackbar(message, { variant });
    };

    useEffect(() => {
        if (isGameRoomConnected) {
            displayMessage('You connected to the game room.', 'default');
        }
    }, [isGameRoomConnected]);

    /*
     * If (isGameRoomConnected) {
     *     displayMessage('You connected to the game room.');
     * }
     */
    return (
        <>
        </>
    );
};

export default function Notifier () {
    
    return (
        <SnackbarProvider maxSnack={3}>
            <MyApp />
        </SnackbarProvider>
    );
}
