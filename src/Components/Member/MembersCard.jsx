import * as React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import ListIcon from '@mui/icons-material/List';
import { Card, Button, CardActions, CardContent, Grid,Tooltip, Typography } from '@mui/material';
import noImagePic from '../../images/no_image.jpg'

export default function MembersCard(props) {
  return (
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Card sx={{ minWidth: 275 }} style={{ width: "200" }}>
            <CardContent>
              <img
                style={{ height: "60px" }}
                src={props.path !== null ? `http://localhost:5000${props.path}` : noImagePic}
                alt="productImage"
              />
              <Typography variant="h5" component="div">
                {props.name}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="textSecondary"
                gutterBottom
              >
                {props.phone_number}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="textSecondary">
                {props.email}
              </Typography>
              <Typography variant="body2">{props.address}</Typography>
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
              <Tooltip title="EDIT" placement='top-start'>
              <Button onClick={()=>props.handleEditMember(props.id)} size="small" variant="contained" color="primary" style={{ backgroundColor: "rgb(0, 172, 14)", color: "white" }}>
              <EditIcon/>
              </Button>
              </Tooltip>
              <Tooltip title={!props.activeBorrowings ? "Delete" : "Has active borrowings"} placement='top-start'>
                <div>
                  <Button onClick={()=>props.handleDeleteMember(props.id)} size="small" disabled={props.activeBorrowings} variant="contained" color="secondary" style={{ background: props.activeBorrowings ? "#FFC0C0 ":"#E71919" }}>
                    <DeleteForeverIcon/>
                  </Button>
                </div>
              </Tooltip>
              <div>
              <Button onClick={()=>props.handleBorrowings(props.id)} size="small" variant="contained" color="primary">
                Borrowings
                <ListIcon style={{ marginLeft: "5px" }}/>
              </Button>
              </div>
            </CardActions>
          </Card>
        </Grid>
  );
}
