import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { getLiveUsersInfo } from '../../../js/redux/selector/gameRoomSelector';

const useStyles = makeStyles({
    root: {
        maxWidth: 300,
        height: 600,
        overflow: 'auto'
    },
    cardContent: {
        color: '#293239',
        padding: 5
    },
    liverUserIcon: {
        color: '#9c27b0'
    }
});

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#1c465a'
}));

export default function LiveUsers () {

    const liveUsers = useSelector(state => getLiveUsersInfo(state));
    // Style
    const classes = useStyles();
    
    return (
        <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
                <List
                    sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper'
                    }}
                >
                    <Item>
                        <RadioButtonCheckedIcon/>
                        <Typography gutterBottom variant='h5' component='div'>
                            Live Players
                        </Typography>
                    </Item>
                    {liveUsers.map(user => {
                        return <>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <AccountCircleIcon className={classes.liverUserIcon}/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={user.userName} secondary={user.dateTime} />
                            </ListItem>
                            <Divider variant='inset' component='li' />
                        </>;
                    })}
                </List>
            </CardContent>
        </Card>
    );
}
