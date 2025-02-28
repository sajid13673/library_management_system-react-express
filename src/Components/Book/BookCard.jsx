import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BlockIcon from "@mui/icons-material/Block";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Tooltip,
  Box,
} from "@mui/material";
import { useAuth } from "../../utils/AuthProvider";
import noImagePic from "../../images/no_image.jpg";

export default function BookCard(props) {
  const { token } = useAuth();
  console.log(props.path);

  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Card
        sx={{
          minWidth: 200,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            my: "auto",
          }}
        >
          <Box
            component="img"
            sx={{
              maxWidth: 100,
              borderRadius: 1.7,
              mb: 1,
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.41)",
            }}
            src={
              props.path !== null
                ? `http://localhost:5000${props.path}`
                : noImagePic
            }
            alt="productImage"
          />
          <Typography variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="textSecondary" gutterBottom>
            {props.author}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="textSecondary">
            {props.publisher}
          </Typography>
          <Typography variant="body2">{props.year}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", mt: "auto" }}>
          {token.role === "admin" && (
            <>
              <Tooltip title="Edit" placement="top-start">
                <>
                  <Button
                    onClick={() => props.handleBookEdit(props.id)}
                    size="small"
                    variant="contained"
                    style={{
                      backgroundColor: "rgb(0, 172, 14)",
                      color: "white",
                    }}
                  >
                    <EditIcon />
                  </Button>
                </>
              </Tooltip>
              <Tooltip
                title={
                  !props.activeBorrowings ? "Delete" : "Has active borrowings"
                }
                placement="top-start"
              >
                <>
                  <Button
                    disabled={props.activeBorrowings}
                    size="small"
                    onClick={() => props.handleBookDelete(props.id)}
                    variant="contained"
                    color="secondary"
                    style={{
                      background: props.activeBorrowings
                        ? "#FFC0C0"
                        : "#E71919",
                    }}
                  >
                    <DeleteForeverIcon />
                  </Button>
                </>
              </Tooltip>
            </>
          )}
          {!props.activeBorrowings ? (
            token.role === "admin" ? (
              <Button
                onClick={() => props.handleAddBrowing(props.id)}
                size="small"
                variant="contained"
                color="primary"
              >
                Add Borrowing
                <AddCircleIcon style={{ marginLeft: "5px" }} />
              </Button>
            ) : (
              <Button size="small" variant="contained" color="primary">
                Available
              </Button>
            )
          ) : (
            <Button disabled size="small" variant="contained" color="primary">
              Not Available
              <BlockIcon style={{ marginLeft: "5px" }} />
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
