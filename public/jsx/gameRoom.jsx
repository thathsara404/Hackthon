import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { WebSocket } from '../js/websocketmodule/WebSocket';
import { useSelector } from 'react-redux';
import { getGameRoomConnectedStatus, getNewGameRequests } from '../js/redux/selector/gameRoomSelector';

const GameRoom = ( { title }) => {

    const isGameRoomConnected = useSelector(state => getGameRoomConnectedStatus(state));
    const pendingGameRequests = useSelector(state => getNewGameRequests(state));

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
        
    };

    return (
        <>
            <h1>Game Room</h1>
            {pendingGameRequests.length === 0 && <button onClick={sendNewGameRoomRequest}>Create New Game</button>}
            {pendingGameRequests.length === 1 && <button onClick={() => {}}>
                {`Join Game ${pendingGameRequests[0]}`}</button>}
        </>
    );
    
};

GameRoom.propTypes = {
    title: PropTypes.string.isRequired
};

export default GameRoom;

