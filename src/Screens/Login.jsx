// Screens/Login.jsx
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import {
  Alert,
  Box,
  Button,
  Card,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import useApi from "../Hooks/useApi"; 

export default function Login(props) {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (props.validateEmail(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  const { fetchData, loading, error } = useApi([]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validate,
    onSubmit: async (values) => {
      setErrorMessage(null);
      await fetchData({
        method: "POST",
        url: "/login",
        data: values,
      }).then((res) => {
        console.log("res");
        console.log(res);
        
        if (res && res.data.status) {
          setToken({
            token: res.data.access_token,
            role: res.data.role,
            refreshToken: res.data.refresh_token
          });
          navigate("/");
        }
      });
      if(error){
        console.log(error);
        console.log(error.response.data.message);
        setErrorMessage(error.response.data.message);
      }
    },
  });

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Card
          sx={{ display: "flex", flexDirection: "column", p: 3, gap: 3 }}
        >
          {errorMessage &&
          <Alert severity="error">{errorMessage}</Alert>
          }
          <FormControl>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input
              error={Boolean(formik.errors.email)}
              className="email-input"
              aria-describedby="my-helper-text"
              value={formik.values.email}
              name="email"
              onChange={formik.handleChange}
            />
            {formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </FormControl>
          <FormControl variant="standard">
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
            {formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </FormControl>
          <Button
            variant="contained"
            type="submit"
            sx={{ width: "60%", mx: "auto" }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={() => navigate("/signup")}
            sx={{ fontSize: 10, textTransform: "inherit" }}
          >
            Don't have an account? Signup here
          </Button>
        </Card>
      </form>
    </Box>
  );
}
