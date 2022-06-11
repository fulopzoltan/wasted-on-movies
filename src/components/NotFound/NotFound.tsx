import React from 'react';
import { theme } from '../../utils/theme';

const NotFound = () => {
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                color: theme.text.main
            }}
        >
            <p style={{ fontSize: '50px' }}>404 PAGE NOT FOUND</p>
            <p style={{ fontSize: '20px', color: theme.text.white }}>{window.location.pathname} is not a valid route</p>
        </div>
    );
};

export default NotFound;
