import React, { useEffect, useState } from "react";
import BorrowingCard from "../../Components/Borrowing/BorrowingCard";
import {
  Pagination,
  Stack,
  Grid,
  Typography,
  Box,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import Loading from "../../Components/Loading";
import useMembers from "../../Hooks/useMember";
import useBooks from "../../Hooks/useBook";
import useApi from "../../Hooks/useApi";
import useBorrowing from "../../Hooks/useBorrowing";

function BorrowingList() {
  const { getMembers } = useMembers({});
  const { getBooks } = useBooks();
  const [borrowings, setBorrowings] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [borrowingPage, setBorrowingPage] = useState(1);
  const [borrowingsPerPage, setBorrowingsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const borrowingsArray = borrowings ? Array.from(borrowings) : [];
  const { fetchData } = useApi([]);
  const {
    deleteBorrowing,
    deleteError,
    deleteLoading,
    deleteData,
    confirmReturn,
    returnData,
    returnError,
  } = useBorrowing();

  async function getBorrowings() {
    setLoading(true);
    fetchData({
      method: "GET",
      url: `http://localhost:5000/api/borrowings?per_page=${borrowingsPerPage}&page=${borrowingPage}&type=${type}`,
    })
      .then((res) => {
        if (res.data.status) {
          console.log(res.data);
          setBorrowings(res.data.data);
          setTotalPages(res.data.totalPages);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }
  function handleChange(e, value) {
    setBorrowingPage(value);
  }
  const [type, setType] = useState("all");
  const [currentId, setCurrentId] = useState();
  const handleTypeChange = (event) => {
    setBorrowingPage(1);
    setType(event.target.value);
  };
  useEffect(() => {
    getBorrowings();
  }, [borrowingPage]);
  useEffect(() => {
    getBorrowings();
    console.log(type);
  }, [type]);
  useEffect(() => {
    if (deleteData && deleteData.status) {
      getBorrowings();
    }
    if (deleteError) {
      console.error(deleteError);
    }
  }, [deleteData, deleteError]);
  useEffect(() => {
    if (returnData && returnData.status) {
      getBooks();
      getMembers();
      getBorrowings();
    }
    if (returnError) {
      console.error(returnError);
    }
  }, [returnData, returnError])
  return (
    <Box display="flex" flexDirection="column" p={3} flex={1} gap={2}>
      <FormControl sx={{ ml: "auto", mr: 5 }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Filter
        </InputLabel>
        <NativeSelect
          inputProps={{
            name: "filter",
            id: "uncontrolled-native",
          }}
          onChange={handleTypeChange}
        >
          <option value={"all"}>All</option>
          <option value={"active"}>Active</option>
          <option value={"returned"}>Returned</option>
        </NativeSelect>
      </FormControl>
      <Grid container xs={12} spacing={2}>
        {borrowingsArray.length > 0 ? (
          borrowingsArray.map((row) => (
            <BorrowingCard
              key={row.id}
              id={row.id}
              book={row.book}
              dueDate={row.dueDate}
              status={row.status}
              returnDate={row.returnDate}
              borrowedDate={row.createdAt}
              memberId={row.member.id}
              memberName={row.member.name}
              hasPendingFine={row.hasPendingFine}
              handleConfirmReturn={(id, formData) =>
                confirmReturn(id, formData)
              }
              currentId={currentId}
              setCurrentId={(id) => setCurrentId(id)}
              handleDelete={(id) => deleteBorrowing(id)}
            />
          ))
        ) : (
          <Box>
            {!loading ? (
              <Typography variant="h3">Nothing to show</Typography>
            ) : (
              <Loading />
            )}
          </Box>
        )}
      </Grid>
      {!loading && borrowingsArray.length > 0 && (
        <Stack spacing={2} sx={{ mt: "auto" }}>
          <Pagination
            count={totalPages}
            page={borrowingPage}
            color="primary"
            onChange={handleChange}
          />
        </Stack>
      )}
    </Box>
  );
}

export default BorrowingList;
