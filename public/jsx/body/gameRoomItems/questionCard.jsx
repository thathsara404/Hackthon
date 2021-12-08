import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// eslint-disable-next-line react/prop-types
export default function QuestionCard ({ currentQuestion, currentQuestionCount }) {

    const Display = () => {
        if (currentQuestion) {
            return <Card sx={{ width: 900, marginTop: 10 }}>
                <CardContent>
                    <Typography variant='h4' gutterBottom>
                        Question : {currentQuestionCount}
                    </Typography>
                    <Typography variant='subtitle1' dangerouslySetInnerHTML={{ __html: currentQuestion }}
                        sx={{ fontSize: 20 }} gutterBottom>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button sx={{ fontWeight: 500 }} size='large'>Submit Your Answer</Button>
                </CardActions>
            </Card>;
        } 
        return <Typography variant='subtitle1' sx={{ fontSize: 20 }} gutterBottom>
            You have completed the game. Please vist the Score Board and toggle My Last Session to view your results.
        </Typography>;
        
    };
    return (
        <Display/>
    );
}
