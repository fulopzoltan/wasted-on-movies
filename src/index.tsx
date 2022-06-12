import { ConfirmProvider } from 'material-ui-confirm';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './global.scss';
import { AuthProvider } from './providers/AuthContext';
import { LoadingProvider } from './providers/LoadingContext';
import { NotificationProvider } from './providers/NotificationContext';
import { theme } from './utils/theme';

ReactDOM.render(
    <React.StrictMode>
        <NotificationProvider>
            <LoadingProvider>
                <AuthProvider>
                    {/*TODO() styling*/}
                    <ConfirmProvider>
                        <App />
                    </ConfirmProvider>
                </AuthProvider>
            </LoadingProvider>
        </NotificationProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
