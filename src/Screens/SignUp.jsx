import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import useApi from "../Hooks/useApi";
import {
  validateAdderess,
  validateEmail,
  validateOnlyNumbers,
} from "../utils/validators";
import PasswordField from "../Components/Form/PasswordField";

function SignUp() {
  const navigate = useNavigate();
  const { fetchData, error, loading } = useApi([]);
  const register = async (values, actions) => {
    try {
      await fetchData({ method: "POST", endPoint: "/register", data: values });
    } catch (err) {
      // Check if the backend returned validation errors
      if (err.response && err.response.data.errors) {
        const backendErrors = err.response.data.errors;
        const formikErrors = {};
        // Convert backend array format to Formik object format
        backendErrors.forEach((err) => {
          formikErrors[err.path] = err.msg;
        });
        // Update Formik state
        actions.setErrors(formikErrors);
      }
    }
  };
  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (validateEmail(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!values.password_confirmation) {
      errors.password_confirmation = "Required";
    } else if (values.password_confirmation !== values.password) {
      errors.password_confirmation = "Passwords do not match";
    }
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.phone_number) {
      errors.phone_number = "Required";
    } else if (!validateOnlyNumbers(values.phone_number)) {
      errors.phone_number = "Invalid phone number";
    } else if (values.phone_number.length !== 10) {
      errors.phone_number = "Phone number must 10 digits long";
    }
    if (!values.address) {
      errors.address = "Required";
    } else if (!validateAdderess(values.address)) {
      errors.address = "Invalid Address";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password_confirmation: "",
      name: "",
      address: "",
      phone_number: "",
    },
    validate: validate,
    onSubmit: async (values, actions) => {
      await register(values, actions);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            height: "max-content",
            minWidth: "20rem",
            bgcolor: "white",
            display: "flex",
            flexDirection: "column",
            p: 2,
            gap: 3,
            borderRadius: 4,
            boxShadow: 4,
          }}
        >
          <FormControl>
            <InputLabel>Email</InputLabel>
            <Input
              error={formik.errors.email}
              name="email"
              type="text"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </FormControl>
          <PasswordField
            label={"Password"}
            name={"password"}
            value={formik.values.password}
            error={formik.errors.password}
            onChange={formik.handleChange}
          />
          <PasswordField
            label={"Confirm Password"}
            name={"password_confirmation"}
            value={formik.values.password_confirmation}
            error={formik.errors.password_confirmation}
            onChange={formik.handleChange}
          />
          <FormControl>
            <InputLabel>Name</InputLabel>
            <Input
              error={formik.errors.name}
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}
          </FormControl>
          <FormControl>
            <InputLabel>Address</InputLabel>
            <Input
              error={formik.errors.address}
              name="address"
              type="text"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            {formik.errors.address ? (
              <div className="error">{formik.errors.address}</div>
            ) : null}
          </FormControl>
          <FormControl>
            <InputLabel>Phone Number</InputLabel>
            <Input
              error={formik.errors.phone_number}
              name="phone_number"
              type="text"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
            />
            {formik.errors.phone_number ? (
              <div className="error">{formik.errors.phone_number}</div>
            ) : null}
          </FormControl>
          <Button
            sx={{ width: { sm: "80%" }, mx: "auto" }}
            type="submit"
            variant="contained"
          >
            Register
          </Button>
          <Button
            onClick={() => navigate("/login")}
            disabled={loading}
            variant="text"
            size="small"
            sx={{
              fontSize: 10,
              textTransform: "inherit",
              width: { sm: "80%" },
              mx: "auto",
            }}
          >
            Back to Login
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default SignUp;
