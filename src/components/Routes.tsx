import { useAuth } from '../providers/AuthContext';
import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './Login/Login';
import SearchPage from './Dashboard/SearchPage';
import Navbar from './Navbar/Navbar';
import Register from './Register/Register';
import NotFound from './NotFound/NotFound';

interface IPrivateRoute {
    component: any;
    exact: boolean;
    path: string;
}

const PrivateRoute: FC<IPrivateRoute> = ({ component: Component, path, ...rest }) => {
    const { loggedIn, token, logUserOut } = useAuth();
    const isAuthenticated = () => {
        if (!loggedIn || !token) {
            logUserOut();
            return false;
        }
        return true;
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
                <PrivateRoute component={SearchPage} exact path={'/search'} />
                <Route component={NotFound} />
            </Switch>
        </>
    );
};

export default Routes;
