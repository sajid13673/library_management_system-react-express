import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  Tooltip,
  Typography,
  Zoom,
  Divider,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import { useAuth } from "../../utils/AuthProvider";

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-input": {
      border: 0,
      fontSize: 11,
    },
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  cardContent: {
    flexGrow: 1,
  },
  detailsSection: {
    marginBottom: "1rem",
  },
  bookDetails: {
    marginTop: "1rem",
  },
});

function BorrowingCard(props) {
  const classes = useStyles();
  const { user } = useAuth();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    status: false,
    returnDate: null,
    _method: "put",
  });
  const isAdmin = user.role === "admin";
  const isEditingThis = props.currentId === props.id;

  function handleChange(value) {
    const returnDate =
      value === null
        ? null
        : moment(value.toDate()).format("YYYY-MM-DD HH:mm:ss");
    console.log("date :" + returnDate);
    setError(false);
    setFormData((prevFormData) => ({
      ...prevFormData,
      returnDate,
    }));
  }

  function handleSetReturnDate(id) {
    props.setCurrentId(id);
    setFormData((prevFormData) => ({
      ...prevFormData,
      returnDate: null,
    }));
  }

  function handleSubmit(id, formData) {
    if (formData.returnDate === null) {
      setError(true);
      setErrorMsg("Required");
    } else if (formData.returnDate === "Invalid date") {
      setError(true);
      setErrorMsg("Enter Valid Date");
    } else if (
      !moment(props.borrowedDate).isBefore(moment(formData.returnDate))
    ) {
      setError(true);
      setErrorMsg("Entered date is before the borrowed date");
    } else {
      props.handleConfirmReturn(id, formData);
    }
  }

  return (
    <Grid item xs={12} md={6} sx={{ display: "flex" }}>
      <Card
        elevation={2}
        sx={{
          width: "100%",
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        className={classes.card}
      >
        <CardContent className={classes.cardContent} sx={{ p: 3, flexGrow: 1 }}>
          {isAdmin && (
            <Typography
              gutterBottom
              variant="h6"
              fontWeight="600"
              color="primary.main"
              sx={{ textTransform: "capitalize", mb: 1.5 }}
            >
              {props.memberName}{" "}
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
              >
                (ID: {props.memberId})
              </Typography>
            </Typography>
          )}

          <Divider sx={{ mb: 2 }} className={classes.detailsSection} />

          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              sm={7}
              sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
            >
              <Grid container spacing={1}>
                <Grid item xs={5}>
                  <Typography variant="body2" fontWeight="500">
                    Borrowed Date:
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="body2" color="text.secondary">
                    {moment(props.borrowedDate).format("DD MMMM YYYY, hh:mm A")}
                  </Typography>
                </Grid>

                <Grid item xs={5}>
                  <Typography variant="body2" fontWeight="500">
                    Due Date:
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography
                    variant="body2"
                    color="error.main"
                    fontWeight="500"
                  >
                    {moment(props.dueDate).format("DD MMMM YYYY, hh:mm A")}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 0.5, borderStyle: "dashed" }} />

              <Grid container spacing={1} alignItems="center">
                <Grid item xs={5}>
                  <Typography variant="body2" fontWeight="500">
                    Return Date:
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  {props.status ? (
                    isEditingThis ? (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          width: "100%",
                        }}
                      >
                        <FormControl fullWidth error={error}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                              className={classes.root}
                              onChange={(newValue) => handleChange(newValue)}
                              slotProps={{
                                textField: { size: "small", fullWidth: true },
                              }}
                            />
                          </LocalizationProvider>
                        </FormControl>
                        {error && (
                          <Typography
                            variant="caption"
                            color="error.main"
                            sx={{ mt: 0.5 }}
                          >
                            {errorMsg}
                          </Typography>
                        )}
                      </Box>
                    ) : isAdmin ? (
                      <Button
                        onClick={() => handleSetReturnDate(props.id)}
                        size="small"
                        variant="outlined"
                        color="primary"
                        sx={{ textTransform: "none", borderRadius: 1.5 }}
                      >
                        Set Return Date
                      </Button>
                    ) : (
                      <Typography
                        textTransform="uppercase"
                        variant="caption"
                        fontWeight="600"
                        color="error.main"
                      >
                        Not Returned
                      </Typography>
                    )
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      {moment(props.returnDate).format("DD MMMM YYYY, hh:mm A")}
                    </Typography>
                  )}
                </Grid>
              </Grid>

              {props.status && isEditingThis && (
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}
                >
                  <Tooltip
                    title="Confirm Return"
                    placement="top"
                    TransitionComponent={Zoom}
                  >
                    <ButtonGroup size="small" variant="contained">
                      <Button
                        onClick={() => handleSubmit(props.id, formData)}
                        color="success"
                      >
                        <DoneOutlineIcon fontSize="small" />
                      </Button>
                      <Button
                        color="error"
                        onClick={() => props.setCurrentId(null)}
                      >
                        <CloseIcon fontSize="small" />
                      </Button>
                    </ButtonGroup>
                  </Tooltip>
                </Box>
              )}
            </Grid>

            {/* Right Side: Micro Book Profile Card */}
            <Grid item xs={12} sm={5} className={classes.bookDetails}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "action.hover",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="600"
                  sx={{
                    color: "text.primary",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    pb: 0.5,
                  }}
                >
                  Book Details
                </Typography>

                {props.book ? (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    {/* Title Block - Wraps up to 2 lines, then adds an ellipsis */}
                    <Box title={props.book.title}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                        sx={{ fontWeight: 500 }}
                      >
                        Title:
                      </Typography>
                      <Typography
                        variant="caption"
                        fontWeight="600"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          lineHeight: 1.3,
                          color: "text.primary",
                        }}
                      >
                        {props.book.title}
                      </Typography>
                    </Box>

                    {/* Author Block - Wraps up to 2 lines, then adds an ellipsis */}
                    <Box title={props.book.author}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                        sx={{ fontWeight: 500 }}
                      >
                        Author:
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          lineHeight: 1.3,
                          color: "text.primary",
                        }}
                      >
                        {props.book.author}
                      </Typography>
                    </Box>

                    {/* Publisher Block - Single line truncation */}
                    <Box title={props.book.publisher}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                        sx={{ fontWeight: 500 }}
                      >
                        Publisher:
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          color: "text.primary",
                        }}
                      >
                        {props.book.publisher}
                      </Typography>
                    </Box>

                    {/* Year Block */}
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                        sx={{ fontWeight: 500 }}
                      >
                        Year:
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.primary" }}
                      >
                        {props.book.year || "N/A"}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Typography variant="caption" color="text.secondary">
                    Book details unavailable
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>

        {/* Outer Managed Card Actions Container */}
        {isAdmin && !props.status && (
          <CardActions sx={{ justifyContent: "flex-end", px: 3, pb: 2, pt: 0 }}>
            <Button
              onClick={() => props.handleDelete(props.id)}
              size="small"
              variant="contained"
              color="error"
              disabled={props.hasPendingFine}
              sx={{ textTransform: "none", borderRadius: 1.5 }}
            >
              Delete Record
            </Button>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
}

export default BorrowingCard;
