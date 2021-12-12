/* eslint-disable react/prop-types */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import SearchBar from './searchBar';

const useStyles = makeStyles({
    root: {
        textAlign: 'center'
    }
});

const appBarLabel = (label) => {
    return (
        <Typography variant='h4' noWrap component='div' sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            {label + ' '}
            {label === 'Wiley Gaming Competition Certification'
                && <sub style={{ fontSize: '10px' }}> powered by blockchain</sub>}
        </Typography>
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

export default function GameHeader (props) {
    // Style
    const classes = useStyles();
    return (
        <Stack className={classes.root} spacing={3} sx={{ flexGrow: 1 }}>
            <ThemeProvider theme={darkTheme}>
                <AppBar position='static' color='primary'>
                    <Toolbar>
                        {appBarLabel(props.value)}
                        {props.value === 'Wiley Gaming Competition Certification'
                            && <SearchBar changeSearchState={props.changeSearchState} />}
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </Stack>
    );
}
