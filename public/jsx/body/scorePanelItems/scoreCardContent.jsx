import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLastGameSession } from '../../../js/redux/thunk/gameRoomThunk';
import { getUserDetails } from '../../../js/redux/selector/userSelector';
import { getPlayedGamesCounter } from '../../../js/redux/selector/gameRoomSelector';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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

const mockRows = [
    [
        createData('Daham', 1, 100, 10),
        createData('Sahan', 2, 90, 12),
        createData('Sanka', 3, 80, 8),
        createData('Dineth', 4, 70, 2),
        createData('Dinesh', 5, 60, 1)
    ],
    [
        createData('John', 1, 94, 10),
        createData('Kasun', 2, 89, 8),
        createData('Marie', 3, 84, 7),
        createData('Rehana', 4, 66, 7),
        createData('Lahiru', 5, 54, 5)
    ],
    [
        createData('Jonas', 1, 278, 10),
        createData('Carrie', 2, 238, 9),
        createData('Arthur', 3, 194, 6),
        createData('Supun', 4, 124, 5),
        createData('Nuwan', 5, 70, 3)
    ]
];

const setRank = (userStats) => {
    return userStats
        .sort((firstItem, secondItem) => secondItem.marks - firstItem.marks)
        .map((stat, index) => ({...stat, rank: index+1}));
}

export default function ScoreCardContent ({ showLastSession }) {

    // Style
    const classes = useStyles();

    const dispatch = useDispatch();

    const userDetails = useSelector(getUserDetails);
    const playedGamesCounter = useSelector(getPlayedGamesCounter);

    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        if (showLastSession) {
            dispatch(getLastGameSession('45789545')).then((result) => {
                let rowsArray = JSON.parse(JSON.stringify(result.userStats));
                rowsArray = setRank(rowsArray);
                rowsArray = rowsArray.map(stat => {
                    return createData(stat.userName, stat.rank, stat.marks, 1);
                });
                setRows(rowsArray);
            }).catch((error) => {
                console.error('Error occurred while retrieving last game session: ', error);
            });
        } else {
            const selection = playedGamesCounter % 3;
            setRows(mockRows[selection]);
        }
    }, [showLastSession]);

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
                                {row.name}
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

