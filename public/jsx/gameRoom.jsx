import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { WebSocket } from '../js/websocketmodule/WebSocket';
import { useSelector } from 'react-redux';
import { getGameRoomConnectedStatus } from '../js/redux/selector/gameRoomSelector';

const GameRoom = ( { title }) => {

    const isGameRoomConnected = useSelector(state => getGameRoomConnectedStatus(state));

    useEffect(() => {
        document.title = title;
        // Connect to Game
        if (!isGameRoomConnected) {
            WebSocket.connect('gameSpace', 'thathsara', Math.floor((Math.random() * 100) + 1));
        }
    });

    return (
        <>
            <h1>Game Room</h1>
        </>
    );
    
};

GameRoom.propTypes = {
    title: PropTypes.string.isRequired
};

export default GameRoom;

