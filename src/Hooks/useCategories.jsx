import { useState, useEffect } from "react";
import useApi from "./useApi";

const useCategories = ({ page, perPage, noPaginate }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { fetchData } = useApi([]);
  const [error, setError] = useState([]);

  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await fetchData({
        method: "GET",
        endPoint: `/categories?page=${page}&perPage=${perPage}&noPaginate=${noPaginate}`,
      });
      if (res) {
        setCategories(res.data);
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, [page, perPage, fetchData]);

  return { categories, error, getCategories, loading };
};

export default useCategories;
