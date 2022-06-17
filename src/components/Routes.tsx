import { useAuth } from '../providers/AuthContext';
import React, { FC, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './Login/Login';
import SearchPage from './Search/SearchPage';
import Navbar from './Navbar/Navbar';
import Register from './Register/Register';
import NotFound from './NotFound/NotFound';
import ResetPassword from './ResetPassword/ResetPassword';
import Watchlist from './Watchlist/Watchlist';
import jwtDecode from 'jwt-decode';
import { useNotification } from '../providers/NotificationContext';
import Analytics from './Analytics/Analytics';
import Recommendations from './Recommendations/Recommendations';

interface IPrivateRoute {
    component: any;
    exact: boolean;
    path: string;
}

const PrivateRoute: FC<IPrivateRoute> = ({ component: Component, path, ...rest }) => {
    const { loggedIn, token, setToken, logUserOut } = useAuth();
    const { setNotification } = useNotification();
    useEffect(() => {
        checkIdToken();
    }, [path]);
    const isAuthenticated = () => {
        if (!loggedIn || !token) {
            logUserOut();
            return false;
        }
        return true;
    };
    const checkIdToken = async () => {
        if (!token) return;
        const decoded: any = jwtDecode(token);
        if (Math.floor(Date.now() / 1000) >= decoded?.exp) {
            setNotification({ open: true, type: 'info', message: 'Your session expired! Please log in again!' });
            logUserOut();
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
                <PrivateRoute component={Analytics} exact path={'/analytics'} />
                <PrivateRoute component={Recommendations} exact path={'/recommendations'} />
                <Route component={NotFound} />
            </Switch>
        </>
    );
};

export default Routes;
