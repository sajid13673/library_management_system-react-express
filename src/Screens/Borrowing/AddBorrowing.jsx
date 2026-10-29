import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  FormControl,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import useMembers from "../../Hooks/useMember";
import useBooks from "../../Hooks/useBook";
import useApi from "../../Hooks/useApi";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PersonIcon from "@mui/icons-material/Person";

function AddBorrowing() {
  const { fetchData } = useApi([]);
  const { members, getMembers } = useMembers({ all: true });
  const { getBooks } = useBooks();
  const location = useLocation();
  const navigate = useNavigate();
  const bookId = location.state.bookId;
  const [formData, setFormData] = React.useState({
    memberId: "",
    bookId: bookId,
    dueDate: "",
    status: true,
    return_date: "",
  });
  const handleChange = (value) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, memberId: value === null ? "" : value.id };
    });
    setValue(value);
    setError(value === null ? true : false);
  };

  const [book, setBook] = React.useState({});
  const [value, setValue] = React.useState(null);
  const [error, setError] = React.useState(false);
  const defaultProps = {
    options: Array.from(members.data ? members.data : []),
    getOptionLabel: (option) => option.id + ". " + option.name,
  };
  const [loading, setLoading] = React.useState(false);
  async function getBookById() {
    await fetchData({ method: "GET", endPoint: `/books/${bookId}` })
      .then((res) => {
        if (res.data.status) {
          setBook(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  }
  async function handleSubmit() {
    if (formData.memberId) {
      const form = new FormData();
      Object.keys(book).map((key) => form.append(key, book[key]));
      form.set("status", 0);
      fetchData({
        method: "POST",
        endPoint: `/borrowings`,
        data: formData,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
        .then((res) => {
          if (res.status) {
            getBooks();
            getMembers();
            navigate("/borrowing-list");
          }
        })
        .catch((err) => console.log(err));
    } else {
      setError(true);
    }
  }
  useEffect(() => {
    getMembers();
    getBookById();
    console.log(members);
    const date = moment().format("YYYY-MM-DDTHH:mm:ss");
    const dueDate = moment(date).add(5, "days").format("YYYY-MM-DD HH:mm:ss");
    setFormData((prevFormData) => {
      return { ...prevFormData, dueDate: dueDate };
    });
  }, []);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="grey.50"
      p={3}
    >
      {loading ? (
        <Loading />
      ) : (
        <Card
          sx={{
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            borderRadius: 3,
            p: 1,
            maxWidth: "55rem",
            width: "100%",
          }}
        >
          <CardContent>
            {/* Header Section */}
            <Box mb={3}>
              <Typography variant="h5" fontWeight="700" color="text.primary">
                Add New Borrowing
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Assign a book to an active organization member.
              </Typography>
            </Box>

            <Divider sx={{ mb: 4 }} />

            <Grid container spacing={4}>
              {/* Form & Member Selection */}
              <Grid item xs={12}>
                <FormControl fullWidth error={error}>
                  <Autocomplete
                    {...defaultProps}
                    id="controlled-demo"
                    value={value}
                    onChange={(event, newValue) => handleChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Member"
                        variant="outlined"
                        error={error}
                        helperText={
                          error ? "Please select a member to proceed" : ""
                        }
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              {/* Dynamic Visual Banner for Due Date */}
              <Grid item xs={12}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1.5,
                    bgcolor: "primary.ultraLight", // Fallback to 'action.hover' if ultraLight token isn't in your theme
                    borderColor: "primary.light",
                    borderRadius: 2,
                  }}
                >
                  <CalendarMonthIcon color="primary" />
                  <Typography
                    variant="subtitle1"
                    fontWeight="600"
                    color="primary.dark"
                  >
                    Due Date: {moment(formData.dueDate).format("DD MMMM YYYY")}
                  </Typography>
                </Paper>
              </Grid>

              {/* Book Details Container */}
              <Grid item xs={12} md={6}>
                <Paper
                  variant="outlined"
                  sx={{ p: 2.5, borderRadius: 2, height: "100%" }}
                >
                  <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                    <AutoStoriesIcon fontSize="small" color="action" />
                    <Typography variant="subtitle1" fontWeight="600">
                      Book Details
                    </Typography>
                  </Stack>
                  <Divider sx={{ mb: 2 }} />
                  <Stack spacing={1.5}>
                    <DetailRow label="Title" value={book.title} />
                    <DetailRow label="Author" value={book.author} />
                    <DetailRow label="Publisher" value={book.publisher} />
                    <DetailRow label="Year" value={book.year} />
                  </Stack>
                </Paper>
              </Grid>

              {/* Member Details Container */}
              <Grid item xs={12} md={6}>
                <Paper
                  variant="outlined"
                  sx={{ p: 2.5, borderRadius: 2, height: "100%" }}
                >
                  <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                    <PersonIcon fontSize="small" color="action" />
                    <Typography variant="subtitle1" fontWeight="600">
                      Member Details
                    </Typography>
                  </Stack>
                  <Divider sx={{ mb: 2 }} />
                  {value !== null ? (
                    <Stack spacing={1.5}>
                      <DetailRow label="Name" value={value.name} />
                      <DetailRow label="Number" value={value.phone_number} />
                      <DetailRow label="Email" value={value.user.email} />
                      <Box
                        display="flex"
                        justifyContent="between"
                        alignItems="center"
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ minWidth: 80 }}
                        >
                          Status:
                        </Typography>
                        <Chip
                          label={value.status ? "Active" : "Inactive"}
                          color={value.status ? "success" : "default"}
                          size="small"
                          variant="soft" // Fallback to 'filled' if soft variants are unconfigured
                        />
                      </Box>
                    </Stack>
                  ) : (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="70%"
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontStyle="italic"
                      >
                        No member selected yet
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </CardContent>

          <CardActions sx={{ p: 2, justifyContent: "flex-end" }}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              size="large"
              disableElevation
              sx={{ px: 4, borderRadius: 2 }}
            >
              Create Borrowing Record
            </Button>
          </CardActions>
        </Card>
      )}
    </Box>
  );
}

function DetailRow({ label, value }) {
  return (
    <Box display="flex" alignItems="flex-start">
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ minWidth: 80, pr: 1 }}
      >
        {label}:
      </Typography>
      <Typography variant="body2" fontWeight="500" color="text.primary">
        {value || "—"}
      </Typography>
    </Box>
  );
}

export default AddBorrowing;
