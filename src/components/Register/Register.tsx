import React, { useState } from 'react';
import { LoginInfoText, LoginTitle, LoginWrapper } from './Register.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../../providers/AuthContext';
import { WOMButton, WOMSnackbar, WOMTextField } from '../CustomComponents/CustomComponents';
import { useLoading } from '../../providers/LoadingContext';
import { ErrorKeys, errors } from '../../utils/errorMappings';
import _ from 'lodash';

import { useNotification } from '../../providers/NotificationContext';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [formErrors, setFormErrors] = useState<{ email?: string; password?: string; passwordConfirm?: string }>({});

    const { setNotification } = useNotification();
    const history = useHistory();
    const { setLoading } = useLoading();

    const register = () => {
        const auth = getAuth();
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setNotification({
                    open: true,
                    message: 'Registration successful! You will be redirected to Login!',
                    type: 'success'
                });
                setTimeout(() => history.push('/login'), 2000);
                setLoading(false);
            })
            .catch((ex) => {
                const errKey = errors[ex.code as ErrorKeys] ?? errors.unknown;
                setNotification({ open: true, message: errKey, type: 'error' });
                setLoading(false);
            })
            .finally(() => setLoading(false));
    };

    const validateRegister = () => {
        const newFormErrors = { ...formErrors };
        if (!email) {
            newFormErrors['email'] = 'Please provide an email!';
        }
        if (!password) {
            newFormErrors['password'] = 'This field is required!';
        }
        if (!passwordConfirm) {
            newFormErrors['passwordConfirm'] = 'This field is required!';
        }
        if (password && passwordConfirm && password !== passwordConfirm) {
            newFormErrors['password'] = "The passwords don't match!";
            newFormErrors['passwordConfirm'] = "The passwords don't match!";
        }

        setFormErrors(newFormErrors);
        return Object.keys(newFormErrors).length === 0;
    };

    return (
        <LoginWrapper>
            <LoginTitle>
                CREATE YOUR ACCOUNT ON
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
            <WOMTextField
                type={'password'}
                label={'Confirm Password'}
                value={passwordConfirm}
                errorMessage={formErrors.passwordConfirm}
                onChange={(evt) => {
                    setFormErrors(_.omit(formErrors, 'passwordConfirm'));
                    setPasswordConfirm(evt.target.value);
                }}
            />
            <WOMButton
                kind={'PRIMARY'}
                text={'Register'}
                onClick={() => {
                    if (!validateRegister()) return;
                    register();
                }}
            />

            <LoginInfoText>
                You already have an account? <span onClick={() => history.push('/login')}>Click here to login!</span>{' '}
                <br />
            </LoginInfoText>
        </LoginWrapper>
    );
};

export default Register;
