import { useAuth } from '../providers/AuthContext';
import React, { FC, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './Login/Login';
import SearchPage from './Dashboard/SearchPage';
import Navbar from './Navbar/Navbar';
import Register from './Register/Register';
import NotFound from './NotFound/NotFound';
import ResetPassword from './ResetPassword/ResetPassword';
import Watchlist from './Watchlist/Watchlist';
import firebase from 'firebase/compat';

interface IPrivateRoute {
    component: any;
    exact: boolean;
    path: string;
}

const PrivateRoute: FC<IPrivateRoute> = ({ component: Component, path, ...rest }) => {
    const { loggedIn, token, setToken, logUserOut } = useAuth();
    useEffect(() => {
        refreshIdToken();
    }, []);
    const isAuthenticated = () => {
        if (!loggedIn || !token) {
            logUserOut();
            return false;
        }
        return true;
    };
    const refreshIdToken = async () => {
        try {
            const idToken = (await firebase.auth().currentUser?.getIdToken(true)) || '';
            if (!idToken) return logUserOut();
            setToken(idToken);
        } catch (ex) {
            console.error(ex);
            return logUserOut();
        }
    };
    return (
        <Route
            {...rest}
            render={(props) => (isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />)}
        />
    );
};

const Routes = () => {
    const { loggedIn, token } = useAuth();
    return (
        <>
            {loggedIn && token && <Navbar />}
            <Switch>
                <Route exact path="/">
                    <Redirect to="/search" />
                </Route>
                <Route exact path="/login">
                    {!loggedIn || !token ? <Login /> : <Redirect to="/" />}
                </Route>
                <Route exact path="/register">
                    {!loggedIn || !token ? <Register /> : <Redirect to="/" />}
                </Route>
                <Route exact path="/reset_password">
                    {!loggedIn || !token ? <ResetPassword /> : <Redirect to="/" />}
                </Route>
                <PrivateRoute component={SearchPage} exact path={'/search'} />
                <PrivateRoute component={Watchlist} exact path={'/my_watchlist'} />
                <Route component={NotFound} />
            </Switch>
        </>
    );
};

export default Routes;
