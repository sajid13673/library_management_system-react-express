import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Paper,
  styled,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import moment from "moment";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

function UserActiveBorrowings({ user }) {
  console.log(user?.member?.borrowings);

  return (
    <Card sx={{ margin: 3 }}>
      <CardHeader 
        title="Active Borrowings" 
        // sx={{ backgroundColor: "#1976d2", color: "#fff", textAlign: "center" }}
        sx={[
          (theme) => ({
            backgroundColor: theme.palette.primary.main,
            color: "#fff"
          }),
          (theme) =>
            theme.applyStyles('dark', {
              backgroundColor:'rgb(64, 131, 199)',
            }),
        ]}
      />
      <CardContent>
        <Grid 
          container 
          spacing={2}
          justifyContent="center"
        >
          {user?.member?.borrowings.map((borrowing) => (
            <Grid item xs={12} sm={6} key={borrowing.id}>
              <Card 
              sx={[
                (theme) => ({
                  backgroundColor: '#C7E3FF',
                }),
                (theme) =>
                  theme.applyStyles('dark', {
                    backgroundColor:'rgb(23, 70, 117)',
                  }),
              ]}>
                <CardContent>
                  <Typography variant="h5" gutterBottom 
                  sx={[
                    (theme) => ({
                      color: theme.palette.primary.main
                    }),
                    (theme) =>
                      theme.applyStyles('dark', {
                        color:'#fff',
                      }),
                  ]}>
                    {borrowing.book.title} by {borrowing.book.author}
                  </Typography>
                  <Divider />
                  <Box
                    display="flex"
                    flexDirection="column"
                    mt={2}
                  >
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">Borrowed Date:</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {moment(borrowing.created_at).format("DD/MM/YYYY HH:mm")}
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">Due Date:</Typography>
                      <Typography variant="body2" color="error">
                        {moment(borrowing.due_date).format("DD/MM/YYYY HH:mm")}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default UserActiveBorrowings;
