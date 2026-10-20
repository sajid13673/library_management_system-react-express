import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  Stack,
  Button,
  Typography,
  Box,
  IconButton,
  InputBase,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useMembers from "../../Hooks/useMember";
import useApi from "../../Hooks/useApi";
import SearchIcon from "@mui/icons-material/Search";
import MembersTable from "../../Components/Member/MembersTable";
import CustomSelect from "../../Components/CustomSelect";
import Loading from "../../Components/Loading";
export default function MemberList() {
  const { fetchData: deleteMember } = useApi();
  const { fetchData: toggleStatus, loading: toggleLoading } = useApi();
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState("createdAt-desc");
  const [searchTerm, setSearchTerm] = useState("");
  const { members, error, getMembers, loading } = useMembers({
    page,
    perPage: 12,
    orderBy,
    searchTerm,
  });
  const data = Array.from(members?.data || []);
  const totalPages = members?.totalPages || 1;
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
    await deleteMember({
      method: "DELETE",
      endPoint: `/members/${id}`,
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
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    getMembers();
  };
  const handleStatusChange = async (id) => {
    try {
      await toggleStatus({
        method: "PUT",
        endPoint: `/members/${id}/status`,
      });
      getMembers();
    } catch (error) {
      console.error("Failed to update member status:", error);
    }
  };
  return (
    <Box flex={1} display="flex" flexDirection="column" p={2} gap={2}>
      {error && <Typography>Error</Typography>}
      <Box display="flex">
        <Button
          variant="contained"
          size="small"
          sx={{ maxWidth: "12rem" }}
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
      <CustomSelect
        value={orderBy}
        onChange={(value) => setOrderBy(value)}
        options={[
          { value: "createdAt-desc", label: "New to old" },
          { value: "createdAt-asc", label: "Old to new" },
          { value: "name-asc", label: "Name ascending" },
          { value: "name-desc", label: "Name descending" },
        ]}
        sx={{
          ml: "auto",
          mr: 3,
          "& .MuiInputLabel-root": { fontSize: "0.875rem" },
        }}
      />
      {data.length > 0 && !loading ? (
        <MembersTable
          members={data}
          handleEditMember={handleEditMember}
          handleDeleteMember={handleDeleteMember}
          handleBorrowings={handleBorrowings}
          handleStatusChange={handleStatusChange}
          toggleLoading={toggleLoading}
        />
      ) : (
        <>
          {!loading ? (
            <Typography variant="h3">Nothing to show</Typography>
          ) : (
            <Loading />
          )}
        </>
      )}
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
