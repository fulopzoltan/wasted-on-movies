import React, { useState } from 'react';
import { LoginTitle, ResetPasswordWrapper } from './ResetPassword.css';
import { fetchSignInMethodsForEmail, getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { WOMButton, WOMTextField } from '../CustomComponents/CustomComponents';
import { useLoading } from '../../providers/LoadingContext';
import { ErrorKeys, errors } from '../../utils/errorMappings';
import _ from 'lodash';

import { useNotification } from '../../providers/NotificationContext';
import { useHistory } from 'react-router-dom';
import { LockReset } from '@mui/icons-material';
import { ArrowBackIos } from '@material-ui/icons';

const ResetPassword = () => {
    const [email, setEmail] = useState<string>('');
    const [formErrors, setFormErrors] = useState<{ email?: string }>({});

    const { setNotification } = useNotification();
    const history = useHistory();
    const { setLoading } = useLoading();

    const resetPassword = () => {
        const auth = getAuth();
        setLoading(true);
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setNotification({
                    open: true,
                    message: 'Password reset email sent!',
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
    const checkProviderInUse = () => {
        const auth = getAuth();
        return fetchSignInMethodsForEmail(auth, email).then((providers) => {
            if (providers.includes('google.com')) {
                setNotification({
                    open: true,
                    message: 'The provided email uses GoogleAuth! Please Log In With Google!',
                    type: 'error'
                });
                return false;
            }
            return true;
        });
    };

    const validateReset = () => {
        const newFormErrors = { ...formErrors };
        if (!email) {
            newFormErrors['email'] = 'Please provide an email!';
        }
        setFormErrors(newFormErrors);
        return Object.keys(newFormErrors).length === 0;
    };

    return (
        <ResetPasswordWrapper>
            <LoginTitle>RESET YOUR PASSWORD</LoginTitle>
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
            <WOMButton
                kind={'PRIMARY'}
                text={'Reset Password'}
                onClick={async () => {
                    if (!validateReset()) return;
                    if (!(await checkProviderInUse())) return;
                    resetPassword();
                }}
                endIcon={<LockReset />}
            />
            <WOMButton
                kind={'DEFAULT'}
                text={'Back to login'}
                onClick={() => {
                    history.push('/login');
                }}
                startIcon={<ArrowBackIos />}
            />
        </ResetPasswordWrapper>
    );
};

export default ResetPassword;
