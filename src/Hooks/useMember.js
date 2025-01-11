import { useState, useEffect } from 'react';
import useApi from './useApi';

const useMembers = (page, perPage) => {
    const [members, setMembers] = useState({});
    const [error, setError] = useState(null);
    const { fetchData } = useApi([]);

    const getMembers = async () => {
        setError(null);
        try {
            const res = await fetchData({ method: 'GET', url: `/members?page=${page}&per_page=${perPage}` });
            if (res) {
                setMembers(res.data);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        getMembers();
    }, [page, perPage, fetchData]);

    return { members, error, getMembers };
};

export default useMembers;
