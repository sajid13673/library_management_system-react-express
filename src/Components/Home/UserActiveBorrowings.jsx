import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import moment from "moment";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
  height: 60,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
function UserActiveBorrowings({ user }) {
  console.log(user?.member?.borrowings);

  return (
    <Card>
      <CardHeader title="active borrowings" />
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        p={1}
        justifyContent={"center"}
      >
        {user?.member?.borrowings.map((borrowing) => (
          <Grid xs={12} sm={6} key={borrowing.id}>
            <Card key={borrowing.id} sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h5" textTransform={"capitalize"}>
                  {borrowing.book.title} by {borrowing.book.author}
                </Typography>
                <Box
                  display={"grid"}
                  gridTemplateColumns="repeat(12, 1fr)"
                  gap={1}
                  p={1}
                >
                  <Typography variant="body2" gridColumn="span 6">
                    Borrowed Date:
                  </Typography>
                  <Typography variant="body2" gridColumn="span 6">
                    {moment(borrowing.created_at).format("DD/MM/YYYY HH:MM")}
                  </Typography>
                  <Typography variant="body2" gridColumn="span 6">
                    Due Date:
                  </Typography>
                  <Typography variant="body2" gridColumn="span 6">
                    {moment(borrowing.due_date).format("DD/MM/YYYY HH:MM")}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}

export default UserActiveBorrowings;
