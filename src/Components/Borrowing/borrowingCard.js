import { Button, Card, CardContent, FormControl, Grid, Tooltip, Typography, Zoom, makeStyles } from '@material-ui/core';
import {  DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import React, { useEffect } from 'react'
import moment from 'moment';

const useStyles = makeStyles({
    root: {
      "& .MuiOutlinedInput-input": {
        border: 0,
        fontSize: 11
      }
    }
  });
function BorrowingCard(props) {
    const classes = useStyles();
    const [error, setError] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState(false)
    const [formData, setFormData] = React.useState({
        status: false,
        return_date:null,
        _method: "put"
    })

    function handleChange(value) {
        const return_date =value === null ? null : moment(value.toDate()).format("YYYY-MM-DD hh:mm:ss");
        console.log("date :"+return_date);
        setError(false)
        setFormData(prevFormData=>{return{...prevFormData, return_date : return_date}})
    }
    function handleSetReturnDate(id){
        props.setCurrentId(id);
        setFormData(prevFormData=>{return{...prevFormData, return_date : null}})
    }
    function handleSubmit(id, formData, book) {
      if (formData.return_date === null) {
        setError(true);
        setErrorMsg("Required");
      } else if (formData.return_date === "Invalid date") {
        setError(true);
        setErrorMsg("Enter Valid Date");
      } else {
        props.handleConfirmReturn(id, formData, book);
      }
    }
    useEffect(()=>{
        console.log(formData);
    },[formData])
  return (
    <Grid item xs={6}>
      <Card  style={{ minWidth: "400px", height: "220px" }}>
        <CardContent>
          <Grid container spacing={1} xs={12}>
          <Grid item xs={12}>
          <Typography gutterBottom variant="h6" component="div">
                {props.member}
              </Typography>
              </Grid>
            <Grid item xs={7} style={{ paddingRight: "30px", alignContent: "center" }}>
              <Grid container spacing={1} style={{ marginBottom: "10px" }}>
              <Grid item xs={6}>
                  <Typography align="left" variant="body1" component="p">
                    Borrowed Date: 
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="left" variant="body1" component="p">
                      {moment(props.borrowed_date).format("YYYY-MM-DD")}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="left" variant="body1" component="p">
                    Due date: 
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    align="left"
                    variant="body1"
                    color="red"
                    component="p"
                    style={{ color: "red" }}
                  >
                    {props.due_date}
                  </Typography>
                </Grid>
              </Grid>
              {!props.status ? (
              <Grid container >
                <Grid item xs={6}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  component="p"
                  align='left'
                >
                  Return Date: 
                </Typography>
                </Grid>
                <Grid item xs={6}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  component="p"
                  align='left'
                >
                  {props.return_date}
                </Typography>
                </Grid>
                </Grid>
              )
              : (
                <Grid container xs={12} spacing={1} style={{ alignItems: "center" }} >
                  <Grid item xs={2}>
                    <Typography  variant="caption" align="left" color="text.secondary" component="p" >
                      Return Date:
                    </Typography>
                  </Grid>
                  {props.currentId === props.id ? (<Grid item xs={8}>
                    <FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DateTimePicker 
                      className={classes.root} 
                      onChange={(newValue) => handleChange(newValue)}
                        slotProps={{ textField: { size: "small", fontSize: "sm" } }}
                      />
                    </LocalizationProvider>
                    {error && (<div className='error'>{errorMsg}</div>)}
                    </FormControl>
                  </Grid>) : 
                  (<Grid item xs={8}><Button onClick={()=>handleSetReturnDate(props.id)} size="small" variant='contained' color='primary'>set return date</Button></Grid>)}
                  {props.currentId === props.id && (<Grid item xs={2}>
                    <Tooltip title="CONFIRM RETURNED" placement="top-start" TransitionComponent={Zoom}>
                        <Button onClick={()=>handleSubmit(props.id, formData, props.book)} variant="contained" color="primary" size='small' >
                        <DoneOutlineIcon />
                        </Button>
                    </Tooltip>
                  </Grid>)}
                </Grid>
              )}
            </Grid>
            <Grid item xs={5} style={{ alignContent: "center" }}>
              {props.book !== null && (
                    <Grid container xs={12}>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="text.secondary" component="p"align="left">
                                Book Details
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography variant="body2" color="text.secondary" component="p"align="left">
                                Title:
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant="body2" color="text.secondary" component="p"align="left">
                               {props.book.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography variant="body2" color="text.secondary" component="p"align="left">
                                Author: 
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant="body2" color="text.secondary" component="p"align="left">
                                {props.book.author}
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography variant="body2" color="text.secondary" component="p"align="left">
                                Publisher:
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant="body2" color="text.secondary" component="p"align="left">
                                {props.book.publisher}
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography variant="body2" color="text.secondary" component="p"align="left">
                                Year: 
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant="body2" color="text.secondary" component="p"align="left">
                                 {props.book.year}
                            </Typography>
                        </Grid>
                  </Grid>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
export default BorrowingCard