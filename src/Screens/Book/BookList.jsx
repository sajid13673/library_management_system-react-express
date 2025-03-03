import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../../Components/Book/BookCard";
import {
  Box,
  Pagination,
  Stack,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Loading from "../../Components/Loading";
import useBooks from "../../Hooks/useBook";
import useApi from "../../Hooks/useApi";

export default function BookList(props) {
  const {fetchData} = useApi([]);
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(12)
  const {books, error, getBooks, loading} = useBooks(page, perPage)
  const data = Array.from(books?.data || []);
  const totalPages = books?.totalPages || 1;
  console.log("data");
  console.log(data);
  
  const navigate = useNavigate();
  function handleBookEdit(id) {
    console.log(id);
    navigate("/edit-book", { state: { id: id } });
  }
  async function handleBookDelete(id) {
    
      fetchData({method: "DELETE", url: `http://localhost:5000/api/books/${id}`})
      .then((res) => {
        if (res.status) {
          getBooks();
        }
      })
      .catch((err) => console.log(err));
  }
  function handleAddBrowing(bookId) {
    navigate("/add-borrowing", { state: { bookId: bookId } });
  }
  function handleChange(e, value) {
    setPage(value);
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
              path={row.images[0]?.url || null}
              status={row.status}
              activeBorrowings={row.activeBorrowings}
              handleBookEdit={(id) => handleBookEdit(id)}
              handleBookDelete={(id) => handleBookDelete(id)}
              handleAddBrowing={(bookId) => handleAddBrowing(bookId)}
            />
          ))
        ) : (
          <Container className="keyMessage">
            {!loading ? (
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
          page={page}
          color="primary"
          onChange={handleChange}
        />
      </Stack>
    </Box>
  );
}
