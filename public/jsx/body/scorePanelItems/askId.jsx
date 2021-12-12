import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails } from '../../../js/redux/selector/userSelector';
import { UPDATE_IS_NEW_USER_STATUS } from '../../../js/redux/action/mainAction';
import { registerUserInBlockchain } from '../../../js/redux/thunk/userThunk';

export default function AskNIC () {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const userDetails = useSelector(state => getUserDetails(state));

    useEffect(() => {
        const userStatus = userDetails?.isNewUser ? userDetails?.isNewUser : false;
        setOpen(userStatus);
    });

    const handleClose = () => {
        dispatch({
            type: UPDATE_IS_NEW_USER_STATUS,
            payload: false
        });
        setOpen(false);
    };

    const handleUpdateNIC = () => {
        dispatch({
            type: UPDATE_IS_NEW_USER_STATUS,
            payload: false
        });
        const NIC = document.querySelector('#nic').value;
        dispatch(registerUserInBlockchain(NIC));
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Enable Your Digital Certification</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Would you like to enable your Digital Certification for this competition?
                        <Typography gutterBottom variant='subtitle2' component='div'>
                            Please provide your NIC.
                            We will enable your real-time digital certification powered by Ethereum Blockchain.
                        </Typography>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='nic'
                        label='NIC'
                        type='text'
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
            No I don't
                    </Button>
                    <Button onClick={handleUpdateNIC} color='primary'>
            Yes I want
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
