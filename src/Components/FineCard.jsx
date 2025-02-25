import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import React from "react";

function FineCard({
  memberName,
  memberId, 
  amount,
  days,
  isPaid,
  openProcessPayment,
  borrowingStatus,
}) {
  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Card sx={{ minWidth: 275, height: "100%" }}>
        <CardContent>
          <Typography variant="h6" sx={{ textTransform: 'capitalize' }} component="div">
            {memberName} (ID: {memberId}) 
          </Typography>
          <Box sx={{ mt: 2, mb: 2, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Total Amount
            </Typography>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              ${amount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              for {days} {days === 1 ? "day" : "days"}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: isPaid ? "green" : "red",
              fontWeight: "bold",
              textTransform: "uppercase",
              border: "3px solid", 
              borderColor: isPaid ? "green" : "red",
              padding: "5px 10px",
              display: "inline-block",
              mt: 2,
              textAlign: "center",
            }}
          >
            {isPaid ? "Paid" : "Unpaid"}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          {!isPaid && (
            <Button
              disabled={borrowingStatus}
              variant="contained"
              color="primary"
              onClick={() => openProcessPayment()}
            >
              {borrowingStatus ? "not returned" : "process payment"}
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}

export default FineCard;
