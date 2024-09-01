import { data } from 'autoprefixer';
import instance from './api';

export const createApiKey = async (data) => {
    try {
        const res = await instance.post('/apikeys', data);
        return res;
    } catch (error) {
        return error;
    }
};

export const getAllApiKey = async () => {
    try {
        const res = await instance.get('/apikeys');
        return res;
    } catch (error) {
        return error;
    }
};

export const deleteApiKey = async (route) => {
    try {
        const res = await instance.delete(route);
        return res;
    } catch (error) {
        return error;
    }
};

export const editStatusApiKey = async (route, data) => {
    try {
        const res = await instance.patch(route, data);
        return res;
    } catch (error) {
        return error;
    }
};
