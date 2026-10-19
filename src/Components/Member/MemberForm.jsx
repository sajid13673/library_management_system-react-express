import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
  styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { validateAdderess, validateEmail, validateOnlyNumbers } from "../../utils/validators";

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
  return (
    <form onSubmit={formik.handleSubmit}>
      <Card sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
        <Typography variant="h3" textTransform="uppercase">
          {props.type} member
        </Typography>
        {props.type === "add" && (
            <FormControl>
              <InputLabel htmlFor="my-input">Email</InputLabel>
              <Input
                error={formik.errors.email}
                name="email"
                type="text"
                aria-describedby="my-helper-text"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
            </FormControl>
        )}
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
          {formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Phone Number</InputLabel>
          <Input
            error={formik.errors.phoneNumber}
            name="phoneNumber"
            type="text"
            aria-describedby="my-helper-text"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
          />
          {formik.errors.phoneNumber ? (
            <div className="error">{formik.errors.phoneNumber}</div>
          ) : null}
        </FormControl>
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
          {formik.errors.address ? (
            <div className="error">{formik.errors.address}</div>
          ) : null}
        </FormControl>
        <FormControl>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput type="file" onChange={handleUpload} multiple />
          </Button>
          {formik.errors.image ? (
            <div className="error">{formik.errors.image}</div>
          ) : null}
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          {props.type} member
        </Button>
      </Card>
    </form>
  );
}
