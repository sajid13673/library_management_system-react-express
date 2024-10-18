import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
  IconButton,
  InputAdornment,
  styled,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
export default function MemberForm(props) {
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  // const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showPassword, setShowPassword] = useState({
    password: false,
    password_confirmation: false,
  });
  const handleClickShowPassword = (name) => {
    console.log(name);

    setShowPassword({ ...showPassword, [name]: !showPassword[name] });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  function handleUpload(e) {
    e.preventDefault();
    const file = e.target.files[0];
    formik.setFieldValue("image", file);
  }
  function validateAdderess(str) {
    return /^[A-Za-z0-9 /.,]*$/.test(str);
  }

  var mimeSet = new Set(["image/png", "image/jpeg", "image/jpg"]);
  const validate = (values) => {
    let errors = {};
    if (props.type === "add") {
    if (!values.email) {
      errors.email = "Required";
    } else if (props.validateEmail(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    else if (!values.password_confirmation) {
      errors.password_confirmation = "Required";
    } else if (values.password_confirmation !== values.password) {
      errors.password_confirmation = "Passwords do not match";
    }}
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.phone_number) {
      errors.phone_number = "Required";
    } else if (!props.validateOnlyNumbers(values.phone_number)) {
      errors.phone_number = "Invalid phone number";
    } else if (values.phone_number.length !== 10) {
      if (currentPhoneNumber !== "") {
        if (currentPhoneNumber !== values.phone_number) {
          errors.phone_number = "Phone number must 10 digits long";
        }
      } else {
        errors.phone_number = "Phone number must 10 digits long";
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
      password: "",
      password_confirmation: "",
      name: "",
      phone_number: "",
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
        phone_number: member.phone_number,
        address: member.address,
      });
      setCurrentPhoneNumber(member.phone_number);
    }
  }, [props.member]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Card sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
        <Typography variant="h3" textTransform='uppercase'>{props.type} member</Typography>
        {props.type === "add"&& (
          <>
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
        <FormControl variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword.password ? "text" : "password"}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword("password")}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword.password ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Confirm Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword.password_confirmation ? "text" : "password"}
            name="password_confirmation"
            value={formik.values.password_confirmation}
            onChange={formik.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() =>
                    handleClickShowPassword("password_confirmation")
                  }
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword.password_confirmation ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          {formik.errors.password_confirmation ? (
            <div className="error">{formik.errors.password_confirmation}</div>
          ) : null}
        </FormControl>
        </>
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
            error={formik.errors.phone_number}
            name="phone_number"
            type="text"
            aria-describedby="my-helper-text"
            value={formik.values.phone_number}
            onChange={formik.handleChange}
          />
          {formik.errors.phone_number ? (
            <div className="error">{formik.errors.phone_number}</div>
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
          {/* <InputLabel htmlFor="my-input">Image</InputLabel>
          <Input
            error={formik.errors.image}
            className="form-input"
            name="image"
            type="file"
            aria-describedby="my-helper-text"
            onChange={handleUpload}
          /> */}
           <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              onChange={handleUpload}
              multiple
            />
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
