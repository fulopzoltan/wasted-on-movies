import React from 'react';
import { DashboardWrapper } from './Dashboard.css';
import { Button } from '@material-ui/core';
import { useAuth } from '../../providers/AuthContext';

const Dashboard = () => {
    const { logUserOut } = useAuth();
    return (
        <DashboardWrapper>
            Dashboard
            <Button variant={'contained'} onClick={() => logUserOut()}>
                Log out
            </Button>
        </DashboardWrapper>
    );
};

export default Dashboard;
