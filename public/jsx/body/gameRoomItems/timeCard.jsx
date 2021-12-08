import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import propTypes from 'prop-types';

export default function TimeCard ({ timeRemaining }) {
    return (
        <Card sx={{ width: 100, height: 100, marginLeft: 5 }}>
            <CardContent>
                <Typography variant='h2' sx={{ textAlign: 'center' }}>
                    {timeRemaining }
                </Typography>
            </CardContent>
        </Card>
    );
}

TimeCard.propTypes = {
    timeRemaining: propTypes.string.isRequired
};
