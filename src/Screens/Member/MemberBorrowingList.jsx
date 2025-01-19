import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import BorrowingCard from "../../Components/Borrowing/BorrowingCard";
import { useLocation } from "react-router-dom";
import { Box, Pagination, Stack } from "@mui/material";
import Loading from "../../Components/Loading";
import useMembers from "../../Hooks/useMember";
import useBooks from "../../Hooks/useBook";
import useApi from "../../Hooks/useApi";

function MemberBorrowingList(props) {
  const {getMembers} = useMembers();
  const {getBooks} = useBooks();
  const {fetchData} = useApi();
  const location = useLocation();
  const memberId = location.state.memberId;
  
  const [member, setMember] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [borrowingPage, setBorrowingPage] = React.useState(1);
  const [borrowingsPerPage, setBorrowingsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(false);
  const borrwings = member?.borrowings ? Array.from(member.borrowings) : [];

  async function getMemberWithBorrowings() {
  console.log("memberId: " + memberId);

    setLoading(true);
    fetchData({
      method: "GET",
      url: `/members/${memberId}?borrowings=1&borrowingPage=${borrowingPage}&borrowingsPerPage=${borrowingsPerPage}`,
    })
      .then((res) => {
        if (res.data.status) {
          console.log(res.data)
          setLoading(false);
          setMember(res.data.data);
          setTotalPages(res.data.totalPages);
        }
      })
      .catch((err) => console.log(err));
  }
  async function handleConfirmReturn(id, formData, book) {
    await props.handleConfirmReturn(id, formData, book).then((res) => {
      if (res) {
        getBooks();
        getMembers();
        getMemberWithBorrowings();
      }
    });
  }
  function handleChange(e, value) {
    setBorrowingPage(value);
  }
  async function handleDelete(id) {
    await props
      .handleDeleteBorrowing(id)
      .then((res) => {
        res && getMemberWithBorrowings();
      })
      .catch((err) => console.log(err));
  }

  const [currentId, setCurrentId] = React.useState();
  React.useEffect(() => {
    getMemberWithBorrowings();
  }, [borrowingPage]);
  return (
    <Box display="flex" flexDirection="column" flex={1} p={2} gap={2}>
      <Grid container xs={12} spacing={2}>
        {borrwings.length > 0 ? (
          borrwings.map((row) => (
            <BorrowingCard
              key={row.id}
              id={row.id}
              book={row.book}
              dueDate={row.dueDate}
              status={row.status}
              returnDate={row.returnDate}
              borrowedDate={row.createdAt}
              member={member.id + ". " + member.name}
              handleConfirmReturn={(id, formData, book) =>
                handleConfirmReturn(id, formData, book)
              }
              currentId={currentId}
              setCurrentId={(id) => setCurrentId(id)}
              handleDelete={(id) => handleDelete(id)}
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
      {!loading && borrwings.length > 0 && (
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

export default MemberBorrowingList;
