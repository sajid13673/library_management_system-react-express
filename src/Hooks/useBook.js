import { useState, useEffect } from "react";
import useApi from "./useApi";

const useBooks = (page, perPage) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const {fetchData} = useApi([]);
    const [error, setError] = useState([]);

    const getBooks = async () => {
        try {
            setLoading(true);
            const res = await fetchData({method: 'GET', url: `/books?page=${page}&perPage=${perPage}`})
            if(res){
                setBooks(res.data);
                setLoading(false);	
            }
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    useEffect(()=>{
        getBooks();   
    }, [page, perPage, fetchData]);

    return {books, error, getBooks, loading}
}

export default useBooks;