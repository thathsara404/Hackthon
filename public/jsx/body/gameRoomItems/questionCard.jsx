import * as React from 'react';
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
export default function QuestionCard({ currentQuestion, currentQuestionCount }) {

    const [sessionJson, setsessionJson] = React.useState(
        {
            userId: useSelector(state => getUserId(state)),
            gameSessionId: useSelector(state => getCurrentSubRoomId(state)),
            userSelections: {},
            currentQuestionRemainingTime: useSelector(state => getCurrentQuestionRemaingTime(state))
        }
    );
    console.log('popop', sessionJson.userId, sessionJson.gameSessionId, sessionJson.currentQuestionRemainingTime);

    const Display = () => {
        const dispatch = useDispatch();
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
                    <Button onClick={()=> dispatch(saveSession(sessionJson))} variant='contained' sx={{ fontWeight: 500, backgroundColor: '#1b598a' }} size='large'>Submit Your Answer</Button>
                </CardActions>
            </Card>;
        }
        return <Typography variant='h3' sx={{ fontSize: 20,  paddingTop: 20, color: '#1c465a' }} gutterBottom>
            You just finished the game successfully !!!
        </Typography>;
    };
    return (
        <Display />
    );
}
