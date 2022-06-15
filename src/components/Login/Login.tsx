import React, { useState } from 'react';
import { LoginInfoText, LoginTitle, LoginWrapper } from './Login.css';
import { useAuth } from '../../providers/AuthContext';
import { WOMButton, WOMSnackbar, WOMTextField } from '../CustomComponents/CustomComponents';
import { useLoading } from '../../providers/LoadingContext';
import { ErrorKeys, errors } from '../../utils/errorMappings';
import _ from 'lodash';
import InlineSVG from 'react-inlinesvg';
import { icons } from '../../assets/icons/icons';
import { getAuth, fetchSignInMethodsForEmail } from 'firebase/auth';
import { useNotification } from '../../providers/NotificationContext';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

    const { setNotification } = useNotification();

    const { logUserIn, logUserInWithGoogle } = useAuth();
    const { setLoading } = useLoading();
    const history = useHistory();
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
    const checkProviderInUse = () => {
        const auth = getAuth();
        return fetchSignInMethodsForEmail(auth, email)
            .then((providers) => {
                if (providers.includes('google.com')) {
                    setNotification({
                        open: true,
                        message: 'The provided email uses GoogleAuth! Please Log In With Google!',
                        type: 'error'
                    });
                    return false;
                }
                return true;
            })
            .catch((ex: any) => {
                const errKey = errors[ex.code as ErrorKeys] ?? errors.unknown;
                setNotification({ open: true, message: errKey, type: 'error' });
            });
    };

    const validateLogin = () => {
        const newFormErrors = { ...formErrors };
        if (!email) {
            newFormErrors['email'] = 'Please provide an email!';
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
            <hr />
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
                onClick={async () => {
                    if (!validateLogin()) return;
                    if (!(await checkProviderInUse())) return;
                    login();
                }}
            >
                Login
            </WOMButton>
            <LoginInfoText>
                You do not have an account?{' '}
                <span onClick={() => history.push('/register')}>Click here to register</span> <br />
                <span onClick={() => history.push('/reset_password')}>Forgot Password?</span>
            </LoginInfoText>
        </LoginWrapper>
    );
};

export default Login;
