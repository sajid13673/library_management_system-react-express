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
  FormControl,
  InputLabel,
  NativeSelect,
  IconButton,
  InputBase,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Loading from "../../Components/Loading";
import useMembers from "../../Hooks/useMember";
import useApi from "../../Hooks/useApi";
import SearchIcon from "@mui/icons-material/Search";

export default function MemberList() {
  const { fetchData } = useApi();
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState("createdAt-desc");
  const [searchTerm, setSearchTerm] = useState("");
  const { members, error, getMembers, loading } = useMembers({
    page,
    perPage: 12,
    orderBy,
    searchTerm
  });
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
    await fetchData({
      method: "DELETE",
      url: `http://localhost:5000/api/members/${id}`,
    })
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
  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    getMembers();
  };
  return (
    <Box flex={1} display="flex" flexDirection="column" p={2} gap={2}>
      {error && <Typography>Error</Typography>}
      <Box display="flex">
        <Button
          variant="contained"
          sx={{ maxWidth: "15rem" }}
          color="primary"
          onClick={handleAddMember}
        >
          ADD MEMBER
          <AddCircleIcon style={{ marginLeft: "5px" }} />
        </Button>
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
          <option value={"name-asc"}>Name ascending</option>
          <option value={"name-desc"}>Name descending</option>
        </NativeSelect>
      </FormControl>
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
              path={row?.image?.url || null}
              handleEditMember={(id) => handleEditMember(id)}
              handleDeleteMember={(id) => handleDeleteMember(id)}
              handleBorrowings={(id) => handleBorrowings(id)}
              activeBorrowings={row.activeBorrowingStatus}
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
      {data.length > 0 && !loading && (
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
