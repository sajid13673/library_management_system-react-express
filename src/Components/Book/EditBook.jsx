import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookForm from "./BookForm";
import { Box } from "@mui/material";
import useBooks from "../../Hooks/useBook";
function EditBook(props) {
  const {getBooks} = useBooks();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  const [book, setBook] = React.useState({});
  const getBookById = async (id) => {
    await axios.get("http://localhost:5000/api/books/" + id).then((res) => {
      console.log(res.data);
      if (res.data.status) {
        setBook(res.data.data);
      }
    });
  };
  const handleSubmit = async (values) => {
    const formData = new FormData();
    Object.keys(values).map((key) => formData.append(key, values[key]));
    await axios
      .put("http://localhost:5000/api/books/" + id, formData)
      .then((res) => {
        if (res.data.status) {
          navigate("/");
          getBooks();
        }
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getBookById(id);
  }, []);
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
        book={book}
        title="update book"
      />
    </Box>
  );
}
export default EditBook;
