import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { WebSocket } from '../../../js/websocketmodule/WebSocket';
import { useSelector } from 'react-redux';
import UUID from 'uuid';
import { getGameRoomConnectedStatus, getNewGameRequests,
    getCurrentGameRequestJoinedUserCount, getUserJoinedStatusInSubRoom,
    getCurrentGameRoomId, getGameStartedStatus, getUserDetails } from '../../../js/redux/selector/gameRoomSelector';
import { DEFAULT_SOCKET_ROOM } from '../../../../app/config/config';
import QuestionLoader from './questionLoader';
import { QUESTION_SETTINGS } from '../../../../app/config/config';

const GameRoom = ( { title }) => {

    const isGameRoomConnected = useSelector(state => getGameRoomConnectedStatus(state));
    const pendingGameRequests = useSelector(state => getNewGameRequests(state));
    const pendingRequestUserCount = useSelector(state => getCurrentGameRequestJoinedUserCount(state));
    const userJoinedStatusInSubRoom = useSelector(state => getUserJoinedStatusInSubRoom(state));
    const currentGameRoomId = useSelector(state => getCurrentGameRoomId(state));
    const gameStartedStatus = useSelector(state => getGameStartedStatus(state));
    const userDetails = useSelector(state => getUserDetails(state))

    useEffect(() => {
        document.title = title;
        // Connect to Game
        if (!isGameRoomConnected) {
            // TODO: Pass the correct User data
            WebSocket.connect(DEFAULT_SOCKET_ROOM, userDetails.username, userDetails.userId);
        }
    });

    const sendNewGameRoomRequest = () => {
        // TODO: Get the couse Id from user info (that should be available in the redux store under user info)
        const courseId = userDetails.courseID;
        const courseName = userDetails.courseName;
        const userId = userDetails.userId;
        WebSocket.createNewGameRoom(`${ UUID.v4()}-$-${courseId}`, courseName, userId);
    };

    const joinGame = () => {
        WebSocket.joindNewGameRoom(currentGameRoomId, userDetails.userId);
    };

    const Content = () => {
        if (userJoinedStatusInSubRoom) {
            // Handle sub room question rendering...
            if (gameStartedStatus) {
                return (
                    <>
                        <h1>Game Started ...</h1>
                        <QuestionLoader/>
                    </>
                );
            }
            return (<h1>Let the game begin ...</h1>);
        } 
        // Game Room
        if (pendingGameRequests.length === 0) {
            return (<button onClick={sendNewGameRoomRequest}>Create New Game</button>);

        } else if (pendingGameRequests.length === 1 && pendingRequestUserCount <= QUESTION_SETTINGS) {
            return (<button onClick={joinGame}>
                {`Join Game ${pendingGameRequests[0]}`}</button>);
        } 
        return (<h1>Loading ....</h1>);
        
    };

    return (
        <>
            <Content />
        </>
    );
    
};

GameRoom.propTypes = {
    title: PropTypes.string.isRequired
};

export default GameRoom;

