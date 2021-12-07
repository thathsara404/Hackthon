import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import ContactUsImage from '../../../images/wiley.png';

const useStyles = makeStyles({
    contactBox: {
        width: '100%',
        height: 550,
        paddingTop: 5
    }
});

export default function SupportCard () {

    // Style
    const classes = useStyles();

    return (
        <Card className={classes.contactBox}>
            <CardMedia
                component='img'
                alt='contact us'
                height='350'
                width='auto'
                image={ContactUsImage}
            />
            <CardContent>
                <Typography gutterBottom variant='h2' component='div'>
                    We are here to help you.
                </Typography>
                <Typography variant='h5' color='text.secondary'>
                    You can call or email your issue.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small'>Email</Button>
            </CardActions>
        </Card>
    );
}
