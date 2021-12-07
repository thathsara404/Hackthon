import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// eslint-disable-next-line react/prop-types
export default function QuestionCard ({ currentQuestion }) {
    return (
        <Card sx={{ width: 900, marginTop: 10 }}>
            <CardContent>
                <Typography variant='body1' dangerouslySetInnerHTML={{ __html: currentQuestion }}
                    sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='large'>Submit Your Answer</Button>
            </CardActions>
        </Card>
    );
}
