/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { validateLogin } from '../js/redux/thunk/userThunk';
import { getUserLoginStatus } from '../js/redux/selector/userSelector';
import { getUserJoinedStatusInSubRoom } from '../js/redux/selector/gameRoomSelector';
import Container from '@mui/material/Container';
import GamePanel from './body/gamePanel';
import GameHeader from './header/gameHeader';
import Notifier from './body/notifier/notifier';
import Spinner from './body/spinner/spinner';
import MessageDialog from './body/dialog/dialog';
import SupportCard from './body/contactSupport/supportCard';
import QuestionLoaderDialog from './body/gameRoomItems/questionLoaderDIalog';
import AskNIC from './body/scorePanelItems/askId';

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
        const isUserConnectedToGame = this.props.isUserConnectedToGame;
        return <>
            {/* User authorized */}
            {
                isUserSignedIn && <Container maxWidth='lg'>
                    <GameHeader value='Wiley Gaming Platform' />
                    {
                        isUserConnectedToGame && <Spinner type={'inherit'} />
                    }
                    <GamePanel />
                    <Notifier />
                </Container>
            }

            {/* Uer not authorized */}
            {
                isUserSignedIn !== null && !isUserSignedIn && <MessageDialog status={true} title={'Access Error'}
                    message={'You are not authorized. Please contatct support.'} />
            }
            {
                isUserSignedIn !== null && !isUserSignedIn && <SupportCard />
            }

            {/* Question Loader */}
            <QuestionLoaderDialog />
            <AskNIC />
        </>;
    }

}

MainRouter.propTypes = {
};

const mapStateToProps = state => ({
    isLoggedIn: getUserLoginStatus(state),
    isUserConnectedToGame: getUserJoinedStatusInSubRoom(state)
});

const mapDispatchToProps = dispatch => {
    return { validateCurrentUser: () => dispatch(validateLogin()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainRouter);
