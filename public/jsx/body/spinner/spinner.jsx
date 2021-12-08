import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { makeStyles } from '@mui/styles';
import propTypes from 'prop-types';

const useStyles = makeStyles({
});

export default function Spinner ({ type }) {

    useEffect(() => {
    });

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress color={type}/>
        </Box>
    );
}

Spinner.propTypes = {
    type: propTypes.string.isRequired
};
