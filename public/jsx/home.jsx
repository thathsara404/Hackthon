import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserLoginStatus } from '../js/redux/selector/userSelector';

const Home = ({ title }) => {

    // Manage login status
    const [isLoggedIn, setLoggedInStatus] = useState(null);
    // Get the loggedIn status redux store.
    const isUserLoggedIn = useSelector(state => getUserLoginStatus(state));
    
    // Component Did Mount
    useEffect(() => {
        document.title = title;
        // Set the temp user.
        setLoggedInStatus(isUserLoggedIn);
    }, []);

    return (
        <>
            <h1>Score Board</h1>
            <div>{ isLoggedIn }</div>
        </>
    );
};

Home.defaultProps = {
    title: 'Home'
};

Home.propTypes = {
    title: PropTypes.string.isRequired
};

export default Home;
