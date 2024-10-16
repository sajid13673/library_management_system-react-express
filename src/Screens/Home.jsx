import { Box } from "@mui/material";
import React from "react";
import UserHome from "../Components/Home/UserHome";
import { useAuth } from "../Utils/authProvider";
import AdminHome from "../Components/Home/AdminHome";

function Home({ user }) {
  const { token } = useAuth();
  return (
    <Box flex={1} p={1}>
      {token.role === "admin" ? <AdminHome /> : <UserHome user={user} />}
    </Box>
  );
}

export default Home;
