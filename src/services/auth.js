import instance from './api';

export const register = async (userData) => {
    try {
        const res = await instance.post('/auth/signup', userData);
        return res;
    } catch (error) {
        return error;
    }
};

export const login = async (userData) => {
    try {
        const res = await instance.post('/auth/signin', userData);
        return res;
    } catch (error) {
        return error;
    }
};
