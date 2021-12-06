import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        textAlign: 'center'
    }
});

const appBarLabel = (label) => {
    return (
        <Toolbar>
            <Typography variant='h4' noWrap component='div' sx={{ flexGrow: 1 }}>
                {label}
            </Typography>
        </Toolbar>
    );
};

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2'
        }
    }
});

export default function GameHeader () {
    // Style
    const classes = useStyles();
    return (
        <Stack className={classes.root} spacing={3} sx={{ flexGrow: 1 }}>
            <ThemeProvider theme={darkTheme}>
                <AppBar position='static' color='primary'>
                    {appBarLabel('Wiley Gaming Platform')}
                </AppBar>
            </ThemeProvider>
        </Stack>
    );
}
