import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";

function UserPendingFines({ fines = [] }) {
  return (
    <Card
      elevation={2}
      sx={[
        {
          height: "100%",
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
        },
        (theme) =>
          theme.applyStyles("dark", {
            boxShadow: "0px 4px 20px rgba(238, 96, 68, 0.15)",
          }),
      ]}
    >
      <CardHeader
        title="Pending Fines"
        titleTypographyProps={{ variant: "subtitle1", fontWeight: 700 }}
        sx={[
          {
            py: 2,
            px: 3,
            background: "linear-gradient(45deg, #ff1e11 4%, #ff8c36 45%)",
            color: "#fff",
          },
          (theme) =>
            theme.applyStyles("dark", {
              background: "linear-gradient(45deg, #982b2b 18%, #c46c28 51%)",
            }),
        ]}
      />

      <CardContent
        sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            maxHeight: "26rem",
            overflowY: "auto",
            pr: 0.5,
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
            "&::-webkit-scrollbar": { width: 5 },
            "&::-webkit-scrollbar-track": { background: "transparent" },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: 2,
              backgroundColor: "action.selected",
            },
          }}
        >
          {fines.length > 0 ? (
            fines.map((fine) => (
              <Grid item xs={12} key={fine.id}>
                <Card
                  elevation={0}
                  sx={[
                    {
                      borderRadius: 2,
                      backgroundColor: "action.hover",
                      border: "1px solid",
                      borderColor: "divider",
                      borderLeft: "4px solid",
                      borderLeftColor: "error.light",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "translateX(4px)" },
                    },
                    (theme) =>
                      theme.applyStyles("dark", {
                        borderLeftColor: "error.main",
                      }),
                  ]}
                >
                  <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                    {/* Header Row: Book Details */}
                    <Box
                      display="flex"
                      alignItems="flex-start"
                      gap={1.5}
                      mb={1.5}
                    >
                      <BookIcon color="error" sx={{ mt: 0.25 }} />
                      <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                        <Typography
                          variant="body1"
                          fontWeight="600"
                          noWrap
                          sx={{
                            textTransform: "capitalize",
                            color: "text.primary",
                            lineHeight: 1.3,
                          }}
                        >
                          {fine.borrowing.book.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                          display="block"
                        >
                          by {fine.borrowing.book.author}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ borderStyle: "dashed" }} />

                    {/* Balanced Financial Logistics Row */}
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mt={1.5}
                    >
                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                        >
                          Overdue Duration
                        </Typography>
                        <Typography
                          variant="caption"
                          fontWeight="600"
                          color="text.primary"
                        >
                          {fine.days} {fine.days === 1 ? "day" : "days"}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                        >
                          Fine Accrued
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          fontWeight="800"
                          color="error.main"
                          sx={{ lineHeight: 1.2 }}
                        >
                          ${fine.amount}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            /* Clean Empty State */
            <Grid item xs={12}>
              <Box
                sx={{
                  py: 6,
                  px: 3,
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1.5,
                  border: "1px dashed",
                  borderColor: "divider",
                  backgroundColor: "background.default",
                  color: "text.secondary",
                  textAlign: "center",
                }}
              >
                <PriceCheckIcon sx={{ fontSize: 32, color: "success.main" }} />
                <Typography
                  variant="subtitle2"
                  fontWeight="600"
                  color="text.primary"
                >
                  No Pending Fines
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ maxWidth: 220 }}
                >
                  Your account is in good standing. There are no outstanding
                  overdue fees.
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
