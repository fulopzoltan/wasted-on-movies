import React from 'react';
import Login from './Login/Login';
import firebase from 'firebase/compat';
import { firebaseConfig } from '../utils/firebase.config';
import Routes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import Loading from './Loading/Loading';
import { useLoading } from '../providers/LoadingContext';

const App = () => {
    const initFirebase = () => {
        firebase.initializeApp(firebaseConfig);
    };
    initFirebase();
    const { loading } = useLoading();
    return (
        <Router>
            <div id="app-container">
                <Routes />
            </div>
            <Loading loading={loading} />
        </Router>
    );
};

export default App;
