import React from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../../Components/Book/BookCard";
import axios from "axios";
import {
  Box,
  Pagination,
  Stack,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Loading from "../../Components/Loading";

export default function BookList(props) {
  const totalPages = props.totalPages;
  const data = Array.from(props.books);
  console.log("data");
  console.log(data);
  
  const navigate = useNavigate();
  function handleBookEdit(id) {
    console.log(id);
    navigate("/edit-book", { state: { id: id } });
  }
  function handleBookDelete(id) {
    axios
      .delete("http://localhost:5000/api/books/" + id)
      .then((res) => {
        if (res.data.status) {
          console.log("book deleted");
          props.getBooks();
        }
      })
      .catch((err) => console.log(err));
  }
  function handleAddBrowing(bookId) {
    navigate("/add-borrowing", { state: { bookId: bookId } });
  }
  function handleChange(e, value) {
    props.setBookPage(value);
  }
  React.useEffect(() => {}, []);
  return (
    <Box p={3} flex={1} display="flex" flexDirection="column" gap={2}>
      <Grid container spacing={2}>
        {data.length > 0 ? (
          data.map((row) => (
            <BookCard
              key={row.id}
              id={row.id}
              title={row.title}
              author={row.author}
              publisher={row.publisher}
              year={row.year}
              path={row.images[0]?.url}
              status={row.status}
              activeBorrowings={row.activeBorrowings}
              defaultImage={props.defaultImage}
              handleBookEdit={(id) => handleBookEdit(id)}
              handleBookDelete={(id) => handleBookDelete(id)}
              handleAddBrowing={(bookId) => handleAddBrowing(bookId)}
            />
          ))
        ) : (
          <Container className="keyMessage">
            {!props.loading ? (
              <Typography variant="h3">Nothing to show</Typography>
            ) : (
              <Loading />
            )}
          </Container>
        )}
      </Grid>
      <Stack spacing={2} sx={{ mt: "auto" }}>
        <Pagination
          count={totalPages}
          page={props.bookPage}
          color="primary"
          onChange={handleChange}
        />
      </Stack>
    </Box>
  );
}
