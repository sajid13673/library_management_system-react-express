import { Grid } from '@material-ui/core';
import React from 'react'
import MemberForm from './memberForm';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditMember(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const memberId = location.state.id;
  console.log(memberId);
  const [member, setMember] = React.useState({})
  const getMember = async ()=>{
    await axios.get("http://127.0.0.1:8000/api/member/"+memberId).then(res=>{
      if(res.data.status){
        setMember(res.data.data)
      }
    }).catch(err=>console.log(err));
  }
  const handleSubmit = async (formData)=>{
    formData.append("_method", "put");
    await axios.post("http://127.0.0.1:8000/api/member/"+memberId,formData).then(res=>{
      if(res.data.status){
        navigate('/member-list')
        props.getMembers();
      }
    })
  }
  React.useEffect(()=>{
    getMember();
    console.log(member);
  },[])
  return (
    <Grid className="grid" style={{ alignItems: "center" }}>
        <MemberForm
        validateEmail ={(str)=>props.validateEmail(str)}
        validateOnlyNumbers={(str)=>props.validateOnlyNumbers(str)}
        member={member}
        handleSubmit={(formData)=>handleSubmit(formData)}
        title={"Edit Member"}
        />
    </Grid>
  )
}

export default EditMember;