import React from 'react';
import {Button, Container, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/authProvider';

export default function Login(props){
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const validate = (values) => {
        let errors = {};
        if (!values.email) {
        errors.email = 'Required';
        } 
        else if (props.validateEmail(values.email)) {
        errors.email = 'Invalid email address';
        }
        if (!values.password) {
        errors.password = 'Required';
        }
        return errors;
    }
    const formik = useFormik({
        initialValues: {
        email: '',
        password: '',
        },
        validate: validate,
        onSubmit: (values) => {
            axios.post("http://127.0.0.1:8000/api/login",values).then(res=>{
            if(res.data.status){
                setToken(res.data.access_token);
                props.setLogin(true)
                navigate('/');
            }
        }).catch(err => console.log(err))
        }
    })

    return (
        <Grid className="grid" style={{ alignItems: "center", minHeight: "100vh" }} >
        <Container className="input-form" maxWidth="sm">
            <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <FormControl>
                    <InputLabel htmlFor="my-input">Email address</InputLabel>
                    <Input
                    error={formik.errors.email}
                    className="email-input"
                    aria-describedby="my-helper-text"
                    value={formik.values.email}
                    name="email"
                    onChange={formik.handleChange}
                    />
                    {formik.errors.email ? ( <div className="error">{formik.errors.email}</div> ) : null}

                </FormControl>
                </Grid>
                <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">
                    Password
                    </InputLabel>
                    <Input
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    endAdornment={
                        <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        </InputAdornment>
                    }
                    />
                {formik.errors.password ? ( <div className="error">{formik.errors.password}</div> ) : null}

                </FormControl>
                </Grid>
                <Grid item xs={12}>
                <Button className="login-button" variant="contained" color="primary" type="submit">
                    Login
                </Button>
                </Grid>
            </Grid>
            </form>
        </Container>
        </Grid>
    );
}