import axios from "axios";

const baseUrl = process.env.VUE_APP_API_URL;
const pendingRequests = new Map();

const axiosInstance = axios.create({
    baseURL: baseUrl,
});

const getRequestKey = (config) => {
    return `${config.method}:${config.url}`;
};

const createRequest = (requestConfig) => {
    const key = getRequestKey(requestConfig);
    
    if (pendingRequests.has(key)) {
        return pendingRequests.get(key);
    }

    const promise = axiosInstance(requestConfig).finally(() => {
        pendingRequests.delete(key);
    });
    
    pendingRequests.set(key, promise);
    return promise;
};

const extendedAxios = {
    post(url, data, config = {}) {
        return createRequest({
            method: 'post',
            url,
            data,
            config,
        });
    },
    get(url) {
        return createRequest({
            method: 'get',
            url,
        });
    },
    patch(url, data) {
        return createRequest({
            method: 'patch',
            url,
            data,
        });
    },
    delete(url) {
        return createRequest({
            method: 'delete',
            url,
        });
    }
};

export default extendedAxios;