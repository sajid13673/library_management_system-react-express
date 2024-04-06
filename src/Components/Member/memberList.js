import React from "react";
import MembersCard from "./MembersCard";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Pagination, Stack } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Loading from "../loading";

export default function MemberList(props){
  const totalPages = props.totalPages 
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
        <Container style={{ padding: "15px" }}>
          <Grid container sm={12} spacing={2} >
            <Grid item xs={2}>
              <Button variant="contained" color="primary" onClick={handleAddMember}>
                ADD MEMBER
                <AddCircleIcon style={{ marginLeft: "5px" }}/>
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Grid container xs={12} spacing={2} style={{  minHeight:"38rem" }}>
                {data.length > 0 ? (data.map((row) => (
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
                  activeBorrowings={row.activeBorrowings}
                />
                  ))) :
                  <Container className='keyMessage'>
                  {!props.loading ? (
                  <Typography variant="h3" >
                    Nothing to show
                  </Typography>
                ) : (
                  <Loading />
                )}
                </Container>
                  }
              </Grid>
            </Grid>
          </Grid>
          {data.length > 0 && !props.loading && (<Stack spacing={2} sx={{ marginTop:"20px" }}>
                <Pagination count={totalPages} page={props.memberPage} color="primary" onChange={handleChange}/>
          </Stack>)}
        </Container>
      </Grid>
    );
}