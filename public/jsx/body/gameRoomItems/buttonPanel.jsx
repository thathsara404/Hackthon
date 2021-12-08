import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import UUID from 'uuid';
import { WebSocket } from '../../../js/websocketmodule/WebSocket';
import { getNewGameRequests,
    getCurrentGameRequestJoinedUserCount,
    getCurrentGameRoomId, getUserJoinedStatusInSubRoom,
    getGameStartedStatus } from '../../../js/redux/selector/gameRoomSelector';
const useStyles = makeStyles({
    customButton: {
        backgroundColor: '#1b598a',
        height: 50,
        width: 130
    }
});
import { QUESTION_SETTINGS } from '../../../../app/config/config';

export default function Buttonpanel () {

    const pendingGameRequests = useSelector(state => getNewGameRequests(state));
    const pendingRequestUserCount = useSelector(state => getCurrentGameRequestJoinedUserCount(state));
    const currentGameRoomId = useSelector(state => getCurrentGameRoomId(state));
    const isUserConnectedToGame = useSelector(state => getUserJoinedStatusInSubRoom(state));
    const isGameStarted = useSelector(state => getGameStartedStatus(state));

    const joinGame = () => {
        WebSocket.joindNewGameRoom(currentGameRoomId, '1000001');
    };

    const sendNewGameRoomRequest = () => {
        // TODO: Get the couse Id from user info (that should be available in the redux store under user info)
        const courseId = '00001';
        const courseName = 'Brain Science';
        const userId = '1000001';
        WebSocket.createNewGameRoom(`${ UUID.v4()}-$-${courseId}`, courseName, userId);
    };

    // Style
    const classes = useStyles();
    return (
        /*
         * <Box sx={{ position: 'absolute', bottom: 50, disply: 'fex', flexDirection: 'row' }}>
         * </Box>
         */
        <Stack spacing={2} direction='row' sx={{ paddingTop: 5 }}>
            
            {/* Create Game Button Logic*/}
            {pendingGameRequests.length === 0 && !isGameStarted && !isUserConnectedToGame &&
            <Button onClick={sendNewGameRoomRequest} className={classes.customButton}
                variant='contained'>Create</Button>}
            {/* Join Game Button Logic*/}
            {
                pendingGameRequests.length === 1 && 
                pendingRequestUserCount <= QUESTION_SETTINGS.NUM_OF_USERS_PER_GAME && !isUserConnectedToGame &&
                <Button className={classes.customButton} onClick={joinGame} variant='contained'>Join</Button>
            }
            {
                isUserConnectedToGame && !isGameStarted && 
                <Typography gutterBottom variant='body1' component='div'>
                    {`${pendingRequestUserCount <
                        QUESTION_SETTINGS.NUM_OF_USERS_PER_GAME ?
                        'Please wait until others are joining ... ' + '(' + pendingRequestUserCount +
                         '/' + QUESTION_SETTINGS.NUM_OF_USERS_PER_GAME + ')' :
                        'All joined. Get ready for the game ...'}`}
                </Typography>
            }
            
        </Stack>
    );
}
