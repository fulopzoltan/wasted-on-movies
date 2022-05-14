import React, { useState } from 'react';
import { LoginTitle, LoginWrapper } from './Login.css';
import firebase from 'firebase/compat';
import { useAuth } from '../../providers/AuthContext';

import { WOMButton, WOMTextField } from '../CustomComponents/CustomComponents';
import { Google } from '@mui/icons-material';
import { useLoading } from '../../providers/LoadingContext';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { logUserIn, logUserInWithGoogle } = useAuth();
    const { setLoading } = useLoading();

    const login = async () => {
        try {
            setLoading(true);
            await logUserIn(email, password);
        } catch (ex) {
            console.error(ex);
            setLoading(false);
        }
    };
    const register = async () => {
        try {
            setLoading(true);
            const firebaseResponse = await firebase.auth().createUserWithEmailAndPassword(email, password);
        } catch (ex) {
            setLoading(false);
            console.error(ex);
        }
    };
    return (
        <LoginWrapper>
            <LoginTitle>
                WELCOME TO
                <br />
                <span>wasted-on-movies</span>
            </LoginTitle>
            <WOMTextField type={'text'} label={'Email'} value={email} onChange={(evt) => setEmail(evt.target.value)} />
            <WOMTextField
                type={'password'}
                label={'Password'}
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
            />
            <WOMButton
                kind={'PRIMARY'}
                text={'Register'}
                onClick={async () => {
                    register();
                    setLoading(false);
                }}
            />

            <WOMButton
                kind={'PRIMARY'}
                text={'LOGIN'}
                onClick={() => {
                    login();
                }}
            >
                Login
            </WOMButton>
            <WOMButton
                kind={'DEFAULT'}
                startIcon={<Google />}
                text={'Log in with Google'}
                onClick={() => {
                    logUserInWithGoogle();
                }}
            />
        </LoginWrapper>
    );
};

export default Login;
