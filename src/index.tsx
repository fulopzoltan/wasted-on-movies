import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './global.scss';
import { AuthProvider } from './providers/AuthContext';
import { LoadingProvider } from './providers/LoadingContext';
import { NotificationProvider } from './providers/NotificationContext';

ReactDOM.render(
    <React.StrictMode>
        <NotificationProvider>
            <LoadingProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </LoadingProvider>
        </NotificationProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
