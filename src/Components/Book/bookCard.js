import { Button, Card, CardActions, CardContent, Grid, Typography } from "@material-ui/core";
import React from "react";

export default function BookCard(props){
  return (
    <Grid item xs={4}>
      <Card sx={{ minWidth: 200 }} style={{ width: "200" }}>
        <CardContent>
          <img
            className="memberImage"
            src={props.path !== null ? props.path : props.defaultImage}
            alt="productImage"
          />
          <Typography variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.author}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.publisher}
          </Typography>
          <Typography variant="body2">{props.year}</Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Button onClick={()=>props.handleBookEdit(props.id)} size="small" variant="contained" style={{ backgroundColor: "rgb(0, 172, 14)", color: "white" }}>
            Edit
          </Button>
          <Button size="small" onClick={()=>props.handleBookDelete(props.id)} variant="contained" color="secondary">
            Delete
          </Button>
          {props.status ? (<Button onClick={()=>props.handleAddBrowing(props.id)} size="small" variant="contained" color="primary">
            Add Borrowing
          </Button>):
          (<Button disabled size="small" variant="contained" color="primary">
          Not Available
        </Button>)}
          
        </CardActions>
      </Card>
    </Grid>
  );
}