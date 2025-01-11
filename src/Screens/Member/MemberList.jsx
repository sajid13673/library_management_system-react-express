import React, { useState } from "react";
import MembersCard from "../../Components/Member/MembersCard";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  Stack,
  Button,
  Container,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Loading from "../../Components/Loading";
import useMembers from "../../Hooks/useMember";
import useApi from "../../Hooks/useApi";

export default function MemberList(props) {
  const { fetchData } = useApi();
  const [page, setPage] = useState(1);
  const {members, error, getMembers} = useMembers(page, 5)
  const data = Array.from(members?.data || []);
  const totalPages = members?.totalPages || 1;
  console.log(data);
  
  const navigate = useNavigate();
  function handleBorrowings(id) {
    navigate("/member-borrowing-list", { state: { memberId: id } });
  }
  function handleAddMember() {
    navigate("/add-member");
  }
  function handleEditMember(id) {
    navigate("/edit-member", { state: { id: id } });
  }
  async function handleDeleteMember(id) {
      await fetchData({method: "DELETE", url: `http://localhost:5000/api/members/${id}`})
      .then((res) => {
        if (res.data.status) {
          console.log("member deleted");
          getMembers();
        }
      })
      .catch((err) => console.log(err));
  }
  function handleChange(e, value) {
    setPage(value);
  }
  return (
    <Box flex={1} display="flex" flexDirection="column" p={2} gap={2}>
      {error && <Typography>Error</Typography>}
      <Button
        variant="contained"
        sx={{ maxWidth: "15rem" }}
        color="primary"
        onClick={handleAddMember}
      >
        ADD MEMBER
        <AddCircleIcon style={{ marginLeft: "5px" }} />
      </Button>
      <Grid container spacing={2}>
        {data.length > 0 ? (
          data.map((row) => (
            <MembersCard
              key={row.id}
              id={row.id}
              name={row.name}
              email={row.user.email}
              phone_number={row.phone_number}
              address={row.address}
              path={row?.image?.url}
              defaultImage={props.defaultImage}
              handleEditMember={(id) => handleEditMember(id)}
              handleDeleteMember={(id) => handleDeleteMember(id)}
              handleBorrowings={(id) => handleBorrowings(id)}
              activeBorrowings={row.activeBorrowingStatus}
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
      {data.length > 0 && !props.loading && (
        <Stack spacing={2} sx={{ mt: "auto" }}>
          <Pagination
            count={totalPages}
            page={page}
            color="primary"
            onChange={handleChange}
          />
        </Stack>
      )}
    </Box>
  );
}
