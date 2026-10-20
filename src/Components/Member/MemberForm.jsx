import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Typography,
  Container,
  CardContent,
  TextField,
  Box,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  validateAdderess,
  validateEmail,
  validateOnlyNumbers,
} from "../../utils/validators";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisuallyHiddenInput from "../VisuallyHiddenInput";

export default function MemberForm(props) {
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState("");
  function handleUpload(e) {
    e.preventDefault();
    const file = e.target.files[0];
    formik.setFieldValue("image", file);
  }

  var mimeSet = new Set(["image/png", "image/jpeg", "image/jpg"]);
  const validate = (values) => {
    let errors = {};
    if (props.type === "add") {
      if (!values.email) {
        errors.email = "Required";
      } else if (validateEmail(values.email)) {
        errors.email = "Invalid email address";
      }
    }
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Required";
    } else if (!validateOnlyNumbers(values.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number";
    } else if (values.phoneNumber.length !== 10) {
      if (currentPhoneNumber !== "") {
        if (currentPhoneNumber !== values.phoneNumber) {
          errors.phoneNumber = "Phone number must 10 digits long";
        }
      } else {
        errors.phoneNumber = "Phone number must 10 digits long";
      }
    }
    if (!values.address) {
      errors.address = "Required";
    } else if (!validateAdderess(values.address)) {
      errors.address = "Invalid Address";
    }
    if (values.image) {
      let imageType = values.image.type;
      if (!mimeSet.has(imageType)) {
        errors.image = "Please select a PNG, JPG and JPEG file";
      }
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phoneNumber: "",
      address: "",
      image: "",
    },
    validate: validate,
    onSubmit: (values) => {
      const form = new FormData();
      Object.keys(values).map((key) => form.append(key, values[key]));
      props.handleSubmit(form, formik);
    },
  });
  useEffect(() => {
    if (props.member !== undefined) {
      const member = props.member;
      formik.setValues({
        ...formik.values,
        name: member.name,
        phoneNumber: member.phoneNumber,
        address: member.address,
      });
      setCurrentPhoneNumber(member.phoneNumber);
    }
  }, [props.member]);
  const isAddMode = props.type === "add";
  const hasUploadedFile = !!formik.values.image;

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <form onSubmit={formik.handleSubmit}>
        <Card
          elevation={3}
          sx={{
            borderRadius: 3,
            backgroundColor: "background.paper",
          }}
        >
          <CardContent
            sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2.5 }}
          >
            {/* Form Title Heading */}
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                textTransform: "uppercase",
                letterSpacing: 0.5,
                mb: 1,
                color: "text.primary",
              }}
            >
              {props.type} Member
            </Typography>

            {/* Email Field - Conditionally rendered only on account registration */}
            {isAddMode && (
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            )}

            {/* Full Name Field Input */}
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              id="name"
              name="name"
              label="Full Name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              slotProps={{ inputLabel: { shrink: true } }}
            />

            {/* Phone Number Field Input */}
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              type="tel"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
              slotProps={{ inputLabel: { shrink: true } }}
            />

            {/* Address Field Input */}
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              id="address"
              name="address"
              label="Home Address"
              type="text"
              multiline
              rows={2} // Gives the user a cleaner multi-line textarea box for typing long addresses
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              slotProps={{ inputLabel: { shrink: true } }}
            />

            {/* File Upload Block Wrapper Zone */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                mt: 0.5,
              }}
            >
              <Button
                component="label"
                variant="outlined"
                color={hasUploadedFile ? "success" : "primary"}
                startIcon={
                  hasUploadedFile ? <CheckCircleIcon /> : <CloudUploadIcon />
                }
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  py: 1,
                  borderStyle: hasUploadedFile ? "solid" : "dashed",
                  borderWidth: 2,
                  "&:hover": { borderWidth: 2 },
                }}
              >
                {hasUploadedFile
                  ? "Profile Picture Attached"
                  : "Upload Profile Picture"}
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleUpload}
                  accept="image/*"
                />
              </Button>

              {formik.touched.image && formik.errors.image && (
                <Typography
                  variant="caption"
                  color="error.main"
                  sx={{ pl: 1, mt: 0.5 }}
                >
                  {formik.errors.image}
                </Typography>
              )}
            </Box>

            {/* Submission Action Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                borderRadius: 2,
                textTransform: "capitalize",
                fontWeight: 600,
                py: 1.2,
                mt: 1.5,
              }}
            >
              {props.type} Member
            </Button>
          </CardContent>
        </Card>
      </form>
    </Container>
  );
}
