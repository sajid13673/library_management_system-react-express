import React from "react";
import MemberForm from "../../Components/Member/MemberForm";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import useMembers from "../../Hooks/useMember";
import useApi from "../../Hooks/useApi";

function EditMember(props) {
  const {getMembers} = useMembers();
  const {fetchData} = useApi([]);
  const navigate = useNavigate();
  const location = useLocation();
  const memberId = location.state.id;
  console.log(memberId);
  const [member, setMember] = React.useState({});
  const getMember = async () => {
    fetchData({
      method: "GET",
      url: `http://localhost:5000/api/members/${memberId}`,
    })
      .then((res) => {
        if (res.data.status) {
          setMember(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = async (formData) => {
    fetchData({
      method: "PUT",
      url: `http://localhost:5000/api/members/${memberId}`,
      data: formData,
    }).then((res) => {
      if (res.data.status) {
        navigate("/member-list");
        getMembers();
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
