import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

function Loading() {
  return (
    <Box>
      <Typography variant="h3">
        Loading... <CircularProgress />
      </Typography>
    </Box>
  );
}

export default Loading;
