import React, { createContext, useContext } from 'react';
import { usePersistentState } from '../hooks/usePersistentState';
import firebase from 'firebase/compat';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useLoading } from './LoadingContext';

const useAuthService = () => {
    const { store: token, set: setToken } = usePersistentState<'token'>('token', null);
    const { store: user, set: setUser } = usePersistentState<'user'>('user', '');
    const { store: loggedIn, set: setLoggedIn } = usePersistentState<'loggedIn'>('loggedIn', false);

    const { setLoading } = useLoading();
    const logUserIn = async (email: string, password: string) => {
        try {
            const firebaseResponse = await firebase.auth().signInWithEmailAndPassword(email, password);
            setLoading(false);
            const idToken = await firebase.auth().currentUser?.getIdToken(true);
            setToken(idToken || '');
            setUser(firebaseResponse.user);
            setLoggedIn(true);
        } catch (ex: any) {
            setLoggedIn(false);
            setUser(null);
            setToken('');
            setLoading(false);
            return ex;
        }
    };

    const logUserInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        setLoading(true);
        signInWithPopup(auth, provider)
            .then(async (result) => {
                setLoading(false);
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = (await firebase.auth().currentUser?.getIdToken(true)) || '';
                setUser(result.user);
                setToken(token);
                setLoggedIn(true);
            })
            .catch((error) => {
                setLoading(false);
                setLoggedIn(false);
                setUser(null);
                setToken('');
                return error;
            });
    };

    const logUserOut = () => {
        if (!loggedIn) return;

        setUser(null);
        setToken('');
        setLoggedIn(false);
    };
    return {
        token,
        setToken,

        user,
        setUser,

        loggedIn,

        logUserIn,
        logUserOut,
        logUserInWithGoogle
    };
};
// @ts-ignore
export const AuthContext = createContext<ReturnType<typeof useAuthService>>(null);

export const AuthProvider = ({ children }: any) => {
    const auth = useAuthService();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
