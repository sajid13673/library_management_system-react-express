import React from "react";
import { Button, Card, CardActions, CardContent, Container, Grid, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import BookCard from "./bookCard";
import axios from "axios";

export default function BookList(props){
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
    return (
        <Grid className="grid">
            <Container >
                    <Grid container xs={12} spacing={2} maxWidth="xl">
                        {data.map((row) => (
                            <BookCard
                            key={row.id}
                            id={row.id}
                            title={row.title}
                            author={row.author}
                            publisher={row.publisher}
                            year={row.year}
                            path={row.path}
                            defaultImage={props.defaultImage}
                            handleBookEdit={(id)=>handleBookEdit(id)}
                            handleBookDelete={(id)=>handleBookDelete(id)}
                            handleAddBrowing={(bookId)=>handleAddBrowing(bookId)}
                            />
                        ))}
                        </Grid>
            </Container>
        </Grid>
    );
}