import { useState, useEffect } from "react";
import useApi from "./useApi";

const useBooks = (page, perPage) => {
    const [books, setBooks] = useState([]);
    const {fetchData} = useApi([]);
    const [error, setError] = useState([]);

    const getBooks = async () => {
        try {
            const res = await fetchData({method: 'GET', url: `/books?page=${page}&perPage=${perPage}`})
            if(res){
                setBooks(res.data);
            }
        } catch (error) {
            setError(error);
        }
    }

    useEffect(()=>{
        getBooks();   
    }, [page, perPage, fetchData]);

    return {books, error, getBooks}
}

export default useBooks;