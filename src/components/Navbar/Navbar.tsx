import React, { FC, useEffect, useState } from 'react';
import { AppName, DisplayName, MenuWrapper, NavbarWrapper } from './Navbar.css';
import { WOMButton } from '../CustomComponents/CustomComponents';
import { useAuth } from '../../providers/AuthContext';
import { Logout } from '@mui/icons-material';
import { NavLink, useHistory } from 'react-router-dom';
import { SvgIcon } from '@material-ui/core';
import { PersonPin } from '@material-ui/icons';

const Navbar: FC<any> = (props) => {
    const { logUserOut, user } = useAuth();
    const history = useHistory();

    return (
        <NavbarWrapper>
            <AppName onClick={() => history.push('/')}>
                wasted-on-<span>movies</span>
            </AppName>
            <MenuWrapper>
                <NavLink to={'/dashboard'} activeClassName={'active'}>
                    Search
                </NavLink>
                <NavLink to={'/my_watchlist'} activeClassName={'active'}>
                    My Watchlist
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
