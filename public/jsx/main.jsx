/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { validateLogin } from '../js/redux/thunk/userThunk';
import { getUserLoginStatus } from '../js/redux/selector/userSelector';
import Container from '@mui/material/Container';
import GamePanel from './body/gamePanel';
import GameHeader from './header/gameHeader';

class MainRouter extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            // Default tempUser
            tempName: 'Customer'
        };
    }

    componentDidMount () {
        this.props.validateCurrentUser();
    }

    render () {
        const isUserSignedIn = this.props.isLoggedIn;
        return <>
            <Container maxWidth='lg'>
                <GameHeader />
                <GamePanel />
            </Container>
            
            {/* {this.props.isLoggedIn && <h2>User has Signed In</h2>}
            {!this.props.isLoggedIn && <h2>User has not Signed In</h2>}

            {
                isUserSignedIn && <Router>
                    <nav>
                        <Link to='/'>Score Board</Link> <br />
                        <Link to='/game-room'>Game Room</Link><br />
                    </nav>
                    <Switch>
                        <Route path='/game-room' component={() => <GameRoom title={'Game Room'}/>}></Route>
                        <Route path='/' component={() => <Home title={'Score Board'}/>}></Route>
                    </Switch>
                </Router>
            } */}
        </>;
    }

}

MainRouter.propTypes = {
};

const mapStateToProps = state => ({
    isLoggedIn: getUserLoginStatus(state)
});

const mapDispatchToProps = dispatch => {
    return { validateCurrentUser: () => dispatch(validateLogin()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainRouter);
