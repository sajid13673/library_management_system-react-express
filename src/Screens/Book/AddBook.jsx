import React, { useEffect } from "react";
import BookForm from "../../Components/Book/BookForm";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import useBooks from "../../Hooks/useBook";
import useApi from "../../Hooks/useApi";

function AddBook(props) {
  const { fetchData, data, loading, error } = useApi([]);
  const { getBooks } = useBooks();
  const navigate = useNavigate();

  async function handleSubmit(values) {
    const formData = new FormData();
    Object.keys(values).forEach((key) => formData.append(key, values[key]));
    fetchData({
      method: "POST",
      url: `http://localhost:5000/api/books`,
      data: formData,
    });
  }
  useEffect(() => {
    if (data && data.status) {
      getBooks();
      navigate("/book-list");
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
      minHeight="calc(100vh - 69px)"
    >
      <BookForm
        handleSubmit={handleSubmit}
        validateOnlyNumbers={props.validateOnlyNumbers}
        title="ADD BOOK"
        loading={loading}
        error={error}
      />
    </Box>
  );
}

export default AddBook;
