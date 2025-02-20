import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";

function UserPendingFines({ fines }) {
  return (
    <Card sx={{  boxShadow: 3, height: "100%" }}>
      <CardHeader
        title="pending fines"
        sx={[
          (theme) => ({
            backgroundColor: theme.palette.error.main,
            color: "#fff",
            padding: theme.spacing(2),
          }),
          (theme) =>
            theme.applyStyles("dark", {
              backgroundColor: "#bc3838",
            }),
        ]}
      />
      <CardContent>
        <Grid
          container
          spacing={1}
          justifyContent="center"
          sx={{
            maxHeight: "25rem",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none", 
          }}
        >
          {fines?.length > 0 ? (
            fines.map((fine) => (
              <Grid item xs={12} key={fine.id}>
                <Card
                  sx={[
                    {
                      backgroundColor: "#ffd7d7",
                      height: "100%",
                    },
                    (theme) =>
                      theme.applyStyles("dark", {
                        backgroundColor: "#5f1111",
                      }),
                  ]}
                  variant="filled"
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1}>
                      <BookIcon
                        sx={(theme) => ({
                          mr: 1,
                          color: theme.palette.primary.main,
                        })}
                      />
                      <Typography
                        variant="h6"
                        sx={(theme) => ({
                          color: theme.palette.primary.main,
                          fontWeight: "bold",
                        })}
                      >
                        {fine.borrowing.book.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        by {fine.borrowing.book.author}
                      </Typography>
                    </Box>

                    <Box sx={{ textAlign: "center", mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Total Amount
                      </Typography>
                      <Typography
                        variant="h5"
                        component="div"
                        color="error"
                        sx={[
                          { fontWeight: "bold" },
                          (theme) =>
                            theme.applyStyles("dark", {
                              color: theme.palette.error.main, 
                            }),
                        ]}
                      >
                        ${fine.amount}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        for {fine.days} {fine.days === 1 ? "day" : "days"}
                      </Typography>
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
                    padding: theme.spacing(3),
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100px",
                    color: theme.palette.text.secondary,
                  }),
                  (theme) =>
                    theme.applyStyles("dark", {
                      backgroundColor: "rgb(40, 40, 40)", 
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

export default UserPendingFines;
