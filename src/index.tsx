import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './global.scss';
import { AuthProvider } from './providers/AuthContext';
import { LoadingProvider } from './providers/LoadingContext';

ReactDOM.render(
    <React.StrictMode>
        <LoadingProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </LoadingProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
