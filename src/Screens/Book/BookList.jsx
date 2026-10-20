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
  InputBase,
  IconButton,
} from "@mui/material";
import Loading from "../../Components/Loading";
import useBooks from "../../Hooks/useBook";
import useApi from "../../Hooks/useApi";
import SearchIcon from "@mui/icons-material/Search";
import { API_CONFIG } from "../../config/api";
import CustomSelect from "../../Components/CustomSelect";

export default function BookList() {
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
    searchTerm,
  );
  const data = Array.from(books?.data || []);
  const totalPages = books?.totalPages || 1;

  const navigate = useNavigate();
  const baseUrl = API_CONFIG.baseUrl;

  function handleBookEdit(id) {
    navigate("/edit-book", { state: { id: id } });
  }
  async function handleBookDelete(id) {
    deleteBook({
      method: "DELETE",
      endPoint: `/books/${id}`,
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
        <Box display="flex">
          {data.length > 0 && (
            <CustomSelect
              value={orderBy}
              onChange={(val) => setOrderBy(val)}
              options={[
                { value: "createdAt-desc", label: "New to old" },
                { value: "createdAt-asc", label: "Old to new" },
                { value: "title-asc", label: "Title ascending" },
                { value: "title-desc", label: "Title descending" },
                { value: "year-desc", label: "Year descending" },
                { value: "year-asc", label: "Year ascending" },
              ]}
              lablel={"Sort By"}
            />
          )}
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
        </Box>
      )}
      {data.length > 0 ? (
        <>
          <Grid container spacing={2}>
            {data.map((row) => (
              <BookCard
                key={row.id}
                id={row.id}
                title={row.title}
                author={row.author}
                publisher={row.publisher}
                year={row.year}
                image={row.images[0]?.url ? baseUrl + row.images[0]?.url : null}
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
