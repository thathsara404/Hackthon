import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { WebSocket } from '../js/websocketmodule/WebSocket';
import { useSelector } from 'react-redux';
import { getGameRoomConnectedStatus, getNewGameRequests,
    getCurrentGameRequestJoinedUserCount, getUserJoinedStatusInSubRoom } from '../js/redux/selector/gameRoomSelector';
import { DEFAULT_ROOM_NAME } from './const/chatRoomConst';

const GameRoom = ( { title }) => {

    const isGameRoomConnected = useSelector(state => getGameRoomConnectedStatus(state));
    const pendingGameRequests = useSelector(state => getNewGameRequests(state));
    const pendingRequestUserCount = useSelector(state => getCurrentGameRequestJoinedUserCount(state));
    const userJoinedStatusInSubRoom = useSelector(state => getUserJoinedStatusInSubRoom(state));

    useEffect(() => {
        document.title = title;
        // Connect to Game
        if (!isGameRoomConnected) {
            // TODO: Pass the correct User data
            WebSocket.connect('gameSpace', 'thathsara', Math.floor((Math.random() * 100) + 1));
        }
    });

    const sendNewGameRoomRequest = () => {
        // TODO: Plan a good way to generate game room values
        WebSocket.createNewGameRoom('0001', 'beatme', '1000001');
    };

    const joinGame = () => {
        WebSocket.joindNewGameRoom('0001', '1000001');
    };

    const Content = () => {
        if (userJoinedStatusInSubRoom) {
            // Handle sub room question rendering...
            return (<h1>Let the game begin ...</h1>);
        } 
        // Game Room
        if (pendingGameRequests.length === 0) {
            return (<button onClick={sendNewGameRoomRequest}>Create New Game</button>);

        } else if (pendingGameRequests.length === 1 && pendingRequestUserCount <= 5) {
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

