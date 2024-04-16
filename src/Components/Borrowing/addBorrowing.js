import { Button, Container, FormControl, Grid,  TextField, Typography } from '@material-ui/core'
import { Autocomplete } from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Loading from '../loading'
function AddBorrowing(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const bookId = location.state.bookId;
    const [formData,setFormData] = React.useState({
        member_id:"",
        book_id:bookId,
        due_date:"",
        status:true,
        return_date:"",
    });
  const handleChange = (value) => {
    setFormData(prevFormData=>{return{...prevFormData, member_id : value === null ? "" : value.id}})
    setValue(value);
    setError(value === null ? true : false)
  };

    
      const [members, setMembers] = React.useState({});
      const [book, setBook] = React.useState({});
      const [value, setValue] = React.useState(null);
      const [error,setError] = React.useState(false);
      const defaultProps = {
        options: Array.from(members.data ? members.data : []),
        getOptionLabel: (option) => option.id+'. '+option.name,
      };
      const [loading, setLoading] = React.useState(false);
      async function getMembers(){
        setLoading(true);
        await axios.get('http://127.0.0.1:8000/api/member').then((res)=>{
            if(res.data.status){
                setMembers(res.data.data)
                setLoading(false);
                console.log(res.data.data);
            }
        }).catch(err => console.log(err))
      }
      async function getBookById() {
        await axios.get('http://127.0.0.1:8000/api/book/'+bookId).then((res)=>{
            if(res.data.status){
                setBook(res.data.data)
            }
        }).catch(err => console.log(err))
      }
      async function handleSubmit(){
        if(formData.member_id){
            const form = new FormData();
            Object.keys(book).map((key) => form.append(key, book[key]));
            form.append("_method","put");
            form.set("status",0)
        await axios.post('http://127.0.0.1:8000/api/borrowing',formData).then((res)=>{
            if(res.data.status){
              props.getBooks();
              props.getMembers();
              navigate('/');
            }
        }).catch(err => console.log(err))
        }
        else{
          setError(true)
        }
      }
      useEffect(()=>{
        getMembers();
        getBookById()
        console.log(members);
        const date = moment().format("YYYY-MM-DDTHH:mm:ss");
        const dueDate = moment(date).add(5, 'days').format('YYYY/MM/DD HH:mm:ss');
        setFormData(prevFormData=>{return{...prevFormData, due_date:dueDate}})
      },[])
      
  return (
    <Grid className="grid" style={{ alignItems: "center" }}>
      {loading ? (
        <Loading />
      ) : (
        <Container className="input-form" maxWidth="sm">
          <Grid item xs={12}>
            <Typography variant="h3">ADD BORROWING</Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl>
                <Autocomplete
                  style={{ maxWidth: "24rem", width: "24rem" }}
                  {...defaultProps}
                  id="controlled-demo"
                  value={value}
                  onChange={(event, newValue) => handleChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Member"
                      variant="standard"
                    />
                  )}
                />
                {error && <div className="error">Please select a member</div>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">
                DUE DATE: {moment(formData.due_date).format("MMMM DD YYYY")}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Book Details</Typography>
              <Grid container xs={12} style={{ textAlign: "left" }}>
              <Grid item xs={4}>
                  <Typography variant="body1" color="textSecondary">Title:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" color="textSecondary">{book.title}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" color="textSecondary">Author:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" color="textSecondary">{book.author}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" color="textSecondary">Publisher:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" color="textSecondary">{book.publisher}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" color="textSecondary">Year:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" color="textSecondary">{book.year}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Book Details</Typography>
              {value !== null ? (<Grid container xs={12} style={{ textAlign: "left" }}>
              <Grid item xs={4}>
                  <Typography variant="body1" color="textSecondary">Name:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" color="textSecondary">{value.name}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" color="textSecondary">Number:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" color="textSecondary">{value.phone_number}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" color="textSecondary">Email:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" color="textSecondary">{value.email}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" color="textSecondary">Status:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" color="textSecondary">{value.status
                    ? "Active"
                    : "Inactive"}</Typography>
                </Grid>
              </Grid>) : 
              (<Typography variant="body1" color="textSecondary">
                Not Selected
              </Typography>)}
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
              >
                Add Borrowing
              </Button>
            </Grid>
          </Grid>
          {/* </form> */}
        </Container>
      )}
    </Grid>
  );
}

export default AddBorrowing