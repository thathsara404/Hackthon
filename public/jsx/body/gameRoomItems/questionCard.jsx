import * as React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveSession } from '../../../js/redux/thunk/gameRoomThunk';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getUserDetails, getUserId } from '../../../js/redux/selector/userSelector';
import { getCurrentSubRoomId, getCurrentQuestionRemaingTime } from '../../../js/redux/selector/gameRoomSelector';

// eslint-disable-next-line react/prop-types
export default function QuestionCard ({ currentQuestion, currentQuestionCount, currentQuestionId, isLGFinished }) {

    const dispatch = useDispatch();
    const [sessionJson, setsessionJson] = React.useState(
        {
            userId: useSelector(state => getUserId(state)),
            gameSessionId: useSelector(state => getCurrentSubRoomId(state)),
            userSelections: {},
            currentQuestionRemainingTime: useSelector(state => getCurrentQuestionRemaingTime(state))
        }
    );
    const Display = () => {
        // Const dispatch = useDispatch();
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
                    <Button onClick={submitQuestionSession} variant='contained' sx={{ fontWeight: 500, backgroundColor: '#1b598a' }} size='large'>Submit Your Answer</Button>
                </CardActions>
            </Card>;
        } 
        if (!currentQuestion && isLGFinished)
        { return <Typography variant='h2' sx={{ fontSize: 20, paddingTop: 20, color: '#1c465a' }} gutterBottom>
            You just finished the game successfully !!!
        </Typography>; }
        return <></>;
        
    };
    
    const submitQuestionSession = () => {
        const selectedRadio = document.querySelector('input[type="radio"]:checked');
        sessionJson.userSelections = {
            'questionId': currentQuestionId,
            'answerId': (selectedRadio.hasAttribute('data-index')) ? selectedRadio.getAttribute('data-index') : 1
        };
        dispatch(saveSession(sessionJson));
    };
    return (
        <Display />
    );
}
