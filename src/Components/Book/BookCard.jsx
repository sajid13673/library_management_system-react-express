import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import EventNoteIcon from "@mui/icons-material/EventNote";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Tooltip,
  Box,
  IconButton,
} from "@mui/material";
import { useAuth } from "../../utils/AuthProvider";
import noImagePic from "../../images/no_image.jpg";

export default function BookCard(props) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        elevation={2}
        sx={{
          minWidth: 200,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 6,
          },
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            flexGrow: 1,
            p: 3,
          }}
        >
          {/* Image Container */}
          <Box
            component="img"
            sx={{
              width: "100%",
              maxWidth: 110,
              height: 150,
              objectFit: "cover",
              borderRadius: 2,
              mb: 2,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
            }}
            src={props.image ? props.image : noImagePic}
            alt={props.title || "Book Cover"}
          />

          {/* Book Metadata */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 600,
              fontSize: "1.1rem",
              lineHeight: 1.3,
              mb: 0.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textTransform: "capitalize",
            }}
          >
            {props.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontWeight: 500,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
              textTransform: "capitalize",
            }}
          >
            {props.author}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              mt: 0.5,
              display: "block",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
              textTransform: "capitalize",
            }}
          >
            {props.publisher} {props.year ? `• ${props.year}` : ""}
          </Typography>
        </CardContent>

        {/* Action Panel */}
        <CardActions
          sx={{
            justifyContent: "space-between",
            px: 2,
            pb: 2,
            pt: 0,
            mt: "auto",
          }}
        >
          {/* Admin Management Tools */}
          <Box display="flex" gap={0.5}>
            {isAdmin && (
              <>
                <Tooltip title="Edit" placement="top">
                  <IconButton
                    onClick={() => props.handleBookEdit(props.id)}
                    size="small"
                    color="success"
                    sx={{ border: "1px solid", borderColor: "success.main" }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip
                  title={
                    props.activeBorrowings ? "Has active borrowings" : "Delete"
                  }
                  placement="top"
                >
                  <span>
                    <IconButton
                      disabled={props.activeBorrowings}
                      onClick={() => props.handleBookDelete(props.id)}
                      size="small"
                      color="error"
                      sx={{ border: "1px solid", borderColor: "error.main" }}
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </IconButton>
                  </span>
                </Tooltip>
              </>
            )}
          </Box>

          {/* Borrow State Buttons */}
          <Box>
            {!props.activeBorrowings ? (
              isAdmin ? (
                <Button
                  onClick={() => props.handleAddBrowing(props.id)}
                  size="small"
                  variant="contained"
                  color="primary"
                  startIcon={<EventNoteIcon />}
                  sx={{ borderRadius: 2, textTransform: "none" }}
                >
                  Borrow
                </Button>
              ) : (
                <Button
                  size="small"
                  variant="outlined"
                  color="success"
                  disabled
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    "&.Mui-disabled": {
                      color: "success.main",
                      borderColor: "success.light",
                    },
                  }}
                >
                  Available
                </Button>
              )
            ) : (
              <Button
                disabled
                size="small"
                variant="outlined"
                color="error"
                startIcon={<BlockIcon />}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  "&.Mui-disabled": {
                    color: "text.disabled",
                    borderColor: "divider",
                  },
                }}
              >
                Unavailable
              </Button>
            )}
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
}
