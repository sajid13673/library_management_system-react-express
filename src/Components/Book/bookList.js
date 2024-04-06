import React from "react";
import {  Container, Grid, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import BookCard from "./bookCard";
import axios from "axios";
import { Pagination, Stack } from "@mui/material";
import Loading from "../loading";

export default function BookList(props){
    const totalPages = props.totalPages 
    const data = Array.from(props.books);
    const navigate = useNavigate();
    function handleBookEdit(id){
        console.log(id);
        navigate("/edit-book",{state:{ id:id }});
    }
    function handleBookDelete(id){
        axios.delete("http://127.0.0.1:8000/api/book/"+id).then(res=>{
            if(res.data.status){
                console.log("book deleted");
                props.getBooks();
            }
        }).catch(err => console.log(err))
    }
    function handleAddBrowing(bookId){
        navigate("/add-borrowing",{state:{bookId:bookId}});
    }
    function handleChange(e, value){
        props.setBookPage(value)
    }
    React.useEffect(()=>{},[])
    return (
      <Grid container className="grid" style={{ padding: "20px" }}>
            <Container>
              <Grid container xs={12} spacing={2} style={{  minHeight:"38rem" }}>
                {data.length > 0 ? (data.map((row) => (
                  <BookCard
                    key={row.id}
                    id={row.id}
                    title={row.title}
                    author={row.author}
                    publisher={row.publisher}
                    year={row.year}
                    path={row.path}
                    status={row.status}
                    activeBorrowings={row.activeBorrowings}
                    defaultImage={props.defaultImage}
                    handleBookEdit={(id) => handleBookEdit(id)}
                    handleBookDelete={(id) => handleBookDelete(id)}
                    handleAddBrowing={(bookId) => handleAddBrowing(bookId)}
                  />
                )))
            : <Container className='keyMessage'>
            {!props.loading ? (
            <Typography variant="h3" >
              Nothing to show
            </Typography>
          ) : (
            <Loading />
          )}
          </Container>}
              </Grid>
              <Stack spacing={2} sx={{ marginTop:"20px" }}>
                <Pagination count={totalPages} page={props.bookPage} color="primary" onChange={handleChange}/>
              </Stack>
            </Container>
      </Grid>
    );
}