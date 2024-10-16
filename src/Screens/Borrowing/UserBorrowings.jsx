import React from "react";
import BorrowingCard from "../../Components/Borrowing/BorrowingCard";
import { Box, Grid, Typography } from "@mui/material";
import Loading from "../../Components/Loading";

function UserBorrowings({ borrowings }) {
  console.log(borrowings);
  return (
    <Box display="flex" flexDirection="column" p={3} flex={1} gap={2}>
      <Grid container spacing={2}>
        {borrowings && borrowings.length > 0 ? (
          borrowings.map((row) => (
            <BorrowingCard
              key={row.id}
              id={row.id}
              book={row.book}
              due_date={row.due_date}
              status={row.status}
              return_date={row.return_date}
              borrowed_date={row.created_at}
            />
          ))
        ) : (
          <Box>
            <Typography variant="h3">Nothing to show</Typography>
          </Box>
        )}
      </Grid>
    </Box>
  );
}

export default UserBorrowings;
