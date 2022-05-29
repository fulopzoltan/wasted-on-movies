import React from 'react';
import Login from './Login/Login';
import firebase from 'firebase/compat';
import { firebaseConfig } from '../utils/firebase.config';
import Routes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import Loading from './Loading/Loading';
import { useLoading } from '../providers/LoadingContext';
import { useNotification } from '../providers/NotificationContext';
import { Snackbar } from '@material-ui/core';
import { Slide } from '@mui/material';
import { WOMSnackbar } from './CustomComponents/CustomComponents';

const App = () => {
    const initFirebase = () => {
        firebase.initializeApp(firebaseConfig);
    };
    initFirebase();
    const { loading } = useLoading();
    const { notification, onCloseCallback } = useNotification();
    return (
        <Router>
            <div id="app-container">
                <Routes />
            </div>
            <Loading loading={loading} />
            <WOMSnackbar
                open={notification.open}
                message={notification.message}
                type={notification.type}
                TransitionComponent={(props) => <Slide {...props} direction={'up'} />}
                autoHideDuration={4000}
                onCloseClick={onCloseCallback}
            />
        </Router>
    );
};

export default App;
