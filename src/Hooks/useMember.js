import { useState, useEffect } from "react";
import useApi from "./useApi";

const useMembers = (page, perPage, orderBy, searchTerm) => {
  const [members, setMembers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { fetchData } = useApi([]);

  const getMembers = async () => {
    setError(null);
    try {
      setLoading(true);
      const res = await fetchData({
        method: "GET",
        url: `/members?page=${page}&per_page=${perPage}&order=${
          orderBy ? orderBy : "createdAt-desc"
        }&search=${searchTerm}`,
      });
      if (res) {
        setMembers(res.data);
        setLoading(false);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMembers();
  }, [page, perPage, fetchData, orderBy]);

  return { members, error, getMembers, loading };
};
export default useMembers;
