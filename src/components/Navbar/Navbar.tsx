import React, { FC, useEffect, useState } from 'react';
import { AppName, DisplayName, MenuWrapper, NavbarWrapper } from './Navbar.css';
import { WOMButton } from '../CustomComponents/CustomComponents';
import { useAuth } from '../../providers/AuthContext';
import { Insights, Logout, Recommend } from '@mui/icons-material';
import { NavLink, useHistory } from 'react-router-dom';
import { SvgIcon } from '@material-ui/core';
import { Bookmark, PersonPin, Search } from '@material-ui/icons';

const Navbar: FC<any> = (props) => {
    const { logUserOut, user } = useAuth();
    const history = useHistory();

    return (
        <NavbarWrapper>
            <AppName onClick={() => history.push('/')}>
                wasted-on-<span>movies</span>
            </AppName>
            <MenuWrapper>
                <NavLink to={'/search'} activeClassName={'active'}>
                    <Search />
                    Search
                </NavLink>
                <NavLink to={'/my_watchlist'} activeClassName={'active'}>
                    <Bookmark />
                    My Watchlist
                </NavLink>
                <NavLink to={'/analytics'} activeClassName={'active'}>
                    <Insights />
                    Analytics
                </NavLink>
                <NavLink to={'/recommendations'} activeClassName={'active'}>
                    <Recommend />
                    Recommendations
                </NavLink>
            </MenuWrapper>
            <DisplayName>
                <SvgIcon>
                    <PersonPin />
                </SvgIcon>
                {user?.displayName || user?.email}
            </DisplayName>
            <WOMButton kind={'PRIMARY'} text={'Log Out'} onClick={() => logUserOut()} startIcon={<Logout />} />
        </NavbarWrapper>
    );
};

export default Navbar;
