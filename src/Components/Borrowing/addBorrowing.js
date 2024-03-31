import { Button, Container, FormControl, Grid,  TextField, Typography } from '@material-ui/core'
import { Autocomplete } from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
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
        options: Array.from(members),
        getOptionLabel: (option) => option.id+'. '+option.name,
      };
      async function getMembers(){
        await axios.get('http://127.0.0.1:8000/api/member').then((res)=>{
            if(res.data.status){
                setMembers(res.data.data)
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
                axios.post('http://127.0.0.1:8000/api/book/'+bookId,form).then((res)=>{
            if(res.data.status){
                props.getBooks();
                navigate('/');
            }
        }).catch(err => console.log(err))
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
      //not needed
      useEffect(()=>{
        console.log("formData");
        console.log(formData);
      },[formData, book])
      
  return (
    <Grid className="grid" style={{ alignItems: "center" }}>
      <Container className="input-form" maxWidth="sm">
        <Grid item xs={12}>
          <Typography variant='h3'>ADD BORROWING</Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl>
              <Autocomplete
              style={{ maxWidth: "24rem", width: "24rem"}}

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
              {error && (<div className="error" >Please select a member</div>)}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h5'>
                DUE DATE: {moment(formData.due_date).format("MMMM DD YYYY")}
            </Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography variant='h6'>
            Book Details
          </Typography>
            <Typography align='left'>
                Book Name: {book.name}
                <br/>
                Author: {book.author}
                <br/>
                Publisher: {book.publisher}
                <br/>
                Year: {book.year}
            </Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography variant='h6'>
            Member Details
          </Typography>
            <Typography align='left'>
                Name: {value !== null ? value.name : "Not Available"}
                <br/>
                Phone Number: {value !== null ? value.phone_number : "Not Available"}
                <br/>
                Email: {value !== null ? value.email : "Not Available"}
                <br/>
                Status: {value !== null ? value.status ? "Active" : "Inactive" : "Not Available"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Add Borrowing
            </Button>
          </Grid>
        </Grid>
        {/* </form> */}
      </Container>
    </Grid>
  );
}

export default AddBorrowing