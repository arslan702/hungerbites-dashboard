/* eslint-disable no-unused-vars */
import { apiGet, apiPost } from 'services';

export const login = (payload) => {
    return localStorage.setItem('token', payload);
    // return apiPost('/auth/login', payload).then((response) => {
    //     return localStorage.setItem('token', response.data?.token);
    // });
};

export const logout = () => {
    return localStorage.clear();
};

export const getProfile = () => {
    // const authToken = localStorage.getItem('token');
    return { user: 'dummy User' };
    // return apiGet('/adminProfile', authToken).then((response) => {
    //     return response?.data?.adminProfile?.user;
    // });
};
