import axios from 'axios';
const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

const refreshAccessToken = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData);
    
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/refresh-token`, { refreshToken: userData.refreshToken });
    const newAccessToken = response.data.access_token;
    localStorage.setItem('access_token', newAccessToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
    return newAccessToken;
};

api.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await refreshAccessToken();
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const get = (endpoint, config = {}) => api.get(endpoint, config);
export const post = (endpoint, data, config = {}) => api.post(endpoint, data, config);
export const put = (endpoint, data, config = {}) => api.put(endpoint, data, config);
export const del = (endpoint, config = {}) => api.delete(endpoint, config);

export default api;

