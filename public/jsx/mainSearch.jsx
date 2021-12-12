/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { validateLogin } from '../js/redux/thunk/userThunk';
import { getUserLoginStatus } from '../js/redux/selector/userSelector';
import { getUserJoinedStatusInSubRoom } from '../js/redux/selector/gameRoomSelector';
import Container from '@mui/material/Container';
import GameHeader from './header/gameHeader';
import SearchContent from './body/searchContent/searchContent';
import Typography from '@mui/material/Typography';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Badge from '@mui/material/Badge';

class MainSearch extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            searchClick: false,
            searchValue: '',
            results: [
                {
                    courseName: 'CPA REG',
                    score: 1000,
                    highscore: 3000
                },
                {
                    courseName: 'CPA AUD',
                    score: 800,
                    highscore: 2500
                },
                {
                    courseName: 'CMA 2020',
                    score: 1356,
                    highscore: 2200
                }
            ]
        };
        this.changeSearchState = this.changeSearchState.bind(this);
    }

    changeSearchState (status, value) {
        this.setState({ searchClick: status, searchValue: value });
    }

    renderSearchResult () {
        return this.state.results.map((value, index) => {
            return (<SearchContent key={index} result={value} />);
        });
    }

    render () {
        return <>
            <Container maxWidth='lg'>
                <GameHeader
                    value='Wiley Gaming Competition Certification' changeSearchState={this.changeSearchState} />
                {this.state.searchValue !== '' &&
                    <Typography
                        sx={{ color: '#313431', marginTop: '10px', marginBottom: '10px' }}
                        component='div' variant='h6'>
                        <Badge
                            color='warning'
                            badgeContent={3}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }} >
                            <TravelExploreIcon sx={{ fontSize: 30 }} />
                        </Badge>
                        {' Search Results for Student ' + this.state.searchValue + ' Found'}
                    </Typography>}
                {this.state.searchClick && this.renderSearchResult()}
            </Container>

        </>;
    }

}

MainSearch.propTypes = {
};

const mapStateToProps = state => ({
    isLoggedIn: getUserLoginStatus(state),
    isUserConnectedToGame: getUserJoinedStatusInSubRoom(state)
});

const mapDispatchToProps = dispatch => {
    return { validateCurrentUser: () => dispatch(validateLogin()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainSearch);
