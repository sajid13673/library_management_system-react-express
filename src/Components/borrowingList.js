import { Container, Grid } from '@material-ui/core';
import axios from 'axios';
import React from 'react'
import BorrowingCard from './borrowingCard';
import { useLocation } from 'react-router-dom'
function BorrowingList() {
    const location = useLocation()
    const memberId = location.state.memberId
    const [member, setMember] = React.useState([])
    const borrwings = member.borrowing ? Array.from(member.borrowing) : []
    async function getMemberWithBorrowings(){
        await axios.get(`http://127.0.0.1:8000/api/member/${memberId}?borrowing=1`).then(res => {
            if(res.data.status){
            setMember(res.data.data)
        }
        }).catch(err=>console.log(err));
    }
    async function handleConfirmReturn(id, formData){
        axios.post("http://127.0.0.1:8000/api/borrowing/"+id,formData).then(res=>{
            if(res.data.status){
                console.log("borrowing updated");
                getMemberWithBorrowings()
            }
        }).catch(err => console.log(err))
    }
    const [currentId,setCurrentId] = React.useState()
    React.useEffect(() => {
        getMemberWithBorrowings()
    }, [])
  return (
    <Grid className="grid" >
      <Container>
        <Grid container xs={12} spacing={2} maxWidth="xl">
          {borrwings.map((row) => (
            <BorrowingCard
              key={row.id}
              id={row.id}
              book={row.book}
              due_date={row.due_date}
              status={row.status}
              return_date={row.return_date}
              member={member.id + ". " + member.name}
              handleConfirmReturn={(id,formData)=>handleConfirmReturn(id,formData)}
              currentId={currentId}
              setCurrentId={(id)=>setCurrentId(id)}
            />
          ))}
        </Grid>
      </Container>
    </Grid>
  );
}

export default BorrowingList