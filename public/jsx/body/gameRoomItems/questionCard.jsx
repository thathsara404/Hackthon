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
                    <Button variant='contained' sx={{ fontWeight: 500, backgroundColor: '#1b598a' }}
                        size='large'>Submit Your Answer</Button>
                </CardActions>
            </Card>;
        } 
        return (<Typography variant='h3' sx={{ paddingTop: 20, color: '#1c465a' }} gutterBottom>
            You just finished the game successfully !!!
        </Typography>);
        
    };
    return (
        <Display/>
    );
}
