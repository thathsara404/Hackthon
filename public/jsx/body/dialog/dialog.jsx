import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import propTypes from 'prop-types';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label='close'
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
};

export default function MessageDialog ({ status, message, title }) {
    const [open, setOpen] = useState(false);
    const [messageToDisplay, setMessage] = useState(null);
    const [messageHeader, setTitle] = useState(null);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setOpen(status);
        setMessage(message);
        setTitle(title);
    }, []);

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby='customized-dialog-title'
                open={open}
            >
                <BootstrapDialogTitle id='customized-dialog-title' onClose={handleClose}>
                    {messageHeader}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        {messageToDisplay}
                    </Typography>
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}

MessageDialog.propTypes = {
    message: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    status: propTypes.bool.isRequired
};

