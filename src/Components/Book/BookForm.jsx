import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { validateOnlyNumbers } from "../../utils/validators";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisuallyHiddenInput from "../VisuallyHiddenInput";
import { Autocomplete, Checkbox, Chip } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import useCategories from "../../Hooks/useCategories";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function BookForm(props) {
  var mimeSet = new Set(["image/png", "image/jpeg", "image/jpg"]);
  const [currentYear, SetCurrentYear] = React.useState("");
  const { categories, error, getCategories, loading } = useCategories({
    noPaginate: true,
  });
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
    if (!values.categories || values.categories.length === 0) {
      errors.categories = "Please select at least one category";
    }

    // Update your existing image validation check to this:
    if (values.image && values.image instanceof File) {
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
      categories: [],
      image: "",
    },
    validate: validate,
    onSubmit: (values) => {
      console.log(values);

      props.handleSubmit(values);
    },
  });
  useEffect(() => {
    if (props.book) {
      formik.setFieldValue("title", props.book.title);
      formik.setFieldValue("author", props.book.author);
      formik.setFieldValue("publisher", props.book.publisher);
      formik.setFieldValue("year", props.book.year);
      formik.setFieldValue("image", props.book.image);
      SetCurrentYear(props.book.year);

      if (Array.isArray(props.book.categories)) {
        const existingIds = props.book.categories.map((cat) =>
          typeof cat === "object" && cat !== null ? cat._id || cat.id : cat,
        );
        formik.setFieldValue("categories", existingIds);
      }
    }
  }, [props.book]);

  useEffect(() => {
    getCategories();
  }, []);

  const availableCategories = categories?.data || [];
  const selectedCategoryObjects = availableCategories.filter((cat) =>
    formik.values.categories.includes(cat._id || cat.id),
  );
  const hasUploadedFile = !!formik.values.image;
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <form onSubmit={formik.handleSubmit}>
        <Card
          elevation={3}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            backgroundColor: "background.paper",
          }}
          className="input-form"
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
              error={
                formik.touched.publisher && Boolean(formik.errors.publisher)
              }
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

            <Autocomplete
              multiple
              size="small"
              id="categories"
              options={availableCategories}
              disableCloseOnSelect
              value={selectedCategoryObjects}
              getOptionLabel={(option) => option.name || ""}
              isOptionEqualToValue={(option, value) =>
                (option._id || option.id) === (value._id || value.id)
              }
              onChange={(_, newValue) => {
                const selectedIds = newValue.map((item) => item._id || item.id);
                formik.setFieldValue("categories", selectedIds);
              }}
              onBlur={() => formik.setFieldTouched("categories", true)}
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </li>
                );
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  const { key, ...tagProps } = getTagProps({ index });
                  return (
                    <Chip
                      key={key}
                      label={option.name}
                      size="small"
                      color="primary"
                      variant="outlined"
                      {...tagProps}
                    />
                  );
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Categories"
                  placeholder={
                    selectedCategoryObjects.length === 0
                      ? "Select categories..."
                      : ""
                  }
                  error={
                    formik.touched.categories &&
                    Boolean(formik.errors.categories)
                  }
                  helperText={
                    formik.touched.categories && formik.errors.categories
                  }
                  slotProps={{
                    ...params.slotProps,
                    inputLabel: { shrink: true },
                  }}
                />
              )}
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
                  ? "Cover Image Attached"
                  : "Upload Cover Image"}
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
                mt: 1.5,
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
