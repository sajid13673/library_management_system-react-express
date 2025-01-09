import React from "react";
import MemberForm from "../../Components/Member/MemberForm";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

function EditMember(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const memberId = location.state.id;
  console.log(memberId);
  const [member, setMember] = React.useState({});
  const getMember = async () => {
    await axios
      .get("http://localhost:5000/api/member/" + memberId)
      .then((res) => {
        if (res.data.status) {
          setMember(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = async (formData) => {
    formData.append("_method", "put");
    await axios
      .post("http://localhost:5000/api/member/" + memberId, formData)
      .then((res) => {
        if (res.data.status) {
          navigate("/member-list");
          props.getMembers();
        }
      });
  };
  React.useEffect(() => {
    getMember();
    console.log(member);
  }, []);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flex={1}
    >
      <MemberForm
        validateEmail={(str) => props.validateEmail(str)}
        validateOnlyNumbers={(str) => props.validateOnlyNumbers(str)}
        member={member}
        handleSubmit={(formData) => handleSubmit(formData)}
        type={"update"}
      />
    </Box>
  );
}

export default EditMember;
