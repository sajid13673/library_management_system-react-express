import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import moment from "moment";

function UserActiveBorrowings({ user }) {
  console.log(user?.member?.borrowings);

  return (
    <Card sx={{ margin: 3 }}>
      <CardHeader
        title="Active Borrowings"
        sx={[
          (theme) => ({
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
          }),
          (theme) =>
            theme.applyStyles("dark", {
              backgroundColor: "rgb(64, 131, 199)",
            }),
        ]}
      />
      <CardContent>
        <Grid container spacing={2} justifyContent="center">
          {user?.member?.borrowings.length > 0 ? (
            user?.member?.borrowings.map((borrowing) => (
              <Grid item xs={12} sm={6} key={borrowing.id}>
                <Card
                  sx={[
                    {
                      height: "100%",
                    },
                    {
                      backgroundColor: "#C7E3FF",
                    },
                    (theme) =>
                      theme.applyStyles("dark", {
                        backgroundColor: "rgb(23, 70, 117)",
                      }),
                  ]}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={[
                        (theme) => ({
                          color: theme.palette.primary.main,
                        }),
                        (theme) =>
                          theme.applyStyles("dark", {
                            color: "#fff",
                          }),
                      ]}
                    >
                      {borrowing.book.title} by {borrowing.book.author}
                    </Typography>
                    <Divider />
                    <Box display="flex" flexDirection="column" mt={2}>
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body2">Borrowed Date:</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {moment(borrowing.created_at).format(
                            "DD/MM/YYYY HH:mm"
                          )}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body2">Due Date:</Typography>
                        <Typography variant="body2" color="error">
                          {moment(borrowing.due_date).format(
                            "DD/MM/YYYY HH:mm"
                          )}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Box
                sx={[
                  (theme) => ({
                    backgroundColor: "#f0f0f0",
                    padding: 3,
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100px",
                    color: theme.palette.text.secondary,
                  }),
                  (theme) =>
                    theme.applyStyles("dark", {
                      backgroundColor: "rgb(23, 70, 117)",
                      color: "#fff",
                    }),
                ]}
              >
                <Typography
                  variant="h6"
                  sx={[
                    (theme) => ({
                      color: theme.palette.text.secondary,
                    }),
                    (theme) =>
                      theme.applyStyles("dark", {
                        color: "#fff",
                      }),
                  ]}
                >
                  No active borrowings
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default UserActiveBorrowings;
