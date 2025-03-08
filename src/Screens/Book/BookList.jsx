import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../../Components/Book/BookCard";
import {
  Box,
  Pagination,
  Stack,
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  NativeSelect,
  InputBase,
  IconButton,
} from "@mui/material";
import Loading from "../../Components/Loading";
import useBooks from "../../Hooks/useBook";
import useApi from "../../Hooks/useApi";
import SearchIcon from "@mui/icons-material/Search";

export default function BookList(props) {
  const {
    fetchData: deleteBook,
    error: deleteError,
    loading: deleteLoading,
    data: deleteData,
  } = useApi([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [orderBy, setOrderBy] = useState("createdAt-desc");
  const [searchTerm, setSearchTerm] = useState("");
  const { books, error, getBooks, loading } = useBooks(
    page,
    perPage,
    orderBy,
    searchTerm
  );
  const data = Array.from(books?.data || []);
  const totalPages = books?.totalPages || 1;

  const navigate = useNavigate();
  function handleBookEdit(id) {
    navigate("/edit-book", { state: { id: id } });
  }
  async function handleBookDelete(id) {
    deleteBook({
      method: "DELETE",
      url: `http://localhost:5000/api/books/${id}`,
    });
  }
  function handleAddBrowing(bookId) {
    navigate("/add-borrowing", { state: { bookId: bookId } });
  }
  function handleChange(e, value) {
    setPage(value);
  }
  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    getBooks();
  };
  useEffect(() => {
    if (deleteData && deleteData.status) {
      getBooks();
    }
    if (deleteError) {
      console.error(deleteError);
    }
  }, [deleteData, deleteError]);
  useEffect(() => {
    if (totalPages < page) {
      setPage(totalPages);
    }
  }, [totalPages]);

  return (
    <Box p={3} flex={1} display="flex" flexDirection="column" gap={2}>
      {!loading && (
        <Box
          component="form"
          onSubmit={handleSearch}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "10rem",
            ml: "auto",
            mr: 3,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search google maps" }}
            onChange={handleSearchChange}
            value={searchTerm}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
      )}
      {data.length > 0 ? (
        <>
          <FormControl sx={{ ml: "auto", mr: 3 }}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Sort by
            </InputLabel>
            <NativeSelect
              inputProps={{
                name: "filter",
                id: "uncontrolled-native",
              }}
              onChange={handleOrderByChange}
            >
              <option value={"createdAt-desc"}>New to old</option>
              <option value={"createdAt-asc"}>Old to new</option>
              <option value={"title-asc"}>Title ascending</option>
              <option value={"title-desc"}>Title descending</option>
              <option value={"year-desc"}>Year descending</option>
              <option value={"year-asc"}>Year ascending</option>
            </NativeSelect>
          </FormControl>
          <Grid container spacing={2}>
            {data.map((row) => (
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
            ))}
          </Grid>
          <Stack spacing={2} sx={{ mt: "auto" }}>
            <Pagination
              count={totalPages}
              page={page}
              color="primary"
              onChange={handleChange}
            />
          </Stack>
        </>
      ) : (
        <Container className="keyMessage">
          {!loading ? (
            <Typography variant="h3">Nothing to show</Typography>
          ) : (
            <Loading />
          )}
        </Container>
      )}
    </Box>
  );
}
