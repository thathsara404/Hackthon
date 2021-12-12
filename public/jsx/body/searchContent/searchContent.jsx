/* eslint-disable react/prop-types */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

export default function SearchContent (props) {
    return (
        <Box sx={{ width: '100%', marginTop: '20px' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <Item sx={{ textAlign: 'left' }}>
                        <img
                            style={{ width: '100px', height: '45px' }}
                            src={require('../../../images/wiley.png')}
                            alt='Wiley Logo'
                        />
                        <VerifiedUserIcon color='success' sx={{ fontSize: 40, marginLeft: '20px', float: 'right' }} />
                        <Typography sx={{ fontWeight: 'bold' }} component='div' variant='h6'>
                            {props.result.courseName}
                        </Typography>
                    </Item>
                </Grid>
                <Grid item xs={3}>
                    <Item>
                        <Typography component='div' variant='h5'>
                            Score
                        </Typography>
                        <br></br>
                        <Typography variant='subtitle1' color='text.secondary' component='div'>
                            {props.result.score}
                        </Typography>
                    </Item>
                </Grid>
                <Grid item xs={3}>
                    <Item>
                        <Typography component='div' variant='h5'>
                            Highscore
                        </Typography>
                        <br></br>
                        <Typography variant='subtitle1' color='text.secondary' component='div'>
                            {props.result.highscore}
                        </Typography>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}
