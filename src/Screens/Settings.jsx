import React from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  Box,
  CircularProgress,
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import useApi from "../Hooks/useApi";
export default function SettingsScreen({ user }) {
  const { fetchData, loading, data, error } = useApi();
  console.log(user.email);
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
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Divider />

      {/* Profile Settings */}
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
          onSubmit={async (values) => {
            await fetchData({
              method: "POST",
              url: "/change-password",
              data: values,
            });
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <>
              <Typography variant="h6" gutterBottom>
                Account Settings
              </Typography>
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
            </>
          )}
        </Formik>
      </Box>
      <Divider sx={{ my: 4 }} />
    </Container>
  );
}
