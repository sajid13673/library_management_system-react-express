import React from "react";
import MembersCard from "./MembersCard";
import { Button, Container, Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MemberList(props){
    const data = Array.from(props.members);
    const navigate = useNavigate();
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
    return (
      <Grid className="grid">
        <Container>
          <Grid container sm={12} spacing={2}>
            <Grid item xs={2}>
              <Button variant="contained" color="primary" onClick={handleAddMember}>
                ADD MEMBER
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Grid container xs={12} spacing={2} maxWidth="xl">
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

                />
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    );
}