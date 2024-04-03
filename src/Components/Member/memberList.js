import React from "react";
import MembersCard from "./MembersCard";
import { Button, Container, Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Pagination, Stack } from "@mui/material";

export default function MemberList(props){
  const totalPages = props.totalPages 
  const [perPage, setPerPage] = React.useState(9)
  const [page, setPage] = React.useState(1)
  const data = Array.from(props.members);
  const navigate = useNavigate();
  function handleBorrowings(id){
        navigate("/borrowing-list",{state:{memberId: id}});
    }
    function handleAddMember(){
        navigate("/add-member");
    }
    function handleEditMember(id){
        navigate("/edit-member",{state:{id:id}});
    }
    function handleDeleteMember(id){
        axios.delete("http://127.0.0.1:8000/api/member/"+id).then(res=>{
            if(res.data.status){
                console.log("member deleted");
                props.getMembers();
            }
        }).catch(err => console.log(err))
    }
    function handleChange(e, value){
      props.setMemberPage(value)
  }
    return (
      <Grid className="grid">
        <Container>
          <Grid container sm={12} spacing={2} >
            <Grid item xs={2}>
              <Button variant="contained" color="primary" onClick={handleAddMember}>
                ADD MEMBER
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Grid container xs={12} spacing={2} maxWidth="xl" style={{  minHeight:"38rem" }}>
                {data.map((row) => (
                <MembersCard
                 key={row.id}
                 id={row.id}
                  name={row.name}
                  email={row.email}
                  phone_number={row.phone_number}
                  address={row.address}
                  path={row.path}
                  defaultImage={props.defaultImage}
                  handleEditMember={(id)=>handleEditMember(id)}
                  handleDeleteMember={(id)=>handleDeleteMember(id)}
                  handleBorrowings={(id)=>handleBorrowings(id)}
                />
                  ))}
              </Grid>
            </Grid>
          </Grid>
          <Stack spacing={2} sx={{ marginTop:"20px" }}>
                <Pagination count={totalPages} page={props.memberPage} color="primary" onChange={handleChange}/>
          </Stack>
        </Container>
      </Grid>
    );
}