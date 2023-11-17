import axios from 'axios';
import { API_ROOT } from 'configuration';

const api = axios.create({
    baseURL: API_ROOT,
    transformResponse: [
        function (data) {
            if (typeof data === 'string' && data !== '') {
                try {
                    data = JSON.parse(data, (key, value) => {
                        return value;
                    });
                } catch (e) {
                    // eslint-disable-next-line no-console
                    console.log(e);
                }
            }
            return data;
        }
    ]
});

export default api;

const requestConfig = (authToken) => {
    return authToken ? { headers: { Authorization: `Bearer ${authToken}` } } : {};
};

export const apiGet = async (path, authToken) => {
    try {
        return await api.get(path, requestConfig(authToken));
    } catch (e) {
        throw e?.response?.data || e;
    }
};

export const apiPost = async (path, data, authToken) => {
    try {
        return await api.post(path, data, requestConfig(authToken));
    } catch (e) {
        throw e?.response?.data || e;
    }
};

export const apiPut = async (path, data, authToken) => {
    try {
        if (!data.id) {
            return await api.put(`${path}`, data, requestConfig(authToken));
        } else {
            return await api.put(`${path}/${data.id}`, data, requestConfig(authToken));
        }
    } catch (e) {
        throw e?.response?.data || e;
    }
};

export const apiDelete = async (path, data, authToken) => {
    try {
        return await api.delete(`${path}/${data.id}`, requestConfig(authToken));
    } catch (e) {
        throw e?.response?.data || e;
    }
};

export const resourceUrl = (path) => {
    return `${API_ROOT}/${path}`;
};
