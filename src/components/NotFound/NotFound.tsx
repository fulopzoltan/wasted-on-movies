import React from 'react';

const NotFound = () => {
    return (
        <div
            style={{
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}
        >
            <p style={{ fontSize: '50px' }}>404 PAGE NOT FOUND</p>
            <p style={{ fontSize: '20px' }}>{window.location.pathname} is not a valid route</p>
        </div>
    );
};

export default NotFound;
