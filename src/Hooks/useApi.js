// hooks/useApi.js
import { useState, useCallback } from 'react';
import { get, post, put, del } from '../Services/api';
import { useAuth } from '../utils/AuthProvider';

const useApi = (initialData = []) => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const { token } = useAuth();
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (requestConfig = {}) => {
        setLoading(true);
        setError(null);

        try {
            let response;
            const { method, endPoint , data } = requestConfig;

            const config = {
                ...requestConfig,
                headers: {
                    Authorization: token ? `Bearer ${token.token}` : '',
                    ...requestConfig.headers,
                },
            };
            const url = baseUrl+endPoint;

            switch (method) {
                case 'GET':
                    response = await get(url, config);
                    break;
                case 'POST':
                    response = await post(url, data, config);
                    break;
                case 'PUT':
                    response = await put(url, data, config);
                    break;
                case 'DELETE':
                    response = await del(url, config);
                    break;
                default:
                    throw new Error('Invalid method');
            }

            setData(response.data);
            return response;
        } catch (err) {
            console.error('Fetch Data Error:', err);
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    }, [token]);

    return { data, loading, error, fetchData };
};

export default useApi;