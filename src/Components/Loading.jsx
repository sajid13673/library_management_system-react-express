import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

function Loading({ message = "Loading content...", minHeight = "60vh" }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: minHeight,
        width: "100%",
        gap: 2, // Creates perfect vertical spacing between spinner and text
        p: 3,
      }}
    >
      <CircularProgress 
        size={44} 
        thickness={4} 
        sx={{
          color: "primary.main",
        }}
      />
      
      <Typography
        variant="subtitle1"
        fontWeight="500"
        color="text.secondary"
        sx={{
          letterSpacing: 0.5,
          animation: "pulse 1.5s ease-in-out infinite",
          "@keyframes pulse": {
            "0%, 100%": { opacity: 0.6 },
            "50%": { opacity: 1 },
          },
        }}
      >
        {message}
      </Typography>
    </Box>
  );
}

export default Loading;