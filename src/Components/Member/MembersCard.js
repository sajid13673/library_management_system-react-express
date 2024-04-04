import * as React from 'react';
import { Button, Card, CardActions, CardContent, Grid, Toolbar, Tooltip, Typography } from '@material-ui/core';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import ListIcon from '@mui/icons-material/List';
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
              <Tooltip title="EDIT" placement='top-start'>
              <Button onClick={()=>props.handleEditMember(props.id)} size="small" variant="contained" color="primary" style={{ backgroundColor: "rgb(0, 172, 14)", color: "white" }}>
              <EditIcon/>
              </Button>
              </Tooltip>
              <Tooltip title="DELETE" placement='top-start'>
              <Button onClick={()=>props.handleDeleteMember(props.id)} size="small" disabled={props.activeBorrowings} variant="contained" color="secondary" style={{ background: "#E71919" }}>
                <DeleteForeverIcon/>
              </Button>
              </Tooltip>
              <Button onClick={()=>props.handleBorrowings(props.id)} size="small" variant="contained" color="primary">
                Borrowings
                <ListIcon style={{ marginLeft: "5px" }}/>
              </Button>
            </CardActions>
          </Card>
        </Grid>
  );
}
