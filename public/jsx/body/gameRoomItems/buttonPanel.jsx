import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
    customButton: {
        backgroundColor: '#1b598a'
    }
});

export default function Buttonpanel () {
    // Style
    const classes = useStyles();
    return (
        /*
         * <Box sx={{ position: 'absolute', bottom: 50, disply: 'fex', flexDirection: 'row' }}>
         * </Box>
         */
        <Stack spacing={2} direction='row' sx={{ position: 'absolute', bottom: 30 }}>
            <Button className={classes.customButton} variant='contained'>Create</Button>
            <Button className={classes.customButton} variant='contained'>Join</Button>
        </Stack>
    );
}
