import React from "react";
import MemberForm from "../../Components/Member/MemberForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

function AddMember(props) {
  const navigate = useNavigate();
  const handleSubmit = async (formData, formik) => {
    axios
      .post("http://localhost:5000/api/members", formData)
      .then((res) => {
        if (res.data.status) {
          props.getMembers();
          navigate("/member-list");
        }
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        let errors = err.response.data.errors;
        if (errors.email) {
          formik.setFieldError("email", errors.email);
        }
        if (errors.phoneNumber) {
          formik.setFieldError("phoneNumber", errors.phoneNumber);
        }
      });
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flex={1}
      p={2}
    >
      <MemberForm
        validateEmail={(str) => props.validateEmail(str)}
        validateOnlyNumbers={(str) => props.validateOnlyNumbers(str)}
        handleSubmit={(formData, formik) => handleSubmit(formData, formik)}
        type={"add"}
      />
    </Box>
  );
}

export default AddMember;
