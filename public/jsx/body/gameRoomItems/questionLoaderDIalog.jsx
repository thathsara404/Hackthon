import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { useSelector } from 'react-redux';
import { getCurrentQuestion, getGameStartedStatus } from '../../../js/redux/selector/gameRoomSelector';
import QuestionCard from './questionCard';

const Transition = React.forwardRef(function Transition (props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function QuestionLoaderDialog () {
    const [open, setOpen] = React.useState(false);

    const currentQuestion = useSelector(state => getCurrentQuestion(state));
    const isGameStarted = useSelector(state => getGameStartedStatus(state));

    useEffect(() => {
        if (isGameStarted) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    });

    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', backgroundColor: 'black' }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
                            Question Player
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                        <QuestionCard currentQuestion={currentQuestion}></QuestionCard>
                    </Toolbar>
                </List>
            </Dialog>
        </div>
    );
}
