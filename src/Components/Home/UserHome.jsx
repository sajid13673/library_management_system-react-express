import React from "react";
import UserActiveBorrowings from "./UserActiveBorrowings";
import UserPendingFines from "./UserPendingFines";
import { Grid } from "@mui/material";

function UserHome({ user }) {
  return (
    <Grid container spacing={2} p={1} pb={3}>
      <Grid item sm={12} md={6} p={1}>
        <UserActiveBorrowings user={user} />
      </Grid>
      <Grid item sm={12} md={6} p={1}>
        <UserPendingFines fines={user?.member?.fines} />
      </Grid>
    </Grid>
  );
}

export default UserHome;
