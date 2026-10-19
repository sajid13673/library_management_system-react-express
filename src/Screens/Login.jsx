// Screens/Login.jsx
import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import {
  Alert,
  Box,
  Button,
  Card,
  FormControl,
  Input,
  InputLabel,
} from "@mui/material";
import useApi from "../Hooks/useApi";
import { validateEmail } from "../utils/validators";
import PasswordField from "../Components/Form/PasswordField";

export default function Login() {
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();
  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (validateEmail(values.email)) {
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
      await fetchData({
        method: "POST",
        endPoint: "/login",
        data: values,
      }).then((res) => {
        console.log("res");
        console.log(res);

        if (res && res.data.status) {
          setToken(res.data.access_token);
          setUser(res.data.user);
          navigate("/");
        }
      });
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
        <Card sx={{ display: "flex", flexDirection: "column", p: 3, gap: 3 }}>
          {error && (
            <Alert severity="error">
              {error.response?.data?.message ||
                "Something went wrong. Please try again."}
            </Alert>
          )}
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
          <PasswordField
            label={"Password"}
            name={"password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
          />
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
