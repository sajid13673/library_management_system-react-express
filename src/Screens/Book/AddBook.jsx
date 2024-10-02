import React from "react";
import BookForm from "../../Components/Book/BookForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
function AddBook(props) {
  const navigate = useNavigate();
  async function handleSubmit(values) {
    const formData = new FormData();
    Object.keys(values).map((key) => formData.append(key, values[key]));
    await axios
      .post("http://127.0.0.1:8000/api/book", formData)
      .then((res) => {
        if (res.data.status) {
          props.getBooks();
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <BookForm
        handleSubmit={(values) => handleSubmit(values)}
        validateOnlyNumbers={(str) => props.validateOnlyNumbers(str)}
        title="ADD BOOK"
      />
    </Box>
  );
}

export default AddBook;
