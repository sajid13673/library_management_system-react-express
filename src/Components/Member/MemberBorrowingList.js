import { CircularProgress, Container, Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import React from 'react'
import BorrowingCard from '../Borrowing/borrowingCard';
import { useLocation } from 'react-router-dom'
import { Pagination, Stack } from '@mui/material';
import Loading from '../loading';
function MemberBorrowingList(props) {
    const location = useLocation()
    const memberId = location.state.memberId
    const [member, setMember] = React.useState([])
    const [totalPages, setTotalPages] = React.useState(1)
    const [borrowingPage, setBorrowingPage] = React.useState(1)
    const [borrowingsPerPage, setBorrowingsPerPage] = React.useState(10)
    const [loading, setLoading] = React.useState(false)
    const borrwings = member.borrowing ? Array.from(member.borrowing.data) : []
    async function getMemberWithBorrowings(){
      setLoading(true)
        await axios.get(`http://127.0.0.1:8000/api/member/${memberId}?borrowing=1&page=${borrowingPage}&per_page=${borrowingsPerPage}`).then(res => {
            if(res.data.status){
              setLoading(false)
            setMember(res.data.data)
            setTotalPages(res.data.data.borrowing.last_page)
        }
        }).catch(err=>console.log(err));
    }
    async function handleConfirmReturn(id, formData, book) {
      await props.handleConfirmReturn(id, formData, book).then((res) => {
        if (res) {
          props.getBooks();
          props.getMembers();
          getMemberWithBorrowings();
        }
      });
    }
    function handleChange(e, value){
      setBorrowingPage(value)
    }
    async function handleDelete(id){
      await props.handleDeleteBorrowing(id).then((res) =>{
        res && getMemberWithBorrowings();
      }).catch(err => console.log(err));
    }
  
    const [currentId,setCurrentId] = React.useState()
    React.useEffect(() => {
        getMemberWithBorrowings()
    }, [borrowingPage])
  return (
    <Grid className="grid">
      <Container>
        <Grid container xs={12} spacing={2} style={{ minHeight: "38rem" }}>
          {borrwings.length > 0 ? (
            borrwings.map((row) => (
              <BorrowingCard
                key={row.id}
                id={row.id}
                book={row.book}
                due_date={row.due_date}
                status={row.status}
                return_date={row.return_date}
                borrowed_date={row.created_at}
                member={member.id + ". " + member.name}
                handleConfirmReturn={(id, formData, book) => handleConfirmReturn(id, formData, book)}
                currentId={currentId}
                setCurrentId={(id) => setCurrentId(id)}
                handleDelete={(id) => handleDelete(id)}
              />
            ))
          ) : 
          
          <Container className='keyMessage'>
            {!loading ? (
            <Typography variant="h3" >
              Nothing to show
            </Typography>
          ) : (
            <Loading />
          )}
          </Container>
          }
        </Grid>
        {!loading && borrwings.length > 0 && (<Stack spacing={2} sx={{ marginTop: "20px" }}>
          <Pagination
            count={totalPages}
            page={borrowingPage}
            color="primary"
            onChange={handleChange}
          />
        </Stack>)}
      </Container>
    </Grid>
  );
}

export default MemberBorrowingList