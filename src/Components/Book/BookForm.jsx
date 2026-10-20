import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  Input,
  InputLabel,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { validateOnlyNumbers } from "../../utils/validators";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function BookForm(props) {
  var mimeSet = new Set(["image/png", "image/jpeg", "image/jpg"]);
  const [currentYear, SetCurrentYear] = React.useState("");
  function handleUpload(e) {
    e.preventDefault();
    const file = e.target.files[0];
    formik.setFieldValue("image", file);
  }
  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Required";
    }
    if (!values.author) {
      errors.author = "Required";
    }
    if (!values.publisher) {
      errors.publisher = "Required";
    }
    if (!values.year) {
      errors.year = "Required";
    } else if (!validateOnlyNumbers(values.year)) {
      errors.year = "Invalid year";
    } else if (values.year.length !== 4) {
      if (currentYear !== "") {
        if (values.year !== currentYear) {
          errors.year = "Please enter a valid year, eg: 2012";
        }
      } else {
        errors.year = "Please enter a valid year, eg: 2012";
      }
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
      title: "",
      author: "",
      publisher: "",
      year: "",
      image: "",
    },
    validate: validate,
    onSubmit: (values) => {
      console.log(values);
      props.handleSubmit(values);
    },
  });
  React.useEffect(() => {
    if (props.book) {
      formik.setFieldValue("title", props.book.title);
      formik.setFieldValue("author", props.book.author);
      formik.setFieldValue("publisher", props.book.publisher);
      formik.setFieldValue("year", props.book.year);
      formik.setFieldValue("image", props.book.image);
      SetCurrentYear(props.book.year);
    }
  }, [props.book]);
  const hasUploadedFile = !!formik.values.image;
  return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
      <form onSubmit={formik.handleSubmit}>
        <Card 
          elevation={3} 
          sx={{ 
            borderRadius: 3, 
            overflow: "hidden",
            backgroundColor: "background.paper"
          }}
          className="input-form"
        >
          <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2.5 }}>
            {/* Form Title Heading */}
            <Typography 
              variant="h5" 
              fontWeight="700" 
              sx={{ textTransform: "uppercase", letterSpacing: 0.5, mb: 1, color: "text.primary" }}
            >
              {props.title}
            </Typography>

            {/* Error Communication Alert Box */}
            {props.error && (
              <Alert
                severity="error"
                variant="outlined"
                sx={{ borderRadius: 2, mb: 1 }}
              >
                {props.error.response?.data?.errors?.length > 0
                  ? props.error.response.data.errors[0].msg
                  : "Something went wrong. Please check your fields."}
              </Alert>
            )}

            {/* Title Field Input */}
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              id="title"
              name="title"
              label="Book Title"
              type="text"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              slotProps={{ inputLabel: { shrink: true } }}
            />

            {/* Author Field Input */}
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              id="author"
              name="author"
              label="Author Name"
              type="text"
              value={formik.values.author}
              onChange={formik.handleChange}
              error={formik.touched.author && Boolean(formik.errors.author)}
              helperText={formik.touched.author && formik.errors.author}
              slotProps={{ inputLabel: { shrink: true } }}
            />

            {/* Publisher Field Input */}
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              id="publisher"
              name="publisher"
              label="Publisher"
              type="text"
              value={formik.values.publisher}
              onChange={formik.handleChange}
              error={formik.touched.publisher && Boolean(formik.errors.publisher)}
              helperText={formik.touched.publisher && formik.errors.publisher}
              slotProps={{ inputLabel: { shrink: true } }}
            />

            {/* Year Field Input */}
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              id="year"
              name="year"
              label="Publication Year"
              type="text"
              value={formik.values.year}
              onChange={formik.handleChange}
              error={formik.touched.year && Boolean(formik.errors.year)}
              helperText={formik.touched.year && formik.errors.year}
              slotProps={{ inputLabel: { shrink: true } }}
            />

            {/* File Upload Block Wrapper Zone */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, mt: 0.5 }}>
              <Button
                component="label"
                variant="outlined"
                color={hasUploadedFile ? "success" : "primary"}
                startIcon={hasUploadedFile ? <CheckCircleIcon /> : <CloudUploadIcon />}
                sx={{ 
                  borderRadius: 2, 
                  textTransform: "none", 
                  py: 1, 
                  borderStyle: hasUploadedFile ? "solid" : "dashed",
                  borderWidth: 2,
                  "&:hover": { borderWidth: 2 }
                }}
              >
                {hasUploadedFile ? "Cover Image Attached" : "Upload Cover Image"}
                <VisuallyHiddenInput type="file" onChange={handleUpload} accept="image/*" />
              </Button>
              
              {formik.touched.image && formik.errors.image && (
                <Typography variant="caption" color="error.main" sx={{ pl: 1, mt: 0.5 }}>
                  {formik.errors.image}
                </Typography>
              )}
            </Box>

            {/* Transaction Execution Action Buttons */}
            <Button
              type="submit"
              disabled={props.loading}
              variant="contained"
              color="primary"
              size="large"
              sx={{ 
                borderRadius: 2, 
                textTransform: "none", 
                fontWeight: 600,
                py: 1.2, 
                mt: 1.5 
              }}
            >
              {!props.loading ? (
                props.title
              ) : (
                <CircularProgress color="inherit" size={24} />
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Container>
  );
}
