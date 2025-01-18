import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import React, { useEffect } from "react";
import moment from "moment";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from '@mui/icons-material/Close';
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
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useAuth } from "../../utils/AuthProvider";

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-input": {
      border: 0,
      fontSize: 11,
    },
  },
});
function BorrowingCard(props) {
  const classes = useStyles();
  const {token} = useAuth();
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(false);
  const [formData, setFormData] = React.useState({
    status: false,
    returnDate: null,
    _method: "put",
  });

  function handleChange(value) {
    const returnDate =
      value === null
        ? null
        : moment(value.toDate()).format("YYYY-MM-DD HH:mm:ss");
    console.log("date :" + returnDate);
    setError(false);
    setFormData((prevFormData) => {
      return { ...prevFormData, returnDate: returnDate };
    });
  }
  function handleSetReturnDate(id) {
    props.setCurrentId(id);
    setFormData((prevFormData) => {
      return { ...prevFormData, returnDate: null };
    });
  }
  function handleSubmit(id, formData, book) {
    if (formData.returnDate === null) {
      setError(true);
      setErrorMsg("Required");
    } else if (formData.returnDate === "Invalid date") {
      setError(true);
      setErrorMsg("Enter Valid Date");
    } else if (
      !moment(props.borrowed_date).isBefore(moment(formData.returnDate))
    ) {
      setError(true);
      setErrorMsg("Entered date is before the borrowed date");
    } else {
      props.handleConfirmReturn(id, formData, book);
    }
  }
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
      <Card sx={{ flexGrow: 1, maxHeight: "25rem", display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div">
            {props.member}
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={7} sx={{ pr: "30px", alignContent: "center" }}>
              <Grid container spacing={1} sx={{ mb: 1 }}>
                <Grid item xs={6}>
                  <Typography align="left" variant="body1" component="p">
                    Borrowed Date:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="left" variant="body1" component="p" color="textSecondary">
                    {moment(props.borrowed_date).format('DD MMMM YYYY')}
                    <br />
                    {moment(props.borrowed_date).format('hh:mm:ss A')}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="left" variant="body1" component="p">
                    Due date:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="left" variant="body1" color="error" component="p">
                    {moment(props.dueDate).format('DD MMMM YYYY')}
                    <br />
                    {moment(props.dueDate).format('hh:mm:ss A')}
                  </Typography>
                </Grid>
              </Grid>
              {!props.status ? (
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body1" component="p" align="left">
                      Return Date:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" color="textSecondary" component="p" align="left">
                      {moment(props.returnDate).format('DD MMMM YYYY')}
                      <br />
                      {moment(props.returnDate).format('hh:mm:ss A')}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <Grid container xs={12} spacing={1} sx={{ alignItems: 'center' }}>
                  <Grid item xs={props.currentId === props.id ? 4 : 6}>
                    <Typography variant="body1" align="left" component="p">
                      Return Date:
                    </Typography>
                  </Grid>
                  {props.currentId === props.id ? (
                    <Grid item xs={8}>
                      <FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateTimePicker
                            className={classes.root}
                            onChange={(newValue) => handleChange(newValue)}
                            slotProps={{
                              textField: { size: 'small', fontSize: 'sm' },
                            }}
                          />
                        </LocalizationProvider>
                        {error && <div className="error">{errorMsg}</div>}
                      </FormControl>
                    </Grid>
                  ) : (
                    <Grid item xs={6}>
                      {token.role === 'admin' ? (
                        <Button onClick={() => handleSetReturnDate(props.id)} size="small" variant="contained" color="primary">
                          Set Return Date
                        </Button>
                      ) : (
                        <Typography textTransform="uppercase" variant="body2" color="error">
                          Not Returned
                        </Typography>
                      )}
                    </Grid>
                  )}
                  {props.currentId === props.id && (
                    <Grid item xs={2}>
                      <Tooltip title="CONFIRM RETURNED" placement="top-start" TransitionComponent={Zoom}>
                        <ButtonGroup>
                          <Button
                            onClick={() => handleSubmit(props.id, formData, props.book)}
                            variant="contained"
                            color="primary"
                            size="small"
                          >
                            <DoneOutlineIcon />
                          </Button>
                          <Button sx={{ ml: 4 }} color="error" variant="contained" onClick={() => props.setCurrentId(null)}>
                            <CloseIcon />
                          </Button>
                        </ButtonGroup>
                      </Tooltip>
                    </Grid>
                  )}
                </Grid>
              )}
            </Grid>
            <Grid item xs={12} sm={5}>
              {props.book !== null && (
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">
                  <Typography variant="h6" component="p" align="left" gridColumn="span 12">
                    Book Details
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gridColumn="span 4" component="p" align="left">
                    Title:
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" gridColumn="span 8" align="left">
                    {props.book.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" gridColumn="span 4" align="left">
                    Author:
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" gridColumn="span 8" align="left">
                    {props.book.author}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" gridColumn="span 4" align="left">
                    Publisher:
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" gridColumn="span 8" align="left">
                    {props.book.publisher}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" gridColumn="span 4" align="left">
                    Year:
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" gridColumn="span 8" align="left">
                    {props.book.year}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
        {token.role === 'admin' && (
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            {!props.status && (
              <Button onClick={() => props.handleDelete(props.id)} size="small" variant="contained" color="secondary" sx={{ background: '#E71919' }}>
                Delete
                <DeleteForeverIcon sx={{ ml: 1 }} />
              </Button>
            )}
          </CardActions>
        )}
      </Card>
    </Grid>
  );
}
export default BorrowingCard;

