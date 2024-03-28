import { Button, Container, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import { Autocomplete } from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
function AddBorrowing() {
    const location = useLocation()
    const [formData,setFormData] = React.useState({
        member_id:"",
        book_id:location.state.bookId,
        due_data:"",
        status:"",
        return_date:"",
    })
    console.log(location.state.bookId)
    // const validate = (values) => {
    //     let errors = {};
    //     if (!values.title) {
    //         errors.title = 'Required';
    //     }
    //     if (!values.author) {
    //         errors.author = 'Required';
    //     }
    //     if (!values.publisher) {
    //         errors.publisher = 'Required';
    //     }
    //     if (!values.description) {
    //         errors.description = 'Required';
    //     }
    //     if (!values.image) {
    //         errors.image = 'Required';
    //     }
    //     return errors;
    // }
    // const formik = useFormik({
    //     initialValues: {
    //         title: '',
    //         author: '',
    //         publisher: '',
    //         description: '',
    //         image: null,
    //         bookId: location.state.bookId
    //     },
    //     validationSchema: validate,
    //     onSubmit: (values) => {

    //     }
    // })
  const handleChange = (value) => {
    setFormData(prevFormData=>{return{...prevFormData, member_id : value}})
    console.log(value);
  };

    const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
      ];
      const [members, setMembers] = React.useState({})
      const [value, setValue] = React.useState(null);
      async function getMembers(){
        await axios.get('http://127.0.0.1:8000/api/member').then((res)=>{
            if(res.data.status){
                setMembers(res.data.data)
                console.log(res.data.data);
            }
        }).catch(err => console.log(err))
      }
      useEffect(()=>{
        getMembers();
        console.log(members);
      },[])
      useEffect(()=>{
        console.log("formData");
        console.log(formData);
      },[formData])
      const defaultProps = {
        options: members,
        getOptionLabel: (option) => option.name,
      };
  return (
    <Grid className="grid">
      <Container className="input-form" maxWidth="sm">
        <Grid item xs={12}>
          <h1>ADD BORROWING</h1>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                onChange={(event, value) => handleChange(value)}
                options={names}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Movie" />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <Autocomplete
                {...defaultProps}
                id="controlled-demo"
                value={value}
                onChange={(event, newValue) => handleChange(newValue.id)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Member"
                    variant="standard"
                  />
                )}
              />
            </FormControl>
          </Grid>
          {/* <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="my-input">Year</InputLabel>
              <Input
                error={formik.errors.year}
                name="year"
                type="text"
                aria-describedby="my-helper-text"
                value={formik.values.year}
                onChange={formik.handleChange}
              />
              {formik.errors.year ? (
                <div className="error">{formik.errors.year}</div>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="my-input">Image</InputLabel>
              <Input
                error={formik.errors.year}
                name="year"
                type="text"
                aria-describedby="my-helper-text"
                value={formik.values.year}
                onChange={formik.handleChange}
              />
              {formik.errors.image ? (
                <div className="error">{formik.errors.image}</div>
              ) : null}
            </FormControl>
          </Grid> */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
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