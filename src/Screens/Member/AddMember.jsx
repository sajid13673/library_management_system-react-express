import React from "react";
import MemberForm from "../../Components/Member/MemberForm";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import useMembers from "../../Hooks/useMember";
import useApi from "../../Hooks/useApi";
function AddMember(props) {
  const { fetchData } = useApi([]);
  const { getMembers } = useMembers({});
  const navigate = useNavigate();
  const handleSubmit = async (formData, formik) => {
    fetchData({
      method: "POST",
      url: `http://localhost:5000/api/members`,
      data: formData,
    })
      .then((res) => {
        if (res.data.status) {
          getMembers();
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
      minHeight="calc(100vh - 69px)"
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
