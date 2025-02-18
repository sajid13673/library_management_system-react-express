import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import useApi from "../Hooks/useApi";

export default function SettingsScreen({ user }) {
  const { fetchData, loading, data, error } = useApi();
  const [passwordAlert, setPasswordAlert] = useState({
    status: false,
    message: "",
    type: "success",
  });
  const initialValuesAccount = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validateAccountForm = (values) => {
    const errors = {};
    if (!values.currentPassword) {
      errors.currentPassword = "Required";
    }
    if (!values.newPassword) {
      errors.newPassword = "Required";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Required";
    } else if (values.newPassword !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };
  const CustomErrorMessage = ({ children }) => (
    <Typography variant="body2" color="error">
      {children}
    </Typography>
  );

  const initialRender = useRef(true);

  useEffect(() => {
    if (data.status) {
      setPasswordAlert(true);
      setPasswordAlert({
        status: true,
        message: "Password changed successfully!",
        type: "success",
      });
      console.log("password changed");
      console.log(data);
    }
    if (error) {
      setPasswordAlert({
        status: true,
        message:
          error.response.data.errors && error.response.data.errors.length > 0
            ? error.response.data.errors[0].msg
            : error.response.data.message,
        type: "error",
      });

      console.log(error);
      console.log(error.message);
    }
  }, [data, error]);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Divider />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Profile Settings
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled
              label="Name"
              fullWidth
              variant="outlined"
              defaultValue=""
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled
              label="Email"
              fullWidth
              variant="outlined"
              defaultValue=""
            />
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ my: 4 }} />
      <Box sx={{ mt: 4 }}>
        <Formik
          initialValues={initialValuesAccount}
          validate={validateAccountForm}
          onSubmit={async (values, { resetForm }) => {
            const response = await fetchData({
              method: "POST",
              url: "/change-password",
              data: values,
            });
            if (response && response.status === 200) {
              resetForm();
            }
          }}
        >
          {({ errors, touched }) => (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h6" gutterBottom>
                Account Settings
              </Typography>
              {passwordAlert.status && (
                <Alert severity={passwordAlert.type}>
                  {passwordAlert.message}
                </Alert>
              )}
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      label="Current Password"
                      name="currentPassword"
                      type="password"
                      fullWidth
                      variant="outlined"
                      as={TextField}
                    />
                    <ErrorMessage
                      name="currentPassword"
                      component={CustomErrorMessage}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      label="New Password"
                      name="newPassword"
                      type="password"
                      fullWidth
                      variant="outlined"
                      as={TextField}
                    />
                    <ErrorMessage
                      name="newPassword"
                      component={CustomErrorMessage}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      fullWidth
                      variant="outlined"
                      as={TextField}
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component={CustomErrorMessage}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      disabled={loading}
                      startIcon={loading && <CircularProgress size={20} />}
                      variant="contained"
                      color="primary"
                    >
                      {loading ? "updating" : "Update Password"}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </Box>
          )}
        </Formik>
      </Box>
      <Divider sx={{ my: 4 }} />
    </Container>
  );
}
