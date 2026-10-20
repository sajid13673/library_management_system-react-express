import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Box,
  Chip,
} from "@mui/material";

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
    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ display: "flex" }}>
      <Card
        elevation={2}
        sx={{
          minWidth: 275,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: 3,
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 6,
          },
        }}
      >
        <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          {/* Member Name Section */}
          <Typography
            variant="h6"
            sx={{
              textTransform: "capitalize",
              fontWeight: 600,
              fontSize: "1.1rem",
              lineHeight: 1.3,
              mb: 2,
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            component="div"
          >
            {memberName}
            <Typography variant="body2" color="text.secondary" component="span" sx={{ display: "block", mt: 0.5 }}>
              (ID: {memberId})
            </Typography>
          </Typography>

          {/* Amount Showcase Box */}
          <Box
            sx={{
              py: 2,
              px: 3,
              width: "100%",
              borderRadius: 2,
              backgroundColor: "action.hover",
              mb: 2.5,
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Total Outstanding Fine
            </Typography>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: 800, my: 0.5, color: isPaid ? "text.primary" : "error.main" }}
            >
              ${amount}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight="500">
              accumulated over {days} {days === 1 ? "day" : "days"}
            </Typography>
          </Box>

          {/* Streamlined Status Badge */}
          <Box sx={{ mt: "auto" }}>
            <Chip
              label={isPaid ? "Paid" : "Unpaid"}
              color={isPaid ? "success" : "error"}
              variant="filled"
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
                px: 1,
                fontSize: "0.75rem",
                letterSpacing: 0.5,
              }}
            />
          </Box>
        </CardContent>

        {/* Action Controls Footer */}
        <CardActions sx={{ justifyContent: "center", px: 3, pb: 3, pt: 0 }}>
          {!isPaid && (
            <Button
              disabled={borrowingStatus}
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => openProcessPayment()}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                py: 1,
              }}
            >
              {borrowingStatus ? "Book Not Returned" : "Process Payment"}
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}

export default FineCard;
