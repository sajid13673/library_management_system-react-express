import { Button, Container, FormControl, Grid, Input, InputLabel, Typography } from '@material-ui/core';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function MemberForm(props){
    const navigate = useNavigate();
    const [currentPhoneNumber,setCurrentPhoneNumber] = React.useState("")
    function handleUpload(e){
        e.preventDefault();
        const file = e.target.files[0];
        formik.setFieldValue('image', file)
    }
    function validateAdderess(str) {
        return /^[A-Za-z0-9 /.,]*$/.test(str);
      }
      
    var mimeSet = new Set(["image/png", "image/jpeg", "image/jpg"])
    const validate = (values) => {
        let errors = {};
        if (!values.name) {
            errors.name = 'Required';
        }
        if (!values.email) {
            errors.email = 'Required';
        }
        else if (props.validateEmail(values.email)) {
            errors.email = 'Invalid email address';
            }
        if (!values.phone_number) {
            errors.phone_number = 'Required';
        }
        else if(!props.validateOnlyNumbers(values.phone_number)) {
            errors.phone_number = "Invalid phone number"
        }
        else if(values.phone_number.length !== 10){
          if(currentPhoneNumber !== ""){
            if(currentPhoneNumber !== values.phone_number){
              errors.phone_number = "Phone number must 10 digits long"
          }
          }
          else{
            errors.phone_number = "Phone number must 10 digits long"
          }
      }
        if (!values.address) {
            errors.address = 'Required';
        }
        else if(!validateAdderess(values.address)){ 
            errors.address = "Invalid Address"        
         }
         if(values.image){
            let imageType = values.image.type;
            if(!mimeSet.has(imageType)){
                errors.image = 'Please select a PNG, JPG and JPEG file';
            }
        }
         return errors;
    }
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone_number: '',
            address: '',
            image: ''
        },
        validate: validate,
        onSubmit: (values) => {
            const form = new FormData();
            Object.keys(values).map((key) => form.append(key, values[key]));
            props.handleSubmit(form, formik)
        }
    })
    React.useEffect(() => {
      if(props.member !== undefined){
        const member = props.member
        formik.setValues({
          ...formik.values,
          name: member.name,
          email: member.email,
          phone_number: member.phone_number,
          address: member.address
      })
      setCurrentPhoneNumber(member.phone_number)
      }
    },[props.member])
    return (
        <Container className="input-form" maxWidth="sm">
            <Grid item xs={12} >
            <Typography variant='h3'>ADD MEMBER</Typography>
            </Grid>
          {/* <h1>Add Member</h1> */}
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <FormControl>
                  <InputLabel htmlFor="my-input">Full Name</InputLabel>
                  <Input
                  error={formik.errors.name}
                    name="name"
                    type="text"
                    aria-describedby="my-helper-text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.name ? ( <div className="error">{formik.errors.name}</div> ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
              <FormControl>
                  <InputLabel htmlFor="my-input">Email Address</InputLabel>
                  <Input
                  error={formik.errors.email}
                    name="email"
                    type="text"
                    aria-describedby="my-helper-text"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email ? ( <div className="error">{formik.errors.email}</div> ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
              <FormControl>
                  <InputLabel htmlFor="my-input">Phone Number</InputLabel>
                  <Input
                  error={formik.errors.phone_number}
                    name="phone_number"
                    type="text"
                    aria-describedby="my-helper-text"
                    value={formik.values.phone_number}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.phone_number ? ( <div className="error">{formik.errors.phone_number}</div> ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
              <FormControl>
                  <InputLabel htmlFor="my-input">Address</InputLabel>
                  <Input
                  error={formik.errors.address}
                    name="address"
                    type="text"
                    aria-describedby="my-helper-text"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.address ? ( <div className="error">{formik.errors.address}</div> ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
              <FormControl>
                  <InputLabel htmlFor="my-input">Image</InputLabel>
                  <Input
                  error={formik.errors.image}
                  className="form-input"
                    name="image"
                    type="file"
                    aria-describedby="my-helper-text"
                    onChange={handleUpload}
                  />
                  {formik.errors.image ? ( <div className="error">{formik.errors.image}</div> ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                    <Button type='submit' variant='contained' color='primary'>Add Member</Button>
                </Grid>
            </Grid>
          </form>
        </Container>
    );
}