import { Box, CircularProgress } from "@mui/material";
import React from "react";
import UserHome from "../Components/Home/UserHome";
import { useAuth } from "../utils/AuthProvider";
import AdminHome from "../Components/Home/AdminHome";

function Home({ user: userProp }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flex={1}
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  const role = user?.role;

  return (
    <Box flex={1} p={1}>
      {role === "admin" ? (
        <AdminHome />
      ) : (
        <UserHome user={userProp ?? user} />
      )}
    </Box>
  );
}

export default Home;