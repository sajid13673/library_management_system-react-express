import * as React from 'react';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';

export default function MembersCard(props) {
  return (
        <Grid item xs={4}>
          <Card sx={{ minWidth: 275 }} style={{ width: "200" }}>
            <CardContent>
              <img
                className="memberImage"
                src={props.path !== null ? props.path : props.defaultImage}
                alt="productImage"
              />
              <Typography variant="h5" component="div">
                {props.name}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {props.phone_number}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {props.email}
              </Typography>
              <Typography variant="body2">{props.address}</Typography>
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
              <Button onClick={()=>props.handleEditMember(props.id)} size="small" variant="contained" color="primary" style={{ backgroundColor: "rgb(0, 172, 14)", color: "white" }}>
                Edit
              </Button>
              <Button onClick={()=>props.handleDeleteMember(props.id)} size="small" variant="contained" color="secondary">
                Delete
              </Button>
              <Button onClick={()=>props.handleBorrowings(props.id)} size="small" variant="contained" color="primary">
                borrowings
              </Button>
            </CardActions>
          </Card>
        </Grid>
  );
}
