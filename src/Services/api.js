import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;

// Keep the access token in memory only.
let accessToken = null;

// Allow the authentication service to update the access token.
export const setAccessToken = (token) => {
    accessToken = token;
};

const api = axios.create({
    baseURL,
    withCredentials: true,
});

// Separate Axios instance for refreshing tokens.
// This prevents the refresh request from triggering the same interceptors.
const refreshApi = axios.create({
    baseURL,
    withCredentials: true,
});

// Attach the access token to outgoing API requests.
api.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Handle expired access tokens.
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !originalRequest.url?.includes('/refresh-token')
        ) {
            originalRequest._retry = true;

            try {
                // The browser sends the HttpOnly refresh-token cookie.
                const response = await refreshApi.post('/refresh-token');

                const newAccessToken = response.data.access_token;

                // Update the in-memory access token.
                setAccessToken(newAccessToken);

                // Retry the original request.
                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                // The refresh token may have expired or been revoked.
                setAccessToken(null);

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export const get = (endpoint, config = {}) =>
    api.get(endpoint, config);

export const post = (endpoint, data, config = {}) =>
    api.post(endpoint, data, config);

export const put = (endpoint, data, config = {}) =>
    api.put(endpoint, data, config);

export const del = (endpoint, config = {}) =>
    api.delete(endpoint, config);

export default api;