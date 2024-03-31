import { Container, Grid } from '@material-ui/core';
import axios from 'axios';
import React from 'react'
import BorrowingCard from './borrowingCard';
import { useLocation } from 'react-router-dom'
function BorrowingList(props) {
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
    async function handleConfirmReturn(id, formData, book){
        // axios.post("http://127.0.0.1:8000/api/borrowing/"+id,formData).then(res=>{
        //     if(res.data.status){
        //         console.log("borrowing updated");
        //         getMemberWithBorrowings()
        //     }
        // }).catch(err => console.log(err))
        const form = new FormData();
            Object.keys(book).map((key) => form.append(key, book[key]));
            form.append("_method","put");
            form.set("status",1)
        axios.post("http://127.0.0.1:8000/api/borrowing/"+id,formData).then(res=>{
            if(res.data.status){
                axios.post('http://127.0.0.1:8000/api/book/'+book.id,form).then((res)=>{
            if(res.data.status){
                props.getBooks();
                getMemberWithBorrowings()
            }
        }).catch(err => console.log(err))
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
              borrowed_date={row.created_at}
              member={member.id + ". " + member.name}
              handleConfirmReturn={(id,formData, book)=>handleConfirmReturn(id,formData, book)}
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