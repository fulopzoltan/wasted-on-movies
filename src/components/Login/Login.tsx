import React, { useState } from 'react';
import { LoginInfoText, LoginTitle, LoginWrapper } from './Login.css';

import { useAuth } from '../../providers/AuthContext';
import { WOMButton, WOMSnackbar, WOMTextField } from '../CustomComponents/CustomComponents';
import { useLoading } from '../../providers/LoadingContext';
import { ErrorKeys, errors } from '../../utils/errorMappings';
import _ from 'lodash';
import InlineSVG from 'react-inlinesvg';
import { icons } from '../../assets/icons/icons';

import { useNotification } from '../../providers/NotificationContext';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

    const { setNotification } = useNotification();

    const { logUserIn, logUserInWithGoogle } = useAuth();
    const { setLoading } = useLoading();

    const login = async () => {
        try {
            setLoading(true);
            const loginResponse = await logUserIn(email, password);
        } catch (ex: any) {
            const errKey = errors[ex.code as ErrorKeys] ?? errors.unknown;
            setNotification({ open: true, message: errKey, type: 'error' });
            setLoading(false);
        }
    };

    const validateLogin = () => {
        const newFormErrors = { ...formErrors };
        if (!email) {
            newFormErrors['email'] = 'Please provide and email!';
        }
        if (!password) {
            newFormErrors['password'] = 'Please provide a password!';
        }

        setFormErrors(newFormErrors);
        return Object.keys(newFormErrors).length === 0;
    };

    return (
        <LoginWrapper>
            <LoginTitle>
                WELCOME TO
                <br />
                <span>wasted-on-movies</span>
            </LoginTitle>
            <WOMTextField
                type={'text'}
                label={'Email'}
                value={email}
                errorMessage={formErrors.email}
                onChange={(evt) => {
                    setFormErrors(_.omit(formErrors, 'email'));
                    setEmail(evt.target.value);
                }}
            />
            <WOMTextField
                type={'password'}
                label={'Password'}
                value={password}
                errorMessage={formErrors.password}
                onChange={(evt) => {
                    setFormErrors(_.omit(formErrors, 'password'));
                    setPassword(evt.target.value);
                }}
            />
            <WOMButton
                kind={'PRIMARY'}
                text={'LOGIN'}
                onClick={() => {
                    if (!validateLogin()) return;
                    login();
                }}
            >
                Login
            </WOMButton>
            <LoginInfoText>
                You do not have an account? <span>Click here to register</span> <br />
                <h1>OR</h1>
            </LoginInfoText>

            <WOMButton
                kind={'DEFAULT'}
                startIcon={<InlineSVG src={icons.googleIcon} />}
                text={'Log in with Google'}
                onClick={async () => {
                    try {
                        await logUserInWithGoogle();
                    } catch (ex: any) {
                        console.error(ex);
                    }
                }}
            />
        </LoginWrapper>
    );
};

export default Login;
