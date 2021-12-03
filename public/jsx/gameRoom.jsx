import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const GameRoom = ( { title }) => {
    useEffect(() => {
        document.title = title;
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

