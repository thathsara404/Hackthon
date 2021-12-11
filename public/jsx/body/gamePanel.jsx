import * as React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import ScoreCard from './scorePanelItems/scoreCard';
import ProfileCard from './scorePanelItems/profileCard';
import LiveUsers from './gameRoomItems/liveUsers';
import GameRoomMainContainer from './gameRoomItems/gameRoomMainContainer';
import { getUserDetails } from '../../../public/js/redux/selector/userSelector';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#f4f9ff',
        minHeight: 700,
        paddingTop: 10
    },
    tab: {
        backgroundColor: '#1c465a'
    }
});

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

const a11yProps = (index) => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`
    };
};

export default function GamePanel () {
    const userDetails = useSelector(state => getUserDetails(state))
    // Style
    const classes = useStyles();

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Box className={classes.root} sx={{ bgcolor: 'background.paper', width: '100%' }}>
            <AppBar position='static'>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor='secondary'
                    textColor='inherit'
                    variant='fullWidth'
                    aria-label='full width tabs example'
                >
                    <Tab className={classes.tab} label='Score Board' {...a11yProps(0)} />
                    <Tab className={classes.tab} label='Game Room' {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <ProfileCard/>
                        </Grid>
                        <Grid item xs={8}>
                            <ScoreCard/>
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Grid container spacing={14}>
                        <Grid item xs={8}>
                            <GameRoomMainContainer/>
                        </Grid>
                        <Grid item xs={4}>
                            <LiveUsers/>
                        </Grid>
                    </Grid>
                </TabPanel>
            </SwipeableViews>
        </Box>
    );
}
