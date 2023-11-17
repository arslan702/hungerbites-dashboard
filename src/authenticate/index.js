/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { ALERT_TYPES } from 'utils';
import { login, logout, getProfile } from './auth';
import { notifier } from '../store/actions';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const signIn = async (payload, callback) => {
        try {
            await login(payload);
            const userData = await getProfile();
            setUser(userData);
            callback();
        } catch (error) {
            dispatch(notifier.open({ message: error.message, variant: ALERT_TYPES.ERROR }));
        }
    };
    const signOut = (callback) => {
        logout();
        setUser(null);
        callback();
    };
    const setProfile = async () => {
        const userData = await getProfile();
        setUser(userData);
    };
    const value = { user, signIn, signOut, setProfile };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export const RequireAuth = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();
    const authToken = localStorage.getItem('token');
    if (authToken && !auth.user) {
        auth.setProfile();
    } else if (!auth.user) {
        return <Navigate to="/auth/login" state={{ lastPath: location }} />;
    }
    return children;
};
