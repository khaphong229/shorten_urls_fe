import instance from './api';

export const createLink = async (data) => {
    try {
        const res = await instance.post('/shortenurls', data);
        return res;
    } catch (error) {
        return error;
    }
};

export const getAllShortLink = async () => {
    try {
        const res = await instance.get('/shortenurls')
        return res
    } catch(error) {
        return error
    }
}

export const deleteShortLink = async (id) => {
    try {
        const res = await instance.delete(`/shortenurls/${id}`);
        return res;
    } catch (error) {
        return error;
    }
};


export const updateShortLink = async (id, data) => {
    try {
        const res = await instance.patch(`/shortenurls/${id}`, data);
        return res;
    } catch (error) {
        return error;
    }
};

export const getShortLinkById = async (id) => {
    try {
        const res = await instance.get(`/shortenurls/${id}`);
        return res;
    } catch (error) {
        return error;
    }
};

export const searchShortLink = async (name) => {
    try {
        const res = await instance.get(`shortenurls/filter?alias=${name}`);
        return res;
    } catch (error) {
        return error;
    }
};