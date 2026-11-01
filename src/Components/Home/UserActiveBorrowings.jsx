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
import BookIcon from "@mui/icons-material/Book";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

function UserActiveBorrowings({ user }) {
  const borrowings = user?.member?.borrowings || [];

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
            boxShadow: "0px 4px 20px rgba(61, 166, 236, 0.15)",
          }),
      ]}
    >
      <CardHeader
        title="Active Borrowings"
        titleTypographyProps={{ variant: "subtitle1", fontWeight: 700 }}
        sx={[
          {
            py: 2,
            px: 3,
            background: "linear-gradient(45deg, #1976d2 0%, #17d2fc 100%)",
            color: "#fff",
          },
          (theme) =>
            theme.applyStyles("dark", {
              background: "linear-gradient(45deg, #084b94 0%, #1199b8 100%)",
            }),
        ]}
      />

      <CardContent
        sx={{ py: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            m: 0,
            display: "flex",
            flexGrow: 1,
            maxHeight: "26rem",
            overflowY: "auto",
            // Custom modern micro-scrollbar setup
            "&::-webkit-scrollbar": { width: 5 },
            "&::-webkit-scrollbar-track": { background: "transparent" },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: 2,
            },
          }}
        >
          {borrowings.length > 0 ? (
            borrowings.map((borrowing) => (
              <Grid
                item
                xs={12}
                key={borrowing.id}
                sx={{ p: 2, alignContent: "center" }}
              >
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "action.hover",
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "translateX(4px)" },
                  }}
                >
                  <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                    {/* Header Row: Icon & Metadata Info */}
                    <Box
                      display="flex"
                      alignItems="flex-start"
                      gap={1.5}
                      mb={1.5}
                    >
                      <BookIcon color="primary" sx={{ mt: 0.25 }} />
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
                          {borrowing.book.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                          display="block"
                          sx={{ textTransform: "capitalize" }}
                        >
                          by {borrowing.book.author}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ borderStyle: "dashed" }} />

                    {/* Logistical Metrics Grid */}
                    <Box
                      display="flex"
                      flexDirection="column"
                      gap={0.75}
                      mt={1.5}
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          fontWeight="500"
                        >
                          Borrowed Date
                        </Typography>
                        <Typography
                          variant="caption"
                          fontWeight="600"
                          color="text.primary"
                        >
                          {moment(borrowing.created_at).format(
                            "DD MMM YYYY, hh:mm A",
                          )}
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          fontWeight="500"
                        >
                          Due Date
                        </Typography>
                        <Typography
                          variant="caption"
                          fontWeight="600"
                          color="error.main"
                        >
                          {moment(borrowing.due_date).format(
                            "DD MMM YYYY, hh:mm A",
                          )}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            /* Illustrative Empty State Alternative */
            <Grid item xs={12}>
              <Box
                sx={{
                  bgcolor: "red",
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
                <InfoOutlinedIcon
                  sx={{ fontSize: 32, color: "text.disabled" }}
                />
                <Typography
                  variant="subtitle2"
                  fontWeight="600"
                  color="text.primary"
                >
                  No Active Borrowings
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ maxWidth: 220 }}
                >
                  Your account currently has no pending book returns or active
                  transactions.
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
