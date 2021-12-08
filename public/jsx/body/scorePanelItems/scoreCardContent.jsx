import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    eventIcon: {
        paddingLeft: 10,
        color: '#9c27b0'
    }
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#1c465a',
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    // Hide last border
    '&:last-child td, &:last-child th': {
        border: 0
    }
}));

const createData = (name, rank, score, attempts) => {
    return { name, rank, score, attempts };
};

const rows = [
    createData('Daham', 1, 100, 10),
    createData('Sahan', 2, 90, 12),
    createData('Sanka', 3, 80, 8),
    createData('Dineth', 4, 70, 2),
    createData('Dinesh', 5, 60, 1)
];

export default function ScoreCardContent () {

    // Style
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            Name
                        </StyledTableCell>
                        <StyledTableCell align='right'>Rank</StyledTableCell>
                        <StyledTableCell align='right'>Score</StyledTableCell>
                        <StyledTableCell align='right'>Attempts</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component='th' scope='row'>
                                {row.name} {row.rank === 1 && <EmojiEventsIcon className={classes.eventIcon}/>}
                            </StyledTableCell>
                            <StyledTableCell align='right'>{row.rank}</StyledTableCell>
                            <StyledTableCell align='right'>{row.score}</StyledTableCell>
                            <StyledTableCell align='right'>{row.attempts}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
